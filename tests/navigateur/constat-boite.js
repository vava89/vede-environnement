// Constat : « Reprendre du croquis » reprend la boîte de branchement en limite (souhait 10 ; réponse 10.4 et décision D6 de
// .claude/conception-outils-dessin.md ; m105), dans l'application (Chromium, données fictives : 12 rue Fictive, Ville-Exemple). Par réseau,
// d'après la seule boîte existante du réseau : la distance à la limite, côté compris (« 0,80 m intérieur », « en limite »…), et la profondeur.
// 1 : « Reprendre du croquis » (bouton du constat) écrit « 0,80 m intérieur » et « 0,80 m » en EU, « en limite » et « 1,10 m » en EP, dans les
//     champs de la section Boîte de branchement ; la provenance est gardée (c.croqAuto.boite) ; avant, la boîte manquante était rappelée.
// 2 : valeur tapée par le technicien en EU (« 1,00 m intérieur ») ; le croquis change (1,20 m, profondeur 0,90 m) : à la fermeture du croquis,
//     la profondeur suit le croquis, la distance tapée reste ; l'écart est rappelé ; une nouvelle reprise la garde aussi.
// 3 : constat repris avant m105 (provenance sans la boîte) : la fermeture du croquis et l'ouverture du constat ne touchent pas la boîte ;
//     « Reprendre du croquis » la remplit.
// 4 : deux boîtes EU : rien n'est repris en EU (la valeur venue du croquis est vidée, comme une ligne que le croquis ne montre plus) ; la
//     boîte EP l'est ; le constat rappelle que la distance et la profondeur EU ne sont pas reprises (deux boîtes existantes).
// 5 : visite non effectuée : rien n'est repris (fermeture du croquis, « Reprendre du croquis »).
// 6 : croquis désactivé (Réglages) : ni bouton ni reprise, la boîte reste telle quelle ; témoin : réactivé, le suivi la met à jour.
// 7 : croquis d'un autre plan : les valeurs reprises de l'ancien plan restent, comme saisies par le technicien ; l'écart est rappelé.
// 8 : constat signé, boîte reprise du croquis avant la signature (champs vidés) : le croquis change, rien ne change au constat (fermeture
//     du croquis, ouverture du constat, « Reprendre du croquis »).
// 9 : sauvegarde altérée (clés inconnues dans la provenance c.croqAuto, provenance de la boîte invalide) : nettoyée à la restauration, les
//     clés connues gardées.
// 10 (entre 7 et 8) : écarts de la boîte comparés sans tenir compte de l'écriture (vcBoiteCle : « 0,8 m int » vaut « 0,80 m intérieur »,
//     « en limite de propriété » vaut « en limite », « 110 cm » vaut « 1,10 m ») : aucun écart pour des valeurs équivalentes, un écart pour
//     une autre valeur (« 0,90 » face à « 0,70 m »).
// 11 : « Reprendre du croquis » sans rien à reprendre : la provenance de la boîte est enregistrée, sans changer la date du dossier ; après un
//     rechargement de la page, le suivi met la boîte à jour ; témoin : sans constat enregistré, une telle reprise n'en enregistre aucun.
// Échouent sur ddb0b74 (VCroquis.boitesConstat absente : boîte jamais rappelée, champs vides après « Reprendre du croquis » ; clés inconnues
// gardées à la restauration), sauf les témoins : 1 avant la reprise et sans écart après, 3 suivi sans provenance de la boîte, 9 sauvegarde
// restaurée, lignes, plan et puisard gardés, provenance sans la boîte, 10 aucun écart pour des valeurs équivalentes (aucun écart de la boîte
// avant m105), 11 aucun constat enregistré, aucune erreur dans la console.
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
/* croquis du dossier : dessin injecté, enregistré, croquis fermé (le suivi du constat s'y fait) */
async function croquis(p, de, premier){
  if (premier) await C.ouvrirCroquis(p, {fond: false});
  else { await dossier(p); await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400); }
  const v0 = await C.vue(p), els = de[0].map(([id, t, x, y, q]) => C.P(id, t, v0.cx + x, v0.cy + y, q)), I = C.index(els);
  de[1].forEach(([id, a, b]) => els.push(C.L(id, 'tr', [a, b], I)));
  await C.injecter(p, {el: els});
  await p.evaluate(() => { const S = window.__vcEd.etat; S.doc.rev = (S.doc.rev || 0) + 1; window.__vcEd.enregistrer(); }); await C.pause(p, 500);
  await C.fermerCroquis(p); await C.pause(p, 600);
}
/* champs de la boîte à l'écran et dans le constat, provenance, bouton « Reprendre du croquis », écarts affichés */
const lire = p => p.evaluate(CHAMPS => {
  const T = window.__VT, v = T.S.visites[0], c = v.constat || {}, B = c.boite || {}, P = c.croqAuto;
  const ecran = {}, champs = {}, b = document.querySelector('[data-act="c-croq-fill"]');
  CHAMPS.forEach(k => { const i = document.querySelector('[data-cf="boite.' + k + '"]'); ecran[k] = i ? i.value : null; champs[k] = B[k] == null ? '' : B[k]; });
  return {ecran, champs, prov: P && typeof P === 'object' && 'boite' in P ? JSON.stringify(P.boite) : 'absente', bouton: b ? (b.disabled ? 'grisé' : 'actif') : 'absent',
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

async function parcours(){
  const A = await C.ouvrir(), p = A.p;
  try {
    await C.etudeEtDossier(p);
    await croquis(p, dessin(), true);
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });

    /* 1 : première reprise */
    let e = await constat(p);
    R.ok(pareil(e.ecran, ['', '', '', '']) && e.prov === 'absente' && e.bouton === 'actif', '1 témoin, avant la reprise : boîte vide, aucune provenance (' + texte(e.ecran) + ', ' + e.prov + ', bouton ' + e.bouton + ')');
    R.ok(ecartBoite(e).some(t => /^Boîte de branchement EU : distance à la limite « 0,80 m intérieur » sur le croquis de terrain, non renseignée au constat/.test(t)),
      '1 avant la reprise, la boîte du croquis est rappelée : ' + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte'));
    e = await reprendre(p);
    const A1 = ['0,80 m intérieur', '0,80 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A1) && pareil(e.champs, A1), '1 « Reprendre du croquis » : section Boîte de branchement remplie (' + texte(e.ecran) + ')');
    R.ok(e.prov === JSON.stringify({distEU: A1[0], distEP: A1[2], profEU: A1[1], profEP: A1[3]}) || pareil(JSON.parse(e.prov === 'absente' ? '{}' : e.prov), A1),
      '1 provenance gardée (c.croqAuto.boite : ' + e.prov + ')');
    R.ok(!ecartBoite(e).length, '1 après la reprise, aucun écart de la boîte' + (ecartBoite(e).length ? ' : ' + ecartBoite(e).join(' | ') : ''));

    /* 2 : valeur tapée par le technicien, puis le croquis change */
    await p.fill('[data-cf="boite.distEU"]', '1,00 m intérieur'); await C.pause(p, 300);
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    await croquis(p, dessin({res: 'EU', prof: '0,90', limCote: 'int', limDist: '1,20'}));
    e = await constat(p);
    const A2 = ['1,00 m intérieur', '0,90 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A2), '2 croquis changé (1,20 m, profondeur 0,90 m) : la profondeur suit, la distance tapée reste (' + texte(e.ecran) + ')');
    R.ok(ecartBoite(e).some(t => t === 'Boîte de branchement EU : distance à la limite « 1,20 m intérieur » sur le croquis de terrain, « 1,00 m intérieur » au constat.'),
      '2 écart rappelé : ' + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte'));
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A2) && pareil(e.champs, A2), '2 nouvelle reprise : la valeur tapée reste (' + texte(e.ecran) + ')');

    /* 3 : constat repris avant m105 : provenance sans la boîte, champs vides */
    await p.evaluate(async () => { const T = window.__VT, c = T.S.visites[0].constat; delete c.croqAuto.boite; c.boite = {}; await T.flushSaves(); });
    await croquis(p, dessin());
    e = await constat(p);
    R.ok(pareil(e.ecran, ['', '', '', '']) && e.prov === 'absente', '3 provenance sans la boîte : fermeture du croquis et ouverture du constat n\'y touchent pas ('
      + texte(e.ecran) + ', ' + e.prov + ')');
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A1), '3 « Reprendre du croquis » remplit la boîte (' + texte(e.ecran) + ', provenance ' + e.prov + ')');

    /* 4 : deux boîtes EU */
    await croquis(p, dessin(null, {res: 'EP', prof: '1,30', limCote: 'int', limDist: '0,50'}, [[['w2', 'wc', -6, 6], ['B2', 'boite', -6, 0, {res: 'EU', prof: '0,60', limCote: 'ext', limDist: '1,00'}]], [['t3', 'w2', 'B2']]]));
    e = await constat(p);
    const A4 = ['', '', '0,50 m intérieur', '1,30 m'];
    R.ok(pareil(e.ecran, A4), '4 deux boîtes EU : rien de repris en EU, la boîte EP l\'est (' + texte(e.ecran) + ')');
    e = await reprendre(p);
    R.ok(pareil(e.ecran, A4), '4 « Reprendre du croquis » : rien en EU (' + texte(e.ecran) + ')');
    const rappel4 = 'Boîte de branchement EU : 2 boîtes existantes (EU ou unitaires) sur le croquis de terrain ; distance à la limite et profondeur non reprises, à saisir au constat.';
    R.ok(ecartBoite(e).length === 1 && ecartBoite(e)[0] === rappel4, '4 seul écart de la boîte : le rappel des deux boîtes EU (' + (ecartBoite(e).join(' | ') || 'aucun écart de la boîte') + ')');

    /* 5 : visite non effectuée */
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'absent'; await T.flushSaves(); });
    await croquis(p, dessin());
    e = await constat(p);
    let r = await reprendreSansBouton(p);
    R.ok(pareil(e.ecran, A4) && pareil(r.e.champs, A4) && r.n === 0 && r.e.bouton === 'absent', '5 visite non effectuée : rien n\'est repris (' + texte(r.e.champs) + ', reprise : ' + r.n + ', bouton ' + r.e.bouton + ')');
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].statut = 'visitee'; await T.flushSaves(); });

    /* 6 : croquis désactivé dans les Réglages */
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: false}); });
    e = await constat(p);
    r = await reprendreSansBouton(p);
    R.ok(pareil(e.ecran, A4) && e.bouton === 'absent' && pareil(r.e.champs, A4) && r.n === 0, '6 croquis désactivé : ni bouton ni reprise, la boîte reste ('
      + texte(r.e.champs) + ', bouton ' + e.bouton + ', reprise : ' + r.n + ')');
    await p.evaluate(async () => { await window.__VT.ACTIONS['vc-actif']({checked: true}); });
    e = await constat(p);
    R.ok(pareil(e.ecran, A1), '6 témoin, croquis réactivé : le suivi met la boîte à jour (' + texte(e.ecran) + ')');

    /* 7 : croquis d'un autre plan (supprimé puis recommencé) */
    await p.evaluate(async () => { const T = window.__VT; T.S.visites[0].constat.croqAuto.plan = 'plan-fictif-ancien'; await T.flushSaves(); });
    await croquis(p, dessin({res: 'EU', prof: '0,70', limCote: 'int', limDist: '1,50'}));
    e = await constat(p);
    R.ok(pareil(e.ecran, A1) && e.prov === '{}', '7 autre plan : les valeurs de l\'ancien plan restent, comme saisies (' + texte(e.ecran) + ', provenance ' + e.prov + ')');
    R.ok(ecartBoite(e).some(t => /^Boîte de branchement EU : distance à la limite « 1,50 m intérieur » sur le croquis de terrain, « 0,80 m intérieur » au constat\.$/.test(t))
      && ecartBoite(e).some(t => /^Boîte de branchement EU : profondeur « 0,70 m » sur le croquis de terrain, « 0,80 m » au constat\.$/.test(t)), '7 écarts rappelés : ' + (ecartBoite(e).join(' | ') || 'aucun'));

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

    /* 8 : constat signé ; avant la signature, les champs vidés sont repris du croquis : ces valeurs posées suivraient le croquis sans la
       signature (les valeurs tapées au cas 10 ne le suivent pas, elles ne mesurent rien ici) */
    for (const k of CHAMPS){ await p.fill('[data-cf="boite.' + k + '"]', ''); await C.pause(p, 200); }
    await p.evaluate(async () => { await window.__VT.flushSaves(); });
    e = await reprendre(p);
    const A8 = ['1,50 m intérieur', '0,70 m', 'en limite', '1,10 m'];
    R.ok(pareil(e.ecran, A8) && pareil(e.champs, A8), '8 avant la signature : champs vidés, puis repris du croquis (' + texte(e.ecran) + ')');
    await p.evaluate(async () => { const T = window.__VT, c = T.S.visites[0].constat; c.signeLe = new Date().toISOString(); await T.flushSaves(); });
    const avant = await p.evaluate(() => JSON.stringify(window.__VT.S.visites[0].constat.croqAuto));
    await croquis(p, dessin({res: 'EU', prof: '0,95', limCote: 'ext', limDist: '0,40'}, {res: 'EP', prof: '1,40', limCote: 'int', limDist: '0,20'}));
    e = await constat(p);
    r = await reprendreSansBouton(p);
    const apres = await p.evaluate(() => JSON.stringify(window.__VT.S.visites[0].constat.croqAuto));
    R.ok(pareil(e.ecran, A8) && pareil(r.e.champs, A8) && r.n === 0 && e.bouton === 'grisé' && avant === apres && !e.ecarts.length,
      '8 constat signé : inchangé (' + texte(r.e.champs) + ', bouton ' + e.bouton + ', reprise : ' + r.n + ', provenance ' + (avant === apres ? 'inchangée' : 'changée') + ', écarts : ' + e.ecarts.length + ')');
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
      const vs = [visite(1, {rows: {evier: {nb: '1'}, bad: 3}, refus: {}, crees: {}, plan: 'plan-fictif', puisard: true,
          boite: {distEU: '0,80 m intérieur', profEU: 5, autre: 'texte'}, inconnue: {a: 1}, autreCle: 'texte'}),
        visite(2, {rows: {}, boite: ['0,80 m intérieur'], zz: 1}), visite(3, {boite: 'texte'}), visite(4, {rows: {}, plan: 'plan-fictif'})];
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
    R.ok(cles(P1) === 'boite, crees, plan, puisard, refus, rows', '9 clés inconnues de la provenance retirées, clés connues gardées : ' + cles(P1));
    R.ok(JSON.stringify(P1.rows) === '{"evier":{"nb":"1"}}' && P1.plan === 'plan-fictif' && P1.puisard === true, '9 lignes, plan et puisard gardés : ' + JSON.stringify([P1.rows, P1.plan, P1.puisard]));
    R.ok(JSON.stringify(P1.boite) === '{"distEU":"0,80 m intérieur"}', '9 provenance de la boîte : seuls les champs connus, en texte (' + JSON.stringify(P1.boite) + ')');
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
    R.ok(pareil(e.ecran, ['0,80 m intérieur', '0,80 m', 'en limite', '1,10 m']), '11 après un rechargement, le suivi met la boîte à jour (' + texte(e.ecran) + ', provenance ' + e.prov + ')');
  } catch (err){ R.ok(false, 'exception du test : ' + (err && err.stack || err)); }
  finally { R.ok(!A.erreurs.length, 'enregistrement : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ') : '')); await A.fermer(); }
}

(async () => {
  await parcours();
  await restauration();
  await enregistrement();
  R.fin();
})();
