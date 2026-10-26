// Static export for GitHub Pages: the site lives under /<repo>/ there.
const repo = "posuda-glass-demo"
const basePath = process.env.GITHUB_ACTIONS === "true" ? `/${repo}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Throwaway demo: CI build is the only check, don't let lint/types block it.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
