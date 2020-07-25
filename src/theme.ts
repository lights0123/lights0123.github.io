import { Component, Vue } from 'vue-property-decorator';

interface Theme {
	dark: boolean;

	toggle(): void;

	setDarkMode(shouldBeDark: boolean): void;
}

declare module 'vue/types/vue' {
	interface Vue {
		$theme: Theme;
	}
}

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

@Component
class ThemeImpl extends Vue implements Theme {
	dark = false;

	toggle() {
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

	created() {
		if (!process.isClient) return;
		if (window.matchMedia) {
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

Vue.prototype.$theme = new ThemeImpl();

export default Vue.prototype.$theme;
