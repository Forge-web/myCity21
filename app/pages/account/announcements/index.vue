<script setup lang="ts">

definePageMeta({
	layout: 'cabinet',
	middleware: ['auth'],
})

const {data, error} = await useFetch('/api/announcements/edit/own', {
	method: "GET"
})


</script>

<template>
	<pre>
		{{ data }}
	</pre>
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
				
			</div>
		</div>
	</div>
</template>