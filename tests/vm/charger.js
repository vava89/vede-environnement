// Outils communs des tests sans navigateur : charge croquis/croquis.js (et, au besoin, la bibliothèque PDF) dans un bac à sable vm,
// construit des croquis fictifs, relève leur rendu (écran, plan PDF, DXF) et compte les résultats. Aucune donnée réelle : adresse
// « 12 rue Fictive », « Ville-Exemple ».
// Dossier de l'application : la racine du dépôt ; pour comparer avec une autre version, --app=<dossier> ou la variable VEDE_APP.
'use strict';
const vm = require('vm'), fs = require('fs'), path = require('path');
const RACINE = path.resolve(__dirname, '..', '..');

function dossierApp(){
  const a = process.argv.find(x => /^--app=/.test(x));
  return path.resolve(a ? a.slice(6) : process.env.VEDE_APP || RACINE);
}

/* o.pdf : charge aussi lib/jspdf.umd.min.js (plan PDF). Rend {V : VCroquis, ctx : le bac à sable, dir : le dossier lu}. */
function charger(o){
  o = o || {};
  const dir = o.dir ? path.resolve(o.dir) : dossierApp();
  const ctx = {console, Math, Date, JSON, Object, Array, String, Number, Boolean, isFinite, isNaN, parseFloat, parseInt, setTimeout, clearTimeout,
    RegExp, Infinity, NaN, Error, TypeError, RangeError, Promise, Map, Set, WeakMap, Symbol};
  if (o.pdf) Object.assign(ctx, {Uint8Array, Uint16Array, Uint32Array, Int32Array, Float32Array, Float64Array, ArrayBuffer, DataView, TextEncoder,
    TextDecoder, atob, btoa, encodeURIComponent, decodeURIComponent, escape, unescape, Blob, URL});
  ctx.globalThis = ctx; ctx.self = ctx; vm.createContext(ctx);
  if (o.pdf){ vm.runInContext(fs.readFileSync(path.join(dir, 'lib/jspdf.umd.min.js'), 'utf8'), ctx, {filename: 'jspdf.umd.min.js'}); ctx.window = undefined; }
  vm.runInContext(fs.readFileSync(path.join(dir, 'croquis/croquis.js'), 'utf8'), ctx, {filename: 'croquis.js'});
  if (!ctx.VCroquis) throw new Error('VCroquis absent après le chargement de ' + path.join(dir, 'croquis/croquis.js'));
  return {V: ctx.VCroquis, ctx, dir};
}

/* Croquis fictif décrit en abrégé.
   o : [id, type, x, y, propriétés] ; l : [id, 'tr' | 'col', réseau, statut, sommets, sens, propriétés] ; un sommet est l'id d'un objet
   (raccordé) ou [x, y] (libre). Propriétés par défaut d'un objet : existant, sans observation, essai à l'eau, visitable, côté avant, tampon
   fonte. Les propriétés d'un tracé (7e champ, facultatif, m121 : par exemple {drain: 'collecte'}) s'ajoutent à celles qu'il reçoit ici. */
function doc(spec){
  const el = [], pos = {};
  (spec.o || []).forEach(([n, t, x, y, p]) => {
    const e = {id: n, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: '', meth: ['eau'], visitable: 'oui', cote: 'avant', tampon: 'fonte'}, p || {}), lab: {off: true}};
    el.push(e); pos[n] = e;
  });
  (spec.l || []).forEach(([n, t, res, st, v, sens, props]) => {
    const p = t === 'col' ? {res: res || 'EU', gest: 'D', st: st || 'existant'} : {res: res || '', st: st || 'existant', sens: sens || 0, obs: ''};
    el.push({id: n, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}),
      p: Object.assign(p, props || {}), lab: {off: true}});
  });
  return {format: 'vede-croquis', v: 1, id: 'd', nom: 'Croquis fictif', numero: 'F-1', adresse: '12 rue Fictive', commune: 'Ville-Exemple',
    date: '2026-11-01', technicien: 'Nom Fictif', fondId: null, reseauId: null, origine: {x: 0, y: 0}, u: 1, rot: 0, echelle: 0, vue: null,
    gest: {EU: 'D', EP: 'D', UN: 'D'}, el, decisions: {}, ordre: [], anomManu: [], cree: '', modifie: '', rev: 0};
}

