import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    base: "/DomzWeb-projects/",
    build: { emptyOutDir: true },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/Components"),
            "@assets": path.resolve(__dirname, "./src/Assets"),
            "@projects": path.resolve(__dirname, "./src/Projects"),
            "@utils": path.resolve(__dirname, "./src/Utilities"),
            "@styles": path.resolve(__dirname, "./src/Styles"),
            "@apps": path.resolve(__dirname, "./src/Apps"),
            "@websites": path.resolve(__dirname, "./src/Websites"),
        }
    }
});