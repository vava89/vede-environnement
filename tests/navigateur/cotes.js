// Pose d'un objet par cotes dans l'éditeur du croquis, dans Chromium (données fictives : fond de VCroquis.demoDxf(), croquis de
// démonstration, et un fond fictif construit ici) : correctif m101 (souhait 11 ; convention 11.1 et décisions D1, D2, D3 de
// .claude/conception-outils-dessin.md). m102 et m108 compléteront ce fichier.
// b : avec un outil d'objet, la barre d'aide a un bouton « Cotes » ; son toucher demande « Touchez la façade ou la limite de référence » ;
//     témoins : un outil de tracé et le texte libre n'en ont pas ;
// p : outil Regard, « Cotes », la façade sud du bâti, puis un endroit au-delà du coin ouest : le panneau « Cotes » s'ouvre en
//     Prolongement, distance et décalage pré-remplis multiples de 0,05, sans bouton « Déplacer » ; rien n'est posé avant « Poser » ;
//     2 / 0,5 / Droite puis « Poser » : le regard est au point de VCroquis.geo.placer calculé ici sur le même côté (à 1e-6 près), soit
//     (63,5 ; 3,5) dans le repère de la démonstration ; il est choisi et le mode prend fin ; aucun champ nouveau ; un seul pas
//     d'annulation ; « Annuler » rend le croquis exact (JSON) ;
// l : « Le long », coin gauche (choisi à la place du coin droit pré-rempli), 3 / 1 / Devant : (68,5 ; 3) ;
// o : une descente posée par cotes à 15 cm devant la façade (6 px, sous les 10 px de l'attache) reste au point calculé ; témoin : posée au
//     doigt au même point, elle se colle à la façade ; un caniveau posé le long de la façade prend l'angle du côté, une gargouille celui de
//     sa normale extérieure, au point calculé ; le panneau accorde « posé » au type (« Gargouille posée depuis : Façade ») ;
// t : un regard posé par cotes sur un tuyau existant : aucun raccord, tuyaux inchangés (JSON), personne ne le relie ; témoin : posé au
//     doigt au même point, il entre dans le tuyau ;
// d : point dans le bâti (derrière la façade) : toast « Le point tombe dans le bâti », objet posé quand même, au point calculé ;
// v : « -1 », « abc » et un champ vide refusés (toast des valeurs refusées, valeur précédente gardée) ; 0 accepté (« 0,00 ») ;
//     « 1.25 » accepté (point ou virgule) ; « -1 » tapé puis « Poser » aussitôt : valeur refusée, rien n'est posé ;
// f : « Fermer » : croquis inchangé, mode fini, panneau fermé ; un autre outil remet S.cotes à null (étape « cote » ou panneau ouvert) ;
//     Échap termine le mode, à l'étape « endroit » comme panneau ouvert ; un toucher hors des lignes ne fait rien ; la vue glisse pendant le
//     mode ; tolérance : à la souris, un clic à 8 px de la façade la prend, à 12 px non (10 px) ; au doigt, à 20 px oui, à 28 px non
//     (24 px) ; « Autre trait » ramène à l'étape « cote », « Abandonner » finit le mode ; « Annuler » et « Rétablir » le finissent aussi
//     (référence : un trait de complément, que « Annuler » retire) ; un double toucher sur « Cotes » laisse le mode ouvert (le second tombe
//     sur « Abandonner », venu à sa place) ; double toucher à l'endroit : le second, tombé sur « Poser » du panneau qui s'ouvre, est ignoré
//     avec un message, puis un toucher voulu pose l'objet ; ouvrir() finit le mode ;
// s : fond fictif où une limite de parcelle longe exactement une façade : premier toucher, la façade ; second toucher au même endroit, la
//     limite ; puis de nouveau la façade, puis la limite ; le long de la limite, puces « Intérieur » | « Extérieur » (Intérieur = derrière,
//     côté propriété) ; 2 / 1,5 / Intérieur : le point est mesuré sur la limite, pas sur la façade ;
// g : fond fictif : bâti parcouru dans le sens des aiguilles (prolongement, le long, gargouille tournée vers le dehors), bâti dont la
//     polyligne commence au milieu de la façade sud (côté fusionné de part et d'autre du sommet 0), trait de complément ouvert touché d'un
//     côté puis de l'autre (« Devant » est le côté touché, le coin gauche change avec lui), trait de complément fermé : point du calcul de la
//     convention 11.1 fait ici à la main (à 1e-6 près).
// Tout échoue sur fbbe363 (pas de bouton « Cotes »), sauf les témoins.
// usage : node tests/navigateur/cotes.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('cotes');

const DEMO = {x: 1700000, y: 8200000, th: 12 * Math.PI / 180};
const demoAbs = (u, v) => ({x: DEMO.x + u * Math.cos(DEMO.th) - v * Math.sin(DEMO.th), y: DEMO.y + u * Math.sin(DEMO.th) + v * Math.cos(DEMO.th)});
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));

/* Dossier neuf, croquis ouvert sur le fond fictif de la démonstration, dessin de démonstration (identifiants d1, d2… dans l'ordre du
   dessin), vue fixe ; A.plan(u, v) : point du repère de la démonstration vers le repère du croquis */
async function croquisDemo(){
  const A = await C.ouvrir(), p = A.p;
  await C.etudeEtDossier(p); await C.ouvrirCroquis(p);
  const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
  A.plan = (u, v) => { const a = demoAbs(u, v); return {x: a.x - o.x, y: a.y - o.y}; };
  await p.evaluate(() => {
    const ed = window.__vcEd, S = ed.etat, d = window.VCroquis.demoCroquis(S.fond), nom = {};
    d.el.forEach((e, i) => { nom[e.id] = 'd' + (i + 1); });
    d.el.forEach(e => { e.id = nom[e.id]; if (e.v) e.v.forEach(v => { if (v.a) v.a = nom[v.a]; }); });
    S.doc.el = d.el; S.doc.anomManu = []; S.doc.decisions = {}; S.doc.ordre = []; S.doc.rot = d.rot;
    S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.dernierePose = null; S.dernierTap = null; S.finAuto = null; S.gardeFiche = null;
    ed.synchroniser();
  });
  await vueDemo(A);
  return A;
}
/* vue centrée sur le bâti de la démonstration (u 65,5 à 74,5 ; v 4 à 14), à 40 px par mètre ; la rue est horizontale, en bas */
async function vueDemo(A){ const c = A.plan(70, 6); await C.regler(A.p, c.x, c.y, 40); }

