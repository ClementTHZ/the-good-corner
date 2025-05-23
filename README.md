ℹ️ Etape de mise en place de docker avec docker compose:

🧱 Structure de projet typique :

    THE-GOOD-CORNER/

├── backend/ # Monon serveur Node.js
│ ├── Dockerfile
│ └── ...
├── frontend/ # Mon app React
│ ├── Dockerfile
│ └── ...
├── compose.dev.yaml
└── README.md

1. Créer un Dockerfile pour le backend Node.js
2. Créer un Dockerfile pour le frontend React
3. Créer un docker-compose.yml à la racine
4. Lancer les containers
   docker compose -f compose.dev.yaml up -d --build (-d si on souhaite avoir la main sur le terminal)
