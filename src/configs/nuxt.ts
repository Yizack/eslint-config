import type { ConfigWithExtends } from "eslint-flat-config-utils";

const src = [".", "./app"]; // Support both Nuxt 3 and 4 conventions by default

const dirs = {
  root: src,
  src,
  pages: src.map(src => `${src}/pages`),
  layouts: src.map(src => `${src}/layouts`),
  components: src.map(src => `${src}/components`),
  composables: src.map(src => `${src}/composables`),
  plugins: src.map(src => `${src}/plugins`),
  modules: src.map(src => `${src}/modules`),
  middleware: src.map(src => `${src}/middleware`),
  servers: src.map(src => `${src}/servers`),
  componentsPrefixed: []
};

const exts = "{js,ts,jsx,tsx,vue}";

export const nuxt = async (): Promise<ConfigWithExtends[]> => {
  const [
    { default: pluginNuxt },
    { join }
  ] = await Promise.all([
    import("@nuxt/eslint-plugin"),
    import("pathe")
  ]);

  const fileSingleRoot = [
    ...(dirs.layouts?.map(layoutsDir => join(layoutsDir, `**/*.${exts}`)) || []),
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${exts}`)) || []),
    ...(dirs.components?.map(componentsDir => join(componentsDir, `**/*.server.${exts}`)) || [])
  ].sort();

  const configs: ConfigWithExtends[] = [];

  configs.push({
    plugins: {
      nuxt: pluginNuxt
    },
    languageOptions: {
      globals: {
        $fetch: "readonly"
      }
    },
    rules: {
      "nuxt/prefer-import-meta": "error"
    }
  });

  if (fileSingleRoot.length) {
    configs.push({
      name: "nuxt/vue/single-root",
      files: fileSingleRoot,
      rules: {
        "vue/no-multiple-template-root": "error"
      }
    });
  }

  const fileRoutes = [...new Set([
    // These files must have one-word names as they have a special meaning in Nuxt.
    ...dirs.src.flatMap(layersDir => [
      join(layersDir, `app.${exts}`),
      join(layersDir, `error.${exts}`)
    ]) || [],

    // Layouts and pages are not used directly by users so they can have one-word names.
    ...(dirs.layouts.map(layoutsDir => join(layoutsDir, `**/*.${exts}`)) || []),
    ...(dirs.pages.map(pagesDir => join(pagesDir, `**/*.${exts}`)) || []),

    // These files should have multiple words in their names as they are within subdirectories.
    ...(dirs.components.map(componentsDir => join(componentsDir, "*", `**/*.${exts}`)) || []),
    // Prefixed components can have one-word names in file
    ...(dirs.componentsPrefixed.map(componentsDir => join(componentsDir, `**/*.${exts}`)) || [])
  ])].sort();

  if (fileRoutes.length) {
    configs.push({
      name: "nuxt/vue/routes",
      files: fileRoutes,
      rules: {
        "vue/multi-word-component-names": "off"
      }
    });
  }

  configs.push({
    name: "nuxt/rules",
    rules: {
      "nuxt/prefer-import-meta": "error"
    }
  });

  const filePages = [
    ...(dirs.pages?.map(pagesDir => join(pagesDir, `**/*.${exts}`)) || [])
  ].sort();

  if (filePages.length) {
    configs.push({
      name: "nuxt/pages",
      files: filePages,
      rules: {
        "nuxt/no-page-meta-runtime-values": "error"
      }
    });
  }

  configs.push({
    name: "nuxt/nuxt-config",
    files: [
      "**/.config/nuxt.?([cm])[jt]s?(x)",
      "**/nuxt.config.?([cm])[jt]s?(x)"
    ],
    rules: {
      "nuxt/no-nuxt-config-test-key": "error"
    }
  });

  configs.push({
    name: "nuxt/sort-config",
    files: [
      "**/.config/nuxt.?([cm])[jt]s?(x)",
      "**/nuxt.config.?([cm])[jt]s?(x)"
    ],
    rules: {
      "nuxt/nuxt-config-keys-order": "error"
    }
  });

  return configs;
};
