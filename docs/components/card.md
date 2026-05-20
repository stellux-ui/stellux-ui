# Card

Display information within a contained card panel.

## Basic Usage

<div class="demo-block">
  <stx-card style="width: 320px;">
    <template #header>Card Title</template>
    <p>Some quick content for the card body. This is a simple card example.</p>
  </stx-card>
</div>

```vue
<stx-card>
  <template #header>Card Title</template>
  <p>Some quick content for the card body.</p>
</stx-card>
```

## Shadow Variants

<div class="demo-block">
  <stx-card shadow="always" style="width: 240px;">
    <template #header>Always</template>
    <p>Always show shadow</p>
  </stx-card>
  <stx-card shadow="hover" style="width: 240px;">
    <template #header>Hover</template>
    <p>Shadow on hover</p>
  </stx-card>
  <stx-card shadow="never" style="width: 240px;">
    <template #header>Never</template>
    <p>No shadow</p>
  </stx-card>
</div>

```vue
<stx-card shadow="always">
  <template #header>Always</template>
  <p>Always show shadow</p>
</stx-card>

<stx-card shadow="hover">
  <template #header>Hover</template>
  <p>Shadow on hover</p>
</stx-card>

<stx-card shadow="never">
  <template #header>Never</template>
  <p>No shadow</p>
</stx-card>
```

## With Footer

<div class="demo-block">
  <stx-card style="width: 320px;">
    <template #header>Card Title</template>
    <p>Card body content goes here.</p>
    <template #footer>
      <stx-button type="primary" size="small">Action</stx-button>
    </template>
  </stx-card>
</div>

```vue
<stx-card>
  <template #header>Card Title</template>
  <p>Card body content goes here.</p>
  <template #footer>
    <stx-button type="primary" size="small">Action</stx-button>
  </template>
</stx-card>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `'always' \| 'hover' \| 'never'` | `'always'` | When to show card shadow |
| `bodyStyle` | `object \| string` | — | Custom style for body area |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Card body content |
| `header` | Card header content |
| `footer` | Card footer content |
