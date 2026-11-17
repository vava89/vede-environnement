// Lot « Équipements » (souhaits 7, 8, 15 et 18 ; `.claude/conception-equipements.md`) dans l'éditeur du croquis, dans Chromium (données
// fictives, fond fictif de VCroquis.demoDxf()).
// m130, niveau d'étage précis (souhait 15 ; décision D7) :
// e1 : la fiche d'un lavabo a les puces Niveau Sous-sol | RDC | 1er | 2e | 3e | Combles, puis le bouton « Autre… », aucune puce pressée ;
//      « 2e » écrit p.niv 'etage' et p.etage '2' en un pas d'annulation, la puce est pressée, seule, et l'étiquette à l'écran devient
//      « Lavabo (2e étage) » ; un second toucher sur elle vide le niveau (niv '', plus de clé etage) ; « RDC » après « 2e » retire etage ;
//      « Autre… » ouvre un dialogue au clavier numérique : 5 donne p.etage '5' en un pas et une puce « 5e » pressée entre 3e et Combles, que
//      le dialogue suivant propose ; « abc », « 0 » et « 100 » sont refusés avec un toast, sans rien changer ni pas d'annulation ; le même
//      étage ne fait aucun pas ; « Annuler » rend l'étage d'avant ; Échap ou le bouton « Annuler » du dialogue : rien ne change, aucun pas ;
//      « Combles » écrit etage 'combles' en un pas, étiquette « Lavabo (combles) » à l'écran ; « Sous-sol » après « Combles » retire etage ;
//      un croquis d'avant m130 (niv 'etage' sans numéro) montre la puce « Étage (à préciser) » pressée, à cette place, et elle seule, de même
//      un numéro illisible ('05') ; un étage 7 venu d'un fichier, la puce « 7e » pressée ; un second toucher sur ces puces vide le niveau
//      (niv '', plus de clé etage) en un pas, la puce ajoutée disparaît, et « Annuler » rend la valeur ;
//      une valeur de puce écrite dans niv ('etage:2', 'etage:7' : fichier fait à la main, code inconnu) : aucune puce pressée, ni « 7e » ;
//      « 2e » y écrit niv 'etage' et etage '2' ;
//      Lavabo → Évier par le sélecteur Type : niv et etage gardés, aucun toast ; « Annuler » rend le lavabo et son étage ; sans étage, aucune
//      clé etage n'est écrite ; un WC au 7e changé en lavabo garde son étage ; aucune erreur dans la console.
// e1 échoue sur ee7b979 (puces Sous-sol | RDC | Étage, ni « Autre… » ni p.etage ; le changement de type efface etage avec un toast).
// m131, WC à lave-mains intégré (souhait 18 ; décisions D1, D5 et D7) :
// l6 : la fiche du WC a, juste après le Niveau, une puce « + lave-mains » non pressée et l'aide « Lave-mains intégré au WC ; raccordé à
//      part : dessinez un Lavabo. », l'en-tête « WC » et une étiquette sans texte indicatif ; la puce écrit p.lm 'oui' en un pas
//      d'annulation, elle est pressée, l'en-tête et le texte indicatif de l'étiquette deviennent « WC + lave-mains », l'étiquette est posée
//      et dessinée à l'écran ; un second toucher retire la clé lm (jamais une valeur vide) en un pas, « Annuler » la rend ; un lavabo n'a ni
//      la puce ni l'aide ; WC + lave-mains → Lavabo par le sélecteur Type : clé lm effacée, avec le toast « Type changé : une caractéristique
//      ne s'applique plus et est effacée · « Annuler » les rétablit » ; « Annuler » rend le WC + lave-mains ; aucune erreur dans la console.
// l6 échoue sur 824fabf (ni puce ni aide ; le toast du changement de type y paraît déjà).
// m133, autres appareils, palette et fiche (souhait 7 ; décisions D7, D2 et D10) :
// e2 : « Autre appareil » est le dernier item de la palette Appareils EU ; posé au toucher, il est sans nom, en un pas, et sa fiche
//      s'ouvre sur le champ Nom, en tête et vide, sans focus ni dialogue ; puces des noms proposés : ceux du cadrage, puis « Bidet
//      suspendu », déjà donné à un autre objet du croquis, mais pas « Lavabo », nom refusé venu d'un fichier ; puces EU | EP ;
//      « Compté au constat » : « Autres : Autre appareil » pressée, puis les lignes EU du formulaire ; texte indicatif de l'abréviation
//      « ? » (sans nom). Puce « Bidet » : nom écrit en un pas, en-tête « Bidet », puce pressée, « Autres : Bidet », texte indicatif « Bi » ;
//      étiquette « Bidet », posée et dessinée ; un second toucher sur la puce pressée ne fait rien. Noms tapés « Lavabo », « Douche
//      italienne », « Puits perdu » : refusés avec le toast qui nomme l'objet à poser, « Bidet » rendu, aucun pas. Abréviation « BD » en
//      un pas (lettres du symbole) ; « Ω », illisible au PDF, refusée avec un toast, « BD » rendue. « Compté au constat » WC : row « wc »
//      en un pas, puce pressée ; un second toucher ne fait rien. EU → EP : un pas, nom et abréviation gardés, row vidé, toast « Type
//      changé : … », puces des noms EP ; « Annuler » rend l'appareil EU compté en WC. « Lavabo » venu d'un fichier : lu tel quel (en-tête,
//      champ, étiquette) ; « Vasque » tapé : refusé, « Lavabo » rendu. « Autre ouvrage EP », dernier item des Ouvrages EP, posé seul :
//      fiche sur le nom, puces EP, bouton « Rejet au sol » ; « Rigole » tapé, puis un autre ouvrage EP posé : « Rigole » proposé après les
//      noms du cadrage, « Bidet » (EU) non ; aucune erreur dans la console.
// e2 échoue sur 53fe487 (« Autre appareil » absent de la palette ; les contrôles suivants ne sont pas lancés).
// m134, étiquette commune (souhait 8 ; décision D6 ; c8, à la suite de c1 à c7 de vm/equipements.js : e3 est le test prévu pour m135) :
// c8 : douche porteur (titre « sdb »), lavabo et WC + lave-mains liés à elle, au 1er étage, étiquettes à placer : à l'écran « Salle de bain
//      (1er étage) » puis « douche, lavabo, WC + lave-mains », une fois chacune, aucune étiquette propre d'un membre ; témoin « Évier
//      (RDC) » à part ; de même au plan PDF de l'état des lieux, produit par la sortie de l'éditeur (textes captés à l'appel de la
//      bibliothèque PDF, sans les liserés). Le lavabo changé en évier par le sélecteur Type : lien gardé, aucun toast, un pas, « douche,
//      évier, WC + lave-mains » ; « Annuler » rend le lavabo lié ; la douche changée en baignoire : titre gardé, « baignoire,
//      lavabo, WC + lave-mains » ; le témoin, au lien et au titre vides (fichier fait à la main), changé en lavabo : aucune de ces clés
//      écrite, « Lavabo (RDC) » ; aucune erreur dans la console.
// c8 échoue sur 344c7b2 (5 cas : chacun son étiquette, à l'écran et au plan PDF ; le changement de type efface lien et titre avec un
// toast) ; y passent « Annuler » et la console.
// m135, étiquette commune, 2e partie (souhait 8 ; décisions D6 et D7) :
// e3 : douche D au lien vers elle-même (M4), lavabo L et WC + lave-mains W voisins, lave-linge F à 3,8 m, descente EP, lavabo « Projet »,
//      lavabo « À supprimer », douche X et son WC Y réunis, au 1er étage. Fiche de la douche seule : bouton « Étiquette commune… » ;
//      absent de la fiche de la descente, présent sur celle du lavabo « Projet ». Le bouton ouvre le mode : fiche fermée, bandeau « Touchez
//      les appareils à réunir avec la Douche · 0 choisi », « Terminé », « Annuler ». Toucher sur L : « 1 choisi » ; le zoom garde le mode ;
//      W : « 2 choisis », halos du porteur (orange) et des deux choisis, seulement ; rien d'écrit, aucun pas. Double toucher sur F : ajouté
//      une fois, toast « Loin du porteur : le plan ne le désignera que par la liste. » ; un toucher de plus le retire. Refus, avec leur toast,
//      dans l'ordre de D7 : descente EP, lavabo « Projet », lavabo « À supprimer », WC d'un autre groupe, porteur d'un autre groupe ; sur le
//      porteur : rien. « Terminé » : un pas, L et W liés, lien de D effacé, F sans lien, mode fermé, fiche de D, toast « Lavabo et évier
//      comptent à part (Évier) ; … » ; à l'écran l'étiquette commune seule ; « Annuler » rend les trois étiquettes, « Rétablir » le groupe.
//      Fiche du porteur : puces Salle de bain | Salle d'eau | Cuisine | Buanderie | Aucun, aucune pressée ; « Compté au constat : Salle de
//      bain 1, Évier 1, WC 1 » ; texte indicatif sur une ligne (M3) ; « Modifier le groupe », « Défaire » ; « Salle d'eau » en un pas, à
//      l'écran ; un second toucher retire la clé etiqTitre. M6 : niveau de L changé, étiquette du porteur posée d'office replacée, déplacée à
//      la main gardée. Fiche de L : « Étiquette réunie avec la Douche », champ, « Affichée » et « Replacer » grisés ; « Voir » choisit D et
//      centre la vue ; « Séparer » (aussi après « Replacer toutes les étiquettes ») : un pas, lien retiré, étiquette de L posée, le groupe
//      garde D et W. D supprimée : un pas, liens retirés, étiquettes de L et W posées ; « Annuler » rend tout. « Modifier le groupe » : L et W
//      choisis ; W retiré, « Terminé » : un pas, clé retirée, étiquette posée. « Annuler » du bandeau, autre outil, Échap : mode fermé, rien
//      d'écrit. L supprimé : un pas, étiquette du porteur replacée. Lave-linge seul, « Terminé » sans choix : rien d'écrit ; « Modifier le
//      groupe » sans choix : groupe défait, titre compris. « Annuler » de la barre ferme le mode. « Défaire » : un pas, liens et titre
//      effacés, trois étiquettes posées ; « Annuler » les rend ; aucune erreur dans la console.
//      Après la relecture : le bouton du lavabo « Projet » n'ouvre pas le mode, toast « … ; réunissez-le sur l'avant-projet » (M7).
//      Nouveau croquis : douche au lien orphelin (« ZZ », absent) : bouton, un toucher, « Terminé » : un pas, clé retirée, groupe formé
//      (M6) ; évier titré « cuisine », son dernier membre séparé puis supprimé : titre retiré dans le même pas, « Annuler » le rend ; puis
//      nouveau groupe évier + lave-linge : aucun titre, aucune puce pressée, pas de toast (M1) ; douche réunie avec une chaudière et deux
//      autres appareils : « Compté au constat : Salle de bain 1, Autres : Chaudière (purge, condensat) 1, Autres : Piscine (vidange) 1,
//      Autres : Piscine 1 » (M2 et M4) ; « Séparer » de ces membres : étiquette masquée gardée masquée, déplacée à la main gardée en
//      place, posée d'office replacée (M3 et M5 : ce que dit le LISEZMOI) ; sur l'avant-projet, le bouton d'un appareil « À supprimer »
//      n'ouvre pas le mode, toast « … ; réunissez-le sur l'état des lieux » (M7).
// e3 échoue sur 82f9ae2 (pas de bouton « Étiquette commune… » ; les contrôles suivants ne sont pas lancés) ; sans la correction de la
// relecture, 6 cas échouent : M7 (état des lieux, avant-projet), M1 (dernier membre séparé, supprimé, nouveau groupe) et « Compté au
// constat » (M2 et M4) ; le cas M3 et M5 passe aussi sans elle (seul le texte a changé).
// m141, ordre de l'étiquette commune (réponse ordre-etiquette-commune du 16 nov. 2026, choix b ; décision D7 de
//      `.claude/conception-v172.md`) : la liste suit l'ordre de l'exemple de la conception (douche, lavabo, WC), porteur compris ; le
//      porteur garde son rôle. Attentes changées : c8 « douche, lavabo, WC + lave-mains », « douche, évier, WC + lave-mains »,
//      « baignoire, lavabo, WC + lave-mains » ; e3 « douche, lavabo, WC + lave-mains » et « Compté au constat : Salle de bain 1, Évier 1,
//      WC 1 ».
// c11 : WC + lave-mains W porteur, douche D et lavabo L liés à lui, au 1er étage : à l'écran et au plan PDF « Salle de bain (1er étage) »
//      puis « douche, lavabo, WC + lave-mains », une fois chacune, aucune étiquette propre. Fiche de W : « Compté au constat : Salle de
//      bain 1, Évier 1, WC 1 », texte indicatif « Salle de bain (1er étage) — douche, lavabo, WC + lave-mains », « Modifier le groupe » et
//      « Défaire ». Fiche de D : « Étiquette réunie avec le WC + lave-mains », « Voir » vers W. Puce « Salle d'eau » : titre écrit sur W, un
//      pas, « Salle d'eau (1er étage) » à l'écran. « Modifier le groupe » : mode ouvert pour W, D et L choisis, halos ; « Annuler » du
//      bandeau : rien d'écrit. D retiré, « Terminé » : un pas, lien retiré, étiquette de D posée, « Lavabo, WC + lave-mains (1er étage) ».
//      « Défaire », puis W supprimé : un pas, liens retirés, étiquettes des membres posées ; « Annuler » rend le groupe. Aucune erreur dans
//      la console.
// c11 échoue sur 5549078 (ordre du catalogue, porteur en tête : « WC + lave-mains, lavabo, douche », « Compté au constat : WC 1, Évier 1,
// Salle de bain 1 ») : 8 cas sur 14 (écran, plan PDF, compte, texte indicatif, « Salle d'eau », douche retirée, les deux « Annuler ») ; y
// passent la fiche du membre, « Modifier le groupe », « Annuler » du bandeau, « Défaire », la suppression et la console. De même 5 cas de
// c8 et 6 de e3, aux attentes changées (avant : « douche, WC + lave-mains, lavabo », « Salle de bain 1, WC 1, Évier 1 »).
// usage : node tests/navigateur/equipements.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('equipements');

