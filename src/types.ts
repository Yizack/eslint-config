export interface YizackConfigOptions {
  /**
   * Core JavaScript rules. Can't be disabled.
   * @default true
   */
  javascript?: boolean;
  /**
   * Activate TypeScript rules.
   * @default false
   */
  typescript?: boolean;
  /**
   * Activate Vue rules.
   * @default false
   */
  vue?: boolean;
  /**
   * Activate rules related to imports.
   * @default false
   */
  imports?: boolean;
  /**
   * Activate stylistic rules.
   * @default false
   */
  stylistic?: boolean;
  /**
   * Activate Nuxt rules. This option will also activate Vue rules.
   * @default false
   */
  nuxt?: boolean;
}
