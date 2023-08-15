import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        emptyOutDir: true,
        outDir: resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
