import type { CodegenConfig } from "@graphql-codegen/cli";

/* Ce fichier dit à GraphQL Codegen d’utiliser le schéma exposé sur http://backend:3000/, de lire les requêtes dans operations.ts, et de générer des types + hooks Apollo React dans graphql-types.ts. */

const config: CodegenConfig = {
  schema: "http://localhost:5050", // => URL du serveur GRAPHQL, "backend" = nom du service docker compose
  documents: ["src/graphql/operations.ts"], // => Fichier où se trouvent les requêtes et mutations GraphQL.
  overwrite: true, // => Autorise la génération à écraser les fichiers existants
  generates: {
    "./src/generated/graphql-types.ts": {
      // => Fichier de sortie qui contiendra tous les types TypeScript + hooks Apollo.
      plugins: [
        "typescript", // => génère les types GraphQ
        "typescript-operations", // => génère les types pour tes requêtes/mutations
        "typescript-react-apollo", // => génère des hooks React (useQuery, useMutation)
      ],
      config: {
        withHooks: true, // => Génère automatiquement les React hooks (par exemple useCreateCategoryMutation())
      },
    },
  },
};
export default config;
