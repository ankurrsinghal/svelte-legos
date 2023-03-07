import chokidar from 'chokidar';
import fs from 'fs';

const base = 'src/lib/hooks';
const watcher = chokidar.watch('./' + base, { ignored: /^\./, persistent: true });

try {
  fs.mkdirSync('./src/routes/guides/hooks');
} catch(e) {
  console.log(e.message);
}

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

function hanldeRemove(path) {
  try {
		const dir = path.split(base)[1].trim();
		const dest = './src/routes/guides/hooks' + dir;
		fs.unlinkSync(dest);
	} catch (e) {
		console.log(e.message);
	}
}

function handleFileRemove(path) {
	try {
		let dir = path.split(base)[1].trim();
		let hookName = dir.split('/')[1];
		const dest = './src/routes/guides/hooks' + '/' + hookName + '/+page.svelte';
		if (path.endsWith('.svelte')) {
			fs.unlinkSync(dest);
		}
	} catch (e) {
		console.log(e.message);
	}
}

watcher
  .on('addDir', handleDirAdd)
  .on('add', handleFileAdd)
  .on('change', handleFileAdd)
  .on('unlinkDir', hanldeRemove)
.on('unlink', handleFileRemove)
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




/**
 * Actions
 */

const actionsBase = 'src/lib/actions';
const actionsWatcher = chokidar.watch('./' + actionsBase, { ignored: /^\./, persistent: true });

try {
  fs.mkdirSync('./src/routes/guides/actions');
} catch(e) {
  console.log(e.message);
}

function handleDirAddAction(path) {
	try {
		const dir = path.split(actionsBase)[1].trim();
		const dest = './src/routes/guides/actions' + dir;
		fs.mkdirSync(dest);
	} catch (e) {
		console.log(e.message);
	}
}

function handleFileAddAction(path) {
	try {
		let dir = path.split(actionsBase)[1].trim();
		let hookName = dir.split('/')[1];
		const dest = './src/routes/guides/actions' + '/' + hookName + '/+page.svelte';
		if (path.endsWith('.svelte')) {
			fs.copyFileSync(path, dest);
		}
	} catch (e) {
		console.log(e.message);
	}
}

function hanldeRemoveAction(path) {
  try {
		const dir = path.split(actionsBase)[1].trim();
		const dest = './src/routes/guides/actions' + dir;
		fs.unlinkSync(dest);
	} catch (e) {
		console.log(e.message);
	}
}

function handleFileRemoveAction(path) {
	try {
		let dir = path.split(actionsBase)[1].trim();
		let hookName = dir.split('/')[1];
		const dest = './src/routes/guides/actions' + '/' + hookName + '/+page.svelte';
		if (path.endsWith('.svelte')) {
			fs.unlinkSync(dest);
		}
	} catch (e) {
		console.log(e.message);
	}
}

actionsWatcher
  .on('addDir', handleDirAddAction)
  .on('add', handleFileAddAction)
  .on('change', handleFileAddAction)
  .on('unlinkDir', hanldeRemoveAction)
.on('unlink', handleFileRemoveAction)
.on('error', function(error) {console.error('Error happened', error);})

const actionwatcher2 = chokidar.watch(
	['./src/routes/guides/layout-hook.server.ts', './src/routes/guides/layout-hook.svelte'],
	{ ignored: /^\./, persistent: true }
);

function handleTemplatesAction(path) {
  if (path.endsWith('svelte')) {
    fs.copyFileSync(path, './src/routes/guides/actions/' + '+layout.svelte');
  } else {
    fs.copyFileSync(path, './src/routes/guides/actions/' + '+layout.server.ts');
  }
}

actionwatcher2
  .on('add', handleTemplatesAction)
  .on('change', handleTemplatesAction)