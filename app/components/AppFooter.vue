<template>
  <footer class="bg-gray-900 text-gray-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">МГ</div>
          <span class="font-[--font-heading] font-bold text-lg text-white">Мой город 21</span>
        </div>
        <p class="text-sm leading-relaxed">
          Агентство недвижимости и информационное агентство в Алатыре. Работаем с 2009 года.
        </p>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-4">Навигация</h4>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/" class="hover:text-white">Главная</NuxtLink></li>
          <li><NuxtLink to="/catalog" class="hover:text-white">Каталог</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-white">О компании</NuxtLink></li>
          <li><NuxtLink to="/contacts" class="hover:text-white">Контакты</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-4">Контакты</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="tel:+79000000000" class="hover:text-white">+7 (900) 000-00-00</a></li>
          <li><a href="mailto:info@мойгород21.рф" class="hover:text-white">info@мойгород21.рф</a></li>
          <li>г. Алатырь, Чувашская Республика</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
      © {{ new Date().getFullYear() }} Мой город 21. Все права защищены.
    </div>
  </footer>
</template>