const texteAide = p => p.evaluate(() => { const a = document.querySelector('.vc .vc-aide'); return a && !a.hidden ? a.textContent.replace(/\s+/g, ' ').trim() : ''; });
const boutonCotes = p => p.$('.vc .vc-aide button[data-a="cotes"]');
async function entrer(p){ const b = await boutonCotes(p); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
/* état du mode : 'absent' (version sans le mode), null (hors du mode), ou {etape, nat, c} */
const etat = p => p.evaluate(() => { const c = window.__vcEd.etat.cotes; return c === undefined ? 'absent' : c === null ? null : {etape: c.etape, nat: c.ref ? c.ref.nat : null, c: c.c ? Object.assign({}, c.c) : null}; });
async function toucherPlan(p, q, ms){ await C.toucherCv(p, await C.ecranCv(p, q.x, q.y), ms); }
/* panneau affiché : titre, puces (libellé, valeur, choisie), champs numériques, boutons */
const panneau = p => p.evaluate(() => {
  const pan = document.querySelector('.vc .vc-panneau'); if (!pan || pan.hidden) return null;
  const c = pan.querySelector('.vc-pcorps');
  const puces = k => Array.from(c.querySelectorAll('button[data-a="cotes"][data-k="' + k + '"]')).map(b => ({v: b.dataset.v, lib: b.textContent.trim(), on: b.getAttribute('aria-pressed') === 'true'}));
  const champ = k => { const i = c.querySelector('input[data-a="cotesNum"][data-k="' + k + '"]'); return i ? {val: i.value, clavier: i.getAttribute('inputmode')} : null; };
  return {titre: pan.querySelector('h2').textContent.trim(), mode: puces('mode'), coin: puces('coin'), cote: puces('cote'), d: champ('d'), e: champ('e'),
    poser: !!c.querySelector('button[data-a="cotesPoser"]'), fermer: !!c.querySelector('button[data-a="cotesFermer"]'), deplacer: /Déplacer/.test(c.textContent), texte: c.textContent.replace(/\s+/g, ' ')};
});
const pressee = L => { const b = (L || []).find(x => x.on); return b ? b.lib : ''; };
const libs = L => (L || []).map(x => x.lib).join(' | ');
const resume = f => f ? JSON.stringify({titre: f.titre, mode: pressee(f.mode), coin: pressee(f.coin), cote: pressee(f.cote), d: f.d && f.d.val, e: f.e && f.e.val}) : 'pas de panneau';
const PANNEAU = '.vc .vc-panneau:not([hidden]) .vc-pcorps ';
async function puce(p, k, lib){
  const bs = await p.$$(PANNEAU + 'button[data-a="cotes"][data-k="' + k + '"]');
  for (const b of bs) if ((await b.textContent()).trim() === lib){ await b.click(); await C.pause(p, 250); return true; }
  return false;
}
/* saisie d'une cote, enregistrée quand le champ perd le focus (événement change) */
async function saisir(p, k, v){
  const i = await p.$(PANNEAU + 'input[data-a="cotesNum"][data-k="' + k + '"]'); if (!i) return false;
  await i.fill(v); await i.evaluate(x => x.blur()); await C.pause(p, 250); return true;
}
/* frappe sans quitter le champ (l'aperçu suit, la saisie n'est pas encore enregistrée) */
async function taper(p, k, v){ const i = await p.$(PANNEAU + 'input[data-a="cotesNum"][data-k="' + k + '"]'); if (!i) return false; await i.fill(v); await C.pause(p, 150); return true; }
async function bouton(p, a){ const b = await p.$(PANNEAU + 'button[data-a="' + a + '"]'); if (!b) return false; await b.click(); await C.pause(p, 400); return true; }
async function boutonAide(p, a){ const b = await p.$('.vc .vc-aide:not([hidden]) button[data-a="' + a + '"]'); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
/* fiche ouverte après une pose : fermée, pour toucher le plan dessous */
const fermerFiche = p => p.evaluate(() => { const S = window.__vcEd.etat; if (S.sel || S.panneau) window.__vcEd.fermerNiveau(); });
/* tout ce qui est ouvert est fermé (panneau, mode) : un cas qui échoue ne fausse pas le suivant */
const toutFermer = p => p.evaluate(() => { for (let i = 0; i < 5 && window.__vcEd.fermerNiveau(); i++); });
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
const nombre = s => s == null ? NaN : parseFloat(String(s).replace(',', '.'));
const mult5 = x => isFinite(x) && Math.abs(x * 20 - Math.round(x * 20)) < 1e-9;
/* état que rétablit « Annuler » (sans les textes du croquis, que le mode ne touche pas) */
const etatDoc = p => p.evaluate(() => { const d = window.__vcEd.doc(); return JSON.stringify({el: d.el, decisions: d.decisions, ordre: d.ordre, anomManu: d.anomManu, rot: d.rot, echelle: d.echelle || 0}); });
const nUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const elements = p => p.evaluate(() => JSON.parse(JSON.stringify(window.__vcEd.doc().el)));
const nouveaux = (avant, apres) => apres.filter(e => !avant.some(x => x.id === e.id));
const ecart = (a, b) => a && b ? Math.hypot(a.x - b.x, a.y - b.y) : Infinity;
const pt = q => q ? '(' + q.x.toFixed(4) + ' ; ' + q.y.toFixed(4) + ')' : 'aucun';
const annuler = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };

/* Côté de référence calculé dans la page comme le décrit la fiche m101 : ligne de VCroquis.geo.lignesRef (fond affiché, décalé comme dans
   l'éditeur) de nature nat dont un segment passe à moins de 1 cm de q ; côté fusionné de cotesAlignes qui contient ce segment ; normale
   extérieure de ce segment (normaleExt). Rend {ref: {A, B, n}, gauche : coin gauche vu du dehors}. */
const coteRef = (p, q, nat) => p.evaluate(([q, nat]) => {
  const S = window.__vcEd.etat, G = window.VCroquis.geo, Ls = G.lignesRef(S.doc, S.aff.fond ? S.fond : null, null, [nat]) || [];
  for (const l of Ls){
    const P = l.P;
    for (let k = 0; k + 1 < P.length; k++){
      const a = P[k], b = P[k + 1], L2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2; if (!(L2 > 0)) continue;
      const s = Math.max(0, Math.min(1, ((q.x - a.x) * (b.x - a.x) + (q.y - a.y) * (b.y - a.y)) / L2));
      if (Math.hypot(a.x + s * (b.x - a.x) - q.x, a.y + s * (b.y - a.y) - q.y) > 0.01) continue;
      const cote = G.cotesAlignes(P, l.ferme).filter(x => x.i0 < x.i1 ? x.i0 <= k && k < x.i1 : k >= x.i0 || k < x.i1)[0];
      const ref = {A: cote.A, B: cote.B, n: G.normaleExt(l, k)};
      return {ref, gauche: G.coinGauche(ref)};
    }
  }
  return null;
}, [q, nat]);
const placerPage = (p, ref, c) => p.evaluate(([ref, c]) => window.VCroquis.geo.placer(ref, c), [ref, c]);
/* coin du côté le plus proche du point q ('A' ou 'B') */
const coinPres = (ref, q) => ecart(ref.A, q) <= ecart(ref.B, q) ? 'A' : 'B';
const angleDeg = ang => Math.round(((ang * 180 / Math.PI) % 360 + 360) % 360 * 10) / 10;

/* b, p, l : bouton, prolongement, le long */
async function prolongement(){
  const A = await croquisDemo(), p = A.p;
  try {
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    const b = await boutonCotes(p);
    R.ok(!!b, 'b : outil Regard : bouton « Cotes » dans la barre d\'aide (' + JSON.stringify(await texteAide(p)) + ')');
    if (!b) return;
    const avant = await etatDoc(p), u0 = await nUndo(p), cles0 = await p.evaluate(() => Object.keys(window.__vcEd.doc()).sort().join(','));
    await entrer(p);
    const a0 = await texteAide(p), e0 = await etat(p);
    R.ok(/Touchez la façade ou la limite de référence/.test(a0) && !!e0 && e0.etape === 'cote', 'b : « Cotes » : étape « cote », aide « Touchez la façade ou la limite de référence » ('
      + JSON.stringify(a0) + ', ' + JSON.stringify(e0) + ')');
    await toucherPlan(p, A.plan(70, 4));
    const e1 = await etat(p), a1 = await texteAide(p);
    R.ok(!!e1 && e1.etape === 'endroit' && e1.nat === 'bati' && /Façade/.test(a1), 'p : façade sud touchée : étape « endroit », « Façade » dans l\'aide (' + JSON.stringify(e1) + ', ' + JSON.stringify(a1) + ')');
    await toucherPlan(p, A.plan(63.2, 3.3));
    const f = await panneau(p), e2 = await etat(p);
    R.ok(!!f && f.titre === 'Cotes' && !!e2 && e2.etape === 'saisie' && pressee(f.mode) === 'Prolongement' && !!f.d && !!f.e && mult5(nombre(f.d.val)) && mult5(nombre(f.e.val))
      && f.d.clavier === 'decimal' && f.e.clavier === 'decimal' && f.poser && f.fermer && !f.deplacer,
      'p : endroit au-delà du coin ouest : panneau « Cotes » en Prolongement, distance et décalage multiples de 0,05, clavier décimal, « Poser » et « Fermer », pas de « Déplacer » (' + resume(f) + ')');
    R.ok(!!f && libs(f.mode) === 'Prolongement | Le long' && libs(f.coin) === 'Coin gauche | Coin droit' && libs(f.cote) === 'Droite | Gauche' && pressee(f.coin) === 'Coin gauche' && pressee(f.cote) === 'Droite',
      'p : puces Mode, Coin et Côté ; le coin ouest est le « Coin gauche » vu du dehors, le côté de la rue « Droite » (' + JSON.stringify(f && [libs(f.mode), libs(f.coin), libs(f.cote)]) + ', ' + resume(f) + ')');
    R.ok(await etatDoc(p) === avant && await nUndo(p) === u0, 'p : rien n\'est posé avant « Poser » (croquis et annulation inchangés)');
    await saisir(p, 'd', '2'); await saisir(p, 'e', '0,5'); await puce(p, 'cote', 'Droite');
    const f2 = await panneau(p);
    R.ok(!!f2 && f2.d.val === '2,00' && f2.e.val === '0,50', 'p : valeurs saisies affichées au centimètre (' + resume(f2) + ')');
    const els0 = await elements(p);
    await effacerToast(p);
    if (!await bouton(p, 'cotesPoser')){ R.ok(false, 'p : pas de bouton « Poser »'); return; }
    const msg = await toastVu(p), els1 = await elements(p), nv = nouveaux(els0, els1), o = nv[0], r = await coteRef(p, A.plan(70, 4), 'bati');
    const ouest = r && coinPres(r.ref, A.plan(65.5, 4)), att = r && await placerPage(p, r.ref, {mode: 'prol', coin: ouest, d: 2, e: 0.5, cote: 'droite'}), demo = A.plan(63.5, 3.5);
    R.ok(nv.length === 1 && o.t === 'regard' && ecart(o, att) <= 1e-6 && ecart(att, demo) <= 3e-3 && ouest === r.gauche,
      'p : « Poser » : un regard au point de VCroquis.geo.placer à 1e-6 près, (63,5 ; 3,5) de la démonstration (posé ' + pt(o) + ', attendu ' + pt(att) + ', démonstration ' + pt(demo)
      + ', ' + nv.length + ' nouvel élément, coin ouest ' + ouest + ', coin gauche ' + (r && r.gauche) + ')');
    const st = await p.evaluate(() => { const S = window.__vcEd.etat; return {sel: S.sel && S.sel.id, pan: S.panneau, cotes: S.cotes, cles: Object.keys(S.doc).sort().join(',')}; });
    R.ok(!!o && st.sel === o.id && st.pan === 'fiche' && st.cotes === null && /Touchez le plan pour poser/.test(await texteAide(p)) && !/bâti/.test(msg),
      'p : le regard posé est choisi (fiche ouverte), le mode prend fin, pas d\'avertissement de bâti (' + JSON.stringify(st) + ', toast ' + JSON.stringify(msg) + ')');
    const defs = await p.evaluate(() => Object.keys(window.VCroquis.defautsPt('regard')).sort().join(','));
    R.ok(!!o && Object.keys(o).sort().join(',') === 'id,k,lab,p,t,x,y' && Object.keys(o.p).sort().join(',') === defs && st.cles === cles0,
      'p : rien n\'est gardé des cotes : objet et croquis sans champ nouveau (' + (o && Object.keys(o).sort().join(',')) + ' ; p : ' + (o && Object.keys(o.p).sort().join(',')) + ' ; défauts : ' + defs + ')');
    const u1 = await nUndo(p);
    await annuler(p);
    R.ok(u1 === u0 + 1 && await etatDoc(p) === avant, 'p : un seul pas d\'annulation, et « Annuler » rend le croquis exact (JSON) (pas ' + u0 + ' puis ' + u1 + ')');

    /* l : le long, depuis le coin gauche (le coin droit est pré-rempli : l'endroit est plus près du coin est) */
    await vueDemo(A);
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(72, 2.6));
    const g = await panneau(p);
    R.ok(!!g && pressee(g.mode) === 'Le long' && pressee(g.coin) === 'Coin droit' && pressee(g.cote) === 'Devant' && libs(g.cote) === 'Devant | Derrière' && !!g.d && mult5(nombre(g.d.val)) && mult5(nombre(g.e.val)),
      'l : endroit devant la façade, près du coin est : Le long, « Coin droit », « Devant » pré-remplis, multiples de 0,05 (' + resume(g) + ')');
    await puce(p, 'coin', 'Coin gauche'); await saisir(p, 'd', '3'); await saisir(p, 'e', '1'); await puce(p, 'cote', 'Devant');
    const g2 = await panneau(p), els2 = await elements(p);
    await bouton(p, 'cotesPoser');
    const o2 = nouveaux(els2, await elements(p))[0], att2 = r && await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 3, e: 1, cote: 'devant'}), demo2 = A.plan(68.5, 3);
    R.ok(!!g2 && pressee(g2.coin) === 'Coin gauche' && !!o2 && ecart(o2, att2) <= 1e-6 && ecart(att2, demo2) <= 3e-3,
      'l : Le long, coin gauche, 3 / 1 / Devant : regard au point de placer, (68,5 ; 3) de la démonstration (posé ' + pt(o2) + ', attendu ' + pt(att2) + ', démonstration ' + pt(demo2) + ', ' + resume(g2) + ')');
    erreurs(A, 'b, p, l');
  } finally { await A.fermer(); }
}

