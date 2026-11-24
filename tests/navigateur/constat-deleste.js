// Constat délesté, 1re partie (m158 ; DL1 à DL4, DL6, DL12 à DL15, DL25 et carte m158 du § 12 de .claude/conception-v173.md), dans
// l'application (Chromium, données fictives : « Nom Fictif », « 12 rue Fictive », « Ville-Exemple », téléphone fictif). Le PDF est relevé
// appel par appel (C.relevePdf de commun.js) ; les textes fixes du constat n'y sont jamais écrits en clair : le témoin les garde par
// empreinte, et les cas D ne lisent que le tableau des installations (en-têtes et libellés génériques, lignes saisies par le test).
// T0 (témoin des constats signés, DL25) : cinq dossiers fictifs imprimés, relevés sur toutes les pages (textes, traits, rectangles,
//     images par empreinte, pages) et comparés appel par appel au témoin tests/navigateur/temoins/constat-signe.json, relevé sur la base
//     (aa8095c) : le premier écart est dit, en empreintes. (1) signé (c-lock), marque retirée : présentation 1, 12 rangées ; (2) signé,
//     marque 2 : rejet des EP dans un puits, boîte et côté, réserves, préconisations (boîte et gargouille à créer, D et T), désagréments
//     « oui », propriété publique, croquis de position ; (3) signé, gel retiré ; (4) signé, marque 2, refus de visite ; (5) non signé.
//     Les quatre signés le sont étude en « Formulaire complet » et s'impriment étude en « Délesté » : un constat signé ne suit jamais
//     l'option. Le non signé s'imprime avec « Formulaire complet » rangé (C.formeConstat), et reste ainsi valable quand le défaut changera
//     (m161). Fixés : identifiants (« ID » dans les textes), date de signature (réécrite après c-lock), dates de la visite et de la
//     demande, fuseau 'Europe/Paris' ; un second relevé, dans un profil neuf, est identique au premier. Toute chaîne du témoin autre que
//     les valeurs fictives saisies par le test (FICTIFS) est une empreinte : contrôlé à chaque passage.
//     Drapeau --relever (avec --app=<dossier de la base>) : ne lance que T0 et écrit le témoin (une ligne par appel). À refaire, sur la
//     version d'avant le changement, après une mise à jour de jsPDF, des polices ou du fuseau (§ 13 de la conception).
// D1 (DL2, DL3) : liste « Constat imprimé » (#m-cforme) de « En-tête des fiches » : '' « Par défaut (formulaire complet) » en tête et
//     choisie pour une étude neuve, puis « Délesté : seulement ce qui est rempli ou coché » et « Formulaire complet » ; enregistrer sans
//     toucher la liste ne range aucune forme (clé absente) ; « Délesté » range 'deleste', montré à la réouverture ; « Par défaut » retire
//     la clé ; le département, la commune, le logo et une clé posée avant restent (en mémoire et dans la base de la tablette).
// D2 (DL12 à DL15) : constat non signé, étude en « Délesté » : WC (1, EU D, conforme) et une ligne ajoutée « Fontaine » (EP, 1,
//     Gargouille, conforme) : ces deux rangées seules, dans cet ordre, de 17,5 pt ; en-têtes Installation, Nb, Raccordée sur, Réseau EU,
//     D, Gar-, gouille, Conforme et Oui, sans autre ; verticales et largeurs de cstColonnes (somme 479), égales au calcul du test
//     (surplus d'une colonne seule) ; croix au centre de leur colonne (0,1 pt), Nb et croix en 10,5 pt, posés comme au formulaire ;
//     page 2 : la boîte de la présentation 2. Le même dossier en « Formulaire complet », puis sans choix : le tableau du formulaire.
//     Hors du tableau (page 1 hors de 360 à 620,5, et page 2), le relevé du délesté est celui du formulaire du même dossier, appel par
//     appel, état compris (couleurs, épaisseur, motif) : en m158, seul le tableau change (carte m158 du § 12).
// D3 : aucune ligne active : rien du tableau ; visite non effectuée (refus), une ligne remplie : rien non plus ; ni croix ni
//     conformité : Installation et Nb seuls (libellés de 456 pt). Dans ces trois cas, sans rangée ou sans fond jaune, le relevé hors du
//     tableau reste celui du formulaire, couleur de fond comprise ; raccordement « plusieurs » : aucune colonne « Raccordée sur », sa
//     conformité automatique (« non ») seule ; une seule conformité « oui », sans raccordement : « Conforme » et Oui seuls ; une ligne
//     EP mise à la main sur « Puits » : Puits et Non ; toutes les colonnes employées : verticales de la présentation 2 (0,001 pt),
//     en-têtes et croix à 0,05 pt de leur place au formulaire, fond jaune sous « Conforme », rangées de 17,5 pt, ou de 21,5 pt si le
//     libellé ne tient pas sur une ligne ; 30 rangées actives : libellés en 8 pt au plus, rien sous 620,5, Nb et croix en
//     min(10,5 ; (h − 1) / 0,72) ; cstColonnes appelée directement (mesures factices) : surplus d'une colonne seule, partage dans un
//     groupe et dans une région, libellés d'au moins 107,5 pt, somme 479, fonction pure.
// Échouent sur aa8095c : D1 (pas de liste ; la fiche perd la clé posée avant), D2 et D3 (tableau du formulaire : toutes ses colonnes,
// toutes ses rangées ; pas de cstColonnes). Y passent : T0 (c'est là qu'il est relevé) et les garde-fous : en D2, la boîte de la
// page 2 et le tableau du formulaire en « Formulaire complet » et sans choix ; en D3, avec toutes les colonnes, les verticales, les
// en-têtes, les croix et le fond (comparés au formulaire du même dossier), et les libellés en 8 pt des 30 rangées ; en D2 et D3, le
// relevé hors du tableau (le formulaire y est imprimé deux fois) ; aucune erreur.
'use strict';
const C = require('./commun.js'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const R = C.rapport('constat-deleste');
const RELEVER = process.argv.indexOf('--relever') >= 0;
const TEMOIN = path.join(__dirname, 'temoins', 'constat-signe.json');
/* signature fictive (image PNG d'un point), comme dans constat-boite.js ; sert aussi de croquis de position */
const SIG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
/* valeurs fictives saisies par le test : seules chaînes que le témoin garde en clair (chacune doit se dire fictive) */
const FICTIFS = ['Nom Fictif', '12 rue Fictive', '99000 Ville-Exemple', 'nom.fictif@exemple.org', '06 39 98 12 34', 'Parcelle fictive 12', 'Maison fictive',
  'Cave fictive', 'Rue fictive', 'Gestionnaire fictif', 'Réserve fictive', 'Observation fictive', 'Ligne fictive'];
const FICTIF = /fictif|fictive|exemple|^06 39 98|^01 99 00/i;
const H = s => 'h:' + crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 12);
const EMPREINTE = /^h:[0-9a-f]{12}$/;
const GENRES = ['t', 'l', 'r', 'i', 'p', '?'];
const pres = (a, b, e) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) <= e;

