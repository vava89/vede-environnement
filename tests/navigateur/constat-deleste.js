// Constat délesté (m158 et m159 ; DL1 à DL9, DL12 à DL16, DL18, DL20 pour la page 1, DL25 et cartes m158 et m159 du § 12 de
// .claude/conception-v173.md), dans l'application (Chromium, données fictives : « Nom Fictif », « 12 rue Fictive », « Ville-Exemple »,
// téléphone fictif). Le PDF est relevé appel par appel (C.relevePdf de commun.js). Les textes fixes du constat n'y sont jamais écrits en
// clair : le témoin les garde par empreinte, les cas D ne nomment que des libellés génériques de la page 1 et les valeurs saisies, et
// un écart sur un relevé entier est dit en empreintes.
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
// Page 1 attendue (m159, DL8 et DL9) : la page 1 du formulaire du même dossier, coupée en rubriques par leurs boîtes au formulaire
//     (en-tête au-dessus de 153,8), puis transformée : en-tête sans gabarit de date, motif seulement si la visite n'est pas effectuée,
//     sa case cochée à la place de la première ; champ vide parti avec son libellé ; catégorie choisie seule, dans une case de 85 × 23,5 ;
//     cases cochées seules, aux premières places (contrôle, désagréments) ou enchaînées dès 245,6 (récupération) ; légende réduite aux
//     codes imprimés ; tableau : celui de cstTableDeleste en 360 + dy, place du calcul ; position entière ; chaque rubrique décalée de son
//     dy. Comparée appel par appel, au 0,004 pt près (arrondis du relevé). Une rubrique remplie au formulaire et absente du calcul
//     (constatDeleste, appelé dans la page comme le dessin, mesure de production), ou l'inverse, est une faute. La page 2 du délesté est
//     celle du formulaire du même dossier, appel par appel, état compris (couleurs, épaisseur, motif) : m160 la changera.
// D1 (DL2, DL3) : liste « Constat imprimé » (#m-cforme) de « En-tête des fiches » : '' « Par défaut (formulaire complet) » en tête et
//     choisie pour une étude neuve, puis « Délesté : seulement ce qui est rempli ou coché » et « Formulaire complet » ; enregistrer sans
//     toucher la liste ne range aucune forme (clé absente) ; « Délesté » range 'deleste', montré à la réouverture ; « Par défaut » retire
//     la clé ; le département, la commune, le logo et une clé posée avant restent (en mémoire et dans la base de la tablette).
// D2 (DL12 à DL15) : constat non signé, étude en « Délesté » : WC (1, EU D, conforme) et une ligne ajoutée « Fontaine » (EP, 1,
//     Gargouille, conforme) : ces deux rangées seules, dans cet ordre, de 17,5 pt ; en-têtes Installation, Nb, Raccordée sur, Réseau EU,
//     D, Gar-, gouille, Conforme et Oui, sans autre ; verticales et largeurs de cstColonnes (somme 479), égales au calcul du test
//     (surplus d'une colonne seule) ; croix au centre de leur colonne (0,1 pt), Nb et croix en 10,5 pt, posés comme au formulaire ;
//     page 2 : la boîte de la présentation 2. Le même dossier en « Formulaire complet », puis sans choix : le tableau du formulaire.
//     m159 : le tableau du délesté se trouve par la description du calcul (en-tête en 360 + dy, rangées dès 402 + dy) ; page 1 attendue.
// D3 : aucune ligne active (désagréments « non ») : ni description ni tableau, et les cases qui suivent gardent le fond du formulaire ;
//     visite non effectuée (refus), une ligne remplie : rien non plus ; ni croix ni conformité : Installation et Nb seuls (libellés de
//     456 pt) ; raccordement « plusieurs » : aucune colonne « Raccordée sur », sa conformité automatique (« non ») seule ; une seule
//     conformité « oui », sans raccordement : « Conforme » et Oui seuls ; une ligne EP mise à la main sur « Puits » : Puits et Non ;
//     toutes les colonnes employées : verticales de la présentation 2 (0,001 pt), en-têtes et croix à 0,05 pt de leur place au
//     formulaire (ordonnées décalées de dy), fond jaune sous « Conforme », rangées de 17,5 pt, ou de 21,5 pt si le libellé ne tient pas
//     sur une ligne ; 30 rangées actives : libellés en 8 pt au plus, rien sous le bas calculé, Nb et croix en min(10,5 ; (h − 1) / 0,72) ;
//     page 1 attendue dans les cas imprimés ; cstColonnes appelée directement (mesures factices) : surplus d'une colonne seule, partage
//     dans un groupe et dans une région, libellés d'au moins 107,5 pt, somme 479, fonction pure.
// D5 (m159) : dossier minimal (« Nom Fictif », adresse du branchement, une ligne active sans méthode, visite effectuée et datée, sans
//     demande) : calcul du nom, de l'adresse et de la description seuls (description en 191,9, place 565,3) ; page 1 attendue ; hors de
//     l'en-tête et du tableau, les libellés du nom et de l'adresse, leurs valeurs et le titre de la description seuls ; ni « Demande du »,
//     ni légende, ni case du motif, ni pointillé, ni gabarit. Le même sans adresse : le nom, puis la description en 171,6 (place 585,6).
// D6 (m159) : dossier complet (identification, catégorie « collectif 21 à 50 », trois méthodes, deux rangées, deux cases de récupération,
//     désagréments « oui » localisés, croquis de position) : calcul direct (ordre, 153,8, écarts, dy, h, place ≥ 234,5, rien sous 816,
//     exemples de la conception : catégorie 254,5-278, contrôle en 285,9, description en 320,2, rangées dès 379, place 257,5, bas en
//     414, récupération en 420,7, désagréments en 438,3, position en 456,1) ; page 1 attendue ; tableau en 360 + dy : celui que
//     cstTableDeleste dessine en 360, décalé de dy ; légende réduite à deux codes sur cinq. Variantes, chacune avec son calcul et sa page 1
//     attendue : mail vide (ligne gardée), adresse du propriétaire vide (ligne partie), sans nom ni référence (adresse en 153,8), rien
//     d'identifié (catégorie en 153,8), désagréments « oui » sans localisation puis « non », catégories habitation, centre hospitalier et
//     propriétés publiques (deux lignes à 9,3 pt l'une de l'autre), catégorie sans nombre (partie) ; 30 rangées, ramenées à la place : les
//     rubriques qui suivent descendent sous leur place du formulaire (récupération en 643,2, dy +16), et sans désagréments ni position,
//     la récupération finit en 816 (805-816, dy +177,8 ; place 419,3).
// D9 (m159 ; E2) : sans plan de terrain, croquis de position, étude en « Délesté » : imprimé module du croquis présent, absent et
//     désactivé (vc-actif, puis réactivé) : trois relevés identiques ; position présente et décalée (image en 40 ; 676 + dy, dy < 0).
// D13 (m159 ; DL20) : refus de visite, dossier par ailleurs complet : identification et catégorie seules au calcul ; le motif « refus »
//     seul, à la première place ; ni « Visite du », ni contrôle, ni tableau, ni récupération, ni désagréments, ni position ; variante :
//     absence, avec ses dates d'absence.
// Échouent sur 74dc8ef (avant m159), 99 contrôles sur 150 : D2, D3 (le tableau et la page 1 attendue), D5, D6, D9 et D13 (pas de
// calcul constatDeleste, page 1 du formulaire). Y passent : T0, D1, les garde-fous du tableau du formulaire et de cstColonnes, la page 2
// (inchangée), l'égalité des trois relevés de D9 (le croquis de terrain n'y change rien, avant comme après) et l'absence d'erreur.
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

/* dossier d'un cas D : constat neuf, non signé, visite effectuée (s.statut sinon) ; s.visite : champs du dossier (nom, tel, mail,
   domicile, domVille, adresse, commune, absences), remis d'abord à ceux du dossier créé (adresse et commune fictives, le reste vide) ;
   s.lignes : {id: champs} des lignes du formulaire ; s.ajouts : lignes ajoutées [{groupe, label, nb, raccord, conforme, methodes}] ;
   s.champs : autres champs du constat */
