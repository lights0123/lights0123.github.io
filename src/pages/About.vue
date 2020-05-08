<template>
	<Layout>
		<h1 class="mt-4">About</h1>
		<p>
			Hi. I'm Ben Schattinger, a programmer. I enjoy programming frontend applications with Vue and TypeScript. I
			also like backend and <abbr
				title="platforms without a traditional operating system, such as Linux or Windows">embedded</abbr>
			development in Rust. I have written Rust bindings to several embedded
			targets, most notably the <a target="_blank" href="https://github.com/lights0123/ndless-rs">TI-Nspire</a>.
		</p>
		<br>
		<p>
			<g-link to="/#projects">Check out my various projects</g-link>,
			or my <a target="_blank" href="https://github.com/lights0123">GitHub profile</a>.
		</p>
		<h1 class="mt-8">Contact</h1>
		<contact-form />
	</Layout>
</template>

<script>
import ContactForm from '../components/ContactForm';

export default {
	components: { ContactForm },
	metaInfo: {
		title: 'About',
	},
};
</script>
