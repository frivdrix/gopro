// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import wix from "@wix/astro";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import vercel from "@astrojs/vercel/serverless";

// Try enabling later once deploy is green:
// import monitoring from "@wix/monitoring-astro";

const isBuild = process.env.NODE_ENV === "production";

/** @type {import('vite').Plugin | null} */
let errorOverlayPlugin = null;
try {
  // Only require the file in dev to avoid bundling/exec at build time
  if (!isBuild) {
    // eslint-disable-next-line import/no-unresolved
    const mod = await import("./vite-error-overlay-plugin.js");
    errorOverlayPlugin = mod.default ? mod.default() : mod();
  }
} catch (_) {
  // ignore if file not present
}

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `const version = new URLSearchParams(location.search).get('framewire');
               if (version){
                 const localUrl = 'http://localhost:3202/framewire/index.mjs';
                 const cdnUrl = \`https://static.parastorage.com/services/framewire/\${version}/index.mjs\`;
                 const url = version === 'local' ? localUrl : cdnUrl;
                 const framewireModule = await import(url);
                 globalThis.framewire = framewireModule;
                 framewireModule.init({}, import.meta.hot);
                 console.log('Framewire initialized');
               }`
            );
          }
        },
      },
    },
    tailwind(),
    wix({
      enableHtmlEmbeds: isBuild,
      enableAuthRoutes: true,
    }),
    // isBuild ? monitoring() : undefined, // ⬅️ temporarily disabled for Vercel
    react({ babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] } }),
  ],
  vite: {
    plugins: [
      // only include the overlay plugin in dev
      ...(errorOverlayPlugin ? [errorOverlayPlugin] : []),
    ],
  },
  devToolbar: { enabled: false },
  image: { domains: ["static.wixstatic.com"] },
  server: { allowedHosts: true, host: true },
});
