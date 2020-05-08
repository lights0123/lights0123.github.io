<template>
	<Layout>
		<div class="container mx-auto mt-4">
			<div v-if="$page.allPost.edges.length === 0" class="mt-10 text-center">
				<p><Frown class="inline w-4 mb-1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" /> There's nothing here</p>
			</div>
			<div v-for="{node} in $page.allPost.edges" :key="node.id"
			     class="w-full rounded shadow-even p-4 mb-4">
				<g-link :to="node.path"><h1 class="text-5xl">{{node.title}}</h1></g-link>
				<p class="text-gray-600 text-sm"> {{ node.date}} · <i>{{node.timeToRead}} min read</i></p>
				<p>{{node.description}}</p>
				<p>
					<g-link :to="node.path">
						Read more
						<div class="inline-flex" aria-hidden="true">
							<arrow class="relative top-1/8" viewBox="0 0 24 24" width="1em" height="1em" />
						</div>
					</g-link>
				</p>
			</div>
			<Pager class="pager" :info="$page.allPost.pageInfo" />
		</div>
	</Layout>
</template>

<script>
import { Pager } from 'gridsome';
import Arrow from 'feather-icons/dist/icons/arrow-right.svg';
import Frown from 'feather-icons/dist/icons/frown.svg';

export default {
	metaInfo: {
		title: 'Blog',
	},
	components: {
		Pager, Arrow, Frown
	},
	name: 'Blog',
};
</script>

<style lang="scss" scoped>
.pager {
	@apply flex m-4 justify-center text-base;
	a {
		min-width: 30px;
		line-height: 28px;
		margin: 0 5px;
		@apply rounded-sm bg-ui-sidebar flex justify-center items-center;
		&.active {
			@apply bg-ui-primary text-ui-text-inv;
		}
	}
}
</style>
<page-query>
query($page: Int) {
	metadata {
		siteName
		siteDescription
	}
	allPost(perPage: 10, page: $page) @paginate {
		totalCount
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id
				title
				timeToRead
				description
				content
				date (format: "MMM D YYYY")
				path
			}
		}

	}
}
</page-query>
