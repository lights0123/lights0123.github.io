<template>
	<div class="flex flex-col h-full">
		<header class="header">
			<nav-menu />
		</header>
		<main class="container mx-auto flex-grow px-2">
			<slot />
		</main>
		<page-footer />
	</div>
</template>
<script lang="ts">
import NavMenu from '@/layouts/NavMenu.vue';
import PageFooter from '@/layouts/PageFooter.vue';

export default {
	components: { NavMenu, PageFooter },
};
</script>
