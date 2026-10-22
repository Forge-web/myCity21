<script setup>
const links = [
    { name: 'Главная', path: "/" },
    { name: 'О нас', path: "/about" },
    { name: 'Полезная информация', path: "" },
    { name: 'Услуги', path: "" },
    { name: 'Вопрос/Ответ', path: "" },
    { name: 'Контакты', path: "/contacts" },
]
</script>

<template>
    <nav class="w-full max-w-[1444px] mx-auto px-2 md:px-4 py-3">
        <ul class="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:gap-10 font-bold">
            <li v-for="link in links" :key="link.path">
                <NuxtLink 
                    :to="link.path" 
                    class="block py-1 md:pl-0 md:whitespace-nowrap transition-colors text-black md:aria-[current=page]:border-b aria-[current=page]:border-black" 
                    @click="$emit('click')">
                    {{ link.name }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>