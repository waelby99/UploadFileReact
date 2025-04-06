# 🧾 PDF Uploader Frontend - React + Vite + TailwindCSS

Ce projet frontend permet d’uploader, prévisualiser et télécharger des fichiers PDF via une API backend Node.js/Express.

---

## 🚀 Fonctionnalités

- 📤 Upload de fichiers PDF
- 👁️ Prévisualisation directe dans le navigateur
- ⬇️ Téléchargement des fichiers PDF
- 🔁 Récupération automatique de la liste des fichiers
- 🧼 Interface propre et responsive avec **TailwindCSS**

---

## ⚙️ Technologies & Bibliothèques utilisées

- **React** (via [Vite](https://vitejs.dev/))
- **TailwindCSS** (utilisé pour le design et la mise en page)
- **Axios** : pour les appels HTTP à l’API backend
- **Buffer** : nécessaire pour gérer les blobs de type `PDF`
- **Blob / URL.createObjectURL** : pour générer une URL de prévisualisation à partir des données binaires

---

## 📦 Installation du projet

1. Clone le repo :

```bash
git clone https://github.com/waelby99/UploadFileReact.git
cd UploadFileReact
```

2. Installe les dépendances :

```bash
npm install
```

3. Lance le projet localement :

```bash
npm run dev
```

4. Assure-toi que le backend tourne sur `http://localhost:5000`

---

## 🖼️ Aperçu de l’interface

- Formulaire d’upload de fichier PDF (avec titre)
- Liste des documents PDF existants
- Bouton de prévisualisation (iframe)
- Bouton de téléchargement

---

## 📁 Structure de base (src)

```
src/
├── App.jsx          # Composant principal
├── main.jsx         # Point d’entrée
├── index.css        # Intègre TailwindCSS
└── ...
```

---

## 🧑‍🔧 Configuration Tailwind avec Vite

Le projet est initialisé avec :

```bash
npm create vite@latest my-project --template react
cd my-project
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Et la configuration dans `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Ajoute les directives suivantes dans `index.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧪 Dépendances principales

```json
"dependencies": {
  "axios": "^1.x.x",
  "buffer": "^6.x.x",
  "react": "^18.x.x",
  "react-dom": "^18.x.x"
}
```

---

## 🔗 API Backend utilisée

Assure-toi d’avoir une API backend en Node.js qui expose les routes suivantes :

| Méthode | Route                      | Description               |
|--------:|----------------------------|---------------------------|
| `GET`   | `/get-files`              | Liste de tous les fichiers |
| `POST`  | `/upload-files`           | Upload d’un nouveau fichier |
| `GET`   | `/view-pdf/:id`           | Prévisualiser un PDF     |
| `GET`   | `/download/:id`           | Télécharger un PDF       |

---

## ✅ À faire

- [ ] Gérer les erreurs plus finement (ex: alertes Toast)
- [ ] Ajouter des icônes / animations
- [ ] Support pour d’autres types de documents ?

---

## 📬 Contribuer

Les contributions sont les bienvenues ! Forkez, améliorez, et ouvrez une Pull Request 😄
