// Outils communs des tests dans le navigateur (Chromium, par Playwright) : petit serveur local, application ouverte dans un profil neuf,
// étude et dossier fictifs, croquis sur le fond fictif de VCroquis.demoDxf(), gestes sur le plan. Aucune donnée réelle.
// Dossier de l'application : la racine du dépôt ; une autre version par --app=<dossier> ou la variable VEDE_APP.
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
let chromium;
try { ({chromium} = require('playwright')); }
catch (e){ console.log('Playwright est introuvable : installez-le (npm install playwright, puis npx playwright install chromium).'); process.exit(2); }

const RACINE = path.resolve(__dirname, '..', '..');
function dossierApp(){ const a = process.argv.find(x => /^--app=/.test(x)); return path.resolve(a ? a.slice(6) : process.env.VEDE_APP || RACINE); }
const TYPES = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.svg': 'image/svg+xml'};

/* Serveur des fichiers de l'application, sur un port libre de la machine (127.0.0.1 seulement). */
function serveur(dir){
  dir = dir || dossierApp();
  return new Promise(ok => {
    const s = http.createServer((q, r) => {
      let u; try { u = decodeURIComponent(new URL(q.url, 'http://local').pathname); } catch (e){ r.writeHead(400); r.end(); return; }
      const f = path.join(dir, u.endsWith('/') ? u + 'index.html' : u);
      if (!f.startsWith(dir + path.sep) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ r.writeHead(404); r.end(); return; }
      r.writeHead(200, {'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store'}); fs.createReadStream(f).pipe(r);
    });
    s.listen(0, '127.0.0.1', () => ok({url: 'http://127.0.0.1:' + s.address().port + '/', fermer: () => new Promise(f => s.close(f))}));
  });
}

/* Avant les scripts de la page : garde l'éditeur du croquis créé par l'application (window.__vcEd) et les fichiers qu'elle enregistre
   (window.__fichiers : nom, taille, début du contenu), sans rien changer à l'application. */
function crochets(){
  window.__fichiers = [];
  window.__VT_SAVE = async function(blob, nom){
    const b = new Uint8Array(await blob.arrayBuffer());
    window.__fichiers.push({nom, taille: b.length, debut: String.fromCharCode.apply(null, Array.from(b.slice(0, 8)))}); return true;
  };
  let vc;
  Object.defineProperty(window, 'VCroquis', {configurable: true, get(){ return vc; }, set(v){
    vc = v; let ed;
    Object.defineProperty(v, 'editeur', {configurable: true, enumerable: true, get(){ return ed; }, set(f){
      ed = function(){ const r = f.apply(this, arguments); window.__vcEd = r; return r; };
    }});
  }});
}

/* Application ouverte dans un profil neuf (tablette paysage, tactile). o.viewport : taille de la fenêtre (1280 × 800 par défaut) ;
   o.sw : service worker permis. Les exceptions de la page et les erreurs de la console sont gardées dans « erreurs ». */
async function ouvrir(o){
  o = o || {};
  const srv = await serveur(), nav = await chromium.launch(), ctx = await nav.newContext({viewport: o.viewport || {width: 1280, height: 800}, hasTouch: true, locale: 'fr-FR', serviceWorkers: o.sw ? 'allow' : 'block'});
  await ctx.addInitScript(crochets);
  const p = await ctx.newPage(), erreurs = [];
  p.on('pageerror', e => erreurs.push('exception : ' + e.message));
  p.on('console', m => { if (m.type() === 'error') erreurs.push('console : ' + m.text()); });
  await p.goto(srv.url + 'index.html');
  await p.waitForSelector('[data-act="etude-new"]');
  return {p, ctx, url: srv.url, erreurs, fermer: async () => { await nav.close(); await srv.fermer(); }};
}

const pause = (p, ms) => p.waitForTimeout(ms);

/* Étude « Étude fictive » et dossier n° 1, « 12 rue Fictive », « 99000 Ville-Exemple » ; rend la page sur le dossier. */
async function etudeEtDossier(p){
  await p.click('[data-act="etude-new"]');
  await p.fill('#m-nom', 'Étude fictive'); await p.click('#modal-root button.primary');
  await p.waitForSelector('#m-adr');
  await p.fill('#m-adr', '12 rue Fictive'); await p.fill('#m-com', '99000 Ville-Exemple');
  await p.click('#modal-root button.primary');
  await p.waitForSelector('[data-act="vc-ouvrir"]');
}

