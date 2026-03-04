import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const typescript = async (): Promise<ConfigWithExtends> => {
  const [
    { default: parserTypescript },
    { default: pluginTypescript }
  ] = await Promise.all([
    import("@typescript-eslint/parser"),
    import("@typescript-eslint/eslint-plugin")
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
      "@typescript-eslint/no-unused-vars": ["error", {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
        varsIgnorePattern: "^_"
      }]
    }
  };

  return config;
};
