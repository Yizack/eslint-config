import type { ConfigWithExtends } from "eslint-flat-config-utils";

// Inspired by https://github.com/nuxt/eslint/blob/main/packages/eslint-config/src/configs/javascript.ts
export const javascript = async (): Promise<ConfigWithExtends> => {
  const [
    { default: pluginESLint },
    { default: globals }
  ] = await Promise.all([
    import("@eslint/js"),
    import("globals")
  ]);

  const config: ConfigWithExtends = {
    ...pluginESLint.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: "module"
      },
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
        defineNuxtConfig: "readonly"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      "camelcase": ["error", { properties: "never", ignoreDestructuring: true }],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      // From: https://github.com/nuxt/eslint/blob/main/packages/eslint-config/src/configs/typescript.ts
      "constructor-super": "off", // ts(2335) & ts(2377)
      "getter-return": "off", // ts(2378)
      "no-const-assign": "off", // ts(2588)
      "no-dupe-args": "off", // ts(2300)
      "no-dupe-class-members": "off", // ts(2393) & ts(2300)
      "no-dupe-keys": "off", // ts(1117)
      "no-func-assign": "off", // ts(2539)
      "no-import-assign": "off", // ts(2539) & ts(2540)
      "no-new-symbol": "off", // ts(7009)
      "no-obj-calls": "off", // ts(2349)
      "no-redeclare": "off", // ts(2451)
      "no-setter-return": "off", // ts(2408)
      "no-this-before-super": "off", // ts(2376)
      "no-undef": "off", // ts(2304)
      "no-unreachable": "off", // ts(7027)
      "no-unsafe-negation": "off", // ts(2365) & ts(2360) & ts(2358)
      "no-var": "error", // ts transpiles let/const to var, so no need for vars any more
      "prefer-const": "error", // ts provides better types with const
      "prefer-rest-params": "error", // ts provides better types with rest args over arguments
      "prefer-spread": "error", // ts transpiles spread to apply, so no need for manual apply
      "valid-typeof": "off", // ts(2367)
      "no-unused-vars": "off" // ts takes care of this
    }
  };

  return config;
};
