<script setup lang="ts">
  import { ref, h } from 'vue'

  const loading = ref(false)

  function handleClick() {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }

  const StarIcon = () =>
    h('svg', { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', {
        d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
      })
    ])

  const SearchIcon = () =>
    h(
      'svg',
      {
        width: '1em',
        height: '1em',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round'
      },
      [h('circle', { cx: '11', cy: '11', r: '8' }), h('path', { d: 'M21 21l-4.35-4.35' })]
    )
</script>

<template>
  <div class="playground">
    <h1>Stellux UI Playground</h1>
    <p class="subtitle">High Freedom / High Inclusivity / High Performance</p>

    <section>
      <h2>Basic</h2>
      <div class="demo-row">
        <stx-button>Default</stx-button>
        <stx-button type="primary">Primary</stx-button>
        <stx-button type="success">Success</stx-button>
        <stx-button type="warning">Warning</stx-button>
        <stx-button type="danger">Danger</stx-button>
        <stx-button type="info">Info</stx-button>
      </div>
    </section>

    <section>
      <h2>Plain</h2>
      <div class="demo-row">
        <stx-button plain>Plain</stx-button>
        <stx-button type="primary" plain>Primary</stx-button>
        <stx-button type="success" plain>Success</stx-button>
        <stx-button type="warning" plain>Warning</stx-button>
        <stx-button type="danger" plain>Danger</stx-button>
        <stx-button type="info" plain>Info</stx-button>
      </div>
    </section>

    <section>
      <h2>Dashed</h2>
      <div class="demo-row">
        <stx-button dashed>Dashed</stx-button>
        <stx-button type="primary" dashed plain>Primary</stx-button>
        <stx-button type="danger" dashed plain>Danger</stx-button>
      </div>
    </section>

    <section>
      <h2>Text</h2>
      <div class="demo-row">
        <stx-button text>Text</stx-button>
        <stx-button type="primary" text>Primary</stx-button>
        <stx-button type="success" text>Success</stx-button>
        <stx-button type="danger" text>Danger</stx-button>
      </div>
    </section>

    <section>
      <h2>Link</h2>
      <div class="demo-row">
        <stx-button link>Link</stx-button>
        <stx-button type="primary" link>Primary</stx-button>
        <stx-button type="success" link>Success</stx-button>
        <stx-button type="danger" link>Danger</stx-button>
      </div>
    </section>

    <section>
      <h2>Round & Circle</h2>
      <div class="demo-row">
        <stx-button type="primary" round>Round</stx-button>
        <stx-button type="success" round>Success</stx-button>
        <stx-button type="primary" circle :icon="SearchIcon" />
        <stx-button type="success" circle :icon="StarIcon" />
        <stx-button circle :icon="SearchIcon" />
      </div>
    </section>

    <section>
      <h2>Icon</h2>
      <div class="demo-row">
        <stx-button type="primary" :icon="SearchIcon">Search</stx-button>
        <stx-button type="success" :icon="StarIcon">Star</stx-button>
        <stx-button :icon="SearchIcon">Search</stx-button>
      </div>
    </section>

    <section>
      <h2>Sizes</h2>
      <div class="demo-row">
        <stx-button type="primary" size="small">Small</stx-button>
        <stx-button type="primary">Default</stx-button>
        <stx-button type="primary" size="large">Large</stx-button>
      </div>
    </section>

    <section>
      <h2>Disabled</h2>
      <div class="demo-row">
        <stx-button disabled>Disabled</stx-button>
        <stx-button type="primary" disabled>Primary</stx-button>
        <stx-button type="primary" plain disabled>Plain</stx-button>
        <stx-button type="primary" text disabled>Text</stx-button>
        <stx-button type="primary" link disabled>Link</stx-button>
      </div>
    </section>

    <section>
      <h2>Loading</h2>
      <div class="demo-row">
        <stx-button type="primary" :loading="loading" @click="handleClick">
          {{ loading ? 'Loading...' : 'Click Me' }}
        </stx-button>
        <stx-button type="success" loading>Loading</stx-button>
      </div>
    </section>

    <section>
      <h2>Custom Color</h2>
      <div class="demo-row">
        <stx-button color="#626aef">Indigo</stx-button>
        <stx-button color="#ff6700">Orange</stx-button>
        <stx-button color="#626aef" plain>Plain</stx-button>
        <stx-button color="#ff6700" plain>Plain</stx-button>
        <stx-button color="#626aef" text>Text</stx-button>
      </div>
    </section>

    <section>
      <h2>Custom Tag</h2>
      <div class="demo-row">
        <stx-button tag="a" type="primary">As &lt;a&gt;</stx-button>
        <stx-button tag="div" type="success">As &lt;div&gt;</stx-button>
      </div>
    </section>

    <section>
      <h2>Button Group</h2>
      <div class="demo-row">
        <stx-button-group>
          <stx-button type="primary">Prev</stx-button>
          <stx-button type="primary">Next</stx-button>
        </stx-button-group>

        <stx-button-group>
          <stx-button type="primary" :icon="StarIcon" />
          <stx-button type="primary" :icon="SearchIcon" />
        </stx-button-group>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <stx-button-group direction="vertical">
          <stx-button type="primary">Top</stx-button>
          <stx-button type="primary">Middle</stx-button>
          <stx-button type="primary">Bottom</stx-button>
        </stx-button-group>
      </div>
    </section>
  </div>
</template>

<style>
  body {
    margin: 0;
    background: var(--stx-color-bg-page);
    font-family: var(--stx-font-family);
  }

  .playground {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .playground h1 {
    font-size: 28px;
    color: var(--stx-color-text-primary);
    margin: 0 0 8px;
  }

  .playground .subtitle {
    color: var(--stx-color-text-secondary);
    margin: 0 0 40px;
  }

  .playground h2 {
    font-size: 16px;
    color: var(--stx-color-text-primary);
    margin: 0 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--stx-color-border-light);
  }

  .playground section {
    margin-bottom: 32px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }
</style>
