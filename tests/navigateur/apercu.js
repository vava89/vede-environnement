// Aperçu du plan (lecture seule : m168 ; déplacer : m170 ; A5 à A8, A21 et A23 de la conception de l'aperçu), dans Chromium : données
// fictives, fond fictif de VCroquis.demoDxf(), croquis de démonstration ou dessins construits ici. L'aperçu s'ouvre par le vrai chemin
// (panneau Sorties, toucher « Aperçu du plan », fin du calcul attendue sur aria-busy). Contrôles :
// a : surcouche (pas une .vc-modal), rôle et nom, titre, focus sur « Fermer », S.pp, bouton en tête de Sorties, calcul signalé par aria-busy ;
// b : rendu lu par getImageData (pixels sombres dans la boîte d'une étiquette, aucun dans un coin de la zone, hors de la page) ;
// c : livrable : ordres de la page 1 relevés = ordres que sortie('pdfEdl') ou sortie('pdfAvp') donne au vrai jsPDF (espion du constructeur,
//     premier niveau, nombres à 1e-9 ; en cas d'écart, la méthode et le rang seulement : le logo de l'hôte est une image base64 d'index.html) ;
//     bouton « PDF » ; fraîcheur après un changement du croquis ;
// d : compteur (aucun, 1, plusieurs chevauchements ; coupés par le cadre) ; « ‹ » et « › » désactivés sans entrée ;
// e : parcours « ‹ › » dans l'ordre de lecture (de haut en bas, puis de gauche à droite, à 0,1 mm ; dessin « lecture », où il diffère de
//     celui du moteur, de l'ordre sans l'arrondi et de celui du centre du seul déplaçable), en boucle ; à chaque pas, la vue « × 2 » centrée
//     sur l'entrée (depuis « Page », × 4 ou la molette ; au bord de la page pour une étiquette qui en sort), son déplaçable choisi (entre deux
//     étiquettes, celle du dessus), seul marqué plus fort ; un toucher reprend la main ; après « › », un toucher au même endroit qu'avant est
//     un premier toucher ; textes de la ligne d'info, noms (étiquette, symbole par son libellé, rose du nord, bulle) ;
// f : zoom (puces, molette bornée à 1 et 8, pince, déplacement au doigt borné, double toucher dans le vide ; un toucher après un glissé
//     n'en fait pas un ; trois doigts : lever un doigt de la pince la finit) ;
// g : surlignage orange (A17) : éléments en cause entourés dès l'ouverture (trait plein, pointillé si coupé), l'élément choisi plus fort
//     (épaisseur du trait) ; choix au toucher (étiquette, étiquette dessous au toucher suivant, double toucher, toucher dans le vide) ;
//     hauteur de la ligne d'info et échelle de la page gardées quand le texte s'allonge (1024 × 768) ;
// h : repères (tirets du cadre utile, aplat des zones réservées), échelle, bandeau du cadre (plan affiché seulement) ;
// i : clavier (Tab et Maj+Tab restent dans l'aperçu, aria-modal, reste de l'éditeur inerte ; Échap de l'hôte, Suppr, Entrée, Ctrl+Z), garde
//     de « Fermer » au-dessus de « Retour », ouvrir(), rien d'écrit à la fermeture ;
// j : gardes : croquis désactivé (pas d'éditeur, nulle part « Aperçu du plan ») ; jsPDF absent (message, pas de surcouche) ;
// k : positions propres à chaque plan (m169 ; P2, 1re partie), dans l'éditeur, sur des dessins construits : objet supprimé (Suppr), plan
//     tourné, statut « Projet », type changé, avec Ctrl+Z et Ctrl+Maj+Z ; ménage à la réouverture du croquis ; texte libre décalé à l'écran
//     (zone et toucher) ; garde : fermer puis rouvrir le croquis garde doc.plans et e.decal ;
// l : déplacer (m170 ; P2, 2e partie) : étiquette, bulle ou texte glissé au doigt ou à la souris, imprimé par le PDF là où on l'a lâché
//     (ramené dans le cadre ; positions relevées, et textes du vrai jsPDF espionné) ; pendant le glissé, la page sans lui et lui seul sur
//     le canevas de saisie ; les marques que le lâcher fait bouger entourées de bleu un instant ; dossier à projet (toast du gel une fois,
//     avant-projet inchangé, lâcher sur l'avant-projet seul) ; « Annuler » et « Rétablir » de l'aperçu (boutons, Ctrl+Z, Ctrl+Maj+Z,
//     garde d'identité, tracé du croquis jamais défait ; l'objet choisi et la saisie en cours du croquis gardés), « Annuler » du croquis
//     après « Fermer » ; abandons (second doigt, pointercancel, Échap, fenêtre redimensionnée) ; toast de la première ouverture
//     (navigateur à part) ; toast de « Replacer toutes les étiquettes » ; constat signé inchangé ; gardes de m168 : glissé de la page hors
//     de portée des marques, toucher de 3 px à la souris.
// Sur e1ce71f (avant m168) : 7/59, les six « aucune erreur dans la console » et la garde « croquis désactivé » ; « jsPDF absent » échoue
// faute de bouton « Aperçu du plan ». Avant la reprise du parcours (ordre de lecture, vue « × 2 », déplaçable choisi) : 47/59, les douze
// contrôles de e qu'elle change ou ajoute échouent ; après : 59/59. Sur 0e3a9e8 (avant m169) : 61/67 ; des huit contrôles de k, seuls
// la garde et « aucune erreur dans la console » passent ; après : 67/67. Sur fb184ea (avant m170) : 68/81 ; des quatorze contrôles de
// l, seuls les deux « aucune erreur dans la console » passent, et (a) échoue sur le sous-titre ; après : 81/81. Ni capture d'écran ni
// image : les pixels se lisent dans la page.
// usage : node tests/navigateur/apercu.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('apercu');

/* ---------- outils posés dans la page ---------- */
function outilsPage(){
  const MES = /^(get|splitTextToSize$|output$)/;
  /* copie profonde qui garde undefined et NaN */
  const cp = v => Array.isArray(v) ? v.map(cp) : v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Object]'
    ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, cp(x)])) : v;
  function egal(x, y){
    if (typeof x === 'number' && typeof y === 'number') return Math.abs(x - y) <= 1e-9 || (isNaN(x) && isNaN(y));
    if (Array.isArray(x)) return Array.isArray(y) && x.length === y.length && x.every((v, i) => egal(v, y[i]));
    if (x && typeof x === 'object'){
      if (!y || typeof y !== 'object' || Array.isArray(y)) return false;
      const kx = Object.keys(x).filter(k => x[k] !== undefined).sort(), ky = Object.keys(y).filter(k => y[k] !== undefined).sort();
      return kx.join() === ky.join() && kx.every(k => egal(x[k], y[k]));
    }
    return x === y;
  }
  const S = () => window.__vcEd.etat;
  const pp = () => document.querySelector('.vc .vc-pp');
  const T = {
    /* état de l'aperçu, sans les données du relevé */
    etat(){
      const s = S(), o = pp(), q = sel => o && o.querySelector(sel), txt = sel => { const e = q(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : null; };
      const cv = q('.vc-pp-cv'), z = q('.vc-pp-zone'), zr = z && z.getBoundingClientRect(), b = q('.vc-pp-bandeau');
      return {ouvert: !!o, pp: s.pp ? {mode: s.pp.mode, z: s.pp.z, k: s.pp.k, ox: s.pp.ox, oy: s.pp.oy, choix: s.pp.choix, iListe: s.pp.iListe, reperes: s.pp.reperes, calcul: s.pp.calcul} : null,
        compte: txt('.vc-pp-compte'), info: txt('.vc-pp-info'), echelle: txt('.vc-pp-echelle'), bandeau: b ? (b.hidden ? '' : b.textContent.trim()) : null,
        zone: zr ? {l: zr.left, t: zr.top, w: zr.width, h: zr.height} : null, transform: cv ? cv.style.transform : null, dpr: s.dpr, busy: o ? o.getAttribute('aria-busy') : null,
        prec: q('[data-pp="prec"]') ? q('[data-pp="prec"]').disabled : null, suiv: q('[data-pp="suiv"]') ? q('[data-pp="suiv"]').disabled : null,
        zoom: Array.from(o ? o.querySelectorAll('[data-pp="zoom"]') : []).map(e => e.textContent.trim() + ':' + e.getAttribute('aria-pressed')),
        plans: Array.from(o ? o.querySelectorAll('[data-pp="plan"]') : []).map(e => e.dataset.v + ':' + e.getAttribute('aria-pressed')),
        reperesBtn: q('[data-pp="reperes"]') ? q('[data-pp="reperes"]').getAttribute('aria-pressed') : null,
        nPaires: s.pp && s.pp.chev ? s.pp.chev.paires.length : -1, nCoupes: s.pp && s.pp.chev ? s.pp.chev.coupes.length : -1};
    },
    /* marques de la page 1 : indice, genre, id, clé d'une bulle (m170), centre et taille (mm), boîte englobante de la forme (mm) */
    marques(){
      const s = S().pp; if (!s || !s.rel) return [];
      return s.rel.marques.map((m, i) => {
        const F = s.chev && s.chev.formes ? s.chev.formes[i] : null;
        const b = F ? F.reduce((a, f) => { const r = f.c ? [f.c[0] - f.c[2], f.c[1] - f.c[2], f.c[0] + f.c[2], f.c[1] + f.c[2]] : f.b;
          return [Math.min(a[0], r[0]), Math.min(a[1], r[1]), Math.max(a[2], r[2]), Math.max(a[3], r[3])]; }, [Infinity, Infinity, -Infinity, -Infinity]) : null;
        return {i, k: m.k, id: m.id || m.cle, cle: m.cle, num: m.num, page: m.page, cx: m.cx, cy: m.cy, w: m.w, h: m.h, b};
      });
    },
    /* point de la page (mm) vers la fenêtre (pixels CSS) */
    versEcran(x, y){ const s = S().pp, z = pp().querySelector('.vc-pp-zone').getBoundingClientRect(); return {x: z.left + s.ox + x * s.k, y: z.top + s.oy + y * s.k}; },
    /* boîte de la page (mm) vers les pixels de l'appareil du canevas */
    boiteCv(b){ const s = S().pp, d = S().dpr; return [(s.ox + b[0] * s.k) * d, (s.oy + b[1] * s.k) * d, (s.ox + b[2] * s.k) * d, (s.oy + b[3] * s.k) * d]; },
    /* pixels d'une boîte du canevas (pixels de l'appareil) : sombres (luminance < 100), orange (#F76707), cyan (repères), bleu (#1971C2 : les
       marques qu'un lâcher a fait bouger, m170), encre (luminance < 200, m170 : le trait fin d'une étiquette vue à z = 1 n'est jamais
       sombre) ; chaque pixel est lu sur fond blanc (m170 : le canevas de la saisie est transparent hors de la marque) ; sel : un autre
       canevas de l'aperçu (m170 : celui de la saisie), sinon celui de la page */
    pixels(bx, sel){
      const cv = pp().querySelector(sel || '.vc-pp-cv'), c = cv.getContext('2d');
      const x0 = Math.max(0, Math.floor(bx[0])), y0 = Math.max(0, Math.floor(bx[1])), x1 = Math.min(cv.width, Math.ceil(bx[2])), y1 = Math.min(cv.height, Math.ceil(bx[3]));
      if (x1 <= x0 || y1 <= y0) return {n: 0, sombre: 0, orange: 0, cyan: 0, gris: 0, blanc: 0, bleu: 0, encre: 0};
      const d = c.getImageData(x0, y0, x1 - x0, y1 - y0).data, r = {n: 0, sombre: 0, orange: 0, cyan: 0, gris: 0, blanc: 0, bleu: 0, encre: 0};
      for (let i = 0; i < d.length; i += 4){
        const al = d[i + 3] / 255, R0 = d[i] * al + 255 * (1 - al), G = d[i + 1] * al + 255 * (1 - al), B = d[i + 2] * al + 255 * (1 - al);
        const lum = .2126 * R0 + .7152 * G + .0722 * B; r.n++;
        if (lum < 100) r.sombre++;
        if (lum < 200) r.encre++;
        if (Math.abs(R0 - 247) <= 14 && Math.abs(G - 103) <= 14 && Math.abs(B - 7) <= 14) r.orange++;
        if (R0 < 70 && G > 100 && B > 120 && G - R0 > 50 && B - R0 > 60) r.cyan++;
        if (Math.abs(R0 - 0xC9) <= 3 && Math.abs(G - 0xD0) <= 3 && Math.abs(B - 0xD5) <= 3) r.gris++;
        if (R0 > 250 && G > 250 && B > 250) r.blanc++;
        if (Math.abs(R0 - 0x19) <= 14 && Math.abs(G - 0x71) <= 14 && Math.abs(B - 0xC2) <= 14) r.bleu++;
      }
      return r;
    },
    /* ordres de la page 1 relevés par l'aperçu (gardés pour une comparaison plus tard) */
    garder(nom){ T[nom] = S().pp.rel.pages[0].ordres.map(o => ({m: o.m, a: cp(o.a)})); return T[nom].length; },
    /* ordres de la page 1 que sortie(a) donne au vrai jsPDF : espion du constructeur, premier niveau, arguments copiés avant l'appel */
    sortieEspionnee(a){
      const J0 = window.jspdf.jsPDF, pages = [[]]; let cur = 0, n = 0;
      const W = function(opts){
        const t = new J0(Object.assign({}, opts)); n++;
        const P = new Proxy(t, {get(tt, k){
          const v = tt[k]; if (typeof v !== 'function') return v;
          return function(...x){
            const ac = cp(x), r = v.apply(tt, x);
            if (k === 'addPage'){ pages.push([]); cur = pages.length - 1; }
            else if (k === 'setPage') cur = x[0] - 1;
            else if (!MES.test(k)) pages[cur].push({m: k, a: ac});
            return r === tt ? P : r;
          };
        }});
        return P;
      };
      W.API = J0.API; window.jspdf.jsPDF = W;
      try { window.__vcEd.sortie(a); } finally { window.jspdf.jsPDF = J0; }
      T.dernierLivrable = pages[0];
      return n;
    },
    /* écart entre deux listes d'ordres : la méthode et le rang seulement, jamais les arguments */
    ecart(A, B){
      if (!A || !B) return 'liste absente';
      for (let i = 0; i < Math.max(A.length, B.length); i++){
        const a = A[i], b = B[i];
        if (!a || !b || a.m !== b.m || !egal(a.a, b.a)) return 'rang ' + i + ' : ' + (a ? a.m : 'aucun') + ' / ' + (b ? b.m : 'aucun') + ' (' + A.length + ' et ' + B.length + ' ordres)';
      }
      return '';
    },
    ecartApercuLivrable(){ return T.ecart(S().pp.rel.pages[0].ordres.map(o => ({m: o.m, a: o.a})), T.dernierLivrable); },
    ecartGarde(nom){ return T.ecart(S().pp.rel.pages[0].ordres.map(o => ({m: o.m, a: o.a})), T[nom]); },
    /* état de l'éditeur que l'aperçu ne doit pas changer */
    editeur(){
      const s = S();
      return {sel: JSON.stringify(s.sel), panneau: s.panneau, mode: s.mode, brouillon: JSON.stringify(s.brouillon), vue: JSON.stringify({cx: s.vue.cx, cy: s.vue.cy, s: s.vue.s, rot: s.vue.rot}),
        undo: s.undo.length + ':' + JSON.stringify(s.undo).length, redo: s.redo.length, doc: JSON.stringify(s.doc)};
    },
    toast(){ const t = document.querySelector('.vc .vc-toast'); return t && t.classList.contains('on') ? t.textContent.trim() : ''; },
    /* pixels autour de la forme de la marque i (sa boîte englobante élargie de 8 px CSS), null sans forme ; orange et bleu (m170) */
    autour(i){
      const s = S().pp, d = S().dpr, F = s.chev.formes[i]; if (!F || !F.length) return null;
      const b = F.reduce((a, f) => { const r = f.c ? [f.c[0] - f.c[2], f.c[1] - f.c[2], f.c[0] + f.c[2], f.c[1] + f.c[2]] : f.b;
        return [Math.min(a[0], r[0]), Math.min(a[1], r[1]), Math.max(a[2], r[2]), Math.max(a[3], r[3])]; }, [Infinity, Infinity, -Infinity, -Infinity]);
      const c = T.boiteCv(b);
      return T.pixels([c[0] - 8 * d, c[1] - 8 * d, c[2] + 8 * d, c[3] + 8 * d]);
    },
    orangeAutour(i){ const r = T.autour(i); return r ? r.orange : -1; },
    bleuAutour(i){ const r = T.autour(i); return r ? r.bleu : -1; },
    /* bord haut de la (première) boîte de la marque i : part des pixels orange de sa rangée et nombre de traits d'un seul tenant (plein : 1 ;
       pointillé : plusieurs) */
    bordHaut(i){
      const s = S().pp, d = S().dpr, F = s.chev.formes[i], f = F && F[0]; if (!f || !f.b) return null;
      const X = x => (s.ox + x * s.k) * d, Y = y => (s.oy + y * s.k) * d, c = pp().querySelector('.vc-pp-cv').getContext('2d');
      const y = Math.floor(Y(f.b[1])), x0 = Math.ceil(X(f.b[0])) + 4, x1 = Math.floor(X(f.b[2])) - 4; if (x1 <= x0) return null;
      const D = c.getImageData(x0, y, x1 - x0, 1).data; let n = 0, o = 0, traits = 0, avant = false;
      for (let j = 0; j < D.length; j += 4){ n++; const on = Math.abs(D[j] - 247) <= 14 && Math.abs(D[j + 1] - 103) <= 14 && Math.abs(D[j + 2] - 7) <= 14; if (on) o++; if (on && !avant) traits++; avant = on; }
      return {part: o / n, traits};
    },
    /* épaisseur (px CSS) du trait orange au bord haut de la (première) boîte de la marque i : dans chaque colonne du milieu du bord, la somme
       des parts d'orange des pixels voisins, de 4 px au-dessus du bord jusqu'à moins de la mi-hauteur de la boîte (le trait du bord bas n'y
       entre pas) ; seul compte l'orange #F76707 mêlé au blanc de la page ; puis la médiane des colonnes ; -1 sans boîte */
    epaisseur(i){
      const s = S().pp, d = S().dpr, F = s.chev.formes[i], f = F && F[0]; if (!f || !f.b) return -1;
      const X = x => (s.ox + x * s.k) * d, Y = y => (s.oy + y * s.k) * d, c = pp().querySelector('.vc-pp-cv').getContext('2d');
      const ye = Math.round(Y(f.b[1])), x0 = Math.ceil(X(f.b[0])) + 6, x1 = Math.floor(X(f.b[2])) - 6, L = x1 - x0;
      const hh = Math.ceil(4 * d), hb = Math.max(1, Math.min(hh, Math.floor((Y(f.b[3]) - Y(f.b[1])) / 2) - 1)); if (L <= 0) return -1;
      const D = c.getImageData(x0, ye - hh, L, hh + hb + 1).data, cols = [];
      for (let x = 0; x < L; x++){
        let sm = 0;
        for (let y = 0; y <= hh + hb; y++){
          const j = (y * L + x) * 4, a = (255 - D[j + 2]) / 248;
          if (a >= 0.15 && Math.abs(D[j] - (255 - 8 * a)) <= 6 && Math.abs(D[j + 1] - (255 - 152 * a)) <= 12) sm += Math.min(1, a);
        }
        cols.push(sm);
      }
      cols.sort((a, b) => a - b);
      return cols[Math.floor(cols.length / 2)] / d;
    },
    /* pixels de l'aplat des repères sur la page blanche (rgba(12,133,153,.13) sur blanc), dans une boîte de la page (mm) */
    teinte(b){
      const cv = pp().querySelector('.vc-pp-cv'), c = cv.getContext('2d'), q = T.boiteCv(b);
      const x0 = Math.max(0, Math.ceil(q[0])), y0 = Math.max(0, Math.ceil(q[1])), x1 = Math.min(cv.width, Math.floor(q[2])), y1 = Math.min(cv.height, Math.floor(q[3]));
      if (x1 <= x0 || y1 <= y0) return {n: 0, t: 0};
      const D = c.getImageData(x0, y0, x1 - x0, y1 - y0).data; let n = 0, t = 0;
      for (let j = 0; j < D.length; j += 4){ n++; if (Math.abs(D[j] - 223) <= 5 && Math.abs(D[j + 1] - 239) <= 5 && Math.abs(D[j + 2] - 242) <= 5) t++; }
      return {n, t};
    },
    /* où est le focus : le bouton de l'aperçu (data-pp et data-v), ou « HORS » et l'élément hors de l'aperçu */
    foyer(){
      const a = document.activeElement, o = pp();
      if (o && a && o.contains(a) && a.tagName === 'BUTTON') return (a.dataset.pp || '?') + (a.dataset.v ? '/' + a.dataset.v : '');
      return 'HORS:' + (a ? a.tagName.toLowerCase() + (a.dataset && (a.dataset.a || a.dataset.p) ? '[' + (a.dataset.a || a.dataset.p) + ']' : '') : 'aucun');
    }
  };
  window.__ppT = T;
}

