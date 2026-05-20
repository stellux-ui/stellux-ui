# Contributing to Stellux UI

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive experience for everyone.

## How to Contribute

### Reporting Bugs

- Search [existing issues](https://github.com/stellux-ui/stellux-ui/issues) before opening a new one
- Use the **Bug Report** issue template
- Include a minimal reproduction (StackBlitz, CodeSandbox, or GitHub repo)
- Specify the Stellux UI version, Vue version, and browser

### Requesting Features

- Use the **Feature Request** or **Component Request** issue template
- Describe the problem you're solving, not just the solution you want
- Include API design proposals when suggesting new components

### Submitting Code

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the guidelines below
4. Submit a Pull Request

## Development Setup

```bash
# Fork and clone
git clone https://github.com/<your-username>/stellux-ui.git
cd stellux-ui

# Install dependencies (requires Node.js >= 18, pnpm >= 10)
pnpm install

# Start playground dev server
pnpm dev

# Start documentation dev server
pnpm docs:dev

# Build the library
pnpm build

# Build documentation
pnpm docs:build
```

## Project Structure

```text
stellux-ui/
├── packages/
│   ├── components/    # Vue components source
│   │   └── src/
│   │       └── <name>/
│   │           ├── <name>.ts       # Props, emits, types
│   │           ├── <name>.vue      # Component SFC
│   │           ├── constants.ts    # InjectionKeys, type constants
│   │           └── index.ts        # withInstall exports
│   ├── theme/         # SCSS styling system
│   │   └── src/
│   │       ├── common/     # Variables, reset, transitions
│   │       ├── mixins/     # BEM, CSS variable helpers
│   │       └── components/ # Per-component styles
│   ├── hooks/         # Composable functions
│   ├── utils/         # Shared utilities
│   ├── directives/    # Vue directives
│   └── stellux-ui/    # Main entry package
├── playground/        # Development testing environment
└── docs/              # VitePress documentation site
```

## Adding a New Component

### 1. Create component files

```text
packages/components/src/<name>/
├── <name>.ts          # Props and emits definitions
├── <name>.vue         # Component SFC
├── constants.ts       # InjectionKeys (if compound component)
└── index.ts           # withInstall export
```

### 2. Props definition pattern

```typescript
// <name>.ts
import type { ExtractPropTypes, PropType } from 'vue'

export const exampleProps = {
  type: { type: String as PropType<'primary' | 'success'>, default: 'primary' },
  size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
  disabled: Boolean,
} as const

export const exampleEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  change: (val: string) => typeof val === 'string',
}

export type ExampleProps = ExtractPropTypes<typeof exampleProps>
export type ExampleEmits = typeof exampleEmits
```

### 3. Component SFC pattern

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { exampleProps, exampleEmits } from './example'

defineOptions({ name: 'StxExample' })
const props = defineProps(exampleProps)
const emit = defineEmits(exampleEmits)
const ns = useNamespace('example')

const classes = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('disabled', props.disabled),
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

### 4. Export pattern

```typescript
// index.ts
import { withInstall } from '@stellux/utils'
import Example from './example.vue'

export const StxExample = withInstall(Example)
export default StxExample
export { exampleProps, exampleEmits } from './example'
export type { ExampleProps, ExampleEmits } from './example'
```

### 5. Add styles

```scss
// packages/theme/src/components/<name>.scss
@use '../mixins/bem' as *;
@use '../mixins/config' as *;

@include b(example) {
  // Block styles

  @include e(inner) {
    // Element styles
  }

  @include m(primary) {
    // Modifier styles
  }

  @include when(disabled) {
    // State styles
  }
}
```

### 6. Register the component

1. `packages/components/src/index.ts` — add `export * from './<name>'`
2. `packages/theme/src/index.scss` — add `@use './components/<name>';`
3. `packages/stellux-ui/src/index.ts` — import, add to components array, add named export
4. `docs/components/<name>.md` — add documentation page
5. `docs/.vitepress/config.ts` — add to sidebar

## Code Style Guidelines

### TypeScript

- Use `<script setup lang="ts">` for all components
- Define props with `as const` assertion and `ExtractPropTypes`
- Use `definePropType` from `@stellux/utils` for complex types (Component, StyleValue)
- Prefer `computed` over methods for derived state
- No `any` types unless absolutely necessary

### CSS / SCSS

- BEM naming convention with `stx-` prefix
- Use BEM mixins: `@include b()`, `@include e()`, `@include m()`, `@include when()`
- Use CSS variables for theming: `var(--stx-color-primary)`
- Import `config` mixin when referencing `$namespace` variable directly
- Support dark mode via `[data-theme='dark']` or `.dark` selector
- No hardcoded colors — always use CSS variables

### General

- No comments unless explaining a non-obvious **why**
- No unused imports or variables
- Use existing utilities from `@stellux/utils` and `@stellux/hooks`
- Follow provide/inject pattern with typed `InjectionKey` for compound components

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>

<body>
```

### Types

| Type       | Description                          |
|------------|--------------------------------------|
| `feat`     | New feature or component             |
| `fix`      | Bug fix                              |
| `docs`     | Documentation changes                |
| `style`    | Code style changes (no logic change) |
| `refactor` | Code refactoring                     |
| `perf`     | Performance improvement              |
| `test`     | Adding or updating tests             |
| `chore`    | Build, tooling, or dependency update |

### Scope

Use the component name in kebab-case:

```text
feat(date-picker): add week selection mode
fix(select): correct dropdown position on scroll
docs(tooltip): add placement examples
```

### Body

Include 2-3 lines explaining what changed and why:

```text
feat(table): add column resizing support

Allow users to resize columns by dragging column borders.
Respects min-width constraints and persists widths across re-renders.
```

## Pull Request Guidelines

### Before Submitting

- [ ] Branch is created from latest `main`
- [ ] Code follows the style guidelines above
- [ ] `pnpm dev` runs without errors
- [ ] `pnpm docs:build` passes
- [ ] New component is registered in all entry files
- [ ] Documentation page is added with live demos
- [ ] VitePress sidebar is updated

### PR Title

Follow the same commit convention format:

```text
feat(tree): add virtual scrolling for large datasets
fix(dialog): prevent body scroll when modal is open
docs(getting-started): add Nuxt integration guide
```

### PR Description

Use the PR template. Every PR must include:

- **Summary**: What changed and why (2-3 bullet points)
- **Related Issue**: Link to the issue this PR addresses
- **Screenshots**: For any visual changes
- **Test Plan**: How to verify the changes work correctly

### Review Process

1. At least one maintainer approval is required
2. All CI checks must pass (docs build, lint)
3. PR description must be complete
4. Breaking changes require discussion in an issue first

### What We Look For in Review

- **Correctness**: Does it work as described?
- **Consistency**: Does it follow existing patterns?
- **Accessibility**: Are ARIA attributes and keyboard navigation handled?
- **Performance**: No unnecessary re-renders or DOM operations?
- **Dark mode**: Do styles adapt correctly?
- **Edge cases**: Empty states, extreme values, rapid interactions?

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Patch** (0.0.x): Bug fixes, documentation updates
- **Minor** (0.x.0): New components, non-breaking enhancements
- **Major** (x.0.0): Breaking API changes

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
