// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import auth from 'auth-astro';
import vercel from "@astrojs/vercel/serverless";


// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), preact(), auth()],
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
		fallback: { en: "es" },
	},
	output: "server",
	adapter: vercel({}),
});