import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // Ajout de l'import

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // On dit à Lovable d'ajouter le plugin Nitro pour Vercel
  vite: {
    plugins: [
      nitro({ preset: "vercel" }), // Force la configuration pour Vercel
    ],
  },
});