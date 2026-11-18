// Constat : « Reprendre du croquis » reprend la boîte de branchement en limite (souhait 10 ; réponse 10.4 et décision D6 de
// .claude/conception-outils-dessin.md ; m105), dans l'application (Chromium, données fictives : 12 rue Fictive, Ville-Exemple). Par réseau,
// d'après la seule boîte existante du réseau : la distance à la limite (« 0,80 m », « en limite »…), le côté de la boîte (m149 : « intérieur »
// ou « extérieur », sur sa propre rangée) et la profondeur.
// m149 (décision D17 de .claude/conception-v172.md ; réponses pr12-11 du 16 nov. 2026, S3 a et S2 b du 17 nov.) : les cas 1 à 11 attendent
//     la distance seule (« 0,80 m », et non plus « 0,80 m intérieur ») et le côté à part (bouton pressé, valeur gardée, provenance).
// 1 : « Reprendre du croquis » (bouton du constat) écrit en EU « 0,80 m » (distance), « intérieur » (côté : bouton « Intérieur » pressé) et
//     « 0,80 m » (profondeur), en EP « en limite » (sans côté) et « 1,10 m », dans la section Boîte de branchement ; la provenance est
//     gardée (c.croqAuto.boite) ; avant, la boîte manquante était rappelée (la distance et le côté, chacun à part).
// 2 : valeur tapée par le technicien en EU (« 1,00 m intérieur ») ; le croquis change (1,20 m, profondeur 0,90 m) : à la fermeture du croquis,
//     la profondeur suit le croquis, la distance tapée reste (m149 : telle quelle, jamais découpée ; le côté reste « intérieur ») ; un seul
//     écart est rappelé (distance et côté du croquis, « 1,20 m intérieur », face à la valeur tapée) ; une nouvelle reprise la garde aussi.
// 3 : constat repris avant m105 (provenance sans la boîte) : la fermeture du croquis et l'ouverture du constat ne touchent pas la boîte ;
//     « Reprendre du croquis » la remplit.
// 4 : deux boîtes EU : rien n'est repris en EU (les valeurs venues du croquis, côté compris, sont vidées, comme une ligne que le croquis ne
//     montre plus) ; la boîte EP l'est (côté « intérieur ») ; le constat rappelle que la distance et la profondeur EU ne sont pas reprises
//     (deux boîtes existantes), sans parler du côté.
// 5 : visite non effectuée : rien n'est repris (fermeture du croquis, « Reprendre du croquis »).
// 6 : croquis désactivé (Réglages) : ni bouton ni reprise, la boîte reste telle quelle, côté compris ; témoin : réactivé, le suivi la met à
//     jour.
// 7 : croquis d'un autre plan : les valeurs reprises de l'ancien plan restent, côté compris, comme saisies par le technicien ; les écarts de
//     distance et de profondeur sont rappelés (m149 : même côté, aucun écart de côté).
// 8 : constat signé, boîte reprise du croquis avant la signature (champs vidés) : le croquis change, rien ne change au constat (fermeture
//     du croquis, ouverture du constat, « Reprendre du croquis ») ; m149 : boutons du côté désactivés.
// 9 : sauvegarde altérée (clés inconnues dans la provenance c.croqAuto, provenance de la boîte invalide) : nettoyée à la restauration, les
//     clés connues gardées (m149 : le côté en est une, en texte ; un côté en nombre est retiré).
// 9, suite (m116, décision D7 de .claude/conception-rejets.md) : la provenance des autres cases des ouvrages de récupération des EP (c.croqAuto.recup)
//     est gardée, sans ses clés inconnues ({infil: true, x: 1} devient {infil: true}) ; une liste, le puisard (suivi à part, dans
//     c.croqAuto.puisard) ou une valeur autre que true sont retirés ; échoue sur 52cd3c8 (recup retiré) ; témoin : recup invalides retirés.
// 10 (entre 7 et 8) : écarts de la boîte comparés sans tenir compte de l'écriture (vcBoiteCle : « 0,8 m int » vaut « 0,80 m intérieur »,
//     « en limite de propriété » vaut « en limite », « 110 cm » vaut « 1,10 m ») : aucun écart pour des valeurs équivalentes, un écart pour
//     une autre valeur (« 0,90 » face à « 0,70 m »). m140 : l'écriture de l'étiquette du croquis recopiée au constat (« à 0,80 m de la
//     limite, à l'intérieur de la propriété » vaut « 0,80 m intérieur ») ; échoue sur 1ee93f4 ; témoins : un autre côté reste un écart.
//     m149 : rangée du côté vide, distance tapée qui porte le côté (« 1,5 m int ») : aucun faux écart, ni de distance ni de côté ; un autre
//     côté dans la distance (« 1,50 m extérieur ») reste un seul écart, de distance (gardes : passent aussi sur edae8d8).
// 11 : « Reprendre du croquis » sans rien à reprendre : la provenance de la boîte est enregistrée, sans changer la date du dossier ; après un
//     rechargement de la page, le suivi met la boîte à jour ; témoin : sans constat enregistré, une telle reprise n'en enregistre aucun.
// Échouent sur ddb0b74 (VCroquis.boitesConstat absente : boîte jamais rappelée, champs vides après « Reprendre du croquis » ; clés inconnues
// gardées à la restauration), sauf les témoins : 1 avant la reprise et sans écart après, 3 suivi sans provenance de la boîte, 9 sauvegarde
// restaurée, lignes, plan et puisard gardés, provenance sans la boîte, 10 aucun écart pour des valeurs équivalentes (aucun écart de la boîte
// avant m105), 11 aucun constat enregistré, aucune erreur dans la console.
// 10, suite (m115, L4) : écritures courantes : « 1m20 », « 1 m 20 », « 0m80 », « 1m5 » (1,50 m), « 0m00 » (en limite), le côté entre
//     parenthèses (« 0,80 m (intérieur) ») ou écrit avant la distance (« intérieur, 0,80 m », « int. 0,80 m ») valent la forme du croquis ;
//     échoue sur 52f0b00 ; témoins : « 1m30 » face à « 1,20 m » et « extérieur, 0,80 m » face à « 0,80 m intérieur » restent des écarts ;
//     « 80 cm intérieur », « 0,80m », « 1,20 mètre » restent pareils.
// 12 (m115, L3 ; m149) : PDF du constat, page 2, Boîte de branchement. Présentation 2 (constat non signé ; m149 : quatre rangées de
//     13,25 pt) : « 0,80 m intérieur » et « 12,50 m extérieur », trop larges en 9,5 pt pour la case (56 pt), sur une ligne, à la plus
//     grande taille de 9,5 à 5,5 pt qui tient, sur la ligne de leur libellé (y 50,125) ; « en limite » en 9,5 pt ; un texte plus large que
//     56 pt à 7 pt, sur une ligne entière, de 5,5 à 7 pt. Échoue sur edae8d8 (y 52,5 ; deux lignes de 7 pt). m149, défaut C2 de la
//     relecture : un texte plus large que 56 pt même à 5,5 pt (« non trouvée, à rechercher ») s'imprime en entier, sans « … », sur deux
//     lignes de 5,5 pt dans sa rangée (distance EP : y 45,95 et 51,45 ; profondeur EU : y 72,45 et 77,95) ; échoue sur la première
//     version de m149 (« non trouvée, à recher… », une ligne de 5,5 pt). Retouche de la relecture : l'encre de « À rechercher, sous le
//     gazon » (capitale accentuée en tête, jambage en bas), calculée d'après les glyphes de la police (Jost), reste entre les traits de
//     0,6 pt de sa rangée ; échoue avec deux lignes de 6 pt (y 45,825 et 51,825 : elle touchait les deux traits). Une valeur trop longue
//     pour deux lignes : la première, puis la seconde finie par « … » (avant : une ligne de 5,5 pt coupée). Témoins, présentation 1
//     (constat signé sans marque, décision D13) : comme en m115 (qui échouait sur 52f0b00), y 52,5, de 7 à 9,5 pt ; deux lignes de 7 pt
//     (« à 1,20 m, sous la haie », « non trouvée, à rechercher »).
// 13 (m116, D7) : les autres cases des ouvrages de récupération des EP (récupérateur, infiltration diffuse, indéterminé/autres) suivent
//     le croquis comme le puisard. Aucun exutoire d'aujourd'hui ne les coche : des lignes d'essai ajoutées à VCroquis.EXU dans la page
//     (place EP : case « Infiltration diffuse » pour ZZ, « Récupérateur » pour ZX, « Indéterminé/Autres » pour ZY), et un type d'essai
//     pour chacune. Avant la reprise, la case est rappelée ; « Reprendre du croquis » la coche (provenance c.croqAuto.recup) ; une case
//     cochée à la main (récupérateur) reste ; le croquis ne la montre plus : elle est décochée ; il la montre de nouveau : elle est
//     recochée ; décochée par le technicien, elle le reste et elle est rappelée ; fiche de la descente dans l'éditeur : « Rejet : exutoire
//     de test » (libellé de la table, jamais le code) ; panneau Constat de l'éditeur : « Ouvrage de récupération des EP : infiltration
//     diffuse » ; puisard et exutoire d'essai dessinés ensemble : « Ouvrages de récupération des EP : puisard, infiltration diffuse »
//     (ordre du formulaire) ; croquis d'un autre plan (comme au cas 7) : la case cochée d'après l'ancien plan (« Indéterminé/Autres »)
//     reste, comme cochée par le technicien, et sa provenance est effacée ; « Récupérateur » et « Indéterminé/Autres » décochées par le
//     technicien sont rappelées, au masculin (« non coché au constat »).
//     Échoue sur 52cd3c8 (VCroquis.EXU absente : case jamais cochée ni rappelée), sauf les témoins : le croquis ne la montre plus
//     (récupérateur coché à la main gardé, puisard coché d'après le croquis), panneau avec le puisard seul (« Ouvrage de récupération
//     des EP : puisard », le texte de la v1.7.0), aucune erreur dans la console.
// 14 (m126, D3 ; Q8 b, m128) : sauvegarde d'une étude fictive (trois visites). Le plan de la visite 1 porte quatre destinations aux
//     champs faux ou inconnus : E1, nom de 300 caractères à balises, article « x », EP « x », case 7 ; E2, nom blanc, abréviation trop
//     longue, EP « x », case 7 ; E4, aucun champ en texte (nom 12, abréviation, article, EP, case : tableau, null, objet, nombre) ; E5,
//     abréviation et article en nombres ; et deux tronçons à p.drain « oui » (texte inconnu) et 5 (nombre). La sauvegarde est restaurée
//     sans erreur et ses trois plans sont gardés. Seul un champ qui n'est pas du texte est remplacé, par le repli que le module lit
//     (Q8 b) : E1 garde nom, article et EP (lus « Ma », « le », à arbitrer), sa case devient « autre » ; E2 garde nom blanc,
//     abréviation, article et EP, case « autre » ; E4 : nom vide (lu « Autre destination »), « Au », « l' », à arbitrer, « autre » ;
//     E5 : « Fo », « le », le reste gardé ; p.drain « oui » gardé, 5 retiré (le drain d'infiltration d'un autre tronçon reste). Plan d'un
//     constat signé (visite 2) : sa destination à l'EP « x » gardée telle quelle. Même analyse (résultat par source, anomalies) avant et
//     après la restauration, pour les trois plans. Ouverte dans l'éditeur, la fiche de E1 porte « Ma » dans son symbole.
//     Témoins : sauvegarde restaurée, ses trois plans gardés ; les autres objets rendus tels quels (aucun champ ajouté) ; plan sans
//     destination ni drain invalide (visite 3) rendu tel quel ; fiche de la descente (nom écrit tel quel, sans balise) ; constat signé
//     inchangé après la restauration et l'ouverture puis la fermeture de son croquis (seul le gel de l'ouverture, c.fige, s'y ajoute,
//     conclusion « conformes ») ; aucune erreur dans la console.
//     Échoue sur 4a55a83 (planValide garde les champs faux et le drain « oui » ; symbole de la fiche sans abréviation), sauf les témoins.
//     Échoue sur b6e3e3c (m126 récrit les cinq champs de chaque destination et retire le drain « oui »), sauf les témoins et l'analyse.
// 15 (m149, décision D17) : boîte EU à 0,80 m, à l'intérieur ; boîte EP en limite. Après « Reprendre du croquis » : distance « 0,80 m »
//     seule, « Intérieur » pressé en EU, rien en EP. PDF (présentation 2) : quatre rangées de 13,25 pt dans le cadre (traits à 40, 53,25,
//     66,5, 79,75 et 93), « Boîte à l'intérieur ou à l'extérieur de la propriété » sous la distance ; par réseau, cases « int. » et
//     « ext. », croix dans « int. » en EU. « Extérieur » touché : pressé, enregistré, dossier mis à jour, gardé au suivi, écart rappelé ;
//     second toucher : décoché, gardé vide, écart « non renseigné au constat » ; « Intérieur » touché : aucun écart.
// 16 (m149) : « Sans objet (pas de boîte en limite) » : côté « sans objet » écrit en clair, aucun bouton pressé ; au PDF, en clair dans la
//     rangée du côté, sans case ; un toucher le remplace.
// 17 (m149) : dossier d'avant m149 (distance « 0,80 m intérieur » posée par le croquis, provenance sans le côté) : aucun faux écart ; au
//     suivi, la distance devient « 0,80 m » et « Intérieur » se coche ; de même par « Reprendre du croquis » ; distance tapée « 0,80 m
//     intérieur » (jamais posée) : gardée telle quelle, le côté se coche d'après le croquis, aucun écart.
// 18 (m149, réponse S2 b) : croquis désactivé (Réglages) : rangée du côté affichée, vide d'office, sans bouton de reprise ; « 0,80 m
//     intérieur » tapé reste tel quel, côté vide ; PDF : quatre rangées, cases vides, la distance sur une ligne (y 50,125) ; de même avec
//     le module du croquis absent.
// 19 (m149, décision D13) : constat signé (« c-lock », marque de la v1.7.2) : boutons du côté désactivés ; PDF : quatre rangées, croix dans
//     « int. ». Témoin : signé sans marque (constat de la v1.7.1, distance « 0,80 m intérieur ») : les appels de la bibliothèque PDF du
//     haut de la page 2 sont ceux d'avant m149, un à un (trois rangées de 17,5 pt, ni côté ni case).
// 20 (m149, défaut C1 de la relecture ; entre 17 et 19) : une distance gardée (retouchée ou tapée) qui porte un autre côté que le croquis :
//     le côté n'est pas repris, le constat ne dit jamais deux côtés contraires. « 0,80 m intérieur » tapé, côté coché d'après le croquis
//     (suite du cas 17), puis boîte du croquis passée à l'extérieur : côté gardé « intérieur », écarts de distance et de côté, croix dans
//     « int. » au PDF. Dossier d'avant m149, « 0,80 m intérieur » posé puis retouché en « 0,80 m extérieur », croquis « intérieur » : au
//     suivi et par « Reprendre du croquis », distance gardée, côté vide (provenance sans le côté), un seul écart, de distance, cases sans
//     croix au PDF ; de même pour « 0,80 m extérieur » tapé avant la première reprise (la profondeur et la boîte EP sont reprises), par
//     « Reprendre du croquis » puis au suivi. Échoue sur la première version de m149 (côté coché, ou passé à l'extérieur, d'après le
//     croquis).
// Sur edae8d8 (avant m149 : distance « 0,80 m intérieur », ni rangée ni boutons du côté, provenance sans le côté, trois rangées au
//     PDF), 51 vérifications sur 112 échouent : 1 (sauf le témoin et « aucun écart après la reprise »), 2 (sauf « un seul écart »), 3
//     (sauf la provenance sans la boîte), 4 (sauf le rappel des deux boîtes), 5 à 8, 9 (provenance de la boîte), 11 (suivi après le
//     rechargement), 12 (présentation 2 ; les témoins de la présentation 1 passent), 15, 16, 17 (sauf « aucun faux écart »), 18, 19
//     (sauf le témoin) et 20. Passent : 10 (paires et gardes m149), 13, 14 et les consoles sans erreur.
// Sur la première version de m149 (avant la correction des défauts C1 et C2 de la relecture), 10 vérifications sur 112 échouent :
//     les cinq du cas 12 sur les valeurs trop longues pour une ligne de 5,5 pt et les cinq du cas 20. Sur la version corrigée d'avant la
//     retouche de la relecture (deux lignes de 6 pt, y 45,825 et 51,825), 5 sur 112 : ces cinq du cas 12.
// usage : node tests/navigateur/constat-boite.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('constat-boite');

