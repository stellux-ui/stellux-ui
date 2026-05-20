# Pagination

Navigate through paged data sets with page controls.

## Basic Usage

<div class="demo-block">
  <stx-pagination :total="100" />
</div>

```vue
<stx-pagination :total="100" />
```

## Page Sizes

<div class="demo-block">
  <stx-pagination :total="200" :page-sizes="[10, 20, 50, 100]" layout="sizes, prev, pager, next" />
</div>

```vue
<stx-pagination
  :total="200"
  :page-sizes="[10, 20, 50, 100]"
  layout="sizes, prev, pager, next"
/>
```

## Full Layout

<div class="demo-block">
  <stx-pagination :total="400" :page-size="20" layout="total, sizes, prev, pager, next, jumper" />
</div>

```vue
<stx-pagination
  :total="400"
  :page-size="20"
  layout="total, sizes, prev, pager, next, jumper"
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | `0` | Total item count |
| `v-model:current-page` | `number` | `1` | Current page number |
| `v-model:page-size` | `number` | `10` | Items per page |
| `pageSizes` | `number[]` | `[10, 20, 30, 50]` | Page size options |
| `pagerCount` | `number` | `7` | Number of page buttons |
| `layout` | `string` | `'prev, pager, next'` | Layout of pagination elements |
| `background` | `boolean` | `false` | Show button backgrounds |
| `small` | `boolean` | `false` | Small size |
| `disabled` | `boolean` | `false` | Disable pagination |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `current-change` | `(page: number)` | Page number changed |
| `size-change` | `(size: number)` | Page size changed |
