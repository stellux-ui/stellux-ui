# Stellux UI

[![License](https://img.shields.io/npm/l/stellux-ui)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/stellux-ui)](https://www.npmjs.com/package/stellux-ui)
![Vue 3.5+](https://img.shields.io/badge/vue-3.5%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

A Vue 3 component library built around three principles: **High Freedom**, **High Inclusivity**, and **High Performance**.

## Features

- 75+ components covering all common UI scenarios
- CSS Variables theming with built-in dark mode
- Full TypeScript support with type-safe props
- Tree-shakable — import only what you use
- BEM naming convention with `stx-` prefix
- WAI-ARIA accessible components
- pnpm monorepo architecture

## Install

```bash
npm install stellux-ui
# or
pnpm add stellux-ui
```

## Quick Start

```typescript
import { createApp } from 'vue'
import SteluxUI from 'stellux-ui'
import App from './App.vue'

createApp(App).use(SteluxUI).mount('#app')
```

## Development

```bash
pnpm install
pnpm dev
pnpm docs:dev
pnpm build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
