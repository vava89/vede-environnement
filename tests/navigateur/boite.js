// Boîte de branchement en limite de propriété dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de
// VCroquis.demoDxf()) : correctifs m103 (souhait 10, décision D4 de .claude/conception-outils-dessin.md) et m104 (décision D5).
// f : la fiche d'une boîte a un bloc « Limite de propriété » juste après le champ Réseau : puces Intérieur | Extérieur et saisie de la
//     distance en mètres (clavier décimal) ; témoins : celles d'un regard et d'un regard public n'en ont pas ;
// c : les puces s'enregistrent dans p.limCote ('int', 'ext'), un pas d'annulation par toucher ; un second toucher sur la puce choisie
//     l'efface, comme pour le tampon (témoin) ;
// d : la distance saisie s'enregistre dans p.limDist (« 0,80 »), un pas d'annulation par saisie, comme la profondeur (témoin) ; « -1 » et
//     un texte non numérique sont refusés avec le toast des valeurs refusées (rien ne change) ; vide permis ; « Annuler » rend chaque
//     valeur précédente ;
// e : à l'écran, l'étiquette de la boîte porte la ligne de la limite ;
// t : témoin : la boîte changée en regard perd ses deux champs, avec le toast du changement de type ; « Annuler » les rétablit.
// f, c, d et e échouent sur df95377 (sauf les témoins) ; t passe sur les deux versions (le toast existant couvre ce cas).
// m104 : côté et distance proposés depuis le plan. La boîte est posée près du milieu du côté rue d'une parcelle du fond fictif, avec un WC
// et un regard dans la même parcelle, qui devient la parcelle de l'installation :
// p : boîte à 0,80 m à l'intérieur : la fiche dit « Sur le plan : ≈ 0,80 m intérieur » ; tant que p.limCote est vide, la puce Intérieur est
//     en pointillé (classe vc-propose), sans être choisie, sans champ écrit ni pas d'annulation ; « Placer sur le plan » est grisé ; la saisie
//     du technicien l'emporte : « Extérieur » choisi, plus aucune puce n'est en pointillé, et « Placer sur le plan » reste grisé sans
//     distance ; un « Annuler » rend la proposition ;
// r : « Reprendre la mesure » écrit p.limDist « 0,80 » et p.limCote 'int' en un seul pas ; la puce choisie n'est plus en pointillé ; un seul
//     « Annuler » efface les deux ;
// a : distance saisie 1,00 : « Placer sur le plan » met la boîte à 1,00 m de la limite (au centimètre), à l'intérieur, en un seul pas ; le
//     bout de tuyau attaché suit, l'autre bout reste ; la distance et le côté ne changent pas ; un seul « Annuler » ramène la boîte et le bout ;
// g : la boîte glissée au doigt le long de la limite garde p.limDist et p.limCote ; la ligne du plan donne la mesure de la nouvelle position ;
// u : distance effacée (« Placer sur le plan » grisé), puis tapée au clavier : le bouton suit la frappe ; un seul toucher sur lui, sans
//     quitter le champ avant, enregistre la distance et place la boîte à 0,50 m (un pas pour chacun) ;
// o : boîte à 0,20 m : « côté à confirmer », aucune puce proposée ; « Reprendre la mesure » reprend la distance, pas le côté ; « Placer sur le
//     plan » reste grisé ;
// v : fond masqué : ni ligne « Sur le plan » ni proposition, boutons grisés ;
// k : boîte dans la rue, en face d'un coin de la parcelle : « Placer sur le plan » ne la déplace pas et l'explique (toast) ;
// b : boîte qui arriverait plus près d'un autre bord de la limite (Intérieur, 1,00 m) : à l'intérieur, à 0,80 m de la rue et à 0,50 m du
//     côté voisin ; dans la rue, à 1 cm du coin : « Placer sur le plan » ne la déplace pas et l'explique (toast), sans pas d'annulation ;
//     témoin : la boîte de la rue, avec Extérieur, va bien à 1,00 m de la limite (coin saillant) ;
// s : boîte et WC dans la rue, hors de toute parcelle : ni ligne ni proposition, boutons grisés même avec la distance et le côté saisis ; un
//     toucher sur eux ne change rien.
// p, r, a, g, u, o, v, k, b et s échouent sur 5026c32 (ni ligne « Sur le plan » ni boutons), sauf les témoins où rien n'est écrit et rien ne
// bouge.
// usage : node tests/navigateur/boite.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('boite');

