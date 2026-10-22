<script setup lang="ts">
interface Props {
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  rows: 3,
})

const model = defineModel<string>()

const uid = useId()
const inputId = computed(() => props.id ?? `textarea-${uid}`)
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :id="inputId"
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="[
        'w-full rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder-gray-400',
        'px-4 py-2.5 transition resize-y',
        'focus:outline-none focus:ring-2 focus:bg-white',
        error
          ? 'border-red-400 focus:ring-red-400'
          : 'border-gray-200 focus:ring-brand-500 focus:border-transparent',
        disabled && 'opacity-60 cursor-not-allowed',
      ]"
    />

    <p v-if="error" class="mt-1.5 text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>