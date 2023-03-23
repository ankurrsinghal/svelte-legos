import chokidar from "chokidar";
import fs from "fs";

function watchDir(dirName) {
	const base = `src/lib/${dirName}`;
	const watcher = chokidar.watch("./" + base, { ignored: /^\./, persistent: true });

	try {
		fs.mkdirSync(`./src/routes/guides/${dirName}`);
	} catch (e) {
		console.log(e.message);
	}

	function handleDirAdd(path) {
		try {
			const dir = path.split(base)[1].trim();
			const dest = `./src/routes/guides/${dirName}` + dir;
			fs.mkdirSync(dest);
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleFileAdd(path) {
		try {
			let dir = path.split(base)[1].trim();
			let hookName = dir.split("/")[1];
			const dest = `./src/routes/guides/${dirName}` + "/" + hookName + "/+page.svelte";
			if (path.endsWith(".svelte")) {
				fs.copyFileSync(path, dest);
			}
		} catch (e) {
			console.log(e.message);
		}
	}

	function hanldeRemove(path) {
		try {
			const dir = path.split(base)[1].trim();
			const dest = `./src/routes/guides/${dirName}` + dir;
			fs.unlinkSync(dest);
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleFileRemove(path) {
		try {
			let dir = path.split(base)[1].trim();
			let hookName = dir.split("/")[1];
			const dest = `./src/routes/guides/${dirName}` + "/" + hookName + "/+page.svelte";
			if (path.endsWith(".svelte")) {
				fs.unlinkSync(dest);
			}
		} catch (e) {
			console.log(e.message);
		}
	}

	watcher
		.on("addDir", handleDirAdd)
		.on("add", handleFileAdd)
		.on("change", handleFileAdd)
		.on("unlinkDir", hanldeRemove)
		.on("unlink", handleFileRemove)
		.on("error", function (error) {
			console.error("Error happened", error);
		});

	const watcher2 = chokidar.watch(
		["./src/routes/guides/layout-hook.server.ts", "./src/routes/guides/layout-hook.svelte"],
		{ ignored: /^\./, persistent: true }
	);

	function handleTemplates(path) {
		if (path.endsWith("svelte")) {
			fs.copyFileSync(path, `./src/routes/guides/${dirName}/` + "+layout.svelte");
		} else {
			fs.copyFileSync(path, `./src/routes/guides/${dirName}/` + "+layout.server.ts");
		}
	}

	watcher2.on("add", handleTemplates).on("change", handleTemplates);
}

// stores
watchDir("stores");

// actions
watchDir("actions");

// utilities
watchDir("utilities");
