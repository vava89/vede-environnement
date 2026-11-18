// Trop-plein d'un puisard ou d'une infiltration au sol (m145 ; décision D11 de la conception v1.7.2, .claude/conception-v172.md ; réponse
// q7-trop-plein du 16 nov. 2026, choix b : « Oui : chaque exutoire atteint par le trop-plein compte avec son jugement, comme en Q7 (a) »),
// sans navigateur. Croquis fictifs (12 rue Fictive, Ville-Exemple). Chaque cas vérifie le résultat de la source (resObj : état, rejets,
// r.apres, r.apresPar), ses anomalies (toutes celles du dessin), la conclusion proposée et sa ligne du constat déduit.
// t1 : descente → puisard → tuyau sans sens → regard public du collecteur EU : ok:INF, au-delà (r.apres) le réseau EU, r.apresPar 'tp',
//   « Descente EP : rejet au réseau EU » non conforme et aucune autre (pas de « pas de boîte » : le collecteur n'est atteint que par le
//   trop-plein), « non_conformes », ligne de la descente « non ». De même en avant-projet ; un trop-plein « À supprimer » ne compte qu'en
//   état des lieux, un trop-plein « Projet » qu'en avant-projet (sinon : « conformes », ligne « oui »).
// t2 : de même avec une infiltration au sol (ok:SOL).
// t3 : trop-plein vers le collecteur EP : au-delà EP, aucune anomalie, « conformes », ligne « oui ».
// t4 (témoin) : tuyau orienté vers le puisard : rien au-delà, « conformes ».
// t5 : trop-plein vers un regard d'où partent deux autres destinations : « multiple » (INF et les deux), sans r.apres, contrôle « relié à
//   plusieurs réseaux », « incomplet », ligne à juger (décision D5 : deux destinations font « multiple »).
// t6 (témoin) : bifurcation avant le puisard (regard vers le puisard et vers le collecteur EU), trop-plein vers une boîte EP : « multiple »
//   (INF, EU), comme en v1.7.1, sans r.apres, ligne à juger ; le message ne cite pas le réseau EP du trop-plein.
// t7 : puisard → puisard → collecteur EU : au-delà EU seul ; puisard → infiltration au sol → collecteur EU : au-delà SOL puis EU.
// t8 : texte de la fiche (VCroquis.etatSource) et de la page 2 du plan PDF, mot pour mot : « Rejet : puisard (infiltration) et, par le
//   trop-plein, réseau EU départemental · anomalie n° 1 » ; « Rejet : infiltration au sol et, par le trop-plein, réseau EP départemental ».
//   Drain d'infiltration qui tient un puisard dont le trop-plein va au collecteur EU : ok:DISP, au-delà INF puis EU, sans r.apresPar, le
//   texte reste « au-delà du drain » (« Rejet : dispersion dans le sol et, au-delà du drain, puisard (infiltration) et réseau EU
//   départemental · anomalie n° 1 »).
// t9 (garde-fou) : trop-plein sans sens vers un regard où arrive aussi le tuyau d'un WC, regard relié à une boîte EU : la descente reste
//   ok:INF sans r.apres, « incomplet » (témoin ; le WC est « multiple », comme en v1.7.1) ; le même tuyau orienté depuis le puisard : au-delà
//   EU, NC. Le puisard est tenu par un drain d'infiltration (P, R2, R3 ; R3 mène à une boîte EU) et un WC arrive en R2 (tuyau sans sens, ou
//   orienté vers R2) : les liens du drain suivent leur règle (m129 : son sens n'est pas lu, le garde-fou ne vaut que pour un tuyau), et la
//   descente va au-delà, à la dispersion dans le sol puis au réseau EU (NC, ligne « non ») ; le WC disperse dans le sol et, au-delà du
//   drain, va au puisard et au réseau EU (NC). Second ouvrage où arrive un appareil (s → P ; une descente, à l'arrière, ou un WC → P2 ; P et P2 reliés sans sens ; P2 mène au
//   collecteur EU) : la marche à rebours du garde-fou traverse P2, comme le trop-plein ; elle y trouve l'appareil, et le tuyau entre P et P2
//   n'est pas suivi depuis P : la descente s reste conforme (ligne « oui ») ; la source de P2 va au réseau EU par son trop-plein (NC). De
//   même avec une infiltration au sol à la place de P2. Témoin du choix : en Y, deux puisards P et P3 reliés sans sens au puisard P2 qui
//   mène au collecteur EU : aucun trop-plein suivi, « conformes » (comme en v1.7.1) ; les deux tuyaux orientés vers P2 : NC pour les deux.
// t10 : WC → puisard → trop-plein → collecteur EU : « WC : rejet dans un puisard » seule (le réseau EU n'en ajoute pas), au-delà EU ;
//   WC → puisard → trop-plein → drain d'infiltration : an.eauxDrains {T: {EU: 1, EP: 0}}, drain rouge (resLigne EU), au-delà DISP.
// t11 (avant-projet) : trop-plein laissé libre : rien ne change (sans r.apres, sans sortie libre, « conformes » ; témoin) ; sortie EU
//   laissée libre avant le puisard, trop-plein vers le collecteur EU : la sortie reste relevée (r.sortiesLibres EU), et le trop-plein
//   compte (au-delà EU, NC).
// t12 : trop-plein vers un puits : au-delà PUITS, « Descente EP : rejet dans un puits » non conforme, « non_conformes » ; la ligne de la
//   descente reste à juger (''), comme pour une descente reliée directement au puits.
// t13 : le trop-plein ne traverse que les puisards et les infiltrations au sol : puits, puis tuyau vers le collecteur EU : au-delà PUITS
//   seul ; boîte EP, puis tuyau vers le collecteur EU : au-delà EP seul (la descente reste conforme ; la boîte, elle, est NC).
// t14 : marche à rebours du garde-fou. Elle prend un tuyau orienté vers le nœud (WC dont le tuyau est orienté vers le regard du
//   trop-plein : non suivi, témoin) ; elle ne remonte pas un tuyau orienté qui part du nœud (WC en aval d'un tel tuyau : suivi, NC) ;
//   elle s'arrête à une boîte au réseau indiqué et au collecteur (WC qui arrive à la même boîte EU, ou au même collecteur par un autre
//   regard public : suivi, NC) ; elle ne prend pas les liens d'un drain d'infiltration (WC posé sur un autre sommet du drain où arrive
//   le trop-plein : suivi, au-delà DISP) ; un tuyau d'un drain de collecte compté qui part de l'ouvrage n'est pas suivi, ni le
//   trop-plein qui mène au regard où arrive un tel drain (témoins).
// t15 : drain d'infiltration qui tient un puisard (R1, P, R2) ; R2 mène au collecteur EU territorial, le trop-plein de P au collecteur
//   EU départemental : au-delà EU territorial, comme en v1.7.1 (le gestionnaire d'un réseau que la source atteint déjà reste le sien).
// t16 : trop-plein vers une autre destination aux EP « à arbitrer » : son anomalie à arbitrer, contrôle « à arbitrer », « exu », ligne à
//   juger (jamais conforme) ; WC → puisard → trop-plein → collecteur EP : « rejet dans un puisard » et « rejet au réseau EP », NC ;
//   descente reliée à un puisard posé sur le premier sommet d'un drain d'infiltration, sans autre tuyau : « Rejet : puisard
//   (infiltration) et, par le trop-plein, dispersion dans le sol », an.eauxDrains {T: {EU: 0, EP: 1}}, « conformes » (en v1.7.1, la fiche
//   disait « Rejet : puisard (infiltration) »).
// Échouent sur f537268 (le trop-plein n'y est pas suivi) : t1 (sauf les cas où le trop-plein est absent du plan), t2, t3 (par r.apres et
// r.apresPar), t5, t7, t8, le second cas de t9 et ses cas du drain qui tient le puisard, de l'ouvrage où arrive un appareil (par la source
// de P2) et du Y orienté, t10, le second cas de t11, t12, t13, les cas suivis de t14 et t16 ; t4, t6, le premier cas de t9, le Y sans
// sens, le premier de t11, les témoins de t14 et t15 y passent.
// Variantes fautives attrapées (essayées une à une) : garde-fou qui arrête aussi les liens du drain qui tient l'ouvrage (t9, drain qui
// tient le puisard) ; marche à rebours qui s'arrête à un puisard ou à une infiltration au sol (t9, ouvrage où arrive un appareil, Y sans
// sens) ; gestionnaire pris au premier exutoire même pour un réseau déjà atteint (t15) ; trop-plein qui traverse aussi un puits ou une
// boîte (t13) ; marche à rebours qui ignore un tuyau orienté vers le nœud, remonte un tuyau orienté qui en part, traverse une boîte ou
// le collecteur, prend les liens d'un drain d'infiltration, ou ne voit pas un drain de collecte (t14, chacune par son cas).
'use strict';
const {charger, doc, copie, rendus, rapport} = require('./charger.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('tropplein'), {pdf} = rendus(ch);
const sur = f => { try { return f(); } catch (e){ return 'exception : ' + e.message; } };

/* jugement d'un croquis : analyse, anomalies du dossier [clé, nc, texte, statut], conclusion proposée, contrôles, constat déduit */
function juge(d, mode){
  const an = V.analyser(copie(d), mode || 'edl'), L = V.anomaliesDoc(copie(d), an);
  return {an, L, c: V.conclusion(L, an), ctl: an.controles.map(x => x.cle), cd: V.constatDeduit(copie(d), an), a: L.map(a => [a.cle, !!a.nc, a.obs, a.st])};
}
/* résultat d'une source, en abrégé : état et rejets, puis rejet, r.apres (réseau/gestionnaire) et r.apresPar */
const vuSrc = r => !r ? 'absente' : r.etat + ':' + (r.nets || []).join(',') + (r.res ? ' res=' + r.res : '') + (r.apres ? ' apres=' + r.apres.map(x => x.res + '/' + x.gest).join(',') : '')
  + (r.apresPar ? ' par=' + r.apresPar : '');
const src = (k, id) => vuSrc(k.an.resObj[id]);
/* anomalies attendues [clé, nc, texte, statut (« retenue » si absent)], et aucune autre */
const memesA = (k, att) => k.a.length === att.length && att.every(([cle, nc, obs, st]) => k.a.some(v => v[0] === cle && v[1] === nc && v[2] === obs && v[3] === (st || 'retenue')));
const ligne = (k, id) => k.cd.rows.find(r => r.objets.indexOf(id) >= 0);
const conf = (k, id) => { const r = ligne(k, id); return r ? r.conforme : 'sans ligne'; };
const anosTxt = k => k.a.map(a => a[0] + (a[1] ? ' NC' : ' réserve') + ' « ' + a[2] + ' » ' + a[3]).join(', ') || 'aucune anomalie';
const dire = (k, id) => src(k, id) + ' | ' + k.c + ' | ' + anosTxt(k) + ' | ligne ' + JSON.stringify(conf(k, id)) + ' | contrôles : ' + (k.ctl.join(', ') || 'aucun');
const EP_EU = ['ep-eu:s', true, 'Descente EP : rejet au réseau EU'];
/* un cas complet : srcs {id: résultat attendu (vuSrc)}, anomalies attendues (toutes), conclusion, lignes {id: conforme attendu} ;
   plus(k) : vérification de plus, facultative */
function cas(nom, d, mode, srcs, anos, c, lignes, plus){
  const k = juge(d, mode), ids = Object.keys(srcs), lg = Object.keys(lignes);
  R.ok(ids.every(id => src(k, id) === srcs[id]) && memesA(k, anos) && k.c === c && lg.every(id => conf(k, id) === lignes[id]) && (!plus || plus(k)),
    nom + (mode === 'avp' ? ' (avant-projet)' : '') + ' : ' + ids.map(id => id + ' ' + srcs[id]).join(' ; ') + ', ' + (anos.map(a => '« ' + a[2] + ' » ' + (a[1] ? 'NC' : 'réserve')
    + (a[3] ? ' (' + a[3] + ')' : '')).join(', ') || 'aucune anomalie') + ', « ' + c + ' », ' + lg.map(id => 'ligne de ' + id + ' « ' + lignes[id] + ' »').join(', ')
    + ' (obtenu ' + ids.map(id => id + ' ' + src(k, id)).join(' ; ') + ' | ' + k.c + ' | ' + anosTxt(k) + ' | ' + lg.map(id => 'ligne de ' + id + ' ' + JSON.stringify(conf(k, id))).join(', ')
    + ' | contrôles : ' + (k.ctl.join(', ') || 'aucun') + ')');
  return k;
}

/* descente s (ou o.src) → tuyau L → ouvrage P (puisard, ou o.t) ; trop-plein Q de P au regard public Rp du collecteur C (réseau res) ;
   o.sens : sens de Q (0 ; 1 : de P vers Rp ; -1 : vers P) ; o.st : statut de Q */
const versCol = (res, o) => { o = o || {};
  return doc({o: [['s', o.src || 'descente', 0, 8], ['P', o.t || 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 0, {res}]],
    l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', o.st || '', ['P', 'Rp'], o.sens || 0], ['C', 'col', res, '', [[8, -10], 'Rp', [8, 10]]]]}); };
const col = (res, x) => ['C', 'col', res, '', [[x, -10], 'Rp', [x, 10]]];

/* t1 à t4 : un puisard (ou une infiltration au sol) et son trop-plein */
function tropPlein(){
  [['t1 descente → puisard → trop-plein sans sens → collecteur EU', versCol('EU'), 'ok:INF res=INF apres=EU/D par=tp', [EP_EU], 'non_conformes', 'non'],
    ['t2 descente → infiltration au sol → trop-plein sans sens → collecteur EU', versCol('EU', {t: 'infiltration'}), 'ok:SOL res=SOL apres=EU/D par=tp', [EP_EU], 'non_conformes', 'non'],
    ['t3 descente → puisard → trop-plein → collecteur EP', versCol('EP'), 'ok:INF res=INF apres=EP/D par=tp', [], 'conformes', 'oui'],
    ['t4 témoin : trop-plein orienté vers le puisard (depuis le collecteur EU)', versCol('EU', {sens: -1}), 'ok:INF res=INF', [], 'conformes', 'oui']
  ].forEach(([nom, d, r, anos, c, l]) => cas(nom, d, 'edl', {s: r}, anos, c, {s: l}));
  /* les deux modes : le même dessin en avant-projet ; trop-plein « À supprimer » (compté en état des lieux seulement) ou « Projet »
     (compté en avant-projet seulement) */
  const NC = ['ok:INF res=INF apres=EU/D par=tp', [EP_EU], 'non_conformes', 'non'], RIEN = ['ok:INF res=INF', [], 'conformes', 'oui'];
  [['t1 trop-plein existant', versCol('EU'), 'avp', NC],
    ['t1 trop-plein « À supprimer », état des lieux', versCol('EU', {st: 'supprimer'}), 'edl', NC],
    ['t1 trop-plein « À supprimer », absent du plan', versCol('EU', {st: 'supprimer'}), 'avp', RIEN],
    ['t1 trop-plein « Projet », état des lieux (absent du plan)', versCol('EU', {st: 'projet'}), 'edl', RIEN],
    ['t1 trop-plein « Projet »', versCol('EU', {st: 'projet'}), 'avp', NC]
  ].forEach(([nom, d, mode, [r, anos, c, l]]) => cas(nom, d, mode, {s: r}, anos, c, {s: l}));
}

/* t5, t6 : deux autres destinations au-delà du puisard ; bifurcation avant lui */
const DST = (nom, ep) => ({nom, ab: nom.slice(0, 2), art: 'la', ep, cst: 'autre'});
function multiples(){
  const d5 = doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R', 'regard', 8, 0], ['E1', 'exutoire', 16, 0, DST('Étang Fictif', 'conforme')],
    ['E2', 'exutoire', 8, 8, DST('Mare Fictive', 'conforme')]],
  l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'R']], ['Q1', 'tr', '', '', ['R', 'E1']], ['Q2', 'tr', '', '', ['R', 'E2']]]});
  const k5 = juge(d5), r5 = k5.an.resObj.s;
  R.ok(!!r5 && r5.etat === 'multiple' && r5.nets.length === 3 && r5.nets[0] === 'INF' && r5.nets.filter(x => /^X:/.test(x)).length === 2 && !r5.apres && !r5.apresPar
    && k5.ctl.indexOf('multi:s') >= 0 && k5.c === 'incomplet' && !k5.a.length && conf(k5, 's') === '',
    't5 trop-plein vers un regard d\'où partent deux autres destinations : s=multiple (INF et les deux), sans r.apres, contrôle « relié à plusieurs '
    + 'réseaux », « incomplet », aucune anomalie, ligne à juger (obtenu ' + dire(k5, 's') + ')');
  /* t6 : le regard R mène au puisard et au collecteur EU ; trop-plein du puisard vers une boîte EP */
  const d6 = doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4], ['P', 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 4, {res: 'EU'}], ['B', 'boite', 0, -6, {res: 'EP'}]],
    l: [['L', 'tr', '', '', ['s', 'R']], ['L1', 'tr', '', '', ['R', 'P']], ['L2', 'tr', '', '', ['R', 'Rp']], ['Q', 'tr', '', '', ['P', 'B']], ['C', 'col', 'EU', '', [[8, -10], 'Rp', [8, 10]]]]});
  const k6 = juge(d6), r6 = k6.an.resObj.s, m6 = k6.an.controles.find(x => x.cle === 'multi:s');
  R.ok(!!r6 && r6.etat === 'multiple' && r6.nets.join() === 'INF,EU' && !r6.apres && !r6.apresPar && !!m6 && !/réseau EP/.test(m6.txt) && k6.c === 'incomplet' && !k6.a.length
    && conf(k6, 's') === '',
    't6 témoin, bifurcation avant le puisard (regard vers le puisard et vers le collecteur EU), trop-plein vers une boîte EP : s=multiple (INF, EU), '
    + 'comme en v1.7.1, sans r.apres, message sans le réseau EP, « incomplet », aucune anomalie, ligne à juger (obtenu ' + dire(k6, 's') + (m6 ? ' ; « ' + m6.txt + ' »' : '') + ')');
}

