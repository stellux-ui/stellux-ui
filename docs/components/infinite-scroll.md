# InfiniteScroll

A directive that loads more content when the user scrolls to the bottom.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">InfiniteScroll is a directive that requires reactive data binding. See code example below.</p>
</div>

```vue
<script setup>
import { ref } from 'vue'

const items = ref(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))
const loading = ref(false)

const loadMore = () => {
  loading.value = true
  setTimeout(() => {
    const len = items.value.length
    for (let i = 1; i <= 10; i++) {
      items.value.push(`Item ${len + i}`)
    }
    loading.value = false
  }, 1000)
}
</script>

<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" style="height: 300px; overflow: auto;">
  <div v-for="item in items" :key="item" style="padding: 8px 0; border-bottom: 1px solid var(--stx-border-color);">
    {{ item }}
  </div>
  <p v-if="loading" style="text-align: center; color: var(--stx-color-text-secondary);">Loading...</p>
</div>
```

## Directive Attributes

```vue
<div
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="disabled"
  :infinite-scroll-delay="200"
  :infinite-scroll-distance="10"
  :infinite-scroll-immediate="true"
>
  <!-- scrollable content -->
</div>
```

## API

### Directive Bindings

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `v-infinite-scroll` | `Function` | — | Load function called on scroll |
| `infinite-scroll-disabled` | `boolean` | `false` | Disable loading |
| `infinite-scroll-delay` | `number` | `200` | Throttle delay in ms |
| `infinite-scroll-distance` | `number` | `0` | Trigger distance from bottom in px |
| `infinite-scroll-immediate` | `boolean` | `true` | Load immediately on mount |
