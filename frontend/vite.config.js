import { defineConfig } from 'vite'
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Route
const paths = [
	'/explore-data/earthquakes',
	'/explore-data/stations',
	'/explore-data/table-earthquakes',
	'/explore-data/table-stations',
	'/api-access',
	'/docs-earthquakes',
	'/docs-stations',
	'/use-cases',
	'/about',
	'/contact',
	'/blog',
	'/terms-and-conditions',
	'/privacy-policy',
	'/faq',
	'/contribute'
]

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(), 
		tailwindcss(),
		Sitemap({
			hostname: 'https://terraquakeapi.com',
			dynamicRoutes: paths,
			changefreq: 'weekly',
			priority: 0.8
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@images": path.resolve(__dirname, "./src/assets/images"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@pages": path.resolve(__dirname, "./src/pages"),
		}
	}
});
// Add more aliases as and when required
