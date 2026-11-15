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

(async () => {
  for (const f of [niveaux, laveMains, autresAppareils]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
