import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "Veterinaria"; // Cambiar si el nombre del repo es diferente

const nextConfig: NextConfig = {
  // Exportación estática para GitHub Pages
  output: "export",
  
  // Base path para GitHub Pages (usuario.github.io/repo-name)
  basePath: isProd ? `/${repoName}` : "",
  
  // Asset prefix para recursos estáticos
  assetPrefix: isProd ? `/${repoName}/` : "",
  
  // Generar trailing slash para compatibilidad
  trailingSlash: true,
  
  // Desactivar optimización de imágenes (no soportada en export estático)
  images: {
    unoptimized: true,
  },
  
  // Configuración de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Configuración de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
