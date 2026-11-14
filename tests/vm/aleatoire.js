// Croquis aléatoires fictifs (sans navigateur) : l'analyse (état des lieux et avant-projet), les anomalies, la conclusion et la mise à jour
// du dossier ne lèvent aucune exception, et le résultat (flèches du plan comprises) ne dépend pas de l'ordre du dessin (tracés dans cinq
// ordres, objets dans deux), fosse septique comprise (contournée par un by-pass, elle ne compte pas : voir fosse-contournee.js).
// Un raccord posé au milieu d'un tuyau, d'où part un tuyau « Projet » (outil Projet, état des lieux) ou une branche « À supprimer »
// (avant-projet), ne change pas l'analyse de ce plan (m95 ; échoue sur ba2d32a).
// --contre=<dossier> (m116 ; décision D11 de .claude/conception-rejets.md) : chaque croquis est aussi analysé, dans ses modes, par la version de ce dossier
// (par exemple une copie du commit d'avant, faite par git archive) ; résultat par source, anomalies, conclusion, contrôles et constat déduit
// doivent être les mêmes (correctif sans changement visible).
// Les exutoires dessinés comptent l'infiltration au sol (option exutoires du générateur, m118).
// usage : node tests/vm/aleatoire.js [n=1500] [graine=1] [-v] [--app=<dossier>] [--contre=<dossier>]
'use strict';
const {charger, doc, melange, copie, rapport} = require('./charger.js');
const G = require('./generateur.js');
const {V} = charger(), R = rapport('aleatoire');
const optContre = process.argv.find(x => /^--contre=/.test(x)), Vc = optContre ? charger({dir: optContre.slice(9)}).V : null;
const args = process.argv.slice(2).filter(x => !/^-/.test(x)), N = +(args[0] || 1500), S0 = +(args[1] || 1);
/* exutoires dessinés : ceux du générateur et l'infiltration au sol (m118) */
const EXUS = G.EXUTOIRES.concat(['infiltration']);

