import chokidar from 'chokidar';
import fs from 'fs';

const base = 'src/lib/hooks';
const watcher = chokidar.watch('./' + base, { ignored: /^\./, persistent: true });

function handleDirAdd(path) {
	try {
		const dir = path.split(base)[1].trim();
		const dest = './src/routes/guides/hooks' + dir;
		fs.mkdirSync(dest);
	} catch (e) {
		console.log(e.message);
	}
}

function handleFileAdd(path) {
	try {
		let dir = path.split(base)[1].trim();
		let hookName = dir.split('/')[1];
		const dest = './src/routes/guides/hooks' + '/' + hookName + '/+page.svelte';
		if (path.endsWith('.svelte')) {
			fs.copyFileSync(path, dest);
		}
	} catch (e) {
		console.log(e.message);
	}
}

watcher
  .on('addDir', handleDirAdd)
  .on('add', handleFileAdd)
  .on('change', handleFileAdd)
.on('unlink', function(path) {console.log('File', path, 'has been removed');})
.on('error', function(error) {console.error('Error happened', error);})

const watcher2 = chokidar.watch(
	['./src/routes/guides/layout-hook.server.ts', './src/routes/guides/layout-hook.svelte'],
	{ ignored: /^\./, persistent: true }
);

function handleTemplates(path) {
  if (path.endsWith('svelte')) {
    fs.copyFileSync(path, './src/routes/guides/hooks/' + '+layout.svelte');
  } else {
    fs.copyFileSync(path, './src/routes/guides/hooks/' + '+layout.server.ts');
  }
}

watcher2
  .on('add', handleTemplates)
  .on('change', handleTemplates)