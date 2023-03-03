import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import type { UserConfig } from 'vite';

function myPlugin() {
  return {
    name: 'my-plugin',
    configResolved() {
      const srcHooks = fs.readdirSync('./src/lib/hooks');
      
      srcHooks.forEach(hook => {
        try {
          fs.mkdirSync('./src/routes/guides/hooks/' + hook);
        } catch(e) {
          console.log(e.message);
        }
      });

      srcHooks.forEach(hook => {
        try {
          fs.copyFileSync('./src/lib/hooks/' + hook + '/demo.svelte', './src/routes/guides/hooks/' + hook + '/+page.svelte');
        } catch(e) {
          console.log(e.message);
        }
      });
    },
  }
}

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
