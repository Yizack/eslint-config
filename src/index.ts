import { composer } from "eslint-flat-config-utils";
import type { Awaitable, ConfigWithExtends, FlatConfigComposer } from "eslint-flat-config-utils";
import gitignore from "eslint-config-flat-gitignore";
import type { YizackConfigOptions } from "./types";
import { imports, javascript, nuxt, stylistic, typescript, vue } from "./configs";
import { globs } from "./utils";

export const yizack = (options?: YizackConfigOptions): FlatConfigComposer => {
  const configs: Awaitable<ConfigWithExtends>[] = [];
  const globPatterns: string[][] = [globs.javascript];

  const baseConfigs = [
    gitignore(),
    javascript()
  ];

  if (options?.typescript) {
    globPatterns.push(globs.typescript);
    configs.push(typescript());
  }

  if (options?.nuxt) {
    configs.push(nuxt());
    options.vue = true;
  }

  if (options?.vue) {
    globPatterns.push(globs.vue);
    configs.push(vue({ typescript: options.typescript }));
  }

  if (options?.imports) {
    configs.push(imports());
  }

  if (options?.stylistic) {
    configs.push(stylistic());
  }

  const flatConfig = [
    { files: globPatterns.flat() },
    ...baseConfigs,
    ...configs
  ];

  return composer(Promise.all(flatConfig));
};