const poser = (p, s) => p.evaluate(async s => {
  const T = window.__VT, v = T.S.visites[0];
  Object.assign(v, {statut: s.statut || 'visitee', dateVisite: '2026-11-18', absences: [], nom: '', tel: '', mail: '', domicile: '', domVille: '',
    adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'}, s.visite || {});
  delete v.constat; const c = v.constat = T.constatEval(v, []).c;
  Object.keys(s.lignes || {}).forEach(id => Object.assign(c.rows.find(r => r.id === id), s.lignes[id]));
  (s.ajouts || []).forEach((a, i) => c.rows.push(Object.assign({id: 'ajout-fictif-' + (i + 1), std: false, nb: '', raccord: '', conforme: '', methodes: []}, a)));
  Object.assign(c, s.champs || {});
  await T.flushSaves();
}, s);
/* bornes du tableau des installations du formulaire (page 1) : la légende des méthodes (texte de droite en 563 ; 351,2) et la rubrique
   des ouvrages de récupération des EP (premier texte en y 635,2), ou null si l'une manque ; tableau : les appels entre les deux. Depuis
   m159, le tableau d'un délesté se lit par la description du calcul (tableauDel, plus loin) */
function bornes(L){
  const i0 = L.findIndex(a => a[0] === 't' && a[1] === 1 && a[2] === 563 && a[3] === 351.2);
  const i1 = i0 < 0 ? -1 : L.findIndex((a, i) => i > i0 && a[0] === 't' && a[1] === 1 && a[3] === 635.2);
  return i0 >= 0 && i1 > i0 ? [i0, i1] : null;
}
function tableau(L){ const b = bornes(L); return b ? L.slice(b[0] + 1, b[1]) : null; }
const textes = TB => TB.filter(a => a[0] === 't').map(a => ({t: a[4], x: a[2], y: a[3], f: a[5], st: a[6], sz: a[7], col: a[8]}));
const entetes = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'italic');
const libelles = TB => textes(TB).filter(t => t.f === 'times' && t.st === 'normal');
const croixDe = TB => textes(TB).filter(t => t.t === 'X' && t.f !== 'times');
const nombres = TB => textes(TB).filter(t => t.f !== 'times' && t.t !== 'X' && t.sz > 5.5);
const verticales = TB => TB.filter(a => a[0] === 'l' && a[2] === a[4]).map(a => ({x: a[2], y1: Math.min(a[3], a[5]), y2: Math.max(a[3], a[5])}));
const horizontales = TB => TB.filter(a => a[0] === 'l' && a[3] === a[5]).map(a => ({y: a[3], x1: Math.min(a[2], a[4]), x2: Math.max(a[2], a[4])}));
const xsVert = TB => Array.from(new Set(verticales(TB).map(v => v.x))).sort((a, b) => a - b);
/* traits sous les rangées (pleine largeur, sous l'en-tête, qui finit en y0 : 402 au formulaire, 402 + dy au délesté) */
const fondsRangees = (TB, y0) => horizontales(TB).filter(h => h.y > (y0 === undefined ? 402 : y0) + 0.0005 && h.x1 === 65 && h.x2 === 544).map(h => h.y);
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

/* ---------- Outils de la page 1 délestée (m159) ---------- */

/* rubriques de la page 1 (§ 5 de la conception) : [id, haut au formulaire, hauteur délestée (null : description, 58,8 + rangées),
   écart avec la rubrique gardée d'avant, bas au formulaire] ; l'en-tête (15 à 155) est fixe, hors de la liste. Bas de la description
   au formulaire : 627 et non 620,5, car le dernier texte d'un tableau du formulaire très rempli descend un peu sous son dernier trait */
const P1 = [['nomRef', 153.8, 11, 0, 164.8], ['adresse', 174.1, 11, 9.3, 185.1], ['domicile', 194.4, 11, 9.3, 205.4], ['telMail', 214.6, 11, 9.2, 225.6],
  ['typeLog', 238.2, 11, 12.6, 249.2], ['categorie', 254.5, 23.5, 5.3, 301], ['controle', 308.9, 27.5, 7.9, 336.4], ['description', 343.2, null, 6.8, 627],
  ['recuperation', 627.2, 11, 6.7, 638.2], ['desagrements', 644.8, 11, 6.6, 655.8], ['position', 662.6, 137.4, 6.8, 800]];
const IDS = P1.map(e => e[0]);
const P1de = id => P1.find(e => e[0] === id) || [id, 0, 0, 0, 0];
/* plan attendu pour les rubriques ids gardées et des rangées de hauteur naturelle somH : la première en 153,8, chaque suivante au bas
   de la précédente plus son écart ; place de la description : 816 − (son haut + 58,8) − (écart + hauteur) des rubriques qui la suivent */
function planAttendu(ids, somH){
  const G = P1.filter(e => ids.indexOf(e[0]) >= 0), out = [];
  let bas = null;
  G.forEach((e, i) => {
    const haut = bas === null ? 153.8 : bas + e[3], o = {id: e[0], page: 1, dy: haut - e[1], h: e[2]};
    if (e[0] === 'description'){ o.place = 816 - (haut + 58.8) - G.slice(i + 1).reduce((a, f) => a + f[3] + f[2], 0); o.h = 58.8 + Math.min(somH, o.place); }
    out.push(o); bas = haut + o.h;
  });
  return out;
}
/* deux plans égaux (1e-6 près), sans autre clé que id, page, dy, h et place (description seule) */
const plansEgaux = (a, b) => Array.isArray(a) && a.length === b.length && a.every((e, i) => e.id === b[i].id && e.page === 1 && pres(e.dy, b[i].dy, 1e-6)
  && pres(e.h, b[i].h, 1e-6) && (b[i].place === undefined ? !('place' in e) : pres(e.place, b[i].place, 1e-6))
  && Object.keys(e).every(k => ['id', 'page', 'dy', 'h', 'place'].indexOf(k) >= 0));
/* plan dit court : rubrique, haut + hauteur, place */
const dire = plan => Array.isArray(plan) ? plan.map(e => e.id + ' ' + +(P1de(e.id)[1] + e.dy).toFixed(3) + '+' + +Number(e.h).toFixed(3)
  + (e.place !== undefined ? ' (place ' + +Number(e.place).toFixed(3) + ')' : '')).join(', ') : 'pas de calcul';
/* propriétés du plan : place d'au moins 234,5, rien sous 816 ; rend la faute ou '' */
const proprietes = plan => { if (!Array.isArray(plan) || !plan.length) return 'plan vide ou absent';
  const d = plan.find(e => e.id === 'description'), z = plan[plan.length - 1], bas = P1de(z.id)[1] + z.dy + z.h;
  return d && !(d.place >= 234.5 - 1e-9) ? 'place ' + d.place + ' sous 234,5' : bas > 816 + 1e-6 ? 'bas ' + bas + ' sous 816' : ''; };
/* calcul de la page 1 par la page, comme le dessin : constatDeleste(vv, E, mesure de production d'un document neuf) ; null s'il manque
   une fonction (version d'avant m159) */
const calcul = p => p.evaluate(() => {
  const T = window.__VT, v = T.S.visites[0];
  if (!['constatDeleste', 'constatPourDessin', 'cstMesure', 'newPdf', 'anomsOf'].every(f => typeof T[f] === 'function')) return null;
  const D = T.constatPourDessin(v, T.anomsOf(v.id));
  return JSON.parse(JSON.stringify(T.constatDeleste(D.vv, D.E, T.cstMesure(T.newPdf()))));
});
/* relevé du seul tableau délesté du dossier, cstTableDeleste(doc, E, haut, place) sur un document neuf, par C.relevePdf : le PDF du
   bouton est remplacé le temps du relevé ; null s'il manque une fonction */
async function releveTable(p, haut, place){
  const ok = await p.evaluate(([haut, place]) => {
    const T = window.__VT;
    if (!['cstTableDeleste', 'constatPourDessin', 'newPdf', 'anomsOf'].every(f => typeof T[f] === 'function')) return false;
    window.__blobAvantTest = T.constatPdfBlob;
    T.constatPdfBlob = async v => { const D = T.constatPourDessin(v, T.anomsOf(v.id)); T.cstTableDeleste(T.newPdf(), D.E, haut, place); return null; };
    return true;
  }, [haut, place]);
  if (!ok) return null;
  try { return await C.relevePdf(p); }
  finally { await p.evaluate(() => { window.__VT.constatPdfBlob = window.__blobAvantTest; delete window.__blobAvantTest; }); }
}
/* somme des hauteurs naturelles des rangées : tableau sans limite, en-tête en 0, dernier trait des rangées moins 42 */
const sommeNaturelle = async p => { const L = await releveTable(p, 0, 1e6); if (!L) return null; const rg = fondsRangees(L, 42); return rg.length ? Math.max(...rg) - 42 : 0; };
/* ordonnée qui range un appel dans une rubrique : texte et rectangle par leur y, trait par son point le plus haut, image par son y */
const yRef = a => a[0] === 't' || a[0] === 'r' ? a[3] : a[0] === 'l' ? Math.min(a[3], a[5]) : a[0] === 'i' ? a[5] : null;
/* appels d'une page 1 coupés par rubriques : en-tête au-dessus de 153,8, puis chaque appel dans la boîte [id, haut, bas] qui le contient ;
   rend {entete, seg: {id: appels}, faute} (faute : appel hors de toute boîte, ou rubriques dans le désordre) */
function decouper(L1, boites){
  const seg = {}, entete = []; let k = -1, faute = '';
  boites.forEach(b => { seg[b[0]] = []; });
  L1.forEach((a, i) => {
    const y = yRef(a), ou = 'appel ' + (i + 1) + ' (' + a[0] + ', y ' + y + ')';
    if (y === null){ faute = faute || ou + ' sans ordonnée'; return; }
    if (y < 153.8 - 0.002){ if (k >= 0) faute = faute || ou + ' : en-tête après les rubriques'; entete.push(a); return; }
    const j = boites.findIndex(b => y >= b[1] - 0.002 && y <= b[2] + 0.002);
    if (j < 0){ faute = faute || ou + ' hors de toute boîte'; return; }
    if (j < k) faute = faute || ou + ' : ' + boites[j][0] + ' après ' + boites[k][0];
    k = Math.max(k, j); seg[boites[j][0]].push(a);
  });
  return {entete, seg, faute};
}
/* appel décalé de dx en x et de dy en y (copie) */
const decale = (a, dx, dy) => { const b = a.slice();
  if (a[0] === 't' || a[0] === 'r'){ b[2] = a[2] + dx; b[3] = a[3] + dy; }
  else if (a[0] === 'l'){ b[2] = a[2] + dx; b[3] = a[3] + dy; b[4] = a[4] + dx; b[5] = a[5] + dy; }
  else if (a[0] === 'i'){ b[4] = a[4] + dx; b[5] = a[5] + dy; }
  return b; };
/* pointillé de cDots (motif [0,6 ; 1,8]) */
const pointille = a => a[0] === 'l' && JSON.stringify(a[8]) === '[[0.6,1.8],0]';
const GABARIT = /…\.{4}\//;
/* case à cocher relevée dès l'appel i (cOpt : rectangle, deux traits si elle est cochée, texte) : {appels, x, coche}, ou null */
const caseDe = (S, i) => { if (!S[i] || S[i][0] !== 'r') return null;
  const coche = !!S[i + 1] && S[i + 1][0] === 'l', n = coche ? 4 : 2, A = S.slice(i, i + n);
  return A.length === n && A[n - 1][0] === 't' && (!coche || A[2][0] === 'l') ? {appels: A, x: S[i][2], coche} : null; };
const casesDe = (S, i) => { const out = []; let c; while ((c = caseDe(S, i))){ out.push(c); i += c.appels.length; } return out; };
const nAppels = cs => cs.reduce((s, c) => s + c.appels.length, 0);
/* en-tête attendu : sans gabarit de date ; motif (libellé en 220,4 ; 141,5 et ses cases) gardé seulement avec une case cochée, mise à la
   place de la première case ; le reste tel quel */
function attenduEntete(E0){
  const out = []; let i = 0;
  while (i < E0.length){
    const a = E0[i];
    if (a[0] === 't' && GABARIT.test(a[4])){ i++; continue; }
    if (a[0] === 't' && a[2] === 220.4 && a[3] === 141.5){
      const cs = casesDe(E0, i + 1), cc = cs.filter(c => c.coche);
      if (cs.length !== 3) return null;
      if (cc.length){ out.push(a); cc[0].appels.forEach(b => out.push(decale(b, cs[0].x - cc[0].x, 0))); }
      i += 1 + nAppels(cs); continue;
    }
    out.push(a); i++;
  }
  return out;
}
/* identification, type et logements : libellé (et son soulignement), puis valeur (texte, ou pointillé si vide) ; un groupe n'est gardé
   qu'avec une valeur écrite, décalé de dy ; null si le formulaire n'a pas cette forme */
function attenduIdent(S, dy){
  const out = []; let i = 0;
  while (i < S.length){
    if (S[i][0] !== 't') return null;
    let j = i + 1;
    if (S[j] && S[j][0] === 'l' && !pointille(S[j]) && pres(S[j][3], S[i][3] + 1.4, 0.002)) j++;
    const val = S[j];
    if (!val || (val[0] !== 't' && !pointille(val))) return null;
    if (val[0] === 't') S.slice(i, j + 1).forEach(a => out.push(decale(a, 0, dy)));
    i = j + 1;
  }
  return out;
}
/* catégorie : le nombre (9,5 pt, bleu) et son libellé (deux lignes à 9,3 pt pour une propriété publique), au même écart du coin de leur
   case de la grille que du coin de la case délestée (49,5 ; 254,5 + dy) ; d'abord ses quatre traits, dans l'état du premier trait de la
   grille */
const GX = [49.5, 134.5, 219.5, 304.5, 389.5, 474.5];
function attenduCateg(S, dy){
  const traits = S.filter(a => a[0] === 'l'), T = S.filter(a => a[0] === 't');
  const k = T.findIndex(a => a[7] === 9.5 && JSON.stringify(a[8]) === '[0,0,255]');
  if (k < 0) return [];
  if (k < 1 || !traits.length) return null;
  const lab = [T[k - 1]];
  if (k >= 2 && T[k - 2][2] === T[k - 1][2] && pres(T[k - 1][3] - T[k - 2][3], 9.3, 0.002)) lab.unshift(T[k - 2]);
  const gx = Math.max(...GX.filter(x => x <= lab[0][2] + 1e-9)), gy = lab[0][3] < 278 ? 254.5 : 278;
  const tr = (x1, y1, x2, y2) => { const b = traits[0].slice(); b[2] = x1; b[3] = y1 + dy; b[4] = x2; b[5] = y2 + dy; return b; };
  return [tr(49.5, 254.5, 134.5, 254.5), tr(49.5, 278, 134.5, 278), tr(49.5, 254.5, 49.5, 278), tr(134.5, 254.5, 134.5, 278)]
    .concat(lab.concat([T[k]]).map(a => decale(a, 49.5 - gx, 254.5 - gy + dy)));
}
/* contrôle : titre (texte et soulignement), puis les méthodes cochées aux premières places */
const PLACES_METH = [70.9, 170.2, 269.4, 368.7, 453.8];
function attenduControle(S, dy){
  const cs = casesDe(S, 2), cc = cs.filter(c => c.coche);
  if (cs.length !== 5 || 2 + nAppels(cs) !== S.length) return null;
  if (!cc.length) return [];
  const out = S.slice(0, 2).map(a => decale(a, 0, dy));
  cc.forEach((c, k) => c.appels.forEach(a => out.push(decale(a, PLACES_METH[k] - c.x, dy))));
  return out;
}
/* description : titre (texte et soulignement), légende réduite aux codes de méthode du tableau de référence (aucune sans code), puis ce
   tableau (cstTableDeleste en 360 + dy, déjà à sa place) ; rien sans tableau */
function attenduDescription(S, dy, ref){
  if (!ref || !ref.length) return [];
  if (S.length < 3 || S[0][0] !== 't' || S[1][0] !== 'l' || S[2][0] !== 't' || S[2][2] !== 563 || S[2][3] !== 351.2) return null;
  const codes = new Set();
  ref.filter(a => a[0] === 't' && a[7] === 5.5).forEach(a => a[4].split(' ').forEach(k => codes.add(k)));
  const leg = S[2], i = leg[4].indexOf(' : '), mots = leg[4].slice(i + 3).split(', ').filter(m => codes.has(m.split(' ')[0]));
  const out = S.slice(0, 2).map(a => decale(a, 0, dy));
  if (mots.length){ const b = decale(leg, 0, dy); b[4] = leg[4].slice(0, i + 3) + mots.join(', '); out.push(b); }
  return out.concat(ref);
}
/* récupération des EP : libellé souligné et « : », puis les cases cochées enchaînées dès 245,6 (pas du formulaire : largeur de la case
   et 9 pt, lus sur les places du formulaire) */
function attenduRecup(S, dy){
  const cs = casesDe(S, 3), cc = cs.filter(c => c.coche);
  if (cs.length !== 4 || 3 + nAppels(cs) !== S.length) return null;
  if (!cc.length) return [];
  const out = S.slice(0, 3).map(a => decale(a, 0, dy));
  let x = 245.6;
  cc.forEach(c => { const j = cs.indexOf(c); c.appels.forEach(a => out.push(decale(a, x - c.x, dy))); if (j + 1 < cs.length) x += cs[j + 1].x - c.x; });
  return out;
}
/* désagréments : les deux textes, la case choisie à la place de la première, et la localisation écrite si « oui » est choisi */
function attenduDesagr(S, dy){
  const cs = casesDe(S, 2);
  if (cs.length !== 2) return null;
  const k = cs.findIndex(c => c.coche), val = S[2 + nAppels(cs)];
  if (k < 0) return [];
  const out = S.slice(0, 2).map(a => decale(a, 0, dy)), dx = cs[0].x - cs[k].x;
  cs[k].appels.forEach(a => out.push(decale(a, dx, dy)));
  if (k === 1 && val && val[0] === 't') out.push(decale(val, dx, dy));
  return out;
}
/* position : toute la rubrique, décalée, seulement avec le croquis (une image) */
const attenduPosition = (S, dy) => S.some(a => a[0] === 'i') ? S.map(a => decale(a, 0, dy)) : [];
/* page 1 attendue : {att: [[rubrique, appel]], faute} d'après la page 1 du formulaire du même dossier (Lc1), le plan et le tableau de
   référence ; faute : formulaire d'une autre forme, rubrique remplie au formulaire et absente du calcul, ou calculée sans contenu */
function attenduP1(Lc1, plan, ref){
  const D = decouper(Lc1, P1.map(e => [e[0], e[1], e[4]]));
  if (D.faute) return {att: [], faute: 'formulaire : ' + D.faute};
  const pl = {}, fautes = [], E0 = attenduEntete(D.entete);
  (plan || []).forEach(e => { pl[e.id] = e; });
  if (!E0) return {att: [], faute: 'en-tête du formulaire inattendu'};
  const att = E0.map(a => ['en-tête', a]);
  P1.forEach(e => {
    const id = e[0], dy = pl[id] ? pl[id].dy : 0, S = D.seg[id];
    const A = id === 'categorie' ? attenduCateg(S, dy) : id === 'controle' ? attenduControle(S, dy) : id === 'description' ? attenduDescription(S, dy, ref)
      : id === 'recuperation' ? attenduRecup(S, dy) : id === 'desagrements' ? attenduDesagr(S, dy) : id === 'position' ? attenduPosition(S, dy) : attenduIdent(S, dy);
    if (A === null){ fautes.push(id + ' : formulaire inattendu'); return; }
    if (A.length && !pl[id]) fautes.push(id + ' : rempli au formulaire, absent du calcul');
    if (!A.length && pl[id]) fautes.push(id + ' : au calcul, sans contenu');
    A.forEach(a => att.push([id, a]));
  });
  return {att, faute: fautes.join(' ; ')};
}
/* deux appels égaux : même genre et mêmes valeurs, nombres au 0,004 pt près (arrondis au millième du relevé, cumulés) */
const TOL = 0.004;
const egal = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length
  && a.every((x, i) => typeof x === 'number' && typeof b[i] === 'number' ? Math.abs(x - b[i]) <= TOL : JSON.stringify(x) === JSON.stringify(b[i]));
/* premier écart entre un relevé et l'attendu (noms : rubrique de chaque appel attendu), dit en empreintes, ou '' */
function ecartTol(L, att, noms){
  const e = a => a ? JSON.stringify(empreintes([a], [])[0]) : 'aucun';
  for (let i = 0; i < Math.max(L.length, att.length); i++) if (!egal(L[i], att[i]))
    return (noms && noms[Math.min(i, noms.length - 1)] ? noms[Math.min(i, noms.length - 1)] + ', ' : '') + 'appel ' + (i + 1) + ' : ' + e(L[i]) + ' au lieu de ' + e(att[i])
      + ' (' + L.length + ' appels, ' + att.length + ' attendus)';
  return '';
}
/* premier écart entre les pages 2 de deux relevés (page neuve comprise), en empreintes, ou '' */
const ecartP2 = (Ld, Lc) => C.premierEcart(empreintes(Ld.filter(a => a[1] === 2), []), empreintes(Lc.filter(a => a[1] === 2), []));
/* un dossier imprimé deux fois : délesté (L) et formulaire (Lc), avec le calcul (plan), la description du calcul (d) et le tableau de
   référence (ref : cstTableDeleste en 360 + dy, place du calcul ; sans description du calcul, en 360 sur la place du formulaire) */
async function deux(p){
  const L = await imprimer(p, 'deleste'), plan = await calcul(p), Lc = await imprimer(p, 'complet');
  const d = Array.isArray(plan) ? plan.find(e => e.id === 'description') || null : null;
  const ref = d ? await releveTable(p, 360 + d.dy, 42 + d.place) : await releveTable(p, 360, 260.5);
  return {L, plan, Lc, d, ref: ref || []};
}
/* contrôles communs d'un dossier : propriétés du calcul, page 1 attendue, page 2 du formulaire */
function verifP1(nom, X){
  const pr = proprietes(X.plan);
  R.ok(!pr, nom + ' : calcul : place d\'au moins 234,5, rien de la page 1 sous 816 (' + (pr || dire(X.plan)) + ')');
  const A = attenduP1(X.Lc.filter(a => a[1] === 1), X.plan, X.ref);
  const e = A.faute || ecartTol(X.L.filter(a => a[1] === 1), A.att.map(x => x[1]), A.att.map(x => x[0]));
  R.ok(!!X.plan && !e, nom + ' : page 1 délestée : chaque rubrique gardée vaut celle du formulaire du même dossier, transformée et décalée de son dy'
    + (X.plan ? '' : ' (pas de calcul constatDeleste)') + (e ? ' (' + e + ')' : ''));
  const e2 = ecartP2(X.L, X.Lc);
  R.ok(!e2, nom + ' : page 2 du délesté : celle du formulaire du même dossier, appel par appel, état compris' + (e2 ? ' (' + e2 + ')' : ''));
}
/* appels de la page 1 dans le tableau délesté : entre 360 + dy et le bas de la description du calcul */
const tableauDel = (L, d) => d ? L.filter(a => { const y = a[1] === 1 ? yRef(a) : null; return y !== null && y >= 360 + d.dy - 0.002 && y <= 343.2 + d.dy + d.h + 0.002; }) : null;
/* texte de la page 1 posé en (x ; y) au formulaire (titre de la description : 42,6 ; 351,2), ou null */
const texteEn = (L, x, y) => { const a = L.find(a => a[0] === 't' && a[1] === 1 && a[2] === x && a[3] === y); return a ? a[4] : null; };
const dit = t => FICTIFS.indexOf(t) >= 0 ? t : H(t);

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
  const X = await deux(p), L = X.L, d = X.d, dy = d ? d.dy : 0, TB = tableauDel(L, d) || [];
  const lib = libelles(TB).map(t => t.t), ent = entetes(TB).map(t => t.t);
  R.ok(!!d && lib.join(' | ') === 'WC | Fontaine', 'D2 : seules les rangées WC et « Fontaine » s\'impriment, dans cet ordre, dans le tableau de la description du calcul ('
    + lib.join(' | ') + ' ; ' + dire(X.plan) + ')');
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
  const cx = xs.slice(0, -1).map((x, i) => (x + xs[i + 1]) / 2), Xc = croixDe(TB), rg = fondsRangees(TB, 402 + dy);
  const ok = Xc.length === 4 && [[2, 0], [4, 0], [3, 1], [4, 1]].every(([k, r]) => Xc.some(t => pres(t.x, cx[k], 0.1) && t.y > (r ? rg[0] : 402 + dy) && t.y < rg[r]));
  R.ok(ok, 'D2 : croix au centre de leur colonne à 0,1 pt (WC : D et Oui ; Fontaine : Gargouille et Oui) (' + Xc.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2)).join(', ') + ' ; centres ' + lst(cx) + ')');
  const N = nombres(TB);
  R.ok(!!d && rg.length === 2 && pres(rg[0], 419.5 + dy, 0.001) && pres(rg[1], 437 + dy, 0.001) && N.length === 2 && N.concat(Xc).every(t => t.sz === 10.5)
    && pres(N[0].y, 402 + dy + 8.75 + 3.6, 0.001) && pres(N[1].y, 419.5 + dy + 8.75 + 3.6, 0.001) && pres(N[0].x, xs[1] + 11.5, 0.001),
    'D2 : rangées de 17,5 pt (libellés sur une ligne) en 419,5 + dy et 437 + dy, Nb centré en x_Nb + 11,5, Nb et croix en 10,5 pt au milieu + 3,6 (dy ' + dy + ' ; traits ' + lst(rg) + ' ; Nb '
    + N.map(t => t.x.toFixed(2) + '/' + t.y.toFixed(2) + '/' + t.sz).join(', ') + ')');
  const p2 = horizontales(L.filter(a => a[1] === 2 && a[0] === 'l')).filter(h => h.x1 === 43.5 && h.x2 === 565.5 && h.y < 100).map(h => h.y);
  R.ok(lst(p2) === '40, 53.25, 66.5, 79.75, 93', 'D2 : page 2 : la boîte de la présentation 2 (rangées de 13,25 pt, côté compris) (' + lst(p2) + ')');
  const Lc = X.Lc, TBc = tableau(Lc) || [], Ln = await imprimer(p, ''), TBn = tableau(Ln) || [];
  R.ok(lst(xsVert(TBc)) === lst(FORM_X) && fondsRangees(TBc).length === 11 && entetes(TBc).length === 23,
    'D2 : le même dossier en « Formulaire complet » : le tableau du formulaire (verticales ' + lst(xsVert(TBc)) + ', ' + fondsRangees(TBc).length + ' rangées, ' + entetes(TBc).length + ' en-têtes)');
  R.ok(TBn.length > 0 && JSON.stringify(TBn) === JSON.stringify(TBc), 'D2 : sans choix : le même tableau du formulaire (défaut \'complet\')');
  verifP1('D2', X);
}

