<script setup lang="ts">
const route = useRoute()
const { data: getProperty } = await useFetch(`/api/properties/${route.params.id}`)

const property = ref(getProperty.value![0]);

if (!property.value) {
  throw createError({ statusCode: 404, statusMessage: 'Объект не найден' })
}

useHead({ title: property.value.title })

const formatPrice = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v)

const form = reactive({ name: '', phone: '', comment: '' })
const sent = ref(false)
function submit() {
  // TODO: заменить на реальную отправку (useFetch('/api/leads', { method: 'POST', body: form }))
  sent.value = true
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <NuxtLink to="/catalog" class="text-sm text-brand-600 hover:underline">← Назад в каталог</NuxtLink>

    <div class="mt-4 grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <div class="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
          <img :src="property!.image" :alt="property!.title" class="w-full h-full object-cover" />
        </div>

        <h1 class="mt-6 text-3xl font-bold text-gray-900">{{ property!.title }}</h1>
        <p class="text-gray-500 mt-1">{{ property!.address }}</p>
        <p class="mt-4 text-2xl font-bold text-brand-600">{{ formatPrice(property!.price) }}</p>

        <dl class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-4 border border-gray-100">
            <dt class="text-xs text-gray-500">Комнат</dt>
            <dd class="text-lg font-semibold text-gray-900">{{ property!.rooms }}</dd>
          </div>
          <div class="bg-white rounded-xl p-4 border border-gray-100">
            <dt class="text-xs text-gray-500">Площадь</dt>
            <dd class="text-lg font-semibold text-gray-900">{{ property!.area }} м²</dd>
          </div>
          <div v-if="property!.floor" class="bg-white rounded-xl p-4 border border-gray-100">
            <dt class="text-xs text-gray-500">Этаж</dt>
            <dd class="text-lg font-semibold text-gray-900">{{ property!.floor }}</dd>
          </div>
        </dl>

        <div class="mt-8 prose max-w-none text-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Описание</h2>
          <p>{{ property!.description ?? 'Описание объекта будет добавлено позже.' }}</p>
        </div>
      </div>

      <aside class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h3 class="font-semibold text-gray-900 mb-4">Записаться на просмотр</h3>
          <form v-if="!sent" class="space-y-3" @submit.prevent="submit">
            <input v-model="form.name" required placeholder="Ваше имя" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <input v-model="form.phone" required type="tel" placeholder="Телефон" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <textarea v-model="form.comment" rows="3" placeholder="Комментарий" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            <button type="submit" class="w-full rounded-lg bg-accent-500 text-white font-semibold py-2.5 hover:bg-accent-600 transition-colors">
              Отправить заявку
            </button>
          </form>
          <p v-else class="text-green-600 text-sm">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
        </div>
      </aside>
    </div>
  </div>
</template>