/* ---------- ouverture et dessins ---------- */
async function croquisNeuf(o){
  const A = await C.ouvrir(o); await C.etudeEtDossier(A.p); await C.ouvrirCroquis(A.p); await A.p.evaluate(outilsPage); return A;
}
/* croquis de démonstration (fond fictif), échelle automatique, état des lieux */
async function demo(p, ech){
  await p.evaluate(ech => {
    const ed = window.__vcEd, S = ed.etat, d = window.VCroquis.demoCroquis(S.fond);
    S.doc.el = d.el; S.doc.anomManu = d.anomManu || []; S.doc.decisions = d.decisions || {}; S.doc.ordre = d.ordre || []; S.doc.rot = d.rot || 0; S.doc.echelle = ech || 0;
    S.undo = []; S.redo = []; S.sel = null; S.panneau = null; S.mode = 'edl'; ed.synchroniser();
  }, ech || 0);
  await C.pause(p, 300);
}
/* regard fictif en (x, y) (mètres) ; t : texte de son étiquette ; lab : placée à la main {dx, dy} (mètres), null : placée d'office, absent : pas d'étiquette */
const Rg = (id, x, y, t, lab, st) => Object.assign(C.P(id, 'regard', x, y, Object.assign(t ? {etiq: t} : {}, st ? {st} : {})),
  {lab: lab === undefined ? {off: true} : lab === null ? null : Object.assign({main: true}, lab)});
async function dessin(p, el, ech){
  await C.injecter(p, {el, echelle: ech == null ? 200 : ech, mode: 'edl'});
  await p.evaluate(() => { const ed = window.__vcEd; ed.etat.doc.rot = 0; ed.synchroniser(); });
  await C.pause(p, 300);
}
/* dessins construits, à 1/200, plan non tourné */
const D = {
  aucun: () => [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null)],
  un: () => [Rg('A', 0, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 0.4, 0, 'Regard fictif B', {dx: 0, dy: 1.5})],
  trois: () => [Rg('A', 0, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 0.4, 0, 'Regard fictif B', {dx: 0, dy: 1.5}), Rg('Cr', 0.8, 0, 'Regard fictif C', {dx: 0, dy: 1.5})],
  /* étiquettes coupées : le dessin (41,2 m, soit 206 mm à 1/200) déborde de 0,5 mm de chaque côté du cadre (205 mm) ; l'ancre de Cc (et de Cs)
     est hors du cadre et son étiquette, posée à la main au-delà, n'y est pas ramenée (règle du moteur) : elle sort du cadre */
  coupe1: () => [Rg('Cc', 20.6, 0.6, 'Regard fictif C', {dx: 2, dy: 0}), Rg('Bs', -20.6, -0.6)],
  coupe2: () => [Rg('Cc', 20.6, 0.6, 'Regard fictif C', {dx: 2, dy: 0}), Rg('Cs', -20.6, -0.6, 'Regard fictif D', {dx: -2, dy: 0})],
  /* une paire (étiquettes de A et B) et une coupe (étiquette de Cc, comme dans coupe1) ; Dd, sans étiquette, garde le plan centré */
  parcours: () => [Rg('A', 0, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 0.4, 0, 'Regard fictif B', {dx: 0, dy: 1.5}),
    Rg('Cc', 20.6, 0.6, 'Regard fictif C', {dx: 2, dy: 0}), Rg('Dd', -20.6, -0.6)],
  /* reprise de m168 (A17) : l'ordre de lecture n'est pas celui du moteur. De haut en bas sur la page : l'étiquette de Cc, coupée par le cadre
     (à droite, comme dans coupe1) ; les paires A-B et E-F, à la même hauteur à 0,1 mm près (étiquettes qui se recouvrent de 1,7 à 1,9 mm ;
     A-B à gauche) ; l'étiquette de G sur le symbole de H. Les marques suivent l'ordre du croquis : le moteur range G-H, E-F, A-B, puis la
     coupe. Dd, sans étiquette, garde le plan centré. A est 1 cm plus haut et B 1,6 cm plus bas que E et F (0,05 et 0,08 mm sur la page) : le
     centre de la boîte de A-B (95,7355 mm du haut de la page) tombe dans la même case de 0,1 mm que celui d'E-F (95,7205 mm), mais plus bas :
     sans l'arrondi, E-F passerait d'abord ; le centre de B seul (95,8005 mm), le déplaçable de la paire, tombe dans la case suivante : une clé
     prise sur le seul déplaçable, et non sur l'union des formes de l'entrée, mettrait aussi E-F d'abord */
  lecture: () => [Rg('G', -3, -3, 'Regard fictif G', {dx: 3, dy: 0}), Rg('H', 0.6, -3),
    Rg('E', 6, 0, 'Regard fictif E', {dx: 0, dy: 1.5}), Rg('F', 8.6, 0, 'Regard fictif F', {dx: 0, dy: 1.5}),
    Rg('Cc', 20.6, 3, 'Regard fictif C', {dx: 2, dy: 0}),
    Rg('A', -12, 0.01, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', -9.4, -0.016, 'Regard fictif B', {dx: 0, dy: 1.5}), Rg('Dd', -20.6, -3)],
  /* reprise de m168 (A17, A8) : un regard posé loin à 1/200 ; le plan, centré sur l'étendue du dessin, met l'étiquette de A (placée d'office)
     hors de la page, à gauche ; celles de B et de Z sortent aussi du cadre, à gauche et à droite (toutes trois à la même hauteur) */
  horsPage: () => [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null), Rg('Z', 60, 0, 'Regard fictif Z', null)],
  /* l'étiquette de A posée sur le symbole de B */
  symbole: () => [Rg('A', 0, 0, 'Regard fictif A', {dx: 3, dy: 0}), Rg('B', 3.6, 0)],
  /* l'étiquette de Hn sur le « N » de la rose du nord (comme dans tests/vm/apercu.js) : ancre hors du cadre, position donnée sans « main »,
     donc gardée telle quelle (une étiquette placée à la main serait ramenée dans le cadre, hors de la place du nord) */
  nord: () => [Rg('Hn', 21.1, 18.7, 'Regard N', {dx: -2.8, dy: 0, main: false}), Rg('Hs', -21.1, -18.7)],
  /* deux étiquettes au même endroit */
  superposees: () => [Rg('A', 0, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 0.4, 0, 'Regard fictif B', {dx: -0.4, dy: 1.5}), Rg('Lx', 8, 0, 'Regard loin', null)],
  /* un ouvrage projeté posé loin : seul l'avant-projet sort du cadre */
  projetLoin: () => [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null), Rg('Z', 60, 0, null, undefined, 'projet')],
  /* un ouvrage posé loin : l'état des lieux sort du cadre */
  loin: () => [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null), Rg('Z', 60, 0)],
  /* quatre étiquettes longues au même endroit : la ligne d'info de l'une nomme les trois autres (245 caractères, sur deux lignes à 1024 px de large) */
  longues: () => [1, 2, 3, 4].map(k => Rg('Ln' + k, (k - 1) * 0.4, 0, 'Regard fictif numéro ' + k + ' au fond de la cour fictive', {dx: -(k - 1) * 0.4, dy: 1.5}))
};

const etat = p => p.evaluate(() => window.__ppT.etat());
const marques = p => p.evaluate(() => window.__ppT.marques());
const centreDe = (p, s) => p.evaluate(s => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({block: 'nearest'}); const r = e.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height}; }, s);
/* fin du calcul et du rendu : S.pp calculé, surcouche sans aria-busy, canevas sans transformation */
const attendre = (p, ms) => p.waitForFunction(() => { const S = window.__vcEd.etat, o = document.querySelector('.vc .vc-pp'), cv = o && o.querySelector('.vc-pp-cv');
  return !!S.pp && !S.pp.calcul && !!S.pp.rel && o.getAttribute('aria-busy') !== 'true' && !!cv && !cv.style.transform; }, null, {timeout: ms || 10000});
/* aperçu ouvert par le vrai chemin : panneau Sorties, toucher « Aperçu du plan » ; o.busy : relève les valeurs d'aria-busy de la surcouche */
async function ouvrirApercu(p, o){
  o = o || {};
  if (await p.evaluate(() => window.__vcEd.etat.panneau) !== 'sorties') await p.click('.vc .vc-barre [data-p="sorties"]');
  const b = await p.waitForSelector('.vc .vc-pcorps [data-a="apercu"]', {timeout: 2500}).catch(() => null);
  if (!b) throw new Error('pas de bouton « Aperçu du plan » dans Sorties');
  if (o.busy) await p.evaluate(() => {
    window.__ppBusy = [];
    const mo = new MutationObserver(() => { const s = document.querySelector('.vc .vc-pp'); if (s) window.__ppBusy.push(s.getAttribute('aria-busy')); });
    mo.observe(document.querySelector('.vc'), {subtree: true, childList: true, attributes: true, attributeFilter: ['aria-busy']}); window.__ppMo = mo;
  });
  const q = await centreDe(p, '.vc .vc-pcorps [data-a="apercu"]');
  await p.touchscreen.tap(q.x, q.y);
  await attendre(p);
  if (o.busy) return p.evaluate(() => { window.__ppMo.disconnect(); return window.__ppBusy; });
}
async function fermerApercu(p){
  if (!(await etat(p)).ouvert) return;
  await p.click('.vc .vc-pp [data-pp="fermer"]');
  await p.waitForFunction(() => !document.querySelector('.vc .vc-pp') && !window.__vcEd.etat.pp, null, {timeout: 3000});
  await C.pause(p, 450);
}
/* ouverture au début d'un scénario : son échec est rendu par chacun des contrôles qui suivent (comptes justes avant m168) */
async function ouvrirOuNoter(p){ try { await ouvrirApercu(p); return ''; } catch (e){ return 'aperçu non ouvert : ' + String(e && e.message || e).split('\n')[0]; } }
/* bouton de l'aperçu (data-pp, data-v) cliqué ; puis l'état attendu */
async function bouton(p, pp, v){ await p.click('.vc .vc-pp [data-pp="' + pp + '"]' + (v != null ? '[data-v="' + v + '"]' : '')); }
const attendreQue = (p, fn, arg, ms) => p.waitForFunction(fn, arg, {timeout: ms || 4000}).then(() => true, () => false);
/* point de la zone (pixels CSS, depuis son coin haut gauche) vers la fenêtre */
const dansZone = (e, x, y) => ({x: e.zone.l + x, y: e.zone.t + y});
/* toucher (doigt) à un point de la fenêtre, puis une pause qui le sépare du suivant (pas de double toucher) */
async function toucher(p, q, ms){ await p.touchscreen.tap(q.x, q.y); await C.pause(p, ms == null ? 450 : ms); }
/* point de la zone hors de la page (marge grise à gauche, à mi-hauteur) */
const vide = e => dansZone(e, Math.max(4, e.pp.ox / 2), e.zone.h / 2);
/* m170 : un doigt qui glisse reste immobile LEVER ms avant de se lever (glisserDoigt, pincer, glisserEtapes ; le contrôle f « toucher,
   glisser, toucher » reste vif à dessein). Levé en mouvement, il lancerait dans Chromium une glissade inertielle (fling), invisible
   sous touch-action: none ; le toucher qui la suit tant qu'elle dure ne ferait que l'arrêter : pointerdown et pointerup arrivent
   (gestes de la zone), mais ni mousedown ni click (boutons, « Aperçu du plan »). Immobile 80 ms environ, le doigt est tenu pour
   arrêté et sa vitesse retombe à zéro [p] ; 150 ms gardent une marge (mesuré : aucun toucher perdu). C'était l'échec rare de l2. Un
   vrai doigt y est exposé de même [p] : défaut de l'application, à corriger par m171 (tests/LISEZMOI.md) */
const LEVER = 150;
/* glissé au doigt dans la fenêtre, de a à b en huit pas (événements tactiles de Chromium), puis LEVER ms immobile avant de lever */
async function glisserDoigt(p, a, b){
  const s = await p.context().newCDPSession(p), t = (type, q) => s.send('Input.dispatchTouchEvent', {type, touchPoints: q ? [{x: q.x, y: q.y, id: 1}] : []});
  try { await t('touchStart', a); for (let k = 1; k <= 8; k++) await t('touchMove', {x: a.x + (b.x - a.x) * k / 8, y: a.y + (b.y - a.y) * k / 8});
    await C.pause(p, LEVER); await t('touchEnd', null); }
  finally { await s.detach(); }
}
/* pince à deux doigts autour de c, de l'écart d0 à d1 (pixels, de chaque côté), puis LEVER ms immobiles avant de lever */
async function pincer(p, c, d0, d1){
  const s = await p.context().newCDPSession(p), t = (type, pts) => s.send('Input.dispatchTouchEvent', {type, touchPoints: pts});
  const pt = (dx, id) => ({x: c.x + dx, y: c.y, id});
  try {
    await t('touchStart', [pt(-d0, 1)]); await C.pause(p, 30);
    await t('touchStart', [pt(-d0, 1), pt(d0, 2)]);
    for (let k = 1; k <= 8; k++){ const d = d0 + (d1 - d0) * k / 8; await t('touchMove', [pt(-d, 1), pt(d, 2)]); }
    await C.pause(p, LEVER); await t('touchEnd', []);
  } finally { await s.detach(); }
}
/* point de la page au centre de la zone (mm) */
const centrePage = e => ({x: (e.zone.w / 2 - e.pp.ox) / e.pp.k, y: (e.zone.h / 2 - e.pp.oy) / e.pp.k});
const centree = e => Math.abs(e.pp.ox - (e.zone.w - 297 * e.pp.k) / 2) < 1e-6 && Math.abs(e.pp.oy - (e.zone.h - 210 * e.pp.k) / 2) < 1e-6;
/* point d'une entrée du parcours (reprise de m168) : centre (mm) de la boîte englobante des formes de ses marques ids (M : marques(p)) ; puis
   son écart (px CSS) au centre de la zone */
const centreMarques = (M, ids) => { const b = ids.map(i => M[i].b).reduce((a, r) => [Math.min(a[0], r[0]), Math.min(a[1], r[1]), Math.max(a[2], r[2]), Math.max(a[3], r[3])]);
  return {x: (b[0] + b[2]) / 2, y: (b[1] + b[3]) / 2}; };
const ecartCentre = (e, u) => ({dx: e.pp.ox + u.x * e.pp.k - e.zone.w / 2, dy: e.pp.oy + u.y * e.pp.k - e.zone.h / 2});
const INVITE = 'Touchez une étiquette, une bulle ou un texte pour voir ses chevauchements.';
const f3 = v => typeof v === 'number' ? v.toFixed(3) : String(v);
/* un contrôle : son échec ou son exception est compté, sans arrêter les suivants */
async function controle(nom, fn){
  let r;
  try { r = await fn(); } catch (e){ r = [false, 'exception : ' + String(e && e.message || e).split('\n')[0]]; }
  R.ok(r[0], nom + (r[1] ? ' (' + r[1] + ')' : ''));
}
const erreurs = (A, k) => R.ok(!A.erreurs.length, k + ' : aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 2).join(' | ').slice(0, 300) : ''));

/* ---------- a, b, c, h : démonstration ---------- */
async function demonstration(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await demo(p);
    let busy = null;
    await controle('a : « Aperçu du plan » en tête de Sorties, l\'aperçu par-dessus l\'éditeur (rôle, nom, titre, focus sur « Fermer », S.pp), aria-busy pendant le calcul', async () => {
      busy = await ouvrirApercu(p, {busy: true});
      const r = await p.evaluate(() => {
        const S = window.__vcEd.etat, o = document.querySelector('.vc .vc-pp'), b0 = document.querySelector('.vc .vc-pcorps .vc-sorties button');
        const f = o.querySelector('[data-pp="fermer"]'), cs = getComputedStyle(o), rr = document.querySelector('.vc').getBoundingClientRect(), ro = o.getBoundingClientRect();
        return {premier: b0 ? b0.dataset.a + ' | ' + b0.textContent.replace(/\s+/g, ' ').trim() : '', role: o.getAttribute('role'), nom: o.getAttribute('aria-label'), modal: o.classList.contains('vc-modal') || !!document.querySelector('.vc .vc-modal'),
          titre: (o.querySelector('.vc-pp-haut') || o).textContent, focus: document.activeElement === f, fermer: f ? f.getAttribute('aria-label') + ' | ' + f.textContent.trim() : '',
          z: cs.zIndex, couvre: Math.abs(ro.left - rr.left) < 1 && Math.abs(ro.top - rr.top) < 1 && Math.abs(ro.width - rr.width) < 1 && Math.abs(ro.height - rr.height) < 1,
          pp: S.pp ? [S.pp.mode, S.pp.z, S.pp.choix, S.pp.iListe, S.pp.reperes, S.pp.calcul].join(',') : 'absent', panneau: S.panneau, calcul: getComputedStyle(o.querySelector('.vc-pp-calcul')).opacity};
      });
      /* m170 : le sous-titre dit qu'on y déplace étiquettes, bulles et textes */
      const bon = r.premier === 'apercu | Aperçu du planLa page 1 du PDF, à l\'échelle du livrable : déplacez étiquettes, bulles et textes' && r.role === 'dialog' && r.nom === 'Aperçu du plan' && !r.modal && /Aperçu du plan/.test(r.titre)
        && r.focus && r.fermer === 'Fermer l\'aperçu | Fermer' && r.z === '9' && r.couvre && r.pp === 'edl,1,-1,-1,false,false' && r.panneau === 'sorties' && r.calcul === '0'
        && busy.indexOf('true') >= 0 && busy[busy.length - 1] !== 'true';
      return [bon, JSON.stringify(r).slice(0, 400) + ' ; aria-busy ' + JSON.stringify(busy)];
    });
    await controle('b : rendu : pixels sombres dans la boîte d\'une étiquette ; un coin de la zone, hors de la page, sans pixel sombre (gris #C9D0D5)', async () => {
      const e = await etat(p), M = (await marques(p)).filter(m => m.k === 'etiq' && m.page === 1 && m.b && m.cx > 10 && m.cx < 200).sort((a, b) => b.w * b.h - a.w * a.h);
      if (!M.length) return [false, 'aucune étiquette'];
      const m = M[0], bx = await p.evaluate(m => window.__ppT.boiteCv([m.cx - m.w / 2, m.cy - m.h / 2, m.cx + m.w / 2, m.cy + m.h / 2]), m);
      const px = await p.evaluate(bx => window.__ppT.pixels(bx), bx), d = e.dpr;
      const coin = await p.evaluate(b => window.__ppT.pixels(b), [1, 1, 9 * d, 9 * d]);
      return [px.sombre > 0 && coin.sombre === 0 && coin.gris === coin.n && coin.n > 0, 'étiquette ' + px.sombre + '/' + px.n + ' sombres ; coin ' + coin.sombre + ' sombres, ' + coin.gris + '/' + coin.n + ' gris'];
    });
    await controle('c : livrable, état des lieux : les ordres de la page 1 relevés sont ceux que sortie(\'pdfEdl\') donne au vrai jsPDF', async () => {
      const n = await p.evaluate(() => window.__ppT.sortieEspionnee('pdfEdl')), ec = await p.evaluate(() => window.__ppT.ecartApercuLivrable()), m = await p.evaluate(() => window.__ppT.garder('edl0'));
      return [n === 1 && !ec && m > 50, n + ' document(s), ' + m + ' ordres' + (ec ? ' ; écart ' + ec : '')];
    });
    await controle('c : bouton « PDF » : un fichier .pdf de plus dans les fichiers enregistrés, l\'aperçu reste ouvert', async () => {
      const n0 = await p.evaluate(() => window.__fichiers.length);
      const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-pp [data-pp="pdf"]'); return b ? b.getAttribute('aria-label') + ' | ' + b.getAttribute('title') : ''; });
      await bouton(p, 'pdf');
      const ok = await attendreQue(p, n0 => window.__fichiers.length > n0, n0, 8000);
      const f = await p.evaluate(() => { const f = window.__fichiers[window.__fichiers.length - 1]; return f ? {nom: /\.pdf$/.test(f.nom), debut: f.debut.slice(0, 4)} : null; }), e = await etat(p);
      return [ok && f && f.nom && f.debut === '%PDF' && e.ouvert && !!e.pp && r === 'Faire le PDF de ce plan | Faire le PDF de ce plan', (ok ? 'fichier ' + JSON.stringify(f) : 'aucun fichier') + ', ' + (e.ouvert ? 'ouvert' : 'fermé') + ', ' + r];
    });
    await controle('c : livrable, avant-projet (puce « Avant-projet ») : les ordres relevés sont ceux de sortie(\'pdfAvp\') ; puces « État des lieux » | « Avant-projet »', async () => {
      const e0 = await etat(p);
      await bouton(p, 'plan', 'avp');
      await attendreQue(p, () => { const S = window.__vcEd.etat; return S.pp && S.pp.mode === 'avp' && !S.pp.calcul; });
      await attendre(p);
      const e1 = await etat(p), n = await p.evaluate(() => window.__ppT.sortieEspionnee('pdfAvp')), ec = await p.evaluate(() => window.__ppT.ecartApercuLivrable());
      const dif = await p.evaluate(() => window.__ppT.ecartGarde('edl0'));
      return [e0.plans.join() === 'edl:true,avp:false' && e1.plans.join() === 'edl:false,avp:true' && e1.pp.mode === 'avp' && e1.pp.z === 1 && n === 1 && !ec && !!dif,
        e0.plans.join() + ' → ' + e1.plans.join() + ', ' + (ec ? 'écart ' + ec : 'mêmes ordres') + (dif ? '' : ', ordres de l\'état des lieux')];
    });
    await controle('h : « Repères » : tirets du cadre utile (cyan) et aplat des zones réservées (nord, échelle graphique) présents avec les repères, absents sans eux ; aria-pressed', async () => {
      await bouton(p, 'plan', 'edl'); await attendreQue(p, () => { const S = window.__vcEd.etat; return S.pp && S.pp.mode === 'edl' && !S.pp.calcul; }); await attendre(p);
      const ligne = () => p.evaluate(() => { const s = window.__vcEd.etat.pp, c = s.chev.cadre; const b = window.__ppT.boiteCv([c[0], c[1], c[2], c[1]]); return window.__ppT.pixels([b[0], b[1] - 2, b[2], b[1] + 3]); });
      /* l'intérieur des deux zones réservées (zonesReservees du cadre c, à 1 mm de leurs bords) : la place du nord en haut à droite, le début
         de celle de l'échelle graphique en bas à gauche (elle va au moins jusqu'à c[0] + 38 mm) ; part des pixels teintés par l'aplat */
      const zones = () => p.evaluate(() => { const c = window.__vcEd.etat.pp.chev.cadre, T = window.__ppT;
        return [T.teinte([c[2] - 21, c[1] + 2, c[2] - 1, c[1] + 22]), T.teinte([c[0] + 5, c[3] - 13, c[0] + 30, c[3] - 5])].map(z => z.n ? z.t / z.n : -1); });
      const sans = await ligne(), zs = await zones(), e0 = await etat(p);
      await bouton(p, 'reperes'); await attendreQue(p, () => window.__vcEd.etat.pp.reperes); await attendre(p);
      const avec = await ligne(), za = await zones(), e1 = await etat(p);
      await bouton(p, 'reperes'); await attendreQue(p, () => !window.__vcEd.etat.pp.reperes); await attendre(p);
      const apres = await ligne(), zp = await zones();
      const cadre = await p.evaluate(() => JSON.stringify(window.__vcEd.etat.pp.chev.cadre));
      return [sans.cyan === 0 && avec.cyan > 30 && apres.cyan === 0 && e0.reperesBtn === 'false' && e1.reperesBtn === 'true' && cadre === '[7,7,212,199]'
        && zs.every(z => z === 0) && za.every(z => z > 0.3) && zp.every(z => z === 0),
        'cyan ' + sans.cyan + ' → ' + avec.cyan + ' → ' + apres.cyan + ' ; zones teintées ' + [zs, za, zp].map(z => z.map(f3).join('/')).join(' → ') + ' ; ' + e0.reperesBtn + ' → ' + e1.reperesBtn + ' ; cadre ' + cadre];
    });
    await controle('h : échelle : « Échelle : Auto (1/E) » en automatique, « Échelle : 1/200 » à l\'échelle imposée ; pas de bandeau', async () => {
      const E = await p.evaluate(() => window.VCroquis.echellesPlans(window.__vcEd.etat.doc).edl), e0 = await etat(p);
      await fermerApercu(p);
      await p.evaluate(() => { const ed = window.__vcEd; ed.etat.doc.echelle = 200; ed.synchroniser(); });
      await ouvrirApercu(p);
      const e1 = await etat(p);
      await fermerApercu(p);
      await p.evaluate(() => { const ed = window.__vcEd; ed.etat.doc.echelle = 0; ed.synchroniser(); });
      return [e0.echelle === 'Échelle : Auto (1/' + E + ')' && e1.echelle === 'Échelle : 1/200' && e0.bandeau === '' && e1.bandeau === '', JSON.stringify([e0.echelle, e1.echelle, e0.bandeau, e1.bandeau])];
    });
    await controle('c : fraîcheur : fermer, déplacer un objet du croquis, rouvrir : les ordres sont de nouveau ceux de sortie(\'pdfEdl\') et diffèrent de ceux d\'avant', async () => {
      await fermerApercu(p);
      await p.evaluate(() => { const ed = window.__vcEd, e = ed.etat.doc.el.find(x => x.k === 'pt' && x.t !== 'jonction'); e.x += 1.5; e.y -= 1; ed.synchroniser(); });
      await ouvrirApercu(p);
      const n = await p.evaluate(() => window.__ppT.sortieEspionnee('pdfEdl')), ec = await p.evaluate(() => window.__ppT.ecartApercuLivrable()), dif = await p.evaluate(() => window.__ppT.ecartGarde('edl0'));
      return [n === 1 && !ec && !!dif, (ec ? 'écart avec le livrable : ' + ec : 'mêmes ordres que le livrable') + (dif ? ', différents d\'avant' : ', mêmes qu\'avant')];
    });
    erreurs(A, 'démonstration');
  } finally { await A.fermer(); }
}

