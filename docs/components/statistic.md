# Statistic

Display a statistic number with an optional title, prefix, and suffix.

## Basic Usage

<div class="demo-block">
  <stx-statistic title="Active Users" :value="112893" />
  <stx-statistic title="Revenue" :value="9846" />
</div>

```vue
<stx-statistic title="Active Users" :value="112893" />
<stx-statistic title="Revenue" :value="9846" />
```

## Prefix & Suffix

<div class="demo-block">
  <stx-statistic title="Account Balance" :value="112893" prefix="$" />
  <stx-statistic title="Growth Rate" :value="11.28" suffix="%" />
</div>

```vue
<stx-statistic title="Account Balance" :value="112893" prefix="$" />
<stx-statistic title="Growth Rate" :value="11.28" suffix="%" />
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Statistic title |
| `value` | `number \| string` | `0` | Display value |
| `precision` | `number` | — | Decimal precision |
| `prefix` | `string` | — | Prefix text |
| `suffix` | `string` | — | Suffix text |
| `valueStyle` | `string \| object` | — | Custom value style |
| `formatter` | `(value: number) => string` | — | Custom value formatter |

### Slots

| Slot | Description |
|------|-------------|
| `title` | Custom title content |
| `prefix` | Custom prefix content |
| `suffix` | Custom suffix content |
