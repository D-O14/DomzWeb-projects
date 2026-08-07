import { defineConfig } from "vite";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(__dirname);
function getEntries(directories) {
    const entries = {};
    function scan(directory) {
        const files = fs.readdirSync(directory, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(directory, file.name);
            if (file.isDirectory()) {
                scan(fullPath);
            } else if (file.name.endsWith(".html")) {
                const relative = path.relative(root, fullPath);
                const name = relative.replace(/\.html$/, "");
                entries[name] = fullPath;
            }
        }
    }
    for (const directory of directories) {
        scan(path.resolve(root, directory));
    }
    return entries;
}

const pages = getEntries([
    "src/Apps",
    "src/Projects",
    "src/Websites",
]);

export default defineConfig({
    base: "/DomzWeb-projects/",
    build: {
        emptyOutDir: true,
        rolldownOptions: { input: pages }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@apps": path.resolve(__dirname, "./src/Apps"),
            "@assets": path.resolve(__dirname, "./src/Assets"),
            "@components": path.resolve(__dirname, "./src/Components"),
            "@projects": path.resolve(__dirname, "./src/Projects"),
            "@styles": path.resolve(__dirname, "./src/Styles"),
            "@utils": path.resolve(__dirname, "./src/Utilities"),
            "@websites": path.resolve(__dirname, "./src/Websites"),
        }
    }
});