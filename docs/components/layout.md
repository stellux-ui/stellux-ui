# Layout

24-column grid system using flexbox, with responsive breakpoints.

## Basic Layout

<div class="demo-layout">
  <stx-row>
    <stx-col :span="24"><div class="grid-content bg-dark">24</div></stx-col>
  </stx-row>
  <stx-row>
    <stx-col :span="12"><div class="grid-content bg-dark">12</div></stx-col>
    <stx-col :span="12"><div class="grid-content bg-light">12</div></stx-col>
  </stx-row>
  <stx-row>
    <stx-col :span="8"><div class="grid-content bg-dark">8</div></stx-col>
    <stx-col :span="8"><div class="grid-content bg-light">8</div></stx-col>
    <stx-col :span="8"><div class="grid-content bg-dark">8</div></stx-col>
  </stx-row>
  <stx-row>
    <stx-col :span="6"><div class="grid-content bg-dark">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-dark">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">6</div></stx-col>
  </stx-row>
</div>

```vue
<stx-row>
  <stx-col :span="24"><div>24</div></stx-col>
</stx-row>
<stx-row>
  <stx-col :span="12"><div>12</div></stx-col>
  <stx-col :span="12"><div>12</div></stx-col>
</stx-row>
```

## Gutter

<div class="demo-layout">
  <stx-row :gutter="20">
    <stx-col :span="6"><div class="grid-content bg-dark">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-dark">6</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">6</div></stx-col>
  </stx-row>
</div>

```vue
<stx-row :gutter="20">
  <stx-col :span="6"><div>6</div></stx-col>
  <stx-col :span="6"><div>6</div></stx-col>
  <stx-col :span="6"><div>6</div></stx-col>
  <stx-col :span="6"><div>6</div></stx-col>
</stx-row>
```

## Offset

<div class="demo-layout">
  <stx-row :gutter="20">
    <stx-col :span="6"><div class="grid-content bg-dark">6</div></stx-col>
    <stx-col :span="6" :offset="6"><div class="grid-content bg-dark">6, offset 6</div></stx-col>
  </stx-row>
  <stx-row :gutter="20">
    <stx-col :span="6" :offset="6"><div class="grid-content bg-dark">6, offset 6</div></stx-col>
    <stx-col :span="6" :offset="6"><div class="grid-content bg-dark">6, offset 6</div></stx-col>
  </stx-row>
</div>

```vue
<stx-row :gutter="20">
  <stx-col :span="6"><div>6</div></stx-col>
  <stx-col :span="6" :offset="6"><div>6, offset 6</div></stx-col>
</stx-row>
```

## Alignment

<div class="demo-layout">
  <stx-row justify="center">
    <stx-col :span="6"><div class="grid-content bg-dark">center</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">center</div></stx-col>
  </stx-row>
  <stx-row justify="space-between">
    <stx-col :span="6"><div class="grid-content bg-dark">between</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">between</div></stx-col>
  </stx-row>
  <stx-row justify="space-evenly">
    <stx-col :span="6"><div class="grid-content bg-dark">evenly</div></stx-col>
    <stx-col :span="6"><div class="grid-content bg-light">evenly</div></stx-col>
  </stx-row>
</div>

```vue
<stx-row justify="center">
  <stx-col :span="6"><div>center</div></stx-col>
  <stx-col :span="6"><div>center</div></stx-col>
</stx-row>
```

## Responsive

<div class="demo-layout">
  <stx-row :gutter="12">
    <stx-col :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-content bg-dark">xs:24 sm:12 md:8 lg:6</div></stx-col>
    <stx-col :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-content bg-light">xs:24 sm:12 md:8 lg:6</div></stx-col>
    <stx-col :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-content bg-dark">xs:24 sm:12 md:8 lg:6</div></stx-col>
    <stx-col :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-content bg-light">xs:24 sm:12 md:8 lg:6</div></stx-col>
  </stx-row>
</div>

```vue
<stx-row :gutter="12">
  <stx-col :xs="24" :sm="12" :md="8" :lg="6">
    <div>Responsive</div>
  </stx-col>
</stx-row>
```

## API

### Row Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gutter` | `number` | `0` | Grid spacing in px |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'start'` | Horizontal alignment |
| `align` | `'top' \| 'middle' \| 'bottom'` | — | Vertical alignment |
| `tag` | `string` | `'div'` | Custom HTML tag |

### Col Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `number` | `24` | Column span (0-24) |
| `offset` | `number` | `0` | Left offset columns |
| `push` | `number` | `0` | Move right by columns |
| `pull` | `number` | `0` | Move left by columns |
| `tag` | `string` | `'div'` | Custom HTML tag |
| `xs` | `number \| { span, offset }` | — | &lt;768px |
| `sm` | `number \| { span, offset }` | — | &ge;768px |
| `md` | `number \| { span, offset }` | — | &ge;992px |
| `lg` | `number \| { span, offset }` | — | &ge;1200px |
| `xl` | `number \| { span, offset }` | — | &ge;1920px |

<style>
.demo-layout {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
}

.demo-layout .stx-row {
  margin-bottom: 12px;
}

.demo-layout .stx-row:last-child {
  margin-bottom: 0;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
}

.bg-dark {
  background: var(--vp-c-brand-1);
}

.bg-light {
  background: var(--vp-c-brand-2);
}
</style>