/* ---------- f : zoom et gestes, sur la démonstration ---------- */
async function zoom(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await demo(p); const pb = await ouvrirOuNoter(p);
    await controle('f : puces « Page », « × 2 », « × 4 » : z et aria-pressed ; « Page » recentre ; × 2 et × 4 autour du centre de la zone', async () => {
      if (pb) return [false, pb];
      const e1 = await etat(p), c1 = centrePage(e1);
      await bouton(p, 'zoom', 2); await attendreQue(p, () => window.__vcEd.etat.pp.z === 2); await attendre(p); const e2 = await etat(p), c2 = centrePage(e2);
      await bouton(p, 'zoom', 4); await attendreQue(p, () => window.__vcEd.etat.pp.z === 4); await attendre(p); const e4 = await etat(p), c4 = centrePage(e4);
      await bouton(p, 'zoom', 1); await attendreQue(p, () => window.__vcEd.etat.pp.z === 1); await attendre(p); const e5 = await etat(p);
      const pres = (a, b) => Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6;
      return [centree(e1) && e1.zoom.join() === 'Page:true,× 2:false,× 4:false' && e2.zoom.join() === 'Page:false,× 2:true,× 4:false' && e4.zoom.join() === 'Page:false,× 2:false,× 4:true'
        && Math.abs(e2.pp.k - 2 * e1.pp.k) < 1e-9 && Math.abs(e4.pp.k - 4 * e1.pp.k) < 1e-9 && pres(c1, c2) && pres(c1, c4) && centree(e5) && e5.zoom.join() === 'Page:true,× 2:false,× 4:false',
        [e1, e2, e4, e5].map(e => e.zoom.join('/')).join(' ; ') + ' ; centres ' + [c1, c2, c4].map(c => f3(c.x) + ',' + f3(c.y)).join(' ')];
    });
    await controle('f : molette : zoom autour du pointeur, borné à 8 puis à 1 (page recentrée) ; rendu 150 ms après le dernier cran', async () => {
      if (pb) return [false, pb];
      const e0 = await etat(p), c = dansZone(e0, e0.zone.w / 2 + 40, e0.zone.h / 2 - 30);
      await p.mouse.move(c.x, c.y); await p.mouse.wheel(0, -400); await C.pause(p, 40);
      const e1 = await etat(p);
      await attendre(p); const e2 = await etat(p);
      await p.mouse.wheel(0, -6000); await C.pause(p, 60); await attendre(p); const e3 = await etat(p);
      await p.mouse.wheel(0, 9000); await C.pause(p, 60); await attendre(p); const e4 = await etat(p);
      const z1 = Math.pow(1.0018, 400);
      return [Math.abs(e2.pp.z - z1) < 1e-6 && !!e1.transform && !e2.transform && e3.pp.z === 8 && e4.pp.z === 1 && centree(e4),
        'z ' + [e2, e3, e4].map(e => f3(e.pp.z)).join(' → ') + ' (attendu ' + f3(z1) + ', 8, 1) ; transformation pendant le geste : ' + (e1.transform ? 'oui' : 'non')];
    });
    await controle('f : pince à deux doigts (CDP) : z change, rendu refait à la fin (canevas sans transformation)', async () => {
      if (pb) return [false, pb];
      const e0 = await etat(p), c = dansZone(e0, e0.zone.w / 2, e0.zone.h / 2);
      await pincer(p, c, 40, 120); await attendre(p); const e1 = await etat(p);
      const cp1 = centrePage(e1);
      const bon = e1.pp.z > 2 && e1.pp.z <= 8 && !e1.transform && cp1.x >= 0 && cp1.x <= 297 && cp1.y >= 0 && cp1.y <= 210;
      await bouton(p, 'zoom', 1); await attendreQue(p, () => window.__vcEd.etat.pp.z === 1); await attendre(p); await C.pause(p, 450);
      return [bon, 'z ' + f3(e0.pp.z) + ' → ' + f3(e1.pp.z) + ', transformation « ' + e1.transform + ' »'];
    });
    await controle('f : déplacement au doigt : rien à × 1 ; à × 2, la page suit le doigt, bornée (le point du centre de la zone reste sur la page)', async () => {
      if (pb) return [false, pb];
      const e0 = await etat(p), c = dansZone(e0, e0.zone.w / 2, e0.zone.h / 2);
      await glisserDoigt(p, c, {x: c.x - 120, y: c.y - 80}); await C.pause(p, 100); await attendre(p); const e1 = await etat(p);
      await bouton(p, 'zoom', 2); await attendreQue(p, () => window.__vcEd.etat.pp.z === 2); await attendre(p); const e2 = await etat(p);
      await glisserDoigt(p, c, {x: c.x - 80, y: c.y - 50}); await attendre(p); const e3 = await etat(p);
      const a = dansZone(e0, e0.zone.w - 20, e0.zone.h - 20), b = dansZone(e0, 20, 20);
      await glisserDoigt(p, a, b); await attendre(p); const e4 = await etat(p), c4 = centrePage(e4);
      const dx = e3.pp.ox - e2.pp.ox, dy = e3.pp.oy - e2.pp.oy;
      return [e1.pp.ox === e0.pp.ox && e1.pp.oy === e0.pp.oy && Math.abs(dx + 80) < 1.5 && Math.abs(dy + 50) < 1.5 && Math.abs(c4.x - 297) < 1e-6 && c4.y >= -1e-6 && c4.y <= 210 + 1e-6 && e4.pp.z === 2,
        'à × 1 : ' + f3(e1.pp.ox - e0.pp.ox) + ', ' + f3(e1.pp.oy - e0.pp.oy) + ' ; à × 2 : ' + f3(dx) + ', ' + f3(dy) + ' ; borne : centre ' + f3(c4.x) + ', ' + f3(c4.y)];
    });
    await controle('f : double toucher dans le vide : × 1 → × 2 (autour du point) → × 1 (page recentrée)', async () => {
      if (pb) return [false, pb];
      await bouton(p, 'zoom', 1); await attendreQue(p, () => window.__vcEd.etat.pp.z === 1); await attendre(p); await C.pause(p, 450);
      const e0 = await etat(p), q = vide(e0);
      await toucher(p, q, 90); await toucher(p, q, 60); await attendre(p); const e1 = await etat(p);
      await C.pause(p, 400);
      const q1 = vide(e1);
      await toucher(p, q1, 90); await toucher(p, q1, 60); await attendre(p); const e2 = await etat(p);
      return [e0.pp.z === 1 && e1.pp.z === 2 && e2.pp.z === 1 && centree(e2) && e1.pp.choix === -1, 'z ' + [e0, e1, e2].map(e => e.pp.z).join(' → ')];
    });
    await controle('f : toucher, glisser, toucher au même endroit en moins de 380 ms : pas un double toucher (z gardé à × 4, le glissé appliqué)', async () => {
      if (pb) return [false, pb];
      /* × 4, le centre de la zone poussé contre le bord droit de la page (trois glissés vers la gauche, la borne arrête la page) : la droite
         de la zone est hors de la page, donc vide */
      await bouton(p, 'zoom', 4); await attendreQue(p, () => window.__vcEd.etat.pp.z === 4); await attendre(p);
      const e0 = await etat(p);
      for (let r = 0; r < 3; r++){ await glisserDoigt(p, dansZone(e0, e0.zone.w - 20, e0.zone.h / 2), dansZone(e0, 20, e0.zone.h / 2)); await attendre(p); await C.pause(p, 450); }
      const e1 = await etat(p), q = dansZone(e1, e1.zone.w * 0.8, e1.zone.h / 2), xq = (e1.zone.w * 0.8 - e1.pp.ox) / e1.pp.k;
      const s = await p.context().newCDPSession(p), t = (type, pts) => s.send('Input.dispatchTouchEvent', {type, touchPoints: pts});
      /* glissé vif à dessein, sans LEVER : la suite reste brève (moins de 330 ms), et le troisième toucher n'a besoin que de pointerdown
         et de pointerup, que la glissade laisse passer (il l'arrête) */
      let dt = 0;
      try {
        const t0 = Date.now();
        await t('touchStart', [{x: q.x, y: q.y, id: 1}]); await t('touchEnd', []);
        await t('touchStart', [{x: q.x, y: q.y, id: 2}]);
        for (let k = 1; k <= 6; k++) await t('touchMove', [{x: q.x + 10 * k, y: q.y, id: 2}]);
        await t('touchEnd', []);
        dt = Date.now() - t0;
        await t('touchStart', [{x: q.x, y: q.y, id: 3}]); await t('touchEnd', []);
      } finally { await s.detach(); }
      await C.pause(p, 100); await attendre(p); const e2 = await etat(p);
      await bouton(p, 'zoom', 1); await attendreQue(p, () => window.__vcEd.etat.pp.z === 1); await attendre(p); await C.pause(p, 450);
      return [xq > 297 && dt < 330 && e2.pp.z === 4 && Math.abs(e2.pp.ox - e1.pp.ox - 60) < 1.5,
        'point touché à ' + f3(xq) + ' mm (hors de la page), ' + dt + ' ms jusqu\'au second toucher ; z ' + e2.pp.z + ', glissé de ' + f3(e2.pp.ox - e1.pp.ox) + ' px (attendus 60)'];
    });
    await controle('f : trois doigts : lever un doigt de la pince la finit (rendu refait, plus de transformation) ; les deux doigts restants ne bougent plus la page', async () => {
      if (pb) return [false, pb];
      const e0 = await etat(p), c = dansZone(e0, e0.zone.w / 2, e0.zone.h / 2);
      const s = await p.context().newCDPSession(p), t = (type, pts) => s.send('Input.dispatchTouchEvent', {type, touchPoints: pts});
      const pt = (dx, id) => ({x: c.x + dx, y: c.y, id}), d3 = {x: c.x, y: c.y + 100, id: 3};
      let e1 = null, e2 = null;
      try {
        await t('touchStart', [pt(-40, 1)]); await C.pause(p, 30);
        await t('touchStart', [pt(-40, 1), pt(40, 2)]);
        for (let k = 1; k <= 6; k++){ const d = 40 + 10 * k; await t('touchMove', [pt(-d, 1), pt(d, 2)]); }
        await t('touchStart', [pt(-100, 1), pt(100, 2), d3]);
        await t('touchEnd', [pt(-100, 1)]);
        await C.pause(p, 150); e1 = await etat(p);
        for (let k = 1; k <= 4; k++) await t('touchMove', [pt(100 + 15 * k, 2), {x: d3.x, y: d3.y + 15 * k, id: 3}]);
        await C.pause(p, 150); e2 = await etat(p);
        await t('touchEnd', []);
      } finally { await s.detach(); }
      await C.pause(p, 150); await attendre(p); const e3 = await etat(p);
      await bouton(p, 'zoom', 1); await attendreQue(p, () => window.__vcEd.etat.pp.z === 1); await attendre(p); await C.pause(p, 450);
      return [e1.pp.z > 1.5 && !e1.transform && !e2.transform && e2.pp.z === e1.pp.z && e2.pp.ox === e1.pp.ox && e3.pp.z === e1.pp.z && e3.pp.choix === -1,
        'z ' + f3(e0.pp.z) + ' → ' + f3(e1.pp.z) + ', transformation après le lever « ' + e1.transform + ' », puis « ' + e2.transform + ' » ; z ensuite ' + f3(e2.pp.z) + ', ' + f3(e3.pp.z)];
    });
    erreurs(A, 'zoom');
  } finally { await A.fermer(); }
}