/* t7 : chaînes d'ouvrages qui infiltrent */
function chaines(){
  const chaine = t2 => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['P2', t2, 8, 0], ['Rp', 'regard_pub', 16, 0, {res: 'EU'}]],
    l: [['L', 'tr', '', '', ['s', 'P']], ['Q1', 'tr', '', '', ['P', 'P2']], ['Q2', 'tr', '', '', ['P2', 'Rp']], col('EU', 16)]});
  [['puisard → puisard → collecteur EU', 'puisard', 'ok:INF res=INF apres=EU/D par=tp'],
    ['puisard → infiltration au sol → collecteur EU', 'infiltration', 'ok:INF res=INF apres=SOL/D,EU/D par=tp']
  ].forEach(([nom, t2, r]) => cas('t7 ' + nom, chaine(t2), 'edl', {s: r}, [EP_EU], 'non_conformes', {s: 'non'}));
}

/* t8 : textes de la fiche et de la page 2 du plan PDF */
async function textes(){
  const T1 = 'Rejet : puisard (infiltration) et, par le trop-plein, réseau EU départemental · anomalie n° 1';
  const T2 = 'Rejet : infiltration au sol et, par le trop-plein, réseau EP départemental';
  const d1 = versCol('EU'), d2 = versCol('EP', {t: 'infiltration'});
  [[d1, T1, 'ko', 'ok:INF res=INF apres=EU/D par=tp', [EP_EU], 'non_conformes', 'non'], [d2, T2, 'ok', 'ok:SOL res=SOL apres=EP/D par=tp', [], 'conformes', 'oui']
  ].forEach(([d, t, cls, r, anos, c, l]) => cas('t8 fiche de la descente : « ' + t + ' » (' + cls + ')', d, 'edl', {s: r}, anos, c, {s: l}, k => {
    const es = sur(() => V.etatSource(copie(d), k.an, k.L, 'edl', 's'));
    if (!es || es.txt !== t || es.cls !== cls) R.info('t8 fiche obtenue : ' + JSON.stringify(es));
    return !!es && es.txt === t && es.cls === cls;
  }));
  /* page 2 du plan PDF, colonne « Rejet constaté » (ses lignes, réunies par une espace) */
  for (const [d, t] of [[d1, T1], [d2, T2]]){
    const p = await pdf(d, {mode: 'edl'}), tx = p.txt.join(' '), att = t.slice('Rejet : '.length);
    R.ok(!p.err.length && tx.indexOf(att) >= 0, 't8 page 2 du plan PDF : « ' + att + ' » (obtenu ' + (p.err.join(' | ') || JSON.stringify(p.txt.filter(x => /puisard|infiltration|trop-plein|départemental/.test(x)))) + ')');
  }
  /* drain d'infiltration T (de la descente, posée sur son premier sommet, au puisard K, posé sur le dernier) ; trop-plein de K vers le
     collecteur EU : le texte reste « au-delà du drain » */
  const dd = doc({o: [['s', 'descente', 0, 0], ['K', 'puisard', 10, 0], ['Rp', 'regard_pub', 20, 0, {res: 'EU'}]],
    l: [['T', 'tr', '', '', ['s', [5, 0], 'K'], 0, {drain: 'infiltration'}], ['Q', 'tr', '', '', ['K', 'Rp']], col('EU', 20)]});
  const kd = juge(dd), ed = sur(() => V.etatSource(copie(dd), kd.an, kd.L, 'edl', 's'));
  const TD = 'Rejet : dispersion dans le sol et, au-delà du drain, puisard (infiltration) et réseau EU départemental · anomalie n° 1';
  R.ok(src(kd, 's') === 'ok:DISP res=DISP apres=INF/D,EU/D' && !!ed && ed.txt === TD && memesA(kd, [EP_EU]) && kd.c === 'non_conformes' && conf(kd, 's') === 'non',
    't8 drain d\'infiltration qui tient un puisard dont le trop-plein va au collecteur EU : ok:DISP, au-delà INF puis EU, sans r.apresPar ; fiche « ' + TD
    + ' » ; « non_conformes », ligne « non » (obtenu ' + dire(kd, 's') + ' ; fiche ' + JSON.stringify(ed) + ')');
  const pd = await pdf(dd, {mode: 'edl'}), td = pd.txt.join(' '), attD = TD.slice('Rejet : '.length);
  R.ok(!pd.err.length && td.indexOf(attD) >= 0, 't8 page 2 du plan PDF, drain d\'infiltration : « ' + attD + ' » (obtenu ' + (pd.err.join(' | ') || JSON.stringify(pd.txt.filter(x => /dispersion|au-delà|départemental/.test(x)))) + ')');
}

