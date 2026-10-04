import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain HTML/CSS/JS into out/ so Catalyst Slate can host it.
  output: "export",
  // /dashboard/ -> out/dashboard/index.html, which any static host can serve
  trailingSlash: true,
};

export default nextConfig;