/* ---------- d, e : compteur et parcours ---------- */
async function compteur(){
  const A = await croquisNeuf(), p = A.p;
  try {
    const cas = [['aucun', 'Aucun chevauchement'], ['un', '1 chevauchement'], ['trois', /^[2-9] chevauchements$/], ['coupe1', 'Aucun chevauchement · 1 coupé par le cadre'],
      ['coupe2', 'Aucun chevauchement · 2 coupés par le cadre']];
    for (const [k, att] of cas){
      await controle('d : compteur, dessin « ' + k + ' » : ' + att + (k === 'aucun' ? ' ; « ‹ » et « › » désactivés' : ''), async () => {
        await fermerApercu(p); await dessin(p, D[k]()); await ouvrirApercu(p);
        const e = await etat(p), bon = typeof att === 'string' ? e.compte === att : att.test(e.compte);
        return [bon && (k !== 'aucun' || (e.prec === true && e.suiv === true)) && (k === 'aucun' || e.prec === false), '« ' + e.compte + ' » ; ‹ ' + e.prec + ', › ' + e.suiv + ' ; ' + e.nPaires + ' paires, ' + e.nCoupes + ' coupes'];
      });
    }
    /* reprise de m168 (A17) : chaque pas choisit le déplaçable de l'entrée (avant : aucun) et nomme d'abord celui-ci : dans la paire de deux
       étiquettes, celle du dessus (B, la dernière dessinée). Ici, l'ordre de lecture est celui du moteur (la paire, plus haute, puis la coupe) */
    await controle('e : parcours « › », « › », « ‹ », boucle dans les deux sens ; textes « 1/2 · … se chevauchent. » (l\'étiquette du dessus nommée d\'abord) et « 2/2 · … sort du cadre. » ; à chaque pas, le déplaçable choisi (reprise : avant, aucun)', async () => {
      await fermerApercu(p); await dessin(p, D.parcours()); await ouvrirApercu(p);
      const M = await marques(p), et = id => { const m = M.find(m => m.k === 'etiq' && m.id === id); return m ? m.i : -1; };
      const pas = async b => { const i0 = (await etat(p)).pp.iListe; await bouton(p, b); await attendreQue(p, i0 => window.__vcEd.etat.pp.iListe !== i0, i0); return etat(p); };
      const e0 = await etat(p), s1 = await pas('suiv'), s2 = await pas('suiv'), s3 = await pas('prec'), s4 = await pas('prec'), s5 = await pas('suiv');
      const P = '1/2 · L\'étiquette « Regard fictif B » et l\'étiquette « Regard fictif A » se chevauchent.', Cq = '2/2 · L\'étiquette « Regard fictif C » sort du cadre.';
      const suite = [s1, s2, s3, s4, s5].map(e => e.pp.iListe).join(), ch = [s1, s2, s3, s4, s5].map(e => e.pp.choix).join(), att = [et('B'), et('Cc'), et('B'), et('Cc'), et('B')].join();
      return [e0.compte === '1 chevauchement · 1 coupé par le cadre' && e0.pp.iListe === -1 && suite === '0,1,0,1,0' && s1.info === P && s2.info === Cq && s3.info === P && s4.info === Cq
        && s5.info === P && et('B') > et('A') && ch === att,
        '« ' + e0.compte + ' » ; rangs ' + suite + ' ; choix ' + ch + ' (attendus ' + att + ') ; « ' + s1.info + ' » ; « ' + s2.info + ' »'];
    });
    await controle('e : « ‹ » depuis aucune entrée : la dernière, son élément coupé choisi (reprise) ; un toucher dans le vide efface le parcours (texte d\'invite)', async () => {
      const e0 = await etat(p), iC = ((await marques(p)).find(m => m.k === 'etiq' && m.id === 'Cc') || {i: -1}).i;
      await toucher(p, vide(e0)); const e1 = await etat(p);
      await bouton(p, 'prec'); await attendreQue(p, () => window.__vcEd.etat.pp.iListe === 1); const e2 = await etat(p);
      return [e1.pp.iListe === -1 && e1.pp.choix === -1 && e1.info === INVITE && e2.pp.iListe === 1 && e2.pp.choix === iC && e2.info === '2/2 · L\'étiquette « Regard fictif C » sort du cadre.',
        'rangs ' + e0.pp.iListe + ' → ' + e1.pp.iListe + ' → ' + e2.pp.iListe + ' ; choix ' + e2.pp.choix + ' (attendu ' + iC + ') ; « ' + e1.info + ' »'];
    });
    /* reprise de m168 (A17) : remplace « à × 4, « › » centre la vue … ; à × 1, rien ne bouge » ; le point de l'entrée est pris dans les marques
       attendues (la paire A-B, puis la coupe de Cc), plus dans l'ordre du moteur */
    await controle('e : « › » montre l\'entrée à × 2, centrée sur le centre de la boîte de ses formes (à 1 px près), depuis « Page » (× 1) comme depuis × 4 (reprise : avant, centrée à z > 1 seulement, z inchangé)', async () => {
      const M = await marques(p), et = id => { const m = M.find(m => m.k === 'etiq' && m.id === id); return m ? m.i : -1; }, res = [];
      for (const [z0, att, ids] of [[1, 0, [et('A'), et('B')]], [4, 1, [et('Cc')]]]){
        await bouton(p, 'zoom', z0); await attendreQue(p, z0 => window.__vcEd.etat.pp.z === z0, z0); await attendre(p);
        await bouton(p, 'suiv'); await attendreQue(p, att => window.__vcEd.etat.pp.iListe === att, att); await attendre(p);
        const e = await etat(p), d = ecartCentre(e, centreMarques(M, ids));
        res.push({z0, z: e.pp.z, dx: d.dx, dy: d.dy});
      }
      return [res.every(r => r.z === 2 && Math.abs(r.dx) <= 1 && Math.abs(r.dy) <= 1),
        res.map(r => 'depuis × ' + r.z0 + ' : z ' + f3(r.z) + ', écart ' + f3(r.dx) + ', ' + f3(r.dy) + ' px').join(' ; ')];
    });
    /* ---------- e, reprise de m168 (A17) : « ‹ › » dans l'ordre de lecture, vue « × 2 » centrée, déplaçable choisi (dessin « lecture ») ---------- */
    await fermerApercu(p); await dessin(p, D.lecture()); const pbL = await ouvrirOuNoter(p);
    const ML = pbL ? [] : await marques(p), et = id => { const m = ML.find(m => m.k === 'etiq' && m.id === id); return m ? m.i : -1; };
    const iH = (ML.find(m => m.k === 'symb' && m.id === 'H') || {i: -1}).i, TX = Object.fromEntries(D.lecture().filter(o => o.p.etiq).map(o => [o.id, o.p.etiq]));
    /* l'ordre attendu, écrit en dur : la coupe de Cc (la plus haute), les paires A-B puis E-F (même hauteur à 0,1 mm près ; A-B à gauche),
       l'étiquette de G sur le symbole de H (la plus basse) ; pour chacune, ses marques, le déplaçable choisi d'abord (dans une paire de deux
       étiquettes, celle du dessus, B ou F : vérifié plus bas), et le texte de sa ligne d'info */
    const ORDRE = [
      {nom: 'C', ids: [et('Cc')], info: 'L\'étiquette « Regard fictif C » sort du cadre.'},
      {nom: 'A-B', ids: [et('B'), et('A')], info: 'L\'étiquette « Regard fictif B » et l\'étiquette « Regard fictif A » se chevauchent.'},
      {nom: 'E-F', ids: [et('F'), et('E')], info: 'L\'étiquette « Regard fictif F » et l\'étiquette « Regard fictif E » se chevauchent.'},
      {nom: 'G-H', ids: [et('G'), iH], info: 'L\'étiquette « Regard fictif G » et le symbole « Regard » se chevauchent.'}];
    const ligne = k => (k + 1) + '/4 · ' + ORDRE[k].info;
    const ep = i => p.evaluate(i => window.__ppT.epaisseur(i), i);
    let av = [], ar = [];
    await controle('e : ordre de lecture (reprise, A17) : « › » fait le tour de haut en bas puis de gauche à droite (coupe de Cc, paires A-B et E-F à la même hauteur à 0,1 mm près, G sur le symbole de H) et revient à la première ; « ‹ » le parcourt à rebours ; l\'ordre écrit en dur est celui des centres des boîtes (à 0,1 mm), et pas celui du moteur, ni celui qu\'on aurait sans l\'arrondi ou avec le centre du seul déplaçable', async () => {
      if (pbL) return [false, pbL];
      const cle = ids => ids.slice().sort((a, b) => a - b).join('+'), att = ORDRE.map(o => cle(o.ids));
      const moteur = await p.evaluate(() => { const c = window.__vcEd.etat.pp.chev; return c.paires.map(x => x.a + '+' + x.b).concat(c.coupes.map(x => String(x.i))); });
      const ctr = ORDRE.map(o => { const u = centreMarques(ML, o.ids); return {x: Math.round(u.x * 10), y: Math.round(u.y * 10)}; });
      const lecture = ctr.every((c, k) => !k || ctr[k - 1].y < c.y || (ctr[k - 1].y === c.y && ctr[k - 1].x < c.x));
      /* le dessin met à l'épreuve l'arrondi et la clé prise sur l'union des formes : sans l'arrondi (centres bruts), ou avec le centre du seul
         déplaçable (B, F), E-F passerait avant A-B */
      const brut = ORDRE.map(o => centreMarques(ML, o.ids)), seul = ORDRE.map(o => centreMarques(ML, o.ids.slice(0, 1)));
      const piege = brut[1].y > brut[2].y && Math.round(seul[1].y * 10) > Math.round(seul[2].y * 10);
      const pas = async b => { const i0 = (await etat(p)).pp.iListe; await bouton(p, b); await attendreQue(p, i0 => window.__vcEd.etat.pp.iListe !== i0, i0); return etat(p); };
      for (let k = 0; k < 5; k++) av.push(await pas('suiv'));
      for (let k = 0; k < 5; k++) ar.push(await pas('prec'));
      const lAv = av.map(e => e.info), lAr = ar.map(e => e.info), tAv = [0, 1, 2, 3, 0].map(ligne), tAr = [3, 2, 1, 0, 3].map(ligne);
      const bon = moteur.slice().sort().join() === att.slice().sort().join() && moteur.join() !== att.join() && lecture && ctr[1].y === ctr[2].y && ctr[0].y < ctr[1].y
        && piege && lAv.join('|') === tAv.join('|') && lAr.join('|') === tAr.join('|');
      const ecart = (L, T) => { const k = L.findIndex((x, j) => x !== T[j]); return k < 0 ? '' : ' ; pas ' + (k + 1) + ' : « ' + L[k] + ' » au lieu de « ' + T[k] + ' »'; };
      return [bon, 'moteur ' + moteur.join(' ') + ', attendu ' + att.join(' ') + ' ; centres (0,1 mm) ' + ctr.map(c => c.x + ',' + c.y).join(' ') + (lecture ? '' : ' hors de l\'ordre de lecture')
        + ' ; hauteurs A-B ' + brut[1].y.toFixed(4) + ' (B seul ' + seul[1].y.toFixed(4) + '), E-F ' + brut[2].y.toFixed(4) + ' mm' + (piege ? '' : ' : le dessin ne met plus à l\'épreuve l\'arrondi ni la clé de l\'union')
        + ' ; rangs › ' + av.map(e => e.pp.iListe).join() + ', ‹ ' + ar.map(e => e.pp.iListe).join() + ecart(lAv, tAv) + ecart(lAr, tAr)];
    });
    await controle('e : déplaçable choisi à chaque pas (reprise, A17) : la coupe, son étiquette (Cc) ; une paire de deux étiquettes, celle du dessus (indice le plus grand : B, F), nommée la première ; l\'étiquette contre un symbole (G)', async () => {
      if (pbL) return [false, pbL];
      if (av.length < 4) return [false, 'parcours non fait'];
      const ch = av.slice(0, 4).map(e => e.pp.choix), att = ORDRE.map(o => o.ids[0]), dessus = et('B') === Math.max(et('A'), et('B')) && et('F') === Math.max(et('E'), et('F'));
      const premier = av.slice(0, 4).every((e, k) => { const m = ML[e.pp.choix]; return !!m && e.info.indexOf((k + 1) + '/4 · L\'étiquette « ' + TX[m.id] + ' »') === 0; });
      return [dessus && ch.join() === att.join() && premier && ar.slice(0, 4).every((e, k) => e.pp.choix === ORDRE[[3, 2, 1, 0][k]].ids[0]),
        'choix ' + ch.join() + ' (attendus ' + att.join() + ') ; à rebours ' + ar.slice(0, 4).map(e => e.pp.choix).join() + ' ; indices A ' + et('A') + ', B ' + et('B') + ', E ' + et('E') + ', F ' + et('F')];
    });
    await controle('e : « › » montre l\'entrée à × 2 (reprise, A17) : depuis « Page », depuis × 4 et après la molette, z = 2, puce « × 2 » pressée, le centre de la boîte de l\'entrée au centre de la zone (à 1 px près), son déplaçable choisi, la ligne d\'info du parcours', async () => {
      if (pbL) return [false, pbL];
      const res = [];
      const avant = [['Page', () => bouton(p, 'zoom', 1), z => z === 1], ['× 4', () => bouton(p, 'zoom', 4), z => z === 4],
        ['molette', async () => { const e = await etat(p), c = dansZone(e, e.zone.w / 2, e.zone.h / 2); await p.mouse.move(c.x, c.y); await p.mouse.wheel(0, -300); }, z => z > 2.5 && z < 8]];
      for (const [nom, fn, ok] of avant){
        await fn(); await C.pause(p, 60); await attendre(p);
        const e0 = await etat(p), i0 = e0.pp.iListe;
        await bouton(p, 'suiv'); await attendreQue(p, i0 => window.__vcEd.etat.pp.iListe !== i0, i0); await attendre(p);
        const e = await etat(p), k = e.pp.iListe, d = k >= 0 ? ecartCentre(e, centreMarques(ML, ORDRE[k].ids)) : {dx: NaN, dy: NaN};
        res.push({nom, avant: ok(e0.pp.z), z0: e0.pp.z, z: e.pp.z, zoom: e.zoom.join(' '), dx: d.dx, dy: d.dy, choix: k >= 0 && e.pp.choix === ORDRE[k].ids[0], info: k >= 0 && e.info === ligne(k), k});
      }
      return [res.length === 3 && res.every(r => r.avant && r.z === 2 && r.zoom === 'Page:false × 2:true × 4:false' && Math.abs(r.dx) <= 1 && Math.abs(r.dy) <= 1 && r.choix && r.info),
        res.map(r => r.nom + ' (z ' + f3(r.z0) + ') → rang ' + r.k + ', z ' + f3(r.z) + ', « ' + r.zoom + ' », écart ' + f3(r.dx) + ', ' + f3(r.dy) + ' px, choix ' + r.choix + ', ligne ' + r.info).join(' ; ')];
    });
    /* le contour de base se mesure dans la même vue : un toucher dans le vide efface le choix et le parcours sans bouger la vue ; trois « › »
       retrouvent ensuite la paire E-F, à la même vue, pour le contrôle suivant. Dans cette vue à × 2, le liseré fort n'épaissit le trait
       mesuré que d'environ 0,3 px (0,75 px à × 1, contrôle g) ; d'où les seuils : plus de 0,15 px pour F, moins de 0,1 px d'écart pour E
       (dans la même vue, son trait de base est le même) */
    await controle('e : pendant le parcours, le liseré fort (2,5 px sur un liseré blanc) entoure le seul déplaçable choisi (F) ; l\'autre étiquette de la paire (E) garde le contour de base, mesuré dans la même vue sans choix ni parcours (reprise : avant, rien n\'est choisi)', async () => {
      if (pbL) return [false, pbL];
      const e = await etat(p); if (e.pp.iListe !== 2) return [false, 'pas sur la paire E-F (rang ' + e.pp.iListe + ')'];
      const vue = x => [x.pp.z, x.pp.k, x.pp.ox, x.pp.oy].join(), eF = await ep(et('F')), eE = await ep(et('E'));
      await toucher(p, vide(e)); const e0 = await etat(p), bF = await ep(et('F')), bE = await ep(et('E'));
      for (let k = 0; k < 3; k++){ const i0 = (await etat(p)).pp.iListe; await bouton(p, 'suiv'); await attendreQue(p, i0 => window.__vcEd.etat.pp.iListe !== i0, i0); }
      await attendre(p); const e1 = await etat(p);
      const meme = vue(e0) === vue(e) && e0.pp.choix === -1 && e0.pp.iListe === -1 && vue(e1) === vue(e) && e1.pp.iListe === 2 && e1.pp.choix === et('F');
      return [e.pp.choix === et('F') && meme && bF > 1.2 && bE > 1.2 && eF - bF > 0.15 && Math.abs(eE - bE) < 0.1,
        'trait orange de F ' + f3(eF) + ' px, de E ' + f3(eE) + ' px ; même vue, sans choix ni parcours : F ' + f3(bF) + ', E ' + f3(bE) + ' px'
        + (meme ? '' : ' ; vue ou état changés (vue ' + vue(e) + ' | ' + vue(e0) + ' | ' + vue(e1) + ' ; rang ' + e1.pp.iListe + ', choix ' + e1.pp.choix + ')')];
    });
    await controle('e : après « › », un toucher sur l\'autre étiquette de la paire (E) prend la main (parcours effacé, texte du choix) ; un toucher dans le vide efface le choix et le parcours (invite)', async () => {
      if (pbL) return [false, pbL];
      const e0 = await etat(p), mE = ML[et('E')];
      const pre = e0.pp.iListe === 2 && e0.pp.choix === et('F') && e0.info === ligne(2);
      await toucher(p, await p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [mE.b[0] + 2, (mE.b[1] + mE.b[3]) / 2])); const e1 = await etat(p);
      await toucher(p, vide(e1)); const e2 = await etat(p);
      return [pre && e1.pp.choix === et('E') && e1.pp.iListe === -1 && e1.info === 'Étiquette « Regard fictif E » · chevauche l\'étiquette « Regard fictif F »'
        && e2.pp.choix === -1 && e2.pp.iListe === -1 && e2.info === INVITE,
        'avant : rang ' + e0.pp.iListe + ', choix ' + e0.pp.choix + ' ; toucher sur E : rang ' + e1.pp.iListe + ', choix ' + e1.pp.choix + ', « ' + e1.info + ' » ; dans le vide : rang ' + e2.pp.iListe + ', choix ' + e2.pp.choix + ', « ' + e2.info + ' »'];
    });
    await controle('e : « ‹ » depuis aucune entrée : la dernière de l\'ordre de lecture (G sur le symbole de H ; reprise : avant, la dernière du moteur, la coupe), à × 2 et centrée, son étiquette choisie', async () => {
      if (pbL) return [false, pbL];
      const e0 = await etat(p);
      await bouton(p, 'prec'); await attendreQue(p, () => window.__vcEd.etat.pp.iListe >= 0); await attendre(p); const e1 = await etat(p), d = ecartCentre(e1, centreMarques(ML, ORDRE[3].ids));
      return [e0.pp.iListe === -1 && e1.pp.iListe === 3 && e1.pp.choix === et('G') && e1.pp.z === 2 && Math.abs(d.dx) <= 1 && Math.abs(d.dy) <= 1 && e1.info === ligne(3),
        'rang ' + e0.pp.iListe + ' → ' + e1.pp.iListe + ', choix ' + e1.pp.choix + ' (attendu ' + et('G') + '), z ' + f3(e1.pp.z) + ', écart ' + f3(d.dx) + ', ' + f3(d.dy) + ' px ; « ' + e1.info + ' »'];
    });
    /* reprise de m168 (A17) : « ‹ › » efface le dernier toucher (ppTap). Le toucher qui suit est donc un premier toucher : il prend l'étiquette
       du dessus (B), même au même endroit que le toucher d'avant et dans la même vue ; sans cela, il passerait à celle de dessous (A) */
    await controle('e : après « › », un toucher au même endroit que le toucher d\'avant (même vue, plus de 380 ms après) est un premier toucher : il choisit l\'étiquette du dessus (B), pas celle de dessous (reprise)', async () => {
      await fermerApercu(p); await dessin(p, D.un()); const pb = await ouvrirOuNoter(p); if (pb) return [false, pb];
      const M = await marques(p), et = id => { const m = M.find(m => m.k === 'etiq' && m.id === id); return m ? m.i : -1; }, vue = x => [x.pp.z, x.pp.k, x.pp.ox, x.pp.oy].join();
      const suiv = async () => { await bouton(p, 'suiv'); await attendreQue(p, () => window.__vcEd.etat.pp.iListe === 0); await attendre(p); return etat(p); };
      const e1 = await suiv(), c = dansZone(e1, e1.zone.w / 2, e1.zone.h / 2);
      await toucher(p, c); const e2 = await etat(p);
      const e3 = await suiv(); await toucher(p, c); const e4 = await etat(p);
      return [et('B') > et('A') && e2.pp.choix === et('B') && e2.pp.iListe === -1 && e3.pp.iListe === 0 && vue(e3) === vue(e1) && e4.pp.choix === et('B') && e4.pp.iListe === -1
        && e4.info === 'Étiquette « Regard fictif B » · chevauche l\'étiquette « Regard fictif A »',
        'premier toucher : choix ' + e2.pp.choix + ' (B ' + et('B') + ', A ' + et('A') + ') ; « › » : rang ' + e3.pp.iListe + (vue(e3) === vue(e1) ? ', même vue' : ', vue changée')
        + ' ; toucher au même endroit : choix ' + e4.pp.choix + ', rang ' + e4.pp.iListe + ', « ' + e4.info + ' »'];
    });
    /* reprise de m168 (A17, A8) : la vue du parcours garde les bornes d'A8 (le point de la page au centre de la zone reste sur la page) :
       l'étiquette de A, hors de la page à gauche, est montrée au bord gauche de la page, à la hauteur de son centre, et non au centre de la
       zone (question 11.5, objet hors du cadre, encore ouverte) */
    await controle('e : « › » sur une étiquette qui sort de la page (regard posé loin, 1/200) : × 2, son étiquette choisie, la vue au bord gauche de la page (bornes d\'A8) et centrée en hauteur (reprise)', async () => {
      await fermerApercu(p); await dessin(p, D.horsPage()); const pb = await ouvrirOuNoter(p); if (pb) return [false, pb];
      const M = await marques(p), iA = (M.find(m => m.k === 'etiq' && m.id === 'A') || {i: -1}).i, mA = M[iA];
      if (!mA || !mA.b) return [false, 'pas d\'étiquette de A sur la page 1'];
      await bouton(p, 'suiv'); await attendreQue(p, () => window.__vcEd.etat.pp.iListe === 0); await attendre(p);
      const e = await etat(p), c = centrePage(e), d = ecartCentre(e, centreMarques(M, [iA]));
      return [mA.b[2] < 0 && e.pp.z === 2 && e.pp.choix === iA && Math.abs(c.x) < 1e-6 && Math.abs(d.dy) <= 1 && e.info === '1/3 · L\'étiquette « Regard fictif A » sort du cadre.',
        'boîte de A ' + mA.b.map(f3).join(', ') + ' mm ; z ' + f3(e.pp.z) + ', choix ' + e.pp.choix + ' (attendu ' + iA + ') ; centre de la vue ' + f3(c.x) + ', ' + f3(c.y)
        + ' mm ; écart de A au centre de la zone ' + f3(d.dx) + ', ' + f3(d.dy) + ' px ; « ' + e.info + ' »'];
    });
    await controle('e : noms : l\'étiquette et le symbole « Regard » (son libellé), la rose du nord', async () => {
      const lu = [];
      for (const k of ['symbole', 'nord']){
        await fermerApercu(p); await dessin(p, D[k]()); await ouvrirApercu(p);
        await bouton(p, 'suiv'); await attendreQue(p, () => window.__vcEd.etat.pp.iListe === 0);
        lu.push((await etat(p)).info);
      }
      return [lu[0] === '1/1 · L\'étiquette « Regard fictif A » et le symbole « Regard » se chevauchent.' && lu[1] === '1/1 · L\'étiquette « Regard N » et la rose du nord se chevauchent.', lu.join(' | ')];
    });
    /* reprise de m168 (A17) : la paire de la bulle est cherchée en parcourant la liste (son rang n'est plus celui de chev.paires) ; le
       déplaçable choisi y est nommé le premier (la bulle si elle est dessus : « La bulle n et … ») ; puis on touche cette bulle-là */
    await controle('e : noms : une bulle (démonstration, avant-projet) : « la bulle n » dans la ligne de sa paire, nommée la première si elle est le déplaçable choisi (reprise) ; « Bulle n » quand on touche cette bulle (même n)', async () => {
      await fermerApercu(p); await demo(p); await ouvrirApercu(p);
      await bouton(p, 'plan', 'avp'); await attendreQue(p, () => { const S = window.__vcEd.etat; return S.pp && S.pp.mode === 'avp' && !S.pp.calcul; }); await attendre(p);
      const e0 = await etat(p), N = e0.nPaires + e0.nCoupes, RX = /^\d+\/\d+ · (?:La bulle (\d+) et .+|.+ et la bulle (\d+)) se chevauchent\.$/;
      let e1 = null, r = null;
      for (let k = 0; k < N && !r; k++){
        const i0 = (await etat(p)).pp.iListe; await bouton(p, 'suiv'); await attendreQue(p, i0 => window.__vcEd.etat.pp.iListe !== i0, i0); await attendre(p);
        e1 = await etat(p); r = RX.exec(e1.info);
      }
      if (!r) return [false, 'aucune paire avec une bulle en ' + N + ' pas'];
      const num = Number(r[1] || r[2]), M = await marques(p), B = M.filter(m => m.k === 'bulle' && m.page === 1 && m.b && m.num === num), mc = M[e1.pp.choix];
      if (B.length !== 1) return [false, B.length + ' bulle(s) n° ' + num + ' sur la page 1'];
      await toucher(p, await p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [B[0].cx, B[0].cy]));
      const e2 = await etat(p);
      return [!!mc && /^(etiq|tx|bulle)$/.test(mc.k) && (mc.i === B[0].i) === !!r[1] && e2.pp.choix === B[0].i && new RegExp('^Bulle ' + num + '(?!\\d)').test(e2.info),
        '« ' + e1.info + ' » (choix ' + e1.pp.choix + ', bulle ' + B[0].i + ') ; « ' + e2.info + ' »'];
    });
    erreurs(A, 'compteur');
  } finally { await A.fermer(); }
}

