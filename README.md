# Stellux UI

[![License](https://img.shields.io/npm/l/stellux-ui)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/stellux-ui)](https://www.npmjs.com/package/stellux-ui)
![Vue 3.5+](https://img.shields.io/badge/vue-3.5%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

A Vue 3 component library built around three principles: **High Freedom**, **High Inclusivity**, and **High Performance**.

## Features

- Vue 3 + TypeScript + Vite
- Component-level CSS variable system for deep customization
- BEM naming convention with `stx-` prefix
- Built-in light & dark mode
- WAI-ARIA accessible by default
- Tree-shakable, per-component imports
- `v-ripple` directive for any element
- SSR-friendly (Nuxt compatible)

## Install

```bash
npm install stellux-ui
# or
pnpm add stellux-ui
```

## Quick Start

```ts
// main.ts
import { createApp } from 'vue'
import StelluxUI from 'stellux-ui'
import 'stellux-ui/dist/style.css'
import App from './App.vue'

createApp(App).use(StelluxUI).mount('#app')
```

```vue
<template>
  <stx-button type="primary">Hello Stellux</stx-button>
</template>
```

## On-Demand Import

```ts
import { StxButton, StxButtonGroup } from 'stellux-ui'
```

## Packages

| Package               | Description                       |
| --------------------- | --------------------------------- |
| `stellux-ui`          | Full bundle entry                 |
| `@stellux/components` | Vue components                    |
| `@stellux/theme`      | SCSS theme system & design tokens |
| `@stellux/directives` | Directives (`v-ripple`, etc.)     |
| `@stellux/hooks`      | Composition API hooks             |
| `@stellux/utils`      | Shared utilities                  |

## Development

```bash
# Clone
git clone https://github.com/stellux-ui/stellux-ui.git
cd stellux-ui

# Install dependencies
pnpm install

# Start playground dev server
pnpm dev

# Build
pnpm build
```

## Theme Customization

Override CSS variables to customize the look:

```css
:root {
  --stx-color-primary: #6366f1;
  --stx-color-primary-light: #818cf8;
  --stx-color-primary-dark: #4f46e5;
}
```

Per-component customization:

```css
.my-custom-button {
  --stx-button-bg-color: #ff6700;
  --stx-button-text-color: #fff;
  --stx-button-border-color: #ff6700;
}
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
