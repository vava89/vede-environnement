// Pose d'un objet par cotes dans l'éditeur du croquis, dans Chromium (données fictives : fond de VCroquis.demoDxf(), croquis de
// démonstration, et un fond fictif construit ici) : correctifs m101 (pose), m102 (« Déplacer par cotes » et « Mesurer depuis une
// façade ») et m108 (départ d'un escalier par cotes) ; souhaits 11 et 12, réponses 11.1 et 11.3, convention 11.1 et décisions D1, D2,
// D3 et D7 de .claude/conception-outils-dessin.md.
// m101 :
// b : avec un outil d'objet, la barre d'aide a un bouton « Cotes » ; son toucher demande « Touchez la façade ou la limite de référence » ;
//     témoins : l'outil Tronçon et le texte libre n'en ont pas (l'outil Escalier en a un : contrôles e, m108) ;
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
// m102 (depuis la fiche d'un objet ponctuel ; rien n'est gardé des cotes, seule la position compte) :
// m : un regard posé par cotes à 2 / 0,5 / Droite au-delà du coin ouest : sa fiche a les boutons « Déplacer par cotes » et « Mesurer
//     depuis une façade » ; « Mesurer », puis la façade : le panneau « Cotes » s'ouvre aussitôt, rempli par la mesure (Prolongement,
//     Coin gauche, 2,00 / 0,50 / Droite), « Déplacer » à la place de « Poser » ; cotes gardées exactes (placer redonne la position à
//     1e-9 près) ; « Déplacer » sans rien changer : rien ne bouge, aucun pas d'annulation, fiche rouverte ; un tronçon attaché au regard,
//     distance passée de 2 à 3, « Déplacer » : point de placer à 1e-6 près, (62,5 ; 3,5), JSON identique hors x et y, le bout de tuyau
//     suit, un seul pas d'annulation, regard choisi et fiche rouverte ; « Annuler » rend le croquis exact ; regard posé le long (coin
//     gauche, 3 / 1 / Devant) : la mesure redonne Le long, Coin gauche, 3,00 / 1,00 / Devant ; Derrière puis « Déplacer » : le point
//     tombe dans le bâti, toast, déplacement fait (68,5 ; 5) ;
// r : « Déplacer par cotes » du regard R1 de la démonstration (six tuyaux attachés) : la façade (étape « endroit »), puis un endroit
//     approximatif : pré-remplissage multiple de 0,05, « Regard déplacé depuis : Façade » ; « Déplacer » : au point exact de placer, les
//     six bouts de tuyau suivent, rien d'autre ne change, un pas d'annulation ;
// n : décalage nul : la mesure montre le côté par défaut (Droite dans le prolongement, Devant le long) ; « -1 » refusé ; « -1 » tapé
//     puis « Déplacer » aussitôt : rien ne bouge ; « Fermer » : croquis inchangé (JSON), fiche de l'objet rouverte ; Échap et la croix du
//     panneau : mode fini sans rien changer, fiche non rouverte ; « Autre trait » puis la façade ouest : mesure depuis elle
//     (VCroquis.geo.mesurer calculé ici) ; objet supprimé pendant le mode (panneau ouvert, ou étape « cote ») : le mode se ferme ; autre
//     choix pendant le mode : le mode se ferme sans rien changer ;
// a : un caniveau posé par cotes, tourné de 15° dans sa fiche, puis déplacé par cotes : son angle ne change pas ;
// c : les deux boutons sur la fiche de chaque type d'objet ponctuel de la démonstration ; témoins : ni sur un tronçon, ni sur un
//     collecteur, ni sur un texte libre, ni sur un objet de type inconnu ;
// u : le regard posé depuis la limite (cas s) mesuré : la façade d'abord (Prolongement, Coin gauche, 3,00 / 1,50 / Gauche), puis, au
//     même point du trait, la limite qui la longe (Le long, Coin gauche, 2,00 / 1,50 / Intérieur), puis de nouveau la façade ; décalage
//     passé à 0 depuis la limite, puis « Déplacer » : le regard sur la limite, en (2 ; 0) ; mesuré, il montre le côté par défaut,
//     « Droite » depuis la façade (3,00 / 0,00), « Extérieur » depuis la limite (2,00 / 0,00).
// Sur efe2bf3, trois contrôles échouent (u, m, n : boutons absents) ; les suivants, témoins compris, ne sont pas lancés.
// m108 (outil « Escalier », croquis vidé : seul le fond de démonstration reste ; départ dans le repère de la démonstration) :
// e1 : outil choisi, aucun départ : la barre d'aide a le bouton « Cotes » ;
// e2 : fond masqué : « Cotes » donne le toast « Aucune ligne de référence affichée », sans entrer dans le mode ;
// e3 : « Cotes » : étape « cote », aide « Touchez la façade ou la limite de référence », S.cotes.pour = {esc: true}, sans identifiant ;
// e4 : pendant le mode, un glissé déplace la vue et ne commence aucun tracé ;
// e5 à e11 : le long de la façade sud, coin gauche, 3 / 0 / Devant : bouton « Poser le départ » (pas de « Déplacer ») ; départ au
//     point des cotes (1e-9 près ; 1e-6 près d'un calcul fait ici ; (68,5 ; 4)) ; mode fermé, outil Escalier toujours actif, barre
//     « touchez la fin » avec « Point » et « Abandonner » ; rien d'enregistré, aucun pas d'annulation ; la fin touchée : un escalier
//     de deux sommets, d'équerre, largeur à l'opposé du coin (« g »), montée vers le départ, marches arrondi(L / 0,28) ; fiche
//     ouverte, un seul pas d'annulation, « Annuler » rend le croquis exact (ici, les deux côtés sont hors du bâti ; le repli sur la règle
//     de m107 quand le côté opposé au coin entrerait dans le bâti est vérifié par tests/vm/escalier.js, d13) ;
// e12 : le même départ depuis le coin droit : largeur de l'autre côté ;
// e13, e14 : dans le prolongement au-delà du coin ouest, 2 / 0,5 / Droite : départ en (63,5 ; 3,5), fin redressée d'équerre (à
//     l'arrondi du plan près) ; montée vers la fin (départ hors façade), largeur à l'opposé du coin (« d ») ;
// e15 : 3 / 1 / Derrière : le point tombe dans le bâti (68,5 ; 5) : toast, départ posé quand même ;
// e16 à e20 : « Abandonner », « Point », un autre outil (avant ou après la pose), Échap et ouvrir() oublient le départ et ses cotes :
//     l'escalier tracé ensuite au doigt reprend les valeurs de m107 (« g ») ; croquis inchangé ;
// e21 : départ posé par cotes depuis le coin droit, puis la souris survole la fin : le contour fantôme a les quatre coins de l'escalier
//     créé ensuite, du côté des cotes (« d » ; la règle de m107 donnerait « g ») ;
// e22 : double toucher sur « Abandonner » après « Poser le départ » : le second tombe sur « Cotes », venu à sa place ; il est ignoré
//     (0,5 s) et le mode ne s'ouvre pas ; « Cotes » touché ensuite l'ouvre ;
// e23 : « Le long », coin gauche, 10 m pour un côté de 9 m : le départ tombe au-delà du coin droit, hors de la façade : point sans aide,
//     montée vers la fin ; témoin : à 9 m, sur le coin droit, aide « facade » et montée vers le départ.
// Sur b08e6cd, e1 échoue (pas de bouton « Cotes » avec l'outil Escalier) ; les suivants ne sont pas lancés. Sans b.cotes dans le contour
// fantôme, e21 échoue ; sans la garde de 0,5 s de « Cotes », e22 ; sans la borne de la distance (départ au-delà du coin), e23.
// e24 (m115) : trait « Complément du fond » de (66 ; 22) à (74 ; 22) : départ posé par cotes le long du trait (décalage 0, à 1 m du coin),
//     fin à 2,5 m : aide « facade », montée vers le départ, comme le départ touché au même point (règle de m112) ; témoin : la même pose le
//     long de la limite nord de la parcelle, montée vers la fin. Échoue sur 52f0b00 (par cotes : aucune aide, montée vers la fin).
// q1 à q5 (m133 ; M4 de la relecture de m132 ; M2, M4 et M7 de celle de m133) : l'aide nomme l'objet par son libellé (libDe), comme
//     l'en-tête de sa fiche ; le panneau aussi, mais un nom libre, dont le genre n'est pas connu, suit le type, auquel s'accorde le
//     participe. Un autre appareil nommé « Bidet » : « Déplacer par cotes (Bidet). », puis la façade sud et un endroit : « Autre appareil
//     « Bidet » déplacé depuis : Façade » (q1) ; un WC à lave-mains intégré : « Déplacer par cotes (WC + lave-mains). », « WC + lave-mains
//     déplacé depuis : Façade » (q2) ; « Mesurer depuis une façade (Bidet). », « Autre appareil « Bidet » mesuré depuis : Façade » (q3) ;
//     un nom féminin : « Déplacer par cotes (Fontaine). », « Autre appareil « Fontaine » déplacé depuis : Façade » (q4) ; une destination
//     nommée « Mare », article « la », comme à sa pose : « Déplacer par cotes (Mare). », « Mare déplacée depuis : Façade » (q5). Échouent
//     sur 53fe487 (« Autre appareil », « WC », « Autre destination ») ; q1, q3, q4 et q5 avant la relecture de m133 (« Bidet déplacé »,
//     « Fontaine déplacé », « Autre destination »).
// w1 à w20 (m146, « Deux points », décision D12 de .claude/conception-v172.md ; fond fictif : une parcelle et un bâti dont le coin sud-ouest
//     est en (14 ; 6) ; regards R1 en (0 ; 0), R2 en (10 ; 0) et R3 en (4 ; -3), dans le repère du fond) :
// w1 : « Cotes » d'un regard : la barre d'aide a « Deux points » avant « Abandonner » ;
// w2 : « Deux points » touché quelques millisecondes après « Cotes » (double toucher) : ignoré ; touché ensuite : étape « p1 », aide « Touchez le
//     point 1 (coin ou objet). », avec le seul « Abandonner » ;
// w3 : un toucher dans le vide, puis sur la façade loin d'un coin : toast « Touchez un coin ou un objet », l'étape reste ;
// w4 : tolérance du doigt (24 px) : à 28 px de R1, rien ; à 20 px, R1, sa position copiée (pas celle du toucher) ; aide « Touchez le
//     point 2. », avec le seul « Abandonner » ;
// w5 : R1 de nouveau : toast « Touchez deux points différents », l'étape reste ;
// w6 : R2 : panneau « Cotes » : « Regard posé depuis deux points (à 10,00 m l'un de l'autre). », champs « Distance depuis le point 1 (m) »
//     et « Distance depuis le point 2 (m) » vides, pas de puces, « Poser » et « Fermer » ; rien n'est posé ;
// w7 : un toucher du plan, panneau ouvert : toast « Réglez les cotes dans le panneau… », rien ne change ;
// w8 : une seule distance, puis « Poser » : toast « Saisissez les deux distances. », rien n'est posé, le mode reste ;
// w9 : aperçu pendant la frappe : 6 et 3, le message « Les deux cotes ne se croisent pas : les deux points sont à 10,00 m l'un de
//     l'autre. » à la place des puces ; 6 et 8, les puces « Solution 1 » (choisie) et « Solution 2 », sans libellé de champ ;
// w10 : « Poser » : le regard en (3,6 ; 4,8) à 1 cm près, un pas d'annulation, fiche ouverte, mode fini ; « Annuler » rend le croquis exact ;
// w11 : de nouveau, « Solution 2 » : (3,6 ; -4,8) ;
// w12 : « Annuler » à l'étape « p2 » : la dernière pose est défaite, le mode fini ;
// w13 : le coin du bâti comme point 1, R2 comme point 2 (7,21 m), 5 et 4, Solution 1 : à 5 m du coin et à 4 m de R2 (1 cm près), à
//     gauche du coin vers R2 ;
// w14 : 2 et 3 : le message (« 10,00 m »), pas de puces ; « Poser » : toast du même message, rien n'est posé ; « Fermer » : mode fini ;
// w15 : tangence (6 et 4) : ni puces ni message ; posé en (6 ; 0) ;
// w16 : « Mesurer depuis une façade » : pas de « Deux points » ;
// w17 : « Déplacer par cotes » de R3 par deux points : R3 lui-même n'est pas un point ; R1 et R2 : « Regard déplacé depuis deux points
//     (à 10,00 m l'un de l'autre). », distances actuelles (5,00 et 6,71), Solution 2 choisie (R3 est à droite de R1 vers R2),
//     « Déplacer » et « Fermer » ; « Déplacer » sans rien changer : rien ne bouge, aucun pas d'annulation, fiche rouverte ;
// w18 : 6 et 8 : « Déplacer » : R3 en (3,6 ; -4,8), seuls x et y changent, un pas d'annulation, fiche rouverte ; « Annuler » le ramène ;
// w19 : départ d'un escalier par deux points : « Poser le départ » : brouillon d'un point en (3,6 ; 4,8), sans aide, ni b.cotes, ni
//     surBati ; mode fini, outil Escalier actif, aucun pas d'annulation ; la fin touchée : un escalier qui part de ce point ;
// w20 : Échap (étape « p1 », puis panneau ouvert), « Abandonner » (étape « p2 »), un autre outil, la croix du panneau : mode fini,
//     croquis inchangé, aucun pas d'annulation ;
// w21 : « Autre trait », puis « Deux points » aussitôt (il vient à sa place) : ignoré ; touché 0,5 s plus tard : étape « p1 » ;
// w22 : un caniveau (objet orientable) posé par deux points, orientation automatique active, plan tourné de 15° : son angle est celui de
//     la rotation du plan (15°) ;
// w23 : 6 et 8 enregistrés, « -1 » tapé pour le point 2, puis « Poser » aussitôt : valeur refusée (8 gardé), rien n'est posé, le mode reste ;
// w24 : deux coins du bâti, 6 et 8 : la place tombe dans le bâti ; le regard est posé, avec l'avertissement « Le point tombe dans le
//     bâti… » ; « Annuler » le retire ;
// w25 : R4 à 0,3 mm de la droite de R1 à R2 : « Déplacer par cotes », « Deux points », R1, R2 : une seule place (pas de puces) ;
//     « Déplacer » sans rien changer : R4 ne bouge pas (avant : posé sur la droite, avec un pas d'annulation) ;
// w26 : écran de 400 × 800, double toucher sur « Deux points » : le second tombe sur « Abandonner », venu à sa place ; il est ignoré
//     (étape « p1 », avant : fin du mode) ; « Abandonner » touché 0,5 s plus tard finit le mode.
// Sur 72fd069, w1 échoue (pas de bouton « Deux points ») ; les suivants ne sont pas lancés, sauf w26, qui échoue (pas de bouton).
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

