# Site Agence Barthélemy — paquet de déploiement

Site statique (HTML/CSS/JS). Aucun build, aucune dépendance à installer.

## Contenu
- `index.html` — la page (FR/EN via le bouton du header)
- `support.js` — moteur de rendu (à garder à côté de index.html)
- `assets/` — logos, photos, miniatures

## Déploiement
Déposer tout le dossier tel quel à la racine de l'hébergement (ex. IONOS `htdocs/`).
`index.html` doit rester à la racine, `support.js` et `assets/` à côté.

## Dépendances externes (chargées en ligne, rien à héberger)
- Vidéos : Vimeo (player + showcases)
- Prise de rendez-vous : Calendly (iframe)
- Police : Google Fonts (Be Vietnam Pro)
- Une miniature de réalisation (OLAC) : vumbnail.com

## À finaliser côté technique (hors design)
- Le formulaire de contact affiche un message mais n'envoie pas d'email : brancher un service (Formspree, backend, etc.) ou retirer le formulaire au profit du seul Calendly.
- SEO : le bilingue se fait sur une seule page (bouton FR/EN). Pour des URL /fr et /en distinctes + hreflang complet, prévoir une étape ultérieure.
- Remplacer l'image Open Graph (placeholder) si besoin de partage social.
