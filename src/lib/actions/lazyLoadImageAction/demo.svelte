<script>
import { lazyLoadImageAction } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { PrimaryButtonClassName } from "$lib/shared/tailwind";
</script>

<DemoContainer>
	<div class="h-[500px]">Scroll, scroll, scroll</div>
	<div class="mb-4">Below is an image which will load just now</div>
	<img use:lazyLoadImageAction data-src="https://source.unsplash.com/8n7ipHhI8CI" alt="Testing" />
</DemoContainer>
