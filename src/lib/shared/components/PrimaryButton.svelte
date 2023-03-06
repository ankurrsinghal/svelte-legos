<script lang="ts">
  export let disabled: boolean = false;

  const classNames = `
    inline-block
    text-sm
    bg-prime
    text-white
    px-4
    py-2
    rounded-md
    disabled:bg-slate-300
  `;
</script>

<button
  disabled={disabled}
  class={classNames
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean)
    .join(" ")}
  on:click><slot /></button
>