/* ---------- g : choix au toucher ---------- */
async function choix(){
  const A = await croquisNeuf(), p = A.p;
  try {
    /* éléments en cause entourés dès l'ouverture (A17) : ceux d'une paire en trait plein, un élément coupé par le cadre en pointillé */
    await dessin(p, D.parcours()); const pb0 = await ouvrirOuNoter(p);
    await controle('g : à l\'ouverture, sans choix ni parcours, chaque élément en cause est entouré d\'orange : trait plein pour les deux de la paire, pointillé pour l\'élément coupé', async () => {
      if (pb0) return [false, pb0];
      const r = await p.evaluate(() => { const s = window.__vcEd.etat.pp, T = window.__ppT, pr = s.chev.paires, cq = s.chev.coupes;
        const ids = pr.length === 1 && cq.length === 1 ? [pr[0].a, pr[0].b, cq[0].i] : [];
        return {choix: s.choix, iListe: s.iListe, n: [pr.length, cq.length], orange: ids.map(i => T.orangeAutour(i)), bords: ids.map(i => T.bordHaut(i))}; });
      const b = r.bords, bon = r.choix === -1 && r.iListe === -1 && r.orange.length === 3 && r.orange.every(o => o > 20)
        && b.every(x => !!x) && b[0].part > 0.95 && b[0].traits === 1 && b[1].part > 0.95 && b[1].traits === 1 && b[2].part < 0.85 && b[2].traits > 2;
      return [bon, r.n.join(' paire(s), ') + ' coupe(s) ; orange ' + r.orange.join('/') + ' ; bords hauts ' + b.map(x => x ? f3(x.part) + ' en ' + x.traits + ' trait(s)' : 'absent').join(' / ')];
    });
    await fermerApercu(p);
    await dessin(p, D.superposees()); const pb = await ouvrirOuNoter(p);
    const tout = pb ? [] : await marques(p), M = tout.filter(m => m.k === 'etiq' && /^(A|B)$/.test(m.id)), Lx = tout.find(m => m.k === 'etiq' && m.id === 'Lx');
    const haut = M.length === 2 ? Math.max(M[0].i, M[1].i) : -1, bas = M.length === 2 ? Math.min(M[0].i, M[1].i) : -1;
    const q = M.length ? await p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [M[0].cx, M[0].cy]) : null;
    const orange = i => p.evaluate(i => window.__ppT.orangeAutour(i), i), ep = i => p.evaluate(i => window.__ppT.epaisseur(i), i);
    /* surlignage à l'ouverture : la paire A et B entourée, Lx (hors de cause) non ; épaisseur du trait au bord haut de l'étiquette du dessus */
    const o0 = pb || !Lx ? null : {haut: await orange(haut), bas: await orange(bas), lx: await orange(Lx.i), ep: await ep(haut)};
    await controle('g : à l\'ouverture, les deux étiquettes superposées sont entourées d\'orange, pas l\'étiquette hors de cause (Lx)', async () => {
      if (pb) return [false, pb];
      if (!o0) return [false, 'étiquette Lx introuvable'];
      return [o0.haut > 20 && o0.bas > 20 && o0.lx === 0, 'orange : ' + JSON.stringify(o0)];
    });
    await controle('g : un toucher choisit l\'étiquette du dessus (indice le plus grand à égalité) : « Étiquette « … » · chevauche l\'étiquette « … » »', async () => {
      if (pb) return [false, pb];
      if (!q) return [false, 'étiquettes A et B introuvables'];
      await toucher(p, q); const e = await etat(p);
      return [e.pp.choix === haut && /^Étiquette « Regard fictif [AB] » · chevauche l'étiquette « Regard fictif [AB] »$/.test(e.info) && e.pp.iListe === -1, 'choix ' + e.pp.choix + ' (attendu ' + haut + ') ; « ' + e.info + ' »'];
    });
    await controle('g : l\'élément choisi est entouré d\'orange plus fort qu\'à l\'ouverture (2,5 px sur un liseré blanc, au lieu de 2 px)', async () => {
      if (pb) return [false, pb];
      if (!o0) return [false, 'pas de mesure à l\'ouverture'];
      const e1 = await ep(haut);
      return [o0.ep > 1.2 && e1 - o0.ep > 0.25, 'trait orange de ' + f3(e1) + ' px au bord haut de l\'étiquette choisie, ' + f3(o0.ep) + ' px à l\'ouverture'];
    });
    await controle('g : un toucher plus tardif au même endroit passe à l\'étiquette dessous, puis revient (boucle)', async () => {
      if (pb) return [false, pb];
      await toucher(p, q); const e1 = await etat(p);
      await toucher(p, q); const e2 = await etat(p);
      return [e1.pp.choix === bas && e2.pp.choix === haut, 'choix ' + e1.pp.choix + ' puis ' + e2.pp.choix + ' (attendus ' + bas + ', ' + haut + ')'];
    });
    await controle('g : le second toucher d\'un double toucher garde le choix et ne zoome pas', async () => {
      if (pb) return [false, pb];
      await toucher(p, q, 80); await toucher(p, q); const e = await etat(p);
      return [e.pp.choix === bas && e.pp.z === 1, 'choix ' + e.pp.choix + ' (attendu ' + bas + '), z ' + e.pp.z];
    });
    await controle('g : un toucher dans le vide efface le choix (texte d\'invite ; le surlignage redevient celui de l\'ouverture)', async () => {
      if (pb) return [false, pb];
      if (!o0) return [false, 'pas de mesure à l\'ouverture'];
      const e0 = await etat(p); await toucher(p, vide(e0)); const e = await etat(p);
      const o1 = {haut: await orange(haut), bas: await orange(bas), lx: await orange(Lx.i), ep: await ep(haut)};
      return [e.pp.choix === -1 && e.info === 'Touchez une étiquette, une bulle ou un texte pour voir ses chevauchements.' && JSON.stringify(o1) === JSON.stringify(o0),
        'choix ' + e.pp.choix + ', « ' + e.info + ' », orange ' + JSON.stringify(o1) + ' (ouverture ' + JSON.stringify(o0) + ')'];
    });
    await controle('g : un toucher sur l\'étiquette hors de cause (Lx) l\'entoure d\'orange ; un toucher dans le vide l\'efface', async () => {
      if (pb) return [false, pb];
      if (!Lx) return [false, 'étiquette Lx introuvable'];
      await toucher(p, await p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [Lx.cx, Lx.cy])); const e1 = await etat(p), n1 = await orange(Lx.i);
      await toucher(p, vide(e1)); const e2 = await etat(p), n2 = await orange(Lx.i);
      return [e1.pp.choix === Lx.i && /^Étiquette « Regard loin »$/.test(e1.info) && n1 > 20 && e2.pp.choix === -1 && n2 === 0,
        'choix ' + e1.pp.choix + ' (attendu ' + Lx.i + '), « ' + e1.info + ' », orange ' + n1 + ' puis ' + n2];
    });
    /* une ligne d'info longue (l'étiquette choisie en chevauche trois autres) ne change pas la hauteur de la zone, donc ni k ni la page */
    await controle('g : à 1024 × 768, choisir une étiquette dont la ligne d\'info est longue ne change ni la hauteur de la ligne d\'info ni l\'échelle de la page (k)', async () => {
      await fermerApercu(p); await p.setViewportSize({width: 1024, height: 768}); await C.pause(p, 400);
      await dessin(p, D.longues()); await ouvrirApercu(p);
      const h = () => p.evaluate(() => document.querySelector('.vc .vc-pp .vc-pp-info').getBoundingClientRect().height);
      const e0 = await etat(p), h0 = await h(), L = (await marques(p)).filter(m => m.k === 'etiq' && /^Ln/.test(m.id)).sort((a, b) => b.i - a.i);
      if (L.length !== 4) return [false, L.length + ' étiquettes longues sur 4'];
      await toucher(p, await p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [L[0].cx, L[0].cy])); await attendre(p);
      const e1 = await etat(p), h1 = await h();
      return [e1.pp.choix === L[0].i && e1.info.length > 150 && Math.abs(h1 - h0) < 0.5 && Math.abs(e1.pp.k - e0.pp.k) < 1e-9,
        'ligne d\'info de ' + e1.info.length + ' caractères ; hauteur ' + f3(h0) + ' → ' + f3(h1) + ' px ; k ' + f3(e0.pp.k) + ' → ' + f3(e1.pp.k)];
    });
    erreurs(A, 'choix');
  } finally { await A.fermer(); }
}

/* ---------- h : bandeau du cadre ---------- */
async function bandeau(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await controle('h : bandeau : absent pour un plan qui tient ; ouvrage projeté posé loin : absent à l\'état des lieux, présent à l\'avant-projet (plan affiché seulement)', async () => {
      await dessin(p, D.aucun()); await ouvrirApercu(p); const e0 = await etat(p);
      await fermerApercu(p); await dessin(p, D.projetLoin()); await ouvrirApercu(p); const e1 = await etat(p);
      await bouton(p, 'plan', 'avp'); await attendreQue(p, () => { const S = window.__vcEd.etat; return S.pp && S.pp.mode === 'avp' && !S.pp.calcul; }); await attendre(p); const e2 = await etat(p);
      const att = 'À 1/200, le dessin ne tient pas dans le cadre du plan d\'avant-projet : une partie manquera au PDF. Choisissez « Auto » ou une échelle plus petite (Réglages du croquis).';
      return [e0.bandeau === '' && e0.plans.length === 0 && e1.bandeau === '' && e2.bandeau === att, JSON.stringify([e0.bandeau, e1.bandeau, e2.bandeau]).slice(0, 300)];
    });
    await controle('h : bandeau : ouvrage posé loin, état des lieux coupé : présent', async () => {
      await fermerApercu(p); await dessin(p, D.loin()); await ouvrirApercu(p); const e = await etat(p);
      return [/^À 1\/200, le dessin ne tient pas dans le cadre du plan de l'état des lieux/.test(e.bandeau), '« ' + e.bandeau + ' »'];
    });
    erreurs(A, 'bandeau');
  } finally { await A.fermer(); }
}

/* ---------- i : clavier, garde de « Fermer », ouvrir(), rien d'écrit ---------- */
async function clavier(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await dessin(p, D.trois());
    /* un pas d'annulation réel (objet Cr supprimé au clavier : la paire de A et B reste, « › » agit), puis l'objet A choisi, et le panneau
       Sorties ouvert */
    await p.evaluate(() => { window.__vcEd.selectionner('Cr'); document.querySelector('.vc').focus(); });
    await p.keyboard.press('Delete'); await C.pause(p, 200);
    await p.evaluate(() => window.__vcEd.selectionner('A')); await C.pause(p, 200);
    await p.click('.vc .vc-barre [data-p="sorties"]'); await C.pause(p, 700);
    const avant = await p.evaluate(() => window.__ppT.editeur());
    await controle('i : clavier, focus hors des boutons : Suppr avec un objet choisi ne supprime rien ; Ctrl+Z et Ctrl+Maj+Z n\'annulent rien (message) ; Entrée sans effet', async () => {
      await ouvrirApercu(p);
      const e0 = await etat(p); await toucher(p, vide(e0));
      const f = await p.evaluate(() => { const a = document.activeElement; const r = a && a.tagName !== 'BUTTON'; document.querySelector('.vc').focus(); return r; });
      await p.keyboard.press('Delete'); await p.keyboard.press('Backspace'); await C.pause(p, 150);
      const s1 = await p.evaluate(() => ({sel: !!window.__vcEd.etat.sel, a: !!window.__vcEd.etat.doc.el.find(e => e.id === 'A')}));
      await p.keyboard.press('Control+z'); const t1 = await p.evaluate(() => window.__ppT.toast());
      await p.keyboard.press('Control+Shift+z'); await C.pause(p, 150);
      await p.keyboard.press('Enter'); await C.pause(p, 150);
      const apres = await p.evaluate(() => window.__ppT.editeur()), e1 = await etat(p);
      return [f && s1.sel && s1.a && t1 === 'Rien à annuler dans l\'aperçu' && apres.undo === avant.undo && apres.redo === avant.redo && apres.doc === avant.doc && e1.ouvert,
        'focus hors des boutons ' + f + ', choix ' + s1.sel + ', A ' + (s1.a ? 'gardé' : 'supprimé') + ', message « ' + t1 + ' », annulation ' + (apres.undo === avant.undo ? 'intacte' : 'changée') + ', croquis ' + (apres.doc === avant.doc ? 'inchangé' : 'changé')];
    });
    await controle('i : Tab et Maj+Tab font le tour des boutons de l\'aperçu sans en sortir (ni boutons cachés de l\'éditeur, ni hôte) ; Entrée n\'agit que sur le bouton de l\'aperçu ; aria-modal, le reste de l\'éditeur inerte', async () => {
      const e0 = await etat(p); if (!e0.ouvert) return [false, 'aperçu fermé'];
      const av = await p.evaluate(() => ({ed: window.__ppT.editeur(), fichiers: window.__fichiers.length, reperes: window.__vcEd.etat.pp.reperes}));
      const m = await p.evaluate(() => { const o = document.querySelector('.vc .vc-pp'), R = document.querySelector('.vc'), autres = Array.from(R.children).filter(c => c !== o && !c.classList.contains('vc-toast'));
        return {modal: o.getAttribute('aria-modal'), inert: 'inert' in HTMLElement.prototype, inertes: autres.filter(c => c.inert).length, n: autres.length, toast: !!R.querySelector('.vc-toast').inert}; });
      await p.evaluate(() => document.querySelector('.vc .vc-pp [data-pp="fermer"]').focus());
      const vus = [];
      for (let k = 0; k < 14; k++){ await p.keyboard.press('Tab'); vus.push(await p.evaluate(() => window.__ppT.foyer())); }
      for (let k = 0; k < 14; k++){ await p.keyboard.press('Shift+Tab'); vus.push(await p.evaluate(() => window.__ppT.foyer())); }
      const retour = await p.evaluate(() => window.__ppT.foyer());
      await p.keyboard.press('Shift+Tab'); const dernier = await p.evaluate(() => window.__ppT.foyer());
      await p.keyboard.press('Enter'); await C.pause(p, 300);
      const ap = await p.evaluate(() => ({ed: window.__ppT.editeur(), fichiers: window.__fichiers.length, reperes: window.__vcEd.etat.pp && window.__vcEd.etat.pp.reperes}));
      if (ap.reperes) { await p.keyboard.press('Enter'); await C.pause(p, 200); }
      await p.evaluate(() => document.querySelector('.vc').focus());
      const hors = vus.filter(v => /^HORS/.test(v)), dif = Object.keys(av.ed).filter(k => av.ed[k] !== ap.ed[k]);
      return [m.modal === 'true' && (!m.inert || m.inertes === m.n) && !m.toast && !hors.length && retour === 'fermer' && dernier === 'reperes' && ap.reperes === true && !dif.length && ap.fichiers === av.fichiers,
        'aria-modal ' + m.modal + ', inertes ' + m.inertes + '/' + m.n + (m.inert ? '' : ' (inert inconnu)') + ', message inerte ' + m.toast + ' ; ' + (hors.length ? hors.length + ' fois hors de l\'aperçu (' + hors.slice(0, 3).join(', ') + ')' : 'jamais hors de l\'aperçu')
          + ' ; tour : ' + vus.slice(0, 9).join(' ') + ' ; Maj+Tab depuis « Fermer » : ' + dernier + ' ; Entrée : Repères ' + ap.reperes + ', ' + (dif.length ? 'changé : ' + dif.join(', ') : 'éditeur inchangé') + ', fichiers ' + av.fichiers + ' → ' + ap.fichiers];
    });
    await controle('i : Échap (fenêtre de l\'hôte, echapHote) ferme l\'aperçu, pas l\'éditeur ; le focus revient au bouton « Aperçu du plan » ; plus rien d\'inerte', async () => {
      await p.keyboard.press('Escape');
      const ok = await attendreQue(p, () => !document.querySelector('.vc .vc-pp') && !window.__vcEd.etat.pp, null, 3000);
      await C.pause(p, 300);
      const r = await p.evaluate(() => ({ed: !!document.querySelector('#modal-root .vc'), focus: !!document.activeElement && document.activeElement.dataset.a === 'apercu',
        inertes: Array.from(document.querySelectorAll('.vc *')).filter(c => c.inert).length}));
      return [ok && r.ed && r.focus && r.inertes === 0, JSON.stringify(r)];
    });
    await controle('i : à la fermeture, S.sel, S.panneau, S.mode, S.brouillon, S.vue, S.undo, S.redo et le croquis sont ceux d\'avant (après zoom, déplacement, choix, parcours)', async () => {
      await ouvrirApercu(p);
      const e0 = await etat(p), c = dansZone(e0, e0.zone.w / 2, e0.zone.h / 2);
      await bouton(p, 'zoom', 2); await attendreQue(p, () => window.__vcEd.etat.pp.z === 2); await attendre(p);
      await glisserDoigt(p, c, {x: c.x - 60, y: c.y + 40}); await attendre(p);
      await p.mouse.move(c.x, c.y); await p.mouse.wheel(0, -200); await C.pause(p, 60); await attendre(p);
      await bouton(p, 'suiv'); await bouton(p, 'reperes');
      await toucher(p, c);
      await fermerApercu(p); await C.pause(p, 700);
      const apres = await p.evaluate(() => window.__ppT.editeur()), dif = Object.keys(avant).filter(k => avant[k] !== apres[k]);
      return [!dif.length, dif.length ? 'changé : ' + dif.join(', ') : 'rien de changé'];
    });
    await controle('i : garde de « Fermer » : un toucher au même endroit 150 ms après est avalé (« Retour » dessous), un toucher 600 ms après agit', async () => {
      await ouvrirApercu(p);
      const r = await p.evaluate(() => { const b = document.querySelector('.vc .vc-barre [data-a="retour"]').getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2, e = document.elementFromPoint(x, y);
        return {x, y, fermer: !!e && !!e.closest('[data-pp="fermer"]')}; });
      await p.evaluate(() => { window.__retours = 0; window.__retourFn = e => { window.__retours++; e.stopPropagation(); }; document.querySelector('.vc .vc-barre [data-a="retour"]').addEventListener('click', window.__retourFn, true); });
      await p.touchscreen.tap(r.x, r.y); await C.pause(p, 150);
      const sous = await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return !!e && !!e.closest('[data-a="retour"]'); }, [r.x, r.y]);
      await p.touchscreen.tap(r.x, r.y); await C.pause(p, 100);
      const n1 = await p.evaluate(() => window.__retours), ed1 = await p.evaluate(() => !!document.querySelector('#modal-root .vc'));
      await C.pause(p, 400);
      await p.touchscreen.tap(r.x, r.y); await C.pause(p, 150);
      const n2 = await p.evaluate(() => window.__retours), ed2 = await p.evaluate(() => !!document.querySelector('#modal-root .vc'));
      await p.evaluate(() => document.querySelector('.vc .vc-barre [data-a="retour"]').removeEventListener('click', window.__retourFn, true));
      return [r.fermer && sous && n1 === 0 && ed1 && n2 === 1 && ed2, JSON.stringify({surFermer: r.fermer, retourDessous: sous, clicsAvales: n1 === 0, clicApres: n2, editeur: ed1 && ed2})];
    });
    await controle('i : Entrée pendant un tracé en cours : le tracé n\'est pas terminé', async () => {
      await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 200);
      const v = await C.vue(p);
      await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
      await C.toucherCv(p, await C.ecranCv(p, v.cx - 2, v.cy - 3)); await C.toucherCv(p, await C.ecranCv(p, v.cx + 2, v.cy - 3));
      const b0 = await p.evaluate(() => { const S = window.__vcEd.etat; return S.brouillon ? S.brouillon.pts.length : 0; }), n0 = await p.evaluate(() => window.__vcEd.etat.doc.el.length);
      await ouvrirApercu(p);
      const e0 = await etat(p); await toucher(p, vide(e0)); await p.evaluate(() => document.querySelector('.vc').focus());
      await p.keyboard.press('Enter'); await C.pause(p, 200);
      const b1 = await p.evaluate(() => { const S = window.__vcEd.etat; return S.brouillon ? S.brouillon.pts.length : 0; }), n1 = await p.evaluate(() => window.__vcEd.etat.doc.el.length), e1 = await etat(p);
      await fermerApercu(p);
      return [b0 >= 2 && b1 === b0 && n1 === n0 && e1.ouvert, 'tracé ' + b0 + ' → ' + b1 + ' points, ' + n0 + ' → ' + n1 + ' éléments'];
    });
    await controle('i : ouvrir() pendant l\'aperçu le ferme', async () => {
      await ouvrirApercu(p);
      await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; ed.ouvrir(S.doc, S.fond, S.reseau); });
      const r = await p.evaluate(() => ({surcouche: !!document.querySelector('.vc .vc-pp'), pp: window.__vcEd.etat.pp}));
      return [!r.surcouche && r.pp === null, JSON.stringify(r)];
    });
    erreurs(A, 'clavier');
  } finally { await A.fermer(); }
}

