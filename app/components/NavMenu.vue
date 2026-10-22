<script setup>
const links = [
    { name: 'Главная', path: "/" },
    { name: 'О компании', path: "/about" },
    { name: 'Наши партнеры', path: "/" },
    { name: 'Полезная информация', path: "/" },
    { name: 'Услуги', path: "/" },
    { name: 'Вопрос/Ответ', path: "/" },
    { name: 'Контакты', path: "/contacts" },
]
</script>

<template>
    <nav class="w-full px-2 md:px-4 py-3">
        <ul class="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-3 lg:gap-8 font-bold  mx-auto">
            <li v-for="link in links" :key="link.path">
                <NuxtLink :to="link.path" class="block py-1 pl-3 md:whitespace-nowrap" @click="$emit('click')">{{ link.name }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>