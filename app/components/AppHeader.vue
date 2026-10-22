<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

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
  <div class="w-full bg-white border-b border-gray-200">

    <div class="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
      <header class="inline-flex flex-col select-none">
        <h1 class="text-[17px] md:text-[22px] font-bold text-black tracking-tight leading-none">
          Мой город
        </h1>
        <p class="text-[10px] md:text-[11px] font-normal text-black tracking-normal leading-none mt-0.5">
          информационное<br>агентство
        </p>
      </header>

      <!-- Кнопки для ПК -->
      <div class="hidden md:flex gap-3">
        <button class="text-sm font-bold text-black bg-white border border-black rounded-lg px-6 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
          Регистрация
        </button>
        <button class="text-sm font-bold text-black bg-white border border-black rounded-lg px-5 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
          Войти
        </button>
      </div>

      <!-- Кнопка-бургер-->
      <UButton
          :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          size="xl"
          variant="ghost"
          aria-label="Меню"
          class="md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        />
    </div>

    <!-- Мобильное выпадающее меню-->
    <div 
      v-if="isMenuOpen" 
      class="block md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3"
    >

      <div class="block w-full border-l-2" @click="isMenuOpen = false">
        <NavMenu />
      </div>

      <button class="w-full text-sm font-bold text-white bg-black rounded-lg py-2.5 text-center cursor-pointer">
        Регистрация
      </button>
      <button class="w-full text-sm font-bold text-black bg-white border border-black rounded-lg py-2.5 text-center cursor-pointer">
        Войти
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
