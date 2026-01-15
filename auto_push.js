const { exec } = require("child_process");
const chokidar = require("chokidar");

const watcher = chokidar.watch(["./src", "./public"], { 
    ignored: /(\.git|venv|node_modules|\.vscode|\.idea|.*\.pyc|.*~|.*\.log)/,
    ignoreInitial: true,
    persistent: true
});

watcher.on("all", (event, path) => {
    console.log(`Detected ${event} on ${path}`);
    exec('git add . && git commit -m "Auto-commit [watcher]" && git push origin main', (err, stdout, stderr) => {
        if (err) console.error(err);
        else console.log(stdout);
    });
});