/* m102 : boutons de la fiche d'un objet ponctuel, cherchés par leur texte (absents avant m102) */
const DEPLACER = 'Déplacer par cotes', MESURER = 'Mesurer depuis une façade';
const textesBoutons = p => p.evaluate(() => { const c = document.querySelector('.vc .vc-panneau:not([hidden]) .vc-pcorps'); return c ? Array.from(c.querySelectorAll('button')).map(b => b.textContent.replace(/\s+/g, ' ').trim()) : []; });
async function boutonTexte(p, lib){
  for (const b of await p.$$(PANNEAU + 'button')) if ((await b.textContent()).replace(/\s+/g, ' ').trim() === lib){ await b.click(); await C.pause(p, 350); return true; }
  return false;
}
/* croquis de démonstration : fiche de l'objet id (rien d'autre d'ouvert, vue de départ), son bouton lib, puis, si q est donné, le toucher
   du trait de référence en q */
async function depuisFiche(A, id, lib, q){
  const p = A.p;
  await toutFermer(p); await vueDemo(A);
  await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 250);
  if (!await boutonTexte(p, lib)) return false;
  if (q) await toucherPlan(p, q);
  return true;
}
/* élément choisi, panneau ouvert et étape du mode ('absent' : version sans le mode) */
const choix = p => p.evaluate(() => { const S = window.__vcEd.etat; return {sel: S.sel ? S.sel.id : null, pan: S.panneau, cotes: S.cotes === undefined ? 'absent' : S.cotes ? S.cotes.etape : null}; });
const objet = (p, id) => p.evaluate(id => { const e = window.__vcEd.doc().el.find(x => x.id === id); return e ? JSON.parse(JSON.stringify(e)) : null; }, id);
/* JSON d'un objet sans sa position ; croquis sans la position de l'objet id ni celle des sommets qui lui sont attachés */
const sansXY = o => o ? JSON.stringify(Object.assign({}, o, {x: 0, y: 0})) : '';
const horsPosition = (els, id) => JSON.stringify(els.map(e => e.id === id ? Object.assign({}, e, {x: 0, y: 0})
  : e.k === 'ln' ? Object.assign({}, e, {v: e.v.map(v => v.a === id ? Object.assign({}, v, {x: 0, y: 0}) : v)}) : e));
/* sommets de tracé attachés à l'objet id : leur nombre, et s'ils sont tous à sa position (à 1e-9 près) */
const attaches = (els, id) => {
  const o = els.find(e => e.id === id), V = [];
  els.forEach(e => { if (e.k === 'ln') e.v.forEach(v => { if (v.a === id) V.push(v); }); });
  return {n: V.length, ok: !!o && V.every(v => Math.hypot(v.x - o.x, v.y - o.y) <= 1e-9)};
};
/* côté retenu, cotes exactes (sans l'arrondi de l'affichage) et objet du mode */
const cotesExactes = p => p.evaluate(() => { const C = window.__vcEd.etat.cotes; return C && C.ref && C.c ? {ref: {A: C.ref.A, B: C.ref.B, n: C.ref.n}, c: Object.assign({}, C.c), nat: C.ref.nat, pour: Object.assign({}, C.pour)} : null; });
/* m101 : un objet de type t posé par cotes depuis la façade sud de la démonstration : endroit ou ([u, v]), réglages reg ([clé, valeur] :
   saisie pour d et e, puce sinon) ; puis l'outil Choisir. Rend l'objet posé (choisi, fiche ouverte) ou null */
async function poserObjetParCotes(A, t, pal, ou, reg){
  const p = A.p;
  await toutFermer(p); await vueDemo(A);
  await C.outil(p, {k: 'pt', t, pal}); await C.pause(p, 150);
  if (!await entrer(p)) return null;
  await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(ou[0], ou[1]));
  for (const x of reg) if (x[0] === 'd' || x[0] === 'e') await saisir(p, x[0], x[1]); else await puce(p, x[0], x[1]);
  const els0 = await elements(p);
  await bouton(p, 'cotesPoser');
  await C.outil(p, {k: 'main'}); await C.pause(p, 150);
  return nouveaux(els0, await elements(p))[0] || null;
}

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

    /* témoins : l'outil Tronçon et le texte libre, sans bouton « Cotes » (l'outil Escalier en a un : contrôles e, m108) */
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

    /* u (m102) : « Mesurer depuis une façade » sur ce regard ; touchers répétés au même point du trait : la façade, la limite, la façade */
    if (!oS) return;
    await C.outil(p, {k: 'main'}); await C.pause(p, 150);
    await p.evaluate(id => window.__vcEd.selectionner(id), oS.id); await C.pause(p, 250);
    if (!await boutonTexte(p, MESURER)){ R.ok(false, 'u : fiche du regard sans bouton « Mesurer depuis une façade » (' + JSON.stringify((await textesBoutons(p)).filter(x => /cotes|façade/i.test(x))) + ')'); return; }
    const vus2 = [];
    for (let i = 0; i < 3; i++){
      await toucherPlan(p, q);
      const g = await panneau(p), a = await texteAide(p), nat = !g ? 'pas de panneau' : /depuis : Limite de parcelle/.test(g.texte) ? 'limite' : /depuis : Façade/.test(g.texte) ? 'façade' : '?';
      vus2.push(nat + ' ' + resume(g) + (/(Limite de parcelle|Façade) \(\d sur 2\)/.test(a) ? '' : ' aide ' + JSON.stringify(a)));
    }
    const FAC = 'façade {"titre":"Cotes","mode":"Prolongement","coin":"Coin gauche","cote":"Gauche","d":"3,00","e":"1,50"}';
    const LIM = 'limite {"titre":"Cotes","mode":"Le long","coin":"Coin gauche","cote":"Intérieur","d":"2,00","e":"1,50"}';
    R.ok(vus2.join(' ; ') === [FAC, LIM, FAC].join(' ; '),
      'u : mesure du regard posé depuis la limite : la façade d\'abord (Prolongement, Coin gauche, 3,00 / 1,50 / Gauche), puis, au même point du trait, la limite qui la longe (Le long, Coin gauche, 2,00 / 1,50 / Intérieur), puis de nouveau la façade ('
      + vus2.join(' ; ') + ')');
    await bouton(p, 'cotesFermer');
    /* décalage passé à 0 dans la mesure depuis la limite, puis « Déplacer » : le regard sur la limite, en (2 ; 0) ; mesuré de nouveau, il
       montre le côté par défaut : « Droite » depuis la façade (prolongement), « Extérieur » depuis la limite (le long) */
    const vus3 = []; let o0 = null;
    if (await boutonTexte(p, MESURER)){
      await toucherPlan(p, q); await panneau(p); await toucherPlan(p, q);
      const g = await panneau(p);
      if (g && /depuis : Limite de parcelle/.test(g.texte)){ await saisir(p, 'e', '0'); await bouton(p, 'cotesDeplacer'); o0 = await objet(p, oS.id); }
      if (o0 && await boutonTexte(p, MESURER)) for (let i = 0; i < 2; i++){ await toucherPlan(p, q); vus3.push(resume(await panneau(p))); }
      await bouton(p, 'cotesFermer');
    }
    const P0 = rl && await placerPage(p, rl.ref, {mode: 'long', coin: rl.gauche, d: 2, e: 0, cote: 'devant'});
    const FAC0 = '{"titre":"Cotes","mode":"Prolongement","coin":"Coin gauche","cote":"Droite","d":"3,00","e":"0,00"}';
    const LIM0 = '{"titre":"Cotes","mode":"Le long","coin":"Coin gauche","cote":"Extérieur","d":"2,00","e":"0,00"}';
    R.ok(!!o0 && ecart(o0, P0) <= 1e-6 && ecart(P0, plan(2, 0)) <= 3e-3 && vus3.join(' ; ') === [FAC0, LIM0].join(' ; '),
      'u : décalage passé à 0 dans la mesure depuis la limite, puis « Déplacer » : regard sur la limite, en (2 ; 0) ; mesuré, il montre le côté par défaut, '
      + 'Droite depuis la façade (3,00 / 0,00), Extérieur depuis la limite (2,00 / 0,00) (' + pt(o0) + ' pour ' + pt(P0) + ' ; ' + vus3.join(' ; ') + ')');
    erreurs(A, 's, u');
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

/* m, r (m102) : « Mesurer depuis une façade » puis « Déplacer », sur un regard posé par cotes ; « Déplacer par cotes » du regard R1 */
async function mesureEtDeplacement(){
  const A = await croquisDemo(), p = A.p;
  try {
    const r = await coteRef(p, A.plan(70, 4), 'bati');
    if (!r){ R.ok(false, 'm : façade sud introuvable dans lignesRef'); return; }
    const ouest = coinPres(r.ref, A.plan(65.5, 4));
    /* un regard posé par cotes à 2 / 0,5 / Droite au-delà du coin ouest : (63,5 ; 3,5) */
    const o = await poserObjetParCotes(A, 'regard', 'reg', [63.2, 3.3], [['d', '2'], ['e', '0,5'], ['cote', 'Droite']]);
    const P0 = await placerPage(p, r.ref, {mode: 'prol', coin: ouest, d: 2, e: 0.5, cote: 'droite'});
    if (!o || ecart(o, P0) > 1e-6){ R.ok(false, 'm : regard posé par cotes introuvable (' + pt(o) + ' pour ' + pt(P0) + ')'); return; }
    const bt = await textesBoutons(p), ch0 = await choix(p);
    R.ok(ch0.sel === o.id && ch0.pan === 'fiche' && bt.includes(DEPLACER) && bt.includes(MESURER),
      'm : fiche du regard posé : boutons « Déplacer par cotes » et « Mesurer depuis une façade » (' + JSON.stringify(bt.filter(x => /cotes|façade/i.test(x))) + ', ' + JSON.stringify(ch0) + ')');
    if (!bt.includes(MESURER)) return;
    const avant = await etatDoc(p), u0 = await nUndo(p);
    await boutonTexte(p, MESURER);
    const ch1 = await choix(p), a1 = await texteAide(p);
    R.ok(ch1.cotes === 'cote' && ch1.sel === null && ch1.pan === null && /^Mesurer depuis une façade \(Regard\)\. Touchez la façade ou la limite de référence/.test(a1),
      'm : « Mesurer depuis une façade » : étape « cote », fiche fermée, aide « Mesurer depuis une façade (Regard). Touchez la façade ou la limite de référence » ('
      + JSON.stringify(ch1) + ', ' + JSON.stringify(a1) + ')');
    await toucherPlan(p, A.plan(70, 4));
    const f1 = await panneau(p), x1 = await cotesExactes(p), dep1 = !!await p.$(PANNEAU + 'button[data-a="cotesDeplacer"]');
    R.ok(!!f1 && f1.titre === 'Cotes' && pressee(f1.mode) === 'Prolongement' && pressee(f1.coin) === 'Coin gauche' && !!f1.d && f1.d.val === '2,00' && f1.e.val === '0,50'
      && pressee(f1.cote) === 'Droite' && dep1 && !f1.poser && f1.fermer && f1.texte.indexOf('Regard mesuré depuis : Façade') >= 0,
      'm : façade touchée : le panneau « Cotes » s\'ouvre aussitôt, rempli par la mesure : Prolongement, Coin gauche, 2,00 / 0,50 / Droite ; « Déplacer » à la place de « Poser » ; '
      + '« Regard mesuré depuis : Façade » (' + resume(f1) + ', ' + JSON.stringify(f1 && f1.texte.trim().slice(0, 40)) + ')');
    const Pm = x1 && await placerPage(p, x1.ref, x1.c);
    R.ok(!!x1 && x1.c.mode === 'prol' && x1.c.coin === ouest && Math.abs(x1.c.d - 2) <= 1e-9 && Math.abs(x1.c.e - 0.5) <= 1e-9 && ecart(Pm, o) <= 1e-9,
      'm : cotes gardées exactes, sans arrondi : placer redonne la position du regard à 1e-9 près (d ' + (x1 && x1.c.d) + ', e ' + (x1 && x1.c.e) + ', écart '
      + (Pm ? ecart(Pm, o).toExponential(1) : '—') + ' m)');
    await bouton(p, 'cotesDeplacer');
    const ch2 = await choix(p), o2 = await objet(p, o.id);
    R.ok(await etatDoc(p) === avant && await nUndo(p) === u0 && !!o2 && o2.x === o.x && o2.y === o.y && ch2.cotes === null && ch2.sel === o.id && ch2.pan === 'fiche',
      'm : « Déplacer » sans rien changer : le regard ne bouge pas (croquis identique), aucun pas d\'annulation ; mode fini, regard choisi, fiche rouverte (' + JSON.stringify(ch2) + ')');

    /* un tronçon dont le premier bout est attaché au regard ; distance passée de 2 à 3, puis « Déplacer » */
    await p.evaluate(id => {
      const ed = window.__vcEd, S = ed.etat, e = S.doc.el.find(x => x.id === id);
      S.doc.el.push({id: 'tz', k: 'ln', t: 'tr', v: [{x: e.x, y: e.y, a: id}, {x: e.x - 1.5, y: e.y - 2, a: null}], p: window.VCroquis.defautsLn('tr'), lab: null});
      ed.synchroniser();
    }, o.id);
    const avant2 = await etatDoc(p), u1 = await nUndo(p), els2 = await elements(p), tz0 = els2.find(e => e.id === 'tz');
    await depuisFiche(A, o.id, MESURER, A.plan(70, 4));
    await saisir(p, 'd', '3');
    const f3 = await panneau(p);
    await bouton(p, 'cotesDeplacer');
    const els3 = await elements(p), o3 = els3.find(e => e.id === o.id), tz3 = els3.find(e => e.id === 'tz'), ch3 = await choix(p);
    const att3 = await placerPage(p, r.ref, {mode: 'prol', coin: ouest, d: 3, e: 0.5, cote: 'droite'});
    R.ok(!!f3 && !!f3.d && f3.d.val === '3,00' && !!o3 && ecart(o3, att3) <= 1e-6 && ecart(att3, A.plan(62.5, 3.5)) <= 3e-3,
      'm : distance passée de 2 à 3, puis « Déplacer » : le regard au point de VCroquis.geo.placer à 1e-6 près, (62,5 ; 3,5) de la démonstration (' + pt(o3) + ' pour ' + pt(att3)
      + ', ' + resume(f3) + ')');
    R.ok(!!o3 && sansXY(o3) === sansXY(els2.find(e => e.id === o.id)) && horsPosition(els3, o.id) === horsPosition(els2, o.id),
      'm : seuls x et y du regard changent (JSON identique hors x et y : étiquette, statut, réseau, p) ; rien d\'autre ne change, hors du bout attaché');
    R.ok(!!tz0 && !!tz3 && tz3.v[0].a === o.id && !!o3 && Math.hypot(tz3.v[0].x - o3.x, tz3.v[0].y - o3.y) <= 1e-9 && tz3.v[1].x === tz0.v[1].x && tz3.v[1].y === tz0.v[1].y,
      'm : le bout de tuyau attaché suit le regard (sommet à la nouvelle position, toujours attaché ; l\'autre bout ne bouge pas) (' + pt(tz3 && tz3.v[0]) + ')');
    R.ok(await nUndo(p) === u1 + 1 && ch3.cotes === null && ch3.sel === o.id && ch3.pan === 'fiche',
      'm : un seul pas d\'annulation ; le regard reste choisi, sa fiche rouverte, mode fini (' + JSON.stringify(ch3) + ')');
    await annuler(p);
    R.ok(await etatDoc(p) === avant2, 'm : « Annuler » remet le regard et le bout de tuyau (croquis exact)');

    /* regard posé le long (coin gauche, 3 / 1 / Devant) : la mesure redonne 3,00 / 1,00 / Devant ; Derrière : le point tombe dans le bâti */
    const o4 = await poserObjetParCotes(A, 'regard', 'reg', [72, 2.6], [['coin', 'Coin gauche'], ['d', '3'], ['e', '1'], ['cote', 'Devant']]);
    if (o4 && await boutonTexte(p, MESURER)){
      await toucherPlan(p, A.plan(70, 4));
      const f4 = await panneau(p), x4 = await cotesExactes(p);
      R.ok(!!f4 && pressee(f4.mode) === 'Le long' && pressee(f4.coin) === 'Coin gauche' && !!f4.d && f4.d.val === '3,00' && f4.e.val === '1,00' && pressee(f4.cote) === 'Devant'
        && !!x4 && x4.c.coin === r.gauche, 'm : regard posé le long (coin gauche, 3 / 1 / Devant) : la mesure redonne Le long, Coin gauche, 3,00 / 1,00 / Devant (' + resume(f4) + ')');
      await puce(p, 'cote', 'Derrière'); await effacerToast(p);
      const u4 = await nUndo(p);
      await bouton(p, 'cotesDeplacer');
      const msg = await toastVu(p), o5 = await objet(p, o4.id), P5 = await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 3, e: 1, cote: 'derriere'});
      R.ok(/^Le point tombe dans le bâti/.test(msg) && !!o5 && ecart(o5, P5) <= 1e-6 && ecart(P5, A.plan(68.5, 5)) <= 3e-3 && await nUndo(p) === u4 + 1,
        'm : Derrière, puis « Déplacer » : le point tombe dans le bâti, avertissement, regard déplacé quand même, en (68,5 ; 5) (' + JSON.stringify(msg) + ', ' + pt(o5) + ' pour ' + pt(P5) + ')');
      await annuler(p);
    } else R.ok(false, 'm : regard posé le long : pas de bouton « Mesurer depuis une façade » (' + pt(o4) + ')');

    /* r : « Déplacer par cotes » du regard R1 de la démonstration (d9, six tuyaux attachés) */
    const id = 'd9', R1 = await objet(p, id), elsD = await elements(p), avantD = await etatDoc(p), uD = await nUndo(p), nAtt = attaches(elsD, id).n;
    if (!R1 || R1.t !== 'regard'){ R.ok(false, 'r : regard R1 (d9) introuvable'); return; }
    if (!await depuisFiche(A, id, DEPLACER)){ R.ok(false, 'r : fiche de R1 sans bouton « Déplacer par cotes »'); return; }
    const aD = await texteAide(p), chD = await choix(p);
    await toucherPlan(p, A.plan(70, 4));
    const aD2 = await texteAide(p), chD2 = await choix(p);
    R.ok(chD.cotes === 'cote' && /^Déplacer par cotes \(Regard\)\. Touchez la façade ou la limite de référence/.test(aD) && chD2.cotes === 'endroit' && /Touchez le nouvel endroit de l'objet/.test(aD2),
      'r : « Déplacer par cotes » : étape « cote » (« Déplacer par cotes (Regard) »), puis la façade : étape « endroit », « Touchez le nouvel endroit de l\'objet » ('
      + JSON.stringify(aD) + ', ' + JSON.stringify(aD2) + ')');
    await toucherPlan(p, A.plan(69.13, 2.07));
    const fD = await panneau(p), xD = await cotesExactes(p), depD = !!await p.$(PANNEAU + 'button[data-a="cotesDeplacer"]');
    R.ok(!!fD && pressee(fD.mode) === 'Le long' && !!fD.d && mult5(nombre(fD.d.val)) && mult5(nombre(fD.e.val)) && !!xD && mult5(xD.c.d) && mult5(xD.c.e) && !fD.poser && depD
      && fD.texte.indexOf('Regard déplacé depuis : Façade') >= 0,
      'r : endroit approximatif : panneau « Cotes » pré-rempli à 5 cm près (multiples de 0,05), « Regard déplacé depuis : Façade », « Déplacer » (' + resume(fD) + ')');
    await bouton(p, 'cotesDeplacer');
    const els5 = await elements(p), o6 = els5.find(e => e.id === id), PD = xD && await placerPage(p, xD.ref, xD.c), sv = attaches(els5, id);
    R.ok(!!o6 && ecart(o6, PD) <= 1e-6 && ecart(o6, R1) > 1 && sansXY(o6) === sansXY(R1) && nAtt >= 6 && sv.n === nAtt && sv.ok && horsPosition(els5, id) === horsPosition(elsD, id),
      'r : « Déplacer » : R1 au point exact de placer, ses ' + nAtt + ' bouts de tuyau suivent, rien d\'autre ne change (' + pt(o6) + ' pour ' + pt(PD) + ', ' + sv.n + ' sommets attachés'
      + (sv.ok ? '' : ', pas tous suivis') + ')');
    R.ok(await nUndo(p) === uD + 1, 'r : un seul pas d\'annulation');
    await annuler(p);
    R.ok(await etatDoc(p) === avantD, 'r : « Annuler » remet R1 et ses tuyaux (croquis exact)');
    erreurs(A, 'm, r');
  } finally { await A.fermer(); }
}

