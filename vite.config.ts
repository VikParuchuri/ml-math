import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
        alias: {
            "$components": path.resolve("./src/components"),
            "$routes": path.resolve("./src/routes"),
			"$lib": path.resolve("./src/lib"),
			"$stores": path.resolve("./src/stores"),
        }
    }
});