/* t9 : garde-fou de D11 ; le regard R reçoit le trop-plein Q du puisard (sens : sens de Q) et le tuyau LW du WC W (sensW : sens de LW,
   1 : vers R), et mène à la boîte EU B */
const parRegard = (sens, sensW) => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R', 'regard', 8, 0], ['W', 'wc', 8, 8], ['B', 'boite', 16, 0, {res: 'EU'}]],
  l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'R'], sens || 0], ['LW', 'tr', '', '', ['W', 'R'], sensW || 0], ['LR', 'tr', '', '', ['R', 'B']]]});
const WC_MULTI = k => { const w = k.an.resObj.W; return !!w && w.etat === 'multiple' && w.nets.slice().sort().join() === 'EU,INF' && k.ctl.indexOf('multi:W') >= 0; };
/* puisard P tenu par le drain d'infiltration D1 (P, R2, R3) ; descente s → P ; R3 → boîte EU B ; un WC W arrive en R2 (tuyau LW, sens) */
const tenuParDrain = sens => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R2', 'regard', 10, 0], ['R3', 'regard', 20, 0], ['B', 'boite', 30, 0, {res: 'EU'}], ['W', 'wc', 10, 8]],
  l: [['L', 'tr', '', '', ['s', 'P']], ['D1', 'tr', '', '', ['P', 'R2', 'R3'], 0, {drain: 'infiltration'}], ['LR', 'tr', '', '', ['R3', 'B']], ['LW', 'tr', '', '', ['W', 'R2'], sens || 0]]});
