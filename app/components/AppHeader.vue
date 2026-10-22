<script setup lang="ts">
const isOpen = ref(false)
const nav = [
  { label: 'Главная', to: '/' },
  { label: 'Каталог', to: '/catalog' },
  { label: 'О компании', to: '/about' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'Кабинет', to: '/account'},
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold font-[--font-heading]">МГ</div>
          <span class="font-[--font-heading] font-bold text-lg text-gray-900 hidden sm:inline">Мой город 21</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
            active-class="text-brand-600"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <a href="tel:+79000000000" class="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-brand-600">
            <span>+7 (900) 000-00-00</span>
          </a>
          <button class="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">
            Заказать звонок
          </button>
          <button class="md:hidden p-2" @click="isOpen = !isOpen" aria-label="Меню">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <Transition name="fade">
        <nav v-if="isOpen" class="md:hidden pb-4 flex flex-col gap-1">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            @click="isOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>