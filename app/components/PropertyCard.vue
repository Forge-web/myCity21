<script setup lang="ts">
export interface Property {
  id: number
  title: string
  price: number
  area: number
  rooms: number
  floor?: number
  address: string
  image: string
  isNew?: boolean
}

defineProps<{ property: Property }>()

const formatPrice = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)
</script>

<template>
  <NuxtLink
    :to="`/catalog/${property.id}`"
    class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        :src="property.image"
        :alt="property.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <span v-if="property.isNew" class="absolute top-3 left-3 px-2.5 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
        Новинка
      </span>
    </div>

    <div class="p-5 flex flex-col flex-1">
      <h3 class="font-semibold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
        {{ property.title }}
      </h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-1">{{ property.address }}</p>

      <div class="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
        <span class="px-2 py-1 bg-gray-100 rounded-md">{{ property.rooms }} комн.</span>
        <span class="px-2 py-1 bg-gray-100 rounded-md">{{ property.area }} м²</span>
        <span v-if="property.floor" class="px-2 py-1 bg-gray-100 rounded-md">{{ property.floor }} этаж</span>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-lg font-bold text-brand-600">{{ formatPrice(property.price) }}</span>
        <span class="text-sm text-gray-400 group-hover:text-accent-500 transition-colors">Подробнее →</span>
      </div>
    </div>
  </NuxtLink>
</template>