/* deux ouvrages : s → P ; s2 (une descente, à l'arrière, ou app) → P2 (puisard, ou mil) ; Q1 sans sens entre P et P2 ; Q2 de P2 au
   regard public du collecteur EU */
const deuxOuvrages = (app, mil) => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['P2', mil || 'puisard', 8, 0], ['s2', app || 'descente', 8, 8, {cote: 'arriere'}],
  ['Rp', 'regard_pub', 16, 0, {res: 'EU'}]],
  l: [['L', 'tr', '', '', ['s', 'P']], ['Q1', 'tr', '', '', ['P', 'P2']], ['L2', 'tr', '', '', ['s2', 'P2']], ['Q2', 'tr', '', '', ['P2', 'Rp']], col('EU', 16)]});
/* en Y : s → P et s3 → P3 ; P et P3 reliés au puisard P2 (sans sens, ou orientés vers P2), qui ne reçoit rien d'autre ; P2 → collecteur EU */
const enY = sens => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['P2', 'puisard', 8, 0], ['P3', 'puisard', 8, -6], ['s3', 'descente', 4, -10], ['Rp', 'regard_pub', 16, 0, {res: 'EU'}]],
  l: [['L', 'tr', '', '', ['s', 'P']], ['Q1', 'tr', '', '', ['P', 'P2'], sens], ['L3', 'tr', '', '', ['s3', 'P3']], ['Q4', 'tr', '', '', ['P3', 'P2'], sens], ['Q2', 'tr', '', '', ['P2', 'Rp']], col('EU', 16)]});
