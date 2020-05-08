<template>
	<footer class="bg-ui-sidebar p-8 mt-6">
		<div class="container mx-auto grid md:grid-cols-2 md:gap-4">
			<div>
				© {{year}} Ben Schattinger
			</div>
			<div>Suggestions? <a class="border-b-2 text-ui-emph border-ui-border hover:border-ui-primary" target="_blank" href="https://github.com/lights0123/lights0123.github.io/issues/new">Submit an issue</a></div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			year: new Date().getFullYear(),
		};
	},
};
</script>

<style scoped>

</style>