/* o, t, d : orientation, tuyau, point dans le bâti */
async function poses(){
  const A = await croquisDemo(), p = A.p;
  try {
    const r = await coteRef(p, A.plan(70, 4), 'bati');
    if (!r){ R.ok(false, 'o : façade sud introuvable dans lignesRef'); return; }
    /* o : une descente (objet de mur) posée par cotes à 15 cm devant la façade (6 px à 40 px/m, sous les 10 px de l'attache) reste au
       point calculé ; témoin : posée au doigt au même point, elle se colle à la façade */
    await vueDemo(A);
    await C.outil(p, {k: 'pt', t: 'descente', pal: 'ep'}); await C.pause(p, 150);
    const PM = await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 4, e: 0.15, cote: 'devant'}), avantM = await etatDoc(p), elsM = await elements(p);
    const horsM = q => (q.x - r.ref.A.x) * r.ref.n.x + (q.y - r.ref.A.y) * r.ref.n.y;
    await toucherPlan(p, PM);
    const tM = nouveaux(elsM, await elements(p)).filter(e => e.t === 'descente')[0];
    R.ok(!!tM && Math.abs(horsM(tM)) < 1e-6 && ecart(tM, PM) > 0.1, 'o : témoin : une descente posée au doigt à 15 cm devant la façade se colle au mur (' + pt(tM) + ', point ' + pt(PM) + ')');
    await annuler(p); await fermerFiche(p); await vueDemo(A);
    if (await entrer(p)){
      await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
      await puce(p, 'coin', 'Coin gauche'); await saisir(p, 'd', '4'); await saisir(p, 'e', '0,15'); await puce(p, 'cote', 'Devant');
      await bouton(p, 'cotesPoser');
      const oM = nouveaux(elsM, await elements(p)).filter(e => e.t === 'descente')[0];
      R.ok(!!oM && ecart(oM, PM) <= 1e-6 && Math.abs(horsM(oM) - 0.15) < 1e-6, 'o : descente posée par cotes à 15 cm devant la façade (6 px) : au point calculé, pas collée au mur (' + pt(oM) + ' pour ' + pt(PM) + ')');
      await annuler(p); await fermerFiche(p);
      R.ok(await etatDoc(p) === avantM, 'o : « Annuler » retire la descente posée par cotes (croquis rétabli)');
    } else R.ok(false, 'o : outil Descente : pas de bouton « Cotes »');
    for (const [t, pal] of [['caniveau', 'ep'], ['gargouille', 'equ']]){
      await vueDemo(A);
      await C.outil(p, {k: 'pt', t, pal}); await C.pause(p, 150);
      if (!await entrer(p)){ R.ok(false, 'o : outil ' + t + ' : pas de bouton « Cotes »'); continue; }
      await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
      await puce(p, 'coin', 'Coin gauche'); await saisir(p, 'd', '4'); await saisir(p, 'e', '1,5'); await puce(p, 'cote', 'Devant');
      const fo = await panneau(p), qui = t === 'gargouille' ? 'Gargouille posée' : 'Caniveau-grille posé';
      R.ok(!!fo && fo.texte.indexOf(qui + ' depuis : Façade') >= 0, 'o : le panneau accorde au type : « ' + qui + ' depuis : Façade » (' + JSON.stringify(fo && fo.texte.trim().slice(0, 50)) + ')');
      const els0 = await elements(p);
      await bouton(p, 'cotesPoser');
      const o = nouveaux(els0, await elements(p))[0], P = await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 4, e: 1.5, cote: 'devant'});
      const ang = t === 'gargouille' ? Math.atan2(r.ref.n.y, r.ref.n.x) : Math.atan2(r.ref.B.y - r.ref.A.y, r.ref.B.x - r.ref.A.x), att = angleDeg(ang);
      R.ok(!!o && o.t === t && o.p.a === att && ecart(o, P) <= 1e-6, 'o : ' + (t === 'gargouille' ? 'gargouille posée' : 'caniveau posé') + ' le long de la façade : angle ' + (t === 'gargouille' ? 'de la normale extérieure' : 'du côté')
        + ' (' + (o && o.p.a) + ' pour ' + att + '), au point calculé (' + pt(o) + ' pour ' + pt(P) + ')');
    }

    /* t : la descente du coin est (74,5 ; 4) descend vers (74,5 ; 2,2) : le point à 1 m devant le coin est, sur la perpendiculaire, est
       sur ce tuyau */
    await fermerFiche(p); await vueDemo(A);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    const est = coinPres(r.ref, A.plan(74.5, 4)), P0 = await placerPage(p, r.ref, {mode: 'long', coin: est, d: 0, e: 1, cote: 'devant'});
    const tuyau = await p.evaluate(P0 => {
      const d = window.__vcEd.doc(), I = window.VCroquis.indexDoc(d), out = [];
      d.el.forEach(l => { if (l.k !== 'ln') return; const Q = window.VCroquis.lignePts(l, I); for (let k = 1; k < Q.length; k++){ const q = window.VCroquis.outils.projSeg(P0, Q[k - 1], Q[k]); if (q.d < 0.01) out.push(l.id); } });
      return out;
    }, P0);
    R.ok(tuyau.length === 1, 't : le point à 1 m devant le coin est est sur un seul tuyau, à 1 cm près (' + JSON.stringify(tuyau) + ', ' + pt(P0) + ')');
    const avantT = await etatDoc(p), lnAvant = JSON.stringify((await elements(p)).filter(e => e.k === 'ln')), elsT = await elements(p);
    await toucherPlan(p, P0);
    const temoin = nouveaux(elsT, await elements(p)).filter(e => e.t === 'regard')[0], relie = !!temoin && (await elements(p)).some(e => e.k === 'ln' && e.v.some(v => v.a === temoin.id));
    R.ok(relie, 't : témoin : le regard posé au doigt au même point entre dans le tuyau (' + (temoin ? temoin.id : 'aucun regard') + ')');
    await annuler(p);
    R.ok(await etatDoc(p) === avantT, 't : témoin annulé : croquis rétabli');
    await fermerFiche(p); await vueDemo(A);
    if (!await entrer(p)){ R.ok(false, 't : pas de bouton « Cotes »'); return; }
    await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(73.8, 2.5));
    await saisir(p, 'd', '0'); await saisir(p, 'e', '1'); await puce(p, 'cote', 'Devant');
    const fT = await panneau(p);
    await bouton(p, 'cotesPoser');
    const apresT = await elements(p), oT = nouveaux(elsT, apresT), reg = oT.filter(e => e.t === 'regard')[0];
    R.ok(!!fT && pressee(fT.coin) === 'Coin droit' && oT.length === 1 && !!reg && ecart(reg, P0) <= 1e-6 && JSON.stringify(apresT.filter(e => e.k === 'ln')) === lnAvant && !apresT.some(e => e.k === 'ln' && e.v.some(v => v.a === reg.id)),
      't : regard posé par cotes sur le tuyau (coin droit, 0 / 1 / Devant) : au point calculé, aucun raccord, tuyaux inchangés (JSON), personne ne le relie ('
      + oT.map(e => e.t).join(', ') + ', ' + pt(reg) + ' pour ' + pt(P0) + ', ' + resume(fT) + ')');

    /* d : derrière la façade, dans le bâti */
    await vueDemo(A);
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
    await puce(p, 'cote', 'Derrière'); await saisir(p, 'd', '3'); await saisir(p, 'e', '1');
    const elsD = await elements(p);
    await effacerToast(p);
    await bouton(p, 'cotesPoser');
    const msg = await toastVu(p), oD = nouveaux(elsD, await elements(p))[0], PD = await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 3, e: 1, cote: 'derriere'});
    R.ok(/^Le point tombe dans le bâti/.test(msg) && !!oD && ecart(oD, PD) <= 1e-6 && ecart(PD, A.plan(68.5, 5)) <= 3e-3,
      'd : point dans le bâti (3 / 1 / Derrière) : avertissement « Le point tombe dans le bâti », objet posé quand même (' + JSON.stringify(msg) + ', ' + pt(oD) + ' pour ' + pt(PD) + ')');
    erreurs(A, 'o, t, d');
  } finally { await A.fermer(); }
}