/* Dossier neuf et croquis ouvert sur le fond fictif. */
async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
const REG = {tampon: '', cunette: '', acces: '', dim: '', prof: '', meth: []};
/* boîte EU, regard et regard public, étiquette de la boîte placée d'office (lab : null) ; vue centrée sur la boîte */
async function poser(p, q){
  const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
  const B1 = C.P('B1', 'boite', cx, cy, Object.assign({res: 'EU'}, REG, q || {})); B1.lab = null;
  await C.injecter(p, {el: [B1, C.P('R1', 'regard', cx + 4, cy, REG), C.P('Rp', 'regard_pub', cx - 4, cy, {res: 'EU'})]});
  await C.regler(p, cx, cy, 40);
}
async function choisir(p, id){ await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 300); }
const elDoc = async (p, id) => (await C.docCroquis(p)).el.find(e => e.id === id);
const nUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
/* fiche affichée : libellés des champs dans l'ordre, puces du côté, saisie de la distance */
const fiche = p => p.evaluate(() => {
  const c = document.querySelector('.vc .vc-pcorps'), i = c && c.querySelector('input[data-k="limDist"]');
  if (!c) return {champs: [], puces: [], saisie: null};
  return {champs: Array.from(c.querySelectorAll('.vc-champ > .vc-lab')).map(l => (l.firstChild && l.firstChild.textContent || '').trim()),
    puces: Array.from(c.querySelectorAll('[data-a="prop"][data-k="limCote"]')).map(b => b.dataset.v + ':' + b.textContent + ':' + b.getAttribute('aria-pressed')),
    saisie: i ? {mode: i.getAttribute('inputmode'), a: i.dataset.a, val: i.value} : null};
});
const puce = (k, v) => '.vc .vc-pcorps button.vc-chip[data-a="prop"][data-k="' + k + '"][data-v="' + v + '"]';
async function toucherPuce(p, k, v){ const b = await p.$(puce(k, v)); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
/* saisie d'un champ de la fiche, enregistrée quand il perd le focus (événement change) */
async function saisir(p, k, v){
  const i = await p.$('.vc .vc-pcorps input[data-k="' + k + '"]'); if (!i) return false;
  await i.fill(v); await i.evaluate(x => x.blur()); await C.pause(p, 250); return true;
}
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
/* toast effacé avant une saisie : il reste affiché 2,6 s, on ne lit ensuite que celui de cette saisie */
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
const valeur = async (p, k) => p.evaluate(k => { const i = document.querySelector('.vc .vc-pcorps input[data-k="' + k + '"]'); return i ? i.value : null; }, k);
const champs = e => e ? JSON.stringify({limCote: e.p.limCote, limDist: e.p.limDist}) : 'absente';

/* f, c, d, e : fiche, puces, saisie et étiquette à l'écran */
async function fiches(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await poser(p);
    await choisir(p, 'B1');
    const f = await fiche(p), iR = f.champs.indexOf('Réseau'), iL = f.champs.indexOf('Limite de propriété');
    R.ok(iR >= 0 && iL === iR + 1, 'f : boîte : bloc « Limite de propriété » juste après le champ Réseau (champs ' + JSON.stringify(f.champs) + ')');
    R.ok(f.puces.join(' | ') === 'int:Intérieur:false | ext:Extérieur:false', 'f : boîte : puces Intérieur | Extérieur, aucune choisie (' + f.puces.join(' | ') + ')');
    R.ok(!!f.saisie && f.saisie.mode === 'decimal' && f.saisie.a === 'propTxt' && f.saisie.val === '', 'f : boîte : saisie de la distance au clavier décimal, vide ('
      + JSON.stringify(f.saisie) + ')');
    for (const [id, nom] of [['R1', 'regard'], ['Rp', 'regard public']]){
      await choisir(p, id);
      const g = await fiche(p);
      R.ok(g.champs.length > 0 && g.champs.indexOf('Limite de propriété') < 0 && !g.puces.length && !g.saisie, 'f : témoin : ' + nom + ' : pas de bloc « Limite de propriété » (champs '
        + JSON.stringify(g.champs) + ')');
    }

    /* c : puces */
    await choisir(p, 'B1');
    const u0 = await nUndo(p), okI = await toucherPuce(p, 'limCote', 'int'), b1 = await elDoc(p, 'B1'), u1 = await nUndo(p), f1 = await fiche(p);
    R.ok(okI && b1.p.limCote === 'int' && u1 === u0 + 1 && f1.puces[0] === 'int:Intérieur:true', 'c : « Intérieur » : p.limCote = int, un pas d\'annulation ('
      + champs(b1) + ', pas ' + u0 + ' puis ' + u1 + ', puces ' + f1.puces.join(' | ') + ')');
    const okE = await toucherPuce(p, 'limCote', 'ext'), b2 = await elDoc(p, 'B1'), u2 = await nUndo(p);
    R.ok(okE && b2.p.limCote === 'ext' && u2 === u1 + 1, 'c : « Extérieur » : p.limCote = ext, un pas d\'annulation (' + champs(b2) + ', pas ' + u1 + ' puis ' + u2 + ')');
    await toucherPuce(p, 'limCote', 'ext'); const b3 = await elDoc(p, 'B1'), u3 = await nUndo(p);
    await toucherPuce(p, 'tampon', 'fonte'); await toucherPuce(p, 'tampon', 'fonte'); const t3 = await elDoc(p, 'B1'), u4 = await nUndo(p);
    R.ok(b3.p.limCote === '' && u3 === u2 + 1 && t3.p.tampon === '' && u4 === u3 + 2, 'c : second toucher sur la puce choisie : effacée, un pas d\'annulation, comme pour le tampon (côté '
      + JSON.stringify(b3.p.limCote) + ', pas ' + u2 + ' puis ' + u3 + ' ; tampon ' + JSON.stringify(t3.p.tampon) + ', pas ' + u3 + ' puis ' + u4 + ' pour deux touchers)');
    await toucherPuce(p, 'limCote', 'int');

    /* d : saisie de la distance */
    const v0 = await nUndo(p), okS = await saisir(p, 'limDist', '0,80'), d1 = await elDoc(p, 'B1'), v1 = await nUndo(p);
    R.ok(okS && d1.p.limDist === '0,80' && v1 === v0 + 1, 'd : « 0,80 » saisi : p.limDist = « 0,80 », un pas d\'annulation (' + champs(d1) + ', pas ' + v0 + ' puis ' + v1 + ')');
    await saisir(p, 'prof', '1,20'); const vP = await nUndo(p), dP = await elDoc(p, 'B1');
    R.ok(dP.p.prof === '1,20' && vP === v1 + 1, 'd : témoin : la profondeur saisie fait aussi un pas d\'annulation (pas ' + v1 + ' puis ' + vP + ')');
    for (const mauvais of ['-1', 'loin']){
      await effacerToast(p);
      const w0 = await nUndo(p), okM = await saisir(p, 'limDist', mauvais), msg = await toastVu(p), d2 = await elDoc(p, 'B1'), w1 = await nUndo(p), val = await valeur(p, 'limDist');
      R.ok(okM && d2.p.limDist === '0,80' && w1 === w0 && val === '0,80' && msg === 'Nombre attendu, par exemple 0,80', 'd : « ' + mauvais + ' » refusé : toast '
        + JSON.stringify(msg) + ', p.limDist ' + JSON.stringify(d2.p.limDist) + ', champ ' + JSON.stringify(val) + ', pas ' + w0 + ' puis ' + w1);
    }
    /* e : étiquette à l'écran (textes écrits sur le canevas au dessin suivant) */
    await p.evaluate(() => { window.__textes = []; const f = CanvasRenderingContext2D.prototype.fillText; CanvasRenderingContext2D.prototype.fillText = function(t){ window.__textes.push(String(t)); return f.apply(this, arguments); }; window.__vcEd.redessiner(); });
    await C.pause(p, 300);
    const tx = await p.evaluate(() => window.__textes);
    R.ok(tx.indexOf('à 0,80 m de la limite, intérieur') >= 0 && tx.some(t => /^Boîte de branchement/.test(t)), 'e : à l\'écran, l\'étiquette de la boîte porte la ligne « à 0,80 m de la limite, intérieur » ('
      + JSON.stringify(tx.filter(t => /Boîte|limite/.test(t))) + ')');
    const x0 = await nUndo(p); await saisir(p, 'limDist', ''); const d3 = await elDoc(p, 'B1'), x1 = await nUndo(p);
    R.ok(d3.p.limDist === '' && x1 === x0 + 1, 'd : vide permis : p.limDist = « » (' + champs(d3) + ', pas ' + x0 + ' puis ' + x1 + ')');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); const a1 = await elDoc(p, 'B1');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); const a2 = await elDoc(p, 'B1');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); const a3 = await elDoc(p, 'B1');
    R.ok(a1.p.limDist === '0,80' && a2.p.prof === '' && a2.p.limDist === '0,80' && !a3.p.limDist, 'd : « Annuler » : la distance revient à « 0,80 », puis la profondeur s\'efface, puis la distance ('
      + [a1, a2, a3].map(e => JSON.stringify(e.p.limDist) + '/' + JSON.stringify(e.p.prof)).join(', ') + ')');
    erreurs(A, 'f, c, d, e');
  } finally { await A.fermer(); }
}

