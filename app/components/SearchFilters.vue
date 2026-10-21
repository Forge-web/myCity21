<script setup lang="ts">
const emit = defineEmits<{
  search: [filters: { rooms: string; type: string; minPrice: string; maxPrice: string }]
}>()

const filters = reactive({ rooms: '', type: '', minPrice: '', maxPrice: '' })

function submit() {
  emit('search', { ...filters })
}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
  >
    <select v-model="filters.type" class="input">
      <option value="">Тип недвижимости</option>
      <option value="apartment">Квартира</option>
      <option value="house">Дом</option>
      <option value="commercial">Коммерческая</option>
    </select>

    <select v-model="filters.rooms" class="input">
      <option value="">Комнат</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4+">4+</option>
    </select>

    <input v-model="filters.minPrice" type="number" placeholder="Цена от, ₽" class="input" />
    <input v-model="filters.maxPrice" type="number" placeholder="Цена до, ₽" class="input" />

    <button type="submit" class="w-full rounded-lg bg-brand-600 text-white font-semibold py-2.5 hover:bg-brand-700 transition-colors">
      Найти
    </button>
  </form>
</template>

<style scoped>

</style>