/* v, f : valeurs refusées ou acceptées, sorties du mode, vue libre, tolérance à la souris */
async function valeursEtSorties(){
  const A = await croquisDemo(), p = A.p;
  try {
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    const avant = await etatDoc(p), u0 = await nUndo(p);
    if (!await entrer(p)){ R.ok(false, 'v : pas de bouton « Cotes »'); return; }
    await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
    const f0 = await panneau(p), e0 = await etat(p);
    if (!f0 || !f0.d || !e0 || !e0.c){ R.ok(false, 'v : panneau « Cotes » absent (' + resume(f0) + ')'); return; }
    for (const x of ['-1', 'abc', '']){
      await effacerToast(p); await saisir(p, 'd', x);
      const msg = await toastVu(p), f = await panneau(p), c = (await etat(p)).c;
      R.ok(msg === 'Nombre attendu, par exemple 0,80' && f.d.val === f0.d.val && c.d === e0.c.d, 'v : distance « ' + x + ' » refusée : toast des valeurs refusées, valeur précédente gardée ('
        + JSON.stringify(msg) + ', ' + f.d.val + ' pour ' + f0.d.val + ', ' + c.d + ')');
    }
    await effacerToast(p); await saisir(p, 'd', '0');
    const m0 = await toastVu(p), f1 = await panneau(p), c1 = (await etat(p)).c;
    R.ok(!m0 && c1.d === 0 && f1.d.val === '0,00', 'v : distance 0 acceptée (« 0,00 ») (' + JSON.stringify(m0) + ', ' + c1.d + ', ' + f1.d.val + ')');
    await effacerToast(p); await saisir(p, 'e', '-0,2');
    const m1 = await toastVu(p), f2 = await panneau(p), c2 = (await etat(p)).c;
    R.ok(m1 === 'Nombre attendu, par exemple 0,80' && f2.e.val === f0.e.val && c2.e === e0.c.e, 'v : décalage « -0,2 » refusé (' + JSON.stringify(m1) + ', ' + f2.e.val + ')');
    await saisir(p, 'e', '1.25');
    const f3 = await panneau(p), c3 = (await etat(p)).c;
    R.ok(c3.e === 1.25 && f3.e.val === '1,25', 'v : décalage « 1.25 » accepté (« 1,25 ») (' + c3.e + ', ' + f3.e.val + ')');
    /* « -1 » tapé, puis « Poser » touché aussitôt (le champ perd le focus à ce toucher) : refusé, et rien n'est posé */
    await effacerToast(p); await taper(p, 'd', '-1'); await bouton(p, 'cotesPoser');
    const m2 = await toastVu(p), eR = await etat(p), f4 = await panneau(p);
    R.ok(m2 === 'Nombre attendu, par exemple 0,80' && await etatDoc(p) === avant && !!eR && eR.etape === 'saisie' && eR.c.d === 0 && !!f4 && f4.d.val === '0,00',
      'v : « -1 » tapé puis « Poser » aussitôt : valeur refusée, rien n\'est posé, le panneau reste (' + JSON.stringify(m2) + ', ' + resume(f4) + ')');
    await bouton(p, 'cotesFermer');
    R.ok(await panneau(p) === null && await etat(p) === null && await etatDoc(p) === avant && await nUndo(p) === u0,
      'f : « Fermer » : panneau fermé, mode fini, croquis et annulation inchangés');

    /* un autre outil, à l'étape « cote » puis panneau ouvert ; Échap */
    await entrer(p);
    await C.outil(p, {k: 'pt', t: 'boite', pal: 'reg'}); await C.pause(p, 150);
    const a1 = await texteAide(p);
    R.ok(await etat(p) === null && /Touchez le plan pour poser/.test(a1), 'f : un autre outil à l\'étape « cote » : S.cotes remis à null, aide de l\'outil (' + JSON.stringify(a1) + ')');
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
    const ouvert = await panneau(p);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    R.ok(!!ouvert && ouvert.titre === 'Cotes' && await etat(p) === null && await panneau(p) === null, 'f : un autre outil, panneau « Cotes » ouvert : mode fini, panneau fermé');
    await entrer(p); await toucherPlan(p, A.plan(70, 4));
    const avantEchap = await etat(p);
    await p.keyboard.press('Escape'); await C.pause(p, 200);
    R.ok(!!avantEchap && avantEchap.etape === 'endroit' && await etat(p) === null, 'f : Échap à l\'étape « endroit » : mode fini (' + JSON.stringify(avantEchap) + ')');

    /* toucher hors des lignes ; glissé de la vue */
    await vueDemo(A);
    await entrer(p);
    await toucherPlan(p, A.plan(70, 9));
    const e3 = await etat(p), a3 = await texteAide(p);
    R.ok(!!e3 && e3.etape === 'cote' && /Touchez la façade ou la limite de référence/.test(a3) && await etatDoc(p) === avant, 'f : toucher loin des lignes : rien ne change, l\'aide reste ('
      + JSON.stringify(e3) + ', ' + JSON.stringify(a3) + ')');
    const v0 = await C.vue(p), q0 = await C.ecranCv(p, A.plan(70, 9).x, A.plan(70, 9).y);
    await C.glisserDoigtCv(p, q0, {x: q0.x + 120, y: q0.y + 30});
    const v1 = await C.vue(p), e4 = await etat(p);
    R.ok(Math.hypot(v1.cx - v0.cx, v1.cy - v0.cy) > 1 && !!e4 && e4.etape === 'cote' && await etatDoc(p) === avant, 'f : la vue glisse pendant le mode, qui reste à l\'étape « cote » (centre déplacé de '
      + Math.hypot(v1.cx - v0.cx, v1.cy - v0.cy).toFixed(2) + ' m, ' + JSON.stringify(e4) + ')');

    /* tolérance, sous le milieu de la façade (vers la rue) : 10 px à la souris (clics à 12 puis 8 px), 24 px au doigt (touchers à 28 puis
       20 px) ; « Autre trait » entre deux prises ; le dernier toucher laisse l'étape « endroit » */
    await vueDemo(A);
    const m = await C.ecranCv(p, A.plan(70, 4).x, A.plan(70, 4).y), ESSAIS = [[12, true], [8, true], [28, false], [20, false]], tol = [];
    for (let i = 0; i < ESSAIS.length; i++){
      const [k, souris] = ESSAIS[i], q = {x: m.x, y: m.y + k};
      if (souris) await C.cliquerCv(p, q); else await C.toucherCv(p, q);
      const e = await etat(p);
      tol.push((souris ? 'souris ' : 'doigt ') + k + ' px : ' + (e && e.etape ? e.etape + (e.nat ? ' ' + e.nat : '') : String(e)));
      if (i < ESSAIS.length - 1 && e && e.etape === 'endroit') await boutonAide(p, 'cotesAutre');
    }
    R.ok(tol.join(' ; ') === 'souris 12 px : cote ; souris 8 px : endroit bati ; doigt 28 px : cote ; doigt 20 px : endroit bati',
      'f : tolérance : à la souris, un clic à 8 px de la façade la prend, à 12 px non (10 px) ; au doigt, à 20 px oui, à 28 px non (24 px) (' + tol.join(' ; ') + ')');
    /* « Autre trait » : retour à l'étape « cote » ; « Abandonner » (barre d'aide) : fin du mode */
    await boutonAide(p, 'cotesAutre');
    const e7 = await etat(p), a7 = await texteAide(p);
    await boutonAide(p, 'cotesStop');
    R.ok(!!e7 && e7.etape === 'cote' && /Touchez la façade ou la limite de référence/.test(a7) && await etat(p) === null && /Touchez le plan pour poser/.test(await texteAide(p)) && await etatDoc(p) === avant,
      'f : « Autre trait » ramène à l\'étape « cote », « Abandonner » finit le mode sans rien changer (' + JSON.stringify(e7) + ', ' + JSON.stringify(a7) + ')');

    /* « Annuler » pendant le mode le finit ; la référence est un trait de complément, que « Annuler » retire : il ne reste pas celle du
       panneau ; « Rétablir » aussi finit le mode */
    await vueDemo(A);
    const avantC = await etatDoc(p), elsC = JSON.parse(avantC).el;
    await C.outil(p, {k: 'ln', id: 'lim', pal: 'tr'}); await C.pause(p, 150);
    await toucherPlan(p, A.plan(58, 1)); await toucherPlan(p, A.plan(58, 3));
    await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 250);
    const traitC = nouveaux(elsC, await elements(p)).filter(e => e.k === 'ln' && e.t === 'lim');
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    await entrer(p); await toucherPlan(p, A.plan(58, 2)); await toucherPlan(p, A.plan(59.5, 2));
    const eC = await etat(p);
    await annuler(p);
    const eA = await etat(p), fA = await panneau(p);
    R.ok(traitC.length === 1 && !!eC && eC.etape === 'saisie' && eC.nat === 'complement' && eA === null && fA === null && await etatDoc(p) === avantC,
      'f : « Annuler » pendant le mode, la référence étant un trait de complément qu\'il retire : mode fini, panneau fermé, trait retiré ('
      + traitC.length + ' trait, ' + JSON.stringify(eC) + ' puis ' + JSON.stringify(eA) + ')');
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
    const eB0 = await etat(p);
    await p.evaluate(() => window.__vcEd.refaire()); await C.pause(p, 250);
    const eB = await etat(p), fB = await panneau(p), nB = nouveaux(elsC, await elements(p)).length;
    R.ok(!!eB0 && eB0.etape === 'saisie' && eB === null && fB === null && nB === 1, 'f : « Rétablir » pendant le mode : mode fini, panneau fermé, trait rétabli ('
      + JSON.stringify(eB0) + ' puis ' + JSON.stringify(eB) + ', ' + nB + ' élément de plus)');
    await annuler(p);

    /* double toucher sur « Cotes » : le second tombe sur « Abandonner », venu à sa place ; il ne finit pas le mode */
    await toutFermer(p);
    const centre = sel => p.evaluate(s => { const b = document.querySelector(s); if (!b) return null; const r = b.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }, sel);
    const qc = await centre('.vc .vc-aide:not([hidden]) button[data-a="cotes"]');
    if (qc){ await p.touchscreen.tap(qc.x, qc.y); await p.touchscreen.tap(qc.x, qc.y); await C.pause(p, 300); }
    const sousC = qc ? await p.evaluate(q => { const b = document.elementFromPoint(q.x, q.y), c = b && b.closest('button'); return c ? c.dataset.a : ''; }, qc) : '', eDT = await etat(p);
    await C.pause(p, 400); await boutonAide(p, 'cotesStop');
    R.ok(!!qc && sousC === 'cotesStop' && !!eDT && eDT.etape === 'cote' && await etat(p) === null,
      'f : double toucher sur « Cotes » : le second, tombé sur « Abandonner » venu à sa place, ne finit pas le mode ; « Abandonner » touché ensuite le finit ('
      + JSON.stringify(sousC) + ', ' + JSON.stringify(eDT) + ')');

    /* double toucher à l'endroit : le second tombe sur « Poser » du panneau qui vient de s'ouvrir sous le doigt ; il est ignoré, avec un
       message ; ensuite, un toucher voulu sur « Poser » pose l'objet. Le point de « Poser » est relevé panneau ouvert, puis touché une fois
       comme endroit, pour que le panneau s'ouvre pareil au double toucher */
    const POSER = '.vc .vc-panneau:not([hidden]) button[data-a="cotesPoser"]';
    await toutFermer(p); await vueDemo(A);
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(63.2, 3.3));
    let qp = await centre(POSER);
    await boutonAide(p, 'cotesAutre'); await toucherPlan(p, A.plan(70, 4));
    if (qp){ await C.toucherPage(p, qp, 700); qp = await centre(POSER); }
    await boutonAide(p, 'cotesAutre'); await toucherPlan(p, A.plan(70, 4));
    const elsP = await elements(p), libre = !!qp && await p.evaluate(q => { const e = document.elementFromPoint(q.x, q.y); return !!e && e.classList.contains('vc-cv'); }, qp);
    await effacerToast(p);
    if (libre){ await p.touchscreen.tap(qp.x, qp.y); await p.touchscreen.tap(qp.x, qp.y); await C.pause(p, 400); }
    const msgP = await toastVu(p), eP = await etat(p), nP = nouveaux(elsP, await elements(p)).length;
    R.ok(libre && nP === 0 && !!eP && eP.etape === 'saisie' && /^Le panneau « Cotes » vient de s'ouvrir sous le doigt/.test(msgP),
      'f : double toucher à l\'endroit : le second, tombé sur « Poser » du panneau qui s\'ouvre, est ignoré avec un message (' + nP + ' objet posé, '
      + JSON.stringify(eP) + ', ' + JSON.stringify(msgP) + ')');
    await C.pause(p, 400);
    if (libre){ await p.touchscreen.tap(qp.x, qp.y); await C.pause(p, 400); }
    R.ok(libre && nouveaux(elsP, await elements(p)).length === 1 && await etat(p) === null, 'f : ensuite, un toucher voulu sur « Poser » pose l\'objet et finit le mode');
    await annuler(p); await fermerFiche(p);

    /* Échap panneau « Cotes » ouvert (étape de saisie) : mode fini, panneau fermé, croquis inchangé */
    await toutFermer(p); await vueDemo(A);
    const avantE = await etatDoc(p);
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
    const eE = await etat(p), fE = await panneau(p);
    await p.keyboard.press('Escape'); await C.pause(p, 200);
    R.ok(!!eE && eE.etape === 'saisie' && !!fE && fE.titre === 'Cotes' && await etat(p) === null && await panneau(p) === null && await etatDoc(p) === avantE,
      'f : Échap panneau « Cotes » ouvert : mode fini, panneau fermé, croquis inchangé (' + JSON.stringify(eE) + ')');

    /* témoins : outils de tracé et texte libre, sans bouton « Cotes » */
    await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'}); await C.pause(p, 150);
    const bt = await boutonCotes(p);
    await C.outil(p, {k: 'tx', pal: 'ann'}); await C.pause(p, 150);
    const bx = await boutonCotes(p);
    R.ok(!bt && !bx, 'b : témoins : ni l\'outil Tronçon ni le texte libre n\'ont de bouton « Cotes »');
    /* ouvrir() pendant le mode, panneau « Cotes » ouvert : mode fini, panneau fermé */
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150); await vueDemo(A);
    await entrer(p); await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(69, 2.5));
    const eO = await etat(p);
    await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.ouvrir(S.doc, S.fond, S.reseau); }); await C.pause(p, 250);
    R.ok(!!eO && eO.etape === 'saisie' && await etat(p) === null && await panneau(p) === null, 'f : ouvrir() pendant le mode, panneau « Cotes » ouvert : mode fini, panneau fermé ('
      + JSON.stringify(eO) + ')');
    erreurs(A, 'v, f');
  } finally { await A.fermer(); }
}

