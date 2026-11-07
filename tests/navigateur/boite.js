// Boîte de branchement en limite de propriété dans l'éditeur du croquis, dans Chromium (données fictives, fond fictif de
// VCroquis.demoDxf()) : correctif m103 (souhait 10, décision D4 de .claude/conception-outils-dessin.md) ; m104 complétera ce fichier.
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

(async () => {
  for (const f of [fiches, type]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception ' + (e && e.message || e)); }
  }
  R.fin();
})();
