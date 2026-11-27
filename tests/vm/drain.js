// Drains, 1re à 3e et 5e parties (décisions D4, D6, D7, D8 et D9 de la conception « Rejets » ; m121, m122, m123, m129), sans navigateur. Un drain est un
// tronçon qui porte p.drain : 'collecte' (il recueille l'eau du sol) ou 'infiltration' (il la disperse dans le sol). Depuis m122, le drain
// d'infiltration est un exutoire linéaire : l'eau qui l'atteint est dispersée dans le sol. Depuis m123, le drain de collecte compte comme une
// source, à la manière d'un point « Drain » : sa sortie non dessinée prend le réseau de son tracé (EP), et il compte au constat.
// Croquis fictifs (12 rue Fictive, Ville-Exemple), tracés libres (aucun objet à leurs bouts ; un regard au sommet du milieu pour les cas
// « coupé par un regard »).
// d1 : defautsLn('tr', o) recopie o.drain s'il vaut 'collecte' ou 'infiltration', après les autres clés ; toute autre valeur est écartée, et un
//   tronçon sans drain garde exactement ses clés (res, st, diam, mat, pose, long, sens, obs) ; collecteur, trait et escalier n'en prennent
//   pas. VCroquis.drainDe lit le drain d'un tronçon ('' pour une autre valeur, pour un autre tracé ou pour un objet).
// d2 : à l'écran (canevas factice, 40 px par mètre), un peigne : une dent de 0,4 m par mètre réel, la première à 0,5 m du départ, de la couleur
//   du trait (vert pour l'infiltration, même sans réseau : m122 ; rouge s'il ne reçoit que des EU : m142, d18) ; à droite du tracé, en
//   suivant ses sommets, pour la collecte ; des deux côtés pour l'infiltration. Tracé droit de 10 m (10 dents),
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
//   Depuis m142, il est en couleur 1 s'il ne reçoit que des eaux usées (d18).
// d5 : légende du plan PDF (page 1 ; depuis m123, la page 2 nomme aussi chaque drain de collecte) : « Drain » et « Drain d'infiltration » une
//   fois chacune (deux drains de chaque sorte), après « Canalisation EP (eaux pluviales) », qui reste ; à gauche de chaque ligne, un
//   échantillon gris : un trait de 8 mm et 3 dents, d'un côté ou des deux. Témoin : sans drain, ni l'une ni l'autre.
// d6 (m122) : descente → tronçon → drain d'infiltration à bouts libres (raccord au sommet du milieu) : la descente est conforme, « Rejet :
//   dispersion dans le sol » ; ni « exutoire non dessiné », ni « À compléter », ni « extrémité libre ». Témoin : le même drain sans p.drain,
//   « sansexu », « incomplet » et l'extrémité libre.
// d7 : un WC à la place de la descente : « WC : rejet au sol (infiltration) », non conforme.
// d8 : source posée sur un sommet du drain, sans tronçon ; deux sources sur deux sommets ; regard au tampon béton tenu par le drain (au 1er
//   sommet, après une descente, ou seul au sommet du milieu) : il prend le réseau EP, donc « Regard EP : tampon béton » en réserve. Ce que le
//   drain tient, et ce qu'atteint un tuyau parti d'un de ses sommets, reste vu de toute source qui l'atteint, par n'importe quel sommet.
//   Depuis m129 (Q7 a), ce qu'elle n'atteint qu'au-delà du drain (par ses liens) garde sa règle et sa case, et elle reste ok:DISP (au-delà :
//   r.apres), « Infiltration diffuse » cochée : boîte EU au bout d'un tuyau parti du dernier sommet (descente arrivée au 1er par un
//   tronçon) ou sur le dernier sommet (descente au sommet du milieu), « Descente EP : rejet au réseau EU » NC, « non » au constat ; puits
//   sur le dernier sommet (descente posée sur le 1er), « rejet dans un puits » NC (au constat, à juger, comme sans drain) ; tuyau parti du
//   dernier sommet vers une boîte EP, « conformes », « oui » (jusqu'à m128 : deux exutoires, « multiple », « incomplet »). Un tuyau vers
//   une boîte EP parti du sommet de la descente atteint cet exutoire avant le drain : « multiple » (DISP, EP), « relié à plusieurs
//   réseaux », « incomplet », ni conformité ni « Infiltration diffuse ». Une 2e descente reliée au puits du drain reste ok:PUITS, « rejet
//   dans un puits » non conforme ; la 1re aussi, au-delà du drain. Une boîte de branchement sans réseau tenue par le drain garde « réseau
//   à indiquer » (ni EP, ni exutoire) : avec elle et un regard sur le drain, la descente reste ok:DISP, « conformes ».
// d9 : constat de la descente : sans code, conforme, « Drain d'infiltration (dispersion dans le sol) », case « Infiltration diffuse » ; du WC :
//   MILIEU, non conforme, « Drain d'infiltration : rejet au sol (milieu naturel) ». Étiquette « Dispersion dans le sol », suivie des détails
//   du tuyau (Ø100), avec ou sans analyse ; resLigne : EP seul, sans analyse, relié à une descente ; PRJ en projet ; DXF : polyligne en
//   couleur 3 en trait plein, étiquette sur VEDE-ETIQUETTES en couleur 3 ; plan PDF : l'étiquette. Témoins : un tronçon et un drain de collecte
//   sans détail n'ont pas d'étiquette ; le même tracé sans p.drain reste INC, seul sans analyse et relié à une descente.
// d10 (m123) : drain de collecte seul, « Tronçon EP » à bouts libres : ok, réseau EP présumé, aucune anomalie, « conformes », ni « extrémités
//   libres » ni rien à compléter ; au constat, une ligne « Drain », « Réseau EP départemental (présumé) », EP_D, « oui », méthode
//   « Eau » ; page 2 du plan PDF : le drain parmi les équipements. « Déduit » (sans réseau) : sansexu, « Drain : exutoire non dessiné »,
//   « incomplet », et, au plan d'avant-projet, « Après travaux : Drain n'a pas d'exutoire dessiné ». Sans méthode : « Drain : méthode de test
//   à indiquer », seul.
// d11 : il suit les règles d'une source EP : vers un puisard, ok:INF, « conformes », case puisard ; vers un regard, un « Tronçon EU » et une
//   boîte EU, « Drain : rejet au réseau EU » non conforme ; relié à un drain d'infiltration (sommet partagé ou tuyau), ok:DISP, « conformes »,
//   case « Infiltration diffuse » ; quand ce drain d'infiltration atteint aussi une boîte EP par un tuyau parti de son dernier sommet,
//   T=ok:DISP, au-delà du drain EP, « conformes », et au constat « Drain d'infiltration (dispersion dans le sol) » et « Réseau EP
//   départemental », conforme (m129, Q7 a ; jusqu'à m128 : « multiple » (DISP, EP), sans conformité).
// d12 : un point « Drain » sur un sommet (le 1er, ou celui du milieu) compte, et lui seul : une ligne, s=ok:EP présumé, aucun contrôle.
// d13 (témoin) : 400 croquis tirés, en état des lieux et en avant-projet (800 analyses) ; deux tronçons sur trois deviennent des drains de
//   collecte (un sur deux en EP, dans le croquis sans drain aussi) ; un drain sur quatre tient un point « Drain » sur son premier sommet
//   libre (dans le croquis sans drain aussi). Ce que fixe() relève ne change pas ; chaque drain compté a son résultat, et la ligne « Autres :
//   Drain » en compte un par drain et par point « Drain » (pas de double compte) ; aucun nœud « dr: » ni lien de drain ne reste. Depuis
//   m129 (Q6 b), comme dans g1, une source ponctuelle dont l'eau disperse au bout libre d'un drain de collecte prend « dispersion dans le
//   sol » au lieu d'un réseau présumé ou d'aucun ; fixe() laisse de côté ces sources, leurs fosses et le sens des pièces qu'elles atteignent.
//   Depuis m145 (D11), un drain de collecte compté est une arrivée possible pour un puisard ou une infiltration au sol (garde-fou) : le
//   trop-plein qui passe par lui n'est pas suivi, alors que le croquis sans drain le suit ; fixe() laisse aussi de côté ces sources, qui
//   gardent l'ouvrage pour rejet et y lisent moins au-delà de lui (r.apres), ou ne sont plus « multiple » par leur trop-plein.
// d14 : l'eau d'un drain de collecte sort par chacun de ses nœuds (bouts, regards, raccords), sauf par son bout amont quand son sens est
//   indiqué. Regard au sommet du milieu relié à une boîte EU (sens 1, -1, ou sans sens), ou raccord à sa place : « Drain : rejet au réseau
//   EU », NC ; drain orienté vers une boîte EP, regard du milieu vers une boîte EU : « multiple », « incomplet » ; regard du milieu vers un
//   puits : « Drain : rejet dans un puits », NC ; drain sans sens entre deux boîtes EP ou deux puisards, regard du milieu vers une boîte EU :
//   « multiple ». Témoin : boîte EU au bout amont d'un drain orienté, non vue (EP présumé, « conformes ») ; au bout aval, NC. Le contrôle
//   du réseau contredit nomme le drain : « Drain EP : le dessin le relie à réseau EU » (témoin, un tronçon : « Tronçon EP : … »).
// d15 : une descente et un drain de collecte d'identifiant plus petit vont au même collecteur EP, sans boîte, par deux raccords : « pas de
//   boîte de branchement » reste à l'entrée de la descente, comme sans le drain (un point source passe avant un drain).
// d16 (m129, Q6 b) : un équipement relié au bout libre d'un drain de collecte dont la sortie n'est pas dessinée disperse dans le sol, comme au
//   drain d'infiltration ; le drain suit le même rejet (même tuyau) et porte l'étiquette « Dispersion dans le sol » à l'écran, au plan PDF
//   et au DXF. Descente posée sur le 1er sommet, ou arrivée par un « Tronçon EP » sur un raccord au milieu du drain : s=ok:DISP et
//   T=ok:DISP, non présumés, aucune anomalie, « conformes », rien à compléter ; fiche « Rejet : dispersion dans le sol » ; au constat, la
//   descente et « Drain » conformes, « Drain d'infiltration (dispersion dans le sol) », case « Infiltration diffuse » ; étiquette
//   du drain avec l'analyse, aucune sans elle. WC → « Tronçon EU » → drain : « WC : rejet au sol (infiltration) » non conforme ; le drain
//   suit (T=ok:DISP, étiquette). Point « Drain » sur le 1er sommet, descente au sommet du milieu : P=ok:DISP et s=ok:DISP, « conformes »,
//   une ligne « Drain ». Témoins : un drain qu'aucun équipement n'atteint reste T=ok:EP présumé (Q3 b) ; un drain dont la sortie
//   est dessinée (boîte EP) garde s=ok:EP et T=ok:EP ; ni l'un ni l'autre n'a d'étiquette ; un drain indiqué « EU » garde son réseau
//   présumé (« rejet au réseau EU (présumé) », NC) ; une descente qui atteint le bout libre du drain et celui d'un « Tronçon EP » garde le
//   réseau EP présumé, le drain aussi, sans étiquette. Drain D1 dont la sortie est dessinée (regard) vers un drain D2 à bouts libres : s, D1
//   et D2 dispersent, l'étiquette sur D2 seul, dont le bout libre disperse. Point « Drain » relié par un tuyau au milieu du drain (choix
//   [p]) : il suit le drain (descente posée sur le drain : P, s et T dispersent ; seul, témoin : P et T gardent le réseau EP présumé).
//   Avant-projet : descente par un « Tronçon EU » ou un « Tronçon unitaire », WC par un « Tronçon EU », vers un drain « Déduit » à bouts
//   libres, puis les drains eux-mêmes (« Tronçon unitaire » entre deux drains « Déduit ») : ok:DISP, aucune sortie laissée libre (ni
//   contrôle sortielibre, ni ligne du plan PDF) ; témoin : une vraie sortie EU laissée libre à côté d'une boîte EP dessinée reste relevée.
// d17 (m129, Q7 a) : un drain d'infiltration qui atteint aussi un autre exutoire (ouvrage sur son dernier sommet, trop-plein parti de ce
//   sommet). La source posée sur son 1er sommet disperse dans le sol (le drain compte pour un) et chaque exutoire atteint au-delà garde sa
//   règle et sa case : boîte EP, « conformes », au constat « … et, au-delà du drain, réseau EP départemental », conforme ; boîte EU,
//   « Descente EP : rejet au réseau EU » NC ; puits, « rejet dans un puits » NC ; WC vers une boîte EP, « rejet au sol » et « rejet au
//   réseau EP », NC, sans case EP. La page 2 du plan PDF dit « au-delà du drain ». Bifurcation avant le drain (tuyau vers une boîte EP), avec
//   ou sans trop-plein du drain vers une boîte EU : « multiple » (DISP, EP), « incomplet », sans r.apres, et le message ne cite pas l'EU.
//   Autre destination aux EP « à arbitrer » au-delà du drain : son anomalie à arbitrer, le contrôle « … à arbitrer », « exu ». Depuis
//   m145 (D11), le trop-plein d'un puisard ou d'une infiltration au sol vers une boîte EU est lu (ok:INF, ok:SOL, au-delà EU, r.apresPar
//   'tp', « Descente EP : rejet au réseau EU » NC, « non_conformes » ; jusqu'à m144, témoins : non lu, « conformes », comme en v1.5.1).
//   Exutoires posés l'un derrière l'autre sur le drain (boîte EP puis puits, puisard puis puits, boîte EP puis boîte EU, boîte EP puis
//   raccord et trop-plein vers une boîte EU) : le drain ne s'arrête pas au premier, chacun compte (« rejet dans un puits » ou « rejet au
//   réseau EU », NC). Deux autres destinations au-delà du drain (deux trop-pleins, ou posées sur les sommets 1 et 2 ; réserve puis NC,
//   réserve puis à arbitrer, à arbitrer puis réserve, conforme puis NC) : leurs anomalies auraient la même clé ; « multiple » (DISP et les
//   deux), « incomplet », aucune anomalie de destination, comme avant m129 (décision D5).
// d18 (m142, décision D8 de la conception v1.7.2) : la couleur d'un drain d'infiltration suit les eaux qu'il reçoit, comptées dans
//   an.eauxDrains ({id du drain : {EU: n, EP: n}}, une de plus par source qui l'atteint ; un drain de collecte compté apporte des EP).
//   WC → tronçon → drain : {T: {EU: 1, EP: 0}}, resLigne EU, rouge (v1.7.1 : EP) ; sans analyse, EP. WC et descente sur le même drain :
//   {EU: 1, EP: 1}, EP, et leurs libellés ne changent pas (S5 a : WC « Drain d'infiltration : rejet au sol (milieu naturel) », MILIEU, NC ;
//   descente « Drain d'infiltration (dispersion dans le sol) », conforme, case « Infiltration diffuse »). Descente seule : {EU: 0, EP: 1},
//   EP ; drain qu'aucune source n'atteint : an.eauxDrains absent (état des lieux et avant-projet), EP. Drain « projet » que le WC atteint
//   au plan d'avant-projet : {EU: 1, EP: 0}, mais PRJ. Drain de collecte relié au drain : {EU: 0, EP: 1}, EP ; avec un WC aussi, EP ;
//   témoin, le WC seul : EU. Plan d'avant-projet [p] : un drain gardé que plus rien n'atteint est vert (tuyau du WC « à supprimer » :
//   EP) ; un drain « à supprimer » garde la couleur de l'état des lieux, comme un tuyau (EU) ; tuyau du WC « projet » : EP à l'état des
//   lieux, EU à l'avant-projet. Drain rouge :
//   à l'écran, trait et 10 dents en rgb(224,0,0), étiquette « Dispersion dans le sol » (texte inchangé) en #c20000 ; au plan PDF (1/200),
//   trait et dents en 224,0,0, étiquette en 194,0,0 ; au DXF, polyligne et dents en couleur 1 sur VEDE-DRAINS (calque toujours en 3),
//   étiquette en couleur 1 sur VEDE-ETIQUETTES ; légende « Canalisation EU (eaux usées) », « Drain d'infiltration » une fois. Le tuyau
//   du WC (sans réseau indiqué) est rouge lui aussi depuis m165 (resLigne EU ; plus de ligne « Canalisation EP (eaux pluviales) » à la
//   légende ; jusqu'à m164, témoin : il restait vert, comme en v1.7.1). Témoins : un regard au tampon béton tenu par un drain rouge reste
//   EP, « Regard EP : tampon béton » en réserve, et le WC « rejet au sol » ; une anomalie déjà saisie à la main (réseau EP) sur un drain
//   devenu rouge garde son réseau.
// d19 (m165, réponse du 23 nov. 2026 : « Le passer en rouge ») : un tuyau sans réseau indiqué qui ne mène qu'à des drains d'infiltration
//   prend, pièce par pièce, la couleur des eaux qu'il porte, comme le drain : an.eauxPieces ({id de la pièce : {EU: n, EP: n}}, une de
//   plus par source dont l'eau y passe pour aller au drain, par les plus courts chemins ; ces seules pièces) et V.resMorceau (EU si la
//   pièce ne porte que des EU). WC → tuyau Ø100 → drain : {L:0: {EU: 1, EP: 0}}, resMorceau et resLigne EU, resPiece inchangé (EP
//   déduit) ; rouge à l'écran (trait rgb(224,0,0), étiquette « EU Ø100 » en #c20000), au plan PDF (1/200 : trait en 224,0,0, étiquette en
//   194,0,0) et au DXF (polyligne sur VEDE-EU, de la couleur du calque ; « EU %%c100 » en couleur 1) ; avec une descente sur le dernier
//   sommet du drain, drain vert et tuyau rouge : légende EU et EP. (a) WC et descente réunis avant le drain : tuyau du WC rouge, celui de
//   la descente et le tuyau commun verts. (b) WC → fosse → tuyau → drain, (c) WC → boîte sans réseau → tuyau → drain : les deux tuyaux
//   rouges. (d) Avant-projet : tuyau du WC « à supprimer » : rouge de l'état des lieux (an.ref) ; WC « à supprimer » : son tuyau, gardé,
//   ne porte plus rien : vert. (e) WC → puisard → trop-plein → drain : le trop-plein orienté vers le drain est rouge, le tuyau du puisard
//   vert ; sans sens, le trop-plein atteint aussi le puisard et reste vert. Si le WC va aussi au drain par un chemin direct orienté plus
//   long, ce chemin est rouge lui aussi (les plus courts chemins du parcours ordinaire comptent avec ceux du trop-plein), dans les deux
//   ordres du dessin. (f) Dans les deux ordres du dessin : en boucle, le plus court chemin rouge, la branche plus longue verte ; deux
//   tuyaux parallèles aussi courts, rouges tous deux. (g) Tuyau de trois pièces, une descente arrivant à la 2e : la 1re rouge, les autres
//   vertes ; resLigne EP ; la pièce rouge donne la ligne EU de la légende du plan PDF. Relecture de m165 : une source EP compte aussi sur
//   chaque tuyau orienté que son eau prend, puis jusqu'au drain, dans les deux ordres du dessin : (h) WC et descente sur des tuyaux
//   orientés, la descente atteignant le drain par un tuyau plus court et par celui du WC : celui-ci vert ; (i) WC et descente vers un
//   puisard dont le trop-plein orienté va au drain, la descente y allant aussi par un tuyau orienté plus court : trop-plein vert, que le
//   parcours du trop-plein de la descente soit laissé ou gardé (2e trop-plein vers un rejet en milieu naturel) ; trop-plein vers un
//   raccord, puis tuyau sans sens jusqu'au drain : verts tous deux. (k) Tuyau de deux pièces, l'une rouge, l'autre verte : EP, « EP
//   Ø100 », dans les deux sens du tracé. (r) Regard au tampon béton sur le tuyau du WC : les deux tuyaux rouges ; témoin, le regard reste
//   un regard EP (« Regard EP : tampon béton », réserve). Témoins (les deux versions) : descente seule, « Tronçon EP » d'un WC, tuyau
//   sans source : verts ; WC vers le drain et un collecteur EU : « plusieurs réseaux » ; sur les croquis de d19, resPiece et resObj de
//   v1.7.2, et mêmes anomalies, conclusion, constat déduit et boîtes du constat avec et sans an.eauxPieces ; an.eauxPieces absent ou
//   altéré (13 valeurs) : couleurs de v1.7.2, sans exception.
// d20 (m166, relecture d'ensemble de la v1.7.3 : CL1 et CL2) : ce que le drain d'infiltration atteint au-delà de lui ne change pas la couleur du
//   tuyau qui y mène (an.eauxPieces suit le parcours sans les liens du drain, refait seulement si la pièce atteint un drain et un autre
//   exutoire). WC → tuyau Ø100 → drain rouge, directement ou par une fosse septique, puis, au-delà du drain : (1) trop-plein parti du sommet du
//   milieu vers une boîte EP, (2) boîte EP sur le dernier sommet, (3) puisard sur le sommet du milieu, (4) puits, (5) infiltration au sol sur le
//   dernier sommet, (6) boîte sans réseau sur le dernier sommet, reliée à un collecteur EP : {L:0: {EU: 1, EP: 0}} (et L0:0 par la fosse),
//   resMorceau et resLigne EU (tête de la fiche « Réseau EU déduit », anomalie saisie à la main en EU), étiquette « EU Ø100 » ; rouge à l'écran,
//   au plan PDF (1/200) et au DXF (VEDE-EU, « EU %%c100 » en couleur 1). (r) Regard au tampon béton sur le tuyau du WC, ou sur le sommet du
//   milieu du drain, une boîte EP au-delà : tuyaux rouges ; témoin, le regard reste EP (« Regard EP : tampon béton », réserve), le WC NC (rejet
//   au sol et, au-delà du drain, au réseau EP). (d) CL1 et CL2 ensemble : descente reliée au tuyau du WC par un regard, une boîte EP au-delà du
//   drain (le cas (k) de d19) : la pièce du WC rouge, « Canalisation EP » et « Canalisation EU » à la légende. Témoins (les deux versions) : le
//   trop-plein de (1) et le tuyau de (6), au-delà du drain, verts ; trop-plein parti du sommet où arrive le tuyau du WC vers une boîte EP, avant
//   le drain : source « multiple », tuyaux verts ; collecteur EU au-delà du drain : « plusieurs réseaux » ; bifurcation avant le drain vers une
//   boîte EP : verts ; descente de (d) : le tuyau, sa pièce commune et le tuyau de la descente verts ; sur les croquis de CL1, résultat des
//   sources (au-delà compris), resPiece et an.eauxDrains inchangés, et mêmes anomalies, conclusion, constat déduit et boîtes du constat avec et
//   sans an.eauxPieces. CL2 : tuyau rouge (resLigne EU) dont la dernière pièce, verte, ne porte aucune eau : « Canalisation EU » et
//   « Canalisation EP » à la légende du plan PDF, dans les deux sens du tracé ; témoins : tuyau rouge de bout en bout, la seule ligne EU ; tuyau
//   vert dont une pièce est rouge, EP et EU ; au plan d'avant-projet, un tuyau « à supprimer » est d'une seule couleur, celle de l'état des
//   lieux, avec sa ligne : (a) le tuyau de CL2, rouge ; (b) celui de (k) de d19, vert, sans ligne EU.
// g1 (garde) : sur 40 croquis du générateur dont chaque tronçon devient un drain de collecte (état des lieux et avant-projet), aucune
//   exception (analyse, anomalies, conclusion, contrôles, constat déduit), et ce qui ne change pas reste tel quel (fixe() : résultat des
//   sources ponctuelles, contrôles et anomalies posés sur un objet, sauf « pas de boîte de branchement », réseau et sens des pièces, réseau
//   des regards et des objets). Jusqu'à m123, g1 comparait tout le résultat, drains compris : depuis m123, un drain de collecte a son propre
//   résultat, ses contrôles et ses anomalies, et il compte au constat. Depuis m129 (Q6 b), une source ponctuelle dont l'eau disperse au bout
//   libre d'un drain de collecte (r.drains) prend « dispersion dans le sol », non présumée, là où le témoin (tronçons ordinaires) n'a aucun
//   exutoire dessiné (réseau présumé, ou aucun) : dispersees() le vérifie, et fixe() laisse de côté ces sources, leurs fosses (le témoin
//   peut en voir une sur un chemin que la dispersion ne prend plus) et le sens des pièces qu'elles atteignent (l'eau y va vers les bouts du
//   drain).
// g2 (garde, m122) : sur les mêmes croquis, un tronçon sur deux devient un drain d'infiltration sans réseau ; témoin : les mêmes tronçons sans
//   réseau ni drain. Aucune exception ; seules changent les sources qui atteignent un drain d'infiltration (il y en a). Chacune d'elles
//   atteint encore chaque exutoire dessiné qu'elle atteint dans le témoin, et devient « multiple » si elle en atteint un avant le drain ;
//   depuis m129 (Q7 a), si elle ne les atteint qu'au-delà du drain, elle disperse dans le sol et les compte au-delà (r.apres ; il y en
//   a). Une conclusion
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
// Échouent sur 00f4ac5 (m128) : les quatre cas d'au-delà de d8 et la 2e descente reliée au puits (« multiple »), le drain d'infiltration
//   relié à une boîte EP de d11, l'invariant d'au-delà de g2 (aucune source au-delà), d16 et d17 sauf leurs témoins, la bifurcation sans
//   trop-plein et les deux destinations au-delà par deux trop-pleins (déjà « multiple ») ; posées sur les sommets 1 et 2, la seconde y est
//   cachée par la première (« multiple » sans elle) ; d1 à d7, d9, d10, d12 à d15, g1, les autres cas de d8 et de d11 et les témoins y
//   passent.
// Échouent sur a7635a4 (m141) : les cas de d18 (aucun an.eauxDrains, drain d'infiltration toujours vert), témoins compris, car ils
//   vérifient aussi que le drain est rouge ; seuls les libellés de d18 (S5 a) y passent, comme d1 à d17, g1 et g2.
// Échouent sur f537268 (m144) : les deux cas de trop-plein de d17 (le trop-plein n'y est pas lu : « conformes ») ; d13 y passe.
// Échouent sur 37d48ba (m164) : la légende de d18 (le tuyau du WC y reste vert : ligne « Canalisation EP (eaux pluviales) ») et les cas
//   de d19 (aucun an.eauxPieces : tuyaux verts), sauf ses témoins ; d1 à d17, g1, g2 et les autres cas de d18 y passent. Avant la
//   relecture de m165, échouaient la légende de (g), (h), (i) et (k) de d19.
// Échouent sur 9142f36 (m165) : les six cas de CL1 de d20, analyse et rendus (tuyaux verts, « EP Ø100 »), son cas (r), son cas (d) (pièce du WC
//   verte, pas de ligne EU) et son cas de CL2 (pas de ligne EP), soit 15 contrôles ; les témoins de d20, d1 à d19, g1 et g2 y passent.
'use strict';
const {charger, doc, copie, reordonne, rendus, rapport} = require('./charger.js');
const G = require('./generateur.js');
const ch = charger({pdf: true}), {V} = ch, R = rapport('drain'), {canevas, pdf, dxf, dessiner} = rendus(ch);
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
  const J = (id, x) => [id, 'jonction', x, 0], apresDe = (k, id) => ((k.an.resObj[id] || {}).apres || []).map(x => x.res).join(',');
  /* m129 (Q7 a) : ce que le drain atteint au-delà de lui (tuyau parti d'un de ses sommets, ouvrage qu'il tient) compte avec son jugement ;
     la source disperse dans le sol (jusqu'à m128 : « multiple ») */
  [['boîte EU au bout d\'un tuyau parti du dernier sommet, descente arrivée au 1er sommet par un tronçon', 'EU', [['ep-eu:s', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', 'non',
    doc({o: [['s', 'descente', 0, 8], J('J', 0), J('J2', 10), ['B', 'boite', 20, 0, {res: 'EU'}]],
      l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', [5, 0], 'J2'], 0, INFIL], ['L3', 'tr', '', '', ['J2', 'B']]]})],
  ['boîte EU sur le dernier sommet, descente arrivée au sommet du milieu', 'EU', [['ep-eu:s', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', 'non',
    doc({o: [['s', 'descente', 0, 8], J('J', 0), ['B', 'boite', 10, 0, {res: 'EU'}]], l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', [[-5, 0], 'J', 'B'], 0, INFIL]]})],
  ['puits sur le dernier sommet, descente posée sur le 1er', 'PUITS', [['ep-puits:s', true, 'Descente EP : rejet dans un puits']], 'non_conformes', '',
    doc({o: [['s', 'descente', 0, 0], ['P', 'puits', 10, 0]], l: [['T', 'tr', '', '', ['s', [5, 0], 'P'], 0, INFIL]]})],
  ['tuyau parti du dernier sommet vers une boîte EP, descente posée sur le 1er', 'EP', [], 'conformes', 'oui',
    doc({o: [['s', 'descente', 0, 0], J('J2', 10), ['B', 'boite', 20, 0, {res: 'EP'}]], l: [['T', 'tr', '', '', ['s', [5, 0], 'J2'], 0, INFIL], ['Q', 'tr', '', '', ['J2', 'B']]]})]
  ].forEach(([nom, ap, anos, c, conf, d]) => {
    const k = juge(d), cd = V.constatDeduit(copie(d), V.analyser(copie(d), 'edl')), rd = cd.rows.find(r => r.id === 'gout_av');
    R.ok(k.et === 's=ok:DISP' && apresDe(k, 's') === ap && memesA(k.a, anos) && k.c === c && !!rd && rd.conforme === conf && cd.epRecup.infil === true,
      'd8 ' + nom + ' : s=ok:DISP, au-delà du drain ' + ap + ', ' + (anos.map(a => '« ' + a[2] + ' »').join(', ') || 'aucune anomalie') + ', « ' + c + ' » ; au constat, conforme « '
      + conf + ' », « Infiltration diffuse » cochée (m129, Q7 a ; jusqu\'à m128 : « multiple ») (obtenu ' + txtJuge(k) + ' ; au-delà ' + apresDe(k, 's') + ' ; constat '
      + (rd ? JSON.stringify({libs: rd.libs, conforme: rd.conforme}) : 'sans ligne') + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
  });
  /* tuyau parti du sommet de la descente : un autre exutoire avant le drain, « multiple » */
  {
    const d = doc({o: [['s', 'descente', 10, 0], ['B', 'boite', 20, 0, {res: 'EP'}]], l: [['T', 'tr', '', '', [[0, 0], [5, 0], 's'], 0, INFIL], ['Q', 'tr', '', '', ['s', 'B']]]});
    const k = juge(d), cd = V.constatDeduit(copie(d), V.analyser(copie(d), 'edl')), rd = cd.rows.find(r => r.id === 'gout_av');
    R.ok(multiple(k, 's', 'DISP,EP') && !k.a.length && k.c === 'incomplet' && !!rd && rd.conforme !== 'oui' && !cd.epRecup.infil && !k.an.resObj.s.apres,
      'd8 tuyau vers une boîte EP parti du sommet de la descente (le dernier) : s=multiple (DISP,EP), « relié à plusieurs réseaux », aucune anomalie, « incomplet » ; au constat, '
      + 'la descente n\'est pas déclarée conforme et « Infiltration diffuse » n\'est pas cochée (obtenu ' + txtJuge(k) + ' ; constat '
      + (rd ? JSON.stringify({libs: rd.libs, conforme: rd.conforme}) : 'sans ligne') + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
  }
  /* une 2e descente reliée au puits du drain : rejet dans un puits, non conforme (règle fixe) ; la 1re aussi, au-delà du drain (m129) */
  const kp = juge(doc({o: [['s1', 'descente', 0, 0], ['s2', 'descente', 10, 8], ['P', 'puits', 10, 0]], l: [['T', 'tr', '', '', ['s1', [5, 0], 'P'], 0, INFIL], ['L2', 'tr', '', '', ['s2', 'P']]]}));
  R.ok(kp.et === 's1=ok:DISP s2=ok:PUITS' && apresDe(kp, 's1') === 'PUITS'
    && memesA(kp.a, [['ep-puits:s1', true, 'Descente EP : rejet dans un puits'], ['ep-puits:s2', true, 'Descente EP : rejet dans un puits']]) && kp.c === 'non_conformes',
    'd8 s1 posée sur le 1er sommet du drain, s2 reliée au puits de son dernier sommet : s1=ok:DISP, au-delà du drain le puits, « Descente EP : rejet dans un puits » non conforme '
    + '(m129 ; jusqu\'à m128 : « multiple ») ; s2=ok:PUITS, de même ; « non_conformes » (obtenu ' + txtJuge(kp) + ')');
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
function fixe(an, L, sauf, saufP){
  sauf = sauf || {}; saufP = saufP || {};
  return [Object.keys(an.resObj).filter(id => an.objs[id] && !sauf[id]).sort().map(id => id + '=' + uneSource(an.resObj[id])).join(' '),
    an.controles.filter(c => an.objs[c.id] && !sauf[c.id]).map(c => c.cle + ':' + c.txt).sort().join(' ; '),
    L.filter(a => a.objId && an.objs[a.objId] && !sauf[a.objId] && !/^sansboite:/.test(a.cle)).map(a => a.cle + '@' + a.objId + ':' + a.st + ':' + a.obs).sort().join(','),
    an.pieces.map(p => p.id + (saufP[p.id] ? '~' : an.sensPiece[p.id] > 0 ? '>' : an.sensPiece[p.id] < 0 ? '<' : '=') + JSON.stringify(an.resPiece[p.id])).sort().join(' ; '),
    JSON.stringify(an.resPt)];
}
/* première partie qui diffère, et l'endroit */
function ecartDe(a, b){
  const i = a.findIndex((x, k) => x !== b[k]); if (i < 0) return '';
  let j = 0; while (j < a[i].length && a[i][j] === b[i][j]) j++;
  return PARTS[i] + ' : …' + a[i].slice(Math.max(0, j - 30), j + 50) + '… > …' + b[i].slice(Math.max(0, j - 30), j + 50) + '…';
}
const fixeDe = (d, mode) => { const an = V.analyser(copie(d), mode); return fixe(an, V.anomaliesDoc(copie(d), an)); };
/* m129 (Q6 b) : sources ponctuelles dont l'eau disperse au bout libre d'un drain de collecte (r.drains) et leurs fosses (ids, sauf) ; fixe()
   les laisse de côté, et le sens des pièces qu'elles atteignent (saufP : l'eau y va vers les bouts du drain, plus vers un réseau présumé). Chacune y prend « dispersion dans le sol », non présumée ; son témoin (tronçons ordinaires) n'avait aucun exutoire
   dessiné : réseau présumé, ou aucun (ko : celles qui n'y répondent pas) */
function dispersees(d, dd, mode){
  const a = V.analyser(copie(d), mode), b = V.analyser(copie(dd), mode), sauf = {};
  const ids = Object.keys(b.resObj).filter(id => b.objs[id] && b.resObj[id].drains).sort();
  ids.forEach(id => { sauf[id] = true; [a.resObj[id], b.resObj[id]].forEach(r => { if (r && r.fosse) sauf[r.fosse] = true; if (r && r.fosseDouteuse) sauf[r.fosseDouteuse] = true; }); });
  const saufP = {}, TY = V.TYPES, term = n => /^[CD]:/.test(n) || (!!b.objs[n] && (!!TY[b.objs[n].t].exu || (!!TY[b.objs[n].t].boite && /^(EU|EP|UN)$/.test(b.objs[n].p.res || ''))));
  ids.forEach(id => { const vus = {[id]: true}, file = [id];
    while (file.length){ const n = file.shift(); if (n !== id && term(n)) continue;
      (b.adj[n] || []).forEach(p => { saufP[p.id] = true; [p.a, p.b].forEach(x => { if (!vus[x]){ vus[x] = true; file.push(x); } }); }); } });
  const ko = ids.filter(id => { const ra = a.resObj[id], rd = b.resObj[id];
    return !(rd.etat === 'ok' && rd.res === 'DISP' && !rd.presume && ra && (ra.etat === 'sansexu' || (ra.etat === 'ok' && ra.presume))); })
    .map(id => id + ' : ' + (a.resObj[id] ? uneSource(a.resObj[id]) : '?') + ' > ' + uneSource(b.resObj[id]));
  /* m145 (D11) : un drain de collecte compté est une arrivée possible pour un puisard ou une infiltration au sol (garde-fou) ; le
     trop-plein qui passe par lui n'est pas suivi, alors que le témoin le suit. Laissées de côté aussi (tp) : les sources ponctuelles qui
     gardent l'ouvrage pour rejet, et le reste de leur résultat, et y lisent moins au-delà de lui, ou ne sont plus « multiple » par lui */
  const lu = r => r.etat === 'ok' ? [r.res].concat((r.apres || []).map(x => x.res)) : r.nets || [];
  const reste = r => [r.presume, r.fosse, r.boite, r.conflit, r.ambigu, r.sortiesLibres].map(x => JSON.stringify(x === undefined ? null : x)).join('|');
  const tp = Object.keys(b.resObj).filter(id => { const ra = a.resObj[id], rb = b.resObj[id];
    if (!b.objs[id] || sauf[id] || !ra || (ra.etat === rb.etat && lu(ra).join() === lu(rb).join() && ra.apresPar === rb.apresPar)) return false;
    return rb.etat === 'ok' && /^(INF|SOL)$/.test(rb.res) && (ra.etat === 'ok' ? ra.res === rb.res && ra.apresPar === 'tp' : ra.etat === 'multiple')
      && lu(rb).every(k => lu(ra).indexOf(k) >= 0) && reste(ra) === reste(rb); }).sort();
  tp.forEach(id => { sauf[id] = true; });
  return {ids, tp, ko, ecart: ecartDe(fixe(a, V.anomaliesDoc(copie(d), a), sauf, saufP), fixe(b, V.anomaliesDoc(copie(dd), b), sauf, saufP))};
}
/* g1 : chaque tronçon devient un drain de collecte (réseau gardé) ; depuis m123, il compte comme une source : seul tient ce qui ne change pas
   (fixe), et aucune exception (analyse, anomalies, conclusion, contrôles, constat déduit) */
function garde(){
  let n = 0, drains = 0, disp = 0, trop = 0; const ecarts = [];
  for (let g = 1; g <= 40; g++){
    const d = tirage(g), dd = copie(d);
    dd.el.forEach(e => { if (e.k === 'ln' && e.t === 'tr'){ e.p.drain = 'collecte'; drains++; } });
    ['edl', 'avp'].forEach(mode => { n++;
      const rb = resultat(dd, mode); if (/^exception/.test(rb)){ ecarts.push(g + ' ' + mode + ' : ' + rb); return; }
      const q = dispersees(d, dd, mode); disp += q.ids.length; trop += q.tp.length; if (q.ecart) ecarts.push(g + ' ' + mode + ' : ' + q.ecart); q.ko.forEach(x => ecarts.push(g + ' ' + mode + ' ' + x)); });
  }
  R.ok(!ecarts.length && n === 80, 'g1 garde : un drain de collecte ne change ni les sources ponctuelles, ni les contrôles et anomalies des objets, ni les pièces, ni les regards,'
    + ' sauf les sources ponctuelles dont l\'eau disperse au bout libre d\'un drain (m129, Q6 b : « dispersion dans le sol » au lieu d\'un réseau présumé ou d\'aucun) (' + n + ' analyses, ' + drains + ' drains, ' + disp + ' sources dispersées, ' + trop + ' dont le trop-plein passe par un drain (m145) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun'));
}

/* m123 : drain de collecte, source linéaire (Q3 b, Q4 b ; décisions D4, D6, D7). DC : ses propriétés (méthode « Eau ») */
const DC = {drain: 'collecte', meth: ['eau']};
const cdDe = (d, mode) => V.constatDeduit(copie(d), V.analyser(copie(d), mode || 'edl'));
/* lignes « Autres » du constat qui comptent ; la ligne « Drain » */
const autres = cd => cd.rows.filter(r => !r.std && r.nb).map(r => r.label + ' ×' + r.nb);
const ligneDrain = cd => cd.rows.find(r => r.id === 'autre:Drain');
const luLigne = r => r ? JSON.stringify({nb: r.nb, codes: r.codes, libs: r.libs, conforme: r.conforme, meth: r.meth}) : 'pas de ligne « Drain »';
async function drainCollecte(){
  /* d10 : drain de collecte seul, EP, bouts libres : sa sortie non dessinée est présumée au réseau EP, sans message ; il compte au constat */
  const d10 = unTrace(DROIT, 'EP', '', DC), k10 = juge(d10), c10 = cdDe(d10), r10 = ligneDrain(c10);
  R.ok(k10.et === 'T=ok:EP' && k10.an.resObj.T.presume === true && !k10.a.length && k10.c === 'conformes' && k10.ctl.indexOf('libre:T') < 0 && !k10.manque.length,
    'd10 drain de collecte seul (EP, bouts libres) : T=ok:EP présumé, aucune anomalie, « conformes », ni « extrémités libres », rien à compléter (obtenu ' + txtJuge(k10) + ')');
  R.ok(autres(c10).join() === 'Drain ×1' && !!r10 && r10.libs.join(' ; ') === 'Réseau EP départemental (présumé)' && r10.raccord === 'EP_D' && r10.conforme === 'oui' && r10.meth.join() === 'eau',
    'd10 constat : une ligne « Drain », « Réseau EP départemental (présumé) », EP_D, conforme « oui », méthode « Eau » (obtenu ' + (autres(c10).join(', ') || 'aucune ligne « Autres »')
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
  /* m129 (Q7 a) : la boîte est au-delà du drain d'infiltration, elle compte avec son jugement (jusqu'à m128 : « multiple ») */
  R.ok(k11d.et === 'T=ok:DISP' && ((k11d.an.resObj.T || {}).apres || []).map(x => x.res).join() === 'EP' && !k11d.a.length && k11d.c === 'conformes' && !!r11d
    && r11d.conforme === 'oui' && r11d.libs.join(' ; ') === DI + ' ; Réseau EP départemental',
    'd11 le drain d\'infiltration atteint aussi une boîte EP par un tuyau parti de son dernier sommet : T=ok:DISP, au-delà du drain EP (m129, Q7 a ; jusqu\'à m128 : « multiple »), '
    + '« conformes » ; au constat, « ' + DI + ' » et « Réseau EP départemental », conforme (obtenu ' + txtJuge(k11d) + ' ; ' + luLigne(r11d) + ')');

  /* d12 : un point « Drain » posé sur un sommet du drain de collecte compte, et lui seul : une ligne, pas de double compte */
  [['au 1er sommet', 0, ['s', [10, 0]]], ['au sommet du milieu', 5, [[0, 0], 's', [10, 0]]]].forEach(([ou, x, v]) => {
    const d = doc({o: [['s', 'drain', x, 0]], l: [['T', 'tr', 'EP', '', v, 0, {drain: 'collecte'}]]}), k = juge(d), cd = cdDe(d);
    R.ok(k.et === 's=ok:EP' && k.an.resObj.s.presume === true && !k.a.length && k.c === 'conformes' && !k.ctl.length && autres(cd).join() === 'Drain ×1',
      'd12 point « Drain » ' + ou + ' du drain de collecte : une seule ligne « Drain », s=ok:EP présumé, « conformes », aucune aide ni rien à compléter (obtenu '
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
   son résultat, et la ligne « Drain » en compte un par drain et par point « Drain » analysé (pas de double compte) ; aucun nœud
   'dr:' ne reste (résultats, sens, liens) */
function temoinCollecte(){
  let n = 0, drains = 0, comptes = 0, points = 0, poses = 0, disp = 0, trop = 0; const ecarts = [], lignesKo = [], restes = [];
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
      const q = dispersees(d, dd, mode); disp += q.ids.length; trop += q.tp.length; if (q.ecart) ecarts.push(g + ' ' + mode + ' : ' + q.ecart); q.ko.forEach(x => ecarts.push(g + ' ' + mode + ' ' + x));
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
    + 'ni les regards,' + ' sauf les sources ponctuelles dont l\'eau disperse au bout libre d\'un drain (m129, Q6 b : « dispersion dans le sol » au lieu d\'un réseau présumé ou d\'aucun) (' + n + ' analyses, ' + drains + ' drains, ' + disp + ' sources dispersées, ' + trop + ' dont le trop-plein passe par un drain (m145) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun') + (ecarts.length > 3 ? ' (' + ecarts.length + ' en tout)' : ''));
  R.ok(!lignesKo.length && comptes > 0 && points > 0, 'd13 chaque drain compté a son résultat et sa place dans la ligne « Drain » (' + comptes + ' drains comptés, '
    + poses + ' points « Drain » posés sur un drain, ' + points + ' analysés) ; écarts : ' + (lignesKo.slice(0, 3).join(' ; ') || 'aucun') + (lignesKo.length > 3 ? ' (' + lignesKo.length + ' en tout)' : ''));
  R.ok(!restes.length, 'd13 aucun nœud « dr: » ni pièce virtuelle ne reste dans l\'analyse ; restes : ' + (restes.slice(0, 5).join(', ') || 'aucun'));
}
/* g2 : un tronçon sur deux devient un drain d'infiltration, sans réseau ; témoin : les mêmes tronçons sans réseau, sans drain. Seules changent les
   sources qui atteignent un drain d'infiltration (D:<id>, rejet DISP) ; aucune exception, ni dans l'analyse, ni dans les anomalies, la
   conclusion, les contrôles ou le constat déduit. Une source qui atteint le drain atteint encore chaque exutoire dessiné du témoin (term :
   les bouts libres n'y sont pas) et devient « multiple » si elle en atteint un ; une conclusion devenue « conformes » ne perd aucune NC
   retenue du témoin, sauf celle d'une source au réseau seulement présumé (le drain prime sur un bout libre, comme tout exutoire dessiné) */
function gardeInfiltration(){
  let n = 0, drains = 0, sources = 0, atteintes = 0, changees = 0, avecExu = 0, auDela = 0; const ecarts = [], perdus = [], ncPerdues = [];
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
        /* m129 (Q7 a) : « multiple » si la source atteint un autre exutoire avant le drain ; sinon, elle disperse dans le sol et compte chaque
           exutoire du témoin au-delà du drain (apres) */
        const loin = ta.length > 0 && rd.etat === 'ok' && rd.res === 'DISP' && ta.every(t => (rd.apres || []).some(x => x.res === t.res)); if (loin) auDela++;
        if (manque.length || (ta.length && rd.etat !== 'multiple' && !loin))
          perdus.push(g + ' ' + mode + ' ' + id + ' : ' + uneSource(ra) + ' > ' + uneSource(rd) + (manque.length ? ', perd ' + manque.map(t => t.res + '@' + t.noeud).join(',') : ''));
      });
      const La = V.anomaliesDoc(copie(d), a), Lb = V.anomaliesDoc(copie(dd), b);
      if (V.conclusion(Lb, b) === 'conformes')
        La.filter(x => x.nc && x.st === 'retenue' && !(a.resObj[x.objId] && a.resObj[x.objId].presume)).forEach(x => ncPerdues.push(g + ' ' + mode + ' ' + x.cle + ' (' + V.conclusion(La, a) + ')'));
    });
  }
  R.ok(!ecarts.length && n === 80 && atteintes > 0 && changees > 0, 'g2 garde : un drain d\'infiltration ne change que les sources qui l\'atteignent (' + n + ' analyses, '
    + drains + ' drains, ' + sources + ' sources, dont ' + atteintes + ' l\'atteignent et ' + changees + ' changent) ; écarts : ' + (ecarts.slice(0, 3).join(' ; ') || 'aucun'));
  R.ok(!perdus.length && avecExu > 0 && auDela > 0, 'g2 garde : une source qui atteint un drain d\'infiltration atteint encore chaque exutoire dessiné du témoin et devient « multiple », ou, '
    + 's\'il est au-delà du drain, disperse dans le sol et le compte au-delà (m129, Q7 a) (' + avecExu + ' sources en atteignent un dans le témoin, dont ' + auDela
    + ' au-delà du drain) ; écarts : ' + (perdus.slice(0, 3).join(' ; ') || 'aucun') + (perdus.length > 3 ? ' (' + perdus.length + ' en tout)' : ''));
  R.ok(!ncPerdues.length, 'g2 garde : une conclusion devenue « conformes » ne perd aucune NC retenue du témoin, hors source au réseau seulement présumé ; perdues : '
    + (ncPerdues.slice(0, 3).join(' ; ') || 'aucune') + (ncPerdues.length > 3 ? ' (' + ncPerdues.length + ' en tout)' : ''));
}

/* d16 (m129, Q6 b, décision du 13 nov. 2026) : un drain de collecte dont la sortie n'est pas dessinée et qu'atteint un équipement disperse
   son eau dans le sol, comme un drain d'infiltration (m122) ; la coupure se fait à son bout libre, après tout Tronçon EP qui y mène. Le drain
   (ou le point « Drain » qu'il tient) suit le même tuyau : même rejet, étiquette « Dispersion dans le sol » à l'écran, au PDF et au DXF
   (avec l'analyse ; sans elle, rien ne change). Témoins : drain qu'aucun équipement n'atteint, drain à la sortie dessinée, drain indiqué
   « EU », descente qui atteint aussi le bout libre d'un Tronçon EP : rien ne change */
const DIS = 'Drain d\'infiltration (dispersion dans le sol)';
const ligneDeSrc = (cd, id) => cd.rows.find(r => r.objets.indexOf(id) >= 0);
const etiqDe = (d, id, an) => sur(() => V.texteEtiquette(d.el.find(e => e.id === id), an));
async function dispersionCollecte(){
  /* source s reliée par le tuyau L (réseau res) au raccord J posé au sommet du milieu du drain de collecte T (EP, bouts libres) */
  const vers = (src, res) => doc({o: [['s', src, 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', res, '', ['s', 'J']], ['T', 'tr', 'EP', '', [[-5, 0], 'J', [5, 0]], 0, DC]]});
  [['descente posée sur le 1er sommet du drain', doc({o: [['s', 'descente', 0, 0]], l: [['T', 'tr', 'EP', '', ['s', [10, 0]], 0, DC]]})],
    ['descente → Tronçon EP → raccord au sommet du milieu du drain', vers('descente', 'EP')]].forEach(([nom, d]) => {
    const k = juge(d), cd = cdDe(d), rs = ligneDeSrc(cd, 's'), rt = ligneDrain(cd), es = sur(() => V.etatSource(copie(d), k.an, k.L, 'edl', 's'));
    const et = [etiqDe(d, 'T', k.an), etiqDe(d, 'T')];
    R.ok(k.et === 's=ok:DISP T=ok:DISP' && k.an.resObj.s.presume === false && k.an.resObj.T.presume === false && !k.a.length && k.c === 'conformes' && !k.manque.length,
      'd16 ' + nom + ' : s=ok:DISP et T=ok:DISP, non présumés, aucune anomalie, « conformes », rien à compléter (obtenu ' + txtJuge(k)
      + (k.manque.length ? ' ; à compléter : ' + k.manque.join(' ; ') : '') + ')');
    R.ok(!!es && es.cls === 'ok' && es.txt === 'Rejet : dispersion dans le sol' && !!rs && rs.conforme === 'oui' && rs.libs.join(' ; ') === DIS && cd.epRecup.infil === true
      && !!rt && rt.nb === 1 && rt.conforme === 'oui' && rt.libs.join(' ; ') === DIS,
      'd16 ' + nom + ' : fiche « Rejet : dispersion dans le sol » ; au constat, la descente et « Drain » conformes, « ' + DIS + ' », case « Infiltration diffuse » (obtenu '
      + JSON.stringify(es) + ' ; descente ' + (rs ? JSON.stringify({libs: rs.libs, conforme: rs.conforme}) : 'sans ligne') + ' ; ' + luLigne(rt) + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ')');
    R.ok(et[0] === 'Dispersion dans le sol' && et[1] === '', 'd16 ' + nom + ' : étiquette du drain « Dispersion dans le sol » avec l\'analyse ; sans elle, aucune, comme avant (obtenu '
      + JSON.stringify(et) + ')');
  });
  /* WC : rejet au sol, non conforme ; le drain suit le même tuyau */
  const dw = vers('wc', 'EU'), kw = juge(dw), rw = cdDe(dw).rows.find(r => r.id === 'wc');
  R.ok(kw.et === 's=ok:DISP T=ok:DISP' && memesA(kw.a, [['eu-sol:s', true, 'WC : rejet au sol (infiltration)']]) && kw.c === 'non_conformes' && !!rw && rw.conforme === 'non'
    && etiqDe(dw, 'T', kw.an) === 'Dispersion dans le sol',
    'd16 WC → Tronçon EU → drain de collecte à bouts libres : s=ok:DISP, « WC : rejet au sol (infiltration) » non conforme ; le drain suit le même tuyau (T=ok:DISP, étiquette '
    + '« Dispersion dans le sol ») (obtenu ' + txtJuge(kw) + ' ; étiquette ' + JSON.stringify(etiqDe(dw, 'T', kw.an)) + ')');
  /* point « Drain » posé sur le 1er sommet : il suit le drain qui le tient ; une seule ligne « Drain » */
  const dp = doc({o: [['P', 'drain', 0, 0], ['s', 'descente', 5, 8], ['J', 'jonction', 5, 0]], l: [['L', 'tr', 'EP', '', ['s', 'J']], ['T', 'tr', 'EP', '', ['P', 'J', [10, 0]], 0, {drain: 'collecte'}]]});
  const kp = juge(dp), rp = ligneDrain(cdDe(dp));
  R.ok(kp.et === 'P=ok:DISP s=ok:DISP' && !kp.a.length && kp.c === 'conformes' && !!rp && rp.nb === 1 && rp.conforme === 'oui' && rp.libs.join(' ; ') === DIS
    && etiqDe(dp, 'T', kp.an) === 'Dispersion dans le sol',
    'd16 point « Drain » sur le 1er sommet du drain, descente au sommet du milieu : P=ok:DISP et s=ok:DISP, « conformes », une ligne « Drain » « ' + DIS + ' », étiquette du drain '
    + '« Dispersion dans le sol » (obtenu ' + txtJuge(kp) + ' ; ' + luLigne(rp) + ' ; étiquette ' + JSON.stringify(etiqDe(dp, 'T', kp.an)) + ')');
  /* écran, plan PDF et DXF, étiquette placée (lab nul) ; témoin : le drain seul n'en a pas */
  const dl = vers('descente', 'EP'), tl = unTrace(DROIT, 'EP', '', DC); dl.el.find(e => e.id === 'T').lab = null; tl.el[0].lab = null;
  const vu = d => dessiner(d, 40, [0, 4]).textes.some(t => t.t === 'Dispersion dans le sol'), dx = d => dxf(d).ents.some(q => q.type === 'TEXT' && q.c['1'] === 'Dispersion dans le sol');
  const pl = await pdf(dl, {mode: 'edl'}), pt = await pdf(tl, {mode: 'edl'}), aupdf = p => p.txt.some(t => t.indexOf('Dispersion dans le sol') >= 0);
  const r = [vu(dl), aupdf(pl), dx(dl), vu(tl), aupdf(pt), dx(tl)];
  R.ok(!pl.err.length && !pt.err.length && r.join() === 'true,true,true,false,false,false',
    'd16 étiquette « Dispersion dans le sol » du drain atteint par la descente, à l\'écran, au plan PDF et au DXF ; témoin : le drain seul n\'en a nulle part (obtenu ' + r.join(', ')
    + (pl.err.length || pt.err.length ? ' ; ' + pl.err.concat(pt.err).join(' | ') : '') + ')');
  /* témoins : rien ne change */
  const t1 = unTrace(DROIT, 'EP', '', DC), k1 = juge(t1);
  const t2 = doc({o: [['s', 'descente', 0, 0], ['B', 'boite', 10, 0, {res: 'EP'}]], l: [['T', 'tr', 'EP', '', ['s', [5, 0], 'B'], 0, DC]]}), k2 = juge(t2);
  R.ok(k1.et === 'T=ok:EP' && k1.an.resObj.T.presume === true && etiqDe(t1, 'T', k1.an) === '' && k2.et === 's=ok:EP T=ok:EP' && !k2.an.resObj.s.presume && !k2.an.resObj.T.presume
    && etiqDe(t2, 'T', k2.an) === '',
    'd16 témoins : un drain qu\'aucun équipement n\'atteint reste T=ok:EP présumé (Q3 b) ; un drain dont la sortie est dessinée (boîte EP) garde s=ok:EP et T=ok:EP ; ni l\'un ni '
    + 'l\'autre n\'a d\'étiquette (obtenu ' + txtJuge(k1) + ' ; ' + txtJuge(k2) + ')');
  const t3 = doc({o: [['s', 'descente', 0, 0]], l: [['T', 'tr', 'EU', '', ['s', [10, 0]], 0, DC]]}), k3 = juge(t3);
  R.ok(k3.et === 's=ok:EU T=ok:EU' && memesA(k3.a, [['ep-eu:s', true, 'Descente EP : rejet au réseau EU (présumé)'], ['ep-eu:T', true, 'Drain : rejet au réseau EU (présumé)']])
    && etiqDe(t3, 'T', k3.an) === '',
    'd16 témoin : un drain de collecte indiqué « EU » garde son réseau présumé (s et T=ok:EU, « rejet au réseau EU (présumé) », NC), sans étiquette (obtenu ' + txtJuge(k3) + ')');
  const t4 = doc({o: [['s', 'descente', 0, 8], ['R', 'regard', 0, 0]], l: [['L', 'tr', 'EP', '', ['s', 'R']], ['T', 'tr', 'EP', '', ['R', [10, 0]], 0, DC], ['Q', 'tr', 'EP', '', ['R', [-10, 0]]]]});
  const k4 = juge(t4);
  R.ok(k4.et === 's=ok:EP T=ok:EP' && k4.an.resObj.s.presume === true && k4.an.resObj.T.presume === true && etiqDe(t4, 'T', k4.an) === '',
    'd16 témoin : une descente qui atteint le bout libre du drain et celui d\'un Tronçon EP garde le réseau EP présumé, le drain aussi, sans étiquette (obtenu ' + txtJuge(k4) + ')');
  /* drain dont la sortie est dessinée (regard) vers un second drain à bouts libres : il suit le rejet (dispersion dans le sol), sans
     l'étiquette, que porte le seul drain dont le bout libre disperse */
  const t5 = doc({o: [['s', 'descente', 0, 0], ['R', 'regard', 10, 0]], l: [['D1', 'tr', 'EP', '', ['s', [5, 0], 'R'], 0, DC], ['D2', 'tr', 'EP', '', ['R', [15, 0], [20, 0]], 0, DC]]});
  const k5 = juge(t5), e5 = [etiqDe(t5, 'D1', k5.an), etiqDe(t5, 'D2', k5.an)];
  R.ok(k5.et === 's=ok:DISP D1=ok:DISP D2=ok:DISP' && !k5.a.length && k5.c === 'conformes' && e5[0] === '' && e5[1] === 'Dispersion dans le sol',
    'd16 descente → drain D1 → regard → drain D2 à bouts libres : s, D1 et D2 dispersent (ok:DISP), « conformes » ; étiquette sur D2 seul, dont le bout libre disperse (obtenu '
    + txtJuge(k5) + ' ; étiquettes ' + JSON.stringify(e5) + ')');
  /* point « Drain » que le drain ne tient pas, relié par un tuyau au raccord du milieu (choix [p]) : il suit le drain, comme celui qu'il
     tient. Seul, il garde le réseau EP présumé (Q3 b, témoin) ; avec une descente qui disperse au bout du drain, il disperse aussi */
  const t6 = des => doc({o: [['P', 'drain', 0, 8], ['J', 'jonction', 0, 0]].concat(des ? [['s', 'descente', 3, 0]] : []),
    l: [['L', 'tr', '', '', ['P', 'J']], ['T', 'tr', 'EP', '', [[-5, 0], 'J'].concat(des ? ['s'] : [], [[5, 0]]), 0, DC]]});
  const k6 = juge(t6(false)), k7 = juge(t6(true));
  R.ok(k6.et === 'P=ok:EP T=ok:EP' && k6.an.resObj.P.presume === true && k6.an.resObj.T.presume === true && !k6.a.length && etiqDe(t6(false), 'T', k6.an) === '',
    'd16 témoin : point « Drain » relié par un tuyau au milieu du drain, sans équipement : P et T gardent le réseau EP présumé, sans étiquette (obtenu ' + txtJuge(k6) + ')');
  R.ok(k7.et === 'P=ok:DISP s=ok:DISP T=ok:DISP' && !k7.a.length && k7.c === 'conformes' && etiqDe(t6(true), 'T', k7.an) === 'Dispersion dans le sol',
    'd16 point « Drain » relié par un tuyau au milieu du drain, descente posée sur le drain : P, s et T dispersent, « conformes », étiquette du drain (obtenu ' + txtJuge(k7) + ')');
  /* avant-projet : une source qui disperse au bout libre d'un drain de collecte n'a pas d'exutoire dessiné ; chaque bout libre qui porte un
     réseau est un bout où l'eau disperse (au réseau « Déduit », il prend celui du tronçon qui y mène), jamais une « sortie laissée libre à
     côté de l'exutoire dessiné ». Tuyau EU ou unitaire vers un drain « Déduit », puis les drains eux-mêmes (Tronçon unitaire entre deux
     drains « Déduit ») ; témoin : une vraie sortie EU laissée libre au regard, à côté d'une boîte EP dessinée, reste relevée */
  const slDe = an => an.controles.filter(x => /^sortielibre:/.test(x.cle)).map(x => x.cle), libreAuPdf = p => p.txt.some(t => /laissées? libres?|garde (une|des) sortie/.test(t));
  const luAvp = (an, p) => Object.keys(an.resObj).map(id => { const r = an.resObj[id]; return id + '=' + r.etat + ':' + (r.res || '') + (r.presume ? ' (présumé)' : '') + (r.sortiesLibres ? ' SL[' + r.sortiesLibres + ']' : ''); }).join(' ')
    + ' ; contrôles ' + (slDe(an).join(', ') || 'aucune sortie libre') + ' ; PDF : ' + (p.txt.filter(t => /laissée|travaux/i.test(t)).join(' | ') || 'rien') + (p.err.length ? ' ; ' + p.err.join(' | ') : '');
  for (const [src, res] of [['descente', 'EU'], ['descente', 'UN'], ['wc', 'EU']]){
    const d = doc({o: [['s', src, 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', res, '', ['s', 'J']], ['T', 'tr', '', '', [[-5, 0], 'J', [5, 0]], 0, DC]]});
    const an = V.analyser(copie(d), 'avp'), r = an.resObj.s, p = await pdf(d, {mode: 'avp'});
    const fin = src === 'wc' ? /^Reste après travaux : WC : rejet au sol \(infiltration\)$/ : /ne fait plus apparaître d'anomalie de raccordement/;
    R.ok(!!r && r.etat === 'ok' && r.res === 'DISP' && !r.presume && !r.sortiesLibres && !slDe(an).length && !p.err.length && !libreAuPdf(p) && p.txt.some(t => fin.test(t)),
      'd16 avant-projet, ' + (src === 'wc' ? 'WC' : 'descente') + ' → Tronçon ' + res + ' → drain de collecte « Déduit » à bouts libres : s=ok:DISP, non présumé, aucune sortie laissée libre '
      + '(contrôle, plan PDF), ' + (src === 'wc' ? '« Reste après travaux : WC : rejet au sol (infiltration) »' : '« Après travaux, le dessin ne fait plus apparaître d\'anomalie de raccordement »')
      + ' (obtenu ' + luAvp(an, p) + ')');
  }
  const t8 = doc({o: [['s', 'descente', 0, 8], ['J1', 'jonction', 0, 0], ['J2', 'jonction', 10, 0], ['J3', 'jonction', 10, 10]],
    l: [['L', 'tr', 'EP', '', ['s', 'J1']], ['D1', 'tr', '', '', [[-5, 0], 'J1', 'J2', [15, 0]], 0, DC], ['U', 'tr', 'UN', '', ['J2', 'J3']], ['D2', 'tr', '', '', [[5, 10], 'J3', [15, 10]], 0, DC]]});
  const a8 = V.analyser(copie(t8), 'avp'), p8 = await pdf(t8, {mode: 'avp'});
  R.ok(['s', 'D1', 'D2'].every(id => !!a8.resObj[id] && a8.resObj[id].etat === 'ok' && a8.resObj[id].res === 'DISP' && !a8.resObj[id].sortiesLibres) && !slDe(a8).length && !p8.err.length && !libreAuPdf(p8),
    'd16 avant-projet, descente → Tronçon EP → drain D1 « Déduit » → Tronçon unitaire → drain D2 « Déduit » : s, D1 et D2 dispersent, aucune sortie laissée libre (contrôle, plan PDF) (obtenu '
    + luAvp(a8, p8) + ')');
  const t9 = doc({o: [['s', 'descente', 0, 0], ['R', 'regard', 5, 0], ['B', 'boite', 10, 0, {res: 'EP'}]], l: [['A', 'tr', 'EP', '', ['s', 'R', 'B']], ['L', 'tr', 'EU', '', ['R', [5, -10]]]]});
  const a9 = V.analyser(copie(t9), 'avp'), p9 = await pdf(t9, {mode: 'avp'});
  R.ok(slDe(a9).join() === 'sortielibre:s' && !p9.err.length && libreAuPdf(p9),
    'd16 témoin, avant-projet : une sortie EU laissée libre au regard, à côté de la boîte EP dessinée, reste relevée (contrôle et plan PDF) (obtenu ' + luAvp(a9, p9) + ')');
}

/* d17 (m129, Q7 a) : drain d'infiltration qui atteint aussi un autre exutoire. La source disperse dans le sol (le drain compte pour un), et
   chaque exutoire que le drain atteint au-delà (tuyau parti d'un de ses sommets, ouvrage qu'il tient) compte avec son jugement, sa règle et
   sa case (résultat : apres) ; « multiple » seulement quand la source atteint un autre exutoire avant le drain (bifurcation), et le message
   ne cite que ceux-là. Le trop-plein d'un puisard ou d'une infiltration au sol est lu de même depuis m145 (D11 : « par le trop-plein ») */
async function auDelaDrain(){
  const J = (id, x, y) => [id, 'jonction', x, y || 0], apres = (k, id) => ((k.an.resObj[id] || {}).apres || []).map(x => x.res).join(',');
  /* source posée sur le 1er sommet du drain ; dernier : son dernier sommet ; o : objets ajoutés ; Q : tuyau parti du dernier sommet */
  const auBout = (src, dernier, o, Q) => doc({o: [['s', src, 0, 0]].concat(o), l: [['T', 'tr', '', '', ['s', [5, 0], dernier], 0, INFIL]].concat(Q ? [Q] : [])});
  const boite = (res, src) => auBout(src || 'descente', 'J2', [J('J2', 10), ['B', 'boite', 20, 0, {res}]], ['Q', 'tr', '', '', ['J2', 'B']]);
  [['trop-plein vers une boîte EP', boite('EP'), 'EP', [], 'conformes', 'oui', 'gout_av', 'Rejet : dispersion dans le sol et, au-delà du drain, réseau EP départemental'],
    ['trop-plein vers une boîte EU', boite('EU'), 'EU', [['ep-eu:s', true, 'Descente EP : rejet au réseau EU']], 'non_conformes', 'non', 'gout_av'],
    ['puits sur le dernier sommet du drain', auBout('descente', 'P', [['P', 'puits', 10, 0]]), 'PUITS', [['ep-puits:s', true, 'Descente EP : rejet dans un puits']], 'non_conformes', '', 'gout_av'],
    ['WC, trop-plein vers une boîte EP', boite('EP', 'wc'), 'EP', [['eu-sol:s', true, 'WC : rejet au sol (infiltration)'], ['eu-ep:s', true, 'WC : rejet au réseau EP']], 'non_conformes', 'non', 'wc']
  ].forEach(([nom, d, ap, anos, c, conf, row, fiche]) => {
    const k = juge(d), cd = cdDe(d), rl = cd.rows.find(r => r.id === row), es = sur(() => V.etatSource(copie(d), k.an, k.L, 'edl', 's'));
    R.ok(k.et === 's=ok:DISP' && apres(k, 's') === ap && memesA(k.a, anos) && k.c === c && !!rl && rl.conforme === conf && (row === "wc" ? !cd.epRecup.infil : cd.epRecup.infil === true)
      && (!fiche || rl.libs.join(" ; ") === DIS + " ; Réseau EP départemental")
      && !!es && /^Rejet : dispersion dans le sol et, au-delà du drain, /.test(es.txt) && (!fiche || (es.txt === fiche && es.cls === 'ok')),
      'd17 ' + nom + ' : s=ok:DISP, au-delà du drain ' + ap + ', ' + (anos.map(a => '« ' + a[2] + ' »').join(', ') || 'aucune anomalie') + ', « ' + c + ' » ; au constat, conforme « '
      + conf + ' », case « Infiltration diffuse » pour la descente' + (fiche ? ' (« ' + DIS + ' », « Réseau EP départemental »)' : '') + ' ; fiche « Rejet : dispersion dans le sol et, au-delà du drain, … » (obtenu ' + txtJuge(k) + ' ; au-delà ' + apres(k, 's')
      + ' ; constat ' + (rl ? JSON.stringify({libs: rl.libs, non: rl.non, conforme: rl.conforme}) : 'sans ligne') + ', ouvrages EP ' + JSON.stringify(cd.epRecup) + ' ; fiche ' + JSON.stringify(es) + ')');
  });
  /* page 2 du plan PDF : le rejet constaté nomme ce que le drain atteint au-delà */
  const p2 = await pdf(boite('EU'), {mode: 'edl'}), t2 = p2.txt.join(' ');
  R.ok(!p2.err.length && t2.indexOf('au-delà du') >= 0, 'd17 page 2 du plan PDF : le rejet constaté de la descente dit « au-delà du drain »' + (p2.err.length ? ' (' + p2.err.join(' | ') + ')' : ''));
  /* bifurcation avant le drain : la descente atteint aussi une boîte EP par un autre tuyau, « multiple » (DISP, EP) ; avec de plus un
     trop-plein vers une boîte EU au-delà du drain, le message ne cite que les exutoires atteints avant lui */
  const bif = trop => doc({o: [['s', 'descente', 0, 8], J('J0', 0, 4), J('J', 0, 0), ['B', 'boite', 10, 4, {res: 'EP'}]].concat(trop ? [J('J2', 10), ['B2', 'boite', 20, 0, {res: 'EU'}]] : []),
    l: [['L', 'tr', '', '', ['s', 'J0']], ['L1', 'tr', '', '', ['J0', 'J']], ['L2', 'tr', '', '', ['J0', 'B']], ['T', 'tr', '', '', ['J', [5, 0], trop ? 'J2' : [10, 0]], 0, INFIL]]
      .concat(trop ? [['Q', 'tr', '', '', ['J2', 'B2']]] : [])});
  [false, true].forEach(trop => {
    const k = juge(bif(trop)), m = k.an.controles.find(x => x.cle === 'multi:s');
    R.ok(multiple(k, 's', 'DISP,EP') && !k.a.length && k.c === 'incomplet' && !!m && !/EU/.test(m.txt) && !k.an.resObj.s.apres,
      'd17 bifurcation avant le drain (tuyau vers une boîte EP)' + (trop ? ', trop-plein vers une boîte EU au-delà du drain' : '') + ' : s=multiple (DISP, EP), « incomplet », message '
      + 'sans le réseau EU (obtenu ' + txtJuge(k) + (m ? ' ; « ' + m.txt + ' »' : '') + ')');
  });
  /* autre destination aux EP « à arbitrer » au-delà du drain : son anomalie à arbitrer et le contrôle, comme si la descente y allait */
  const dx = auBout('descente', 'J2', [J('J2', 10), ['X', 'exutoire', 20, 0, {nom: 'Mare Fictive', ab: 'MF', art: 'la', ep: 'arbitrer', cst: 'autre'}]], ['Q', 'tr', '', '', ['J2', 'X']]);
  const kx = juge(dx), ax = kx.L.find(a => a.cle === 'ep-exu:s');
  R.ok(kx.et === 's=ok:DISP' && /^X:/.test(apres(kx, 's')) && !!ax && ax.st === 'arbitrer' && kx.ctl.indexOf('exuarbitrer:s') >= 0 && kx.c === 'exu',
    'd17 autre destination aux EP « à arbitrer » au-delà du drain : s=ok:DISP, son anomalie à arbitrer, le contrôle « … à arbitrer », « exu » (obtenu ' + txtJuge(kx) + ')');
  /* exutoires posés l'un derrière l'autre sur le drain : le drain ne s'arrête pas au premier, chacun compte avec sa règle (un exutoire tenu
     n'est pas traversé, un lien le saute) */
  const tenus = (o, pts, Q) => doc({o: [['s', 'descente', 0, 0]].concat(o), l: [['T', 'tr', '', '', ['s'].concat(pts), 0, INFIL]].concat(Q ? [Q] : [])});
  const PUITS = ['ep-puits:s', true, 'Descente EP : rejet dans un puits'], EU = ['ep-eu:s', true, 'Descente EP : rejet au réseau EU'];
  [['boîte EP (sommet 1), puits (sommet 2)', tenus([['B', 'boite', 10, 0, {res: 'EP'}], ['P', 'puits', 20, 0]], ['B', 'P']), 'EP,PUITS', [PUITS]],
    ['puisard (sommet 1), puits (sommet 2)', tenus([['K', 'puisard', 10, 0], ['P', 'puits', 20, 0]], ['K', 'P']), 'INF,PUITS', [PUITS]],
    ['boîte EP (sommet 1), boîte EU (sommet 2)', tenus([['B', 'boite', 10, 0, {res: 'EP'}], ['B2', 'boite', 20, 0, {res: 'EU'}]], ['B', 'B2']), 'EP,EU', [EU]],
    ['boîte EP (sommet 1), raccord (sommet 2), trop-plein vers une boîte EU', tenus([['B', 'boite', 10, 0, {res: 'EP'}], J('J2', 20), ['B2', 'boite', 30, 0, {res: 'EU'}]], ['B', 'J2'],
      ['Q', 'tr', '', '', ['J2', 'B2']]), 'EP,EU', [EU]]
  ].forEach(([nom, d, ap, anos]) => {
    const k = juge(d), vus = apres(k, 's').split(',').sort().join(',');
    R.ok(k.et === 's=ok:DISP' && vus === ap && memesA(k.a, anos) && k.c === 'non_conformes',
      'd17 ' + nom + ' : le drain ne s\'arrête pas au premier exutoire ; s=ok:DISP, au-delà ' + ap + ', ' + anos.map(a => '« ' + a[2] + ' »').join(', ') + ', « non_conformes » (obtenu '
      + txtJuge(k) + ' ; au-delà ' + apres(k, 's') + ')');
  });
  /* deux autres destinations ou plus au-delà du drain : leurs anomalies auraient la même clé (ep-exu, une par source) et une seule
     compterait ; la source reste « multiple » (DISP et les deux), « incomplet », comme avant m129 (décision D5), jamais « reserves »,
     « conformes » ni une NC qui en oublie une. Par deux trop-pleins partis du dernier sommet, ou posées sur les sommets 1 et 2 */
  const DST = (nom, ep) => ({nom, ab: nom.slice(0, 2), art: 'la', ep, cst: 'autre'});
  const deux = (forme, e1, e2) => forme === 'trop'
    ? doc({o: [['s', 'descente', 0, 0], J('J2', 10), ['E1', 'exutoire', 20, 0, DST('Étang Fictif', e1)], ['E2', 'exutoire', 10, 10, DST('Mare Fictive', e2)]],
      l: [['T', 'tr', '', '', ['s', [5, 0], 'J2'], 0, INFIL], ['Q', 'tr', '', '', ['J2', 'E1']], ['Q2', 'tr', '', '', ['J2', 'E2']]]})
    : doc({o: [['s', 'descente', 0, 0], ['E1', 'exutoire', 10, 0, DST('Étang Fictif', e1)], ['E2', 'exutoire', 20, 0, DST('Mare Fictive', e2)]],
      l: [['T', 'tr', '', '', ['s', 'E1', 'E2'], 0, INFIL]]});
  ['trop', 'tenu'].forEach(forme => [['reserve', 'nc'], ['reserve', 'arbitrer'], ['arbitrer', 'reserve'], ['conforme', 'nc']].forEach(([e1, e2]) => {
    const k = juge(deux(forme, e1, e2)), r = k.an.resObj.s;
    R.ok(!!r && r.etat === 'multiple' && r.nets.length === 3 && r.nets.indexOf('DISP') >= 0 && r.nets.filter(x => /^X:/.test(x)).length === 2 && !r.apres
      && k.ctl.indexOf('multi:s') >= 0 && k.c === 'incomplet' && !k.L.some(a => /^ep-exu:/.test(a.cle)),
      'd17 deux autres destinations au-delà du drain (' + (forme === 'trop' ? 'deux trop-pleins' : 'posées sur les sommets 1 et 2') + ', ' + e1 + ' puis ' + e2 + ') : s=multiple '
      + '(DISP et les deux), sans r.apres, contrôle « relié à plusieurs réseaux », « incomplet », aucune anomalie de destination (obtenu ' + txtJuge(k)
      + (r ? ' ; réseaux ' + (r.nets || []).join(', ') + ' ; au-delà ' + apres(k, 's') : '') + ')');
  }));
  /* m145 (D11) : le trop-plein d'un puisard ou d'une infiltration au sol est lu (jusqu'à m144, témoins : non lu, « conformes ») */
  [['puisard', 'INF'], ['infiltration', 'SOL']].forEach(([t, code]) => {
    const k = juge(doc({o: [['s', 'descente', 0, 8], ['P', t, 0, 0], ['B', 'boite', 10, 0, {res: 'EU'}]], l: [['L', 'tr', '', '', ['s', 'P']], ['Q', 'tr', '', '', ['P', 'B']]]}));
    R.ok(k.et === 's=ok:' + code && apres(k, 's') === 'EU' && k.an.resObj.s.apresPar === 'tp' && memesA(k.a, [['ep-eu:s', true, 'Descente EP : rejet au réseau EU']]) && k.c === 'non_conformes',
      'd17 trop-plein ' + (t === 'puisard' ? 'd\'un puisard' : 'd\'une infiltration au sol') + ' vers une boîte EU, lu (m145) : s=ok:' + code + ', au-delà EU par le trop-plein, '
      + '« Descente EP : rejet au réseau EU » NC, « non_conformes » (obtenu ' + txtJuge(k) + ' ; au-delà ' + apres(k, 's') + ' par ' + k.an.resObj.s.apresPar + ')');
  });
}

/* d18 (m142, décision D8 de la conception v1.7.2 ; réponse drain-infiltration-dessin du 16 nov. 2026 : « Tenir compte du réseau, si
   uniquement des EU alors drain en rouge, si au moins un EP alors vert ») : couleur du drain d'infiltration d'après les eaux qu'il reçoit
   (an.eauxDrains : pour chaque drain atteint, le nombre de sources EU et EP) */
const EU = V.RES.EU.rgb.join(','), TXT_EU = V.TXT_RES.EU;
const eaux = an => an.eauxDrains === undefined ? 'absent' : JSON.stringify(an.eauxDrains);
const rlDe = (d, id, an) => sur(() => V.resLigne(d.el.find(e => e.id === id), an));
/* WC s à 8 m du raccord J, premier sommet du drain T de 10 m (vers [10, 0]) : rien d'autre près du drain, pour son peigne */
const wcAuBout = () => doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
async function eauxDrain(){
  /* WC seul : EU seules, rouge (v1.7.1 : vert) ; sans analyse, vert */
  const dw = versDrain('wc'), aw = V.analyser(copie(dw), 'edl'), rw = [rlDe(dw, 'T', aw), rlDe(dw, 'T', null)];
  R.ok(eaux(aw) === '{"T":{"EU":1,"EP":0}}' && rw.join() === 'EU,EP',
    'd18 WC → tronçon → drain d\'infiltration : an.eauxDrains {T: {EU: 1, EP: 0}}, resLigne EU, rouge (v1.7.1 : EP) ; sans analyse, EP (obtenu ' + eaux(aw) + ' ; ' + rw.join(', ') + ')');
  /* WC et descente sur le même drain : vert dès un EP ; le constat ne change pas (S5 a : chaque source garde son libellé) */
  const d2 = doc({o: [['s', 'wc', 0, 8], ['d', 'descente', 3, 8], ['J', 'jonction', 0, 0], ['K', 'jonction', 3, 0]],
    l: [['L', 'tr', '', '', ['s', 'J']], ['M', 'tr', '', '', ['d', 'K']], ['T', 'tr', '', '', [[-5, 0], 'J', 'K', [5, 0]], 0, INFIL]]});
  const a2 = V.analyser(copie(d2), 'edl'), c2 = V.constatDeduit(copie(d2), V.analyser(copie(d2), 'edl')), lw = c2.rows.find(r => r.id === 'wc'), ld = c2.rows.find(r => r.id === 'gout_av');
  const lu = r => r ? JSON.stringify({codes: r.codes, oks: r.oks, libs: r.libs, conforme: r.conforme}) : 'ligne absente';
  R.ok(eaux(a2) === '{"T":{"EU":1,"EP":1}}' && rlDe(d2, 'T', a2) === 'EP',
    'd18 WC et descente sur le même drain : {T: {EU: 1, EP: 1}}, resLigne EP, vert (obtenu ' + eaux(a2) + ' ; ' + rlDe(d2, 'T', a2) + ')');
  R.ok(!!lw && JSON.stringify(lw.codes) === '["MILIEU"]' && JSON.stringify(lw.oks) === '[false]' && lw.libs.join(' ; ') === 'Drain d\'infiltration : rejet au sol (milieu naturel)'
    && lw.conforme === 'non' && !!ld && JSON.stringify(ld.codes) === '[""]' && JSON.stringify(ld.oks) === '[true]' && ld.libs.join(' ; ') === DIS && ld.conforme === 'oui'
    && JSON.stringify(c2.epRecup) === '{"infil":true}',
    'd18 libellés inchangés (S5 a), sur ce drain vert : WC « Drain d\'infiltration : rejet au sol (milieu naturel) », MILIEU, non conforme ; descente « ' + DIS + ' », sans code, '
    + 'conforme, case « Infiltration diffuse » (obtenu WC ' + lu(lw) + ' ; descente ' + lu(ld) + ' ; ouvrages EP ' + JSON.stringify(c2.epRecup) + ')');
  /* descente seule ; drain seul (rien n'est écrit dans l'analyse, état des lieux ou avant-projet) ; projet */
  const dd = versDrain('descente'), ad = V.analyser(copie(dd), 'edl'), ds = unTrace(DROIT, '', '', INFIL), as = V.analyser(copie(ds), 'edl'), asp = V.analyser(copie(ds), 'avp');
  const r3 = [rlDe(dd, 'T', ad), rlDe(ds, 'T', as), rlDe(ds, 'T', asp)];
  R.ok(eaux(ad) === '{"T":{"EU":0,"EP":1}}' && eaux(as) === 'absent' && eaux(asp) === 'absent' && eaux(asp.ref) === 'absent' && r3.join() === 'EP,EP,EP',
    'd18 descente seule : {T: {EU: 0, EP: 1}}, EP ; drain qu\'aucune source n\'atteint : an.eauxDrains absent (état des lieux et avant-projet), EP (obtenu '
    + [eaux(ad), eaux(as), eaux(asp), eaux(asp.ref)].join(' ; ') + ' ; ' + r3.join(', ') + ')');
  const dp = doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', '', 'projet', ['s', 'J']], ['T', 'tr', '', 'projet', [[-5, 0], 'J', [5, 0]], 0, INFIL]]});
  const ap = V.analyser(copie(dp), 'avp');
  R.ok(eaux(ap) === '{"T":{"EU":1,"EP":0}}' && rlDe(dp, 'T', ap) === 'PRJ',
    'd18 drain « projet » que le WC atteint au plan d\'avant-projet : {T: {EU: 1, EP: 0}}, mais resLigne PRJ, comme tout projet (obtenu ' + eaux(ap) + ' ; ' + rlDe(dp, 'T', ap) + ')');
  /* drain de collecte compté : une source EP [p] ; témoin : sans lui, le WC seul fait un drain rouge */
  const coll = (avecC, avecW) => doc({o: [['K', 'regard', 0, 8], ['J', 'jonction', 0, 0]].concat(avecW ? [['w', 'wc', 3, 8], ['J2', 'jonction', 3, 0]] : []),
    l: (avecC ? [['C', 'tr', 'EP', '', [[-6, 8], 'K'], 0, DC]] : []).concat([['L', 'tr', '', '', ['K', 'J']]], avecW ? [['M', 'tr', '', '', ['w', 'J2']]] : [],
      [['I', 'tr', '', '', avecW ? [[-5, 0], 'J', 'J2', [5, 0]] : [[-5, 0], 'J', [5, 0]], 0, INFIL]])});
  const k1 = coll(true, false), b1 = V.analyser(copie(k1), 'edl'), k2 = coll(true, true), b2 = V.analyser(copie(k2), 'edl'), k3 = coll(false, true), b3 = V.analyser(copie(k3), 'edl');
  const r4 = [rlDe(k1, 'I', b1), rlDe(k2, 'I', b2), rlDe(k3, 'I', b3)];
  R.ok(eaux(b1) === '{"I":{"EU":0,"EP":1}}' && eaux(b2) === '{"I":{"EU":1,"EP":1}}' && eaux(b3) === '{"I":{"EU":1,"EP":0}}' && r4.join() === 'EP,EP,EU',
    'd18 drain de collecte compté relié au drain d\'infiltration : une source EP ({I: {EU: 0, EP: 1}}, EP) ; avec un WC aussi, {EU: 1, EP: 1}, EP ; témoin, le WC sans le drain '
    + 'de collecte : EU (obtenu ' + [eaux(b1), eaux(b2), eaux(b3)].join(' ; ') + ' ; ' + r4.join(', ') + ')');
  /* avant-projet [p] : un drain gardé sans source y est vert ; un drain « à supprimer », absent de cette analyse, prend la couleur de l'état
     des lieux (an.ref), comme un tuyau */
  const vp = (stL, stT) => doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', '', stL, ['s', 'J']], ['T', 'tr', '', stT, [[-5, 0], 'J', [5, 0]], 0, INFIL]]});
  const v1 = vp('supprimer', ''), e1 = V.analyser(copie(v1), 'avp'), v2 = vp('', 'supprimer'), e2 = V.analyser(copie(v2), 'avp'), v3 = vp('projet', ''), e3 = V.analyser(copie(v3), 'avp');
  const r5 = [rlDe(v1, 'T', e1), rlDe(v2, 'T', e2), rlDe(v3, 'T', V.analyser(copie(v3), 'edl')), rlDe(v3, 'T', e3)];
  R.ok(eaux(e1) === 'absent' && eaux(e1.ref) === '{"T":{"EU":1,"EP":0}}' && eaux(e2) === 'absent' && eaux(e3) === '{"T":{"EU":1,"EP":0}}' && r5.join() === 'EP,EU,EP,EU',
    'd18 plan d\'avant-projet : tuyau du WC « à supprimer », le drain gardé n\'a plus de source et devient vert [p] ; drain « à supprimer » : rouge de l\'état '
    + 'des lieux, comme un tuyau ; tuyau du WC « projet » : vert à l\'état des lieux, rouge à l\'avant-projet (obtenu ' + [eaux(e1), eaux(e1.ref), eaux(e2), eaux(e3)].join(' ; ') + ' ; ' + r5.join(', ') + ')');
  /* rendus d'un drain rouge : écran (trait, dents, couleur de l'étiquette), plan PDF, DXF, légende ; le texte de l'étiquette ne change pas */
  const dr = wcAuBout(), ar = V.analyser(copie(dr), 'edl');
  const k = peigne(ecran(dr, 40, [5, 4]), pts(DROIT), false, 1e-6, .4);
  R.ok(eaux(ar) === '{"T":{"EU":1,"EP":0}}' && regulier(k.dents, 10, 1, .4, true, css(EU), 1e-6) && k.trait.length > 0 && k.trait.every(t => t.coul === css(EU)) && !k.autres.length,
    'd18 écran, drain relié au seul WC : trait et 10 dents des deux côtés en rouge ' + css(EU) + ' (obtenu ' + eaux(ar) + ' ; trait ' + k.trait.map(t => t.coul).filter((x, i, a) => a.indexOf(x) === i).join(', ')
    + ' ; ' + txtDents(k.dents) + ' ; ' + k.autres.length + ' autre(s))');
  const de = wcAuBout(); de.el.find(e => e.id === 'T').lab = null;
  const te = dessiner(de, 40, [5, 4]).textes.filter(t => t.t === 'Dispersion dans le sol');
  R.ok(te.length === 1 && te[0].coul === TXT_EU && etiqDe(de, 'T', V.analyser(copie(de), 'edl')) === 'Dispersion dans le sol',
    'd18 écran : étiquette « Dispersion dans le sol » (texte inchangé), écrite en rouge ' + TXT_EU + ' (obtenu ' + JSON.stringify(te.map(t => t.coul)) + ')');
  const pp = Object.assign(wcAuBout(), {echelle: 200}); pp.el.find(e => e.id === 'T').lab = null;
  /* l'étiquette est écrite deux fois : d'abord son halo blanc (en contour), puis le texte, de sa couleur : on lit la dernière */
  const {r: rp, pk} = await surPapier(pp, 'edl'), labs = rp.pos.filter(q => q.t === 'Dispersion dans le sol'), lab = labs[labs.length - 1], rgbEU = TXT_EU.slice(1).match(/../g).map(h => parseInt(h, 16)).join(',');
  R.ok(!rp.err.length && !!pk && pk.coul === EU && regulier(pk.dents, 10, 5, 2, true, EU, 1e-6) && !pk.autres.length && !!lab && lab.coul === rgbEU,
    'd18 plan PDF au 1/200 : trait et 10 dents de 2 mm tous les 5 mm, des deux côtés, en ' + EU + ' ; étiquette « Dispersion dans le sol » en ' + rgbEU + ' (obtenu '
    + (pk ? pk.coul + ', ' + txtDents(pk.dents) : 'pas de trait') + ' ; étiquette ' + (lab ? lab.coul : 'absente') + ')' + (rp.err.length ? ' ' + rp.err.join(' | ') : ''));
  const x = dxf(de), P = x.ents.filter(q => q.type === 'POLYLINE' && q.cal === 'VEDE-DRAINS'), Ld = x.ents.filter(q => q.type === 'LINE' && q.cal === 'VEDE-DRAINS');
  const X = x.ents.filter(q => q.type === 'TEXT' && q.c['1'] === 'Dispersion dans le sol');
  R.ok(x.calques['VEDE-DRAINS'] === 3 && P.length === 1 && P[0].c['62'] === '1' && !P[0].c['6'] && Ld.length === 10 && Ld.every(q => q.c['62'] === '1')
    && X.length === 1 && X[0].cal === 'VEDE-ETIQUETTES' && X[0].c['62'] === '1',
    'd18 DXF : polyligne du drain sur VEDE-DRAINS (calque toujours en 3) en couleur 1, en trait plein, ses 10 dents en couleur 1 ; étiquette « Dispersion dans le sol » sur '
    + 'VEDE-ETIQUETTES en couleur 1 (obtenu ' + P.map(q => 'polyligne ' + q.c['62']).join(', ') + ' ; dents ' + Ld.map(q => q.c['62']).filter((v, i, a) => a.indexOf(v) === i).join(', ')
    + ' (' + Ld.length + ') ; ' + (X.map(q => q.cal + '/' + q.c['62']).join(', ') || 'pas d\'étiquette') + ')');
  const lg = await pdf(wcAuBout(), {mode: 'edl'}), f2 = lg.txt.indexOf('Anomalies et préconisations'), p1 = f2 > 0 ? lg.txt.slice(0, f2 - 1) : lg.txt, CEU = 'Canalisation EU (eaux usées)';
  /* le tuyau du WC, sans réseau indiqué : depuis m165 (réponse du 23 nov. 2026 : « Le passer en rouge »), il prend la couleur des eaux
     qu'il porte, comme le drain, et devient rouge ; rien d'autre n'étant vert, la légende n'a plus de ligne « Canalisation EP » (jusqu'à
     m164, témoin : il restait vert, de la couleur de la dispersion dans le sol, et la légende avait cette ligne) */
  const CEP = 'Canalisation EP (eaux pluviales)', rL = rlDe(dr, 'L', ar);
  R.ok(!lg.err.length && p1.indexOf(CEU) >= 0 && p1.indexOf(CEP) < 0 && rL === 'EU' && p1.filter(t => t === 'Drain d\'infiltration').length === 1,
    'd18 légende du plan PDF : « ' + CEU + ' » pour le drain rouge et le tuyau du WC, rouge lui aussi depuis m165 (resLigne EU ; jusqu\'à m164, EP) ; plus de « ' + CEP
    + ' », rien d\'autre n\'étant vert ; « Drain d\'infiltration » une fois, inchangée (obtenu '
    + [p1.indexOf(CEU) >= 0, rL, p1.indexOf(CEP) >= 0, p1.filter(t => t === 'Drain d\'infiltration').length].join(', ') + ')' + (lg.err.length ? ' ' + lg.err.join(' | ') : ''));
  /* témoin regard-suit-exutoire (réponse du 16 nov. 2026) : un regard au tampon béton tenu par un drain rouge reste jugé en EP, en réserve */
  const dg = doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 0, {tampon: 'beton'}]], l: [['L', 'tr', '', '', ['s', 'R']], ['T', 'tr', '', '', ['R', [10, 0]], 0, INFIL]]}), kg = juge(dg);
  R.ok(eaux(kg.an) === '{"T":{"EU":1,"EP":0}}' && rlDe(dg, 'T', kg.an) === 'EU' && kg.an.resPt.R === 'EP'
    && memesA(kg.a, [['tampon:R', false, 'Regard EP : tampon béton'], ['eu-sol:s', true, 'WC : rejet au sol (infiltration)']]),
    'd18 témoin : regard au tampon béton sur le 1er sommet d\'un drain rouge (WC seul) : le regard reste EP, « Regard EP : tampon béton » en réserve ; le WC « rejet au sol », '
    + 'non conforme (obtenu ' + eaux(kg.an) + ' ; drain ' + rlDe(dg, 'T', kg.an) + ', regard ' + kg.an.resPt.R + ' ; ' + txtJuge(kg) + ')');
  /* témoin : une anomalie déjà saisie à la main sur le drain garde son réseau (rien n'est réécrit) */
  const dm = Object.assign(wcAuBout(), {anomManu: [{id: 'M1', objId: 'T', reseau: 'EP', obs: 'Tronçon : présumé cassé ou déboîté', preco: '', nc: true, st: 'retenue'}]});
  const am = V.analyser(copie(dm), 'edl'), m1 = V.anomaliesDoc(copie(dm), am).find(a => a.cle === 'M1');
  R.ok(rlDe(dm, 'T', am) === 'EU' && !!m1 && m1.reseau === 'EP' && dm.anomManu[0].reseau === 'EP',
    'd18 témoin : une anomalie déjà saisie à la main (réseau EP) sur un drain devenu rouge garde son réseau (obtenu drain ' + rlDe(dm, 'T', am) + ', anomalie '
    + (m1 ? m1.reseau : 'absente') + ')');
}

/* d19 (m165, réponse du 23 nov. 2026 : « Le passer en rouge ») : un tuyau sans réseau indiqué qui ne mène qu'à des drains d'infiltration
   prend la couleur des eaux qu'il porte, comme le drain (an.eauxPieces : pour chaque pièce de cette règle, le nombre de sources EU et EP
   dont l'eau y passe pour aller au drain) ; resPiece, resObj, les anomalies, le constat et le regard ne changent pas */
const trie = o => JSON.stringify(Object.keys(o).sort().reduce((x, k) => Object.assign(x, {[k]: o[k]}), {}));
const ePcs = an => an.eauxPieces === undefined ? 'absent' : trie(an.eauxPieces);
const rls = (d, an, ids) => ids.map(id => id + ':' + rlDe(d, id, an)).join(' ');
/* couleurs, sans doublon, des traits de l'écran posés sur le segment [a, b] du croquis (les deux bouts sur lui) */
const coulSur = (tr, a, b) => peigne(tr, pts([a, b]), false, 1e-6, .4).trait.map(t => t.coul).filter((c, i, x) => x.indexOf(c) === i).join(', ') || 'aucun trait';
/* réseau de chaque pièce (resPiece : déduit ou indiqué, réseaux atteints) ; état et rejet de chaque source (resObj) */
const sigP = an => an.pieces.map(p => { const r = an.resPiece[p.id]; return p.id + '=' + r.res + (r.deduit ? '/déduit/' : '/indiqué/') + r.nets.join('+') + (r.contredit ? '/contredit' : ''); }).join(' ');
const sigO = an => Object.keys(an.resObj).map(id => id + '=' + an.resObj[id].etat + (an.resObj[id].res ? ':' + an.resObj[id].res : '')).join(' ');
/* WC s → tuyau L (Ø100, sans réseau, étiquette affichée) → 1er sommet J du drain d'infiltration T de 10 m */
const wcD = () => { const d = wcAuBout(), L = d.el.find(e => e.id === 'L'); L.p.diam = '100'; L.lab = null; return d; };
/* WC s → ouvrage O de type t (fosse, boîte sans réseau, puisard) → raccord J, 1er sommet du drain T ; sens du second tuyau */
const viaO = (t, sens) => doc({o: [['s', 'wc', 0, 12], ['O', t, 0, 6], ['J', 'jonction', 0, 0]],
  l: [['L1', 'tr', '', '', ['s', 'O']], ['L2', 'tr', '', '', ['O', 'J'], sens || 0], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
async function tuyauVersDrain(){
  /* cas principal : la pièce et le tuyau sont EU (rouges), resPiece garde EP déduit (la dispersion dans le sol) */
  const d = wcD(), an = V.analyser(copie(d), 'edl'), pL = an.pieces.find(p => p.id === 'L:0'), rm = sur(() => V.resMorceau(pL, an)), rp = JSON.stringify(an.resPiece['L:0']);
  R.ok(ePcs(an) === '{"L:0":{"EU":1,"EP":0}}' && rm === 'EU' && rls(d, an, ['L', 'T']) === 'L:EU T:EU' && rp === '{"res":"EP","deduit":true,"nets":["EP"],"contredit":false}',
    'd19 WC → tuyau Ø100 sans réseau → drain d\'infiltration : an.eauxPieces {L:0: {EU: 1, EP: 0}}, pièce et tuyau EU (resMorceau, resLigne), rouges comme le drain '
    + '(v1.7.2 : EP) ; resPiece inchangé, EP déduit (obtenu ' + ePcs(an) + ' ; resMorceau ' + rm + ' ; ' + rls(d, an, ['L', 'T']) + ' ; resPiece ' + rp + ')');
  const vu = dessiner(d, 40, [5, 4]), te = vu.textes.filter(t => /Ø100/.test(t.t)), ce = coulSur(vu.traits, [0, 8], [0, 0]);
  R.ok(etiqDe(d, 'L', an) === 'EU Ø100' && te.length === 1 && te[0].t === 'EU Ø100' && te[0].coul === TXT_EU && ce === css(EU),
    'd19 écran : trait du tuyau en rouge ' + css(EU) + ', sans vert ; étiquette « EU Ø100 » écrite en ' + TXT_EU + ' (v1.7.2 : « EP Ø100 », en vert ; obtenu trait ' + ce
    + ' ; étiquette ' + JSON.stringify(te.map(t => [t.t, t.coul])) + ')');
  /* plan PDF au 1/200 : le tuyau de 8 m y fait 40 mm ; l'étiquette est écrite deux fois (halo, puis texte) : on lit la dernière */
  const rq = await pdf(Object.assign(wcD(), {echelle: 200}), {mode: 'edl'}), lq = q => Math.hypot(q.pts[1].x - q.pts[0].x, q.pts[1].y - q.pts[0].y);
  const f40 = rq.formes.filter(q => q.pts.length === 2 && Math.abs(lq(q) - 40) < 1e-6), eq = rq.pos.filter(q => /Ø100/.test(q.t)), le = eq[eq.length - 1];
  const rgbT = TXT_EU.slice(1).match(/../g).map(h => parseInt(h, 16)).join(',');
  R.ok(!rq.err.length && f40.length === 1 && f40[0].coul === EU && !!le && le.t === 'EU Ø100' && le.coul === rgbT,
    'd19 plan PDF au 1/200 : trait du tuyau (40 mm) en ' + EU + ' ; étiquette « EU Ø100 » en ' + rgbT + ' (obtenu ' + JSON.stringify(f40.map(q => q.coul)) + ' ; étiquette '
    + (le ? le.t + ' en ' + le.coul : 'absente') + ')' + (rq.err.length ? ' ' + rq.err.join(' | ') : ''));
  const x = dxf(d), PL = x.ents.filter(q => q.type === 'POLYLINE' && q.cal !== 'VEDE-DRAINS'), X = x.ents.filter(q => q.type === 'TEXT' && /%%c100$/.test(q.c['1']));
  R.ok(x.calques['VEDE-EU'] === 1 && PL.length === 1 && PL[0].cal === 'VEDE-EU' && !PL[0].c['62'] && X.length === 1 && X[0].c['1'] === 'EU %%c100'
    && X[0].cal === 'VEDE-ETIQUETTES' && X[0].c['62'] === '1',
    'd19 DXF : polyligne du tuyau sur VEDE-EU (calque en couleur 1), de la couleur du calque ; étiquette « EU %%c100 » (Ø100) sur VEDE-ETIQUETTES en couleur 1 '
    + '(v1.7.2 : VEDE-EP, couleur 3 ; obtenu ' + PL.map(q => q.cal + '/' + (q.c['62'] || 'du calque')).join(', ') + ' ; '
    + (X.map(q => q.c['1'] + ' ' + q.cal + '/' + q.c['62']).join(', ') || 'pas d\'étiquette') + ')');
  /* légende : une descente posée sur le dernier sommet rend le drain vert ; le tuyau du WC, rouge, donne la ligne EU */
  const dq = doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0], ['q', 'descente', 10, 0]], l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', 'q'], 0, INFIL]]});
  const aq = V.analyser(copie(dq), 'edl'), lg = await pdf(dq, {mode: 'edl'}), f2 = lg.txt.indexOf('Anomalies et préconisations'), pg = f2 > 0 ? lg.txt.slice(0, f2 - 1) : lg.txt;
  const CEU = 'Canalisation EU (eaux usées)', CEP = 'Canalisation EP (eaux pluviales)';
  R.ok(!lg.err.length && ePcs(aq) === '{"L:0":{"EU":1,"EP":0}}' && rls(dq, aq, ['L', 'T']) === 'L:EU T:EP' && pg.indexOf(CEU) >= 0 && pg.indexOf(CEP) >= 0,
    'd19 légende du plan PDF, drain vert (une descente sur son dernier sommet) et tuyau du WC rouge : « ' + CEU + ' » pour le tuyau, « ' + CEP + ' » pour le drain '
    + '(v1.7.2 : tuyau vert, pas de ligne EU ; obtenu ' + ePcs(aq) + ' ; ' + rls(dq, aq, ['L', 'T']) + ' ; ' + [pg.indexOf(CEU) >= 0, pg.indexOf(CEP) >= 0].join(', ') + ')'
    + (lg.err.length ? ' ' + lg.err.join(' | ') : ''));
  /* (a) WC et descente réunis par un raccord avant le drain (drain vert) */
  const da = doc({o: [['s', 'wc', 0, 8], ['d', 'descente', 6, 8], ['J1', 'jonction', 3, 4], ['J2', 'jonction', 3, 0]],
    l: [['L1', 'tr', '', '', ['s', 'J1']], ['L2', 'tr', '', '', ['d', 'J1']], ['L3', 'tr', '', '', ['J1', 'J2']], ['T', 'tr', '', '', ['J2', [13, 0]], 0, INFIL]]});
  const aa = V.analyser(copie(da), 'edl'), va = ecran(da, 40, [5, 4]), ca = [coulSur(va, [0, 8], [3, 4]), coulSur(va, [6, 8], [3, 4]), coulSur(va, [3, 4], [3, 0])];
  R.ok(ePcs(aa) === '{"L1:0":{"EU":1,"EP":0},"L2:0":{"EU":0,"EP":1},"L3:0":{"EU":1,"EP":1}}' && rls(da, aa, ['L1', 'L2', 'L3', 'T']) === 'L1:EU L2:EP L3:EP T:EP'
    && ca.join(' | ') === [css(EU), css(EP), css(EP)].join(' | '),
    'd19 (a) WC et descente réunis avant le drain : tuyau du WC rouge (EU), celui de la descente et le tuyau commun verts (EP), drain vert (obtenu ' + ePcs(aa) + ' ; '
    + rls(da, aa, ['L1', 'L2', 'L3', 'T']) + ' ; écran ' + ca.join(' | ') + ')');
  /* (b) WC → fosse septique → tuyau → drain ; (c) WC → boîte de branchement sans réseau → tuyau → drain : les deux tuyaux rouges */
  [['b', 'fosse', 'fosse septique'], ['c', 'boite', 'boîte de branchement sans réseau']].forEach(([n, t, nom]) => {
    const db = viaO(t), ab = V.analyser(copie(db), 'edl'), vb = ecran(db, 40, [3, 6]), cb = [coulSur(vb, [0, 12], [0, 6]), coulSur(vb, [0, 6], [0, 0])];
    R.ok(ePcs(ab) === '{"L1:0":{"EU":1,"EP":0},"L2:0":{"EU":1,"EP":0}}' && rls(db, ab, ['L1', 'L2', 'T']) === 'L1:EU L2:EU T:EU' && cb.join(' | ') === css(EU) + ' | ' + css(EU),
      'd19 (' + n + ') WC → ' + nom + ' → tuyau → drain : les deux tuyaux rouges (EU) (obtenu ' + ePcs(ab) + ' ; ' + rls(db, ab, ['L1', 'L2', 'T']) + ' ; écran ' + cb.join(' | ') + ')');
  });
  /* (d) plan d'avant-projet : tuyau du WC « à supprimer », absent de cette analyse : couleur de l'état des lieux (an.ref, même règle) ;
     WC « à supprimer » et tuyau gardé : plus aucune eau n'y passe, il redevient vert (rouge à l'état des lieux) */
  const vp = (stL, stS) => doc({o: [['s', 'wc', 0, 8, {st: stS}], ['J', 'jonction', 0, 0]], l: [['L', 'tr', '', stL, ['s', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const v1 = vp('supprimer', 'existant'), w1 = V.analyser(copie(v1), 'avp'), v2 = vp('', 'supprimer'), w2 = V.analyser(copie(v2), 'avp'), e2 = V.analyser(copie(v2), 'edl');
  const r5 = [rlDe(v1, 'L', w1), rlDe(v2, 'L', w2), rlDe(v2, 'L', e2)];
  R.ok(ePcs(w1) === 'absent' && ePcs(w1.ref) === '{"L:0":{"EU":1,"EP":0}}' && ePcs(w2) === 'absent' && ePcs(e2) === '{"L:0":{"EU":1,"EP":0}}' && r5.join() === 'EU,EP,EU',
    'd19 (d) plan d\'avant-projet : tuyau du WC « à supprimer », rouge de l\'état des lieux (an.ref) ; WC « à supprimer » : son tuyau, gardé, ne porte plus d\'eau et '
    + 'redevient vert, rouge à l\'état des lieux (obtenu ' + [ePcs(w1), ePcs(w1.ref), ePcs(w2), ePcs(e2)].join(' ; ') + ' ; ' + r5.join(', ') + ')');
  /* (e) trop-plein d'un puisard vers le drain : orienté du puisard vers le drain, il suit les eaux qu'il porte (rouge) ; sans sens, il
     atteint aussi le puisard et garde sa couleur [p] ; le tuyau du WC au puisard la garde toujours */
  const t1 = viaO('puisard', 1), b1 = V.analyser(copie(t1), 'edl'), t0 = viaO('puisard'), b0 = V.analyser(copie(t0), 'edl'), ct = coulSur(ecran(t1, 40, [3, 6]), [0, 6], [0, 0]);
  R.ok(ePcs(b1) === '{"L2:0":{"EU":1,"EP":0}}' && rls(t1, b1, ['L1', 'L2', 'T']) === 'L1:EP L2:EU T:EU' && ct === css(EU) && ePcs(b0) === 'absent'
    && rls(t0, b0, ['L1', 'L2', 'T']) === 'L1:EP L2:EP T:EU',
    'd19 (e) WC → puisard → trop-plein → drain : le trop-plein orienté vers le drain est rouge (EU), à l\'écran aussi ; sans sens, il atteint aussi le puisard et reste '
    + 'vert [p] ; le tuyau du WC au puisard reste vert (obtenu ' + ePcs(b1) + ' ; ' + rls(t1, b1, ['L1', 'L2', 'T']) + ' ; écran ' + ct + ' ; sans sens ' + ePcs(b0) + ' ; '
    + rls(t0, b0, ['L1', 'L2', 'T']) + ')');
  /* (e) suite : le WC va aussi au drain par un chemin direct orienté (D1 → D2 → D3), plus long que celui du trop-plein du puisard (qui
     mène aussi à un rejet en milieu naturel : le WC est « multiple ») : les plus courts chemins du parcours ordinaire et ceux du
     trop-plein comptent tous deux [p] ; dans les deux ordres du dessin */
  const t2 = doc({o: [['s', 'wc', 0, 12], ['P', 'puisard', -6, 12], ['M', 'milieu', -6, 4], ['K1', 'jonction', 0, 8], ['K2', 'jonction', 0, 4], ['J', 'jonction', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'P']], ['TP', 'tr', '', '', ['P', 'J'], 1], ['TM', 'tr', '', '', ['P', 'M'], 1], ['D1', 'tr', '', '', ['s', 'K1'], 1],
      ['D2', 'tr', '', '', ['K1', 'K2'], 1], ['D3', 'tr', '', '', ['K2', 'J'], 1], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const ex = [t2, reordonne(t2, 1)].map(x => { const b = V.analyser(copie(x), 'edl');
    return ePcs(b) + ' ; ' + rls(x, b, ['L1', 'TP', 'TM', 'D1', 'D2', 'D3', 'T']) + ' ; écran ' + coulSur(ecran(x, 40, [3, 6]), [0, 12], [0, 0]); });
  const exa = '{"D1:0":{"EU":1,"EP":0},"D2:0":{"EU":1,"EP":0},"D3:0":{"EU":1,"EP":0},"TP:0":{"EU":1,"EP":0}} ; L1:EP TP:EU TM:EP D1:EU D2:EU D3:EU T:EU ; écran ' + css(EU);
  R.ok(ex[0] === exa && ex[1] === exa,
    'd19 (e) WC → puisard → trop-plein orienté → drain, et WC → chemin direct orienté plus long → drain : le trop-plein et le chemin direct rouges, le tuyau du puisard '
    + 'et celui du rejet en milieu naturel verts, dans les deux ordres du dessin (obtenu ' + ex.join(' | ') + ')');
  /* (f) tuyaux en boucle : seuls comptent les chemins que suit l'analyse, les plus courts (en pièces) ; la branche plus longue reste verte.
     Deux tuyaux parallèles d'un regard au drain, aussi courts l'un que l'autre : tous deux rouges. Dans les deux ordres du dessin [p] */
  const df = doc({o: [['s', 'wc', 0, 12], ['J1', 'jonction', 0, 9], ['J2', 'jonction', 0, 6], ['J3', 'jonction', 4, 9], ['J4', 'jonction', 4, 6], ['J', 'jonction', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'J1']], ['LA', 'tr', '', '', ['J1', 'J2']], ['LB', 'tr', '', '', ['J1', 'J3']], ['LC', 'tr', '', '', ['J3', 'J4']], ['LD', 'tr', '', '', ['J4', 'J2']],
      ['LE', 'tr', '', '', ['J2', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const dpar = doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 8], ['J', 'jonction', 0, 0]],
    l: [['L', 'tr', '', '', ['s', 'R']], ['P1', 'tr', '', '', ['R', [-2, 4], 'J']], ['P2', 'tr', '', '', ['R', [2, 4], 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const lit = (x, ids) => [x, reordonne(x, 1)].map(y => { const a = V.analyser(copie(y), 'edl'); return ePcs(a) + ' ' + rls(y, a, ids); });
  const rf = lit(df, ['L1', 'LA', 'LB', 'LC', 'LD', 'LE']), rpar = lit(dpar, ['L', 'P1', 'P2']);
  const ATF = '{"L1:0":{"EU":1,"EP":0},"LA:0":{"EU":1,"EP":0},"LE:0":{"EU":1,"EP":0}} L1:EU LA:EU LB:EP LC:EP LD:EP LE:EU';
  const ATP = '{"L:0":{"EU":1,"EP":0},"P1:0":{"EU":1,"EP":0},"P2:0":{"EU":1,"EP":0}} L:EU P1:EU P2:EU';
  R.ok(rf.every(z => z === ATF) && rpar.every(z => z === ATP),
    'd19 (f) boucle : le chemin le plus court (L1, LA, LE) rouge, la branche plus longue (LB, LC, LD) verte ; deux tuyaux parallèles aussi courts du regard au drain : '
    + 'tous deux rouges ; dans les deux ordres du dessin (obtenu ' + rf.concat(rpar).join(' | ') + ')');
  /* (g) un tuyau de plusieurs pièces peut être en partie rouge : WC → R1 → R2 → drain, une descente arrive à R1 */
  const dg = doc({o: [['s', 'wc', 0, 12], ['R1', 'regard', 0, 8], ['R2', 'regard', 0, 4], ['d', 'descente', 4, 8], ['J', 'jonction', 0, 0]],
    l: [['L', 'tr', '', '', ['s', 'R1', 'R2', 'J']], ['M', 'tr', '', '', ['d', 'R1']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const ag = V.analyser(copie(dg), 'edl'), vg = ecran(dg, 40, [2, 6]), cg = [coulSur(vg, [0, 12], [0, 8]), coulSur(vg, [0, 8], [0, 4]), coulSur(vg, [0, 4], [0, 0])];
  const rmg = ['L:0', 'L:1', 'L:2'].map(id => sur(() => V.resMorceau(ag.pieces.find(p => p.id === id), ag))).join(',');
  R.ok(ePcs(ag) === '{"L:0":{"EU":1,"EP":0},"L:1":{"EU":1,"EP":1},"L:2":{"EU":1,"EP":1},"M:0":{"EU":0,"EP":1}}' && rmg === 'EU,EP,EP' && rls(dg, ag, ['L', 'M', 'T']) === 'L:EP M:EP T:EP'
    && cg.join(' | ') === [css(EU), css(EP), css(EP)].join(' | '),
    'd19 (g) tuyau de trois pièces (WC → R1 → R2 → drain, une descente à R1) : la 1re pièce rouge, les deux autres vertes ; resLigne EP (la couleur de la plupart '
    + 'de ses pièces) (obtenu ' + ePcs(ag) + ' ; resMorceau ' + rmg + ' ; ' + rls(dg, ag, ['L', 'M', 'T']) + ' ; écran ' + cg.join(' | ') + ')');
  /* (g) suite (relecture de m165, M4) : la 1re pièce, rouge, donne la ligne EU de la légende du plan PDF, bien que le tuyau reste vert */
  const lgg = await pdf(dg, {mode: 'edl'}), fg = lgg.txt.indexOf('Anomalies et préconisations'), pgg = fg > 0 ? lgg.txt.slice(0, fg - 1) : lgg.txt;
  R.ok(!lgg.err.length && pgg.indexOf(CEU) >= 0 && pgg.indexOf(CEP) >= 0,
    'd19 (g) légende du plan PDF : « ' + CEU + ' » pour la 1re pièce du tuyau, rouge, bien que le tuyau reste vert, et « ' + CEP + ' » (avant la relecture '
    + 'de m165 : pas de ligne EU ; obtenu ' + [pgg.indexOf(CEU) >= 0, pgg.indexOf(CEP) >= 0].join(', ') + ')' + (lgg.err.length ? ' ' + lgg.err.join(' | ') : ''));
  /* (h) relecture de m165 (M1) : l'eau d'une source EP prend chaque tuyau orienté qu'elle trouve, pas seulement ses plus courts chemins.
     WC s → A → K → B → J (1er sommet du drain T) ; descente d → C → R, puis E de R au 2e sommet du drain et F de R à K, tous orientés :
     l'eau de la descente passe aussi par F et B ; A rouge, B, C, E et F verts ; dans les deux ordres du dessin */
  const dh = doc({o: [['s', 'wc', 0, 12], ['K', 'jonction', 0, 6], ['J', 'jonction', 0, 0], ['J2', 'jonction', 10, 0], ['d', 'descente', 8, 12], ['R', 'regard', 8, 8]],
    l: [['A', 'tr', '', '', ['s', 'K'], 1], ['B', 'tr', '', '', ['K', 'J'], 1], ['C', 'tr', '', '', ['d', 'R'], 1], ['E', 'tr', '', '', ['R', 'J2'], 1],
      ['F', 'tr', '', '', ['R', 'K'], 1], ['T', 'tr', '', '', ['J', 'J2'], 0, INFIL]]});
  const rh = lit(dh, ['A', 'B', 'C', 'E', 'F', 'T']);
  const ATH = '{"A:0":{"EU":1,"EP":0},"B:0":{"EU":1,"EP":1},"C:0":{"EU":0,"EP":1},"E:0":{"EU":0,"EP":1},"F:0":{"EU":0,"EP":1}} A:EU B:EP C:EP E:EP F:EP T:EP';
  R.ok(rh.every(z => z === ATH),
    'd19 (h) tuyaux orientés, la descente atteint le drain par E (plus court) et par F puis B : le tuyau du WC (A) rouge, B, que l\'eau de la descente prend aussi, '
    + 'vert, comme C, E et F ; dans les deux ordres du dessin (avant la relecture de m165 : B rouge ; obtenu ' + rh.join(' | ') + ')');
  /* (i) relecture de m165 (M1) : WC s et descente d vont au puisard P, dont le trop-plein orienté TP va au drain ; la descente y va aussi
     par le tuyau orienté M2, plus court : son eau passe aussi par le puisard et TP, vert. Parcours du trop-plein de la descente laissé (il
     n'atteint rien de plus), ou gardé (un 2e trop-plein TM vers un rejet en milieu naturel). Puis TP vers un raccord K, suivi d'un tuyau
     sans sens Z jusqu'au drain : Z vert aussi (plus courts chemins du bout aval de TP jusqu'au drain). Dans les deux ordres du dessin [p] */
  const di = tm => doc({o: [['s', 'wc', -4, 12], ['d', 'descente', 4, 12], ['P', 'puisard', 0, 8], ['J', 'jonction', 0, 0], ['M', 'milieu', -8, 8]],
    l: [['L1', 'tr', '', '', ['s', 'P']], ['M1', 'tr', '', '', ['d', 'P']], ['M2', 'tr', '', '', ['d', 'J'], 1], ['TP', 'tr', '', '', ['P', 'J'], 1]]
      .concat(tm ? [['TM', 'tr', '', '', ['P', 'M'], 1]] : []).concat([['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]])});
  const dj = doc({o: [['s', 'wc', -4, 12], ['d', 'descente', 4, 12], ['P', 'puisard', 0, 8], ['K', 'jonction', 0, 4], ['J', 'jonction', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'P']], ['M1', 'tr', '', '', ['d', 'P']], ['M2', 'tr', '', '', ['d', 'J'], 1], ['TP', 'tr', '', '', ['P', 'K'], 1], ['Z', 'tr', '', '', ['K', 'J']],
      ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const ri = [lit(di(false), ['L1', 'M1', 'M2', 'TP', 'T']), lit(di(true), ['L1', 'M1', 'M2', 'TP', 'TM', 'T']), lit(dj, ['L1', 'M1', 'M2', 'TP', 'Z', 'T'])];
  const ATI = ['{"M2:0":{"EU":0,"EP":1},"TP:0":{"EU":1,"EP":1}} L1:EP M1:EP M2:EP TP:EP T:EP', '{"M2:0":{"EU":0,"EP":1},"TP:0":{"EU":1,"EP":1}} L1:EP M1:EP M2:EP TP:EP TM:EP T:EP',
    '{"M2:0":{"EU":0,"EP":1},"TP:0":{"EU":1,"EP":1},"Z:0":{"EU":1,"EP":1}} L1:EP M1:EP M2:EP TP:EP Z:EP T:EP'];
  R.ok(ri.every((z, i) => z.every(y => y === ATI[i])),
    'd19 (i) WC et descente vers un puisard, trop-plein orienté vers le drain, la descente allant aussi au drain par un tuyau orienté plus court : le trop-plein '
    + 'vert (parcours du trop-plein de la descente laissé, ou gardé avec un 2e trop-plein) ; trop-plein vers un raccord puis tuyau sans sens jusqu\'au drain : les deux '
    + 'verts ; dans les deux ordres du dessin (avant la relecture de m165 : trop-plein et tuyau sans sens rouges ; obtenu ' + ri.map(z => z.join(' / ')).join(' | ') + ')');
  /* (k) relecture de m165 (M2) : tuyau L de deux pièces (WC s → regard R → drain), une descente arrive à R : la 1re pièce rouge, la 2e
     verte ; à égalité, le tuyau est vert (EP, « EP Ø100 »), qu'il soit tracé du WC vers le drain ou du drain vers le WC */
  const dk = inv => doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 6], ['d', 'descente', 4, 6], ['J', 'jonction', 0, 0]],
    l: [['L', 'tr', '', '', inv ? ['J', 'R', 's'] : ['s', 'R', 'J']], ['M', 'tr', '', '', ['d', 'R']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const rk = [false, true].map(inv => { const x = dk(inv), a = V.analyser(copie(x), 'edl'); x.el.find(e => e.id === 'L').p.diam = '100';
    return a.pieces.filter(p => p.l.id === 'L').map(p => p.id + '=' + sur(() => V.resMorceau(p, a))).join(' ') + ' ; ' + rls(x, a, ['L', 'M', 'T']) + ' ; ' + etiqDe(x, 'L', a); });
  R.ok(rk[0] === 'L:0=EU L:1=EP ; L:EP M:EP T:EP ; EP Ø100' && rk[1] === 'L:0=EP L:1=EU ; L:EP M:EP T:EP ; EP Ø100',
    'd19 (k) tuyau de deux pièces, l\'une rouge (WC seul), l\'autre verte (une descente au regard du milieu) : resLigne EP et étiquette « EP Ø100 » dans les deux sens '
    + 'du tracé (avant la relecture de m165 : EU tracé du WC vers le drain ; obtenu ' + rk.join(' | ') + ')');
  /* (r) relecture de m165 (M3, M8) : regard R au tampon béton sur le tuyau du WC (WC s → L1 → R → L2 → drain) : les deux tuyaux rouges ;
     témoin (les deux versions) : le regard reste un regard EP, « Regard EP : tampon béton » en réserve, et le WC « rejet au sol » (NC) */
  const dr = doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 6, {tampon: 'beton'}], ['J', 'jonction', 0, 0]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const kr = juge(dr), ar = [ePcs(kr.an), rls(dr, kr.an, ['L1', 'L2', 'T'])].join(' ; ');
  R.ok(ar === '{"L1:0":{"EU":1,"EP":0},"L2:0":{"EU":1,"EP":0}} ; L1:EU L2:EU T:EU',
    'd19 (r) regard au tampon béton sur le tuyau du WC : les deux tuyaux rouges (EU), comme le drain (v1.7.2 : verts ; obtenu ' + ar + ')');
  R.ok(kr.an.resPt.R === 'EP' && memesA(kr.a, [['eu-sol:s', true, 'WC : rejet au sol (infiltration)'], ['tampon:R', false, 'Regard EP : tampon béton']]),
    'd19 (r) témoin : le regard au tampon béton du tuyau rouge reste un regard EP, « Regard EP : tampon béton » en réserve ; WC « rejet au sol (infiltration) », NC '
    + '(obtenu regard ' + kr.an.resPt.R + ' ; ' + txtJuge(kr) + ')');
  /* témoins (les deux versions) : descente seule vers le drain (depuis m165, son tuyau porte des EP : entrée {EU: 0, EP: 1}) ; « Tronçon
     EP » d'un WC vers le drain ; tuyau d'un WC vers le drain et un collecteur EU ; tuyau vers le drain sans source (pas d'entrée) */
  const dt = {
    'descente seule : vert': [doc({o: [['s', 'descente', 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]}), 'EP',
      '{"EU":0,"EP":1}'],
    '« Tronçon EP » d\'un WC : vert': [doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0]], l: [['L', 'tr', 'EP', '', ['s', 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]}), 'EP'],
    'tuyau d\'un WC vers le drain et un collecteur EU : « plusieurs réseaux », comme en v1.7.2': [doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0], ['K', 'jonction', 0, -6]],
      l: [['L', 'tr', '', '', ['s', 'J']], ['M', 'tr', '', '', ['J', 'K']], ['C', 'col', 'EU', '', [[-5, -6], 'K', [5, -6]]], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]}), 'MIX'],
    'tuyau vers le drain sans source : vert': [doc({o: [['J', 'jonction', 0, 0]], l: [['L', 'tr', '', '', [[0, 8], 'J']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]}), 'EP']
  };
  Object.keys(dt).forEach(n => {
    const [x, att, ent] = dt[n], a = V.analyser(copie(x), 'edl'), c = coulSur(ecran(x, 40, [5, 4]), [0, 8], [0, 0]);
    const sans = a.eauxPieces === undefined || !Object.prototype.hasOwnProperty.call(a.eauxPieces, 'L:0');
    R.ok(rlDe(x, 'L', a) === att && a.resPiece['L:0'].res === att && c === css(V.RES[att].rgb.join(',')) && (sans || !!ent && JSON.stringify(a.eauxPieces['L:0']) === ent),
      'd19 témoin, ' + n + ' (resLigne ' + att + ', trait de cette couleur, ' + (ent ? 'an.eauxPieces sans entrée L:0 ou avec ' + ent : 'pas d\'entrée dans an.eauxPieces')
      + ' ; obtenu ' + rlDe(x, 'L', a) + ' ; ' + c + ' ; ' + ePcs(a) + ')');
  });
  /* témoins : resPiece et resObj de v1.7.2 ; avec et sans an.eauxPieces, mêmes anomalies, conclusion, constat déduit et boîtes du constat */
  const LOT = [['principal', wcD(), 'edl', 's=ok:DISP'], ['a', da, 'edl', 's=ok:DISP d=ok:DISP'], ['b', viaO('fosse'), 'edl', 's=ok:DISP'], ['c', viaO('boite'), 'edl', 's=ok:DISP'],
    ['d', v1, 'avp', 's=nonrelie'], ['d', v2, 'avp', ''], ['e', t1, 'edl', 's=ok:INF'], ['f', df, 'edl', 's=ok:DISP'], ['f', dpar, 'edl', 's=ok:DISP'], ['g', dg, 'edl', 's=ok:DISP d=ok:DISP'],
    ['h', dh, 'edl', 's=ok:DISP d=ok:DISP'], ['i', di(false), 'edl', 's=ok:INF d=multiple'], ['i', di(true), 'edl', 's=ok:INF d=multiple'], ['i', dj, 'edl', 's=ok:INF d=multiple'],
    ['k', dk(false), 'edl', 's=ok:DISP d=ok:DISP'], ['k', dk(true), 'edl', 's=ok:DISP d=ok:DISP'], ['r', dr, 'edl', 's=ok:DISP']];
  const ec = [];
  LOT.forEach(([n, x, mode, o]) => {
    const a = V.analyser(copie(x), mode), a0 = Object.assign({}, a); delete a0.eauxPieces;
    const lu = b => sur(() => { const L = V.anomaliesDoc(copie(x), b); return JSON.stringify([L, V.conclusion(L, b), V.constatDeduit(copie(x), b), V.boitesConstat(copie(x), b)]); });
    const pOk = a.pieces.every(p => JSON.stringify(a.resPiece[p.id]) === '{"res":"EP","deduit":true,"nets":["EP"],"contredit":false}');
    if (!pOk || sigO(a) !== o || lu(a) !== lu(a0) || /^exception/.test(lu(a))) ec.push(n + ' (' + mode + ') : ' + sigP(a) + ' | ' + sigO(a) + (lu(a) !== lu(a0) ? ' | diffère sans an.eauxPieces' : ''));
  });
  R.ok(!ec.length, 'd19 témoins : sur les croquis de d19, chaque pièce garde resPiece {res: EP, deduit, nets: [EP]} et chaque source son résultat ; avec et sans '
    + 'an.eauxPieces, mêmes anomalies, conclusion, constat déduit et boîtes du constat' + (ec.length ? ' (écarts : ' + ec.join(' ; ') + ')' : ''));
  /* témoins : analyse sans an.eauxPieces (faite avant m165), ou avec un an.eauxPieces altéré : couleurs de v1.7.2, sans exception */
  const ALT = [undefined, null, 'EU', 7, [], {}, {'L:0': null}, {'L:0': 'EU'}, {'L:0': [1, 0]}, {'L:0': {EU: '1', EP: 0}}, {'L:0': {EU: 1}}, {'L:0': {EU: 1, EP: '0'}}, {'L:0': {EU: 0, EP: 0}}];
  const ea = [];
  ALT.forEach((v, i) => {
    const a = Object.assign({}, V.analyser(copie(d), 'edl')); if (v === undefined) delete a.eauxPieces; else a.eauxPieces = v;
    const vue = new V.Vue(800, 600); vue.s = 40; vue.cx = 5; vue.cy = 4; const cv = canevas();
    const z = sur(() => { V.dessinerCroquis(cv.ctx, d, a, vue, 1, {}); return [V.resLigne(d.el.find(e => e.id === 'L'), a), V.texteEtiquette(d.el.find(e => e.id === 'L'), a)].join(', '); });
    const c = coulSur(cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul})), [0, 8], [0, 0]);
    if (z !== 'EP, EP Ø100' || c !== css(EP)) ea.push(i + ' ' + JSON.stringify(v === undefined ? 'absent' : v) + ' : ' + z + ' ; ' + c);
  });
  R.ok(!ea.length, 'd19 témoins : sans an.eauxPieces, ou avec un an.eauxPieces altéré (' + ALT.length + ' valeurs : null, texte, nombre, tableau, entrée nulle, '
    + 'de mauvais type, sans EP, sans eau…), le tuyau garde la couleur de v1.7.2 (EP, « EP Ø100 », trait vert), sans exception' + (ea.length ? ' (écarts : ' + ea.join(' ; ') + ')' : ''));
}
/* d20 (m166, relecture d'ensemble de la v1.7.3, CL1) : WC s → tuyau L Ø100 sans réseau (8 m, de (0, 8) à J) → 1er sommet J du drain
   d'infiltration T [J, mi, fin] ; o, l : ce que le drain atteint au-delà de lui. Par une fosse F en (0, 8), le WC est en (0, 15) et le
   tuyau L0, du WC à la fosse, fait 7 m */
const auDela = (fin, o, l, fosse, mi) => {
  const d = doc({o: [['s', 'wc', 0, fosse ? 15 : 8]].concat(fosse ? [['F', 'fosse', 0, 8]] : [], [['J', 'jonction', 0, 0]], o),
    l: (fosse ? [['L0', 'tr', '', '', ['s', 'F']]] : []).concat([['L', 'tr', '', '', [fosse ? 'F' : 's', 'J']], ['T', 'tr', '', '', ['J', mi || [5, 0], fin], 0, INFIL]], l)});
  const L = d.el.find(e => e.id === 'L'); L.p.diam = '100'; L.lab = null; return d;
};
/* état et rejet de chaque source, et ce qu'elle atteint au-delà du drain (r.apres, r.apresPar) */
const sigOA = an => Object.keys(an.resObj).map(id => { const r = an.resObj[id];
  return id + '=' + r.etat + (r.res ? ':' + r.res : '') + (r.apres ? '>' + r.apres.map(x => x.res).join('+') : '') + (r.apresPar ? '/' + r.apresPar : ''); }).join(' ');
/* lignes « Canalisation … » de la légende du plan PDF (page 1), dans l'ordre */
async function lignesLg(d, mode){
  const lg = await pdf(d, {mode}), f = lg.txt.indexOf('Anomalies et préconisations'), pg = f > 0 ? lg.txt.slice(0, f - 1) : lg.txt;
  return lg.err.join(' | ') + pg.filter(s => /^(Canalisation |Plusieurs réseaux atteints$|Réseau non déterminé$)/.test(s)).join(' + ');
}
/* traits de l'écran du plan d'avant-projet, en mètres du croquis (comme ecran, avec l'analyse de l'avant-projet) */
function ecranAvp(d, s, c){
  const an = V.analyser(copie(d), 'avp'), vue = new V.Vue(800, 600); vue.s = s; vue.cx = c[0]; vue.cy = c[1];
  const cv = canevas(); V.dessinerCroquis(cv.ctx, d, an, vue, 1, {});
  return cv.traits.map(t => ({a: vue.monde(t.a.x, t.a.y), b: vue.monde(t.b.x, t.b.y), coul: t.coul}));
}
/* longueur d'une forme du plan PDF (mm) ou d'une polyligne du DXF (m) */
const lgF = v => v.slice(1).reduce((s, z, i) => s + Math.hypot(z.x - v[i].x, z.y - v[i].y), 0);
async function tuyauAuDelaDrain(){
  const CEU = 'Canalisation EU (eaux usées)', CEP = 'Canalisation EP (eaux pluviales)', MIX = V.RES.MIX.rgb.join(',');
  const rgbT = TXT_EU.slice(1).match(/../g).map(h => parseInt(h, 16)).join(','), rmDe = (an, id) => sur(() => V.resMorceau(an.pieces.find(p => p.id === id), an));
  /* formes à deux points du plan PDF au 1/200 et polylignes à deux sommets du DXF (hors drains), de m mètres : couleur, calque */
  const pdfDe = (rq, m) => rq.formes.filter(q => q.pts.length === 2 && Math.abs(lgF(q.pts) - m * 5) < 1e-6).map(q => q.coul).join('/') || 'aucune forme';
  const dxfDe = (x, m) => x.ents.filter(q => q.type === 'POLYLINE' && q.cal !== 'VEDE-DRAINS' && q.sommets.length === 2 && Math.abs(lgF(q.sommets) - m) < 1e-6)
    .map(q => q.cal + '/' + (q.c['62'] || 'du calque')).join('/') || 'aucune polyligne';
  /* CL1 : ce que le drain atteint au-delà de lui ne compte pas pour la couleur du tuyau qui y mène, comme pour la source (m129) */
  const AU = [
    ['(1) trop-plein Q parti du sommet du milieu K vers une boîte EP', f => auDela([10, 0], [['K', 'jonction', 5, 0], ['B', 'boite', 5, -6, {res: 'EP'}]],
      [['Q', 'tr', '', '', ['K', 'B']]], f, 'K')],
    ['(2) boîte EP sur le dernier sommet', f => auDela('B', [['B', 'boite', 10, 0, {res: 'EP'}]], [], f)],
    ['(3) puisard sur le sommet du milieu', f => auDela([10, 0], [['P', 'puisard', 5, 0]], [], f, 'P')],
    ['(4) puits sur le dernier sommet', f => auDela('P', [['P', 'puits', 10, 0]], [], f)],
    ['(5) infiltration au sol sur le dernier sommet', f => auDela('P', [['P', 'infiltration', 10, 0]], [], f)],
    ['(6) boîte sans réseau sur le dernier sommet, reliée par le tuyau M au collecteur EP', f => auDela('B', [['B', 'boite', 10, 0], ['K', 'jonction', 20, 0]],
      [['M', 'tr', '', '', ['B', 'K']], ['C', 'col', 'EP', '', [[20, -5], 'K', [20, 5]]]], f)]
  ];
  const ANA = ['direct : {"L:0":{"EU":1,"EP":0}} ; resMorceau EU ; L:EU T:EU ; EU Ø100',
    'par la fosse : {"L0:0":{"EU":1,"EP":0},"L:0":{"EU":1,"EP":0}} ; resMorceau EU,EU ; L0:EU L:EU T:EU ; EU Ø100'];
  const RND = ['direct : écran ' + css(EU) + ' ; EU Ø100 en ' + TXT_EU + ' ; PDF ' + EU + ' ; EU Ø100 en ' + rgbT + ' ; DXF VEDE-EU/du calque (couleur 1) ; EU %%c100 VEDE-ETIQUETTES/1',
    'par la fosse : écran ' + css(EU) + ', ' + css(EU) + ' ; EU Ø100 en ' + TXT_EU + ' ; PDF ' + EU + ', ' + EU + ' ; EU Ø100 en ' + rgbT
    + ' ; DXF VEDE-EU/du calque, VEDE-EU/du calque (couleur 1) ; EU %%c100 VEDE-ETIQUETTES/1'];
  for (const [n, fab] of AU){
    const va = [], vr = [];
    for (const f of [false, true]){
      const d = fab(f), an = V.analyser(copie(d), 'edl'), ids = f ? ['L0', 'L'] : ['L'], m = f ? [7, 8] : [8], qui = f ? 'par la fosse : ' : 'direct : ';
      va.push(qui + ePcs(an) + ' ; resMorceau ' + ids.map(id => rmDe(an, id + ':0')).join(',') + ' ; ' + rls(d, an, ids.concat(['T'])) + ' ; ' + etiqDe(d, 'L', an));
      const vu = dessiner(d, 25, [5, 4]), te = vu.textes.filter(t => /Ø100/.test(t.t)), ce = (f ? [[[0, 15], [0, 8]]] : []).concat([[[0, 8], [0, 0]]]).map(s => coulSur(vu.traits, s[0], s[1]));
      const rq = await pdf(Object.assign(fab(f), {echelle: 200}), {mode: 'edl'}), eq = rq.pos.filter(q => /Ø100/.test(q.t)), le = eq[eq.length - 1], x = dxf(d);
      const X = x.ents.filter(q => q.type === 'TEXT' && /%%c100$/.test(q.c['1'])).map(q => q.c['1'] + ' ' + q.cal + '/' + q.c['62']);
      vr.push(qui + 'écran ' + ce.join(', ') + ' ; ' + (te.map(t => t.t + ' en ' + t.coul).join(', ') || 'pas d\'étiquette') + ' ; PDF ' + m.map(z => pdfDe(rq, z)).join(', ') + ' ; '
        + (le ? le.t + ' en ' + le.coul : 'pas d\'étiquette') + ' ; DXF ' + m.map(z => dxfDe(x, z)).join(', ') + ' (couleur ' + x.calques['VEDE-EU'] + ') ; ' + (X.join(', ') || 'pas d\'étiquette')
        + (rq.err.length ? ' ' + rq.err.join(' | ') : ''));
    }
    R.ok(va.join(' | ') === ANA.join(' | '),
      'd20 ' + n + ', WC relié directement ou par une fosse septique : an.eauxPieces, pièces et tuyaux EU (resMorceau, resLigne, que lisent la tête de la fiche, '
      + '« Réseau EU déduit », et une anomalie saisie à la main, en EU), étiquette « EU Ø100 » ; drain rouge (v1.7.3 d\'avant m166 : tuyaux verts, « EP Ø100 » ; '
      + 'obtenu ' + va.join(' | ') + ')');
    R.ok(vr.join(' | ') === RND.join(' | '),
      'd20 ' + n + ', rendus, WC relié directement ou par une fosse septique : trait rouge ' + css(EU) + ' et étiquette « EU Ø100 » en ' + TXT_EU + ' à l\'écran ; trait '
      + 'en ' + EU + ' et étiquette en ' + rgbT + ' au plan PDF (1/200) ; polyligne sur VEDE-EU et « EU %%c100 » en couleur 1 au DXF (v1.7.3 d\'avant m166 : verts ; '
      + 'obtenu ' + vr.join(' | ') + ')');
  }
  /* (r) regard R au tampon béton sur le tuyau du WC (WC s → L1 → R → L2 → drain), ou sur le sommet du milieu du drain ; une boîte EP
     sur le dernier sommet du drain, au-delà de lui : tuyaux rouges */
  const dr1 = doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 6, {tampon: 'beton'}], ['J', 'jonction', 0, 0], ['B', 'boite', 10, 0, {res: 'EP'}]],
    l: [['L1', 'tr', '', '', ['s', 'R']], ['L2', 'tr', '', '', ['R', 'J']], ['T', 'tr', '', '', ['J', [5, 0], 'B'], 0, INFIL]]});
  const dr2 = doc({o: [['s', 'wc', 0, 8], ['J', 'jonction', 0, 0], ['R', 'regard', 5, 0, {tampon: 'beton'}], ['B', 'boite', 10, 0, {res: 'EP'}]],
    l: [['L', 'tr', '', '', ['s', 'J']], ['T', 'tr', '', '', ['J', 'R', 'B'], 0, INFIL]]});
  const kr = [juge(dr1), juge(dr2)], vr = [ePcs(kr[0].an) + ' ' + rls(dr1, kr[0].an, ['L1', 'L2']), ePcs(kr[1].an) + ' ' + rls(dr2, kr[1].an, ['L'])];
  R.ok(vr[0] === '{"L1:0":{"EU":1,"EP":0},"L2:0":{"EU":1,"EP":0}} L1:EU L2:EU' && vr[1] === '{"L:0":{"EU":1,"EP":0}} L:EU',
    'd20 (r) regard au tampon béton sur le tuyau du WC, ou sur le sommet du milieu du drain, une boîte EP au-delà du drain : tuyaux rouges (EU) (v1.7.3 '
    + 'd\'avant m166 : verts ; obtenu ' + vr.join(' | ') + ')');
  const AR = [['eu-sol:s', true, 'WC : rejet au sol (infiltration)'], ['eu-ep:s', true, 'WC : rejet au réseau EP'], ['tampon:R', false, 'Regard EP : tampon béton']];
  R.ok(kr.every(k => k.an.resPt.R === 'EP' && memesA(k.a, AR)),
    'd20 (r) témoin (les deux versions) : le regard au tampon béton, sur le tuyau rouge ou sur le drain, reste un regard EP, « Regard EP : tampon béton » en '
    + 'réserve ; le WC, « rejet au sol (infiltration) » et, au-delà du drain, « rejet au réseau EP », NC (obtenu ' + kr.map(k => 'regard ' + k.an.resPt.R + ' ; ' + txtJuge(k)).join(' | ') + ')');
  /* témoins (les deux versions) : le trop-plein Q de (1) et le tuyau M de la boîte au collecteur de (6), au-delà du drain, restent verts */
  const tv = [], TV = [];
  for (const f of [false, true]) for (const [k, id, a, b, m] of [[0, 'Q', [5, 0], [5, -6], 6], [5, 'M', [10, 0], [20, 0], 10]]){
    const d = AU[k][1](f), an = V.analyser(copie(d), 'edl'), rq = await pdf(Object.assign(AU[k][1](f), {echelle: 200}), {mode: 'edl'}), x = dxf(d);
    tv.push(id + (f ? ' (fosse)' : '') + ' : ' + rlDe(d, id, an) + ', ' + rmDe(an, id + ':0') + ', écran ' + coulSur(ecran(d, 25, [5, 4]), a, b) + ', PDF ' + pdfDe(rq, m) + ', DXF ' + dxfDe(x, m)
      + (rq.err.length ? ' ' + rq.err.join(' | ') : ''));
    TV.push(id + (f ? ' (fosse)' : '') + ' : EP, EP, écran ' + css(EP) + ', PDF ' + EP + ', DXF VEDE-EP/du calque');
  }
  R.ok(tv.join(' | ') === TV.join(' | '),
    'd20 témoin (les deux versions) : le trop-plein parti du sommet du drain (1) et le tuyau de la boîte au collecteur EP (6), au-delà du drain, restent verts '
    + '(resLigne, resMorceau, écran, plan PDF, DXF ; obtenu ' + tv.join(' | ') + ')');
  /* témoin (les deux versions) : trop-plein Q parti du sommet J où arrive le tuyau du WC, vers une boîte EP : il est avant le drain
     (bifurcation, comme pour la source, m129) : la source est « multiple », les tuyaux du WC et Q restent verts, sans entrée dans
     an.eauxPieces ; le drain, rouge */
  const fj = f => auDela([10, 0], [['B', 'boite', 0, -6, {res: 'EP'}]], [['Q', 'tr', '', '', ['J', 'B']]], f);
  const tj = [false, true].map(f => { const d = fj(f), an = V.analyser(copie(d), 'edl'), vu = ecran(d, 25, [5, 4]);
    return sigOA(an) + ' ' + ePcs(an) + ' ' + rls(d, an, (f ? ['L0', 'L'] : ['L']).concat(['Q', 'T'])) + ' écran '
      + (f ? [[[0, 15], [0, 8]]] : []).concat([[[0, 8], [0, 0]], [[0, 0], [0, -6]]]).map(s => coulSur(vu, s[0], s[1])).join(', '); });
  const TJ = ['s=multiple absent L:EP Q:EP T:EU écran ' + css(EP) + ', ' + css(EP), 's=multiple absent L0:EP L:EP Q:EP T:EU écran ' + [EP, EP, EP].map(css).join(', ')];
  R.ok(tj.join(' | ') === TJ.join(' | '),
    'd20 témoin (les deux versions) : trop-plein parti du sommet où arrive le tuyau du WC vers une boîte EP, WC relié directement ou par une fosse '
    + 'septique : avant le drain, source « multiple », tuyaux verts sans entrée dans an.eauxPieces (obtenu ' + tj.join(' | ') + ')');
  /* témoins (les deux versions) : WC vers le drain, qui atteint au-delà de lui un collecteur EU (trop-plein Q de son dernier sommet) :
     « plusieurs réseaux », comme avant ; bifurcation avant le drain (raccord K, puis tuyau N vers une boîte EP) : verts, comme avant ;
     descente reliée au même tuyau L, par un regard (dde) : L, sa pièce commune L:1 et le tuyau M verts ; la pièce du WC, L:0, verte
     sur 9142f36, est rouge depuis m166 (contrôle (d) ci-dessous) */
  const fm = f => auDela('J2', [['J2', 'jonction', 10, 0], ['K', 'jonction', 20, 0]], [['Q', 'tr', '', '', ['J2', 'K']], ['C', 'col', 'EU', '', [[20, -5], 'K', [20, 5]]]], f);
  const dbi = doc({o: [['s', 'wc', 0, 8], ['K', 'jonction', 0, 4], ['B', 'boite', -6, 4, {res: 'EP'}], ['J', 'jonction', 0, 0], ['B2', 'boite', 10, 0, {res: 'EP'}]],
    l: [['L', 'tr', '', '', ['s', 'K']], ['M', 'tr', '', '', ['K', 'J']], ['N', 'tr', '', '', ['K', 'B']], ['T', 'tr', '', '', ['J', [5, 0], 'B2'], 0, INFIL]]});
  const dde = doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 6], ['d', 'descente', 4, 6], ['J', 'jonction', 0, 0], ['B', 'boite', 10, 0, {res: 'EP'}]],
    l: [['L', 'tr', '', '', ['s', 'R', 'J']], ['M', 'tr', '', '', ['d', 'R']], ['T', 'tr', '', '', ['J', [5, 0], 'B'], 0, INFIL]]});
  const tm = [false, true].map(f => { const d = fm(f), an = V.analyser(copie(d), 'edl');
    return rls(d, an, f ? ['L0', 'L'] : ['L']) + ' ' + rmDe(an, 'L:0') + ' écran ' + coulSur(ecran(d, 25, [5, 4]), [0, 8], [0, 0]); });
  const ab = V.analyser(copie(dbi), 'edl'), vb = ecran(dbi, 25, [5, 4]), ad = V.analyser(copie(dde), 'edl'), vd = ecran(dde, 25, [5, 4]);
  const tb = ePcs(ab) + ' ' + rls(dbi, ab, ['L', 'M', 'N']) + ' écran ' + [coulSur(vb, [0, 8], [0, 4]), coulSur(vb, [0, 4], [0, 0]), coulSur(vb, [0, 4], [-6, 4])].join(', ');
  const td = rls(dde, ad, ['L', 'M']) + ' ' + rmDe(ad, 'L:1') + ',' + rmDe(ad, 'M:0') + ' écran ' + [coulSur(vd, [0, 6], [0, 0]), coulSur(vd, [4, 6], [0, 6])].join(', ');
  R.ok(tm.join(' | ') === ['L:MIX', 'L0:MIX L:MIX'].map(z => z + ' MIX écran ' + css(MIX)).join(' | ') && tb === 'absent L:EP M:EP N:EP écran ' + [css(EP), css(EP), css(EP)].join(', ')
    && td === 'L:EP M:EP EP,EP écran ' + css(EP) + ', ' + css(EP),
    'd20 témoins (les deux versions) : collecteur EU au-delà du drain, « plusieurs réseaux » ; bifurcation avant le drain vers une boîte EP : verts, sans entrée '
    + 'dans an.eauxPieces ; descente reliée au tuyau du WC par un regard : tuyau vert, sa pièce commune et le tuyau de la descente verts (obtenu ' + tm.join(' | ')
    + ' | ' + tb + ' | ' + td + ')');
  /* (d) CL1 et CL2 ensemble, le cas (k) de d19 avec une boîte EP au-delà du drain (dde) : sur 9142f36, les deux pièces de L sont vertes
     et la légende n'a que « Canalisation EP » ; depuis m166, la pièce du WC (L:0) est rouge et la légende a aussi « Canalisation EU » */
  const tdd = ePcs(ad) + ' ; ' + rmDe(ad, 'L:0') + ' ; écran ' + coulSur(vd, [0, 12], [0, 6]) + ' ; légende ' + await lignesLg(copie(dde), 'edl');
  R.ok(tdd === '{"L:0":{"EU":1,"EP":0},"L:1":{"EU":1,"EP":1},"M:0":{"EU":0,"EP":1}} ; EU ; écran ' + css(EU) + ' ; légende ' + CEP + ' + ' + CEU,
    'd20 (d) descente reliée au tuyau du WC par un regard, une boîte EP au-delà du drain : la pièce du WC rouge (resMorceau EU, trait ' + css(EU) + ' à l\'écran), '
    + '« ' + CEP + ' » et « ' + CEU + ' » à la légende du plan PDF (v1.7.3 d\'avant m166 : les deux pièces vertes, « ' + CEP + ' » seule ; obtenu ' + tdd + ')');
  /* témoins (les deux versions) : rejets (résultat des sources, avec ce qu'elles atteignent au-delà du drain), réseau des pièces
     (resPiece) et eaux des drains (an.eauxDrains) ; avec et sans an.eauxPieces, mêmes anomalies, conclusion, constat déduit et boîtes
     du constat */
  const EPD = '{"res":"EP","deduit":true,"nets":["EP"],"contredit":false}', MXD = '{"res":"MIX","deduit":true,"nets":["EU","EP"],"contredit":false}';
  const D1 = '{"T":{"EU":1,"EP":0}}', LOT = [];
  AU.forEach(([n, fab], i) => [false, true].forEach(f => LOT.push([n + (f ? ' (fosse)' : ''), fab(f), 's=ok:DISP>' + ['EP', 'EP', 'INF', 'PUITS', 'SOL', 'EP'][i] + ' ' + D1, {}])));
  [false, true].forEach(f => LOT.push(['collecteur EU au-delà' + (f ? ' (fosse)' : ''), fm(f), 's=ok:DISP>EU ' + D1, {'L0:0': MXD, 'L:0': MXD, 'Q:0': MXD}]));
  LOT.push(['bifurcation', dbi, 's=multiple ' + D1, {}], ['descente', dde, 's=ok:DISP>EP d=ok:DISP>EP {"T":{"EU":1,"EP":1}}', {}], ['regard sur le tuyau', dr1, 's=ok:DISP>EP ' + D1, {}],
    ['regard sur le drain', dr2, 's=ok:DISP>EP ' + D1, {}]);
  const ec = [];
  LOT.forEach(([n, x, o, exc]) => {
    const a = V.analyser(copie(x), 'edl'), a0 = Object.assign({}, a); delete a0.eauxPieces;
    const lu = b => sur(() => { const L = V.anomaliesDoc(copie(x), b); return JSON.stringify([L, V.conclusion(L, b), V.constatDeduit(copie(x), b), V.boitesConstat(copie(x), b)]); });
    const pOk = a.pieces.every(p => JSON.stringify(a.resPiece[p.id]) === (exc[p.id] || EPD));
    if (!pOk || sigOA(a) + ' ' + eaux(a) !== o || lu(a) !== lu(a0) || /^exception/.test(lu(a))) ec.push(n + ' : ' + sigP(a) + ' | ' + sigOA(a) + ' ' + eaux(a) + (lu(a) !== lu(a0) ? ' | diffère sans an.eauxPieces' : ''));
  });
  R.ok(!ec.length, 'd20 témoins (les deux versions) : sur les croquis de CL1, chaque source garde son résultat (et ce qu\'elle atteint au-delà du drain), chaque '
    + 'pièce resPiece, le drain an.eauxDrains ; avec et sans an.eauxPieces, mêmes anomalies, conclusion, constat déduit et boîtes du constat'
    + (ec.length ? ' (écarts : ' + ec.join(' ; ') + ')' : ''));
  /* CL2 : un tuyau dont une pièce est dessinée en rouge (resMorceau) sans être EU dans l'analyse a la ligne de chaque couleur que
     dessinent ses pièces. WC s → regard R → J, 1er sommet du drain, → bout libre : les deux premières pièces rouges, la 3e verte
     (aucune eau n'y passe) ; resLigne EU ; tuyau tracé du WC au bout libre, ou à l'envers */
  const dB = (inv, st) => doc({o: [['s', 'wc', 0, 8], ['R', 'regard', 0, 4], ['J', 'jonction', 0, 0]],
    l: [['L', 'tr', '', st || '', inv ? [[0, -3], 'J', 'R', 's'] : ['s', 'R', 'J', [0, -3]]], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const lb = [];
  for (const inv of [false, true]){
    const d = dB(inv), a = V.analyser(copie(d), 'edl'), vu = ecran(d, 40, [5, 3]);
    lb.push(a.pieces.filter(p => p.l.id === 'L').map(p => sur(() => V.resMorceau(p, a))).join(',') + ' ; ' + rls(d, a, ['L', 'T']) + ' ; écran ' + coulSur(vu, [0, 8], [0, 4]) + ', '
      + coulSur(vu, [0, 0], [0, -3]) + ' ; légende ' + await lignesLg(d, 'edl'));
  }
  const LB = ['EU,EU,EP', 'EP,EU,EU'].map(z => z + ' ; L:EU T:EU ; écran ' + css(EU) + ', ' + css(EP) + ' ; légende ' + CEU + ' + ' + CEP);
  R.ok(lb.join(' | ') === LB.join(' | '),
    'd20 CL2 tuyau rouge (resLigne EU) dont la dernière pièce, verte, ne porte aucune eau : la légende du plan PDF a « ' + CEU + ' » et « ' + CEP + ' », dans les '
    + 'deux sens du tracé (v1.7.3 d\'avant m166 : pas de ligne EP ; obtenu ' + lb.join(' | ') + ')');
  /* témoins (les deux versions) : tuyau rouge de bout en bout (EU seul) ; tuyau resté vert dont une pièce est rouge, comme (k) de d19,
     dans les deux sens du tracé (EP et EU) ; au plan d'avant-projet, un tuyau « à supprimer », dessiné d'une seule couleur (celle de
     l'état des lieux, an.ref), à l'écran comme au plan PDF, a la ligne de cette couleur : (a) le tuyau de CL2, rouge ; (b) celui de
     (k), vert, sans ligne EU */
  const dK = (inv, st) => doc({o: [['s', 'wc', 0, 12], ['R', 'regard', 0, 6], ['d', 'descente', 4, 6], ['J', 'jonction', 0, 0]],
    l: [['L', 'tr', '', st || '', inv ? ['J', 'R', 's'] : ['s', 'R', 'J']], ['M', 'tr', '', '', ['d', 'R']], ['T', 'tr', '', '', ['J', [10, 0]], 0, INFIL]]});
  const lt = [await lignesLg(wcD(), 'edl'), await lignesLg(dK(false), 'edl'), await lignesLg(dK(true), 'edl')];
  R.ok(lt.join(' | ') === [CEU, CEP + ' + ' + CEU, CEP + ' + ' + CEU].join(' | '),
    'd20 CL2 témoins (les deux versions) : tuyau rouge de bout en bout, « ' + CEU + ' » seule ; tuyau vert dont une pièce est rouge, « ' + CEP + ' » et « ' + CEU
    + ' », dans les deux sens du tracé (obtenu ' + lt.join(' | ') + ')');
  const sa = [], SA = [];
  for (const [d, segs, np, m, c, att] of [[dB(false, 'supprimer'), [[0, 8], [0, 4], [0, 0], [0, -3]], 4, 11, EU, CEU + ' + ' + CEP],
    [dK(false, 'supprimer'), [[0, 12], [0, 6], [0, 0]], 3, 12, EP, CEP + ' + Réseau non déterminé']]){
    const vu = ecranAvp(d, 40, [5, 4]), rq = await pdf(Object.assign(copie(d), {echelle: 200}), {mode: 'avp'});
    const fq = rq.formes.filter(q => q.pts.length === np && Math.abs(lgF(q.pts) - m * 5) < 1e-6).map(q => q.coul).join('/') || 'aucune forme';
    sa.push('écran ' + segs.slice(1).map((b, i) => coulSur(vu, segs[i], b)).join(', ') + ' ; PDF ' + fq + ' ; légende ' + await lignesLg(d, 'avp')
      + (rq.err.length ? ' ' + rq.err.join(' | ') : ''));
    SA.push('écran ' + segs.slice(1).map(() => css(c)).join(', ') + ' ; PDF ' + c + ' ; légende ' + att);
  }
  R.ok(sa.join(' | ') === SA.join(' | '),
    'd20 CL2 témoins (les deux versions) : au plan d\'avant-projet, un tuyau « à supprimer » est dessiné d\'une seule couleur (celle de l\'état des lieux), avec '
    + 'la ligne de cette couleur à la légende : (a) le tuyau de CL2, rouge ; (b) celui de (k) de d19, vert, sans ligne EU (obtenu ' + sa.join(' | ') + ')');
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
    await dispersionCollecte();
    await auDelaDrain();
    await eauxDrain();
    await tuyauVersDrain();
    await tuyauAuDelaDrain();
  } catch (e){ R.ok(false, 'exception : ' + (e && e.stack || e)); }
  R.fin();
})();
