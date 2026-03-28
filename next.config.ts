import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Cloudflare Pages, usamos o adaptador @cloudflare/next-on-pages
  // O build é feito com 'next-on-pages' não com 'next build' diretamente

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // Configurações para funcionar no edge runtime
  experimental: {
    // Necessário para Cloudflare Pages
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
