<template>
	<div class="flex flex-col h-full">
		<header class="header text-white pb-4">
			<nav-menu large />
			<div class="container mx-auto mt-4 text-center">
				<h1 class="text-6xl text-white">Ben Schattinger</h1>
			</div>
		</header>
		<main class="container mx-auto flex-grow">
			<h1 id="projects" class="text-4xl mt-4">Projects</h1>
			<div class="flex flex-col md:flex-row mb-4 items-stretch" v-for="i in rowCount">
				<project-card v-for="{node} in row(i)" :key="node.id" :project="node" class="card" />
			</div>
			<h1 id="contact" class="mt-12">Contact</h1>
			<contact-form />
		</main>
		<page-footer />
	</div>
</template>

<script lang="ts">
import NavMenu from '@/layouts/NavMenu.vue';
import PageFooter from '@/layouts/PageFooter.vue';
import ContactForm from '@/components/ContactForm.vue';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
	components: { ContactForm, NavMenu, PageFooter, ProjectCard },
	metaInfo: {
		title: 'Home',
	},
	methods: {
		row(index: number): [] {
			// @ts-ignore
			return this.$page.allProject.edges.slice((index - 1) * 3, index * 3);
		},
	},
	computed: {
		rowCount(): number {
			// @ts-ignore
			return Math.ceil(this.$page.allProject.edges.length / 3);
		},
	},
};
</script>

<style lang="scss">
.header {
	background: linear-gradient(-45deg, theme('colors.blue.500'), theme('colors.indigo.500'));
}

.dark {
	.header {
		background: linear-gradient(-45deg, theme('colors.blue.700'), theme('colors.indigo.500'));
	}
}

.card {
	.g-image {
		align-self: center;
	}
	@screen md {
		width: calc(50% - 1em);
	}
	@screen lg {
		width: calc(33.3333333% - 1em);
	}
}
</style>

<page-query>
query {
	allProject(sortBy: "fileInfo.name", order: ASC) {
		edges {
			node {
				fileInfo {
					name
				}
				id
				content
				title
				image
				link
			}
		}
	}
}
</page-query>