/* ---------- T0 : témoin des constats signés ---------- */

/* relevé mis en empreintes : chaque chaîne (sauf le genre de l'appel), identifiants de l'étude et du dossier remplacés par « ID », devient
   son empreinte, sauf une valeur de FICTIFS */
function empreintes(L, ids){
  const ch = x => { if (typeof x === 'string'){ let s = x; ids.forEach(id => { if (id) s = s.split(id).join('ID'); }); return FICTIFS.indexOf(s) >= 0 ? s : H(s); }
    return Array.isArray(x) ? x.map(ch) : x; };
  return L.map(a => a.map((x, i) => i === 0 ? x : ch(x)));
}
/* contrôle du témoin : appels connus, toute chaîne une empreinte ou une valeur de FICTIFS, rien d'autre (ni objet) ; rend les fautes */
function controle(T){
  const fautes = [];
  if (!FICTIFS.every(s => FICTIF.test(s))) fautes.push('FICTIFS : valeur non fictive');
  Object.keys(T).forEach(n => (Array.isArray(T[n]) ? T[n] : [null]).forEach((a, j) => {
    const ou = 'dossier ' + n + ', appel ' + (j + 1);
    if (!Array.isArray(a) || GENRES.indexOf(a[0]) < 0){ fautes.push(ou + ' : genre inconnu'); return; }
    const voir = x => { if (typeof x === 'string'){ if (!EMPREINTE.test(x) && FICTIFS.indexOf(x) < 0) fautes.push(ou + ' : chaîne en clair'); }
      else if (Array.isArray(x)) x.forEach(voir); else if (x !== null && typeof x !== 'number' && typeof x !== 'boolean') fautes.push(ou + ' : valeur inattendue'); };
    a.slice(1).forEach(voir);
  }));
  return fautes;
}
/* témoin écrit compact : un appel par ligne, sans indentation */
const texteTemoin = T => '{' + Object.keys(T).map(n => JSON.stringify(n) + ':[\n' + T[n].map(a => JSON.stringify(a)).join(',\n') + '\n]').join(',\n') + '}\n';

/* dossier n de T0 (1 à 5), préparé sur le dossier unique de l'étude ; 1 à 4 signés par le geste « Signer » (c-lock, page sur le
   dossier), étude en « Formulaire complet » ; rend l'état du constat (« marque 2 », « sans marque », « sans gel », « non signé ») */
