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
        return {rows: (v.constat.rows || []).filter(x => String(x.nb || '').trim()).map(x => x.id + ' ×' + x.nb + ' ' + (x.raccord || '-')).join(', '),
          ecarts: [...document.querySelectorAll('#croq-ecarts li')].map(x => x.textContent), bloc: b ? b.textContent : '', inst: a ? a.installation : null}; });
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

(async () => {
  try {
    await cas('1 NC choisie en EP, dessin changé pendant le retrait puis rétabli', 'relier();', 'true', false, {nature: 'NC', constat: 'non_conformes'});
    await cas('2 réserve choisie en EU, dessin changé pendant le retrait puis rétabli', '', 'false', true, {nature: 'réserve', constat: 'reserves'});
    await lavabo();
    await depuis162();
    await fosseSurLigne();
    await autresDouble();
  } catch (e){ R.ok(false, 'exception du test : ' + (e && e.stack || e)); }
  R.fin();
})();
