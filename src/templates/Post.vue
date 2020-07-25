<template>
	<Layout>
		<article class="flex flex-wrap items-start justify-start h-full">
			<div class="on-this-page order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky top-0">
				<on-this-page />
			</div>
			<div class="order-1 w-full md:w-2/3">
				<h1 class="text-5xl mb-0">{{$page.post.title}}</h1>
				<p class="text-gray-600 text-sm mb-6">
					<time :datetime="$page.post.rawDate">{{ $page.post.date }}</time>
					· <i>{{ $page.post.timeToRead }} min read</i>
				</p>
				<div class="content mb-10">
					<p v-html="$page.post.content" />
				</div>
				<github-comments :title="$page.post.title" />
			</div>
		</article>
	</Layout>
</template>

<script>
import OnThisPage from '@/components/OnThisPage.vue';
import GithubComments from '@/components/GithubComments.vue';

export default {
	components: { OnThisPage, GithubComments },
	metaInfo() {
		return {
			title: this.$page.post.title,
			meta: [
				{
					property: 'og:type',
					content: 'article',
					key: 'og:type',
				},
				{
					property: 'og:title',
					content: this.$page.post.title,
				},
				{
					name: 'description',
					content: this.$page.post.description,
				},
				{
					property: 'og:description',
					content: this.$page.post.description,
					key: 'og:description',
				},
				{
					property: 'article:author:first_name',
					content: this.$static.metadata.siteName.split(' ')[0],
				},
				{
					property: 'article:author:last_name',
					content: this.$static.metadata.siteName.split(' ')[1],
				},
				{
					property: 'article:published_time',
					content: this.$page.post.rawDate,
				},
				{
					property: 'article:modified_time',
					content: this.$page.post.rawDate,
				},
			],
			script: [{
				type: 'application/ld+json',
				json: {
					'@context': 'https://schema.org',
					'@type': 'BlogPosting',
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': this.$static.metadata.siteUrl + this.$url(this.$route.path),
					},
					headline: this.$page.post.title,
					description: this.$page.post.description,
					datePublished: this.$page.post.rawDate,
					dateModified: this.$page.post.rawDate,
					author: {
						'@type': 'Person',
						name: this.$static.metadata.siteName,
					},
				},
			}],
		};
	},
	name: 'Post',
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: theme('screens.md')) {
	.on-this-page {
		display: none;
	}
}

.content::v-deep {
	p {
		margin-bottom: 1em;
		word-wrap: break-word;
	}
	> p p code {
		word-wrap: break-word;
	}

	blockquote {
		@apply border-l-4 border-solid pl-2 border-ui-blockquote bg-ui-text-inv py-1 mb-2;
		> p:last-child {
			@apply mb-0;
		}
	}

	ul p, ol p {
		margin-bottom: 0;
	}

	aside.img {
		img {
			max-height: 400px;
			max-width: 400px;
			height: auto;
			width: auto;
		}

		@media screen and (min-width: theme('screens.lg')) {
			float: right;
			margin-left: 1em;
			display: table;
			> *:not(img) {
				display: table-caption;
			}
		}
	}

	ul {
		@apply list-outside list-disc ml-4;
	}

	ol {
		@apply list-outside list-decimal ml-4;
	}

	ol, ul, table {
		~ {
			p, ol, ul, h1, h2, h3, h4 {
				@apply mt-4;
			}
		}
	}

	table {
		@apply table-auto w-full rounded;

		thead th {
			@apply text-center px-4 py-2;
		}

		tr:nth-child(even) {
			@apply bg-ui-text-inv;
		}

		td {
			@apply border px-4 py-2;
		}
	}
}
</style>
<page-query>
query Post ($path: String!) {
	post: post (path: $path) {
		id
		title
		description
		content
		path
		headings {
			depth
			value
			anchor
		}
		date (format: "MMMM D, YYYY")
		rawDate: date
		timeToRead
	}
}
</page-query>

<static-query>
query {
	metadata {
		siteUrl
		siteName
		siteDescription
	}
}
</static-query>
