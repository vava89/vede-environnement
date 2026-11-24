// Outils communs des tests dans le navigateur (Chromium, par Playwright) : petit serveur local, application ouverte dans un profil neuf,
// étude et dossier fictifs, croquis sur le fond fictif de VCroquis.demoDxf(), gestes sur le plan (doigt, souris, stylet). Aucune donnée réelle.
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
   o.sw : service worker permis ; o.fuseau : fuseau horaire de la page (m158 : 'Europe/Paris' pour un relevé reproductible ; sinon celui
   de la machine). Les exceptions de la page et les erreurs de la console sont gardées dans « erreurs ». */
async function ouvrir(o){
  o = o || {};
  const opt = {viewport: o.viewport || {width: 1280, height: 800}, hasTouch: true, locale: 'fr-FR', serviceWorkers: o.sw ? 'allow' : 'block'};
  if (o.fuseau) opt.timezoneId = o.fuseau;
  const srv = await serveur(), nav = await chromium.launch(), ctx = await nav.newContext(opt);
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
/* Le point de la page doit tomber sur le plan (pas sur une barre ou un bouton de l'éditeur) ; quoi : le geste, pour le message. */
async function surLePlan(p, q, quoi){
  const sur = await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e && e.classList.contains('vc-cv') ? '' : (e ? e.tagName + '.' + e.className : 'rien'); }, [q.x, q.y]);
  if (sur) throw new Error(quoi + ' en ' + Math.round(q.x) + ', ' + Math.round(q.y) + ' tombe sur ' + sur + ', pas sur le plan');
}
/* Toucher à un point de la page, qui doit tomber sur le plan. */
async function toucherPage(p, q, ms){
  await surLePlan(p, q, 'le toucher');
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
/* Point du croquis vers le canevas (pixels) ; point du canevas vers la page ; toucher à un point du canevas. */
const ecranCv = (p, x, y) => p.evaluate(([x, y]) => window.__vcEd.etat.vue.ecran(x, y), [x, y]);
async function pageCv(p, q){
  const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-cv').getBoundingClientRect(); return {l: b.left, t: b.top}; });
  return {x: r.l + q.x, y: r.t + q.y};
}
async function toucherCv(p, q, ms){
  await toucherPage(p, await pageCv(p, q), ms);
}

/* Souris (pointerType 'mouse'), aux points du canevas (pixels), qui doivent tomber sur le plan. Clic d'un bouton ('left', 'right' ou
   'middle'), puis une pause pour ne pas faire un double clic. */
async function cliquerCv(p, q, bouton, ms){
  const a = await pageCv(p, q); await surLePlan(p, a, 'le clic');
  await p.mouse.click(a.x, a.y, {button: bouton || 'left'}); await pause(p, ms == null ? 450 : ms);
}
/* Glissé à la souris, bouton appuyé, de q0 à q1 (huit pas) ; o.avantLever : fonction appelée avant de lever le bouton ; o.ms : pause. */
async function glisserSourisCv(p, q0, q1, bouton, o){
  o = o || {}; bouton = bouton || 'left';
  const a = await pageCv(p, q0), b = await pageCv(p, q1); await surLePlan(p, a, 'le glissé'); await surLePlan(p, b, 'le glissé');
  await p.mouse.move(a.x, a.y); await p.mouse.down({button: bouton});
  await p.mouse.move(b.x, b.y, {steps: 8});
  if (o.avantLever) await o.avantLever();
  await p.mouse.up({button: bouton}); await pause(p, o.ms == null ? 450 : o.ms);
}
/* Survol à la souris, sans bouton appuyé ; sortie du plan : la souris passe sur le titre de la barre de l'éditeur (point de la page donné
   par titreBarre, hors du plan). */
async function survolerCv(p, q){
  const a = await pageCv(p, q); await surLePlan(p, a, 'le survol');
  await p.mouse.move(a.x, a.y); await pause(p, 80);
}
async function titreBarre(p){
  const b = await p.evaluate(() => { const r = document.querySelector('.vc .vc-titre').getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, e = document.elementFromPoint(x, y);
    return {x, y, plan: !!e && e.classList.contains('vc-cv')}; });
  if (b.plan) throw new Error('le titre de la barre est sur le plan : la souris n\'en sortirait pas');
  return {x: b.x, y: b.y};
}
async function sortirDuPlan(p){
  const b = await titreBarre(p); await p.mouse.move(b.x, b.y, {steps: 4}); await pause(p, 80);
}
/* Glissé à la souris qui finit hors du plan : bouton appuyé au point q du canevas, levé sur le titre de la barre de l'éditeur. */
async function glisserSourisHorsPlan(p, q, bouton){
  bouton = bouton || 'left';
  const a = await pageCv(p, q), b = await titreBarre(p); await surLePlan(p, a, 'le glissé');
  await p.mouse.move(a.x, a.y); await p.mouse.down({button: bouton});
  await p.mouse.move(b.x, b.y, {steps: 8}); await p.mouse.up({button: bouton}); await pause(p, 450);
}
/* Stylet qui survole le plan sans le toucher (pointerType 'pen', aucun bouton), par le protocole de Chromium. */
async function survolerStyletCv(p, q){
  const a = await pageCv(p, q); await surLePlan(p, a, 'le survol du stylet');
  const s = await p.context().newCDPSession(p);
  try { await s.send('Input.dispatchMouseEvent', {type: 'mouseMoved', x: a.x, y: a.y, pointerType: 'pen', button: 'none', buttons: 0}); }
  finally { await s.detach(); }
  await pause(p, 80);
}
/* Glissé au doigt (pointerType 'touch'), de q0 à q1 en huit pas, par les événements tactiles de Chromium ; o.avantLever : fonction appelée
   avant de lever le doigt ; puis une pause. */
async function glisserDoigtCv(p, q0, q1, ms, o){
  const a = await pageCv(p, q0), b = await pageCv(p, q1); await surLePlan(p, a, 'le glissé'); await surLePlan(p, b, 'le glissé');
  const s = await p.context().newCDPSession(p), t = (type, q) => s.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
  try {
    await t('touchStart', a);
    for (let k = 1; k <= 8; k++) await t('touchMove', {x: a.x + (b.x - a.x) * k / 8, y: a.y + (b.y - a.y) * k / 8});
    if (o && o.avantLever) await o.avantLever();
    await t('touchEnd', null);
  } finally { await s.detach(); }
  await pause(p, ms == null ? 450 : ms);
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

/* m158 (DL2) : forme du constat imprimé rangée dans l'étude ouverte : 'deleste', 'complet', ou '' (aucune : la clé est retirée) ; l'étude
   est enregistrée. Sur une version sans l'option (relevé du témoin sur la base), la clé est rangée sans rien changer. */
const formeConstat = (p, forme) => p.evaluate(async f => {
  const T = window.__VT, e = T.S.etude; e.fiche = e.fiche || {};
  if (f) e.fiche.constatForme = f; else delete e.fiche.constatForme;
  await T.DB.put('etudes', e); await T.flushSaves();
}, forme || '');

/* m158 (DL25) : relevé du PDF du constat du dossier ouvert (o.i : rang du dossier dans l'étude, 0 par défaut), imprimé comme au bouton
   (constatPdfBlob), toutes pages : chaque appel de dessin de la bibliothèque PDF, dans l'ordre, nombres au millième. Comme boitePdf de
   constat-boite.js, la bibliothèque est enveloppée le temps de l'impression.
     texte       ['t', page, x, y, texte, police, style, taille, couleur, options]
     trait       ['l', page, x1, y1, x2, y2, épaisseur, couleur, motif, style]
     rectangle   ['r', page, x, y, largeur, hauteur, style, épaisseur, couleur du trait, couleur du fond, motif]
     image       ['i', page, empreinte de l'image, format, x, y, largeur, hauteur, nom, compression, rotation] (jamais ses données)
     page neuve  ['p', numéro]
     autre       ['?', page, nom de la primitive] (lines, circle… : aucune au constat ; une nouvelle se verrait)
   Couleurs [r, v, b] (telles que la bibliothèque les relit) ; motif : celui du dernier setLineDash, [[], 0] sans motif ; options du texte
   et style en JSON. Un appel fait par un autre appel relevé (line passe par lines) n'est pas relevé. o.sansModule : module du croquis
   retiré le temps de l'impression (croquis absent), comme dans constat-boite.js. o.fiche (m161) : relève la fiche du dossier,
   fichePdfBlob(v, o.fiche) (par exemple {constat: true, photos: false} : le constat signé, puis la fiche), au lieu du constat. o.etat
   (m161) : ajoute en dernier l'état du document quand le PDF est produit (output) ; sans o.fiche, celui où le constat le laisse :
     état       ['e', page, épaisseur, couleur du trait, couleur du fond, couleur du texte, police, style, taille, motif, interligne,
                 espacement des lettres] */
const relevePdf = (p, o) => p.evaluate(async o => {
  const T = window.__VT, v = T.S.visites[o.i || 0], J0 = window.jspdf.jsPDF, L = [], M = Object.getOwnPropertyDescriptor(window, 'VCroquis');
  const m = x => typeof x === 'number' ? Math.round(x * 1000) / 1000 : x === undefined ? null : x;
  const coul = s => { const t = String(s == null ? '' : s); return /^#[0-9a-f]{6}$/i.test(t) ? [1, 3, 5].map(i => parseInt(t.slice(i, i + 2), 16)) : t; };
  /* empreinte d'une image (texte data:…), calculée dans la page : ses données ne sortent pas */
  const emp = s => { if (typeof s !== 'string') return '[' + (s && s.constructor ? s.constructor.name : typeof s) + ']';
    let a = 0x811c9dc5, b = 0x01000193;
    for (let i = 0; i < s.length; i++){ const k = s.charCodeAt(i); a = Math.imul(a ^ k, 16777619) >>> 0; b = Math.imul(b ^ k, 2246822519) >>> 0; }
    return a.toString(16) + '-' + b.toString(16) + '-' + s.length; };
  const W = function(){
    const d = new J0(...arguments); let prof = 0, motif = [[], 0];
    const pg = () => { try { return d.internal.getCurrentPageInfo().pageNumber; } catch (e){ return 0; } };
    const env = (nom, rel, apres) => { const f = d[nom]; if (typeof f !== 'function') return;
      d[nom] = function(){ if (!prof && rel) L.push(rel.apply(null, arguments)); prof++; let r; try { r = f.apply(d, arguments); } finally { prof--; }
        if (!prof && apres) L.push(apres()); return r; }; };
    env('text', (t, x, y, op) => { const f = d.getFont(); return ['t', pg(), m(x), m(y), [].concat(t).map(String).join('\n'), f.fontName, f.fontStyle,
      m(d.getFontSize()), coul(d.getTextColor()), JSON.stringify(op === undefined ? null : op)]; });
    env('line', (x1, y1, x2, y2, st) => ['l', pg(), m(x1), m(y1), m(x2), m(y2), m(d.getLineWidth()), coul(d.getDrawColor()), motif, JSON.stringify(m(st))]);
    env('rect', (x, y, w, h, st) => ['r', pg(), m(x), m(y), m(w), m(h), JSON.stringify(m(st)), m(d.getLineWidth()), coul(d.getDrawColor()), coul(d.getFillColor()), motif]);
    env('addImage', (img, fmt, x, y, w, h, al, comp, rot) => ['i', pg(), emp(img), m(fmt), m(x), m(y), m(w), m(h), m(al), m(comp), m(rot)]);
    env('addPage', null, () => ['p', pg()]);
    if (o.etat) env('output', () => { const f = d.getFont(); return ['e', pg(), m(d.getLineWidth()), coul(d.getDrawColor()), coul(d.getFillColor()),
      coul(d.getTextColor()), f.fontName, f.fontStyle, m(d.getFontSize()), motif, m(d.getLineHeightFactor()), m(d.getCharSpace())]; });
    ['lines', 'circle', 'ellipse', 'triangle', 'roundedRect', 'polygon', 'path', 'moveTo', 'lineTo', 'curveTo', 'textWithLink', 'link']
      .forEach(nom => env(nom, () => ['?', pg(), nom]));
    const sd = d.setLineDash;
    d.setLineDash = function(a, ph){ motif = [Array.isArray(a) ? a.map(m) : [], m(ph || 0)]; return sd.apply(d, arguments); };
    return d;
  };
  W.API = J0.API; window.jspdf.jsPDF = W;
  /* module retiré sans passer par le crochet de commun.js (son setter), puis remis tel quel */
  if (o.sansModule) Object.defineProperty(window, 'VCroquis', {value: undefined, configurable: true, writable: true});
  try { if (o.fiche) await T.fichePdfBlob(v, o.fiche); else await T.constatPdfBlob(v); }
  finally { window.jspdf.jsPDF = J0; if (o.sansModule){ if (M) Object.defineProperty(window, 'VCroquis', M); else delete window.VCroquis; } }
  return L;
}, o || {});

/* premier appel du relevé L différent de l'attendu, ou '' (m158 : pris de constat-boite.js) */
const premierEcart = (L, att) => { for (let i = 0; i < Math.max(L.length, att.length); i++) if (JSON.stringify(L[i]) !== JSON.stringify(att[i])) return 'appel ' + (i + 1) + ' : '
  + (L[i] ? JSON.stringify(L[i]) : 'aucun') + ' au lieu de ' + (att[i] ? JSON.stringify(att[i]) : 'aucun') + ' (' + L.length + ' appels)'; return ''; };

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
  injecter, P, J, L, index, regler, ecranCv, toucherCv, aCote, analyseCroquis, dossierAnomalies,
  surLePlan, pageCv, cliquerCv, glisserSourisCv, survolerCv, titreBarre, sortirDuPlan, glisserSourisHorsPlan, survolerStyletCv, glisserDoigtCv,
  formeConstat, relevePdf, premierEcart};
