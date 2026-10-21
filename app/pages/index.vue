<script setup lang="ts">
useHead({ title: 'Агентство недвижимости в Алатыре' })

const { data: properties } = await useFetch('/api/properties')

const advantages = [
  { icon: '🏆', title: 'С 2009 года', text: 'Более 15 лет на рынке недвижимости Алатыря.' },
  { icon: '📜', title: 'Госпрограммы', text: 'Помогаем с оформлением ипотеки и субсидий.' },
  { icon: '🤝', title: 'Личный подход', text: 'Подберём объект под ваш бюджет и задачи.' },
  { icon: '📞', title: 'Всегда на связи', text: 'Сопровождаем сделку на всех этапах.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-brand-600 to-brand-500 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 class="font-[--font-heading] text-3xl sm:text-5xl font-extrabold max-w-3xl leading-tight">
          Найдите квартиру мечты в Алатыре
        </h1>
        <p class="mt-4 text-lg text-brand-100 max-w-2xl">
          Проверенные объекты, помощь в оформлении документов и честные консультации с 2009 года.
        </p>
        <div class="mt-8 max-w-4xl">
          <SearchFilters @search="(f) => $router.push({ path: '/catalog', query: f })" />
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Почему мы</h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="a in advantages" :key="a.title" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div class="text-3xl mb-3">{{ a.icon }}</div>
          <h3 class="font-semibold text-gray-900 mb-1">{{ a.title }}</h3>
          <p class="text-sm text-gray-600">{{ a.text }}</p>
        </div>
      </div>
    </section>

    <!-- Latest properties -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Свежие предложения</h2>
        <NuxtLink to="/catalog" class="text-sm font-semibold text-brand-600 hover:text-brand-700">
          Весь каталог →
        </NuxtLink>
      </div>

      <div v-if="properties?.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PropertyCard v-for="p in properties" :key="p.id" :property="p" />
      </div>
      <p v-else class="text-gray-500">Пока нет опубликованных объектов.</p>
    </section>
  </div>

</template>