/* ---------- D3 ---------- */
async function d3(p){
  /* aucune ligne active ; désagréments « non » : ses cases, après la description absente, gardent le fond du formulaire */
  await poser(p, {lignes: {wc: {nb: '0', raccord: 'EU_D'}, gout_av: {nb: '', raccord: 'EP_D'}}, champs: {desagr: 'non'}});
  let X = await deux(p), titre = texteEn(X.Lc, 42.6, 351.2);
  const sansDesc = X => !!X.plan && !X.d && !X.ref.length && !!titre && !X.L.some(a => a[0] === 't' && a[1] === 1 && a[4] === titre);
  R.ok(sansDesc(X), 'D3 : aucune ligne active : ni description au calcul, ni titre, ni tableau (' + dire(X.plan) + ')');
  verifP1('D3 (aucune ligne active)', X);

  /* visite non effectuée (refus) : aucune rangée */
  await poser(p, {statut: 'refus', lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}});
  X = await deux(p);
  R.ok(sansDesc(X), 'D3 : visite non effectuée (refus), une ligne remplie : ni description au calcul, ni titre, ni tableau (' + dire(X.plan) + ')');
  verifP1('D3 (refus, une ligne remplie)', X);

  /* ni croix ni conformité */
  await poser(p, {lignes: {wc: {nb: '1'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '2'}]});
  X = await deux(p);
  let d = X.d, dy = d ? d.dy : 0, TB = tableauDel(X.L, d) || [];
  let ent = entetes(TB).map(t => t.t), hz = horizontales(TB).filter(h => h.y <= 402 + dy + 0.0005);
  const dh = hz => hz.map(h => +(h.y - dy).toFixed(3) + ':' + h.x1 + '-' + h.x2).join(' ');
  R.ok(!!d && ent.join(' | ') === 'Installation | Nb' && proches(xsVert(TB), [65, 521, 544]) && verticales(TB).every(v => pres(v.y1, 360 + dy, 0.001)) && !croixDe(TB).length
    && dh(hz) === '360:65-544 402:65-544' && !TB.some(a => a[0] === 'r'),
    'D3 : rangées sans croix ni conformité (raccordement vide) : Installation et Nb seuls, libellés de 456 pt, traits de l\'en-tête en 360 + dy et 402 + dy seulement, sans fond ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + dh(hz) + ')');
  verifP1('D3 (ni croix ni conformité, sans fond jaune)', X);

  /* raccordement inconnu ('plusieurs') : aucune croix « Raccordée sur » ; sa conformité automatique (« non ») reste */
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'plusieurs'}}});
  X = await deux(p); TB = tableauDel(X.L, X.d) || [];
  ent = entetes(TB).map(t => t.t);
  const [wConf] = await mesures(p, [['Conforme', 10]]), xo = 544 - Math.max(25.5, wConf + 4);
  let Xc = croixDe(TB);
  R.ok(ent.join(' | ') === 'Conforme | Installation | Nb | Non' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && Xc.length === 1 && pres(Xc[0].x, (xo + 544) / 2, 0.001),
    'D3 : raccordement « plusieurs » : aucune colonne « Raccordée sur », sa conformité « non » seule (' + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ')');

  /* une seule conformité « oui », sans raccordement */
  await poser(p, {lignes: {wc: {nb: '1', conforme: 'oui'}}});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  ent = entetes(TB).map(t => t.t); hz = horizontales(TB).filter(h => h.y <= 402 + dy + 0.0005);
  const fond = TB.filter(a => a[0] === 'r');
  R.ok(!!d && ent.join(' | ') === 'Conforme | Installation | Nb | Oui' && proches(xsVert(TB), [65, xo - 23, xo, 544]) && hz.length === 3
    && proches(hz.map(h => h.y - dy), [360, 371, 402]) && proches(hz.map(h => h.x1), [65, xo, 65]) && hz.every(h => h.x2 === 544)
    && fond.length === 1 && pres(fond[0][2], xo, 0.001) && pres(fond[0][4], 544 - xo, 0.001) && JSON.stringify(fond[0][9]) === '[255,255,204]',
    'D3 : une seule conformité « oui » : « Conforme » et Oui seuls, sans Non, trait en 371 + dy sous « Conforme » seulement, fond jaune sous « Conforme » ('
    + ent.join(' | ') + ' ; ' + lst(xsVert(TB)) + ' ; ' + dh(hz) + ')');

  /* une ligne EP mise à la main sur « Puits » */
  await poser(p, {lignes: {gout_av: {nb: '1', raccord: 'PUITS'}}});
  X = await deux(p); TB = tableauDel(X.L, X.d) || [];
  ent = entetes(TB).map(t => t.t);
  Xc = croixDe(TB); const xs = xsVert(TB);
  R.ok(ent.join(' | ') === 'Raccordée sur | Conforme | Installation | Nb | Puits | Non' && xs.length === 5 && Xc.length === 2
    && pres(Xc[0].x, (xs[2] + xs[3]) / 2, 0.001) && pres(Xc[1].x, (xs[3] + xs[4]) / 2, 0.001),
    'D3 : une ligne EP mise à la main sur « Puits » : colonnes Puits et Non, croix au centre (' + ent.join(' | ') + ' ; ' + lst(xs) + ')');

  /* toutes les colonnes employées : comparé au formulaire du même dossier */
  const TOUT = {wc: {nb: '1', raccord: 'EU_D'}, lavelinge: {nb: '1', raccord: 'EU_T'}, evier: {nb: '1', raccord: 'UN_D'}, sdb: {nb: '1', raccord: 'UN_T'}, cuisine: {nb: '1', raccord: 'FOSSE'},
    siphon: {nb: '1', raccord: 'MILIEU'}, gout_av: {nb: '1', raccord: 'EP_D'}, gout_ar: {nb: '1', raccord: 'EP_T'}, grilles: {nb: '1', raccord: 'PUITS'}, siphon_sol: {nb: '1', raccord: 'GARG'}};
  await poser(p, {lignes: TOUT});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  const TF = tableau(X.Lc) || [];
  const vd = verticales(TB).map(v => [v.x, v.y1 - dy]);
  R.ok(!!d && vd.length === FORM_V.length && vd.every((v, i) => pres(v[0], FORM_V[i][0], 0.001) && pres(v[1], FORM_V[i][1], 0.001)),
    'D3 : toutes les colonnes employées : les verticales de la présentation 2 à 0,001 pt, chacune dès son rang décalé de dy (' + vd.map(v => v[0] + '/' + +v[1].toFixed(3)).join(' ') + ')');
  const ed = entetes(TB), ef = entetes(TF);
  const okE = ed.length === ef.length && ed.length === 23 && ed.every((t, i) => t.t === ef[i].t && pres(t.x, ef[i].x, 0.05 + 1e-6) && pres(t.y - dy, ef[i].y, 0.001) && t.sz === ef[i].sz && JSON.stringify(t.col) === JSON.stringify(ef[i].col));
  const ecE = ed.length && ef.length ? Math.max(...ed.map((t, i) => ef[i] ? Math.abs(t.x - ef[i].x) : 99)) : 99;
  R.ok(okE, 'D3 : toutes les colonnes : en-têtes du formulaire, dans son ordre, ses tailles et ses couleurs, à 0,05 pt de leur x, ordonnées décalées de dy (écart maximal ' + ecE.toFixed(3) + ')');
  const xd = Array.from(new Set(croixDe(TB).map(t => t.x))).sort((a, b) => a - b), xf = Array.from(new Set(croixDe(TF).map(t => t.x))).sort((a, b) => a - b);
  R.ok(xd.length === 12 && xf.length === 12 && xd.every((x, i) => pres(x, xf[i], 0.05 + 1e-6)) && croixDe(TB).length === croixDe(TF).length,
    'D3 : toutes les colonnes : croix à 0,05 pt de leur place au formulaire (' + lst(xd) + ' ; formulaire ' + lst(xf) + ')');
  const fd = TB.filter(a => a[0] === 'r'), ff = TF.filter(a => a[0] === 'r'), bas = Math.max(...fondsRangees(TB, 402 + dy));
  R.ok(fd.length === 1 && ff.length === 1 && fd[0][2] === ff[0][2] && pres(fd[0][3], 360 + dy, 0.001) && fd[0][4] === ff[0][4] && pres(fd[0][3] + fd[0][5], bas, 0.001) && TB.indexOf(fd[0]) === 0,
    'D3 : toutes les colonnes : fond jaune sous « Conforme » (493, largeur 51), du haut de l\'en-tête (360 + dy) au bas de la dernière rangée, dessiné d\'abord');
  const hauts = await p.evaluate(() => { const T = window.__VT, c = T.S.visites[0].constat, d = new window.jspdf.jsPDF({unit: 'pt', format: 'a4'});
    return c.rows.filter(r => String(r.nb).trim() !== '' && String(r.nb).trim() !== '0').map(r => { d.setFont('times', 'normal'); d.setFontSize(9.5); return d.splitTextToSize(r.label, 100).length === 1 ? 17.5 : 21.5; }); });
  const attR = []; hauts.reduce((y, h) => { attR.push(y + h); return y + h; }, 402 + dy);
  R.ok(!!d && proches(fondsRangees(TB, 402 + dy), attR), 'D3 : toutes les colonnes : rangées de 17,5 pt, ou 21,5 pt si le libellé ne tient pas sur une ligne, dès 402 + dy ('
    + lst(fondsRangees(TB, 402 + dy)) + ')');
  verifP1('D3 (toutes les colonnes)', X);

  /* 30 rangées actives */
  const T30 = {}; Object.keys(TOUT).forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await poser(p, {lignes: T30, ajouts: aj});
  X = await deux(p); d = X.d; dy = d ? d.dy : 0; TB = tableauDel(X.L, d) || [];
  const rg = fondsRangees(TB, 402 + dy), lb = libelles(TB), Nb = nombres(TB), X30 = croixDe(TB), basC = d ? 343.2 + d.dy + d.h : 0;
  const ys = TB.map(a => a[0] === 'l' ? Math.max(a[3], a[5]) : a[0] === 't' ? a[3] : a[0] === 'r' ? a[3] + a[5] : 0);
  R.ok(!!d && rg.length === 30 && Math.max(...ys) <= basC + 0.001 && pres(rg[29], basC, 0.001) && pres(d.h, 58.8 + d.place, 1e-6),
    'D3 : 30 rangées : ramenées à la place du calcul, rien du tableau sous le bas calculé (' + rg.length + ' rangées, plus bas ' + (ys.length ? Math.max(...ys).toFixed(3) : '-') + ' ; bas calculé '
    + basC.toFixed(3) + ')');
  R.ok(lb.length >= 30 && lb.every(t => t.sz <= 8 + 1e-9), 'D3 : 30 rangées : libellés en 8 pt au plus (' + Array.from(new Set(lb.map(t => t.sz))).join(', ') + ')');
  const tailleDe = y => { let h0 = 402 + dy; for (const h of rg){ if (y > h0 && y < h) return Math.min(10.5, (h - h0 - 1) / 0.72); h0 = h; } return null; };
  /* h pris sur les traits relevés (au millième) : taille attendue à 0,003 près */
  const mauv = Nb.concat(X30).filter(t => { const s = tailleDe(t.y); return s === null || Math.abs(t.sz - s) > 0.003; });
  R.ok(Nb.length === 30 && X30.length === 60 && !mauv.length, 'D3 : 30 rangées : Nb et croix en min(10,5 ; (h − 1) / 0,72) pt (' + Array.from(new Set(Nb.map(t => t.sz))).join(', ') + ' pt ; '
    + mauv.length + ' hors de leur taille)');
  verifP1('D3 (30 rangées)', X);

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

