/* Ma progression (progression.html) : garder, déplacer et relier sa progression — textes en français.
   Une autre langue = locales/<langue>/progression.js, mêmes clés. */
(function (root) {
  const T = {
    "page.title": "Ma progression",
    "h1": "Ma progression",
    "lede": "Vos étapes acquises et la notion choisie sur l'Atlas restent dans ce navigateur. Aucun compte, aucun serveur. Pour les retrouver ailleurs, téléchargez-les dans un fichier, ou reliez-les à votre compte GitHub.",
    "head.parcours": "Le parcours",
    "ici.h2": "Dans ce navigateur",
    "ici.acquis": "Étapes acquises",
    "ici.choix": "Notion à voir ensuite",
    "ici.aucun": "aucune",
    "exporter": "Télécharger le fichier",
    "importer": "Charger un fichier",
    "importer.ok": "Fichier chargé : sa progression s'ajoute à celle-ci, sans jamais baisser un résultat.",
    "importer.ko": "Ce fichier n'est pas une progression de ce cours : rien n'a changé.",
    "gist.h2": "Sur votre compte GitHub (facultatif)",
    "gist.p1": "Le site range votre progression dans un Gist privé de votre compte, et la retrouve depuis un autre navigateur. Il faut un jeton d'accès personnel : sur GitHub, Settings › Developer settings › Personal access tokens › Fine-grained tokens, avec la seule permission de compte « Gists : Read and write ». Collez-le ici une fois par navigateur.",
    "gist.risque": "Le jeton reste dans ce navigateur. Il ne donne accès qu'à vos Gists, mais quiconque utilise ce navigateur peut le lire : ne le collez pas sur un ordinateur partagé, et révoquez-le sur GitHub si besoin.",
    "gist.jeton": "Jeton d'accès personnel",
    "gist.lier": "Relier à GitHub",
    "gist.lie": "Reliée : chaque enregistrement part aussi vers votre Gist, et chaque page le relit à l'ouverture.",
    "gist.synchro": "Synchroniser maintenant",
    "gist.delier": "Délier ce navigateur",
    "gist.attente": "Échange avec GitHub…",
    "gist.ok": "À jour : ce navigateur et votre Gist ont la même progression.",
    "gist.delie": "Ce navigateur a oublié le jeton. Votre Gist reste sur GitHub.",
    "gist.erreur.format": "Ce n'est pas un jeton GitHub : il commence par « github_pat_ » ou « ghp_ ».",
    "gist.erreur.jeton": "GitHub refuse ce jeton : il est expiré, révoqué ou mal copié.",
    "gist.erreur.droits": "Ce jeton n'a pas le droit d'écrire vos Gists : donnez-lui « Gists : Read and write ».",
    "gist.erreur.stockage": "Ce navigateur refuse de garder des données : impossible de retenir le lien.",
    "gist.erreur.reseau": "GitHub ne répond pas. Votre progression reste dans ce navigateur ; réessayez plus tard.",
  };
  if (typeof module !== "undefined" && module.exports) module.exports = T;
  else { root.LOCALES = root.LOCALES || {}; root.LOCALES.fr = Object.assign(root.LOCALES.fr || {}, T); }
})(typeof self !== "undefined" ? self : this);
