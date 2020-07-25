// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const { MATOMO_HOST, MATOMO_SITE_ID } = process.env;
module.exports = {
	siteName: 'Ben Schattinger',
	siteDescription: 'The website of Ben Schattinger',
	siteUrl: 'https://lights0123.com',
	plugins: [
		...(MATOMO_HOST && MATOMO_SITE_ID ? [{
			use: 'gridsome-plugin-matomo',
			options: {
				host: MATOMO_HOST,
				siteId: MATOMO_SITE_ID,
			},
		}] : []),
		{
			use: 'gridsome-plugin-typescript',
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				path: './content/blog/**/*.md',
				typeName: 'Post',
				refs: {
					tags: {
						typeName: 'Tag',
						create: true,
					},
				},
			},
		},
		{
			use: '@gridsome/source-filesystem',
			options: {
				path: './content/projects/**/*.md',
				typeName: 'Project',
			},
		},
		{
			use: 'gridsome-plugin-tailwindcss',
			options: {
				purgeConfig: {
					// Prevent purging of prism classes.
					whitelistPatternsChildren: [
						/token$/,
						/gridsome-highlight/,
						/line-numbers/,
					],
				},
			},
		},
	],
	transformers: {
		remark: {
			plugins: [
				['gridsome-plugin-remark-prismjs-all', {
					showLineNumbers: true,
				}],
				['remark-containers', {
					default: false,
					custom: [
						{
							type: 'tip',
							element: 'div',
							transform: function(node, config, tokenize) {
								return transformContainer(node, config, 'tip', 'p', 'Tip');
							},
						},
						{
							type: 'warning',
							element: 'div',
							transform: function(node, config, tokenize) {
								return transformContainer(node, config, 'warning', 'p', 'Warning');
							},
						},
						{
							type: 'danger',
							element: 'div',
							transform: function(node, config, tokenize) {
								return transformContainer(node, config, 'danger', 'p', 'Warning');
							},
						},
						{
							type: 'details',
							element: 'details',
							transform: function(node, config, tokenize) {
								return transformContainer(node, config, 'details', 'summary', 'Details');
							},
						},
						{
							type: 'img',
							element: 'aside',
							transform: function(node, config, tokenize) {
								return transformContainer(node, config, 'img', 'figure', '');
							},
						},
					],
				}],
				'remark-footnotes',
				'remark-abbr',
			],
		},
	},
	// Setup templates & routes for the collection.
	// This will look for scr/templates/{Collection}.vue and use that.
	templates: {
		Post: '/blog/:year/:month/:day/:title',
		Tag: '/blog/tags/:title',
	},
	chainWebpack: config => {
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		svgRule
			.use('vue-svg-loader')
			.loader('vue-svg-loader');
	},
};

function transformContainer(node, config, type, element, defaultTitle) {
	node.data.hProperties = {
		className: `custom-block ${type}`,
	};
	node.children.splice(0, 0, {
		type: 'paragraph',
		data: {
			hName: element,
			hProperties: {
				className: 'custom-block-title',
			},
		},
		children: [
			{ type: 'text', value: config || defaultTitle },
		],
	});
}
