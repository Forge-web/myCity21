<script setup lang="ts">

definePageMeta({
	layout: 'cabinet',
	middleware: ['auth'],
})

const {data, error} = await useFetch('/api/announcements/edit', {
	body: {}
})

const createAnnouncements = async () => {

}

</script>

<template>
	<div class="w-full flex flex-col">
		
		<BaseButton>
			<NuxtLink to="/account/announcements/create"
				class="w-full"
			>
				Создать объявление
			</NuxtLink>
		</BaseButton>

		<div class="w-full">
			<h2 class="text-xl">Ваши объявления</h2>
			<div class="flex">
				<!-- <PropertyCard v-for="value in data.value" /> -->
			</div>
		</div>
	</div>
</template>