// Outils communs des tests sans navigateur : charge croquis/croquis.js (et, au besoin, la bibliothèque PDF) dans un bac à sable vm,
// construit des croquis fictifs et compte les résultats. Aucune donnée réelle : adresse « 12 rue Fictive », « Ville-Exemple ».
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
   o : [id, type, x, y, propriétés] ; l : [id, 'tr' | 'col', réseau, statut, sommets, sens] ; un sommet est l'id d'un objet (raccordé)
   ou [x, y] (libre). Propriétés par défaut d'un objet : existant, sans observation, essai à l'eau, visitable, côté avant, tampon fonte. */
function doc(spec){
  const el = [], pos = {};
  (spec.o || []).forEach(([n, t, x, y, p]) => {
    const e = {id: n, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: '', meth: ['eau'], visitable: 'oui', cote: 'avant', tampon: 'fonte'}, p || {}), lab: {off: true}};
    el.push(e); pos[n] = e;
  });
  (spec.l || []).forEach(([n, t, res, st, v, sens]) => {
    el.push({id: n, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}),
      p: t === 'col' ? {res: res || 'EU', gest: 'D', st: st || 'existant'} : {res: res || '', st: st || 'existant', sens: sens || 0, obs: ''}, lab: {off: true}});
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

/* Compte des résultats d'un fichier de tests ; le code de sortie vaut 1 s'il y a un échec. */
function rapport(nom){
  let nok = 0, nt = 0;
  return {
    ok(bon, texte){ nt++; if (bon) nok++; if (!bon || process.argv.indexOf('-v') >= 0) console.log((bon ? 'OK  ' : 'KO  ') + texte); return bon; },
    info(texte){ console.log('    ' + texte); },
    fin(){ console.log(nom + ' : ' + nok + '/' + nt + (nok === nt ? '' : '  ÉCHEC')); if (nok !== nt || !nt) process.exitCode = 1; return nok === nt; },
  };
}

module.exports = {RACINE, dossierApp, charger, doc, melange, reordonne, copie, rapport};
