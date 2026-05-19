# Container

Container components for building common page layouts.

## Common Layouts

<div class="demo-container">
  <p class="demo-title">Header / Main</p>
  <stx-container>
    <stx-header>Header</stx-header>
    <stx-main>Main</stx-main>
  </stx-container>
</div>

```vue
<stx-container>
  <stx-header>Header</stx-header>
  <stx-main>Main</stx-main>
</stx-container>
```

<div class="demo-container">
  <p class="demo-title">Header / Main / Footer</p>
  <stx-container>
    <stx-header>Header</stx-header>
    <stx-main>Main</stx-main>
    <stx-footer>Footer</stx-footer>
  </stx-container>
</div>

```vue
<stx-container>
  <stx-header>Header</stx-header>
  <stx-main>Main</stx-main>
  <stx-footer>Footer</stx-footer>
</stx-container>
```

<div class="demo-container">
  <p class="demo-title">Aside / Main</p>
  <stx-container>
    <stx-aside width="200px">Aside</stx-aside>
    <stx-main>Main</stx-main>
  </stx-container>
</div>

```vue
<stx-container>
  <stx-aside width="200px">Aside</stx-aside>
  <stx-main>Main</stx-main>
</stx-container>
```

<div class="demo-container">
  <p class="demo-title">Header / Aside + Main</p>
  <stx-container>
    <stx-header>Header</stx-header>
    <stx-container>
      <stx-aside width="200px">Aside</stx-aside>
      <stx-main>Main</stx-main>
    </stx-container>
  </stx-container>
</div>

```vue
<stx-container>
  <stx-header>Header</stx-header>
  <stx-container>
    <stx-aside width="200px">Aside</stx-aside>
    <stx-main>Main</stx-main>
  </stx-container>
</stx-container>
```

<div class="demo-container">
  <p class="demo-title">Header / Aside + Main + Footer</p>
  <stx-container>
    <stx-header>Header</stx-header>
    <stx-container>
      <stx-aside width="200px">Aside</stx-aside>
      <stx-container>
        <stx-main>Main</stx-main>
        <stx-footer>Footer</stx-footer>
      </stx-container>
    </stx-container>
  </stx-container>
</div>

```vue
<stx-container>
  <stx-header>Header</stx-header>
  <stx-container>
    <stx-aside width="200px">Aside</stx-aside>
    <stx-container>
      <stx-main>Main</stx-main>
      <stx-footer>Footer</stx-footer>
    </stx-container>
  </stx-container>
</stx-container>
```

## API

### Container Props

| Prop        | Type                         | Default | Description                                               |
| ----------- | ---------------------------- | ------- | --------------------------------------------------------- |
| `direction` | `'horizontal' \| 'vertical'` | Auto    | Layout direction. Vertical when contains Header or Footer |

### Header Props

| Prop     | Type     | Default  | Description          |
| -------- | -------- | -------- | -------------------- |
| `height` | `string` | `'60px'` | Height of the header |

### Footer Props

| Prop     | Type     | Default  | Description          |
| -------- | -------- | -------- | -------------------- |
| `height` | `string` | `'60px'` | Height of the footer |

### Aside Props

| Prop    | Type     | Default   | Description        |
| ------- | -------- | --------- | ------------------ |
| `width` | `string` | `'300px'` | Width of the aside |

### Main

No props. Fills remaining space via flexbox.

### Slots

All components provide a `default` slot.

<style>
.demo-container {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
}

.demo-container .stx-header,
.demo-container .stx-footer {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-align: center;
  line-height: 60px;
  font-size: 14px;
}

.demo-container .stx-aside {
  background: color-mix(in srgb, var(--vp-c-brand-soft) 50%, transparent);
  color: var(--vp-c-brand-1);
  text-align: center;
  line-height: 200px;
  font-size: 14px;
}

.demo-container .stx-main {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  text-align: center;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
