<script setup lang="ts">
  import { ref, reactive, h } from 'vue'
  import { StxMessage, StxNotification, StxMessageBox } from 'stellux-ui'

  const loading = ref(false)

  // Phase 3 demo state
  const dialogVisible = ref(false)
  const drawerVisible = ref(false)
  const elementLoading = ref(false)

  // Phase 2 demo state
  const radioValue = ref('option1')
  const checkboxValues = ref(['A'])
  const singleCheckbox = ref(false)
  const switchValue = ref(true)
  const switchLoading = ref(false)
  const inputNumberValue = ref(5)
  const selectValue = ref('')
  const multiSelectValue = ref<string[]>([])
  const formModel = reactive({
    name: '',
    region: '',
    agree: false,
  })

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

    <!-- ============ Button ============ -->
    <section>
      <h2>Button — Basic</h2>
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
      <h2>Button — Plain / Text / Link</h2>
      <div class="demo-row">
        <stx-button type="primary" plain>Plain</stx-button>
        <stx-button type="primary" text>Text</stx-button>
        <stx-button type="primary" link>Link</stx-button>
        <stx-button type="primary" dashed plain>Dashed</stx-button>
        <stx-button type="primary" round>Round</stx-button>
        <stx-button type="primary" circle :icon="SearchIcon" />
      </div>
    </section>

    <section>
      <h2>Button — Loading & Sizes</h2>
      <div class="demo-row">
        <stx-button type="primary" size="small">Small</stx-button>
        <stx-button type="primary" :loading="loading" @click="handleClick">
          {{ loading ? 'Loading...' : 'Click Me' }}
        </stx-button>
        <stx-button type="primary" size="large">Large</stx-button>
      </div>
    </section>

    <section>
      <h2>Button Group</h2>
      <div class="demo-row">
        <stx-button-group>
          <stx-button type="primary">Prev</stx-button>
          <stx-button type="primary">Next</stx-button>
        </stx-button-group>
        <stx-button-group direction="vertical">
          <stx-button type="primary">Top</stx-button>
          <stx-button type="primary">Bottom</stx-button>
        </stx-button-group>
      </div>
    </section>

    <!-- ============ Icon ============ -->
    <section>
      <h2>Icon</h2>
      <div class="demo-row">
        <stx-icon :component="StarIcon" size="24" color="var(--stx-color-warning)" />
        <stx-icon :component="SearchIcon" size="24" color="var(--stx-color-primary)" />
        <stx-icon size="32" color="var(--stx-color-danger)">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </stx-icon>
      </div>
    </section>

    <!-- ============ Link ============ -->
    <section>
      <h2>Link</h2>
      <div class="demo-row">
        <stx-link>Default</stx-link>
        <stx-link type="primary">Primary</stx-link>
        <stx-link type="success">Success</stx-link>
        <stx-link type="warning">Warning</stx-link>
        <stx-link type="danger">Danger</stx-link>
        <stx-link type="info">Info</stx-link>
        <stx-link type="primary" disabled>Disabled</stx-link>
        <stx-link type="primary" :underline="false">No Underline</stx-link>
      </div>
    </section>

    <!-- ============ Text ============ -->
    <section>
      <h2>Text</h2>
      <div class="demo-row">
        <stx-text>Default</stx-text>
        <stx-text type="primary">Primary</stx-text>
        <stx-text type="success">Success</stx-text>
        <stx-text type="warning">Warning</stx-text>
        <stx-text type="danger">Danger</stx-text>
        <stx-text type="info">Info</stx-text>
        <stx-text size="small">Small</stx-text>
        <stx-text size="large">Large</stx-text>
      </div>
      <div style="width: 200px; margin-top: 8px;">
        <stx-text truncated>This is a very long text that should be truncated with ellipsis</stx-text>
      </div>
    </section>

    <!-- ============ Divider ============ -->
    <section>
      <h2>Divider</h2>
      <stx-divider />
      <stx-divider>Center Text</stx-divider>
      <stx-divider content-position="left">Left Text</stx-divider>
      <stx-divider content-position="right">Right Text</stx-divider>
      <stx-divider border-style="dashed" />
      <div class="demo-row">
        <span>Item A</span>
        <stx-divider direction="vertical" />
        <span>Item B</span>
        <stx-divider direction="vertical" />
        <span>Item C</span>
      </div>
    </section>

    <!-- ============ Space ============ -->
    <section>
      <h2>Space</h2>
      <stx-space>
        <stx-button type="primary">Button 1</stx-button>
        <stx-button type="success">Button 2</stx-button>
        <stx-button type="warning">Button 3</stx-button>
      </stx-space>
      <div style="margin-top: 12px">
        <stx-space direction="vertical" :size="16">
          <stx-text>Vertical item 1</stx-text>
          <stx-text>Vertical item 2</stx-text>
          <stx-text>Vertical item 3</stx-text>
        </stx-space>
      </div>
    </section>

    <!-- ============ Tag ============ -->
    <section>
      <h2>Tag</h2>
      <div class="demo-row">
        <stx-tag>Default</stx-tag>
        <stx-tag type="primary">Primary</stx-tag>
        <stx-tag type="success">Success</stx-tag>
        <stx-tag type="warning">Warning</stx-tag>
        <stx-tag type="danger">Danger</stx-tag>
        <stx-tag type="info">Info</stx-tag>
      </div>
      <div class="demo-row" style="margin-top: 8px">
        <stx-tag type="primary" effect="dark">Dark</stx-tag>
        <stx-tag type="primary" effect="plain">Plain</stx-tag>
        <stx-tag type="primary" round>Round</stx-tag>
        <stx-tag type="primary" closable>Closable</stx-tag>
        <stx-tag size="small" type="success">Small</stx-tag>
        <stx-tag size="large" type="success">Large</stx-tag>
      </div>
    </section>

    <!-- ============ Badge ============ -->
    <section>
      <h2>Badge</h2>
      <div class="demo-row">
        <stx-badge :value="12">
          <stx-button>Comments</stx-button>
        </stx-badge>
        <stx-badge :value="200" :max="99">
          <stx-button>Replies</stx-button>
        </stx-badge>
        <stx-badge value="new" type="primary">
          <stx-button>News</stx-button>
        </stx-badge>
        <stx-badge is-dot>
          <stx-button>Dot</stx-button>
        </stx-badge>
      </div>
    </section>

    <!-- ============ Alert ============ -->
    <section>
      <h2>Alert</h2>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <stx-alert type="success" title="Success alert" description="This is a success description." show-icon />
        <stx-alert type="warning" title="Warning alert" show-icon />
        <stx-alert type="info" title="Info alert" description="This is an informational message." show-icon />
        <stx-alert type="error" title="Error alert" show-icon />
        <stx-alert type="info" title="Not closable" :closable="false" />
        <stx-alert type="success" title="Dark effect" effect="dark" show-icon />
      </div>
    </section>

    <!-- ============ Scrollbar ============ -->
    <section>
      <h2>Scrollbar</h2>
      <stx-scrollbar height="150px">
        <div style="padding: 16px;">
          <p v-for="n in 20" :key="n" style="margin: 0 0 8px; color: var(--stx-color-text-regular);">
            Scrollbar content line {{ n }}
          </p>
        </div>
      </stx-scrollbar>
    </section>

    <!-- ============ Tooltip ============ -->
    <section>
      <h2>Tooltip</h2>
      <div class="demo-row">
        <stx-tooltip content="Top tooltip" placement="top">
          <stx-button>Top</stx-button>
        </stx-tooltip>
        <stx-tooltip content="Bottom tooltip (dark)" placement="bottom">
          <stx-button>Bottom</stx-button>
        </stx-tooltip>
        <stx-tooltip content="Light theme tooltip" placement="right" effect="light">
          <stx-button type="primary">Light</stx-button>
        </stx-tooltip>
        <stx-tooltip content="Click trigger" trigger="click">
          <stx-button type="success">Click me</stx-button>
        </stx-tooltip>
      </div>
    </section>

    <!-- ============ Popover ============ -->
    <section>
      <h2>Popover</h2>
      <div class="demo-row">
        <stx-popover title="Title" content="This is the popover content. It supports a title and body.">
          <stx-button type="primary">Click Popover</stx-button>
        </stx-popover>
        <stx-popover content="Hover popover content" trigger="hover" :width="200">
          <stx-button>Hover Popover</stx-button>
        </stx-popover>
      </div>
    </section>

    <!-- ============ Splitter ============ -->
    <section>
      <h2>Splitter</h2>
      <div style="height: 200px; border: 1px solid var(--stx-color-border); border-radius: var(--stx-radius-base); overflow: hidden;">
        <stx-splitter>
          <stx-splitter-panel :size="30" :min="15">
            <div style="padding: 16px; height: 100%; box-sizing: border-box; background: var(--stx-color-bg);">
              <stx-text type="primary">Panel 1 (30%)</stx-text>
            </div>
          </stx-splitter-panel>
          <stx-splitter-panel :size="40" :min="20">
            <div style="padding: 16px; height: 100%; box-sizing: border-box; background: var(--stx-color-bg-page);">
              <stx-text type="success">Panel 2 (40%)</stx-text>
            </div>
          </stx-splitter-panel>
          <stx-splitter-panel :size="30" :min="15">
            <div style="padding: 16px; height: 100%; box-sizing: border-box; background: var(--stx-color-bg);">
              <stx-text type="warning">Panel 3 (30%)</stx-text>
            </div>
          </stx-splitter-panel>
        </stx-splitter>
      </div>
    </section>
    <!-- ============ Dialog ============ -->
    <section>
      <h2>Dialog</h2>
      <stx-button type="primary" @click="dialogVisible = true">Open Dialog</stx-button>
      <stx-dialog v-model="dialogVisible" title="Dialog Title" width="500px">
        <p style="margin: 0;">This is dialog content. It supports focus trap, lock scroll, and escape to close.</p>
        <template #footer>
          <stx-button @click="dialogVisible = false">Cancel</stx-button>
          <stx-button type="primary" @click="dialogVisible = false">Confirm</stx-button>
        </template>
      </stx-dialog>
    </section>

    <!-- ============ Drawer ============ -->
    <section>
      <h2>Drawer</h2>
      <div class="demo-row">
        <stx-button @click="drawerVisible = true">Open Drawer (Right)</stx-button>
      </div>
      <stx-drawer v-model="drawerVisible" title="Drawer Title">
        <p>Drawer content goes here.</p>
        <p>Supports rtl/ltr/ttb/btt directions.</p>
      </stx-drawer>
    </section>

    <!-- ============ Message ============ -->
    <section>
      <h2>Message</h2>
      <div class="demo-row">
        <stx-button @click="StxMessage.info('This is an info message')">Info</stx-button>
        <stx-button type="success" @click="StxMessage.success('Operation succeeded!')">Success</stx-button>
        <stx-button type="warning" @click="StxMessage.warning('Warning message')">Warning</stx-button>
        <stx-button type="danger" @click="StxMessage.error('Error occurred!')">Error</stx-button>
        <stx-button @click="StxMessage({ message: 'Closable message', showClose: true, duration: 0 })">Closable</stx-button>
      </div>
    </section>

    <!-- ============ Notification ============ -->
    <section>
      <h2>Notification</h2>
      <div class="demo-row">
        <stx-button @click="StxNotification({ title: 'Info', message: 'This is a notification' })">Info</stx-button>
        <stx-button type="success" @click="StxNotification.success({ title: 'Success', message: 'Operation completed' })">Success</stx-button>
        <stx-button type="warning" @click="StxNotification.warning({ title: 'Warning', message: 'Please check your input' })">Warning</stx-button>
        <stx-button type="danger" @click="StxNotification.error({ title: 'Error', message: 'Something went wrong' })">Error</stx-button>
      </div>
    </section>

    <!-- ============ MessageBox ============ -->
    <section>
      <h2>MessageBox</h2>
      <div class="demo-row">
        <stx-button @click="StxMessageBox.alert('This is an alert', 'Alert')">Alert</stx-button>
        <stx-button type="primary" @click="StxMessageBox.confirm('Are you sure?', 'Confirm').then(() => StxMessage.success('Confirmed!')).catch(() => StxMessage.info('Cancelled'))">Confirm</stx-button>
        <stx-button type="warning" @click="StxMessageBox.prompt('Enter your name', 'Prompt').then((data) => StxMessage.success('Hello ' + data.value)).catch(() => {})">Prompt</stx-button>
      </div>
    </section>

    <!-- ============ Loading ============ -->
    <section>
      <h2>Loading</h2>
      <div class="demo-row">
        <stx-button @click="elementLoading = !elementLoading">Toggle Loading</stx-button>
      </div>
      <div v-loading="elementLoading" style="height: 120px; border: 1px solid var(--stx-color-border); border-radius: var(--stx-radius-base); margin-top: 12px; display: flex; align-items: center; justify-content: center;">
        <stx-text>Content area (loading: {{ elementLoading }})</stx-text>
      </div>
    </section>

    <!-- ============ Popconfirm ============ -->
    <section>
      <h2>Popconfirm</h2>
      <div class="demo-row">
        <stx-popconfirm title="Are you sure to delete this?" @confirm="StxMessage.success('Deleted!')" @cancel="StxMessage.info('Cancelled')">
          <stx-button type="danger">Delete</stx-button>
        </stx-popconfirm>
      </div>
    </section>

    <!-- ============ Radio ============ -->
    <section>
      <h2>Radio</h2>
      <div class="demo-row">
        <stx-radio-group v-model="radioValue">
          <stx-radio value="option1" label="Option 1" />
          <stx-radio value="option2" label="Option 2" />
          <stx-radio value="option3" label="Option 3" />
          <stx-radio value="option4" label="Disabled" disabled />
        </stx-radio-group>
      </div>
      <stx-text type="info" size="small">Selected: {{ radioValue }}</stx-text>
    </section>

    <!-- ============ Checkbox ============ -->
    <section>
      <h2>Checkbox</h2>
      <div class="demo-row">
        <stx-checkbox v-model="singleCheckbox">Standalone</stx-checkbox>
      </div>
      <div class="demo-row" style="margin-top: 8px;">
        <stx-checkbox-group v-model="checkboxValues">
          <stx-checkbox value="A" label="Option A" />
          <stx-checkbox value="B" label="Option B" />
          <stx-checkbox value="C" label="Option C" />
          <stx-checkbox value="D" label="Disabled" disabled />
        </stx-checkbox-group>
      </div>
      <stx-text type="info" size="small">Checked: {{ checkboxValues.join(', ') }}</stx-text>
    </section>

    <!-- ============ Switch ============ -->
    <section>
      <h2>Switch</h2>
      <div class="demo-row">
        <stx-switch v-model="switchValue" />
        <stx-switch v-model="switchValue" active-text="Open" inactive-text="Close" />
        <stx-switch v-model="switchValue" inline-prompt active-text="Y" inactive-text="N" />
        <stx-switch :model-value="true" disabled />
        <stx-switch v-model="switchLoading" loading />
        <stx-switch v-model="switchValue" size="small" />
        <stx-switch v-model="switchValue" size="large" />
      </div>
    </section>

    <!-- ============ InputNumber ============ -->
    <section>
      <h2>InputNumber</h2>
      <div class="demo-row">
        <stx-input-number v-model="inputNumberValue" :min="1" :max="10" />
        <stx-input-number v-model="inputNumberValue" :step="2" controls-position="right" />
        <stx-input-number :model-value="3" disabled />
      </div>
      <stx-text type="info" size="small">Value: {{ inputNumberValue }}</stx-text>
    </section>

    <!-- ============ Select ============ -->
    <section>
      <h2>Select</h2>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div style="width: 220px;">
          <stx-select v-model="selectValue" placeholder="Single select" clearable>
            <stx-option value="vue" label="Vue.js" />
            <stx-option value="react" label="React" />
            <stx-option value="angular" label="Angular" />
            <stx-option value="svelte" label="Svelte" disabled />
          </stx-select>
        </div>
        <div style="width: 320px;">
          <stx-select v-model="multiSelectValue" multiple placeholder="Multiple select" collapse-tags>
            <stx-option value="js" label="JavaScript" />
            <stx-option value="ts" label="TypeScript" />
            <stx-option value="py" label="Python" />
            <stx-option value="go" label="Go" />
            <stx-option value="rust" label="Rust" />
          </stx-select>
        </div>
      </div>
      <stx-text type="info" size="small" style="margin-top: 8px; display: block;">
        Single: {{ selectValue || '(none)' }} | Multi: {{ multiSelectValue.join(', ') || '(none)' }}
      </stx-text>
    </section>

    <!-- ============ Form ============ -->
    <section>
      <h2>Form</h2>
      <stx-form :model="formModel" label-width="80px" style="max-width: 400px;">
        <stx-form-item label="Name" prop="name" :rules="[{ required: true, message: 'Name is required' }]">
          <stx-input v-model="formModel.name" placeholder="Enter name" />
        </stx-form-item>
        <stx-form-item label="Region" prop="region">
          <stx-select v-model="formModel.region" placeholder="Select region">
            <stx-option value="us" label="United States" />
            <stx-option value="eu" label="Europe" />
            <stx-option value="asia" label="Asia" />
          </stx-select>
        </stx-form-item>
        <stx-form-item label="Agree" prop="agree">
          <stx-checkbox v-model="formModel.agree">I agree to the terms</stx-checkbox>
        </stx-form-item>
        <stx-form-item>
          <stx-button type="primary">Submit</stx-button>
          <stx-button>Cancel</stx-button>
        </stx-form-item>
      </stx-form>
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
    max-width: 900px;
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
