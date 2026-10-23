<script setup lang="ts">
import AppToaster from '~/components/Toast/AppToaster.vue';

</script>

<template>
  <ClientOnly>
	<AppToaster />
  </ClientOnly>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>