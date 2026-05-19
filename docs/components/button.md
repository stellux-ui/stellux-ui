# Button

## Basic Usage

<div class="demo-block">
  <stx-button>Default</stx-button>
  <stx-button type="primary">Primary</stx-button>
  <stx-button type="success">Success</stx-button>
  <stx-button type="warning">Warning</stx-button>
  <stx-button type="danger">Danger</stx-button>
  <stx-button type="info">Info</stx-button>
</div>

```vue
<stx-button>Default</stx-button>
<stx-button type="primary">Primary</stx-button>
<stx-button type="success">Success</stx-button>
<stx-button type="warning">Warning</stx-button>
<stx-button type="danger">Danger</stx-button>
<stx-button type="info">Info</stx-button>
```

## Plain

<div class="demo-block">
  <stx-button plain>Plain</stx-button>
  <stx-button type="primary" plain>Primary</stx-button>
  <stx-button type="success" plain>Success</stx-button>
  <stx-button type="warning" plain>Warning</stx-button>
  <stx-button type="danger" plain>Danger</stx-button>
</div>

```vue
<stx-button plain>Plain</stx-button>
<stx-button type="primary" plain>Primary</stx-button>
```

## Text

<div class="demo-block">
  <stx-button text>Text</stx-button>
  <stx-button type="primary" text>Primary</stx-button>
  <stx-button type="success" text>Success</stx-button>
  <stx-button type="danger" text>Danger</stx-button>
</div>

```vue
<stx-button text>Text</stx-button>
<stx-button type="primary" text>Primary</stx-button>
```

## Link

<div class="demo-block">
  <stx-button link>Link</stx-button>
  <stx-button type="primary" link>Primary</stx-button>
  <stx-button type="success" link>Success</stx-button>
  <stx-button type="danger" link>Danger</stx-button>
</div>

```vue
<stx-button link>Link</stx-button>
<stx-button type="primary" link>Primary</stx-button>
```

## Dashed

<div class="demo-block">
  <stx-button dashed>Dashed</stx-button>
  <stx-button type="primary" dashed plain>Primary</stx-button>
  <stx-button type="danger" dashed plain>Danger</stx-button>
</div>

```vue
<stx-button dashed>Dashed</stx-button>
<stx-button type="primary" dashed plain>Primary</stx-button>
```

## Round & Circle

<div class="demo-block">
  <stx-button type="primary" round>Round</stx-button>
  <stx-button type="success" round>Success</stx-button>
  <stx-button type="primary" circle>S</stx-button>
  <stx-button type="success" circle>+</stx-button>
</div>

```vue
<stx-button type="primary" round>Round</stx-button>
<stx-button type="primary" circle>S</stx-button>
```

## Sizes

<div class="demo-block">
  <stx-button type="primary" size="small">Small</stx-button>
  <stx-button type="primary">Default</stx-button>
  <stx-button type="primary" size="large">Large</stx-button>
</div>

```vue
<stx-button type="primary" size="small">Small</stx-button>
<stx-button type="primary">Default</stx-button>
<stx-button type="primary" size="large">Large</stx-button>
```

## Disabled

<div class="demo-block">
  <stx-button disabled>Disabled</stx-button>
  <stx-button type="primary" disabled>Primary</stx-button>
  <stx-button type="primary" plain disabled>Plain</stx-button>
  <stx-button type="primary" text disabled>Text</stx-button>
  <stx-button type="primary" link disabled>Link</stx-button>
</div>

```vue
<stx-button disabled>Disabled</stx-button>
<stx-button type="primary" disabled>Primary</stx-button>
```

## Loading

<div class="demo-block">
  <stx-button type="primary" loading>Loading</stx-button>
  <stx-button type="success" loading>Loading</stx-button>
</div>

```vue
<stx-button type="primary" loading>Loading</stx-button>
```

## Custom Color

<div class="demo-block">
  <stx-button color="#626aef">Indigo</stx-button>
  <stx-button color="#ff6700">Orange</stx-button>
  <stx-button color="#626aef" plain>Plain</stx-button>
  <stx-button color="#ff6700" plain>Plain</stx-button>
</div>

```vue
<stx-button color="#626aef">Indigo</stx-button>
<stx-button color="#ff6700">Orange</stx-button>
<stx-button color="#626aef" plain>Plain</stx-button>
```

## Button Group

<div class="demo-block">
  <stx-button-group>
    <stx-button type="primary">Prev</stx-button>
    <stx-button type="primary">Next</stx-button>
  </stx-button-group>
</div>

<div class="demo-block">
  <stx-button-group direction="vertical">
    <stx-button type="primary">Top</stx-button>
    <stx-button type="primary">Middle</stx-button>
    <stx-button type="primary">Bottom</stx-button>
  </stx-button-group>
</div>

```vue
<stx-button-group>
  <stx-button type="primary">Prev</stx-button>
  <stx-button type="primary">Next</stx-button>
</stx-button-group>

<stx-button-group direction="vertical">
  <stx-button type="primary">Top</stx-button>
  <stx-button type="primary">Middle</stx-button>
  <stx-button type="primary">Bottom</stx-button>
</stx-button-group>
```

## API

### Button Props

| Prop          | Type                                                                     | Default     | Description          |
| ------------- | ------------------------------------------------------------------------ | ----------- | -------------------- |
| `type`        | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Button type          |
| `size`        | `'small' \| 'default' \| 'large'`                                        | `'default'` | Button size          |
| `plain`       | `boolean`                                                                | `false`     | Plain style          |
| `text`        | `boolean`                                                                | `false`     | Text button style    |
| `link`        | `boolean`                                                                | `false`     | Link button style    |
| `dashed`      | `boolean`                                                                | `false`     | Dashed border        |
| `round`       | `boolean`                                                                | `false`     | Round border radius  |
| `circle`      | `boolean`                                                                | `false`     | Circle button        |
| `disabled`    | `boolean`                                                                | `false`     | Disabled state       |
| `loading`     | `boolean`                                                                | `false`     | Loading state        |
| `loadingIcon` | `Component`                                                              | —           | Custom loading icon  |
| `icon`        | `Component`                                                              | —           | Icon component       |
| `color`       | `string`                                                                 | —           | Custom button color  |
| `tag`         | `string \| Component`                                                    | `'button'`  | Custom HTML tag      |
| `nativeType`  | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  | Native button type   |
| `ripple`      | `boolean`                                                                | `true`      | Enable ripple effect |
| `autofocus`   | `boolean`                                                                | `false`     | Auto focus on mount  |

### Button Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `default` | Button content           |
| `loading` | Custom loading indicator |
| `icon`    | Custom icon              |

### Button Events

| Event   | Parameters            | Description        |
| ------- | --------------------- | ------------------ |
| `click` | `(event: MouseEvent)` | Triggered on click |

### ButtonGroup Props

| Prop        | Type                                                                     | Default        | Description                  |
| ----------- | ------------------------------------------------------------------------ | -------------- | ---------------------------- |
| `type`      | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —              | Button type for all children |
| `size`      | `'small' \| 'default' \| 'large'`                                        | —              | Button size for all children |
| `direction` | `'horizontal' \| 'vertical'`                                             | `'horizontal'` | Group layout direction       |
