// Drains dans la fiche du tronçon, et outils « Drain » et « Drain d'infiltration », dans Chromium (décisions D4, D7 et D10 de la conception
// « Rejets » ; m121 à m124). Données fictives : fond de VCroquis.demoDxf() (12 rue Fictive, Ville-Exemple), croquis vidé ; pour f1, deux
// tronçons libres (T sans réseau, U unitaire).
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
// o1 à o4 (m124, décision D10) : outils « Drain » et « Drain d'infiltration », croquis vidé.
// o1 palette « Tracés » : les deux outils juste après « Projet », les autres dans le même ordre (« Complément du fond » et « Escalier »
//   toujours voisins) ; pictogrammes à peigne (deux chemins), du vert du « Tronçon EP », différents ; choisis : barre d'aide « Drain : … ».
// o2 drain entre deux points libres : p.drain 'collecte', p.res 'EP', aucun objet ajouté, un pas d'annulation ; toast « Drain ajouté » ;
//   barre d'aide « le drain se termine sur un objet » ; second toucher d'habitude : « Drain déjà terminé » ; une ligne « Autres : Drain »
//   au constat déduit ; « Annuler » rend le dessin d'avant (JSON).
// o3 drain d'infiltration depuis une descente : p.res '', étiquette « Dispersion dans le sol » placée, descente ok:DISP, toast « Drain
//   d'infiltration ajouté ».
// o4 tracé trop court (second toucher sur le départ ; deux points confondus, terminerTrace) : ni tracé ni pas d'annulation. Les messages
//   du geste nomment le drain : « Drain abandonné », « Drain d'infiltration abandonné », « Départ du drain posé » (double toucher), « Le
//   drain reviendrait sur le tuyau qu'il prolonge », « Le drain d'infiltration suivrait le tracé de départ » (témoin : « Tronçon
//   abandonné » avec l'outil Tronçon). Depuis le bout libre d'un tuyau, prolongation seulement entre tuyaux du même p.drain : drain au
//   bout d'un Tronçon EP, drain d'infiltration au bout d'un drain de collecte, Tronçon au bout d'un drain de collecte ou d'infiltration :
//   deux lignes reliées par un raccord ; témoins prolongés : Tronçon EP au bout d'un Tronçon EP, drain au bout d'un drain de collecte.
//   Aucune erreur dans la console.
//   Échoue sur f7c2589 : outils absents (o1 ; exceptions dans o2 à o4). Sans la condition du même p.drain, seuls les trois contrôles
//   des deux lignes échouent (le drain prolonge le Tronçon EP : « Tronçon ajouté ») ; avec les messages du geste d'avant la relecture
//   (« Tronçon abandonné »…), seul celui des messages.
// c1 (m142, décision D8 de la conception v1.7.2) : un WC relié par un tronçon au 1er sommet d'un drain d'infiltration de 10 m. À l'écran,
//   le trait et les dents du drain sont rouges (#e00000 : au moins 11 segments, aucun vert le long du drain) ; la tête de sa fiche a un
//   trait rouge, rgb(224,0,0), et garde « Dispersion dans le sol · … », sans puces Réseau ; « Ajouter une anomalie », puis la première
//   suggestion (« Tronçon : présumé cassé ou déboîté ») : l'anomalie part en EU [p], au croquis et au dossier. Aucune erreur dans la console.
//   Échoue sur a7635a4 (drain vert, anomalie en EP), sauf l'absence d'erreur dans la console.
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

/* m124 : outils « Drain » et « Drain d'infiltration » de la palette « Tracés » (décision D10) */
const texteAide = p => p.evaluate(() => { const a = document.querySelector('.vc .vc-aide'); return a && !a.hidden ? a.textContent.replace(/\s+/g, ' ').trim() : ''; });
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
const etatDessin = p => p.evaluate(() => { const d = window.__vcEd.doc(); return JSON.stringify({el: d.el, decisions: d.decisions, ordre: d.ordre, anomManu: d.anomManu}); });
/* tracés (copiés) et objets du croquis, pas d'annulation */
const dessin = p => p.evaluate(() => {
  const ed = window.__vcEd, d = ed.doc();
  return {lignes: d.el.filter(e => e.k === 'ln').map(e => JSON.parse(JSON.stringify(e))), objs: d.el.filter(e => e.k === 'pt').map(e => ({id: e.id, t: e.t, auto: !!e.auto, x: e.x, y: e.y})),
    undo: ed.etat.undo.length};
});
const luLignes = d => JSON.stringify(d.lignes.map(l => ({id: l.id, n: l.v.length, a: l.v.map(v => v.a || '-').join('/'), drain: l.p.drain, res: l.p.res})).concat(d.objs.map(o => o.t)));
/* tracé au doigt avec l'outil id : un toucher à chaque point de pts (coordonnées du croquis), puis un nouveau toucher sur le dernier pour
   terminer ; rend le toast de fin */
