<template>
	<button @click="$theme.toggle" :aria-label="$theme.dark ? 'Enable Light Theme' : 'Enable Dark Theme'" :title="$theme.dark ? 'Enable Light Theme' : 'Enable Dark Theme'" class="ml-6">
		<moon v-if="$theme.dark" role="img" aria-label="Enable Light Theme" />
		<sun v-else role="img" aria-label="Enable Dark Theme" />
	</button>
</template>

<script lang="ts">
import Sun from 'feather-icons/dist/icons/sun.svg';
import Moon from 'feather-icons/dist/icons/moon.svg';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { Sun, Moon } })
export default class ToggleDarkMode extends Vue {}
</script>

<style scoped>

</style>