/* n, a, c (m102) : décalage nul, valeurs refusées, « Fermer », « Autre trait », objet supprimé, autre choix ; angle gardé ; boutons de la
   fiche de chaque type d'objet ponctuel, et témoins */
async function casLimites(){
  const A = await croquisDemo(), p = A.p;
  try {
    const r = await coteRef(p, A.plan(70, 4), 'bati');
    if (!r){ R.ok(false, 'n : façade sud introuvable dans lignesRef'); return; }
    /* décalage nul : 2 / 0 / Gauche dans le prolongement */
    const z1 = await poserObjetParCotes(A, 'regard', 'reg', [63.2, 3.3], [['d', '2'], ['e', '0'], ['cote', 'Gauche']]);
    if (!z1 || !await boutonTexte(p, MESURER)){ R.ok(false, 'n : regard posé par cotes sans bouton « Mesurer depuis une façade » (' + pt(z1) + ')'); return; }
    await toucherPlan(p, A.plan(70, 4));
    const fz = await panneau(p);
    R.ok(!!fz && pressee(fz.mode) === 'Prolongement' && pressee(fz.coin) === 'Coin gauche' && !!fz.d && fz.d.val === '2,00' && fz.e.val === '0,00' && pressee(fz.cote) === 'Droite',
      'n : regard posé à 2 / 0 / Gauche dans le prolongement : la mesure montre 2,00 / 0,00 et le côté par défaut, Droite (' + resume(fz) + ')');
    /* « -1 » refusé ; « -1 » tapé puis « Déplacer » aussitôt ; « Fermer » */
    const avant = await etatDoc(p), u0 = await nUndo(p);
    await effacerToast(p); await saisir(p, 'd', '-1');
    const m1 = await toastVu(p), f1 = await panneau(p), x1 = await cotesExactes(p);
    R.ok(m1 === 'Nombre attendu, par exemple 0,80' && !!f1 && f1.d.val === '2,00' && !!x1 && Math.abs(x1.c.d - 2) <= 1e-9,
      'n : distance « -1 » refusée : toast des valeurs refusées, 2,00 gardé (' + JSON.stringify(m1) + ', ' + resume(f1) + ')');
    await C.pause(p, 600);
    await effacerToast(p); await taper(p, 'd', '-1'); await bouton(p, 'cotesDeplacer');
    const m2 = await toastVu(p), ch2 = await choix(p);
    R.ok(m2 === 'Nombre attendu, par exemple 0,80' && await etatDoc(p) === avant && await nUndo(p) === u0 && ch2.cotes === 'saisie',
      'n : « -1 » tapé puis « Déplacer » aussitôt : valeur refusée, rien ne bouge, le panneau reste (' + JSON.stringify(m2) + ', ' + JSON.stringify(ch2) + ')');
    await bouton(p, 'cotesFermer');
    const ch3 = await choix(p);
    R.ok(await etatDoc(p) === avant && await nUndo(p) === u0 && ch3.cotes === null && ch3.sel === z1.id && ch3.pan === 'fiche',
      'n : « Fermer » : croquis inchangé (JSON), aucun pas d\'annulation, mode fini, fiche du regard rouverte (' + JSON.stringify(ch3) + ')');
    /* Échap, puis la croix du panneau, panneau de mesure ouvert : fin du mode sans rien changer, et sans rouvrir la fiche */
    const sorties = [];
    for (const k of ['Échap', 'croix']){
      if (!await depuisFiche(A, z1.id, MESURER, A.plan(70, 4))){ sorties.push(k + ' : pas de bouton « Mesurer depuis une façade »'); continue; }
      const e = await etat(p);
      if (k === 'Échap') await p.keyboard.press('Escape');
      else { const x = await p.$('.vc .vc-panneau:not([hidden]) .vc-ptete button[data-a="fermerPanneau"]'); if (x) await x.click(); }
      await C.pause(p, 250);
      const ch = await choix(p);
      if (!e || e.etape !== 'saisie' || ch.cotes !== null || ch.sel !== null || ch.pan !== null || await etatDoc(p) !== avant || await nUndo(p) !== u0)
        sorties.push(k + ' : ' + JSON.stringify(e && e.etape) + ' puis ' + JSON.stringify(ch));
    }
    R.ok(!sorties.length, 'n : Échap, puis la croix du panneau, panneau de mesure ouvert : mode fini, croquis inchangé, aucun pas d\'annulation, fiche non rouverte'
      + (sorties.length ? ' (' + sorties.join(' ; ') + ')' : ''));
    /* décalage nul le long : 3 / 0 / Derrière (sur la façade) */
    const z2 = await poserObjetParCotes(A, 'regard', 'reg', [69, 2.5], [['coin', 'Coin gauche'], ['d', '3'], ['e', '0'], ['cote', 'Derrière']]);
    if (z2 && await boutonTexte(p, MESURER)){
      await toucherPlan(p, A.plan(70, 4));
      const fz2 = await panneau(p);
      R.ok(!!fz2 && pressee(fz2.mode) === 'Le long' && pressee(fz2.coin) === 'Coin gauche' && !!fz2.d && fz2.d.val === '3,00' && fz2.e.val === '0,00' && pressee(fz2.cote) === 'Devant',
        'n : regard posé le long à 3 / 0 / Derrière (sur la façade) : la mesure montre 3,00 / 0,00 et le côté par défaut, Devant (' + resume(fz2) + ')');
      await bouton(p, 'cotesFermer');
    } else R.ok(false, 'n : regard posé le long : pas de bouton « Mesurer depuis une façade » (' + pt(z2) + ')');

    /* « Autre trait », puis la façade ouest : la mesure de R1 se refait depuis elle (VCroquis.geo.mesurer calculé ici) */
    const R1 = await objet(p, 'd9');
    if (R1 && await depuisFiche(A, 'd9', MESURER, A.plan(70, 4))){
      const e0 = await etat(p);
      await boutonAide(p, 'cotesAutre');
      const chA = await choix(p), fA0 = await panneau(p);
      await toucherPlan(p, A.plan(65.5, 9));
      const fA = await panneau(p), xA = await cotesExactes(p), rw = await coteRef(p, A.plan(65.5, 9), 'bati');
      const mA = rw && await p.evaluate(([ref, q]) => window.VCroquis.geo.mesurer(ref, q), [rw.ref, {x: R1.x, y: R1.y}]);
      const LIB = {prol: 'Prolongement', long: 'Le long', droite: 'Droite', gauche: 'Gauche', devant: 'Devant', derriere: 'Derrière'};
      const proche = (s, x) => Math.abs(nombre(s) - x) <= 0.005 + 1e-9;
      R.ok(!!e0 && e0.etape === 'saisie' && chA.cotes === 'cote' && fA0 === null && !!fA && !!fA.d && !!mA && !!xA && xA.nat === 'bati' && pressee(fA.mode) === LIB[mA.mode]
        && pressee(fA.coin) === (mA.coin === rw.gauche ? 'Coin gauche' : 'Coin droit') && pressee(fA.cote) === LIB[mA.cote] && proche(fA.d.val, mA.d) && proche(fA.e.val, mA.e)
        && Math.abs(xA.c.d - mA.d) <= 1e-9 && Math.abs(xA.c.e - mA.e) <= 1e-9 && ecart(xA.ref.A, rw.ref.A) + ecart(xA.ref.B, rw.ref.B) <= 1e-9,
        'n : « Autre trait » (étape « cote », panneau fermé), puis la façade ouest : la mesure de R1 se refait depuis elle (' + resume(fA) + ' ; attendu '
        + JSON.stringify(mA && {mode: mA.mode, coin: mA.coin === (rw && rw.gauche) ? 'gauche' : 'droit', d: +mA.d.toFixed(4), e: +mA.e.toFixed(4), cote: mA.cote}) + ')');
      await bouton(p, 'cotesFermer');
    } else R.ok(false, 'n : fiche de R1 sans bouton « Mesurer depuis une façade »');

    /* objet supprimé pendant le mode, panneau « Cotes » ouvert, puis à l'étape « cote » : le mode se ferme */
    const supprimer = id => p.evaluate(id => { const ed = window.__vcEd, S = ed.etat; S.doc.el = S.doc.el.filter(e => e.id !== id); ed.synchroniser(); }, id);
    if (z2 && await depuisFiche(A, z2.id, MESURER, A.plan(70, 4))){
      const e1 = await etat(p);
      await supprimer(z2.id); await C.pause(p, 200);
      const ch = await choix(p), f = await panneau(p);
      R.ok(!!e1 && e1.etape === 'saisie' && ch.cotes === null && ch.sel === null && f === null,
        'n : objet supprimé pendant le mode, panneau « Cotes » ouvert : le mode se ferme, le panneau aussi (' + JSON.stringify(e1) + ' puis ' + JSON.stringify(ch) + ')');
    } else R.ok(false, 'n : objet supprimé, panneau ouvert : pas de bouton « Mesurer depuis une façade »');
    if (await depuisFiche(A, z1.id, DEPLACER)){
      const e2 = await etat(p);
      await supprimer(z1.id); await C.pause(p, 200);
      const ch = await choix(p);
      await toucherPlan(p, A.plan(70, 4));
      const f = await panneau(p);
      R.ok(!!e2 && e2.etape === 'cote' && ch.cotes === null && await etat(p) === null && (!f || f.titre !== 'Cotes'),
        'n : objet supprimé à l\'étape « cote » : le mode se ferme ; un toucher sur la façade ne l\'ouvre plus (' + JSON.stringify(e2) + ' puis ' + JSON.stringify(ch) + ')');
    } else R.ok(false, 'n : objet supprimé, étape « cote » : pas de bouton « Déplacer par cotes »');

    /* autre choix pendant le mode : le mode se ferme sans rien changer */
    const avC = await etatDoc(p), uC = await nUndo(p);
    if (await depuisFiche(A, 'd9', MESURER, A.plan(70, 4))){
      const e3 = await etat(p);
      await p.evaluate(() => window.__vcEd.selectionner('d5')); await C.pause(p, 250);
      const ch = await choix(p), f = await panneau(p);
      R.ok(!!e3 && e3.etape === 'saisie' && ch.cotes === null && ch.sel === 'd5' && !!f && f.titre === 'Objet' && await etatDoc(p) === avC && await nUndo(p) === uC,
        'n : autre choix pendant le mode (la boîte d5) : le mode se ferme sans rien changer, fiche de la boîte (' + JSON.stringify(e3) + ' puis ' + JSON.stringify(ch) + ')');
    } else R.ok(false, 'n : autre choix : pas de bouton « Mesurer depuis une façade »');

    /* a : un caniveau posé par cotes (angle du côté), tourné de 15° dans sa fiche, puis mesuré et déplacé : son angle ne change pas */
    const ca = await poserObjetParCotes(A, 'caniveau', 'ep', [69, 2.5], [['coin', 'Coin gauche'], ['d', '4'], ['e', '1,5'], ['cote', 'Devant']]);
    const b15 = ca && await p.$(PANNEAU + 'button[data-a="orienter"][data-v="15"]');
    /* attendre la fin de la garde du second toucher (600 ms après la pose, à moins de 48 px du toucher d'avant) : depuis m118, la fiche du
       caniveau, qu'aucun tronçon ne tient, commence par « Rejet au sol », et le bouton « 15° » tombe sous le toucher qui a posé l'objet */
    if (b15){ await C.pause(p, 650); await b15.click(); await C.pause(p, 250); }
    const ca1 = ca && await objet(p, ca.id);
    if (ca1 && await boutonTexte(p, MESURER)){
      await toucherPlan(p, A.plan(70, 4)); await saisir(p, 'd', '5');
      await bouton(p, 'cotesDeplacer');
      const ca2 = await objet(p, ca.id), Pc = await placerPage(p, r.ref, {mode: 'long', coin: r.gauche, d: 5, e: 1.5, cote: 'devant'});
      R.ok(!!b15 && ca1.p.a !== ca.p.a && !!ca2 && ca2.p.a === ca1.p.a && ecart(ca2, Pc) <= 1e-6 && sansXY(ca2) === sansXY(ca1),
        'a : caniveau posé par cotes (angle ' + ca.p.a + '), tourné de 15° dans sa fiche (' + ca1.p.a + '), puis mesuré et déplacé à 5 / 1,5 / Devant : angle inchangé ('
        + (ca2 && ca2.p.a) + '), au point de placer (' + pt(ca2) + ' pour ' + pt(Pc) + ')');
    } else R.ok(false, 'a : fiche du caniveau sans « Mesurer depuis une façade » (' + pt(ca) + ')');

    /* c : les deux boutons sur la fiche de chaque type d'objet ponctuel du croquis ; témoins sans : un tronçon, un collecteur, un texte
       libre, un objet d'un type inconnu (gardé tel quel) */
    await toutFermer(p); await vueDemo(A);
    await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat, d = S.doc.el.find(e => e.id === 'd9'); S.doc.el.push({id: 'inconnu1', k: 'pt', t: 'type-futur', x: d.x + 3, y: d.y + 3, p: {}, lab: null}); ed.synchroniser(); });
    const types = await p.evaluate(() => { const vus = {}; window.__vcEd.doc().el.forEach(e => { if (e.k === 'pt' && e.t !== 'type-futur' && !vus[e.t]) vus[e.t] = e.id; }); return vus; });
    const sans = [];
    for (const t of Object.keys(types)){
      await p.evaluate(id => window.__vcEd.selectionner(id), types[t]); await C.pause(p, 120);
      const bt = await textesBoutons(p); if (!bt.includes(DEPLACER) || !bt.includes(MESURER)) sans.push(t);
    }
    R.ok(Object.keys(types).length >= 10 && !sans.length, 'c : les deux boutons sur la fiche de chaque type d\'objet ponctuel du croquis (' + Object.keys(types).join(', ')
      + (sans.length ? ' ; sans : ' + sans.join(', ') : '') + ')');
    const avec = [];
    for (const id of ['d7', 'd3', 'd29', 'inconnu1']){
      await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 120);
      const bt = await textesBoutons(p), f = await panneau(p);
      if (!f || bt.some(x => /cotes|façade/i.test(x))) avec.push(id + (f ? '' : ' (pas de fiche)'));
    }
    R.ok(!avec.length, 'c : témoins : ni un tronçon, ni un collecteur, ni un texte libre, ni un objet de type inconnu n\'ont ces boutons' + (avec.length ? ' (' + avec.join(', ') + ')' : ''));
    erreurs(A, 'n, a, c');
  } finally { await A.fermer(); }
}

