<script setup lang="ts">
import type {createAnnouncements} from '#shared/types/announcements/create'
import type { ListingPhoto } from '#shared/types/announcements/photos'

import { useToast } from '~/composables/useToast';


const uploading = ref(false)
const error = ref<string | null>(null)
const photos = ref<ListingPhoto[]>([])

definePageMeta({
	layout: 'cabinet',
	middleware: 'auth'
})

const toast = useToast();

const credentials = ref<createAnnouncements>({
	title: '',
	description: '',
	price: 0.0,
	area: 0.0,
	rooms: 0,
	address: '',
	images: [],
	previewImage: '',
	activity: true
})

async function createAnnouncementsFunc() {
	try {
		
		const createAnnouncementFetch = await $fetch('/api/announcements/edit/create', {
			method: 'POST',
			body: {
				...credentials.value,
				images: photos.value.map(p => p.url)
			}
		})
		
		if (createAnnouncementFetch.error) {
			toast.error(`Не удалось создать объявление`)
			return;
		} else if (createAnnouncementFetch.success) {
			toast.success(`Объявление успешно создано`);
			return;
		}

	} catch (e: any) {
		toast.error('Не удалось создать объявление')
		return;
	} finally {
		return;
	}
}

async function uploadPhotosAnnouncements(file: File) {

	uploading.value = true
	error.value = null
	try {
		const photoUpload = await $fetch<ListingPhoto>('/api/photos', {
			method: 'POST',
			// File — это Blob, ofetch/fetch отправят его как сырое тело
			body: file,
			headers: {
				'content-type': file.type, // image/jpeg | image/png | image/webp
				'x-photo-request': '1'
			},
		})
		photos.value.push(photoUpload);
	} catch (e: any) {
		error.value = e?.data?.message ?? 'Ошибка загрузки'
		throw e
	} finally {
		uploading.value = false
	}

}

async function onFileChange(event: Event) {
	const input = event.target as HTMLInputElement;
	const files = input.files;

	if (files?.length! > 0) {
		for (let i = 0; files?.length! - 1 >= i; i++) {
			await uploadPhotosAnnouncements(files?.item(i)!);
		}
	}
}

async function removePhoto(imageId: string, imageUrl: string) {
	try {
		const delPhoto = await $fetch(`/api/photos/${imageId}`, {
			method: 'DELETE',
			headers: {
				'x-photo-request': '1'
			}
		})

		if (!delPhoto.success) {
			toast.error('Ошибка при удалении, попробуйте еще раз')
			return;
		}

		if (credentials.value.previewImage === imageUrl) {
			credentials.value.previewImage = ''
		}

		photos.value = photos.value.filter(p => p.id !== imageId);
		return;
	} catch (e) {
		console.log(e)
		toast.error('Ошибка при удалении, попробуйте еще раз')
		return;
	}

}

function useForPreviewImage(imageUrl: string) {
	if (credentials.value.previewImage !== imageUrl) {
		credentials.value.previewImage = imageUrl
		return;
	} else {
		credentials.value.previewImage = ''
		return;
	}
	
}

function fakeData() {
	credentials.value.title = "Title";
	credentials.value.description = "DESC";
	credentials.value.price = 1999000.23;
	credentials.value.area = 42;
	credentials.value.rooms = 4;
	credentials.value.address = "ADDRESS";
	credentials.value.activity = false;
}

</script>

