# Portfolio de Gérard Wilfried BIHINA (Winix)

Site statique : HTML, CSS et JavaScript, sans outil à installer.

## Voir le portfolio sur ton ordinateur

Double-clique sur `index.html` : il s'ouvre dans ton navigateur.

## Organisation

| Fichier / dossier | Contenu |
|---|---|
| `index.html` | Tout le texte du portfolio (à modifier ici) |
| `css/style.css` | Les couleurs, la mise en page, les animations |
| `js/main.js` | Les animations : texte qui s'écrit, compteurs, galerie, menu téléphone |
| `images/` | Ta photo, les captures de NOVAIA, l'icône de l'onglet |

## Modifier quelque chose

- **Un texte** : ouvre `index.html` dans VS Code, cherche le texte (Ctrl + F) et remplace-le.
- **Les métiers qui s'écrivent tout seuls** : dans `index.html`, cherche `data-roles`.
- **Les couleurs** : dans `css/style.css`, tout en haut (`--turquoise`, `--bleu`…).
- **Ta photo** : remplace `images/wilfried.jpg` par une autre photo carrée, avec le même nom.

## Français / anglais

- Le **français** est écrit dans `index.html`, l'**anglais** dans `js/traductions.js`.
- Chaque texte traduisible porte une étiquette, par exemple `data-i18n="dispo"`. La traduction anglaise se trouve dans `traductions.js`, à la ligne `dispo: '…'`.
- **Pour modifier un texte**, change-le **aux deux endroits** (français et anglais).
- **Pour ajouter un texte**, mets-lui une nouvelle étiquette `data-i18n="nouveau-nom"` dans `index.html`, puis ajoute `'nouveau-nom': 'English text',` dans `traductions.js`.
- Au premier passage, le site choisit la langue du navigateur du visiteur. Le bouton **FR / EN** permet de changer, et le choix est retenu.
- Pour envoyer directement la version anglaise, ajoute `?lang=en` à la fin de l'adresse (par exemple `https://ton-pseudo.github.io/?lang=en`).

## La vidéo de NOVAIA

- `videos/novaia-demo.mp4` (56 secondes) et son image d'aperçu `videos/novaia-demo-apercu.jpg`.
- Elle a été filmée automatiquement sur un NOVAIA de démonstration séparé (compte fictif « Wilfried », aucune vraie donnée).
- Elle ne se charge que lorsque le visiteur clique sur ▶, pour que le site reste rapide.

## La vidéo de Sharingan

- `videos/sharingan-demo.mp4` (français) et `videos/sharingan-demo-en.mp4` (anglais), 50 secondes chacune, avec l'aperçu `videos/sharingan-demo-apercu.jpg`.
- C'est un montage animé fait à partir des vraies photos et captures du projet (Packet Tracer, poste de travail, testeur de câbles, portail captif, forfaits).
- Le site choisit automatiquement la version qui correspond à la langue affichée.

## La musique des vidéos

- Les deux vidéos ont une petite musique de fond **originale**, composée note par note par programme (pas de chanson existante, donc aucun problème de droits d'auteur).
- NOVAIA : style « tech », lumineux et calme. Sharingan : style plus intense, en mineur.
- La musique monte doucement au début et descend à la fin.

## Le CV

- Le portfolio propose `cv/CV-Wilfried-BIHINA.pdf` (français) et `cv/CV-Wilfried-BIHINA-EN.pdf` (anglais), **sans numéro de téléphone**.
- Le CV se modifie dans le dossier `Documents\CV-Winix` : change le texte dans `cv.html`, puis clic droit sur `fabriquer-cv.ps1` > « Exécuter avec PowerShell ». Les PDF sont refaits.
- Les versions **avec ton numéro** (à envoyer directement aux recruteurs) sont dans `Documents\CV-Winix`. Ne les mets pas dans ce dossier.

## Le portfolio en ligne

- Adresse : **https://prowinix-dev.github.io** (version anglaise : `https://prowinix-dev.github.io/?lang=en`).
- Hébergé gratuitement par GitHub Pages, sur le dépôt `prowinix-dev/prowinix-dev.github.io`. Il reste en ligne 24 h/24, même ordinateur éteint.

## Mettre à jour le site après une modification

1. Modifie les fichiers de ce dossier.
2. Double-clique sur **`publier`**.
3. Le site en ligne est à jour 1 à 2 minutes plus tard (actualise la page avec Ctrl + F5).

Les fichiers listés dans `.gitignore` (ancienne photo, etc.) restent sur l'ordinateur et ne sont jamais publiés.
