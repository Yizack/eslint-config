# Yizack's eslint-config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Yizack's ESLint flat configuration preset.

> [!NOTE]
> Code style rules are based on personal preferences and may not be suitable for everyone.

## Installation

```sh
pnpm add -D eslint @yizack/eslint-config
```

## Usage

Create `eslint.config.mjs` in your project root:

```js
import { yizack } from '@yizack/eslint-config'

export default yizack()
```

### Configuration

Pass an options object to `yizack()` to enable rules for specific technologies:

```js
import { yizack } from '@yizack/eslint-config'

export default yizack({
  typescript: true,
  vue: true,
  nuxt: true, // also enables vue
  imports: true,
  stylistic: true
})
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@yizack/eslint-config.svg?style=flat
[npm-version-href]: https://npmjs.com/package/@yizack/eslint-config

[npm-downloads-src]: https://img.shields.io/npm/dm/@yizack/eslint-config.svg?style=flat
[npm-downloads-href]: https://npmjs.com/package/@yizack/eslint-config
