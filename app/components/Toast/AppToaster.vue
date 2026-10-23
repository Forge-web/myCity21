<script setup lang="ts">
import { useToast } from '~/composables/useToast';
const { toasts, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <section
      aria-label="Уведомления"
      class="pointer-events-none fixed inset-x-4 top-4
             z-[1000] max-h-[calc(100dvh-2rem)] overflow-y-auto
             sm:left-auto sm:w-96"
    >
      <TransitionGroup
        tag="div"
        class="relative flex flex-col gap-3"
        enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
      >
        <ToastItem
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @close="remove"
        />
      </TransitionGroup>
    </section>
  </Teleport>
</template>
