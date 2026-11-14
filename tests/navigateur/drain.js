// Drains dans la fiche du tronçon, dans Chromium (décisions D4, D7 et D10 de la conception « Rejets » ; m121 à m123). Données fictives : fond de
// VCroquis.demoDxf() (12 rue Fictive, Ville-Exemple), croquis vidé, deux tronçons libres (T sans réseau, U unitaire).
// f1 : la fiche de T a les puces « Drain » (Non, Collecte, Infiltration), « Non » choisie. « Collecte » : p.drain 'collecte' et p.res 'EP', en un
//   pas d'annulation, en-tête « Drain » ; Réseau EU, puis Déduit : p.drain reste ; « Infiltration » (après Réseau EU et « Sens du tracé ») :
//   p.drain 'infiltration' et p.res '', en un pas, plus de puces Réseau, en-tête « Drain d'infiltration » ; depuis m122, la tête dit
//   « Dispersion dans le sol » (pas « Réseau EP déduit ») et les puces « Sens d'écoulement » sont masquées, p.sens restant au fichier (témoin :
//   3 puces sur un tronçon et sur un drain de collecte, dont la tête dit « Réseau EP ») ; « Collecte » y remet EP et les puces de sens, « Sens
//   du tracé » choisie ; « Non » : plus de clé drain, p.res reste EP, en-tête « Tronçon » ; « Non » de nouveau : aucun pas d'annulation ;
//   « Annuler », deux fois : collecte en EP, puis infiltration sans réseau. U passé en « Collecte » reste unitaire. Aucun objet posé ni
//   retiré ; aucune erreur dans la console.
// Échoue sur b7ad8a4 (pas de puces « Drain »), sauf le témoin (fiche d'un tronçon sans drain), l'absence d'objet posé ou retiré et
// l'absence d'erreur dans la console. Sur 92919f4 (m121), seul échoue le cas de la tête du drain d'infiltration et de ses puces de sens.
// f2 (m123) : un drain de collecte compte comme une source (décision D7) : sa fiche a les puces « Méthode de test » (7, aucune choisie), et
//   le contrôle « Drain : méthode de test à indiquer » ; « Eau » : p.meth ['eau'], en un pas d'annulation, la puce choisie, plus de contrôle ;
//   « Eau » de nouveau : p.meth [] et le contrôle revient. Témoins : pas de puces de méthode sur un drain de collecte qui tient un point
//   « Drain » (le point compte, avec ses méthodes), sur un drain d'infiltration ni sur un tronçon EP. Les puces suivent le plan affiché,
//   comme l'analyse : un drain de collecte qui tient un point « Drain » « Projet » a ses puces et son contrôle sur l'état des lieux (« Eau » le
//   lève), mais pas sur l'avant-projet (puce « Après l'avant-projet » du panneau « Contrôles »), où le point compte à sa place. Aucune
//   erreur dans la console.
//   Échoue sur 841fd30 : pas de puces de méthode ni de contrôle sur le drain de collecte (les témoins y passent). Avant la relecture de
//   m123, seul échouait le cas du point « Projet » sur l'état des lieux : pas de puces, mais le contrôle, qu'on ne pouvait pas lever.
'use strict';
const C = require('./commun.js');
const R = C.rapport('drain');
const PAN = '.vc .vc-panneau:not([hidden]) .vc-pcorps';

async function fiche(p, id){ await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250); }
/* toucher une puce de la fiche ; faux, sans attendre, si elle manque */
async function puce(p, k, v){ const b = await p.$(PAN + ' button[data-k="' + k + '"][data-v="' + v + '"]'); if (!b) return false; await b.click(); await C.pause(p, 200); return true; }
async function annuler(p){ const b = await p.$('.vc .vc-barre [data-a="annuler"]:not([disabled])'); if (!b) return false; await b.click(); await C.pause(p, 250); return true; }
/* propriétés du tracé id, pas d'annulation, nombre d'éléments ; fiche affichée : titre, état de la tête, puces « Drain », puce choisie de
   Drain, de Réseau et de Sens, nombre de puces Réseau et de puces « Sens d'écoulement » */