/* Croquis du dossier ouvert, sur le fond fictif (o.fond !== false) ou sans fond. */
async function ouvrirCroquis(p, o){
  o = o || {};
  await p.click('[data-act="vc-ouvrir"]');
  if (o.dejaCommence) { await p.waitForFunction(() => window.__vcEd && window.__vcEd.doc()); await pause(p, 300); return; }
  await p.waitForSelector('#modal-root input[data-m="dxf"]', {state: 'attached'});
  if (o.fond === false) await p.click('#modal-root button[data-m="sans"]');
  else {
    const dxf = await p.evaluate(() => window.VCroquis.demoDxf());
    await p.setInputFiles('#modal-root input[data-m="dxf"]', {name: 'plan-fictif.dxf', mimeType: 'application/octet-stream', buffer: Buffer.from(dxf, 'utf8')});
  }
  await p.waitForFunction(() => window.__vcEd && window.__vcEd.doc());
  await pause(p, 400);
}

/* Point du plan (mètres, repère du croquis) vers la page ; et l'inverse. */
async function versPage(p, x, y){
  return p.evaluate(([x, y]) => { const S = window.__vcEd.etat, cv = document.querySelector('.vc .vc-cv'), r = cv.getBoundingClientRect(), e = S.vue.ecran(x, y); return {x: r.left + e.x, y: r.top + e.y}; }, [x, y]);
}
/* Toucher (doigt) au point du plan (x, y), puis une pause pour ne pas faire un double toucher. */
async function toucher(p, x, y, ms){
  const q = await versPage(p, x, y); await toucherPage(p, q, ms);
}
/* Toucher à un point de la page, qui doit tomber sur le plan (pas sur une barre ou un bouton de l'éditeur). */
async function toucherPage(p, q, ms){
  const sur = await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e && e.classList.contains('vc-cv') ? '' : (e ? e.tagName + '.' + e.className : 'rien'); }, [q.x, q.y]);
  if (sur) throw new Error('le toucher en ' + Math.round(q.x) + ', ' + Math.round(q.y) + ' tombe sur ' + sur + ', pas sur le plan');
  await p.touchscreen.tap(q.x, q.y); await pause(p, ms == null ? 450 : ms);
}
const outil = (p, o) => p.evaluate(o => window.__vcEd.choisirOutil(o), o);
const docCroquis = p => p.evaluate(() => JSON.parse(JSON.stringify(window.__vcEd.doc())));
/* Rayon dessiné du symbole d'un type d'objet, en pixels, à l'échelle actuelle (comme l'éditeur) ; zoom avant jusqu'à une condition. */
const rayonPx = (p, t) => p.evaluate(t => { const S = window.__vcEd.etat, E = S.doc.echelle > 0 ? S.doc.echelle : window.VCroquis.echelleAuto(S.doc, 'edl'), RS = window.VCroquis.rayonSymbole(t);
  return RS * Math.max(S.vue.s * E / 1000, (t === 'jonction' ? 4 : 8.5) / RS); }, t);
async function zoomerJusqua(p, cond){
  for (let k = 0; k < 14 && !(await cond()); k++){ await p.click('.vc [data-a="zoomp"]'); await pause(p, 150); }
  return cond();
}
/* Centre de la vue (repère du croquis) et échelle en pixels par mètre. */
const vue = p => p.evaluate(() => { const v = window.__vcEd.etat.vue; return {cx: v.cx, cy: v.cy, s: v.s, rot: v.rot || 0, w: v.w, h: v.h}; });
/* Fermeture de l'éditeur par son bouton « Retour » ; attend l'enregistrement et la mise à jour du dossier. */
async function fermerCroquis(p){
  await p.click('.vc [data-a="retour"]');
  await p.waitForFunction(() => !document.querySelector('#modal-root .vc'), null, {timeout: 10000});
  await pause(p, 600);
}

/* Dessin fictif injecté dans l'éditeur (coordonnées du croquis), historique vidé, puis analyse et mise à jour du dossier comme après un geste.
   spec : {el, anomManu, mode ('edl' | 'avp'), echelle}. Éléments : P (objet), J (raccord posé d'office), L (tracé ; sommets : id d'objet ou
   [x, y]), index (objets par id, pour les positions des sommets). */