/* ---------- D5 à D13 : page 1 délestée (m159) ---------- */

/* dossier complet (D6, D13), fictif : identification, catégorie « collectif 21 à 50 », méthodes (visuel et résonance par les rangées,
   eau cochée), deux rangées, deux cases de récupération sur quatre, désagréments « oui » localisés, croquis de position */
const COMPLET = {visite: {nom: 'Nom Fictif', tel: '06 39 98 12 34', mail: 'nom.fictif@exemple.org', domicile: '12 rue Fictive', domVille: '99000 Ville-Exemple',
  adresse: '12 rue Fictive', commune: '99000 Ville-Exemple'},
  lignes: {wc: {nb: '1', raccord: 'EU_D', methodes: ['visuel']}, gout_av: {nb: '1', raccord: 'GARG', methodes: ['reso']}},
  champs: {demande: '10/11/2026', refCad: 'Parcelle fictive 12', typePropriete: 'Maison fictive', nbLogements: '1', categorie: 'c50', categorieNb: '3', methodes: {eau: true},
    epRecup: {recup: true, autre: true}, desagr: 'oui', desagrLoc: 'Cave fictive', croquis: SIG}};
/* le dossier complet, changé par o (statut, visite, lignes, ajouts, champs) */
const avec = o => ({statut: o.statut, visite: Object.assign({}, COMPLET.visite, o.visite), lignes: o.lignes || COMPLET.lignes, ajouts: o.ajouts,
  champs: Object.assign({}, COMPLET.champs, o.champs)});