const etat = (p, id) => p.evaluate(([id, PAN]) => {
  const ed = window.__vcEd, e = ed.doc().el.find(x => x.id === id), c = document.querySelector(PAN), t = c && c.querySelector('.vc-ftete strong'),
    et = c && c.querySelector('.vc-ftete .vc-etat');
  const choisie = k => { const b = c && c.querySelector('button[data-k="' + k + '"][aria-pressed="true"]'); return b ? b.dataset.v : null; };
  return {p: e ? JSON.parse(JSON.stringify(e.p)) : null, undo: ed.etat.undo.length, n: ed.doc().el.length, titre: t ? t.textContent : '', etat: et ? et.textContent : '',
    puces: c ? [].map.call(c.querySelectorAll('button[data-k="drain"]'), b => b.textContent).join('|') : '', drain: choisie('drain'), res: choisie('res'),
    sens: choisie('sens'), nRes: c ? c.querySelectorAll('button[data-k="res"]').length : -1, nSens: c ? c.querySelectorAll('button[data-k="sens"]').length : -1};
}, [id, PAN]);
const vu = e => JSON.stringify({drain: e.p && e.p.drain, res: e.p && e.p.res, sens: e.p && e.p.sens, undo: e.undo, titre: e.titre, etat: e.etat, puces: e.puces,
  choisie: e.drain, reseau: e.res, nRes: e.nRes, nSens: e.nSens, sensChoisi: e.sens});

