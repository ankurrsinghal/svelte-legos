# Contribution Guide

Contributions are welcome! Please follow the steps below to contribute.

## Steps to contribute

- Create your new utility/action/etc "lego brick" in the correct folder e.g. a new utility called 'battery' would be in `src/lib/utilities/battery`
- Each "lego brick" should have 4 files.
- - demo.svelte

```svelte
<script lang="ts">
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { yourLegoBrick } from "$lib";

$: result = yourLegoBrick();
</script>

<DemoContainer>
	<div>
		{result}
	</div>
</DemoContainer>
```

- - index.ts

```typescript
/**
 * A description of your lego brick
 * @example how to use your lego brick
 */
export function yourLegoBrick() {
	/* Your code here */
}
```

- - meta.json

```json
{
	"description": "A description of your lego brick"
}
```

- - usage.txt

```svelte
<script lang="ts">
import { yourLegoBrick } from "svelte-legos";

const beingUsed = yourLegoBrick();
</script>
```

- Export your "lego brick" in the `src/lib/index.js` file
- Once completed and tested
- Commit and push
- Create a pull request

### Thank you for your contribution!
