// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const { promises: fs } = require('fs');
const { writeFile } = fs;
const { join } = require('path');

module.exports = function(api, options) {
	const promise = (async () => {
		if (process.env.NO_INDEX) {
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