async function puces(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    await C.injecter(p, {el: [C.L('T', 'tr', [[0, 0], [8, 0]], {}), C.L('U', 'tr', [[0, 4], [8, 4]], {}, {res: 'UN'})]});
    await C.regler(p, 4, 2, 40);
    await fiche(p, 'T');
    let e = await etat(p, 'T'); const n0 = e.n;
    R.ok(e.titre === 'Tronçon' && e.nRes === 4 && !('drain' in e.p), 'f1 témoin : fiche d\'un tronçon sans drain, en-tête « Tronçon », 4 puces Réseau, pas de clé drain (obtenu ' + vu(e) + ')');
    const e0 = e;
    R.ok(e.puces === 'Non|Collecte|Infiltration' && e.drain === '', 'f1 fiche du tronçon : puces « Drain » Non, Collecte, Infiltration ; « Non » choisie (obtenu ' + vu(e) + ')');
    let u = e.undo, ok = await puce(p, 'drain', 'collecte'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'collecte' && e.p.res === 'EP' && e.undo === u + 1 && e.titre === 'Drain' && e.drain === 'collecte' && e.res === 'EP' && e.nRes === 4,
      'f1 « Collecte » : p.drain \'collecte\' et p.res \'EP\', en un pas d\'annulation ; en-tête « Drain » ; puces Réseau, EP choisie (obtenu ' + vu(e) + ')');
    R.ok(e0.nSens === 3 && e.nSens === 3 && /^Réseau EP · /.test(e.etat),
      'f1 témoin (m122) : 3 puces « Sens d\'écoulement » sur un tronçon et sur un drain de collecte, dont la tête dit « Réseau EP » (obtenu ' + vu(e0) + ' ; ' + vu(e) + ')');
    const r1 = await puce(p, 'res', 'EU'), e1 = await etat(p, 'T'), r2 = await puce(p, 'res', ''), e2 = await etat(p, 'T');
    R.ok(r1 && r2 && e1.p.drain === 'collecte' && e1.p.res === 'EU' && e2.p.drain === 'collecte' && e2.p.res === '' && e2.titre === 'Drain',
      'f1 Réseau EU, puis Déduit : p.drain reste \'collecte\' (obtenu ' + vu(e1) + ' ; ' + vu(e2) + ')');
    await puce(p, 'res', 'EU'); const s1 = await puce(p, 'sens', '1'); u = (await etat(p, 'T')).undo;
    ok = await puce(p, 'drain', 'infiltration'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'infiltration' && e.p.res === '' && e.undo === u + 1 && e.nRes === 0 && e.titre === 'Drain d\'infiltration' && e.drain === 'infiltration',
      'f1 « Infiltration » (après Réseau EU) : p.drain \'infiltration\' et p.res \'\', en un pas ; plus de puces Réseau ; en-tête « Drain d\'infiltration » (obtenu ' + vu(e) + ')');
    R.ok(s1 && /^Dispersion dans le sol · /.test(e.etat) && e.nSens === 0 && e.p.sens === 1,
      'f1 (m122) drain d\'infiltration : la tête dit « Dispersion dans le sol », sans puces « Sens d\'écoulement » ; p.sens (« Sens du tracé », choisi avant) reste au fichier (obtenu '
      + vu(e) + ')');
    ok = await puce(p, 'drain', 'collecte'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'collecte' && e.p.res === 'EP' && e.nRes === 4 && e.nSens === 3 && e.sens === '1',
      'f1 « Collecte » sur le drain d\'infiltration : p.res redevient \'EP\', puces Réseau et puces de sens de retour, « Sens du tracé » choisie (obtenu ' + vu(e) + ')');
    u = e.undo; ok = await puce(p, 'drain', ''); e = await etat(p, 'T');
    R.ok(ok && !('drain' in e.p) && e.p.res === 'EP' && e.undo === u + 1 && e.titre === 'Tronçon' && e.drain === '',
      'f1 « Non » : plus de clé drain, p.res reste \'EP\', en un pas ; en-tête « Tronçon » (obtenu ' + vu(e) + ')');
    u = e.undo; ok = await puce(p, 'drain', ''); e = await etat(p, 'T');
    R.ok(ok && e.undo === u && !('drain' in e.p), 'f1 « Non » de nouveau : rien ne change, aucun pas d\'annulation (obtenu ' + vu(e) + ')');
    const a1 = await annuler(p), ea = await etat(p, 'T'), a2 = await annuler(p), eb = await etat(p, 'T');
    R.ok(a1 && a2 && ea.p.drain === 'collecte' && ea.p.res === 'EP' && eb.p.drain === 'infiltration' && eb.p.res === '',
      'f1 « Annuler », deux fois : collecte en EP, puis infiltration sans réseau (obtenu ' + vu(ea) + ' ; ' + vu(eb) + ')');
    await fiche(p, 'U'); ok = await puce(p, 'drain', 'collecte'); e = await etat(p, 'U');
    R.ok(ok && e.p.drain === 'collecte' && e.p.res === 'UN' && e.res === 'UN', 'f1 un tronçon unitaire passé en « Collecte » reste unitaire (obtenu ' + vu(e) + ')');
    R.ok(e.n === n0 && n0 === 2, 'f1 aucun objet posé ni retiré (' + e.n + ' éléments)');
    R.ok(!A.erreurs.length, 'f1 aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* puces « Méthode de test » de la fiche affichée (nombre, choisies), méthodes du tracé id, pas d'annulation, contrôle de méthode de l'analyse */
const meth = (p, id) => p.evaluate(([id, PAN]) => {
  const ed = window.__vcEd, e = ed.doc().el.find(x => x.id === id), c = document.querySelector(PAN), an = ed.etat.an;
  const bs = c ? [].slice.call(c.querySelectorAll('button[data-k="meth"]')) : [];
  return {n: bs.length, choisies: bs.filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.v).join(','), meth: e && e.p.meth ? e.p.meth.join(',') : '-',
    undo: ed.etat.undo.length, ctl: an && an.controles ? an.controles.filter(x => x.cle === 'meth:' + id).map(x => x.txt).join(' ; ') : '?'};
}, [id, PAN]);
/* plan affiché, choisi par sa puce dans le panneau « Contrôles » ('edl' ou 'avp') ; rend le plan affiché ensuite */
async function plan(p, m){
  await p.evaluate(() => document.querySelector('.vc [data-p="controles"]').click()); await C.pause(p, 250);
  const b = await p.$(PAN + ' button[data-a="mode"][data-v="' + m + '"]'); if (b){ await b.click(); await C.pause(p, 250); }
  return p.evaluate(() => window.__vcEd.etat.mode);
}
/* sources de l'analyse du plan affiché (points sources et drains de collecte comptés) */
const sources = p => p.evaluate(() => Object.keys(window.__vcEd.etat.an.resObj).sort());
async function methodes(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    const s = C.P('s', 'drain', 0, 4, {meth: ['eau'], niv: ''}), q = C.P('q', 'drain', 0, 16, {meth: ['eau'], niv: '', st: 'projet'}), O = C.index([s, q]);
    await C.injecter(p, {el: [s, q, C.L('T', 'tr', [[0, 0], [8, 0]], {}, {res: 'EP', drain: 'collecte'}), C.L('D', 'tr', ['s', [8, 4]], O, {res: 'EP', drain: 'collecte'}),
      C.L('I', 'tr', [[0, 8], [8, 8]], {}, {drain: 'infiltration'}), C.L('U', 'tr', [[0, 12], [8, 12]], {}, {res: 'EP'}),
      C.L('Q', 'tr', ['q', [8, 16]], O, {res: 'EP', drain: 'collecte'})]});
    await C.regler(p, 4, 6, 30);
    await fiche(p, 'T'); let e = await meth(p, 'T');
    R.ok(e.n === 7 && e.choisies === '' && e.ctl === 'Drain : méthode de test à indiquer',
      'f2 fiche du drain de collecte : 7 puces « Méthode de test », aucune choisie ; contrôle « Drain : méthode de test à indiquer » (obtenu ' + JSON.stringify(e) + ')');
    const u = e.undo, ok = await puce(p, 'meth', 'eau'); e = await meth(p, 'T');
    R.ok(ok && e.meth === 'eau' && e.choisies === 'eau' && e.undo === u + 1 && e.ctl === '',
      'f2 « Eau » : p.meth [\'eau\'], en un pas d\'annulation, puce choisie, plus de contrôle de méthode (obtenu ' + JSON.stringify(e) + ')');
    const ok2 = await puce(p, 'meth', 'eau'); e = await meth(p, 'T');
    R.ok(ok2 && e.meth === '' && e.choisies === '' && e.undo === u + 2 && e.ctl === 'Drain : méthode de test à indiquer',
      'f2 « Eau » de nouveau : p.meth [], le contrôle revient (obtenu ' + JSON.stringify(e) + ')');
    const vus = [];
    for (const id of ['D', 'I', 'U']){ await fiche(p, id); vus.push(id + ':' + (await meth(p, id)).n); }
    R.ok(vus.join() === 'D:0,I:0,U:0', 'f2 témoins : pas de puces de méthode sur un drain de collecte qui tient un point « Drain », un drain d\'infiltration, un tronçon EP (obtenu '
      + vus.join(', ') + ')');
    /* point « Drain » « Projet » q sur le 1er sommet du drain de collecte Q : sur l'état des lieux, q n'est pas sur le plan et Q compte (puces
       de méthode, contrôle, que « Eau » lève) ; sur l'avant-projet, q compte à sa place : pas de puces sur Q, comme le dit l'analyse */
    await fiche(p, 'Q'); const q1 = await meth(p, 'Q'), s1 = await sources(p), okq = await puce(p, 'meth', 'eau'), q2 = await meth(p, 'Q');
    R.ok(q1.n === 7 && q1.ctl === 'Drain : méthode de test à indiquer' && s1.indexOf('Q') >= 0 && s1.indexOf('q') < 0 && okq && q2.meth === 'eau' && q2.ctl === '',
      'f2 drain de collecte qui tient un point « Drain » « Projet », sur l\'état des lieux : le drain compte, 7 puces « Méthode de test », contrôle de méthode, que « Eau » lève '
      + '(obtenu ' + JSON.stringify(q1) + ', sources ' + s1.join(',') + ' ; puis ' + JSON.stringify(q2) + ')');
    const m = await plan(p, 'avp'); await fiche(p, 'Q'); const q3 = await meth(p, 'Q'), s3 = await sources(p);
    R.ok(m === 'avp' && q3.n === 0 && q3.ctl === '' && s3.indexOf('q') >= 0 && s3.indexOf('Q') < 0,
      'f2 le même sur l\'avant-projet : le point compte à la place du drain, pas de puces de méthode sur le drain (obtenu plan ' + m + ', ' + JSON.stringify(q3) + ', sources '
      + s3.join(',') + ')');
    R.ok(!A.erreurs.length, 'f2 aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [puces, methodes]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
