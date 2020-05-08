<template>
	<Layout>
		<div class="flex flex-col items-center mt-8">
			<div>
				<alert-triangle viewBox="0 0 24 24" height="48" width="48" />
			</div>
			<h1 class="text-5xl">404 - Not Found</h1>
		</div>
	</Layout>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import AlertTriangle from 'feather-icons/dist/icons/alert-triangle.svg';

@Component({ components: { AlertTriangle } })
export default class Page404 extends Vue {}
</script>

<style scoped>

</style>