/* boîtes fictives : EU en limite intérieure à 0,80 m, profondeur 0,80 m ; EP en limite, profondeur 1,10 m */
const BEU = {res: 'EU', prof: '0,80', limCote: 'int', limDist: '0,80'}, BEP = {res: 'EP', prof: '1,10', limCote: 'ext', limDist: '0'};
/* dessin : WC vers la boîte EU, descente avant vers la boîte EP ; plus : objets [id, type, x, y, propriétés] et tracés [id, de, à] en plus */
const dessin = (eu, ep, plus) => [[['w', 'wc', -3, 6], ['B', 'boite', -3, 0, eu || BEU], ['d', 'descente', 3, 6, {cote: 'avant'}], ['Bp', 'boite', 3, 0, ep || BEP]].concat(plus ? plus[0] : []),
  [['t1', 'w', 'B'], ['t2', 'd', 'Bp']].concat(plus ? plus[1] : [])];
const CHAMPS = ['distEU', 'profEU', 'distEP', 'profEP'];
const texte = o => CHAMPS.map(k => k + ' ' + JSON.stringify(o[k])).join(', ');
const pareil = (o, att) => CHAMPS.every((k, i) => o[k] === att[i]);

async function dossier(p){
  await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; });
  await p.waitForFunction(() => { const r = window.__VT.S.route; return !!r && r.name === 'visit'; }); await C.pause(p, 400);
}
/* dessin injecté dans l'éditeur ouvert, autour du centre de la vue */
async function poserDessin(p, de){
  const v0 = await C.vue(p), els = de[0].map(([id, t, x, y, q]) => C.P(id, t, v0.cx + x, v0.cy + y, q)), I = C.index(els);
  de[1].forEach(([id, a, b]) => els.push(C.L(id, 'tr', [a, b], I)));
  await C.injecter(p, {el: els});
}
/* croquis du dossier : dessin injecté, enregistré, croquis fermé (le suivi du constat s'y fait) */
async function croquis(p, de, premier){
  if (premier) await C.ouvrirCroquis(p, {fond: false});
  else { await dossier(p); await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400); }
  await poserDessin(p, de);
  await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
  await C.fermerCroquis(p); await C.pause(p, 600);
}
/* champs de la boîte à l'écran et dans le constat, provenance, bouton « Reprendre du croquis », écarts affichés */
const lire = p => p.evaluate(CHAMPS => {
  const T = window.__VT, v = T.S.visites[0], c = v.constat || {}, B = c.boite || {}, P = c.croqAuto;
  const ecran = {}, champs = {}, b = document.querySelector('[data-act="c-croq-fill"]');
  CHAMPS.forEach(k => { const i = document.querySelector('[data-cf="boite.' + k + '"]'); ecran[k] = i ? i.value : null; champs[k] = B[k] == null ? '' : B[k]; });
  /* m149 : côté de la boîte, par réseau : textes des boutons, valeur du bouton pressé, valeur écrite en clair, boutons désactivés, valeur gardée */
  const cote = {};
  ['EU', 'EP'].forEach(n => {
    const bs = [...document.querySelectorAll('[data-act="c-set"][data-k="boite.cote' + n + '"]')], so = bs.length ? bs[0].parentNode.querySelector('.bso') : null;
    cote[n] = {boutons: bs.map(x => x.textContent).join('/'), presse: bs.filter(x => x.getAttribute('aria-pressed') === 'true').map(x => x.dataset.v).join('/'),
      clair: so ? so.textContent : '', grise: !!bs.length && bs.every(x => x.disabled), val: B['cote' + n] == null ? '' : B['cote' + n]};
  });
  return {ecran, champs, cote, prov: P && typeof P === 'object' && 'boite' in P ? JSON.stringify(P.boite) : 'absente', bouton: b ? (b.disabled ? 'grisé' : 'actif') : 'absent',
    ecarts: [...document.querySelectorAll('#croq-ecarts li')].map(x => x.textContent)};
}, CHAMPS);
/* constat affiché de nouveau (depuis le dossier) : le suivi s'y fait, comme à l'ouverture du constat */
async function constat(p){
  await dossier(p);
  await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
  await p.waitForSelector('[data-cf="boite.distEU"]');
  await p.waitForFunction(() => { const T = window.__VT, v = T.S.visites[0]; return !(T.S.croq && T.S.croq.actif) || T.VC_RESUMES.has(v.id) || /^(absent|refus|hors_zone)$/.test(v.statut); });
  await C.pause(p, 900);
  return lire(p);
}
/* bouton « Reprendre du croquis » touché */
async function reprendre(p){ await p.click('[data-act="c-croq-fill"]'); await C.pause(p, 1200); return lire(p); }
/* action « Reprendre du croquis » appelée sans le bouton (bouton absent ou grisé) : rend le nombre de valeurs reprises par l'appel direct */
async function reprendreSansBouton(p){
  await p.evaluate(async () => { await window.__VT.ACTIONS['c-croq-fill'](); }); await C.pause(p, 600);
  const n = await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0], res = await T.vcResume(v); return res ? T.constatDepuisCroquis(v, res, false) : 'aucun résumé'; });
  return {n, e: await lire(p)};
}
const ecartBoite = e => e.ecarts.filter(t => /^Boîte de branchement/.test(t));
/* m149 : côté de la boîte, par réseau : les deux boutons « Intérieur » et « Extérieur », celui de la valeur attendue pressé (aucun pour ''),
   la valeur gardée égale, rien en clair ; coteVu : le côté lu, pour les messages */
const coteOk = (e, eu, ep) => [['EU', eu], ['EP', ep]].every(([n, a]) => e.cote[n].boutons === 'Intérieur/Extérieur' && e.cote[n].presse === a && e.cote[n].val === a && !e.cote[n].clair);
const coteVu = e => 'côté ' + ['EU', 'EP'].map(n => { const x = e.cote[n]; return n + ' ' + JSON.stringify(x.val) + (x.boutons === 'Intérieur/Extérieur' ? '' : ', boutons ' + JSON.stringify(x.boutons))
  + (x.presse ? ', « ' + x.presse + ' » pressé' : ', rien de pressé') + (x.clair ? ', en clair « ' + x.clair + ' »' : '') + (x.grise ? ', grisé' : ''); }).join(' ; ');
/* provenance de la boîte (texte JSON lu par lire) égale à l'objet attendu, quel que soit l'ordre des clés */
const memes = (prov, att) => { let o; try { o = JSON.parse(prov); } catch (err){ return false; }
  return !!o && typeof o === 'object' && Object.keys(o).sort().join() === Object.keys(att).sort().join() && Object.keys(att).every(k => o[k] === att[k]); };
/* signature fictive (image PNG d'un point), comme dans tests/navigateur/dossier.js */
const SIG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
/* m149 : PDF du constat du dossier, haut de la page 2 (y < 100 : cadre de la page, section Boîte de branchement) : appels de la bibliothèque
   PDF, dans l'ordre : textes ['t', texte, x, y, taille], traits ['l', x1, y1, x2, y2], rectangles ['r', x, y, largeur, hauteur], au
   millième. sansModule : module du croquis retiré le temps de l'impression (croquis absent), comme dans tests/navigateur/dossier.js */
const boitePdf = (p, sansModule) => p.evaluate(async sm => {
  const T = window.__VT, v = T.S.visites[0], J0 = window.jspdf.jsPDF, L = [], M = Object.getOwnPropertyDescriptor(window, 'VCroquis');
  const page = d => { try { return d.internal.getCurrentPageInfo().pageNumber; } catch (err){ return 0; } }, m = x => Math.round(x * 1000) / 1000;
  const W = function(){ const d = new J0(...arguments), ot = d.text, ol = d.line, orr = d.rect;
    d.text = function(t, x, y){ if (page(d) === 2 && y < 100) L.push(['t', [].concat(t).join(' '), m(x), m(y), d.getFontSize()]); return ot.apply(d, arguments); };
    d.line = function(x1, y1, x2, y2){ if (page(d) === 2 && Math.min(y1, y2) < 100) L.push(['l', m(x1), m(y1), m(x2), m(y2)]); return ol.apply(d, arguments); };
    d.rect = function(x, y, w, h){ if (page(d) === 2 && y < 100) L.push(['r', m(x), m(y), m(w), m(h)]); return orr.apply(d, arguments); };
    return d; };
  W.API = J0.API; window.jspdf.jsPDF = W;
  /* module retiré sans passer par le crochet de commun.js (son setter), puis remis tel quel */
  if (sm) Object.defineProperty(window, 'VCroquis', {value: undefined, configurable: true, writable: true});
  try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; if (sm){ if (M) Object.defineProperty(window, 'VCroquis', M); else delete window.VCroquis; } }
  return L;
}, !!sansModule);
/* y des traits horizontaux de la section (x 43,5 à 565,5), dans l'ordre du dessin */
const rangees = L => L.filter(a => a[0] === 'l' && a[1] === 43.5 && a[3] === 565.5 && a[2] === a[4]).map(a => a[2]).join(',');
/* cases du côté (rectangles de 6,8 pt), par réseau d'après leur place (EU à gauche de 386,5) : texte écrit à 9,8 pt du bord gauche de la
   case, sur sa ligne de base (haut de la case + 6,6), suivi de « × » si deux traits la barrent ; ex. « EU int. ×, ext. ; EP int., ext. » ;
   « aucune case » s'il n'y en a pas */
