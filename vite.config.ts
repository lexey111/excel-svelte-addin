import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createHtmlPlugin } from 'vite-plugin-html';

import * as devCerts from 'office-addin-dev-certs';
// https://github.com/krmanik/Office-Addin-TaskPane-Svelte/blob/main/vite.config.ts

async function getHttpsOptions() {
	const httpsOptions = await devCerts.getHttpsServerOptions();
	return {
		ca: httpsOptions.ca,
		key: httpsOptions.key,
		cert: httpsOptions.cert
	};
}

export default defineConfig({
	plugins: [
		svelte(),
		createHtmlPlugin({
			minify: true,
			pages: [
				{
					entry: 'src/main.ts',
					filename: 'index.html', // updated this to index.html now we serve the taskpane.html from https:localhost:3000/
					template: 'taskpane.html',
					injectOptions: {
						data: {
							injectScript: `<script src="./main.js"></script>`
						}
					}
				},
				{
					entry: 'src/commands.ts',
					filename: 'commands.html',
					template: 'commands.html',
					injectOptions: {
						data: {
							injectScript: `<script src="./commands.js"></script>`
						}
					}
				}
			]
		})
	],
	server: {
		https: await getHttpsOptions(),
		port: Number.parseInt(process.env.server_port || '5173'),
		strictPort: false,
		open: false
		// open: '/' // opens the correct /taskpane.html when opening browser to view in web
	},
	preview: {
		https: await getHttpsOptions(),
		port: Number.parseInt(process.env.preview_server_port || '5173'),
		strictPort: false,
		open: false
		// open: '/taskpane.html' // opens the correct /taskpane.html when opening browser to view in web
	}
});
