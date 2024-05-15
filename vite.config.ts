/// <reference types="vitest" />

import Inspect from 'vite-plugin-inspect'
import dayjs from "dayjs";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import pkg from "./package.json";
import { vitePlugin as remix } from "@remix-run/dev";
import { remixDevTools } from "remix-development-tools";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default defineConfig({
  server: {
    port: 3333,

  },
   ssr: {
    noExternal: [
      "@ant-design/pro-chat",
      "@ant-design/pro-editor",
      "react-intersection-observer",
    ],
    optimizeDeps: {
      include: [
        "@ant-design/icons",
        "@ant-design/pro-chat",
        "@ant-design/pro-editor",
        "react-intersection-observer",
      ],
    },
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  plugins: [
    remixDevTools(),
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    Inspect()
  ],
});