/* ---------- j : gardes (passent aussi avant m168) ---------- */
async function gardes(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await controle('j : jsPDF absent : message « La bibliothèque PDF n\'est pas chargée », pas de surcouche', async () => {
      await demo(p);
      await p.click('.vc .vc-barre [data-p="sorties"]');
      const b = await p.waitForSelector('.vc .vc-pcorps [data-a="apercu"]', {timeout: 2500}).catch(() => null);
      if (!b) return [false, 'pas de bouton « Aperçu du plan »'];
      await p.evaluate(() => { window.__jspdf = window.jspdf; window.jspdf = undefined; });
      const q = await centreDe(p, '.vc .vc-pcorps [data-a="apercu"]'); await p.touchscreen.tap(q.x, q.y); await C.pause(p, 300);
      const r = await p.evaluate(() => ({toast: window.__ppT.toast(), surcouche: !!document.querySelector('.vc .vc-pp'), pp: window.__vcEd.etat.pp}));
      await p.evaluate(() => { window.jspdf = window.__jspdf; });
      return [r.toast === 'La bibliothèque PDF n\'est pas chargée' && !r.surcouche && !r.pp, JSON.stringify(r)];
    });
    await controle('j : croquis désactivé : pas d\'éditeur, nulle part « Aperçu du plan » (passe aussi avant m168)', async () => {
      await C.fermerCroquis(p);
      await p.evaluate(() => { const T = window.__VT; T.S.croq.actif = false; T.VC_RESUMES.clear(); T.render(); });
      await C.pause(p, 600);
      const b = await p.$('[data-act="vc-ouvrir"]');
      if (b){ await b.click().catch(() => {}); await C.pause(p, 600); }
      const r = await p.evaluate(() => ({editeur: !!document.querySelector('.vc'), texte: document.body.innerText.indexOf('Aperçu du plan') >= 0, bouton: !!document.querySelector('[data-a="apercu"]')}));
      await p.evaluate(() => { const T = window.__VT; T.S.croq.actif = true; T.VC_RESUMES.clear(); T.render(); });
      return [!r.editeur && !r.texte && !r.bouton, JSON.stringify(r)];
    });
  } finally { await A.fermer(); }
}

/* ---------- k : positions propres à chaque plan (m169 ; P2, 1re partie) ---------- */
/* égalité profonde, nombres à 1e-9 (positions relues de la page par JSON) */
function egalK(x, y){
  if (typeof x === 'number' && typeof y === 'number') return Math.abs(x - y) <= 1e-9;
  if (Array.isArray(x) || Array.isArray(y)) return Array.isArray(x) && Array.isArray(y) && x.length === y.length && x.every((v, i) => egalK(v, y[i]));
  if (x && y && typeof x === 'object' && typeof y === 'object'){
    const kx = Object.keys(x).sort(), ky = Object.keys(y).sort();
    return kx.join() === ky.join() && kx.every(k => egalK(x[k], y[k]));
  }
  return x === y;
}
/* axes du plan tourné de r (comme versPlan et depuisPlan du croquis) : un décalage noté dans les axes du plan d'avant (r0) et suivi par la
   rotation garde sa direction dans le repère du croquis */
const versK = (x, y, r) => ({x: x * Math.cos(r) + y * Math.sin(r), y: -x * Math.sin(r) + y * Math.cos(r)});
const depuisK = (x, y, r) => ({x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r)});
const suiviK = (v, r0, r1) => { const w = depuisK(v.dx, v.dy, r0), q = versK(w.x, w.y, r1); return Object.assign({}, v, {dx: q.x, dy: q.y}); };
/* dessin injecté à 1/200, plan non tourné ; plans : positions propres de l'avant-projet (doc.plans), null : aucune */
async function poserK(p, el, plans){
  await C.injecter(p, {el, echelle: 200, mode: 'edl'});
  await p.evaluate(plans => {
    const ed = window.__vcEd, S = ed.etat; S.doc.rot = 0; S.vue.rot = 0;
    if (plans === null) delete S.doc.plans; else S.doc.plans = plans;
    ed.synchroniser(); ed.redessiner();
  }, plans);
}
/* état relu : éléments, positions propres ('(absent)' sans doc.plans), orientation, longueur de l'historique, élément choisi */
const etatK = p => p.evaluate(() => { const S = window.__vcEd.etat;
  return JSON.parse(JSON.stringify({el: S.doc.el, plans: 'plans' in S.doc ? S.doc.plans : '(absent)', rot: S.doc.rot || 0, undo: S.undo.length, sel: S.sel ? S.sel.id : null})); });
