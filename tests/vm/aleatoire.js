// Croquis aléatoires fictifs (sans navigateur) : l'analyse (état des lieux et avant-projet), les anomalies, la conclusion et la mise à jour
// du dossier ne lèvent aucune exception, et le résultat (flèches du plan comprises) ne dépend pas de l'ordre du dessin (tracés dans cinq
// ordres, objets dans deux), fosse septique comprise (contournée par un by-pass, elle ne compte pas : voir fosse-contournee.js).
// usage : node tests/vm/aleatoire.js [n=1500] [graine=1] [-v] [--app=<dossier>]
'use strict';
const {charger, doc, melange, copie, rapport} = require('./charger.js');
const G = require('./generateur.js');
const {V} = charger(), R = rapport('aleatoire');
const args = process.argv.slice(2).filter(x => !/^-/.test(x)), N = +(args[0] || 1500), S0 = +(args[1] || 1);

function signature(d, mode){
  const an = V.analyser(copie(d), mode), L = V.anomaliesDoc(copie(d), an), c = V.conclusion(L, an);
  const s = Object.keys(an.resObj).sort().map(id => { const r = an.resObj[id];
    return id + '=' + r.etat + ':' + (r.nets || []).join(',') + (r.presume ? '(p)' : '') + (r.fosse ? ' F=' + r.fosse : '') + (r.boite ? ' B=' + r.boite : '')
      + (r.conflit ? ' c=' + r.conflit.join(',') : '') + (r.ambigu ? ' a=' + r.ambigu.join(',') + (r.ambiguArrivee ? '+' : '') : '') + (r.sortiesLibres ? ' sl=' + r.sortiesLibres.length : ''); }).join(' ');
  const anos = L.map(a => a.cle + '@' + a.objId + ':' + a.st).sort().join(',');
  const ctrl = an.controles.map(x => x.niveau + ':' + x.txt).sort().join(' ; ');
  const fl = an.pieces.map(p => p.id + (an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=')).sort().join(' ; ');
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

const st = {croquis: 0, analyses: 0, exceptions: 0, ordreTraces: 0, ordreObjets: 0, avecFosse: 0, dossierInstable: 0};
const ex = {};
/* ce qui diffère entre deux résultats (parties séparées par « | » et « ; ») */
function ecart(a, b){
  const pa = a.split(/ \| | ; /), pb = b.split(/ \| | ; /), sa = new Set(pa), sb = new Set(pb);
  return '- ' + pa.filter(x => !sb.has(x)).join(' ; ') + '\n      + ' + pb.filter(x => !sa.has(x)).join(' ; ');
}
const note = (k, t) => { (ex[k] = ex[k] || []); if (ex[k].length < 3) ex[k].push(t); };
for (let it = 0; it < N; it++){
  const graine = S0 + it, avp = graine % 3 === 0;
  const spec = G.gen(graine, {avp, pLoop: (graine % 10) / 10, maxN: 2 + graine % 7, maxS: 1 + graine % 4, maxC: graine % 3});
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
  });
  try { if (dossier(d)) { st.dossierInstable++; note('dossier', 'graine ' + graine + ' ' + G.fmt(spec)); } }
  catch (e){ st.exceptions++; note('exception', 'graine ' + graine + ' dossier : ' + e.message + ' ' + (e.stack || '').split('\n')[1]); }
}
console.log(JSON.stringify(st));
Object.keys(ex).forEach(k => ex[k].forEach(t => console.log('[' + k + '] ' + t)));
R.ok(st.exceptions === 0, 'aucune exception (' + st.analyses + ' analyses de ' + st.croquis + ' croquis)');
R.ok(st.ordreTraces === 0, 'même résultat dans cinq ordres des tracés (' + st.avecFosse + ' croquis avec fosse)');
R.ok(st.ordreObjets === 0, 'même résultat dans un autre ordre des objets');
R.ok(st.dossierInstable === 0, 'une seconde mise à jour du dossier ne change plus rien');
R.fin();
