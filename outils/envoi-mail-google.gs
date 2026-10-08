/**
 * VÉDÉ Terrain : service personnel d'envoi des constats depuis votre adresse Gmail.
 *
 * À installer UNE SEULE FOIS sur VOTRE compte Google (mode d'emploi : Réglages de l'application,
 * ou LISEZMOI.txt, rubrique « ENVOI DES CONSTATS PAR MAIL »).
 *
 * Ce fichier ne contient aucun secret. La clé se règle dans Paramètres du projet > Propriétés du script :
 *   CLE         obligatoire, phrase secrète d'au moins 12 caractères, la même que dans les Réglages de l'application ;
 *   EXPEDITEUR  facultatif, adresse professionnelle déclarée dans Gmail (« Envoyer des e-mails en tant que ») ;
 *   MAX_JOUR    facultatif, plafond d'envois par jour (50 par défaut).
 *
 * L'application envoie en POST (texte JSON) : {cle, id, test, a: [adresses], cc, objet, message, nom, pj: [{nom, type, b64}]}.
 * Le service répond {ok: true} ou {ok: false, error: "…"}. Un même identifiant n'est envoyé qu'une fois (6 heures).
 * En cas de perte de la tablette : changez CLE ici, ou supprimez le déploiement (Déployer > Gérer les déploiements).
 */
function doPost(e) {
  try {
    var req = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var props = PropertiesService.getScriptProperties();
    var cle = props.getProperty('CLE') || '';
    if (cle.length < 12) return reponse_({ok: false, error: 'service non configuré : ajoutez la propriété CLE (12 caractères au moins)'});
    if (!egal_(String(req.cle || ''), cle)) { Utilities.sleep(1000); return reponse_({ok: false, error: 'clé refusée'}); }

    var a = (req.a || []).map(function (x) { return String(x).trim(); }).filter(adresse_);
    if (!a.length || a.length > 10) return reponse_({ok: false, error: 'destinataires manquants ou trop nombreux (10 au plus)'});
    var cc = adresse_(String(req.cc || '').trim()) ? String(req.cc).trim() : '';

    var verrou = LockService.getScriptLock();
    verrou.waitLock(20000);
    try {
      var cache = CacheService.getScriptCache(), id = String(req.id || '').slice(0, 80);
      if (id && cache.get('envoi:' + id)) return reponse_({ok: true, doublon: true});

      var jour = Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd');
      var compteur = JSON.parse(props.getProperty('COMPTEUR') || '{}');
      var n = compteur.jour === jour ? compteur.n : 0, max = Number(props.getProperty('MAX_JOUR') || 50);
      if (n >= max) return reponse_({ok: false, error: 'plafond de ' + max + ' envois atteint pour aujourd\'hui'});

      var pj = (req.pj || []).slice(0, 3).map(function (p) {
        return Utilities.newBlob(Utilities.base64Decode(String(p.b64 || '')), String(p.type || 'application/pdf'), String(p.nom || 'constat.pdf').slice(0, 120));
      });
      var taille = pj.reduce(function (s, b) { return s + b.getBytes().length; }, 0);
      if (taille > 15 * 1024 * 1024) return reponse_({ok: false, error: 'pièces jointes trop lourdes (15 Mo au plus)'});

      var options = {attachments: pj};
      if (req.nom) options.name = String(req.nom).slice(0, 80);
      if (cc) options.cc = cc;
      var expediteur = props.getProperty('EXPEDITEUR');
      if (expediteur) options.from = expediteur;
      GmailApp.sendEmail(a.join(','), String(req.objet || 'Constat de visite').slice(0, 200), String(req.message || ''), options);

      props.setProperty('COMPTEUR', JSON.stringify({jour: jour, n: n + 1}));
      if (id) cache.put('envoi:' + id, '1', 21600);
      return reponse_({ok: true, restants: max - n - 1});
    } finally {
      verrou.releaseLock();
    }
  } catch (err) {
    return reponse_({ok: false, error: String((err && err.message) || err)});
  }
}

/* Ouvrir l'adresse du service dans un navigateur affiche ce message : le déploiement répond. */
function doGet() { return reponse_({ok: true, service: 'VÉDÉ Terrain, envoi des constats'}); }

function reponse_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function adresse_(s) { return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/.test(s); }
/* comparaison à durée constante, pour ne rien laisser deviner de la clé */
function egal_(x, y) { if (x.length !== y.length) return false; var r = 0; for (var i = 0; i < x.length; i++) r |= x.charCodeAt(i) ^ y.charCodeAt(i); return r === 0; }
