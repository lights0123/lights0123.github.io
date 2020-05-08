<template>
	<a target="_blank" :href="project.link" class="rounded shadow-even p-4 md:mr-4 mb-4 md:mb-0 flex flex-col" :class="$props.class">
		<g-image v-if="project.image" :src="project.image" height="300" />
		<h2 class="text-center mt-2 mb-2">{{project.title}}</h2>
		<div v-html="project.content" />
	</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProjectCard extends Vue {
	@Prop(Object) project!: {};
}
</script>

<style lang="scss" scoped>
.g-image {
	max-height: 300px;
	object-fit: scale-down;
}
</style>