/* m108 : départ d'un escalier posé par cotes (outil « Escalier », bouton « Cotes », « Poser le départ ») */
const ESC = {k: 'ln', id: 'esc', pal: 'tr'};
const boutonsAide = p => p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-aide:not([hidden]) button[data-a]')).map(b => b.dataset.a).join(' '));
const libPoser = p => p.evaluate(s => { const b = document.querySelector(s + 'button[data-a="cotesPoser"]'); return b ? b.textContent.replace(/\s+/g, ' ').trim() : null; }, PANNEAU);
/* brouillon du tracé en cours : outil et points (x, y, aide) ; null s'il n'y en a pas */
const brouillon = p => p.evaluate(() => { const b = window.__vcEd.etat.brouillon; return b ? {outil: b.outil, pts: b.pts.map(q => ({x: q.x, y: q.y, aide: q.aide}))} : null; });
/* escaliers du croquis : sommets, valeurs, clés de l'élément et de ses sommets, contour (VCroquis.geo.escalier) et son centre */
const escaliers = p => p.evaluate(() => window.__vcEd.doc().el.filter(e => e.t === 'esc').map(e => {
  const g = window.VCroquis.geo.escalier(e.v[0], e.v[1], e.p.larg, e.p.n, e.p.cote, e.p.monte), Q = g ? g.contour : null;
  return {id: e.id, v: e.v.map(q => ({x: q.x, y: q.y})), p: Object.assign({}, e.p), cles: Object.keys(e).sort().join(','), cv: e.v.map(q => Object.keys(q).sort().join(',')).join(' '),
    Q: Q ? Q.map(q => ({x: q.x, y: q.y})) : null, m: Q ? {x: Q.reduce((s, q) => s + q.x, 0) / 4, y: Q.reduce((s, q) => s + q.y, 0) / 4} : null};
}));
/* relevé des chemins tracés sur le canevas (lignes droites seulement, comme dans escalier.js) : points de l'écran, fermé ou non, en tirets
   ou non */
const releverDebut = p => p.evaluate(() => {
  const A = CanvasRenderingContext2D.prototype, f = {}, chemins = []; let cur = null;
  ['beginPath', 'moveTo', 'lineTo', 'closePath', 'stroke'].forEach(m => { f[m] = A[m]; });
  A.beginPath = function(){ cur = {pts: [], ferme: false}; return f.beginPath.apply(this, arguments); };
  A.moveTo = function(x, y){ if (cur) cur.pts.push({x, y}); return f.moveTo.apply(this, arguments); };
  A.lineTo = function(x, y){ if (cur) cur.pts.push({x, y}); return f.lineTo.apply(this, arguments); };
  A.closePath = function(){ if (cur) cur.ferme = true; return f.closePath.apply(this, arguments); };
  A.stroke = function(){ if (cur) chemins.push({pts: cur.pts.slice(), ferme: cur.ferme, tirets: this.getLineDash().length > 0}); return f.stroke.apply(this, arguments); };
  window.__cotesReleve = {f, chemins};
});
/* fin du relevé : les contours fantômes de l'escalier (chemin fermé en tirets de quatre points, le premier au départ dep, à 1,5 px près),
   leurs points ramenés dans le repère du croquis par la vue du moment */
const releverFantomes = (p, dep) => p.evaluate(dep => {
  const r = window.__cotesReleve; if (!r) return [];
  const A = CanvasRenderingContext2D.prototype, v = window.__vcEd.etat.vue;
  Object.keys(r.f).forEach(m => { A[m] = r.f[m]; }); window.__cotesReleve = null;
  return r.chemins.filter(c => c.ferme && c.tirets && c.pts.length === 4 && Math.hypot(c.pts[0].x - dep.x, c.pts[0].y - dep.y) < 1.5)
    .map(c => c.pts.map(q => { const m = v.monde(q.x, q.y); return {x: m.x, y: m.y}; }));
}, dep);
/* centre d'un bouton de la barre d'aide (point de la page), null s'il n'y est pas ; bouton sous un point de la page (son data-a) */
const centreAide = (p, a) => p.evaluate(a => { const b = document.querySelector('.vc .vc-aide:not([hidden]) button[data-a="' + a + '"]'); if (!b) return null;
  const r = b.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }, a);
const boutonSous = (p, q) => p.evaluate(q => { const b = document.elementFromPoint(q.x, q.y), c = b && b.closest('button'); return c ? c.dataset.a || '' : ''; }, q);
/* double toucher : le bouton a1, puis le bouton a2 dès qu'il paraît, par deux touchers sans les attentes de p.click : le second vient
   quelques millisecondes après le premier, bien sous la garde de 0,5 s, même sur une machine chargée ; false si l'un des deux manque */
async function deuxTouchers(p, a1, a2){
  const q1 = await centreAide(p, a1); if (!q1) return false;
  await p.touchscreen.tap(q1.x, q1.y);
  const vu = await p.waitForSelector('.vc .vc-aide:not([hidden]) button[data-a="' + a2 + '"]', {timeout: 3000}).then(() => true, () => false);
  const q2 = vu ? await centreAide(p, a2) : null; if (!q2) return false;
  await p.touchscreen.tap(q2.x, q2.y);
  return true;
}
const unit = (a, b) => { const L = ecart(a, b); return {x: (b.x - a.x) / L, y: (b.y - a.y) / L}; };
/* direction w de la convention 11.1 : le long, du coin d'origine vers l'autre coin ; dans le prolongement, de l'autre coin vers le coin
   d'origine (vers le dehors du côté) ; avance : projection sur w du centre du contour, depuis le départ */
const dirW = (ref, c) => { const O = ref[c.coin], X = ref[c.coin === 'A' ? 'B' : 'A']; return c.mode === 'long' ? unit(O, X) : unit(X, O); };
const avance = (e, w) => e && e.m ? (e.m.x - e.v[0].x) * w.x + (e.m.y - e.v[0].y) * w.y : NaN;
const nb = x => isFinite(x) ? x.toExponential(1) : String(x);
/* outil Escalier (rien d'autre d'ouvert, vue de départ), « Cotes », la façade sud, l'endroit ou ([u, v]), réglages reg (comme
   poserObjetParCotes) ; rend le texte du bouton de pose du panneau (null sans panneau) */
async function departParCotes(A, ou, reg){
  const p = A.p;
  await toutFermer(p); await vueDemo(A);
  await C.outil(p, ESC); await C.pause(p, 150);
  if (!await entrer(p)) return null;
  await toucherPlan(p, A.plan(70, 4)); await toucherPlan(p, A.plan(ou[0], ou[1]));
  for (const x of reg) if (x[0] === 'd' || x[0] === 'e') await saisir(p, x[0], x[1]); else await puce(p, x[0], x[1]);
  return libPoser(p);
}
/* « Poser le départ » : cotes exactes du mode juste avant, point attendu (VCroquis.geo.placer sur ce même côté), brouillon, toast, état */
async function poserDepart(p){
  const x = await cotesExactes(p), P = x ? await placerPage(p, x.ref, x.c) : null;
  await effacerToast(p);
  if (!await bouton(p, 'cotesPoser')) return {x, P, b: null, toast: '', st: null};
  const b = await brouillon(p), toast = await toastVu(p);
  const st = await p.evaluate(() => { const S = window.__vcEd.etat; return {cotes: S.cotes, pan: S.panneau, sel: S.sel, outil: S.outil.k + ':' + S.outil.id}; });
  return {x, P, b, toast, st};
}
/* fin touchée en q ([u, v]) après une pause (le panneau fermé libère le plan) ; rend les escaliers du croquis */
async function toucherFin(A, q){ await C.pause(A.p, 250); await toucherPlan(A.p, A.plan(q[0], q[1])); await C.pause(A.p, 250); return escaliers(A.p); }