/* Fonds fictifs en DXF : polylignes fermées [calque, [[u, v]…]], dans un repère local (u, v) en mètres, sans rotation, autour du point
   fictif (1700000 ; 8200000) */
const FICTIF = {x: 1700000, y: 8200000};
function dxfFictif(polys){
  const L = [], g = (c, v) => L.push(('   ' + c).slice(-3), String(v)), f = x => x.toFixed(3);
  const poly = (lay, uv) => {
    g(0, 'POLYLINE'); g(8, lay); g(66, 1); g(10, '0.0'); g(20, '0.0'); g(30, '0.0'); g(70, 1);
    uv.forEach(q => { g(0, 'VERTEX'); g(8, lay); g(10, f(FICTIF.x + q[0])); g(20, f(FICTIF.y + q[1])); g(30, '0.0'); });
    g(0, 'SEQEND'); g(8, lay);
  };
  g(0, 'SECTION'); g(2, 'HEADER'); g(9, '$ACADVER'); g(1, 'AC1009'); g(9, '$DWGCODEPAGE'); g(3, 'ANSI_1252'); g(0, 'ENDSEC');
  g(0, 'SECTION'); g(2, 'TABLES'); g(0, 'TABLE'); g(2, 'LAYER'); g(70, 2);
  ['1PARCELLE', '3BATIDUR'].forEach(n => { g(0, 'LAYER'); g(2, n); g(70, 0); g(62, 7); g(6, 'CONTINUOUS'); });
  g(0, 'ENDTAB'); g(0, 'ENDSEC');
  g(0, 'SECTION'); g(2, 'ENTITIES');
  polys.forEach(q => poly(q[0], q[1]));
  g(0, 'ENDSEC'); g(0, 'EOF');
  return L.join('\r\n') + '\r\n';
}
/* une parcelle (calque 1PARCELLE) de 20 m sur 30 et un bâti (3BATIDUR) de 10 m sur 10 posé sur sa limite sud : la façade sud du bâti
   longe exactement la limite */
