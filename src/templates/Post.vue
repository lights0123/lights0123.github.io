<template>
	<Layout>
		<article class="flex flex-wrap items-start justify-start h-full">
			<div class="on-this-page order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky top-0">
				<on-this-page />
			</div>
			<div class="order-1 w-full md:w-2/3">
				<h1 class="text-5xl mb-0">{{$page.post.title}}</h1>
				<p class="text-gray-600 text-sm mb-6"> {{ $page.post.date}} · <i>{{$page.post.timeToRead}} min read</i>
				</p>
				<div class="content">
					<p v-html="$page.post.content" />
				</div>
			</div>
		</article>
	</Layout>
</template>

<script>
import OnThisPage from '@/components/OnThisPage.vue';

export default {
	components: { OnThisPage },
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
	metadata {
		siteName
		siteDescription
	}
	post: post (path: $path) {
		id
		title
		content
		path
		headings {
			depth
			value
			anchor
		}
		date (format: "MMMM D, YYYY")
		timeToRead
	}
}
</page-query>
