# Space

Set spacing between child elements with uniform gaps.

## Basic Usage

<div class="demo-block">
  <stx-space>
    <stx-button>Button 1</stx-button>
    <stx-button>Button 2</stx-button>
    <stx-button>Button 3</stx-button>
  </stx-space>
</div>

```vue
<stx-space>
  <stx-button>Button 1</stx-button>
  <stx-button>Button 2</stx-button>
  <stx-button>Button 3</stx-button>
</stx-space>
```

## Vertical

<div class="demo-block">
  <stx-space direction="vertical" style="width: 100%;">
    <stx-button style="width: 100%;">Button 1</stx-button>
    <stx-button style="width: 100%;">Button 2</stx-button>
    <stx-button style="width: 100%;">Button 3</stx-button>
  </stx-space>
</div>

```vue
<stx-space direction="vertical" style="width: 100%;">
  <stx-button style="width: 100%;">Button 1</stx-button>
  <stx-button style="width: 100%;">Button 2</stx-button>
  <stx-button style="width: 100%;">Button 3</stx-button>
</stx-space>
```

## Sizes

<div class="demo-block" style="flex-direction: column; gap: 16px;">
  <stx-space size="small">
    <stx-button>Small</stx-button>
    <stx-button>Small</stx-button>
    <stx-button>Small</stx-button>
  </stx-space>
  <stx-space>
    <stx-button>Default</stx-button>
    <stx-button>Default</stx-button>
    <stx-button>Default</stx-button>
  </stx-space>
  <stx-space size="large">
    <stx-button>Large</stx-button>
    <stx-button>Large</stx-button>
    <stx-button>Large</stx-button>
  </stx-space>
  <stx-space :size="30">
    <stx-button>30px</stx-button>
    <stx-button>30px</stx-button>
    <stx-button>30px</stx-button>
  </stx-space>
</div>

```vue
<stx-space size="small">...</stx-space>
<stx-space>...</stx-space>
<stx-space size="large">...</stx-space>
<stx-space :size="30">...</stx-space>
```

## Wrap

<div class="demo-block" style="max-width: 400px;">
  <stx-space wrap>
    <stx-button>Button 1</stx-button>
    <stx-button>Button 2</stx-button>
    <stx-button>Button 3</stx-button>
    <stx-button>Button 4</stx-button>
    <stx-button>Button 5</stx-button>
    <stx-button>Button 6</stx-button>
    <stx-button>Button 7</stx-button>
    <stx-button>Button 8</stx-button>
  </stx-space>
</div>

```vue
<stx-space wrap>
  <stx-button>Button 1</stx-button>
  <stx-button>Button 2</stx-button>
  <stx-button>Button 3</stx-button>
  ...
</stx-space>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `size` | `'small' \| 'default' \| 'large' \| number \| [number, number]` | `'default'` | Gap size |
| `wrap` | `boolean` | `false` | Auto wrap items |
| `fill` | `boolean` | `false` | Fill container width |
| `fillRatio` | `number` | `100` | Fill ratio percentage |
| `alignment` | `string` | `'center'` | CSS align-items value |
| `spacer` | `VNode \| string` | — | Spacer element between items |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Space child elements |