const dxfLimite = () => dxfFictif([['1PARCELLE', [[0, 0], [20, 0], [20, 30], [0, 30]]], ['3BATIDUR', [[5, 0], [15, 0], [15, 10], [5, 10]]]]);
/* dossier neuf, croquis ouvert sur un fond fictif ; rend plan(u, v) : point du repère local vers le repère du croquis */
async function ouvrirFondFictif(p, nom, dxf){
  await C.etudeEtDossier(p);
  await p.click('[data-act="vc-ouvrir"]');
  await p.waitForSelector('#modal-root input[data-m="dxf"]', {state: 'attached'});
  await p.setInputFiles('#modal-root input[data-m="dxf"]', {name: nom, mimeType: 'application/octet-stream', buffer: Buffer.from(dxf, 'utf8')});
  await p.waitForFunction(() => window.__vcEd && window.__vcEd.doc() && window.__vcEd.etat.fond);
  await C.pause(p, 400);
  const o = await p.evaluate(() => window.__vcEd.etat.doc.origine);
  return (u, v) => ({x: FICTIF.x + u - o.x, y: FICTIF.y + v - o.y});
}

/* s : lignes superposées (façade sur la limite de parcelle) */
async function superposees(){
  const A = await C.ouvrir(), p = A.p;
  try {
    const plan = await ouvrirFondFictif(p, 'plan-fictif-limite.dxf', dxfLimite());
    const c = plan(10, 6); await C.regler(p, c.x, c.y, 30);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    if (!await entrer(p)){ R.ok(false, 's : pas de bouton « Cotes »'); return; }
    const q = plan(10, 0), vus = [];
    for (let i = 0; i < 4; i++){ await toucherPlan(p, q); const e = await etat(p), a = await texteAide(p); vus.push({nat: e && e.nat, etape: e && e.etape, aide: a}); }
    const natOk = vus.map(v => v.nat).join(',') === 'bati,limite,bati,limite' && vus.every(v => v.etape === 'endroit');
    const aideOk = /Façade/.test(vus[0].aide) && !/Limite de parcelle/.test(vus[0].aide) && /Limite de parcelle/.test(vus[1].aide) && /Façade/.test(vus[2].aide) && /Limite de parcelle/.test(vus[3].aide);
    R.ok(natOk && aideOk, 's : touchers répétés au même endroit : la façade, puis la limite de parcelle qui la longe, puis de nouveau la façade, puis la limite ; la nature est dans l\'aide ('
      + JSON.stringify(vus.map(v => v.nat + ' : ' + v.aide)) + ')');
    await toucherPlan(p, plan(3, 1));
    const f = await panneau(p);
    R.ok(!!f && /Limite de parcelle/.test(f.texte) && pressee(f.mode) === 'Le long' && libs(f.cote) === 'Intérieur | Extérieur' && pressee(f.cote) === 'Intérieur' && pressee(f.coin) === 'Coin gauche',
      's : endroit dans la parcelle, le long de la limite : puces « Intérieur » | « Extérieur », « Intérieur » et « Coin gauche » pré-remplis (' + JSON.stringify(f && libs(f.cote)) + ', ' + resume(f) + ')');
    await saisir(p, 'd', '2'); await saisir(p, 'e', '1,5'); await puce(p, 'cote', 'Intérieur');
    const els0 = await elements(p), rl = await coteRef(p, plan(1, 0), 'limite');
    await effacerToast(p);
    await bouton(p, 'cotesPoser');
    const msg = await toastVu(p), oS = nouveaux(els0, await elements(p))[0], att = rl && await placerPage(p, rl.ref, {mode: 'long', coin: rl.gauche, d: 2, e: 1.5, cote: 'derriere'});
    R.ok(!!oS && ecart(oS, att) <= 1e-6 && ecart(att, plan(2, 1.5)) <= 3e-3 && ecart(oS, plan(7, 1.5)) > 1 && !/bâti/.test(msg),
      's : 2 / 1,5 / Intérieur : regard mesuré depuis la limite (2 ; 1,5), pas depuis la façade (7 ; 1,5) ; pas d\'avertissement de bâti (posé ' + pt(oS) + ', attendu ' + pt(att) + ', toast ' + JSON.stringify(msg) + ')');
    erreurs(A, 's');
  } finally { await A.fermer(); }
}