/* t : témoin : changement de type d'une boîte qui porte les deux champs */
async function type(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await poser(p, {res: '', limCote: 'int', limDist: '0,80'});
    await choisir(p, 'B1');
    const s = await p.$('.vc .vc-pcorps select[data-a="type"]');
    if (!s){ R.ok(false, 't : choix du type absent de la fiche de la boîte'); return; }
    await s.selectOption('regard'); await C.pause(p, 300);
    const msg = await toastVu(p), b = await elDoc(p, 'B1');
    R.ok(b.t === 'regard' && b.p.limCote === undefined && b.p.limDist === undefined && /^Type changé : 2 caractéristiques ne s'appliquent plus et sont effacées/.test(msg),
      't : boîte changée en regard : les deux champs sont effacés, avec le toast du changement de type (' + b.t + ', ' + champs(b) + ', toast ' + JSON.stringify(msg) + ')');
    await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); const b0 = await elDoc(p, 'B1');
    R.ok(b0.t === 'boite' && b0.p.limCote === 'int' && b0.p.limDist === '0,80', 't : « Annuler » rétablit la boîte et ses deux champs (' + b0.t + ', ' + champs(b0) + ')');
    erreurs(A, 't');
  } finally { await A.fermer(); }
}

/* m104 : côté et distance proposés depuis le plan. Parcelle fermée du fond fictif dont le milieu M du côté 0 est le plus près du centre de
   la vue ; n : sa normale extérieure ; pos(q, d) : point à d m de M vers l'intérieur (d < 0 : vers l'extérieur, dans la rue) */
