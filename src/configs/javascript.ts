import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const javascript = (): ConfigWithExtends => {
  const config: ConfigWithExtends = {
    rules: {
      "camelcase": ["error", { properties: "never", ignoreDestructuring: true }],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "no-unused-vars": "off"
    }
  };

  return config;
};