async function tracer(p, id, pts){
  await C.outil(p, {k: 'ln', id, pal: 'tr'}); await effacerToast(p);
  for (const q of pts) await C.toucher(p, q[0], q[1]);
  const d = pts[pts.length - 1]; await C.toucher(p, d[0], d[1]);
  return toastVu(p);
}
/* o1 : palette « Tracés » : ordre, libellés, pictogrammes ; aide de l'outil choisi */
async function o1(p){
  const lirePalette = async () => {
    await p.click('.vc .vc-o[data-pal="tr"]'); await C.pause(p, 250);
    return p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => { const s = b.querySelector('svg');
      return {it: b.dataset.item, lib: b.textContent.trim(), svg: s ? s.outerHTML : '', n: s ? s.querySelectorAll('path').length : 0}; }));
  };
  const pal = await lirePalette(), de = it => pal.find(x => x.it === it) || {};
  const ATT = ['ln:tr', 'ln:relier', 'ln:trEU', 'ln:trEP', 'ln:trUN', 'ln:trPres', 'ln:trPrj', 'ln:drain', 'ln:drainInf', 'ln:lim', 'ln:esc'];
  R.ok(pal.map(x => x.it).join() === ATT.join() && de('ln:drain').lib === 'Drain' && de('ln:drainInf').lib === 'Drain d\'infiltration' && de('ln:trPrj').lib.indexOf('Projet') === 0,
    'o1 palette « Tracés » : « Drain » et « Drain d\'infiltration » juste après « Projet » ; les autres outils dans le même ordre, « Complément du fond » et « Escalier » '
    + 'toujours voisins (obtenu ' + JSON.stringify(pal.map(x => x.it + ' ' + x.lib)) + ')');
  const dr = de('ln:drain'), di = de('ln:drainInf'), ep = de('ln:trEP'), vert = (/stroke="([^"]+)"/.exec(ep.svg || '') || [])[1];
  R.ok(dr.n === 2 && di.n === 2 && dr.svg !== di.svg && dr.svg !== ep.svg && !!vert && dr.svg.indexOf(vert) >= 0 && di.svg.indexOf(vert) >= 0,
    'o1 pictogrammes : un trait et un peigne (deux chemins), du vert du « Tronçon EP », différents l\'un de l\'autre et de celui du « Tronçon EP » (obtenu '
    + JSON.stringify({drain: dr.svg, drainInf: di.svg}) + ')');
  if (!dr.it || !di.it){ R.ok(false, 'o1 outils choisis dans la palette : outils absents'); return; }
  await p.click('.vc .vc-pitem[data-item="ln:drain"]'); await C.pause(p, 250);
  const ou1 = await p.evaluate(() => window.__vcEd.etat.outil), a1 = await texteAide(p);
  await lirePalette(); await p.click('.vc .vc-pitem[data-item="ln:drainInf"]'); await C.pause(p, 250);
  const ou2 = await p.evaluate(() => window.__vcEd.etat.outil), a2 = await texteAide(p);
  R.ok(ou1.k === 'ln' && ou1.id === 'drain' && a1.indexOf('Drain : ') === 0 && ou2.k === 'ln' && ou2.id === 'drainInf' && a2.indexOf('Drain d\'infiltration : ') === 0,
    'o1 outils choisis dans la palette ; barre d\'aide « Drain : … », puis « Drain d\'infiltration : … » (obtenu ' + JSON.stringify([ou1, a1, ou2, a2]) + ')');
}
/* o2 : drain entre deux points libres */
async function o2(p){
  await C.injecter(p, {el: []}); await C.regler(p, -2, 0, 40);
  const avant = await etatDessin(p);
  await C.outil(p, {k: 'ln', id: 'drain', pal: 'tr'}); await effacerToast(p);
  await C.toucher(p, -4, 0); const aide1 = await texteAide(p);
  await C.toucher(p, -1, 0); await C.toucher(p, -1, 0);
  const t1 = await toastVu(p);
  /* second toucher d'habitude, juste après la fin : ignoré, avec le message de fin */
  await C.toucher(p, -1, 0); const t2 = await toastVu(p); await C.pause(p, 1100);
  const d = await dessin(p), l = d.lignes[0];
  R.ok(d.lignes.length === 1 && !d.objs.length && l.t === 'tr' && l.p.drain === 'collecte' && l.p.res === 'EP' && l.v.length === 2 && !l.v[0].a && !l.v[1].a && d.undo === 1,
    'o2 drain entre deux points libres : un tracé, p.drain \'collecte\', p.res \'EP\', aucun objet ajouté, en un pas d\'annulation (obtenu ' + luLignes(d) + ', ' + d.undo + ' pas)');
  R.ok(/^Drain ajouté/.test(t1) && /^Drain : 1 point\./.test(aide1) && aide1.indexOf('le drain se termine sur un objet') > 0,
    'o2 toast « Drain ajouté » ; barre d\'aide « Drain : 1 point. … le drain se termine sur un objet » (obtenu ' + JSON.stringify([t1, aide1]) + ')');
  R.ok(/^Drain déjà terminé\./.test(t2), 'o2 second toucher juste après la fin : « Drain déjà terminé. » (obtenu ' + JSON.stringify(t2) + ')');
  const cd = await p.evaluate(() => { const V = window.VCroquis, c = () => JSON.parse(JSON.stringify(window.__vcEd.doc())), r = V.constatDeduit(c(), V.analyser(c(), 'edl'));
    return r.rows.filter(x => !x.std && x.nb).map(x => x.label + ' ×' + x.nb); });
  R.ok(cd.join() === 'Drain ×1', 'o2 constat déduit : une ligne « Autres : Drain » (obtenu ' + (cd.join(', ') || 'aucune ligne « Autres »') + ')');
  const ok = await annuler(p), apres = await etatDessin(p);
  R.ok(ok && apres === avant, 'o2 une annulation rend le dessin d\'avant (JSON identique)' + (apres === avant ? '' : ' : ' + apres.slice(0, 200)));
}
/* o3 : drain d'infiltration depuis une descente */
async function o3(p){
  await C.injecter(p, {el: [C.P('s', 'descente', -4, 0)]}); await C.regler(p, -2, 0, 40);
  const t = await tracer(p, 'drainInf', [[-4, 0], [-1, 0]]); await C.pause(p, 1100);
  const r = await p.evaluate(() => {
    const ed = window.__vcEd, V = window.VCroquis, d = ed.doc(), an = ed.etat.an, l = d.el.find(e => e.k === 'ln'), s = an.resObj.s;
    return {l: l ? JSON.parse(JSON.stringify(l)) : null, objs: d.el.filter(e => e.k === 'pt').map(e => e.t).join(), etiq: l ? V.texteEtiquette(l, an) : null, s: s ? s.etat + ':' + s.res : '-'};
  });
  const l = r.l || {p: {}, v: []};
  R.ok(!!r.l && l.p.drain === 'infiltration' && l.p.res === '' && l.v.length === 2 && l.v[0].a === 's' && !l.v[1].a && r.objs === 'descente',
    'o3 drain d\'infiltration depuis une descente : p.drain \'infiltration\', p.res \'\', parti de la descente, aucun objet ajouté (obtenu ' + JSON.stringify(r) + ')');
  R.ok(!!l.lab && !l.lab.off && r.etiq === 'Dispersion dans le sol', 'o3 étiquette « Dispersion dans le sol » placée (obtenu ' + JSON.stringify([l.lab, r.etiq]) + ')');
  R.ok(r.s === 'ok:DISP', 'o3 descente ok:DISP (obtenu ' + r.s + ')');
  R.ok(/^Drain d'infiltration ajouté/.test(t), 'o3 toast « Drain d\'infiltration ajouté » (obtenu ' + JSON.stringify(t) + ')');
}
/* o4 : tracé trop court ; prolongation, seulement entre tuyaux du même p.drain */
async function o4(p){
  await C.injecter(p, {el: []}); await C.regler(p, -2, 0, 40);
  const j0 = await etatDessin(p);
  /* au doigt : second toucher sur le départ (le tracé est abandonné) */
  await C.outil(p, {k: 'ln', id: 'drain', pal: 'tr'}); await effacerToast(p); await C.toucher(p, -3, 0); await C.toucher(p, -3, 0);
  const g = await p.evaluate(() => ({brouillon: !!window.__vcEd.etat.brouillon, undo: window.__vcEd.etat.undo.length})), j1 = await etatDessin(p), tAb = await toastVu(p);
  /* deux points confondus, fin par terminerTrace */
  await effacerToast(p);
  const z = await p.evaluate(() => {
    const ed = window.__vcEd, S = ed.etat, u = S.undo.length, q = {x: 2, y: 2, snap: null, aide: null, doigt: null};
    let err = null; try { ed.choisirOutil({k: 'ln', id: 'drain', pal: 'tr'}); S.brouillon = {outil: 'drain', pts: [q, Object.assign({}, q)]}; ed.terminerTrace(); } catch (e){ err = e.message; }
    return {err, n: ed.doc().el.length, pas: S.undo.length - u, brouillon: !!S.brouillon};
  });
  const tz = await toastVu(p), j2 = await etatDessin(p);
  R.ok(!g.brouillon && !g.undo && j1 === j0 && !z.err && z.n === 0 && z.pas === 0 && !z.brouillon && j2 === j0 && tz.indexOf('ajouté') < 0,
    'o4 tracé trop court (second toucher sur le départ ; deux points confondus, terminerTrace) : ni tracé ni pas d\'annulation, sans exception ni toast de fin (obtenu '
    + JSON.stringify([g, z, tz]) + ')');
  /* messages du geste (relecture de m124) : ils nomment le drain ; témoin : « Tronçon » avec l'outil Tronçon. Un toucher par point de pts,
     le premier suivi de ms (60 : double toucher) */
  const geste = async (outil, el, pts, ms) => {
    await C.injecter(p, {el}); await C.regler(p, -2, 0, 40); await C.outil(p, {k: 'ln', id: outil, pal: 'tr'}); await effacerToast(p);
    for (let k = 0; k < pts.length; k++) await C.toucher(p, pts[k][0], pts[k][1], k ? null : ms);
    return toastVu(p);
  };
  const msg = {abandon: tAb, abandonInf: await geste('drainInf', [], [[-3, 0], [-3, 0]]), temoin: await geste('tr', [], [[-3, 0], [-3, 0]]),
    depart: await geste('drain', [], [[-3, 0], [-3, 0]], 60),
    revient: await geste('drain', [C.L('A', 'tr', [[-6, 0], [-3, 0]], {}, {res: 'EP', drain: 'collecte'})], [[-3, 0], [-1, 2], [-5, 0]]),
    suit: await geste('drainInf', [C.L('A', 'tr', [[-6, 0], [-1, 0]], {}, {res: 'EP'})], [[-5, 0], [-3, 0]])};
  R.ok(/^Drain abandonné/.test(msg.abandon) && /^Drain d'infiltration abandonné/.test(msg.abandonInf) && /^Tronçon abandonné/.test(msg.temoin)
    && /^Départ du drain posé : /.test(msg.depart) && /^Le drain reviendrait sur le tuyau qu'il prolonge : /.test(msg.revient)
    && /^Le drain d'infiltration suivrait le tracé de départ : /.test(msg.suit),
    'o4 messages du geste : « Drain abandonné », « Drain d\'infiltration abandonné », « Départ du drain posé » (double toucher), « Le drain '
    + 'reviendrait sur le tuyau qu\'il prolonge », « Le drain d\'infiltration suivrait le tracé de départ » ; témoin : « Tronçon abandonné » avec '
    + 'l\'outil Tronçon (obtenu ' + JSON.stringify(msg) + ')');
  /* depuis le bout libre d'un tuyau A (de -6 à -3 m) : prolongé s'il a le même p.drain, sinon un nouveau tuyau part d'un raccord posé sur ce bout */
  const cas = async (pa, outil) => {
    await C.injecter(p, {el: [C.L('A', 'tr', [[-6, 0], [-3, 0]], {}, pa)]}); await C.regler(p, -2, 0, 40);
    const t = await tracer(p, outil, [[-3, 0], [0, 0]]); await C.pause(p, 1100);
    return {t, d: await dessin(p)};
  };
  const deux = (k, att) => { const d = k.d, A = d.lignes.find(l => l.id === 'A'), N = d.lignes.find(l => l.id !== 'A'), j = d.objs[0];
    return d.lignes.length === 2 && d.objs.length === 1 && j.t === 'jonction' && j.auto && !!A && A.v.length === 2 && sorteDe(A) === att.a && !!N && N.v.length === 2
      && N.v[0].a === j.id && A.v[1].a === j.id && sorteDe(N) === att.n && N.p.res === att.res; };
  const une = (k, att) => { const d = k.d, A = d.lignes[0];
    return d.lignes.length === 1 && !d.objs.length && A.id === 'A' && A.v.length === 3 && sorteDe(A) === att && Math.hypot(A.v[2].x, A.v[2].y) < 0.05; };
  const b = await cas({res: 'EP'}, 'drain');
  R.ok(deux(b, {a: '', n: 'collecte', res: 'EP'}) && /^Drain ajouté/.test(b.t),
    'o4 drain depuis le bout libre d\'un Tronçon EP : deux lignes, reliées par un raccord ; le Tronçon EP inchangé, sans drain ; le nouveau, drain de collecte EP ; toast « Drain ajouté » (obtenu '
    + luLignes(b.d) + ', ' + JSON.stringify(b.t) + ')');
  const c = await cas({res: 'EP'}, 'trEP');
  R.ok(une(c, ''), 'o4 témoin : Tronçon EP depuis le bout libre d\'un Tronçon EP : prolongé, une seule ligne (obtenu ' + luLignes(c.d) + ')');
  const dd = await cas({res: 'EP', drain: 'collecte'}, 'drain');
  R.ok(une(dd, 'collecte') && /^Drain ajouté/.test(dd.t), 'o4 drain depuis le bout libre d\'un drain de collecte : prolongé, une seule ligne, toujours drain de collecte (obtenu '
    + luLignes(dd.d) + ', ' + JSON.stringify(dd.t) + ')');
  const e = await cas({res: 'EP', drain: 'collecte'}, 'drainInf');
  R.ok(deux(e, {a: 'collecte', n: 'infiltration', res: ''}), 'o4 drain d\'infiltration depuis le bout libre d\'un drain de collecte : deux lignes, reliées par un raccord (obtenu '
    + luLignes(e.d) + ')');
  /* l'autre sens (relecture de m124) : un Tronçon ne prolonge pas non plus un drain */
  const f = await cas({res: 'EP', drain: 'collecte'}, 'tr'), h = await cas({res: '', drain: 'infiltration'}, 'tr');
  R.ok(deux(f, {a: 'collecte', n: '', res: ''}) && /^Tronçon ajouté/.test(f.t) && deux(h, {a: 'infiltration', n: '', res: ''}) && /^Tronçon ajouté/.test(h.t),
    'o4 Tronçon depuis le bout libre d\'un drain de collecte, puis d\'un drain d\'infiltration : deux lignes, reliées par un raccord ; le drain garde ses deux '
    + 'sommets ; toast « Tronçon ajouté » (obtenu ' + luLignes(f.d) + ', ' + JSON.stringify(f.t) + ', ' + luLignes(h.d) + ', ' + JSON.stringify(h.t) + ')');
}
const sorteDe = l => l.p.drain === 'collecte' || l.p.drain === 'infiltration' ? l.p.drain : '';
async function outils(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    for (const f of [o1, o2, o3, o4]){
      try { await f(p); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
    }
    R.ok(!A.erreurs.length, 'o aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* c1 (m142, décision D8 de la conception v1.7.2) : drain d'infiltration relié au seul WC, rouge à l'écran et dans la tête de sa fiche ;
   anomalie saisie à la main sur lui : réseau EU [p] */
const ROUGE = '#e00000', VERT = '#00a050';
/* segments du canevas redessiné (tous les chemins, avec la couleur du trait) dont les deux bouts sont à moins de r px du segment [a, b] du
   croquis ; seulement ceux du rouge EU et du vert EP (le fond de plan et le reste ont d'autres couleurs) */
async function traitsLe(p, a, b, r){
  await p.evaluate(() => {
    const P = CanvasRenderingContext2D.prototype; window.__espD = [];
    if (P.__espDrain) return;
    const o = P.__espDrain = {beginPath: P.beginPath, moveTo: P.moveTo, lineTo: P.lineTo, stroke: P.stroke}; let cur = [], der = null;
    P.beginPath = function(){ cur = []; der = null; return o.beginPath.apply(this, arguments); };
    P.moveTo = function(x, y){ der = [x, y]; return o.moveTo.apply(this, arguments); };
    P.lineTo = function(x, y){ if (der) cur.push([der, [x, y]]); der = [x, y]; return o.lineTo.apply(this, arguments); };
    P.stroke = function(){ const E = window.__espD, c = String(this.strokeStyle); if (E && E.length < 20000) cur.forEach(s => E.push({a: s[0], b: s[1], coul: c})); return o.stroke.apply(this, arguments); };
  });
  await p.evaluate(() => { window.__espD = []; window.__vcEd.redessiner(); });
  await C.pause(p, 200);
  return p.evaluate(([a, b, r]) => {
    const E = window.__espD || [], V = window.__vcEd.etat.vue, A = V.ecran(a[0], a[1]), B = V.ecran(b[0], b[1]); window.__espD = null;
    const ux = B.x - A.x, uy = B.y - A.y, L2 = ux * ux + uy * uy;
    const d = q => { const t = Math.max(0, Math.min(1, ((q[0] - A.x) * ux + (q[1] - A.y) * uy) / L2)); return Math.hypot(q[0] - A.x - t * ux, q[1] - A.y - t * uy); };
    return E.filter(s => d(s.a) <= r && d(s.b) <= r && /^#(e00000|00a050)$/.test(s.coul)).map(s => s.coul);
  }, [a, b, r]);
}
async function couleur(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
    const w = C.P('w', 'wc', 0, 8), j = C.J('J', 0, 0), I = C.index([w, j]);
    await C.injecter(p, {el: [w, j, C.L('L', 'tr', ['w', 'J'], I), C.L('T', 'tr', ['J', [10, 0]], I, {drain: 'infiltration'})]});
    await C.regler(p, 5, 3, 40);
    const eaux = await p.evaluate(() => { const a = window.__vcEd.etat.an; return a && a.eauxDrains ? JSON.stringify(a.eauxDrains) : 'absent'; });
    /* le long du drain (à moins de 0,5 m), avant de le choisir (sa sélection se dessine par-dessus) : son trait et ses 10 dents */
    const t = await traitsLe(p, [0, 0], [10, 0], .5 * 40), n = c => t.filter(x => x === c).length;
    R.ok(n(ROUGE) >= 11 && !n(VERT),
      'c1 écran : le drain d\'infiltration relié au seul WC est rouge, trait et dents (' + ROUGE + '), sans trait vert le long du drain (obtenu ' + n(ROUGE) + ' rouge(s), '
      + n(VERT) + ' vert(s) ; an.eauxDrains ' + eaux + ')');
    await fiche(p, 'T');
    const f = await p.evaluate(PAN => {
      const c = document.querySelector(PAN), s = c && c.querySelector('.vc-ftete svg path'), e = c && c.querySelector('.vc-ftete .vc-etat');
      return {trait: s ? s.getAttribute('stroke') : '', etat: e ? e.textContent : '', nRes: c ? c.querySelectorAll('button[data-k="res"]').length : -1};
    }, PAN);
    R.ok(f.trait === 'rgb(224,0,0)' && /^Dispersion dans le sol · /.test(f.etat) && f.nRes === 0,
      'c1 tête de la fiche du drain : trait rouge rgb(224,0,0), « Dispersion dans le sol · … » (texte inchangé), puces Réseau toujours masquées (obtenu ' + JSON.stringify(f) + ')');
    /* « Ajouter une anomalie », puis la première suggestion des tronçons : son réseau suit la couleur du drain [p] */
    const b1 = await p.$(PAN + ' button[data-a="anomAjout"]'); if (b1){ await b1.click(); await C.pause(p, 250); }
    const b2 = await p.$(PAN + ' button[data-a="anomLib"][data-i="0"]'); if (b2){ await b2.click(); await C.pause(p, 500); }
    const m = await p.evaluate(() => (window.__vcEd.doc().anomManu || []).map(a => ({objId: a.objId, reseau: a.reseau, obs: a.obs})));
    const dos = await C.dossierAnomalies(p), dm = dos.find(a => /présumé cassé ou déboîté/.test(a.obs || ''));
    R.ok(!!b1 && !!b2 && m.length === 1 && m[0].objId === 'T' && m[0].reseau === 'EU' && m[0].obs === 'Tronçon : présumé cassé ou déboîté' && !!dm && dm.reseau === 'EU',
      'c1 anomalie saisie à la main sur ce drain (« Tronçon : présumé cassé ou déboîté ») : réseau EU, comme son trait [p] (v1.7.1 : EP), au croquis et au dossier (obtenu '
      + JSON.stringify(m) + ' ; dossier ' + JSON.stringify(dm || null) + (b1 && b2 ? '' : ' ; bouton absent') + ')');
    R.ok(!A.erreurs.length, 'c1 aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [puces, methodes, outils, couleur]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
