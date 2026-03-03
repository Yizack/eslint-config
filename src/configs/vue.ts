import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const vue = async (options?: {
  typescript?: boolean;
}): Promise<ConfigWithExtends> => {
  const [
    pluginVue,
    parserVue
  ] = await Promise.all([
    import("eslint-plugin-vue").then(mod => mod.default),
    import("vue-eslint-parser").then(mod => mod.default)
  ]);

  const config: ConfigWithExtends = {
    plugins: {
      vue: pluginVue
    },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: options?.typescript? await import("@typescript-eslint/parser").then(mod => mod.default) : null,
        sourceType: "module"
      }
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["flat/recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/strongly-recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/essential"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {})
    }
  };

  return config;
};
