<p align="center">
# Svelte Legos
<br>
Collection of essential Svelte Composition Utilities
</p>

## 🚀 Features

- 🎪 [**Interactive docs & demos**](https://svelte-legos.singhalankur.com)
- ⚡ **Fully tree shakeable**: Only take what you want, [bundle size]
- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc)
- 🔋 **SSR Friendly**
- 🌎 **No bundler required**: Usable via CDN
- 🔩 **Flexible**: Configurable event filters and targets

## 🦄 Usage

```svelte
<script lang="ts">
import { useCounter } from "$lib";

const { counter, inc, dec, set, reset } = useCounter();
</script>
```

```svelte
<script lang="ts">
import { useWindowSize } from "$lib";

const size = useWindowSize();
</script>

<div>{$size.width}</div>
<div>{$size.height}</div>
```

Refer to [functions list](https://svelte-legos.singhalankur.com/guides) or [documentations](https://svelte-legos.singhalankur.com) for more details.

## 📦 Install

```bash
npm i svelte-legos
```
## 🌸 Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse/vueuse](https://github.com/vueuse/vueuse)
- [streamich/react-use](https://github.com/streamich/react-use)
- [u3u/vue-hooks](https://github.com/u3u/vue-hooks)
- [logaretm/vue-use-web](https://github.com/logaretm/vue-use-web)
- [kripod/react-hooks](https://github.com/kripod/react-hooks)