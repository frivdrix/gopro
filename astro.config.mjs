// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import wix from "@wix/astro";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import vercel from "@astrojs/vercel"; // ✅ correct import (no /serverless)

// import monitoring from "@wix/monitoring-astro"; // optional, disable for Vercel builds

const isBuild = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({ runtime: "nodejs" }), // ✅ compatible with Vercel Node runtime
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `const version = new URLSearchParams(location.search).get('framewire');
               if (version) {
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
    // isBuild ? monitoring() : undefined, // enable only if Wix Cloud monitoring is needed
    react({
      babel: {
        plugins: [sourceAttrsPlugin, dynamicDataPlugin],
      },
    }),
  ],
  vite: {
    plugins: [],
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