const casesPdf = L => {
  const cs = L.filter(a => a[0] === 'r' && a[3] === 6.8 && a[4] === 6.8);
  if (!cs.length) return 'aucune case';
  const dans = (r, a) => a[0] === 'l' && [a[1], a[3]].every(x => x > r[1] && x < r[1] + 6.8) && [a[2], a[4]].every(y => y > r[2] && y < r[2] + 6.8);
  const lib = r => { const t = L.find(a => a[0] === 't' && Math.abs(a[2] - r[1] - 9.8) < 0.01 && Math.abs(a[3] - r[2] - 6.6) < 0.01);
    return (t ? t[1] : '(sans texte)') + (L.filter(a => dans(r, a)).length === 2 ? ' ×' : ''); };
  return ['EU', 'EP'].map(n => n + ' ' + cs.filter(r => (r[1] < 386.5) === (n === 'EU')).map(lib).join(', ')).join(' ; ');
};
/* texte t écrit en (x, y), à 0,01 pt près : son relevé, sinon undefined */
const texteA = (L, t, x, y) => L.find(a => a[0] === 't' && a[1] === t && Math.abs(a[2] - x) < 0.01 && Math.abs(a[3] - y) < 0.01);
/* m149 : boîte d'un dossier d'avant m149 (la distance porte le côté) et la même après m149 (distance seule, côté à part) */
const VIEUX = {distEU: '0,80 m intérieur', profEU: '0,80 m', distEP: 'en limite', profEP: '1,10 m'};
const NEUF = {distEU: '0,80 m', coteEU: 'intérieur', profEU: '0,80 m', distEP: 'en limite', profEP: '1,10 m'};
/* m149, témoin (D13) : haut de la page 2 d'un constat signé sans marque (présentation 1), boîte VIEUX, té non renseigné : les appels de la
   bibliothèque PDF d'avant m149, relevés sur edae8d8 (cadre de la page, trois rangées de 17,5 pt, textes et tailles) */
const MEP1 = [['r', 15, 15, 565, 811], ['l', 327, 22.5, 565.5, 22.5], ['l', 43.5, 40, 565.5, 40], ['l', 43.5, 57.5, 565.5, 57.5], ['l', 43.5, 75, 565.5, 75],
  ['l', 43.5, 93, 565.5, 93], ['l', 43.5, 40, 43.5, 93], ...[327, 386.5, 446.5, 506, 565.5].map(x => ['l', x, 22.5, x, 93]),
  ['t', 'EU', 356.8, 33.4, 10], ['t', 'EP', 416.5, 33.4, 10], ['t', 'Distance entre la limite parcellaire et la boîte de branchement', 48, 52.5, 10],
  ['t', '0,80 m intérieur', 356.8, 52.5, 8], ['t', 'en limite', 416.5, 52.5, 9.5], ['t', 'Profondeur de la boîte de branchement', 48, 70, 10],
  ['t', '0,80 m', 356.8, 70, 9.5], ['t', '1,10 m', 416.5, 70, 9.5], ['t', 'Présence de té hermétique', 48, 87.5, 10]];
/* premier appel différent de l'attendu, ou '' */
const premierEcart = (L, att) => { for (let i = 0; i < Math.max(L.length, att.length); i++) if (JSON.stringify(L[i]) !== JSON.stringify(att[i])) return 'appel ' + (i + 1) + ' : '
  + (L[i] ? JSON.stringify(L[i]) : 'aucun') + ' au lieu de ' + (att[i] ? JSON.stringify(att[i]) : 'aucun') + ' (' + L.length + ' appels)'; return ''; };

