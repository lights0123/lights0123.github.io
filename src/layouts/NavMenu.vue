<template>
	<nav class="p-2" :class="{'bg-blue-500': !large}">
		<div class="container mx-auto flex items-center justify-between flex-wrap" :class="{'lg:h-16': large}">
			<g-link to="/" class="flex items-center flex-shrink-0 text-ui-background mr-6 lg:mr-10" active-class="a">
				<span class="font-semibold text-3xl tracking-tight">{{ $static.metadata.siteName }}</span>
			</g-link>
			<div class="block lg:hidden">
				<button class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
				        @click="expandMenu = !expandMenu">
					<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<title>Menu</title>
						<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
					</svg>
				</button>
			</div>
			<div class="w-full block flex-grow lg:items-center lg:w-auto hidden lg-flex-important"
			     :style="expandMenu ? {display: 'block'} : {}">
				<div class="text-lg lg:flex-grow">
					<g-link v-for="(name, link) in links" :key="link" :to="link"
					        :class="{'active--exact': link === '/' && homeActive}"
					        class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 px-2 pb-1">
						{{name}}
					</g-link>
				</div>
			</div>
			<div class="hidden lg:flex text-ui-background mt-6 lg:mt-0" :style="expandMenu ? {display: 'flex'} : {}">
				<a href="https://github.com/lights0123" rel="noopener" target="_blank" title="Github">
					<github role="img" aria-label="Github" />
				</a>
				<toggle-dark-mode />
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Github from 'feather-icons/dist/icons/github.svg';
import ToggleDarkMode from '@/components/ToggleDarkMode.vue';
import type from 'vue-router';
@Component({
	components: {
		Github,
		ToggleDarkMode,
	},
})
export default class NavMenu extends Vue {
	@Prop({ type: Boolean, default: false }) large!: boolean;
	expandMenu = false;
	links = {
		'/': 'Home',
		'/about': 'About',
		'/blog': 'Blog',
	};

	get homeActive() {
		return this.$route.path === '/';
	}
};
</script>

<style scoped>

</style>
<static-query>
query {
	metadata {
		siteName
	}
}
</static-query>

<style lang="scss" scoped>
.block.active:not([href="/"]), .block.active--exact {
	margin-bottom: -4px;
	@apply text-white border-white border-b-4;
}

.lg-flex-important {
	@media(min-width: theme('screens.lg')) {
		@apply flex #{!important};
	}
}
</style>
