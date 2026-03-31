import { defineConfig } from "vite";

export default defineConfig({
    base: "/https://github.com/D-O14/DomzWeb-projects",
    root: "src",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    }
});