async function parcours(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await croquis(p, dessin(), true);
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });

    /* 1 : première reprise */
    let e = await constat(p);
    R.ok(pareil(e.ecran, ['', '', '', '']) && e.prov === 'absente' && e.bouton === 'actif', '1 témoin, avant la reprise : boîte vide, aucune provenance (' + texte(e.ecran) + ', ' + e.prov + ', bouton ' + e.bouton + ')');
    R.ok(ecartBoite(e).includes('Boîte de branchement EU : distance à la limite « 0,80 m » sur le croquis de terrain, non renseignée au constat.')
      && ecartBoite(e).includes('Boîte de branchement EU : côté « intérieur » sur le croquis de terrain, non renseigné au constat.')
      && !ecartBoite(e).some(t => /^Boîte de branchement EP : côté/.test(t)),
      '1 avant la reprise, la boîte du croquis est rappelée (m149 : la distance seule, « 0,80 m », et le côté à part ; en limite, pas de côté) : '
      + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte'));
    e = await reprendre(p);
    const A1 = ['0,80 m', '0,80 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A1) && pareil(e.champs, A1) && coteOk(e, 'intérieur', ''), '1 « Reprendre du croquis » : section Boîte de branchement remplie (m149 : distance '
      + '« 0,80 m » et non plus « 0,80 m intérieur » ; « Intérieur » pressé en EU, rien en EP) (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    R.ok(memes(e.prov, NEUF), '1 provenance gardée, côté compris (c.croqAuto.boite : ' + e.prov + ')');
    R.ok(!ecartBoite(e).length, '1 après la reprise, aucun écart de la boîte' + (ecartBoite(e).length ? ' : ' + ecartBoite(e).join(' | ') : ''));

    /* 2 : valeur tapée par le technicien, puis le croquis change */
    await p.fill('[data-cf="boite.distEU"]', '1,00 m intérieur'); await C.pause(p, 300);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    await croquis(p, dessin({res: 'EU', prof: '0,90', limCote: 'int', limDist: '1,20'}));
    e = await constat(p);
    const A2 = ['1,00 m intérieur', '0,90 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A2) && coteOk(e, 'intérieur', ''), '2 croquis changé (1,20 m, profondeur 0,90 m) : la profondeur suit, la distance tapée reste, jamais découpée, '
      + 'le côté reste « intérieur » (m149) (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    R.ok(ecartBoite(e).length === 1 && ecartBoite(e)[0] === 'Boîte de branchement EU : distance à la limite « 1,20 m intérieur » sur le croquis de terrain, « 1,00 m intérieur » au constat.',
      '2 un seul écart rappelé (m149 : distance et côté du croquis face à la distance tapée qui porte le côté ; aucun écart de côté) : '
      + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte'));
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A2) && pareil(e.champs, A2) && coteOk(e, 'intérieur', ''), '2 nouvelle reprise : la valeur tapée reste (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');

    /* 3 : constat repris avant m105 : provenance sans la boîte, champs vides */
    await p.evaluate(async () => { const T = window.__VT, c = T.S.visites[0].constat; delete c.croqAuto.boite; c.boite = {}; await T.flushSaves(); });
    await croquis(p, dessin());
    e = await constat(p);
    R.ok(pareil(e.ecran, ['', '', '', '']) && e.prov === 'absente', '3 provenance sans la boîte : fermeture du croquis et ouverture du constat n\'y touchent pas ('
      + texte(e.ecran) + ', ' + e.prov + ')');
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A1) && coteOk(e, 'intérieur', ''), '3 « Reprendre du croquis » remplit la boîte, côté compris (m149) (' + texte(e.ecran) + ' ; ' + coteVu(e)
      + ', provenance ' + e.prov + ')');

    /* 4 : deux boîtes EU */
    await croquis(p, dessin(null, {res: 'EP', prof: '1,30', limCote: 'int', limDist: '0,50'}, [[['w2', 'wc', -6, 6], ['B2', 'boite', -6, 0, {res: 'EU', prof: '0,60', limCote: 'ext', limDist: '1,00'}]], [['t3', 'w2', 'B2']]]));
    e = await constat(p);
    const A4 = ['', '', '0,50 m', '1,30 m'];
    R.ok(pareil(e.ecran, A4) && coteOk(e, '', 'intérieur'), '4 deux boîtes EU : rien de repris en EU, ni distance ni côté ; la boîte EP l\'est (m149 : « 0,50 m », côté '
      + '« intérieur ») (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A4) && coteOk(e, '', 'intérieur'), '4 « Reprendre du croquis » : rien en EU (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    const rappel4 = 'Boîte de branchement EU : 2 boîtes existantes (EU ou unitaires) sur le croquis de terrain ; distance à la limite et profondeur non reprises, à saisir au constat.';
    R.ok(ecartBoite(e).length === 1 && ecartBoite(e)[0] === rappel4, '4 seul écart de la boîte : le rappel des deux boîtes EU (' + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte') + ')');

    /* 5 : visite non effectuée */
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'absent'; await T.flushSaves(); });
    await croquis(p, dessin());
    e = await constat(p);
    let r = await reprendreSansBouton(p);
    R.ok(pareil(e.ecran, A4) && pareil(r.e.champs, A4) && coteOk(r.e, '', 'intérieur') && r.n === 0 && r.e.bouton === 'absent', '5 visite non effectuée : rien n\'est repris ('
      + texte(r.e.champs) + ' ; ' + coteVu(r.e) + ', reprise : ' + r.n + ', bouton ' + r.e.bouton + ')');
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });

    /* 6 : croquis désactivé dans les Réglages */
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); });
    e = await constat(p);
    r = await reprendreSansBouton(p);
    R.ok(pareil(e.ecran, A4) && coteOk(e, '', 'intérieur') && e.bouton === 'absent' && pareil(r.e.champs, A4) && r.n === 0, '6 croquis désactivé : ni bouton ni reprise, '
      + 'la boîte reste, côté compris (' + texte(r.e.champs) + ' ; ' + coteVu(e) + ', bouton ' + e.bouton + ', reprise : ' + r.n + ')');
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: true}); });
    e = await constat(p);
    R.ok(pareil(e.ecran, A1) && coteOk(e, 'intérieur', ''), '6 témoin, croquis réactivé : le suivi met la boîte à jour, côté compris (' + texte(e.ecran) + ' ; ' + coteVu(e) + ')');

    /* 7 : croquis d'un autre plan (supprimé puis recommencé) */
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].constat.croqAuto.plan = 'plan-fictif-ancien'; await T.flushSaves(); });
    await croquis(p, dessin({res: 'EU', prof: '0,70', limCote: 'int', limDist: '1,50'}));
    e = await constat(p);
    R.ok(pareil(e.ecran, A1) && coteOk(e, 'intérieur', '') && e.prov === '{}', '7 autre plan : les valeurs de l\'ancien plan restent, côté compris, comme saisies ('
      + texte(e.ecran) + ' ; ' + coteVu(e) + ', provenance ' + e.prov + ')');
    R.ok(ecartBoite(e).length === 2 && ecartBoite(e).includes('Boîte de branchement EU : distance à la limite « 1,50 m » sur le croquis de terrain, « 0,80 m » au constat.')
      && ecartBoite(e).includes('Boîte de branchement EU : profondeur « 0,70 m » sur le croquis de terrain, « 0,80 m » au constat.'),
      '7 écarts rappelés (m149 : la distance seule ; même côté, aucun écart de côté) : ' + (ecartBoite(e).join(' | ') || 'aucun'));

    /* 10 : écarts de la boîte comparés sans tenir compte de l'écriture : la forme comparable seule (vcBoiteCle), puis les écarts affichés
       (croquis : EU 1,50 m intérieur et 0,70 m, EP en limite et 1,10 m ; valeurs du constat tapées, la provenance est vide depuis 7) */
    const PAIRES = [['0,8 m int', '0,80 m intérieur', true], ['0.80m, intérieur', '0,80 m intérieur', true], ['80 cm à l\'intérieur', '0,80 m intérieur', true],
      ['à 0,80 m de la limite, intérieur', '0,80 m intérieur', true], [' 0,80  M  Intérieur ', '0,80 m intérieur', true], ['1,5 m ext.', '1,50 m extérieur', true],
      ['en limite de propriété', 'en limite', true], ['0', 'en limite', true], ['0,00 m intérieur', 'en limite', true], ['côté intérieur', 'intérieur', true],
      ['int', 'intérieur', true], ['0,80', '0,80 m', true], ['0,8 m', '0,80 m', true], ['80 cm', '0,80 m', true], ['0,800 mètre', '0,80 m', true],
      ['0,90', '0,80 m', false], ['0,80 m extérieur', '0,80 m intérieur', false], ['0,80 m', '0,80 m intérieur', false], ['extérieur', 'intérieur', false],
      ['8', '0,80 m', false], ['sans objet', '0,80 m', false], ['', '0,80 m', false], ['en limite', '0,80 m', false]];
    const faux = await p.evaluate(P => {
      const f = window.__VT.vcBoiteCle; if (typeof f !== 'function') return ['vcBoiteCle absente'];
      return P.filter(([a, b, eq]) => (f(a) === f(b)) !== eq).map(([a, b, eq]) => '« ' + a + ' » ' + (eq ? 'différent de' : 'égal à') + ' « ' + b + ' »');
    }, PAIRES);
    R.ok(!faux.length, '10 forme comparable de la boîte, ' + PAIRES.length + ' paires : ' + (faux.join(', ') || 'toutes justes'));
    /* m115 (L4) : écritures courantes : les mètres suivis des centimètres (« 1m20 », « 1 m 20 », « 0m80 » ; « 1m5 » : un seul chiffre
       compte des dizaines de centimètres), le côté entre parenthèses, le côté écrit avant la distance ; témoins : une autre valeur reste un
       écart, les écritures déjà reconnues le restent */
    const PAIRES_L4 = [['1m20', '1,20 m', true], ['1 m 20', '1,20 m', true], ['0m80', '0,80 m', true], ['1m5', '1,50 m', true], ['1m20 ext', '1,20 m extérieur', true],
      ['0,80 m (intérieur)', '0,80 m intérieur', true], ['intérieur, 0,80 m', '0,80 m intérieur', true], ['int. 0,80 m', '0,80 m intérieur', true], ['0m00', 'en limite', true],
      ['1m30', '1,20 m', false], ['extérieur, 0,80 m', '0,80 m intérieur', false], ['0,80 m intérieur', '0,80 m extérieur', false],
      ['80 cm intérieur', '0,80 m intérieur', true], ['0,80m', '0,80 m', true], ['1,20 mètre', '1,20 m', true]];
    const faux4 = await p.evaluate(P => {
      const f = window.__VT.vcBoiteCle; if (typeof f !== 'function') return ['vcBoiteCle absente'];
      return P.filter(([a, b, eq]) => (f(a) === f(b)) !== eq).map(([a, b, eq]) => '« ' + a + ' » ' + (eq ? 'différent de' : 'égal à') + ' « ' + b + ' »');
    }, PAIRES_L4);
    R.ok(!faux4.length, '10 (m115) écritures courantes de la boîte (mètres et centimètres, côté entre parenthèses ou avant la distance), ' + PAIRES_L4.length + ' paires : '
      + (faux4.join(', ') || 'toutes justes'));
    /* m140 (D5) : l'étiquette du croquis écrit « à l'intérieur de la propriété », « à l'extérieur de la propriété » ; recopiée au constat,
       elle vaut la valeur reprise (« 0,80 m intérieur ») ; échouent sur 1ee93f4, sauf les témoins : un autre côté reste un écart */
    const PAIRES_M140 = [['à 0,80 m de la limite, à l\'intérieur de la propriété', '0,80 m intérieur', true],
      ['à 1,25 m de la limite, à l\'extérieur de la propriété', '1,25 m extérieur', true], ['à l\'intérieur de la propriété', 'intérieur', true],
      ['à l\'extérieur de la propriété', 'extérieur', true], ['0,80 m, à l\'intérieur de la propriété', '0,80 m intérieur', true],
      ['à 0,80 m de la limite, à l\'intérieur de la parcelle', '0,80 m intérieur', true],
      ['à 0,80 m de la limite, à l\'extérieur de la propriété', '0,80 m intérieur', false], ['à l\'intérieur de la propriété', 'extérieur', false],
      ['en limite de propriété', 'en limite', true]];
    const faux140 = await p.evaluate(P => {
      const f = window.__VT.vcBoiteCle; if (typeof f !== 'function') return ['vcBoiteCle absente'];
      return P.filter(([a, b, eq]) => (f(a) === f(b)) !== eq).map(([a, b, eq]) => '« ' + a + ' » ' + (eq ? 'différent de' : 'égal à') + ' « ' + b + ' »');
    }, PAIRES_M140);
    R.ok(!faux140.length, '10 (m140) écriture de l\'étiquette (« à l\'intérieur de la propriété »), ' + PAIRES_M140.length + ' paires : '
      + (faux140.join(', ') || 'toutes justes'));
    for (const [k, t] of [['distEU', '1,5 m int'], ['profEU', '0,7'], ['distEP', 'en limite de propriété'], ['profEP', '110 cm']]){ await p.fill('[data-cf="boite.' + k + '"]', t); await C.pause(p, 200); }
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await constat(p);
    const A10 = ['1,5 m int', '0,7', 'en limite de propriété', '110 cm'], A10b = ['1,5 m int', '0,90', 'en limite de propriété', '110 cm'];
    R.ok(pareil(e.ecran, A10) && !ecartBoite(e).length, '10 valeurs tapées équivalentes à celles du croquis (' + texte(e.ecran) + ') : aucun écart de la boîte'
      + (ecartBoite(e).length ? ' (' + ecartBoite(e).join(' | ') + ')' : ''));
    await p.fill('[data-cf="boite.profEU"]', '0,90'); await C.pause(p, 200);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await constat(p);
    R.ok(pareil(e.ecran, A10b) && ecartBoite(e).length === 1 && ecartBoite(e)[0] === 'Boîte de branchement EU : profondeur « 0,70 m » sur le croquis de terrain, « 0,90 » au constat.',
      '10 autre valeur (« 0,90 ») : écart rappelé (' + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte') + ')');
    /* m149 : rangée du côté vide, distance tapée qui porte le côté (« 1,5 m int ») : comparée à la distance du croquis suivie de son côté, aucun
       faux écart (seul celui de la profondeur, « 0,90 », reste) ; un autre côté dans la distance reste un seul écart, de distance. Écarts
       calculés sur une copie du constat (vcEcarts), le dossier n'est pas touché */
    const ec10 = await p.evaluate(() => {
      const T = window.__VT, v = T.S.visites[0];
      const f = d => { const c = JSON.parse(JSON.stringify(v.constat)); c.boite.coteEU = ''; if (d) c.boite.distEU = d; return T.vcEcarts(v, c).filter(t => /^Boîte de branchement/.test(t)); };
      return [f(''), f('1,50 m extérieur')];
    });
    const PROF10 = 'Boîte de branchement EU : profondeur « 0,70 m » sur le croquis de terrain, « 0,90 » au constat.';
    R.ok(ec10[0].length === 1 && ec10[0][0] === PROF10, '10 (m149) côté vide, distance « 1,5 m int » : aucun faux écart, ni de distance ni de côté (' + ec10[0].join(' | ') + ')');
    R.ok(ec10[1].length === 2 && ec10[1][0] === 'Boîte de branchement EU : distance à la limite « 1,50 m intérieur » sur le croquis de terrain, « 1,50 m extérieur » au constat.'
      && ec10[1][1] === PROF10, '10 (m149) côté vide, distance « 1,50 m extérieur » : un seul écart de distance, aucun de côté (' + ec10[1].join(' | ') + ')');

    /* 8 : constat signé ; avant la signature, les champs vidés sont repris du croquis : ces valeurs posées suivraient le croquis sans la
       signature (les valeurs tapées au cas 10 ne le suivent pas, elles ne mesurent rien ici) */
    for (const k of CHAMPS){ await p.fill('[data-cf="boite.' + k + '"]', ''); await C.pause(p, 200); }
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await reprendre(p);
    const A8 = ['1,50 m', '0,70 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A8) && pareil(e.champs, A8) && coteOk(e, 'intérieur', ''), '8 avant la signature : champs vidés, puis repris du croquis ; le côté, gardé ('
      + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    await p.evaluate(async () => { const T = window.__VT, c = T.S.visites[0].constat; c.signeLe = new Date().toISOString(); await T.flushSaves(); });
    const avant = await p.evaluate(() => JSON.stringify(window.__VT.S.visites[0].constat.croqAuto));
    await croquis(p, dessin({res: 'EU', prof: '0,95', limCote: 'ext', limDist: '0,40'}, {res: 'EP', prof: '1,40', limCote: 'int', limDist: '0,20'}));
    e = await constat(p);
    r = await reprendreSansBouton(p);
    const apres = await p.evaluate(() => JSON.stringify(window.__VT.S.visites[0].constat.croqAuto));
    R.ok(pareil(e.ecran, A8) && pareil(r.e.champs, A8) && coteOk(r.e, 'intérieur', '') && e.cote.EU.grise && e.cote.EP.grise && r.n === 0 && e.bouton === 'grisé'
      && avant === apres && !e.ecarts.length, '8 constat signé : inchangé, boutons du côté désactivés (' + texte(r.e.champs) + ' ; ' + coteVu(e) + ', bouton ' + e.bouton
      + ', reprise : ' + r.n + ', provenance ' + (avant === apres ? 'inchangée' : 'changée') + ', écarts : ' + e.ecarts.length + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'parcours : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 9 : sauvegarde altérée, restaurée sur l'appareil (étude fictive d'un autre identifiant : aucune question) */
async function restauration(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    const vu = await p.evaluate(async () => {
      const T = window.__VT, e = JSON.parse(JSON.stringify(T.S.etude)), v0 = JSON.parse(JSON.stringify(T.S.visites[0]));
      e.id = 'etude-sauvegarde-fictive'; e.nom = 'Étude fictive restaurée';
      const visite = (n, croqAuto) => Object.assign(JSON.parse(JSON.stringify(v0)), {id: 'visite-fictive-' + n, etudeId: e.id, numero: String(n), statut: 'visitee',
        constat: {v: 3, boite: {distEU: '0,80 m intérieur'}, croqAuto}});
      const vs = [visite(1, {rows: {evier: {nb: '1'}, bad: 3}, refus: {}, crees: {}, plan: 'plan-fictif', puisard: true, recup: {infil: true, x: 1},
          boite: {distEU: '0,80 m intérieur', profEU: 5, autre: 'texte', coteEU: 'intérieur', coteEP: 7}, inconnue: {a: 1}, autreCle: 'texte'}),
        visite(2, {rows: {}, boite: ['0,80 m intérieur'], zz: 1, recup: ['infil']}), visite(3, {boite: 'texte', recup: {puisard: true, autre: 'oui'}}),
        visite(4, {rows: {}, plan: 'plan-fictif'})];
      const zip = new window.JSZip();
      zip.file('Sauvegarde fictive/_sauvegarde/vede-terrain-sauvegarde.json', JSON.stringify({format: 'vede-terrain', version: 1, app: 'test', exportedAt: new Date().toISOString(),
        etude: e, visites: vs, anomalies: [], photos: [], biblio: [], plans: [], fonds: []}));
      const ok = await T.restoreZip(await zip.generateAsync({type: 'blob'}));
      const out = {ok};
      for (const n of [1, 2, 3, 4]){ const v = await T.DB.get('visites', 'visite-fictive-' + n); out[n] = v && v.constat ? v.constat.croqAuto : 'visite absente'; }
      return out;
    });
    const cles = x => x && typeof x === 'object' ? Object.keys(x).sort().join(', ') : JSON.stringify(x);
    R.ok(vu.ok === true, '9 sauvegarde fictive restaurée (' + vu.ok + ')');
    const P1 = vu[1] || {};
    R.ok(cles(P1) === 'boite, crees, plan, puisard, recup, refus, rows', '9 clés inconnues de la provenance retirées, clés connues gardées : ' + cles(P1));
    R.ok(JSON.stringify(P1.rows) === '{"evier":{"nb":"1"}}' && P1.plan === 'plan-fictif' && P1.puisard === true, '9 lignes, plan et puisard gardés : ' + JSON.stringify([P1.rows, P1.plan, P1.puisard]));
    R.ok(JSON.stringify(P1.boite) === '{"distEU":"0,80 m intérieur","coteEU":"intérieur"}', '9 provenance de la boîte : seuls les champs connus, en texte (m149 : le côté en est un ; '
      + 'coteEP en nombre retiré) (' + JSON.stringify(P1.boite) + ')');
    /* m116 : provenance des autres cases des ouvrages de récupération des EP */
    const rc = x => x && typeof x === 'object' && 'recup' in x ? JSON.stringify(x.recup) : 'absente';
    R.ok(rc(P1) === '{"infil":true}', '9 provenance des cases EP (c.croqAuto.recup) : seules les cases connues cochées gardées (' + rc(P1) + ')');
    R.ok(rc(vu[2]) === 'absente' && rc(vu[3]) === 'absente', '9 témoin, provenance des cases EP invalide (liste ; puisard et valeur autre que true) retirée : '
      + rc(vu[2]) + ' ; ' + rc(vu[3]));
    R.ok(cles(vu[2]) === 'crees, refus, rows' && cles(vu[3]) === 'crees, refus, rows', '9 provenance de la boîte invalide (liste, texte) retirée : ' + cles(vu[2]) + ' ; ' + cles(vu[3]));
    R.ok(cles(vu[4]) === 'crees, plan, refus, rows', '9 témoin, provenance sans la boîte : aucune n\'est créée (' + cles(vu[4]) + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'restauration : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 11 : « Reprendre du croquis » sans rien à reprendre (deux boîtes sans distance ni profondeur, aucun appareil), puis rechargement de la page */
async function enregistrement(){
  const A = await C.ouvrir(), p = A.p;
  /* dossier tel qu'il est enregistré sur l'appareil */
  const base = () => p.evaluate(async () => {
    const T = window.__VT, x = await T.DB.get('visites', T.S.visites[0].id), c = x && x.constat, P = c && c.croqAuto;
    return {constat: !!c, prov: P && typeof P === 'object' && 'boite' in P ? JSON.stringify(P.boite) : 'absente', maj: x ? x.updatedAt : null};
  });
  /* page rechargée : elle se rouvre sur le constat */
  const recharger = async () => {
    await p.reload(); await p.waitForSelector('[data-cf="boite.distEU"]', {timeout: 15000});
    await p.waitForFunction(() => { const T = window.__VT, v = T && T.S.visites[0]; return !!v && (!(T.S.croq && T.S.croq.actif) || T.VC_RESUMES.has(v.id)); });
    await C.pause(p, 900);
  };
  try {
    await C.etudeEtDossier(p);
    await croquis(p, [[['B', 'boite', -3, 0, {res: 'EU'}], ['Bp', 'boite', 3, 0, {res: 'EP'}]], []], true);
    await constat(p);
    await reprendre(p);
    let b = await base();
    R.ok(!b.constat, '11 témoin, aucun constat enregistré : une reprise sans rien à reprendre n\'en enregistre pas (' + JSON.stringify(b) + ')');
    await recharger();
    /* constat commencé à la main (té hermétique EU), sans reprise */
    await p.fill('[data-cf="boite.teEU"]', 'oui'); await C.pause(p, 300);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    const b0 = await base();
    await reprendre(p);
    b = await base();
    R.ok(b0.constat && b0.prov === 'absente' && b.prov === '{}' && !!b.maj && b.maj === b0.maj, '11 reprise sans rien à reprendre : provenance de la boîte enregistrée, date du dossier inchangée (avant '
      + JSON.stringify(b0) + ', après ' + JSON.stringify(b) + ')');
    await recharger();
    await croquis(p, dessin());
    const e = await constat(p);
    R.ok(pareil(e.ecran, ['0,80 m', '0,80 m', 'en limite', '1,10 m']) && coteOk(e, 'intérieur', ''), '11 après un rechargement, le suivi met la boîte à jour, côté compris (m149) ('
      + texte(e.ecran) + ' ; ' + coteVu(e) + ', provenance ' + e.prov + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'enregistrement : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 12 (m115, L3 ; m149) : PDF du constat, page 2, section Boîte de branchement (case de 56 pt). Présentation 2 (constat non signé, m149) :
   une valeur trop large en 9,5 pt (« 0,80 m intérieur », « 12,50 m extérieur ») s'imprime sur une ligne, à la plus grande taille de 9,5 à
   5,5 pt qui tient, sur la ligne de base de son libellé (50,125 pour la distance) ; « en limite » en 9,5 pt ; un texte plus large que
   56 pt à 7 pt, sur une ligne entière, de 5,5 à 7 pt. Témoins, présentation 1 (constat signé sans marque, D13) : comme en m115, sur la
   ligne de base 52,5, de 7 à 9,5 pt ; deux lignes de 7 pt (48,9 et 56,3). Texte, position, taille et page relevés aux appels de la
   bibliothèque PDF */
async function pdfBoite(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    const LONG = 'à 1,20 m, sous la haie';
    /* constat neuf, boîte B ; signe 2 : signé par cette version (« c-lock », marque de la v1.7.2) ; 1 : signé sans marque (v1.7.1) */
    const imprime = (B, signe) => p.evaluate(async ([B, signe, png]) => {
      const T = window.__VT, v = T.S.visites[0], J0 = window.jspdf.jsPDF, rec = [];
      v.statut = 'visitee'; delete v.constat; v.constat = T.constatEval(v, []).c; v.constat.boite = Object.assign({}, B);
      if (signe){ v.constat.sigTech = png; await T.ACTIONS['c-lock'](); if (signe === 1 && v.constat.fige) delete v.constat.fige.mep; }
      /* encre d'une ligne de la section (m149, retouche) : haut et bas d'après les glyphes de la police intégrée (null sans glyphes) */
      const encre = (d, s, y) => { try { const m = d.getFont().metadata, cm = m.cmap.unicode.codeMap, u = m.head.unitsPerEm, sz = d.getFontSize();
        let hi = -1e9, lo = 1e9;
        for (const ch of s){ const g = m.glyf.glyphFor(cm[ch.charCodeAt(0)]); if (g && typeof g.yMax === 'number'){ hi = Math.max(hi, g.yMax); lo = Math.min(lo, g.yMin); } }
        return hi > -1e9 ? {haut: y - hi / u * sz, bas: y - lo / u * sz} : null; } catch (e){ return null; } };
      const W = function(){ const d = new J0(...arguments), ot = d.text;
        d.text = function(t, x, y){ let pg = 0; try { pg = d.internal.getCurrentPageInfo().pageNumber; } catch (e){}
          const s = [].concat(t).join(' '), dans = pg === 2 && y > 40 && y < 95 && x > 330 && x < 450;
          rec.push({t: s, x, y, sz: d.getFontSize(), pg, f: d.getFont().fontName, e: dans ? encre(d, s, y) : null}); return ot.apply(d, arguments); };
        return d; };
      W.API = J0.API; window.jspdf.jsPDF = W;
      try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; }
      return rec.filter(r => r.pg === 2 && r.y > 40 && r.y < 95 && r.x > 330 && r.x < 450);
    }, [B, signe || 0, SIG]);
    const de = (r, t) => r.filter(x => x.t === t), ou = a => a ? 'y ' + a.y.toFixed(3) + ', ' + a.sz + ' pt' : 'non imprimée';
    const r1 = await imprime({distEU: '0,80 m intérieur', distEP: '12,50 m extérieur', profEU: '0,80 m', profEP: '1,10 m'});
    for (const [t, cx] of [['0,80 m intérieur', 356.8], ['12,50 m extérieur', 416.5]]){
      const L = de(r1, t), a = L[0];
      R.ok(L.length === 1 && Math.abs(a.y - 50.125) < 0.01 && Math.abs(a.x - cx) < 0.01 && a.sz >= 5.5 && a.sz <= 9.5, '12 PDF du constat (présentation 2, m149), distance à la '
        + 'limite « ' + t + ' » : une ligne, sur celle de son libellé (y 50,125), de 5,5 à 9,5 pt (' + L.length + ' ligne(s), ' + ou(a) + ')');
    }
    const r2 = await imprime({distEU: 'en limite', distEP: LONG}), a2 = de(r2, 'en limite')[0], L2 = r2.filter(x => Math.abs(x.x - 416.5) < 0.01);
    R.ok(!!a2 && Math.abs(a2.y - 50.125) < 0.01 && a2.sz === 9.5, '12 « en limite » : 9,5 pt sur la ligne de son libellé (y 50,125) (' + ou(a2) + ')');
    R.ok(L2.length === 1 && L2[0].t === LONG && L2[0].sz >= 5.5 && L2[0].sz <= 7 && Math.abs(L2[0].y - 50.125) < 0.01, '12 (m149) « ' + LONG
      + ' » (plus de 56 pt à 7 pt) : une ligne entière, de 5,5 à 7 pt, y 50,125 (' + (L2.map(x => JSON.stringify(x.t) + ' ' + ou(x)).join(', ') || 'non imprimé') + ')');
    /* m149 (défaut C2 de la relecture) : une valeur plus large que 56 pt même en 5,5 pt : deux lignes de 5,5 pt dans sa rangée, la valeur
       entière, sans « … » (avant la correction : « non trouvée, à recher… » sur une ligne de 5,5 pt) ; distance EP et profondeur EU */
    const TL = 'non trouvée, à rechercher', vu2 = L => L.map(x => JSON.stringify(x.t) + ' ' + ou(x)).join(', ') || 'non imprimé';
    const deux = (L, y0, T) => L.length === 2 && L.every(x => x.sz === 5.5 && !/…/.test(x.t)) && Math.abs(L[0].y - y0) < 0.01
      && Math.abs(L[1].y - y0 - 5.5) < 0.01 && L.map(x => x.t).join(' ') === (T || TL);
    const r4 = await imprime({distEP: TL, profEU: TL}), L4 = r4.filter(x => Math.abs(x.x - 416.5) < 0.01 && x.y < 53.25),
      L4p = r4.filter(x => Math.abs(x.x - 356.8) < 0.01 && x.y > 66.5 && x.y < 79.75);
    R.ok(deux(L4, 45.95), '12 (m149) « ' + TL + ' » (plus de 56 pt même à 5,5 pt), distance EP : deux lignes de 5,5 pt, y 45,95 et 51,45, la valeur entière, '
      + 'sans « … » (' + vu2(L4) + ')');
    R.ok(deux(L4p, 72.45), '12 (m149) de même en profondeur EU : deux lignes de 5,5 pt, y 72,45 et 77,95, dans sa rangée (66,5 à 79,75) (' + vu2(L4p) + ')');
    /* m149, retouche de la relecture : capitale accentuée en tête, jambage en bas ; l'encre de chaque ligne (glyphes de Jost) reste entre
       les traits de la rangée, épais de 0,6 pt (en 6 pt : 39,915 en haut, 53,205 en bas, sur les traits de 40 et 53,25) */
    const PIRE = 'À rechercher, sous le gazon', r6 = await imprime({distEU: PIRE, profEP: PIRE}), vuE = L => L.map(x => JSON.stringify(x.t) + ' '
      + ou(x) + (x.e ? ', encre ' + x.e.haut.toFixed(3) + ' à ' + x.e.bas.toFixed(3) : ', encre inconnue') + ' (' + x.f + ')').join(', ') || 'non imprimé';
    for (const [nom, cx, h] of [['distance EU', 356.8, 40], ['profondeur EP', 416.5, 66.5]]){
      const L = r6.filter(x => Math.abs(x.x - cx) < 0.01 && x.y > h && x.y < h + 13.25);
      R.ok(deux(L, h + 5.95, PIRE) && L.every(x => x.f === 'Jost' && x.e) && L[0].e.haut >= h + 0.3 && L[1].e.bas <= h + 13.25 - 0.3,
        '12 (m149, retouche) « ' + PIRE + ' », ' + nom + ' : deux lignes de 5,5 pt, l\'encre entre les traits (' + (h + 0.3) + ' à ' + (h + 12.95) + ') ('
        + vuE(L) + ')');
    }
    /* m149, retouche : trop longue pour deux lignes : la première ligne, puis la seconde finie par « … », le début de la valeur */
    const TROP = 'Àgé, Égout, profondeur à vérifier (puits) et regard de visite sous la haie de thuyas', r7 = await imprime({profEU: TROP}),
      L7 = r7.filter(x => Math.abs(x.x - 356.8) < 0.01 && x.y > 66.5 && x.y < 79.75);
    R.ok(L7.length === 2 && L7.every(x => x.sz === 5.5) && Math.abs(L7[0].y - 72.45) < 0.01 && Math.abs(L7[1].y - 77.95) < 0.01 && !/…/.test(L7[0].t)
      && /…$/.test(L7[1].t) && L7[1].t.length > 2 && TROP.indexOf(L7[0].t + ' ' + L7[1].t.slice(0, -1)) === 0, '12 (m149, retouche) valeur trop longue pour deux '
      + 'lignes, profondeur EU : deux lignes de 5,5 pt, la seconde finie par « … », le début de la valeur (' + vu2(L7) + ')');
    /* témoins : signé sans marque, la présentation 1 garde la mise en page de m115 */
    const r3 = await imprime({distEU: '0,80 m intérieur', distEP: LONG}, 1), L3 = r3.filter(x => Math.abs(x.x - 416.5) < 0.01), L3u = de(r3, '0,80 m intérieur');
    R.ok(L3u.length === 1 && Math.abs(L3u[0].y - 52.5) < 0.01 && L3u[0].sz >= 7 && L3u[0].sz <= 9.5, '12 témoin, signé sans marque (présentation 1) : « 0,80 m intérieur » sur '
      + 'une ligne, y 52,5, de 7 à 9,5 pt (' + L3u.length + ' ligne(s), ' + ou(L3u[0]) + ')');
    R.ok(L3.length === 2 && L3.every(x => x.sz === 7) && Math.abs(L3[0].y - 48.9) < 0.01 && Math.abs(L3[1].y - 56.3) < 0.01 && L3.map(x => x.t).join(' ') === LONG,
      '12 témoin, signé sans marque : « ' + LONG + ' », deux lignes de 7 pt, y 48,9 et 56,3 (' + (L3.map(x => JSON.stringify(x.t) + ' ' + ou(x)).join(', ') || 'non imprimé') + ')');
    const r5 = await imprime({distEP: TL}, 1), L5 = r5.filter(x => Math.abs(x.x - 416.5) < 0.01);
    R.ok(L5.length === 2 && L5.every(x => x.sz === 7) && Math.abs(L5[0].y - 48.9) < 0.01 && Math.abs(L5[1].y - 56.3) < 0.01 && L5.map(x => x.t).join(' ') === TL,
      '12 témoin, signé sans marque : « ' + TL + ' », deux lignes de 7 pt, y 48,9 et 56,3 (' + vu2(L5) + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'PDF de la boîte : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 15 à 17 et 19 (m149, D17) : côté de la boîte au constat, rangée « Boîte à l'intérieur ou à l'extérieur de la propriété » */
async function coteBoite(){
  const A = await C.ouvrir(), p = A.p;
  const A1 = ['0,80 m', '0,80 m', 'en limite', '1,10 m'];
  /* bouton du côté touché (réseau n, valeur v), dossier enregistré : le constat lu, la valeur enregistrée sur l'appareil (enr) et la date du
     dossier changée (touche : constatTouch). Sans ce bouton (version d'avant m149), rien n'est touché et la suite continue */
  const toucher = async (n, v) => {
    const t0 = await p.evaluate(() => window.__VT.S.visites[0].updatedAt), b = await p.$('[data-act="c-set"][data-k="boite.cote' + n + '"][data-v="' + v + '"]');
    if (b){ await b.click(); await C.pause(p, 500); }
    const x = await p.evaluate(async n => { const T = window.__VT; await T.flushSaves(); const d = await T.DB.get('visites', T.S.visites[0].id), B = d && d.constat && d.constat.boite;
      return {enr: B ? B['cote' + n] : undefined, maj: d ? d.updatedAt : null}; }, n);
    return Object.assign(await lire(p), {enr: x.enr, touche: !!x.maj && x.maj !== t0});
  };
  const vu = e => texte(e.ecran) + ' ; ' + coteVu(e) + ' ; écarts ' + (ecartBoite(e).join(' | ') || 'aucun');
  /* « sans objet » en clair, aucun bouton pressé */
  const so = (e, n) => e.cote[n].val === 'sans objet' && e.cote[n].clair === 'sans objet' && !e.cote[n].presse && e.cote[n].boutons === 'Intérieur/Extérieur';
  /* boîte du constat (VIEUX, sinon B) et provenance posées comme dans un dossier d'avant m149 (prov null : aucune provenance de la boîte,
     comme avant la première reprise) ; rend les écarts de la boîte de ce constat (vcEcarts) */
  const avant149 = (prov, B) => p.evaluate(async ([V, P]) => {
    const T = window.__VT, v = T.S.visites[0], c = v.constat; c.boite = Object.assign({}, V);
    if (P) c.croqAuto.boite = Object.assign({}, P); else delete c.croqAuto.boite;
    const ec = T.vcEcarts(v, c).filter(t => /^Boîte de branchement/.test(t)); await T.flushSaves(); return ec;
  }, [B || VIEUX, prov]);
  try {
    await C.etudeEtDossier(p);
    await croquis(p, dessin(), true);
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });
    await constat(p);

    /* 15 : boîte EU à 0,80 m, à l'intérieur (BEU) ; boîte EP en limite (BEP) : pas de côté */
    let e = await reprendre(p);
    R.ok(e.ecran.distEU === '0,80 m' && coteOk(e, 'intérieur', '') && !ecartBoite(e).length, '15 boîte EU à 0,80 m, à l\'intérieur : distance « 0,80 m » seule, « Intérieur » '
      + 'pressé ; boîte EP en limite : aucun côté (' + vu(e) + ')');
    let L = await boitePdf(p);
    R.ok(rangees(L) === '40,53.25,66.5,79.75,93' && !!texteA(L, 'Boîte à l\'intérieur ou à l\'extérieur de la propriété', 48, 63.375) && !!texteA(L, '0,80 m', 356.8, 50.125),
      '15 PDF : quatre rangées dans le cadre (traits ' + (rangees(L) || 'aucun') + '), libellé du côté sous la distance (y 63,375), « 0,80 m » sur la ligne de la distance (y 50,125)');
    R.ok(casesPdf(L) === 'EU int. ×, ext. ; EP int., ext.', '15 PDF : cases « int. » et « ext. » par réseau, croix dans « int. » en EU (' + casesPdf(L) + ')');
    e = await toucher('EU', 'extérieur');
    R.ok(coteOk(e, 'extérieur', '') && e.enr === 'extérieur' && e.touche, '15 « Extérieur » touché : pressé, enregistré, dossier mis à jour (' + coteVu(e) + ', enregistré '
      + JSON.stringify(e.enr) + ', date ' + (e.touche ? 'changée' : 'inchangée') + ')');
    await croquis(p, dessin());
    e = await constat(p);
    R.ok(coteOk(e, 'extérieur', '') && ecartBoite(e).length === 1 && ecartBoite(e)[0] === 'Boîte de branchement EU : côté « intérieur » sur le croquis de terrain, « extérieur » au constat.',
      '15 côté retouché gardé au suivi (croquis refermé, constat rouvert), écart rappelé (' + vu(e) + ')');
    e = await toucher('EU', 'extérieur');
    R.ok(coteOk(e, '', '') && e.enr === '' && e.touche, '15 second toucher : décoché, enregistré vide (' + coteVu(e) + ', enregistré ' + JSON.stringify(e.enr) + ')');
    e = await constat(p);
    R.ok(coteOk(e, '', '') && ecartBoite(e).length === 1 && ecartBoite(e)[0] === 'Boîte de branchement EU : côté « intérieur » sur le croquis de terrain, non renseigné au constat.',
      '15 côté vidé gardé au suivi, écart « non renseigné » (' + vu(e) + ')');
    e = await toucher('EU', 'intérieur');
    R.ok(coteOk(e, 'intérieur', '') && e.enr === 'intérieur' && !ecartBoite(e).length, '15 « Intérieur » touché : aucun écart (' + vu(e) + ')');

    /* 16 : « Sans objet (pas de boîte en limite) » */
    await p.click('[data-act="c-boite-so"]'); await C.pause(p, 500);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await lire(p);
    R.ok(so(e, 'EU') && so(e, 'EP'), '16 « Sans objet » : côté « sans objet » écrit en clair, aucun bouton pressé (' + coteVu(e) + ')');
    L = await boitePdf(p);
    R.ok(!!texteA(L, 'sans objet', 356.8, 63.375) && !!texteA(L, 'sans objet', 416.5, 63.375) && casesPdf(L) === 'aucune case', '16 PDF : « sans objet » en clair dans la rangée '
      + 'du côté, sans case (' + casesPdf(L) + ')');
    e = await toucher('EU', 'intérieur');
    R.ok(e.cote.EU.val === 'intérieur' && e.cote.EU.presse === 'intérieur' && !e.cote.EU.clair && e.enr === 'intérieur' && so(e, 'EP'), '16 un toucher remplace « sans objet » ('
      + coteVu(e) + ')');

    /* 17 : dossier d'avant m149 : distance « 0,80 m intérieur » posée par le croquis et non retouchée, provenance sans le côté */
    let ec = await avant149(VIEUX);
    R.ok(!ec.length, '17 dossier d\'avant m149 (« 0,80 m intérieur » posé, côté vide) : aucun faux écart (' + (ec.join(' | ') || 'aucun') + ')');
    e = await constat(p);
    R.ok(pareil(e.ecran, A1) && coteOk(e, 'intérieur', '') && memes(e.prov, NEUF) && !ecartBoite(e).length, '17 au suivi (constat rouvert) : la distance devient « 0,80 m », '
      + '« Intérieur » se coche (' + vu(e) + ', provenance ' + e.prov + ')');
    await avant149(VIEUX);
    await p.evaluate(async () => { await window.__VT.ACTIONS['c-croq-fill'](); }); await C.pause(p, 800);
    e = await lire(p);
    R.ok(pareil(e.ecran, A1) && coteOk(e, 'intérieur', '') && memes(e.prov, NEUF) && !ecartBoite(e).length, '17 de même par « Reprendre du croquis » (' + vu(e) + ', provenance '
      + e.prov + ')');
    ec = await avant149({});
    e = await constat(p);
    R.ok(!ec.length && e.ecran.distEU === '0,80 m intérieur' && e.champs.distEU === '0,80 m intérieur' && coteOk(e, 'intérieur', '') && memes(e.prov, {coteEU: 'intérieur'})
      && !ecartBoite(e).length, '17 distance tapée « 0,80 m intérieur » (jamais posée) : gardée telle quelle, jamais découpée ; le côté se coche d\'après le croquis ; aucun écart ('
      + vu(e) + ', provenance ' + e.prov + ')');

    /* 20 (m149, défaut C1 de la relecture) : une distance gardée (retouchée ou tapée) qui porte un autre côté que le croquis : le côté n'est
       pas repris, le constat ne dit jamais deux côtés contraires */
    const A17 = ['0,80 m intérieur', '0,80 m', 'en limite', '1,10 m'], A20 = ['0,80 m extérieur', '0,80 m', 'en limite', '1,10 m'];
    const vu20 = (e, L) => vu(e) + ', provenance ' + e.prov + ', PDF ' + casesPdf(L);
    /* suite du cas 17 : « 0,80 m intérieur » tapé, côté coché d'après le croquis ; la boîte EU du croquis passe à l'extérieur */
    await croquis(p, dessin({res: 'EU', prof: '0,80', limCote: 'ext', limDist: '0,80'}));
    e = await constat(p); L = await boitePdf(p);
    R.ok(pareil(e.ecran, A17) && coteOk(e, 'intérieur', '') && memes(e.prov, {coteEU: 'intérieur'}) && ecartBoite(e).join(' | ') === 'Boîte de branchement EU : distance à la '
      + 'limite « 0,80 m extérieur » sur le croquis de terrain, « 0,80 m intérieur » au constat. | Boîte de branchement EU : côté « extérieur » sur le croquis de terrain, '
      + '« intérieur » au constat.' && casesPdf(L) === 'EU int. ×, ext. ; EP int., ext.', '20 « 0,80 m intérieur » tapé, côté coché, puis boîte du croquis à l\'extérieur : '
      + 'côté gardé « intérieur », écarts de distance et de côté, croix dans « int. » au PDF (' + vu20(e, L) + ')');
    await croquis(p, dessin());
    const E20 = 'Boîte de branchement EU : distance à la limite « 0,80 m intérieur » sur le croquis de terrain, « 0,80 m extérieur » au constat.';
    const ok20 = (e, L, prov) => pareil(e.ecran, A20) && pareil(e.champs, A20) && coteOk(e, '', '') && memes(e.prov, prov) && ecartBoite(e).length === 1
      && ecartBoite(e)[0] === E20 && casesPdf(L) === 'EU int., ext. ; EP int., ext.';
    /* dossier d'avant m149 : « 0,80 m intérieur » posé par le croquis, retouché en « 0,80 m extérieur » ; le croquis dit « intérieur » */
    await avant149(VIEUX, Object.assign({}, VIEUX, {distEU: '0,80 m extérieur'}));
    e = await constat(p); L = await boitePdf(p);
    R.ok(ok20(e, L, VIEUX), '20 dossier d\'avant m149, distance retouchée « 0,80 m extérieur », croquis « intérieur » : au suivi, distance gardée, côté vide (provenance sans '
      + 'le côté), un seul écart, de distance, aucune croix au PDF (' + vu20(e, L) + ')');
    await avant149(VIEUX, Object.assign({}, VIEUX, {distEU: '0,80 m extérieur'}));
    await p.evaluate(async () => { await window.__VT.ACTIONS['c-croq-fill'](); }); await C.pause(p, 800);
    e = await lire(p); L = await boitePdf(p);
    R.ok(ok20(e, L, VIEUX), '20 de même par « Reprendre du croquis » (' + vu20(e, L) + ')');
    /* « 0,80 m extérieur » tapé avant la première reprise (aucune provenance de la boîte) : le reste est repris, pas le côté */
    const P20 = {profEU: '0,80 m', distEP: 'en limite', profEP: '1,10 m'};
    await avant149(null, {distEU: '0,80 m extérieur'});
    await p.evaluate(async () => { await window.__VT.ACTIONS['c-croq-fill'](); }); await C.pause(p, 800);
    e = await lire(p); L = await boitePdf(p);
    R.ok(ok20(e, L, P20), '20 « 0,80 m extérieur » tapé avant la première reprise, puis « Reprendre du croquis » : distance gardée, côté vide, profondeur et boîte EP '
      + 'reprises, un seul écart, aucune croix au PDF (' + vu20(e, L) + ')');
    e = await constat(p); L = await boitePdf(p);
    R.ok(ok20(e, L, P20), '20 de même au suivi (constat rouvert) (' + vu20(e, L) + ')');

    /* 19 : constat signé par cette version (« c-lock », marque de la v1.7.2) */
    await p.evaluate(async ([N, png]) => { const T = window.__VT, c = T.S.visites[0].constat; c.boite = Object.assign({}, N); c.croqAuto.boite = Object.assign({}, N); c.sigTech = png;
      await T.ACTIONS['c-lock'](); await T.flushSaves(); }, [NEUF, SIG]);
    await C.pause(p, 600);
    e = await lire(p);
    const mep = await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; return c.signeLe && c.fige ? c.fige.mep : 'non signé'; });
    R.ok(mep === 2 && coteOk(e, 'intérieur', '') && e.cote.EU.grise && e.cote.EP.grise, '19 constat signé (« c-lock », marque ' + JSON.stringify(mep) + ') : côté gardé, boutons '
      + 'désactivés (' + coteVu(e) + ')');
    L = await boitePdf(p);
    R.ok(rangees(L) === '40,53.25,66.5,79.75,93' && casesPdf(L) === 'EU int. ×, ext. ; EP int., ext.', '19 PDF du constat signé en v1.7.2 : quatre rangées (' + (rangees(L) || 'aucune')
      + '), croix dans « int. » (' + casesPdf(L) + ')');
    /* témoin : signé sans marque, constat de la v1.7.1 (la distance porte le côté) */
    await p.evaluate(async V => { const T = window.__VT, c = T.S.visites[0].constat; c.boite = Object.assign({}, V); if (c.fige) delete c.fige.mep; await T.flushSaves(); }, VIEUX);
    L = await boitePdf(p);
    const d19 = premierEcart(L, MEP1);
    R.ok(!d19, '19 témoin, signé sans marque : les ' + MEP1.length + ' appels de la bibliothèque PDF du haut de la page 2 sont ceux d\'avant m149 (trois rangées de 17,5 pt, ni côté '
      + 'ni case)' + (d19 ? ' : ' + d19 : ''));
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'côté de la boîte : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 18 (m149, réponse S2 b) : croquis désactivé, puis module du croquis absent : la rangée du côté, vide d'office */
async function sansCroquis(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); await T.ACTIONS['vc-actif']({checked: false}); });
    let e = await constat(p);
    R.ok(coteOk(e, '', '') && e.bouton === 'absent', '18 croquis désactivé : rangée du côté affichée, vide d\'office, rien de pressé, sans bouton de reprise (' + coteVu(e)
      + ', bouton ' + e.bouton + ')');
    await p.fill('[data-cf="boite.distEU"]', '0,80 m intérieur'); await C.pause(p, 300);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await constat(p);
    R.ok(e.ecran.distEU === '0,80 m intérieur' && e.champs.distEU === '0,80 m intérieur' && coteOk(e, '', ''), '18 « 0,80 m intérieur » tapé reste tel quel, côté vide ('
      + texte(e.ecran) + ' ; ' + coteVu(e) + ')');
    for (const sm of [false, true]){
      const L = await boitePdf(p, sm), d = texteA(L, '0,80 m intérieur', 356.8, 50.125), n = L.filter(a => a[0] === 't' && a[1].indexOf('0,80') >= 0).length;
      R.ok(rangees(L) === '40,53.25,66.5,79.75,93' && casesPdf(L) === 'EU int., ext. ; EP int., ext.' && !!d && d[4] >= 5.5 && d[4] <= 9.5 && n === 1,
        '18 PDF, ' + (sm ? 'module du croquis absent' : 'croquis désactivé') + ' : quatre rangées (' + (rangees(L) || 'aucune') + '), cases vides (' + casesPdf(L)
        + '), la distance sur une ligne, y 50,125 (' + (d ? d[4] + ' pt' : 'pas à cette place') + ', ' + n + ' texte(s))');
    }
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'sans croquis : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 13 (m116, D7) : autres cases des ouvrages de récupération des EP d'après le croquis. Ligne d'essai ZZ, de la forme de celles du code
   (la même que dans tests/vm/rejets.js) : sa place EP coche « Infiltration diffuse » ; ZX et ZY, copies de ZZ, cochent « Récupérateur »
   et « Indéterminé/Autres » (leur règle EU, celle de ZZ, ne sert pas : aucun WC n'y est relié) */
const ZZ = {lib: 'exutoire de test', res: 'EP',
  eu: {cle: 'eu-zz', obs: 'rejet à l\'exutoire de test', preco: 'Suppression du rejet à l\'exutoire de test et raccordement au branchement EU', nc: true,
    codes: ['raccEUsep'], cat: 'inversion'},
  cEU: {code: 'MILIEU', lib: 'Exutoire de test : rejet au sol'}, cEP: {code: '', lib: 'Exutoire de test (infiltration)', recup: 'infil'}};
const ZX = Object.assign({}, ZZ, {lib: 'récupérateur de test', cEP: {code: '', lib: 'Récupérateur de test', recup: 'recup'}});
const ZY = Object.assign({}, ZZ, {lib: 'exutoire indéterminé de test', cEP: {code: '', lib: 'Exutoire indéterminé de test', recup: 'autre'}});
const INFIL = 'Infiltration diffuse : sur le croquis de terrain, non cochée au constat (ouvrages de récupération des EP).';
const RECUP = 'Récupérateur : sur le croquis de terrain, non coché au constat (ouvrages de récupération des EP).';
const AUTRE = 'Indéterminé/Autres : sur le croquis de terrain, non coché au constat (ouvrages de récupération des EP).';
async function casesEP(){
  const A = await C.ouvrir(), p = A.p;
  /* cases du constat (triées), provenance, cases enfoncées à l'écran, rappels des ouvrages de récupération des EP */
  const cases = () => p.evaluate(() => {
    const c = window.__VT.S.visites[0].constat || {}, P = c.croqAuto, E = c.epRecup || {};
    return {coche: Object.keys(E).sort().map(k => k + ' ' + E[k]).join(', '), prov: P && typeof P === 'object' && 'recup' in P ? JSON.stringify(P.recup) : 'absente',
      ecran: [...document.querySelectorAll('[data-act="c-toggle"][data-k^="epRecup."]')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.k.slice(8)).join(', '),
      rappels: [...document.querySelectorAll('#croq-ecarts li')].map(x => x.textContent).filter(t => /ouvrages de récupération des EP/.test(t))};
  });
  const dire = e => 'cases ' + (e.coche || 'aucune') + ' ; provenance ' + e.prov + ' ; à l\'écran ' + (e.ecran || 'aucune') + ' ; rappels ' + (e.rappels.join(' | ') || 'aucun');
  /* WC vers la boîte EU, descente avant vers l'exutoire de type t ; avec t2, une seconde descente avant vers un exutoire de type t2 */
  const vers = (t, t2) => [[['w', 'wc', -3, 6], ['B', 'boite', -3, 0, BEU], ['d', 'descente', 3, 6, {cote: 'avant'}], ['z', t, 3, 0]]
    .concat(t2 ? [['d2', 'descente', 6, 6, {cote: 'avant'}], ['z2', t2, 6, 0]] : []), [['t1', 'w', 'B'], ['t2', 'd', 'z']].concat(t2 ? [['t3', 'd2', 'z2']] : [])];
  const toucherCase = async k => { await p.click('[data-act="c-toggle"][data-k="epRecup.' + k + '"]'); await C.pause(p, 500); return cases(); };
  /* panneau Constat de l'éditeur ouvert : le paragraphe des ouvrages de récupération des EP */
  const panneauEP = () => p.evaluate(() => {
    window.__vcEd.ouvrirPanneau('constat');
    return [...document.querySelectorAll('.vc-panneau .vc-pcorps p')].map(x => x.textContent).filter(t => /^Ouvrages? de récupération des EP/.test(t)).join(' | ') || 'aucun';
  });
  try {
    await C.etudeEtDossier(p);
    const table = await p.evaluate(L => {
      const V = window.VCroquis, ok = !!V.EXU && typeof V.EXU === 'object';
      /* sans table (version d'avant), les types d'essai sont posés quand même : les vérifications montrent ce qui manque */
      if (ok) Object.assign(V.EXU, L);
      V.TYPES.essai = {id: 'essai', fam: 'exu', lib: 'Exutoire de test', role: 'exutoire', forme: 'puisard', exu: 'ZZ'};
      V.TYPES.essaiRecup = {id: 'essaiRecup', fam: 'exu', lib: 'Récupérateur de test', role: 'exutoire', forme: 'puisard', exu: 'ZX'};
      V.TYPES.essaiAutre = {id: 'essaiAutre', fam: 'exu', lib: 'Exutoire indéterminé de test', role: 'exutoire', forme: 'puisard', exu: 'ZY'};
      return ok;
    }, {ZZ, ZX, ZY});
    R.ok(table, '13 lignes d\'essai ZZ, ZX et ZY posées dans VCroquis.EXU' + (table ? '' : ' (VCroquis.EXU absente)'));
    await croquis(p, vers('essai'), true);
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });
    await constat(p);
    let e = await cases();
    R.ok(!e.coche && e.rappels.length === 1 && e.rappels[0] === INFIL, '13 avant la reprise, la case du croquis est rappelée (' + dire(e) + ')');
    await reprendre(p); e = await cases();
    R.ok(e.coche === 'infil true' && e.prov === '{"infil":true}' && e.ecran === 'infil' && !e.rappels.length,
      '13 « Reprendre du croquis » coche « Infiltration diffuse », provenance gardée (' + dire(e) + ')');
    e = await toucherCase('recup');
    R.ok(e.coche === 'infil true, recup true' && e.prov === '{"infil":true}', '13 récupérateur coché à la main (' + dire(e) + ')');
    await croquis(p, vers('puisard')); await constat(p); e = await cases();
    R.ok(e.coche === 'puisard true, recup true' && e.prov === 'absente' && e.ecran === 'puisard, recup' && !e.rappels.length,
      '13 le croquis ne montre plus la case : décochée ; récupérateur coché à la main gardé ; puisard coché d\'après le croquis (' + dire(e) + ')');
    await croquis(p, vers('essai')); await constat(p); e = await cases();
    R.ok(e.coche === 'infil true, recup true' && e.prov === '{"infil":true}' && e.ecran === 'recup, infil' && !e.rappels.length,
      '13 le croquis la montre de nouveau : recochée ; puisard décoché (' + dire(e) + ')');
    e = await toucherCase('infil');
    R.ok(e.coche === 'infil false, recup true' && e.rappels.length === 1 && e.rappels[0] === INFIL, '13 décochée par le technicien : rappelée (' + dire(e) + ')');
    await croquis(p, vers('essai')); await constat(p); e = await cases();
    R.ok(e.coche === 'infil false, recup true' && e.rappels.length === 1 && e.rappels[0] === INFIL,
      '13 le croquis change : la case décochée par le technicien le reste, toujours rappelée (' + dire(e) + ')');
    /* fiche de la descente dans l'éditeur : « Rejet : » d'après la table, jamais le code */
    await dossier(p); await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
    await p.evaluate(() => window.__vcEd.selectionner('d')); await C.pause(p, 300);
    const rej = await p.evaluate(() => { const x = document.querySelector('.vc-ftete .vc-etat'); return x ? x.textContent : 'aucun état'; });
    R.ok(rej === 'Rejet : exutoire de test', '13 fiche de la descente dans l\'éditeur : rejet d\'après la table (' + rej + ')');
    /* panneau Constat de l'éditeur : les cases cochées d'après le croquis, dans l'ordre du formulaire ; « Ouvrages » pour plusieurs */
    let pan = await panneauEP();
    R.ok(pan === 'Ouvrage de récupération des EP : infiltration diffuse', '13 panneau Constat de l\'éditeur, exutoire d\'essai : « Ouvrage de récupération des EP : '
      + 'infiltration diffuse » (' + pan + ')');
    await poserDessin(p, vers('puisard')); pan = await panneauEP();
    R.ok(pan === 'Ouvrage de récupération des EP : puisard', '13 témoin, panneau Constat, puisard seul : le texte de la v1.7.0 (' + pan + ')');
    await poserDessin(p, vers('essai', 'puisard')); pan = await panneauEP();
    R.ok(pan === 'Ouvrages de récupération des EP : puisard, infiltration diffuse', '13 panneau Constat, puisard et exutoire d\'essai dessinés ensemble : '
      + '« Ouvrages de récupération des EP : puisard, infiltration diffuse » (' + pan + ')');
    /* le dessin du dossier, remis avant la fermeture : le suivi n'a rien à changer */
    await poserDessin(p, vers('essai'));
    await C.fermerCroquis(p);
    /* croquis d'un autre plan (supprimé puis recommencé, comme au cas 7) : la case cochée d'après l'ancien plan reste, comme cochée par le
       technicien, même quand le nouveau croquis ne la montre pas ; sa provenance est effacée */
    await croquis(p, vers('essaiAutre')); await constat(p); e = await cases();
    R.ok(e.coche === 'autre true, infil false, recup true' && e.prov === '{"autre":true}' && e.ecran === 'recup, autre' && !e.rappels.length,
      '13 « Indéterminé/Autres » cochée d\'après le croquis (' + dire(e) + ')');
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].constat.croqAuto.plan = 'plan-fictif-ancien'; await T.flushSaves(); });
    await croquis(p, vers('puisard')); await constat(p); e = await cases();
    R.ok(e.coche === 'autre true, infil false, puisard true, recup true' && e.prov === 'absente' && e.ecran === 'puisard, recup, autre' && !e.rappels.length,
      '13 croquis d\'un autre plan, sans l\'exutoire d\'essai : « Indéterminé/Autres » reste cochée, comme par le technicien, provenance effacée (' + dire(e) + ')');
    /* rappels des cases au masculin : « Récupérateur » et « Indéterminé/Autres », décochées par le technicien, sur le croquis */
    await toucherCase('recup'); await toucherCase('autre');
    await croquis(p, vers('essaiRecup', 'essaiAutre')); await constat(p); e = await cases();
    R.ok(e.coche === 'autre false, infil false, recup false' && e.rappels.length === 2 && e.rappels[0] === RECUP && e.rappels[1] === AUTRE,
      '13 « Récupérateur » et « Indéterminé/Autres » décochées par le technicien : rappelées, « non coché au constat » (' + dire(e) + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'cases des EP : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 14 (m126, décision D3 ; Q8 b, m128) : sauvegarde dont les plans portent des destinations aux champs faux ou inconnus et des tronçons à
   p.drain invalide ; à la restauration, seul un champ qui n'est pas du texte est remplacé (repli de destDe, nom vide ; p.drain retiré),
   un texte inconnu est gardé ; l'analyse ne change pas ; le reste non plus */
async function reparation(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    /* nom de 300 caractères, avec deux espaces de suite et des signes du HTML */
    const LONG = 'Mare  <b>fictive</b> & "x" ' + 'a'.repeat(273), NOM = 'Mare <b>fictive</b> & "x" ' + 'a'.repeat(14);
    const vu = await p.evaluate(async LONG => {
      const T = window.__VT, e = JSON.parse(JSON.stringify(T.S.etude)), v0 = JSON.parse(JSON.stringify(T.S.visites[0]));
      e.id = 'etude-reparation-fictive'; e.nom = 'Étude fictive réparée';
      const visite = n => Object.assign(JSON.parse(JSON.stringify(v0)), {id: 'visite-reparation-' + n, etudeId: e.id, numero: String(n), statut: 'visitee'});
      const vs = [visite(1), visite(2), visite(3)];
      /* visite 2 : constat signé */
      vs[1].constat = {v: 3, rows: [{id: 'wc', groupe: 'EU', label: 'WC', std: true, nb: '1', raccord: 'EU', conforme: 'oui', methodes: ['eau']}], methodes: {}, epRecup: {},
        precos: {}, boite: {}, conclusion: 'conformes', reserves: '', observations: '', signeLe: '2026-11-01T10:00:00.000Z'};
      const pt = (id, t, x, y, q) => ({id, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: ''}, q || {})});
      const tr = (id, a, b, q) => ({id, k: 'ln', t: 'tr', v: [{x: a.x, y: a.y, a: a.id}, {x: b.x, y: b.y, a: b.id}], p: Object.assign({res: '', st: 'existant', sens: 0, obs: ''}, q || {})});
      const libre = (id, x0, x1, q) => ({id, k: 'ln', t: 'tr', v: [{x: x0, y: 0, a: null}, {x: x1, y: 0, a: null}], p: Object.assign({res: '', st: 'existant', sens: 0, obs: ''}, q)});
      const plan = (v, el) => Object.assign(window.VCroquis.nouveauDoc({nom: 'Croquis fictif', adresse: '12 rue Fictive', commune: 'Ville-Exemple', technicien: 'Nom Fictif'}),
        {visiteId: v.id, etudeId: e.id, el});
      /* visite 1 : E1 (nom de 300 caractères, sans abréviation, article « x ») et E2 (nom blanc, abréviation trop longue, article « la »), EP « x »,
         case 7 ; tronçon t1 à p.drain « oui » ; témoins : WC, boîte, descentes, tronçons t0 et t2, drain d'infiltration t4 */
      const W = pt('W', 'wc', -3, 6), B = pt('B', 'boite', -3, 0, {res: 'EU'}), D1 = pt('D1', 'descente', 0, 10, {cote: 'avant'}), D2 = pt('D2', 'descente', 8, 10, {cote: 'avant'});
      const E1 = pt('E1', 'exutoire', 0, 4, {nom: LONG, art: 'x', ep: 'x', cst: 7}), E2 = pt('E2', 'exutoire', 8, 4, {nom: '   ', ab: 'Étang du bas', art: 'la', ep: 'x', cst: 7});
      /* E4 : aucun champ en texte ; E5 : abréviation et article en nombres (Q8 b, m128) ; t6 : p.drain en nombre ; descentes reliées */
      const D4 = pt('D4', 'descente', 16, 10, {cote: 'avant'}), D5 = pt('D5', 'descente', 22, 10, {cote: 'arriere'});
      const E4 = pt('E4', 'exutoire', 16, 4, {nom: 12, ab: ['Ét'], art: null, ep: {v: 'nc'}, cst: 7}), E5 = pt('E5', 'exutoire', 22, 4, {nom: 'Fossé', ab: 5, art: 3, ep: 'nc', cst: 'GARG'});
      const el1 = [W, B, D1, D2, E1, E2, D4, D5, E4, E5, tr('t0', W, B, {res: 'EU'}), tr('t1', D1, E1, {drain: 'oui'}), tr('t2', D2, E2), libre('t4', 12, 16, {drain: 'infiltration'}),
        tr('t6', D4, E4, {drain: 5}), tr('t7', D5, E5)];
      /* visite 2 (constat signé) : une destination aux EP « x » ; visite 3 : ni destination ni drain invalide (un drain de collecte) */
      const S2 = pt('S', 'descente', 0, 10, {cote: 'avant'}), E3 = pt('E3', 'exutoire', 0, 4, {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'x', cst: 'autre'});
      const W3 = pt('W', 'wc', -3, 6), B3 = pt('B', 'boite', -3, 0, {res: 'EU'});
      const plans = [plan(vs[0], el1), plan(vs[1], [S2, E3, tr('t1', S2, E3)]), plan(vs[2], [W3, B3, tr('t0', W3, B3, {res: 'EU'}), libre('t5', 4, 9, {res: 'EP', drain: 'collecte'})])];
      const avant = JSON.parse(JSON.stringify(plans)), cs = JSON.stringify(vs[1].constat), zip = new window.JSZip();
      zip.file('Sauvegarde fictive/_sauvegarde/vede-terrain-sauvegarde.json', JSON.stringify({format: 'vede-terrain', version: 1, app: 'test', exportedAt: new Date().toISOString(),
        etude: e, visites: vs, anomalies: [], photos: [], biblio: [], plans, fonds: []}));
      const ok = await T.restoreZip(await zip.generateAsync({type: 'blob'})), apres = [];
      for (const v of vs) apres.push(await T.DB.get('plans', v.id) || null);
      /* analyse d'un plan (Q8 b) : résultat par source et anomalies, avant et après la restauration */
      const V = window.VCroquis, sig = pl => { if (!pl) return null; const c = () => JSON.parse(JSON.stringify(pl)), an = V.analyser(c(), 'edl'), L = V.anomaliesDoc(c(), an);
        return Object.keys(an.resObj).sort().map(id => id + '=' + an.resObj[id].etat + ':' + (an.resObj[id].nets || []).join(',')).join(' ')
          + ' | ' + L.map(a => [a.cle, a.objId, a.st, a.nc ? 'NC' : 'réserve', a.obs].join(' ')).sort().join(' ; '); };
      return {ok, avant, apres, cs, analyses: avant.map((pl, i) => [sig(pl), sig(apres[i])])};
    }, LONG);
    const el = (pl, id) => ((pl && pl.el) || []).find(q => q.id === id) || {};
    const dest = q => JSON.stringify(['nom', 'ab', 'art', 'ep', 'cst'].map(k => (q.p || {})[k]));
    const autres = (pl, ids) => JSON.stringify(((pl && pl.el) || []).filter(q => ids.indexOf(q.id) < 0));
    const [P1, P2, P3] = vu.apres, [A1, A2, A3] = vu.avant;
    R.ok(vu.ok === true && !!P1 && !!P2 && !!P3, '14 sauvegarde aux destinations fausses restaurée, ses trois plans gardés (' + vu.ok + ', ' + vu.apres.map(x => !!x).join(', ') + ')');
    R.ok(dest(el(P1, 'E1')) === JSON.stringify([LONG, null, 'x', 'x', 'autre']),
      '14 destination au nom de 300 caractères, article « x », EP « x », case 7 : nom, article et EP gardés tels quels (textes), abréviation toujours absente, case « autre » ('
      + dest(el(P1, 'E1')).slice(0, 40) + '…' + dest(el(P1, 'E1')).slice(-30) + ')');
    R.ok(dest(el(P1, 'E2')) === JSON.stringify(['   ', 'Étang du bas', 'la', 'x', 'autre']),
      '14 destination au nom blanc, abréviation trop longue, EP « x », case 7 : les textes gardés tels quels, case « autre » (' + dest(el(P1, 'E2')) + ')');
    R.ok(dest(el(P1, 'E4')) === JSON.stringify(['', 'Au', 'l\'', 'arbitrer', 'autre']) && dest(el(P1, 'E5')) === JSON.stringify(['Fossé', 'Fo', 'le', 'nc', 'GARG']),
      '14 champs qui ne sont pas du texte remplacés par le repli : nom vide (lu « Autre destination »), « Au », « l\' », à arbitrer, « autre » ; « Fossé » : « Fo », « le », le reste gardé ('
      + dest(el(P1, 'E4')) + ' ; ' + dest(el(P1, 'E5')) + ')');
    const t1 = el(P1, 't1').p || {}, t4 = el(P1, 't4').p || {}, t6 = el(P1, 't6').p || {};
    R.ok(t1.drain === 'oui' && !('drain' in t6) && t4.drain === 'infiltration', '14 p.drain « oui » (texte) gardé, 5 (nombre) retiré ; témoin : drain d\'infiltration gardé ('
      + JSON.stringify([t1.drain, t6, t4.drain]) + ')');
    const ch = ['E1', 'E2', 'E4', 'E5', 't6'];
    R.ok(autres(P1, ch) === autres(A1, ch) && JSON.stringify(el(P1, 't6').v) === JSON.stringify(el(A1, 't6').v),
      '14 les autres objets du plan sont rendus tels quels (aucun champ ajouté)');
    R.ok(dest(el(P2, 'E3')) === JSON.stringify(['Étang', 'Ét', 'l\'', 'x', 'autre']) && autres(P2, ['E3']) === autres(A2, ['E3']),
      '14 plan d\'un constat signé : sa destination à l\'EP « x » gardée telle quelle, le reste aussi (' + dest(el(P2, 'E3')) + ')');
    R.ok(vu.analyses.every(x => !!x[0] && x[0] === x[1]) && /D1=/.test(vu.analyses[0][0]) && /ep-exu/.test(vu.analyses[0][0]),
      '14 même analyse avant et après la restauration, pour les trois plans (résultat par source, anomalies) ('
      + vu.analyses.map(x => x[0] === x[1] ? 'même' : String(x[0]).slice(0, 120) + ' ≠ ' + String(x[1]).slice(0, 120)).join(' ; ') + ')');
    R.ok(!!P3 && JSON.stringify(P3.el) === JSON.stringify(A3.el), '14 garde : plan sans destination ni drain invalide rendu tel quel');
    /* l'éditeur ouvre le plan réparé : symbole de E1 dans sa fiche (« Ma ») ; fiche de la descente D1 : le nom écrit tel quel, jamais du HTML */
    await p.evaluate(() => { location.hash = '#/e/etude-reparation-fictive/v/visite-reparation-1'; });
    await p.waitForFunction(() => { const r = window.__VT.S.route; return !!r && r.name === 'visit'; }); await C.pause(p, 400);
    await C.ouvrirCroquis(p, {dejaCommence: true});
    const fi = await p.evaluate(async () => {
      const ed = window.__vcEd, lire = () => { const t = document.querySelector('.vc-ftete'); return t ? {svg: (t.querySelector('svg text') || {}).textContent || '', etat: (t.querySelector('.vc-etat') || {}).textContent || '', b: !!t.querySelector('.vc-etat b')} : null; };
      ed.selectionner('E1'); await new Promise(r => setTimeout(r, 300)); const e1 = lire();
      ed.selectionner('D1'); await new Promise(r => setTimeout(r, 300)); return {e1, d1: lire()};
    });
    R.ok(!!fi.e1 && fi.e1.svg === 'Ma', '14 fiche de la destination réparée : son symbole porte « Ma » (' + JSON.stringify(fi.e1) + ')');
    R.ok(!!fi.d1 && fi.d1.etat.indexOf(NOM.replace(/^M/, 'm')) >= 0 && !fi.d1.b, '14 témoin, fiche de la descente : le nom de la destination écrit tel quel, sans balise (' + JSON.stringify(fi.d1) + ')');
    await C.fermerCroquis(p);
    /* croquis de la visite 2 (constat signé) ouvert puis fermé : l'ouverture gèle le constat signé (c.fige : ce qu'il affiche, posé une fois) ;
       ce qui a été signé ne change pas */
    await p.evaluate(() => { location.hash = '#/e/etude-reparation-fictive/v/visite-reparation-2'; });
    await p.waitForSelector('[data-act="vc-ouvrir"][data-vid="visite-reparation-2"]'); await C.pause(p, 400);
    await C.ouvrirCroquis(p, {dejaCommence: true});
    await p.waitForFunction(() => { const d = window.__vcEd && window.__vcEd.doc(); return !!d && d.visiteId === 'visite-reparation-2'; });
    await C.fermerCroquis(p);
    const cs2 = await p.evaluate(async () => {
      const v = await window.__VT.DB.get('visites', 'visite-reparation-2'), c = v && v.constat ? Object.assign({}, v.constat) : null;
      if (!c) return null; const f = c.fige; delete c.fige; return {c: JSON.stringify(c), gel: f ? f.conclusion : null};
    });
    R.ok(!!cs2 && cs2.c === vu.cs && cs2.gel === 'conformes', '14 constat signé inchangé après la restauration et l\'ouverture puis la fermeture de son croquis '
      + '(seul le gel de l\'ouverture s\'y ajoute, conclusion « ' + (cs2 && cs2.gel) + ' »)' + (cs2 && cs2.c === vu.cs ? '' : ' : ' + String(cs2 && cs2.c).slice(0, 200)));
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'réparation : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

(async () => {
  await parcours();
  await restauration();
  await enregistrement();
  await pdfBoite();
  await coteBoite();
  await sansCroquis();
  await casesEP();
  await reparation();
  R.fin();
})();
