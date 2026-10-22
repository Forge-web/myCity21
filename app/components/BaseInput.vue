<script setup lang="ts">
interface Props {
  label?: string
  hint?: string
  error?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const model = defineModel<string | number>()

const uid = useId()
const inputId = computed(() => props.id ?? `input-${uid}`)
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <div
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"
      >
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full rounded-lg border bg-gray-50 text-sm text-gray-800 placeholder-gray-400',
          'px-4 py-2.5 transition',
          'focus:outline-none focus:ring-2 focus:bg-white',
          $slots.prefix && 'pl-10',
          $slots.suffix && 'pr-10',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-200 focus:ring-brand-500 focus:border-transparent',
          disabled && 'opacity-60 cursor-not-allowed',
        ]"
      />

      <div
        v-if="$slots.suffix"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400"
      >
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="error" class="mt-1.5 text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>