function gardeFou(){
  cas('t9 témoin, trop-plein sans sens vers un regard où arrive aussi le tuyau d\'un WC (le WC est « multiple » (INF, EU), comme en v1.7.1)', parRegard(0), 'edl',
    {s: 'ok:INF res=INF'}, [], 'incomplet', {s: 'oui'}, WC_MULTI);
  cas('t9 le même trop-plein orienté depuis le puisard (le WC va au réseau EU)', parRegard(1), 'edl',
    {s: 'ok:INF res=INF apres=EU/D par=tp', W: 'ok:EU res=EU'}, [EP_EU], 'non_conformes', {s: 'non', W: 'oui'});
  /* liens du drain d'infiltration qui tient le puisard : pris depuis lui, même quand un appareil arrive à un sommet du drain */
  const WC_DRAIN = [EP_EU, ['eu-sol:W', true, 'WC : rejet au sol (infiltration)'], ['eu-inf:W', true, 'WC : rejet dans un puisard']];
  [['tuyau du WC sans sens', 0, 'edl'], ['tuyau du WC sans sens', 0, 'avp'], ['tuyau du WC orienté vers R2', 1, 'edl']].forEach(([nom, sens, mode]) =>
    cas('t9 puisard tenu par un drain d\'infiltration, WC sur un autre sommet du drain (' + nom + ') : les liens du drain sont suivis', tenuParDrain(sens), mode,
      {s: 'ok:INF res=INF apres=DISP/D,EU/D par=tp', W: 'ok:DISP res=DISP apres=INF/D,EU/D'}, WC_DRAIN, 'non_conformes', {s: 'non', W: 'non'}));
  /* second ouvrage où arrive un appareil : la marche à rebours le traverse */
  cas('t9 second puisard P2 où arrive une descente, relié sans sens au puisard P : non suivi depuis P', deuxOuvrages(), 'edl',
    {s: 'ok:INF res=INF', s2: 'ok:INF res=INF apres=EU/D par=tp'}, [['ep-eu:s2', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', {s: 'oui', s2: 'non'});
  cas('t9 second puisard P2 où arrive une descente, relié sans sens au puisard P : non suivi depuis P', deuxOuvrages(), 'avp',
    {s: 'ok:INF res=INF', s2: 'ok:INF res=INF apres=EU/D par=tp'}, [['ep-eu:s2', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', {s: 'oui', s2: 'non'});
  cas('t9 infiltration au sol où arrive une descente, reliée sans sens au puisard P : non suivie depuis P', deuxOuvrages('', 'infiltration'), 'edl',
    {s: 'ok:INF res=INF', s2: 'ok:SOL res=SOL apres=EU/D par=tp'}, [['ep-eu:s2', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', {s: 'oui', s2: 'non'});
  cas('t9 second puisard P2 où arrive un WC, relié sans sens au puisard P : non suivi depuis P', deuxOuvrages('wc'), 'edl',
    {s: 'ok:INF res=INF', s2: 'ok:INF res=INF apres=EU/D par=tp'}, [['eu-inf:s2', true, 'WC : rejet dans un puisard']], 'non_conformes', {s: 'oui', s2: 'non'});
  /* témoin du choix : en Y, sans sens, aucun trop-plein n'est suivi ; orientés vers P2, ils le sont */
  cas('t9 témoin, en Y : puisards P et P3 reliés sans sens au puisard P2 qui mène au collecteur EU (comme en v1.7.1)', enY(0), 'edl',
    {s: 'ok:INF res=INF', s3: 'ok:INF res=INF'}, [], 'conformes', {s: 'oui', s3: 'oui'});
  cas('t9 en Y, tuyaux orientés vers P2', enY(1), 'edl', {s: 'ok:INF res=INF apres=EU/D par=tp', s3: 'ok:INF res=INF apres=EU/D par=tp'},
    [EP_EU, ['ep-eu:s3', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', {s: 'non', s3: 'non'});
}

/* t10 : WC vers un puisard dont le trop-plein va au collecteur EU, ou à un drain d'infiltration */
function wc(){
  cas('t10 WC → puisard → trop-plein → collecteur EU (le réseau EU n\'ajoute pas d\'anomalie)', doc({o: [['W', 'wc', 0, 8], ['P', 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 0, {res: 'EU'}]],
    l: [['L', 'tr', '', '', ['W', 'P']], ['Q', 'tr', '', '', ['P', 'Rp']], col('EU', 8)]}), 'edl',
  {W: 'ok:INF res=INF apres=EU/D par=tp'}, [['eu-inf:W', true, 'WC : rejet dans un puisard']], 'non_conformes', {W: 'non'});
  /* trop-plein du puisard vers le raccord J, premier sommet du drain d'infiltration T */
  const dd = doc({o: [['W', 'wc', 0, 8], ['P', 'puisard', 0, 0], ['J', 'jonction', 8, 0]],
    l: [['L', 'tr', '', '', ['W', 'P']], ['Q', 'tr', '', '', ['P', 'J']], ['T', 'tr', '', '', ['J', [18, 0]], 0, {drain: 'infiltration'}]]});
  let ed = '', rl = '';
  cas('t10 WC → puisard → trop-plein → drain d\'infiltration : an.eauxDrains {T: {EU: 1, EP: 0}}, drain rouge (resLigne EU)', dd, 'edl',
    {W: 'ok:INF res=INF apres=DISP/D par=tp'}, [['eu-inf:W', true, 'WC : rejet dans un puisard'], ['eu-sol:W', true, 'WC : rejet au sol (infiltration)']], 'non_conformes', {W: 'non'},
    k => { ed = k.an.eauxDrains === undefined ? 'absent' : JSON.stringify(k.an.eauxDrains); rl = sur(() => V.resLigne(dd.el.find(e => e.id === 'T'), k.an));
      if (ed !== '{"T":{"EU":1,"EP":0}}' || rl !== 'EU') R.info('t10 obtenu : an.eauxDrains ' + ed + ', resLigne ' + rl); return ed === '{"T":{"EU":1,"EP":0}}' && rl === 'EU'; });
}

/* t11 : avant-projet, sorties laissées libres */
function sortiesLibres(){
  const sl = r => r && r.sortiesLibres ? r.sortiesLibres.join(',') : 'aucune', plusSl = (att, ctl) => k => sl(k.an.resObj.s) === att && k.ctl.indexOf('sortielibre:s') >= 0 === ctl;
  /* trop-plein en « Tronçon EU » laissé libre */
  const d0 = doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', 'EU', '', ['P', [8, 0]]]]});
  cas('t11 témoin, trop-plein en « Tronçon EU » laissé libre : rien ne change (aucune sortie libre)', d0, 'avp', {s: 'ok:INF res=INF'}, [], 'conformes', {s: 'oui'}, plusSl('aucune', false));
  /* regard R : vers le puisard, et sortie en « Tronçon EU » laissée libre ; trop-plein du puisard vers le collecteur EU */
  const d1 = doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 4], ['P', 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 0, {res: 'EU'}]],
    l: [['L', 'tr', '', '', ['s', 'R']], ['L1', 'tr', '', '', ['R', 'P']], ['LF', 'tr', 'EU', '', ['R', [-8, 4]]], ['Q', 'tr', '', '', ['P', 'Rp']], col('EU', 8)]});
  cas('t11 sortie EU laissée libre avant le puisard, trop-plein vers le collecteur EU : la sortie reste relevée (sorties libres EU, contrôle), et le trop-plein compte',
    d1, 'avp', {s: 'ok:INF res=INF apres=EU/D par=tp'}, [EP_EU], 'non_conformes', {s: 'non'}, plusSl('EU', true));
}

/* t12 : trop-plein vers un puits (rejet des EP dans un puits : non conforme ; au constat, la ligne reste à juger, comme sans trop-plein) */
function versPuits(){
  cas('t12 descente → puisard → trop-plein → puits (ligne à juger)', doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['W', 'puits', 8, 0]],
    l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'W']]]}), 'edl',
  {s: 'ok:INF res=INF apres=PUITS/D par=tp'}, [['ep-puits:s', true, 'Descente EP : rejet dans un puits']], 'non_conformes', {s: ''});
}

/* t13 : seuls les puisards et les infiltrations au sol sont traversés : l'ouvrage X (puits, boîte EP) atteint par le trop-plein mène par
   un tuyau au collecteur EU */
function nonTraverses(){
  const auDela = (t, p) => doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['X', t, 8, 0, p], ['Rp', 'regard_pub', 16, 0, {res: 'EU'}]],
    l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'X']], ['LX', 'tr', '', '', ['X', 'Rp']], col('EU', 16)]});
  cas('t13 trop-plein vers un puits relié au collecteur EU : le puits n\'est pas traversé', auDela('puits'), 'edl',
    {s: 'ok:INF res=INF apres=PUITS/D par=tp'}, [['ep-puits:s', true, 'Descente EP : rejet dans un puits']], 'non_conformes', {s: ''});
  cas('t13 trop-plein vers une boîte EP reliée au collecteur EU : la boîte n\'est pas traversée', auDela('boite', {res: 'EP'}), 'edl',
    {s: 'ok:INF res=INF apres=EP/D par=tp'}, [['boite-col:X:C', true, 'Boîte de branchement EP : rejet au collecteur EU']], 'non_conformes', {s: 'oui'});
}

