<template>
	<button @click="handleClick" aria-label="Toggle Darkmode" title="Toggle Darkmode" class="ml-6">
		<moon v-if="dark" />
		<sun v-else />
	</button>
</template>

<script lang="ts">
import Sun from 'feather-icons/dist/icons/sun.svg';
import Moon from 'feather-icons/dist/icons/moon.svg';
import { Component, Vue } from 'vue-property-decorator';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';
@Component({ components: { Sun, Moon } })
export default class ToggleDarkMode extends Vue {
	dark = false;

	handleClick() {
		const hasDarkMode = document.documentElement.classList.contains('dark');
		// Toggle dark mode on click.
		return this.setDarkMode(!hasDarkMode);
	}

	setDarkMode(shouldBeDark: boolean) {
		document.documentElement.classList.toggle('dark', shouldBeDark);
		this.dark = shouldBeDark;
		this.writeToStorage(shouldBeDark);
	}

	writeToStorage(prefersDark: boolean) {
		localStorage.setItem('dark', prefersDark ? 'true' : 'false');
		if (window.matchMedia) {
			localStorage.setItem('media-dark', window.matchMedia(MEDIA_QUERY).matches ? 'true' : 'false');
		}
	}

	mounted() {
		if (process.isClient && window.matchMedia) {
			const query = window.matchMedia(MEDIA_QUERY);
			query.addEventListener('change', data => {
				this.setDarkMode(data.matches);
			});
			if ((query.matches ? 'true' : 'false') !== localStorage.getItem('media-dark')) {
				this.setDarkMode(query.matches);
			} else this.setDarkMode(localStorage.getItem('dark') === 'true');
		} else this.setDarkMode(localStorage.getItem('dark') === 'true');
	}
}
</script>

<style scoped>

</style>
