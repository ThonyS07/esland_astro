import animations from 'tailwindcss-animated';


/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			boxShadow: {
				"custom-white": "0 0 22px #fff8",
			},
		
		},
	},
	plugins: [animations],
};
