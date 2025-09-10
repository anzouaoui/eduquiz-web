import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 🚫 Évite d'utiliser webpack custom si tu build avec Turbopack (voir point 2)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src"),
    };
    return config;
  },

  // ✅ Ne PAS bloquer le build sur ESLint (les erreurs resteront visibles en dev)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Continuer à bloquer sur les erreurs TypeScript (bon réflexe)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
