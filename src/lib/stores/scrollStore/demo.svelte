<script lang="ts">
import { scrollStore } from "$lib";
import BooleanDisplay from "$lib/shared/components/BooleanDisplay.svelte";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import { InputClass } from "$lib/shared/tailwind";

let el: HTMLElement | null = null;
let smooth = false;

// Format the numbers with toFixed() to make them
// nicer to display
// const displayX = computed({
// 	get() {
// 		return x.value.toFixed(1);
// 	},
// 	set(val) {
// 		x.value = Number.parseFloat(val);
// 	},
// });
// const displayY = computed({
// 	get() {
// 		return y.value.toFixed(1);
// 	},
// 	set(val) {
// 		y.value = Number.parseFloat(val);
// 	},
// });

$: myScrollStore = el !== null ? scrollStore(el, { behavior }) : null;
$: behavior = smooth ? "smooth" : "auto";
$: displayX = $myScrollStore?.x;
$: displayY = $myScrollStore?.y;
$: isScrolling = $myScrollStore?.isScrolling;
$: arrivedState = $myScrollStore?.arrivedState;
$: directions = $myScrollStore?.directions;
$: left = arrivedState?.left || false;
$: right = arrivedState?.right || false;
$: bottom = arrivedState?.bottom || false;
$: top = arrivedState?.top || false;
$: toLeft = directions?.left || false;
$: toRight = directions?.right || false;
$: toTop = directions?.bottom || false;
$: toBottom = directions?.top || false;
</script>

<DemoContainer>
	<div class="flex">
		<div bind:this={el} class="w-[300px] h-[300px] m-auto overflow-scroll bg-gray-500/5 rounded">
			<div class="w-[500px] h-[400px] relative">
				<div class="absolute left-0 top-0 gray-500/5 x-2 y-1">TopLeft</div>
				<div class="absolute left-0 bottom-0 gray-500/5 x-2 y-1">BottomLeft</div>
				<div class="absolute right-0 top-0 gray-500/5 x-2 y-1">TopRight</div>
				<div class="absolute right-0 bottom-0 gray-500/5 x-2 y-1">BottomRight</div>
				<div class="absolute left-1/3 top-1/3 gray-500/5 x-2 y-1">Scroll Me</div>
			</div>
		</div>
		<div class="m-auto w-[280px] pl-4">
			<div class="px-6 py-4 rounded grid grid-cols-[120px_auto] gap-2 bg-gray-500/5">
				<span class="right py-4 opacity-75">X Position</span>
				<div class="text-primary">
					<div>
						<input
							class={InputClass}
							bind:value={$displayX}
							type="number"
							min="0"
							max="200"
							step="10"
						/>
					</div>
				</div>
				<span class="py-4 right opacity-75">Y Position</span>
				<div class="text-primary">
					<div>
						<input
							class={InputClass}
							bind:value={$displayY}
							type="number"
							min="0"
							max="100"
							step="10"
						/>
					</div>
				</div>
				<label for="smooth-scrolling-option" class="right opacity-75">Smooth scrolling</label>
				<span><input id="smooth-scrolling-option" bind:value={smooth} type="checkbox" /></span>
				<span class="opacity-75 right">isScrolling</span>
				<BooleanDisplay value={$isScrolling} />
				<div class="opacity-75 right">Top Arrived</div>
				<BooleanDisplay value={top} />
				<div class="opacity-75 right">Right Arrived</div>
				<BooleanDisplay value={right} />
				<div class="opacity-75 right">Bottom Arrived</div>
				<BooleanDisplay value={bottom} />
				<div class="opacity-75 right">Left Arrived</div>
				<BooleanDisplay value={left} />
				<div class="opacity-75 right">Scrolling Up</div>
				<BooleanDisplay value={toTop} />
				<div class="opacity-75 right">Scrolling Right</div>
				<BooleanDisplay value={toRight} />
				<div class="opacity-75 right">Scrolling Down</div>
				<BooleanDisplay value={toBottom} />
				<div class="opacity-75 right">Scrolling Left</div>
				<BooleanDisplay value={toLeft} />
			</div>
		</div>
	</div>
</DemoContainer>