const elK = (e, id) => e.el.filter(x => x.id === id)[0] || null;
const jsK = v => JSON.stringify(v, (k, x) => typeof x === 'number' ? +x.toFixed(4) : x);
/* croquis enregistré (comme après un geste), fermé par « Retour », puis rouvert depuis le dossier : attend le dossier relu (un autre objet) */
async function rouvrirK(p){
  await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer(); window.__kAncien = S.doc; });
  await C.fermerCroquis(p);
  await p.click('[data-act="vc-ouvrir"]');
  const ok = await attendreQue(p, () => { const ed = window.__vcEd; return !!ed && !!ed.doc() && ed.doc() !== window.__kAncien && !!document.querySelector('#modal-root .vc .vc-nav'); }, null, 10000);
  if (!ok) throw new Error('croquis non rouvert');
}
/* touches envoyées au plan : focus sur l'éditeur (Suppr n'agit que là) */
async function toucheK(p, k){ await p.evaluate(() => document.querySelector('.vc').focus()); await p.keyboard.press(k); }
async function positionsPropres(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await controle('k1 : objet supprimé (Suppr) : sa position propre de l\'avant-projet part avec lui, celle d\'un autre reste ; Ctrl+Z les rend, Ctrl+Maj+Z les ôte de nouveau', async () => {
      const avec = {avp: {lab: {A: {dx: 0, dy: 2, main: true}, B: {auto: true}}}}, sans = {avp: {lab: {B: {auto: true}}}}, ko = [];
      await poserK(p, [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null)], avec);
      await p.evaluate(() => window.__vcEd.selectionner('A'));
      const pas = [['Delete', false, sans, 'Suppr'], ['Control+z', true, avec, 'Ctrl+Z'], ['Control+Shift+z', false, sans, 'Ctrl+Maj+Z']];
      for (const [k, la, att, nom] of pas){
        await toucheK(p, k);
        const ok = await attendreQue(p, la => window.__vcEd.etat.doc.el.some(e => e.id === 'A') === la, la);
        const e = await etatK(p);
        if (!ok || !elK(e, 'B') || !egalK(e.plans, att)) ko.push('après ' + nom + ' : ' + (ok ? '' : 'A ' + (la ? 'absent' : 'encore là') + ', ') + 'positions propres ' + jsK(e.plans));
      }
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('k2 : plan tourné (« Tourner le plan à gauche ») : les positions propres placées à la main et celles des textes, ainsi que l\'écart d\'un texte, suivent le dessin ; une position d\'office d\'un objet reste, celle d\'un tracé est reposée d\'office ; Ctrl+Z rend tout', async () => {
      const a = Rg('A', -5, 0, 'Regard fictif A', null), b = Rg('B', 5, 0, 'Regard fictif B', null), l1 = C.L('L1', 'tr', ['A', 'B'], C.index([a, b]), {res: 'EU'});
      const x = {id: 'X', k: 'tx', x: 2, y: 4, txt: 'Texte fictif', taille: 2.5, decal: {dx: 1, dy: 2}};
      const plans = {avp: {lab: {A: {dx: 0, dy: 2, main: true}, B: {dx: 0.5, dy: 0.5}, L1: {dx: 0, dy: 1, E: 200}, X: {dx: -1, dy: 1}}}}, ko = [];
      await poserK(p, [a, b, l1, x], plans);
      const e0 = await etatK(p);
      await p.evaluate(() => document.querySelector('.vc .vc-nav [data-a="rotg"]').click());
      if (!(await attendreQue(p, () => Math.abs(window.__vcEd.etat.doc.rot || 0) > 1e-9))) return [false, 'plan non tourné'];
      const e1 = await etatK(p), r0 = e0.rot, r1 = e1.rot, L = plans.avp.lab;
      const att = {avp: {lab: {A: suiviK(L.A, r0, r1), B: L.B, L1: {auto: true}, X: suiviK(L.X, r0, r1)}}}, dx = suiviK(x.decal, r0, r1);
      if (!egalK(e1.plans, att)) ko.push('positions propres ' + jsK(e1.plans) + ' au lieu de ' + jsK(att));
      if (!elK(e1, 'X') || !egalK(elK(e1, 'X').decal, dx)) ko.push('écart du texte ' + jsK(elK(e1, 'X') && elK(e1, 'X').decal) + ' au lieu de ' + jsK(dx));
      await toucheK(p, 'Control+z');
      if (!(await attendreQue(p, r0 => Math.abs((window.__vcEd.etat.doc.rot || 0) - r0) < 1e-12, r0))) ko.push('Ctrl+Z : plan non ramené');
      const e2 = await etatK(p);
      if (!egalK(e2.plans, plans) || !elK(e2, 'X') || !egalK(elK(e2, 'X').decal, x.decal)) ko.push('après Ctrl+Z : ' + jsK(e2.plans) + ', écart ' + jsK(elK(e2, 'X') && elK(e2, 'X').decal));
      return [!ko.length, (ko.join(' ; ') || 'rotation de ' + ((r1 - r0) * 180 / Math.PI).toFixed(1) + '°')];
    });
    await controle('k3 : statut « Projet » (puce de la fiche) : la position propre de l\'avant-projet devient l\'étiquette de l\'objet et son entrée est ôtée, en un seul pas d\'annulation ; Ctrl+Z rend tout', async () => {
      const plans = {avp: {lab: {A: {dx: 1, dy: 1, main: true}, B: {auto: true}}}}, ko = [];
      await poserK(p, [Rg('A', -5, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 5, 0, 'Regard fictif B', null)], plans);
      await p.evaluate(() => window.__vcEd.selectionner('A'));
      const puce = await p.waitForSelector('.vc .vc-pcorps [data-a="prop"][data-k="st"][data-v="projet"]', {timeout: 3000}).catch(() => null);
      if (!puce) return [false, 'pas de puce « Projet » dans la fiche de A'];
      const e0 = await etatK(p);
      await puce.click();
      if (!(await attendreQue(p, () => { const a = window.__vcEd.etat.doc.el.filter(e => e.id === 'A')[0]; return !!a && a.p.st === 'projet'; }))) return [false, 'statut non changé'];
      const e1 = await etatK(p), a1 = elK(e1, 'A');
      if (!egalK(a1.lab, {dx: 1, dy: 1, main: true})) ko.push('étiquette ' + jsK(a1.lab) + ' au lieu de la position propre');
      if (!egalK(e1.plans, {avp: {lab: {B: {auto: true}}}})) ko.push('positions propres ' + jsK(e1.plans));
      if (e1.undo !== e0.undo + 1) ko.push(e1.undo - e0.undo + ' pas d\'annulation');
      await toucheK(p, 'Control+z');
      if (!(await attendreQue(p, () => { const a = window.__vcEd.etat.doc.el.filter(e => e.id === 'A')[0]; return !!a && a.p.st === 'existant'; }))) ko.push('Ctrl+Z : statut non rendu');
      const e2 = await etatK(p);
      if (!egalK(elK(e2, 'A').lab, {dx: 0, dy: 1.5, main: true}) || !egalK(e2.plans, plans)) ko.push('après Ctrl+Z : étiquette ' + jsK(elK(e2, 'A').lab) + ', ' + jsK(e2.plans));
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('k4 : type changé (fiche) : la position propre placée de l\'objet est reposée d\'office, une étiquette masquée sur l\'avant-projet le reste', async () => {
      await poserK(p, [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null)], {avp: {lab: {A: {dx: 1, dy: 1, main: true}, B: {off: true}}}});
      for (const id of ['A', 'B']){
        await p.evaluate(id => window.__vcEd.selectionner(id), id);
        const s = await p.waitForSelector('.vc .vc-pcorps select[data-a="type"]', {timeout: 3000}).catch(() => null);
        if (!s) return [false, 'pas de choix du type dans la fiche de ' + id];
        await s.selectOption('boite');
        if (!(await attendreQue(p, id => { const e = window.__vcEd.etat.doc.el.filter(x => x.id === id)[0]; return !!e && e.t === 'boite'; }, id))) return [false, id + ' : type non changé'];
      }
      const e = await etatK(p), att = {avp: {lab: {A: {auto: true}, B: {off: true}}}};
      return [egalK(e.plans, att), jsK(e.plans)];
    });
    await controle('k5 : croquis rouvert : la position propre d\'un élément absent est ôtée, celle d\'un élément présent gardée ; des positions propres illisibles sont ôtées', async () => {
      await poserK(p, [Rg('A', -5, 0, 'Regard fictif A', null), Rg('B', 5, 0, 'Regard fictif B', null)], {avp: {lab: {ZZ: {auto: true}, A: {auto: true}}}});
      await rouvrirK(p);
      const e1 = await etatK(p);
      await p.evaluate(() => { window.__vcEd.etat.doc.plans = 'x'; });
      await rouvrirK(p);
      const e2 = await etatK(p), ko = [];
      if (!egalK(e1.plans, {avp: {lab: {A: {auto: true}}}})) ko.push('élément absent : ' + jsK(e1.plans));
      if (e2.plans !== '(absent)') ko.push('illisibles : ' + jsK(e2.plans));
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('k6 : texte libre décalé (e.decal) : à l\'écran, sa zone est centrée sur son point plus l\'écart (0,5 px près) ; un toucher à cet endroit le choisit', async () => {
      await poserK(p, [{id: 'X1', k: 'tx', x: 0, y: 0, txt: 'Texte fictif', taille: 2.5, decal: {dx: 0, dy: 4}}], null);
      await C.outil(p, {k: 'main'});
      await C.regler(p, 0, 0, 30);
      /* dessin fait à la nouvelle vue (il est demandé pour l'image suivante) */
      if (!(await attendreQue(p, () => { const S = window.__vcEd.etat; return !S.dessinDemande && Math.abs(S.vue.s - 30) < 1e-9 && (S.zones || []).some(z => z.type === 'tx' && z.id === 'X1'); }))) return [false, 'pas de zone pour le texte'];
      const r = await p.evaluate(() => { const S = window.__vcEd.etat, z = S.zones.filter(z => z.type === 'tx' && z.id === 'X1')[0]; return {b: z.b, A: S.vue.ecran(0, 0), s: S.vue.s}; });
      const c = {x: (r.b[0] + r.b[2]) / 2, y: (r.b[1] + r.b[3]) / 2}, att = {x: r.A.x, y: r.A.y - 4 * r.s}, ko = [];
      if (Math.abs(c.x - att.x) > 0.5 || Math.abs(c.y - att.y) > 0.5) ko.push('zone centrée en ' + c.x.toFixed(1) + ', ' + c.y.toFixed(1) + ' au lieu de ' + att.x.toFixed(1) + ', ' + att.y.toFixed(1));
      await C.toucherCv(p, att);
      if (!(await attendreQue(p, () => !!window.__vcEd.etat.sel && window.__vcEd.etat.sel.id === 'X1'))) ko.push('toucher : choix ' + (await etatK(p)).sel);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('k7 : garde : croquis fermé puis rouvert : positions propres de l\'avant-projet et écart d\'un texte gardés (passe aussi avant m169)', async () => {
      const plans = {avp: {lab: {A: {dx: 1, dy: 2, main: true}, X1: {dx: -1, dy: 1}}, bulle: {m1: {dx: 1, dy: 1}}, echelle: 500}};
      await poserK(p, [Rg('A', -5, 0, 'Regard fictif A', null), {id: 'X1', k: 'tx', x: 2, y: 4, txt: 'Texte fictif', taille: 2.5, decal: {dx: 0.5, dy: -1}}], plans);
      await rouvrirK(p);
      const e = await etatK(p), x1 = elK(e, 'X1');
      return [egalK(e.plans, plans) && !!x1 && egalK(x1.decal, {dx: 0.5, dy: -1}), jsK(e.plans) + ', écart ' + jsK(x1 && x1.decal)];
    });
    erreurs(A, 'k : positions propres (passe aussi avant m169)');
  } finally { await A.fermer(); }
}

/* ---------- l : déplacer (m170 ; P2, 2e partie) ---------- */
/* glissé au doigt de a à b en o.pas pas (10 par défaut), par les événements tactiles de Chromium ; après le pas k, o.entre(k, t), où
   t(type, points) envoie un événement tactile de plus ; fin : o.fin = 'lever' (LEVER ms immobile, puis touchEnd ; par défaut),
   'annuler' (touchCancel, sans pause : une annulation ne lance pas de glissade [p]) ou une fonction(t) qui la fait (à elle de rester
   LEVER ms immobile avant un touchEnd, comme « second doigt » de l6) */
async function glisserEtapes(p, a, b, o){
  o = o || {}; const n = o.pas || 10;
  const s = await p.context().newCDPSession(p), t = (type, pts) => s.send('Input.dispatchTouchEvent', {type, touchPoints: pts});
  try {
    await t('touchStart', [{x: a.x, y: a.y, id: 1}]);
    for (let k = 1; k <= n; k++){
      await t('touchMove', [{x: a.x + (b.x - a.x) * k / n, y: a.y + (b.y - a.y) * k / n, id: 1}]);
      if (o.entre) await o.entre(k, t);
    }
    if (typeof o.fin === 'function') await o.fin(t);
    else if (o.fin === 'annuler') await t('touchCancel', []);
    else { await C.pause(p, LEVER); await t('touchEnd', []); }
  } finally { await s.detach(); }
}
/* glissé à la souris (bouton gauche) de a à b, en pas mouvements (10 par défaut) */
async function glisserSouris(p, a, b, pas){ await p.mouse.move(a.x, a.y); await p.mouse.down(); await p.mouse.move(b.x, b.y, {steps: pas || 10}); await p.mouse.up(); }
/* messages de l'éditeur (toasts) notés dans l'ordre, un par appel (le texte posé) ; à reposer après chaque ouverture du croquis */
const noterToasts = p => p.evaluate(() => {
  const t = document.querySelector('.vc .vc-toast'); window.__lToasts = [];
  if (window.__lToastsMo) window.__lToastsMo.disconnect();
  window.__lToastsMo = new MutationObserver(L => L.forEach(r => { if (r.addedNodes.length) window.__lToasts.push(Array.from(r.addedNodes).map(n => n.textContent).join('').trim()); }));
  window.__lToastsMo.observe(t, {childList: true});
});
const toastsNotes = p => p.evaluate(() => (window.__lToasts || []).slice());
const combien = (L, t) => L.filter(x => x === t).length;
/* JSON du dossier, clés de premier niveau rangées, sans ce qui change sans geste de dessin (modifie, rev, vue) */
const docJ = p => p.evaluate(() => { const d = window.__vcEd.etat.doc, o = {};
  Object.keys(d).sort().forEach(k => { if (k !== 'modifie' && k !== 'rev' && k !== 'vue') o[k] = d[k]; }); return JSON.stringify(o); });
/* historique du croquis (S.undo en JSON, longueurs) */
const pileJ = p => p.evaluate(() => { const S = window.__vcEd.etat; return {undo: JSON.stringify(S.undo), nU: S.undo.length, nR: S.redo.length}; });
/* état propre au déplacement : compteurs, saisie, clignotement, choix, boutons « Annuler » et « Rétablir » (disabled, ou 'absent'), canevas
   de saisie (caché, transformation, taille) et taille du canevas de la page */
const etatL = p => p.evaluate(() => {
  const s = window.__vcEd.etat.pp, o = document.querySelector('.vc .vc-pp'), q = sel => o && o.querySelector(sel), cs = q('.vc-pp-saisie'), cv = q('.vc-pp-cv');
  const dis = sel => q(sel) ? q(sel).disabled : 'absent';
  return {ouvert: !!o, pas: s ? s.pas : null, redo: s ? s.redo : null, saisie: s ? s.saisie : null, flash: s && s.flash ? s.flash.slice() : null, choix: s ? s.choix : null,
    calcul: s ? s.calcul : null, busy: o ? o.getAttribute('aria-busy') : null, annuler: dis('[data-pp="annuler"]'), refaire: dis('[data-pp="refaire"]'),
    cs: cs ? {hidden: cs.hidden, transform: cs.style.transform, w: cs.width, h: cs.height} : null, cv: cv ? {w: cv.width, h: cv.height} : null};
});
/* marque de la page 1 d'un genre (k) et d'un id (pour une bulle : la clé de son anomalie ; un objet peut en porter plusieurs), ou null
   (M : marques(p)) ; cleDe : ce qui la désigne */
const marqueDe = (M, k, id) => M.filter(m => m.k === k && (k === 'bulle' ? m.cle : m.id) === id && m.page === 1)[0] || null;
const cleDe = m => m.k === 'bulle' ? m.cle : m.id;
/* point (mm) dans une boîte élargie de e (mm) */
const dansB = (b, x, y, e) => x >= b[0] - e && x <= b[2] + e && y >= b[1] - e && y <= b[3] + e;
/* boîte (mm) d'une marque : celle de ses formes, sinon celle de son texte */
const boiteM = m => m.b || [m.cx - m.w / 2, m.cy - m.h / 2, m.cx + m.w / 2, m.cy + m.h / 2];
/* pixels de la boîte d'une marque, dans le canevas de la page (sel absent) ou dans celui de la saisie ; {absent: true, sombre: 0, encre: 0} sans ce
   canevas */
const pixelsMarque = (p, m, sel) => p.evaluate(([b, sel]) => document.querySelector('.vc .vc-pp ' + (sel || '.vc-pp-cv')) ? window.__ppT.pixels(window.__ppT.boiteCv(b), sel)
  : {absent: true, sombre: 0, encre: 0}, [boiteM(m), sel || null]);
/* centre d'une marque à l'écran, arrondi au pixel (le glissé part d'un point entier : l'écart au lâcher est alors exact) */
const pointDe = (p, m) => p.evaluate(([x, y]) => window.__ppT.versEcran(x, y), [m.cx, m.cy]).then(q => ({x: Math.round(q.x), y: Math.round(q.y)}));
/* fin du calcul qui suit un lâcher accepté : le compteur attendu, puis le calcul et le rendu finis */
async function apresLacher(p, pas){
  const ok = await attendreQue(p, pas => { const s = window.__vcEd.etat.pp; return !!s && s.pas === pas; }, pas, 4000);
  await attendre(p);
  return ok;
}
/* glissé abandonné ou refusé : saisie close (S.pp.saisie = -1, canevas de saisie caché) */
const saisieClose = p => attendreQue(p, () => { const s = window.__vcEd.etat.pp, c = document.querySelector('.vc .vc-pp-saisie');
  return !!s && s.saisie === -1 && !!c && c.hidden; }, null, 3000);
/* ordres text de la marque i (page 1 du relevé) et ceux de même rang du dernier livrable espionné : le plus grand écart des points (mm), ou
   -1 (aucun texte, ou un autre ordre au même rang) */
const ecartTextes = (p, i) => p.evaluate(i => { const s = window.__vcEd.etat.pp, O = s.rel.pages[0].ordres, L = window.__ppT.dernierLivrable || [], mk = s.rel.marques[i]; let e = 0, n = 0;
  for (const j of mk.ordres){ const o = O[j]; if (o.m !== 'text') continue; const l = L[j]; if (!l || l.m !== 'text' || JSON.stringify(l.a[0]) !== JSON.stringify(o.a[0])) return -1; n++; e = Math.max(e, Math.abs(l.a[1] - o.a[1]), Math.abs(l.a[2] - o.a[2])); }
  return n ? e : -1; }, i);
/* fin du prochain calcul de l'aperçu (aria-busy ôté) : clignotement, saisie, compteur, choix et pixels bleus autour des marques qui
   clignotent, notés dans la tâche du rendu ; puis le clignotement 200 ms plus tard */
const guetterFin = p => p.evaluate(() => {
  window.__lFin = null; const o = document.querySelector('.vc .vc-pp');
  if (window.__lFinMo) window.__lFinMo.disconnect();
  const mo = window.__lFinMo = new MutationObserver(() => {
    const s = window.__vcEd.etat.pp; if (o.getAttribute('aria-busy') === 'true' || !s || s.calcul) return;
    mo.disconnect();
    const f = window.__lFin = {flash: s.flash ? s.flash.slice() : null, saisie: s.saisie, pas: s.pas, choix: s.choix, bleu: (s.flash || []).map(i => window.__ppT.bleuAutour(i)), flash200: 'non lu'};
    setTimeout(() => { const s2 = window.__vcEd.etat.pp; f.flash200 = s2 && s2.flash ? s2.flash.slice() : null; }, 200);
  });
  mo.observe(o, {attributes: true, attributeFilter: ['aria-busy']});
});
const ecartMm = (m, X, Y) => Math.max(Math.abs(m.cx - X), Math.abs(m.cy - Y));
const labDe = (p, id) => p.evaluate(id => { const e = window.__vcEd.etat.doc.el.filter(x => x.id === id)[0]; return e ? JSON.parse(JSON.stringify(e.k === 'tx' ? e.decal || null : e.lab)) : 'absent'; }, id);
const plansDe = p => p.evaluate(() => { const d = window.__vcEd.etat.doc; return 'plans' in d ? JSON.parse(JSON.stringify(d.plans)) : '(absent)'; });
/* cible d'un lâcher (mm de page) : le centre de la marque plus le premier des écarts (mm) qui garde sa boîte dans le milieu du cadre (loin de
   ses bords, de la rose du nord et de l'échelle graphique) */
function cibleDans(m, ecarts){
  const w = m.b ? m.b[2] - m.b[0] : m.w, h = m.b ? m.b[3] - m.b[1] : m.h;
  for (const [dx, dy] of ecarts){ const x = m.cx + dx, y = m.cy + dy; if (x - w / 2 > 40 && x + w / 2 < 180 && y - h / 2 > 30 && y + h / 2 < 175) return {x, y}; }
  return null;
}
/* glissé d'une marque (doigt ou souris) vers la cible (mm de page) : rend le point lâché attendu (mm), d'après l'écart entier en pixels */
async function glisserVers(p, m, cible, souris){
  const e = await etat(p), a = await pointDe(p, m), d = {x: Math.round((cible.x - m.cx) * e.pp.k), y: Math.round((cible.y - m.cy) * e.pp.k)}, b = {x: a.x + d.x, y: a.y + d.y};
  if (souris) await glisserSouris(p, a, b); else await glisserEtapes(p, a, b);
  return {X: m.cx + d.x / e.pp.k, Y: m.cy + d.y / e.pp.k};
}
const ASTUCE = 'Glissez une étiquette, une bulle ou un texte : le PDF l\'imprimera là.';
const GEL_LAB = 'Déplacée sur le plan de l\'état des lieux ; le plan d\'avant-projet garde la sienne.', GEL_TX = 'Déplacé sur le plan de l\'état des lieux ; le plan d\'avant-projet garde le sien.';
const RIEN_A = 'Rien à annuler dans l\'aperçu', RIEN_R = 'Rien à rétablir dans l\'aperçu';
const SIG_FICTIVE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
/* deux regards : l'étiquette de A placée à la main au-dessus de lui, celle de B posée d'office */
const deuxL = () => [Rg('A', -5, 0, 'Regard fictif A', {dx: 0, dy: 1.5}), Rg('B', 5, 0, 'Regard fictif B', null)];
async function deplacer(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await noterToasts(p);
    await controle('l1 : étiquette d\'un symbole glissée au doigt (état des lieux) : pendant le glissé, la page sans elle, elle seule sur le canevas de saisie (taille de la page), qui suit le doigt ; au lâcher, sa marque au point lâché (0,05 mm), choisie, S.pp.pas = 1, « Annuler » actif, aria-busy retombé, saisie close ; le PDF (jsPDF espionné) l\'imprime là ; lâchée au-delà du bord gauche, ramenée dans le cadre', async () => {
      await dessin(p, deuxL());
      await ouvrirApercu(p);
      const e0 = await etat(p), m0 = marqueDe(await marques(p), 'etiq', 'A'); if (!m0) return [false, 'pas d\'étiquette de A'];
      const a = await pointDe(p, m0), b = {x: a.x + 90, y: a.y + 60}, X = m0.cx + 90 / e0.pp.k, Y = m0.cy + 60 / e0.pp.k, ko = [];
      const px0 = await pixelsMarque(p, m0);
      let pendant = null;
      await glisserEtapes(p, a, b, {entre: async k => {
        if (k !== 5) return;
        const vu = await attendreQue(p, () => { const s = window.__vcEd.etat.pp, c = document.querySelector('.vc .vc-pp-saisie'), r = c && /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(c.style.transform);
          return !!s && s.saisie >= 0 && !c.hidden && !!r && Math.abs(r[1] - 45) < 0.5 && Math.abs(r[2] - 30) < 0.5; }, null, 2000);
        pendant = {vu, l: await etatL(p), page: await pixelsMarque(p, m0), saisie: await pixelsMarque(p, m0, '.vc-pp-saisie')};
      }});
      if (!pendant || !pendant.vu) ko.push('pendant le glissé : saisie ' + JSON.stringify(pendant && pendant.l));
      else {
        if (pendant.l.saisie !== m0.i || !pendant.l.cs || pendant.l.cs.w !== pendant.l.cv.w || pendant.l.cs.h !== pendant.l.cv.h) ko.push('saisie ' + JSON.stringify(pendant.l));
        if (!(px0.encre > 0 && pendant.page.encre <= Math.max(3, px0.encre / 10))) ko.push('page pendant le glissé : ' + pendant.page.encre + ' pixels d\'encre dans la boîte (avant : ' + px0.encre + ')');
        if (!(pendant.saisie.encre > 0)) ko.push('canevas de saisie sans l\'étiquette');
      }
      const ok = await apresLacher(p, 1), l1 = await etatL(p), M1 = await marques(p), m1 = marqueDe(M1, 'etiq', 'A');
      if (!ok || !m1) return [false, ko.concat(['lâcher non suivi : ' + JSON.stringify(l1)]).join(' ; ')];
      if (ecartMm(m1, X, Y) > 0.05) ko.push('marque en ' + f3(m1.cx) + ', ' + f3(m1.cy) + ' au lieu de ' + f3(X) + ', ' + f3(Y));
      if (l1.annuler !== false || l1.busy === 'true' || !l1.cs || !l1.cs.hidden || l1.saisie !== -1 || l1.choix !== m1.i) ko.push('après le lâcher : ' + JSON.stringify(l1));
      const lab = await labDe(p, 'A');
      if (!lab || lab.main !== true || lab.E !== 200) ko.push('étiquette écrite ' + JSON.stringify(lab));
      await p.evaluate(() => window.__ppT.sortieEspionnee('pdfEdl'));
      const et = await ecartTextes(p, m1.i);
      if (et < 0 || et > 0.05) ko.push('PDF : textes de l\'étiquette ' + (et < 0 ? 'absents ou à un autre rang' : 'à ' + f3(et) + ' mm'));
      /* lâchée à 2 mm du bord gauche de la page, au-delà du cadre (7 mm) : ramenée à 1 mm du cadre */
      const e1 = await etat(p), a2 = await pointDe(p, m1), xg = Math.round((2 - m1.cx) * e1.pp.k);
      await glisserEtapes(p, a2, {x: a2.x + xg, y: a2.y});
      const ok2 = await apresLacher(p, 2), m2 = marqueDe(await marques(p), 'etiq', 'A');
      if (!ok2 || !m2 || Math.abs(m2.cx - (8 + m2.w / 2)) > 0.05 || Math.abs(m2.cy - m1.cy) > 0.05) ko.push('au-delà du bord gauche : ' + (m2 ? f3(m2.cx) + ', ' + f3(m2.cy) + ' au lieu de ' + f3(8 + m2.w / 2) + ', ' + f3(m1.cy) : 'pas de marque') + ', pas ' + (await etatL(p)).pas);
      await fermerApercu(p);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('l2 : démonstration, à la souris : le texte libre et une bulle de la page 1 lâchés à la place voulue (0,05 mm) ; 3 px puis lever sur une étiquette : un toucher (choisie, rien d\'écrit) ; à × 2, un appui hors des étiquettes qui glisse déplace la page (m168)', async () => {
      await fermerApercu(p);
      await demo(p);
      await ouvrirApercu(p);
      const ko = [], M = await marques(p), tx = M.filter(m => m.k === 'tx' && m.page === 1)[0], bu = M.filter(m => m.k === 'bulle' && m.page === 1 && m.b)[0];
      if (!tx || !bu) return [false, 'texte ' + !!tx + ', bulle ' + !!bu];
      const E = [[15, 10], [-15, 10], [15, -10], [-15, -10], [25, 0], [-25, 0]];
      let pas = 0;
      for (const [m, nom] of [[tx, 'texte'], [bu, 'bulle']]){
        const c = cibleDans(m, E); if (!c){ ko.push(nom + ' : pas de cible dans le milieu du cadre'); continue; }
        const v = await glisserVers(p, m, c, true);
        if (!(await apresLacher(p, ++pas))){ ko.push(nom + ' : lâcher non suivi'); pas = (await etatL(p)).pas || 0; continue; }
        const n = marqueDe(await marques(p), m.k, cleDe(m));
        if (!n || ecartMm(n, v.X, v.Y) > 0.05) ko.push(nom + ' en ' + (n ? f3(n.cx) + ', ' + f3(n.cy) : 'aucune marque') + ' au lieu de ' + f3(v.X) + ', ' + f3(v.Y));
      }
      /* 3 px à la souris puis lever, sur une étiquette dont le centre n'est dans la boîte d'aucune autre marque (elle est alors la plus proche
         du point), après un toucher dans le vide : un toucher */
      const e0 = await etat(p); await toucher(p, vide(e0));
      const M2 = await marques(p), libre = m => M2.every(o => o === m || o.page !== 1 || !dansB(boiteM(o), m.cx, m.cy, 1));
      const et = M2.filter(m => m.k === 'etiq' && m.page === 1 && m.b && m.cx > 40 && m.cx < 180 && libre(m)).sort((a, b) => (b.w * b.h) - (a.w * a.h))[0];
      if (!et) ko.push('pas d\'étiquette');
      else {
        const j0 = await docJ(p), q = await pointDe(p, et);
        await glisserSouris(p, q, {x: q.x + 3, y: q.y}, 1); await C.pause(p, 300);
        const l = await etatL(p), j1 = await docJ(p);
        if (l.choix !== et.i || j1 !== j0 || l.pas !== pas || l.saisie !== -1) ko.push('3 px : choix ' + l.choix + ' (attendu ' + et.i + '), pas ' + l.pas + ', dossier ' + (j1 === j0 ? 'inchangé' : 'changé'));
      }
      /* à × 2, appui dans le cartouche, à droite du cadre (212 mm) et à plus de 44 px de lui (aucune étiquette, aucun texte, aucune bulle à
         portée), à 60 px du bord droit de la zone au moins, à mi-hauteur de la page, qui glisse : la page suit (m168) */
      await bouton(p, 'zoom', 2); await attendreQue(p, () => window.__vcEd.etat.pp.z === 2); await attendre(p);
      const z0 = await etat(p), kz = z0.pp.k, xs = Math.min(250, (z0.zone.w - z0.pp.ox) / kz - 60 / kz);
      if (!(xs > 212 + 44 / kz)) ko.push('cartouche hors de la zone à × 2 (' + f3(xs) + ' mm)');
      else {
        const j2 = await docJ(p), q0 = await p.evaluate(x => window.__ppT.versEcran(x, 105), xs), a = {x: Math.round(q0.x), y: Math.round(q0.y)};
        await glisserSouris(p, a, {x: a.x - 40, y: a.y - 25}); await attendre(p);
        const z1 = await etat(p), j3 = await docJ(p), l = await etatL(p);
        if (Math.abs(z1.pp.ox - z0.pp.ox + 40) > 0.5 || Math.abs(z1.pp.oy - z0.pp.oy + 25) > 0.5 || j3 !== j2 || l.pas !== pas)
          ko.push('page : Δox ' + f3(z1.pp.ox - z0.pp.ox) + ', Δoy ' + f3(z1.pp.oy - z0.pp.oy) + ', dossier ' + (j3 === j2 ? 'inchangé' : 'changé') + ', pas ' + l.pas);
      }
      await fermerApercu(p);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('l3 : dossier à projet : un lâcher sur l\'état des lieux montre le toast du gel une fois par ouverture ; doc.plans.avp porte la valeur gelée ; sur « Avant-projet », l\'étiquette à son ancienne place ; un lâcher sur l\'avant-projet ne change pas e.lab ; un texte : « Déplacé… le sien »', async () => {
      await fermerApercu(p);
      /* sans positions propres (poserK, null) : l2 en a laissé sur la démonstration (une bulle gelée), que dessin ne remet pas à zéro */
      await poserK(p, deuxL().concat([Rg('Z', 8, 4, null, undefined, 'projet'), {id: 'X1', k: 'tx', x: 0, y: -4, txt: 'Texte fictif', taille: 2.5}]), null);
      await noterToasts(p);
      await ouvrirApercu(p);
      const ko = [];
      await bouton(p, 'plan', 'avp'); await attendreQue(p, () => window.__vcEd.etat.pp.mode === 'avp' && !window.__vcEd.etat.pp.calcul); await attendre(p);
      const av0 = marqueDe(await marques(p), 'etiq', 'A'); if (!av0) return [false, 'pas d\'étiquette de A sur l\'avant-projet'];
      await bouton(p, 'plan', 'edl'); await attendreQue(p, () => window.__vcEd.etat.pp.mode === 'edl' && !window.__vcEd.etat.pp.calcul); await attendre(p);
      const m0 = marqueDe(await marques(p), 'etiq', 'A');
      await glisserVers(p, m0, {x: m0.cx + 16, y: m0.cy + 12});
      if (!(await apresLacher(p, 1))) return [false, 'premier lâcher non suivi'];
      const t1 = await toastsNotes(p), pl1 = await plansDe(p);
      if (combien(t1, GEL_LAB) !== 1) ko.push('premier lâcher : toasts ' + JSON.stringify(t1));
      if (!egalK(pl1, {avp: {lab: {A: {dx: 0, dy: 1.5, main: true}}}})) ko.push('gel : ' + jsK(pl1));
      const m1 = marqueDe(await marques(p), 'etiq', 'A');
      await glisserVers(p, m1, {x: m1.cx + 6, y: m1.cy});
      if (!(await apresLacher(p, 2))) ko.push('second lâcher non suivi');
      const t2 = await toastsNotes(p), lab2 = await labDe(p, 'A');
      if (combien(t2, GEL_LAB) !== 1) ko.push('second lâcher : ' + combien(t2, GEL_LAB) + ' toasts du gel');
      await bouton(p, 'plan', 'avp'); await attendreQue(p, () => window.__vcEd.etat.pp.mode === 'avp' && !window.__vcEd.etat.pp.calcul); await attendre(p);
      const av1 = marqueDe(await marques(p), 'etiq', 'A');
      if (!av1 || ecartMm(av1, av0.cx, av0.cy) > 1e-6) ko.push('avant-projet : A en ' + (av1 ? f3(av1.cx) + ', ' + f3(av1.cy) : 'aucune') + ' au lieu de ' + f3(av0.cx) + ', ' + f3(av0.cy));
      else {
        const v = await glisserVers(p, av1, {x: av1.cx - 10, y: av1.cy + 10});
        if (!(await apresLacher(p, 3))) ko.push('lâcher sur l\'avant-projet non suivi');
        const lab3 = await labDe(p, 'A'), pl3 = await plansDe(p), av2 = marqueDe(await marques(p), 'etiq', 'A'), t3 = await toastsNotes(p), P = pl3 && pl3.avp && pl3.avp.lab ? pl3.avp.lab.A : null;
        if (!egalK(lab3, lab2)) ko.push('e.lab changé par l\'avant-projet : ' + jsK(lab3));
        if (!P || P.main !== true || P.E !== 200 || egalK(P, {dx: 0, dy: 1.5, main: true})) ko.push('avant-projet : position propre ' + jsK(P));
        if (!av2 || ecartMm(av2, v.X, v.Y) > 0.05) ko.push('avant-projet : A en ' + (av2 ? f3(av2.cx) + ', ' + f3(av2.cy) : 'aucune') + ' au lieu de ' + f3(v.X) + ', ' + f3(v.Y));
        if (combien(t3, GEL_LAB) !== 1) ko.push('lâcher sur l\'avant-projet : ' + combien(t3, GEL_LAB) + ' toasts du gel');
      }
      /* nouvelle ouverture (sur l'état des lieux, le plan que l'éditeur montre) : le texte lâché, toast « Déplacé… le sien » */
      await fermerApercu(p); await ouvrirApercu(p);
      const e4 = await etat(p), x0 = marqueDe(await marques(p), 'tx', 'X1');
      if (e4.pp.mode !== 'edl' || !x0) ko.push('réouverture : plan ' + e4.pp.mode + ', texte ' + !!x0);
      else {
        await glisserVers(p, x0, {x: x0.cx + 12, y: x0.cy + 8});
        if (!(await apresLacher(p, 1))) ko.push('lâcher du texte non suivi');
        const t4 = await toastsNotes(p), pl4 = await plansDe(p);
        if (combien(t4, GEL_TX) !== 1) ko.push('texte : ' + combien(t4, GEL_TX) + ' toasts « Déplacé… le sien »');
        if (!pl4 || !pl4.avp || !pl4.avp.lab || !egalK(pl4.avp.lab.X1, {auto: true})) ko.push('gel du texte : ' + jsK(pl4));
      }
      await fermerApercu(p);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('l4 : « Annuler » puis « Rétablir » de l\'aperçu (boutons, puis Ctrl+Z et Ctrl+Maj+Z) : dossier d\'avant le lâcher, puis d\'après ; compteurs ; garde d\'identité (chaîne étrangère en haut de S.undo : rien de défait, compteurs à 0) ; à 0, boutons grisés, Ctrl+Z et Ctrl+Maj+Z : « Rien à annuler / rétablir dans l\'aperçu »', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      await noterToasts(p);
      await ouvrirApercu(p);
      const ko = [], j0 = await docJ(p), m0 = marqueDe(await marques(p), 'etiq', 'A');
      await glisserVers(p, m0, {x: m0.cx + 14, y: m0.cy + 9});
      if (!(await apresLacher(p, 1))) return [false, 'lâcher non suivi'];
      const j1 = await docJ(p);
      if (j1 === j0) return [false, 'lâcher sans effet sur le dossier'];
      const pasA = async (nom, faire, j, pas, redo) => {
        await faire();
        const ok = await attendreQue(p, ([pas, redo]) => { const s = window.__vcEd.etat.pp; return !!s && s.pas === pas && s.redo === redo; }, [pas, redo], 4000);
        await attendre(p);
        const l = await etatL(p), jj = await docJ(p);
        if (!ok || jj !== j || l.annuler !== !pas || l.refaire !== !redo) ko.push(nom + ' : pas ' + l.pas + ', redo ' + l.redo + ', boutons ' + l.annuler + '/' + l.refaire + ', dossier ' + (jj === j ? 'attendu' : jj === j0 ? 'd\'avant' : jj === j1 ? 'd\'après' : 'autre'));
      };
      await pasA('« Annuler »', () => bouton(p, 'annuler'), j0, 0, 1);
      await pasA('« Rétablir »', () => bouton(p, 'refaire'), j1, 1, 0);
      await pasA('Ctrl+Z', () => p.keyboard.press('Control+z'), j0, 0, 1);
      await pasA('Ctrl+Maj+Z', () => p.keyboard.press('Control+Shift+z'), j1, 1, 0);
      /* garde d'identité : une chaîne étrangère en haut de S.undo */
      const u0 = await p.evaluate(() => { const S = window.__vcEd.etat; S.undo.push('{"etranger":true}'); return S.undo.length; });
      await noterToasts(p);
      await bouton(p, 'annuler'); await C.pause(p, 300);
      const g = await etatL(p), jg = await docJ(p), tg = await toastsNotes(p), u1 = await p.evaluate(() => { const S = window.__vcEd.etat; return {n: S.undo.length, haut: S.undo[S.undo.length - 1]}; });
      if (g.pas !== 0 || g.redo !== 0 || jg !== j1 || u1.n !== u0 || u1.haut !== '{"etranger":true}' || combien(tg, RIEN_A) !== 1 || g.annuler !== true)
        ko.push('garde d\'identité : pas ' + g.pas + ', redo ' + g.redo + ', dossier ' + (jg === j1 ? 'intact' : 'changé') + ', S.undo ' + u0 + ' → ' + u1.n + ', toasts ' + JSON.stringify(tg));
      await p.evaluate(() => { const S = window.__vcEd.etat; if (S.undo[S.undo.length - 1] === '{"etranger":true}') S.undo.pop(); });
      /* compteurs à 0 (nouvelle ouverture) */
      await fermerApercu(p); await ouvrirApercu(p); await noterToasts(p);
      const l0 = await etatL(p), jz = await docJ(p);
      await p.evaluate(() => document.querySelector('.vc').focus());
      await p.keyboard.press('Control+z'); await C.pause(p, 150); await p.keyboard.press('Control+Shift+z'); await C.pause(p, 300);
      const tz = await toastsNotes(p), jz2 = await docJ(p);
      if (l0.annuler !== true || l0.refaire !== true || l0.pas !== 0 || l0.redo !== 0) ko.push('à 0 : ' + JSON.stringify({pas: l0.pas, redo: l0.redo, annuler: l0.annuler, refaire: l0.refaire}));
      if (combien(tz, RIEN_A) !== 1 || combien(tz, RIEN_R) !== 1 || jz2 !== jz) ko.push('à 0, clavier : toasts ' + JSON.stringify(tz) + ', dossier ' + (jz2 === jz ? 'inchangé' : 'changé'));
      await fermerApercu(p);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('l5 : un tracé dessiné sur le croquis, puis l\'aperçu : « Annuler » grisé, Ctrl+Z ne défait pas le tracé (« Rien à annuler dans l\'aperçu »)', async () => {
      await fermerApercu(p);
      await dessin(p, D.aucun());
      /* tracé de deux points, terminé (comme le contrôle « i : Entrée pendant un tracé en cours ») */
      await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 200);
      const v = await C.vue(p);
      await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
      await C.toucherCv(p, await C.ecranCv(p, v.cx - 2, v.cy - 3)); await C.toucherCv(p, await C.ecranCv(p, v.cx + 2, v.cy - 3));
      await p.evaluate(() => window.__vcEd.terminerTrace()); await C.pause(p, 300);
      const n0 = await p.evaluate(() => ({el: window.__vcEd.etat.doc.el.filter(e => e.k === 'ln').length, undo: window.__vcEd.etat.undo.length}));
      await noterToasts(p);
      await ouvrirApercu(p);
      const l = await etatL(p);
      await p.evaluate(() => document.querySelector('.vc').focus());
      await p.keyboard.press('Control+z'); await C.pause(p, 300);
      const n1 = await p.evaluate(() => ({el: window.__vcEd.etat.doc.el.filter(e => e.k === 'ln').length, undo: window.__vcEd.etat.undo.length})), t = await toastsNotes(p);
      await fermerApercu(p);
      return [n0.el === 1 && n0.undo >= 1 && l.annuler === true && n1.el === 1 && n1.undo === n0.undo && combien(t, RIEN_A) === 1,
        'tracés ' + n0.el + ' → ' + n1.el + ', S.undo ' + n0.undo + ' → ' + n1.undo + ', « Annuler » grisé ' + l.annuler + ', toasts ' + JSON.stringify(t)];
    });
    await controle('l6 : abandons (second doigt, pointercancel, Échap, fenêtre redimensionnée) pendant le glissé : dossier et S.undo inchangés, saisie close, l\'étiquette redessinée à sa place ; après le premier Échap l\'aperçu reste ouvert, le second le ferme', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      await ouvrirApercu(p);
      const ko = [], j0 = await docJ(p), u0 = await pileJ(p);
      /* glissé de a à b en dix pas (cinq pour le second doigt, posé alors à 160 px à droite du premier, resté en b) */
      const cas = [
        ['second doigt', (a, b) => ({pas: 5, fin: async t => { await t('touchStart', [{x: b.x, y: b.y, id: 1}, {x: b.x + 160, y: b.y + 20, id: 2}]); await C.pause(p, LEVER); await t('touchEnd', []); }})],
        ['pointercancel', () => ({fin: 'annuler'})],
        ['Échap', () => ({entre: async k => { if (k === 5){ await p.keyboard.press('Escape'); await saisieClose(p); } }})],
        ['fenêtre redimensionnée', () => ({entre: async k => { if (k === 5){ await p.setViewportSize({width: 1100, height: 760}); await saisieClose(p); } }})]
      ];
      for (const [nom, opt] of cas){
        if (!(await etat(p)).ouvert) await ouvrirApercu(p);
        const m0 = marqueDe(await marques(p), 'etiq', 'A'), a = await pointDe(p, m0), b = {x: a.x + 100, y: a.y + 60};
        await glisserEtapes(p, a, b, opt(a, b));
        const clos = await saisieClose(p);
        if (nom === 'fenêtre redimensionnée'){ await p.setViewportSize({width: 1280, height: 800}); await C.pause(p, 400); }
        if ((await etat(p)).ouvert) await attendre(p);
        const l = await etatL(p), j = await docJ(p), u = await pileJ(p), m = marqueDe(await marques(p), 'etiq', 'A'), px = m ? await pixelsMarque(p, m) : {encre: 0};
        if (!clos || !l.ouvert || j !== j0 || u.undo !== u0.undo || !m || ecartMm(m, m0.cx, m0.cy) > 1e-9 || !(px.encre > 0) || l.pas !== 0)
          ko.push(nom + ' : ' + JSON.stringify({clos, ouvert: l.ouvert, dossier: j === j0 ? 'inchangé' : 'changé', undo: u.undo === u0.undo ? 'inchangé' : 'changé', pas: l.pas, encre: px.encre, place: m ? f3(m.cx) + ',' + f3(m.cy) : null}));
        /* second Échap, l'aperçu resté ouvert : il le ferme, pas l'éditeur */
        if (nom === 'Échap' && l.ouvert){
          await p.keyboard.press('Escape');
          if (!(await attendreQue(p, () => !document.querySelector('.vc .vc-pp') && !window.__vcEd.etat.pp, null, 3000))) ko.push('second Échap : aperçu encore ouvert');
          await C.pause(p, 300);
          if (!(await p.evaluate(() => !!document.querySelector('#modal-root .vc')))) ko.push('second Échap : éditeur fermé');
        }
      }
      await fermerApercu(p);
      return [!ko.length, ko.join(' ; ')];
    });
    await controle('l7 : après « Fermer », « Annuler » du croquis remet l\'étiquette d\'avant le déplacement', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      const lab0 = await labDe(p, 'A');
      await ouvrirApercu(p);
      const m0 = marqueDe(await marques(p), 'etiq', 'A');
      await glisserVers(p, m0, {x: m0.cx + 12, y: m0.cy + 12});
      if (!(await apresLacher(p, 1))) return [false, 'lâcher non suivi'];
      const lab1 = await labDe(p, 'A');
      await fermerApercu(p);
      await p.click('.vc .vc-barre [data-a="annuler"]'); await C.pause(p, 300);
      const lab2 = await labDe(p, 'A');
      return [!egalK(lab1, lab0) && egalK(lab2, lab0), 'avant ' + jsK(lab0) + ', après le lâcher ' + jsK(lab1) + ', après « Annuler » ' + jsK(lab2)];
    });
    await controle('l9 : clignotement : un lâcher qui fait bouger de plus de 0,3 mm une étiquette posée d\'office la met dans S.pp.flash (entourée de bleu), pas l\'étiquette lâchée à sa place ; encore là 200 ms après, vidé ensuite (2 s au plus)', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      await ouvrirApercu(p);
      const M0 = await marques(p), a0 = marqueDe(M0, 'etiq', 'A'), b0 = marqueDe(M0, 'etiq', 'B');
      if (!a0 || !b0) return [false, 'étiquettes absentes'];
      await guetterFin(p);
      await glisserVers(p, a0, {x: b0.cx, y: b0.cy});
      const vu = await attendreQue(p, () => !!window.__lFin && window.__lFin.flash200 !== 'non lu', null, 6000);
      const f = await p.evaluate(() => window.__lFin), M1 = await marques(p), a1 = marqueDe(M1, 'etiq', 'A'), b1 = marqueDe(M1, 'etiq', 'B');
      const vide = await attendreQue(p, () => { const s = window.__vcEd.etat.pp; return !!s && s.flash === null; }, null, 2000);
      await C.pause(p, 100);
      const bleuApres = b1 ? await p.evaluate(i => window.__ppT.bleuAutour(i), b1.i) : -1;
      const bouge = b1 ? ecartMm(b1, b0.cx, b0.cy) : 0, jB = f && f.flash ? f.flash.indexOf(b1.i) : -1;
      const bon = vu && !!f && !!a1 && !!b1 && bouge > 0.3 && jB >= 0 && f.flash.indexOf(a1.i) < 0 && f.bleu[jB] > 0 && Array.isArray(f.flash200) && f.flash200.indexOf(b1.i) >= 0 && vide && bleuApres === 0;
      return [bon, 'B déplacée de ' + f3(bouge) + ' mm ; fin du calcul : ' + JSON.stringify(f) + ' ; vidé ' + vide + ', pixels bleus ensuite ' + bleuApres];
    });
    await controle('l10 : sous-titre de Sorties ; toast de « Replacer toutes les étiquettes » (Réglages) : simple sans position propre placée sur l\'avant-projet (aucune, d\'office, masquée, texte, élément « Projet »), long avec une', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      await p.click('.vc .vc-barre [data-p="sorties"]'); await C.pause(p, 400);
      const st = await p.evaluate(() => { const b = document.querySelector('.vc .vc-pcorps [data-a="apercu"] small'); return b ? b.textContent : null; });
      const replacer = async () => {
        await noterToasts(p);
        await p.evaluate(() => window.__vcEd.ouvrirPanneau('reglages'));
        const b = await p.waitForSelector('.vc .vc-pcorps [data-a="replacerTout"]', {timeout: 3000}).catch(() => null); if (!b) return null;
        await b.click(); await C.pause(p, 200);
        const t = await toastsNotes(p); return t[t.length - 1] || '';
      };
      const els = () => deuxL().concat([Rg('Z', 8, 4, 'Regard projeté Z', null, 'projet'), {id: 'X1', k: 'tx', x: 0, y: -4, txt: 'Texte fictif', taille: 2.5}]);
      const r = [];
      await poserK(p, els(), null); r.push(await replacer());
      await poserK(p, els(), {avp: {lab: {A: {dx: 1, dy: 1, main: true}}}}); r.push(await replacer());
      await poserK(p, els(), {avp: {lab: {X1: {dx: 1, dy: 1}, A: {auto: true}, B: {off: true}, Z: {dx: 1, dy: 1, main: true}}}}); r.push(await replacer());
      const LONG = 'Étiquettes replacées ; celles réglées dans l\'aperçu de l\'avant-projet gardent leur place sur ce plan.';
      return [st === 'La page 1 du PDF, à l\'échelle du livrable : déplacez étiquettes, bulles et textes' && r[0] === 'Étiquettes replacées' && r[1] === LONG && r[2] === 'Étiquettes replacées',
        'sous-titre « ' + st + ' » ; toasts ' + JSON.stringify(r)];
    });
    await controle('l11 : constat signé dans l\'application (geste « c-lock ») : une étiquette déplacée ensuite dans l\'aperçu de son croquis ne change ni le constat signé ni ce que son PDF dessine', async () => {
      await fermerApercu(p);
      await dessin(p, deuxL());
      await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer(); }); await C.pause(p, 400);
      await C.fermerCroquis(p);
      await p.evaluate(() => { const v = window.__VT.S.visites[0]; v.statut = 'visitee'; location.hash = '#/e/' + v.etudeId + '/v/' + v.id + '/constat'; });
      await p.waitForSelector('[data-act="c-concl"]'); await C.pause(p, 600);
      /* constat repris du croquis (ce qui le crée), puis signé (signature du technicien fictive : une image vide d'un pixel ; comme
         tests/navigateur/dossier.js) */
      const sig = await p.evaluate(async s => { const T = window.__VT, v = T.S.visites[0], res = await T.vcResume(v); if (res) T.constatDepuisCroquis(v, res, false);
        const c = v.constat; if (!c) return {signe: false, constat: 'absent'};
        c.sigTech = s; await T.ACTIONS['c-lock'](); return {signe: !!c.signeLe, fige: !!c.fige}; }, SIG_FICTIVE);
      if (!sig.signe || !sig.fige) return [false, 'constat non signé : ' + JSON.stringify(sig)];
      const lire = () => p.evaluate(() => { const T = window.__VT, v = T.S.visites[0]; return {c: JSON.stringify(v.constat), d: JSON.stringify(T.constatPourDessin(v, T.anomsOf(v.id)))}; });
      const av = await lire();
      await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
      await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
      const lab0 = await labDe(p, 'A');
      await ouvrirApercu(p);
      const m0 = marqueDe(await marques(p), 'etiq', 'A'); if (!m0) return [false, 'pas d\'étiquette de A'];
      await glisserVers(p, m0, {x: m0.cx + 15, y: m0.cy + 10});
      const ok = await apresLacher(p, 1), lab1 = await labDe(p, 'A');
      await fermerApercu(p);
      await p.evaluate(() => { const ed = window.__vcEd, S = ed.etat; S.doc.rev = (S.doc.rev || 0) + 1; ed.enregistrer(); }); await C.pause(p, 600);
      await C.fermerCroquis(p);
      const ap = await lire();
      return [ok && !egalK(lab0, lab1) && ap.c === av.c && ap.d === av.d, 'lâcher ' + (ok ? 'suivi' : 'non suivi') + ', étiquette ' + jsK(lab0) + ' → ' + jsK(lab1) + ', constat ' + (ap.c === av.c ? 'intact' : 'changé') + ', dessin du constat ' + (ap.d === av.d ? 'intact' : 'changé')];
    });
    await controle('l13 : « Annuler » et « Rétablir » de l\'aperçu ne défont et ne refont que le déplacement : l\'objet choisi et la saisie en cours du croquis (un tracé de deux points) restent tels quels, comme après « Fermer » (relecture de m170)', async () => {
      /* l11 ferme le croquis : il est rouvert depuis la fiche de la visite */
      if (await p.evaluate(() => !!document.querySelector('#modal-root .vc'))) await fermerApercu(p);
      else {
        await p.evaluate(() => { const v = window.__VT.S.visites[0]; location.hash = '#/e/' + v.etudeId + '/v/' + v.id; }); await p.waitForSelector('[data-act="vc-ouvrir"]');
        await C.ouvrirCroquis(p, {dejaCommence: true}); await p.waitForSelector('#modal-root .vc'); await C.pause(p, 400);
      }
      const ed = () => p.evaluate(() => { const S = window.__vcEd.etat; return {sel: JSON.stringify(S.sel), br: JSON.stringify(S.brouillon), n: S.brouillon ? S.brouillon.pts.length : 0}; });
      /* aperçu ouvert : l'étiquette de A glissée, puis « Annuler » et « Rétablir » de l'aperçu, puis « Fermer » ; à chaque pas, le dossier
         et ce que le croquis saisissait */
      const allerRetour = async () => {
        await ouvrirApercu(p);
        const r = {s0: await ed()}, avant = await docJ(p), m0 = marqueDe(await marques(p), 'etiq', 'A');
        if (!m0){ await fermerApercu(p); return null; }
        await glisserVers(p, m0, {x: m0.cx + 14, y: m0.cy + 9});
        const ok = await apresLacher(p, 1), apres = await docJ(p); r.lacher = ok && apres !== avant; r.s1 = await ed();
        await bouton(p, 'annuler'); r.annule = await attendreQue(p, () => { const s = window.__vcEd.etat.pp; return !!s && s.pas === 0 && s.redo === 1; }); await attendre(p);
        r.docA = await docJ(p) === avant; r.s2 = await ed();
        await bouton(p, 'refaire'); r.refait = await attendreQue(p, () => { const s = window.__vcEd.etat.pp; return !!s && s.pas === 1 && s.redo === 0; }); await attendre(p);
        r.docR = await docJ(p) === apres; r.s3 = await ed();
        await fermerApercu(p); r.s4 = await ed();
        return r;
      };
      const garde = (r, k, v0) => !!r && r.lacher && r.annule && r.docA && r.refait && r.docR && ['s0', 's1', 's2', 's3', 's4'].every(s => r[s][k] === v0);
      const dit = (r, k) => r ? 'lâcher ' + r.lacher + ', annulé ' + r.annule + '/' + r.docA + ', rétabli ' + r.refait + '/' + r.docR + ', ' + ['s0', 's1', 's2', 's3', 's4'].map(s => r[s][k]).join(' → ') : 'pas d\'étiquette de A';
      /* objet choisi (B, fiche ouverte), outil Main */
      await dessin(p, deuxL());
      await p.evaluate(() => { window.__vcEd.choisirOutil({k: 'main'}); window.__vcEd.selectionner('B'); }); await C.pause(p, 300);
      const sel0 = (await ed()).sel, r1 = await allerRetour();
      /* tracé en cours de deux points (outil Tracé), rien de choisi */
      await dessin(p, deuxL());
      await p.evaluate(() => window.__vcEd.fermerNiveau()); await C.pause(p, 200);
      const v = await C.vue(p);
      await C.outil(p, {k: 'ln', id: 'tr', pal: 'tr'});
      await C.toucherCv(p, await C.ecranCv(p, v.cx - 2, v.cy - 3)); await C.toucherCv(p, await C.ecranCv(p, v.cx + 2, v.cy - 3)); await C.pause(p, 300);
      const t0 = await ed(), r2 = await allerRetour();
      return [sel0 === JSON.stringify({id: 'B', sommet: null}) && garde(r1, 'sel', sel0) && t0.n === 2 && garde(r2, 'br', t0.br) && garde(r2, 'n', 2),
        'objet choisi : ' + dit(r1, 'sel') + ' ; tracé en cours : ' + dit(r2, 'n')];
    });
    erreurs(A, 'l12 : déplacer');
  } finally { await A.fermer(); }
}
/* l8 : toast de la première ouverture, dans un navigateur à part (chargement neuf de la page) */
async function astuce(){
  const A = await croquisNeuf(), p = A.p;
  try {
    await noterToasts(p);
    await dessin(p, D.aucun());
    await controle('l8 : toast « Glissez une étiquette… » à la première ouverture de l\'aperçu depuis le chargement, pas à la deuxième, ni après le croquis fermé et rouvert', async () => {
      await ouvrirApercu(p); const t1 = await toastsNotes(p);
      await fermerApercu(p); await ouvrirApercu(p); const t2 = await toastsNotes(p);
      await fermerApercu(p);
      await rouvrirK(p); await noterToasts(p);
      await ouvrirApercu(p); const t3 = await toastsNotes(p);
      await fermerApercu(p);
      return [combien(t1, ASTUCE) === 1 && combien(t2, ASTUCE) === 1 && combien(t3, ASTUCE) === 0, JSON.stringify({premiere: t1, deuxieme: t2, rouvert: t3})];
    });
    erreurs(A, 'l8 : toast de la première ouverture');
  } finally { await A.fermer(); }
}

(async () => {
  for (const f of [demonstration, zoom, compteur, choix, bandeau, clavier, gardes, positionsPropres, deplacer, astuce]){
    try { await f(); } catch (e){ R.ok(false, f.name + ' : exception du test : ' + String(e && e.stack || e).split('\n').slice(0, 2).join(' ')); }
  }
  R.fin();
})();
