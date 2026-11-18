// Croquis et dossier dans l'application (Chromium, données fictives) : la nature choisie à la main reste celle du technicien quand une
// anomalie écartée revient, puis quand le dessin change. Tampon béton d'un regard (NC en EU, réserve en EP) :
// 1 : regard relié au collecteur EP (réserve), « Non-conformité » cochée, anomalie écartée, regard délié pendant le retrait, retenue de
//     nouveau, puis regard relié de nouveau : la NC reste, constat proposé « Non conformes » ;
// 2 : l'inverse : regard non relié (NC), réserve choisie, écartée, regard relié au collecteur EP, retenue, regard délié : la réserve reste.
// 3 : « Reprendre du croquis » : un lavabo seul compte sur la ligne « Évier » (il se confond avec l'évier), sans ligne « Autres » ni salle de bain.
// 4 à 6 : dossier commencé en v1.6.2, ouvert en v1.6.3 (échouent sur 48f611c) : la ligne Salle de bain que l'ancien croquis avait remplie suit le
//     croquis dès l'ouverture du constat ; une anomalie restée intacte que le dessin met à jour est rappelée, puis reportée à la réouverture du
//     croquis ; un constat signé reste tel quel, sans écart rappelé.
// 7 : évier relié directement et lavabo par une fosse (ligne « Évier » ×2, non conforme sur le croquis), raccordement de l'évier coché : l'écart
//     « non conforme sur le croquis de terrain, conforme au constat » est rappelé (échoue sur b0ef508) ; 8 : témoin, deux éviers conformes, aucun écart.
// 9 à 12 : ligne « Autres » saisie à la main et lavabo dessiné : « Lavabos » et « Lavabo de la salle d'eau » sont rappelés comme un double compte
//     possible (échouent sur be1d749), comme « Lavabo » (témoin) ; « Chaudière (purge, condensat) » ne l'est pas (témoin). Depuis m147, le
//     rappel dit « … figure aussi au constat, sur sa propre ligne » (9 à 11 et 66, 67 échouent sur daf662b : « … en « Autres » »).
// 13 à 17 : anomalie saisie à la main, hors croquis, dont le texte contient « lavabo » : ligne « Évier » (avant : « Salle de bain » ; décision
//     du 7 novembre 2026 ; échouent sur 22df7f2) ; une douche reste en salle de bain (témoin) ; sans ligne « Évier » comptée, aucune ligne.
//     Une pièce nommée avec le lavabo le situe, elle ne lie pas sa ligne : voir 30 à 40, 47 et 48 (m115).
// 18 à 24 (m97, décision du 7 novembre 2026) : plan PDF de l'état des lieux : « Conclusion du constat : … » quand le technicien l'a choisie dans
//     le constat (plan du dossier, plan de l'export, bouton PDF du croquis ; constat signé : celle qu'il a signée), sinon « Conclusion proposée : … »
//     d'après le dessin, comme avant (témoins : aucune conclusion choisie, choix retiré, visite non effectuée) ; 19 à 21 et 24 échouent sur 0a317cc.
// 25 et 26 (m111, décision D11) : Réglages de l'application, « Aides au dessin » : la case « Aides activées » dit ce qu'elle coupe (tracé libre,
//     sans redressement ni accroche au bâti) et que les tuyaux se raccordent toujours aux objets et aux autres tuyaux ; la note nomme le bouton
//     aimant et la palette d'accrochage du croquis ; échouent sur e6618ef.
// 27 à 29 (m112, puis m113) : nouveaux accrochages (« Milieu d'un côté », « Perpendiculaire », « Limites de parcelle », puis « Prolongement
//     d'un côté » et « Intersection ») dans les mêmes Réglages : cases décochées avec d'anciens réglages (sans leurs clés), cochées seulement
//     si la clé vaut true (null : décochée) ; un clic garde les clés connues ; échouent sur e9e8b5d ; 27 et 28 échouent aussi sur 4691c1a
//     (cases « Prolongement d'un côté » et « Intersection » absentes).
// 30 à 40, 47 et 48 (m115, L1) : anomalie saisie à la main qui nomme un lavabo et sa pièce, dans le texte ou la localisation (« Salle de bain »,
//     « 1er étage, salle de bains », « Lavabo de la salle de bain », « Cuisine ») : ligne « Évier » seule, la pièce situe le lavabo ; au constat
//     de l'écran, seule la ligne « Évier » est non conforme (39) ; sans évier compté, aucune ligne, et l'éditeur de l'anomalie affiche
//     « Automatique, aucune trouvée » (37, 40) ; 30 à 33, 37, 39 et 40 échouent sur 52f0b00 ; témoins : une douche ou un lave-vaisselle nommés
//     avec le lavabo lient aussi leur ligne (34, 38) ; sans lavabo, rien ne change (35, 36 ; 47 et 48 : la salle de bain nommée seule, dans
//     le texte ou la localisation, lie sa ligne, comme en v1.5.1).
// 41 à 46 (m115, L2) : constat signé (geste « c-lock ») sans conclusion choisie, puis une descente reliée à la boîte EU après la signature :
//     le plan PDF (plan du dossier, bouton du croquis, plan de l'export) imprime « Conclusion du constat : Conformes », celle que le constat
//     atteste ; 41 à 44 échouent sur 52f0b00 (« Conclusion proposée : … ») ; témoins : visite figée non effectuée (45), constat non signé (46).
// 49 à 58 (m119, consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) : WC relié sans boîte au collecteur EU
//     (à arbitrer d'office) et descente non visitable mise « À arbitrer » : conclusion proposée vide, rappels « Conclusion non précisée » et
//     « à arbitrer » (49) ; la ligne de la descente garde son raccordement sans être « oui », même ressaisi (50) ; « Oui » choisi pour la ligne
//     puis « Conformes » pour la conclusion : un rappel chacun (51) ; croquis désactivé : « Conformes », comme en v1.5.1 (52, témoin) ; constat
//     signé avant, sans arbitrage : conclusion et signature intactes, pas « Le dossier a changé » (53, garde) ; signé pendant l'arbitrage :
//     conclusion attestée vide, rien de « changé », même sans le résumé du croquis (54) ; puis les deux anomalies écartées : le plan du dossier
//     dit « Conclusion proposée : Conformes » (55) ; l'arbitrage tranché après la signature : « Le dossier a changé depuis la signature
//     (anomalies à arbitrer) », au dossier, au constat et à l'envoi, constat signé intact, et rien tant que le résumé du croquis n'est pas
//     prêt (56) ; WC vers une fosse septique peut-être traversée : sa ligne n'est ni « oui » ni « non », même ressaisie, et « Oui » choisi
//     donne le rappel (57) ; la fosse écartée : « oui » d'office (58, témoin). 49, 50, 51 et 54 à 57 échouent sur e728d76 ; 56 et 57
//     échouent aussi sur la première version de m119.
// 59 et 60 (m120, décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité) : descente avant reliée à un puits :
//     l'anomalie créée au dossier va sur la ligne « Gouttière(s) avant », « non », case gestEP cochée, préconisation « Suppression du rejet
//     dans le puits ; … » (59) ; réserve choisie au dossier : la ligne devient « oui », « Conformes avec réserves », sans rappel « non
//     conforme sur le croquis » (60). Échouent sur 7df0996 (type « puits » absent : aucune anomalie, ligne sans raccordement).
// 61 et 62 (m125, décisions D6 et D7) : descente avant reliée à une autre destination, un étang aux EP non conformes, à la case MILIEU du
//     constat (objet écrit dans le croquis, comme le pose l'outil de m127) : l'anomalie ep-exu créée au dossier va sur la ligne « Gouttière(s)
//     avant », « non », case gestEP cochée, préconisation « Suppression du rejet dans l'étang ; … » (61) ; réserve choisie au dossier : la
//     ligne devient « oui », « Conformes avec réserves », sans rappel « non conforme sur le croquis » (62). Échouent sur ebd5589 (type
//     « exutoire » absent : aucune anomalie, ligne sans raccordement).
// 61, 63 à 65 (relecture de m125) : le panneau Constat de l'éditeur ne promet « oui » pour une réserve que si la ligne a un code du
//     formulaire (milieu naturel, gargouille) : étang à la case MILIEU, la phrase le promet (61, et 62 le vérifie) ; étang à la case
//     « autre » (la case par défaut d'une autre destination), EP non conformes puis réserve choisie au dossier (63), ou EP en réserve dans
//     sa fiche (64) : ligne sans raccordement ni conformité, la phrase dit « à cocher à la main », sans promettre « oui » ; deux descentes
//     avant vers un puits et un puisard (ligne sans code), une descente arrière vers le puits (ligne MILIEU) : la phrase prudente seule ;
//     réserves choisies au dossier : ligne avant vide, ligne arrière « oui » (65). 63 à 65 échouent sur la première version de m125 (la
//     phrase promet « oui »).
// 66 à 68 (m131, décision D4) : WC à lave-mains intégré relié à une boîte EU : ligne « WC » ×1, aucun évier ; une ligne
//     « Lave-mains » saisie à la main est rappelée comme un double compte possible (66, échoue sur 824fabf), « Lavabo du WC » aussi,
//     comme avant (67) ; « Lavabo » ne l'est pas (68, témoin).
// 69 à 74 (m132, décisions D4 et D8) : autres appareils. Chaudière et attente dessinées, une ligne « Chaudière et attente » saisie
//     à la main : l'attente la prend (première ligne du croquis dans l'ordre de son identifiant), une ligne « Chaudière (purge, condensat) »
//     est créée, quel que soit l'ordre du dessin ; la chaudière mise « à arbitrer » marque sa ligne à elle, pas la ligne saisie (69, 70 ;
//     échouent sur 9ad0840 : la ligne saisie est liée aux deux, aucune n'est créée, et c'est elle que l'arbitrage marque) ;
//     « Bidet » et « Bidet suspendu » : deux lignes (71) ; dossier laissé par la v1.7.0, simulé (ligne « Bidet » absente, WC 1, urinoir
//     de la ligne « WC ») : WC 2 à l'ouverture du constat, l'écart rappelle le bidet, « Reprendre du croquis » remet sa ligne (72) ;
//     sauvegarde restaurée : les champs des autres appareils (nom vide, abréviation « ABCD », nom de 300 caractères, nom blanc) gardés tels
//     quels, lus « Autre appareil », 40 caractères, « Autre ouvrage EP », « Bi » (73) ; PDF du constat à dix lignes « Autres » (vingt lignes) :
//     chaque libellé tient dans sa case, sans chevauchement (74). 71 à 74 échouent sur 9ad0840 (type inconnu : aucune ligne). Depuis m147,
//     74 attend les noms seuls, sans « Autres : » (échoue sur daf662b).
// 75 et 76 (relecture de m132 ; consigne du 13 nov. 2026) : chaudière et attente dessinées, anomalie saisie dans le croquis sur la chaudière
//     et laissée « à arbitrer », ligne « Chaudière et attente » ×2 saisie à la main dans un constat jamais repris du croquis :
//     l'attente prend la ligne, la chaudière n'en a pas ; la ligne saisie reste marquée à arbitrer, ni « oui » ni « non », sans croix sous
//     « Oui » au PDF du constat, et un constat signé avant m132 pendant cet arbitrage ne se dit pas changé depuis ; dans les deux ordres du
//     dessin. Passent sur 9ad0840 ; échouent sur la première version de m132 (« oui » d'office, croix sous « Oui », « anomalies à arbitrer »).
//     Depuis m147, la rangée du PDF est lue sous son seul libellé, « Chaudière et attente » (échouent sur daf662b : rangée introuvable).
// 77 à 80 (m133 ; M2 de la relecture de m132) : « Bidet » et « Bidet suspendu » reliés à la boîte EU, non-conformité saisie dans le
//     croquis sur le bidet suspendu. Constat repris du croquis : l'anomalie est rangée sur la ligne « Bidet suspendu »
//     (installation et valeur notée du croquis), rien « à reporter », aucun rappel ; cette ligne « non », avec l'anomalie, la ligne
//     « Bidet » « oui », conclusion « Non conformes » ; au PDF du constat, croix sous « Non » pour « Bidet suspendu », sous « Oui »
//     pour « Bidet » (77 ; libellés sans « Autres : » depuis m147, échoue sur daf662b) ; garde : constat signé, l'anomalie remise sans
//     ligne n'est pas rangée (77) ; croquis rouvert puis
//     refermé : l'anomalie reste sur sa ligne, rien « à reporter » (78) ; constat jamais repris, sans ligne « Autres » : rappel « Bidet
//     suspendu : une anomalie du croquis de terrain n'est rangée sur aucune ligne du constat ; … », aucun pour le bidet (79) ; puis
//     « Reprendre du croquis » : lignes créées, l'anomalie rangée, plus de rappel (80). 77 à 80 échouent sur 53fe487 (l'anomalie n'est
//     rangée sur aucune ligne : les deux lignes « oui », croix sous « Oui » pour les deux, aucun rappel) ; la garde de 77 y passe.
// 81 et 82 (relecture de m133, M3) : même constat jamais repris, mais le technicien a mis l'anomalie sur « Aucune » : aucun rappel ne
//     promet que « Reprendre du croquis » l'y range (81) ; après la reprise, lignes créées, l'anomalie reste sur « Aucune » (82, garde).
//     81 échoue avant la relecture de m133 (rappel « … n'est rangée sur aucune ligne du constat ; … l'y range »).
// 83 à 87 (m137, réponse du 16 nov. 2026 à E2, décision D1) : la feuille « Autre installation EU » du constat ne propose plus « Lavabo »,
//     croquis désactivé dans les Réglages (83), puis activé, un lavabo dessiné (86) ; les sept autres puces restent, dans l'ordre ; 83 et 86
//     échouent sur 2f2a638. Témoins : « Douche » proposée, la feuille EP inchangée (84) ; « Lavabo » tapé à la main ajoute sa ligne
//     « Autres » (85) ; croquis activé, « Douche » proposée et la ligne « Lavabo » saisie reste (87).
// 88 à 94 (m143, réponse rangement-autres-par-texte du 16 nov. 2026, choix b ; décision D9 de `.claude/conception-v172.md`) : une chaudière
//     reliée à un puisard et deux points « Drain » reliés à la boîte EU, anomalies du croquis retenues ; elles vont sur la ligne liée à la
//     ligne « Autres » de leur objet, comme celles d'un autre appareil depuis m133. Constat repris, puis « Chaudière fioul » tapée :
//     l'anomalie de la chaudière sur « Chaudière (purge, condensat) » (installation et valeur notée), aucune sur « Chaudière fioul » ;
//     celles des deux drains sur la ligne « Drain » (88) ; croquis rouvert puis refermé : rien « à reporter », aucun rappel ; garde :
//     constat signé, l'anomalie remise sans ligne n'est rangée ni par la reprise ni par le suivi (89) ; localisation « Chaufferie,
//     chaudière fioul » : sur la ligne de sa chaudière (90 ; avant : sur aucune ligne, le texte ressemble aux deux) ; constat jamais
//     repris, « Chaudière fioul » tapée seule : au suivi, avant toute reprise, l'anomalie de la chaudière va sur elle (installation et
//     valeur notée ; avant : sur aucune ligne), une anomalie saisie au dossier « Chaudière fioul : … » y est rangée par son texte ;
//     « Reprendre du croquis » les y laisse, sans créer de ligne « Chaudière (purge, condensat) » (91) ; sans ligne « Drain » : rappel
//     « Drain : 2 anomalies du croquis de terrain ne sont rangées sur aucune ligne du constat ; … », puis « Reprendre du croquis » crée
//     la ligne et les y range (92) ; garde : lignes choisies par le technicien (« Chaudière fioul », « Aucune ») gardées après le suivi
//     et la reprise (93) ; témoin du livrable : comme 91, sans l'anomalie saisie au dossier : au suivi, « Chaudière fioul » passe de
//     « oui » à « non » au constat, croix sous « Non » au PDF du constat (94). 88, 90 à 92 et 94 échouent sur f71a6e7 (installations
//     vides ; 90 et 91 : sur aucune ligne ; 92 : aucun rappel ; 94 : « oui », croix sous « Oui ») ; 89 et 93 y passent. Depuis m147,
//     la rangée de 94 est lue sous son seul libellé, « Chaudière fioul » (échoue sur daf662b : rangée introuvable).
// 95 à 102 (m147 ; décisions D13 à D15, réponses S1 d et S2 b de `.claude/conception-v172.md`) : tableau des installations du PDF du
//     constat, rangée par rangée (libellé, hauteur, taille du texte). Présentation de la v1.7.2 : ni « Autres : » devant une ligne
//     ajoutée, ni ligne laissée vide ; hauteurs du formulaire par ligne (Évier 18 pt, Salle de bain et Cuisine 21,5, les autres et les
//     lignes ajoutées 17,5), mises à l'échelle des 218,5 pt du tableau ; texte en 9,5 pt, 8 pt au-delà de 14 rangées imprimées. Constat
//     non signé, croquis activé, sans ligne ajoutée : dix rangées (95) ; « Bidet », « Chaudière (purge, condensat) » et « Drain » repris
//     du croquis, « Fontaine » tapée : quatorze rangées sous leur seul libellé (96) ; croquis désactivé, « Autres : Fontaine » tapée :
//     gardée telle quelle, aucune ligne vide, puis croquis réactivé sans croquis commencé, puis croquis absent (module du croquis retiré
//     le temps de l'impression) : la même (97) ; constat signé sans marque (signé en v1.7.1, simulé) : la présentation de la v1.7.1,
//     « Autres : Bidet », la ligne vide « Autres : » en EP, hauteurs du formulaire (98, témoin) ; constat signé sans gel (v1.3.0), gelé
//     sans marque à l'ouverture du croquis : la présentation de la v1.7.1, avant et après le gel (99, garde) ; signé par le geste de
//     signature (marque 2), puis croquis désactivé : la présentation de la v1.7.2 gardée (100) ; signé sans marque, « Modifier le
//     constat signé ? » puis signé de nouveau : marque du jour, présentation de la v1.7.2 (101) ; nombre de rangées et taille du texte
//     (102) : signé sans marque, deux lignes EU ajoutées, treize rangées à parts égales en 9,5 pt (témoin) ; « Modifier », quatre lignes
//     EU ajoutées : quatorze rangées en 9,5 pt (la présentation de la v1.7.1 en aurait quinze, en 8 pt) ; cinq : quinze rangées en 8 pt ;
//     signé de nouveau sans marque : seize rangées à parts égales en 8 pt (témoin). 95 à 97, 100, 101 et 102 (quatorze et quinze
//     rangées) échouent sur daf662b (« Autres : », lignes vides, hauteurs des 12 rangées ou à parts égales ; aucune marque) ; 98, 99 et
//     les témoins de 102 y passent.
// usage : node tests/navigateur/dossier.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('dossier');

/* une étape : modifie le croquis (code src), met à jour le dossier, rend l'anomalie du tampon et le constat proposé */
const etape = (p, src) => p.evaluate(src => {
  const ed = window.__vcEd, d = ed.doc(), V = window.VCroquis, T = window.__VT, v = T.VC.ctx.v;
  const anoms = () => T.S.anoms.filter(a => a.visiteId === v.id);
  const pt = (id, t, x, y, q) => { d.el.push({id, k: 'pt', t, x, y, p: Object.assign(V.defautsPt(t), q || {}), lab: null}); };
  const ln = (id, t, res, sommets) => { const pos = {}; d.el.forEach(e => { if (e.k === 'pt') pos[e.id] = e; });
    d.el.push({id, k: 'ln', t, v: sommets.map(q => typeof q === 'string' ? {x: pos[q].x, y: pos[q].y, a: q} : {x: q[0], y: q[1], a: null}), p: Object.assign(V.defautsLn(t, {res}), {res}), lab: null}); };
  const relier = () => { pt('j', 'jonction', 0, 0); ln('b', 'tr', '', ['r1', 'j']); ln('K', 'col', 'EP', [[-10, 0], 'j', [10, 0]]); };
  const delier = () => { d.el = d.el.filter(e => e.id !== 'b' && e.id !== 'K' && e.id !== 'j'); };
  (new Function('d', 'pt', 'ln', 'relier', 'delier', 'anoms', src))(d, pt, ln, relier, delier, anoms);
  ed.synchroniser();
  const a = anoms().find(x => x.croquis && x.croquis.cle === 'tampon:r1');
  return {a: a ? {obs: a.observation, reseau: a.reseau, nature: T.anomNC(a) ? 'NC' : 'réserve'} : null, constat: T.constatEval(v, anoms()).auto};
}, src);

