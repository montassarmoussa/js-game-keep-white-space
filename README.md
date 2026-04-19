# 🕹️ JeuxVideOPS — Keep White Space

Projet scolaire **W@C** réalisé par **Moussa Montassar**.

Ce dépôt est un **fork** du jeu JavaScript [`okzaq/js-game-keep-white-space`](https://github.com/okzaq/js-game-keep-white-space) dans lequel j'ai ajouté :

- une **page vitrine** (`site/index.html`) pour présenter le jeu,
- un **pipeline CI/CD** GitHub Actions (lint, audit, tests, notifications Discord + Telegram, déploiement GitHub Pages),
- une **conteneurisation Docker** (Nginx) avec `docker-compose`,
- des **tests unitaires** (Jest) et **end‑to‑end** (Playwright),
- un fichier de **configuration ESLint** pour la qualité du code.

> 🔗 Repo original : <https://github.com/okzaq/js-game-keep-white-space>
> 🔗 Repo du fork : <https://github.com/montassarmoussa/js-game-keep-white-space>

---

## 🧱 Stack technique

| Catégorie | Outil / Techno | Rôle |
|---|---|---|
| **Langages** | HTML5, CSS3, JavaScript (ES6+) | Front‑end et logique du jeu |
| **Framework CSS** | [Tailwind CSS](https://tailwindcss.com) (via CDN `@tailwindcss/browser@4`) | Mise en page et design responsive |
| **Polices** | Google Fonts (`Press Start 2P`, `Merriweather`) | Typographie rétro |
| **Runtime** | Node.js 24 | Exécution des scripts de test et de lint |
| **Tests unitaires** | [Jest](https://jestjs.io/) + `jest-environment-jsdom` | Teste les classes `Vec` et `Position` du jeu |
| **Tests E2E** | [Playwright](https://playwright.dev/) | Simule un navigateur pour tester le jeu en conditions réelles |
| **Lint** | [ESLint](https://eslint.org/) (config Google) | Vérifie la qualité et la cohérence du code |
| **Serveur statique (dev)** | `http-server` | Sert le jeu en local pour Playwright |
| **Conteneurisation** | [Docker](https://www.docker.com/) + `docker-compose` | Isole et déploie l'application |
| **Serveur web (prod)** | [Nginx](https://nginx.org/) | Sert les fichiers statiques dans le container |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Automatise le lint, l'audit et le déploiement |
| **Hébergement** | [GitHub Pages](https://pages.github.com/) | Publie automatiquement le site sur la branche `master` |
| **Notifications** | Discord Webhook + Telegram Bot | Alertes succès / échec du workflow |

---

## 📁 Structure du projet

```
js-game-keep-white-space/
├── .github/
│   └── workflows/
│       └── KeepWhiteSpace.yml     # Pipeline CI/CD (GitHub Actions)
├── site/
│   ├── Dockerfile                 # Image Nginx servant le site
│   ├── docker-compose.yml         # Orchestration du container
│   ├── .dockerignore              # Fichiers exclus de l'image
│   ├── index.html                 # Page d'accueil (vitrine)
│   ├── script.js                  # Animations + ouverture du jeu en iframe
│   ├── style.css                  # Styles personnalisés (parallax, fonts)
│   ├── tailwind.config.js         # Config Tailwind
│   ├── src/
│   │   ├── images/                # Backgrounds, icône
│   │   └── audio/                 # Musique d'ambiance (Donkey Kong Country)
│   └── KeepWhiteSpace/            # Le jeu lui-même (fork upstream)
│       ├── index.html
│       ├── main.js                # Moteur du jeu (Vec, Position, etc.)
│       ├── package.json           # Dépendances Jest / Playwright / ESLint
│       ├── playwright.config.js
│       ├── .eslintrc.json
│       ├── __tests__/main.test.js # Tests unitaires Jest
│       └── e2e/main.spec.js       # Tests E2E Playwright
└── README.md
```

---

## 🚀 Lancement en local

### Option 1 — Docker (recommandé)

Prérequis : [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé.

```bash
cd site
docker compose up --build
```

Le site est ensuite accessible sur **<http://localhost>** (port 80).

Pour arrêter :

```bash
docker compose down
```

### Option 2 — Sans Docker

```bash
cd site/KeepWhiteSpace
npm install
npx http-server ../ -p 8080 -c-1
```

Puis ouvrir **<http://localhost:8080>**.

---

## 🐳 Détails Docker

### `site/Dockerfile`

```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
```

- Base : image officielle **nginx:latest**.
- On copie tout le dossier `site/` dans le répertoire servi par Nginx (`/usr/share/nginx/html`).
- Le port **80** est exposé : c'est le port HTTP par défaut.

### `site/docker-compose.yml`

```yaml
services:
  keep-white-space:
    build: .
    ports:
      - "80:80"
```

- Un seul service : `keep-white-space`.
- `build: .` → construit l'image à partir du `Dockerfile` du dossier courant.
- `ports: "80:80"` → mappe le port 80 de la machine hôte sur le port 80 du container.

### `site/.dockerignore`

Exclut du build de l'image : `node_modules`, `.git`, `.github`, les fichiers Docker eux‑mêmes. Cela réduit la taille de l'image et accélère le build.

---

## ✅ Tests

### Tests unitaires (Jest)

```bash
cd site/KeepWhiteSpace
npm test
```

Ils vérifient le comportement des classes mathématiques du jeu :
- `Vec` — addition, multiplication, produit scalaire, produit vectoriel ;
- `Position` — création et déplacements cumulés ;
- `getTimeStr` — formatage du temps.

### Tests end‑to‑end (Playwright)

```bash
cd site/KeepWhiteSpace
npx playwright test
```

Ils lancent un navigateur sur `http://localhost:8080` et simulent un joueur :
- vérification que la page a bien un titre,
- appui sur `Espace` pour démarrer,
- simulation des touches fléchées,
- vérification que le timer du jeu démarre correctement.

### Lint

```bash
cd site/KeepWhiteSpace
npm run lint
```

ESLint (config Google) vérifie la qualité du code.

---

## ⚙️ Pipeline CI/CD (GitHub Actions)

Fichier : [`.github/workflows/KeepWhiteSpace.yml`](./.github/workflows/KeepWhiteSpace.yml)

**Déclencheurs :** `push` sur toutes les branches et `pull_request` sur `master`.

### Job 1 — `premier-job` (ubuntu-latest)

| Étape | Description |
|---|---|
| `checkout` | Récupère le code du repo |
| `node` | Installe Node.js 24 + cache npm |
| `install` | `npm ci` dans `site/KeepWhiteSpace` |
| `audit` | `npm audit` → vérifie les vulnérabilités |
| `lint` | `npm run lint` (ESLint) |
| `discord` / `discordSucees` | Notification Discord selon succès/échec |
| `telegram` / `telegramSucees` | Notification Telegram selon succès/échec |
| `Retour des résultats` | Écrit un récapitulatif dans le `GITHUB_STEP_SUMMARY` |

### Job 2 — `deploy` (uniquement sur `master`)

Déploie le dossier `site/` sur **GitHub Pages** via `actions/deploy-pages@v4`.

### 🔐 Secrets GitHub nécessaires

À configurer dans *Settings → Secrets and variables → Actions* :

- `WEBHOOK_ID` et `WEBHOOK_TOKEN` — webhook Discord
- `TELEGRAM_ID` et `TELEGRAM_API` — identifiant du chat Telegram et token du bot
- `GIF` — URL d'un GIF affiché dans les messages d'échec

---

## 🎮 Le jeu

**Keep White Space** est un petit jeu JavaScript où le joueur doit… garder l'espace blanc 🙂. Les commandes :

- `Espace` — démarrer,
- `Flèches` — se déplacer.

Le moteur du jeu repose sur des classes mathématiques (`Vec`, `Position`) qui gèrent les vecteurs 2D et les déplacements.

---

## 👤 Auteur

**Moussa Montassar** — étudiant W@C
GitHub : [@montassarmoussa](https://github.com/montassarmoussa)

---

## 📜 Licence

Projet pédagogique. Jeu original sous licence de son auteur ([okzaq](https://github.com/okzaq)).