/* Dossier neuf et croquis ouvert sur le fond fictif. */
async function croquisNeuf(){
  const A = await C.ouvrir(); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); return A;
}
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
async function choisir(p, id){ await p.evaluate(id => window.__vcEd.selectionner(id), id); await C.pause(p, 300); }
const elDoc = async (p, id) => (await C.docCroquis(p)).el.find(e => e.id === id);
const nUndo = p => p.evaluate(() => window.__vcEd.etat.undo.length);
const annuler = async p => { await p.evaluate(() => window.__vcEd.annuler()); await C.pause(p, 250); };
const puce = (k, v) => '.vc .vc-pcorps button.vc-chip[data-a="prop"][data-k="' + k + '"][data-v="' + v + '"]';
async function toucherPuce(p, k, v){ const b = await p.$(puce(k, v)); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
const toastVu = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent : ''; });
const effacerToast = p => p.evaluate(() => { const t = document.querySelector('.vc .vc-toast'); if (t){ t.classList.remove('on'); t.textContent = ''; } });
/* niveau enregistré : niv et etage, « sans clé » quand etage manque */
const niveau = e => e ? JSON.stringify({t: e.t, niv: e.p.niv}) + ('etage' in e.p ? ' etage ' + JSON.stringify(e.p.etage) : ' sans clé etage') : 'absent';
/* puces Niveau de la fiche, dans l'ordre (valeur/libellé/pressée), et le dernier bouton du groupe */
const pucesNiv = p => p.evaluate(() => {
  const c = document.querySelector('.vc .vc-pcorps'), b = c ? Array.from(c.querySelectorAll('button.vc-chip[data-a="prop"][data-k="niv"]')) : [];
  const g = b.length ? b[0].closest('.vc-chips') : null, der = g && g.lastElementChild;
  return {puces: b.map(x => x.dataset.v + '/' + x.textContent + '/' + x.getAttribute('aria-pressed')).join(' | '),
    autre: der && der.dataset.a === 'nivAutre' ? der.textContent : ''};
});
const BASE = ['ss/Sous-sol', 'rdc/RDC', 'etage:1/1er', 'etage:2/2e', 'etage:3/3e', 'etage:combles/Combles'];
/* puces attendues : celle de valeur v pressée ; sup : puce de plus, placée entre 3e et Combles */
function attendu(v, sup){ const l = BASE.slice(); if (sup) l.splice(5, 0, sup); return l.map(x => x + '/' + (x.split('/')[0] === v)).join(' | '); }
/* textes écrits sur le canevas au dessin suivant */
async function textesEcran(p){
  await p.evaluate(() => {
    if (!window.__textesPris){ window.__textesPris = true; const f = CanvasRenderingContext2D.prototype.fillText;
      CanvasRenderingContext2D.prototype.fillText = function(t){ if (window.__textes) window.__textes.push(String(t)); return f.apply(this, arguments); }; }
    window.__textes = []; window.__vcEd.redessiner();
  });
  await C.pause(p, 300);
  return p.evaluate(() => window.__textes.slice());
}
/* « Autre… » : dialogue, saisie, « Valider » ; rend le mode du clavier, la valeur proposée, le toast et si le dialogue reste ouvert */
async function autre(p, txt){
  const b = await p.$('.vc .vc-pcorps button[data-a="nivAutre"]'); if (!b) return {ouvert: false};
  await b.click(); await C.pause(p, 250);
  const i = await p.$('.vc .vc-modal input'); if (!i) return {ouvert: false};
  const mode = await i.getAttribute('inputmode'), val0 = await i.inputValue();
  await i.fill(txt); await effacerToast(p);
  const ok = await p.$('.vc .vc-modal button[data-r="1"]'); if (ok){ await ok.click(); await C.pause(p, 300); }
  return {ouvert: true, mode, val0, toast: await toastVu(p), reste: !!await p.$('.vc .vc-modal')};
}
/* « Autre… » refermé sans valider, après une saisie : Échap au clavier, ou bouton « Annuler » du dialogue */
async function autreFerme(p, txt, par){
  const b = await p.$('.vc .vc-pcorps button[data-a="nivAutre"]'); if (!b) return {ouvert: false};
  await b.click(); await C.pause(p, 250);
  const i = await p.$('.vc .vc-modal input'); if (!i) return {ouvert: false};
  await i.fill(txt); await effacerToast(p);
  if (par === 'Échap') await i.press('Escape');
  else { const n = await p.$('.vc .vc-modal button[data-r="0"]'); if (n) await n.click(); }
  await C.pause(p, 300);
  return {ouvert: true, toast: await toastVu(p), reste: !!await p.$('.vc .vc-modal')};
}
/* second toucher sur la puce pressée du Niveau, de valeur v, puis « Annuler » : l'objet après le toucher, le nombre de pas, les puces,
   l'objet après « Annuler » */
async function secondToucher(p, id, v){
  const u = await nUndo(p), ok = await toucherPuce(p, 'niv', v), e = await elDoc(p, id), u1 = await nUndo(p), f = await pucesNiv(p);
  await annuler(p);
  return {ok, e, pas: u1 - u, puces: f.puces, apres: await elDoc(p, id)};
}
const MSG = 'Numéro d\'étage attendu, de 1 à 99';

async function niveaux(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    const L1 = C.P('L1', 'lavabo', cx, cy); L1.lab = null;
    await C.injecter(p, {el: [L1, C.P('E2', 'evier', cx + 5, cy, {niv: 'etage'}), C.P('W3', 'wc', cx - 5, cy, {niv: 'etage', etage: '7'}),
      C.P('E4', 'douche', cx, cy + 5, {niv: 'etage', etage: '05'}), C.P('X5', 'lavabo', cx, cy - 5, {niv: 'etage:2'}), C.P('X6', 'douche', cx + 5, cy + 5, {niv: 'etage:7'})]});
    await C.regler(p, cx, cy, 40);
    await choisir(p, 'L1');
    let f = await pucesNiv(p);
    R.ok(f.puces === attendu('') && f.autre === 'Autre…', 'e1 fiche du lavabo : puces ' + BASE.map(x => x.split('/')[1]).join(' | ') + ', puis « Autre… », aucune pressée (obtenu '
      + f.puces + ', dernier bouton ' + JSON.stringify(f.autre) + ')');

    /* « 2e », puis second toucher */
    let u = await nUndo(p), ok = await toucherPuce(p, 'niv', 'etage:2'), e = await elDoc(p, 'L1'), u1 = await nUndo(p);
    f = await pucesNiv(p);
    R.ok(ok && e.p.niv === 'etage' && e.p.etage === '2' && u1 === u + 1 && f.puces === attendu('etage:2'),
      'e1 « 2e » : niv « etage », etage « 2 », un pas d\'annulation, puce « 2e » pressée seule (' + (ok ? '' : 'puce absente, ') + niveau(e) + ', pas ' + (u1 - u) + ', puces ' + f.puces + ')');
    const tx = await textesEcran(p);
    R.ok(tx.indexOf('Lavabo (2e étage)') >= 0, 'e1 à l\'écran, étiquette « Lavabo (2e étage) » (textes ' + JSON.stringify(tx.filter(t => /Lavabo|étage/.test(t))) + ')');
    ok = await toucherPuce(p, 'niv', 'etage:2'); e = await elDoc(p, 'L1'); const u2 = await nUndo(p); f = await pucesNiv(p);
    R.ok(ok && e.p.niv === '' && !('etage' in e.p) && u2 === u1 + 1 && f.puces === attendu(''),
      'e1 second toucher sur « 2e » : niveau vidé, sans clé etage, un pas, aucune puce pressée (' + niveau(e) + ', pas ' + (u2 - u1) + ', puces ' + f.puces + ')');
    await toucherPuce(p, 'niv', 'etage:2'); ok = await toucherPuce(p, 'niv', 'rdc'); e = await elDoc(p, 'L1'); f = await pucesNiv(p);
    R.ok(ok && e.p.niv === 'rdc' && !('etage' in e.p) && f.puces === attendu('rdc'), 'e1 « RDC » après « 2e » : etage retiré, puce RDC pressée (' + niveau(e) + ', puces ' + f.puces + ')');

    /* « Autre… » */
    u = await nUndo(p); let r = await autre(p, '5'); e = await elDoc(p, 'L1'); let u3 = await nUndo(p); f = await pucesNiv(p);
    R.ok(r.ouvert && r.mode === 'numeric' && r.val0 === '' && !r.reste && !r.toast && e.p.niv === 'etage' && e.p.etage === '5' && u3 === u + 1 && f.puces === attendu('etage:5', 'etage:5/5e'),
      'e1 « Autre… » 5 : clavier numérique, champ vide, etage « 5 » en un pas, puce « 5e » pressée entre 3e et Combles (' + JSON.stringify(r) + ', ' + niveau(e) + ', pas ' + (u3 - u)
      + ', puces ' + f.puces + ')');
    for (const s of ['abc', '0', '100']){
      u = await nUndo(p); r = await autre(p, s); e = await elDoc(p, 'L1'); u3 = await nUndo(p);
      R.ok(r.ouvert && r.toast === MSG && !r.reste && e.p.niv === 'etage' && e.p.etage === '5' && u3 === u,
        'e1 « Autre… » « ' + s + ' » refusé : toast « ' + MSG + ' », etage inchangé, aucun pas (' + JSON.stringify(r) + ', ' + niveau(e) + ', pas ' + (u3 - u) + ')');
    }
    u = await nUndo(p); r = await autre(p, '5'); e = await elDoc(p, 'L1'); u3 = await nUndo(p);
    R.ok(r.ouvert && r.val0 === '5' && !r.toast && e.p.etage === '5' && u3 === u, 'e1 « Autre… » propose l\'étage choisi (5) ; le même étage ne fait aucun pas (' + JSON.stringify(r) + ', pas ' + (u3 - u) + ')');
    r = await autre(p, ' 12 '); e = await elDoc(p, 'L1'); await annuler(p); const e0 = await elDoc(p, 'L1');
    R.ok(e.p.etage === '12' && e0.p.etage === '5' && e0.p.niv === 'etage', 'e1 « Autre… » « 12 » (espaces retirés), puis « Annuler » rend le 5e (' + niveau(e) + ' ; après « Annuler » ' + niveau(e0) + ')');
    /* « Autre… » refermé sans valider */
    await choisir(p, 'L1');
    for (const par of ['Échap', 'Annuler']){
      u = await nUndo(p); r = await autreFerme(p, '8', par); e = await elDoc(p, 'L1'); u3 = await nUndo(p);
      R.ok(r.ouvert && !r.reste && !r.toast && e.p.niv === 'etage' && e.p.etage === '5' && u3 === u, 'e1 « Autre… » refermé par ' + (par === 'Échap' ? 'Échap' : 'le bouton « Annuler »')
        + ' après « 8 » : rien ne change, aucun pas, aucun toast (' + JSON.stringify(r) + ', ' + niveau(e) + ', pas ' + (u3 - u) + ')');
    }

    /* « Combles », puis « Sous-sol » ; « Annuler » deux fois rend le 5e */
    u = await nUndo(p); ok = await toucherPuce(p, 'niv', 'etage:combles'); e = await elDoc(p, 'L1'); u3 = await nUndo(p); f = await pucesNiv(p);
    const txc = await textesEcran(p);
    R.ok(ok && e.p.niv === 'etage' && e.p.etage === 'combles' && u3 === u + 1 && f.puces === attendu('etage:combles') && txc.indexOf('Lavabo (combles)') >= 0,
      'e1 « Combles » : etage « combles » en un pas, puce Combles pressée seule, étiquette « Lavabo (combles) » à l\'écran (' + (ok ? '' : 'puce absente, ') + niveau(e) + ', pas ' + (u3 - u)
      + ', puces ' + f.puces + ', textes ' + JSON.stringify(txc.filter(t => /Lavabo/.test(t))) + ')');
    ok = await toucherPuce(p, 'niv', 'ss'); e = await elDoc(p, 'L1'); const u4 = await nUndo(p); f = await pucesNiv(p);
    R.ok(ok && e.p.niv === 'ss' && !('etage' in e.p) && u4 === u3 + 1 && f.puces === attendu('ss'),
      'e1 « Sous-sol » après « Combles » : etage retiré, un pas, puce Sous-sol pressée (' + niveau(e) + ', pas ' + (u4 - u3) + ', puces ' + f.puces + ')');
    await annuler(p); await annuler(p); e = await elDoc(p, 'L1');
    R.ok(e.p.niv === 'etage' && e.p.etage === '5', 'e1 « Annuler » deux fois rend le 5e (' + niveau(e) + ')');

    /* croquis d'avant m130 ; numéro illisible ; étage venu d'un fichier ; second toucher sur ces puces */
    await choisir(p, 'E2'); f = await pucesNiv(p);
    R.ok(f.puces === attendu('etage', 'etage/Étage (à préciser)'), 'e1 évier d\'avant m130 (niv « etage » sans numéro) : puce « Étage (à préciser) » pressée, seule (' + f.puces + ')');
    let st = await secondToucher(p, 'E2', 'etage');
    R.ok(st.ok && st.e.p.niv === '' && !('etage' in st.e.p) && st.pas === 1 && st.puces === attendu('') && st.apres.p.niv === 'etage' && !('etage' in st.apres.p),
      'e1 second toucher sur « Étage (à préciser) » : niveau vidé en un pas, la puce disparaît, aucune pressée ; « Annuler » rend l\'étage sans numéro ('
      + niveau(st.e) + ', pas ' + st.pas + ', puces ' + st.puces + ' ; après « Annuler » ' + niveau(st.apres) + ')');
    await choisir(p, 'E4'); f = await pucesNiv(p); st = await secondToucher(p, 'E4', 'etage');
    R.ok(f.puces === attendu('etage', 'etage/Étage (à préciser)') && st.ok && st.e.p.niv === '' && !('etage' in st.e.p) && st.pas === 1 && st.apres.p.niv === 'etage' && st.apres.p.etage === '05',
      'e1 douche au numéro illisible « 05 » : puce « Étage (à préciser) » pressée ; second toucher : niv vidé, clé etage retirée, un pas ; « Annuler » rend « 05 » (puces '
      + f.puces + ' ; ' + niveau(st.e) + ', pas ' + st.pas + ' ; après « Annuler » ' + niveau(st.apres) + ')');
    await choisir(p, 'W3'); f = await pucesNiv(p);
    R.ok(f.puces === attendu('etage:7', 'etage:7/7e'), 'e1 WC au 7e : puce « 7e » pressée (' + f.puces + ')');
    st = await secondToucher(p, 'W3', 'etage:7');
    R.ok(st.ok && st.e.p.niv === '' && !('etage' in st.e.p) && st.pas === 1 && st.puces === attendu('') && st.apres.p.niv === 'etage' && st.apres.p.etage === '7',
      'e1 second toucher sur « 7e » : niveau vidé, sans clé etage, un pas, la puce « 7e » disparaît ; « Annuler » rend le 7e (' + niveau(st.e) + ', pas ' + st.pas + ', puces '
      + st.puces + ' ; après « Annuler » ' + niveau(st.apres) + ')');

    /* valeur de puce écrite dans niv (fichier fait à la main) : code inconnu, comme pour l'étiquette et le tableau */
    await choisir(p, 'X5'); f = await pucesNiv(p);
    u = await nUndo(p); ok = await toucherPuce(p, 'niv', 'etage:2'); e = await elDoc(p, 'X5'); u3 = await nUndo(p); const fx = await pucesNiv(p);
    R.ok(f.puces === attendu('') && ok && e.p.niv === 'etage' && e.p.etage === '2' && u3 === u + 1 && fx.puces === attendu('etage:2'),
      'e1 lavabo de niv « etage:2 » (code inconnu) : aucune puce pressée ; « 2e » y écrit niv « etage » et etage « 2 » en un pas (puces avant ' + f.puces + ' ; '
      + niveau(e) + ', pas ' + (u3 - u) + ', puces après ' + fx.puces + ')');
    await choisir(p, 'X6'); f = await pucesNiv(p);
    u = await nUndo(p); r = await autre(p, '7'); e = await elDoc(p, 'X6'); u3 = await nUndo(p);
    R.ok(f.puces === attendu('') && r.ouvert && !r.reste && !r.toast && e.p.niv === 'etage' && e.p.etage === '7' && u3 === u + 1,
      'e1 douche de niv « etage:7 » (code inconnu) : ni puce « 7e » ni puce pressée ; « Autre… » 7 y écrit niv « etage » et etage « 7 » en un pas (puces ' + f.puces + ' ; '
      + JSON.stringify(r) + ', ' + niveau(e) + ', pas ' + (u3 - u) + ')');

    /* changement de type */
    await choisir(p, 'L1'); await effacerToast(p);
    let s = await p.$('.vc .vc-pcorps select[data-a="type"]');
    if (!s){ R.ok(false, 'e1 choix du type absent de la fiche du lavabo'); return; }
    await s.selectOption('evier'); await C.pause(p, 300);
    let msg = await toastVu(p); e = await elDoc(p, 'L1');
    R.ok(e.t === 'evier' && e.p.niv === 'etage' && e.p.etage === '5' && !msg, 'e1 Lavabo → Évier par le sélecteur Type : niveau et étage gardés, aucun toast (' + niveau(e) + ', toast ' + JSON.stringify(msg) + ')');
    await annuler(p); e = await elDoc(p, 'L1');
    R.ok(e.t === 'lavabo' && e.p.niv === 'etage' && e.p.etage === '5', 'e1 « Annuler » rend le lavabo au 5e (' + niveau(e) + ')');
    await choisir(p, 'L1'); await toucherPuce(p, 'niv', 'rdc'); await effacerToast(p);
    s = await p.$('.vc .vc-pcorps select[data-a="type"]'); await s.selectOption('douche'); await C.pause(p, 300);
    msg = await toastVu(p); e = await elDoc(p, 'L1');
    R.ok(e.t === 'douche' && e.p.niv === 'rdc' && !('etage' in e.p) && !msg, 'e1 lavabo au RDC changé en douche : aucune clé etage écrite, aucun toast (' + niveau(e) + ', toast ' + JSON.stringify(msg) + ')');
    await choisir(p, 'W3'); await effacerToast(p);
    s = await p.$('.vc .vc-pcorps select[data-a="type"]'); await s.selectOption('lavabo'); await C.pause(p, 300);
    msg = await toastVu(p); e = await elDoc(p, 'W3');
    R.ok(e.t === 'lavabo' && e.p.niv === 'etage' && e.p.etage === '7' && !msg, 'e1 WC au 7e changé en lavabo : étage gardé, aucun toast (' + niveau(e) + ', toast ' + JSON.stringify(msg) + ')');
    erreurs(A, 'e1');
  } finally { await A.fermer(); }
}

