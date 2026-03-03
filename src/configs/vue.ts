import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const vue = async (): Promise<ConfigWithExtends> => {
  const pluginVue = await import("eslint-plugin-vue").then(mod => mod.default);

  const config: ConfigWithExtends = {
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["flat/recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/strongly-recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/essential"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {})
    }
  };

  return config;
};
