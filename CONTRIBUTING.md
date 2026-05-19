# Contributing to Stellux UI

Thank you for your interest in contributing to Stellux UI! This document provides guidelines to help you get started.

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/stellux-ui.git
cd stellux-ui

# Install dependencies
pnpm install

# Start the development playground
pnpm dev
```

**Requirements:** Node.js >= 18, pnpm >= 10

## Project Structure

```text
stellux-ui/
├── packages/
│   ├── components/    # Vue components
│   ├── theme/         # SCSS theme system (CSS variables, BEM mixins)
│   ├── directives/    # Vue directives (v-ripple, etc.)
│   ├── hooks/         # Composition API hooks
│   ├── utils/         # Shared utility functions
│   └── stellux-ui/    # Main entry package
├── playground/        # Dev testing environment
└── docs/              # VitePress documentation (planned)
```

## Adding a New Component

1. Create directory: `packages/components/src/<component-name>/`
2. Add these files:
   - `constants.ts` — type constants
   - `<name>.ts` — props, emits, types
   - `<name>.vue` — component SFC
   - `index.ts` — exports with `withInstall()`
   - `instance.ts` — instance type
3. Add styles: `packages/theme/src/components/<name>.scss`
   - Use BEM mixins: `@include b()`, `@include e()`, `@include m()`, `@include when()`
   - Use component-level CSS variables via `set-component-css-var()`
4. Register in `packages/theme/src/index.scss`
5. Export from `packages/components/src/index.ts`
6. Register in `packages/stellux-ui/src/index.ts`

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(button): add dashed variant
fix(theme): correct hover color in dark mode
docs: update README installation section
refactor(utils): simplify useNamespace helper
chore: update dependencies
```

## Pull Request Process

1. Fork the repository and create a branch from `main`
2. Make your changes and ensure the playground works correctly
3. Follow existing code style and patterns
4. Write a clear PR description explaining **what** and **why**
5. Submit the PR and wait for review

## Code Style

- Vue 3 `<script setup>` with TypeScript
- BEM naming with `stx-` namespace
- Component-level CSS variables (`--stx-<component>-<property>`)
- No comments unless explaining a non-obvious "why"
- Use existing utilities from `@stellux/utils` and `@stellux/hooks`

## Reporting Issues

- Use GitHub Issues
- Include a minimal reproduction when reporting a problem
- Search existing issues before opening a new one

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
