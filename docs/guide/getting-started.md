# Getting Started

## Installation

```bash
npm install stellux-ui
# or
pnpm add stellux-ui
```

## Full Import

```ts
// main.ts
import { createApp } from 'vue'
import StelluxUI from 'stellux-ui'
import 'stellux-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(StelluxUI)
app.mount('#app')
```

## On-Demand Import

```ts
import { StxButton, StxButtonGroup } from 'stellux-ui'
import 'stellux-ui/dist/style.css'
```

## Using v-ripple Directive

The `v-ripple` directive is automatically registered when using `app.use(StelluxUI)`.

```vue
<template>
  <div v-ripple class="my-card">Click me for ripple</div>
  <div v-ripple="{ color: 'rgba(255,255,255,0.3)' }">Custom color</div>
  <div v-ripple="false">Disabled</div>
</template>
```
