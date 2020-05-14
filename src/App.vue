<template>
	<div id="app" class="h-full">
		<router-view />
		<div v-html="img" />
	</div>
</template>

<script lang="ts">
function escapeHTML (unsafe_str: string) {
	return unsafe_str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\"/g, '&quot;')
		.replace(/\'/g, '&#39;')
		.replace(/\//g, '&#x2F;')
}
export default {
	computed: {
		img() {
			// @ts-ignore
			const url: string = this.$static.metadata.siteUrl + this.$url(this.$route.fullPath);
			return process.env.GRIDSOME_MATOMO_IMAGE ? `<noscript><p><img src="${escapeHTML(process.env.GRIDSOME_MATOMO_IMAGE)}&url=${encodeURIComponent(url)}" style="border:0;" alt="" /></p></noscript>` : '';
		},
	},
};
</script>

<static-query>
query {
	metadata {
		siteUrl
	}
}
</static-query>