const preparerT0 = (p, n) => p.evaluate(async ([n, png]) => {
  const T = window.__VT, v = T.S.visites[0];
  Object.assign(v, {statut: n === 4 ? 'refus' : 'visitee', dateVisite: '2026-11-18', absences: [], nom: 'Nom Fictif', tel: '06 39 98 12 34', mail: 'nom.fictif@exemple.org',
    domicile: '12 rue Fictive', domVille: '99000 Ville-Exemple', adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'});
  delete v.constat; const c = v.constat = T.constatEval(v, []).c;
  const L = (id, o) => Object.assign(c.rows.find(r => r.id === id), o);
  Object.assign(c, {demande: '10/11/2026', refCad: 'Parcelle fictive 12', typePropriete: 'Maison fictive', nbLogements: '1', desagr: 'non', soussigne: 'Nom Fictif', sigTech: png, sigProp: png});
  if (n === 1){ L('wc', {nb: '1', raccord: 'EU_D', methodes: ['visuel', 'eau']}); L('gout_av', {nb: '2', raccord: 'EP_D', methodes: ['visuel']}); c.observations = 'Observation fictive'; }
  if (n === 2){
    L('wc', {nb: '1', raccord: 'EU_T', methodes: ['fluo']}); L('lavelinge', {nb: '1', raccord: 'UN_D'}); L('gout_ar', {nb: '1', raccord: 'PUITS', methodes: ['visuel']});
    L('grilles', {nb: '3', raccord: 'GARG', methodes: ['eau', 'fumee']});
    c.boite = {distEU: '0,80 m', coteEU: 'intérieur', profEU: '0,80 m', teEU: 'oui', distEP: '1,20 m', coteEP: 'extérieur', profEP: '1,10 m'};
    c.conclusion = 'reserves'; c.reserves = 'Réserve fictive';
    c.precos = {boite_EU: true, boiteCr_EU: true, gargCr: true, pubEU_D: true, pubEU_T: true, pubEP_D: true, pubEP_T: true};
    c.desagr = 'oui'; c.desagrLoc = 'Cave fictive'; c.categorie = 'pub_acc'; c.categorieNb = '2'; c.epRecup = {puisard: true, recup: true};
    c.reseau = 'territorial'; c.reseauGest = 'Gestionnaire fictif'; c.reseauRue = 'Rue fictive'; c.croquis = png; c.methodes = {reso: true};
  }
  if (n === 3){ L('evier', {nb: '1', raccord: 'FOSSE'}); L('siphon_sol', {nb: '1', raccord: 'MILIEU', conforme: 'oui'}); c.conclusion = 'non_conformes'; }
  if (n === 4){ L('wc', {nb: '1', raccord: 'EU_D'}); c.reseauRue = 'Rue fictive'; c.observations = 'Observation fictive'; }
  if (n === 5){
    L('wc', {nb: '2', raccord: 'EU_D', methodes: ['visuel']}); L('sdb', {nb: '1', raccord: 'UN_T', conforme: 'non'});
    c.rows.push({id: 'ajout-fictif-1', groupe: 'EP', label: 'Ligne fictive', std: false, nb: '1', raccord: 'EP_T', conforme: '', methodes: ['reso']});
    c.boite = {distEU: 'en limite', profEU: '0,60 m'}; c.sigProp = '';
  }
  if (n <= 4){
    await T.ACTIONS['c-lock']();
    if (!v.constat.signeLe) return 'non signé par c-lock';
    v.constat.signeLe = '2026-11-18T09:30:00.000Z';
    if (n === 1) delete v.constat.fige.mep;
    if (n === 3) delete v.constat.fige;
  }
  await T.DB.put('visites', v); await T.flushSaves();
  const k = v.constat;
  return !k.signeLe ? 'non signé' : !k.fige ? 'sans gel' : k.fige.mep === undefined ? 'sans marque' : 'marque ' + k.fige.mep;
}, [n, SIG]);

/* T0 relevé dans un profil neuf : {1: relevé en empreintes, …, 5: …} et l'état des constats */
async function releveT0(){
  const A = await C.ouvrir({fuseau: 'Europe/Paris'}), p = A.p, T = {}, etats = [];
  try {
    await C.etudeEtDossier(p);
    const ids = await p.evaluate(() => [window.__VT.S.etude.id, window.__VT.S.visites[0].id]);
    for (const n of [1, 2, 3, 4, 5]){
      await C.formeConstat(p, 'complet');
      etats.push(await preparerT0(p, n));
      await C.formeConstat(p, n <= 4 ? 'deleste' : 'complet');
      T[n] = empreintes(await C.relevePdf(p), ids);
    }
    if (A.erreurs.length) R.info('erreurs de la page : ' + A.erreurs.length);
  } finally { await A.fermer(); }
  return {T, etats, erreurs: A.erreurs.length};
}

async function t0(){
  const a = await releveT0(), b = await releveT0();
  R.ok(a.etats.join(', ') === 'sans marque, marque 2, sans gel, marque 2, non signé' && !a.erreurs,
    'T0 : dossiers 1 à 5 préparés (' + a.etats.join(', ') + ' ; ' + a.erreurs + ' erreur(s) de la page)');
  const ec = [1, 2, 3, 4, 5].map(n => { const e = C.premierEcart(b.T[n], a.T[n]); return e ? 'dossier ' + n + ', ' + e : ''; }).filter(Boolean);
  R.ok(!ec.length, 'T0 : un second relevé, dans un profil neuf, est identique au premier' + (ec.length ? ' (' + ec[0] + ')' : ''));
  const f = controle(a.T);
  R.ok(!f.length, 'T0 : toute chaîne du relevé est une empreinte ou une valeur fictive saisie par le test' + (f.length ? ' (' + f.slice(0, 3).join(' ; ') + ')' : ''));
  if (RELEVER){
    if (!ec.length && !f.length){ fs.mkdirSync(path.dirname(TEMOIN), {recursive: true}); fs.writeFileSync(TEMOIN, texteTemoin(a.T));
      R.info('témoin écrit : ' + path.relative(C.RACINE, TEMOIN) + ' (' + [1, 2, 3, 4, 5].map(n => a.T[n].length).join(', ') + ' appels)'); }
    else R.info('témoin non écrit');
    return;
  }
  let tem = null;
  try { tem = JSON.parse(fs.readFileSync(TEMOIN, 'utf8')); } catch (e){}
  if (!R.ok(!!tem, 'T0 : témoin présent et lisible (' + path.relative(C.RACINE, TEMOIN) + ' ; à relever sur la base par --relever)')) return;
  const ft = controle(tem);
  R.ok(!ft.length && Object.keys(tem).join() === '1,2,3,4,5', 'T0 : le témoin ne garde en clair que des valeurs fictives (dossiers ' + Object.keys(tem).join(', ') + ')'
    + (ft.length ? ' (' + ft.slice(0, 3).join(' ; ') + ')' : ''));
  for (const n of [1, 2, 3, 4, 5]){
    const e = C.premierEcart(a.T[n], tem[n] || []);
    R.ok(!e, 'T0 : dossier ' + n + ' (' + a.etats[n - 1] + ', imprimé étude en « ' + (n <= 4 ? 'Délesté' : 'Formulaire complet') + ' ») identique au témoin, appel par appel ('
      + a.T[n].length + ' appels)' + (e ? ' ; premier écart : ' + e : ''));
  }
}

/* ---------- Outils des cas D (relevé brut, lu seulement dans le tableau des installations) ---------- */

/* dossier d'un cas D : constat neuf, non signé, visite effectuée (s.statut sinon) ; s.lignes : {id: champs} des lignes du formulaire ;
   s.ajouts : lignes ajoutées [{groupe, label, nb, raccord, conforme, methodes}] ; s.champs : autres champs du constat */
const poser = (p, s) => p.evaluate(async s => {
  const T = window.__VT, v = T.S.visites[0];
  Object.assign(v, {statut: s.statut || 'visitee', dateVisite: '2026-11-18', absences: []});
  delete v.constat; const c = v.constat = T.constatEval(v, []).c;
  Object.keys(s.lignes || {}).forEach(id => Object.assign(c.rows.find(r => r.id === id), s.lignes[id]));
  (s.ajouts || []).forEach((a, i) => c.rows.push(Object.assign({id: 'ajout-fictif-' + (i + 1), std: false, nb: '', raccord: '', conforme: '', methodes: []}, a)));
  Object.assign(c, s.champs || {});
  await T.flushSaves();
}, s);
/* bornes du tableau des installations (page 1) : la légende des méthodes (texte de droite en 563 ; 351,2) et la rubrique des ouvrages
   de récupération des EP (premier texte en y 635,2), ou null si l'une manque ; tableau : les appels entre les deux */
function bornes(L){
  const i0 = L.findIndex(a => a[0] === 't' && a[1] === 1 && a[2] === 563 && a[3] === 351.2);
  const i1 = i0 < 0 ? -1 : L.findIndex((a, i) => i > i0 && a[0] === 't' && a[1] === 1 && a[3] === 635.2);
  return i0 >= 0 && i1 > i0 ? [i0, i1] : null;
}
function tableau(L){ const b = bornes(L); return b ? L.slice(b[0] + 1, b[1]) : null; }
/* tout le relevé sauf le tableau (page 1 jusqu'à la légende, puis depuis la rubrique des ouvrages de récupération des EP, et page 2) */
function horsTableau(L){ const b = bornes(L); return b ? L.slice(0, b[0] + 1).concat(L.slice(b[1])) : null; }
/* m158 (carte du § 12 : le reste du constat est celui du formulaire) : premier écart, hors du tableau, entre le relevé du délesté et
   celui du formulaire du même dossier, état compris (couleurs, épaisseur, motif), ou '' ; dit en empreintes (comme T0), car tout le
   constat est relevé, textes fixes compris */
const ecartHors = (Ld, Lc) => { const a = horsTableau(Ld), b = horsTableau(Lc); return !a || !b ? 'légende ou rubrique absente' : C.premierEcart(empreintes(a, []), empreintes(b, [])); };
const textes = TB => TB.filter(a => a[0] === 't').map(a => ({t: a[4], x: a[2], y: a[3], f: a[5], st: a[6], sz: a[7], col: a[8]}));
const entetes = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'italic');
const libelles = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'normal');
const croixDe = TB => textes(TB).filter(t => t.t === 'X' && t.f !== 'times');
const nombres = TB => textes(TB).filter(t => t.f !== 'times' && t.t !== 'X' && t.sz > 5.5);
const verticales = TB => TB.filter(a => a[0] === 'l' && a[2] === a[4]).map(a => ({x: a[2], y1: Math.min(a[3], a[5]), y2: Math.max(a[3], a[5])}));
const horizontales = TB => TB.filter(a => a[0] === 'l' && a[3] === a[5]).map(a => ({y: a[3], x1: Math.min(a[2], a[4]), x2: Math.max(a[2], a[4])}));
const xsVert = TB => Array.from(new Set(verticales(TB).map(v => v.x))).sort((a, b) => a - b);
/* traits sous les rangées (pleine largeur, sous l'en-tête) */
const fondsRangees = TB => horizontales(TB).filter(h => h.y > 402.0005 && h.x1 === 65 && h.x2 === 544).map(h => h.y);
const lst = a => a.map(x => typeof x === 'number' ? +x.toFixed(3) : x).join(', ');
/* deux listes de nombres de même longueur, égales à e près (0,001 par défaut) */
const proches = (a, b, e) => a.length === b.length && a.every((x, i) => pres(x, b[i], e === undefined ? 0.001 : e));
/* largeur en Times italique (police de l'en-tête), mesurée avec la bibliothèque PDF de la page */
const mesures = (p, l) => p.evaluate(l => { const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'}); return l.map(([t, sz]) => { d.setFont('times', 'italic'); d.setFontSize(sz); return d.getTextWidth(t); }); }, l);
/* cstColonnes de la page (null si absente) ; mesure : 'pdf' (Times italique de la bibliothèque) ou une mesure factice nommée */
const colonnes = (p, rangs, mesure) => p.evaluate(([rangs, mesure]) => {
  const T = window.__VT; if (typeof T.cstColonnes !== 'function') return null;
  const d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
  const M = {pdf: (t, sz) => { d.setFont('times', 'italic'); d.setFontSize(sz); return d.getTextWidth(t); },
    longueur: (t, sz) => t.length * sz * 0.5, reseau100: (t, sz) => /^(Réseau|Unitaire)$/.test(t) ? 100 : t.length * sz * 0.5,
    region300: t => t === 'Raccordée sur' ? 300 : 1, tout400: () => 400};
  return JSON.parse(JSON.stringify(T.cstColonnes(rangs, M[mesure])));
}, [rangs, mesure]);
const FORM_X = [65, 172.5, 195.5, 223.5, 252, 280.5, 309, 337, 365.5, 397.4, 429.3, 461.1, 493, 518.5, 544];
/* verticales du formulaire (présentation 2) : x et haut (360 bord ou frontière de région, 371 groupe, 391 sous-colonne) */
const FORM_V = [[65, 360], [172.5, 360], [195.5, 360], [223.5, 391], [252, 371], [280.5, 391], [309, 371], [337, 391], [365.5, 371], [397.4, 371], [429.3, 371],
  [461.1, 371], [493, 360], [518.5, 371], [544, 360]];
const imprimer = async (p, forme) => { await C.formeConstat(p, forme); return C.relevePdf(p); };

/* ---------- D1 : option « Constat imprimé » dans « En-tête des fiches » ---------- */
async function d1(p){
  await p.evaluate(async () => { const T = window.__VT, e = T.S.etude; e.fiche = Object.assign({}, e.fiche, {cleFictive: 'Valeur fictive'}); await T.DB.put('etudes', e); });
  const ouvrirEntete = async () => { await p.click('[data-act="etude-menu"]'); await p.click('[data-m="ch"][data-v="entete"]'); await p.waitForSelector('#m-dep'); };
  const liste = () => p.evaluate(() => { const s = document.querySelector('#m-cforme'); return s ? {opts: Array.from(s.options).map(o => [o.value, o.textContent]), val: s.value} : null; });
  const enregistrer = async () => { await p.click('#modal-root button.primary'); await p.waitForSelector('#m-dep', {state: 'detached'}); await p.evaluate(() => window.__VT.flushSaves()); };
  const fiche = () => p.evaluate(async () => { const T = window.__VT, d = await T.DB.get('etudes', T.S.etude.id); return {mem: T.S.etude.fiche, db: d && d.fiche}; });
  const AUTRES = {departement: 'Département fictif', commune: 'Commune fictive', constatLogo: 'formulaire', cleFictive: 'Valeur fictive'};
  const garde = f => !!f && Object.keys(AUTRES).every(k => f[k] === AUTRES[k]);
  const dire = f => JSON.stringify(f || null).replace(/"cleFictive"/, '"cle"');
  const OPTS = [['', 'Par défaut (formulaire complet)'], ['deleste', 'Délesté : seulement ce qui est rempli ou coché'], ['complet', 'Formulaire complet']];

  await ouvrirEntete();
  const l1 = await liste();
  R.ok(!!l1 && JSON.stringify(l1.opts) === JSON.stringify(OPTS) && l1.val === '', 'D1 : liste « Constat imprimé » : « Par défaut (formulaire complet) » en tête et choisie pour une '
    + 'étude neuve, puis « Délesté… » et « Formulaire complet » (obtenu ' + JSON.stringify(l1) + ')');
  await p.fill('#m-dep', AUTRES.departement); await p.fill('#m-com', AUTRES.commune); await p.selectOption('#m-clogo', 'formulaire');
  await enregistrer();
  const f1 = await fiche();
  R.ok(!('constatForme' in (f1.mem || {})) && !('constatForme' in (f1.db || {})) && garde(f1.mem) && garde(f1.db),
    'D1 : en-tête enregistré sans toucher la liste : aucune forme rangée, département, commune, logo et clé posée avant gardés (' + dire(f1.db) + ')');
  await ouvrirEntete();
  if (l1) await p.selectOption('#m-cforme', 'deleste');
  await enregistrer();
  const f2 = await fiche();
  R.ok(!!f2.mem && f2.mem.constatForme === 'deleste' && !!f2.db && f2.db.constatForme === 'deleste' && garde(f2.mem) && garde(f2.db),
    'D1 : « Délesté » range \'deleste\' dans l\'étude, le reste de la fiche gardé (' + dire(f2.db) + ')');
  await ouvrirEntete();
  const l3 = await liste();
  R.ok(!!l3 && l3.val === 'deleste', 'D1 : à la réouverture, la liste montre « Délesté » (' + (l3 ? l3.val : 'pas de liste') + ')');
  if (l3) await p.selectOption('#m-cforme', '');
  await enregistrer();
  const f3 = await fiche();
  R.ok(!('constatForme' in (f3.mem || {})) && !('constatForme' in (f3.db || {})) && garde(f3.mem) && garde(f3.db),
    'D1 : « Par défaut » retire la forme rangée, le reste de la fiche gardé (' + dire(f3.db) + ')');
}

/* ---------- D2 : WC et « Fontaine » ---------- */
async function d2(p){
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '1', raccord: 'GARG', conforme: 'oui'}]});
  const L = await imprimer(p, 'deleste'), TB = tableau(L) || [];
  const lib = libelles(TB).map(t => t.t), ent = entetes(TB).map(t => t.t);
  R.ok(lib.join(' | ') === 'WC | Fontaine', 'D2 : seules les rangées WC et « Fontaine » s\'impriment, dans cet ordre (' + lib.join(' | ') + ')');
  const ATT = ['Installation', 'Nb', 'Raccordée sur', 'Réseau EU', 'D', 'Gar-', 'gouille', 'Conforme', 'Oui'];
  R.ok(ent.slice().sort().join(' | ') === ATT.slice().sort().join(' | ') && ent.length === ATT.length,
    'D2 : en-têtes exactement Installation, Nb, Raccordée sur, Réseau EU, D, Gar-, gouille, Conforme et Oui (' + ent.join(' | ') + ')');
  const K = await colonnes(p, [{place: 'EU_D', conf: 'oui'}, {place: 'GARG', conf: 'oui'}], 'pdf');
  const xs = xsVert(TB);
  const kx = K ? K.colonnes.map(k => k.x).concat([544]) : [];
  const somme = K ? K.colonnes.reduce((s, k) => s + k.w, 0) : 0;
  R.ok(!!K && kx.length === xs.length && kx.every((x, i) => pres(x, xs[i], 0.001)) && pres(somme, 479, 1e-6) && K.colonnes.map(k => k.cle).join() === 'lib,nb,EU_D,GARG,oui',
    'D2 : verticales et largeurs de cstColonnes (lib, nb, EU_D, GARG, oui), de somme 479 (tracé ' + lst(xs) + ' ; cstColonnes ' + (K ? lst(kx) + ', somme ' + somme.toFixed(3) : 'absente') + ')');
  const [wEU, wGa, wGo, wRac, wOui, wConf] = await mesures(p, [['Réseau EU', 10], ['Gar-', 8], ['gouille', 8], ['Raccordée sur', 10], ['Oui', 10], ['Conforme', 10]]);
  const wD = Math.max(28, wEU + 4), wG = Math.max(31.9, Math.max(wGa, wGo) + 4), wO = Math.max(Math.max(25.5, wOui + 4), wConf + 4), wL = 479 - 23 - Math.max(wD + wG, wRac + 4) - wO;
  const att = [65, 65 + wL, 88 + wL, 88 + wL + wD, 88 + wL + wD + wG, 544];
  R.ok(xs.length === att.length && att.every((x, i) => pres(x, xs[i], 0.001)) && wD + wG > wRac + 4,
    'D2 : largeurs du calcul : D seul de « Réseau EU » ' + wD.toFixed(2) + ', Gargouille ' + wG.toFixed(2) + ', Oui seul ' + wO.toFixed(2) + ', libellés ' + wL.toFixed(2) + ' (attendu ' + lst(att) + ')');
  const cx = xs.slice(0, -1).map((x, i) => (x + xs[i + 1]) / 2), X = croixDe(TB), rg = fondsRangees(TB);
  const ok = X.length === 4 && [[2, 0], [4, 0], [3, 1], [4, 1]].every(([k, r]) => X.some(t => pres(t.x, cx[k], 0.1) && t.y > (r ? rg[0] : 402) && t.y < rg[r]));
  R.ok(ok, 'D2 : croix au centre de leur colonne à 0,1 pt (WC : D et Oui ; Fontaine : Gargouille et Oui) (' + X.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2)).join(', ') + ' ; centres ' + lst(cx) + ')');
  const N = nombres(TB);
  R.ok(rg.length === 2 && pres(rg[0], 419.5, 0.001) && pres(rg[1], 437, 0.001) && N.length === 2 && N.concat(X).every(t => t.sz === 10.5)
    && pres(N[0].y, 402 + 8.75 + 3.6, 0.001) && pres(N[1].y, 419.5 + 8.75 + 3.6, 0.001) && pres(N[0].x, xs[1] + 11.5, 0.001),
    'D2 : rangées de 17,5 pt (libellés sur une ligne), Nb centré en x_Nb + 11,5, Nb et croix en 10,5 pt au milieu + 3,6 (traits ' + lst(rg) + ' ; Nb '
    + N.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2) + '/' + t.sz).join(', ') + ')');
  const p2 = horizontales(L.filter(a => a[1] === 2 && a[0] === 'l')).filter(h => h.x1 === 43.5 && h.x2 === 565.5 && h.y < 100).map(h => h.y);
  R.ok(lst(p2) === '40, 53.25, 66.5, 79.75, 93', 'D2 : page 2 : la boîte de la présentation 2 (rangées de 13,25 pt, côté compris) (' + lst(p2) + ')');
  const Lc = await imprimer(p, 'complet'), TBc = tableau(Lc) || [], Ln = await imprimer(p, ''), TBn = tableau(Ln) || [];
  R.ok(lst(xsVert(TBc)) === lst(FORM_X) && fondsRangees(TBc).length === 11 && entetes(TBc).length === 23,
    'D2 : le même dossier en « Formulaire complet » : le tableau du formulaire (verticales ' + lst(xsVert(TBc)) + ', ' + fondsRangees(TBc).length + ' rangées, ' + entetes(TBc).length + ' en-têtes)');
  R.ok(TBn.length > 0 && JSON.stringify(TBn) === JSON.stringify(TBc), 'D2 : sans choix : le même tableau du formulaire (défaut \'complet\')');
  const eh = ecartHors(L, Lc);
  R.ok(!eh, 'D2 : hors du tableau (page 1 hors de 360 à 620,5, et page 2), le relevé du délesté est celui du formulaire du même dossier, appel par appel, état compris'
    + (eh ? ' (' + eh + ')' : ''));
}

