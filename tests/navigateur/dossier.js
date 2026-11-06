// Croquis et dossier dans l'application (Chromium, données fictives) : la nature choisie à la main reste celle du technicien quand une
// anomalie écartée revient, puis quand le dessin change. Tampon béton d'un regard (NC en EU, réserve en EP) :
// 1 : regard relié au collecteur EP (réserve), « Non-conformité » cochée, anomalie écartée, regard délié pendant le retrait, retenue de
//     nouveau, puis regard relié de nouveau : la NC reste, constat proposé « Non conformes » ;
// 2 : l'inverse : regard non relié (NC), réserve choisie, écartée, regard relié au collecteur EP, retenue, regard délié : la réserve reste.
// 3 : « Reprendre du croquis » : un lavabo seul donne une ligne « Autres : Lavabo » au constat, la ligne « Salle de bain » reste vide.
// usage : node tests/navigateur/dossier.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('dossier');

/* une étape : modifie le croquis (code src), met à jour le dossier, rend l'anomalie du tampon et le constat proposé */
const etape = (p, src) => p.evaluate(src => {
  const ed = window.__vcEd, d = ed.doc(), V = window.VCroquis, T = window.__VT, v = T.VC.ctx.v;
  const anoms = () => T.S.anoms.filter(a => a.visiteId === v.id);
  const pt = (id, t, x, y, q) => { d.el.push({id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), q || {}), lab: null}); };
  const ln = (id, t, res, sommets) => { const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
    d.el.push({id, k: 'ln', t, v: sommets.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p: Object.assign(V.defautsLn(t, {res}), {res}), lab: null}); };
  const relier = () => { pt('j', 'jonction', 0, 0); ln('b', 'tr', '', ['r1', 'j']); ln('K', 'col', 'EP', [[-10, 0], 'j', [10, 0]]); };
  const delier = () => { d.el = d.el.filter(e => e.id !== 'b' && e.id !== 'K' && e.id !== 'j'); };
  (new Function('d', 'pt', 'ln', 'relier', 'delier', 'anoms', src))(d, pt, ln, relier, delier, anoms);
  ed.synchroniser();
  const a = anoms().find(x => x.croquis && x.croquis.cle === 'tampon:r1');
  return {a: a ? {obs: a.observation, reseau: a.reseau, nature: T.anomNC(a) ? 'NC' : 'réserve'} : null, constat: T.constatEval(v, anoms()).auto};
}, src);

async function cas(nom, debut, choix, relierAvant, attendu){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const vu = [];
    vu.push(await etape(p, "pt('r1', 'regard', 0, 4, {tampon: 'beton'}); " + debut));
    vu.push(await etape(p, "anoms().find(x => x.croquis && x.croquis.cle === 'tampon:r1').nc = " + choix + ';'));
    vu.push(await etape(p, "d.decisions['tampon:r1'] = {st: 'ecartee'};"));
    vu.push(await etape(p, relierAvant ? 'relier();' : 'delier();'));
    vu.push(await etape(p, "delete d.decisions['tampon:r1'];"));
    vu.push(await etape(p, ''));
    vu.push(await etape(p, relierAvant ? 'delier();' : 'relier();'));
    const fin = vu[vu.length - 1], bon = !!fin.a && fin.a.nature === attendu.nature && fin.constat === attendu.constat && !!vu[4].a && vu[4].a.nature === attendu.nature;
    R.ok(bon, nom + ' : ' + (fin.a ? fin.a.obs + ', ' + fin.a.reseau + ', ' + fin.a.nature : 'anomalie absente') + ', constat proposé « ' + fin.constat + ' »'
      + (bon ? '' : ' (étapes : ' + vu.map(x => x.a ? x.a.nature : '-').join(' ') + ')'));
    R.ok(!A.erreurs.length, nom + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

async function lavabo(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
    const els = [C.P('w1', 'wc', ...o(-3, 0)), C.P('la', 'lavabo', ...o(3, 0)), C.P('B', 'boite', ...o(0, -4), {res: 'EU'})], I = C.index(els);
    els.push(C.L('A', 'tr', ['w1', 'B'], I), C.L('Bl', 'tr', ['la', 'B'], I));
    await C.injecter(p, {el: els});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
    await C.fermerCroquis(p); await C.pause(p, 600);
    const r = await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; const n = T.constatDepuisCroquis(v, await T.vcResume(v), false);
      return {n, rows: (v.constat && v.constat.rows || []).filter(x => x.nb).map(x => x.label + ' ×' + x.nb + (x.std ? '' : ' (Autres)'))}; });
    R.ok(r.rows.indexOf('Lavabo ×1 (Autres)') >= 0 && !r.rows.some(x => /^Salle de bain/.test(x)), '3 lavabo seul repris du croquis : ' + r.rows.join(' ; '));
    R.ok(!A.erreurs.length, '3 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  try {
    await cas('1 NC choisie en EP, dessin changé pendant le retrait puis rétabli', 'relier();', 'true', false, {nature: 'NC', constat: 'non_conformes'});
    await cas('2 réserve choisie en EU, dessin changé pendant le retrait puis rétabli', '', 'false', true, {nature: 'réserve', constat: 'reserves'});
    await lavabo();
  } catch (e){ R.ok(false, 'exception du test : ' + (e && e.stack || e)); }
  R.fin();
})();
