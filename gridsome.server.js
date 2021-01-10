// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const { writeFile } = require('fs/promises');
const { join } = require('path');

module.exports = function(api, options) {
	const {_pathPrefix, siteUrl} = api.config;
	const promise = (async () => {
		for (const group of ['a', 'b', 'v']) {
			for (const lunch5 of ['x', 'y', 'z']) {
				for (const lunch6 of ['x', 'y', 'z']) {
					await writeFile(join(__dirname, `static/2020-schedule/${group}${lunch5}${lunch6}.html`), `<head>
<meta content="Ben Schattinger" property="og:site_name" />
<meta content="Shaker 2021 Quarter 3 Class Times" property="og:title" />
<meta content="${siteUrl}${_pathPrefix}/2020-schedule/${group}${lunch5}${lunch6}.png" property="snapchat:sticker" />
<meta http-equiv="refresh" content="0; url=${siteUrl}${_pathPrefix}/2020-schedule/">
</head>
<body>
<a href="${siteUrl}${_pathPrefix}/2020-schedule/">Click to be redirected</a>
</body>`);
				}
			}
		}
		if(process.env.NO_INDEX) {
			await writeFile(join(__dirname, 'static/_headers'), `/*
   X-Robots-Tag: noindex`);
		}
	})();
	api.loadSource(async ({ addCollection }) => {
		await promise;
	});

	api.createPages(({ createPage }) => {
		// Use the Pages API here: https://gridsome.org/docs/pages-api/
	});
};