/* t14 : marche à rebours du garde-fou (d'où l'eau d'un appareil peut arriver par le trop-plein sans sens) */
function aRebours(){
  cas('t14 témoin, tuyau du WC orienté vers le regard du trop-plein : il est pris à rebours, le trop-plein n\'est pas suivi', parRegard(0, 1), 'edl',
    {s: 'ok:INF res=INF'}, [], 'incomplet', {s: 'oui'}, WC_MULTI);
  /* R → R3 orienté de R vers R3 ; le WC W arrive en R3, qui mène à la boîte EU B */
  cas('t14 WC en aval d\'un tuyau orienté qui part du regard du trop-plein : il n\'est pas remonté, le trop-plein est suivi',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R', 'regard', 8, 0], ['R3', 'regard', 16, 0], ['W', 'wc', 16, 8], ['B', 'boite', 24, 0, {res: 'EU'}]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'R']], ['L3', 'tr', '', '', ['R', 'R3'], 1], ['LW', 'tr', '', '', ['W', 'R3']], ['LB', 'tr', '', '', ['R3', 'B']]]}), 'edl',
    {s: 'ok:INF res=INF apres=EU/D par=tp', W: 'ok:EU res=EU'}, [EP_EU], 'non_conformes', {s: 'non', W: 'oui'});
  cas('t14 trop-plein vers une boîte EU où arrive aussi un WC : la marche à rebours s\'arrête à la boîte, le trop-plein est suivi',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['B', 'boite', 8, 0, {res: 'EU'}], ['W', 'wc', 8, 8]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'B']], ['LW', 'tr', '', '', ['W', 'B']]]}), 'edl',
    {s: 'ok:INF res=INF apres=EU/D par=tp', W: 'ok:EU res=EU'}, [EP_EU], 'non_conformes', {s: 'non', W: 'oui'});
  /* le WC W va par la boîte EU B2 au regard public R2p du même collecteur */
  cas('t14 trop-plein vers le collecteur EU où arrive aussi un WC, par un autre regard public : la marche à rebours s\'arrête au collecteur',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 0, {res: 'EU'}], ['R2p', 'regard_pub', 8, 6, {res: 'EU'}], ['B2', 'boite', 14, 6, {res: 'EU'}], ['W', 'wc', 20, 6]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'Rp']], ['LW', 'tr', '', '', ['W', 'B2']], ['LB', 'tr', '', '', ['B2', 'R2p']], ['C', 'col', 'EU', '', [[8, -10], 'Rp', 'R2p', [8, 10]]]]}), 'edl',
    {s: 'ok:INF res=INF apres=EU/D par=tp', W: 'ok:EU res=EU'}, [EP_EU], 'non_conformes', {s: 'non', W: 'oui'});
  /* trop-plein vers R2, premier sommet du drain d'infiltration T (R2, R3) ; le WC W arrive en R3 */
  cas('t14 trop-plein vers un drain d\'infiltration où arrive un WC, sur un autre sommet : la marche à rebours ne prend pas les liens du drain',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R2', 'regard', 8, 0], ['R3', 'regard', 18, 0], ['W', 'wc', 18, 8]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'R2']], ['T', 'tr', '', '', ['R2', 'R3'], 0, {drain: 'infiltration'}], ['LW', 'tr', '', '', ['W', 'R3']]]}), 'edl',
    {s: 'ok:INF res=INF apres=DISP/D par=tp', W: 'ok:DISP res=DISP apres=INF/D'},
    [['eu-sol:W', true, 'WC : rejet au sol (infiltration)'], ['eu-inf:W', true, 'WC : rejet dans un puisard']], 'non_conformes', {s: 'oui', W: 'non'});
  /* drain de collecte D (compté : une source) du puisard P à la boîte EU B */
  cas('t14 témoin, drain de collecte du puisard à une boîte EU : son tuyau n\'est pas suivi depuis le puisard (le drain est « multiple »)',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['B', 'boite', 10, 0, {res: 'EU'}]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['D', 'tr', 'EP', '', ['P', 'B'], 0, {drain: 'collecte'}]]}), 'edl',
    {s: 'ok:INF res=INF'}, [], 'incomplet', {s: 'oui'}, k => { const r = k.an.resObj.D; return !!r && r.etat === 'multiple' && r.nets.slice().sort().join() === 'EU,INF'; });
  /* drain de collecte D (compté : une source) qui arrive au regard R du trop-plein, d'un bout libre ; R mène à la boîte EU B */
  cas('t14 témoin, drain de collecte qui arrive au regard du trop-plein : la marche à rebours le trouve, le trop-plein n\'est pas suivi (le drain est « multiple »)',
    doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0], ['R', 'regard', 8, 0], ['B', 'boite', 16, 0, {res: 'EU'}]],
      l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'R']], ['D', 'tr', 'EP', '', ['R', [8, -8]], 0, {drain: 'collecte'}], ['LR', 'tr', '', '', ['R', 'B']]]}), 'edl',
    {s: 'ok:INF res=INF'}, [], 'incomplet', {s: 'oui'}, k => { const r = k.an.resObj.D; return !!r && r.etat === 'multiple' && r.nets.slice().sort().join() === 'EU,INF'; });
}