/* m131 : WC à lave-mains intégré (souhait 18 ; D1, D5, D7) */
const LM = 'WC + lave-mains', AIDE_LM = 'Lave-mains intégré au WC ; raccordé à part : dessinez un Lavabo.';
const TOAST_TYPE = 'Type changé : une caractéristique ne s\'applique plus et est effacée · « Annuler » les rétablit';
const lmDe = e => e ? e.t + ('lm' in e.p ? ' lm ' + JSON.stringify(e.p.lm) : ' sans clé lm') : 'absent';
/* fiche ouverte : titre de l'en-tête, puces du lave-mains (valeur/libellé/pressée), champ du lave-mains juste après celui du Niveau, son
   texte (libellé, puce et aide), texte indicatif du champ Étiquette */
const ficheLm = p => p.evaluate(() => {
  const c = document.querySelector('.vc .vc-pcorps'); if (!c) return {tete: '', puces: '', apresNiv: false, aide: '', ph: null};
  const b = Array.from(c.querySelectorAll('button.vc-chip[data-a="prop"][data-k="lm"]')), ch = Array.from(c.querySelectorAll('.vc-champ'));
  const iNiv = ch.findIndex(x => x.querySelector('[data-k="niv"]')), iLm = ch.findIndex(x => x.querySelector('[data-k="lm"]')), et = c.querySelector('input[data-k="etiq"]');
  const t = c.querySelector('.vc-ftete strong');
  return {tete: t ? t.textContent : '', puces: b.map(x => x.dataset.v + '/' + x.textContent + '/' + x.getAttribute('aria-pressed')).join(' | '),
    apresNiv: iNiv >= 0 && iLm === iNiv + 1, aide: iLm >= 0 ? ch[iLm].textContent : '', ph: et ? et.getAttribute('placeholder') : null};
});

async function laveMains(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    const W = C.P('W', 'wc', cx, cy); W.lab = null;
    await C.injecter(p, {el: [W, C.P('La', 'lavabo', cx + 5, cy), C.P('W2', 'wc', cx - 5, cy, {lm: 'oui'})]});
    await C.regler(p, cx, cy, 40);
    await choisir(p, 'W');
    let f = await ficheLm(p);
    R.ok(f.tete === 'WC' && f.puces === 'oui/+ lave-mains/false' && f.apresNiv && f.aide.indexOf(AIDE_LM) >= 0 && f.ph === 'pas d\'étiquette automatique',
      'l6 fiche du WC : en-tête « WC », puce « + lave-mains » non pressée, juste après le Niveau, aide « ' + AIDE_LM + ' » (obtenu ' + JSON.stringify(f) + ')');

    /* toucher : lm 'oui' en un pas, l'en-tête et l'étiquette disent le lave-mains, l'étiquette est posée sur le plan */
    let u = await nUndo(p), ok = await toucherPuce(p, 'lm', 'oui'), e = await elDoc(p, 'W'), u1 = await nUndo(p);
    f = await ficheLm(p);
    const tx = await textesEcran(p);
    R.ok(ok && e.p.lm === 'oui' && u1 === u + 1 && f.puces === 'oui/+ lave-mains/true' && f.tete === LM && f.ph === LM,
      'l6 « + lave-mains » : lm « oui » en un pas, puce pressée, en-tête et texte indicatif de l\'étiquette « ' + LM + ' » (' + (ok ? '' : 'puce absente, ') + lmDe(e)
      + ', pas ' + (u1 - u) + ', ' + JSON.stringify(f) + ')');
    R.ok(!!(e && e.lab && !e.lab.off) && tx.indexOf(LM) >= 0, 'l6 étiquette « ' + LM + ' » posée et dessinée à l\'écran (lab ' + JSON.stringify(e && e.lab) + ', textes '
      + JSON.stringify(tx.filter(t => /WC|lave/.test(t))) + ')');

    /* second toucher : la clé lm est retirée, jamais une valeur vide écrite ; « Annuler » la rend */
    ok = await toucherPuce(p, 'lm', 'oui'); e = await elDoc(p, 'W'); const u2 = await nUndo(p); f = await ficheLm(p);
    R.ok(ok && !('lm' in e.p) && u2 === u1 + 1 && f.puces === 'oui/+ lave-mains/false' && f.tete === 'WC',
      'l6 second toucher : clé lm retirée en un pas, puce relâchée, en-tête « WC » (' + lmDe(e) + ', pas ' + (u2 - u1) + ', ' + JSON.stringify(f) + ')');
    await annuler(p); e = await elDoc(p, 'W');
    R.ok(e.p.lm === 'oui', 'l6 « Annuler » rend le lave-mains (' + lmDe(e) + ')');

    /* lavabo : pas de puce */
    await choisir(p, 'La'); f = await ficheLm(p);
    R.ok(f.tete === 'Lavabo' && !f.puces && f.aide === '', 'l6 fiche du lavabo : ni puce « + lave-mains » ni aide (obtenu ' + JSON.stringify(f) + ')');

    /* WC + lave-mains → Lavabo par le sélecteur Type : lm effacé, avec le toast d'aujourd'hui ; « Annuler » rend le WC + lave-mains */
    await choisir(p, 'W2'); f = await ficheLm(p); await effacerToast(p);
    const s = await p.$('.vc .vc-pcorps select[data-a="type"]');
    if (!s){ R.ok(false, 'l6 choix du type absent de la fiche du WC'); return; }
    await s.selectOption('lavabo'); await C.pause(p, 300);
    const msg = await toastVu(p); e = await elDoc(p, 'W2');
    R.ok(f.tete === LM && f.puces === 'oui/+ lave-mains/true' && e.t === 'lavabo' && !('lm' in e.p) && msg === TOAST_TYPE,
      'l6 WC + lave-mains → Lavabo par le sélecteur Type : clé lm effacée, toast « ' + TOAST_TYPE + ' » (fiche avant ' + JSON.stringify(f) + ' ; ' + lmDe(e) + ', toast ' + JSON.stringify(msg) + ')');
    await annuler(p); e = await elDoc(p, 'W2'); await choisir(p, 'W2'); f = await ficheLm(p);
    R.ok(e.t === 'wc' && e.p.lm === 'oui' && f.tete === LM && f.puces === 'oui/+ lave-mains/true', 'l6 « Annuler » rend le WC + lave-mains (' + lmDe(e) + ', ' + JSON.stringify(f) + ')');
    erreurs(A, 'l6');
  } finally { await A.fermer(); }
}

/* m133 : autres appareils, palette et fiche (souhait 7 ; D2, D7) */
const FICHE = '.vc .vc-panneau:not([hidden]) .vc-pcorps ';
const TOAST_LAV = 'Lavabo : se dessine en Lavabo, compté Évier ; le lave-mains d\'un WC est sa puce « + lave-mains ».';
const TOAST_DOU = 'Douche italienne : posez une Douche, comptée en Salle de bain.';
const TOAST_PUI = 'Pour un puits, posez l\'objet Puits (EP non conformes) ; pour un puits perdu, un Puisard.';
const SUGG_EU = ['Bidet', 'Urinoir', 'Ballon d\'eau chaude', 'Fontaine', 'Climatisation (condensats)', 'Adoucisseur', 'Piscine (vidange)'];
const SUGG_EP = ['Évacuation de balcon', 'Avaloir de terrasse', 'Cour anglaise'];
const LIGNES_EU = 'wc/WC | lavelinge/Lave-linge | evier/Évier | sdb/Salle de bain | cuisine/Cuisine | siphon/Siphon de garage';
const LIGNES_EP = 'gout_av/Gouttière(s) avant | gout_ar/Gouttière(s) arrière | grilles/Grilles | siphon_sol/Siphon de sol';
/* fiche ouverte : en-tête, clé et libellé du premier champ, nom affiché et s'il a le focus, abréviation et son texte indicatif, puces des
   noms proposés, du réseau et de « Compté au constat » (valeur/libellé/pressée), bouton « Rejet au sol », dialogue ouvert */
