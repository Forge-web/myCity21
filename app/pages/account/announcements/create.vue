<script setup lang="ts">
import type {createAnnouncements} from '#shared/types/announcements/create'
import { useToast } from '~/composables/useToast';

definePageMeta({
	layout: 'cabinet',
	middleware: 'auth'
})

const toast = useToast();

const credentials = reactive<createAnnouncements>({
	title: '',
	description: '',
	price: null,
	area: 0,
	rooms: 0,
	address: '',
	images: [''],
	activity: true
})

async function createAnnouncementsFunc() {
	try {
		const { data, error } = await useFetch('/api/announcements/edit/create', {
			method: 'POST',
			body: credentials
		})
		
		if (error.value) {
			toast.error(`Не удалось создать объявление\n${error.value?.message}`)	
		} else if (data.value?.success) {
			toast.success(`Объявление успешно создано`);
		}

	} catch (e: any) {
		toast.error('Не удалось создать объявление')
	}
}

function fakeData() {
	credentials.title = "Title";
	credentials.description = "DESC";
	credentials.price = 1999000.23;
	credentials.area = 42;
	credentials.rooms = 4;
	credentials.address = "ADDRESS";
	credentials.activity = false;
}

</script>

<template>
	<div class="flex flex-col gap-5">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Новое объявление</h1>
	
		<div class="w-full text-start items-start">
			<form @submit.prevent="createAnnouncementsFunc" class="flex flex-col gap-5">
	
				<BaseInput label="Название" v-model="credentials.title" type="text" required />
				<BaseTextarea label="Описание" v-model="credentials.description" type="text" />
				<BaseInput label="Площадь" v-model="credentials.area" type="decimal" />
				<BaseInput label="Комнат" v-model="credentials.rooms" type="number" />
				<BaseTextarea label="Адрес" v-model="credentials.address" type="text" required />
				<!-- <BaseInput label="Фотографии" v-model="credentials.images" type="file" multiple /> -->
				<BaseInput label="Стоимость" v-model="credentials.price" type="decimal" />
				<BaseInput label="Объявление будет активно" v-model="credentials.activity" type="checkbox" />
				<BaseButton type="submit">
					Создать
				</BaseButton>
				<BaseButton @click="fakeData">
					FakeData
				</BaseButton>
			</form>	
		</div>
	</div>

</template>