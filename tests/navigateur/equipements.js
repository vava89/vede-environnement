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

(async () => {
  for (const f of [niveaux]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
