<template>
	<div class="comments" :style="{ height: `${height}px` }">
		<iframe ref="comments" title="Comments" scrolling="no" :src="url" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';

interface ResizeMessage {
	type: 'resize';
	height: number;
}

@Component
export default class GithubComments extends Vue {
	@Prop({ type: String, required: true }) title!: string;
	@Ref() readonly comments!: HTMLIFrameElement;
	height = 0;
	url = '';
	loaded = false;

	get theme() {
		return this.$theme.dark ? 'dark-blue' : 'github-light';
	}

	created() {
		const parts: Record<string, string> = {
			'issue-term': 'title',
			// @ts-ignore
			url: (process.isClient ? window.origin : this.$static.metadata.siteUrl) + this.$url(this.$route.path),
			title: this.title,
			repo: 'lights0123/lights0123.github.io',
			theme: this.theme,
			label: 'comments',
			// @ts-ignore
			origin: process.isClient ? window.origin : this.$static.metadata.siteUrl,
		};
		this.url = 'https://utteranc.es/utterances.html?' + Object.keys(parts).map(name => `${encodeURIComponent(name)}=${encodeURIComponent(parts[name])}`).join('&');
	}

	@Watch('loaded')
	@Watch('theme')
	sendTheme() {
		this.comments.contentWindow?.postMessage({
			type: 'set-theme',
			theme: this.theme,
		}, 'https://utteranc.es');
	}

	message(event: MessageEvent) {
		if (event.origin !== 'https://utteranc.es') return;
		if (!this.loaded) this.loaded = true;
		const data = event.data as Partial<ResizeMessage>;
		if (data && data.type === 'resize' && data.height) {
			this.height = data.height;
		}
	}

	mounted() {
		window.addEventListener('message', this.message);
	}

	beforeDestroy() {
		window.removeEventListener('message', this.message);
	}
}
</script>
<style lang="scss">
.comments {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	iframe {
		position: absolute;
		left: 0;
		right: 0;
		width: 1px;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		border: 0;
	}
}
</style>

<static-query>
query {
	metadata {
		siteUrl
	}
}
</static-query>
