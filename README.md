## Escape Game API

### Environnement

Renommer le fichier `.env.example` en `.env` pour la production ou `.env.development` pour le dev.

Assurez vous que tout est correcte

### Lancement

Installer les dépendances: `npm i`

**Puis lancer:**
```
npm run start:dev // Pour l'environnement de développement
ou
npm run start:prod // pour la production
```


#### Avec docker

Vous pouvez lancer l'api avec docker:

**Utilisez:**
 `npm run docker:dev`
 ou
 `npm run docker:prod`

> L'exécution en production comprend un conteneur nginx qui fais office de reverse-proxy
