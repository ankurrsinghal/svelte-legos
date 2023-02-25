<script setup lang="ts">
	import { writable } from 'svelte/store';
	import { useIntervalFn } from './';
	const greetings = [
		'Hello',
		'Hi',
		'Yo!',
		'Hey',
		'Hola',
		'こんにちは',
		'Bonjour',
		'Salut!',
		'你好',
		'Привет'
	];
	let word = 'Hello';
	let interval = writable(500);

  const { pause, resume, isActive, changeIntervalTime } = useIntervalFn(handler, interval)

  function handler() {
    word = greetings[Math.floor(Math.random() * greetings.length)];
  }

  // $: changeIntervalTime(interval)
</script>

<div>
	<p>{word} {$interval}</p>
	<p>
		interval:
		<input bind:value={$interval} type="number" placeholder="interval" />
	</p>
	{#if $isActive}
		<button class="orange" on:click={pause}> Pause </button>
	{:else}
		<button on:click={resume}> Resume </button>
	{/if}
</div>
