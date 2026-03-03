import { composer } from "eslint-flat-config-utils";
import type { Awaitable, ConfigWithExtends, FlatConfigComposer } from "eslint-flat-config-utils";
import gitignore from "eslint-config-flat-gitignore";
import type { YizackConfigOptions } from "./types";
import { imports, javascript, nuxt, stylistic, typescript, vue } from "./configs";
import { globs } from "./utils";

export const yizack = (options?: YizackConfigOptions): FlatConfigComposer => {
  const configs: Awaitable<ConfigWithExtends>[] = [];
  const globPatterns: string[][] = [globs.javascript];

  const c = composer();

  const baseConfigs = [
    gitignore(),
    javascript()
  ];

  if (options?.typescript) {
    globPatterns.push(globs.typescript);
    c.append(typescript());
  }

  if (options?.nuxt) {
    c.append(nuxt());
    options.vue = true;
  }

  if (options?.vue) {
    globPatterns.push(globs.vue);
    c.append(vue({ typescript: options.typescript }));
  }

  if (options?.imports) {
    c.append(imports());
  }

  if (options?.stylistic) {
    c.append(stylistic());
  }

  const flatConfig = [
    { files: globPatterns.flat() },
    ...baseConfigs,
    ...configs
  ];

  c.append(...flatConfig);

  return c;
};
