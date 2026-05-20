# Carousel

Loop through a series of content panels in a slideshow format.

## Basic Usage

<div class="demo-block">
  <p style="color: var(--stx-color-text-secondary);">Carousel requires dynamic state for slide transitions. See code example below.</p>
</div>

```vue
<stx-carousel height="200px">
  <stx-carousel-item v-for="n in 4" :key="n">
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--stx-color-primary-light-9); font-size: 18px; color: var(--stx-color-primary);">
      Slide {{ n }}
    </div>
  </stx-carousel-item>
</stx-carousel>
```

## Arrow & Indicator

```vue
<stx-carousel height="200px" arrow="always" indicator-position="outside">
  <stx-carousel-item v-for="n in 4" :key="n">
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--stx-color-success-light-9);">
      Slide {{ n }}
    </div>
  </stx-carousel-item>
</stx-carousel>
```

## Vertical Direction

```vue
<stx-carousel height="200px" direction="vertical">
  <stx-carousel-item v-for="n in 4" :key="n">
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--stx-color-warning-light-9);">
      Slide {{ n }}
    </div>
  </stx-carousel-item>
</stx-carousel>
```

## API

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string` | — | Carousel height |
| `initialIndex` | `number` | `0` | Starting slide index |
| `trigger` | `'hover' \| 'click'` | `'hover'` | Indicator trigger |
| `autoplay` | `boolean` | `true` | Auto-advance slides |
| `interval` | `number` | `3000` | Autoplay interval (ms) |
| `indicatorPosition` | `'outside' \| 'none' \| ''` | `''` | Indicator position |
| `arrow` | `'always' \| 'hover' \| 'never'` | `'hover'` | Arrow display mode |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slide direction |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `pauseOnHover` | `boolean` | `true` | Pause on mouse hover |

### Carousel Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(current: number, prev: number)` | Active slide changed |

### Carousel Exposed Methods

| Method | Description |
|--------|-------------|
| `setActiveItem(index)` | Set active slide |
| `prev()` | Go to previous slide |
| `next()` | Go to next slide |

### CarouselItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Item identifier |
| `label` | `string \| number` | — | Item label for indicator |
