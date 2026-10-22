<script setup lang="ts">
const emit = defineEmits<{
  search: [filters: { rooms: string; type: string; minPrice: string; maxPrice: string }]
}>()

const filters = reactive({ rooms: '', type: '', minPrice: '', maxPrice: '' })

const typeOptions = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'commercial', label: 'Коммерческая' },
]

const roomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' },
]

function submit() {
  emit('search', { ...filters })
}
</script>

<template>
  <form
    class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
    @submit.prevent="submit"
  >
    <BaseSelect v-model="filters.type" :options="typeOptions" placeholder="Тип недвижимости" />
    <BaseSelect v-model="filters.rooms" :options="roomOptions" placeholder="Комнат" />
    <BaseInput v-model="filters.minPrice" type="number" placeholder="Цена от, ₽" />
    <BaseInput v-model="filters.maxPrice" type="number" placeholder="Цена до, ₽" />
    <BaseButton type="submit" block>Найти</BaseButton>
  </form>
</template>