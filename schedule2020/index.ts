import * as puppeteer from 'puppeteer';
import { compile, registerHelper } from 'handlebars';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

registerHelper('ifEquals', function(arg1, arg2, options) {
	// @ts-ignore
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

(async () => {
	const res = await readFile(join(__dirname, 'template.hbs'), {
		encoding: 'utf-8',
	});
	const template = compile(res);
	const browser = await puppeteer.launch({ args: ['--font-render-hinting=none'] });
	const page = await browser.newPage();
	await page.goto(`file:${join(__dirname, 'template.hbs')}`);
	for (const group of ['a', 'b', 'v']) {
		for (const lunch5 of ['x', 'y', 'z']) {
			for (const lunch6 of ['x', 'y', 'z']) {
				await page.setContent(template({
					group,
					lunch5,
					lunch6,
				}));
				const clip = (await (await page.$('html'))!.boundingBox())!;
				const base = `../static/2020-schedule/${group}${lunch5}${lunch6}`;
				await page.screenshot({
					path: `${base}.png`,
					omitBackground: true,
					clip,
				});
			}
		}
	}

	await browser.close();
})();
