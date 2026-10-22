<script setup lang="ts">
definePageMeta({
  layout: 'cabinet',
  middleware: 'auth',
})

useHead({ title: 'Личный кабинет' })

const { user } = useUserSession();

const { data, pending } = await useFetch('/api/cabinet/overview')

const stats = computed(() => [
  { label: 'В избранном', value: data.value?.stats.favorites ?? 0, icon: '❤️' },
  { label: 'Активных заявок', value: data.value?.stats.activeRequests ?? 0, icon: '📩' },
  { label: 'Просмотров объектов', value: data.value?.stats.views ?? 0, icon: '👁️' },
])

const formatPrice = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

const statusLabels: Record<string, { label: string; class: string }> = {
	new: { label: 'Новая', class: 'bg-blue-100 text-blue-700' },
	in_progress: { label: 'В работе', class: 'bg-amber-100 text-amber-700' },
	done: { label: 'Завершена', class: 'bg-green-100 text-green-700' },
	cancelled: { label: 'Отменена', class: 'bg-gray-100 text-gray-600' },
}
</script>

<template>
  <div class="">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Здравствуйте, {{ user?.login ?? 'друг' }}!</h1>

    <!-- Stats -->
    <div class="grid gap-4 sm:grid-cols-3">
      <div v-for="s in stats" :key="s.label" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div class="text-2xl mb-2">{{ s.icon }}</div>
        <p class="text-2xl font-bold text-gray-900">{{ pending ? '—' : s.value }}</p>
        <p class="text-sm text-gray-500">{{ s.label }}</p>
      </div>
    </div>

    <!-- Recent requests -->
    <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-gray-900">Последние заявки</h2>
        <NuxtLink to="/cabinet/requests" class="text-sm text-brand-600 hover:underline">Все заявки →</NuxtLink>
      </div>

      <p v-if="pending" class="text-sm text-gray-500">Загрузка...</p>
      <p v-else-if="!data?.recentRequests.length" class="text-sm text-gray-500">
        У вас пока нет заявок. <NuxtLink to="/catalog" class="text-brand-600 hover:underline">Открыть каталог</NuxtLink>
      </p>
      <ul v-else class="divide-y divide-gray-100">
        <li v-for="r in data.recentRequests" :key="r.id" class="py-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="font-medium text-gray-900 truncate">{{ r.propertyTitle }}</p>
            <p class="text-xs text-gray-500">{{ new Date(r.createdAt).toLocaleDateString('ru-RU') }}</p>
          </div>
          <span
            class="text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
            :class="statusLabels[r.status]?.class"
          >
            {{ statusLabels[r.status]?.label ?? r.status }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Recent favorites -->
    <section class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-gray-900">Недавно добавленные в избранное</h2>
        <NuxtLink to="/cabinet/favorites" class="text-sm text-brand-600 hover:underline">Все избранное →</NuxtLink>
      </div>

      <p v-if="pending" class="text-sm text-gray-500">Загрузка...</p>
      <p v-else-if="!data?.recentFavorites.length" class="text-sm text-gray-500">
        Вы ещё не добавляли объекты в избранное.
      </p>
      <ul v-else class="divide-y divide-gray-100">
        <li v-for="f in data.recentFavorites" :key="f.id" class="py-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <NuxtLink :to="`/catalog/${f.id}`" class="font-medium text-gray-900 hover:text-brand-600 truncate block">
              {{ f.title }}
            </NuxtLink>
            <p class="text-xs text-gray-500">{{ f.address }}</p>
          </div>
          <span class="text-sm font-semibold text-brand-600 whitespace-nowrap">{{ formatPrice(f.price) }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>