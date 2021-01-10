<template>
	<div id="app" class="h-full">
		<router-view />
		<div v-html="img" />
	</div>
</template>

<script lang="ts">
function escapeHTML(unsafe_str: string) {
	return unsafe_str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/\//g, '&#x2F;');
}

export default {
	computed: {
		img() {
			// @ts-ignore
			const url: string = this.$static.metadata.siteUrl + this.$url(this.$route.fullPath);
			return process.env.GRIDSOME_MATOMO_IMAGE ? `<noscript><p><img src="${escapeHTML(process.env.GRIDSOME_MATOMO_IMAGE)}&url=${encodeURIComponent(url)}" style="border:0;" alt="" /></p></noscript>` : '';
		},
	},
	metaInfo(): any {
		return {
			meta: [
				{
					property: 'og:type',
					content: 'website',
					key: 'og:type',
				},
				{
					property: 'og:site_name',
					// @ts-ignore
					content: this.$static.metadata.siteName,
				},
				{
					property: 'og:url',
					// @ts-ignore
					content: this.$static.metadata.siteUrl + this.$url(this.$route.path),
				},
				{
					property: 'og:image',
					// @ts-ignore
					content: this.$static.metadata.siteUrl+this.$url('favicon.png'),
					key: 'og:image',
				},
				{
					property: 'og:description',
					// @ts-ignore
					content: this.$static.metadata.siteDescription,
					key: 'og:description',
				},
			],
		};
	},
};
</script>

<static-query>
query {
	metadata {
		siteUrl
		siteName
		siteDescription
	}
}
</static-query>