/* Mélange reproductible (k : graine). */
function melange(a, k){
  const b = a.slice(); let s = (k * 2654435761) >>> 0;
  for (let i = b.length - 1; i > 0; i--){ s = (Math.imul(s, 1103515245) + 12345) >>> 0; const j = s % (i + 1); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}

/* Le même croquis dessiné dans un autre ordre : les tracés sont permutés (k = 1 : à l'envers), les objets gardent leur place. */
function reordonne(d, k){
  const pts = d.el.filter(e => e.k !== 'ln'), lns = d.el.filter(e => e.k === 'ln');
  return Object.assign({}, d, {el: pts.concat(k === 1 ? lns.slice().reverse() : melange(lns, k))});
}

const copie = x => JSON.parse(JSON.stringify(x));

/* Outils de rendu d'une application chargée (ch = charger(...) ; le plan PDF demande charger({pdf: true})), venus de vm/escalier.js (m116) :
   - canevas() : canevas factice qui relève les segments de chaque chemin tracé (stroke), avec la couleur et l'épaisseur du moment, et les
     textes écrits (fillText), avec la couleur de remplissage du moment et la place donnée (sans les transformations du canevas) ; les
     autres méthodes ne font rien ; measureText rend une largeur de 10 ;
   - dessiner(d, s, c) : dessin de l'écran en état des lieux (vue de 800 × 600 px centrée sur c, à s px par mètre) : zones de toucher,
     traits ramenés en mètres du croquis, textes ;
   - pdf(doc, o) : plan PDF (V.pdfPlan) relevé par une enveloppe de la bibliothèque : textes, place des textes (pos), traits
     (couleur/épaisseur, dans l'ordre), formes (couleur, fermée ou non, sommets en mm) ; err : les exceptions ;
   - dxf(doc) : DXF (V.ecrireDxf ; latin1, paires code/valeur) : calques et leur couleur, blocs, entités (codes de groupe dans c, ceux
     d'une polyligne compris : m121), étendue, texte entier. */
function rendus(ch){
  const V = ch.V, ctx = ch.ctx;
  function canevas(){
    const traits = [], textes = [], etat = {}; let chemin = [], dernier = null, debut = null;
    const m = {
      beginPath(){ chemin = []; dernier = debut = null; },
      moveTo(x, y){ dernier = debut = {x, y}; },
      lineTo(x, y){ const q = {x, y}; if (dernier) chemin.push([dernier, q]); dernier = q; },
      closePath(){ if (dernier && debut) chemin.push([dernier, debut]); dernier = debut; },
      stroke(){ chemin.forEach(s => traits.push({a: s[0], b: s[1], coul: etat.strokeStyle, larg: etat.lineWidth})); },
      fillText(t, x, y){ textes.push({t: String(t), x, y, coul: etat.fillStyle}); },
      measureText(){ return {width: 10}; }
    };
    return {ctx: new Proxy(etat, {get: (t, k) => k in m ? m[k] : k in t ? t[k] : () => {}, set: (t, k, v) => { t[k] = v; return true; }}), traits, textes};
  }
  function dessiner(d, s, c){
    const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = s; vue.cx = c[0]; vue.cy = c[1];
    const cv = canevas(), zones = V.dessinerCroquis(cv.ctx, d, an, vue, 1, {});
    return {zones, traits: cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul, larg: t.larg})), textes: cv.textes};
  }
  async function pdf(doc, o){
    const J0 = ctx.jspdf.jsPDF, txt = [], pos = [], traits = [], formes = [];
    const W = function(){
      const d = new J0(...arguments), ot = d.text, ol = d.lines, lw = d.setLineWidth, dc = d.setDrawColor; let w = null, c = null;
      d.text = function(t, x, y){ try { const s = [].concat(t).join(' '); txt.push(s); pos.push({t: s, x, y}); } catch (e){} return ot.apply(d, arguments); };
      d.setLineWidth = function(x){ w = x; return lw.apply(d, arguments); };
      d.setDrawColor = function(){ c = Array.from(arguments).join(','); return dc.apply(d, arguments); };
      /* d.line passe aussi par ici ; s : segments relatifs, k : échelle (d'une courbe, on garde le point d'arrivée) */
      d.lines = function(s, x, y, k, st, ferme){
        const ech = k || [1, 1], pts = [{x, y}];
        (s || []).forEach(q => { const z = pts[pts.length - 1]; pts.push({x: z.x + ech[0] * q[q.length - 2], y: z.y + ech[1] * q[q.length - 1]}); });
        traits.push(c + '/' + w); formes.push({coul: c, ferme: !!ferme, pts}); return ol.apply(d, arguments);
      };
      return d;
    };
    W.API = J0.API; ctx.jspdf.jsPDF = W;
    try { await V.pdfPlan(copie(doc), null, o || {}); } catch (e){ txt.push('ERR ' + e.message); } finally { ctx.jspdf.jsPDF = J0; }
    return {txt, pos, traits, formes, err: txt.filter(t => /^ERR/.test(t))};
  }
  function dxf(doc){
    const x = Buffer.from(V.ecrireDxf(copie(doc))).toString('latin1').split('\r\n'), ents = [];
    let sec = null, e = null;
    for (let i = 0; i + 1 < x.length; i += 2){
      const c = x[i].trim(), v = x[i + 1];
      if (c === '0'){ e = {sec, type: v, c: {}}; ents.push(e); continue; }
      if (!e) continue;
      if (e.type === 'SECTION' && c === '2'){ sec = e.sec = v; continue; }
      if (sec === 'HEADER' && c === '9'){ e = {sec, type: 'VAR', nom: v, c: {}}; ents.push(e); continue; }
      if (!(c in e.c)) e.c[c] = v;
    }
    const out = {calques: {}, blocs: [], ents: [], ext: {}, texte: x.join('\n')}; let pl = null;
    ents.forEach(q => {
      if (q.type === 'VAR') out.ext[q.nom] = {x: +q.c['10'], y: +q.c['20']};
      if (q.sec === 'TABLES' && q.type === 'LAYER') out.calques[q.c['2']] = +q.c['62'];
      if (q.sec === 'BLOCKS' && q.type === 'BLOCK') out.blocs.push(q.c['2']);
      if (q.sec !== 'ENTITIES') return;
      if (q.type === 'POLYLINE'){ pl = {type: 'POLYLINE', cal: q.c['8'], c: q.c, ferme: (+q.c['70'] & 1) === 1, sommets: []}; out.ents.push(pl); return; }
      if (q.type === 'VERTEX'){ if (pl) pl.sommets.push({x: +q.c['10'], y: +q.c['20']}); return; }
      if (q.type === 'SEQEND'){ pl = null; return; }
      out.ents.push({type: q.type, cal: q.c['8'], c: q.c, a: {x: +q.c['10'], y: +q.c['20']}, b: {x: +q.c['11'], y: +q.c['21']}});
    });
    return out;
  }
  return {canevas, dessiner, pdf, dxf};
}

/* Compte des résultats d'un fichier de tests ; le code de sortie vaut 1 s'il y a un échec. */
function rapport(nom){
  let nok = 0, nt = 0;
  return {
    ok(bon, texte){ nt++; if (bon) nok++; if (!bon || process.argv.indexOf('-v') >= 0) console.log((bon ? 'OK  ' : 'KO  ') + texte); return bon; },
    info(texte){ console.log('    ' + texte); },
    fin(){ console.log(nom + ' : ' + nok + '/' + nt + (nok === nt ? '' : '  ÉCHEC')); if (nok !== nt || !nt) process.exitCode = 1; return nok === nt; },
  };
}

module.exports = {RACINE, dossierApp, charger, doc, melange, reordonne, copie, rendus, rapport};
