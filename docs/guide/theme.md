# Theme Customization

Stellux UI uses CSS variables for theming. You can override them at any level.

## Global Tokens

Override the root variables to change the entire look:

```css
:root {
  --stx-color-primary: #6366f1;
  --stx-color-primary-light: #818cf8;
  --stx-color-primary-dark: #4f46e5;
  --stx-color-primary-soft: rgba(99, 102, 241, 0.1);
}
```

## Component-Level Variables

Each component exposes its own CSS variables. For example, to customize only buttons:

```css
.stx-button {
  --stx-button-height: 36px;
  --stx-button-border-radius: 8px;
  --stx-button-font-weight: 600;
}
```

## Dark Mode

Add `data-theme="dark"` or class `dark` to your root element:

```html
<html data-theme="dark">
```

All components automatically adapt. Dark mode tokens are defined separately and reduce saturation for comfortable viewing.

## Available Global Tokens

| Token | Default (Light) | Description |
|-------|----------------|-------------|
| `--stx-color-primary` | `#6366f1` | Primary brand color |
| `--stx-color-success` | `#10b981` | Success state |
| `--stx-color-warning` | `#f59e0b` | Warning state |
| `--stx-color-danger` | `#f43f5e` | Danger state |
| `--stx-color-info` | `#0ea5e9` | Info state |
| `--stx-color-bg` | `#ffffff` | Background |
| `--stx-color-bg-page` | `#f8fafc` | Page background |
| `--stx-color-text-primary` | `#1e293b` | Primary text |
| `--stx-color-border` | `#e2e8f0` | Border color |
| `--stx-radius-base` | `6px` | Default border radius |