const rubrique = (plan, id) => Array.isArray(plan) ? plan.find(e => e.id === id) || null : null;
const hautDe = (plan, id) => { const e = rubrique(plan, id); return e ? P1de(id)[1] + e.dy : NaN; };
/* textes de la page 1 hors de l'en-tête (y ≥ 153,8) et du tableau délesté */
const textesHors = X => X.L.filter(a => a[0] === 't' && a[1] === 1 && a[3] >= 153.8 && !(X.d && a[3] >= 360 + X.d.dy - 0.002 && a[3] <= 343.2 + X.d.dy + X.d.h + 0.002));

/* D5 : dossier minimal (nom, adresse du branchement du dossier créé, une ligne sans méthode), puis le même sans adresse */
async function d5(p){
  const VIDES = {demande: '', refCad: '', typePropriete: '', nbLogements: '', categorieNb: ''};
  await poser(p, {visite: {nom: 'Nom Fictif'}, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  const X = await deux(p), L1 = X.L.filter(a => a[1] === 1), Lc1 = X.Lc.filter(a => a[1] === 1);
  R.ok(plansEgaux(X.plan, planAttendu(['nomRef', 'adresse', 'description'], 17.5)) && !!X.d && pres(X.d.dy, -151.3, 1e-6) && pres(X.d.place, 565.3, 1e-6),
    'D5 : dossier minimal : calcul du nom, de l\'adresse et de la description seuls, description en 191,9 (dy −151,3), place 565,3 (' + dire(X.plan) + ')');
  verifP1('D5', X);
  const titres = ['Nom du propriétaire :', 'Nom Fictif', 'Adresse du branchement :', '12 rue Fictive - 99000 Ville-Exemple', texteEn(X.Lc, 42.6, 351.2)];
  const hors = textesHors(X).map(a => a[4]);
  R.ok(hors.join(' | ') === titres.join(' | '), 'D5 : hors de l\'en-tête et du tableau, seuls le libellé du nom, « Nom Fictif », le libellé de l\'adresse, l\'adresse et le titre '
    + 'de la description (' + hors.map(dit).join(' | ') + ')');
  const ent = L1.filter(a => a[0] === 't' && a[3] < 153.8), entF = Lc1.filter(a => a[0] === 't' && a[3] < 153.8);
  const visite = ent.filter(a => /^Visite du /.test(a[4])).map(a => a[4]);
  R.ok(!ent.some(a => /^Demande du/.test(a[4])) && entF.some(a => /^Demande du/.test(a[4])) && visite.join() === 'Visite du 18/11/2026',
    'D5 : en-tête sans « Demande du » (sans demande), avec « Visite du 18/11/2026 » (' + visite.join(' | ') + ')');
  const rects = L1.filter(a => a[0] === 'r' && a[3] < 153.8);
  R.ok(!texteEn(X.L, 220.4, 141.5) && rects.length === 1 && rects[0][2] === 15 && rects[0][3] === 15,
    'D5 : visite effectuée : ni libellé ni case du motif (rectangles de l\'en-tête : le cadre seul, ' + rects.length + ')');
  R.ok(!L1.some(a => a[0] === 't' && a[2] === 563 && a[7] === 6.5) && L1.filter(a => a[0] === 't' && a[6] === 'bolditalic' && a[3] >= 153.8).length === 1,
    'D5 : ni légende (aucun code de méthode), ni titre de rubrique vide (un seul titre sous l\'en-tête : la description)');
  R.ok(!L1.some(pointille) && !L1.some(a => a[0] === 't' && GABARIT.test(a[4])) && Lc1.some(pointille),
    'D5 : page 1 sans pointillé ni gabarit de date (le formulaire du même dossier en a)');
  /* le même sans adresse : le nom, puis directement la description */
  await poser(p, {visite: {nom: 'Nom Fictif', adresse: '', commune: ''}, lignes: {wc: {nb: '1', raccord: 'EU_D'}}, champs: VIDES});
  const Y = await deux(p);
  R.ok(plansEgaux(Y.plan, planAttendu(['nomRef', 'description'], 17.5)) && !!Y.d && pres(Y.d.dy, -171.6, 1e-6) && pres(Y.d.place, 585.6, 1e-6),
    'D5, sans adresse : calcul du nom et de la description seuls, description en 171,6 (dy −171,6), place 585,6 (' + dire(Y.plan) + ')');
  verifP1('D5, sans adresse', Y);
}

/* D6 : dossier complet et ses variantes */
async function d6(p){
  await poser(p, avec({}));
  let X = await deux(p);
  const som = await sommeNaturelle(p), plan = X.plan, d = X.d;
  R.ok(som === 35 && plansEgaux(plan, planAttendu(IDS, som)), 'D6 : dossier complet : constatDeleste rend les onze rubriques dans l\'ordre de la page, la première en 153,8, '
    + 'chacune au bas de la précédente gardée plus son écart, avec dy, h et place (rangées naturelles ' + som + ' ; ' + dire(plan) + ')');
  const h = id => hautDe(plan, id), pc = rubrique(plan, 'categorie') || {};
  R.ok(!!d && pres(h('categorie'), 254.5, 1e-6) && pres(pc.dy, 0, 1e-6) && pres(pc.h, 23.5, 1e-6) && pres(h('controle'), 285.9, 1e-6) && pres(rubrique(plan, 'controle').dy, -23, 1e-6)
    && pres(h('description'), 320.2, 1e-6) && pres(360 + d.dy, 337, 1e-6) && pres(402 + d.dy, 379, 1e-6) && pres(d.place, 257.5, 1e-6) && pres(h('description') + d.h, 414, 1e-6)
    && pres(h('recuperation'), 420.7, 1e-6) && pres(h('desagrements'), 438.3, 1e-6) && pres(h('position'), 456.1, 1e-6) && d.place >= 234.5,
    'D6 : exemples de la conception : catégorie 254,5-278 (dy 0), contrôle en 285,9 (dy −23), description en 320,2 (en-tête en 337, rangées dès 379, place 257,5, bas en 414), '
    + 'récupération en 420,7, désagréments en 438,3, position en 456,1');
  verifP1('D6', X);
  const r360 = d ? await releveTable(p, 360, 42 + d.place) : null;
  const e360 = r360 ? ecartTol(X.ref, r360.map(a => decale(a, 0, d.dy))) : 'pas de tableau';
  R.ok(!!r360 && r360.length > 0 && !e360, 'D6 : le tableau en 360 + dy est celui que cstTableDeleste dessine en 360, décalé de dy (' + (e360 || X.ref.length + ' appels') + ')');
  const leg = X.L.find(a => a[0] === 't' && a[1] === 1 && a[2] === 563 && d && pres(a[3], 351.2 + d.dy, 0.002)), legF = texteEn(X.Lc, 563, 351.2);
  const motsDe = t => t ? t.slice(t.indexOf(' : ') + 3).split(', ') : [], codesDe = t => motsDe(t).map(m => m.split(' ')[0]).join(' ');
  R.ok(!!leg && !!legF && codesDe(legF) === 'V E Fl Fu R' && codesDe(leg[4]) === 'V R' && leg[4] === legF.slice(0, legF.indexOf(' : ') + 3) + motsDe(legF).filter(m => /^(V|R) /.test(m)).join(', '),
    'D6 : légende réduite aux codes des rangées imprimées, deux sur cinq, dans l\'ordre du formulaire (' + (leg ? codesDe(leg[4]) : 'absente') + ')');

  /* variantes : chacune avec son calcul attendu */
  const sansDom = IDS.filter(i => i !== 'domicile'), V = [
    ['mail vide (ligne du téléphone gardée)', {visite: {mail: ''}}, IDS],
    ['adresse du propriétaire vide (ligne partie)', {visite: {domicile: '', domVille: ''}}, sansDom],
    ['sans nom ni référence cadastrale (adresse en 153,8)', {visite: {nom: ''}, champs: {refCad: ''}}, IDS.slice(1), X => pres(hautDe(X.plan, 'adresse'), 153.8, 1e-6) && pres(rubrique(X.plan, 'adresse').dy, -20.3, 1e-6)],
    ['rien d\'identifié (catégorie en 153,8)', {visite: {nom: '', tel: '', mail: '', domicile: '', domVille: '', adresse: '', commune: ''}, champs: {refCad: '', typePropriete: '', nbLogements: ''}},
      IDS.slice(5), X => pres(hautDe(X.plan, 'categorie'), 153.8, 1e-6) && pres(rubrique(X.plan, 'categorie').dy, -100.7, 1e-6)],
    ['désagréments « oui » sans localisation', {champs: {desagrLoc: ''}}, IDS],
    ['désagréments « non »', {champs: {desagr: 'non'}}, IDS],
    ['catégorie habitation', {champs: {categorie: 'habitation', categorieNb: '1'}}, IDS, X => cat(X, [[52.4, 269.3]])],
    ['catégorie centre hospitalier', {champs: {categorie: 'hosp', categorieNb: '2'}}, IDS, X => cat(X, [[52.4, 268.9]])],
    ['catégorie propriété publique avec accueil', {champs: {categorie: 'pub_acc', categorieNb: '4'}}, IDS, X => cat(X, [[50.2, 264.6], [50.2, 273.9]])],
    ['catégorie propriété publique sans accueil', {champs: {categorie: 'pub_sans', categorieNb: '5'}}, IDS, X => cat(X, [[50.2, 264.2], [50.2, 273.5]])],
    ['catégorie choisie sans nombre (rubrique partie)', {champs: {categorieNb: ' '}}, IDS.filter(i => i !== 'categorie')]];
  /* libellés de la catégorie (le texte d'avant le nombre, et celui d'avant encore pour deux lignes) en (x ; y + dy) */
  const cat = (X, att) => { const L1 = X.L.filter(a => a[0] === 't' && a[1] === 1), k = L1.findIndex(a => a[7] === 9.5 && JSON.stringify(a[8]) === '[0,0,255]'), e = rubrique(X.plan, 'categorie');
    const lab = k >= att.length ? L1.slice(k - att.length, k) : [];
    return !!e && lab.length === att.length && lab.every((a, i) => pres(a[2], att[i][0], 0.002) && pres(a[3], att[i][1] + e.dy, 0.002)) && pres(L1[k][3], att[att.length - 1][1] + e.dy, 0.002); };
  for (const [nom, o, ids, plus] of V){
    await poser(p, avec(o));
    X = await deux(p);
    const s = await sommeNaturelle(p);
    R.ok(plansEgaux(X.plan, planAttendu(ids, s)) && (!plus || plus(X)), 'D6, ' + nom + ' : calcul attendu (' + dire(X.plan) + ')');
    verifP1('D6, ' + nom, X);
  }

  /* 30 rangées : ramenées à la place, rubriques suivantes décalées vers le bas */
  const T30 = {}; ['wc', 'lavelinge', 'evier', 'sdb', 'cuisine', 'siphon', 'gout_av', 'gout_ar', 'grilles', 'siphon_sol'].forEach((id, i) => { T30[id] = {nb: '1', raccord: i < 6 ? 'EU_D' : 'EP_D', methodes: ['visuel']}; });
  const aj = []; for (let i = 1; i <= 20; i++) aj.push({groupe: i <= 10 ? 'EU' : 'EP', label: 'Ligne fictive ' + i, nb: '1', raccord: i <= 10 ? 'EU_T' : 'GARG'});
  await poser(p, avec({lignes: T30, ajouts: aj}));
  X = await deux(p);
  const s30 = await sommeNaturelle(p), d30 = X.d, rg = d30 ? fondsRangees(tableauDel(X.L, d30), 402 + d30.dy) : [];
  R.ok(s30 > 257.5 && plansEgaux(X.plan, planAttendu(IDS, s30)) && !!d30 && pres(d30.place, 257.5, 1e-6) && pres(d30.h, 58.8 + 257.5, 1e-6) && rg.length === 30
    && pres(rg[29], 402 + d30.dy + 257.5, 0.001) && pres(hautDe(X.plan, 'recuperation'), 643.2, 1e-6) && rubrique(X.plan, 'recuperation').dy > 0,
    'D6, 30 rangées : ramenées à la place (257,5), 30 traits, récupération en 643,2 (dy > 0) (naturelles ' + s30 + ' ; ' + dire(X.plan) + ')');
  verifP1('D6, 30 rangées', X);

  /* 30 rangées, sans désagréments ni position : la récupération, dernière rubrique gardée, finit en 816 (805-816, au lieu de 627,2-638,2
     au formulaire) ; place 816 − 379 − (6,7 + 11) */
  await poser(p, avec({lignes: T30, ajouts: aj, champs: {desagr: '', croquis: ''}}));
  X = await deux(p);
  const sB = await sommeNaturelle(p), dB = X.d, idsB = IDS.filter(i => i !== 'desagrements' && i !== 'position');
  R.ok(sB > 419.3 && plansEgaux(X.plan, planAttendu(idsB, sB)) && !!dB && pres(dB.place, 419.3, 1e-6) && pres(hautDe(X.plan, 'recuperation'), 805, 1e-6)
    && pres(rubrique(X.plan, 'recuperation').dy, 177.8, 1e-6),
    'D6, 30 rangées sans désagréments ni position : place 419,3, récupération en 805-816 (dy +177,8) (naturelles ' + sB + ' ; ' + dire(X.plan) + ')');
  verifP1('D6, 30 rangées sans désagréments ni position', X);
}

/* D9 : sans plan de terrain, croquis de position, module présent, absent et désactivé */
async function d9(p){
  await poser(p, {lignes: {wc: {nb: '1', raccord: 'EU_D', conforme: 'oui'}}, ajouts: [{groupe: 'EP', label: 'Fontaine', nb: '1', raccord: 'GARG', conforme: 'oui'}], champs: {croquis: SIG}});
  const X = await deux(p);
  verifP1('D9', X);
  await C.formeConstat(p, 'deleste');
  const ids = await p.evaluate(() => [window.__VT.S.etude.id, window.__VT.S.visites[0].id]);
  const L0 = await C.relevePdf(p), L1 = await C.relevePdf(p, {sansModule: true});
  let L2 = [];
  await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); });
  try { L2 = await C.relevePdf(p); }
  finally { await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: true}); }); }
  const e1 = C.premierEcart(empreintes(L1, ids), empreintes(L0, ids)), e2 = C.premierEcart(empreintes(L2, ids), empreintes(L0, ids));
  R.ok(!e1 && !e2 && L0.length > 0, 'D9 : module du croquis présent, absent et désactivé : trois relevés identiques (' + (e1 ? 'absent, ' + e1 : e2 ? 'désactivé, ' + e2 : L0.length + ' appels') + ')');
  const pos = rubrique(X.plan, 'position'), im = L0.filter(a => a[0] === 'i' && a[1] === 1 && a[4] === 40 && a[6] === 520 && a[7] === 124);
  R.ok(!!pos && pos.dy < 0 && im.length === 1 && pres(im[0][5], 676 + pos.dy, 0.002), 'D9 : position présente et décalée : image en x 40, y 676 + dy, 520 × 124, dy < 0 ('
    + (pos ? 'dy ' + pos.dy : 'pas de position au calcul') + ' ; ' + im.map(a => a[4] + '/' + a[5]).join(', ') + ')');
}