const ficheAutre = p => p.evaluate(F => {
  const c = document.querySelector(F); if (!c) return null;
  const q = s => c.querySelector(s), ch = Array.from(c.querySelectorAll('.vc-champ')), nom = q('input[data-k="nom"]'), ab = q('input[data-k="ab"]'), t = q('.vc-ftete strong');
  const pu = s => Array.from(c.querySelectorAll('button.vc-chip' + s)).map(b => b.dataset.v + '/' + b.textContent + '/' + b.getAttribute('aria-pressed'));
  const k0 = ch.length ? ch[0].querySelector('[data-k]') : null, l0 = ch.length ? ch[0].querySelector('.vc-lab') : null;
  return {tete: t ? t.textContent : '', premier: k0 ? k0.dataset.k : '', lib0: l0 ? l0.textContent : '', nom: nom ? nom.value : null,
    focus: !!nom && document.activeElement === nom, ab: ab ? ab.value : null, abPh: ab ? ab.getAttribute('placeholder') : null,
    noms: pu('[data-a="autreNom"]'), nat: pu('[data-a="autreNat"]'), row: pu('[data-k="row"]'), rejet: !!q('button[data-a="rejetSol"]'),
    dialogue: !!document.querySelector('.vc .vc-modal')};
}, FICHE);
async function saisir(p, k, v){
  const i = await p.$(FICHE + 'input[data-k="' + k + '"]'); if (!i) return null;
  await i.fill(v); await i.evaluate(x => x.blur()); await C.pause(p, 300);
  return p.evaluate(s => { const i = document.querySelector(s); return i ? i.value : null; }, FICHE + 'input[data-k="' + k + '"]');
}
async function cliquer(p, s){ const b = await p.$(FICHE + s); if (!b) return false; await b.click(); await C.pause(p, 300); return true; }
/* objet posé par la palette pal, item it, au point (x, y) du plan : le nouvel élément, ou null */
async function poser(p, pal, it, x, y){
  if (await p.evaluate(k => window.__vcEd.etat.palette !== k, pal)){ await p.click('.vc .vc-o[data-pal="' + pal + '"]'); await C.pause(p, 200); }
  /* items : data-item=libellé (texte de l'item, sans les lettres du symbole ni le sous-titre) */
  const items = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pitem')).map(b => { const s = b.querySelector(':scope > span');
    return b.dataset.item + '=' + (s && s.firstChild ? s.firstChild.textContent.trim() : ''); }));
  const b = await p.$('.vc .vc-pitem[data-item="' + it + '"]'); if (!b) return {items, o: null};
  await b.click(); await C.pause(p, 200);
  const ids = (await C.docCroquis(p)).el.map(e => e.id);
  await C.toucherCv(p, await C.ecranCv(p, x, y), 600);
  const nv = (await C.docCroquis(p)).el.filter(e => ids.indexOf(e.id) < 0);
  return {items, o: nv.length === 1 ? nv[0] : null};
}
const texteEtq = (p, id) => p.evaluate(id => { const S = window.__vcEd.etat, e = S.doc.el.find(x => x.id === id); return e ? window.VCroquis.texteEtiquette(e, S.an) : null; }, id);
const brief = e => e ? JSON.stringify({t: e.t, nom: e.p.nom, ab: e.p.ab, row: e.p.row}) : 'absent';

async function autresAppareils(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy;
    /* venus d'un fichier : un nom refusé (« Lavabo », lu tel quel) et un nom déjà employé (« Bidet suspendu ») */
    await C.injecter(p, {el: [C.P('F1', 'autre_eu', cx - 5, cy - 4, {meth: [], niv: '', nom: 'Lavabo', ab: '', row: ''}),
      C.P('F2', 'autre_eu', cx + 5, cy - 4, {meth: [], niv: '', nom: 'Bidet suspendu', ab: '', row: ''})]});
    await C.regler(p, cx, cy, 40);

    /* palette Appareils EU : « Autre appareil » en dernier ; pose au toucher : fiche ouverte sur le nom, sans dialogue ni clavier d'office */
    const u0 = await nUndo(p), r = await poser(p, 'eu', 'pt:autre_eu', cx, cy), o = r.o;
    R.ok(r.items[r.items.length - 1] === 'pt:autre_eu=Autre appareil', 'e2 palette Appareils EU : « Autre appareil » en dernier (' + r.items.join(', ') + ')');
    if (!o){ R.ok(false, 'e2 « Autre appareil » posé au toucher (' + (r.items.indexOf('pt:autre_eu=Autre appareil') < 0 ? 'outil absent de la palette' : 'aucun objet posé') + ')'); erreurs(A, 'e2'); return; }
    let f = await ficheAutre(p);
    R.ok(o.t === 'autre_eu' && o.p.nom === '' && await nUndo(p) === u0 + 1 && !!f && f.tete === 'Autre appareil' && f.premier === 'nom' && /^Nom\b/.test(f.lib0)
      && f.nom === '' && !f.focus && !f.dialogue, 'e2 pose : un autre appareil sans nom, en un pas ; fiche « Autre appareil » ouverte, le champ Nom en tête, vide, '
      + 'sans focus ni dialogue (' + brief(o) + ', ' + JSON.stringify(f && {tete: f.tete, premier: f.premier, lib0: f.lib0, nom: f.nom, focus: f.focus, dialogue: f.dialogue}) + ')');
    const nomsAttendus = SUGG_EU.concat(['Bidet suspendu']).map(x => x + '/' + x + '/false').join(' | ');
    R.ok(f.noms.join(' | ') === nomsAttendus, 'e2 noms proposés : ceux du cadrage, puis « Bidet suspendu », déjà employé ; pas « Lavabo », nom refusé venu d\'un fichier ('
      + f.noms.join(' | ') + ')');
    R.ok(f.nat.join(' | ') === 'autre_eu/EU/true | autre_ep/EP/false' && f.row.join(' | ') === '/Autres : Autre appareil/true | ' + LIGNES_EU.split(' | ').map(x => x + '/false').join(' | ')
      && f.abPh === '?', 'e2 puces EU | EP, « Compté au constat » : « Autres : Autre appareil » pressée, puis les lignes EU du formulaire ; texte indicatif de '
      + 'l\'abréviation « ? » (' + JSON.stringify({nat: f.nat, row: f.row, abPh: f.abPh}) + ')');

    /* puce « Bidet » : nom, en-tête, étiquette dessinée, « Autres : Bidet », texte indicatif de l'abréviation « Bi » ; second toucher : rien */
    let u = await nUndo(p), ok = await cliquer(p, 'button.vc-chip[data-a="autreNom"][data-v="Bidet"]'), e = await elDoc(p, o.id), u1 = await nUndo(p);
    f = await ficheAutre(p);
    const etq = await texteEtq(p, o.id), tx = await textesEcran(p);
    R.ok(ok && e.p.nom === 'Bidet' && u1 === u + 1 && f.tete === 'Bidet' && f.nom === 'Bidet' && f.noms[0] === 'Bidet/Bidet/true' && f.row[0] === '/Autres : Bidet/true'
      && f.abPh === 'Bi', 'e2 puce « Bidet » : nom écrit en un pas, en-tête « Bidet », puce pressée, « Autres : Bidet », texte indicatif « Bi » (' + brief(e)
      + ', pas ' + (u1 - u) + ', ' + JSON.stringify({tete: f.tete, nom: f.nom, nom0: f.noms[0], row0: f.row[0], abPh: f.abPh}) + ')');
    R.ok(etq === 'Bidet' && !!(e.lab && !e.lab.off) && tx.indexOf('Bidet') >= 0, 'e2 étiquette « Bidet », posée et dessinée à l\'écran (texte ' + JSON.stringify(etq)
      + ', lab ' + JSON.stringify(e.lab) + ', textes ' + JSON.stringify(tx.filter(t => /idet|utre/.test(t))) + ')');
    ok = await cliquer(p, 'button.vc-chip[data-a="autreNom"][data-v="Bidet"]'); e = await elDoc(p, o.id); f = await ficheAutre(p);
    R.ok(ok && e.p.nom === 'Bidet' && await nUndo(p) === u1 && f.noms[0] === 'Bidet/Bidet/true', 'e2 second toucher sur « Bidet » : la puce reste pressée, aucun pas ('
      + brief(e) + ', ' + f.noms[0] + ')');

    /* noms refusés au clavier : toast qui nomme l'objet à poser, nom rendu, aucun pas */
    for (const [nm, msg] of [['Lavabo', TOAST_LAV], ['Douche italienne', TOAST_DOU], ['Puits perdu', TOAST_PUI]]){
      await effacerToast(p); u = await nUndo(p);
      const val = await saisir(p, 'nom', nm), t = await toastVu(p); e = await elDoc(p, o.id);
      R.ok(t === msg && val === 'Bidet' && e.p.nom === 'Bidet' && await nUndo(p) === u, 'e2 nom « ' + nm + ' » refusé : toast « ' + msg + ' », nom « Bidet » rendu, aucun pas (toast '
        + JSON.stringify(t) + ', champ ' + JSON.stringify(val) + ', ' + brief(e) + ')');
    }

    /* abréviation « BD » : un pas, symbole « BD » ; illisible au PDF : refusée */
    u = await nUndo(p); let vAb = await saisir(p, 'ab', 'BD'); e = await elDoc(p, o.id);
    let abO = await p.evaluate(id => window.VCroquis.abObj(window.__vcEd.etat.doc.el.find(x => x.id === id)), o.id);
    R.ok(vAb === 'BD' && e.p.ab === 'BD' && abO === 'BD' && await nUndo(p) === u + 1, 'e2 abréviation « BD » en un pas, lettres du symbole « BD » (' + brief(e) + ', abObj ' + JSON.stringify(abO) + ')');
    await effacerToast(p); u = await nUndo(p); vAb = await saisir(p, 'ab', 'Ω'); e = await elDoc(p, o.id); let t = await toastVu(p);
    R.ok(vAb === 'BD' && e.p.ab === 'BD' && !!t && await nUndo(p) === u, 'e2 abréviation « Ω », illisible au PDF : refusée avec un toast, « BD » rendue (' + brief(e) + ', toast ' + JSON.stringify(t) + ')');

    /* « Compté au constat » : WC ; second toucher : la puce reste pressée ; le constat déduit le compte en WC */
    u = await nUndo(p); ok = await cliquer(p, 'button.vc-chip[data-k="row"][data-v="wc"]'); e = await elDoc(p, o.id); u1 = await nUndo(p); f = await ficheAutre(p);
    const lig = await p.evaluate(id => { const S = window.__vcEd.etat, r = window.VCroquis.constatDeduit(S.doc, S.an).rows;
      return {wc: (r.find(x => x.id === 'wc') || {objets: []}).objets.indexOf(id) >= 0, autres: r.filter(x => !x.std && x.objets.indexOf(id) >= 0).map(x => x.label)}; }, o.id);
    R.ok(ok && e.p.row === 'wc' && u1 === u + 1 && f.row.join(' | ') === '/Autres : Bidet/false | ' + LIGNES_EU.split(' | ').map(x => x + '/' + (x.split('/')[0] === 'wc')).join(' | ')
      && lig.wc && !lig.autres.length, 'e2 « Compté au constat » WC : row « wc » en un pas, puce pressée, le bidet compté en WC (' + brief(e) + ', pas ' + (u1 - u) + ', '
      + f.row.join(' | ') + ', ' + JSON.stringify(lig) + ')');
    ok = await cliquer(p, 'button.vc-chip[data-k="row"][data-v="wc"]'); e = await elDoc(p, o.id); f = await ficheAutre(p);
    R.ok(ok && e.p.row === 'wc' && await nUndo(p) === u1 && f.row[1] === 'wc/WC/true', 'e2 second toucher sur « WC » : la puce reste pressée, aucun pas (' + brief(e) + ', ' + f.row[1] + ')');

    /* EU → EP par les puces : un pas, nom et abréviation gardés, row vidé, compté dans le toast ; « Annuler » rend l'appareil EU compté en WC */
    await effacerToast(p); u = await nUndo(p);
    ok = await cliquer(p, 'button.vc-chip[data-a="autreNat"][data-v="autre_ep"]'); t = await toastVu(p); e = await elDoc(p, o.id); f = await ficheAutre(p);
    R.ok(ok && e.t === 'autre_ep' && e.p.nom === 'Bidet' && e.p.ab === 'BD' && e.p.row === '' && t === TOAST_TYPE && await nUndo(p) === u + 1
      && f.nat.join(' | ') === 'autre_eu/EU/false | autre_ep/EP/true' && f.row.join(' | ') === '/Autres : Bidet/true | ' + LIGNES_EP.split(' | ').map(x => x + '/false').join(' | ')
      && f.noms.join(' | ') === SUGG_EP.map(x => x + '/' + x + '/false').join(' | '), 'e2 EU → EP : un pas, nom et abréviation gardés, row vidé, toast « ' + TOAST_TYPE + ' » ; puces EP '
      + '(' + brief(e) + ', toast ' + JSON.stringify(t) + ', ' + JSON.stringify({nat: f.nat, row: f.row, noms: f.noms}) + ')');
    await annuler(p); e = await elDoc(p, o.id);
    R.ok(e.t === 'autre_eu' && e.p.row === 'wc' && e.p.nom === 'Bidet', 'e2 « Annuler » rend l\'appareil EU compté en WC (' + brief(e) + ')');

    /* nom refusé venu d'un fichier : lu tel quel (en-tête, étiquette) ; refusé dès qu'on le retouche */
    await choisir(p, 'F1'); f = await ficheAutre(p); const etq1 = await texteEtq(p, 'F1');
    await effacerToast(p); u = await nUndo(p); const val1 = await saisir(p, 'nom', 'Vasque'); t = await toastVu(p); e = await elDoc(p, 'F1');
    R.ok(f.tete === 'Lavabo' && f.nom === 'Lavabo' && etq1 === 'Lavabo' && e.p.nom === 'Lavabo' && val1 === 'Lavabo' && /^Vasque : se dessine en Lavabo, compté Évier/.test(t)
      && await nUndo(p) === u, 'e2 « Lavabo » venu d\'un fichier : lu tel quel (en-tête, champ, étiquette) ; « Vasque » saisi : refusé avec un toast, « Lavabo » rendu ('
      + JSON.stringify({tete: f.tete, nom: f.nom, etq: etq1, champ: val1, toast: t}) + ')');

    /* palette Ouvrages EP : « Autre ouvrage EP » en dernier ; seul, sa fiche propose « Rejet au sol » ; un nom saisi est proposé au suivant */
    const r2 = await poser(p, 'ep', 'pt:autre_ep', cx, cy + 4), o2 = r2.o;
    f = o2 ? await ficheAutre(p) : null;
    R.ok(r2.items[r2.items.length - 1] === 'pt:autre_ep=Autre ouvrage EP' && !!o2 && o2.t === 'autre_ep' && !!f && f.tete === 'Autre ouvrage EP' && f.premier === 'nom' && f.rejet
      && f.noms.join(' | ') === SUGG_EP.map(x => x + '/' + x + '/false').join(' | '), 'e2 « Autre ouvrage EP », en dernier des Ouvrages EP, posé seul : fiche sur le nom, '
      + 'puces EP, bouton « Rejet au sol » (' + r2.items.join(', ') + ' ; ' + brief(o2) + ', ' + JSON.stringify(f && {tete: f.tete, premier: f.premier, rejet: f.rejet, noms: f.noms}) + ')');
    if (o2){
      const val2 = await saisir(p, 'nom', 'Rigole'); e = await elDoc(p, o2.id);
      const r3 = await poser(p, 'ep', 'pt:autre_ep', cx - 4, cy + 4); f = r3.o ? await ficheAutre(p) : null;
      R.ok(val2 === 'Rigole' && e.p.nom === 'Rigole' && !!f && f.noms.join(' | ') === SUGG_EP.concat(['Rigole']).map(x => x + '/' + x + '/false').join(' | '),
        'e2 « Rigole » saisi, puis un autre ouvrage EP posé : « Rigole » proposé après ceux du cadrage, « Bidet » (EU) non (' + brief(e) + ', ' + JSON.stringify(f && f.noms) + ')');
    }
    erreurs(A, 'e2');
  } finally { await A.fermer(); }
}