/* g : bâti parcouru dans le sens des aiguilles ; bâti dont la polyligne commence au milieu de la façade sud ; traits de complément du
   croquis, ouvert et fermé. Point attendu : calcul de la convention 11.1 fait à la main, dans le repère local. */
async function geometrie(){
  const A = await C.ouvrir(), p = A.p;
  try {
    const plan = await ouvrirFondFictif(p, 'plan-fictif-geometrie.dxf', dxfFictif([
      ['3BATIDUR', [[5, 0], [5, 10], [15, 10], [15, 0]]],
      ['3BATIDUR', [[25, 0], [30, 0], [30, 10], [20, 10], [20, 0]]]
    ]));
    /* traits de complément du croquis : ouvert, de (40 ; 0) à (40 ; 10) ; fermé, le carré de (50 ; 0) à (60 ; 10) */
    await p.evaluate(Q => {
      const ed = window.__vcEd, S = ed.etat, v = L => L.map(q => ({x: q.x, y: q.y, a: null}));
      S.doc.el = [{id: 'l1', k: 'ln', t: 'lim', v: v(Q.slice(0, 2)), p: {st: 'existant'}, lab: null},
        {id: 'l2', k: 'ln', t: 'lim', v: v(Q.slice(2).concat([Q[2]])), p: {st: 'existant'}, lab: null}];
      S.undo = []; S.redo = []; S.sel = null; S.panneau = null; ed.synchroniser();
    }, [plan(40, 0), plan(40, 10), plan(50, 0), plan(60, 0), plan(60, 10), plan(50, 10)]);
    const O = plan(0, 0), local = q => q ? '(' + (q.x - O.x).toFixed(3) + ' ; ' + (q.y - O.y).toFixed(3) + ')' : 'aucun';
    const reglage = (mode, coin, d, e, cote) => [['puce', 'mode', mode], ['puce', 'coin', coin], ['saisie', 'd', d], ['saisie', 'e', e], ['puce', 'cote', cote]];
    /* nom du cas, type posé, point touché sur le trait, endroit touché, réglages, attendu [u, v, angle] */
    const essai = async (k, t, ref, ou, reg, att) => {
      await C.outil(p, {k: 'pt', t, pal: t === 'gargouille' ? 'equ' : 'reg'}); await C.pause(p, 150);
      const c = plan(ref[0], ref[1]); await C.regler(p, c.x, c.y, 30);
      if (!await entrer(p)){ R.ok(false, 'g : ' + k + ' : pas de bouton « Cotes »'); return; }
      await toucherPlan(p, plan(ref[0], ref[1])); await toucherPlan(p, plan(ou[0], ou[1]), 700);
      const f = await panneau(p);
      for (const x of reg) if (x[0] === 'puce') await puce(p, x[1], x[2]); else await saisir(p, x[1], x[2]);
      const els0 = await elements(p);
      await bouton(p, 'cotesPoser');
      const o = nouveaux(els0, await elements(p))[0], P = plan(att[0], att[1]);
      R.ok(!!o && o.t === t && ecart(o, P) <= 1e-6 && (att[2] == null || o.p.a === att[2]), 'g : ' + k + ' : en (' + att[0] + ' ; ' + att[1] + ')'
        + (att[2] == null ? '' : ', angle ' + att[2]) + ' (posé ' + local(o) + (o && att[2] != null ? ', angle ' + o.p.a : '') + ' ; pré-rempli ' + resume(f) + ')');
      await fermerFiche(p);
    };
    await essai('bâti horaire, au-delà du coin gauche (ouest), 2 / 0,5 / Droite', 'regard', [10, 0], [3, -0.7], reglage('Prolongement', 'Coin gauche', '2', '0,5', 'Droite'), [3, -0.5]);
    await essai('bâti horaire, le long depuis le coin gauche, 3 / 1 / Devant', 'regard', [10, 0], [8, -1.2], reglage('Le long', 'Coin gauche', '3', '1', 'Devant'), [8, -1]);
    await essai('gargouille le long du bâti horaire : tournée vers le dehors (sud)', 'gargouille', [10, 0], [8, -1.2], reglage('Le long', 'Coin gauche', '3', '1', 'Devant'), [8, -1, 270]);
    await essai('façade coupée au sommet 0, touchée à l\'ouest du sommet : au-delà du coin droit (est), 2 / 0,5 / Droite', 'regard', [21, 0], [31, -0.7],
      reglage('Prolongement', 'Coin droit', '2', '0,5', 'Droite'), [32, 0.5]);
    await essai('façade coupée au sommet 0, touchée à l\'est du sommet : au-delà du coin gauche (ouest), 2 / 0,5 / Droite', 'regard', [28, 0], [19, -0.7],
      reglage('Prolongement', 'Coin gauche', '2', '0,5', 'Droite'), [18, -0.5]);
    await essai('trait ouvert touché à l\'est : Devant à l\'est, coin gauche au sud, 3 / 1 / Devant', 'regard', [40, 5], [41, 4.9], reglage('Le long', 'Coin gauche', '3', '1', 'Devant'), [41, 3]);
    await essai('trait ouvert touché à l\'ouest : Devant à l\'ouest, coin gauche au nord, 3 / 1 / Devant', 'regard', [40, 5], [39, 4.9], reglage('Le long', 'Coin gauche', '3', '1', 'Devant'), [39, 7]);
    await essai('trait de complément fermé, côté sud, le long depuis le coin gauche, 3 / 1 / Devant', 'regard', [55, 0], [52, -1.1], reglage('Le long', 'Coin gauche', '3', '1', 'Devant'), [53, -1]);
    erreurs(A, 'g');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [prolongement, poses, valeursEtSorties, superposees, geometrie]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
