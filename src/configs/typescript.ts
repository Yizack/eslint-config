import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const typescript = async (): Promise<ConfigWithExtends> => {
  const [
    parserTypescript,
    pluginTypescript
  ] = await Promise.all([
    import("@typescript-eslint/parser").then(mod => mod.default),
    import("@typescript-eslint/eslint-plugin").then(mod => mod.default)
  ]);

  const config: ConfigWithExtends = {
    plugins: {
      // @ts-expect-error typescript plugin
      "@typescript-eslint": pluginTypescript
    },
    languageOptions: {
      parser: parserTypescript
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-unused-vars": "error"
    }
  };

  return config;
};