/* t15 : drain d'infiltration D1 (R1, P, R2) ; la descente arrive en R1 ; R2 mène au collecteur EU territorial CB, le trop-plein du
   puisard P au collecteur EU départemental CA */
function gestionnaire(){
  const d = doc({o: [['s', 'descente', 0, 8], ['R1', 'regard', 0, 0], ['P', 'puisard', 10, 0], ['R2', 'regard', 20, 0], ['Ra', 'regard_pub', 10, -10, {res: 'EU'}], ['Rb', 'regard_pub', 30, 0, {res: 'EU'}]],
    l: [['L', 'tr', '', '', ['s', 'R1']], ['D1', 'tr', '', '', ['R1', 'P', 'R2'], 0, {drain: 'infiltration'}], ['Q', 'tr', '', '', ['P', 'Ra']], ['LR', 'tr', '', '', ['R2', 'Rb']],
      ['CA', 'col', 'EU', '', [[0, -10], 'Ra', [20, -10]], 0, {gest: 'D'}], ['CB', 'col', 'EU', '', [[30, -10], 'Rb', [30, 10]], 0, {gest: 'T'}]]});
  const TX = 'Rejet : dispersion dans le sol et, au-delà du drain, puisard (infiltration) et réseau EU territorial · anomalie n° 1';
  let es = null;
  cas('t15 témoin, drain d\'infiltration qui tient un puisard : au-delà, le réseau EU territorial que le drain atteint, comme en v1.7.1 (fiche « ' + TX + ' »)', d, 'edl',
    {s: 'ok:DISP res=DISP apres=INF/D,EU/T'}, [EP_EU, ['sansboite:CB:EU', true, 'Branchement EU : pas de boîte de branchement en limite de propriété', 'arbitrer']], 'non_conformes', {s: 'non'},
    k => { es = sur(() => V.etatSource(copie(d), k.an, k.L, 'edl', 's')); if (!es || es.txt !== TX) R.info('t15 fiche obtenue : ' + JSON.stringify(es)); return !!es && es.txt === TX; });
}

