<script setup lang="ts">
useHead({ title: 'Каталог недвижимости' })

const route = useRoute()

const filters = reactive({
  rooms: (route.query.rooms as string) || '',
  type: (route.query.type as string) || '',
  minPrice: (route.query.minPrice as string) || '',
  maxPrice: (route.query.maxPrice as string) || '',
})

// Watch route query changes so page reacts when user navigates with new params
watch(() => route.query, (q) => {
  filters.rooms = (q.rooms as string) || ''
  filters.type = (q.type as string) || ''
  filters.minPrice = (q.minPrice as string) || ''
  filters.maxPrice = (q.maxPrice as string) || ''
})

const { data: properties, pending } = await useFetch('/api/properties', {
  query: filters,
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Каталог недвижимости</h1>

    <SearchFilters @search="(f) => $router.push({ path: '/catalog', query: f })" />

    <div class="mt-8">
      <p v-if="pending" class="text-gray-500">Загрузка...</p>
      <div v-else-if="properties?.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PropertyCard v-for="p in properties" :key="p.id" :property="p" />
      </div>
      <p v-else class="text-gray-500">По вашему запросу ничего не найдено. Попробуйте изменить фильтры.</p>
    </div>
  </div>
</template>