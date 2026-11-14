// Drains, 1re à 3e parties (décisions D4, D6, D7, D8 et D9 de la conception « Rejets » ; m121, m122, m123), sans navigateur. Un drain est un
// tronçon qui porte p.drain : 'collecte' (il recueille l'eau du sol) ou 'infiltration' (il la disperse dans le sol). Depuis m122, le drain
// d'infiltration est un exutoire linéaire : l'eau qui l'atteint est dispersée dans le sol. Depuis m123, le drain de collecte compte comme une
// source, à la manière d'un point « Drain » : sa sortie non dessinée prend le réseau de son tracé (EP), et il compte au constat.
// Croquis fictifs (12 rue Fictive, Ville-Exemple), tracés libres (aucun objet à leurs bouts ; un regard au sommet du milieu pour les cas
// « coupé par un regard »).
// d1 : defautsLn('tr', o) recopie o.drain s'il vaut 'collecte' ou 'infiltration', après les autres clés ; toute autre valeur est écartée, et un
//   tronçon sans drain garde exactement ses clés (res, st, diam, mat, pose, long, sens, obs) ; collecteur, trait et escalier n'en prennent
//   pas. VCroquis.drainDe lit le drain d'un tronçon ('' pour une autre valeur, pour un autre tracé ou pour un objet).
// d2 : à l'écran (canevas factice, 40 px par mètre), un peigne : une dent de 0,4 m par mètre réel, la première à 0,5 m du départ, de la couleur
//   du trait (vert pour l'infiltration, même sans réseau : m122) ; à droite du tracé, en suivant ses sommets, pour la collecte ; des deux côtés
//   pour l'infiltration. Tracé droit de 10 m (10 dents),
//   tracé en L de 6 + 6 m (12 dents), plan et vue tournés d'un demi-radian ; drain « à supprimer » : ses dents et ses hachures ; drain coupé
//   par un regard (deux pièces, de 5,25 et 4,75 m) : le pas continue d'une pièce à l'autre. Témoin : le même tracé sans p.drain, aucune dent.
// d3 : de même au plan PDF : au 1/200, dents de 2 mm tous les 5 mm ; au 1/500, dents de 0,8 mm tous les 2 mm ; au 1/2000, au moins 0,8 mm
//   tous les 2 mm sur le papier (1 m n'y fait que 0,5 mm : une dent de 0,2 mm resterait dans le trait de 0,45 mm) ; drain « à supprimer » au
//   plan d'avant-projet : dents et hachures ; drain coupé par un regard : pas continu. Témoin : sans p.drain, aucune dent.
// d4 : DXF : calque VEDE-DRAINS (couleur 3) déclaré seulement s'il sert ; la polyligne du drain y garde la couleur de son réseau (62) ; une
//   LINE par dent, de la même couleur ; drain « projet » sur VEDE-PROJET et drain « à supprimer » sur VEDE-A-SUPPRIMER, dents comprises, sans
//   VEDE-DRAINS ; les dents d'un drain « projet » en trait continu (6 = CONTINUOUS), car le calque est en tirets ; drain coupé par un regard :
//   pas continu, dents aux mêmes places que celles du même drain en projet ; fond en millimètres (u = 0,001) avec une origine : dents de 400
//   unités tous les 1 000. Témoins : sans p.drain, polyligne sur VEDE-EP, sans LINE ni VEDE-DRAINS ; un p.drain d'une autre valeur ne change
//   pas le texte du DXF. Un drain d'infiltration est en couleur 3 (EP, D9 ; m122), bien que la fiche lui retire son réseau (couleur 8 en m121).
// d5 : légende du plan PDF (page 1 ; depuis m123, la page 2 nomme aussi chaque drain de collecte) : « Drain » et « Drain d'infiltration » une
//   fois chacune (deux drains de chaque sorte), après « Canalisation EP (eaux pluviales) », qui reste ; à gauche de chaque ligne, un
//   échantillon gris : un trait de 8 mm et 3 dents, d'un côté ou des deux. Témoin : sans drain, ni l'une ni l'autre.
// d6 (m122) : descente → tronçon → drain d'infiltration à bouts libres (raccord au sommet du milieu) : la descente est conforme, « Rejet :
//   dispersion dans le sol » ; ni « exutoire non dessiné », ni « À compléter », ni « extrémité libre ». Témoin : le même drain sans p.drain,
//   « sansexu », « incomplet » et l'extrémité libre.
// d7 : un WC à la place de la descente : « WC : rejet au sol (infiltration) », non conforme.
// d8 : source posée sur un sommet du drain, sans tronçon ; deux sources sur deux sommets ; regard au tampon béton tenu par le drain (au 1er
//   sommet, après une descente, ou seul au sommet du milieu) : il prend le réseau EP, donc « Regard EP : tampon béton » en réserve. Ce que le
//   drain tient, et ce qu'atteint un tuyau parti d'un de ses sommets, reste vu de toute source qui l'atteint, par n'importe quel sommet :
//   boîte EU au bout d'un tuyau parti du dernier sommet, boîte EU ou puits sur le dernier sommet, tuyau vers une boîte EP (la descente au
//   1er sommet ou au sommet d'où il part) : deux exutoires, « multiple » (« relié à plusieurs réseaux »), « incomplet », jamais « conformes »
//   (au constat, ni conformité ni « Infiltration diffuse ») ; une 2e descente reliée au puits du drain reste ok:PUITS, « rejet dans un
//   puits » non conforme. Une boîte de branchement sans réseau tenue par le drain garde « réseau à indiquer » (ni EP, ni exutoire) : avec
//   elle et un regard sur le drain, la descente reste ok:DISP, « conformes ».
// d9 : constat de la descente : sans code, conforme, « Drain d'infiltration (dispersion dans le sol) », case « Infiltration diffuse » ; du WC :
//   MILIEU, non conforme, « Drain d'infiltration : rejet au sol (milieu naturel) ». Étiquette « Dispersion dans le sol », suivie des détails
//   du tuyau (Ø100), avec ou sans analyse ; resLigne : EP seul, sans analyse et relié ; PRJ en projet ; DXF : polyligne en couleur 3 en trait
//   plein, étiquette sur VEDE-ETIQUETTES en couleur 3 ; plan PDF : l'étiquette. Témoins : un tronçon et un drain de collecte sans détail
//   n'ont pas d'étiquette ; le même tracé sans p.drain reste INC, seul sans analyse et relié à une descente.
// d10 (m123) : drain de collecte seul, « Tronçon EP » à bouts libres : ok, réseau EP présumé, aucune anomalie, « conformes », ni « extrémités
//   libres » ni rien à compléter ; au constat, une ligne « Autres : Drain », « Réseau EP départemental (présumé) », EP_D, « oui », méthode
//   « Eau » ; page 2 du plan PDF : le drain parmi les équipements. « Déduit » (sans réseau) : sansexu, « Drain : exutoire non dessiné »,
//   « incomplet », et, au plan d'avant-projet, « Après travaux : Drain n'a pas d'exutoire dessiné ». Sans méthode : « Drain : méthode de test
//   à indiquer », seul.
// d11 : il suit les règles d'une source EP : vers un puisard, ok:INF, « conformes », case puisard ; vers un regard, un « Tronçon EU » et une
//   boîte EU, « Drain : rejet au réseau EU » non conforme ; relié à un drain d'infiltration (sommet partagé ou tuyau), ok:DISP, « conformes »,
//   case « Infiltration diffuse » ; quand ce drain d'infiltration atteint aussi une boîte EP, « multiple » (DISP, EP), sans conformité.
// d12 : un point « Drain » sur un sommet (le 1er, ou celui du milieu) compte, et lui seul : une ligne, s=ok:EP présumé, aucun contrôle.
// d13 (témoin) : 400 croquis tirés, en état des lieux et en avant-projet (800 analyses) ; deux tronçons sur trois deviennent des drains de
//   collecte (un sur deux en EP, dans le croquis sans drain aussi) ; un drain sur quatre tient un point « Drain » sur son premier sommet
//   libre (dans le croquis sans drain aussi). Ce que fixe() relève ne change pas ; chaque drain compté a son résultat, et la ligne « Autres :
//   Drain » en compte un par drain et par point « Drain » (pas de double compte) ; aucun nœud « dr: » ni lien de drain ne reste.
// d14 : l'eau d'un drain de collecte sort par chacun de ses nœuds (bouts, regards, raccords), sauf par son bout amont quand son sens est
//   indiqué. Regard au sommet du milieu relié à une boîte EU (sens 1, -1, ou sans sens), ou raccord à sa place : « Drain : rejet au réseau
//   EU », NC ; drain orienté vers une boîte EP, regard du milieu vers une boîte EU : « multiple », « incomplet » ; regard du milieu vers un
//   puits : « Drain : rejet dans un puits », NC ; drain sans sens entre deux boîtes EP ou deux puisards, regard du milieu vers une boîte EU :
//   « multiple ». Témoin : boîte EU au bout amont d'un drain orienté, non vue (EP présumé, « conformes ») ; au bout aval, NC. Le contrôle
//   du réseau contredit nomme le drain : « Drain EP : le dessin le relie à réseau EU » (témoin, un tronçon : « Tronçon EP : … »).
// d15 : une descente et un drain de collecte d'identifiant plus petit vont au même collecteur EP, sans boîte, par deux raccords : « pas de
//   boîte de branchement » reste à l'entrée de la descente, comme sans le drain (un point source passe avant un drain).
// g1 (garde) : sur 40 croquis du générateur dont chaque tronçon devient un drain de collecte (état des lieux et avant-projet), aucune
//   exception (analyse, anomalies, conclusion, contrôles, constat déduit), et ce qui ne change pas reste tel quel (fixe() : résultat des
//   sources ponctuelles, contrôles et anomalies posés sur un objet, sauf « pas de boîte de branchement », réseau et sens des pièces, réseau
//   des regards et des objets). Jusqu'à m123, g1 comparait tout le résultat, drains compris : depuis m123, un drain de collecte a son propre
//   résultat, ses contrôles et ses anomalies, et il compte au constat.
// g2 (garde, m122) : sur les mêmes croquis, un tronçon sur deux devient un drain d'infiltration sans réseau ; témoin : les mêmes tronçons sans
//   réseau ni drain. Aucune exception ; seules changent les sources qui atteignent un drain d'infiltration (il y en a). Chacune d'elles
//   atteint encore chaque exutoire dessiné qu'elle atteint dans le témoin, et devient « multiple » si elle en atteint un. Une conclusion
//   devenue « conformes » ne perd aucune NC retenue du témoin, sauf celle d'une source au réseau seulement présumé (sans exutoire dessiné :
//   le drain prime, comme tout exutoire dessiné, sur le réseau présumé d'un bout libre ; le bout libre reste signalé).
// Échouent sur b7ad8a4 (p.drain inconnu) : d1 à d5, sauf les témoins ; g1 y passe.
// Échouent sur 92919f4 (m121) : d6 à d9, g2 (aucune source n'y atteint un drain d'infiltration), et, pour la couleur du drain d'infiltration
//   (gris), les trois cas d'infiltration de d2 et de d3 et le cas d'infiltration de d4 ; les témoins et g1 y passent. Avant la relecture de
//   m122 (drain sans liens entre ses sommets), échouaient les cas « multiple » de d8 (sauf le tuyau parti du sommet de la descente), le
//   puits relié à une 2e descente, la boîte sans réseau et les exutoires gardés de g2.
// Échouent sur 841fd30 (m122) : d10, d11, d12, d14, d15, et les deux premiers cas de d13 (aucun drain compté) ; le 3e cas de d13, d5 et g1
//   y passent. Avant la relecture de m123 (drain relié à ses seuls bouts, ou à son seul bout aval s'il est orienté), échouaient les cas de
//   d14, sauf le drain sans sens relié par un regard du milieu à une boîte EU (bouts libres) et le témoin ; d15 échoue si un drain passe
//   avant une descente pour la place de « pas de boîte » (ordre des seuls identifiants).
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const G = require('./generateur.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('drain'), {canevas, pdf, dxf} = rendus(ch);
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };
const EP = V.RES.EP.rgb.join(','), INC = V.RES.INC.rgb.join(','), css = c => 'rgb(' + c + ')';
const CLES = ['res', 'st', 'diam', 'mat', 'pose', 'long', 'sens', 'obs'];
const DROIT = [[0, 0], [10, 0]], EN_L = [[0, 0], [6, 0], [6, 6]], pts = v => v.map(q => ({x: q[0], y: q[1]}));