<template>
	{{ credentials.previewImage }}
	<div class="flex flex-col lg:flex-row gap-8 w-full px-4 py-6">
		<!-- Форма -->
		<div class="flex-1 max-w-2xl">
			<div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 transition-shadow duration-300 hover:shadow-md">
				<header class="mb-6">
					<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Новое объявление</h1>
					<p class="mt-1 text-sm text-gray-500">Заполните информацию о вашем объекте</p>
				</header>

				<form @submit.once.prevent="createAnnouncementsFunc" class="flex flex-col gap-5">
					<BaseInput label="Название" v-model="credentials.title" type="text" required />
					<BaseTextarea label="Описание" v-model="credentials.description" type="text" />
					<BaseTextarea label="Адрес" v-model="credentials.address" type="text" required />

					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<FormattedInput
							label="Площадь"
							v-model="credentials.area"
							suffix="м²"
							placeholder="0"
							decimals
						/>
						<BaseInput label="Комнат" v-model="credentials.rooms" type="number" />
						<FormattedInput
							label="Стоимость"
							v-model="credentials.price"
							suffix="₽"
							placeholder="0"
						/>
					</div>

					<BaseInput label="Фотографии" type="file" multiple @change="onFileChange" />
					<BaseInput label="Объявление будет активно" v-model="credentials.activity" type="checkbox" />

					<div class="flex flex-col sm:flex-row gap-3 pt-2">
						<BaseButton
							type="submit"
							class="flex-1 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
						>
							Создать
						</BaseButton>
						<BaseButton
							@click="fakeData"
							type="button"
							class="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
						>
							FakeData
						</BaseButton>
					</div>
				</form>
			</div>
		</div>

		<!-- Фото -->
		<Transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 translate-y-4 lg:translate-y-0 lg:translate-x-4"
			enter-to-class="opacity-100 translate-y-0 lg:translate-x-0"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div class="flex-1 max-w-xl" v-if="photos.length > 0">
				<div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-6">
					<header class="mb-5">
						<h2 class="text-xl sm:text-2xl font-bold text-gray-900">Ваши фото</h2>
						<p class="mt-1 text-sm text-gray-500">
							Нажмите на фото, чтобы выбрать его для заставки
						</p>
					</header>

					<TransitionGroup
						tag="div"
						class="relative grid grid-cols-2 sm:grid-cols-3 gap-4"
						enter-active-class="transition-all duration-300 ease-out"
						enter-from-class="opacity-0 scale-75"
						enter-to-class="opacity-100 scale-100"
						leave-active-class="transition-all duration-200 ease-in absolute"
						leave-from-class="opacity-100 scale-100"
						leave-to-class="opacity-0 scale-75"
						move-class="transition-transform duration-300 ease-out"
					>
						<div
							v-for="photo in photos"
							:key="photo.id"
							role="button"
							tabindex="0"
							:aria-pressed="credentials.previewImage === photo.url"
							@click="useForPreviewImage(photo.url)"
							@keydown.enter.prevent="useForPreviewImage(photo.url)"
							@keydown.space.prevent="useForPreviewImage(photo.url)"
							class="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer ring-2 ring-transparent outline-none transition-all duration-200 hover:shadow-lg focus-visible:ring-brand-400"
							:class="[
								credentials.previewImage === photo.url
									? 'ring-brand-600 ring-offset-2 shadow-md'
									: 'hover:ring-brand-300',
							]"
						>
							<NuxtImg
								:src="photo.url"
								:width="photo.width"
								:height="photo.height"
								fit="cover"
								format="webp"
								loading="lazy"
								class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
							/>

							<!-- Бейдж выбранной заставки -->
							<Transition
								enter-active-class="transition-all duration-200 ease-out"
								enter-from-class="opacity-0 scale-50 translate-y-1"
								enter-to-class="opacity-100 scale-100 translate-y-0"
								leave-active-class="transition-all duration-150 ease-in"
								leave-from-class="opacity-100 scale-100"
								leave-to-class="opacity-0 scale-50"
							>
								<div
									v-if="credentials.previewImage === photo.url"
									class="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-brand-600 px-2 py-1 text-[11px] font-medium text-white shadow-md"
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
										<path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd"/>
									</svg>
									Заставка
								</div>
							</Transition>

							<!-- Кнопка удаления -->
							<button
								type="button"
								@click.stop="removePhoto(photo.id, photo.url)"
								aria-label="Удалить фото"
								class="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur text-gray-600 shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 focus:opacity-100 focus:scale-100 transition-all duration-200 hover:bg-red-500 hover:text-white"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
									<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
								</svg>
							</button>
						</div>
					</TransitionGroup>
				</div>
			</div>
		</Transition>
	</div>
</template>