async function cas(nom, debut, choix, relierAvant, attendu){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const vu = [];
    vu.push(await etape(p, "pt('r1', 'regard', 0, 4, {tampon: 'beton'}); " + debut));
    vu.push(await etape(p, "anoms().find(x => x.croquis && x.croquis.cle === 'tampon:r1').nc = " + choix + ';'));
    vu.push(await etape(p, "d.decisions['tampon:r1'] = {st: 'ecartee'};"));
    vu.push(await etape(p, relierAvant ? 'relier();' : 'delier();'));
    vu.push(await etape(p, "delete d.decisions['tampon:r1'];"));
    vu.push(await etape(p, ''));
    vu.push(await etape(p, relierAvant ? 'delier();' : 'relier();'));
    const fin = vu[vu.length - 1], bon = !!fin.a && fin.a.nature === attendu.nature && fin.constat === attendu.constat && !!vu[4].a && vu[4].a.nature === attendu.nature;
    R.ok(bon, nom + ' : ' + (fin.a ? fin.a.obs + ', ' + fin.a.reseau + ', ' + fin.a.nature : 'anomalie absente') + ', constat proposé « ' + fin.constat + ' »'
      + (bon ? '' : ' (étapes : ' + vu.map(x => x.a ? x.a.nature : '-').join(' ') + ')'));
    R.ok(!A.erreurs.length, nom + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

async function lavabo(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), cx = v0.cx, cy = v0.cy, o = (x, y) => [cx + x, cy + y];
    const els = [C.P('w1', 'wc', ...o(-3, 0)), C.P('la', 'lavabo', ...o(3, 0)), C.P('B', 'boite', ...o(0, -4), {res: 'EU'})], I = C.index(els);
    els.push(C.L('A', 'tr', ['w1', 'B'], I), C.L('Bl', 'tr', ['la', 'B'], I));
    await C.injecter(p, {el: els});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
    await C.fermerCroquis(p); await C.pause(p, 600);
    const r = await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; const n = T.constatDepuisCroquis(v, await T.vcResume(v), false);
      return {n, rows: (v.constat && v.constat.rows || []).filter(x => x.nb).map(x => x.label + ' ×' + x.nb + (x.std ? '' : ' (Autres)'))}; });
    R.ok(r.rows.indexOf('Évier ×1') >= 0 && !r.rows.some(x => /^Salle de bain|\(Autres\)$/.test(x)), '3 lavabo seul repris du croquis : ' + r.rows.join(' ; '));
    R.ok(!A.erreurs.length, '3 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : ''));
  } finally { await A.fermer(); }
}

/* Constat d'un dossier : dessin (objets [id, type, x, y, propriétés], tracés [id, de, à]) injecté, croquis fermé, constat repris du croquis, puis
   prep (code : T, v, c le constat, a la première anomalie du dossier), enfin l'affichage du constat ; apres : le croquis rouvert et refermé, le
   constat affiché de nouveau. Rend les lignes actives du constat, les écarts affichés, le texte du bloc du croquis et l'installation de a.
   panneau (relecture de m125) : les phrases du panneau Constat de l'éditeur, lues avant la fermeture du croquis, rendues dans notes.
   o (m132) : o.reprise, « Reprendre du croquis » (action c-croq-fill) puis le constat lu de nouveau ({avant, apres}) ; o.fin(p) : une
   lecture de plus, rendue dans fin ; o.finAvant(p) (m143) : la même lecture, faite au premier affichage du constat, avant la réouverture
   du croquis et la reprise (rendue dans avant.fin quand l'une d'elles suit). autres : les lignes « Autres » du constat, libellé, nombre
   et ligne du croquis liée (croq) */
