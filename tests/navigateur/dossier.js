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
//     possible (échouent sur be1d749), comme « Lavabo » (témoin) ; « Chaudière (purge, condensat) » ne l'est pas (témoin).
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
   constat affiché de nouveau. Rend les lignes actives du constat, les écarts affichés, le texte du bloc du croquis et l'installation de a. */
async function constatVu(nom, objs, traces, prep, apres){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p); await C.ouvrirCroquis(p, {fond: false});
    const v0 = await C.vue(p), els = objs.map(([id, t, x, y, q]) => C.P(id, t, v0.cx + x, v0.cy + y, q)), I = C.index(els);
    traces.forEach(([id, a, b]) => els.push(C.L(id, 'tr', [a, b], I)));
    await C.injecter(p, {el: els});
    await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
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
          precos: Object.keys(E.precos).filter(k => E.precos[k]).join(','), preco: a ? a.preconisation : null, nc: a ? T.anomNC(a) : null}; });
    };
    let e = await etat();
    if (apres){ await p.evaluate(() => { location.hash = '#/e/' + window.__VT.S.visites[0].etudeId + '/v/' + window.__VT.S.visites[0].id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
      await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 500); await C.fermerCroquis(p); await C.pause(p, 600);
      e = {avant: e, apres: await etat()}; }
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
}
/* ligne « Autres » saisie à la main pour un appareil que le croquis compte déjà (un lavabo dessiné, sur la ligne « Évier ») : le constat le
   compterait deux fois, un écart le rappelle. Le libellé au pluriel ou précisé (« Lavabos », « Lavabo de la salle d'eau ») passait inaperçu
   (échoue sur be1d749) ; « Lavabo » tel quel était déjà rappelé (témoin) ; une autre installation n'est pas rappelée (témoin) */
async function autresDouble(){
  const objs = [['la', 'lavabo', 0, 0], ['B', 'boite', 0, -4, {res: 'EU'}]], tr = [['Bl', 'la', 'B']];
  const dbl = x => x.ecarts.filter(t => /figure aussi au constat, en « Autres »/.test(t));
  for (const [n, lab, att] of [['9', 'Lavabos', 1], ['10', 'Lavabo de la salle d\'eau', 1], ['11', 'Lavabo', 1], ['12', 'Chaudière (purge, condensat)', 0]]){
    const e = await constatVu(n, objs, tr, "c.rows.push({id: 'au1', groupe: 'EU', label: " + JSON.stringify(lab) + ", std: false, nb: '1', raccord: '', conforme: '', methodes: []});");
    R.ok(dbl(e).length === att && (!att || new RegExp('« ' + lab.replace(/[()]/g, '\\$&') + ' » \\(1\\)').test(dbl(e)[0])), n + ' « Autres : ' + lab + ' » saisi à la main, lavabo dessiné : '
      + (dbl(e)[0] || 'aucun double compte rappelé') + (att ? '' : ' (témoin)'));
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
    await autresDouble();
  } catch (e){ R.ok(false, 'exception du test : ' + (e && e.stack || e)); }
  R.fin();
})();