/* ---------- D3 ---------- */
async function d3(p){
  /* aucune ligne active */
  await poser(p, {lignes: {wc: {nb: '0', raccord: 'EU_D'}, gout_av: {nb: '', raccord: 'EP_D'}}});
  let L = await imprimer(p, 'deleste'), TB = tableau(L);
  R.ok(!!TB && TB.length === 0, 'D3 : aucune ligne active : rien du tableau entre 360 et 620,5, ni en-tête ni trait (' + (TB ? TB.length : 'légende ou rubrique absente') + ' appel(s))');
  /* sans rangée ni fond jaune, le délesté laisse le document dans l'état du formulaire : les rectangles qui suivent se relèvent de même */
  let eh = ecartHors(L, await imprimer(p, 'complet'));
  R.ok(!eh, 'D3 : aucune ligne active : hors du tableau, le relevé est celui du formulaire du même dossier, appel par appel, état compris (couleur de fond comprise)'
    + (eh ? ' (' + eh + ')' : ''));

  /* visite non effectuée (refus) : aucune rangée */
  await poser(p, {statut: 'refus', lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}});
  L = await imprimer(p, 'deleste'); TB = tableau(L);
  R.ok(!!TB && TB.length === 0, 'D3 : visite non effectuée (refus), une ligne remplie : rien du tableau (' + (TB ? TB.length : 'légende ou rubrique absente') + ' appel(s))');
  eh = ecartHors(L, await imprimer(p, 'complet'));
  R.ok(!eh, 'D3 : visite non effectuée : hors du tableau, le relevé est celui du formulaire du même dossier, appel par appel, état compris' + (eh ? ' (' + eh + ')' : ''));

  /* ni croix ni conformité */
  await poser(p, {lignes: {wc: {nb: '1'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '2'}]});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  let ent = entetes(TB).map(t => t.t), hz = horizontales(TB).filter(h => h.y <= 402.0005);
  R.ok(ent.join(' | ') === 'Installation | Nb' && proches(xsVert(TB), [65, 521, 544]) && verticales(TB).every(v => v.y1 === 360) && !croixDe(TB).length
    && hz.map(h => h.y + ':' + h.x1 + '-' + h.x2).join(' ') === '360:65-544 402:65-544' && !TB.some(a => a[0] === 'r'),
    'D3 : rangées sans croix ni conformité (raccordement vide) : Installation et Nb seuls, libellés de 456 pt, traits de l\'en-tête en 360 et 402 seulement, sans fond ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + hz.map(h => h.y + ':' + h.x1 + '-' + h.x2).join(' ') + ')');
  eh = ecartHors(L, await imprimer(p, 'complet'));
  R.ok(!eh, 'D3 : ni croix ni conformité (« Conforme » non gardé, sans fond jaune) : hors du tableau, le relevé est celui du formulaire du même dossier, appel par appel, état compris'
    + (eh ? ' (' + eh + ')' : ''));

  /* raccordement inconnu ('plusieurs') : aucune croix « Raccordée sur » ; sa conformité automatique (« non ») reste */
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'plusieurs'}}});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  ent = entetes(TB).map(t => t.t);
  const [wConf] = await mesures(p, [['Conforme', 10]]), xo = 544 - Math.max(25.5, wConf + 4);
  let X = croixDe(TB);
  R.ok(ent.join(' | ') === 'Conforme | Installation | Nb | Non' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && X.length === 1 && pres(X[0].x, (xo + 544) / 2, 0.001),
    'D3 : raccordement « plusieurs » : aucune colonne « Raccordée sur », sa conformité « non » seule (' + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ')');

  /* une seule conformité « oui », sans raccordement */
  await poser(p, {lignes: {wc: {nb: '1', conforme: 'oui'}}});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  ent = entetes(TB).map(t => t.t); hz = horizontales(TB).filter(h => h.y <= 402.0005);
  const fond = TB.filter(a => a[0] === 'r');
  R.ok(ent.join(' | ') === 'Conforme | Installation | Nb | Oui' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && hz.length === 3
    && proches(hz.map(h => h.y), [360, 371, 402]) && proches(hz.map(h => h.x1), [65, xo, 65]) && hz.every(h => h.x2 === 544)
    && fond.length === 1 && pres(fond[0][2], xo, 0.001) && pres(fond[0][4], 544 - xo, 0.001) && JSON.stringify(fond[0][9]) === '[255,255,204]',
    'D3 : une seule conformité « oui » : « Conforme » et Oui seuls, sans Non, trait en 371 sous « Conforme » seulement, fond jaune sous « Conforme » ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + hz.map(h => h.y + ':' + h.x1 + '-' + h.x2).join(' ') + ')');

  /* une ligne EP mise à la main sur « Puits » */
  await poser(p, {lignes: {gout_av: {nb: '1', raccord: 'PUITS'}}});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  ent = entetes(TB).map(t => t.t);
  X = croixDe(TB); const xs = xsVert(TB);
  R.ok(ent.join(' | ') === 'Raccordée sur | Conforme | Installation | Nb | Puits | Non' && xs.length === 5 && X.length === 2
    && pres(X[0].x, (xs[2] + xs[3]) / 2, 0.001) && pres(X[1].x, (xs[3] + xs[4]) / 2, 0.001),
    'D3 : une ligne EP mise à la main sur « Puits » : colonnes Puits et Non, croix au centre (' + ent.join(' | ') + ' ; ' + lst(xs) + ')');

  /* toutes les colonnes employées : comparé au formulaire du même dossier */
  const TOUT = {wc: {nb: '1', raccord: 'EU_D'}, lavelinge: {nb: '1', raccord: 'EU_T'}, evier: {nb: '1', raccord: 'UN_D'}, sdb: {nb: '1', raccord: 'UN_T'}, cuisine: {nb: '1', raccord: 'FOSSE'},
    siphon: {nb: '1', raccord: 'MILIEU'}, gout_av: {nb: '1', raccord: 'EP_D'}, gout_ar: {nb: '1', raccord: 'EP_T'}, grilles: {nb: '1', raccord: 'PUITS'}, siphon_sol: {nb: '1', raccord: 'GARG'}};
  await poser(p, {lignes: TOUT});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  const Lf = await imprimer(p, 'complet'), TF = tableau(Lf) || [];
  const vd = verticales(TB).map(v => [v.x, v.y1]);
  R.ok(vd.length === FORM_V.length && vd.every((v, i) => pres(v[0], FORM_V[i][0], 0.001) && pres(v[1], FORM_V[i][1], 0.001)),
    'D3 : toutes les colonnes employées : les verticales de la présentation 2 à 0,001 pt, chacune dès son rang (' + vd.map(v => v[0] + '/' + v[1]).join(' ') + ')');
  const ed = entetes(TB), ef = entetes(TF);
  const okE = ed.length === ef.length && ed.length === 23 && ed.every((t, i) => t.t === ef[i].t && pres(t.x, ef[i].x, 0.05 + 1e-6) && pres(t.y, ef[i].y, 0.001) && t.sz === ef[i].sz && JSON.stringify(t.col) === JSON.stringify(ef[i].col));
  const ecE = ed.length && ef.length ? Math.max(...ed.map((t, i) => ef[i] ? Math.abs(t.x - ef[i].x) : 99)) : 99;
  R.ok(okE, 'D3 : toutes les colonnes : en-têtes du formulaire, dans son ordre, ses tailles et ses couleurs, à 0,05 pt de leur x (écart maximal ' + ecE.toFixed(3) + ')');
  const xd = Array.from(new Set(croixDe(TB).map(t => t.x))).sort((a, b) => a - b), xf = Array.from(new Set(croixDe(TF).map(t => t.x))).sort((a, b) => a - b);
  R.ok(xd.length === 12 && xf.length === 12 && xd.every((x, i) => pres(x, xf[i], 0.05 + 1e-6)) && croixDe(TB).length === croixDe(TF).length,
    'D3 : toutes les colonnes : croix à 0,05 pt de leur place au formulaire (' + lst(xd) + ' ; formulaire ' + lst(xf) + ')');
  const fd = TB.filter(a => a[0] === 'r'), ff = TF.filter(a => a[0] === 'r'), bas = Math.max(...fondsRangees(TB));
  R.ok(fd.length === 1 && ff.length === 1 && fd[0][2] === ff[0][2] && fd[0][3] === 360 && fd[0][4] === ff[0][4] && pres(fd[0][3] + fd[0][5], bas, 0.001) && TB.indexOf(fd[0]) === 0,
    'D3 : toutes les colonnes : fond jaune sous « Conforme » (493, largeur 51), du haut de l\'en-tête au bas de la dernière rangée, dessiné d\'abord');
  const hauts = await p.evaluate(() => { const T = window.__VT, c = T.S.visites[0].constat, d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
    return c.rows.filter(r => String(r.nb).trim() !== '' && String(r.nb).trim() !== '0').map(r => { d.setFont('times', 'normal'); d.setFontSize(9.5); return d.splitTextToSize(r.label, 100).length === 1 ? 17.5 : 21.5; }); });
  const attR = []; hauts.reduce((y, h) => { attR.push(y + h); return y + h; }, 402);
  R.ok(lst(fondsRangees(TB)) === lst(attR), 'D3 : toutes les colonnes : rangées de 17,5 pt, ou 21,5 pt si le libellé ne tient pas sur une ligne (' + lst(fondsRangees(TB)) + ')');

  /* 30 rangées actives */
  const T30 = {}; Object.keys(TOUT).forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await poser(p, {lignes: T30, ajouts: aj});
  L = await imprimer(p, 'deleste'); TB = tableau(L) || [];
  const rg = fondsRangees(TB), lb = libelles(TB), Nb = nombres(TB), Xc = croixDe(TB);
  const ys = TB.map(a => a[0] === 'l' ? Math.max(a[3], a[5]) : a[0] === 't' ? a[3] : a[0] === 'r' ? a[3] + a[5] : 0);
  R.ok(rg.length === 30 && Math.max(...ys) <= 620.5 + 0.001 && pres(rg[29], 620.5, 0.001), 'D3 : 30 rangées : rien du tableau sous 620,5 (' + rg.length + ' rangées, plus bas ' + Math.max(...ys).toFixed(3) + ')');
  R.ok(lb.length >= 30 && lb.every(t => t.sz <= 8 + 1e-9), 'D3 : 30 rangées : libellés en 8 pt au plus (' + Array.from(new Set(lb.map(t => t.sz))).join(', ') + ')');
  const tailleDe = y => { let h0 = 402; for (const h of rg){ if (y > h0 && y < h) return Math.min(10.5, (h - h0 - 1) / 0.72); h0 = h; } return null; };
  /* h pris sur les traits relevés (au millième) : taille attendue à 0,003 près */
  const mauv = Nb.concat(Xc).filter(t => { const s = tailleDe(t.y); return s === null || Math.abs(t.sz - s) > 0.003; });
  R.ok(Nb.length === 30 && Xc.length === 60 && !mauv.length, 'D3 : 30 rangées : Nb et croix en min(10,5 ; (h − 1) / 0,72) pt (' + Array.from(new Set(Nb.map(t => t.sz))).join(', ') + ' pt ; '
    + mauv.length + ' hors de leur taille)');

  /* cstColonnes appelée directement */
  const c1 = await colonnes(p, [{place: 'MILIEU', conf: ''}], 'longueur');
  const dc = K => K ? K.colonnes.map(k => k.cle + ' ' + +k.x.toFixed(3) + ' ' + +k.w.toFixed(3)).join(', ') : 'absente';
  R.ok(!!c1 && dc(c1) === 'lib 65 387, nb 452 23, MILIEU 475 69', 'D3 : cstColonnes, mesure factice : Milieu seul reçoit le surplus de « Raccordée sur » (69 pt) (' + dc(c1) + ')');
  const c2 = await colonnes(p, [{place: 'UN_D', conf: ''}, {place: 'UN_T', conf: ''}], 'reseau100');
  R.ok(!!c2 && dc(c2) === 'lib 65 352, nb 417 23, UN_D 440 51.75, UN_T 491.75 52.25'
    && c2.verticales.map(v => v.x + '/' + v.dy).join(' ') === '65/0 417/0 440/0 491.75/31 544/0'
    && c2.traits.map(t => t.dy + ':' + t.x1 + '-' + t.x2).join(' ') === '0:65-544 11:440-544 31:440-544 42:65-544',
    'D3 : cstColonnes : le surplus d\'un groupe se partage à parts égales entre ses sous-colonnes ; verticales et traits par rang (' + dc(c2) + ')');
  const c3 = await colonnes(p, [{place: 'EU_D', conf: ''}, {place: 'EU_T', conf: ''}, {place: 'FOSSE', conf: ''}], 'region300');
  R.ok(!!c3 && dc(c3) === 'lib 65 152, nb 217 23, EU_D 240 81.9, EU_T 321.9 82.4, FOSSE 404.3 139.7',
    'D3 : cstColonnes : le surplus d\'une région se partage entre ses groupes, puis entre leurs sous-colonnes (' + dc(c3) + ')');
  const TOUS = ['EU_D', 'EU_T', 'EP_D', 'EP_T', 'UN_D', 'UN_T', 'FOSSE', 'MILIEU', 'PUITS', 'GARG'].map((k, i) => ({place: k, conf: i % 2 ? 'oui' : 'non'}));
  const c4 = await colonnes(p, TOUS, 'tout400');
  const s4 = c4 ? c4.colonnes.reduce((s, k) => s + k.w, 0) : 0;
  R.ok(!!c4 && c4.colonnes.length === 14 && pres(c4.colonnes[0].w, 107.5, 1e-6) && pres(s4, 479, 1e-6) && c4.colonnes.every(k => k.w > 0) && pres(c4.verticales[c4.verticales.length - 1].x, 544, 1e-9),
    'D3 : cstColonnes : en-têtes trop larges : libellés de 107,5 pt au moins, somme 479 (libellés ' + (c4 ? c4.colonnes[0].w.toFixed(3) : '-') + ', somme ' + s4.toFixed(3) + ')');
  const c5 = await colonnes(p, [{place: 'plusieurs', conf: ''}, {place: '', conf: 'aucune'}], 'pdf');
  R.ok(!!c5 && dc(c5) === 'lib 65 456, nb 521 23' && !c5.fond && c5.entetes.map(e => e.t).join() === 'Installation,Nb',
    'D3 : cstColonnes : sans croix ni conformité, Installation et Nb seuls (libellés de 456 pt) (' + dc(c5) + ')');
  const c6 = await colonnes(p, TOUS, 'pdf'), c6b = await colonnes(p, TOUS, 'pdf');
  R.ok(!!c6 && lst(c6.verticales.map(v => v.x)) === lst(FORM_X) && c6.verticales.every((v, i) => pres(v.x, FORM_X[i], 0.001) && v.dy === FORM_V[i][1] - 360)
    && JSON.stringify(c6) === JSON.stringify(c6b), 'D3 : cstColonnes : tout gardé, les verticales de la présentation 2 et leurs rangs ; même résultat à chaque appel');
}

async function casD(){
  const A = await C.ouvrir({fuseau: 'Europe/Paris'}), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await d1(p);
    await d2(p);
    await d3(p);
    R.ok(!A.erreurs.length, 'D1 à D3 : aucune erreur de la page (' + A.erreurs.slice(0, 2).join(' ; ').slice(0, 200) + ')');
  } finally { await A.fermer(); }
}

(async () => {
  try {
    await t0();
    if (!RELEVER) await casD();
  } catch (e){ R.ok(false, 'exception : ' + String(e && e.message || e).split('\n')[0].slice(0, 300)); }
  R.fin();
})();
