<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  label?: string
  error?: string
  placeholder?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
})

const model = defineModel<string | number>()

const uid = useId()
const inputId = computed(() => props.id ?? `select-${uid}`)
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <select
      :id="inputId"
      v-model="model"
      :disabled="disabled"
      :required="required"
      :class="[
        'w-full rounded-lg border bg-gray-50 text-sm text-gray-800 appearance-none',
        'px-4 py-2.5 transition cursor-pointer',
        'focus:outline-none focus:ring-2 focus:bg-white',
        error
          ? 'border-red-400 focus:ring-red-400'
          : 'border-gray-200 focus:ring-brand-500 focus:border-transparent',
        disabled && 'opacity-60 cursor-not-allowed',
      ]"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <p v-if="error" class="mt-1.5 text-xs text-red-500">{{ error }}</p>
  </div>
</template>