/* croquis d'un seul tracé libre T : sommets v, réseau, statut, propriétés en plus (p.drain) ; o : champs du croquis (rot, echelle, u, origine) */
const unTrace = (v, res, st, props, o) => Object.assign(doc({l: [['T', 'tr', res, st, v, 0, props]]}), o || {});
/* drain de collecte EP de 10 m, de statut st, coupé par un regard R à 5,25 m (sommet du milieu) : deux pièces, de 5,25 et 4,75 m */
const avecRegard = (st, o) => Object.assign(doc({o: [['R', 'regard', 5.25, 0, {res: 'EP'}]], l: [['T', 'tr', 'EP', st, [[0, 0], 'R', [10, 0]], 0, {drain: 'collecte'}]]}), o || {});
/* dents de longueur long seulement (t1 = long) : les côtés du carré du regard, plus courts, ne sont pas des dents */
const deLong = (D, long, tol) => D.filter(q => Math.abs(q.t1 - long) < tol);
/* écran en état des lieux : vue de 800 × 600 px centrée sur c, à s px par mètre, tournée comme le plan ; traits ramenés en mètres du croquis */
function ecran(d, s, c){
  const an = V.analyser(copie(d), 'edl'), vue = new V.Vue(800, 600); vue.s = s; vue.cx = c[0]; vue.cy = c[1]; vue.rot = d.rot || 0;
  const cv = canevas(); V.dessinerCroquis(cv.ctx, d, an, vue, 1, {});
  return cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul}));
}
/* segments des formes du plan PDF (en mm) */
const segments = F => [].concat(...F.map(f => f.pts.slice(1).map((q, i) => ({a: f.pts[i], b: q, coul: f.coul}))
  .concat(f.ferme && f.pts.length > 2 ? [{a: f.pts[f.pts.length - 1], b: f.pts[0], coul: f.coul}] : [])));
/* place d'un point q le long du tracé P : distance d, abscisse s depuis le départ, écart t compté positif à droite en suivant les sommets
   (basY : y vers le bas, papier ; sinon y vers le haut, croquis et DXF) */
function place(P, q, basY){
  let best = null, s0 = 0;
  for (let i = 1; i < P.length; i++){
    const a = P[i - 1], b = P[i], L = Math.hypot(b.x - a.x, b.y - a.y); if (!L) continue;
    const ux = (b.x - a.x) / L, uy = (b.y - a.y) / L, k = Math.max(0, Math.min(L, (q.x - a.x) * ux + (q.y - a.y) * uy));
    const x = a.x + ux * k, y = a.y + uy * k, d = Math.hypot(q.x - x, q.y - y), nx = basY ? -uy : uy, ny = basY ? ux : -ux;
    if (!best || d < best.d - 1e-9) best = {d, s: s0 + k, t: (q.x - x) * nx + (q.y - y) * ny};
    s0 += L;
  }
  return best;
}
/* traits proches du tracé P (à moins de 2 × long) : ceux du trait (les deux bouts sur lui), les dents (les deux bouts à la même abscisse,
   l'un au moins hors du trait : {s, t0 ≤ t1, coul}, par abscisse croissante) et les autres (hachures) */
function peigne(traits, P, basY, tol, long){
  const r = {trait: [], dents: [], autres: []};
  traits.forEach(tr => {
    const A = place(P, tr.a, basY), B = place(P, tr.b, basY); if (!A || !B || Math.max(A.d, B.d) > 2 * long) return;
    if (A.d < tol && B.d < tol) r.trait.push(tr);
    else if (Math.abs(A.s - B.s) < tol) r.dents.push({s: (A.s + B.s) / 2, t0: Math.min(A.t, B.t), t1: Math.max(A.t, B.t), coul: tr.coul});
    else r.autres.push(tr);
  });
  r.dents.sort((x, y) => x.s - y.s);
  return r;
}
/* n dents régulières : abscisses pas × (k + 1/2), de 0 à long (à droite) ou de -long à long (des deux côtés), de la couleur coul */
const regulier = (D, n, pas, long, deux, coul, tol) => D.length === n && D.every((q, k) => Math.abs(q.s - pas * (k + .5)) < tol
  && Math.abs(q.t1 - long) < tol && Math.abs(q.t0 - (deux ? -long : 0)) < tol && q.coul === coul);
const f3 = v => +v.toFixed(3), fr = v => String(f3(v)).replace('.', ',');
const txtDents = D => D.length + ' dents' + (D.length ? ' (abscisses ' + D.slice(0, 3).map(q => f3(q.s)).join(', ') + (D.length > 3 ? '…' : '')
  + ' ; écarts ' + f3(D[0].t0) + ' à ' + f3(D[0].t1) + ' ; couleur ' + D[0].coul + ')' : '');

function defauts(){
  const cles = o => JSON.stringify(Object.keys(o));
  const ok = ['collecte', 'infiltration'].map(v => { const p = sur(() => V.defautsLn('tr', {drain: v})); return typeof p === 'object' && cles(p) === JSON.stringify(CLES.concat('drain')) && p.drain === v; });
  R.ok(ok[0] && ok[1], 'd1 defautsLn(\'tr\', {drain}) garde \'collecte\' et \'infiltration\', après les autres clés (obtenu '
    + ['collecte', 'infiltration'].map(v => JSON.stringify(sur(() => V.defautsLn('tr', {drain: v})))).join(' ; ') + ')');
  const autres = ['oui', 'Collecte', 'drain', true, 1, '', null, undefined], mauvais = autres.filter(v => { const p = V.defautsLn('tr', {drain: v, res: 'EP'}); return cles(p) !== JSON.stringify(CLES) || p.res !== 'EP'; });
  R.ok(!mauvais.length && cles(V.defautsLn('tr')) === JSON.stringify(CLES) && cles(V.defautsLn('tr', {res: 'EU', st: 'projet'})) === JSON.stringify(CLES),
    'd1 témoin : toute autre valeur de drain est écartée ; un tronçon sans drain garde exactement ses clés ' + CLES.join(', ') + (mauvais.length ? ' (gardées : ' + mauvais.map(String).join(', ') + ')' : ''));
  const t = ['col', 'lim', 'esc'].filter(x => 'drain' in V.defautsLn(x, {drain: 'collecte'}));
  R.ok(!t.length, 'd1 collecteur, trait et escalier ne prennent jamais de drain' + (t.length ? ' (pris : ' + t.join(', ') + ')' : ''));
  const de = x => typeof V.drainDe === 'function' ? sur(() => V.drainDe(x)) : 'VCroquis.drainDe absente';
  const L = (t, drain) => ({id: 'x', k: 'ln', t, v: [], p: {drain}}), vus = [de(L('tr', 'collecte')), de(L('tr', 'infiltration')), de(L('tr', 'oui')), de(L('tr')),
    de(L('col', 'collecte')), de(L('lim', 'infiltration')), de({id: 'y', k: 'pt', t: 'drain', x: 0, y: 0, p: {drain: 'collecte'}})];
  R.ok(JSON.stringify(vus) === JSON.stringify(['collecte', 'infiltration', '', '', '', '', '']),
    'd1 VCroquis.drainDe : \'collecte\', \'infiltration\', puis \'\' pour une autre valeur, sans drain, pour un collecteur, un trait et un objet (obtenu ' + JSON.stringify(vus) + ')');
}

