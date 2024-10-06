/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: !!process.env.CI ? undefined : "standalone",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  transpilePackages: ["geist", "lucide-react"],
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

export default config;
