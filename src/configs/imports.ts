import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const imports = async (): Promise<ConfigWithExtends> => {
  const pluginImport = await import("eslint-plugin-import-x").then(mod => mod.default);

  const config: ConfigWithExtends = {
    plugins: {
      // @ts-expect-error import plugin
      import: pluginImport
    },
    rules: {
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-self-import": "error",
      "import/order": "error",
      "import/newline-after-import": ["error", { count: 1 }]
    }
  };

  return config;
};
