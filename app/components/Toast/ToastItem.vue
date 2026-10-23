<script setup lang="ts">
import type {
  ToastMessage,
  ToastType,
} from '~/composables/useToast'

const props = defineProps<{
  toast: ToastMessage
}>()

const emit = defineEmits<{
  close: [id: string]
}>()

const colors: Record<ToastType, string> = {
  success: 'border-emerald-300 bg-emerald-50 text-emerald-950',
  error: 'border-red-300 bg-red-50 text-red-950',
  warning: 'border-amber-300 bg-amber-50 text-amber-950',
  info: 'border-sky-300 bg-sky-50 text-sky-950',
}

const titles: Record<ToastType, string> = {
  success: 'Готово',
  error: 'Ошибка',
  warning: 'Внимание',
  info: 'Информация',
}

let timer: ReturnType<typeof setTimeout> | undefined

function close() {
  emit('close', props.toast.id)
}

onMounted(() => {
  if (props.toast.duration > 0) {
    timer = setTimeout(close, props.toast.duration)
  }
})

onBeforeUnmount(() => {
  if (timer !== undefined) {
    clearTimeout(timer)
  }
})
</script>

<template>
  <div
    :role="toast.type === 'error' ? 'alert' : 'status'"
    aria-atomic="true"
    class="pointer-events-auto flex w-full items-start gap-3
           rounded-xl border p-4 shadow-lg"
    :class="colors[toast.type]"
  >
    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold">
        {{ titles[toast.type] }}
      </p>

      <p class="mt-1 whitespace-pre-wrap break-words text-sm">
        {{ toast.message }}
      </p>
    </div>

    <button
      type="button"
      aria-label="Закрыть уведомление"
      class="shrink-0 rounded-md p-1 opacity-60
             hover:opacity-100
             focus-visible:outline-2
             focus-visible:outline-offset-2
             focus-visible:outline-current"
      @click="close"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>