/* t16 : autre destination à arbitrer, WC vers le réseau EP, puisard posé sur un drain d'infiltration */
function autres(){
  cas('t16 trop-plein vers une autre destination aux EP « à arbitrer » : à arbitrer, jamais conforme', doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0],
    ['E', 'exutoire', 8, 0, DST('Mare Fictive', 'arbitrer')]], l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'E']]]}), 'edl',
  {s: 'ok:INF res=INF apres=X:MARE FICTIVE:arbitrer:autre/D par=tp'}, [['ep-exu:s', true, 'Descente EP : rejet dans la mare Fictive', 'arbitrer']], 'exu', {s: ''},
  k => k.ctl.indexOf('exuarbitrer:s') >= 0);
  cas('t16 WC → puisard → trop-plein → collecteur EP', doc({o: [['W', 'wc', 0, 8], ['P', 'puisard', 0, 0], ['Rp', 'regard_pub', 8, 0, {res: 'EP'}]],
    l: [['L', 'tr', '', '', ['W', 'P']], ['Q', 'tr', '', '', ['P', 'Rp']], col('EP', 8)]}), 'edl',
  {W: 'ok:INF res=INF apres=EP/D par=tp'}, [['eu-inf:W', true, 'WC : rejet dans un puisard'], ['eu-ep:W', true, 'WC : rejet au réseau EP']], 'non_conformes', {W: 'non'});
  /* le drain d'infiltration T part du puisard P (son premier sommet) ; aucun autre tuyau */
  const d3 = doc({o: [['s', 'descente', 0, 8], ['P', 'puisard', 0, 0]], l: [['L', 'tr', '', '', ['s', 'P']], ['T', 'tr', '', '', ['P', [10, 0]], 0, {drain: 'infiltration'}]]});
  const TX = 'Rejet : puisard (infiltration) et, par le trop-plein, dispersion dans le sol';
  cas('t16 descente → puisard posé sur le premier sommet d\'un drain d\'infiltration : fiche « ' + TX + ' », an.eauxDrains {T: {EU: 0, EP: 1}}', d3, 'edl',
    {s: 'ok:INF res=INF apres=DISP/D par=tp'}, [], 'conformes', {s: 'oui'},
    k => { const es = sur(() => V.etatSource(copie(d3), k.an, k.L, 'edl', 's')), ed = JSON.stringify(k.an.eauxDrains);
      if (!es || es.txt !== TX || ed !== '{"T":{"EU":0,"EP":1}}') R.info('t16 obtenu : fiche ' + JSON.stringify(es) + ', an.eauxDrains ' + ed);
      return !!es && es.txt === TX && ed === '{"T":{"EU":0,"EP":1}}'; });
}

(async () => {
  tropPlein(); multiples(); chaines(); await textes(); gardeFou(); wc(); sortiesLibres(); versPuits(); nonTraverses(); aRebours(); gestionnaire(); autres();
  R.fin();
})();