const parcelleDemo = p => p.evaluate(() => {
  const S = window.__vcEd.etat, G = window.VCroquis.geo, v = S.vue, lr = (G.lignesRef(S.doc, S.fond, null, ['limite']) || []).filter(l => l.ferme && l.aire !== 0);
  let best = null;
  lr.forEach(l => { const M = G.milieu(l.P[0], l.P[1]), d = Math.hypot(M.x - v.cx, M.y - v.cy); if (!best || d < best.d) best = {d, l, M}; });
  return best ? {P: best.l.P, M: best.M, n: G.normaleExt(best.l, 0)} : null;
});
const pos = (q, d) => ({x: q.M.x - d * q.n.x, y: q.M.y - d * q.n.y});
/* distance de l'objet id au bord du polygone P, et s'il est dedans */
const mesurePage = (p, P, id) => p.evaluate(([P, id]) => {
  const G = window.VCroquis.geo, b = window.__vcEd.etat.doc.el.find(e => e.id === id);
  return {d: G.distPolygone(b, P).d, dedans: G.dansPolygone(b, P)};
}, [P, id]);
/* bloc « Limite de propriété » de la fiche : ligne « Sur le plan », puces du côté (valeur, choisie, proposée et style du bord), boutons */
const ficheLim = p => p.evaluate(() => {
  const c = document.querySelector('.vc .vc-pcorps'); if (!c) return {ligne: 'fiche absente', puces: [], mesure: 'absent', placer: 'absent'};
  const l = c.querySelector('.vc-limplan'), bt = a => { const b = c.querySelector('button[data-a="' + a + '"]'); return b ? (b.disabled ? 'grisé' : 'actif') : 'absent'; };
  return {ligne: l ? l.textContent : '', mesure: bt('limMesure'), placer: bt('limPlacer'),
    puces: Array.from(c.querySelectorAll('[data-a="prop"][data-k="limCote"]')).map(b => b.dataset.v + ':' + b.getAttribute('aria-pressed') + (b.classList.contains('vc-propose') ? ':proposée en ' + getComputedStyle(b).borderTopStyle : ''))};
});
const texteFiche = f => JSON.stringify(f.ligne) + ', puces ' + f.puces.join(' | ') + ', « Reprendre la mesure » ' + f.mesure + ', « Placer sur le plan » ' + f.placer;
/* toucher d'un bouton de la fiche ; un bouton grisé n'est pas touché */
async function bouton(p, a){
  const b = await p.$('.vc .vc-pcorps button[data-a="' + a + '"]'); if (!b) return 'absent';
  if (await b.isDisabled()) return 'grisé';
  await b.click(); await C.pause(p, 350); return 'touché';
}
const annulerUnPas = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };
const posTxt = e => e ? '(' + e.x.toFixed(3) + ' ; ' + e.y.toFixed(3) + ')' : 'absent';

