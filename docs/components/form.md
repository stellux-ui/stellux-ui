# Form

Collect and validate user input with form fields.

## Basic Usage

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-form label-width="80px" style="max-width: 400px">
    <stx-form-item label="Name">
      <stx-input placeholder="Enter name" />
    </stx-form-item>
    <stx-form-item label="Region">
      <stx-select placeholder="Select">
        <stx-option value="us" label="United States" />
        <stx-option value="eu" label="Europe" />
      </stx-select>
    </stx-form-item>
    <stx-form-item>
      <stx-button type="primary">Submit</stx-button>
      <stx-button>Cancel</stx-button>
    </stx-form-item>
  </stx-form>
</div>

```vue
<stx-form label-width="80px" style="max-width: 400px">
  <stx-form-item label="Name">
    <stx-input placeholder="Enter name" />
  </stx-form-item>
  <stx-form-item label="Region">
    <stx-select placeholder="Select">
      <stx-option value="us" label="United States" />
      <stx-option value="eu" label="Europe" />
    </stx-select>
  </stx-form-item>
  <stx-form-item>
    <stx-button type="primary">Submit</stx-button>
    <stx-button>Cancel</stx-button>
  </stx-form-item>
</stx-form>
```

## Label Position

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-form label-width="80px" label-position="top" style="max-width: 400px">
    <stx-form-item label="Name">
      <stx-input placeholder="Enter name" />
    </stx-form-item>
    <stx-form-item label="Email">
      <stx-input placeholder="Enter email" />
    </stx-form-item>
  </stx-form>
</div>

```vue
<stx-form label-width="80px" label-position="top" style="max-width: 400px">
  <stx-form-item label="Name">
    <stx-input placeholder="Enter name" />
  </stx-form-item>
  <stx-form-item label="Email">
    <stx-input placeholder="Enter email" />
  </stx-form-item>
</stx-form>
```

## Inline Form

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-form inline>
    <stx-form-item label="Name">
      <stx-input placeholder="Enter name" />
    </stx-form-item>
    <stx-form-item label="Region">
      <stx-input placeholder="Enter region" />
    </stx-form-item>
    <stx-form-item>
      <stx-button type="primary">Search</stx-button>
    </stx-form-item>
  </stx-form>
</div>

```vue
<stx-form inline>
  <stx-form-item label="Name">
    <stx-input placeholder="Enter name" />
  </stx-form-item>
  <stx-form-item label="Region">
    <stx-input placeholder="Enter region" />
  </stx-form-item>
  <stx-form-item>
    <stx-button type="primary">Search</stx-button>
  </stx-form-item>
</stx-form>
```

## With Validation

<div class="demo-block" style="flex-direction: column; width: 100%;">
  <stx-form label-width="100px" style="max-width: 450px">
    <stx-form-item label="Username" required>
      <stx-input placeholder="Enter username" />
    </stx-form-item>
    <stx-form-item label="Email" required>
      <stx-input placeholder="Enter email" />
    </stx-form-item>
    <stx-form-item label="Password" required>
      <stx-input type="password" placeholder="Enter password" show-password />
    </stx-form-item>
    <stx-form-item label="Agree">
      <stx-checkbox label="I accept the terms" />
    </stx-form-item>
    <stx-form-item>
      <stx-button type="primary">Register</stx-button>
      <stx-button>Reset</stx-button>
    </stx-form-item>
  </stx-form>
</div>

```vue
<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
})

const rules = {
  username: [
    { required: true, message: 'Please enter username', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Invalid email format', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'At least 6 characters', trigger: 'blur' },
  ],
}
</script>

<stx-form :model="form" :rules="rules" label-width="100px">
  <stx-form-item label="Username" prop="username">
    <stx-input v-model="form.username" />
  </stx-form-item>
  <stx-form-item label="Email" prop="email">
    <stx-input v-model="form.email" />
  </stx-form-item>
  <stx-form-item label="Password" prop="password">
    <stx-input v-model="form.password" type="password" show-password />
  </stx-form-item>
</stx-form>
```

## API

### Form Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model` | `Record<string, any>` | — | Form data object |
| `rules` | `FormRules` | — | Validation rules |
| `labelWidth` | `string \| number` | `''` | Label width |
| `labelPosition` | `'left' \| 'right' \| 'top'` | `'right'` | Label position |
| `labelSuffix` | `string` | `''` | Label suffix text |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size for all form items |
| `disabled` | `boolean` | `false` | Disable all form items |
| `inline` | `boolean` | `false` | Inline form layout |
| `showMessage` | `boolean` | `true` | Show validation messages |
| `statusIcon` | `boolean` | `false` | Show validation status icon |
| `hideRequiredAsterisk` | `boolean` | `false` | Hide required asterisk |
| `requireAsteriskPosition` | `'left' \| 'right'` | `'left'` | Asterisk position |
| `scrollToError` | `boolean` | `false` | Scroll to first error on validate |

### Form Exposed Methods

| Method | Description |
|--------|-------------|
| `validate(callback?)` | Validate all fields |
| `validateField(props, callback?)` | Validate specific fields |
| `resetFields(props?)` | Reset fields to initial values |
| `clearValidate(props?)` | Clear validation messages |
| `scrollToField(prop)` | Scroll to specific field |

### FormItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop` | `string` | `''` | Model key for validation |
| `label` | `string` | `''` | Label text |
| `labelWidth` | `string \| number` | `''` | Override form label width |
| `required` | `boolean` | — | Show required asterisk |
| `rules` | `RuleItem \| RuleItem[]` | — | Item-level validation rules |
| `error` | `string` | `''` | Manual error message |
| `showMessage` | `boolean` | `true` | Show validation message |
| `size` | `'small' \| 'default' \| 'large'` | `''` | Override form size |
| `inlineMessage` | `string \| boolean` | `''` | Inline error message |
| `for` | `string` | `''` | Native label `for` attribute |

### FormItem Slots

| Slot | Description |
|------|-------------|
| `default` | Form control content |
| `label` | Custom label content |
| `error` | Custom error message |
