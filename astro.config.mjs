import { defineConfig } from "astro/config";
import vercelServerless from "@astrojs/vercel/serverless";
import vercelStatic from "@astrojs/vercel/static";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: vercelServerless(),
});