<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  useSlots,
  watch,
} from 'vue'
import { useNamespace } from '@stellux/hooks'
import { inputProps, inputEmits } from './input'

defineOptions({ name: 'StxInput' })

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()

const ns = useNamespace('input')
const nsTextarea = useNamespace('textarea')

const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const focused = ref(false)
const hovering = ref(false)
const passwordVisible = ref(false)
const isComposing = ref(false)

const isTextarea = computed(() => props.type === 'textarea')
const nativeInputRef = computed(() => inputRef.value || textareaRef.value)

const nativeInputValue = computed(() =>
  props.modelValue == null ? '' : String(props.modelValue),
)

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (focused.value || hovering.value),
)

const showPwdToggle = computed(
  () =>
    props.showPassword &&
    !props.disabled &&
    !props.readonly &&
    !!nativeInputValue.value,
)

const showWordLimit = computed(
  () => props.showWordLimit && !!props.maxlength && !props.disabled && !props.readonly,
)

const currentLength = computed(() => String(nativeInputValue.value).length)

const hasSuffix = computed(
  () =>
    !!slots.suffix ||
    !!props.suffixIcon ||
    showClear.value ||
    showPwdToggle.value ||
    showWordLimit.value,
)

const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon)

const inputType = computed(() => {
  if (props.showPassword) {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const classes = computed(() => {
  if (isTextarea.value) {
    return [
      nsTextarea.b(),
      ns.is('disabled', props.disabled),
      ns.is('focused', focused.value),
    ]
  }
  return [
    ns.b(),
    props.size !== 'default' && ns.m(props.size),
    ns.is('disabled', props.disabled),
    ns.is('focused', focused.value),
    ns.is('readonly', props.readonly),
    hasPrefix.value && ns.m('prefix'),
    hasSuffix.value && ns.m('suffix'),
    !!slots.prepend && ns.m('prepend'),
    !!slots.append && ns.m('append'),
  ]
})

const textareaStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.resize) style.resize = props.resize
  return [props.inputStyle, style]
})

function setNativeInputValue() {
  const input = nativeInputRef.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

function handleInput(event: Event) {
  const { value } = event.target as HTMLInputElement
  if (isComposing.value) return
  emit('update:modelValue', value)
  emit('input', value)
  nextTick(setNativeInputValue)
}

function handleChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).value)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false
  emit('blur', event)
}

function handleMouseEnter(event: MouseEvent) {
  hovering.value = true
  emit('mouseenter', event)
}

function handleMouseLeave(event: MouseEvent) {
  hovering.value = false
  emit('mouseleave', event)
}

function handleKeydown(event: KeyboardEvent) {
  emit('keydown', event)
}

function handleCompositionStart() {
  isComposing.value = true
}

function handleCompositionEnd(event: CompositionEvent) {
  isComposing.value = false
  handleInput(event)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  emit('input', '')
}

function handlePasswordToggle() {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => nativeInputRef.value?.focus())
}

function focus() {
  nativeInputRef.value?.focus()
}

function blur() {
  nativeInputRef.value?.blur()
}

function select() {
  nativeInputRef.value?.select()
}

function clear() {
  handleClear()
}

watch(nativeInputValue, () => setNativeInputValue())

onMounted(() => {
  setNativeInputValue()
  if (props.autofocus) focus()
})

defineExpose({ input: nativeInputRef, focus, blur, select, clear })
</script>

<template>
  <!-- Textarea -->
  <div v-if="isTextarea" :class="classes" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <textarea
      ref="textareaRef"
      :class="nsTextarea.e('inner')"
      :style="textareaStyle"
      :value="nativeInputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :tabindex="tabindex"
      :id="id"
      :name="name"
      :form="form"
      :aria-label="ariaLabel"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    <span v-if="showWordLimit" :class="ns.e('count')">
      {{ currentLength }} / {{ maxlength }}
    </span>
  </div>

  <!-- Input -->
  <div v-else :class="classes" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Prepend -->
    <div v-if="$slots.prepend" :class="ns.e('prepend')">
      <slot name="prepend" />
    </div>

    <div :class="ns.e('wrapper')">
      <!-- Prefix -->
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <component v-if="prefixIcon" :is="prefixIcon" :class="ns.e('icon')" />
        </slot>
      </span>

      <!-- Native Input -->
      <input
        ref="inputRef"
        :class="ns.e('inner')"
        :style="inputStyle"
        :type="inputType"
        :value="nativeInputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :tabindex="tabindex"
        :id="id"
        :name="name"
        :form="form"
        :aria-label="ariaLabel"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />

      <!-- Suffix -->
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <!-- Clear -->
        <span
          v-if="showClear"
          :class="ns.e('clear')"
          @click="handleClear"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </span>

        <!-- Password toggle -->
        <span
          v-if="showPwdToggle"
          :class="ns.e('password')"
          @click="handlePasswordToggle"
        >
          <svg v-if="passwordVisible" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </span>

        <!-- Word limit -->
        <span v-if="showWordLimit" :class="ns.e('count')">
          {{ currentLength }} / {{ maxlength }}
        </span>

        <!-- Suffix slot/icon -->
        <slot name="suffix">
          <component v-if="suffixIcon" :is="suffixIcon" :class="ns.e('icon')" />
        </slot>
      </span>
    </div>

    <!-- Append -->
    <div v-if="$slots.append" :class="ns.e('append')">
      <slot name="append" />
    </div>
  </div>
</template>