/* p, r, a, g, u : boîte à 0,80 m à l'intérieur de sa parcelle (un WC et un regard dans la même parcelle), tuyau attaché qui part vers la rue */
async function proposition(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const q = await parcelleDemo(p);
    if (!R.ok(!!q && !!q.n, 'p : une parcelle fermée du fond fictif près de la vue (obtenu ' + JSON.stringify(q && q.M) + ')')) return;
    const b0 = pos(q, .8), w = pos(q, 6), r = pos(q, 3), bout = pos(q, -3);
    const B1 = C.P('B1', 'boite', b0.x, b0.y, Object.assign({res: 'EU'}, REG));
    await C.injecter(p, {el: [B1, C.P('W', 'wc', w.x, w.y), C.P('R1', 'regard', r.x, r.y, REG), C.L('T1', 'tr', ['B1', [bout.x, bout.y]], C.index([B1]))]});
    await C.regler(p, b0.x, b0.y, 40);
    await choisir(p, 'B1');
    const u0 = await nUndo(p), f0 = await ficheLim(p), e0 = await elDoc(p, 'B1');
    R.ok(f0.ligne === 'Sur le plan : ≈ 0,80 m intérieur', 'p : fiche d\'une boîte à 0,80 m à l\'intérieur de sa parcelle : « Sur le plan : ≈ 0,80 m intérieur » (' + texteFiche(f0) + ')');
    R.ok(f0.puces.join(' | ') === 'int:false:proposée en dashed | ext:false', 'p : p.limCote vide : la puce Intérieur, proposée, est en pointillé sans être choisie (' + f0.puces.join(' | ') + ')');
    R.ok(e0.p.limCote === undefined && e0.p.limDist === undefined && u0 === 0, 'p : la proposition n\'écrit aucun champ et ne fait aucun pas d\'annulation (' + champs(e0) + ', pas ' + u0 + ')');
    R.ok(f0.mesure === 'actif' && f0.placer === 'grisé', 'p : « Reprendre la mesure » actif ; « Placer sur le plan » grisé sans distance ni côté (' + texteFiche(f0) + ')');
    /* la saisie du technicien l'emporte : « Extérieur », choisi contre la proposition, efface le pointillé ; sans distance, « Placer sur le
       plan » reste grisé ; un « Annuler » rend la proposition */
    const kE = await toucherPuce(p, 'limCote', 'ext'), eE = await elDoc(p, 'B1'), fE = await ficheLim(p);
    R.ok(kE && eE.p.limCote === 'ext' && fE.puces.join(' | ') === 'int:false | ext:true' && fE.ligne === f0.ligne && fE.mesure === 'actif' && fE.placer === 'grisé',
      'p : « Extérieur » choisi contre la proposition : plus aucune puce en pointillé, la ligne du plan reste ; « Placer sur le plan » grisé sans distance ('
      + champs(eE) + ', ' + texteFiche(fE) + ')');
    await annulerUnPas(p); await choisir(p, 'B1');
    const fA = await ficheLim(p), eA = await elDoc(p, 'B1'), uA = await nUndo(p);
    R.ok(fA.puces.join(' | ') === f0.puces.join(' | ') && eA.p.limCote === undefined && uA === u0, 'p : « Annuler » : plus de côté choisi, la puce Intérieur est de nouveau proposée ('
      + champs(eA) + ', ' + texteFiche(fA) + ', pas ' + uA + ')');

    /* r : reprendre la mesure, puis l'annuler d'un seul pas */
    const k1 = await bouton(p, 'limMesure'), e1 = await elDoc(p, 'B1'), u1 = await nUndo(p), f1 = await ficheLim(p);
    R.ok(k1 === 'touché' && e1.p.limDist === '0,80' && e1.p.limCote === 'int' && u1 === u0 + 1, 'r : « Reprendre la mesure » : p.limDist « 0,80 » et p.limCote int, un seul pas d\'annulation ('
      + k1 + ', ' + champs(e1) + ', pas ' + u0 + ' puis ' + u1 + ')');
    R.ok(f1.puces.join(' | ') === 'int:true | ext:false' && f1.placer === 'actif' && f1.ligne === f0.ligne, 'r : puce Intérieur choisie, plus en pointillé ; « Placer sur le plan » actif (' + texteFiche(f1) + ')');
    await annulerUnPas(p);
    const e2 = await elDoc(p, 'B1'), u2 = await nUndo(p);
    R.ok(e2.p.limDist === undefined && e2.p.limCote === undefined && u2 === u0, 'r : un seul « Annuler » efface la distance et le côté repris (' + champs(e2) + ', pas ' + u2 + ')');

    /* a : placer sur le plan à 1,00 m (côté intérieur repris du plan) */
    await choisir(p, 'B1'); await bouton(p, 'limMesure'); await saisir(p, 'limDist', '1,00');
    const e3 = await elDoc(p, 'B1'), u3 = await nUndo(p), t3 = await elDoc(p, 'T1');
    const k4 = await bouton(p, 'limPlacer'), e4 = await elDoc(p, 'B1'), u4 = await nUndo(p), t4 = await elDoc(p, 'T1'), m4 = await mesurePage(p, q.P, 'B1'), f4 = await ficheLim(p);
    R.ok(k4 === 'touché' && e3.p.limDist === '1,00' && Math.abs(m4.d - 1) <= .005 && m4.dedans === true && u4 === u3 + 1, 'a : « Placer sur le plan » avec 1,00 : la boîte est à 1,00 m de la limite '
      + 'au centimètre, à l\'intérieur, un seul pas d\'annulation (' + k4 + ', ' + champs(e3) + ', distance ' + m4.d.toFixed(4) + ' m, ' + (m4.dedans ? 'intérieur' : 'extérieur') + ', pas ' + u3 + ' puis ' + u4 + ')');
    R.ok(t4.v[0].a === 'B1' && t4.v[0].x === e4.x && t4.v[0].y === e4.y && Math.hypot(t4.v[0].x - t3.v[0].x, t4.v[0].y - t3.v[0].y) > .1 && t4.v[1].x === t3.v[1].x && t4.v[1].y === t3.v[1].y,
      'a : le bout de tuyau attaché à la boîte la suit, l\'autre bout reste en place (boîte ' + posTxt(e3) + ' puis ' + posTxt(e4) + ', bout ' + posTxt(t3.v[0]) + ' puis ' + posTxt(t4.v[0]) + ')');
    R.ok(e4.p.limDist === '1,00' && e4.p.limCote === 'int' && f4.ligne === 'Sur le plan : ≈ 1,00 m intérieur', 'a : la distance et le côté saisis ne changent pas ; la ligne du plan suit la boîte ('
      + champs(e4) + ', ' + JSON.stringify(f4.ligne) + ')');
    await annulerUnPas(p);
    const e5 = await elDoc(p, 'B1'), t5 = await elDoc(p, 'T1');
    R.ok(e5.x === e3.x && e5.y === e3.y && t5.v[0].x === t3.v[0].x && t5.v[0].y === t3.v[0].y && e5.p.limDist === '1,00', 'a : un seul « Annuler » ramène la boîte et le bout du tuyau, la distance saisie reste ('
      + posTxt(e5) + ', bout ' + posTxt(t5.v[0]) + ', ' + champs(e5) + ')');

    /* g : glisser la boîte au doigt le long de la limite (1,5 m) : ni la distance ni le côté ne changent */
    await choisir(p, 'B1');
    const s0 = await C.ecranCv(p, q.P[0].x, q.P[0].y), s1 = await C.ecranCv(p, q.P[1].x, q.P[1].y), q6 = await C.ecranCv(p, e5.x, e5.y), u6 = await nUndo(p);
    const lg = Math.hypot(s1.x - s0.x, s1.y - s0.y), dep = {x: Math.round(q6.x), y: Math.round(q6.y)};
    await C.glisserDoigtCv(p, dep, {x: Math.round(dep.x + 60 * (s1.x - s0.x) / lg), y: Math.round(dep.y + 60 * (s1.y - s0.y) / lg)}, 600);
    const e7 = await elDoc(p, 'B1'), u7 = await nUndo(p), f7 = await ficheLim(p), m7 = await mesurePage(p, q.P, 'B1');
    R.ok(Math.hypot(e7.x - e5.x, e7.y - e5.y) > 1 && e7.p.limDist === '1,00' && e7.p.limCote === 'int' && u7 === u6 + 1, 'g : la boîte glissée (un pas d\'annulation) garde p.limDist et p.limCote ('
      + posTxt(e5) + ' puis ' + posTxt(e7) + ', ' + champs(e7) + ', pas ' + u6 + ' puis ' + u7 + ')');
    /* le doigt arrondi au pixel près (40 px/m) : la boîte reste à 0,80 m de la limite à 2 cm près */
    R.ok(Math.abs(m7.d - .8) < .02 && m7.dedans && f7.ligne === 'Sur le plan : ≈ ' + m7.d.toFixed(2).replace('.', ',') + ' m intérieur', 'g : la ligne du plan donne la mesure de la nouvelle position, '
      + 'la saisie reste (distance ' + m7.d.toFixed(4) + ' m, ' + texteFiche(f7) + ')');

    /* u : distance effacée (bouton grisé), puis tapée au clavier, et un seul toucher sur « Placer sur le plan » sans quitter le champ avant ;
       ce toucher quitte le champ (la distance est enregistrée) et touche le bouton, actif dès la frappe */
    await saisir(p, 'limDist', '');
    const iu = await p.$('.vc .vc-pcorps input[data-k="limDist"]'), bu = await p.$('.vc .vc-pcorps button[data-a="limPlacer"]');
    if (!R.ok(!!iu && !!bu, 'u : champ de la distance et bouton « Placer sur le plan » dans la fiche')) return;
    await bu.scrollIntoViewIfNeeded();
    const fu0 = await ficheLim(p), uu0 = await nUndo(p), eu0 = await elDoc(p, 'B1');
    await iu.focus(); await p.keyboard.type('0,50'); await C.pause(p, 150);
    const fu1 = await ficheLim(p), zu = await bu.boundingBox();
    await p.touchscreen.tap(zu.x + zu.width / 2, zu.y + zu.height / 2); await C.pause(p, 400);
    const eu1 = await elDoc(p, 'B1'), uu1 = await nUndo(p), mu = await mesurePage(p, q.P, 'B1');
    R.ok(fu0.placer === 'grisé' && fu1.placer === 'actif', 'u : « Placer sur le plan » grisé sans distance, actif dès la frappe de « 0,50 », avant que le champ soit quitté ('
      + fu0.placer + ' puis ' + fu1.placer + ')');
    R.ok(eu1.p.limDist === '0,50' && Math.abs(mu.d - .5) <= .005 && mu.dedans === true && uu1 === uu0 + 2, 'u : un seul toucher enregistre la distance et place la boîte '
      + 'à 0,50 m, à l\'intérieur (un pas chacun) (' + posTxt(eu0) + ' puis ' + posTxt(eu1) + ', ' + champs(eu1) + ', distance ' + mu.d.toFixed(4) + ' m, pas ' + uu0 + ' puis ' + uu1 + ')');
    erreurs(A, 'p, r, a, g, u');
  } finally { await A.fermer(); }
}

