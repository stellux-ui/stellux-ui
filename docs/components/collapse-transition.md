# CollapseTransition

An internal transition component that provides a vertical collapse/expand animation. Used by Menu, Collapse, and other expandable components.

## Basic Usage

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<stx-button @click="show = !show">Toggle</stx-button>
<stx-collapse-transition>
  <div v-show="show">
    <p>This content will collapse and expand with an animation.</p>
  </div>
</stx-collapse-transition>
```

## API

### Slots

| Slot | Description |
|------|-------------|
| `default` | Content to animate. Must use `v-show` or `v-if` for toggling. |
