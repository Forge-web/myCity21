<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const { loggedIn } = useUserSession();


</script>

<template>
  <div class="w-full bg-white border-b border-gray-200">

    <header class="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
      <NuxtLink to="/">
        <!-- Логотип -->
        <div class="inline-flex flex-col select-none">
          <span class="text-[17px] md:text-[22px] font-bold text-black tracking-tight leading-none">
            Мой город
          </span>
          <p class="text-[10px] md:text-[11px] font-normal text-black tracking-normal leading-none mt-0.5">
            информационное<br>агентство
          </p>
        </div>
      </NuxtLink>
      
      <!-- Кнопки для ПК -->
      <div class="hidden md:flex gap-3">
		<NuxtLink to="/account/register" class="w-full" :class="loggedIn ? 'hidden' : '' ">
        	<button class="text-sm font-bold text-black bg-white border border-black rounded-lg px-6 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
				Регистрация
			</button>
		</NuxtLink>
		<NuxtLink to="/account/login" class="w-full" :class="loggedIn ? 'hidden' : '' ">
			<button class="text-sm font-bold text-black bg-white border border-black rounded-lg px-5 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
				Войти
			</button>
		</NuxtLink>
		<NuxtLink to="/account" :class="loggedIn ? '' : 'hidden' " class="w-full">
			<button class="text-sm font-bold text-black bg-white border border-black rounded-lg px-5 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-700">
				Кабинет
			</button>
		</NuxtLink>
      </div>

      <!-- Кнопка-бургер-->
      <UButton
          :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          size="xl"
          color="neutral"
          variant="ghost"
          aria-label="Меню"
          class="md:hidden !text-black hover:bg-transparent"
          @click="isMenuOpen = !isMenuOpen"
        />
    </header>
          

      <!--Версия NavMenu для пк -->
      <div class="hidden md:block border-t border-gray-100">
        <NavMenu />
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
