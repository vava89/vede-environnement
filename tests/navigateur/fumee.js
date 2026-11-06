// Parcours complet dans Chromium, avec des données fictives : application ouverte sans erreur, étude et dossier créés à la main, croquis
// sur le fond fictif, un WC relié par un « Tronçon EU » à un regard dont sort un « Tronçon EP » laissé libre, anomalie déduite reprise dans
// le dossier, plan PDF, puis la même application relancée hors connexion (travailleur de service).
// usage : node tests/navigateur/fumee.js [-v] [--app=<dossier>]
'use strict';
const C = require('./commun.js');
const R = C.rapport('fumee');

(async () => {
  const A = await C.ouvrir({sw: true}), p = A.p;
  try {
    R.ok(await p.evaluate(() => !!(window.VCroquis && window.VCroquis.editeur && window.jspdf && window.XLSX && window.JSZip)), 'application ouverte, bibliothèques et module du croquis chargés');
    await C.etudeEtDossier(p);
    R.ok(/\/e\/[^/]+\/v\/[^/]+$/.test(await p.evaluate(() => location.hash)), 'étude et dossier fictifs créés');
    await C.ouvrirCroquis(p);
    const d0 = await C.docCroquis(p);
    R.ok(!!d0.fondId, 'croquis ouvert sur le fond fictif');
    const v = await C.vue(p), x0 = v.cx, y0 = v.cy;
    if (process.argv.indexOf('-v') >= 0) R.info('vue ' + JSON.stringify(v));
    /* WC, regard 4 m plus bas, tronçon EU du WC au regard, tronçon EP du regard vers une extrémité libre */
    await C.outil(p, {k: 'pt', t: 'wc', pal: 'eu'}); await C.toucher(p, x0, y0 + 3);
    await C.outil(p, {k: 'pt', t: 'regard', pal: 'reg'}); await C.toucher(p, x0, y0 - 1);
    /* après un tronçon fini d'office sur un objet, l'éditeur ignore un toucher au même endroit pendant une seconde (garde) */
    await C.outil(p, {k: 'ln', id: 'trEU', pal: 'trace'}); await C.toucher(p, x0, y0 + 3); await C.toucher(p, x0, y0 - 1, 1100);
    await C.outil(p, {k: 'ln', id: 'trEP', pal: 'trace'}); await C.toucher(p, x0, y0 - 1); await C.toucher(p, x0 + 3, y0 - 4); await C.toucher(p, x0 + 3, y0 - 4);
    await C.outil(p, {k: 'main'});
    const d1 = await C.docCroquis(p), pts = d1.el.filter(e => e.k === 'pt'), lns = d1.el.filter(e => e.k === 'ln');
    const wc = pts.find(e => e.t === 'wc'), rg = pts.find(e => e.t === 'regard');
    const tEU = lns.find(l => l.p.res === 'EU'), tEP = lns.find(l => l.p.res === 'EP');
    R.ok(!!wc && !!rg && !!tEU && !!tEP, 'WC, regard et deux tronçons posés (' + pts.map(e => e.t).join(', ') + ' ; ' + lns.map(l => l.t + ':' + (l.p.res || '-')).join(', ') + ')');
    R.ok(!!(tEU && wc && rg && tEU.v[0].a === wc.id && tEU.v[tEU.v.length - 1].a === rg.id), 'le tronçon EU va du WC au regard');
    R.ok(!!(tEP && rg && tEP.v[0].a === rg.id && !tEP.v[tEP.v.length - 1].a), 'le tronçon EP part du regard et finit libre');
    await C.fermerCroquis(p);
    const texte = await p.evaluate(() => document.body.innerText);
    R.ok(/WC : rejet au réseau EP \(présumé\)/.test(texte), 'anomalie déduite reprise dans le dossier : « WC : rejet au réseau EP (présumé) »');
    await p.click('[data-act="vc-pdf"]');
    await p.waitForFunction(() => window.__fichiers.length > 0, null, {timeout: 20000});
    const f = (await p.evaluate(() => window.__fichiers))[0];
    R.ok(/\.pdf$/.test(f.nom) && f.debut.indexOf('%PDF') === 0 && f.taille > 20000, 'plan PDF produit (' + f.nom + ', ' + Math.round(f.taille / 1024) + ' ko)');
    /* hors connexion : la page déjà mise en cache par le travailleur de service se rouvre sans le serveur */
    await p.evaluate(() => navigator.serviceWorker && navigator.serviceWorker.ready);
    await C.pause(p, 1500);
    await A.ctx.setOffline(true);
    await p.reload(); await p.waitForSelector('[data-act="etude-new"], #app', {timeout: 15000});
    const t2 = await p.evaluate(() => document.body.innerText);
    R.ok(/Étude fictive/.test(t2) || /12 rue Fictive/.test(t2), 'application rouverte hors connexion, étude retrouvée');
    await A.ctx.setOffline(false);
    R.ok(!A.erreurs.length, 'aucune erreur dans la console' + (A.erreurs.length ? ' : ' + A.erreurs.slice(0, 3).join(' | ') : ''));
  } catch (e){ R.ok(false, 'exception du test : ' + (e && e.stack || e)); }
  finally { await A.fermer(); R.fin(); }
})();
