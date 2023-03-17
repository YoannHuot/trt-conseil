/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"app-blue": "#123284",
				"app-gray": "#F5F5F5",
				"app-red": "#B10C0C",
			},
		},
	},
	plugins: [],
};