async function departEscalier(){
  const A = await croquisDemo(), p = A.p;
  try {
    /* croquis vidé : seul le fond de démonstration reste (aucun objet sous les touchers de la fin) */
    await C.injecter(p, {el: []}); await vueDemo(A);
    const avant = await etatDoc(p), u0 = await nUndo(p), r = await coteRef(p, A.plan(70, 4), 'bati');
    if (!R.ok(!!r, 'e : façade sud de la démonstration lue par VCroquis.geo.lignesRef')) return;
    const gauche = r.gauche, droit = gauche === 'A' ? 'B' : 'A', ouest = coinPres(r.ref, A.plan(65.5, 4)), tF = unit(r.ref.A, r.ref.B);
    /* e1 à e4 : entrée dans le mode */
    await C.outil(p, ESC); await C.pause(p, 150);
    const a0 = await texteAide(p), b0 = await boutonsAide(p);
    R.ok(/^Escalier : touchez le départ/.test(a0) && b0 === 'cotes', 'e1 : outil Escalier, sans départ : bouton « Cotes » dans la barre d\'aide (obtenu ' + JSON.stringify([a0, b0]) + ')');
    if (b0 !== 'cotes'){ erreurs(A, 'e1'); return; }
    await p.evaluate(() => { window.__vcEd.etat.aff.fond = false; window.__vcEd.redessiner(); });
    await effacerToast(p); await entrer(p);
    const t2 = await toastVu(p), e2 = await etat(p);
    await p.evaluate(() => { window.__vcEd.etat.aff.fond = true; window.__vcEd.redessiner(); });
    R.ok(/Aucune ligne de référence affichée/.test(t2) && e2 === null, 'e2 : fond masqué, croquis vide : toast de m101 (« Aucune ligne de référence affichée »), pas de mode (obtenu '
      + JSON.stringify([t2, e2]) + ')');
    await vueDemo(A); await entrer(p);
    const e3 = await etat(p), a3 = await texteAide(p), pour = await p.evaluate(() => { const c = window.__vcEd.etat.cotes; return c ? JSON.stringify(c.pour) : null; });
    R.ok(!!e3 && e3.etape === 'cote' && /Touchez la façade ou la limite de référence/.test(a3) && pour === '{"esc":true}', 'e3 : « Cotes » : étape « cote », aide « Touchez la façade ou '
      + 'la limite de référence », S.cotes.pour = {esc: true}, sans id (obtenu ' + JSON.stringify([e3, a3, pour]) + ')');
    const v0 = await C.vue(p), q0 = await C.ecranCv(p, A.plan(70, 9).x, A.plan(70, 9).y);
    await C.glisserDoigtCv(p, q0, {x: q0.x + 120, y: q0.y + 30});
    const v1 = await C.vue(p), e4 = await etat(p), b4 = await brouillon(p), dv = Math.hypot(v1.cx - v0.cx, v1.cy - v0.cy);
    R.ok(dv > 1 && !!e4 && e4.etape === 'cote' && !b4 && await etatDoc(p) === avant, 'e4 : glissé du doigt pendant le mode (aide « Tracer en glissant le doigt » active) : la vue glisse, '
      + 'aucun tracé ne commence, le mode reste à l\'étape « cote » (centre déplacé de ' + dv.toFixed(2) + ' m, brouillon ' + JSON.stringify(b4) + ', ' + JSON.stringify(e4) + ')');

    /* e5 à e11 : le long, coin gauche, 3 / 0 / Devant ; fin à 2 m dehors, à 2,9° de l'équerre */
    const lib5 = await departParCotes(A, [68.4, 3], [['coin', 'Coin gauche'], ['d', '3'], ['e', '0'], ['cote', 'Devant']]), f5 = await panneau(p);
    R.ok(lib5 === 'Poser le départ' && !!f5 && pressee(f5.mode) === 'Le long' && pressee(f5.coin) === 'Coin gauche' && !f5.deplacer, 'e5 : la façade sud, puis un endroit devant elle : '
      + 'panneau « Cotes » en « Le long », bouton « Poser le départ », pas de « Déplacer » (obtenu ' + JSON.stringify(lib5) + ', ' + resume(f5) + ')');
    const c5 = {mode: 'long', coin: gauche, d: 3, e: 0, cote: 'devant'}, P5 = await placerPage(p, r.ref, c5), d5 = await poserDepart(p), q5 = d5.b && d5.b.pts[0];
    R.ok(!!d5.b && d5.b.outil === 'esc' && d5.b.pts.length === 1 && ecart(q5, d5.P) <= 1e-9 && ecart(q5, P5) <= 1e-6 && ecart(P5, A.plan(68.5, 4)) <= 3e-3 && !!d5.x && d5.x.c.mode === 'long'
      && d5.x.c.coin === gauche && d5.x.c.d === 3 && d5.x.c.e === 0, 'e6 : « Poser le départ » : le brouillon a un seul point, au point de VCroquis.geo.placer sur le même côté (1e-9), '
      + 'soit (68,5 ; 4) de la démonstration (posé ' + pt(q5) + ', attendu ' + pt(d5.P) + ', écart ' + nb(ecart(q5, d5.P)) + ' m ; calcul du test ' + pt(P5) + ')');
    const a5 = await texteAide(p), bt5 = await boutonsAide(p);
    R.ok(!!d5.st && d5.st.cotes === null && d5.st.pan === null && d5.st.sel === null && d5.st.outil === 'ln:esc' && /^Escalier : touchez la fin/.test(a5) && bt5 === 'retirerPoint annulerTrace'
      && !/bâti/.test(d5.toast), 'e7 : le mode et le panneau sont fermés ; l\'outil Escalier reste actif, aide « touchez la fin » avec « Point » et « Abandonner », sans « Cotes » ; '
      + 'pas d\'avertissement de bâti (obtenu ' + JSON.stringify([d5.st, a5, bt5, d5.toast]) + ')');
    R.ok(await etatDoc(p) === avant && await nUndo(p) === u0, 'e8 : rien n\'entre dans le croquis ni dans l\'historique avant la fin (aucun pas d\'annulation)');
    const E5 = await toucherFin(A, [68.6, 2]), g5 = E5[0], s5 = g5 ? unit(g5.v[0], g5.v[1]) : null, eq5 = s5 ? Math.abs(s5.x * tF.x + s5.y * tF.y) : NaN;
    const L5 = g5 ? ecart(g5.v[0], g5.v[1]) : 0, av5 = avance(g5, dirW(r.ref, c5)), n5 = String(Math.min(60, Math.max(1, Math.round(L5 / .28))));
    R.ok(E5.length === 1 && ecart(g5.v[0], q5) <= 1e-9 && eq5 < 1e-6 && L5 > 1.5 && L5 < 2.5 && g5.cles === 'id,k,lab,p,t,v' && g5.cv === 'a,x,y a,x,y',
      'e9 : fin touchée : un escalier, départ au point calculé (1e-9), fin redressée d\'équerre à la façade (1e-6), forme de m107 (obtenu ' + E5.length + ' escalier, écart '
      + nb(g5 && ecart(g5.v[0], q5)) + ' m, équerre ' + nb(eq5) + ', ' + L5.toFixed(3) + ' m, clés ' + (g5 && g5.cles) + ')');
    R.ok(!!g5 && g5.p.cote === 'g' && av5 > 0 && g5.p.monte === 'depart' && g5.p.larg === '1,00' && g5.p.n === n5 && g5.p.st === 'existant' && Object.keys(g5.p).sort().join(',') === 'cote,larg,monte,n,st',
      'e10 : largeur partie à l\'opposé du coin d\'origine (centre du contour plus loin que le départ sur w), à gauche ; montée vers le départ, posé sur la façade sans décalage ; '
      + 'p de m107 sans champ nouveau (obtenu ' + JSON.stringify(g5 && g5.p) + ', avance ' + (isFinite(av5) ? av5.toFixed(3) : av5) + ' m)');
    const st5 = await p.evaluate(() => { const S = window.__vcEd.etat; return {sel: S.sel && S.sel.id, pan: S.panneau, br: !!S.brouillon}; }), u5 = await nUndo(p);
    await annuler(p);
    R.ok(!!g5 && st5.sel === g5.id && st5.pan === 'fiche' && !st5.br && u5 === u0 + 1 && await etatDoc(p) === avant, 'e11 : escalier choisi, fiche ouverte, un seul pas d\'annulation ; '
      + 'une annulation remet le croquis d\'avant l\'escalier (JSON) (obtenu ' + JSON.stringify(st5) + ', pas ' + u0 + ' puis ' + u5 + ')');

    /* e12 : même chose depuis le coin droit : la largeur part de l'autre côté */
    const lib12 = await departParCotes(A, [71.6, 3], [['coin', 'Coin droit'], ['d', '3'], ['e', '0'], ['cote', 'Devant']]);
    const c12 = {mode: 'long', coin: droit, d: 3, e: 0, cote: 'devant'}, P12 = await placerPage(p, r.ref, c12), d12 = await poserDepart(p), q12 = d12.b && d12.b.pts[0];
    const E12 = await toucherFin(A, [71.4, 2]), g12 = E12[0], s12 = g12 ? unit(g12.v[0], g12.v[1]) : null, av12 = avance(g12, dirW(r.ref, c12));
    R.ok(lib12 === 'Poser le départ' && !!q12 && ecart(q12, d12.P) <= 1e-9 && ecart(q12, P12) <= 1e-6 && ecart(P12, A.plan(71.5, 4)) <= 3e-3 && E12.length === 1 && ecart(g12.v[0], q12) <= 1e-9
      && Math.abs(s12.x * tF.x + s12.y * tF.y) < 1e-6 && !!g5 && g12.p.cote === (g5.p.cote === 'g' ? 'd' : 'g') && av12 > 0 && g12.p.monte === 'depart',
      'e12 : coin droit, 3 / 0 / Devant : départ au point calculé (1e-9), (71,5 ; 4) ; la largeur part de l\'autre côté (p.cote inverse du coin gauche), à l\'opposé du coin '
      + 'd\'origine ; montée vers le départ (départ ' + pt(q12) + ', attendu ' + pt(d12.P) + ' ; obtenu ' + JSON.stringify(g12 && g12.p) + ', avance ' + (isFinite(av12) ? av12.toFixed(3) : av12) + ' m)');
    await annuler(p);

    /* e13 : prolongement au-delà du coin ouest, 2 / 0,5 / Droite : décalage non nul, montée vers la fin */
    const lib13 = await departParCotes(A, [63.2, 3.3], [['coin', 'Coin gauche'], ['d', '2'], ['e', '0,5'], ['cote', 'Droite']]), f13 = await panneau(p);
    const c13 = {mode: 'prol', coin: ouest, d: 2, e: 0.5, cote: 'droite'}, P13 = await placerPage(p, r.ref, c13), d13 = await poserDepart(p), q13 = d13.b && d13.b.pts[0];
    const E13 = await toucherFin(A, [63.6, 1.5]), g13 = E13[0], s13 = g13 ? unit(g13.v[0], g13.v[1]) : null, av13 = avance(g13, dirW(r.ref, c13));
    /* la fin est redressée sur la façade du bâti la plus proche : ici celle du voisin (son coin est à 1,1 m du départ), d'équerre à la
       façade de référence à l'arrondi du plan près (coordonnées au millimètre) ; sans redressement, l'écart serait de 0,05 rad */
    R.ok(lib13 === 'Poser le départ' && !!f13 && pressee(f13.mode) === 'Prolongement' && ouest === gauche && !!q13 && ecart(q13, d13.P) <= 1e-9 && ecart(q13, P13) <= 1e-6
      && ecart(P13, A.plan(63.5, 3.5)) <= 3e-3 && E13.length === 1 && ecart(g13.v[0], q13) <= 1e-9 && Math.abs(s13.x * tF.x + s13.y * tF.y) < 1e-3,
      'e13 : prolongement au-delà du coin ouest, 2 / 0,5 / Droite : départ exact (1e-9), (63,5 ; 3,5) ; fin redressée d\'équerre (1e-3 rad, arrondi du plan) (départ ' + pt(q13) + ', attendu ' + pt(d13.P) + ', écart ' + nb(s13 ? s13.x * tF.x + s13.y * tF.y : NaN) + ' rad, ' + resume(f13) + ')');
    R.ok(!!g13 && g13.p.monte === 'fin' && g13.p.cote === 'd' && av13 > 0, 'e14 : décalage non nul : montée vers la fin ; largeur à l\'opposé du coin (« d », vers l\'ouest) (obtenu '
      + JSON.stringify(g13 && g13.p) + ', avance ' + (isFinite(av13) ? av13.toFixed(3) : av13) + ' m)');
    await annuler(p);

    /* e15 : D1, départ derrière la façade (3 / 1 / Derrière) : toast, départ posé quand même ; « Abandonner » l'oublie */
    await departParCotes(A, [68.4, 3], [['coin', 'Coin gauche'], ['d', '3'], ['e', '1'], ['cote', 'Derrière']]);
    const d15 = await poserDepart(p), q15 = d15.b && d15.b.pts[0];
    R.ok(/Le point tombe dans le bâti/.test(d15.toast) && !!q15 && d15.b.pts.length === 1 && ecart(q15, d15.P) <= 1e-9 && ecart(d15.P, A.plan(68.5, 5)) <= 3e-3 && !!d15.st && d15.st.cotes === null,
      'e15 : départ dans le bâti (3 / 1 / Derrière) : toast « Le point tombe dans le bâti », départ posé quand même au point calculé, (68,5 ; 5), mode fermé (toast '
      + JSON.stringify(d15.toast) + ', départ ' + pt(q15) + ')');
    await boutonAide(p, 'annulerTrace');
    const b16 = await brouillon(p), bt16 = await boutonsAide(p);
    R.ok(!b16 && bt16 === 'cotes' && await etatDoc(p) === avant && await nUndo(p) === u0, 'e16 : « Abandonner » : départ oublié, bouton « Cotes » revenu ; croquis et historique inchangés (obtenu '
      + JSON.stringify([b16, bt16]) + ')');
    /* « Cotes » est ignoré 0,5 s après « Abandonner » (double toucher, e22) : le cas suivant attend */
    await C.pause(p, 300);

    /* e17 : « Point » après « Poser le départ » : brouillon vide ; un départ posé ensuite au doigt suit la règle de m107 (cotes oubliées) */
    await departParCotes(A, [71.6, 3], [['coin', 'Coin droit'], ['d', '3'], ['e', '0'], ['cote', 'Devant']]);
    const d17 = await poserDepart(p);
    await boutonAide(p, 'retirerPoint');
    const b17 = await brouillon(p), bt17 = await boutonsAide(p), a17 = await texteAide(p);
    await toucherPlan(p, A.plan(71.5, 4));
    const E17 = await toucherFin(A, [71.4, 2]);
    R.ok(!!d17.b && d17.b.pts.length === 1 && !b17 && bt17 === 'cotes' && /^Escalier : touchez le départ/.test(a17) && E17.length === 1 && E17[0].p.cote === 'g',
      'e17 : « Point » après « Poser le départ » : brouillon vide, bouton « Cotes » revenu ; puis un départ touché au même endroit et la fin : côté de m107 (« g », les deux côtés '
      + 'hors du bâti), pas celui des cotes oubliées (obtenu ' + JSON.stringify([b17, bt17, E17.map(e => e.p.cote)]) + ')');
    if (E17.length) await annuler(p);

    /* e18, e19 : un autre outil oublie le mode (panneau ouvert) et le départ posé par cotes */
    await departParCotes(A, [71.6, 3], [['coin', 'Coin droit'], ['d', '3'], ['e', '0']]);
    const e18 = await etat(p);
    await C.outil(p, {k: 'main'}); await C.pause(p, 150);
    const s18 = await p.evaluate(() => { const S = window.__vcEd.etat; return {cotes: S.cotes, pan: S.panneau, br: S.brouillon}; });
    R.ok(!!e18 && e18.etape === 'saisie' && s18.cotes === null && s18.pan === null && s18.br === null && await etatDoc(p) === avant, 'e18 : un autre outil, panneau « Cotes » ouvert : '
      + 'fin du mode, panneau fermé, rien n\'est posé (obtenu ' + JSON.stringify([e18, s18]) + ')');
    await departParCotes(A, [71.6, 3], [['coin', 'Coin droit'], ['d', '3'], ['e', '0']]);
    const d19 = await poserDepart(p);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    const b19 = await brouillon(p);
    await C.outil(p, ESC); await C.pause(p, 150);
    const bt19 = await boutonsAide(p);
    await toucherPlan(p, A.plan(71.5, 4));
    const E19 = await toucherFin(A, [71.4, 2]);
    R.ok(!!d19.b && d19.b.pts.length === 1 && !b19 && bt19 === 'cotes' && E19.length === 1 && E19[0].p.cote === 'g', 'e19 : un autre outil après « Poser le départ » : départ oublié ; '
      + 'de retour à l\'outil Escalier, bouton « Cotes », et un escalier tracé au doigt suit la règle de m107 (obtenu ' + JSON.stringify([b19, bt19, E19.map(e => e.p.cote)]) + ')');
    if (E19.length) await annuler(p);

    /* e20 : Échap (fermerNiveau) et la réouverture du croquis (ouvrir) oublient aussi le départ */
    await departParCotes(A, [68.4, 3], [['coin', 'Coin gauche'], ['d', '3'], ['e', '0']]);
    const d20 = await poserDepart(p);
    await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 150);
    const b20 = await brouillon(p);
    await departParCotes(A, [68.4, 3], [['coin', 'Coin gauche'], ['d', '3'], ['e', '0']]);
    const d20b = await poserDepart(p);
    await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.ouvrir(S.doc, S.fond, S.reseau); }); await C.pause(p, 250);
    const b20b = await brouillon(p);
    R.ok(!!d20.b && d20.b.pts.length === 1 && !b20 && !!d20b.b && d20b.b.pts.length === 1 && !b20b && await etatDoc(p) === avant, 'e20 : Échap (fermerNiveau) et ouvrir() oublient le départ '
      + 'posé par cotes ; croquis inchangé (obtenu ' + JSON.stringify([b20, b20b]) + ')');

    /* e21 : départ posé par cotes depuis le coin droit (comme e12), puis la souris survole l'endroit de la fin : le contour fantôme est
       celui de l'escalier créé ensuite, du côté des cotes (« d » ; la règle de m107 donnerait « g ») */
    await departParCotes(A, [71.6, 3], [['coin', 'Coin droit'], ['d', '3'], ['e', '0'], ['cote', 'Devant']]);
    const d21 = await poserDepart(p), q21 = d21.b && d21.b.pts[0], f21 = A.plan(71.4, 2);
    let F21 = [];
    if (q21){
      const sD = await C.ecranCv(p, q21.x, q21.y), sF = await C.ecranCv(p, f21.x, f21.y);
      await C.pause(p, 250); await releverDebut(p); await C.survolerCv(p, sF); await C.pause(p, 150);
      F21 = await releverFantomes(p, sD);
    }
    const E21 = await toucherFin(A, [71.4, 2]), g21 = E21[0], k21 = F21.length === 1 && !!g21 && !!g21.Q ? [0, 1, 2, 3].map(i => ecart(F21[0][i], g21.Q[i])) : [];
    R.ok(F21.length === 1 && E21.length === 1 && g21.p.cote === 'd' && k21.length === 4 && k21.every(x => x < 0.05), 'e21 : départ posé par cotes (coin droit), survol de la fin à la '
      + 'souris : le contour fantôme a les quatre coins de l\'escalier créé ensuite (à 5 cm près), du côté « d » des cotes (obtenu ' + F21.length + ' contour fantôme, '
      + JSON.stringify(g21 && g21.p.cote) + ', écarts ' + k21.map(x => x.toFixed(3)).join(' ') + ' m)');
    if (E21.length) await annuler(p);

    /* e22 : double toucher sur « Abandonner » après « Poser le départ » : le second tombe sur « Cotes », venu à sa place ; il est ignoré,
       le mode ne s'ouvre pas ; « Cotes » touché ensuite exprès (après 0,5 s) l'ouvre */
    await departParCotes(A, [68.4, 3], [['coin', 'Coin gauche'], ['d', '3'], ['e', '0']]);
    const d22 = await poserDepart(p), qa = await centreAide(p, 'annulerTrace');
    if (qa){ await p.touchscreen.tap(qa.x, qa.y); await p.touchscreen.tap(qa.x, qa.y); await C.pause(p, 300); }
    const sous22 = qa ? await boutonSous(p, qa) : '', s22 = await p.evaluate(() => { const S = window.__vcEd.etat; return {cotes: S.cotes, br: S.brouillon}; });
    await C.pause(p, 300); await entrer(p);
    const e22 = await etat(p);
    await toutFermer(p);
    R.ok(!!d22.b && d22.b.pts.length === 1 && !!qa && sous22 === 'cotes' && s22.cotes === null && s22.br === null && !!e22 && e22.etape === 'cote' && await etatDoc(p) === avant,
      'e22 : double toucher sur « Abandonner » après « Poser le départ » : le second, tombé sur « Cotes » venu à sa place, n\'ouvre pas le mode ; « Cotes » touché ensuite '
      + 'l\'ouvre (obtenu ' + JSON.stringify([sous22, s22, e22]) + ')');

    /* e23 : « Le long » depuis le coin gauche, à 10 m pour un côté de 9 m : le départ tombe à 1 m au-delà du coin droit, hors de la façade ;
       il ne compte pas comme posé sur elle (point sans aide, montée vers la fin, comme dans le prolongement ou au doigt) ; témoin : à 9 m,
       sur le coin droit, il compte (aide « facade », montée vers le départ) */
    const m23 = [];
    for (const d of [9, 10]){
      await departParCotes(A, [72, 3], [['coin', 'Coin gauche'], ['d', String(d)], ['e', '0'], ['cote', 'Devant']]);
      const d23 = await poserDepart(p), q23 = d23.b && d23.b.pts.length === 1 ? d23.b.pts[0] : null;
      const E23 = await toucherFin(A, [65.5 + d, 2]);
      m23.push([d, !!q23 && ecart(q23, d23.P) <= 1e-9 && ecart(q23, A.plan(65.5 + d, 4)) <= 3e-3, q23 ? q23.aide : 'pas de départ', E23.length === 1 ? E23[0].p.monte : E23.length + ' escalier']);
      if (E23.length) await annuler(p);
    }
    R.ok(JSON.stringify(m23) === JSON.stringify([[9, true, 'facade', 'depart'], [10, true, null, 'fin']]), 'e23 : le long, coin gauche, 10 m pour un côté de 9 m : départ au point '
      + 'calculé, au-delà du coin droit, sans aide, montée vers la fin ; témoin : à 9 m (sur le coin droit), aide « facade » et montée vers le départ (obtenu '
      + JSON.stringify(m23) + ')');

    /* e24 (m115) : trait « Complément du fond » dessiné au croquis (mur d'une annexe absente du cadastre), de (66 ; 22) à (74 ; 22), dans
       le jardin : départ posé par cotes le long du trait, décalage 0, à 1 m de son coin, fin à 2,5 m du trait : il compte comme posé sur le
       bâti, comme le départ touché au même point (aide « facade », montée vers le départ ; règle de m112) ; témoin : la même pose le long de
       la limite nord de la parcelle (aide nulle, montée vers la fin) */
    const K0 = A.plan(66, 22), K1 = A.plan(74, 22), m24 = [];
    for (const [cas, ref, ou, fin, vue] of [['toucher', null, [67, 22], [67, 19.5], [70, 20]], ['cotes', [70, 22], [67, 21.5], [67, 19.5], [70, 20]],
      ['limite', [70, 34], [67, 33.5], [67, 31.5], [70, 31]]]){
      await toutFermer(p);
      await C.injecter(p, {el: [C.L('K', 'lim', [[K0.x, K0.y], [K1.x, K1.y]], {})]});
      const c = A.plan(vue[0], vue[1]); await C.regler(p, c.x, c.y, 40);
      await C.outil(p, ESC); await C.pause(p, 150);
      let nat = null;
      if (cas === 'toucher') await toucherPlan(p, A.plan(ou[0], ou[1]), 600);
      else if (await entrer(p)){
        await toucherPlan(p, A.plan(ref[0], ref[1])); await toucherPlan(p, A.plan(ou[0], ou[1]));
        const e = await etat(p); nat = e && e.nat;
        await puce(p, 'mode', 'Le long'); await saisir(p, 'e', '0'); await bouton(p, 'cotesPoser');
      }
      const b = await brouillon(p), q = b && b.pts.length === 1 ? b.pts[0] : null, E = await toucherFin(A, fin);
      m24.push([cas, nat, q ? q.aide : 'pas de départ', E.length === 1 ? E[0].p.monte : E.length + ' escalier']);
      if (E.length) await annuler(p);
    }
    const att24 = [['toucher', null, 'facade', 'depart'], ['cotes', 'complement', 'facade', 'depart'], ['limite', 'limite', null, 'fin']];
    R.ok(JSON.stringify(m24) === JSON.stringify(att24), 'e24 : trait « Complément du fond », départ posé par cotes le long du trait, décalage 0 : aide « facade », montée vers le '
      + 'départ, comme le départ touché au même point ; témoin : la même pose le long d\'une limite de parcelle, montée vers la fin (obtenu ' + JSON.stringify(m24) + ')');
    erreurs(A, 'e (m108)');
  } finally { await A.fermer(); }
}