/* textes du plan PDF de l'état des lieux, par la sortie de l'éditeur (bouton « Plan de l'état des lieux ») : appels de la bibliothèque PDF
   captés, sans le liseré blanc écrit sous chaque étiquette ; le fichier est gardé par le crochet des tests (window.__fichiers) */
async function textesPdf(p){
  const n = await p.evaluate(() => {
    if (!window.__pdfPris){ window.__pdfPris = true; const J0 = window.jspdf.jsPDF;
      const W = function(){ const d = new J0(...arguments), ot = d.text;
        d.text = function(t, x, y, o){ try { if (!(o && o.renderingMode === 'stroke')) window.__txtPdf.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
      W.API = J0.API; window.jspdf.jsPDF = W; }
    window.__txtPdf = []; const n = window.__fichiers.length; window.__vcEd.sortie('pdfEdl'); return n;
  });
  await p.waitForFunction(n => window.__fichiers.length > n, n, {timeout: 15000});
  return p.evaluate(() => ({textes: window.__txtPdf.slice(), fichier: window.__fichiers[window.__fichiers.length - 1].nom}));
}

/* m134 : étiquette commune (souhait 8 ; D6) dans l'éditeur : textes du canevas et du plan PDF, sélecteur Type */
async function etiquetteCommune(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, N1 = {niv: 'etage', etage: '1'}, ouvert = o => { o.lab = null; return o; };
    await C.injecter(p, {el: [ouvert(C.P('D', 'douche', cx - 4, cy, Object.assign({etiqTitre: 'sdb'}, N1))),
      ouvert(C.P('L', 'lavabo', cx, cy, Object.assign({etiqAvec: 'D'}, N1))), ouvert(C.P('W', 'wc', cx + 4, cy, Object.assign({lm: 'oui', etiqAvec: 'D'}, N1))),
      ouvert(C.P('E', 'evier', cx, cy + 6, {niv: 'rdc', etiqAvec: '', etiqTitre: ''}))]});
    await C.regler(p, cx, cy, 40);
    const T1 = 'Salle de bain (1er étage)', PROPRES = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)', 'Évier (1er étage)', 'Baignoire (1er étage)'];
    /* textes du canevas ou du plan PDF : titre et liste une fois chacun, aucune étiquette propre d'un membre, témoin à part */
    const compte = (tx, l2) => ({t1: tx.filter(t => t === T1).length, t2: tx.filter(t => t === l2).length, propres: tx.filter(t => PROPRES.indexOf(t) >= 0),
      temoin: tx.filter(t => /^(Évier|Lavabo) \(RDC\)$/.test(t)), tx: tx.filter(t => /bain|ouche|avabo|WC|vier|aignoire/.test(t))});
    const vu = async l2 => compte(await textesEcran(p), l2);
    const bien = (r, temoin) => r.t1 === 1 && r.t2 === 1 && !r.propres.length && r.temoin.join() === temoin;
    let r = await vu('douche, lavabo, WC + lave-mains');
    R.ok(bien(r, 'Évier (RDC)'), 'c8 douche porteur (titre « sdb »), lavabo et WC + lave-mains liés, au 1er : à l\'écran « ' + T1 + ' » puis « douche, lavabo, WC + lave-mains », '
      + 'une fois chacune, aucune étiquette propre ; témoin « Évier (RDC) » (obtenu ' + JSON.stringify(r) + ')');
    /* plan PDF de l'état des lieux, par la sortie de l'éditeur : de même (la légende et le tableau de la page 2 nomment chaque appareil,
       sans niveau) */
    const pd = await textesPdf(p); r = compte(pd.textes, 'douche, lavabo, WC + lave-mains');
    R.ok(/\.pdf$/.test(pd.fichier) && bien(r, 'Évier (RDC)'), 'c8 plan PDF de l\'état des lieux (sortie de l\'éditeur) : « ' + T1 + ' » puis « douche, lavabo, WC + lave-mains », '
      + 'une fois chacune, aucune étiquette propre ; témoin « Évier (RDC) » (fichier ' + JSON.stringify(pd.fichier) + ' ; obtenu ' + JSON.stringify(r) + ')');

    /* membre changé de type : le lien reste, aucun toast, un pas ; le texte commun suit */
    const typeVers = async (id, v) => { await choisir(p, id); await effacerToast(p); const s = await p.$('.vc .vc-pcorps select[data-a="type"]'); if (!s) return false;
      await s.selectOption(v); await C.pause(p, 300); return true; };
    let u = await nUndo(p), ok = await typeVers('L', 'evier'), msg = await toastVu(p), e = await elDoc(p, 'L'), u1 = await nUndo(p);
    r = await vu('douche, évier, WC + lave-mains');
    R.ok(ok && e.t === 'evier' && e.p.etiqAvec === 'D' && !('etiqTitre' in e.p) && !msg && u1 === u + 1 && bien(r, 'Évier (RDC)'),
      'c8 membre Lavabo → Évier par le sélecteur Type : lien gardé, aucun toast, un pas ; à l\'écran « douche, évier, WC + lave-mains » ('
      + (ok ? '' : 'sélecteur absent, ') + JSON.stringify({t: e.t, p: e.p, toast: msg, pas: u1 - u}) + ' ; ' + JSON.stringify(r) + ')');
    await annuler(p); e = await elDoc(p, 'L');
    R.ok(e.t === 'lavabo' && e.p.etiqAvec === 'D', 'c8 « Annuler » rend le lavabo lié à la douche (' + JSON.stringify({t: e.t, etiqAvec: e.p.etiqAvec}) + ')');

    /* porteur changé de type : le titre reste */
    ok = await typeVers('D', 'baignoire'); msg = await toastVu(p); e = await elDoc(p, 'D');
    r = await vu('baignoire, lavabo, WC + lave-mains');
    R.ok(ok && e.t === 'baignoire' && e.p.etiqTitre === 'sdb' && !('etiqAvec' in e.p) && !msg && bien(r, 'Évier (RDC)'),
      'c8 porteur Douche → Baignoire : titre gardé, aucun toast ; à l\'écran « ' + T1 + ' » puis « baignoire, lavabo, WC + lave-mains » ('
      + JSON.stringify({t: e.t, p: e.p, toast: msg}) + ' ; ' + JSON.stringify(r) + ')');

    /* témoin aux champs vides (fichier fait à la main) : aucune clé vide écrite */
    ok = await typeVers('E', 'lavabo'); msg = await toastVu(p); e = await elDoc(p, 'E'); r = await vu('baignoire, lavabo, WC + lave-mains');
    R.ok(ok && e.t === 'lavabo' && !('etiqAvec' in e.p) && !('etiqTitre' in e.p) && !msg && bien(r, 'Lavabo (RDC)'),
      'c8 témoin Évier (lien et titre vides) → Lavabo : ni etiqAvec ni etiqTitre écrits, aucun toast, « Lavabo (RDC) » à l\'écran ('
      + JSON.stringify({t: e.t, p: e.p, toast: msg}) + ' ; ' + JSON.stringify(r.temoin) + ')');
    erreurs(A, 'c8');
  } finally { await A.fermer(); }
}

/* m135 : étiquette commune, 2e partie (souhait 8 ; D6 et D7) : mode « Réunir », fiches du porteur et d'un membre, suppression */
/* texte du bandeau, ses éléments (texte, boutons) séparés d'une espace, comme à l'écran */
const bandeau = p => p.evaluate(() => { const a = document.querySelector('.vc .vc-aide'); return a && !a.hidden ? Array.from(a.childNodes).map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim() : ''; });
const modeReunir = p => p.evaluate(() => { const r = window.__vcEd.etat.reunir; return r ? {porteur: r.porteur, ids: r.ids.slice().sort()} : null; });
const ficheTxt = p => p.evaluate(() => { const c = document.querySelector('.vc .vc-panneau:not([hidden]) .vc-pcorps'); return c ? c.textContent.replace(/\s+/g, ' ') : ''; });
const ficheDe = p => p.evaluate(() => { const n = document.querySelector('.vc .vc-panneau'); return n && !n.hidden ? n.dataset.id || '' : ''; });
/* bouton de la page (bandeau, fiche), puis une pause plus longue que la garde d'un toucher qui suit un clic (S.clicHors : 600 ms) */
async function bouton(p, s){ const b = await p.$(s); if (!b) return false; await b.click(); await C.pause(p, 700); return true; }
/* halos du dessin suivant : cercle (arc) suivi d'un trait d'épaisseur 3, orange pour le porteur, couleur de l'éditeur pour un appareil
   choisi ; chacun rapporté à l'objet dont le centre est à 2 px près (« ? » sinon) */
async function halos(p, ids){
  await p.evaluate(() => {
    const P = CanvasRenderingContext2D.prototype;
    if (!window.__halosPris){ window.__halosPris = true; const a = P.arc, s = P.stroke;
      P.arc = function(x, y, r){ if (window.__traits) window.__traits.push({k: 'arc', x, y, r}); return a.apply(this, arguments); };
      P.stroke = function(){ if (window.__traits) window.__traits.push({k: 'stroke', c: String(this.strokeStyle), w: this.lineWidth}); return s.apply(this, arguments); }; }
    window.__traits = []; window.__vcEd.redessiner();
  });
  await C.pause(p, 300);
  const tr = await p.evaluate(() => { const t = window.__traits || []; window.__traits = null; return t; }), pos = {}, vus = [];
  for (const id of ids){ const e = await elDoc(p, id); if (e) pos[id] = await C.ecranCv(p, e.x, e.y); }
  tr.forEach((t, i) => {
    if (t.k !== 'arc') return;
    const s = tr[i + 1];
    if (!s || s.k !== 'stroke' || s.w !== 3 || (s.c !== '#d4650a' && s.c !== '#0f5c63')) return;
    const id = ids.find(k => pos[k] && Math.hypot(pos[k].x - t.x, pos[k].y - t.y) < 2);
    vus.push((id || '?') + ':' + (s.c === '#d4650a' ? 'porteur' : 'choisi'));
  });
  return vus.sort().join(' ');
}
const lie = e => e ? (e.p && 'etiqAvec' in e.p ? e.p.etiqAvec : 'sans clé') : 'absent';
const place = e => !!e && !!e.lab && typeof e.lab.dx === 'number' && !e.lab.off;
async function etiquetteReunie(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, N1 = {niv: 'etage', etage: '1'}, ouvert = o => { o.lab = null; return o; };
    const n1 = q => Object.assign({}, N1, q || {});
    /* D : porteur, au lien vers lui-même (M4) ; L, W à 1,5 m ; F à 3,8 m ; G source EP ; J « Projet » (hors de l'état des lieux) ;
       S « À supprimer » (autre statut) ; X porteur d'un autre groupe, Y son membre */
    await C.injecter(p, {el: [ouvert(C.P('D', 'douche', cx - 1.5, cy, n1({etiqAvec: 'D'}))), ouvert(C.P('L', 'lavabo', cx, cy, n1())),
      ouvert(C.P('W', 'wc', cx - 1.5, cy + 1.5, n1({lm: 'oui'}))), ouvert(C.P('F', 'lavelinge', cx + 2, cy + 1.5, n1())),
      C.P('G', 'descente', cx, cy - 2, {cote: 'avant', visitable: 'oui'}), C.P('J', 'lavabo', cx - 1.5, cy - 2, n1({st: 'projet'})),
      C.P('S', 'lavabo', cx + 1.5, cy - 2, n1({st: 'supprimer'})), C.P('X', 'douche', cx + 3.5, cy - 2, n1()), C.P('Y', 'wc', cx + 3.5, cy - 0.5, n1({etiqAvec: 'X'}))]});
    await C.regler(p, cx, cy, 40);
    const IDS = ['D', 'L', 'W', 'F', 'G', 'J', 'S', 'X', 'Y'], T1 = 'Salle de bain (1er étage)', L2 = 'douche, lavabo, WC + lave-mains';
    const PROPRES = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)'];
    const touche = async (id, ms) => { const e = await elDoc(p, id); await C.toucher(p, e.x, e.y, ms); };
    /* textes du canevas : titre et liste du groupe, étiquettes propres de D, L et W */
    const vu = async l2 => { const tx = await textesEcran(p); return {t1: tx.filter(t => t === T1).length, t2: tx.filter(t => t === (l2 || L2)).length, propres: PROPRES.map(x => tx.filter(t => t === x).length).join('')}; };
    const groupeVu = r => r.t1 === 1 && r.t2 === 1 && r.propres === '000';

    /* fiche de la douche seule : bouton « Étiquette commune… » */
    await choisir(p, 'D');
    const bt = await p.$(FICHE + 'button[data-a="etiqReunir"]'), btTxt = bt ? (await bt.textContent()).trim() : '';
    R.ok(btTxt === 'Étiquette commune…', 'e3 fiche de la douche seule (lien vers elle-même) : bouton « Étiquette commune… » (obtenu ' + JSON.stringify(btTxt || 'absent') + ')');
    if (!bt){ erreurs(A, 'e3'); return; }
    await choisir(p, 'G'); const btG = !!await p.$(FICHE + 'button[data-a="etiqReunir"]');
    await choisir(p, 'J'); const btJ = !!await p.$(FICHE + 'button[data-a="etiqReunir"]');
    R.ok(!btG && btJ, 'e3 bouton absent de la fiche de la descente EP, présent sur celle du lavabo « Projet » (' + JSON.stringify({G: btG, J: btJ}) + ')');
    /* M7 de la relecture : le lavabo « Projet », absent de l'état des lieux, n'ouvre pas le mode ; un message dit où le réunir */
    await effacerToast(p); const uJ = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqReunir"]');
    const mJ = await modeReunir(p), msgJ = await toastVu(p), fJ = await ficheDe(p);
    R.ok(!mJ && msgJ === 'Appareil en projet : il ne figure pas sur l\'état des lieux ; réunissez-le sur l\'avant-projet' && await nUndo(p) === uJ && fJ === 'J',
      'e3 bouton du lavabo « Projet » sur l\'état des lieux : mode non ouvert, toast « … ; réunissez-le sur l\'avant-projet », rien d\'écrit, fiche gardée (M7 ; '
      + JSON.stringify({m: mJ, toast: msgJ, fiche: fJ}) + ')');

    /* mode « Réunir » : bandeau, panneau fermé, rien d'écrit */
    await choisir(p, 'D'); const u0 = await nUndo(p);
    await bouton(p, FICHE + 'button[data-a="etiqReunir"]');
    let m = await modeReunir(p), b = await bandeau(p), fd = await ficheDe(p);
    const btFin = await p.$('.vc .vc-aide button[data-a="reunirFin"]'), btStop = await p.$('.vc .vc-aide button[data-a="reunirStop"]');
    R.ok(m && m.porteur === 'D' && !m.ids.length && /^Touchez les appareils à réunir avec la Douche · 0 choisi\b/.test(b) && !!btFin && !!btStop && !fd,
      'e3 « Étiquette commune… » : mode ouvert pour la douche, bandeau « Touchez les appareils à réunir », « 0 choisi », « Terminé » et « Annuler », fiche fermée ('
      + JSON.stringify({m, b, fiche: fd}) + ')');

    /* touchers : le lavabo, puis (après un zoom) le WC ; halos ; rien d'écrit */
    await touche('L'); m = await modeReunir(p); b = await bandeau(p);
    R.ok(m && m.ids.join() === 'L' && /· 1 choisi\b/.test(b), 'e3 toucher sur le lavabo : choisi, « 1 choisi » (' + JSON.stringify({m, b}) + ')');
    const s0 = (await C.vue(p)).s; await p.click('.vc [data-a="zoomp"]'); await C.pause(p, 700);
    const s1 = (await C.vue(p)).s; m = await modeReunir(p);
    R.ok(s1 > s0 && m && m.ids.join() === 'L', 'e3 zoom pendant le mode : la vue grossit, le mode et le choix restent (' + JSON.stringify({s0, s1, m}) + ')');
    await touche('W'); m = await modeReunir(p); b = await bandeau(p);
    let h = await halos(p, IDS);
    R.ok(m && m.ids.join() === 'L,W' && /· 2 choisis\b/.test(b) && h === 'D:porteur L:choisi W:choisi', 'e3 toucher sur le WC (après le zoom) : « 2 choisis » ; halos du porteur et des deux choisis, '
      + 'seulement (' + JSON.stringify({m, b, halos: h}) + ')');
    let eL = await elDoc(p, 'L'), eW = await elDoc(p, 'W');
    R.ok(lie(eL) === 'sans clé' && lie(eW) === 'sans clé' && await nUndo(p) === u0, 'e3 avant « Terminé » : rien d\'écrit, aucun pas (' + JSON.stringify({L: lie(eL), W: lie(eW), pas: await nUndo(p) - u0}) + ')');

    /* double toucher sur le lave-linge, à 3,8 m : ajouté une fois, avec le toast ; un toucher de plus le retire */
    await effacerToast(p); let F = await elDoc(p, 'F'), qF = await C.ecranCv(p, F.x, F.y);
    await C.toucherCv(p, qF, 120); await C.toucherCv(p, qF, 500);
    m = await modeReunir(p); let msg = await toastVu(p);
    R.ok(m && m.ids.join() === 'F,L,W' && msg === 'Loin du porteur : le plan ne le désignera que par la liste.', 'e3 double toucher sur le lave-linge, à 3,8 m : ajouté une fois, toast « Loin du porteur : '
      + 'le plan ne le désignera que par la liste. » (' + JSON.stringify({m, toast: msg}) + ')');
    await touche('F'); m = await modeReunir(p);
    R.ok(m && m.ids.join() === 'L,W', 'e3 nouveau toucher sur le lave-linge : retiré (' + JSON.stringify(m) + ')');

    /* refus, dans l'ordre de D7 ; le porteur : rien */
    for (const [id, re, lib] of [['G', /^Étiquette commune : seuls les appareils des eaux usées/, 'descente EP'], ['J', /^Appareil en projet : il ne figure pas sur l'état des lieux/, 'lavabo « Projet »'],
      ['S', /^Statut différent de celui de la Douche/, 'lavabo « À supprimer »'], ['Y', /déjà réuni avec la Douche/, 'WC d\'un autre groupe'], ['X', /porte déjà une étiquette commune/, 'porteur d\'un autre groupe'], ['D', /^$/, 'porteur']]){
      await effacerToast(p); await touche(id); m = await modeReunir(p); msg = await toastVu(p);
      R.ok(m && m.ids.join() === 'L,W' && re.test(msg), 'e3 toucher sur ' + lib + ' : ' + (id === 'D' ? 'rien, aucun toast' : 'refusé, toast ' + re) + ' (' + JSON.stringify({m, toast: msg}) + ')');
    }

    /* « Terminé » : un pas, liens écrits, lien du porteur effacé (M4), une étiquette, toast du lavabo, fiche du porteur */
    await effacerToast(p); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    msg = await toastVu(p); m = await modeReunir(p); b = await bandeau(p); fd = await ficheDe(p);
    let eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); F = await elDoc(p, 'F');
    R.ok(await nUndo(p) === u0 + 1 && lie(eL) === 'D' && lie(eW) === 'D' && lie(eD) === 'sans clé' && lie(F) === 'sans clé' && !m && !/Touchez les appareils/.test(b) && fd === 'D',
      'e3 « Terminé » : un pas, lavabo et WC liés à la douche, lien de la douche vers elle-même effacé (M4), lave-linge sans lien, mode fermé, fiche de la douche ('
      + JSON.stringify({pas: await nUndo(p) - u0, D: lie(eD), L: lie(eL), W: lie(eW), F: lie(F), m, fiche: fd}) + ')');
    R.ok(msg === 'Lavabo et évier comptent à part (Évier) ; pour une seule installation, dessinez l\'objet Salle de bain ou Cuisine.', 'e3 « Terminé » : toast « Lavabo et évier comptent '
      + 'à part (Évier) ; pour une seule installation, dessinez l\'objet Salle de bain ou Cuisine. » (obtenu ' + JSON.stringify(msg) + ')');
    let r = await vu();
    R.ok(groupeVu(r), 'e3 à l\'écran : « ' + T1 + ' » puis « ' + L2 + ' », une fois chacune, aucune étiquette propre (' + JSON.stringify(r) + ')');

    /* « Annuler » rend les trois étiquettes ; « Rétablir » le groupe */
    await annuler(p); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(lie(eL) === 'sans clé' && lie(eW) === 'sans clé' && lie(eD) === 'D' && r.propres === '111' && !r.t1, 'e3 « Annuler » après « Terminé » : les trois étiquettes propres, liens retirés, '
      + 'celui de la douche rendu (' + JSON.stringify({D: lie(eD), L: lie(eL), W: lie(eW), r}) + ')');
    await p.evaluate(() => window.__vcEd.refaire()); await C.pause(p, 250);
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(lie(eL) === 'D' && lie(eW) === 'D' && lie(eD) === 'sans clé' && groupeVu(r), 'e3 « Rétablir » : le groupe revient (' + JSON.stringify({D: lie(eD), L: lie(eL), W: lie(eW), r}) + ')');

    /* fiche du porteur : titres, ce que compte le constat, texte indicatif sur une ligne (M3), boutons */
    await choisir(p, 'D');
    const titres = await p.evaluate(() => Array.from(document.querySelectorAll('.vc .vc-pcorps button.vc-chip[data-a="prop"][data-k="etiqTitre"]')).map(x => x.dataset.v + '/' + x.textContent + '/' + x.getAttribute('aria-pressed')).join(' | '));
    const ph = await p.evaluate(() => { const i = document.querySelector('.vc .vc-pcorps input[data-k="etiq"]'); return i ? i.placeholder : null; });
    let ft = await ficheTxt(p);
    const btMod = await p.$(FICHE + 'button[data-a="etiqModifier"]'), btDef = await p.$(FICHE + 'button[data-a="etiqDefaire"]');
    const TITRES = 'sdb/Salle de bain/false | eau/Salle d\'eau/false | cuisine/Cuisine/false | buanderie/Buanderie/false | aucun/Aucun/false';
    R.ok(titres === TITRES, 'e3 fiche du porteur : puces ' + TITRES + ' (obtenu ' + titres + ')');
    R.ok(ft.indexOf('Compté au constat : Salle de bain 1, Évier 1, WC 1') >= 0 && !!btMod && !!btDef && (await btMod.textContent()).trim() === 'Modifier le groupe' && (await btDef.textContent()).trim() === 'Défaire',
      'e3 fiche du porteur : « Compté au constat : Salle de bain 1, Évier 1, WC 1 », « Modifier le groupe » et « Défaire » (' + JSON.stringify(ft.slice(0, 600)) + ')');
    R.ok(ph === T1 + ' — ' + L2, 'e3 fiche du porteur : texte indicatif de l\'étiquette sur une ligne, « ' + T1 + ' — ' + L2 + ' » (M3 ; obtenu ' + JSON.stringify(ph) + ')');
    let u = await nUndo(p); await toucherPuce(p, 'etiqTitre', 'eau'); eD = await elDoc(p, 'D'); r = await vu();
    const eauVu = (await textesEcran(p)).filter(t => t === 'Salle d\'eau (1er étage)').length;
    R.ok(eD.p.etiqTitre === 'eau' && await nUndo(p) === u + 1 && eauVu === 1, 'e3 puce « Salle d\'eau » : etiqTitre « eau », un pas, « Salle d\'eau (1er étage) » à l\'écran ('
      + JSON.stringify({titre: eD.p.etiqTitre, pas: await nUndo(p) - u, vu: eauVu}) + ')');
    await toucherPuce(p, 'etiqTitre', 'eau'); eD = await elDoc(p, 'D'); r = await vu();
    R.ok(!('etiqTitre' in eD.p) && groupeVu(r), 'e3 second toucher sur « Salle d\'eau » : clé etiqTitre retirée, titre d\'office (' + JSON.stringify({p: eD.p, r}) + ')');

    /* M6 : niveau d'un membre changé, étiquette du porteur posée d'office : replacée ; déplacée à la main : gardée */
    const poserLab = main => p.evaluate(main => { const S = window.__vcEd.etat, d = S.doc.el.find(e => e.id === 'D'), E = S.doc.echelle > 0 ? S.doc.echelle : window.VCroquis.echelleAuto(S.doc, 'edl');
      d.lab = Object.assign({dx: 9.75, dy: -9.25, E}, main ? {main: true} : {}); window.__vcEd.redessiner(); }, main);
    for (const main of [false, true]){
      await poserLab(main); await choisir(p, 'L'); u = await nUndo(p);
      const ok = await toucherPuce(p, 'niv', 'rdc'); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L');
      const garde = eD.lab && eD.lab.dx === 9.75 && eD.lab.dy === -9.25;
      R.ok(ok && eL.p.niv === 'rdc' && await nUndo(p) === u + 1 && (main ? garde && eD.lab.main === true : !garde && place(eD)), 'e3 M6 : niveau du lavabo (membre) changé, étiquette du porteur '
        + (main ? 'déplacée à la main : gardée' : 'posée d\'office : replacée') + ' (' + JSON.stringify({niv: eL.p.niv, lab: eD.lab, pas: await nUndo(p) - u}) + ')');
      await annuler(p);
    }
    await p.evaluate(() => { window.__vcEd.etat.doc.el.find(e => e.id === 'D').lab = null; window.__vcEd.redessiner(); });

    /* fiche d'un membre : champ et puces grisés, « Voir » */
    await choisir(p, 'L'); ft = await ficheTxt(p);
    const gris = await p.evaluate(() => { const c = document.querySelector('.vc .vc-pcorps'), q = s => c.querySelector(s);
      return {champ: !!q('input[data-k="etiq"]') && q('input[data-k="etiq"]').disabled, onOff: !!q('button[data-a="etiqOnOff"]') && q('button[data-a="etiqOnOff"]').disabled,
        replacer: !!q('button[data-a="etiqReplacer"]') && q('button[data-a="etiqReplacer"]').disabled, voir: !!q('button[data-a="voir"][data-id="D"]'), separer: !!q('button[data-a="etiqSeparer"]')}; });
    R.ok(ft.indexOf('Étiquette réunie avec la Douche') >= 0 && gris.champ && gris.onOff && gris.replacer && gris.voir && gris.separer, 'e3 fiche du lavabo (membre) : « Étiquette réunie avec la Douche », '
      + 'champ Étiquette, « Affichée » et « Replacer » grisés, « Voir » et « Séparer » (' + JSON.stringify(gris) + ')');
    await C.regler(p, cx + 9, cy + 6); await bouton(p, FICHE + 'button[data-a="voir"][data-id="D"]');
    eD = await elDoc(p, 'D'); let vv = await C.vue(p), sel = await p.evaluate(() => window.__vcEd.etat.sel && window.__vcEd.etat.sel.id);
    R.ok(sel === 'D' && Math.abs(vv.cx - eD.x) < 0.5 && Math.abs(vv.cy - eD.y) < 0.5, 'e3 « Voir » : la douche choisie, la vue centrée sur elle (' + JSON.stringify({sel, cx: vv.cx - eD.x, cy: vv.cy - eD.y}) + ')');
    await C.regler(p, cx, cy, 40);

    /* « Séparer » ; puis de même après « Replacer toutes les étiquettes » (étiquette du membre vide) */
    for (const apres of [false, true]){
      if (apres){ await p.evaluate(() => window.__vcEd.ouvrirPanneau('reglages')); await C.pause(p, 300); await cliquer(p, 'button[data-a="replacerTout"]'); }
      eL = await elDoc(p, 'L'); const lab0 = eL.lab;
      await choisir(p, 'L'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqSeparer"]');
      eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu('douche, WC + lave-mains');
      R.ok(await nUndo(p) === u + 1 && lie(eL) === 'sans clé' && lie(eW) === 'D' && place(eL) && r.t1 === 1 && r.t2 === 1 && r.propres === '010', 'e3 « Séparer » le lavabo'
        + (apres ? ' après « Replacer toutes les étiquettes » (étiquette vide : ' + JSON.stringify(lab0) + ')' : '') + ' : un pas, lien retiré, son étiquette posée et affichée ; le groupe garde '
        + 'la douche et le WC (' + JSON.stringify({pas: await nUndo(p) - u, L: lie(eL), lab: eL.lab, W: lie(eW), r}) + ')');
      await annuler(p);
    }
    eL = await elDoc(p, 'L'); R.ok(lie(eL) === 'D', 'e3 « Annuler » après « Séparer » : le lavabo de nouveau lié (' + lie(eL) + ')');

    /* porteur supprimé : liens des membres retirés dans le même pas, leurs étiquettes posées ; « Annuler » rend le tout */
    await choisir(p, 'D'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="supprimer"]');
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(!eD && await nUndo(p) === u + 1 && lie(eL) === 'sans clé' && lie(eW) === 'sans clé' && place(eL) && place(eW) && r.propres === '011', 'e3 douche (porteur) supprimée : un pas, liens du lavabo '
      + 'et du WC retirés, leurs étiquettes posées et affichées (' + JSON.stringify({D: !!eD, pas: await nUndo(p) - u, L: lie(eL), W: lie(eW), labL: eL && eL.lab, labW: eW && eW.lab, r}) + ')');
    await annuler(p); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(!!eD && lie(eL) === 'D' && lie(eW) === 'D' && groupeVu(r), 'e3 « Annuler » : la douche et le groupe reviennent (' + JSON.stringify({D: !!eD, L: lie(eL), W: lie(eW), r}) + ')');

    /* « Modifier le groupe » : mode rouvert, membres choisis ; le WC retiré ; « Terminé » */
    await choisir(p, 'D'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqModifier"]'); m = await modeReunir(p); b = await bandeau(p);
    R.ok(m && m.porteur === 'D' && m.ids.join() === 'L,W' && /· 2 choisis\b/.test(b), 'e3 « Modifier le groupe » : mode rouvert, lavabo et WC choisis (' + JSON.stringify({m, b}) + ')');
    await touche('W'); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W');
    R.ok(await nUndo(p) === u + 1 && lie(eL) === 'D' && lie(eW) === 'sans clé' && place(eW), 'e3 WC retiré, « Terminé » : un pas, clé etiqAvec du WC retirée, son étiquette posée ('
      + JSON.stringify({pas: await nUndo(p) - u, L: lie(eL), W: lie(eW), lab: eW.lab}) + ')');
    await annuler(p);

    /* « Annuler » du bandeau, autre outil, Échap : le mode se ferme, rien d'écrit */
    for (const [lib, f] of [['« Annuler » du bandeau', () => bouton(p, '.vc .vc-aide button[data-a="reunirStop"]')], ['autre outil', () => p.evaluate(() => window.__vcEd.choisirOutil({k: 'main'}))],
      ['Échap', () => p.evaluate(() => window.__vcEd.fermerNiveau())]]){
      await choisir(p, 'D'); await bouton(p, FICHE + 'button[data-a="etiqModifier"]'); await touche('W'); u = await nUndo(p); const j0 = JSON.stringify((await C.docCroquis(p)).el);
      await f(); await C.pause(p, 300); m = await modeReunir(p); b = await bandeau(p);
      R.ok(!m && !/Touchez les appareils/.test(b) && await nUndo(p) === u && JSON.stringify((await C.docCroquis(p)).el) === j0, 'e3 ' + lib + ' pendant le mode : fermé, rien d\'écrit ('
        + JSON.stringify({m, b}) + ')');
    }

    /* membre supprimé : un pas, l'étiquette du porteur (posée d'office) replacée, le WC reste lié */
    await poserLab(false); await choisir(p, 'L'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="supprimer"]');
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu('douche, WC + lave-mains');
    R.ok(!eL && await nUndo(p) === u + 1 && lie(eW) === 'D' && place(eD) && !(eD.lab.dx === 9.75 && eD.lab.dy === -9.25) && r.t1 === 1 && r.t2 === 1, 'e3 lavabo (membre) supprimé : un pas, '
      + 'l\'étiquette du porteur replacée, le WC reste lié (' + JSON.stringify({pas: await nUndo(p) - u, W: lie(eW), lab: eD.lab, r}) + ')');
    await annuler(p); await p.evaluate(() => { window.__vcEd.etat.doc.el.find(e => e.id === 'D').lab = null; window.__vcEd.redessiner(); });

    /* aucun appareil choisi : « Terminé » n'écrit rien pour un nouveau groupe ; « Modifier le groupe » : le groupe est défait, titre compris */
    await choisir(p, 'F'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqReunir"]'); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    F = await elDoc(p, 'F'); m = await modeReunir(p); fd = await ficheDe(p);
    R.ok(await nUndo(p) === u && lie(F) === 'sans clé' && !m && fd === 'F', 'e3 « Terminé » sans appareil choisi (lave-linge seul) : rien d\'écrit, aucun pas, fiche du lave-linge ('
      + JSON.stringify({pas: await nUndo(p) - u, F: lie(F), m, fiche: fd}) + ')');
    await choisir(p, 'D'); await toucherPuce(p, 'etiqTitre', 'sdb'); u = await nUndo(p);
    await bouton(p, FICHE + 'button[data-a="etiqModifier"]'); await touche('L'); await touche('W'); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(await nUndo(p) === u + 1 && lie(eL) === 'sans clé' && lie(eW) === 'sans clé' && !('etiqTitre' in eD.p) && place(eL) && place(eW) && r.propres === '111', 'e3 « Modifier le groupe », '
      + 'les deux appareils retirés, « Terminé » : un pas, le groupe défait, titre compris, les trois étiquettes affichées (' + JSON.stringify({pas: await nUndo(p) - u, D: eD.p, L: lie(eL), W: lie(eW), r}) + ')');
    await annuler(p); await annuler(p);

    /* « Annuler » de la barre pendant le mode : le mode se ferme, le dernier pas est défait (« Rétablir » le rend) */
    await choisir(p, 'D'); await bouton(p, FICHE + 'button[data-a="etiqModifier"]'); u = await nUndo(p);
    await annuler(p); m = await modeReunir(p); b = await bandeau(p);
    R.ok(!m && !/Touchez les appareils/.test(b) && await nUndo(p) === u - 1, 'e3 « Annuler » de la barre pendant le mode : mode fermé, le dernier pas défait (' + JSON.stringify({m, b, pas: await nUndo(p) - u}) + ')');
    await p.evaluate(() => window.__vcEd.refaire()); await C.pause(p, 250);

    /* « Défaire » : un pas, liens et titre effacés, étiquettes posées */
    await choisir(p, 'D'); await toucherPuce(p, 'etiqTitre', 'cuisine'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqDefaire"]');
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); eW = await elDoc(p, 'W'); r = await vu();
    R.ok(await nUndo(p) === u + 1 && lie(eL) === 'sans clé' && lie(eW) === 'sans clé' && !('etiqTitre' in eD.p) && place(eL) && place(eW) && place(eD) && r.propres === '111',
      'e3 « Défaire » : un pas, liens et titre effacés, les trois étiquettes posées et affichées (' + JSON.stringify({pas: await nUndo(p) - u, D: eD.p, L: lie(eL), W: lie(eW), r}) + ')');
    await annuler(p); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L');
    R.ok(eD.p.etiqTitre === 'cuisine' && lie(eL) === 'D', 'e3 « Annuler » après « Défaire » : titre et liens rendus (' + JSON.stringify({titre: eD.p.etiqTitre, L: lie(eL)}) + ')');

    /* relecture de m135, nouveau croquis : M6, douche O au lien orphelin (vers « ZZ », absent) et lavabo K ; M1, évier E titré « cuisine »,
       son WC V (dernier membre) et un lave-linge B ; M2 et M4, douche H et ses membres sur des lignes « Autres » (chaudière, deux autres
       appareils dont les noms ne diffèrent que par une parenthèse) */
    await C.injecter(p, {el: [ouvert(C.P('O', 'douche', cx - 1.5, cy, n1({etiqAvec: 'ZZ'}))), ouvert(C.P('K', 'lavabo', cx, cy, n1())),
      ouvert(C.P('E', 'evier', cx - 1.5, cy + 3, {etiqTitre: 'cuisine'})), ouvert(C.P('V', 'wc', cx, cy + 3, {etiqAvec: 'E'})), ouvert(C.P('B', 'lavelinge', cx - 1.5, cy + 4.5)),
      ouvert(C.P('H', 'douche', cx + 3, cy)), ouvert(C.P('I', 'chaudiere', cx + 4.5, cy, {etiqAvec: 'H'})),
      ouvert(C.P('U', 'autre_eu', cx + 3, cy + 1.5, {nom: 'Piscine (vidange)', etiqAvec: 'H'})), ouvert(C.P('Z', 'autre_eu', cx + 4.5, cy + 1.5, {nom: 'Piscine', etiqAvec: 'H'}))]});
    await C.regler(p, cx, cy, 40);

    /* M6 : porteur au lien orphelin, bouton présent ; un toucher, « Terminé » : un pas, sa clé etiqAvec retirée, le groupe formé */
    await choisir(p, 'O'); const btO = !!await p.$(FICHE + 'button[data-a="etiqReunir"]'); u = await nUndo(p);
    await bouton(p, FICHE + 'button[data-a="etiqReunir"]'); await touche('K'); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    const eO = await elDoc(p, 'O'), eK = await elDoc(p, 'K'); fd = await ficheDe(p); const btModO = !!await p.$(FICHE + 'button[data-a="etiqModifier"]');
    R.ok(btO && await nUndo(p) === u + 1 && lie(eO) === 'sans clé' && lie(eK) === 'O' && fd === 'O' && btModO, 'e3 douche au lien orphelin (« ZZ », absent) : bouton « Étiquette commune… » ; '
      + 'lavabo touché, « Terminé » : un pas, clé etiqAvec de la douche retirée, groupe formé (M6 ; ' + JSON.stringify({bouton: btO, pas: await nUndo(p) - u, O: lie(eO), K: lie(eK), fiche: fd, modifier: btModO}) + ')');

    /* M1 : le dernier membre séparé, puis supprimé : le titre « cuisine » de l'évier retiré dans le même pas ; « Annuler » le rend */
    const titreE = async () => { const x = await elDoc(p, 'E'); return x && x.p && 'etiqTitre' in x.p ? x.p.etiqTitre : 'sans clé'; };
    await choisir(p, 'V'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqSeparer"]');
    let tE = await titreE(), eV = await elDoc(p, 'V');
    R.ok(await nUndo(p) === u + 1 && lie(eV) === 'sans clé' && tE === 'sans clé', 'e3 dernier membre (WC) séparé de l\'évier : un pas, lien et titre « cuisine » retirés (M1 ; '
      + JSON.stringify({pas: await nUndo(p) - u, V: lie(eV), titre: tE}) + ')');
    await annuler(p); tE = await titreE(); eV = await elDoc(p, 'V');
    R.ok(tE === 'cuisine' && lie(eV) === 'E', 'e3 « Annuler » après « Séparer » le dernier membre : titre et lien rendus (M1 ; ' + JSON.stringify({titre: tE, V: lie(eV)}) + ')');
    await choisir(p, 'V'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="supprimer"]');
    tE = await titreE(); eV = await elDoc(p, 'V');
    R.ok(await nUndo(p) === u + 1 && !eV && tE === 'sans clé', 'e3 dernier membre (WC) supprimé : un pas, titre « cuisine » de l\'évier retiré (M1 ; '
      + JSON.stringify({pas: await nUndo(p) - u, V: !!eV, titre: tE}) + ')');
    await annuler(p); tE = await titreE(); eV = await elDoc(p, 'V');
    R.ok(tE === 'cuisine' && lie(eV) === 'E', 'e3 « Annuler » après la suppression du dernier membre : le WC, son lien et le titre rendus (M1 ; ' + JSON.stringify({titre: tE, V: lie(eV)}) + ')');
    /* puis un nouveau groupe, évier et lave-linge : titre d'office (aucun), aucune puce de titre pressée, pas de toast « Lavabo et évier… » */
    await choisir(p, 'V'); await bouton(p, FICHE + 'button[data-a="etiqSeparer"]');
    await choisir(p, 'E'); await bouton(p, FICHE + 'button[data-a="etiqReunir"]'); await touche('B'); await effacerToast(p);
    await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]'); msg = await toastVu(p); tE = await titreE();
    const eB = await elDoc(p, 'B'), pressees = await p.evaluate(() => document.querySelectorAll('.vc .vc-pcorps button.vc-chip[data-k="etiqTitre"][aria-pressed="true"]').length);
    R.ok(lie(eB) === 'E' && tE === 'sans clé' && pressees === 0 && !/^Lavabo et évier/.test(msg), 'e3 nouveau groupe évier + lave-linge après « Séparer » le dernier membre : aucun titre, '
      + 'aucune puce de titre pressée, pas de toast « Lavabo et évier… » (M1 ; ' + JSON.stringify({B: lie(eB), titre: tE, pressees, toast: msg}) + ')');

    /* M2 et M4 : « Compté au constat » du porteur garde le libellé entier d'une ligne « Autres », comme le constat */
    await choisir(p, 'H'); ft = await ficheTxt(p);
    const CG = 'Compté au constat : Salle de bain 1, Autres : Chaudière (purge, condensat) 1, Autres : Piscine (vidange) 1, Autres : Piscine 1', iCG = ft.indexOf('Compté au constat');
    R.ok(ft.indexOf(CG) >= 0, 'e3 fiche du porteur, membres sur des lignes « Autres » : « ' + CG + ' » (M2 et M4 ; obtenu ' + JSON.stringify(iCG < 0 ? 'absent' : ft.slice(iCG, iCG + 150)) + ')');

    /* M3 et M5 : « Séparer » laisse telle quelle une étiquette masquée ou déplacée à la main, et replace celle posée d'office, comme le dit
       le LISEZMOI (ce cas passe aussi sans la correction, qui n'a changé que ce texte) */
    await p.evaluate(() => { const S = window.__vcEd.etat, de = id => S.doc.el.find(e => e.id === id), E = S.doc.echelle > 0 ? S.doc.echelle : window.VCroquis.echelleAuto(S.doc, 'edl');
      de('U').lab = {off: true}; de('Z').lab = {dx: 9.75, dy: -9.25, E, main: true}; window.__vcEd.redessiner(); });
    const sep = {};
    for (const id of ['U', 'Z', 'I']){
      await choisir(p, id); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqSeparer"]');
      const x = await elDoc(p, id); sep[id] = {pas: await nUndo(p) - u, lien: lie(x), lab: x && x.lab};
    }
    R.ok(['U', 'Z', 'I'].every(k => sep[k].pas === 1 && sep[k].lien === 'sans clé') && !!sep.U.lab && sep.U.lab.off === true && !!sep.Z.lab && sep.Z.lab.main === true
      && sep.Z.lab.dx === 9.75 && sep.Z.lab.dy === -9.25 && place({lab: sep.I.lab}), 'e3 « Séparer » : étiquette masquée gardée masquée, déplacée à la main gardée en place, '
      + 'posée d\'office replacée (M3 et M5 ; ' + JSON.stringify(sep) + ')');

    /* M7 sur l'avant-projet : U, mis « À supprimer » ici, n'y figure pas ; son bouton n'ouvre pas le mode, le message dit de le réunir sur
       l'état des lieux ; puis retour à l'état des lieux (plan choisi par sa puce du panneau « Contrôles ») */
    await p.evaluate(() => { window.__vcEd.etat.doc.el.find(e => e.id === 'U').p.st = 'supprimer'; window.__vcEd.redessiner(); });
    const planVu = async m => { await p.evaluate(() => document.querySelector('.vc [data-p="controles"]').click()); await C.pause(p, 250);
      await bouton(p, '.vc .vc-panneau:not([hidden]) .vc-pcorps button[data-a="mode"][data-v="' + m + '"]'); return p.evaluate(() => window.__vcEd.etat.mode); };
    const modeA = await planVu('avp');
    await choisir(p, 'U'); await effacerToast(p); u = await nUndo(p);
    const btU = await bouton(p, FICHE + 'button[data-a="etiqReunir"]'), mU = await modeReunir(p), msgU = await toastVu(p), fU = await ficheDe(p);
    R.ok(modeA === 'avp' && btU && !mU && msgU === 'Appareil à supprimer : il ne figure pas sur l\'avant-projet ; réunissez-le sur l\'état des lieux' && await nUndo(p) === u
      && fU === 'U', 'e3 bouton d\'un appareil « À supprimer » sur l\'avant-projet : mode non ouvert, toast « … ; réunissez-le sur l\'état des lieux », rien d\'écrit, '
      + 'fiche gardée (M7 ; ' + JSON.stringify({plan: modeA, bouton: btU, m: mU, toast: msgU, fiche: fU}) + ')');
    await planVu('edl');
    erreurs(A, 'e3');
  } finally { await A.fermer(); }
}

/* m141 : ordre de l'étiquette commune (réponse ordre-etiquette-commune du 16 nov. 2026, choix b ; D7 de la conception v1.7.2), le porteur
   étant un WC + lave-mains : la liste suit l'ordre de l'étiquette, porteur compris ; le porteur garde son rôle (titre, fiche, « Modifier
   le groupe », « Défaire ») */
async function ordreEtiquette(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, n1 = q => Object.assign({niv: 'etage', etage: '1'}, q || {}), ouvert = o => { o.lab = null; return o; };
    /* W porteur (WC + lave-mains), D (douche) et L (lavabo) liés à lui, au 1er étage, étiquettes à placer */
    await C.injecter(p, {el: [ouvert(C.P('W', 'wc', cx + 1.5, cy, n1({lm: 'oui'}))), ouvert(C.P('D', 'douche', cx - 1.5, cy, n1({etiqAvec: 'W'}))),
      ouvert(C.P('L', 'lavabo', cx, cy, n1({etiqAvec: 'W'})))]});
    await C.regler(p, cx, cy, 40);
    const T1 = 'Salle de bain (1er étage)', L2 = 'douche, lavabo, WC + lave-mains', AVANT = 'WC + lave-mains, lavabo, douche';
    const PROPRES = ['Douche (1er étage)', 'Lavabo (1er étage)', LM + ' (1er étage)'];
    const touche = async id => { const e = await elDoc(p, id); await C.toucher(p, e.x, e.y); };
    /* textes du canevas ou du plan PDF : titre et liste une fois chacun, étiquettes propres de D, L et W */
    const compte = tx => ({t1: tx.filter(t => t === T1).length, t2: tx.filter(t => t === L2).length, propres: PROPRES.map(x => tx.filter(t => t === x).length).join(''),
      tx: tx.filter(t => /bain|eau|ouche|avabo|WC/.test(t))});
    const bien = r => r.t1 === 1 && r.t2 === 1 && r.propres === '000';
    let r = compte(await textesEcran(p));
    R.ok(bien(r), 'c11 WC + lave-mains porteur, douche et lavabo liés, au 1er : à l\'écran « ' + T1 + ' » puis « ' + L2 + ' », une fois chacune, aucune étiquette '
      + 'propre (v1.7.1 : « ' + AVANT + ' » ; obtenu ' + JSON.stringify(r) + ')');
    const pd = await textesPdf(p); r = compte(pd.textes);
    R.ok(/\.pdf$/.test(pd.fichier) && bien(r), 'c11 plan PDF de l\'état des lieux (sortie de l\'éditeur) : « ' + T1 + ' » puis « ' + L2 + ' », une fois chacune, aucune '
      + 'étiquette propre (fichier ' + JSON.stringify(pd.fichier) + ' ; obtenu ' + JSON.stringify(r) + ')');

    /* fiche du porteur : ce que compte le constat, texte indicatif sur une ligne, boutons */
    await choisir(p, 'W');
    const ph = await p.evaluate(() => { const i = document.querySelector('.vc .vc-pcorps input[data-k="etiq"]'); return i ? i.placeholder : null; });
    let ft = await ficheTxt(p);
    const CG = 'Compté au constat : Salle de bain 1, Évier 1, WC 1', iCG = ft.indexOf('Compté au constat');
    const btMod = await p.$(FICHE + 'button[data-a="etiqModifier"]'), btDef = await p.$(FICHE + 'button[data-a="etiqDefaire"]');
    R.ok(ft.indexOf(CG) >= 0 && !!btMod && !!btDef, 'c11 fiche du porteur (WC + lave-mains) : « ' + CG + ' », « Modifier le groupe » et « Défaire » (v1.7.1 : « … WC 1, '
      + 'Évier 1, Salle de bain 1 » ; obtenu ' + JSON.stringify(iCG < 0 ? 'absent' : ft.slice(iCG, iCG + 80)) + ', boutons ' + JSON.stringify({modifier: !!btMod, defaire: !!btDef}) + ')');
    R.ok(ph === T1 + ' — ' + L2, 'c11 fiche du porteur : texte indicatif « ' + T1 + ' — ' + L2 + ' » (obtenu ' + JSON.stringify(ph) + ')');
    /* fiche d'un membre : il renvoie au WC, le porteur */
    await choisir(p, 'D'); ft = await ficheTxt(p);
    const voirW = !!await p.$(FICHE + 'button[data-a="voir"][data-id="W"]');
    R.ok(ft.indexOf('Étiquette réunie avec le WC + lave-mains') >= 0 && voirW, 'c11 fiche de la douche (membre) : « Étiquette réunie avec le WC + lave-mains », « Voir » vers le WC ('
      + JSON.stringify({voir: voirW, fiche: ft.slice(Math.max(0, ft.indexOf('Étiquette réunie')), ft.indexOf('Étiquette réunie') + 60)}) + ')');

    /* titre choisi sur le porteur, même s'il n'est plus en tête de la liste */
    await choisir(p, 'W'); let u = await nUndo(p); await toucherPuce(p, 'etiqTitre', 'eau');
    let eW = await elDoc(p, 'W'), eD = await elDoc(p, 'D'), eL = await elDoc(p, 'L'), tx = await textesEcran(p);
    const EAU = 'Salle d\'eau (1er étage)', nEau = tx.filter(t => t === EAU).length, nL2 = tx.filter(t => t === L2).length;
    R.ok(eW.p.etiqTitre === 'eau' && !('etiqTitre' in eD.p) && await nUndo(p) === u + 1 && nEau === 1 && nL2 === 1, 'c11 puce « Salle d\'eau » du porteur : titre écrit sur le WC, '
      + 'un pas ; à l\'écran « ' + EAU + ' » puis « ' + L2 + ' » (' + JSON.stringify({W: eW.p.etiqTitre, D: eD.p.etiqTitre, pas: await nUndo(p) - u, eau: nEau, liste: nL2}) + ')');
    await annuler(p);

    /* « Modifier le groupe » : mode du porteur, la douche et le lavabo choisis ; « Annuler » du bandeau : rien d'écrit */
    await choisir(p, 'W'); u = await nUndo(p); const j0 = JSON.stringify((await C.docCroquis(p)).el);
    await bouton(p, FICHE + 'button[data-a="etiqModifier"]');
    let m = await modeReunir(p), b = await bandeau(p), h = await halos(p, ['W', 'D', 'L']);
    R.ok(m && m.porteur === 'W' && m.ids.join() === 'D,L' && /^Touchez les appareils à réunir avec le WC \+ lave-mains · 2 choisis\b/.test(b) && h === 'D:choisi L:choisi W:porteur',
      'c11 « Modifier le groupe » : mode ouvert pour le WC + lave-mains, la douche et le lavabo choisis, halos (' + JSON.stringify({m, b, halos: h}) + ')');
    await bouton(p, '.vc .vc-aide button[data-a="reunirStop"]'); m = await modeReunir(p);
    R.ok(!m && await nUndo(p) === u && JSON.stringify((await C.docCroquis(p)).el) === j0, 'c11 « Annuler » du bandeau : mode fermé, rien d\'écrit (' + JSON.stringify({m, pas: await nUndo(p) - u}) + ')');

    /* la douche retirée, « Terminé » : un pas, son lien retiré, son étiquette posée ; le groupe sans titre, sur une ligne */
    await choisir(p, 'W'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="etiqModifier"]'); await touche('D'); await bouton(p, '.vc .vc-aide button[data-a="reunirFin"]');
    eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); tx = await textesEcran(p);
    const UNE = 'Lavabo, WC + lave-mains (1er étage)', nUne = tx.filter(t => t === UNE).length;
    R.ok(await nUndo(p) === u + 1 && lie(eD) === 'sans clé' && lie(eL) === 'W' && place(eD) && nUne === 1, 'c11 « Modifier le groupe », douche retirée, « Terminé » : un pas, lien de la '
      + 'douche retiré, son étiquette posée, le lavabo lié ; à l\'écran « ' + UNE + ' » (v1.7.1 : « WC + lave-mains, lavabo (1er étage) » ; ' + JSON.stringify({pas: await nUndo(p) - u,
      D: lie(eD), lab: eD.lab, L: lie(eL), une: nUne, tx: tx.filter(t => /ouche|avabo|WC/.test(t))}) + ')');
    await annuler(p);

    /* « Défaire », puis le porteur supprimé : un pas, liens retirés, étiquettes des membres posées ; « Annuler » rend le groupe */
    for (const [lib, sel, att] of [['« Défaire »', 'etiqDefaire', '111'], ['WC (porteur) supprimé', 'supprimer', '110']]){
      await choisir(p, 'W'); u = await nUndo(p); await bouton(p, FICHE + 'button[data-a="' + sel + '"]');
      eW = await elDoc(p, 'W'); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); r = compte(await textesEcran(p));
      R.ok(await nUndo(p) === u + 1 && lie(eD) === 'sans clé' && lie(eL) === 'sans clé' && place(eD) && place(eL) && r.propres === att && !r.t1, 'c11 ' + lib + ' : un pas, liens de la '
        + 'douche et du lavabo retirés, leurs étiquettes posées et affichées (' + JSON.stringify({pas: await nUndo(p) - u, W: !!eW, D: lie(eD), L: lie(eL), r}) + ')');
      await annuler(p); eD = await elDoc(p, 'D'); eL = await elDoc(p, 'L'); r = compte(await textesEcran(p));
      R.ok(lie(eD) === 'W' && lie(eL) === 'W' && bien(r), 'c11 « Annuler » après ' + lib + ' : le groupe revient (' + JSON.stringify({D: lie(eD), L: lie(eL), r}) + ')');
    }
    erreurs(A, 'c11');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [niveaux, laveMains, autresAppareils, etiquetteCommune, etiquetteReunie, ordreEtiquette]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