async function constatVu(nom, objs, traces, prep, apres, panneau, o){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), els = objs.map(([id, t, x, y, q]) => C.P(id, t, v0.cx + x, v0.cy + y, q)), I = C.index(els);
    traces.forEach(([id, a, b]) => els.push(C.L(id, 'tr', [a, b], I)));
    /* o.anomManu : anomalies saisies à la main dans le croquis (75, 76) */
    await C.injecter(p, {el: els, anomManu: o && o.anomManu});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
    const notes = panneau ? await p.evaluate(() => { const ed = window.__vcEd; ed.ouvrirPanneau('constat');
      const n = [...document.querySelectorAll('.vc-panneau .vc-pcorps p.vc-muet')].map(x => x.textContent.trim()); ed.ouvrirPanneau(null); return n; }) : null;
    await C.fermerCroquis(p); await C.pause(p, 600);
    await p.evaluate(async src => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; T.constatDepuisCroquis(v, await T.vcResume(v), false);
      (new Function('T', 'v', 'c', 'a', src))(T, v, v.constat, T.S.anoms.find(x => x.visiteId === v.id)); T.VC_RESUMES.delete(v.id); await T.flushSaves(); }, prep);
    const etat = async () => {
      await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
      await p.waitForSelector('.croq-fill'); await p.waitForFunction(() => window.__VT.VC_RESUMES.has(window.__VT.S.visites[0].id)); await C.pause(p, 900);
      return p.evaluate(() => { const T = window.__VT, v = T.S.visites[0], a = T.S.anoms.find(x => x.visiteId === v.id), b = document.querySelector('.croq-fill p');
        /* constat évalué (m120) : conformité des lignes actives, conclusion proposée, préconisations cochées ; nc : nature de l'anomalie
           selon l'application (anomNC : a.nc n'est écrit que s'il diffère de sa règle) */
        const E = T.constatEval(v, T.S.anoms.filter(x => x.visiteId === v.id));
        return {rows: (v.constat.rows || []).filter(x => String(x.nb || '').trim()).map(x => x.id + ' ×' + x.nb + ' ' + (x.raccord || '-')).join(', '),
          ecarts: [...document.querySelectorAll('#croq-ecarts li')].map(x => x.textContent), bloc: b ? b.textContent : '', inst: a ? a.installation : null,
          conf: E.rows.filter(x => String(x.r.nb || '').trim()).map(x => x.r.id + ' ' + JSON.stringify(x.conf)).join(', '), auto: E.auto,
          precos: Object.keys(E.precos).filter(k => E.precos[k]).join(','), preco: a ? a.preconisation : null, nc: a ? T.anomNC(a) : null,
          autres: (v.constat.rows || []).filter(x => !x.std).map(x => x.label + ' ×' + (String(x.nb == null ? '' : x.nb).trim() || '-') + (x.croq ? ' [' + x.croq + ']' : '')).join(' ; ')}; });
    };
    let e = await etat();
    if (o && o.finAvant) e.fin = await o.finAvant(p);
    if (apres){ await p.evaluate(() => { location.hash = '#/e/' + window.__VT.S.visites[0].etudeId + '/v/' + window.__VT.S.visites[0].id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
      await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 600);
      e = {avant: e, apres: await etat()}; }
    if (o && o.reprise){ await p.evaluate(async () => { await window.__VT.ACTIONS['c-croq-fill'](); }); await C.pause(p, 600); e = {avant: e, apres: await etat()}; }
    if (o && o.fin) e.fin = await o.fin(p);
    if (notes) e.notes = notes;
    return e;
  } finally { R.ok(!A.erreurs.length, nom + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}
/* Dossier commencé en v1.6.2 (le croquis comptait alors un lavabo seul en salle de bain), ouvert en v1.6.3 : un lavabo seul relié à une boîte
   (EU, ou EP pour une anomalie rangée sur une ligne), l'état laissé par la v1.6.2 recréé par prep (constat, anomalie) */
const v162 = (nom, res, prep, apres) => constatVu(nom, [['la', 'lavabo', 0, 0], ['B', 'boite', 0, -4, {res}]], [['Bl', 'la', 'B']], prep, apres);
async function depuis162(){
  /* ligne Salle de bain remplie par l'ancien croquis, que personne n'a touchée : elle suit le croquis dès l'affichage du constat */
  let e = await v162('4', 'EU', "const r = c.rows.find(x => x.id === 'evier'), s = c.rows.find(x => x.id === 'sdb'); s.nb = r.nb; s.raccord = r.raccord; s.methodes = r.methodes.slice();"
    + " r.nb = ''; r.raccord = ''; r.methodes = []; c.croqAuto.rows = {sdb: c.croqAuto.rows.evier};");
  R.ok(e.rows === 'evier ×1 EU_D' && !e.ecarts.length, '4 ligne « Salle de bain » reprise de l\'ancien croquis : suit le croquis à l\'affichage du constat : ' + e.rows + (e.ecarts.length ? ' ; écarts : ' + e.ecarts.join(' | ') : ''));
  /* anomalie du lavabo rangée en salle de bain par la v1.6.2, restée intacte : écart, puis reportée sur « Évier » à la réouverture du croquis */
  e = await v162('5', 'EP', "a.installation = 'sdb'; a.croquis = Object.assign({}, a.croquis, {auto: Object.assign({}, a.croquis.auto, {installation: 'sdb'})});", true);
  const rappel = x => x.ecarts.some(t => /ne suit pas encore le croquis de terrain/.test(t));
  R.ok(e.avant.inst === 'sdb' && rappel(e.avant) && e.apres.inst === 'evier' && !rappel(e.apres), '5 anomalie du lavabo rangée en salle de bain par la v1.6.2 : '
    + (rappel(e.avant) ? 'écart affiché' : 'aucun écart') + ', puis ' + e.apres.inst + ' à la réouverture du croquis' + (rappel(e.apres) ? ', écart resté' : ''));
  /* constat signé en v1.6.2 : il reste tel quel et le croquis n'y rappelle aucun écart */
  e = await v162('6', 'EU', "const r = c.rows.find(x => x.id === 'evier'); r.nb = ''; r.raccord = ''; r.methodes = []; c.croqAuto.rows = {}; c.signeLe = new Date().toISOString();");
  R.ok(!e.rows && !e.ecarts.length && /Constat signé/.test(e.bloc), '6 constat signé : inchangé (' + (e.rows || 'aucune ligne') + '), aucun écart rappelé' + (e.ecarts.length ? ' : ' + e.ecarts.join(' | ') : '') + ', bloc « ' + e.bloc.slice(0, 60) + ' »');
}
/* évier relié directement et lavabo d'une autre pièce qui traverse une fosse : une ligne « Évier » ×2 que le croquis juge non conforme ; le
   technicien coche le raccordement de l'évier (EU départemental) : le constat la dirait conforme, un écart le rappelle (échoue sur b0ef508).
   Témoin : deux éviers reliés directement, conformes sur le croquis comme au constat, sans écart */
async function fosseSurLigne(){
  const B = ['B', 'boite', 0, -6, {res: 'EU'}], conf = x => x.ecarts.filter(t => /non conforme sur le croquis de terrain/.test(t));
  let e = await constatVu('7', [['ev', 'evier', -4, 0], ['la', 'lavabo', 4, 0], ['F', 'fosse', 4, -3], B], [['Le', 'ev', 'B'], ['Ll', 'la', 'F'], ['Lf', 'F', 'B']],
    "c.rows.find(x => x.id === 'evier').raccord = 'EU_D';");
  R.ok(e.rows === 'evier ×2 EU_D' && conf(e).length === 1 && /Fosse septique/.test(conf(e)[0]), '7 évier direct et lavabo par une fosse, « EU départemental » coché : '
    + e.rows + ' ; ' + (conf(e)[0] || 'aucun écart de conformité'));
  e = await constatVu('8', [['e1', 'evier', -4, 0], ['e2', 'evier', 4, 0], B], [['L1', 'e1', 'B'], ['L2', 'e2', 'B']], '');
  R.ok(e.rows === 'evier ×2 EU_D' && !conf(e).length && !e.ecarts.length, '8 témoin, deux éviers reliés directement : ' + e.rows + (e.ecarts.length ? ' ; écarts : ' + e.ecarts.join(' | ') : ', aucun écart'));
}
/* Puits (m120, décision du 13 nov. 2026 : un rejet EP dans un puits est une non-conformité) : descente avant reliée à un puits. L'anomalie
   ep-puits est créée au dossier sur la ligne « Gouttière(s) avant » : ligne « non », case gestEP, sa préconisation (59). Réserve choisie au
   dossier : la ligne devient « oui », conclusion « reserves », sans rappel « non conforme sur le croquis » (60) */
async function puits(){
  const O = [['d', 'descente', 0, 0, {cote: 'avant', visitable: 'oui'}], ['W', 'puits', 0, -5]], L = [['Lw', 'd', 'W']];
  const PRE = 'Suppression du rejet dans le puits ; raccordement au branchement EP ou gestion à la parcelle';
  const ncC = x => x.ecarts.filter(t => /non conforme sur le croquis de terrain/.test(t)), vu = x => JSON.stringify({rows: x.rows, conf: x.conf, auto: x.auto, inst: x.inst,
    nc: x.nc, precos: x.precos, preco: x.preco, ecarts: x.ecarts});
  let e = await constatVu('59', O, L, '');
  R.ok(e.rows === 'gout_av ×1 MILIEU' && e.conf === 'gout_av "non"' && e.auto === 'non_conformes' && e.inst === 'gout_av' && e.nc === true && /(^|,)gestEP(,|$)/.test(e.precos)
    && e.preco === PRE && !ncC(e).length, '59 descente reliée à un puits : anomalie au dossier sur la ligne « Gouttière(s) avant », « non », case gestEP, préconisation (' + vu(e) + ')');
  e = await constatVu('60', O, L, 'if (a) a.nc = false;');
  R.ok(e.rows === 'gout_av ×1 MILIEU' && e.conf === 'gout_av "oui"' && e.auto === 'reserves' && e.nc === false && !ncC(e).length,
    '60 réserve choisie au dossier : ligne « oui », « Conformes avec réserves », aucun rappel « non conforme sur le croquis » (' + vu(e) + ')');
  /* 65 (relecture de m125) : deux descentes avant, vers le puits et vers un puisard (ligne sans code du formulaire : rejets différents), une
     descente arrière vers le puits (ligne MILIEU) : le panneau Constat de l'éditeur n'a que la phrase prudente, sans promettre « oui » ;
     réserves choisies au dossier : ligne avant sans conformité, ligne arrière « oui » */
  const O3 = [['d', 'descente', 0, 0, {cote: 'avant', visitable: 'oui'}], ['d2', 'descente', 4, 0, {cote: 'avant', visitable: 'oui'}],
    ['d3', 'descente', -4, 0, {cote: 'arriere', visitable: 'oui'}], ['W', 'puits', 0, -5], ['P', 'puisard', 4, -5]];
  const MAIN = 'Rejet dans un puits : au constat, la ligne EP suit son anomalie. « Non » si elle reste non conforme ; sinon, la conformité reste à cocher à la main.';
  e = await constatVu('65', O3, [['Lw', 'd', 'W'], ['Lp', 'd2', 'P'], ['L3', 'd3', 'W']], 'T.S.anoms.filter(x => x.visiteId === v.id).forEach(x => { x.nc = false; });', false, true);
  R.ok(e.rows === 'gout_av ×2 -, gout_ar ×1 MILIEU' && e.conf === 'gout_av "", gout_ar "oui"' && e.auto === 'reserves' && (e.notes || []).indexOf(MAIN) >= 0
    && !(e.notes || []).some(t => /« oui »/.test(t)), '65 descentes avant vers le puits et un puisard, arrière vers le puits : le panneau dit « à cocher à la main », sans promettre « oui » ;'
    + ' réserves au dossier : ligne avant vide, ligne arrière « oui » (' + JSON.stringify({rows: e.rows, conf: e.conf, auto: e.auto, notes: e.notes}) + ')');
}
/* Autre destination (m125, décisions D6 et D7) : descente avant reliée à un étang aux EP non conformes, à la case MILIEU du constat. L'anomalie
   ep-exu est créée au dossier sur la ligne « Gouttière(s) avant » : ligne « non », case gestEP, sa préconisation (61). Réserve choisie au
   dossier : la ligne devient « oui », conclusion « reserves », sans rappel « non conforme sur le croquis » (62). Panneau Constat de l'éditeur
   (relecture de m125) : à la case MILIEU, la phrase promet « oui » pour une réserve (61) ; à la case « autre », la case par défaut, la ligne
   n'a pas de code du formulaire : une réserve, choisie au dossier (63) ou dans la fiche (64), n'y donne jamais « oui », la phrase ne le promet pas */
async function destination(){
  const E0 = {nom: 'Étang', ab: 'Ét', art: 'l\'', ep: 'nc', cst: 'MILIEU'};
  const O = [['d', 'descente', 0, 0, {cote: 'avant', visitable: 'oui'}], ['E', 'exutoire', 0, -5, E0]], L = [['Le', 'd', 'E']];
  const PRE = 'Suppression du rejet dans l\'étang ; raccordement au branchement EP ou gestion à la parcelle';
  const ncC = x => x.ecarts.filter(t => /non conforme sur le croquis de terrain/.test(t)), vu = x => JSON.stringify({rows: x.rows, conf: x.conf, auto: x.auto, inst: x.inst,
    nc: x.nc, precos: x.precos, preco: x.preco, ecarts: x.ecarts, notes: x.notes});
  const DIT = 'Rejet dans l\'étang : au constat, la ligne EP suit son anomalie. « Non » si elle reste non conforme';
  const OUI = DIT + ', « oui » si le dossier en fait une réserve.', MAIN = DIT + ' ; sinon, la conformité reste à cocher à la main.';
  const promet = x => (x.notes || []).some(t => /« oui »/.test(t));
  let e = await constatVu('61', O, L, '', false, true);
  R.ok(e.rows === 'gout_av ×1 MILIEU' && e.conf === 'gout_av "non"' && e.auto === 'non_conformes' && e.inst === 'gout_av' && e.nc === true && /(^|,)gestEP(,|$)/.test(e.precos)
    && e.preco === PRE && !ncC(e).length, '61 descente reliée à un étang aux EP non conformes : anomalie au dossier sur la ligne « Gouttière(s) avant », « non », case gestEP, préconisation (' + vu(e) + ')');
  R.ok((e.notes || []).indexOf(OUI) >= 0 && (e.notes || []).indexOf(MAIN) < 0, '61 panneau Constat de l\'éditeur, étang à la case MILIEU : la phrase promet « oui » si le dossier en fait une réserve ('
    + JSON.stringify(e.notes) + ')');
  e = await constatVu('62', O, L, 'if (a) a.nc = false;');
  R.ok(e.rows === 'gout_av ×1 MILIEU' && e.conf === 'gout_av "oui"' && e.auto === 'reserves' && e.nc === false && !ncC(e).length,
    '62 réserve choisie au dossier : ligne « oui », « Conformes avec réserves », aucun rappel « non conforme sur le croquis » (' + vu(e) + ')');
  const autre = q => [O[0], ['E', 'exutoire', 0, -5, Object.assign({}, E0, {cst: 'autre'}, q)]];
  e = await constatVu('63', autre({}), L, 'if (a) a.nc = false;', false, true);
  R.ok(e.rows === 'gout_av ×1 -' && e.conf === 'gout_av ""' && e.auto === 'reserves' && e.inst === 'gout_av' && e.nc === false && (e.notes || []).indexOf(MAIN) >= 0 && !promet(e),
    '63 étang à la case « autre », réserve choisie au dossier : ligne sans raccordement ni conformité ; le panneau dit « à cocher à la main », sans promettre « oui » (' + vu(e) + ')');
  e = await constatVu('64', autre({ep: 'reserve'}), L, '', false, true);
  R.ok(e.rows === 'gout_av ×1 -' && e.conf === 'gout_av ""' && e.auto === 'reserves' && e.inst === 'gout_av' && e.nc === false && (e.notes || []).indexOf(MAIN) >= 0 && !promet(e),
    '64 étang aux EP en réserve dans sa fiche, case « autre » : ligne sans raccordement ni conformité ; le panneau dit « à cocher à la main », sans promettre « oui » (' + vu(e) + ')');
}
/* ligne « Autres » saisie à la main pour un appareil que le croquis compte déjà (un lavabo dessiné, sur la ligne « Évier ») : le constat le
   compterait deux fois, un écart le rappelle. Le libellé au pluriel ou précisé (« Lavabos », « Lavabo de la salle d'eau ») passait inaperçu
   (échoue sur be1d749) ; « Lavabo » tel quel était déjà rappelé (témoin) ; une autre installation n'est pas rappelée (témoin) */
async function autresDouble(){
  const objs = [['la', 'lavabo', 0, 0], ['B', 'boite', 0, -4, {res: 'EU'}]], tr = [['Bl', 'la', 'B']];
  const dbl = x => x.ecarts.filter(t => /figure aussi au constat, sur sa propre ligne/.test(t));
  for (const [n, lab, att] of [['9', 'Lavabos', 1], ['10', 'Lavabo de la salle d\'eau', 1], ['11', 'Lavabo', 1], ['12', 'Chaudière (purge, condensat)', 0]]){
    const e = await constatVu(n, objs, tr, "c.rows.push({id: 'au1', groupe: 'EU', label: " + JSON.stringify(lab) + ", std: false, nb: '1', raccord: '', conforme: '', methodes: []});");
    R.ok(dbl(e).length === att && (!att || new RegExp('« ' + lab.replace(/[()]/g, '\\$&') + ' » \\(1\\)').test(dbl(e)[0])), n + ' ligne « ' + lab + ' » saisie à la main, lavabo dessiné : '
      + (dbl(e)[0] || 'aucun double compte rappelé') + (att ? '' : ' (témoin)'));
  }
}

/* WC à lave-mains intégré (m131 ; D4) : compté sur la ligne « WC », sans évier ; le résumé du croquis donne à cette ligne les types « WC » et
   « Lave-mains ». Une ligne « Lave-mains » saisie à la main à côté est rappelée comme un double compte (66, échoue sur 824fabf) ;
   « Lavabo du WC » l'était déjà, par le mot « WC » (67) ; « Lavabo » ne l'est pas, aucun lavabo n'est dessiné (68, témoin) */
async function laveMains(){
  const objs = [['w', 'wc', 0, 0, {lm: 'oui'}], ['B', 'boite', 0, -4, {res: 'EU'}]], tr = [['Bw', 'w', 'B']];
  const dbl = x => x.ecarts.filter(t => /figure aussi au constat, sur sa propre ligne/.test(t));
  for (const [n, lab, att] of [['66', 'Lave-mains', 1], ['67', 'Lavabo du WC', 1], ['68', 'Lavabo', 0]]){
    const e = await constatVu(n, objs, tr, "c.rows.push({id: 'au1', groupe: 'EU', label: " + JSON.stringify(lab) + ", std: false, nb: '1', raccord: '', conforme: '', methodes: []});");
    const lignes = e.rows.split(', '), wc = lignes.some(x => /^wc ×1 /.test(x)) && !lignes.some(x => /^evier /.test(x));
    R.ok(wc && dbl(e).length === att && (!att || new RegExp('« ' + lab + ' » \\(1\\)').test(dbl(e)[0])), n + ' ligne « ' + lab + ' » saisie à la main, WC + lave-mains dessiné : '
      + (dbl(e)[0] || 'aucun double compte rappelé') + (att ? '' : ' (témoin)') + ' ; lignes ' + e.rows);
  }
}

/* anomalie saisie à la main, hors croquis (aucune ligne choisie) : lignes du constat que ses mots désignent. Décision du 7 novembre 2026 : le
   lavabo se confond avec l'évier, comme sur le croquis (ligne « Évier ») ; avant, le mot « lavabo » rangeait l'anomalie en salle de bain. Sans
   ligne « Évier » comptée, aucune ligne : en cas de doute, l'application n'en choisit pas, le technicien la choisit dans l'anomalie */
async function motLavabo(){
  const A = await C.ouvrir(), p = A.p;
  try {
    const cas = [['13 « Lavabo : non siphonné »', 'Lavabo : non siphonné', '1', 'evier'],
      ['14 anomalie type « Rejet évier, lave-linge (sous-sol) et lavabo (étage) sur le réseau EP »', 'Rejet évier, lave-linge (sous-sol) et lavabo (étage) sur le réseau EP', '1', 'lavelinge+evier'],
      ['15 anomalie type « Rejet du lavabo, de la buanderie et du siphon (sous escalier) vers le réseau EP »', 'Rejet du lavabo, de la buanderie et du siphon (sous escalier) vers le réseau EP', '1', 'evier'],
      ['16 « Douche non raccordée » (témoin)', 'Douche non raccordée', '1', 'sdb'],
      ['17 « Lavabo : non siphonné », aucun évier compté', 'Lavabo : non siphonné', '0', 'aucune']];
    const vu = await p.evaluate(cas => { const T = window.__VT;
      const rows = ev => [['wc', 'WC', '1'], ['lavelinge', 'Lave-linge', '1'], ['evier', 'Évier', ev], ['sdb', 'Salle de bain (douche ou baignoire et lavabo)', '1']]
        .map(([id, label, nb]) => ({id, groupe: 'EU', label, std: true, nb, raccord: '', conforme: '', methodes: []}));
      return cas.map(k => T.anomRows({rows: rows(k[2])}, {reseau: 'EU', observation: k[1], localisation: '', installation: ''}).map(r => r.id).join('+') || 'aucune'); }, cas);
    cas.forEach((k, i) => R.ok(vu[i] === k[3], k[0] + ' : ' + vu[i] + (vu[i] === k[3] ? '' : ' (attendu ' + k[3] + ')')));
  } finally { await A.fermer(); }
}

/* m115 (L1) : anomalie saisie à la main qui nomme un lavabo et la pièce où il se trouve (dans le texte ou la localisation) : la pièce situe le
   lavabo, elle ne lie pas sa ligne (« Salle de bain », « Cuisine ») ; une douche, une baignoire ou un lave-vaisselle nommés avec lui lient
   toujours la leur (deux installations nommées, deux lignes) ; sans lavabo nommé, rien ne change ; sans ligne « Évier » comptée, aucune
   ligne, même avec une pièce nommée. Lignes fictives ; dossier fictif (12 rue Fictive, Ville-Exemple) */
async function lavaboPiece(){
  const A = await C.ouvrir(), p = A.p;
  try {
    const OBS = 'Lavabo : rejet au réseau EP', SDB = 'Lavabo de la salle de bain : rejet au réseau EP';
    const cas = [['30 « ' + OBS + ' », localisation « Salle de bain »', OBS, 'Salle de bain', '1', 'evier'],
      ['31 « ' + OBS + ' », localisation « 1er étage, salle de bains »', OBS, '1er étage, salle de bains', '1', 'evier'],
      ['32 « ' + SDB + ' »', SDB, '', '1', 'evier'],
      ['33 « ' + OBS + ' », localisation « Cuisine »', OBS, 'Cuisine', '1', 'evier'],
      ['34 « Lavabo et douche de la salle de bain : rejet au réseau EP » (témoin, deux installations nommées)', 'Lavabo et douche de la salle de bain : rejet au réseau EP', '', '1', 'evier+sdb'],
      ['35 « Douche de la salle de bain : rejet au réseau EP » (témoin, sans lavabo)', 'Douche de la salle de bain : rejet au réseau EP', '', '1', 'sdb'],
      ['36 « Évier : rejet au réseau EP », localisation « Cuisine » (témoin, sans lavabo)', 'Évier : rejet au réseau EP', 'Cuisine', '1', 'evier+cuisine'],
      ['37 « ' + OBS + ' », localisation « Salle de bain », aucun évier compté', OBS, 'Salle de bain', '0', 'aucune'],
      ['38 « Lavabo et lave-vaisselle de la cuisine : rejet au réseau EP » (témoin, deux installations nommées)', 'Lavabo et lave-vaisselle de la cuisine : rejet au réseau EP', '', '1', 'evier+cuisine'],
      ['47 « Salle de bain : rejet au réseau EP » (témoin, sans lavabo)', 'Salle de bain : rejet au réseau EP', '', '1', 'sdb'],
      ['48 « Rejet au réseau EP », localisation « Salle de bain » (témoin, sans lavabo)', 'Rejet au réseau EP', 'Salle de bain', '1', 'sdb']];
    const vu = await p.evaluate(cas => { const T = window.__VT;
      const rows = ev => [['wc', 'WC', '1'], ['evier', 'Évier', ev], ['sdb', 'Salle de bain (douche ou baignoire et lavabo)', '1'], ['cuisine', 'Cuisine (évier, lave-vaisselle)', '1']]
        .map(([id, label, nb]) => ({id, groupe: 'EU', label, std: true, nb, raccord: '', conforme: '', methodes: []}));
      return cas.map(k => T.anomRows({rows: rows(k[3])}, {reseau: 'EU', observation: k[1], localisation: k[2], installation: ''}).map(r => r.id).join('+') || 'aucune'); }, cas);
    cas.forEach((k, i) => R.ok(vu[i] === k[4], k[0] + ' : ' + vu[i] + (vu[i] === k[4] ? '' : ' (attendu ' + k[4] + ')')));
    /* constat de l'écran (WC, évier, salle de bain comptés) : la seule anomalie, celle du lavabo en salle de bain, ne rend non conforme que
       la ligne « Évier » */
    await C.etudeEtDossier(p);
    const E = await p.evaluate(OBS => { const T = window.__VT, v = T.S.visites[0]; v.constat = T.constatEval(v, []).c;
      v.constat.rows.forEach(x => { if (x.id === 'wc' || x.id === 'evier' || x.id === 'sdb') x.nb = '1'; });
      const a = {id: 'a-l1', etudeId: v.etudeId, visiteId: v.id, reseau: 'EU', observation: OBS, preconisation: 'Raccorder le lavabo au réseau EU', localisation: 'Salle de bain',
        installation: '', categorie: 'autre', photos: [], createdAt: '2026-11-08T08:00:00.000Z', updatedAt: '2026-11-08T08:00:00.000Z'};
      const r = T.constatEval(v, [a]); return {non: r.rows.filter(x => x.conf === 'non').map(x => x.r.id).join('+') || 'aucune', concl: r.conclusion}; }, OBS);
    R.ok(E.non === 'evier', '39 constat (WC, évier, salle de bain comptés), « ' + OBS + ' » en salle de bain : lignes non conformes ' + E.non
      + (E.non === 'evier' ? '' : ' (attendu evier seule)') + ', conclusion ' + E.concl);
    /* éditeur de l'anomalie, sans évier compté : « Automatique, aucune trouvée » (le technicien choisit la ligne) */
    await p.evaluate(OBS => { const T = window.__VT, v = T.S.visites[0];
      v.constat.rows.forEach(x => { if (x.id === 'evier') x.nb = ''; });
      const a = {id: 'a-l1e', etudeId: v.etudeId, visiteId: v.id, reseau: 'EU', observation: OBS, preconisation: '', localisation: 'Salle de bain', photos: [], photoNonRequise: true,
        createdAt: '2026-11-08T08:00:00.000Z', updatedAt: '2026-11-08T08:00:00.000Z'};
      T.S.anoms.push(a); location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/a/' + a.id; }, OBS);
    await p.waitForSelector('select[data-af="installation"]', {timeout: 10000}); await C.pause(p, 300);
    const opt = await p.evaluate(() => { const o = document.querySelector('select[data-af="installation"] option'); return o ? o.textContent : 'aucune option'; });
    R.ok(opt === 'Automatique, aucune trouvée', '40 éditeur de l\'anomalie, « ' + OBS + ' » en salle de bain, aucun évier compté : ' + JSON.stringify(opt)
      + (opt === 'Automatique, aucune trouvée' ? '' : ' (attendu « Automatique, aucune trouvée »)'));
  } finally { R.ok(!A.erreurs.length, 'lavabo et pièce : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* Plan PDF de l'état des lieux : ligne de conclusion imprimée (texte capté à l'appel de la bibliothèque PDF ; enregistrement simulé) */
async function conclusionPlan(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), els = [C.P('w', 'wc', v0.cx, v0.cy + 4), C.P('B', 'boite', v0.cx, v0.cy, {res: 'EU'})], I = C.index(els);
    els.push(C.L('t', 'tr', ['w', 'B'], I, {res: 'EU'}));
    await C.injecter(p, {el: els});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer();
      const J0 = window.jspdf.jsPDF; window.__txtPdf = []; window.__pdfFaits = 0;
      const W = function(){ const d = new J0(...arguments), ot = d.text; d.text = function(t){ try { window.__txtPdf.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
      W.API = J0.API; window.jspdf.jsPDF = W; window.__VT_SAVE = async () => { window.__pdfFaits++; return true; }; });
    await C.pause(p, 500);
    const lu = () => p.evaluate(() => { const t = window.__txtPdf.filter(x => /^Conclusion/.test(x)).join(' | ') || 'aucune'; window.__txtPdf = []; return t; });
    /* bouton PDF du croquis (état des lieux) */
    const parBouton = async () => { const n = await p.evaluate(() => window.__pdfFaits); await p.evaluate(() => window.__vcEd.sortie('pdfEdl'));
      await p.waitForFunction(n => window.__pdfFaits > n, n, {timeout: 15000}); return lu(); };
    const parDossier = async () => { await p.evaluate(async () => { const T = window.__VT; await T.vcPdf(T.S.visites[0]); }); return lu(); };
    const parExport = async () => { const ok = await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; if (!T.vcPlansPdf) return false;
      await T.vcPlansPdf(v, T.S.anoms.filter(a => a.visiteId === v.id)); return true; }); return ok ? lu() : 'vcPlansPdf absent'; };
    const verif = (nom, vu, re) => R.ok(re.test(vu), nom + ' : ' + vu);
    verif('18 bouton PDF du croquis, aucune conclusion choisie (témoin)', await parBouton(), /^Conclusion proposée : Conformes$/);
    await C.fermerCroquis(p); await C.pause(p, 400);
    verif('18b plan du dossier, aucune conclusion choisie (témoin)', await parDossier(), /^Conclusion proposée : Conformes$/);
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; v.statut = 'visitee'; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
    await p.waitForSelector('[data-act="c-concl"][data-v="reserves"]'); await C.pause(p, 600);
    await p.click('[data-act="c-concl"][data-v="reserves"]'); await C.pause(p, 300);
    const choix = await p.evaluate(() => window.__VT.S.visites[0].constat.conclusion);
    R.ok(choix === 'reserves', 'conclusion « Conformes avec réserves » choisie dans le constat : ' + JSON.stringify(choix));
    verif('19 plan du dossier, conclusion choisie dans le constat', await parDossier(), /^Conclusion du constat : Conformes avec réserves$/);
    verif('20 plan de l\'export, conclusion choisie dans le constat', await parExport(), /^Conclusion du constat : Conformes avec réserves$/);
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
    await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
    verif('21 bouton PDF du croquis, conclusion choisie dans le constat', await parBouton(), /^Conclusion du constat : Conformes avec réserves$/);
    await C.fermerCroquis(p); await C.pause(p, 400);
    await p.evaluate(() => { window.__VT.S.visites[0].statut = 'absent'; });
    verif('22 visite non effectuée (absent), conclusion restée choisie (témoin)', await parDossier(), /^Conclusion proposée : Conformes$/);
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; v.statut = 'visitee'; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
    await p.waitForSelector('[data-act="c-concl"][data-v="reserves"]'); await C.pause(p, 600);
    await p.click('[data-act="c-concl"][data-v="reserves"]'); await C.pause(p, 300);
    verif('23 choix retiré (second toucher), plan du dossier (témoin)', await parDossier(), /^Conclusion proposée : Conformes$/);
    /* constat signé (état posé à la main) : la conclusion qu'il atteste */
    await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; c.conclusion = 'non_conformes'; c.signeLe = '2026-11-07';
      c.fige = Object.assign({}, c.fige || {}, {conclusion: 'non_conformes', visite: {statut: 'visitee'}}); });
    verif('24 constat signé, conclusion choisie avant la signature', await parDossier(), /^Conclusion du constat : Non conformes$/);
    /* m115 (L2) : constat signé sans que le technicien ait touché la conclusion : la signature (geste « c-lock », signature du technicien
       fictive : une image vide d'un pixel) fige la conclusion proposée ; le croquis change ensuite (il reste modifiable) : une descente reliée
       à la boîte EU, non-conformité nouvelle ; le plan imprime la conclusion que le constat atteste */
    const sig = await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0], c = v.constat; c.conclusion = ''; delete c.signeLe; delete c.fige;
      const res = await T.vcResume(v); if (res) T.constatDepuisCroquis(v, res, false);
      c.sigTech = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      await T.ACTIONS['c-lock']();
      return {choisie: c.conclusion || '', signe: !!c.signeLe, attestee: c.fige ? c.fige.conclusion : 'aucun gel'}; });
    R.ok(sig.signe && sig.choisie === '' && sig.attestee === 'conformes', 'constat signé (« c-lock ») sans conclusion choisie : conclusion attestée ' + JSON.stringify(sig.attestee)
      + ', choisie ' + JSON.stringify(sig.choisie) + (sig.signe ? '' : ', pas signé'));
    verif('41 constat signé sans conclusion choisie, plan du dossier', await parDossier(), /^Conclusion du constat : Conformes$/);
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
    await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
    const els2 = els.slice(0, 2).concat([C.P('d', 'descente', v0.cx + 4, v0.cy + 4, {cote: 'avant'})]), I2 = C.index(els2);
    els2.push(C.L('t', 'tr', ['w', 'B'], I2, {res: 'EU'}), C.L('td', 'tr', ['d', 'B'], I2, {res: ''}));
    await C.injecter(p, {el: els2});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 600);
    const nc = await p.evaluate(() => { const T = window.__VT, v = T.S.visites[0]; return T.S.anoms.filter(a => a.visiteId === v.id && T.anomNC(a)).length; });
    R.ok(nc >= 1, 'descente reliée à la boîte EU après la signature : ' + nc + ' non-conformité(s) au dossier');
    verif('42 bouton PDF du croquis, constat signé sans conclusion choisie, dessin changé après la signature', await parBouton(), /^Conclusion du constat : Conformes$/);
    await C.fermerCroquis(p); await C.pause(p, 400);
    verif('43 plan du dossier, même constat', await parDossier(), /^Conclusion du constat : Conformes$/);
    verif('44 plan de l\'export, même constat', await parExport(), /^Conclusion du constat : Conformes$/);
    /* témoins : visite figée non effectuée (absent) ; constat non signé, sans conclusion choisie : la conclusion proposée d'après le dessin */
    await p.evaluate(() => { window.__VT.S.visites[0].constat.fige.visite = {statut: 'absent'}; });
    verif('45 constat signé, visite figée non effectuée (absent) (témoin)', await parDossier(), /^Conclusion proposée : Non conformes$/);
    await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; c.signeLe = ''; c.sigTech = ''; delete c.fige; });
    verif('46 constat non signé, sans conclusion choisie, dessin changé (témoin)', await parDossier(), /^Conclusion proposée : Non conformes$/);
  } finally { R.ok(!A.erreurs.length, 'conclusion du plan : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* m119 (consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) : WC relié sans boîte au collecteur EU (« à arbitrer »
   d'office) et descente non visitable vers une boîte EP, mise « À arbitrer » ; constat, croquis désactivé, signatures, puis les deux anomalies
   écartées dans le croquis */
async function arbitrage(){
  const A = await C.ouvrir(), p = A.p, PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), x = v0.cx, y = v0.cy;
    const els = [C.P('w', 'wc', x - 3, y + 6), C.J('j', x - 3, y), C.P('d', 'descente', x + 4, y + 6, {visitable: 'non', cote: 'avant'}), C.P('BP', 'boite', x + 4, y + 2, {res: 'EP'})], I = C.index(els);
    els.push(C.L('tw', 'tr', ['w', 'j'], I), C.L('K', 'col', [[x - 12, y], 'j', [x + 12, y]], I, {res: 'EU'}), C.L('td', 'tr', ['d', 'BP'], I));
    await C.injecter(p, {el: els});
    const prep = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat, T = window.__VT, v = T.S.visites[0];
      S.doc.decisions['dep-nv:d'] = {st: 'arbitrer'}; ed.synchroniser(); S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer();
      return {liste: S.liste.map(a => a.cle + ' ' + a.st).join(', '), dossier: T.S.anoms.filter(a => a.visiteId === v.id).map(a => a.croquis ? a.croquis.cle : 'à la main').join(', ')}; });
    R.ok(/sansboite:K:EU arbitrer/.test(prep.liste) && /dep-nv:d arbitrer/.test(prep.liste) && !prep.dossier,
      'arbitrage, croquis : sans boîte et descente non visitable à arbitrer, hors du dossier (' + JSON.stringify(prep) + ')');
    await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 600);
    await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; T.constatDepuisCroquis(v, await T.vcResume(v), false); await T.flushSaves();
      location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
    const pret = async () => { await p.waitForSelector('.croq-fill'); await p.waitForFunction(() => window.__VT.VC_RESUMES.has(window.__VT.S.visites[0].id)); await C.pause(p, 900); };
    const rendre = async () => { await p.evaluate(() => window.__VT.render()); await pret(); };
    /* état du constat : conclusion proposée et retenue, lignes (raccordement et conformité), boutons pressés, rappels d'arbitrage, signature */
    const lire = () => p.evaluate(() => { const T = window.__VT, v = T.S.visites[0], L = T.S.anoms.filter(a => a.visiteId === v.id), E = T.constatEval(v, L);
      const ligne = id => { const r = E.rows.find(q => q.r.id === id); return r ? (r.r.raccord || '-') + ' ' + JSON.stringify(r.conf) : 'absente'; };
      return {auto: E.auto, conclusion: E.conclusion, gout: ligne('gout_av'), wc: ligne('wc'), rappels: T.constatIssues(v, L).filter(t => /Conclusion non précisée|arbitrer/.test(t)),
        presses: [...document.querySelectorAll('[data-act="c-concl"][aria-pressed="true"], [data-act="c-conf"][data-row="gout_av"][aria-pressed="true"]')].map(b => b.dataset.act + ' ' + b.dataset.v),
        change: !!E.changed, pourquoi: E.changeWhy || [], signe: !!v.constat.signeLe, fige: v.constat.fige ? v.constat.fige.conclusion : null}; });
    const a = (e, re) => e.rappels.some(t => re.test(t));
    const RAP = /^Le croquis de terrain propose 2 anomalies « à arbitrer »/, NONP = /^Conclusion non précisée\.$/;
    const RLIG = /^Gouttière\(s\) avant : déclarée conforme alors qu'une anomalie reste à arbitrer : décidez dans le croquis \(Contrôles\)\.$/;
    const RCON = /^Conclusion « Conformes » choisie alors qu'une anomalie reste à arbitrer : décidez dans le croquis \(Contrôles\)\.$/;
    await pret();
    let e = await lire();
    R.ok(e.auto === '' && e.conclusion === '' && !e.presses.some(b => /^c-concl/.test(b)) && a(e, NONP) && a(e, RAP),
      '49 sans boîte et descente à arbitrer : conclusion proposée vide, aucune choisie ; rappels « Conclusion non précisée » et « à arbitrer » ('
      + JSON.stringify({auto: e.auto, conclusion: e.conclusion, presses: e.presses, rappels: e.rappels}) + ')');
    const ok50 = e.gout === 'EP_D ""' && !e.presses.some(b => /^c-conf/.test(b)) && e.wc === 'EU_D "oui"';
    await p.selectOption('select[data-cr="raccord"][data-row="gout_av"]', ''); await C.pause(p, 300);
    await p.selectOption('select[data-cr="raccord"][data-row="gout_av"]', 'EP_D'); await C.pause(p, 400);
    const e50 = await lire();
    R.ok(ok50 && e50.gout === 'EP_D ""' && !e50.presses.some(b => /^c-conf/.test(b)),
      '50 « Gouttière(s) avant » (descente à arbitrer) : raccordement EP_D gardé, ni « oui » ni « non », même ressaisi ; la ligne WC, que l\'absence de boîte ne vise pas, reste « oui » ('
      + JSON.stringify({gout: e.gout, wc: e.wc, ressaisi: e50.gout, presses: e50.presses}) + ')');
    await p.click('[data-act="c-conf"][data-row="gout_av"][data-v="oui"]'); await C.pause(p, 300);
    const e51a = await lire();
    await p.click('[data-act="c-concl"][data-v="conformes"]'); await C.pause(p, 300);
    const e51b = await lire();
    await p.click('[data-act="c-conf"][data-row="gout_av"][data-v="oui"]'); await C.pause(p, 300);
    await p.click('[data-act="c-concl"][data-v="conformes"]'); await C.pause(p, 300);
    const e51c = await lire();
    R.ok(a(e51a, RLIG) && e51b.conclusion === 'conformes' && a(e51b, RLIG) && a(e51b, RCON) && !a(e51c, RLIG) && !a(e51c, RCON) && e51c.conclusion === '',
      '51 « Oui » choisi pour la ligne, puis « Conformes » : les deux rappels ; choix retirés : plus de rappel ('
      + JSON.stringify({ligne: e51a.rappels, conclusion: [e51b.conclusion, e51b.rappels], retires: [e51c.conclusion, e51c.rappels]}) + ')');
    /* croquis désactivé (Réglages) : le constat se déduit des seules lignes et anomalies du dossier, comme en v1.5.1 */
    const e52 = await p.evaluate(() => { const T = window.__VT; T.S.croq.actif = false; T.VC_RESUMES.clear(); T.render(); return true; }).then(() => C.pause(p, 600)).then(lire);
    R.ok(e52.auto === 'conformes' && !e52.rappels.length, '52 croquis désactivé : « Conformes », comme en v1.5.1, sans rappel d\'arbitrage (témoin) ('
      + JSON.stringify({auto: e52.auto, rappels: e52.rappels}) + ')');
    /* 53 : constat signé comme avant m119 (calcul sans arbitrage : croquis désactivé à la signature), puis croquis réactivé */
    await p.evaluate(async png => { const T = window.__VT, c = T.S.visites[0].constat; c.sigTech = png; await T.ACTIONS['c-lock'](); T.S.croq.actif = true; T.VC_RESUMES.clear(); }, PNG);
    await rendre();
    const e53 = await lire();
    R.ok(e53.signe && e53.fige === 'conformes' && e53.conclusion === 'conformes' && !e53.change,
      '53 constat signé avant (sans arbitrage), croquis réactivé : conclusion « Conformes » et signature intactes, pas « Le dossier a changé » ('
      + JSON.stringify({signe: e53.signe, fige: e53.fige, conclusion: e53.conclusion, change: e53.pourquoi}) + ')');
    /* 54 : signature retirée (comme « Modifier »), puis signé pendant l'arbitrage : conclusion attestée vide, rien de « changé », même sans le résumé */
    await p.evaluate(() => { const c = window.__VT.S.visites[0].constat; c.signeLe = ''; c.sigTech = ''; c.sigProp = ''; delete c.fige; });
    await rendre();
    await p.evaluate(async png => { const T = window.__VT, c = T.S.visites[0].constat; c.sigTech = png; await T.ACTIONS['c-lock'](); }, PNG);
    await pret();
    const e54 = await lire(), e54s = await p.evaluate(() => { const T = window.__VT, v = T.S.visites[0]; T.VC_RESUMES.clear(); const E = T.constatEval(v, T.S.anoms.filter(a => a.visiteId === v.id)); return E.changeWhy || []; });
    R.ok(e54.signe && e54.fige === '' && !e54.change && !e54s.length,
      '54 signé pendant l\'arbitrage : conclusion attestée vide, pas « Le dossier a changé », ni après l\'effacement du résumé du croquis ('
      + JSON.stringify({signe: e54.signe, fige: e54.fige, change: e54.pourquoi, sansResume: e54s}) + ')');
    /* 55 : les deux anomalies écartées dans le croquis : le plan du dossier imprime la conclusion que propose le dessin */
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
    await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
    const ec = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat;
      S.liste.filter(q => /^(sansboite|dep-nv):/.test(q.cle)).forEach(q => { S.doc.decisions[q.cle] = Object.assign(S.doc.decisions[q.cle] || {}, {st: 'ecartee'}); });
      ed.synchroniser(); S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer(); return S.liste.map(q => q.cle + ' ' + q.st).join(', '); });
    await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 400);
    const plan = await p.evaluate(async () => { const T = window.__VT, J0 = window.jspdf.jsPDF, txt = [];
      const W = function(){ const d = new J0(...arguments), ot = d.text; d.text = function(t){ try { txt.push([].concat(t).join(' ')); } catch (e){} return ot.apply(d, arguments); }; return d; };
      W.API = J0.API; window.jspdf.jsPDF = W; const S0 = window.__VT_SAVE; window.__VT_SAVE = async () => true;
      try { await T.vcPdf(T.S.visites[0]); } finally { window.jspdf.jsPDF = J0; window.__VT_SAVE = S0; }
      const c = T.S.visites[0].constat; return {conclusion: txt.filter(t => /^Conclusion/.test(t)).join(' | ') || 'aucune', signe: !!c.signeLe, fige: c.fige ? c.fige.conclusion : null}; });
    R.ok(/sansboite:K:EU ecartee/.test(ec) && /dep-nv:d ecartee/.test(ec) && plan.conclusion === 'Conclusion proposée : Conformes' && plan.signe && plan.fige === '',
      '55 puis sans boîte et descente écartées : le plan du dossier dit « Conclusion proposée : Conformes » ; constat signé intact (' + JSON.stringify({liste: ec, plan}) + ')');
    /* 56 : l'arbitrage tranché après la signature : « Le dossier a changé depuis la signature (anomalies à arbitrer) », au dossier, au
       constat, même quand le résumé du croquis arrive après l'affichage du constat, et à l'envoi, qui calcule le résumé s'il manque ; résumé
       pas prêt : rien n'est dit (témoin) */
    const e56 = await p.evaluate(() => { const T = window.__VT, v = T.S.visites[0], L = T.S.anoms.filter(a => a.visiteId === v.id);
      const pourquoi = T.constatEval(v, L).changeWhy || [], msg = T.issuesOf(v, L).map(x => x.msg).filter(t => /^Le dossier a changé/.test(t));
      T.VC_RESUMES.clear(); const sans = T.constatEval(v, L).changeWhy || [];
      location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; return {pourquoi, msg, sans}; });
    await pret();
    const e56p = await p.evaluate(() => { const c = window.__VT.S.visites[0].constat;
      return {page: [...document.querySelectorAll('.inline-warn')].map(x => x.textContent).filter(t => /changé depuis la signature/.test(t)).join(' | '),
        signe: !!c.signeLe, sig: !!c.sigTech, fige: c.fige ? c.fige.conclusion : null}; });
    /* la fenêtre d'envoi, ouverte sans résumé du croquis (comme après le chargement de l'étude), le calcule et le dit aussi */
    await p.evaluate(() => { const T = window.__VT; T.VC_RESUMES.clear(); T.mailModal(T.S.visites[0]); });
    await p.waitForSelector('#modal-root .inline-warn', {timeout: 8000}).catch(() => null);
    const e56m = await p.evaluate(() => [...document.querySelectorAll('#modal-root .inline-warn')].map(x => x.textContent).filter(t => /changé depuis la signature/.test(t)).join(' | '));
    await p.click('#modal-root button:has-text("Annuler")').catch(() => null); await C.pause(p, 300);
    R.ok(e56.pourquoi.join(', ') === 'anomalies à arbitrer' && e56.msg.join() === 'Le dossier a changé depuis la signature du constat (anomalies à arbitrer).' && !e56.sans.length
      && /^Le dossier a changé depuis la signature \(anomalies à arbitrer\)\./.test(e56p.page) && e56p.signe && e56p.sig && e56p.fige === ''
      && /^Le dossier a changé depuis la signature \(anomalies à arbitrer\) : le constat joint est celui signé le /.test(e56m),
      '56 arbitrage tranché après la signature : « Le dossier a changé depuis la signature (anomalies à arbitrer) » au dossier, au constat et à l\'envoi, '
      + 'constat signé intact ; résumé pas prêt : rien (' + JSON.stringify({e56, e56p, e56m}) + ')');
  } finally { R.ok(!A.erreurs.length, 'arbitrage : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}
/* m119 : WC vers une fosse septique peut-être traversée (une arrivée « Tronçon EU » laissée libre dans le regard d'amont : fosse:F, « à
   arbitrer » d'office, posée sur la fosse) : au constat, la ligne du WC n'est pas « oui » d'office, même raccordement ressaisi ; « Oui »
   choisi : un rappel. Témoin : la fosse écartée dans le croquis, la ligne redevient « oui » d'office */
async function arbitrageFosse(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), x = v0.cx, y = v0.cy, EU = {res: 'EU'};
    const els = [C.P('w', 'wc', x, y + 12), C.P('R1', 'regard', x, y + 8), C.P('F', 'fosse', x, y + 5), C.P('R3', 'regard', x, y + 2)], I = C.index(els);
    els.push(C.L('L1', 'tr', ['w', 'R1'], I, EU), C.L('La', 'tr', ['R1', 'F'], I, EU), C.L('Lb', 'tr', ['F', 'R3'], I, EU), C.L('Ls', 'tr', ['R3', [x, y - 2]], I, EU),
      C.L('Arr', 'tr', [[x - 5, y + 8], 'R1'], I, EU));
    await C.injecter(p, {el: els});
    const prep = await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.synchroniser(); S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer();
      return S.liste.map(a => a.cle + ' ' + a.st).join(', '); });
    await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 600);
    await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; T.constatDepuisCroquis(v, await T.vcResume(v), false); await T.flushSaves(); });
    const constat = async () => { await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
      await p.waitForSelector('.croq-fill'); await p.waitForFunction(() => window.__VT.VC_RESUMES.has(window.__VT.S.visites[0].id)); await C.pause(p, 900); };
    const lire = () => p.evaluate(() => { const T = window.__VT, v = T.S.visites[0], L = T.S.anoms.filter(a => a.visiteId === v.id), E = T.constatEval(v, L), r = E.rows.find(q => q.r.id === 'wc');
      return {wc: r ? (r.r.raccord || '-') + ' ' + JSON.stringify(r.conf) : 'absente', auto: E.auto, rappels: T.constatIssues(v, L).filter(t => /^WC : déclarée conforme/.test(t))}; });
    await constat();
    const e0 = await lire();
    await p.selectOption('select[data-cr="raccord"][data-row="wc"]', 'EU_D'); await C.pause(p, 400);
    const e1 = await lire();
    await p.click('[data-act="c-conf"][data-row="wc"][data-v="oui"]'); await C.pause(p, 300);
    const e2 = await lire();
    R.ok(/^fosse:F arbitrer$/.test(prep) && e0.wc === '- ""' && e0.auto === '' && e1.wc === 'EU_D ""' && !e1.rappels.length
      && e2.wc === 'EU_D "oui"' && e2.rappels.join() === 'WC : déclarée conforme alors qu\'une anomalie reste à arbitrer : décidez dans le croquis (Contrôles).',
      '57 WC vers une fosse peut-être traversée, à arbitrer : ligne du WC ni « oui » ni « non », même EU départemental ressaisi ; « Oui » choisi : un rappel ('
      + JSON.stringify({prep, avant: e0, ressaisi: e1, oui: e2}) + ')');
    /* témoin : « Oui » retiré, la fosse écartée dans le croquis : la ligne du WC redevient « oui » d'office */
    await p.click('[data-act="c-conf"][data-row="wc"][data-v="oui"]'); await C.pause(p, 300);
    await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
    await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
    await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; S.doc.decisions['fosse:F'] = {st: 'ecartee'}; ed.synchroniser(); S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer(); });
    await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 600);
    await constat();
    const e3 = await lire();
    R.ok(e3.wc === 'EU_D "oui"' && !e3.rappels.length, '58 témoin, fosse écartée : ligne du WC « oui » d\'office (' + JSON.stringify(e3) + ')');
  } finally { R.ok(!A.erreurs.length, 'arbitrage d\'une fosse : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* Réglages de l'application, bloc « Aides au dessin » (m111) : texte de la case « Aides activées » et note sur le croquis */
async function reglagesAides(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await p.evaluate(() => { location.hash = '#/reglages'; });
    await p.waitForSelector('input[data-act="vc-aide"][data-k="actives"]', {state: 'attached', timeout: 10000});
    const t = await p.evaluate(() => {
      const c = document.querySelector('input[data-act="vc-aide"][data-k="actives"]'), o = c && c.closest('label') && c.closest('label').querySelector('.opt');
      const n = Array.from(document.querySelectorAll('p')).filter(x => /valent aussi dans le croquis/.test(x.textContent));
      return {opt: o ? o.textContent : '', note: n.map(x => x.textContent).join(' | ')};
    });
    const OPT = 'décoché : tracé libre, sans redressement ni accroche au bâti ; les tuyaux se raccordent toujours aux objets et aux autres tuyaux';
    const NOTE = 'Ces réglages valent aussi dans le croquis (bouton aimant et palette d\'accrochage, à droite du plan).';
    R.ok(t.opt === OPT, '25 Réglages de l\'application, « Aides activées » : ' + JSON.stringify(t.opt) + (t.opt === OPT ? '' : ' (attendu ' + JSON.stringify(OPT) + ')'));
    R.ok(t.note === NOTE, '26 Réglages de l\'application, note sur le croquis : ' + JSON.stringify(t.note) + (t.note === NOTE ? '' : ' (attendu ' + JSON.stringify(NOTE) + ')'));
  } finally { R.ok(!A.erreurs.length, 'réglages des aides : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* Réglages de l'application, nouveaux accrochages (m112, puis m113) : avec d'anciens réglages (sans leurs clés), cases présentes et
   décochées ; cochées seulement si la clé vaut true ; l'enregistrement garde les clés connues */
async function reglagesAccroches(){
  const A = await C.ouvrir(), p = A.p;
  const NOUV = [['accMilieu', 'Milieu d\'un côté'], ['accPerp', 'Perpendiculaire'], ['accParcelle', 'Limites de parcelle'], ['accProl', 'Prolongement d\'un côté'],
    ['accInter', 'Intersection']];
  const ANC = {actives: true, glisser: true, finir: true, parallele: true, bati: true, angles: true, orienter: true, coude: true};
  try {
    await C.etudeEtDossier(p);
    await p.evaluate(a => { window.__VT.S.croq.aides = a; location.hash = '#/reglages'; }, ANC);
    await p.waitForSelector('input[data-act="vc-aide"][data-k="actives"]', {state: 'attached', timeout: 10000});
    const cases = () => p.evaluate(() => Array.from(document.querySelectorAll('input[data-act="vc-aide"]')).map(c => {
      const s = c.closest('label') && c.closest('label').querySelector('span'); return {k: c.dataset.k, on: c.checked, lib: s && s.firstChild ? s.firstChild.textContent.trim() : ''}; }));
    const f = (cs, k) => cs.find(c => c.k === k), dit = (cs, k) => f(cs, k) ? JSON.stringify(f(cs, k).lib) + (f(cs, k).on ? ' cochée' : ' décochée') : k + ' absente';
    await p.evaluate(() => window.__VT.render()); await C.pause(p, 300);
    const c1 = await cases(), anc = Object.keys(ANC).every(k => f(c1, k) && f(c1, k).on);
    R.ok(NOUV.every(([k, lib]) => f(c1, k) && !f(c1, k).on && f(c1, k).lib === lib) && anc, '27 Réglages de l\'application, anciens réglages : '
      + NOUV.map(([k]) => dit(c1, k)).join(', ') + ' ; anciennes aides ' + (anc ? 'cochées' : 'pas toutes cochées'));
    /* une clé à true : cochée ; à null : décochée (lecture stricte) */
    await p.evaluate(a => { window.__VT.S.croq.aides = a; window.__VT.render(); }, Object.assign({}, ANC, {accPerp: true, accMilieu: null, accInter: true, accProl: null}));
    await C.pause(p, 300);
    const c2 = await cases(), oui = k => !!f(c2, k) && f(c2, k).on, non = k => !!f(c2, k) && !f(c2, k).on;
    R.ok(oui('accPerp') && non('accMilieu') && non('accParcelle') && oui('accInter') && non('accProl'), '28 clés accPerp et accInter à true, accMilieu et accProl à null, '
      + 'accParcelle absente : ' + NOUV.map(([k]) => dit(c2, k)).join(', ') + ' (attendu : seules « Perpendiculaire » et « Intersection » cochées)');
    /* un clic coche « Milieu d'un côté » : l'enregistrement garde les clés connues */
    let a3 = null;
    if (f(c2, 'accMilieu')){ await p.click('input[data-act="vc-aide"][data-k="accMilieu"]'); await C.pause(p, 400); a3 = await p.evaluate(() => Object.assign({}, window.__VT.S.croq.aides)); }
    const garde = !!a3 && a3.accMilieu === true && a3.accPerp === true && a3.accInter === true && Object.keys(ANC).every(k => a3[k] === true);
    R.ok(garde, '29 clic sur « Milieu d\'un côté » : aides enregistrées ' + (a3 ? JSON.stringify(a3) : 'aucune (case absente)') + ' (attendu : accMilieu, accPerp et accInter à true, '
      + 'anciennes clés gardées)');
  } finally { R.ok(!A.erreurs.length, 'réglages des accrochages : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 69 et 70 (m132, D4) : chaudière et attente dessinées, ligne « Chaudière et attente » saisie à la main (prep remet à zéro le
   constat repris d'abord, puis le reprend). Les deux lignes du croquis la reconnaissent à son libellé ; elle ne va qu'à une seule, la
   première dans l'ordre de leur identifiant (« autre:Attente »), et l'autre ligne est créée, dans les deux ordres du dessin. Avant m132, la
   ligne saisie recevait les deux (la valeur de la dernière) et aucune ligne n'était créée. Puis la chaudière est mise « à arbitrer » dans
   le résumé du croquis : l'arbitrage vise sa ligne à elle, celle que la reprise remplit, et non la ligne saisie, liée à l'attente (sinon sa
   ligne pourrait être comptée conforme) */
const REMISE = "c.rows = c.rows.filter(r => r.std); c.rows.forEach(r => { r.nb = ''; r.raccord = ''; r.methodes = []; }); c.croqAuto = {};";
async function autresApparies(){
  const O = {ch: ['ch', 'chaudiere', -3, 0], at: ['at', 'attente', 3, 0]}, B = ['B', 'boite', 0, -4, {res: 'EU'}];
  const ATT = 'Chaudière et attente ×1 [autre:Attente] ; Chaudière (purge, condensat) ×1 [autre:Chaudière (purge, condensat)]';
  const prep = REMISE + " c.rows.push({id: 'au1', groupe: 'EU', label: 'Chaudière et attente', std: false, nb: '', raccord: '', conforme: '', methodes: []});"
    + " T.constatDepuisCroquis(v, T.VC_RESUMES.get(v.id), false);";
  /* chaudière « à arbitrer » dans le résumé du croquis : lignes du constat que l'évaluation marque (vcArbitrage) */
  const fin = p => p.evaluate(() => { const T = window.__VT, v = T.S.visites[0], res = T.VC_RESUMES.get(v.id);
    const s = res && (res.rows || []).find(x => x.id === 'autre:Chaudière (purge, condensat)'); if (!s) return 'résumé sans la chaudière';
    s.arbitrer = true; res.arbitrer = 1;
    return T.constatEval(v, T.S.anoms.filter(x => x.visiteId === v.id)).rows.filter(x => x.arbitrer).map(x => x.r.label).join(' ; ') || 'aucune'; });
  for (const [n, ordre] of [['69', ['ch', 'at']], ['70', ['at', 'ch']]]){
    const e = await constatVu(n, ordre.map(k => O[k]).concat([B]), [['Bc', 'ch', 'B'], ['Ba', 'at', 'B']], prep, false, false, {fin});
    R.ok(e.autres === ATT, n + ' chaudière et attente dessinées ' + (n === '69' ? 'dans cet ordre' : 'dans l\'ordre inverse') + ', « Chaudière et attente » saisie : '
      + 'liée à l\'attente seule, ligne « Chaudière (purge, condensat) » créée (obtenu ' + (e.autres || 'aucune ligne « Autres »') + ')');
    R.ok(e.fin === 'Chaudière (purge, condensat)', n + ' chaudière à arbitrer : seule sa ligne « Chaudière (purge, condensat) » est marquée à arbitrer, pas la ligne saisie '
      + '« Chaudière et attente », liée à l\'attente (obtenu ' + e.fin + ')');
  }
}
/* 71 (m132, D4) : « Bidet » et « Bidet suspendu » dessinés : deux lignes « Autres ». Sans l'appariement fait d'avance, la ligne « Bidet »,
   créée la première, recevait aussi le bidet suspendu (son libellé figure dans le nom) */
async function autresProches(){
  const e = await constatVu('71', [['b1', 'autre_eu', -3, 0, {nom: 'Bidet'}], ['b2', 'autre_eu', 3, 0, {nom: 'Bidet suspendu'}], ['B', 'boite', 0, -4, {res: 'EU'}]],
    [['T1', 'b1', 'B'], ['T2', 'b2', 'B']], '');
  const ATT = 'Bidet ×1 [autre:EU:bidet] ; Bidet suspendu ×1 [autre:EU:bidet suspendu]';
  R.ok(e.autres === ATT, '71 « Bidet » et « Bidet suspendu » dessinés : deux lignes « Autres » (obtenu ' + (e.autres || 'aucune ligne « Autres »') + ')');
}
/* 72 (m132, D4) : dossier laissé par la v1.7.0, simulé : elle ne comptait pas les autres appareils (type inconnu) ; « WC » 1 posé par le
   croquis, aucune ligne « Bidet ». À l'ouverture du constat, le suivi porte la ligne « WC » à 2 (le WC et l'urinoir de la ligne « WC ») sans
   créer de ligne ; l'écart rappelle le bidet ; « Reprendre du croquis » crée sa ligne et l'écart disparaît */
async function autresV170(){
  const objs = [['w', 'wc', -3, 0], ['u', 'autre_eu', 0, 0, {nom: 'Urinoir', row: 'wc'}], ['b', 'autre_eu', 3, 0, {nom: 'Bidet'}], ['B', 'boite', 0, -4, {res: 'EU'}]];
  const prep = "const P = c.croqAuto, au = c.rows.filter(r => !r.std); c.rows = c.rows.filter(r => r.std);"
    + " au.forEach(r => { delete P.crees[r.id]; delete P.rows[r.id]; }); const w = c.rows.find(r => r.id === 'wc'); w.nb = '1'; if (P.rows.wc) P.rows.wc.nb = '1';";
  const e = await constatVu('72', objs, [['Tw', 'w', 'B'], ['Tu', 'u', 'B'], ['Tb', 'b', 'B']], prep, false, false, {reprise: true});
  const ECART = 'Bidet : 1 sur le croquis de terrain, nombre non renseigné au constat.', a = e.avant || {}, b = e.apres || {};
  R.ok(/^wc ×2 /.test(a.rows) && a.autres === '' && (a.ecarts || []).indexOf(ECART) >= 0, '72 dossier laissé par la v1.7.0 : « WC » 2 à l\'ouverture du constat, aucune ligne « Autres », '
    + 'écart « ' + ECART + ' » (obtenu ' + JSON.stringify([a.rows, a.autres, a.ecarts]) + ')');
  R.ok(b.autres === 'Bidet ×1 [autre:EU:bidet]' && /^wc ×2 /.test(b.rows) && (b.ecarts || []).indexOf(ECART) < 0, '72 « Reprendre du croquis » : ligne « Bidet » ×1 créée, '
    + 'écart disparu (obtenu ' + JSON.stringify([b.rows, b.autres, b.ecarts]) + ')');
}
/* 73 (m132, D8) : sauvegarde restaurée (planValide) : les champs des autres appareils sont gardés tels quels, aucun n'est ajouté (ni art, ni
   ep, ni cst : ce ne sont pas des destinations) ; les replis se font à la lecture : nom vide « Autre appareil », nom de 300 caractères lu sur
   40, nom blanc en EP « Autre ouvrage EP », abréviation « ABCD » lue « Bi » ; jamais « Autre destination » */
async function autresRestaures(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    const LONG = 'Pompe  <b>fictive</b> & "x" ' + 'a'.repeat(272), L40 = LONG.replace(/\s+/g, ' ').slice(0, 40).trim();
    const vu = await p.evaluate(async LONG => {
      const T = window.__VT, V = window.VCroquis, e = JSON.parse(JSON.stringify(T.S.etude)), v0 = JSON.parse(JSON.stringify(T.S.visites[0]));
      e.id = 'etude-autres-fictive'; e.nom = 'Étude fictive des autres appareils';
      const v = Object.assign(JSON.parse(JSON.stringify(v0)), {id: 'visite-autres-1', etudeId: e.id, numero: '1', statut: 'visitee'});
      const pt = (id, t, x, y, q) => ({id, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: ''}, q || {})});
      const tr = (id, a, b) => ({id, k: 'ln', t: 'tr', v: [{x: a.x, y: a.y, a: a.id}, {x: b.x, y: b.y, a: b.id}], p: {res: '', st: 'existant', sens: 0, obs: ''}});
      const Bu = pt('Bu', 'boite', 0, 0, {res: 'EU'}), Bp = pt('Bp', 'boite', 12, 0, {res: 'EP'});
      const A0 = pt('A0', 'autre_eu', -3, 6, {nom: ''}), A1 = pt('A1', 'autre_eu', 0, 6, {nom: 'Bidet', ab: 'ABCD'}), A2 = pt('A2', 'autre_eu', 3, 6, {nom: LONG, row: 'zz'});
      const A3 = pt('A3', 'autre_ep', 12, 6, {nom: '   '});
      const plan = Object.assign(V.nouveauDoc({nom: 'Croquis fictif', adresse: '12 rue Fictive', commune: 'Ville-Exemple', technicien: 'Nom Fictif'}),
        {visiteId: v.id, etudeId: e.id, el: [Bu, Bp, A0, A1, A2, A3, tr('t0', A0, Bu), tr('t1', A1, Bu), tr('t2', A2, Bu), tr('t3', A3, Bp)]});
      const avant = JSON.parse(JSON.stringify(plan)), zip = new window.JSZip();
      zip.file('Sauvegarde fictive/_sauvegarde/vede-terrain-sauvegarde.json', JSON.stringify({format: 'vede-terrain', version: 1, app: 'test', exportedAt: new Date().toISOString(),
        etude: e, visites: [v], anomalies: [], photos: [], biblio: [], plans: [plan], fonds: []}));
      const ok = await T.restoreZip(await zip.generateAsync({type: 'blob'})), apres = await T.DB.get('plans', v.id) || null;
      const ids = ['A0', 'A1', 'A2', 'A3'], de = (pl, id) => ((pl && pl.el) || []).find(x => x.id === id) || null;
      const sur = f => { try { return f(); } catch (err){ return 'exception : ' + err.message; } }, an = apres ? sur(() => V.analyser(JSON.parse(JSON.stringify(apres)), 'edl')) : null;
      return {ok, present: !!apres, changes: ids.filter(id => JSON.stringify((de(apres, id) || {}).p) !== JSON.stringify(de(avant, id).p)),
        libs: ids.map(id => sur(() => V.libDe(de(apres, id)))), ab1: sur(() => typeof V.abObj === 'function' ? V.abObj(de(apres, 'A1')) : 'VCroquis.abObj absente'),
        etiq: ids.map(id => sur(() => V.texteEtiquette(de(apres, id), an))), dest: ids.filter(id => V.estDest(de(apres, id) && de(apres, id).t))};
    }, LONG);
    R.ok(vu.ok === true && vu.present && !vu.changes.length && !vu.dest.length, '73 sauvegarde restaurée : les champs des autres appareils gardés tels quels, aucun ajouté (modifiés : '
      + JSON.stringify(vu.changes) + ')');
    const att = ['Autre appareil', 'Bidet', L40, 'Autre ouvrage EP'];
    R.ok(JSON.stringify(vu.libs) === JSON.stringify(att) && vu.ab1 === 'Bi', '73 lus « Autre appareil », « Bidet » (abréviation « ABCD » lue « Bi »), le nom de 300 caractères sur 40, '
      + '« Autre ouvrage EP » (obtenu ' + JSON.stringify(vu.libs).slice(0, 160) + ', ' + JSON.stringify(vu.ab1) + ')');
    R.ok(!vu.libs.concat(vu.etiq).some(t => /Autre destination|undefined/.test(String(t))), '73 aucun « Autre destination » (libellés et étiquettes : ' + JSON.stringify(vu.etiq).slice(0, 160) + ')');
  } catch (err){ R.ok(false, '73 exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, '73 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}
/* 74 (m132) : PDF du constat à dix lignes « Autres » (sept en EU, trois en EP ; vingt lignes, police 8 au-delà de 14) : chaque libellé
   imprimé sur une ligne, dans sa case (x 70,8 ; avant la colonne Nb, à 172,5), entre le haut et le bas du tableau (402 et 620,5), en
   6 pt au moins, sans chevauchement. Depuis m147 (D14) : sous le seul nom de l'appareil, aucun texte « Autres : » sur la page. Texte,
   position, taille, largeur et page relevés aux appels de la bibliothèque PDF */
async function autresPdf(){
  const EU = ['Bidet', 'Urinoir', 'Climatisation', 'Fontaine', 'Adoucisseur', 'Pompe à chaleur', 'Abreuvoir'], EP = ['Avaloir de terrasse', 'Bassin d\'agrément', 'Pédiluve'];
  const objs = EU.map((n, i) => ['e' + i, 'autre_eu', 3 * i - 9, 0, {nom: n}]).concat(EP.map((n, i) => ['p' + i, 'autre_ep', 3 * i - 3, 8, {nom: n}]))
    .concat([['B', 'boite', 0, -4, {res: 'EU'}], ['Bp', 'boite', 0, 12, {res: 'EP'}]]);
  const tr = EU.map((n, i) => ['Te' + i, 'e' + i, 'B']).concat(EP.map((n, i) => ['Tp' + i, 'p' + i, 'Bp']));
  const fin = p => p.evaluate(async noms => {
    const T = window.__VT, v = T.S.visites[0], J0 = window.jspdf.jsPDF, rec = [];
    const W = function(){ const d = new J0(...arguments), ot = d.text;
      d.text = function(t, x, y){ let pg = 0; try { pg = d.internal.getCurrentPageInfo().pageNumber; } catch (e){}
        const s = [].concat(t).join(' '); rec.push({t: s, x, y, sz: d.getFontSize(), pg, w: d.getTextWidth(s)}); return ot.apply(d, arguments); };
      return d; };
    W.API = J0.API; window.jspdf.jsPDF = W;
    try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; }
    return {n: (v.constat.rows || []).length, L: rec.filter(r => r.pg === 1 && Math.abs(r.x - 70.8) < 0.01 && noms.indexOf(r.t) >= 0),
      autres: rec.filter(r => r.pg === 1 && /^Autres :/.test(r.t)).map(r => r.t)};
  }, EU.concat(EP));
  const e = await constatVu('74', objs, tr, '', false, false, {fin}), F = e.fin || {}, L = F.L || [], att = EU.concat(EP);
  const ys = L.slice().sort((a, b) => a.y - b.y), mal = L.filter(r => Math.abs(r.x - 70.8) > 0.01 || !(r.y > 402 && r.y < 620.5) || r.sz < 6 || r.x + r.w > 172.5);
  const serre = ys.filter((r, i) => i && r.y - ys[i - 1].y < 0.9 * Math.max(r.sz, ys[i - 1].sz));
  R.ok(JSON.stringify(L.map(r => r.t).sort()) === JSON.stringify(att.slice().sort()) && !mal.length && !serre.length && !(F.autres || ['?']).length, '74 PDF du constat, '
    + (F.n || 0) + ' lignes : dix libellés sous le seul nom de l\'appareil, une ligne chacun, dans leur case, en 6 pt au moins, sans chevauchement, aucun « Autres : » '
    + '(obtenu ' + L.length + ' libellés, ' + (ys.length ? ys[0].sz + ' pt' : '-') + ((F.autres || []).length ? ', « Autres : » : ' + JSON.stringify(F.autres.slice(0, 3)) : '')
    + (mal.length ? ', hors case : ' + JSON.stringify(mal.slice(0, 2)) : '') + (serre.length ? ', serrés : ' + JSON.stringify(serre.slice(0, 2)) : '')
    + (L.length !== att.length ? ', ' + JSON.stringify(L.map(r => r.t)) : '') + ')');
}
/* 75 et 76 (relecture de m132 ; consigne du 13 nov. 2026 : une anomalie à arbitrer n'est jamais comptée conforme) : chaudière et attente
   reliées à la boîte EU, anomalie saisie dans le croquis sur la chaudière, laissée « à arbitrer » ; au constat, jamais repris du croquis
   (sans croqAuto : le suivi ne crée rien), une ligne « Chaudière et attente » ×2, EU_D, saisie à la main. L'attente prend cette
   ligne (vcApparier), la chaudière n'en a pas : vcArbitrage se replie sur la ressemblance d'avant m132. Attendu : la ligne saisie marquée
   à arbitrer, ni « oui » ni « non » ; au PDF du constat, la seule croix de sa rangée est celle du raccordement, aucune sous « Oui » ni sous
   « Non » ; un constat signé avant m132 pendant cet arbitrage (la ligne saisie dans c.fige.arbitrer, simulé) ne se dit pas changé depuis */
async function autresAvantReprise(){
  const O = {ch: ['ch', 'chaudiere', -3, 0], at: ['at', 'attente', 3, 0]}, B = ['B', 'boite', 0, -4, {res: 'EU'}];
  const anomManu = [{id: 'M1', objId: 'ch', reseau: 'EU', obs: 'Purge fictive à contrôler', preco: '', nc: true, st: 'arbitrer'}];
  const prep = "c.rows = c.rows.filter(r => r.std); c.rows.forEach(r => { r.nb = ''; r.raccord = ''; r.methodes = []; }); delete c.croqAuto;"
    + " c.rows.push({id: 'au1', groupe: 'EU', label: 'Chaudière et attente', std: false, nb: '2', raccord: 'EU_D', conforme: '', methodes: []});";
  const fin = p => p.evaluate(async () => {
    const T = window.__VT, v = T.S.visites[0], res = T.VC_RESUMES.get(v.id), L = T.S.anoms.filter(a => a.visiteId === v.id);
    const arb = ((res && res.rows) || []).filter(s => s.arbitrer).map(s => s.id).join(' ; ') || 'aucune';
    const x = T.constatEval(v, L).rows.find(q => q.r.id === 'au1');
    /* PDF du constat : croix de la rangée « Chaudière et attente », libellé sans « Autres : » depuis m147 (texte, position et page relevés aux
       appels de la bibliothèque ; le libellé à x 70,8 de la page 1) */
    const J0 = window.jspdf.jsPDF, rec = [];
    const W = function(){ const d = new J0(...arguments), ot = d.text;
      d.text = function(t, x, y){ let pg = 0; try { pg = d.internal.getCurrentPageInfo().pageNumber; } catch (e){}
        rec.push({t: [].concat(t).join(' '), x, y, pg}); return ot.apply(d, arguments); };
      return d; };
    W.API = J0.API; window.jspdf.jsPDF = W;
    try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; }
    const r0 = rec.find(r => r.pg === 1 && Math.abs(r.x - 70.8) < 0.01 && r.t === 'Chaudière et attente'), hd = t => r0 ? rec.filter(r => r.pg === r0.pg && r.t === t && r.y < r0.y).pop() : null;
    const oui = hd('Oui'), non = hd('Non'), croix = r0 ? rec.filter(r => r.pg === r0.pg && r.t === 'X' && Math.abs(r.y - r0.y) < 4) : [];
    const pdf = !r0 || !oui || !non ? 'rangée ou en-têtes absents' : croix.map(r => Math.abs(r.x - oui.x) < 3 ? 'Oui' : Math.abs(r.x - non.x) < 3 ? 'Non' : 'raccordement').join(', ') || 'aucune';
    /* constat signé avant m132 pendant cet arbitrage, simulé : c.fige.arbitrer tel que l'écrivait 9ad0840, la ligne saisie */
    const c = v.constat, E0 = T.constatEval(v, L), conf = {}; E0.rows.forEach(q => { conf[q.r.id] = q.conf; });
    c.signeLe = '2026-11-15T10:00:00.000Z';
    c.fige = {conclusion: E0.conclusion, conf, precos: E0.precos, meth: E0.meth, observations: E0.obsText, reserves: E0.reservesText, soussigne: E0.soussigne,
      visite: {}, arbitrer: {n: 1, lignes: ['au1']}};
    const why = T.constatEval(v, L).changeWhy || [];
    delete c.signeLe; delete c.fige;
    return {arb, ligne: x ? JSON.stringify(x.conf) + (x.arbitrer ? ' à arbitrer' : '') : 'absente', pdf, change: why.indexOf('anomalies à arbitrer') >= 0};
  });
  for (const [n, ordre] of [['75', ['ch', 'at']], ['76', ['at', 'ch']]]){
    const e = await constatVu(n, ordre.map(k => O[k]).concat([B]), [['Bc', 'ch', 'B'], ['Ba', 'at', 'B']], prep, false, false, {fin, anomManu}), F = e.fin || {};
    const dit = n + ' chaudière et attente dessinées ' + (n === '75' ? 'dans cet ordre' : 'dans l\'ordre inverse') + ', chaudière à arbitrer, constat jamais repris';
    R.ok(F.arb === 'autre:Chaudière (purge, condensat)' && e.autres === 'Chaudière et attente ×2' && F.ligne === '"" à arbitrer', dit + ' : la ligne saisie « Chaudière et '
      + 'attente » ×2 est marquée à arbitrer, ni « oui » ni « non », aucune ligne créée (obtenu ' + JSON.stringify([F.arb, e.autres, F.ligne]) + ')');
    R.ok(F.pdf === 'raccordement', dit + ' : PDF du constat, rangée de la ligne saisie sans croix sous « Oui » ni sous « Non » (croix : ' + F.pdf + ')');
    R.ok(F.change === false, dit + ' : constat signé avant m132 pendant cet arbitrage : pas de « Le dossier a changé depuis la signature (anomalies à arbitrer) » '
      + '(obtenu ' + JSON.stringify(F.change) + ')');
  }
}

/* 77 à 82 (m133 ; M2 de la relecture de m132, M3 de celle de m133) : « Bidet » et « Bidet suspendu » reliés à la boîte EU, anomalie
   saisie dans le croquis sur le bidet suspendu, retenue (non conforme). Reportée dans le dossier, elle est rangée sur la ligne
   « Bidet suspendu » que vcApparier lie à sa ligne du croquis (a.installation), notée dans croquis.auto.installation (ce n'est pas une
   retouche, rien n'est « à reporter ») */
const BIDETS = [['b1', 'autre_eu', -3, 0, {nom: 'Bidet'}], ['b2', 'autre_eu', 3, 0, {nom: 'Bidet suspendu'}], ['B', 'boite', 0, -4, {res: 'EU'}]];
const BIDETS_TR = [['T1', 'b1', 'B'], ['T2', 'b2', 'B']];
const BIDETS_ANOM = [{id: 'M1', objId: 'b2', reseau: 'EU', obs: 'Bidet suspendu : fuite au raccord', preco: 'Réparation du raccord', nc: true, st: 'retenue'}];
const SANS_LIGNE = 'Bidet suspendu : une anomalie du croquis de terrain n\'est rangée sur aucune ligne du constat ; « Reprendre du croquis » crée la ligne et l\'y range.';
/* état relevé : ligne de l'anomalie et sa valeur notée, ligne « Bidet suspendu » du constat, conformité des deux lignes et leurs
   croix au PDF du constat (rangées lues sous leur seul libellé depuis m147, à x 70,8 de la page 1), anomalies « à reporter » ; garde :
   constat signé, l'anomalie remise sans ligne n'est pas rangée */
const finBidets = p => p.evaluate(async () => {
  const T = window.__VT, v = T.S.visites[0], c = v.constat || {rows: []}, L = T.S.anoms.filter(a => a.visiteId === v.id), a = L[0], E = T.constatEval(v, L);
  const lig = lab => (c.rows || []).find(r => !r.std && r.label === lab) || null, bs = lig('Bidet suspendu');
  const conf = lab => { const x = E.rows.find(q => !q.r.std && q.r.label === lab); return x ? JSON.stringify(x.conf) + ' anomalies ' + x.anoms.length : 'absente'; };
  const J0 = window.jspdf.jsPDF, rec = [];
  const W = function(){ const d = new J0(...arguments), ot = d.text;
    d.text = function(t, x, y){ let pg = 0; try { pg = d.internal.getCurrentPageInfo().pageNumber; } catch (e){}
      rec.push({t: [].concat(t).join(' '), x, y, pg}); return ot.apply(d, arguments); };
    return d; };
  W.API = J0.API; window.jspdf.jsPDF = W;
  try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; }
  const croix = t => { const r0 = rec.find(r => r.pg === 1 && Math.abs(r.x - 70.8) < 0.01 && r.t === t), hd = h => r0 ? rec.filter(r => r.pg === r0.pg && r.t === h && r.y < r0.y).pop() : null,
    oui = hd('Oui'), non = hd('Non');
    if (!r0 || !oui || !non) return 'rangée ou en-têtes absents';
    return rec.filter(r => r.pg === r0.pg && r.t === 'X' && Math.abs(r.y - r0.y) < 4).map(r => Math.abs(r.x - oui.x) < 3 ? 'Oui' : Math.abs(r.x - non.x) < 3 ? 'Non' : 'raccordement').join(', ') || 'aucune'; };
  const res = T.VC_RESUMES.get(v.id), out = {n: L.length, inst: a ? a.installation : null, auto: a && a.croquis && a.croquis.auto ? a.croquis.auto.installation : null,
    ligne: bs ? bs.id : null, bs: conf('Bidet suspendu'), bi: conf('Bidet'), pdfBs: croix('Bidet suspendu'), pdfBi: croix('Bidet'), concl: E.auto,
    aReporter: res ? res.aReporter : null};
  /* garde : constat signé (simulé), anomalie remise sans ligne : la reprise ne la range pas */
  if (a && a.croquis && a.croquis.auto && res){
    const i0 = a.installation, au0 = a.croquis.auto.installation; a.installation = ''; a.croquis.auto.installation = ''; c.signeLe = '2026-11-15T10:00:00.000Z';
    let nS = null; try { nS = T.constatDepuisCroquis(v, res, false); } catch (e){ nS = 'exception ' + e.message; }
    out.signe = {n: nS, inst: a.installation};
    delete c.signeLe; a.installation = i0; a.croquis.auto.installation = au0;
  }
  return out;
});
async function autresAnomalie(){
  /* 77 : constat repris du croquis */
  let e = await constatVu('77', BIDETS, BIDETS_TR, '', false, false, {anomManu: BIDETS_ANOM, fin: finBidets}), F = e.fin || {};
  const dit = 'Bidet et Bidet suspendu dessinés, anomalie retenue sur le bidet suspendu';
  R.ok(F.n === 1 && !!F.ligne && F.inst === F.ligne && F.auto === F.ligne && F.aReporter === 0 && !e.ecarts.some(x => /ne suit pas encore|n'est rangée sur aucune ligne/.test(x)),
    '77 ' + dit + ', constat repris du croquis : l\'anomalie est rangée sur la ligne « Bidet suspendu », valeur notée (ni retouche ni « à reporter ») (obtenu '
    + JSON.stringify({n: F.n, inst: F.inst, auto: F.auto, ligne: F.ligne, aReporter: F.aReporter, ecarts: e.ecarts}) + ')');
  R.ok(F.bs === '"non" anomalies 1' && F.bi === '"oui" anomalies 0' && F.concl === 'non_conformes', '77 ' + dit + ' : ligne « Bidet suspendu » non conforme, avec l\'anomalie ; '
    + 'ligne « Bidet » conforme (obtenu ' + JSON.stringify({bs: F.bs, bi: F.bi, concl: F.concl}) + ')');
  const cx = t => String(t || '').split(', ');
  R.ok(cx(F.pdfBs).indexOf('Non') >= 0 && cx(F.pdfBs).indexOf('Oui') < 0 && cx(F.pdfBi).indexOf('Oui') >= 0 && cx(F.pdfBi).indexOf('Non') < 0, '77 ' + dit + ' : PDF du constat, '
    + 'croix sous « Non » pour « Bidet suspendu », sous « Oui » pour « Bidet », libellés sans « Autres : » (croix : ' + JSON.stringify({bs: F.pdfBs, bi: F.pdfBi}) + ')');
  R.ok(!!F.signe && F.signe.n === 0 && F.signe.inst === '', '77 garde : constat signé, l\'anomalie remise sans ligne n\'est pas rangée (obtenu ' + JSON.stringify(F.signe) + ')');

  /* 78 : croquis rouvert puis refermé : rien ne change */
  e = await constatVu('78', BIDETS, BIDETS_TR, '', true, false, {anomManu: BIDETS_ANOM, fin: finBidets}); F = e.fin || {};
  R.ok(!!F.ligne && F.inst === F.ligne && F.auto === F.ligne && F.aReporter === 0 && e.apres && e.apres.inst === e.avant.inst && F.bs === '"non" anomalies 1' && F.bi === '"oui" anomalies 0'
    && !e.apres.ecarts.some(x => /ne suit pas encore|n'est rangée sur aucune ligne/.test(x)), '78 ' + dit + ', croquis rouvert puis refermé : l\'anomalie reste sur sa ligne, rien « à reporter » '
    + '(obtenu ' + JSON.stringify({inst: F.inst, auto: F.auto, ligne: F.ligne, aReporter: F.aReporter, bs: F.bs, bi: F.bi, ecarts: e.apres && e.apres.ecarts}) + ')');

  /* 79 et 80 : constat sans ces lignes, jamais repris du croquis : rappel ; « Reprendre du croquis » crée les lignes et y range l'anomalie */
  const prep = "c.rows = c.rows.filter(r => r.std); c.rows.forEach(r => { r.nb = ''; r.raccord = ''; r.methodes = []; }); delete c.croqAuto;"
    + " a.installation = ''; a.croquis = Object.assign({}, a.croquis, {auto: Object.assign({}, a.croquis.auto, {installation: ''})});";
  e = await constatVu('79', BIDETS, BIDETS_TR, prep, false, false, {anomManu: BIDETS_ANOM, fin: finBidets, reprise: true}); F = e.fin || {};
  const av = e.avant || {}, ap = e.apres || {};
  R.ok(av.inst === '' && (av.ecarts || []).indexOf(SANS_LIGNE) >= 0 && !(av.ecarts || []).some(x => /^Bidet : une anomalie/.test(x)), '79 ' + dit + ', constat jamais repris, '
    + 'sans ligne « Autres » : rappel « ' + SANS_LIGNE + ' », aucun pour le bidet (obtenu ' + JSON.stringify({inst: av.inst, ecarts: av.ecarts}) + ')');
  R.ok(!!F.ligne && F.inst === F.ligne && F.auto === F.ligne && F.bs === '"non" anomalies 1' && F.bi === '"oui" anomalies 0' && (ap.ecarts || []).indexOf(SANS_LIGNE) < 0,
    '80 puis « Reprendre du croquis » : lignes créées, l\'anomalie rangée sur « Bidet suspendu », non conforme ; « Bidet » conforme ; plus de rappel (obtenu '
    + JSON.stringify({inst: F.inst, auto: F.auto, ligne: F.ligne, bs: F.bs, bi: F.bi, ecarts: ap.ecarts}) + ')');

  /* 81 et 82 (relecture de m133, M3) : le même constat, mais l'anomalie mise sur « Aucune » par le technicien (la valeur notée reste
     vide) : la reprise ne la range pas, aucun rappel ne le promet */
  const prepAucune = prep.replace("a.installation = '';", "a.installation = 'aucune';");
  e = await constatVu('81', BIDETS, BIDETS_TR, prepAucune, false, false, {anomManu: BIDETS_ANOM, fin: finBidets, reprise: true}); F = e.fin || {};
  const av81 = e.avant || {}, ap81 = e.apres || {}, rappel = x => (x.ecarts || []).some(t => /sur aucune ligne du constat/.test(t));
  R.ok(prepAucune !== prep && av81.inst === 'aucune' && !rappel(av81), '81 ' + dit + ', constat jamais repris, l\'anomalie mise sur « Aucune » par le technicien : '
    + 'aucun rappel « … n\'est rangée sur aucune ligne du constat ; « Reprendre du croquis » … l\'y range » (obtenu ' + JSON.stringify({inst: av81.inst, ecarts: av81.ecarts}) + ')');
  R.ok(!!F.ligne && F.inst === 'aucune' && F.auto === '' && !rappel(ap81), '82 puis « Reprendre du croquis » : lignes créées, l\'anomalie reste sur « Aucune », '
    + 'le choix du technicien (obtenu ' + JSON.stringify({inst: F.inst, auto: F.auto, ligne: F.ligne, ecarts: ap81.ecarts}) + ')');
}

/* m137 (réponse du 16 nov. 2026 à E2, décision D1) : « Lavabo » retiré des puces de la feuille « Autre installation EU », croquis désactivé
   compris ; une ligne déjà saisie reste, et le libellé peut toujours être tapé à la main. Un lavabo est dessiné et relié à une boîte EU ;
   le croquis est désactivé dans les Réglages (case « Utiliser le croquis de terrain »), puis activé de nouveau. */
const SUGG_EU = ['Chaudière (purge, condensat)', 'Regard EU', 'Attente', 'Douche', 'Lave-vaisselle', 'Ballon d\'eau chaude', 'Fontaine'];
const SUGG_EP = ['Regard EP', 'Descente EP', 'Puisard', 'Drain', 'Caniveau-grille', 'Siphon de cour', 'Trop-plein'];
async function suggestionsAutres(){
  const A = await C.ouvrir(), p = A.p, MOD = '#modal-root .modal';
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), els = [C.P('la', 'lavabo', v0.cx, v0.cy), C.P('B', 'boite', v0.cx, v0.cy - 4, {res: 'EU'})], I = C.index(els);
    els.push(C.L('Bl', 'tr', ['la', 'B'], I));
    await C.injecter(p, {el: els});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
    await C.fermerCroquis(p); await C.pause(p, 600);
    await p.evaluate(async () => { const T = window.__VT, v = T.S.visites[0]; v.statut = 'visitee'; T.constatDepuisCroquis(v, await T.vcResume(v), false); await T.flushSaves(); });
    /* case « Utiliser le croquis de terrain » des Réglages cochée (oui) ou décochée, puis le constat du dossier ; croquis activé : bloc et résumé prêts */
    const croquisActif = async oui => {
      await p.evaluate(() => { location.hash = '#/reglages'; }); await p.waitForSelector('input[data-act="vc-actif"]');
      if (await p.$eval('input[data-act="vc-actif"]', x => x.checked) !== oui) await p.click('input[data-act="vc-actif"]');
      await p.waitForFunction(o => !!window.__VT.S.croq.actif === o, oui); await C.pause(p, 300);
      await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
      await p.waitForSelector('[data-act="c-addrow"][data-g="EU"]');
      if (oui){ await p.waitForSelector('.croq-fill'); await p.waitForFunction(() => window.__VT.VC_RESUMES.has(window.__VT.S.visites[0].id)); }
      await C.pause(p, oui ? 900 : 600);
    };
    await croquisActif(false);
    /* feuille d'une ligne « Autres » : titre, puces, champ de saisie, état du croquis ; refermée par « Annuler », sauf si garder */
    const feuille = async (g, garder) => {
      await p.click('[data-act="c-addrow"][data-g="' + g + '"]'); await p.waitForSelector(MOD + ' .m-title');
      const f = await p.evaluate(M => { const m = document.querySelector(M);
        return {titre: m.querySelector('.m-title').textContent, puces: [...m.querySelectorAll('[data-m="sg"]')].map(b => b.textContent.trim()), saisie: !!m.querySelector('#m-lab'),
          bloc: !!document.querySelector('.croq-fill'), actif: !!window.__VT.S.croq.actif}; }, MOD);
      if (!garder){ await p.click(MOD + ' .m-foot [data-mi="0"]'); await p.waitForSelector(MOD, {state: 'detached'}); await C.pause(p, 300); }
      return f;
    };
    /* lignes « Autres » du constat (réseau, libellé, nombre) et celles que l'écran affiche */
    const lignes = () => p.evaluate(() => { const v = window.__VT.S.visites[0];
      return {autres: (v.constat.rows || []).filter(x => !x.std).map(x => x.groupe + ' ' + x.label + ' ×' + x.nb),
        ecran: [...document.querySelectorAll('[data-act="c-delrow"]')].map(b => b.getAttribute('aria-label'))}; });
    const vu = f => f.titre + ' : ' + JSON.stringify(f.puces) + (f.actif ? ', croquis activé' : ', croquis désactivé') + (f.bloc ? ', bloc du croquis affiché' : ', sans bloc du croquis');
    let f = await feuille('EU');
    R.ok(!f.actif && !f.bloc && f.titre === 'Autre installation EU' && f.puces.indexOf('Lavabo') < 0 && JSON.stringify(f.puces) === JSON.stringify(SUGG_EU),
      '83 croquis désactivé : la feuille « Autre installation EU » ne propose pas « Lavabo » ; les sept autres puces, dans l\'ordre (' + vu(f) + ')');
    const fp = await feuille('EP');
    R.ok(f.puces.indexOf('Douche') >= 0 && f.saisie && fp.titre === 'Autre installation EP' && JSON.stringify(fp.puces) === JSON.stringify(SUGG_EP),
      '84 témoins, croquis désactivé : « Douche » proposée, avec le champ « Ou saisissez le libellé » ; feuille EP inchangée (' + vu(fp) + ')');
    /* « Lavabo » tapé à la main, puis « Ajouter » */
    await feuille('EU', true); await p.fill(MOD + ' #m-lab', 'Lavabo'); await p.click(MOD + ' .m-foot .btn.primary');
    await p.waitForSelector(MOD, {state: 'detached'}); await C.pause(p, 600);
    const l1 = await lignes();
    R.ok(JSON.stringify(l1.autres) === JSON.stringify(['EU Lavabo ×1']) && l1.ecran.indexOf('Supprimer la ligne Lavabo') >= 0,
      '85 témoin, croquis désactivé : « Lavabo » tapé à la main ajoute la ligne « Lavabo » ×1 aux autres installations EU, affichée au constat (' + JSON.stringify(l1) + ')');
    /* croquis activé de nouveau dans les Réglages */
    await croquisActif(true);
    f = await feuille('EU');
    R.ok(f.actif && f.bloc && f.titre === 'Autre installation EU' && f.puces.indexOf('Lavabo') < 0 && JSON.stringify(f.puces) === JSON.stringify(SUGG_EU),
      '86 croquis activé, un lavabo dessiné : la feuille « Autre installation EU » ne propose pas « Lavabo » ; les sept autres puces, dans l\'ordre (' + vu(f) + ')');
    const l2 = await lignes();
    R.ok(f.puces.indexOf('Douche') >= 0 && JSON.stringify(l2.autres) === JSON.stringify(['EU Lavabo ×1']) && l2.ecran.indexOf('Supprimer la ligne Lavabo') >= 0,
      '87 témoins, croquis activé : « Douche » proposée ; la ligne « Lavabo » saisie à la main reste (' + JSON.stringify(l2) + ')');
  } finally { R.ok(!A.erreurs.length, '83 à 87 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

/* 88 à 94 (m143 ; décision D9 de `.claude/conception-v172.md`, réponse rangement-autres-par-texte du 16 nov. 2026, choix b) : une
   chaudière reliée à un puisard et deux points « Drain » reliés à la boîte EU ; anomalies du croquis retenues (« Chaudière : rejet dans
   un puisard », « Drain : rejet au réseau EU »). Elles vont sur la ligne du constat que vcApparier lie à la ligne « Autres » de leur objet
   (« Chaudière (purge, condensat) », « Drain »), comme celles d'un autre appareil depuis m133, et non plus d'après leur texte */
const CHD = [['ch', 'chaudiere', -3, 0], ['pu', 'puisard', -3, -5], ['d1', 'drain', 3, 0], ['d2', 'drain', 6, 0], ['B', 'boite', 4.5, -5, {res: 'EU'}]];
const CHD_TR = [['Tc', 'ch', 'pu'], ['T1', 'd1', 'B'], ['T2', 'd2', 'B']], CHD_L = 'Chaudière (purge, condensat)', FIOUL = 'Chaudière fioul';
const CHD_DRAIN = 'Drain : 2 anomalies du croquis de terrain ne sont rangées sur aucune ligne du constat ; « Reprendre du croquis » crée la ligne et les y range.';
/* ligne tapée par le technicien (libellé, nombre), ajoutée par prep */
const tapee = (lab, nb) => "c.rows.push({id: 'au9', groupe: 'EU', label: '" + lab + "', std: false, nb: '" + nb + "', raccord: 'EU_D', conforme: '', methodes: []});";
/* anomalie du croquis d'après sa clé, dans prep */
const ANOM_CROQ = "const croq = k => T.S.anoms.find(x => x.visiteId === v.id && x.croquis && x.croquis.cle === k);";
/* état relevé : pour chaque anomalie (clé du croquis, ou « dossier »), son installation, sa valeur notée et les lignes où l'application la
   range (anomRows) ; conformité et nombre d'anomalies des lignes « Autres » actives, leurs identifiants ; anomalies « à reporter ». signe :
   garde, constat signé (simulé), l'anomalie de la chaudière remise sans ligne : ni la reprise ni le suivi ne la rangent */
const finChd = (p, signe) => p.evaluate(async signe => {
  const T = window.__VT, v = T.S.visites[0], c = v.constat || {rows: []}, L = T.S.anoms.filter(a => a.visiteId === v.id), E = T.constatEval(v, L), res = T.VC_RESUMES.get(v.id);
  const out = {anom: {}, lignes: {}, ids: {}, aReporter: res ? res.aReporter : null};
  L.forEach(a => { out.anom[a.croquis && a.croquis.cle || 'dossier'] = {inst: a.installation, auto: a.croquis && a.croquis.auto ? a.croquis.auto.installation : null,
    ligne: T.anomRows(c, a).map(r => r.label).join(' + ') || 'aucune'}; });
  E.rows.filter(q => !q.r.std && String(q.r.nb || '').trim()).forEach(q => { out.lignes[q.r.label] = JSON.stringify(q.conf) + ' ' + q.anoms.length; });
  (c.rows || []).filter(r => !r.std).forEach(r => { out.ids[r.label] = r.id; });
  const a = L.find(x => x.croquis && x.croquis.cle === 'eu-inf:ch');
  if (signe && a && a.croquis.auto && res){
    const i0 = a.installation, au0 = a.croquis.auto.installation;
    a.installation = ''; a.croquis.auto.installation = ''; c.signeLe = '2026-11-15T10:00:00.000Z';
    let n1 = null, n2 = null; try { n1 = T.constatDepuisCroquis(v, res, false); n2 = T.constatDepuisCroquis(v, res, true); } catch (e){ n1 = 'exception ' + e.message; }
    out.signe = {n1, n2, inst: a.installation, auto: a.croquis.auto.installation};
    delete c.signeLe; a.installation = i0; a.croquis.auto.installation = au0;
  }
  return out;
}, !!signe);
/* croix de la rangée lab au PDF du constat (94), relevées comme dans finBidets : texte, position et page des appels de la bibliothèque ;
   la rangée : son libellé, sans « Autres : » depuis m147, à x 70,8 de la page 1 */
const croixPdf = (p, lab) => p.evaluate(async lab => {
  const T = window.__VT, v = T.S.visites[0], J0 = window.jspdf.jsPDF, rec = [];
  const W = function(){ const d = new J0(...arguments), ot = d.text;
    d.text = function(t, x, y){ let pg = 0; try { pg = d.internal.getCurrentPageInfo().pageNumber; } catch (e){}
      rec.push({t: [].concat(t).join(' '), x, y, pg}); return ot.apply(d, arguments); };
    return d; };
  W.API = J0.API; window.jspdf.jsPDF = W;
  try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; }
  const r0 = rec.find(r => r.pg === 1 && Math.abs(r.x - 70.8) < 0.01 && r.t === lab), hd = h => r0 ? rec.filter(r => r.pg === r0.pg && r.t === h && r.y < r0.y).pop() : null;
  const oui = hd('Oui'), non = hd('Non');
  if (!r0 || !oui || !non) return 'rangée ou en-têtes absents';
  return rec.filter(r => r.pg === r0.pg && r.t === 'X' && Math.abs(r.y - r0.y) < 4).map(r => Math.abs(r.x - oui.x) < 3 ? 'Oui' : Math.abs(r.x - non.x) < 3 ? 'Non'
    : 'raccordement').join(', ') || 'aucune';
}, lab);
async function autresParObjet(){
  const js = x => JSON.stringify(x), dit = 'chaudière reliée à un puisard, deux points « Drain » reliés à la boîte EU';
  /* 88 et 89 : constat repris du croquis, puis une ligne « Chaudière fioul » ×1 tapée par le technicien ; 89 : croquis rouvert et refermé */
  let e = await constatVu('88', CHD, CHD_TR, tapee(FIOUL, '1'), true, false, {fin: p => finChd(p, true)}), F = e.fin || {};
  const A = F.anom || {}, ch = A['eu-inf:ch'] || {}, d1 = A['ep-eu:d1'] || {}, d2 = A['ep-eu:d2'] || {}, idCh = (F.ids || {})[CHD_L], idDr = (F.ids || {}).Drain;
  R.ok(!!idCh && ch.inst === idCh && ch.auto === idCh && ch.ligne === CHD_L && (F.lignes || {})[CHD_L] === '"non" 1' && (F.lignes || {})[FIOUL] === '"oui" 0',
    '88 ' + dit + ', constat repris, « ' + FIOUL + ' » tapée : l\'anomalie de la chaudière est rangée sur « ' + CHD_L + ' », la ligne liée à sa chaudière '
    + '(installation et valeur notée ; v1.7.1 : installation vide, rangée par le texte), aucune sur « ' + FIOUL + ' » (obtenu ' + js({ch, idCh, lignes: F.lignes}) + ')');
  R.ok(!!idDr && d1.inst === idDr && d2.inst === idDr && d1.auto === idDr && d2.auto === idDr && d1.ligne === 'Drain' && d2.ligne === 'Drain' && (F.lignes || {}).Drain === '"non" 2',
    '88 ' + dit + ' : les anomalies des deux drains, comptés sur la ligne « Drain », sont rangées sur elle (installation et valeur notée ; v1.7.1 : vides) (obtenu '
    + js({d1, d2, idDr, drain: (F.lignes || {}).Drain}) + ')');
  R.ok(F.aReporter === 0 && !!e.apres && !e.apres.ecarts.some(x => /ne suit pas encore|n'est rangée sur aucune ligne/.test(x)), '89 ' + dit + ', croquis rouvert puis refermé : '
    + 'rien « à reporter », aucun rappel (obtenu ' + js({aReporter: F.aReporter, ecarts: e.apres && e.apres.ecarts}) + ')');
  R.ok(!!F.signe && F.signe.n1 === 0 && F.signe.n2 === 0 && F.signe.inst === '' && F.signe.auto === '', '89 garde : constat signé, l\'anomalie de la chaudière remise sans ligne '
    + 'n\'est rangée ni par la reprise ni par le suivi (obtenu ' + js(F.signe) + ')');

  /* 90 : la même, sa localisation nomme la chaudière fioul : le texte ressemble aux deux lignes ; elle va sur celle de sa chaudière */
  e = await constatVu('90', CHD, CHD_TR, tapee(FIOUL, '1') + ANOM_CROQ + " croq('eu-inf:ch').localisation = 'Chaufferie, chaudière fioul';", false, false, {fin: p => finChd(p)});
  F = e.fin || {}; const ch90 = (F.anom || {})['eu-inf:ch'] || {}, id90 = (F.ids || {})[CHD_L];
  R.ok(!!id90 && ch90.inst === id90 && ch90.ligne === CHD_L && (F.lignes || {})[CHD_L] === '"non" 1' && (F.lignes || {})[FIOUL] === '"oui" 0', '90 ' + dit + ', « ' + FIOUL
    + ' » tapée, localisation « Chaufferie, chaudière fioul » : l\'anomalie de la chaudière va sur « ' + CHD_L + ' » (v1.7.1 : sur aucune ligne, son texte ressemble aux '
    + 'deux) (obtenu ' + js({ch: ch90, id: id90, lignes: F.lignes}) + ')');

  /* 91 et 92 : constat jamais repris du croquis (jamaisRepris), une ligne « Chaudière fioul » ×1 tapée, et une anomalie saisie au dossier
     « Chaudière fioul : … », sans croquis ; lus au suivi (premier affichage du constat, finAvant), puis après « Reprendre du croquis » */
  const jamaisRepris = "c.rows = c.rows.filter(r => r.std); c.rows.forEach(r => { r.nb = ''; r.raccord = ''; r.methodes = []; }); delete c.croqAuto;" + tapee(FIOUL, '1')
    + " T.S.anoms.filter(x => x.visiteId === v.id && x.croquis).forEach(x => { x.installation = ''; x.croquis = Object.assign({}, x.croquis, {auto: Object.assign({}, x.croquis.auto, {installation: ''})}); });";
  const prep91 = jamaisRepris + " T.S.anoms.push({id: 'a-fioul', etudeId: v.etudeId, visiteId: v.id, reseau: 'EU', observation: 'Chaudière fioul : fuite au raccord (anomalie fictive)', preconisation: '',"
    + " localisation: '', installation: '', categorie: 'autre', photos: [], photoNonRequise: true, createdAt: '2026-11-08T08:00:00.000Z', updatedAt: '2026-11-08T08:00:00.000Z'});";
  e = await constatVu('91', CHD, CHD_TR, prep91, false, false, {finAvant: p => finChd(p), fin: p => finChd(p), reprise: true}); F = e.fin || {};
  const av = e.avant || {}, ap = e.apres || {}, Fa = av.fin || {}, cha = (Fa.anom || {})['eu-inf:ch'] || {}, dosa = (Fa.anom || {}).dossier || {}, idFa = (Fa.ids || {})[FIOUL];
  /* au suivi seul (constatDepuisCroquis sans croqAuto, puis vcRangerAutres) : la seule preuve de ce chemin quand une ligne est tapée */
  R.ok(!!idFa && cha.inst === idFa && cha.auto === idFa && cha.ligne === FIOUL && dosa.inst === '' && dosa.ligne === FIOUL && (Fa.lignes || {})[FIOUL] === '"non" 2'
    && !(av.ecarts || []).some(x => /^Chaudière.*sur aucune ligne/.test(x)), '91 ' + dit + ', constat jamais repris, « ' + FIOUL + ' » tapée : au suivi, avant toute reprise, '
    + 'l\'anomalie de la chaudière est rangée sur « ' + FIOUL + ' », la ligne liée à sa chaudière (installation et valeur notée ; v1.7.1 : sur aucune ligne, son texte ne '
    + 'nomme pas le fioul), aucun rappel ; l\'anomalie saisie au dossier « ' + FIOUL + ' : … » y est rangée par son texte, sans installation écrite (obtenu '
    + js({ch: cha, dossier: dosa, id: idFa, lignes: Fa.lignes, ecarts: av.ecarts}) + ')');
  const ch92 = (F.anom || {})['eu-inf:ch'] || {}, dos = (F.anom || {}).dossier || {}, idF = (F.ids || {})[FIOUL];
  R.ok(!!idF && idF === idFa && ch92.inst === idF && ch92.auto === idF && ch92.ligne === FIOUL && dos.inst === '' && dos.ligne === FIOUL && (F.lignes || {})[FIOUL] === '"non" 2'
    && !(CHD_L in (F.ids || {})), '91 ' + dit + ', puis « Reprendre du croquis » : l\'anomalie de la chaudière reste sur « ' + FIOUL + ' », aucune ligne « ' + CHD_L
    + ' » créée ; l\'anomalie saisie au dossier y reste rangée par son texte (obtenu ' + js({ch: ch92, dossier: dos, id: idF, lignes: F.lignes, ids: F.ids}) + ')');
  R.ok((av.ecarts || []).indexOf(CHD_DRAIN) >= 0 && (ap.ecarts || []).indexOf(CHD_DRAIN) < 0 && ((F.anom || {})['ep-eu:d1'] || {}).ligne === 'Drain'
    && ((F.anom || {})['ep-eu:d2'] || {}).ligne === 'Drain', '92 ' + dit + ', constat jamais repris, sans ligne « Drain » : rappel « ' + CHD_DRAIN + ' » ; puis « Reprendre '
    + 'du croquis » : ligne créée, les deux anomalies y sont rangées, plus de rappel (obtenu ' + js({avant: av.ecarts, apres: ap.ecarts, d1: (F.anom || {})['ep-eu:d1'],
    d2: (F.anom || {})['ep-eu:d2']}) + ')');

  /* 93 (garde) : constat repris, « Chaudière fioul » tapée ; le technicien a mis l'anomalie de la chaudière sur « Chaudière fioul », celle d'un
     drain sur « Aucune » : ni le suivi ni la reprise n'y touchent */
  const prep93 = tapee(FIOUL, '1') + ANOM_CROQ + " croq('eu-inf:ch').installation = 'au9'; croq('ep-eu:d1').installation = 'aucune';";
  e = await constatVu('93', CHD, CHD_TR, prep93, false, false, {fin: p => finChd(p), reprise: true}); F = e.fin || {};
  const ch93 = (F.anom || {})['eu-inf:ch'] || {}, d93 = (F.anom || {})['ep-eu:d1'] || {};
  R.ok(ch93.inst === 'au9' && ch93.ligne === FIOUL && d93.inst === 'aucune' && d93.ligne === 'aucune', '93 garde : lignes choisies par le technicien (« ' + FIOUL + ' » pour '
    + 'la chaudière, « Aucune » pour un drain) gardées après le suivi et la reprise (obtenu ' + js({ch: ch93, d1: d93}) + ')');

  /* 94 (témoin du livrable) : comme 91, sans l'anomalie saisie au dossier, lu au suivi, sans reprise : l'anomalie de la chaudière, rangée sur
     « Chaudière fioul », rend cette ligne non conforme, au constat comme au PDF du constat (v1.7.1 : sur aucune ligne, la ligne conforme) */
  e = await constatVu('94', CHD, CHD_TR, jamaisRepris, false, false, {fin: async p => Object.assign(await finChd(p), {pdf: await croixPdf(p, FIOUL)})});
  F = e.fin || {}; const ch94 = (F.anom || {})['eu-inf:ch'] || {}, id94 = (F.ids || {})[FIOUL], cx = String(F.pdf || '').split(', ');
  R.ok(!!id94 && ch94.inst === id94 && ch94.ligne === FIOUL && !(F.anom || {}).dossier && (F.lignes || {})[FIOUL] === '"non" 1' && cx.indexOf('Non') >= 0 && cx.indexOf('Oui') < 0,
    '94 témoin du livrable : ' + dit + ', constat jamais repris, « ' + FIOUL + ' » tapée seule, sans anomalie saisie au dossier : au suivi, l\'anomalie de la chaudière '
    + 'rend « ' + FIOUL + ' » non conforme, au constat et au PDF du constat, croix sous « Non » (v1.7.1 : « oui », croix sous « Oui ») (obtenu '
    + js({ch: ch94, id: id94, lignes: F.lignes, pdf: F.pdf}) + ')');
}

/* 95 à 102 (m147 ; D13 à D15, S1 d et S2 b) : tableau des installations du PDF du constat (page 1), relevé aux appels de la bibliothèque
   PDF : traits de 65 à 544 entre le haut (402) et le bas (620,5) du tableau ; dans chaque bande, le libellé (textes à x 70,8, lignes
   jointes) et sa hauteur ; taille des libellés (la plus grande : celle du tableau) ; textes « Autres : » de la page ; lignes du constat ;
   marque de la présentation notée à la signature (c.fige.mep : « sans gel », « sans marque » ou sa valeur). sansModule : croquis absent,
   le module du croquis retiré le temps de l'impression, comme s'il n'était pas chargé ; pret : l'état vu à l'impression (croquis activé
   dans les Réglages et module chargé, comme vcPret) */
const SIG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const tablePdf = (p, sansModule) => p.evaluate(async sm => {
  const T = window.__VT, v = T.S.visites[0], J0 = window.jspdf.jsPDF, tx = [], ln = [], M = Object.getOwnPropertyDescriptor(window, 'VCroquis');
  const page = d => { try { return d.internal.getCurrentPageInfo().pageNumber; } catch (e){ return 0; } };
  const W = function(){ const d = new J0(...arguments), ot = d.text, ol = d.line;
    d.text = function(t, x, y){ tx.push({t: [].concat(t).join(' '), x, y, sz: d.getFontSize(), pg: page(d)}); return ot.apply(d, arguments); };
    d.line = function(x1, y1, x2, y2){ ln.push({x1, y1, x2, y2, pg: page(d)}); return ol.apply(d, arguments); };
    return d; };
  W.API = J0.API; window.jspdf.jsPDF = W;
  /* module retiré sans passer par le crochet de commun.js (son setter), puis remis tel quel */
  if (sm) Object.defineProperty(window, 'VCroquis', {value: undefined, configurable: true, writable: true});
  const pret = !!(T.S.croq && T.S.croq.actif && window.VCroquis && window.VCroquis.editeur && window.VCroquis.reconcilier);
  try { await T.constatPdfBlob(v); } finally { window.jspdf.jsPDF = J0; if (sm){ if (M) Object.defineProperty(window, 'VCroquis', M); else delete window.VCroquis; } }
  const c = v.constat || {}, lab = tx.filter(r => r.pg === 1 && Math.abs(r.x - 70.8) < 0.01 && r.y > 402 && r.y < 620.5);
  const ys = ln.filter(l => l.pg === 1 && l.x1 === 65 && l.x2 === 544 && l.y1 === l.y2 && l.y1 > 401.99 && l.y1 < 620.51).map(l => l.y1).sort((a, b) => a - b);
  return {rangees: ys.slice(1).map((y, i) => ({t: lab.filter(r => r.y > ys[i] && r.y < y).map(r => r.t).join(' '), h: Math.round((y - ys[i]) * 1000) / 1000})),
    sz: lab.length ? Math.max(...lab.map(r => r.sz)) : null, autres: tx.filter(r => r.pg === 1 && /^Autres :/.test(r.t)).map(r => r.t),
    rows: (c.rows || []).map(r => ({id: r.id, groupe: r.groupe, label: r.label, std: !!r.std})), signe: !!c.signeLe,
    mep: !c.fige ? 'sans gel' : c.fige.mep == null ? 'sans marque' : c.fige.mep, pret};
}, !!sansModule);
/* tableau attendu d'après les lignes du constat. Présentation 2 (v1.7.2) : lignes types puis lignes ajoutées de chaque groupe, sous leur
   libellé, sans ligne vide ; hauteur du formulaire de chaque ligne type (Évier 18, Salle de bain et Cuisine 21,5, les autres 17,5), 17,5
   pour une ligne ajoutée, le tout mis à l'échelle des 218,5 pt. Présentation 1 (v1.7.1) : « Autres : » devant chaque ligne ajoutée,
   lignes vides au bas des groupes (EU : 1, ou 2 sous six lignes types ; EP : 1 ; la première porte « Autres : »), hauteurs du
   formulaire à 12 rangées, sinon égales. Texte : 8 pt au-delà de 14 rangées, sinon 9,5 */
const H_FORM = {evier: 18, sdb: 21.5, cuisine: 21.5};
function tableauAttendu(rows, mep){
  const grp = (g, min) => {
    const std = rows.filter(r => r.groupe === g && r.std), au = rows.filter(r => r.groupe === g && !r.std);
    const out = std.map(r => ({t: r.label, h: H_FORM[r.id] || 17.5})).concat(au.map(r => ({t: (mep === 1 ? 'Autres : ' : '') + r.label, h: 17.5})));
    for (let i = au.length; mep === 1 && i < min; i++) out.push({t: i === 0 ? 'Autres :' : '', h: 17.5});
    return out;
  };
  const L = grp('EU', rows.filter(r => r.groupe === 'EU' && r.std).length >= 6 ? 1 : 2).concat(grp('EP', 1)), n = L.length, s = L.reduce((a, x) => a + x.h, 0);
  const hs = mep === 1 ? (n === 12 ? [17.5, 17.5, 18, 21.5, 21.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5, 17.5] : L.map(() => 218.5 / n)) : L.map(x => x.h * 218.5 / s);
  return {rangees: L.map((x, i) => ({t: x.t, h: hs[i]})), sz: n > 14 ? 8 : 9.5};
}
/* première différence entre le tableau lu et l'attendu (nombre de rangées, libellé, hauteur à 0,01 pt près, taille du texte), ou '' */
function ecartTableau(lu, mep){
  if (!lu || !lu.rangees) return 'tableau non lu';
  const att = tableauAttendu(lu.rows, mep);
  if (lu.rangees.length !== att.rangees.length) return lu.rangees.length + ' rangées au lieu de ' + att.rangees.length + ' : ' + JSON.stringify(lu.rangees.map(r => r.t + ' ' + r.h));
  for (let i = 0; i < att.rangees.length; i++){
    const a = att.rangees[i], l = lu.rangees[i];
    if (l.t !== a.t) return 'rangée ' + (i + 1) + ' « ' + l.t + ' » au lieu de « ' + a.t + ' »';
    if (Math.abs(l.h - a.h) > 0.01) return 'rangée ' + (i + 1) + ' (' + a.t + ') : ' + l.h + ' pt au lieu de ' + a.h.toFixed(3);
  }
  return lu.sz === att.sz ? '' : 'texte en ' + lu.sz + ' pt au lieu de ' + att.sz;
}
/* résumé d'un tableau lu, pour les messages */
const vuTableau = lu => !lu ? 'non lu' : lu.rangees.length + ' rangées (' + lu.rangees.map(r => (r.t || '(vide)') + ' ' + r.h).join(' | ') + '), ' + lu.sz + ' pt, marque '
  + JSON.stringify(lu.mep) + (lu.autres.length ? ', « Autres : » : ' + JSON.stringify(lu.autres) : '');
/* présentation 2 vérifiée : tableau attendu, aucune rangée vide, aucun « Autres : » sinon ceux d'une ligne tapée ainsi (permis) */
const sans2 = (lu, permis) => { const d = ecartTableau(lu, 2); if (d) return d; if (lu.rangees.some(r => !r.t)) return 'rangée vide';
  const au = lu.autres.filter(t => (permis || []).indexOf(t) < 0); return au.length ? '« Autres : » imprimé : ' + JSON.stringify(au) : ''; };
const WC_EV = [['w', 'wc', -3, 0], ['e', 'evier', 3, 0], ['B', 'boite', 0, -4, {res: 'EU'}]], WC_EV_TR = [['Tw', 'w', 'B'], ['Te', 'e', 'B']];
const WC_BI = [['w', 'wc', -3, 0], ['b', 'autre_eu', 3, 0, {nom: 'Bidet'}], ['B', 'boite', 0, -4, {res: 'EU'}]], WC_BI_TR = [['Tw', 'w', 'B'], ['Tb', 'b', 'B']];
const signer = p => p.evaluate(async png => { const T = window.__VT, c = T.S.visites[0].constat; c.sigTech = png; await T.ACTIONS['c-lock'](); await T.flushSaves(); }, SIG);
/* signé en v1.7.1 (simulé) : marque retirée après le geste de signature */
const signerSansMarque = async p => {
  await signer(p);
  await p.evaluate(async () => { const T = window.__VT, c = T.S.visites[0].constat; if (c.fige) delete c.fige.mep; await T.flushSaves(); });
};
/* « Modifier le constat signé ? » confirmé (c-unlock) ; rend le texte de la fenêtre */
const modifierSigne = async p => {
  await p.evaluate(() => { window.__m147 = window.__VT.ACTIONS['c-unlock'](); });
  await p.waitForSelector('#modal-root .modal .m-foot [data-mi="1"]');
  const titre = await p.$eval('#modal-root .modal', x => x.textContent);
  await p.click('#modal-root .modal .m-foot [data-mi="1"]');
  await p.evaluate(async () => { await window.__m147; delete window.__m147; }); await C.pause(p, 400);
  return titre;
};
/* lignes tapées en EU (comme par la feuille « Autre installation EU ») : une installation chacune, raccordée en EU direct */
const taperEU = (p, labs) => p.evaluate(async L => { const T = window.__VT, c = T.S.visites[0].constat;
  L.forEach(l => c.rows.push({id: 'tp' + (c.rows.length + 1), groupe: 'EU', label: l, std: false, nb: '1', raccord: 'EU_D', conforme: '', methodes: []}));
  await T.flushSaves(); }, labs);
async function constatImprime(){
  /* 95 : constat non signé, croquis activé, lignes types seules : dix rangées */
  let e = await constatVu('95', WC_EV, WC_EV_TR, '', false, false, {fin: tablePdf}), F = e.fin;
  let d = sans2(F);
  R.ok(!!F && !F.signe && F.rangees.length === 10 && !d, '95 constat non signé, croquis activé, dix lignes types : dix rangées sous leur libellé, ni « Autres : » ni ligne vide, '
    + 'hauteurs du formulaire × 218,5 / 183,5, texte en 9,5 pt' + (d ? ' (écart : ' + d + ' ; lu : ' + vuTableau(F) + ')' : ''));

  /* 96 : lignes reprises du croquis (Bidet, Chaudière, Drain) et une tapée (Fontaine) : quatorze rangées sous leur seul libellé */
  const objs = [['w', 'wc', -6, 0], ['b', 'autre_eu', -3, 0, {nom: 'Bidet'}], ['ch', 'chaudiere', 0, 0], ['B', 'boite', -3, -5, {res: 'EU'}],
    ['dr', 'drain', 5, 0], ['Bp', 'boite', 5, -5, {res: 'EP'}]];
  const tr = [['Tw', 'w', 'B'], ['Tb', 'b', 'B'], ['Tc', 'ch', 'B'], ['Td', 'dr', 'Bp']];
  e = await constatVu('96', objs, tr, "c.rows.push({id: 'au1', groupe: 'EU', label: 'Fontaine', std: false, nb: '1', raccord: 'EU_D', conforme: '', methodes: []});", false, false,
    {fin: tablePdf}); F = e.fin; d = sans2(F);
  const ajout = F ? F.rows.filter(r => !r.std).map(r => r.groupe + ' ' + r.label).sort().join(' ; ') : '';
  R.ok(ajout === 'EP Drain ; EU Bidet ; EU Chaudière (purge, condensat) ; EU Fontaine' && F.rangees.length === 14 && !d, '96 « Bidet », « Chaudière (purge, condensat) » '
    + 'et « Drain » repris du croquis, « Fontaine » tapée : quatorze rangées, chacune sous son seul libellé, aucune ligne vide, hauteurs du formulaire mises à l\'échelle '
    + '(× 218,5 / 253,5), texte en 9,5 pt (lignes ajoutées : ' + (ajout || 'aucune') + (d ? ' ; écart : ' + d + ' ; lu : ' + vuTableau(F) : '') + ')');

  /* 98 et 101 : signé sans marque (signé en v1.7.1, simulé : marque retirée après le geste de signature), puis « Modifier le constat
     signé ? » et signé de nouveau */
  const fin101 = async p => {
    await signerSansMarque(p);
    const avant = await tablePdf(p);
    const titre = await modifierSigne(p);
    const libre = await tablePdf(p);
    await signer(p); await C.pause(p, 300);
    return {avant, titre, libre, apres: await tablePdf(p)};
  };
  e = await constatVu('98', WC_BI, WC_BI_TR, '', false, false, {fin: fin101}); F = e.fin || {};
  const av = F.avant;
  d = ecartTableau(av, 1);
  R.ok(!!av && av.signe && av.mep === 'sans marque' && !d && av.rangees.some(r => r.t === 'Autres : Bidet') && av.rangees[11] && av.rangees[11].t === 'Autres :',
    '98 témoin : constat signé sans marque (en v1.7.1, simulé) : la présentation de la v1.7.1, « Autres : Bidet », la ligne vide « Autres : » au bas des EP, '
    + 'hauteurs du formulaire à douze rangées, texte en 9,5 pt' + (d ? ' (écart : ' + d + ')' : '') + ' (lu : ' + vuTableau(av) + ')');
  const li = F.libre, ap = F.apres, dl = sans2(li), da = sans2(ap);
  R.ok(/Modifier le constat signé \?/.test(F.titre || '') && !!li && !li.signe && li.mep === 'sans gel' && !dl && !!ap && ap.signe && ap.mep === 2 && !da,
    '101 « Modifier le constat signé ? » confirmé : non signé, la présentation de la v1.7.2 ; signé de nouveau : marque 2, la présentation de la v1.7.2 ('
    + (dl ? 'non signé : ' + dl + ' ; ' : '') + (da ? 'signé de nouveau : ' + da + ' ; ' : '') + 'lu : ' + vuTableau(ap) + ')');

  /* 99 (X2, garde) : signé sans gel (v1.3.0, simulé), le croquis rouvert le gèle (constatGeler) sans marque : présentation de la v1.7.1,
     avant comme après le gel */
  const prep99 = 'c.sigTech = ' + JSON.stringify(SIG) + "; c.signeLe = '2026-11-15T10:00:00.000Z'; delete c.fige;";
  e = await constatVu('99', WC_EV, WC_EV_TR, prep99, true, false, {finAvant: tablePdf, fin: tablePdf}); F = e.fin;
  const F0 = e.avant && e.avant.fin, d0 = ecartTableau(F0, 1);
  d = ecartTableau(F, 1);
  R.ok(!!F0 && F0.mep === 'sans gel' && !d0 && !!F && F.signe && F.mep === 'sans marque' && !d && F.rangees.filter(r => r.t === 'Autres :').length === 2,
    '99 garde : constat signé sans gel (v1.3.0), gelé sans marque à l\'ouverture du croquis : la présentation de la v1.7.1, deux lignes vides « Autres : », avant comme '
    + 'après le gel (' + (d0 ? 'avant le gel : ' + d0 + ' ; ' : '') + (d ? 'après : ' + d + ' ; ' : '') + 'lu : ' + vuTableau(F) + ' ; avant : marque ' + JSON.stringify(F0 && F0.mep) + ')');

  /* 100 : signé par le geste de signature (marque 2), puis croquis désactivé dans les Réglages : la présentation de la v1.7.2 gardée */
  const fin100 = async p => {
    await signer(p);
    const signe = await tablePdf(p);
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); }); await C.pause(p, 500);
    const actif = await p.evaluate(() => !!(window.__VT.S.croq && window.__VT.S.croq.actif));
    return {signe, actif, sans: await tablePdf(p)};
  };
  e = await constatVu('100', WC_BI, WC_BI_TR, '', false, false, {fin: fin100}); F = e.fin || {};
  const ds = sans2(F.signe), dd = sans2(F.sans);
  R.ok(!!F.signe && F.signe.signe && F.signe.mep === 2 && !ds && F.actif === false && !!F.sans && F.sans.mep === 2 && !dd && F.sans.rangees.some(r => r.t === 'Bidet'),
    '100 constat signé par le geste de signature : marque 2, la présentation de la v1.7.2 (« Bidet », aucune ligne vide) ; croquis désactivé ensuite : la même ('
    + (ds ? 'signé : ' + ds + ' ; ' : '') + (dd ? 'croquis désactivé : ' + dd + ' ; ' : '') + 'lu : ' + vuTableau(F.sans) + ', croquis ' + (F.actif ? 'activé' : 'désactivé') + ')');

  /* 102 (M1 de la relecture) : nombre de rangées imprimées et taille du texte. « Bidet » repris du croquis, « Fontaine » tapée : signé
     sans marque, treize rangées à parts égales, texte en 9,5 pt (présentation de la v1.7.1, témoin) ; « Modifier le constat signé ? »,
     deux lignes tapées de plus : quatorze rangées en 9,5 pt, la taille suit les rangées imprimées (la présentation de la v1.7.1 en
     aurait quinze, en 8 pt) ; une de plus : quinze rangées en 8 pt ; signé de nouveau, sans marque : seize rangées à parts égales, en
     8 pt (témoin) */
  const fin102 = async p => {
    await signerSansMarque(p); const s13 = await tablePdf(p);
    await modifierSigne(p); await taperEU(p, ['Abreuvoir', 'Arrosage']); const l14 = await tablePdf(p);
    await taperEU(p, ['Bassin']); const l15 = await tablePdf(p);
    await signerSansMarque(p); await C.pause(p, 300);
    return {s13, l14, l15, s16: await tablePdf(p)};
  };
  e = await constatVu('102', WC_BI, WC_BI_TR, "c.rows.push({id: 'au1', groupe: 'EU', label: 'Fontaine', std: false, nb: '1', raccord: 'EU_D', conforme: '', methodes: []});",
    false, false, {fin: fin102}); F = e.fin || {};
  const egales = lu => !!lu && lu.rangees.every(r => Math.abs(r.h - 218.5 / lu.rangees.length) <= 0.01);
  const s13 = F.s13, d13 = ecartTableau(s13, 1);
  R.ok(!!s13 && s13.signe && s13.mep === 'sans marque' && !d13 && s13.rangees.length === 13 && egales(s13) && s13.sz === 9.5
    && ['Autres : Bidet', 'Autres : Fontaine'].every(t => s13.rangees.some(r => r.t === t)) && s13.rangees[12].t === 'Autres :',
    '102 témoin : constat signé sans marque (en v1.7.1, simulé), deux lignes EU ajoutées : treize rangées à parts égales (218,5 / 13), « Autres : Bidet », '
    + '« Autres : Fontaine », la ligne vide « Autres : » au bas des EP, texte en 9,5 pt' + (d13 ? ' (écart : ' + d13 + ')' : '') + ' (lu : ' + vuTableau(s13) + ')');
  const l14 = F.l14, d14 = sans2(l14), v1 = l14 ? tableauAttendu(l14.rows, 1) : null;
  R.ok(!!l14 && !l14.signe && !d14 && l14.rangees.length === 14 && l14.sz === 9.5 && !!v1 && v1.rangees.length === 15 && v1.sz === 8,
    '102 « Modifier le constat signé ? », quatre lignes EU ajoutées : quatorze rangées sous leur seul libellé, texte en 9,5 pt, d\'après les rangées imprimées '
    + '(la présentation de la v1.7.1 en aurait ' + (v1 ? v1.rangees.length : '?') + ', en ' + (v1 ? v1.sz : '?') + ' pt)' + (d14 ? ' (écart : ' + d14 + ')' : '')
    + ' (lu : ' + vuTableau(l14) + ')');
  const l15 = F.l15, d15 = sans2(l15);
  R.ok(!!l15 && !l15.signe && !d15 && l15.rangees.length === 15 && l15.sz === 8, '102 cinq lignes EU ajoutées : quinze rangées sous leur seul libellé, texte en 8 pt'
    + (d15 ? ' (écart : ' + d15 + ')' : '') + ' (lu : ' + vuTableau(l15) + ')');
  /* seize rangées de 13,66 pt : le libellé de la salle de bain, trop long pour deux lignes de 6,5 pt, est raccourci par « … » (cFit),
     comme en v1.7.1 ; un libellé raccourci compte s'il commence comme l'attendu */
  const s16 = F.s16, a16 = s16 ? tableauAttendu(s16.rows, 1) : null;
  const d16 = !s16 || !a16 ? 'tableau non lu' : s16.rangees.length !== a16.rangees.length ? s16.rangees.length + ' rangées au lieu de ' + a16.rangees.length
    : (a16.rangees.map((a, i) => { const t = s16.rangees[i].t; return t === a.t || (/…$/.test(t) && a.t.indexOf(t.slice(0, -1)) === 0) ? '' : 'rangée ' + (i + 1) + ' « '
      + t + ' » au lieu de « ' + a.t + ' »'; }).filter(Boolean)[0] || '');
  R.ok(!!s16 && s16.signe && s16.mep === 'sans marque' && !d16 && egales(s16) && s16.sz === 8 && a16.sz === 8,
    '102 témoin : signé de nouveau, sans marque : seize rangées à parts égales (218,5 / 16), « Autres : » devant les cinq lignes ajoutées, la ligne vide '
    + '« Autres : » au bas des EP, texte en 8 pt' + (d16 ? ' (écart : ' + d16 + ')' : '') + ' (lu : ' + vuTableau(s16) + ')');
}
/* 97 (S2 b) : croquis désactivé dans les Réglages, constat saisi à la main, « Autres : Fontaine » tapée dans la feuille « Autre
   installation EU » : la présentation de la v1.7.2, la ligne tapée gardée telle quelle (v1.7.1 : « Autres : Autres : Fontaine » et une
   ligne vide « Autres : » en EP) ; puis croquis réactivé, sans croquis commencé : la même ; puis croquis absent (module du croquis
   retiré le temps de l'impression, comme s'il n'était pas chargé : vcPret() faux, comme croquis désactivé) : la même */
async function constatSansCroquis(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); });
    const versConstat = async () => {
      await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
      await p.waitForSelector('[data-act="c-addrow"][data-g="EU"]'); await C.pause(p, 600);
    };
    await versConstat();
    await p.click('[data-act="c-addrow"][data-g="EU"]'); await p.waitForSelector('#m-lab');
    await p.fill('#m-lab', 'Autres : Fontaine'); await p.click('#modal-root .modal .m-foot [data-mi="1"]'); await C.pause(p, 500);
    const actif = () => p.evaluate(() => !!(window.__VT.S.croq && window.__VT.S.croq.actif));
    const a0 = await actif(), F = await tablePdf(p), d = sans2(F, ['Autres : Fontaine']);
    const tapee = F.rows.filter(r => !r.std).map(r => r.groupe + ' ' + r.label).join(' ; ');
    R.ok(a0 === false && F.pret === false && tapee === 'EU Autres : Fontaine' && !d && F.rangees.length === 11 && F.autres.join(' | ') === 'Autres : Fontaine', '97 croquis désactivé, '
      + '« Autres : Fontaine » tapée : onze rangées, la ligne tapée gardée telle quelle, ni autre « Autres : » ni ligne vide, hauteurs du formulaire × 218,5 / 201, texte '
      + 'en 9,5 pt (ligne : ' + (tapee || 'aucune') + (d ? ' ; écart : ' + d : '') + ' ; lu : ' + vuTableau(F) + ')');
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: true}); });
    await versConstat();
    const a1 = await actif(), G = await tablePdf(p), dg = sans2(G, ['Autres : Fontaine']);
    R.ok(a1 === true && G.pret === true && !dg && G.rangees.length === 11 && G.autres.join(' | ') === 'Autres : Fontaine', '97 croquis réactivé, aucun croquis '
      + 'commencé : la même présentation' + (dg ? ' (écart : ' + dg + ' ; lu : ' + vuTableau(G) + ')' : ''));
    /* croquis absent : le module du croquis retiré le temps de l'impression, le réglage « Utiliser le croquis de terrain » coché */
    const H = await tablePdf(p, true), dh = sans2(H, ['Autres : Fontaine']);
    const remis = await p.evaluate(() => !!(window.VCroquis && window.VCroquis.editeur && window.VCroquis.reconcilier));
    R.ok(H.pret === false && remis && !dh && H.rangees.length === 11 && H.autres.join(' | ') === 'Autres : Fontaine', '97 croquis absent (module du croquis retiré '
      + 'le temps de l\'impression, croquis activé dans les Réglages) : la même présentation' + (remis ? '' : ' (module non remis après l\'impression)')
      + (dh ? ' (écart : ' + dh + ' ; lu : ' + vuTableau(H) + ')' : ''));
  } catch (err){ R.ok(false, '97 exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, '97 : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

(async () => {
  try {
    await reglagesAides();
    await reglagesAccroches();
    await conclusionPlan();
    await arbitrage();
    await arbitrageFosse();
    await motLavabo();
    await lavaboPiece();
    await cas('1 NC choisie en EP, dessin changé pendant le retrait puis rétabli', 'relier();', 'true', false, {nature: 'NC', constat: 'non_conformes'});
    await cas('2 réserve choisie en EU, dessin changé pendant le retrait puis rétabli', '', 'false', true, {nature: 'réserve', constat: 'reserves'});
    await lavabo();
    await depuis162();
    await fosseSurLigne();
    await puits();
    await destination();
    await autresDouble();
    await laveMains();
    await autresApparies();
    await autresProches();
    await autresV170();
    await autresRestaures();
    await autresPdf();
    await autresAvantReprise();
    await autresAnomalie();
    await suggestionsAutres();
    await autresParObjet();
    await constatImprime();
    await constatSansCroquis();
  } catch (e){ R.ok(false, 'exception du test : ' + (e && e.stack || e)); }
  R.fin();
})();