function signature(d, mode, parSommets){
  const an = V.analyser(copie(d), mode), L = V.anomaliesDoc(copie(d), an), c = V.conclusion(L, an);
  const s = Object.keys(an.resObj).sort().map(id => { const r = an.resObj[id];
    return id + '=' + r.etat + ':' + (r.nets || []).join(',') + (r.presume ? '(p)' : '') + (r.fosse ? ' F=' + r.fosse : '') + (r.boite ? ' B=' + r.boite : '')
      + (r.conflit ? ' c=' + r.conflit.join(',') : '') + (r.ambigu ? ' a=' + r.ambigu.join(',') + (r.ambiguArrivee ? '+' : '') : '') + (r.sortiesLibres ? ' sl=' + r.sortiesLibres.length : ''); }).join(' ');
  const anos = L.map(a => a.cle + '@' + a.objId + ':' + a.st).sort().join(',');
  const ctrl = an.controles.map(x => x.niveau + ':' + x.txt).sort().join(' ; ');
  /* parSommets : une pièce désignée par son tuyau et les points de ses deux bouts (un sommet ajouté décale les numéros des sommets) */
  const cle = p => parSommets ? p.l.id + (p.col ? ':c' : ':') + [p.i0, p.i1].map(i => p.l.v[i].x + ',' + p.l.v[i].y).join('>') : p.id;
  const fl = an.pieces.map(p => cle(p) + (an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=')).sort().join(' ; ');
  return s + ' | ' + anos + ' | ' + c + ' | ' + ctrl + ' | ' + fl;
}
/* mise à jour du dossier : aucune exception, une seconde synchronisation ne change plus rien */
function dossier(d){
  const ext = []; let k = 0;
  const synchro = () => { const ops = V.reconcilier(copie(d), null, ext);
    ops.retirer.forEach(id => { const i = ext.findIndex(r => r.id === id); if (i >= 0) ext.splice(i, 1); });
    ops.maj.forEach(m => { const r = ext.find(x => x.id === m.id); if (r) Object.assign(r, m.champs); });
    ops.creer.forEach(c => { ext.push(Object.assign({id: c.id || ('r' + (++k)), createdAt: '2026-11-06'}, c)); }); return ops; };
  synchro(); const o2 = synchro();
  return o2.creer.length + o2.maj.length + o2.retirer.length;
}

/* raccord posé au milieu d'un segment d'un tuyau de ce plan, d'où part un tuyau absent de ce plan (« Projet » sur l'état des lieux, raccord posé
   d'office par l'outil Projet ; « À supprimer » sur l'avant-projet, raccord posé à la main) */
function raccordAuMilieu(d0, mode, k){
  const d = copie(d0), pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
  const trs = d.el.filter(e => e.k === 'ln' && e.t === 'tr' && e.v.length >= 2 && (mode === 'avp' ? e.p.st !== 'supprimer' : e.p.st !== 'projet'));
  if (!trs.length) return null;
  const l = trs[k % trs.length], seg = 1 + (k % (l.v.length - 1)), a = l.v[seg - 1].a ? pos[l.v[seg - 1].a] : l.v[seg - 1], b = l.v[seg].a ? pos[l.v[seg].a] : l.v[seg];
  const m = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
  d.el.push({id: 'Jm', k: 'pt', t: 'jonction', x: m.x, y: m.y, p: V.defautsPt('jonction'), lab: {off: true}, auto: mode !== 'avp'});
  l.v.splice(seg, 0, {x: m.x, y: m.y, a: 'Jm'});
  d.el.push({id: 'Lm', k: 'ln', t: 'tr', v: [{x: m.x, y: m.y, a: 'Jm'}, {x: m.x + 0.8, y: m.y + 0.6, a: null}], p: Object.assign(V.defautsLn('tr', {res: ''}), {res: '', st: mode === 'avp' ? 'supprimer' : 'projet'}), lab: null});
  return d;
}
const st = {croquis: 0, analyses: 0, exceptions: 0, ordreTraces: 0, ordreObjets: 0, avecFosse: 0, dossierInstable: 0, raccordsAuMilieu: 0, raccordChange: 0, raccordChangeAnalyse: 0};
if (Vc) Object.assign(st, {contre: 0, ecartsContre: 0});
/* --contre : écriture stable d'une valeur (clés triées, boucle coupée) ; ce qu'une version tire d'un croquis, partie par partie */
function stable(v, pile){
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'function') return '"(fonction)"';
  if (typeof v !== 'object') return JSON.stringify(v);
  if (pile.indexOf(v) >= 0) return '"(boucle)"';
  pile.push(v);
  const t = Array.isArray(v) ? '[' + v.map(x => stable(x, pile)).join(',') + ']'
    : '{' + Object.keys(v).sort().filter(k => v[k] !== undefined).map(k => JSON.stringify(k) + ':' + stable(v[k], pile)).join(',') + '}';
  pile.pop();
  return t;
}
function resultat(Vx, d, mode){
  try {
    const an = Vx.analyser(copie(d), mode), L = Vx.anomaliesDoc(copie(d), an), cd = Vx.constatDeduit(copie(d), an);
    return {sources: stable(an.resObj, []), anomalies: stable(L, []), conclusion: stable(Vx.conclusion(L, an), []), controles: stable(an.controles, []),
      constat: stable({rows: cd.rows, epRecup: cd.epRecup, sansCote: cd.sansCote, methodes: cd.methodes}, [])};
  } catch (e){ return {exception: e.message}; }
}
const ex = {};
/* ce qui diffère entre deux résultats (parties séparées par « | » et « ; ») */
function ecart(a, b){
  const pa = a.split(/ \| | ; /), pb = b.split(/ \| | ; /), sa = new Set(pa), sb = new Set(pb);
  return '- ' + pa.filter(x => !sb.has(x)).join(' ; ') + '\n      + ' + pb.filter(x => !sa.has(x)).join(' ; ');
}
const note = (k, t) => { (ex[k] = ex[k] || []); if (ex[k].length < 3) ex[k].push(t); };
for (let it = 0; it < N; it++){
  const graine = S0 + it, avp = graine % 3 === 0;
  const spec = G.gen(graine, {avp, pLoop: (graine % 10) / 10, maxN: 2 + graine % 7, maxS: 1 + graine % 4, maxC: graine % 3, exutoires: EXUS});
  const d = doc(spec), fosse = spec.o.some(o => o[1] === 'fosse'); st.croquis++; if (fosse) st.avecFosse++;
  const lns = d.el.filter(e => e.k === 'ln'), pts = d.el.filter(e => e.k !== 'ln');
  const ordres = [d.el, pts.concat(lns.slice().reverse()), pts.concat(melange(lns, graine)), pts.concat(melange(lns, graine + 1)), pts.concat(melange(lns, graine + 2))];
  (avp ? ['edl', 'avp'] : ['edl']).forEach(mode => {
    st.analyses++;
    let sigs;
    try { sigs = ordres.map(el => signature(Object.assign({}, d, {el}), mode)); }
    catch (e){ st.exceptions++; note('exception', 'graine ' + graine + ' ' + mode + ' : ' + e.message + ' ' + (e.stack || '').split('\n')[1] + '\n      ' + G.fmt(spec)); return; }
    if (new Set(sigs).size > 1){
      st.ordreTraces++;
      note('ordre des tracés' + (fosse ? ' (croquis avec fosse)' : ''), 'graine ' + graine + ' ' + mode + ' ' + G.fmt(spec) + '\n      ' + ecart(...[...new Set(sigs)].slice(0, 2)));
    }
    try { const so = signature(Object.assign({}, d, {el: melange(pts, graine + 5).concat(lns)}), mode); if (so !== sigs[0]){ st.ordreObjets++; note('ordre des objets', 'graine ' + graine + ' ' + mode + ' ' + G.fmt(spec) + '\n      ' + ecart(sigs[0], so)); } }
    catch (e){ st.exceptions++; note('exception', 'graine ' + graine + ' ' + mode + ' (objets permutés) : ' + e.message); }
    try { const dj = raccordAuMilieu(d, mode, graine); if (dj){ st.raccordsAuMilieu++; const a = signature(d, mode, true), b = signature(dj, mode, true);
      if (a !== b){ const ana = a.slice(0, a.lastIndexOf(' | ')) !== b.slice(0, b.lastIndexOf(' | ')); st.raccordChange++; if (ana) st.raccordChangeAnalyse++;
        note('raccord au milieu d\'un tuyau' + (ana ? '' : ' (pièces et flèches seules)'), 'graine ' + graine + ' ' + mode + ' ' + G.fmt(spec) + '\n      ' + ecart(a, b)); } } }
    catch (e){ st.exceptions++; note('exception', 'graine ' + graine + ' ' + mode + ' (raccord au milieu) : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
    if (Vc){
      const a = resultat(V, d, mode), b = resultat(Vc, d, mode), k = [...new Set(Object.keys(a).concat(Object.keys(b)))].filter(x => a[x] !== b[x]);
      st.contre++;
      if (k.length){ st.ecartsContre++; note('écart avec --contre', 'graine ' + graine + ' ' + mode + ' (' + k.join(', ') + ') ' + G.fmt(spec)); }
    }
  });
  try { if (dossier(d)) { st.dossierInstable++; note('dossier', 'graine ' + graine + ' ' + G.fmt(spec)); } }
  catch (e){ st.exceptions++; note('exception', 'graine ' + graine + ' dossier : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
}
console.log(JSON.stringify(st));
Object.keys(ex).forEach(k => ex[k].forEach(t => console.log('[' + k + '] ' + t)));
R.ok(st.exceptions === 0, 'aucune exception (' + st.analyses + ' analyses de ' + st.croquis + ' croquis)');
R.ok(st.ordreTraces === 0, 'même résultat dans cinq ordres des tracés (' + st.avecFosse + ' croquis avec fosse)');
R.ok(st.ordreObjets === 0, 'même résultat dans un autre ordre des objets');
R.ok(st.raccordChange === 0, 'un raccord au milieu d\'un tuyau, d\'où part un tuyau absent de ce plan, ne change rien (' + st.raccordsAuMilieu + ' plans'
  + (st.raccordChange ? ' ; ' + st.raccordChange + ' changés, dont ' + st.raccordChangeAnalyse + ' hors pièces et flèches' : '') + ')');
R.ok(st.dossierInstable === 0, 'une seconde mise à jour du dossier ne change plus rien');
if (Vc) R.ok(st.ecartsContre === 0, 'même résultat par source, anomalies, conclusion, contrôles et constat déduit qu\'avec la version de ' + optContre.slice(9)
  + ' (' + st.contre + ' analyses' + (st.ecartsContre ? ' ; ' + st.ecartsContre + ' écarts' : '') + ')');
R.fin();