/* o : boîte à 0,20 m de la limite (côté douteux) ; v : fond masqué ; k : boîte en face d'un coin ; b : boîte qui arriverait plus près d'un
   autre bord ; s : objets hors de toute parcelle (pas de parcelle d'installation) */
async function sansProposition(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const q = await parcelleDemo(p);
    if (!R.ok(!!q && !!q.n, 'o : une parcelle fermée du fond fictif près de la vue (obtenu ' + JSON.stringify(q && q.M) + ')')) return;
    const b0 = pos(q, .2), w = pos(q, 6), r = pos(q, 3);
    await C.injecter(p, {el: [C.P('B1', 'boite', b0.x, b0.y, Object.assign({res: 'EU'}, REG)), C.P('W', 'wc', w.x, w.y), C.P('R1', 'regard', r.x, r.y, REG)]});
    await C.regler(p, b0.x, b0.y, 40); await choisir(p, 'B1');
    const f0 = await ficheLim(p);
    R.ok(f0.ligne === 'Sur le plan : ≈ 0,20 m côté à confirmer' && f0.puces.join(' | ') === 'int:false | ext:false' && f0.mesure === 'actif', 'o : boîte à 0,20 m de la limite : '
      + '« côté à confirmer », aucune puce proposée (' + texteFiche(f0) + ')');
    const u0 = await nUndo(p), k1 = await bouton(p, 'limMesure'), e1 = await elDoc(p, 'B1'), u1 = await nUndo(p), f1 = await ficheLim(p);
    R.ok(k1 === 'touché' && e1.p.limDist === '0,20' && e1.p.limCote === undefined && u1 === u0 + 1 && f1.placer === 'grisé', 'o : « Reprendre la mesure » reprend la distance (« 0,20 ») '
      + 'mais pas le côté, un pas d\'annulation ; « Placer sur le plan » reste grisé sans côté (' + champs(e1) + ', pas ' + u0 + ' puis ' + u1 + ', ' + texteFiche(f1) + ')');

    /* v : fond masqué : ni ligne ni proposition, boutons grisés */
    await p.evaluate(() => { window.__vcEd.etat.aff.fond = false; }); await choisir(p, 'B1');
    const f2 = await ficheLim(p);
    await p.evaluate(() => { window.__vcEd.etat.aff.fond = true; });
    R.ok(f2.ligne === '' && f2.puces.join(' | ') === 'int:false | ext:false' && f2.mesure === 'grisé' && f2.placer === 'grisé', 'v : fond masqué : aucune ligne « Sur le plan », boutons grisés ('
      + texteFiche(f2) + ')');

    /* k : boîte dans la rue en face d'un coin de la parcelle (le pied de la perpendiculaire tombe sur le sommet : le bord est ambigu) */
    const t0 = {x: q.P[1].x - q.P[0].x, y: q.P[1].y - q.P[0].y}, l0 = Math.hypot(t0.x, t0.y), c0 = {x: q.P[0].x + .6 * q.n.x - .6 * t0.x / l0, y: q.P[0].y + .6 * q.n.y - .6 * t0.y / l0};
    await C.injecter(p, {el: [C.P('B1', 'boite', c0.x, c0.y, Object.assign({res: 'EU', limCote: 'ext', limDist: '1,00'}, REG)), C.P('W', 'wc', w.x, w.y), C.P('R1', 'regard', r.x, r.y, REG)]});
    await C.regler(p, c0.x, c0.y, 40); await choisir(p, 'B1'); await effacerToast(p);
    const fc = await ficheLim(p), uc0 = await nUndo(p), kc = await bouton(p, 'limPlacer'), mc = await toastVu(p), ec = await elDoc(p, 'B1'), uc1 = await nUndo(p);
    R.ok(fc.ligne === 'Sur le plan : ≈ 0,85 m extérieur' && kc === 'touché' && /en face d'un coin/.test(mc) && ec.x === c0.x && ec.y === c0.y && uc1 === uc0, 'k : boîte en face d\'un coin de la '
      + 'limite : « Placer sur le plan » ne la déplace pas et le dit (' + texteFiche(fc) + ', ' + kc + ', ' + JSON.stringify(mc) + ', ' + posTxt(ec) + ', pas ' + uc0 + ' puis ' + uc1 + ')');

    /* b : près du coin P[0] (presque droit), Intérieur et 1,00 : la boîte arriverait plus près du côté voisin que la distance saisie. Position :
       le long du côté rue depuis P[0] (le), puis vers l'extérieur (ex ; négatif : vers l'intérieur) ; ligne du plan attendue avant */
    for (const [nom, le, ex, avant] of [['à l\'intérieur, à 0,80 m de la rue et à 0,50 m du côté voisin', .5, -.8, 'Sur le plan : ≈ 0,50 m intérieur'],
      ['dans la rue, à 0,60 m du côté rue et à 1 cm du coin', .01, .6, 'Sur le plan : ≈ 0,60 m extérieur']]){
      const c1 = {x: q.P[0].x + le * t0.x / l0 + ex * q.n.x, y: q.P[0].y + le * t0.y / l0 + ex * q.n.y};
      await C.injecter(p, {el: [C.P('B1', 'boite', c1.x, c1.y, Object.assign({res: 'EU', limCote: 'int', limDist: '1,00'}, REG)), C.P('W', 'wc', w.x, w.y), C.P('R1', 'regard', r.x, r.y, REG)]});
      await C.regler(p, c1.x, c1.y, 40); await choisir(p, 'B1'); await effacerToast(p);
      const fb = await ficheLim(p), ub0 = await nUndo(p), kb = await bouton(p, 'limPlacer'), mb = await toastVu(p), eb = await elDoc(p, 'B1'), ub1 = await nUndo(p), fb1 = await ficheLim(p);
      R.ok(fb.ligne === avant && kb === 'touché' && /plus près d'un autre bord/.test(mb) && eb.x === c1.x && eb.y === c1.y && ub1 === ub0 && fb1.ligne === avant, 'b : boîte '
        + nom + ' (Intérieur, 1,00) : « Placer sur le plan » ne la déplace pas et le dit (' + texteFiche(fb) + ', ' + kb + ', ' + JSON.stringify(mb) + ', ' + posTxt(eb)
        + ', pas ' + ub0 + ' puis ' + ub1 + ', ' + JSON.stringify(fb1.ligne) + ')');
    }
    /* b, témoin : la boîte de la rue, à 1 cm du coin, avec Extérieur : elle va à 1,00 m de la rue, sans message (le coin est saillant) */
    const c2 = {x: q.P[0].x + .01 * t0.x / l0 + .6 * q.n.x, y: q.P[0].y + .01 * t0.y / l0 + .6 * q.n.y};
    await C.injecter(p, {el: [C.P('B1', 'boite', c2.x, c2.y, Object.assign({res: 'EU', limCote: 'ext', limDist: '1,00'}, REG)), C.P('W', 'wc', w.x, w.y), C.P('R1', 'regard', r.x, r.y, REG)]});
    await C.regler(p, c2.x, c2.y, 40); await choisir(p, 'B1'); await effacerToast(p);
    const ut0 = await nUndo(p), kt = await bouton(p, 'limPlacer'), mt = await toastVu(p), dt = await mesurePage(p, q.P, 'B1'), ut1 = await nUndo(p), ft = await ficheLim(p);
    R.ok(kt === 'touché' && mt === '' && Math.abs(dt.d - 1) <= .005 && dt.dedans === false && ut1 === ut0 + 1 && ft.ligne === 'Sur le plan : ≈ 1,00 m extérieur', 'b : témoin : '
      + 'la même boîte de la rue, avec Extérieur, va à 1,00 m de la limite, sans message (' + kt + ', ' + JSON.stringify(mt) + ', distance ' + dt.d.toFixed(4) + ' m, '
      + (dt.dedans ? 'intérieur' : 'extérieur') + ', pas ' + ut0 + ' puis ' + ut1 + ', ' + JSON.stringify(ft.ligne) + ')');

    /* s : boîte (côté et distance saisis) et WC dans la rue, hors de toute parcelle */
    const s0 = pos(q, -4), s1 = pos(q, -6);
    const dehors = await p.evaluate(pts => { const S = window.__vcEd.etat, G = window.VCroquis.geo; return (G.lignesRef(S.doc, S.fond, null, ['limite']) || []).every(l => pts.every(x => !G.dansPolygone(x, l.P))); }, [s0, s1]);
    if (!R.ok(dehors, 's : les deux points de la rue sont hors de toute limite du fond fictif')) return;
    await C.injecter(p, {el: [C.P('B1', 'boite', s0.x, s0.y, Object.assign({res: 'EU', limCote: 'int', limDist: '0,80'}, REG)), C.P('W', 'wc', s1.x, s1.y)]});
    await C.regler(p, s0.x, s0.y, 40); await choisir(p, 'B1');
    const f3 = await ficheLim(p), u3 = await nUndo(p), e3 = await elDoc(p, 'B1');
    R.ok(f3.ligne === '' && f3.puces.join(' | ') === 'int:true | ext:false' && f3.mesure === 'grisé' && f3.placer === 'grisé', 's : sans parcelle d\'installation : aucune ligne « Sur le plan », '
      + '« Reprendre la mesure » et « Placer sur le plan » grisés, même avec la distance et le côté saisis (' + texteFiche(f3) + ')');
    await p.evaluate(() => ['limMesure', 'limPlacer'].forEach(a => { const b = document.querySelector('.vc .vc-pcorps button[data-a="' + a + '"]'); if (b) b.click(); }));
    await C.pause(p, 300);
    const e4 = await elDoc(p, 'B1'), u4 = await nUndo(p);
    R.ok(u4 === u3 && e4.x === e3.x && e4.y === e3.y && champs(e4) === champs(e3), 's : un toucher sur les boutons grisés ne change rien (' + posTxt(e3) + ' puis ' + posTxt(e4) + ', ' + champs(e4)
      + ', pas ' + u3 + ' puis ' + u4 + ')');
    erreurs(A, 'o, v, k, b, s');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [fiches, type, proposition, sansProposition]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
