<template>
	<div id="app" class="h-full">
		<router-view />
		<div v-html="img" />
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			// Yes, this could be XSS, but we trust the build environment
			img: process.env.GRIDSOME_MATOMO_IMAGE ? `<noscript><p><img src="${process.env.GRIDSOME_MATOMO_IMAGE}" style="border:0;" alt="" /></p></noscript>` : '',
		};
	},
};
</script>