async function injecter(p, spec){
  await p.evaluate(spec => {
    const ed = window.__vcEd, S = ed.etat;
    S.doc.el = spec.el; S.doc.anomManu = spec.anomManu || []; S.doc.decisions = {}; S.doc.ordre = [];
    if (spec.echelle != null) S.doc.echelle = spec.echelle;
    S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.dernierePose = null; S.dernierTap = null; S.finAuto = null; S.gardeFiche = null;
    if (spec.mode) S.mode = spec.mode;
    ed.synchroniser();
  }, spec);
}
const P = (id, t, x, y, p) => ({id, k: 'pt', t, x, y, p: Object.assign({st: 'existant', obs: ''}, /^(wc|evier|douche|lavabo|descente)$/.test(t) ? {meth: ['eau'], niv: ''} : {}, p || {}), lab: {off: true}});
const J = (id, x, y) => ({id, k: 'pt', t: 'jonction', x, y, p: {st: 'existant', obs: ''}, lab: {off: true}, auto: true});
function L(id, t, v, objs, p){
  return {id, k: 'ln', t, v: v.map(q => typeof q === 'string' ? {x: objs[q].x, y: objs[q].y, a: q} : {x: q[0], y: q[1], a: null}),
    p: Object.assign(t === 'col' ? {res: 'EU', gest: 'D', diam: '', st: 'existant'} : {res: '', st: 'existant', diam: '', mat: '', pose: '', long: '', sens: 0, obs: ''}, p || {}), lab: {off: true}};
}
const index = els => { const o = {}; els.forEach(e => { o[e.id] = e; }); return o; };
/* Vue centrée sur (cx, cy), à s pixels par mètre. */
async function regler(p, cx, cy, s){
  await p.evaluate(([cx, cy, s]) => { const S = window.__vcEd.etat; S.vue.cx = cx; S.vue.cy = cy; if (s) S.vue.s = s; window.__vcEd.redessiner(); }, [cx, cy, s]);
  await pause(p, 120);
}
/* Point du croquis vers le canevas (pixels) ; toucher à un point du canevas. */
const ecranCv = (p, x, y) => p.evaluate(([x, y]) => window.__vcEd.etat.vue.ecran(x, y), [x, y]);
async function toucherCv(p, q, ms){
  const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-cv').getBoundingClientRect(); return {l: b.left, t: b.top}; });
  await toucherPage(p, {x: r.l + q.x, y: r.t + q.y}, ms);
}
/* Point du canevas à d px du point A le long de B (u), décalé de e px sur le côté opposé à C (n) : « à côté de A, sur le tuyau AB ». */
async function aCote(p, A, B, C, d, e){
  const a = await ecranCv(p, A.x, A.y), b = await ecranCv(p, B.x, B.y), c = await ecranCv(p, C.x, C.y), Lg = Math.hypot(b.x - a.x, b.y - a.y), u = {x: (b.x - a.x) / Lg, y: (b.y - a.y) / Lg};
  let n = {x: -u.y, y: u.x}; if (n.x * (c.x - a.x) + n.y * (c.y - a.y) > 0) n = {x: u.y, y: -u.x};
  return {x: a.x + d * u.x + e * n.x, y: a.y + d * u.y + e * n.y};
}
/* Analyse d'un plan du croquis ouvert : état de chaque source (par type), contrôles « manque ». */
const analyseCroquis = (p, mode) => p.evaluate(mode => {
  const S = window.__vcEd.etat, an = window.VCroquis.analyser(JSON.parse(JSON.stringify(S.doc)), mode), o = {};
  Object.keys(an.resObj).forEach(id => { const r = an.resObj[id], e = S.doc.el.find(x => x.id === id); o[e.t] = r.etat + (r.res ? ' ' + r.res : '') + (r.presume ? ' (présumé)' : ''); });
  return {o, manque: an.controles.filter(c => c.niveau === 'manque' && !/méthode|tampon/.test(c.txt)).map(c => c.txt)};
}, mode);
/* Anomalies du dossier ouvert dans l'application. */
const dossierAnomalies = p => p.evaluate(() => { const T = window.__VT, v = T.VC.ctx.v; return T.S.anoms.filter(a => a.visiteId === v.id).map(a => ({obs: a.observation, reseau: a.reseau, nc: a.nc, nature: T.anomNC(a) ? 'NC' : 'réserve', cle: a.croquis && a.croquis.cle})); });

/* Compte des résultats ; code de sortie 1 en cas d'échec. */
function rapport(nom){
  let nok = 0, nt = 0;
  return {
    ok(bon, texte){ nt++; if (bon) nok++; if (!bon || process.argv.indexOf('-v') >= 0) console.log((bon ? 'OK  ' : 'KO  ') + texte); return bon; },
    info(t){ console.log('    ' + t); },
    fin(){ console.log(nom + ' : ' + nok + '/' + nt + (nok === nt && nt ? '' : '  ÉCHEC')); if (nok !== nt || !nt) process.exitCode = 1; },
  };
}

module.exports = {RACINE, dossierApp, serveur, ouvrir, pause, etudeEtDossier, ouvrirCroquis, versPage, toucher, toucherPage, outil, docCroquis, vue, rayonPx, zoomerJusqua, fermerCroquis, rapport,
  injecter, P, J, L, index, regler, ecranCv, toucherCv, aCote, analyseCroquis, dossierAnomalies};
