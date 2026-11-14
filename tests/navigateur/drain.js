// Drains dans la fiche du tronçon, dans Chromium (décisions D4 et D10 de la conception « Rejets » ; m121). Données fictives : fond de
// VCroquis.demoDxf() (12 rue Fictive, Ville-Exemple), croquis vidé, deux tronçons libres (T sans réseau, U unitaire).
// f1 : la fiche de T a les puces « Drain » (Non, Collecte, Infiltration), « Non » choisie. « Collecte » : p.drain 'collecte' et p.res 'EP', en un
//   pas d'annulation, en-tête « Drain » ; Réseau EU, puis Déduit : p.drain reste ; « Infiltration » (après Réseau EU) : p.drain 'infiltration' et
//   p.res '', en un pas, plus de puces Réseau, en-tête « Drain d'infiltration » ; « Collecte » y remet EP ; « Non » : plus de clé drain, p.res
//   reste EP, en-tête « Tronçon » ; « Non » de nouveau : aucun pas d'annulation ; « Annuler », deux fois : collecte en EP, puis infiltration sans
//   réseau. U passé en « Collecte » reste unitaire. Aucun objet posé ni retiré ; aucune erreur dans la console.
// Échoue sur b7ad8a4 (pas de puces « Drain »), sauf le témoin (fiche d'un tronçon sans drain), l'absence d'objet posé ou retiré et
// l'absence d'erreur dans la console.
'use strict';
const C = require('./commun.js');
const R = C.rapport('drain');
const PAN = '.vc .vc-panneau:not([hidden]) .vc-pcorps';

async function fiche(p, id){ await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250); }
/* toucher une puce de la fiche ; faux, sans attendre, si elle manque */
async function puce(p, k, v){ const b = await p.$(PAN + ' button[data-k="' + k + '"][data-v="' + v + '"]'); if (!b) return false; await b.click(); await C.pause(p, 200); return true; }
async function annuler(p){ const b = await p.$('.vc .vc-barre [data-a="annuler"]:not([disabled])'); if (!b) return false; await b.click(); await C.pause(p, 250); return true; }
/* propriétés du tracé id, pas d'annulation, nombre d'éléments ; fiche affichée : titre, puces « Drain », puce choisie de Drain et de Réseau,
   nombre de puces Réseau */
const etat = (p, id) => p.evaluate(([id, PAN]) => {
  const ed = window.__vcEd, e = ed.doc().el.find(x => x.id === id), c = document.querySelector(PAN), t = c && c.querySelector('.vc-ftete strong');
  const choisie = k => { const b = c && c.querySelector('button[data-k="' + k + '"][aria-pressed="true"]'); return b ? b.dataset.v : null; };
  return {p: e ? JSON.parse(JSON.stringify(e.p)) : null, undo: ed.etat.undo.length, n: ed.doc().el.length, titre: t ? t.textContent : '',
    puces: c ? [].map.call(c.querySelectorAll('button[data-k="drain"]'), b => b.textContent).join('|') : '', drain: choisie('drain'), res: choisie('res'),
    nRes: c ? c.querySelectorAll('button[data-k="res"]').length : -1};
}, [id, PAN]);
const vu = e => JSON.stringify({drain: e.p && e.p.drain, res: e.p && e.p.res, undo: e.undo, titre: e.titre, puces: e.puces, choisie: e.drain, reseau: e.res, nRes: e.nRes});

async function puces(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    await C.injecter(p, {el: [C.L('T', 'tr', [[0, 0], [8, 0]], {}), C.L('U', 'tr', [[0, 4], [8, 4]], {}, {res: 'UN'})]});
    await C.regler(p, 4, 2, 40);
    await fiche(p, 'T');
    let e = await etat(p, 'T'); const n0 = e.n;
    R.ok(e.titre === 'Tronçon' && e.nRes === 4 && !('drain' in e.p), 'f1 témoin : fiche d\'un tronçon sans drain, en-tête « Tronçon », 4 puces Réseau, pas de clé drain (obtenu ' + vu(e) + ')');
    R.ok(e.puces === 'Non|Collecte|Infiltration' && e.drain === '', 'f1 fiche du tronçon : puces « Drain » Non, Collecte, Infiltration ; « Non » choisie (obtenu ' + vu(e) + ')');
    let u = e.undo, ok = await puce(p, 'drain', 'collecte'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'collecte' && e.p.res === 'EP' && e.undo === u + 1 && e.titre === 'Drain' && e.drain === 'collecte' && e.res === 'EP' && e.nRes === 4,
      'f1 « Collecte » : p.drain \'collecte\' et p.res \'EP\', en un pas d\'annulation ; en-tête « Drain » ; puces Réseau, EP choisie (obtenu ' + vu(e) + ')');
    const r1 = await puce(p, 'res', 'EU'), e1 = await etat(p, 'T'), r2 = await puce(p, 'res', ''), e2 = await etat(p, 'T');
    R.ok(r1 && r2 && e1.p.drain === 'collecte' && e1.p.res === 'EU' && e2.p.drain === 'collecte' && e2.p.res === '' && e2.titre === 'Drain',
      'f1 Réseau EU, puis Déduit : p.drain reste \'collecte\' (obtenu ' + vu(e1) + ' ; ' + vu(e2) + ')');
    await puce(p, 'res', 'EU'); u = (await etat(p, 'T')).undo;
    ok = await puce(p, 'drain', 'infiltration'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'infiltration' && e.p.res === '' && e.undo === u + 1 && e.nRes === 0 && e.titre === 'Drain d\'infiltration' && e.drain === 'infiltration',
      'f1 « Infiltration » (après Réseau EU) : p.drain \'infiltration\' et p.res \'\', en un pas ; plus de puces Réseau ; en-tête « Drain d\'infiltration » (obtenu ' + vu(e) + ')');
    ok = await puce(p, 'drain', 'collecte'); e = await etat(p, 'T');
    R.ok(ok && e.p.drain === 'collecte' && e.p.res === 'EP' && e.nRes === 4, 'f1 « Collecte » sur le drain d\'infiltration : p.res redevient \'EP\', puces Réseau de retour (obtenu ' + vu(e) + ')');
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

(async () => {
  for (const f of [puces]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
