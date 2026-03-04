import type { ConfigWithExtends } from "eslint-flat-config-utils";

export const vue = async (options?: {
  typescript?: boolean;
}): Promise<ConfigWithExtends> => {
  const [
    { default: pluginVue },
    { default: parserVue }
  ] = await Promise.all([
    import("eslint-plugin-vue"),
    import("vue-eslint-parser")
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
      },
      globals: {
        computed: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        defineProps: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        reactive: "readonly",
        ref: "readonly",
        shallowReactive: "readonly",
        shallowRef: "readonly",
        toRef: "readonly",
        toRefs: "readonly",
        watch: "readonly",
        watchEffect: "readonly"
      }
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["flat/recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/strongly-recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/essential"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      "vue/component-tags-order": "off",
      "vue/block-order": "warn",
      "vue/first-attribute-linebreak": ["error", { singleline: "ignore", multiline: "ignore" }],
      "vue/max-attributes-per-line": ["error", { singleline: 100 }],
      "vue/singleline-html-element-content-newline": "off",
      "vue/no-multiple-template-root": "off",
      "vue/html-closing-bracket-spacing": ["error", { selfClosingTag: "always" }],
      "vue/html-indent": ["error", 2],
      "vue/multiline-html-element-content-newline": ["error", { ignores: [] }],
      "vue/no-duplicate-class-names": "error",
      "vue/array-bracket-spacing": ["error", "never"],
      "vue/arrow-spacing": ["error", { after: true, before: true }],
      "vue/block-spacing": ["error", "always"],
      "vue/block-tag-newline": ["error", { multiline: "always", singleline: "always" }],
      "vue/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "vue/html-quotes": ["error", "double"],
      "vue/comma-dangle": ["error", "always-multiline"],
      "vue/comma-spacing": ["error", { after: true, before: false }],
      "vue/comma-style": ["error", "last"],
      "vue/html-comment-content-spacing": ["error", "always", { exceptions: ["-"] }],
      "vue/key-spacing": ["error", { afterColon: true, beforeColon: false }],
      "vue/keyword-spacing": ["error", { after: true, before: true }],
      "vue/object-curly-newline": "off",
      "vue/object-curly-spacing": ["error", "always"],
      "vue/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "vue/one-component-per-file": "off",
      "vue/operator-linebreak": ["error", "before"],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/quote-props": ["error", "consistent-as-needed"],
      "vue/require-default-prop": "off",
      "vue/space-in-parens": ["error", "never"],
      "vue/template-curly-spacing": "error"
    }
  };

  return config;
};
