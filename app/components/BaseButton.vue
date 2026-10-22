<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  block: false,
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const isDisabled = computed(() => props.disabled || props.loading)

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500',
  outline: 'border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus-visible:ring-brand-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
} as const

const sizes = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-6 py-3 gap-2',
} as const

const classes = computed(() => [
  'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  variants[props.variant],
  sizes[props.size],
  props.block && 'w-full',
])
</script>

<template>
  <NuxtLink v-if="to && !isDisabled" :to="to" :class="classes">
    <slot />
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="isDisabled"
    :class="classes"
    @click="emit('click', $event)"
  >
    <svg v-if="loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity=".25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <slot />
  </button>
</template>