import type { LinksFunction } from "@remix-run/node";

import ReactJsonSSR from "react-json-view-ssr"

import { JsonView } from 'react-json-view-lite';
import jsonViewCss from 'react-json-view-lite/dist/index.css';

import { cssBundleHref } from "@remix-run/css-bundle";


export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }, { rel: "stylesheet", href: jsonViewCss }]
      : []),
    // ...
  ];
};

const App = () => {
  const packageJson = {
    name: "remix-antd-admin",
    version: "0.0.1",
    description: "A Remix Antd Admin",
    keywords: [
      "remix",
      "admin",
      "echarts",
      "i18n",
      "react-mindmap",
      "react-wordcloud",
      "reactflow",
      "echarts-liquidfill-ssr",
      "ssr",
      "copper",
      "prettier",
      "antd",
      "pro-components",
      "antd pro",
    ],
    author: "Magnesium",
    scripts: {
      build: "remix build",
      dev: "remix dev",
      start: "remix-serve build",
      typecheck: "tsc",
      test: "vitest",
      coverage: "vitest run --coverage",
      prettier: "prettier --write app/ public/locales",
      postinstall: "prisma generate",
    },
    dependencies: {
      "@ant-design/cssinjs": "^1.9.1",
      "@ant-design/icons": "^5.0.1",
      "@ant-design/pro-components": "^2.4.14",
      "@ant-design/pro-skeleton": "^2.1.3",
      "@bytemd/plugin-gfm": "^1.21.0",
      "@bytemd/react": "^1.21.0",
      "@remix-run/css-bundle": "^1.16.0",
      "@remix-run/node": "^1.16.0",
      "@remix-run/react": "^1.16.0",
      "@remix-run/serve": "^1.16.0",
      "@tinymce/tinymce-react": "^4.3.0",
      antd: "^5.4.7",
      bcryptjs: "^2.4.3",
      bytemd: "^1.21.0",
      "china-division": "^2.6.1",
      "cross-env": "^7.0.3",
      echarts: "^5.4.2",
      "echarts-for-react": "^3.0.2",
      "echarts-liquidfill-ssr": "^3.1.0",
      i18next: "^22.4.15",
      "i18next-browser-languagedetector": "^7.0.1",
      "i18next-fs-backend": "^2.1.1",
      "i18next-http-backend": "^2.2.0",
      isbot: "^3.6.10",
      react: "^18.2.0",
      "react-advanced-cropper": "^0.18.0",
      "react-dom": "^18.2.0",
      "react-i18next": "^12.2.2",
      "react-json-view": "^1.21.3",
      "react-mindmap": "^2.1.6",
      "react-wordcloud": "^1.2.7",
      reactflow: "^11.7.0",
      "remix-auth": "^3.4.0",
      "remix-auth-form": "^1.3.0",
      "remix-i18next": "^5.1.1",
    },
    devDependencies: {
      "@remix-run/dev": "^1.16.0",
      "@remix-run/eslint-config": "^1.16.0",
      "@types/bcryptjs": "^2.4.2",
      "@types/node": "^18.16.6",
      "@types/react": "^18.2.6",
      "@types/react-dom": "^18.2.4",
      eslint: "^8.40.0",
      prettier: "^2.8.8",
      prisma: "4.13.0",
      "ts-node": "^10.9.1",
      "tsconfig-paths": "^4.2.0",
      typescript: "^4.9.5",
      vitest: "^0.30.1",
    },
    engines: {
      node: ">=14",
    },
    pnpm: {
      peerDependencyRules: {
        ignoreMissing: ["react"],
      },
    },
    repository: {
      type: "git",
      url: "https://github.com/yyong008/remix-antd-admin.git",
    },
    prisma: {
      seed: "ts-node --require tsconfig-paths/register prisma/seed.ts",
    },
  };

  return <JsonView data={packageJson} />
};

export default App;
