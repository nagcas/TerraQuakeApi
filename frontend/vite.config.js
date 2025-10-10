import { defineConfig } from 'vite'
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
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