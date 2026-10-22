<script setup lang="ts">

definePageMeta({
	middleware: 'auth'
})

const { loggedIn, user, clear } = useUserSession()

console.log(user.value)
</script>

<template>


<div v-if="loggedIn" 
	class=""
>
	<BaseButton @click="clear">Выйти из аккаунта</BaseButton>
</div>
<div v-else>
	<h1>Not logged in</h1>
	<NuxtLink to="/account/login">
		Auth
	</NuxtLink>
</div>

</template>