/* q1 à q5 (m133 ; M4 ; M2, M4 et M7 de la relecture de m133) : libellé de l'objet dans l'aide et le panneau du mode « Cotes » */
async function libellesObjets(){
  const A = await croquisDemo(), p = A.p;
  try {
    const qb = A.plan(68, 9), qw = A.plan(72, 9), qf = A.plan(70, 11), qm = A.plan(62, 9);
    await p.evaluate(([qb, qw, qf, qm]) => { const ed = window.__vcEd, S = ed.etat, V = window.VCroquis;
      S.doc.el.push({id: 'qb', k: 'pt', t: 'autre_eu', x: qb.x, y: qb.y, p: Object.assign(V.defautsPt('autre_eu'), {nom: 'Bidet'}), lab: {off: true}});
      S.doc.el.push({id: 'qw', k: 'pt', t: 'wc', x: qw.x, y: qw.y, p: Object.assign(V.defautsPt('wc'), {lm: 'oui'}), lab: {off: true}});
      S.doc.el.push({id: 'qf', k: 'pt', t: 'autre_eu', x: qf.x, y: qf.y, p: Object.assign(V.defautsPt('autre_eu'), {nom: 'Fontaine'}), lab: {off: true}});
      S.doc.el.push({id: 'qm', k: 'pt', t: 'exutoire', x: qm.x, y: qm.y, p: Object.assign(V.defautsPt('exutoire'), {nom: 'Mare', art: 'la'}), lab: {off: true}});
      S.undo = []; S.redo = []; ed.synchroniser(); ed.redessiner(); }, [qb, qw, qf, qm]);
    const AP = n => 'Autre appareil « ' + n + ' »';
    for (const [k, id, lib, sujet, bout, verbe] of [['q1', 'qb', 'Bidet', AP('Bidet'), DEPLACER, 'déplacé'], ['q2', 'qw', 'WC + lave-mains', 'WC + lave-mains', DEPLACER, 'déplacé'],
      ['q3', 'qb', 'Bidet', AP('Bidet'), MESURER, 'mesuré'], ['q4', 'qf', 'Fontaine', AP('Fontaine'), DEPLACER, 'déplacé'], ['q5', 'qm', 'Mare', 'Mare', DEPLACER, 'déplacée']]){
      if (!await depuisFiche(A, id, bout)){ R.ok(false, k + ' : fiche de l\'objet sans bouton « ' + bout + ' »'); continue; }
      const a1 = await texteAide(p);
      await toucherPlan(p, A.plan(70, 4));
      if (bout === DEPLACER) await toucherPlan(p, A.plan(69.13, 2.07));
      const f = await panneau(p), att = sujet + ' ' + verbe + ' depuis : Façade';
      R.ok(a1.indexOf(bout + ' (' + lib + '). Touchez la façade ou la limite de référence') === 0 && !!f && f.texte.indexOf(att) >= 0, k + ' : aide « ' + bout + ' (' + lib + ') », '
        + 'puis panneau « ' + att + ' » (aide ' + JSON.stringify(a1) + ', panneau ' + JSON.stringify(f ? f.texte.slice(0, 60) : null) + ')');
      await toutFermer(p);
    }
    erreurs(A, 'q1 à q5');
  } finally { await A.fermer(); }
}

