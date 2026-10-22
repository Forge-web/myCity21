<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="hidden md:block">
      <NavMenu />
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>