function ecranPeigne(){
  [['collecte, tracé droit', DROIT, 'EP', 'collecte', {}, [5, 0], 10, css(EP)],
    ['infiltration, tracé droit', DROIT, '', 'infiltration', {}, [5, 0], 10, css(EP)],
    ['collecte, tracé en L', EN_L, 'EP', 'collecte', {}, [3, 3], 12, css(EP)],
    ['infiltration, tracé en L', EN_L, '', 'infiltration', {}, [3, 3], 12, css(EP)],
    ['collecte, plan tourné', EN_L, 'EP', 'collecte', {rot: .5}, [3, 3], 12, css(EP)],
    ['infiltration, plan tourné', EN_L, '', 'infiltration', {rot: .5}, [3, 3], 12, css(EP)]].forEach(([nom, v, res, drain, o, c, n, coul]) => {
    const r = peigne(ecran(unTrace(v, res, '', {drain}, o), 40, c), pts(v), false, 1e-6, .4), deux = drain === 'infiltration';
    R.ok(regulier(r.dents, n, 1, .4, deux, coul, 1e-6) && r.trait.length > 0 && r.trait.every(t => t.coul === coul) && !r.autres.length,
      'd2 écran, ' + nom + ' : ' + n + ' dents de 0,4 m tous les mètres, ' + (deux ? 'des deux côtés' : 'à droite') + ', de la couleur du trait ' + coul + ' (obtenu ' + txtDents(r.dents) + ')');
  });
  const s = peigne(ecran(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'}), 40, [5, 0]), pts(DROIT), false, 1e-6, .4);
  R.ok(regulier(s.dents, 10, 1, .4, false, css(EP), 1e-6) && s.autres.length >= 10 && s.autres.every(t => t.coul === css(EP)),
    'd2 écran, drain « à supprimer » : 10 dents et les hachures, de la couleur du trait (obtenu ' + txtDents(s.dents) + ', ' + s.autres.length + ' hachures)');
  const rg = peigne(ecran(avecRegard(''), 40, [5, 0]), pts(DROIT), false, 1e-6, .4), Drg = deLong(rg.dents, .4, 1e-6);
  R.ok(regulier(Drg, 10, 1, .4, false, css(EP), 1e-6) && rg.trait.length === 2,
    'd2 écran, drain coupé par un regard (pièces de 5,25 et 4,75 m) : le pas continue d\'une pièce à l\'autre, 10 dents à 0,5 m, 1,5 m… 9,5 m (obtenu '
    + rg.trait.length + ' pièces, ' + txtDents(Drg) + (Drg.length > 5 ? ', 6e à ' + f3(Drg[5].s) + ' m' : '') + ')');
  const t = peigne(ecran(unTrace(DROIT, 'EP', '', {}), 40, [5, 0]), pts(DROIT), false, 1e-6, .4);
  R.ok(!t.dents.length && !t.autres.length && t.trait.length > 0, 'd2 témoin : le même tracé sans p.drain, aucune dent (obtenu ' + txtDents(t.dents) + ')');
}

/* plan PDF d'un tracé droit de Lm mètres (10 par défaut) : le trait (forme de 2 sommets longue de Lm à l'échelle) qui porte le plus de dents */
async function surPapier(d, mode, Lm){
  Lm = Lm || 10;
  const r = await pdf(d, {mode}), m = d.echelle / 1000, S = segments(r.formes), long = Math.max(.4 / m, .8);
  const cand = r.formes.filter(f => f.pts.length === 2 && Math.abs(Math.hypot(f.pts[1].x - f.pts[0].x, f.pts[1].y - f.pts[0].y) - Lm / m) < 1e-6);
  let best = null;
  cand.forEach(f => { const pk = peigne(S.filter(q => q.coul === f.coul), f.pts, true, 1e-6, long); if (!best || pk.dents.length > best.dents.length) best = Object.assign(pk, {coul: f.coul}); });
  return {r, pk: best, m};
}
async function papierPeigne(){
  for (const [nom, res, st, drain, ech, mode, coul] of [['collecte au 1/200', 'EP', '', 'collecte', 200, 'edl', EP], ['infiltration au 1/200', '', '', 'infiltration', 200, 'edl', EP],
    ['collecte au 1/500', 'EP', '', 'collecte', 500, 'edl', EP], ['infiltration au 1/500', '', '', 'infiltration', 500, 'edl', EP]]){
    const {r, pk, m} = await surPapier(unTrace(DROIT, res, st, {drain}, {echelle: ech}), mode), deux = drain === 'infiltration';
    R.ok(!r.err.length && !!pk && pk.coul === coul && regulier(pk.dents, 10, 1 / m, .4 / m, deux, coul, 1e-6) && !pk.autres.length,
      'd3 plan PDF, ' + nom + ' : 10 dents de ' + fr(.4 / m) + ' mm tous les ' + fr(1 / m) + ' mm, ' + (deux ? 'des deux côtés' : 'à droite') + ', de la couleur du trait '
      + coul + ' (obtenu ' + (pk ? txtDents(pk.dents) : 'pas de trait') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  /* au 1/2000, 1 m ne fait que 0,5 mm : le peigne garde au moins 0,8 mm tous les 2 mm sur le papier ; tracé de 100 m (50 mm) : 25 dents */
  for (const [nom, res, drain, coul] of [['collecte au 1/2000', 'EP', 'collecte', EP], ['infiltration au 1/2000', '', 'infiltration', EP]]){
    const {r, pk} = await surPapier(unTrace([[0, 0], [100, 0]], res, '', {drain}, {echelle: 2000}), 'edl', 100), deux = drain === 'infiltration';
    R.ok(!r.err.length && !!pk && pk.coul === coul && regulier(pk.dents, 25, 2, .8, deux, coul, 1e-6) && !pk.autres.length,
      'd3 plan PDF, ' + nom + ', tracé de 100 m : 25 dents de 0,8 mm tous les 2 mm, ' + (deux ? 'des deux côtés' : 'à droite') + ', qui sortent du trait de 0,45 mm (obtenu '
      + (pk ? txtDents(pk.dents) : 'pas de trait') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  }
  /* drain coupé par un regard, au 1/200 : ses deux pièces (traits horizontaux de 2 sommets, à la hauteur du plus long, ce qui écarte
     l'échantillon « Canalisation EP » de la légende) mises bout à bout */
  const rp = await pdf(avecRegard('', {echelle: 200}), {mode: 'edl'}), lg = f => Math.abs(f.pts[1].x - f.pts[0].x);
  const Hx = rp.formes.filter(f => f.coul === EP && f.pts.length === 2 && Math.abs(f.pts[1].y - f.pts[0].y) < 1e-9 && lg(f) > 5).sort((a, b) => lg(b) - lg(a));
  const H = Hx.filter(f => Math.abs(f.pts[0].y - Hx[0].pts[0].y) < 1e-9);
  const xs = [].concat(...H.map(f => f.pts.map(q => q.x))), Pr = H.length ? [{x: Math.min(...xs), y: H[0].pts[0].y}, {x: Math.max(...xs), y: H[0].pts[0].y}] : [];
  const Drp = H.length ? deLong(peigne(segments(rp.formes).filter(q => q.coul === EP), Pr, true, 1e-6, 2).dents, 2, 1e-6) : [];
  R.ok(!rp.err.length && H.length === 2 && Math.abs(Pr[1].x - Pr[0].x - 50) < 1e-6 && regulier(Drp, 10, 5, 2, false, EP, 1e-6),
    'd3 plan PDF, drain coupé par un regard au 1/200 : le pas continue d\'une pièce à l\'autre, 10 dents tous les 5 mm (obtenu ' + H.length + ' pièces, '
    + txtDents(Drp) + (Drp.length > 5 ? ', 6e à ' + f3(Drp[5].s) + ' mm' : '') + ')' + (rp.err.length ? ' ' + rp.err.join(' | ') : ''));
  const s = await surPapier(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'}, {echelle: 200}), 'avp');
  R.ok(!s.r.err.length && !!s.pk && regulier(s.pk.dents, 10, 5, 2, false, s.pk.coul, 1e-6) && s.pk.autres.length >= 10,
    'd3 plan d\'avant-projet, drain « à supprimer » : 10 dents et les hachures (obtenu ' + (s.pk ? txtDents(s.pk.dents) + ', ' + s.pk.autres.length + ' hachures' : 'pas de trait') + ')');
  const t = await surPapier(unTrace(DROIT, 'EP', '', {}, {echelle: 200}), 'edl');
  R.ok(!t.r.err.length && !!t.pk && !t.pk.dents.length && !t.pk.autres.length, 'd3 témoin : sans p.drain, aucune dent (obtenu ' + (t.pk ? txtDents(t.pk.dents) : 'pas de trait') + ')');
}

function dxfDrains(){
  const ents = (r, type, cal) => r.ents.filter(q => q.type === type && q.cal === cal);
  const dentsDxf = (r, cal, P, long) => peigne(ents(r, 'LINE', cal).map(q => ({a: q.a, b: q.b, coul: q.c['62']})), P, false, 1e-3, long).dents;
  const vu = r => Object.keys(r.calques).filter(n => /DRAINS|PROJET|SUPPRIMER|VEDE-EP|PRECISER/.test(n)).map(n => n + ':' + r.calques[n]).join(' ')
    + ' ; ' + r.ents.filter(q => q.type === 'POLYLINE' || q.type === 'LINE').map(q => q.type + '@' + q.cal + (q.c['62'] ? '/' + q.c['62'] : '')).filter((x, i, a) => a.indexOf(x) === i).join(' ');
  /* drain d'infiltration : réseau EP, donc couleur 3 (D9, m122), bien que la fiche lui retire son réseau */
  for (const [nom, res, drain, aci, deux] of [['de collecte', 'EP', 'collecte', '3', false], ['d\'infiltration', '', 'infiltration', '3', true]]){
    const r = dxf(unTrace(DROIT, res, '', {drain})), P = ents(r, 'POLYLINE', 'VEDE-DRAINS'), D = dentsDxf(r, 'VEDE-DRAINS', pts(DROIT), .4);
    R.ok(r.calques['VEDE-DRAINS'] === 3 && P.length === 1 && P[0].c['62'] === aci && P[0].sommets.length === 2 && ents(r, 'LINE', 'VEDE-DRAINS').length === 10
      && regulier(D, 10, 1, .4, deux, aci, 1e-3) && !r.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-DRAINS'),
      'd4 DXF, drain ' + nom + ' : calque VEDE-DRAINS (3), polyligne dessus en couleur ' + aci + ', 10 LINE de 0,4 m tous les mètres, ' + (deux ? 'des deux côtés' : 'à droite')
      + ' (obtenu ' + vu(r) + ' ; ' + txtDents(D) + ')');
  }
  const pj = dxf(unTrace(DROIT, 'EP', 'projet', {drain: 'collecte'})), Dp = dentsDxf(pj, 'VEDE-PROJET', pts(DROIT), .4);
  R.ok(!('VEDE-DRAINS' in pj.calques) && ents(pj, 'POLYLINE', 'VEDE-PROJET').length === 1 && ents(pj, 'LINE', 'VEDE-PROJET').length === 10 && Dp.length === 10
    && Dp.every(q => q.coul === undefined) && !pj.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-PROJET'),
    'd4 DXF, drain « projet » : polyligne et 10 dents sur VEDE-PROJET, couleur du calque, sans VEDE-DRAINS (obtenu ' + vu(pj) + ' ; ' + txtDents(Dp) + ')');
  const Lp = ents(pj, 'LINE', 'VEDE-PROJET'), Pj = ents(pj, 'POLYLINE', 'VEDE-PROJET'), lts = Lp.map(q => q.c['6'] || 'BYLAYER').filter((x, i, a) => a.indexOf(x) === i);
  R.ok(Lp.length === 10 && Lp.every(q => q.c['6'] === 'CONTINUOUS') && Pj.length === 1 && Pj[0].c['6'] === 'VEDE_PROJET',
    'd4 DXF, drain « projet » : dents en trait continu (6 = CONTINUOUS), car le calque est en tirets ; polyligne en VEDE_PROJET (obtenu dents en '
    + (lts.join(', ') || 'rien') + ', polyligne en ' + (Pj.length ? Pj[0].c['6'] || 'BYLAYER' : 'rien') + ')');
  const rx = dxf(avecRegard('')), Drx = dentsDxf(rx, 'VEDE-DRAINS', pts(DROIT), .4), rxp = dxf(avecRegard('projet')), Drxp = dentsDxf(rxp, 'VEDE-PROJET', pts(DROIT), .4);
  R.ok(ents(rx, 'POLYLINE', 'VEDE-DRAINS').length === 2 && regulier(Drx, 10, 1, .4, false, '3', 1e-3) && Drxp.length === 10 && Drxp.every((q, k) => Math.abs(q.s - Drx[k].s) < 1e-3),
    'd4 DXF, drain coupé par un regard : deux polylignes, le pas continue (10 dents à 0,5 m, 1,5 m… 9,5 m), aux mêmes places que celles du même drain en projet (obtenu '
    + ents(rx, 'POLYLINE', 'VEDE-DRAINS').length + ' polylignes, ' + txtDents(Drx) + (Drx.length > 5 ? ', 6e à ' + f3(Drx[5].s) + ' m' : '') + ' ; projet : ' + txtDents(Drxp) + ')');
  const sp = dxf(unTrace(DROIT, 'EP', 'supprimer', {drain: 'collecte'})), Ds = dentsDxf(sp, 'VEDE-A-SUPPRIMER', pts(DROIT), .4), Ps = ents(sp, 'POLYLINE', 'VEDE-A-SUPPRIMER');
  R.ok(!('VEDE-DRAINS' in sp.calques) && Ps.length === 1 && Ps[0].c['62'] === '3' && regulier(Ds, 10, 1, .4, false, '3', 1e-3) && !sp.ents.some(q => q.type === 'LINE' && q.cal !== 'VEDE-A-SUPPRIMER'),
    'd4 DXF, drain « à supprimer » : polyligne et 10 dents sur VEDE-A-SUPPRIMER, en couleur 3, sans VEDE-DRAINS (obtenu ' + vu(sp) + ' ; ' + txtDents(Ds) + ')');
  const O = {x: 1000, y: 2000}, mm = dxf(unTrace(DROIT, 'EP', '', {drain: 'collecte'}, {u: .001, origine: O}));
  const Dm = dentsDxf(mm, 'VEDE-DRAINS', [{x: O.x, y: O.y}, {x: O.x + 10000, y: O.y}], 400);
  R.ok(regulier(Dm, 10, 1000, 400, false, '3', 1e-3), 'd4 DXF, fond en millimètres (u = 0,001) avec une origine : 10 dents de 400 unités tous les 1 000, à droite (obtenu ' + txtDents(Dm) + ')');
  const t = dxf(unTrace(DROIT, 'EP', '', {})), t2 = dxf(unTrace(DROIT, 'EP', '', {drain: 'oui'}));
  R.ok(!('VEDE-DRAINS' in t.calques) && ents(t, 'POLYLINE', 'VEDE-EP').length === 1 && ents(t, 'POLYLINE', 'VEDE-EP')[0].c['62'] === undefined && !t.ents.some(q => q.type === 'LINE'),
    'd4 témoin : sans p.drain, polyligne sur VEDE-EP (couleur du calque), sans LINE ni VEDE-DRAINS (obtenu ' + vu(t) + ')');
  R.ok(t2.texte === t.texte, 'd4 témoin : un p.drain d\'une autre valeur (\'oui\') ne change pas le texte du DXF');
}

/* échantillon de la légende : formes à gauche du texte t, sur sa ligne (le texte est écrit 1 mm sous le milieu de la ligne, l'échantillon va de
   13 à 5 mm à sa gauche) */
function echantillon(r, t){
  const lab = r.pos.find(q => q.t === t); if (!lab) return null;
  const F = r.formes.filter(f => f.pts.every(p => p.x > lab.x - 12 && p.x < lab.x - 1 && Math.abs(p.y - (lab.y - 1)) < 1.6));
  return peigne(segments(F), [{x: lab.x - 10, y: lab.y - 1}, {x: lab.x - 2, y: lab.y - 1}], true, 1e-6, 1.2);
}
async function legendeDrains(){
  const d = doc({l: [['A', 'tr', 'EP', '', [[0, 0], [10, 0]], 0, {drain: 'collecte'}], ['B', 'tr', 'EP', '', [[0, 3], [10, 3]], 0, {drain: 'collecte'}],
    ['C', 'tr', '', '', [[0, 6], [10, 6]], 0, {drain: 'infiltration'}], ['D', 'tr', '', '', [[0, 9], [10, 9]], 0, {drain: 'infiltration'}], ['E', 'tr', 'EP', '', [[0, 12], [10, 12]]]]});
  /* la légende est sur la page 1 : la page 2 (dès son titre, avant « Anomalies et préconisations ») nomme chaque drain de collecte (m123) */
  const r = await pdf(d, {mode: 'edl'}), f2 = r.txt.indexOf('Anomalies et préconisations'), p1 = f2 > 0 ? r.txt.slice(0, f2 - 1) : r.txt;
  const n = t => p1.filter(x => x === t).length, i = t => p1.indexOf(t), CEP = 'Canalisation EP (eaux pluviales)';
  R.ok(!r.err.length && n('Drain') === 1 && n('Drain d\'infiltration') === 1 && n(CEP) === 1 && i(CEP) < i('Drain') && i('Drain') < i('Drain d\'infiltration'),
    'd5 légende de la page 1 : « Drain » et « Drain d\'infiltration » une fois chacune, après « ' + CEP + ' » (obtenu ' + n('Drain') + ', ' + n('Drain d\'infiltration') + ', ' + n(CEP)
    + ' ; rangs ' + [i(CEP), i('Drain'), i('Drain d\'infiltration')].join(', ') + ')' + (r.err.length ? ' ' + r.err.join(' | ') : ''));
  for (const [t, deux] of [['Drain', false], ['Drain d\'infiltration', true]]){
    const e = echantillon(r, t);
    R.ok(!!e && e.trait.length === 1 && e.trait[0].coul === INC && regulier(e.dents, 3, 2.5, 1.2, deux, INC, 1e-6) && !e.autres.length,
      'd5 échantillon de « ' + t + ' » : trait gris de 8 mm et 3 dents de 1,2 mm, ' + (deux ? 'des deux côtés' : 'd\'un côté') + ' (obtenu '
      + (e ? e.trait.length + ' trait(s), ' + txtDents(e.dents) + ', ' + e.autres.length + ' autre(s)' : 'pas de ligne') + ')');
  }
  const t = await pdf(doc({l: [['E', 'tr', 'EP', '', [[0, 0], [10, 0]]], ['F', 'tr', '', '', [[0, 3], [10, 3]]]]}), {mode: 'edl'});
  R.ok(!t.err.length && t.txt.indexOf('Drain') < 0 && t.txt.indexOf('Drain d\'infiltration') < 0 && t.txt.indexOf(CEP) >= 0,
    'd5 témoin : sans drain, ni « Drain » ni « Drain d\'infiltration » à la légende');
}

/* m122 : drain d'infiltration, exutoire linéaire. Source s à 8 m du drain T (10 m, bouts libres), tronçon L jusqu'au raccord J posé au
   milieu de T ; props : propriétés de T ({drain: 'infiltration'} par défaut ; {} pour le témoin) */
const INFIL = {drain: 'infiltration'}, FAM = /^(eu-|ep-|fosse|dep-nv|tampon|boite-col|sansboite)/;
const versDrain = (src, props) => doc({o: [['s', src, 0, 8], ['J', 'jonction', 0, 0]],
  l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', [[-5, 0], 'J', [5, 0]], 0, props || INFIL]]});
/* comme vm/regles.js : état et rejet de chaque source, anomalies des règles [clé, nc, texte, statut], conclusion proposée, clés des contrôles */
function juge(d){
  const an = V.analyser(copie(d), 'edl'), L = V.anomaliesDoc(copie(d), an);
  return {an, L, c: V.conclusion(L, an), ctl: an.controles.map(x => x.cle), manque: an.controles.filter(x => x.niveau === 'manque').map(x => x.txt),
    et: Object.keys(an.resObj).map(id => id + '=' + an.resObj[id].etat + (an.resObj[id].res ? ':' + an.resObj[id].res : '')).join(' '),
    a: L.filter(a => FAM.test(a.cle)).map(a => [a.cle, !!a.nc, a.obs, a.st])};
}
/* anomalies attendues [clé, nc, texte], retenues, et aucune autre */
const memesA = (vus, att) => vus.length === att.length && att.every(([cle, nc, obs]) => vus.some(v => v[0] === cle && v[1] === nc && v[2] === obs && v[3] === 'retenue'));
const txtJuge = k => k.et + ' | ' + k.c + ' | ' + (k.a.map(a => a[0] + (a[1] ? ' NC' : ' réserve') + ' « ' + a[2] + ' »').join(', ') || 'aucune anomalie')
  + ' | contrôles : ' + (k.ctl.join(', ') || 'aucun');

function reglesDrain(){
  /* d6 : la descente est conforme ; ni exutoire à dessiner, ni extrémités libres à relier sur le drain */
  const d6 = versDrain('descente'), k6 = juge(d6), es = sur(() => V.etatSource(copie(d6), k6.an, k6.L, 'edl', 's'));
  R.ok(k6.et === 's=ok:DISP' && k6.an.resObj.s.presume === false && !k6.a.length && k6.c === 'conformes' && k6.ctl.indexOf('libre:T') < 0 && !k6.manque.length,
    'd6 descente → tronçon → drain d\'infiltration à bouts libres : s=ok:DISP, non présumé, aucune anomalie, « conformes », ni « extrémités libres » sur le drain, '
    + 'rien à compléter (obtenu ' + txtJuge(k6) + (k6.manque.length ? ' ; à compléter : ' + k6.manque.join(' ; ') : '') + ')');
  R.ok(!!es && es.cls === 'ok' && es.txt === 'Rejet : dispersion dans le sol', 'd6 fiche de la descente : « Rejet : dispersion dans le sol » (obtenu ' + JSON.stringify(es) + ')');
  const t6 = juge(versDrain('descente', {}));
  R.ok(t6.et === 's=sansexu' && t6.c === 'incomplet' && t6.ctl.indexOf('libre:T') >= 0,
    'd6 témoin : sans p.drain, le même tracé reste sans exutoire (« incomplet », extrémités libres signalées) (obtenu ' + txtJuge(t6) + ')');
  /* d7 : un WC à la place de la descente */
  const k7 = juge(versDrain('wc'));
  R.ok(k7.et === 's=ok:DISP' && memesA(k7.a, [['eu-sol:s', true, 'WC : rejet au sol (infiltration)']]) && k7.c === 'non_conformes',
    'd7 un WC à la place de la descente : s=ok:DISP, « WC : rejet au sol (infiltration) » non conforme, « non_conformes » (obtenu ' + txtJuge(k7) + ')');
  /* d8 : descente posée sur le 1er sommet du drain, sans tronçon ; deux sources sur deux sommets ; regard au tampon béton sur un sommet (il
     suit l'exutoire, en EP : réserve), relié à une descente par un tronçon, puis seul */
  const k8a = juge(doc({o: [['s', 'descente', 0, 0]], l: [['T', 'tr', '', '', ['s', [10, 0]], 0, INFIL]]}));
  R.ok(k8a.et === 's=ok:DISP' && !k8a.a.length && k8a.c === 'conformes' && !k8a.manque.length,
    'd8 descente posée sur le 1er sommet du drain, sans tronçon : s=ok:DISP, « conformes » (obtenu ' + txtJuge(k8a) + ')');
  const k8b = juge(doc({o: [['s1', 'descente', 0, 0], ['s2', 'grille', 10, 0]], l: [['T', 'tr', '', '', ['s1', [5, 0], 's2'], 0, INFIL]]}));
  R.ok(k8b.et === 's1=ok:DISP s2=ok:DISP' && !k8b.a.length && k8b.c === 'conformes' && !k8b.manque.length,
    'd8 deux sources sur deux sommets du drain (descente au départ, grille au bout) : chacune ok:DISP, « conformes » (obtenu ' + txtJuge(k8b) + ')');
  const k8c = juge(doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 0, {tampon: 'beton'}]], l: [['L', 'tr', '', '', ['s', 'R']], ['T', 'tr', '', '', ['R', [10, 0]], 0, INFIL]]}));
  R.ok(k8c.et === 's=ok:DISP' && memesA(k8c.a, [['tampon:R', false, 'Regard EP : tampon béton']]) && k8c.c === 'reserves',
    'd8 descente → tronçon → regard au tampon béton sur le 1er sommet du drain : s=ok:DISP, « Regard EP : tampon béton » en réserve (obtenu ' + txtJuge(k8c) + ')');
  const k8d = juge(doc({o: [['R', 'regard', 5, 0, {tampon: 'beton'}]], l: [['T', 'tr', '', '', [[0, 0], 'R', [10, 0]], 0, INFIL]]}));
  R.ok(k8d.et === '' && memesA(k8d.a, [['tampon:R', false, 'Regard EP : tampon béton']]) && k8d.c === 'reserves',
    'd8 regard au tampon béton seul, sur le sommet du milieu du drain : « Regard EP : tampon béton » en réserve (obtenu ' + txtJuge(k8d) + ')');
}

/* d8, suite : ce que le drain tient, et ce qu'atteint un tuyau parti d'un de ses sommets, reste vu de toute source qui l'atteint, par
   n'importe quel sommet. Deux exutoires : « multiple » (réseaux triés), contrôle « relié à plusieurs réseaux », « incomplet » */
const multiple = (k, id, nets) => !!k.an.resObj[id] && k.an.resObj[id].etat === 'multiple' && k.an.resObj[id].nets.slice().sort().join(',') === nets
  && k.ctl.indexOf('multi:' + id) >= 0;
function avalDrain(){
  const J = (id, x) => [id, 'jonction', x, 0];
  [['boîte EU au bout d\'un tuyau parti du dernier sommet, descente arrivée au 1er sommet par un tronçon', 'DISP,EU',
    doc({o: [['s', 'descente', 0, 8], J('J', 0), J('J2', 10), ['B', 'boite', 20, 0, {res: 'EU'}]],
      l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', [5, 0], 'J2'], 0, INFIL], ['L3', 'tr', '', '', ['J2', 'B']]]})],
  ['boîte EU sur le dernier sommet, descente arrivée au sommet du milieu', 'DISP,EU',
    doc({o: [['s', 'descente', 0, 8], J('J', 0), ['B', 'boite', 10, 0, {res: 'EU'}]], l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', [[-5, 0], 'J', 'B'], 0, INFIL]]})],
  ['puits sur le dernier sommet, descente posée sur le 1er', 'DISP,PUITS',
    doc({o: [['s', 'descente', 0, 0], ['P', 'puits', 10, 0]], l: [['T', 'tr', '', '', ['s', [5, 0], 'P'], 0, INFIL]]})],
  ['tuyau parti du dernier sommet vers une boîte EP, descente posée sur le 1er', 'DISP,EP',
    doc({o: [['s', 'descente', 0, 0], J('J2', 10), ['B', 'boite', 20, 0, {res: 'EP'}]], l: [['T', 'tr', '', '', ['s', [5, 0], 'J2'], 0, INFIL], ['Q', 'tr', '', '', ['J2', 'B']]]})],
  ['tuyau vers une boîte EP parti du sommet de la descente (le dernier)', 'DISP,EP',
    doc({o: [['s', 'descente', 10, 0], ['B', 'boite', 20, 0, {res: 'EP'}]], l: [['T', 'tr', '', '', [[0, 0], [5, 0], 's'], 0, INFIL], ['Q', 'tr', '', '', ['s', 'B']]]})]
  ].forEach(([nom, nets, d]) => {
    const k = juge(d), cd = V.constatDeduit(copie(d), V.analyser(copie(d), 'edl')), rd = cd.rows.find(r => r.id === 'gout_av');
    R.ok(multiple(k, 's', nets) && !k.a.length && k.c === 'incomplet' && !!rd && rd.conforme !== 'oui' && !cd.epRecup.infil,
      'd8 ' + nom + ' : s=multiple (' + nets + '), « relié à plusieurs réseaux », aucune anomalie, « incomplet » ; au constat, la descente n\'est pas '
      + 'déclarée conforme et « Infiltration diffuse » n\'est pas cochée (obtenu ' + txtJuge(k) + ' ; constat ' + (rd ? JSON.stringify({libs: rd.libs, conforme: rd.conforme}) : 'sans ligne')
      + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
  });
  /* une 2e descente reliée au puits du drain : rejet dans un puits, non conforme (règle fixe), quoi que voie la 1re */
  const kp = juge(doc({o: [['s1', 'descente', 0, 0], ['s2', 'descente', 10, 8], ['P', 'puits', 10, 0]], l: [['T', 'tr', '', '', ['s1', [5, 0], 'P'], 0, INFIL], ['L2', 'tr', '', '', ['s2', 'P']]]}));
  R.ok(multiple(kp, 's1', 'DISP,PUITS') && /^s1=\S+ s2=ok:PUITS$/.test(kp.et) && memesA(kp.a, [['ep-puits:s2', true, 'Descente EP : rejet dans un puits']]) && kp.c === 'non_conformes',
    'd8 s1 posée sur le 1er sommet du drain, s2 reliée au puits de son dernier sommet : s1=multiple (DISP,PUITS) ; s2=ok:PUITS, « Descente EP : rejet dans un puits » '
    + 'non conforme ; « non_conformes » (obtenu ' + txtJuge(kp) + ')');
  /* boîte de branchement sans réseau et regard sur le drain : ni l'une ni l'autre n'est un exutoire ; le réseau de la boîte reste à indiquer */
  const kt = juge(doc({o: [['s', 'descente', 0, 0], ['Bx', 'boite', 5, 0], ['R', 'regard', 10, 0]], l: [['T', 'tr', '', '', ['s', 'Bx', 'R'], 0, INFIL]]}));
  R.ok(kt.et === 's=ok:DISP' && !kt.a.length && kt.c === 'conformes',
    'd8 descente au 1er sommet du drain, boîte de branchement sans réseau au sommet du milieu, regard au dernier : aucun 2e exutoire, s=ok:DISP, « conformes » (obtenu '
    + txtJuge(kt) + ')');
  R.ok(kt.an.resPt.Bx === 'INC' && kt.ctl.indexOf('boiteres:Bx') >= 0 && kt.an.resPt.R === 'EP',
    'd8 la boîte de branchement sans réseau tenue par le drain garde « Boîte de branchement : réseau à indiquer » (réseau INC) ; le regard prend EP (obtenu Bx '
    + kt.an.resPt.Bx + ', R ' + kt.an.resPt.R + ', contrôles : ' + (kt.ctl.join(', ') || 'aucun') + ')');
}

async function constatEtRendu(){
  /* d9 : constat déduit : la ligne de la descente sans code, conforme, case « Infiltration diffuse » ; celle du WC : MILIEU, non conforme */
  const cd = d => V.constatDeduit(copie(d), V.analyser(copie(d), 'edl')), lu = r => r ? JSON.stringify({codes: r.codes, oks: r.oks, libs: r.libs, conforme: r.conforme}) : 'ligne absente';
  const c1 = cd(versDrain('descente')), rd = c1.rows.find(r => r.id === 'gout_av');
  R.ok(!!rd && JSON.stringify(rd.codes) === '[""]' && JSON.stringify(rd.oks) === '[true]' && rd.libs.join(' ; ') === 'Drain d\'infiltration (dispersion dans le sol)'
    && rd.conforme === 'oui' && JSON.stringify(c1.epRecup) === '{"infil":true}',
    'd9 constat, descente : sans code, conforme, « Drain d\'infiltration (dispersion dans le sol) », case « Infiltration diffuse » (obtenu ' + lu(rd) + ', ouvrages EP ' + JSON.stringify(c1.epRecup) + ')');
  const c2 = cd(versDrain('wc')), rw = c2.rows.find(r => r.id === 'wc');
  R.ok(!!rw && JSON.stringify(rw.codes) === '["MILIEU"]' && JSON.stringify(rw.oks) === '[false]' && rw.libs.join(' ; ') === 'Drain d\'infiltration : rejet au sol (milieu naturel)' && rw.conforme === 'non',
    'd9 constat, WC : MILIEU, non conforme, « Drain d\'infiltration : rejet au sol (milieu naturel) » (obtenu ' + lu(rw) + ')');
  /* étiquette : « Dispersion dans le sol », suivie des détails du tuyau ; témoins : un tronçon et un drain de collecte sans détail n'en ont pas */
  const et = (res, props, st) => { const d = unTrace(DROIT, res, st || '', props); return [sur(() => V.texteEtiquette(d.el[0], V.analyser(copie(d), 'edl'))), sur(() => V.texteEtiquette(d.el[0]))]; };
  const e1 = et('', INFIL), e2 = et('', {drain: 'infiltration', diam: '100'});
  R.ok(e1.every(x => x === 'Dispersion dans le sol') && e2.every(x => x === 'Dispersion dans le sol Ø100'),
    'd9 étiquette du drain d\'infiltration : « Dispersion dans le sol », « Dispersion dans le sol Ø100 » avec un diamètre, avec ou sans analyse (obtenu ' + JSON.stringify(e1.concat(e2)) + ')');
  const e3 = et('', {}), e4 = et('EP', {drain: 'collecte'});
  R.ok(e3.concat(e4).every(x => x === ''), 'd9 témoin : un tronçon et un drain de collecte sans détail n\'ont pas d\'étiquette (obtenu ' + JSON.stringify(e3.concat(e4)) + ')');
  /* réseau du tracé : EP, relié ou non, avec ou sans analyse ; le statut « projet » prime ; témoin : le même tracé sans p.drain */
  const dl = unTrace(DROIT, '', '', INFIL), dr = versDrain('descente'), Tr = dr.el.find(e => e.id === 'T'), pj = unTrace(DROIT, '', 'projet', INFIL);
  const rl = [sur(() => V.resLigne(dl.el[0], V.analyser(copie(dl), 'edl'))), sur(() => V.resLigne(dl.el[0], null)), sur(() => V.resLigne(Tr, V.analyser(copie(dr), 'edl'))),
    sur(() => V.resLigne(pj.el[0], V.analyser(copie(pj), 'avp')))];
  R.ok(rl.join() === 'EP,EP,EP,PRJ', 'd9 resLigne du drain d\'infiltration : EP seul, sans analyse et relié à une descente ; PRJ en projet (obtenu ' + rl.join(', ') + ')');
  const td = versDrain('descente', {}), rt = [V.resLigne(unTrace(DROIT, '', '', {}).el[0], null), V.resLigne(td.el.find(e => e.id === 'T'), V.analyser(copie(td), 'edl'))];
  R.ok(rt.join() === 'INC,INC', 'd9 témoin : sans p.drain, le même tracé reste « à préciser » (obtenu ' + rt.join(', ') + ')');
  /* DXF et plan PDF, étiquette placée (lab nul) : polyligne en couleur 3 sur VEDE-DRAINS, en trait plein ; étiquette sur VEDE-ETIQUETTES */
  const dd = unTrace(DROIT, '', '', INFIL); dd.el[0].lab = null;
  const x = dxf(dd), P = x.ents.filter(q => q.type === 'POLYLINE' && q.cal === 'VEDE-DRAINS'), X = x.ents.filter(q => q.type === 'TEXT' && q.c['1'] === 'Dispersion dans le sol');
  R.ok(P.length === 1 && P[0].c['62'] === '3' && !P[0].c['6'] && X.length === 1 && X[0].cal === 'VEDE-ETIQUETTES' && X[0].c['62'] === '3',
    'd9 DXF : drain d\'infiltration en couleur 3 sur VEDE-DRAINS, en trait plein ; étiquette « Dispersion dans le sol » sur VEDE-ETIQUETTES, en couleur 3 (obtenu '
    + P.map(q => 'polyligne ' + q.c['62'] + (q.c['6'] ? ' ' + q.c['6'] : '')).join(', ') + ' ; ' + (X.map(q => q.cal + '/' + q.c['62']).join(', ') || 'pas d\'étiquette') + ')');
  const p = await pdf(dd, {mode: 'edl'});
  R.ok(!p.err.length && p.txt.indexOf('Dispersion dans le sol') >= 0, 'd9 plan PDF : étiquette « Dispersion dans le sol »' + (p.err.length ? ' (' + p.err.join(' | ') + ')' : ''));
}

/* garde : ce que l'analyse tire d'un croquis (les éléments du croquis n'y sont pas recopiés : seulement leurs identifiants) */
const uneSource = r => r.etat + ':' + (r.nets || []).join(',') + (r.presume ? '(p)' : '') + (r.fosse ? ' F=' + r.fosse : '') + (r.boite ? ' B=' + r.boite : '')
  + (r.conflit ? ' c=' + r.conflit.join(',') : '') + (r.ambigu ? ' a=' + r.ambigu.join(',') : '') + (r.sortiesLibres ? ' sl=' + r.sortiesLibres.length : '');
const tirage = g => doc(G.gen(g, {avp: g % 3 === 0, maxN: 2 + g % 7, exutoires: G.EXUTOIRES.concat(['infiltration', 'puits'])}));
function resultat(d, mode){
  try {
    const an = V.analyser(copie(d), mode), L = V.anomaliesDoc(copie(d), an), cd = V.constatDeduit(copie(d), an);
    const src = Object.keys(an.resObj).sort().map(id => id + '=' + uneSource(an.resObj[id])).join(' ');
    return [src, L.map(a => a.cle + '@' + a.objId + ':' + a.st + ':' + a.txt).sort().join(','), V.conclusion(L, an), an.controles.map(x => x.niveau + ':' + x.txt).sort().join(' ; '),
      an.pieces.map(p => p.id + (an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=') + an.resPiece[p.id].res).sort().join(' ; '),
      JSON.stringify({rows: cd.rows, epRecup: cd.epRecup, sansCote: cd.sansCote, methodes: cd.methodes})].join(' | ');
  } catch (e){ return 'exception : ' + e.message; }
}
/* ce qu'un drain de collecte ne change pas (m123) : le résultat de chaque source ponctuelle ; les contrôles et les anomalies posés sur un
   objet, sauf « pas de boîte de branchement » (une par collecteur et réseau : un drain peut en atteindre un sans boîte) ; le réseau et le
   sens de chaque pièce ; le réseau des regards et des objets traversés. L : anomaliesDoc */
const PARTS = ['sources ponctuelles', 'contrôles des objets', 'anomalies des objets', 'pièces', 'regards et objets'];
function fixe(an, L){
  return [Object.keys(an.resObj).filter(id => an.objs[id]).sort().map(id => id + '=' + uneSource(an.resObj[id])).join(' '),
    an.controles.filter(c => an.objs[c.id]).map(c => c.cle + ':' + c.txt).sort().join(' ; '),
    L.filter(a => a.objId && an.objs[a.objId] && !/^sansboite:/.test(a.cle)).map(a => a.cle + '@' + a.objId + ':' + a.st + ':' + a.obs).sort().join(','),
    an.pieces.map(p => p.id + (an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=') + JSON.stringify(an.resPiece[p.id])).sort().join(' ; '),
    JSON.stringify(an.resPt)];
}
/* première partie qui diffère, et l'endroit */
function ecartDe(a, b){
  const i = a.findIndex((x, k) => x !== b[k]); if (i < 0) return '';
  let j = 0; while (j < a[i].length && a[i][j] === b[i][j]) j++;
  return PARTS[i] + ' : …' + a[i].slice(Math.max(0, j - 30), j + 50) + '… > …' + b[i].slice(Math.max(0, j - 30), j + 50) + '…';
}
const fixeDe = (d, mode) => { const an = V.analyser(copie(d), mode); return fixe(an, V.anomaliesDoc(copie(d), an)); };
/* g1 : chaque tronçon devient un drain de collecte (réseau gardé) ; depuis m123, il compte comme une source : seul tient ce qui ne change pas
   (fixe), et aucune exception (analyse, anomalies, conclusion, contrôles, constat déduit) */
function garde(){
  let n = 0, drains = 0; const ecarts = [];
  for (let g = 1; g <= 40; g++){
    const d = tirage(g), dd = copie(d);
    dd.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr'){ e.p.drain = 'collecte'; drains++; } });
    ['edl', 'avp'].forEach(mode => { n++;
      const rb = resultat(dd, mode); if (/^exception/.test(rb)){ ecarts.push(g + ' ' + mode + ' : ' + rb); return; }
      const e = ecartDe(fixeDe(d, mode), fixeDe(dd, mode)); if (e) ecarts.push(g + ' ' + mode + ' : ' + e); });
  }
  R.ok(!ecarts.length && n === 80, 'g1 garde : un drain de collecte ne change ni les sources ponctuelles, ni les contrôles et anomalies des objets, ni les pièces, ni les regards ('
    + n + ' analyses, ' + drains + ' drains) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun'));
}

/* m123 : drain de collecte, source linéaire (Q3 b, Q4 b ; décisions D4, D6, D7). DC : ses propriétés (méthode « Eau ») */
const DC = {drain: 'collecte', meth: ['eau']};
const cdDe = (d, mode) => V.constatDeduit(copie(d), V.analyser(copie(d), mode || 'edl'));
/* lignes « Autres » du constat qui comptent ; la ligne « Autres : Drain » */
const autres = cd => cd.rows.filter(r => !r.std && r.nb).map(r => r.label + ' ×' + r.nb);
const ligneDrain = cd => cd.rows.find(r => r.id === 'autre:Drain');
const luLigne = r => r ? JSON.stringify({nb: r.nb, codes: r.codes, libs: r.libs, conforme: r.conforme, meth: r.meth}) : 'pas de ligne « Autres : Drain »';
async function drainCollecte(){
  /* d10 : drain de collecte seul, EP, bouts libres : sa sortie non dessinée est présumée au réseau EP, sans message ; il compte au constat */
  const d10 = unTrace(DROIT, 'EP', '', DC), k10 = juge(d10), c10 = cdDe(d10), r10 = ligneDrain(c10);
  R.ok(k10.et === 'T=ok:EP' && k10.an.resObj.T.presume === true && !k10.a.length && k10.c === 'conformes' && k10.ctl.indexOf('libre:T') < 0 && !k10.manque.length,
    'd10 drain de collecte seul (EP, bouts libres) : T=ok:EP présumé, aucune anomalie, « conformes », ni « extrémités libres », rien à compléter (obtenu ' + txtJuge(k10) + ')');
  R.ok(autres(c10).join() === 'Drain ×1' && !!r10 && r10.libs.join(' ; ') === 'Réseau EP départemental (présumé)' && r10.raccord === 'EP_D' && r10.conforme === 'oui' && r10.meth.join() === 'eau',
    'd10 constat : une ligne « Autres : Drain », « Réseau EP départemental (présumé) », EP_D, conforme « oui », méthode « Eau » (obtenu ' + (autres(c10).join(', ') || 'aucune ligne « Autres »')
    + ' ; ' + luLigne(r10) + ')');
  const p10 = await pdf(d10, {mode: 'edl'});
  R.ok(!p10.err.length && p10.txt.indexOf('réseau EP départemental (présumé)') >= 0 && p10.txt.indexOf('Aucun équipement dessiné.') < 0,
    'd10 page 2 du plan PDF : le drain parmi les équipements, « réseau EP départemental (présumé) »' + (p10.err.length ? ' (' + p10.err.join(' | ') + ')' : ''));
  /* « Déduit » (sans réseau) : rien à présumer ; exutoire à dessiner */
  const d10b = unTrace(DROIT, '', '', DC), k10b = juge(d10b);
  R.ok(k10b.et === 'T=sansexu' && k10b.c === 'incomplet' && k10b.manque.some(t => /^Drain : exutoire non dessiné/.test(t)) && k10b.ctl.indexOf('libre:T') < 0,
    'd10 drain de collecte « Déduit », bouts libres : T=sansexu, « Drain : exutoire non dessiné », « incomplet », ni « extrémités libres » (obtenu ' + txtJuge(k10b)
    + (k10b.manque.length ? ' ; à compléter : ' + k10b.manque.join(' ; ') : '') + ')');
  const p10b = await pdf(d10b, {mode: 'avp'}), apres = 'Après travaux : Drain n\'a pas d\'exutoire dessiné : raccordement à compléter dans le projet';
  R.ok(!p10b.err.length && p10b.txt.indexOf(apres) >= 0, 'd10 page 2 du plan PDF d\'avant-projet : « ' + apres + ' »' + (p10b.err.length ? ' (' + p10b.err.join(' | ') + ')' : ''));
  /* sans méthode : à indiquer, comme pour un point « Drain » */
  const k10c = juge(unTrace(DROIT, 'EP', '', {drain: 'collecte'}));
  R.ok(k10c.manque.join(' ; ') === 'Drain : méthode de test à indiquer' && k10c.ctl.indexOf('meth:T') >= 0,
    'd10 drain de collecte sans méthode : « Drain : méthode de test à indiquer », seul (obtenu ' + (k10c.manque.join(' ; ') || 'rien à compléter') + ')');

  /* d11 : il suit les règles d'une source EP (D6) */
  const d11a = doc({o: [['P', 'puisard', 10, 0]], l: [['T', 'tr', 'EP', '', [[0, 0], 'P'], 0, DC]]}), k11a = juge(d11a), c11a = cdDe(d11a), r11a = ligneDrain(c11a);
  R.ok(k11a.et === 'T=ok:INF' && !k11a.a.length && k11a.c === 'conformes' && !!r11a && r11a.nb === 1 && r11a.conforme === 'oui'
    && r11a.libs.join(' ; ') === 'Puisard (infiltration à la parcelle)' && c11a.epRecup.puisard === true,
    'd11 drain de collecte vers un puisard : T=ok:INF, « conformes » ; au constat, « Puisard (infiltration à la parcelle) », conforme, case puisard (obtenu ' + txtJuge(k11a)
    + ' ; ' + luLigne(r11a) + ', ouvrages EP ' + JSON.stringify(c11a.epRecup) + ')');
  const d11b = doc({o: [['R', 'regard', 10, 0], ['B', 'boite', 20, 0, {res: 'EU'}]], l: [['T', 'tr', 'EP', '', [[0, 0], 'R'], 0, DC], ['L', 'tr', 'EU', '', ['R', 'B']]]});
  const k11b = juge(d11b), r11b = ligneDrain(cdDe(d11b));
  R.ok(k11b.et === 'T=ok:EU' && memesA(k11b.a, [['ep-eu:T', true, 'Drain : rejet au réseau EU']]) && k11b.c === 'non_conformes' && !!r11b && r11b.conforme === 'non' && r11b.raccord === 'EU_D',
    'd11 drain de collecte → regard → Tronçon EU → boîte EU : « Drain : rejet au réseau EU » non conforme, « non_conformes » ; au constat, EU_D, « non » (obtenu ' + txtJuge(k11b)
    + ' ; ' + luLigne(r11b) + ')');
  /* relié à un drain d'infiltration : règles de m122 (dispersion dans le sol ; « multiple » avec un autre exutoire) */
  const DI = 'Drain d\'infiltration (dispersion dans le sol)';
  [['par un sommet partagé (regard)', doc({o: [['R', 'regard', 10, 0]], l: [['T', 'tr', 'EP', '', [[0, 0], 'R'], 0, DC], ['I', 'tr', '', '', ['R', [20, 0]], 0, INFIL]]})],
    ['par un tuyau', doc({o: [['K', 'regard', 0, 8], ['J', 'jonction', 0, 0]],
      l: [['T', 'tr', 'EP', '', [[-6, 8], 'K'], 0, DC], ['L', 'tr', '', '', ['K', 'J']], ['I', 'tr', '', '', [[-5, 0], 'J', [5, 0]], 0, INFIL]]})]
  ].forEach(([par, d]) => {
    const k = juge(d), cd = cdDe(d), r = ligneDrain(cd);
    R.ok(k.et === 'T=ok:DISP' && !k.a.length && k.c === 'conformes' && !!r && r.libs.join(' ; ') === DI && r.conforme === 'oui' && cd.epRecup.infil === true,
      'd11 drain de collecte relié à un drain d\'infiltration ' + par + ' : T=ok:DISP, « conformes » ; au constat, « ' + DI + ' », case « Infiltration diffuse » (obtenu ' + txtJuge(k)
      + ' ; ' + luLigne(r) + ')');
  });
  const d11d = doc({o: [['R', 'regard', 10, 0], ['J2', 'jonction', 20, 0], ['B', 'boite', 20, -6, {res: 'EP'}]],
    l: [['T', 'tr', 'EP', '', [[0, 0], 'R'], 0, DC], ['I', 'tr', '', '', ['R', [15, 0], 'J2'], 0, INFIL], ['Q', 'tr', '', '', ['J2', 'B']]]});
  const k11d = juge(d11d), r11d = ligneDrain(cdDe(d11d));
  R.ok(multiple(k11d, 'T', 'DISP,EP') && !k11d.a.length && k11d.c === 'incomplet' && !!r11d && r11d.conforme !== 'oui',
    'd11 le drain d\'infiltration atteint aussi une boîte EP par un tuyau parti de son dernier sommet : T=multiple (DISP,EP), « relié à plusieurs réseaux », « incomplet », '
    + 'pas de conformité au constat (obtenu ' + txtJuge(k11d) + ' ; ' + luLigne(r11d) + ')');

  /* d12 : un point « Drain » posé sur un sommet du drain de collecte compte, et lui seul : une ligne, pas de double compte */
  [['au 1er sommet', 0, ['s', [10, 0]]], ['au sommet du milieu', 5, [[0, 0], 's', [10, 0]]]].forEach(([ou, x, v]) => {
    const d = doc({o: [['s', 'drain', x, 0]], l: [['T', 'tr', 'EP', '', v, 0, {drain: 'collecte'}]]}), k = juge(d), cd = cdDe(d);
    R.ok(k.et === 's=ok:EP' && k.an.resObj.s.presume === true && !k.a.length && k.c === 'conformes' && !k.ctl.length && autres(cd).join() === 'Drain ×1',
      'd12 point « Drain » ' + ou + ' du drain de collecte : une seule ligne « Autres : Drain », s=ok:EP présumé, « conformes », aucune aide ni rien à compléter (obtenu '
      + txtJuge(k) + ' ; lignes « Autres » : ' + (autres(cd).join(', ') || 'aucune') + ')');
  });
}
/* d14 : l'eau qu'un drain de collecte recueille sur toute sa longueur peut sortir par chacun de ses nœuds (bouts, regards, raccords), sauf
   par son bout amont quand son sens est indiqué. Un regard ou un raccord posé sur un sommet du milieu, d'où part un autre tuyau, est donc vu
   avec ou sans sens, comme depuis un point « Drain » en tête ; de même quand les deux bouts sont des exutoires (un exutoire n'est pas
   traversé). BEU : boîte EU ; VERS_B : tuyau du regard R vers elle */
const BEU = ['B', 'boite', 10, -10, {res: 'EU'}], VERS_B = ['L', 'tr', '', '', ['R', 'B']], EU_T = [['ep-eu:T', true, 'Drain : rejet au réseau EU']];
function noeudsDrain(){
  [1, -1, 0].forEach(s => {
    const k = juge(doc({o: [['R', 'regard', 10, 0], BEU], l: [['T', 'tr', 'EP', '', [[0, 0], 'R', [20, 0]], s, DC], VERS_B]}));
    R.ok(k.et === 'T=ok:EU' && memesA(k.a, EU_T) && k.c === 'non_conformes',
      'd14 drain de collecte ' + (s ? 'orienté (sens ' + s + ')' : 'sans sens') + ', regard au sommet du milieu relié à une boîte EU : « Drain : rejet au réseau EU », NC (obtenu '
      + txtJuge(k) + ')');
  });
  const kj = juge(doc({o: [['J', 'jonction', 10, 0], BEU], l: [['T', 'tr', 'EP', '', [[0, 0], 'J', [20, 0]], 1, DC], ['L', 'tr', '', '', ['J', 'B']]]}));
  R.ok(kj.et === 'T=ok:EU' && memesA(kj.a, EU_T) && kj.c === 'non_conformes',
    'd14 drain orienté, raccord au sommet du milieu relié à une boîte EU : « Drain : rejet au réseau EU », NC (obtenu ' + txtJuge(kj) + ')');
  const k2 = juge(doc({o: [['R', 'regard', 10, 0], BEU, ['R2', 'regard', 20, 0], ['B2', 'boite', 30, 0, {res: 'EP'}]],
    l: [['T', 'tr', 'EP', '', [[0, 0], 'R', 'R2'], 1, DC], VERS_B, ['L2', 'tr', '', '', ['R2', 'B2']]]}));
  R.ok(multiple(k2, 'T', 'EP,EU') && !k2.a.length && k2.c === 'incomplet',
    'd14 drain orienté vers une boîte EP, regard au sommet du milieu relié à une boîte EU : T=multiple (EP, EU), « relié à plusieurs réseaux », « incomplet » (obtenu '
    + txtJuge(k2) + ')');
  const kp = juge(doc({o: [['R', 'regard', 10, 0], ['P', 'puits', 10, -10]], l: [['T', 'tr', 'EP', '', [[0, 0], 'R', [20, 0]], 1, DC], ['L', 'tr', '', '', ['R', 'P']]]}));
  R.ok(kp.et === 'T=ok:PUITS' && memesA(kp.a, [['ep-puits:T', true, 'Drain : rejet dans un puits']]) && kp.c === 'non_conformes',
    'd14 drain orienté, regard au sommet du milieu relié à un puits : « Drain : rejet dans un puits », NC (obtenu ' + txtJuge(kp) + ')');
  [['entre deux boîtes EP', 'boite', {res: 'EP'}, 'EP,EU'], ['entre deux puisards', 'puisard', {}, 'EU,INF']].forEach(([entre, t, p, nets]) => {
    const k = juge(doc({o: [['E1', t, 0, 0, p], ['R', 'regard', 10, 0], ['E2', t, 20, 0, p], BEU], l: [['T', 'tr', 'EP', '', ['E1', 'R', 'E2'], 0, DC], VERS_B]}));
    R.ok(multiple(k, 'T', nets) && !k.a.length && k.c === 'incomplet',
      'd14 drain sans sens ' + entre + ', regard au sommet du milieu relié à une boîte EU : T=multiple (' + nets.split(',').join(', ') + '), « incomplet » (obtenu '
      + txtJuge(k) + ')');
  });
  /* témoin : la sortie du bout amont n'est pas vue quand le sens est indiqué (l'eau du drain s'en éloigne) ; elle l'est s'il est le bout aval */
  const amont = s => juge(doc({o: [['R0', 'regard', 0, 0], BEU], l: [['T', 'tr', 'EP', '', ['R0', [10, 0], [20, 0]], s, DC], ['L', 'tr', '', '', ['R0', 'B']]]}));
  const ka = amont(1), kb = amont(-1);
  R.ok(ka.et === 'T=ok:EP' && ka.an.resObj.T.presume === true && !ka.a.length && ka.c === 'conformes' && kb.et === 'T=ok:EU' && memesA(kb.a, EU_T),
    'd14 témoin : boîte EU au bout amont d\'un drain orienté (sens 1) non vue, T=ok:EP présumé, « conformes » ; au bout aval (sens -1), NC (obtenu ' + txtJuge(ka)
    + ' ; ' + txtJuge(kb) + ')');
  /* le contrôle « le dessin le relie à » nomme le drain « Drain », comme ses autres contrôles ; un tronçon reste « Tronçon » */
  const dit = props => V.analyser(copie(doc({o: [['R', 'regard', 10, 0], BEU], l: [['T', 'tr', 'EP', '', [[0, 0], 'R', [20, 0]], 1, props], VERS_B]})), 'edl')
    .controles.filter(x => /^contredit:/.test(x.cle)).map(x => x.txt).join(' ; ');
  const dd = dit(DC), dt = dit({});
  R.ok(dd === 'Drain EP : le dessin le relie à réseau EU' && dt === 'Tronçon EP : le dessin le relie à réseau EU',
    'd14 contrôle du réseau contredit : « Drain EP : le dessin le relie à réseau EU » ; témoin, un tronçon : « Tronçon EP : … » (obtenu ' + dd + ' ; ' + dt + ')');
}
/* d15 : « pas de boîte de branchement » se place à l'entrée d'un point source plutôt qu'à celle d'un drain de collecte, même d'identifiant
   plus petit : dessiner le drain ne la déplace pas. Une descente z et un drain A vont au même collecteur EP, sans boîte, par deux raccords */
function boiteDrain(){
  const sb = avec => { const k = juge(doc({o: [['z', 'descente', 0, 10], ['j1', 'jonction', 0, 0, {}], ['j2', 'jonction', 20, 0, {}]],
    l: [['C', 'col', 'EP', '', [[-10, 0], 'j1', 'j2', [30, 0]]], ['L1', 'tr', 'EP', '', ['z', 'j1']]].concat(avec ? [['A', 'tr', 'EP', '', [[20, 10], 'j2'], 0, DC]] : [])}));
    const ra = k.an.resObj.A;
    return {k, a: !ra ? 'A non compté' : ra.etat + ':' + ra.res + (ra.boite ? ' boîte' : ''), sb: k.L.filter(a => /^sansboite:/.test(a.cle)).map(a => a.cle + '@' + a.objId).join(', ')};
  };
  const sans = sb(false), avec = sb(true);
  R.ok(sans.sb === 'sansboite:C:EP@j1' && avec.a === 'ok:EP' && avec.sb === 'sansboite:C:EP@j1',
    'd15 descente et drain de collecte A vers le même collecteur EP sans boîte : « pas de boîte » reste à l\'entrée de la descente (j1), avec ou sans le drain '
    + '(obtenu ' + (sans.sb || 'aucune') + ' sans le drain ; ' + (avec.sb || 'aucune') + ' avec, drain ' + avec.a + ')');
}
/* d13 : témoin. 400 croquis tirés, en état des lieux et en avant-projet (800 analyses). Deux tronçons sur trois deviennent des drains de
   collecte ; un sur deux de ceux-là passe en EP, dans le témoin aussi (les mêmes tronçons, sans p.drain). Un drain sur quatre tient un point
   « Drain » (du même statut que lui) sur son premier sommet libre, dans le témoin aussi : ce point est une source ponctuelle, que fixe()
   compare. Aucune exception ; ce qui ne change pas (fixe) ne change pas ; chaque drain compté (sans point « Drain » sur un sommet, actif) a
   son résultat, et la ligne « Autres : Drain » en compte un par drain et par point « Drain » analysé (pas de double compte) ; aucun nœud
   'dr:' ne reste (résultats, sens, liens) */
function temoinCollecte(){
  let n = 0, drains = 0, comptes = 0, points = 0, poses = 0; const ecarts = [], lignesKo = [], restes = [];
  for (let g = 1; g <= 400; g++){
    const d = tirage(g), ids = []; let k = 0;
    d.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr'){ if ((k + g) % 3){ ids.push(e.id); if (k % 2) e.p.res = 'EP'; } k++; } });
    ids.filter((id, i) => i % 4 === 0).forEach(id => {
      const e = d.el.find(x => x.id === id), v = e.v.find(w => !w.a); if (!v) return;
      d.el.push({id: 'pd' + id, k: 'pt', t: 'drain', x: v.x, y: v.y, p: {st: e.p.st || 'existant', obs: '', meth: ['eau']}, lab: {off: true}}); v.a = 'pd' + id; poses++;
    });
    const dd = copie(d); dd.el.forEach(e => { if (ids.indexOf(e.id) >= 0) e.p.drain = 'collecte'; }); drains += ids.length;
    ['edl', 'avp'].forEach(mode => { n++;
      const rb = resultat(dd, mode); if (/^exception/.test(rb)){ ecarts.push(g + ' ' + mode + ' : ' + rb); return; }
      const e = ecartDe(fixeDe(d, mode), fixeDe(dd, mode)); if (e) ecarts.push(g + ' ' + mode + ' : ' + e);
      const b = V.analyser(copie(dd), mode), L = b.lignes;
      const att = Object.keys(L).filter(id => V.drainDe(L[id]) === 'collecte' && L[id].v.length >= 2 && !L[id].v.some(v => v.a && b.objs[v.a] && b.objs[v.a].t === 'drain')).sort();
      const vus = Object.keys(b.resObj).filter(id => !b.objs[id]).sort(), pts = Object.keys(b.resObj).filter(id => b.objs[id] && b.objs[id].t === 'drain').length;
      comptes += vus.length; points += pts;
      const rd = ligneDrain(V.constatDeduit(copie(dd), b)), nb = rd ? rd.nb : 0;
      if (att.join() !== vus.join() || nb !== att.length + pts) lignesKo.push(g + ' ' + mode + ' : ' + att.length + ' drains, ' + vus.length + ' comptés, ' + pts + ' points « Drain », ligne ×' + nb);
      if (/dr:/.test(JSON.stringify(b.resObj)) || Object.keys(b.sensSource).concat(Object.keys(b.adj)).some(x => /^dr:/.test(x)) || Object.keys(b.adj).some(x => b.adj[x].some(p => p.virt)))
        restes.push(g + ' ' + mode);
    });
  }
  R.ok(!ecarts.length && n === 800 && comptes > 0, 'd13 témoin : des drains de collecte ne changent ni les sources ponctuelles, ni les contrôles et anomalies des objets, ni les pièces, '
    + 'ni les regards (' + n + ' analyses, ' + drains + ' drains) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun') + (ecarts.length > 3 ? ' (' + ecarts.length + ' en tout)' : ''));
  R.ok(!lignesKo.length && comptes > 0 && points > 0, 'd13 chaque drain compté a son résultat et sa place dans la ligne « Autres : Drain » (' + comptes + ' drains comptés, '
    + poses + ' points « Drain » posés sur un drain, ' + points + ' analysés) ; écarts : ' + (lignesKo.slice(0, 3).join(' ; ') || 'aucun') + (lignesKo.length > 3 ? ' (' + lignesKo.length + ' en tout)' : ''));
  R.ok(!restes.length, 'd13 aucun nœud « dr: » ni pièce virtuelle ne reste dans l\'analyse ; restes : ' + (restes.slice(0, 5).join(', ') || 'aucun'));
}
/* g2 : un tronçon sur deux devient un drain d'infiltration, sans réseau ; témoin : les mêmes tronçons sans réseau, sans drain. Seules changent les
   sources qui atteignent un drain d'infiltration (D:<id>, rejet DISP) ; aucune exception, ni dans l'analyse, ni dans les anomalies, la
   conclusion, les contrôles ou le constat déduit. Une source qui atteint le drain atteint encore chaque exutoire dessiné du témoin (term :
   les bouts libres n'y sont pas) et devient « multiple » si elle en atteint un ; une conclusion devenue « conformes » ne perd aucune NC
   retenue du témoin, sauf celle d'une source au réseau seulement présumé (le drain prime sur un bout libre, comme tout exutoire dessiné) */
function gardeInfiltration(){
  let n = 0, drains = 0, sources = 0, atteintes = 0, changees = 0, avecExu = 0; const ecarts = [], perdus = [], ncPerdues = [];
  for (let g = 1; g <= 40; g++){
    const d = tirage(g), ids = []; let k = 0;
    d.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr' && k++ % 2 === g % 2){ e.p.res = ''; ids.push(e.id); } });
    const dd = copie(d); dd.el.forEach(e => { if (ids.indexOf(e.id) >= 0) e.p.drain = 'infiltration'; }); drains += ids.length;
    ['edl', 'avp'].forEach(mode => { n++;
      const rb = resultat(dd, mode); if (/^exception/.test(rb)){ ecarts.push(g + ' ' + mode + ' : ' + rb); return; }
      const a = V.analyser(copie(d), mode), b = V.analyser(copie(dd), mode);
      Object.keys(b.resObj).forEach(id => { sources++; const ra = a.resObj[id], rd = b.resObj[id], tb = rd.term || [], vers = tb.some(t => t.res === 'DISP'); if (vers) atteintes++;
        if (!ra || uneSource(ra) !== uneSource(rd)){ changees++; if (!vers) ecarts.push(g + ' ' + mode + ' ' + id + ' : ' + (ra ? uneSource(ra) : '?') + ' > ' + uneSource(rd)); }
        if (!vers || !ra) return;
        const ta = ra.term || [], manque = ta.filter(t => !tb.some(u => u.noeud === t.noeud)); if (ta.length) avecExu++;
        if (manque.length || (ta.length && rd.etat !== 'multiple'))
          perdus.push(g + ' ' + mode + ' ' + id + ' : ' + uneSource(ra) + ' > ' + uneSource(rd) + (manque.length ? ', perd ' + manque.map(t => t.res + '@' + t.noeud).join(',') : ''));
      });
      const La = V.anomaliesDoc(copie(d), a), Lb = V.anomaliesDoc(copie(dd), b);
      if (V.conclusion(Lb, b) === 'conformes')
        La.filter(x => x.nc && x.st === 'retenue' && !(a.resObj[x.objId] && a.resObj[x.objId].presume)).forEach(x => ncPerdues.push(g + ' ' + mode + ' ' + x.cle + ' (' + V.conclusion(La, a) + ')'));
    });
  }
  R.ok(!ecarts.length && n === 80 && atteintes > 0 && changees > 0, 'g2 garde : un drain d\'infiltration ne change que les sources qui l\'atteignent (' + n + ' analyses, '
    + drains + ' drains, ' + sources + ' sources, dont ' + atteintes + ' l\'atteignent et ' + changees + ' changent) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun'));
  R.ok(!perdus.length && avecExu > 0, 'g2 garde : une source qui atteint un drain d\'infiltration atteint encore chaque exutoire dessiné du témoin et devient « multiple » ('
    + avecExu + ' sources en atteignent un dans le témoin) ; écarts : ' + (perdus.slice(0, 3).join(' ; ') || 'aucun') + (perdus.length > 3 ? ' (' + perdus.length + ' en tout)' : ''));
  R.ok(!ncPerdues.length, 'g2 garde : une conclusion devenue « conformes » ne perd aucune NC retenue du témoin, hors source au réseau seulement présumé ; perdues : '
    + (ncPerdues.slice(0, 3).join(' ; ') || 'aucune') + (ncPerdues.length > 3 ? ' (' + ncPerdues.length + ' en tout)' : ''));
}

(async () => {
  try {
    defauts();
    ecranPeigne();
    await papierPeigne();
    dxfDrains();
    await legendeDrains();
    reglesDrain();
    avalDrain();
    await constatEtRendu();
    await drainCollecte();
    noeudsDrain();
    boiteDrain();
    temoinCollecte();
    garde();
    gardeInfiltration();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