/* m146 (D12) : « Deux points ». Fond fictif : parcelle de 60 m sur 50 et bâti de 10 m sur 10, coin sud-ouest en (14 ; 6) du repère local */
const dxfDeux = () => dxfFictif([['1PARCELLE', [[-20, -20], [40, -20], [40, 30], [-20, 30]]], ['3BATIDUR', [[14, 6], [24, 6], [24, 16], [14, 16]]]]);
/* état du mode : 'absent' (version sans le mode), null (hors du mode), ou {etape, deux} (copie de S.cotes.deux, null sans lui) */
const etatDeux = p => p.evaluate(() => { const c = window.__vcEd.etat.cotes; return c === undefined ? 'absent' : c === null ? null : {etape: c.etape, deux: c.deux ? JSON.parse(JSON.stringify(c.deux)) : null}; });
/* panneau « Cotes » en mode deux points : en-tête, champs d1 et d2, libellés des champs, puces (* : choisie), boutons, texte */
const panneauDeux = p => p.evaluate(() => {
  const pan = document.querySelector('.vc .vc-panneau'); if (!pan || pan.hidden) return null;
  const c = pan.querySelector('.vc-pcorps'), t = x => x.textContent.replace(/\s+/g, ' ').trim();
  const champ = k => { const i = c.querySelector('input[data-a="cotesNum"][data-k="' + k + '"]'); return i ? i.value : null; };
  return {entete: c.querySelector('p') ? t(c.querySelector('p')) : '', d1: champ('d1'), d2: champ('d2'), labs: Array.from(c.querySelectorAll('.vc-lab')).map(t).join(' | '),
    sols: Array.from(c.querySelectorAll('button[data-a="cotes"][data-k="sol"]')).map(b => t(b) + (b.getAttribute('aria-pressed') === 'true' ? '*' : '')).join(' | '),
    boutons: Array.from(c.querySelectorAll('button[data-a^="cotes"]:not([data-k])')).map(t).join(' | '), texte: t(c)};
});
const texteBoutonAide = (p, a) => p.evaluate(a => { const b = document.querySelector('.vc .vc-aide:not([hidden]) button[data-a="' + a + '"]'); return b ? b.textContent.replace(/\s+/g, ' ').trim() : null; }, a);
async function deuxPointsCotes(){
  const A = await C.ouvrir(), p = A.p;
  try {
    const plan = await ouvrirFondFictif(p, 'plan-fictif-deux-points.dxf', dxfDeux());
    const R1 = plan(0, 0), R2 = plan(10, 0), R3 = plan(4, -3), vide = plan(5, 6), facade = plan(16, 6), REGARD = {k: 'pt', t: 'regard', pal: 'reg'};
    const vue = () => { const c = plan(6, 2); return C.regler(p, c.x, c.y, 40); };
    await C.injecter(p, {el: [C.P('r1', 'regard', R1.x, R1.y), C.P('r2', 'regard', R2.x, R2.y), C.P('r3', 'regard', R3.x, R3.y)]});
    await vue();
    const avant = await etatDoc(p), u0 = await nUndo(p);
    /* coin sud-ouest du bâti, tel que l'éditeur le lit (fond affiché) */
    const K = await p.evaluate(q => {
      const S = window.__vcEd.etat, Ls = window.VCroquis.geo.lignesRef(S.doc, S.aff.fond ? S.fond : null, null, ['bati']) || []; let b = null;
      Ls.forEach(l => l.P.forEach(v => { const d = Math.hypot(v.x - q.x, v.y - q.y); if (!b || d < b.d) b = {d, x: v.x, y: v.y}; }));
      return b && b.d < 0.01 ? {x: b.x, y: b.y} : null;
    }, plan(14, 6));
    if (!R.ok(!!K, 'w : coin sud-ouest du bâti fictif lu par VCroquis.geo.lignesRef')) return;
    const egal = (a, b) => !!a && !!b && ecart(a, b) <= 1e-9, MSG = 'Les deux cotes ne se croisent pas : les deux points sont à 10,00 m l\'un de l\'autre.';
    /* « Cotes » avec l'outil o (rien d'autre d'ouvert, vue fixe), puis « Deux points » après la garde de 0,5 s ; rend l'état du mode */
    const entrerDeux = async o => {
      await toutFermer(p); await vue(); await effacerToast(p);
      await C.outil(p, o || REGARD); await C.pause(p, 150);
      if (!await entrer(p)) return 'pas de bouton « Cotes »';
      await C.pause(p, 300);
      if (!await boutonAide(p, 'cotesDeux')) return 'pas de bouton « Deux points »';
      return etatDeux(p);
    };
    /* fiche de R3, puis son bouton lib (« Déplacer par cotes » ou « Mesurer depuis une façade ») */
    const ficheR3 = async lib => { await toutFermer(p); await vue(); await p.evaluate(() => window.__vcEd.selectionner('r3')); await C.pause(p, 250); return boutonTexte(p, lib); };
    /* toucher du plan au point q, puis le toast et l'état du mode */
    const tap = async q => { await effacerToast(p); await toucherPlan(p, q); return {toast: await toastVu(p), e: await etatDeux(p)}; };
    const etape = x => x && x.e ? x.e.etape : null;

    /* w1 : bouton « Deux points » avant « Abandonner », à l'étape « cote » */
    await C.outil(p, REGARD); await C.pause(p, 150);
    await entrer(p);
    const b1 = await boutonsAide(p), t1 = await texteBoutonAide(p, 'cotesDeux');
    R.ok(b1 === 'cotesDeux cotesStop' && t1 === 'Deux points', 'w1 : « Cotes » d\'un regard : la barre d\'aide a « Deux points » avant « Abandonner » (obtenu ' + JSON.stringify([b1, t1]) + ')');
    if (b1.indexOf('cotesDeux') < 0){ erreurs(A, 'w1'); return; }
    /* w2 : double toucher : « Deux points » touché aussitôt après « Cotes » est ignoré ; touché ensuite, il mène à l'étape « p1 » */
    await toutFermer(p);
    const d2 = await deuxTouchers(p, 'cotes', 'cotesDeux'); await C.pause(p, 100);
    const e2a = await etatDeux(p);
    await C.pause(p, 500); await boutonAide(p, 'cotesDeux');
    const e2b = await etatDeux(p), a2 = await texteAide(p), b2 = await boutonsAide(p);
    R.ok(d2 && !!e2a && e2a.etape === 'cote' && !e2a.deux && !!e2b && e2b.etape === 'p1' && !!e2b.deux && a2.indexOf('Touchez le point 1 (coin ou objet).') === 0 && b2 === 'cotesStop',
      'w2 : « Deux points » touché moins de 0,5 s après « Cotes » : ignoré ; ensuite : étape « p1 », aide « Touchez le point 1 (coin ou objet). », seul « Abandonner » (obtenu '
      + JSON.stringify([d2, e2a && e2a.etape, e2b && e2b.etape, a2, b2]) + ')');
    /* w3 : rien sous le doigt (le vide, puis la façade loin de ses coins) : toast, l'étape reste */
    const w3a = await tap(vide), w3b = await tap(facade);
    R.ok(w3a.toast.indexOf('Touchez un coin ou un objet') >= 0 && etape(w3a) === 'p1' && w3b.toast.indexOf('Touchez un coin ou un objet') >= 0 && etape(w3b) === 'p1',
      'w3 : à l\'étape « p1 », un toucher dans le vide, puis sur la façade à 2 m de son coin : toast « Touchez un coin ou un objet », l\'étape reste (obtenu '
      + JSON.stringify([w3a.toast, etape(w3a), w3b.toast, etape(w3b)]) + ')');
    /* w4 : tolérance du doigt (24 px ; 40 px par mètre) : à 28 px de R1, rien ; à 20 px, R1, sa position copiée */
    const w4a = await tap({x: R1.x, y: R1.y + 0.7}), w4b = await tap({x: R1.x, y: R1.y + 0.5}), a4 = await texteAide(p), b4 = await boutonsAide(p);
    R.ok(w4a.toast.indexOf('Touchez un coin ou un objet') >= 0 && etape(w4a) === 'p1' && etape(w4b) === 'p2' && egal(w4b.e.deux.A, R1) && a4.indexOf('Touchez le point 2.') === 0 && b4 === 'cotesStop',
      'w4 : à 28 px de R1, rien ; à 20 px, R1 est le point 1, à sa position exacte ; aide « Touchez le point 2. », seul « Abandonner » (obtenu '
      + JSON.stringify([w4a.toast, etape(w4a), etape(w4b), w4b.e && w4b.e.deux && w4b.e.deux.A, a4, b4]) + ')');
    /* w5 : le même point deux fois */
    const w5 = await tap(R1);
    R.ok(w5.toast.indexOf('Touchez deux points différents') >= 0 && etape(w5) === 'p2' && !w5.e.deux.B, 'w5 : R1 touché de nouveau : toast « Touchez deux points différents », l\'étape reste (obtenu '
      + JSON.stringify([w5.toast, w5.e]) + ')');
    /* w6 : R2 : le panneau « Cotes » en mode deux points ; rien n'est posé */
    const w6 = await tap(R2), f6 = await panneauDeux(p), b6 = await boutonsAide(p);
    R.ok(etape(w6) === 'saisie' && egal(w6.e.deux.B, R2) && !!f6 && f6.entete === 'Regard posé depuis deux points (à 10,00 m l\'un de l\'autre).' && f6.d1 === '' && f6.d2 === ''
      && f6.labs === 'Distance depuis le point 1 (m) | Distance depuis le point 2 (m)' && f6.sols === '' && f6.boutons === 'Poser | Fermer' && b6 === 'cotesStop' && await etatDoc(p) === avant,
      'w6 : R2 : étape « saisie », panneau « Regard posé depuis deux points (à 10,00 m l\'un de l\'autre). », deux champs vides, pas de puces, « Poser » et « Fermer » ; rien n\'est posé (obtenu '
      + JSON.stringify([w6.e, f6, b6]) + ')');
    /* w7 : un toucher du plan, panneau ouvert */
    const w7 = await tap(vide);
    R.ok(w7.toast.indexOf('Réglez les cotes dans le panneau') >= 0 && etape(w7) === 'saisie' && await etatDoc(p) === avant, 'w7 : un toucher du plan, panneau ouvert : toast « Réglez les cotes '
      + 'dans le panneau… », rien ne change (obtenu ' + JSON.stringify([w7.toast, etape(w7)]) + ')');
    /* w8 : une seule distance, puis « Poser » */
    await saisir(p, 'd1', '6'); await effacerToast(p); await bouton(p, 'cotesPoser');
    const t8 = await toastVu(p), e8 = await etatDeux(p);
    R.ok(t8.indexOf('Saisissez les deux distances.') >= 0 && !!e8 && e8.etape === 'saisie' && await etatDoc(p) === avant && await nUndo(p) === u0,
      'w8 : une seule distance, puis « Poser » : toast « Saisissez les deux distances. », rien n\'est posé, le mode reste (obtenu ' + JSON.stringify([t8, e8 && e8.etape]) + ')');
    /* w9 : aperçu pendant la frappe (sans quitter le champ), puis saisie enregistrée */
    await taper(p, 'd2', '3'); const f9a = await panneauDeux(p);
    await taper(p, 'd2', '8'); const f9b = await panneauDeux(p);
    await saisir(p, 'd2', '8'); const f9c = await panneauDeux(p);
    R.ok(!!f9a && f9a.texte.indexOf(MSG) >= 0 && f9a.sols === '' && !!f9b && f9b.sols === 'Solution 1* | Solution 2' && f9b.texte.indexOf('ne se croisent pas') < 0 && !!f9c
      && f9c.sols === 'Solution 1* | Solution 2' && f9c.d1 === '6,00' && f9c.d2 === '8,00' && f9c.labs === 'Distance depuis le point 1 (m) | Distance depuis le point 2 (m)',
      'w9 : 6 et 3 tapés : « ' + MSG + ' » à la place des puces ; 6 et 8 : puces « Solution 1 » (choisie) et « Solution 2 », sans libellé de champ (obtenu '
      + JSON.stringify([f9a && f9a.sols, f9a && f9a.texte.slice(-110), f9b && f9b.sols, f9c && [f9c.sols, f9c.d1, f9c.d2, f9c.labs]]) + ')');
    /* w10 : « Poser » */
    const els10 = await elements(p); await bouton(p, 'cotesPoser');
    const n10 = nouveaux(els10, await elements(p)), ch10 = await choix(p), u10 = await nUndo(p), P10 = {x: R1.x + 3.6, y: R1.y + 4.8};
    R.ok(n10.length === 1 && n10[0].t === 'regard' && ecart(n10[0], P10) <= 0.01 && u10 === u0 + 1 && ch10.cotes === null && ch10.sel === (n10[0] || {}).id && ch10.pan === 'fiche',
      'w10 : « Poser » : un regard en (3,6 ; 4,8) à 1 cm près, un pas d\'annulation, sa fiche ouverte, mode fini (obtenu ' + pt(n10[0]) + ' pour ' + pt(P10) + ', ' + n10.length + ' élément, '
      + (u10 - u0) + ' pas, ' + JSON.stringify(ch10) + ')');
    await annuler(p);
    R.ok(await etatDoc(p) === avant, 'w10 : « Annuler » rend le croquis exact');
    /* w11 : « Solution 2 » */
    const e11 = await entrerDeux(); await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8'); await puce(p, 'sol', 'Solution 2');
    const f11 = await panneauDeux(p), els11 = await elements(p); await bouton(p, 'cotesPoser');
    const n11 = nouveaux(els11, await elements(p)), P11 = {x: R1.x + 3.6, y: R1.y - 4.8};
    R.ok(!!e11 && e11.etape === 'p1' && !!f11 && f11.sols === 'Solution 1 | Solution 2*' && n11.length === 1 && ecart(n11[0], P11) <= 0.01 && await nUndo(p) === u0 + 1,
      'w11 : de nouveau, « Solution 2 », puis « Poser » : un regard en (3,6 ; -4,8) à 1 cm près (obtenu ' + JSON.stringify(f11 && f11.sols) + ', ' + pt(n11[0]) + ' pour ' + pt(P11) + ')');
    /* w12 : « Annuler » pendant le mode : il défait la dernière pose et finit le mode */
    const e12 = await entrerDeux(); await tap(R1);
    const e12a = await etatDeux(p); await annuler(p);
    const e12b = await etatDeux(p);
    R.ok(!!e12 && e12.etape === 'p1' && !!e12a && e12a.etape === 'p2' && e12b === null && await etatDoc(p) === avant && await nUndo(p) === u0,
      'w12 : « Annuler » à l\'étape « p2 » : la pose de w11 est défaite, le mode fini (obtenu ' + JSON.stringify([e12a && e12a.etape, e12b]) + ')');
    /* w13 : un coin du bâti comme point 1 */
    await entrerDeux(); const w13a = await tap(K); await tap(R2);
    const f13 = await panneauDeux(p);
    await saisir(p, 'd1', '5'); await saisir(p, 'd2', '4');
    const els13 = await elements(p); await bouton(p, 'cotesPoser');
    const n13 = nouveaux(els13, await elements(p)), P13 = n13[0], cr13 = P13 ? (R2.x - K.x) * (P13.y - K.y) - (R2.y - K.y) * (P13.x - K.x) : NaN;
    R.ok(etape(w13a) === 'p2' && egal(w13a.e.deux.A, K) && !!f13 && f13.entete === 'Regard posé depuis deux points (à 7,21 m l\'un de l\'autre).' && n13.length === 1
      && Math.abs(ecart(P13, K) - 5) <= 0.01 && Math.abs(ecart(P13, R2) - 4) <= 0.01 && cr13 > 0,
      'w13 : le coin sud-ouest du bâti comme point 1, R2 comme point 2 (« à 7,21 m l\'un de l\'autre »), 5 et 4 : le regard à 5 m du coin et à 4 m de R2 (1 cm près), à gauche du coin vers R2 '
      + '(obtenu ' + JSON.stringify([etape(w13a), f13 && f13.entete]) + ', ' + pt(P13) + ', à ' + (P13 ? ecart(P13, K).toFixed(4) + ' et ' + ecart(P13, R2).toFixed(4) : '-') + ' m)');
    await annuler(p);
    /* w14 : 2 et 3 entre des points à 10 m : pas de croisement */
    await entrerDeux(); await tap(R1); await tap(R2); await saisir(p, 'd1', '2'); await saisir(p, 'd2', '3');
    const f14 = await panneauDeux(p); await effacerToast(p); await bouton(p, 'cotesPoser');
    const t14 = await toastVu(p), e14 = await etatDeux(p);
    await bouton(p, 'cotesFermer');
    const e14b = await etatDeux(p), ch14 = await choix(p);
    R.ok(!!f14 && f14.texte.indexOf(MSG) >= 0 && f14.sols === '' && t14.indexOf(MSG) >= 0 && !!e14 && e14.etape === 'saisie' && e14b === null && ch14.pan === null && ch14.sel === null
      && await etatDoc(p) === avant && await nUndo(p) === u0,
      'w14 : 2 et 3 : « ' + MSG + ' », pas de puces ; « Poser » : toast du même message, rien n\'est posé ; « Fermer » : mode fini, panneau fermé (obtenu '
      + JSON.stringify([f14 && f14.sols, t14, e14 && e14.etape, e14b, ch14]) + ')');
    /* w15 : tangence */
    await entrerDeux(); await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '4');
    const f15 = await panneauDeux(p), els15 = await elements(p); await bouton(p, 'cotesPoser');
    const n15 = nouveaux(els15, await elements(p)), P15 = {x: R1.x + 6, y: R1.y};
    R.ok(!!f15 && f15.sols === '' && f15.texte.indexOf('ne se croisent pas') < 0 && n15.length === 1 && ecart(n15[0], P15) <= 0.01,
      'w15 : tangence (6 et 4) : ni puces ni message ; « Poser » : un regard en (6 ; 0) à 1 cm près (obtenu ' + JSON.stringify(f15 && f15.sols) + ', ' + pt(n15[0]) + ' pour ' + pt(P15) + ')');
    await annuler(p);
    /* w16 : « Mesurer depuis une façade » : pas de bouton */
    const ok16 = await ficheR3(MESURER), e16 = await etatDeux(p), b16 = await boutonsAide(p);
    R.ok(ok16 && !!e16 && e16.etape === 'cote' && b16 === 'cotesStop', 'w16 : « Mesurer depuis une façade » : étape « cote » sans « Deux points » (obtenu ' + JSON.stringify([ok16, e16, b16]) + ')');
    /* w17 : « Déplacer par cotes » de R3 par deux points ; « Déplacer » sans rien changer */
    const ok17 = await ficheR3(DEPLACER); await C.pause(p, 300);
    const b17 = await boutonsAide(p); await boutonAide(p, 'cotesDeux');
    const w17a = await tap(R3); await tap(R1); const w17c = await tap(R2), f17 = await panneauDeux(p);
    await bouton(p, 'cotesDeplacer');
    const o17 = await objet(p, 'r3'), ch17 = await choix(p);
    R.ok(ok17 && b17 === 'cotesDeux cotesStop' && w17a.toast.indexOf('Touchez un coin ou un objet') >= 0 && etape(w17a) === 'p1' && etape(w17c) === 'saisie' && !!f17
      && f17.entete === 'Regard déplacé depuis deux points (à 10,00 m l\'un de l\'autre).' && f17.d1 === '5,00' && f17.d2 === '6,71' && f17.sols === 'Solution 1 | Solution 2*'
      && f17.boutons === 'Déplacer | Fermer' && egal(o17, R3) && await nUndo(p) === u0 && await etatDoc(p) === avant && ch17.cotes === null && ch17.sel === 'r3' && ch17.pan === 'fiche',
      'w17 : « Déplacer par cotes » de R3, « Deux points » : R3 n\'est pas un point ; R1 et R2 : « Regard déplacé depuis deux points (à 10,00 m l\'un de l\'autre). », 5,00 et 6,71, '
      + 'Solution 2 choisie ; « Déplacer » sans rien changer : rien ne bouge, aucun pas d\'annulation, fiche rouverte (obtenu ' + JSON.stringify([ok17, b17, w17a.toast, etape(w17a), etape(w17c),
      f17 && [f17.entete, f17.d1, f17.d2, f17.sols, f17.boutons], ch17]) + ', ' + pt(o17) + ')');
    /* w18 : 6 et 8, Solution 2 gardée : « Déplacer » */
    await ficheR3(DEPLACER); await C.pause(p, 300); await boutonAide(p, 'cotesDeux');
    await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8');
    const av18 = await objet(p, 'r3'); await bouton(p, 'cotesDeplacer');
    const o18 = await objet(p, 'r3'), ch18 = await choix(p), u18 = await nUndo(p), P18 = {x: R1.x + 3.6, y: R1.y - 4.8};
    R.ok(ecart(o18, P18) <= 0.01 && sansXY(o18) === sansXY(av18) && u18 === u0 + 1 && ch18.cotes === null && ch18.sel === 'r3' && ch18.pan === 'fiche',
      'w18 : 6 et 8, Solution 2 : « Déplacer » : R3 en (3,6 ; -4,8) à 1 cm près, seuls x et y changent, un pas d\'annulation, fiche rouverte (obtenu ' + pt(o18) + ' pour ' + pt(P18) + ', '
      + (u18 - u0) + ' pas, ' + JSON.stringify(ch18) + ')');
    await annuler(p);
    R.ok(await etatDoc(p) === avant, 'w18 : « Annuler » ramène R3 en (4 ; -3)');
    /* w19 : départ d'un escalier par deux points */
    const e19 = await entrerDeux(ESC);
    await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8');
    const lib19 = await libPoser(p); await bouton(p, 'cotesPoser');
    const b19 = await p.evaluate(() => { const b = window.__vcEd.etat.brouillon; return b ? {n: b.pts.length, x: b.pts[0].x, y: b.pts[0].y, aide: b.pts[0].aide, surBati: b.pts[0].surBati, cotes: 'cotes' in b} : null; });
    const st19 = await p.evaluate(() => { const S = window.__vcEd.etat; return {cotes: S.cotes, pan: S.panneau, outil: S.outil.k + ':' + S.outil.id}; }), P19 = {x: R1.x + 3.6, y: R1.y + 4.8};
    R.ok(!!e19 && e19.etape === 'p1' && lib19 === 'Poser le départ' && !!b19 && b19.n === 1 && ecart(b19, P19) <= 0.01 && b19.aide === null && b19.surBati === false && !b19.cotes
      && st19.cotes === null && st19.pan === null && st19.outil === 'ln:esc' && await nUndo(p) === u0 && await etatDoc(p) === avant,
      'w19 : outil Escalier, « Cotes », « Deux points », R1, R2, 6 et 8 : « Poser le départ » : brouillon d\'un point en (3,6 ; 4,8) à 1 cm près, sans aide, ni b.cotes, ni surBati ; mode '
      + 'fini, outil Escalier actif, aucun pas d\'annulation (obtenu ' + JSON.stringify([e19, lib19, b19, st19]) + ')');
    await C.pause(p, 250); await toucherPlan(p, plan(6.6, 4.8)); await C.pause(p, 250);
    const E19 = await escaliers(p);
    R.ok(E19.length === 1 && !!b19 && ecart(E19[0].v[0], b19) <= 1e-9, 'w19 : la fin touchée : un escalier qui part du départ posé par deux points (obtenu ' + E19.length + ' escalier, départ '
      + pt(E19[0] && E19[0].v[0]) + ')');
    await annuler(p); await toutFermer(p);
    /* w20 : sorties sans rien changer */
    const sorties = [];
    for (const k of ['Échap p1', 'Échap saisie', 'Abandonner p2', 'outil p2', 'croix saisie']){
      const e = await entrerDeux();
      if (!e || e.etape !== 'p1'){ sorties.push(k + ' : ' + JSON.stringify(e)); continue; }
      if (k !== 'Échap p1') await tap(R1);
      if (/saisie/.test(k)){ await tap(R2); await saisir(p, 'd1', '6'); }
      const e0 = await etatDeux(p);
      if (/^Échap/.test(k)) await p.keyboard.press('Escape');
      else if (/^Abandonner/.test(k)) await boutonAide(p, 'cotesStop');
      else if (/^outil/.test(k)) await C.outil(p, {k: 'main'});
      else { const x = await p.$('.vc .vc-panneau:not([hidden]) .vc-ptete button[data-a="fermerPanneau"]'); if (x) await x.click(); }
      await C.pause(p, 250);
      const ch = await choix(p);
      if (ch.cotes !== null || ch.pan !== null || await etatDoc(p) !== avant || await nUndo(p) !== u0) sorties.push(k + ' : ' + JSON.stringify(e0 && e0.etape) + ' puis ' + JSON.stringify(ch));
    }
    R.ok(!sorties.length, 'w20 : Échap (étape « p1 », puis panneau ouvert), « Abandonner » (étape « p2 »), un autre outil, la croix du panneau : mode fini, croquis inchangé, aucun pas '
      + 'd\'annulation' + (sorties.length ? ' (' + sorties.join(' ; ') + ')' : ''));
    /* w21 : « Autre trait », puis « Deux points » aussitôt (double toucher : il vient à sa place) : ignoré ; touché 0,5 s plus tard : « p1 » */
    await toutFermer(p); await vue(); await effacerToast(p);
    await C.outil(p, REGARD); await C.pause(p, 150); await entrer(p); await C.pause(p, 300);
    await toucherPlan(p, facade); await C.pause(p, 250);
    const e21a = await etatDeux(p), b21 = await boutonsAide(p);
    const d21 = await deuxTouchers(p, 'cotesAutre', 'cotesDeux'); await C.pause(p, 100);
    const e21b = await etatDeux(p);
    await C.pause(p, 500); await boutonAide(p, 'cotesDeux');
    const e21c = await etatDeux(p);
    await p.keyboard.press('Escape'); await C.pause(p, 250);
    const ch21 = await choix(p);
    R.ok(d21 && !!e21a && e21a.etape === 'endroit' && b21 === 'cotesAutre cotesStop' && !!e21b && e21b.etape === 'cote' && !e21b.deux && !!e21c && e21c.etape === 'p1' && !!e21c.deux
      && ch21.cotes === null && await etatDoc(p) === avant && await nUndo(p) === u0,
      'w21 : « Autre trait », puis « Deux points » aussitôt : ignoré (étape « cote ») ; touché 0,5 s plus tard : étape « p1 » ; Échap : mode fini (obtenu '
      + JSON.stringify([d21, e21a && e21a.etape, b21, e21b, e21c && e21c.etape, ch21]) + ')');
    /* w22 : un caniveau (orientable) par deux points, orientation automatique active, plan tourné de 15° : l'angle de la rotation du plan */
    const rot22 = await p.evaluate(() => { const S = window.__vcEd.etat, r0 = S.doc.rot; S.doc.rot = Math.PI / 12; S.vue.rot = S.doc.rot; window.__vcEd.redessiner();
      return {r0, auto: S.aides.actives !== false && S.aides.orienter !== false}; });
    const e22 = await entrerDeux({k: 'pt', t: 'caniveau', pal: 'ep'}); await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8');
    const els22 = await elements(p); await bouton(p, 'cotesPoser');
    const n22 = nouveaux(els22, await elements(p)), P22 = {x: R1.x + 3.6, y: R1.y + 4.8};
    if (n22.length) await annuler(p);
    await p.evaluate(r0 => { const S = window.__vcEd.etat; S.doc.rot = r0 === null ? undefined : r0; S.vue.rot = S.doc.rot || 0; window.__vcEd.redessiner(); }, rot22.r0 === undefined ? null : rot22.r0);
    R.ok(rot22.auto && !!e22 && e22.etape === 'p1' && n22.length === 1 && n22[0].t === 'caniveau' && n22[0].p.a === 15 && ecart(n22[0], P22) <= 0.01 && await etatDoc(p) === avant,
      'w22 : caniveau posé par deux points, orientation automatique active, plan tourné de 15° : angle 15 (la rotation du plan), en (3,6 ; 4,8) à 1 cm près (obtenu '
      + JSON.stringify([rot22, e22 && e22.etape, n22.map(e => [e.t, e.p.a])]) + ', ' + pt(n22[0]) + ')');
    /* w23 : 6 et 8 enregistrés, « -1 » tapé pour le point 2, puis « Poser » aussitôt (le champ perd le focus à ce toucher) : refusé, rien n'est posé */
    await entrerDeux(); await tap(R1); await tap(R2); await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8');
    await effacerToast(p); await taper(p, 'd2', '-1'); await bouton(p, 'cotesPoser');
    const t23 = await toastVu(p), e23 = await etatDeux(p), f23 = await panneauDeux(p);
    await bouton(p, 'cotesFermer');
    R.ok(t23 === 'Nombre attendu, par exemple 0,80' && !!e23 && e23.etape === 'saisie' && e23.deux.d2 === 8 && !!f23 && f23.d2 === '8,00' && f23.sols === 'Solution 1* | Solution 2'
      && await etatDoc(p) === avant && await nUndo(p) === u0 && (await choix(p)).cotes === null,
      'w23 : 6 et 8, puis « -1 » tapé pour le point 2 et « Poser » aussitôt : valeur refusée (8 gardé), rien n\'est posé, le panneau reste (obtenu '
      + JSON.stringify([t23, e23 && e23.etape, e23 && e23.deux && e23.deux.d2, f23 && [f23.d2, f23.sols]]) + ')');
    /* w24 : deux coins du bâti (sud-ouest et sud-est), 6 et 8, Solution 1 : la place tombe dans le bâti ; posé quand même, avec l'avertissement */
    const K2 = await p.evaluate(q => {
      const S = window.__vcEd.etat, Ls = window.VCroquis.geo.lignesRef(S.doc, S.aff.fond ? S.fond : null, null, ['bati']) || []; let b = null;
      Ls.forEach(l => l.P.forEach(v => { const d = Math.hypot(v.x - q.x, v.y - q.y); if (!b || d < b.d) b = {d, x: v.x, y: v.y}; }));
      return b && b.d < 0.01 ? {x: b.x, y: b.y} : null;
    }, plan(24, 6));
    await entrerDeux(); const c24 = plan(19, 8); await C.regler(p, c24.x, c24.y, 40);
    const w24a = await tap(K), w24b = K2 ? await tap(K2) : null; await saisir(p, 'd1', '6'); await saisir(p, 'd2', '8');
    const els24 = await elements(p); await effacerToast(p); await bouton(p, 'cotesPoser');
    const t24 = await toastVu(p), n24 = nouveaux(els24, await elements(p)), P24 = {x: K.x + 3.6, y: K.y + 4.8}, u24 = await nUndo(p);
    if (n24.length) await annuler(p);
    R.ok(!!K2 && etape(w24a) === 'p2' && etape(w24b) === 'saisie' && n24.length === 1 && ecart(n24[0], P24) <= 0.01 && u24 === u0 + 1
      && t24.indexOf('Le point tombe dans le bâti : l\'objet est posé quand même. Vérifiez les cotes (« Annuler » le retire).') === 0 && await etatDoc(p) === avant,
      'w24 : deux coins du bâti, 6 et 8 : regard posé dans le bâti, en (17,6 ; 10,8) à 1 cm près, un pas d\'annulation, avertissement « Le point tombe dans le bâti… » ; '
      + '« Annuler » le retire (obtenu ' + JSON.stringify([K2, etape(w24a), etape(w24b), t24]) + ', ' + pt(n24[0]) + ' pour ' + pt(P24) + ')');
    /* w25 : R4 à 0,3 mm de la droite de R1 à R2 (les cercles de ses distances se touchent à 1 mm près) : « Déplacer » sans rien changer */
    const R4 = plan(5, 0.0003);
    await toutFermer(p);
    await C.injecter(p, {el: [C.P('r1', 'regard', R1.x, R1.y), C.P('r2', 'regard', R2.x, R2.y), C.P('r3', 'regard', R3.x, R3.y), C.P('r4', 'regard', R4.x, R4.y)]});
    await vue();
    const avant25 = await etatDoc(p), u25 = await nUndo(p);
    await p.evaluate(() => window.__vcEd.selectionner('r4')); await C.pause(p, 250);
    const ok25 = await boutonTexte(p, DEPLACER); await C.pause(p, 300); await boutonAide(p, 'cotesDeux');
    await tap(R1); const w25 = await tap(R2), f25 = await panneauDeux(p);
    await bouton(p, 'cotesDeplacer');
    const o25 = await objet(p, 'r4'), ch25 = await choix(p);
    R.ok(ok25 && etape(w25) === 'saisie' && !!f25 && f25.d1 === '5,00' && f25.d2 === '5,00' && f25.sols === '' && f25.texte.indexOf('ne se croisent pas') < 0 && egal(o25, R4)
      && await nUndo(p) === u25 && await etatDoc(p) === avant25 && ch25.cotes === null && ch25.sel === 'r4' && ch25.pan === 'fiche',
      'w25 : R4 à 0,3 mm de la droite de R1 à R2, « Déplacer par cotes » par deux points (R1, R2 : 5,00 et 5,00, une seule place, pas de puces) ; « Déplacer » sans rien changer : '
      + 'R4 ne bouge pas, aucun pas d\'annulation, fiche rouverte (obtenu ' + JSON.stringify([ok25, etape(w25), f25 && [f25.d1, f25.d2, f25.sols], ch25]) + ', ' + pt(o25) + ' pour '
      + pt(R4) + ', ' + (await nUndo(p) - u25) + ' pas)');
    erreurs(A, 'w1 à w25');
  } finally { await A.fermer(); }
}
/* w26 (m146) : écran de 400 × 800 : la barre d'aide passe à la ligne, et « Abandonner » vient à la place de « Deux points » */
async function deuxPointsEtroit(){
  const A = await C.ouvrir({viewport: {width: 400, height: 800}}), p = A.p;
  try {
    await ouvrirFondFictif(p, 'plan-fictif-deux-points.dxf', dxfDeux());
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.pause(p, 150);
    await entrer(p); await C.pause(p, 400);
    const q = await centreAide(p, 'cotesDeux');
    if (q){ await p.touchscreen.tap(q.x, q.y); await p.touchscreen.tap(q.x, q.y); await C.pause(p, 300); }
    const sous = q ? await boutonSous(p, q) : '', e1 = await etatDeux(p);
    await C.pause(p, 300); await boutonAide(p, 'cotesStop');
    const e2 = await etatDeux(p);
    R.ok(!!q && sous === 'cotesStop' && !!e1 && e1.etape === 'p1' && !!e1.deux && e2 === null,
      'w26 : écran de 400 × 800, double toucher sur « Deux points » : le second, tombé sur « Abandonner » venu à sa place, est ignoré (étape « p1 ») ; « Abandonner » touché '
      + '0,5 s plus tard finit le mode (obtenu ' + JSON.stringify([q, sous, e1 && e1.etape, e2]) + ')');
    erreurs(A, 'w26');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [prolongement, poses, valeursEtSorties, superposees, geometrie, mesureEtDeplacement, casLimites, departEscalier, libellesObjets, deuxPointsCotes, deuxPointsEtroit]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
