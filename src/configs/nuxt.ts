import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const nuxt = async (): Promise<ConfigWithExtends> => {
  const pluginNuxt = await import("@nuxt/eslint-plugin").then(mod => mod.default);

  const config: ConfigWithExtends = {
    plugins: {
      nuxt: pluginNuxt
    },
    rules: {
      "nuxt/prefer-import-meta": "error"
    }
  };

  return config;
};