/* D13 : refus de visite, dossier par ailleurs complet */
async function d13(p){
  await poser(p, avec({statut: 'refus'}));
  let X = await deux(p);
  const ids = ['nomRef', 'adresse', 'domicile', 'telMail', 'typeLog', 'categorie'];
  R.ok(plansEgaux(X.plan, planAttendu(ids, 0)), 'D13 : refus de visite : identification et catégorie seules au calcul (' + dire(X.plan) + ')');
  verifP1('D13', X);
  const L1 = X.L.filter(a => a[1] === 1), Lc1 = X.Lc.filter(a => a[1] === 1);
  const i = L1.findIndex(a => a[0] === 't' && a[2] === 220.4 && a[3] === 141.5), j = Lc1.findIndex(a => a[0] === 't' && a[2] === 220.4 && a[3] === 141.5);
  const cs = i >= 0 ? casesDe(L1, i + 1) : [], csF = j >= 0 ? casesDe(Lc1, j + 1) : [];
  R.ok(cs.length === 1 && cs[0].coche && csF.length === 3 && cs[0].x === csF[0].x && cs[0].appels[3][4] === 'refus' && L1.filter(a => a[0] === 'r' && a[3] < 153.8).length === 2,
    'D13 : le motif « refus » seul, coché, à la place de la première case (' + cs.map(c => c.x + (c.coche ? ' cochée' : '')).join(', ') + ')');
  const cBas = hautDe(X.plan, 'categorie') + 23.5;
  R.ok(!L1.some(a => a[0] === 't' && /^Visite du/.test(a[4])) && !L1.some(a => yRef(a) > cBas + 0.002) && !L1.some(a => a[0] === 'i' && a[5] >= 153.8),
    'D13 : ni « Visite du », ni contrôle, ni tableau, ni récupération, ni désagréments, ni position : rien sous la catégorie (bas ' + cBas + ')');
  /* absence, avec ses dates : le motif « absence » à sa place, la ligne des absences gardée */
  await poser(p, avec({statut: 'absent', visite: {absences: ['2026-11-10', '2026-11-14']}}));
  X = await deux(p);
  R.ok(plansEgaux(X.plan, planAttendu(ids, 0)), 'D13, absence : identification et catégorie seules au calcul (' + dire(X.plan) + ')');
  verifP1('D13, absence avec ses dates', X);
}

async function casD(){
  const A = await C.ouvrir({fuseau: 'Europe/Paris'}), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await d1(p);
    await d2(p);
    await d3(p);
    await d5(p);
    await d6(p);
    await d9(p);
    await d13(p);
    R.ok(!A.erreurs.length, 'D1 à D13 : aucune erreur de la page (' + A.erreurs.slice(0, 2).join(' ; ').slice(0, 200) + ')');
  } finally { await A.fermer(); }
}

(async () => {
  try {
    await t0();
    if (!RELEVER) await casD();
  } catch (e){ R.ok(false, 'exception : ' + String(e && e.message || e).split('\n')[0].slice(0, 300)); }
  R.fin();
})();
