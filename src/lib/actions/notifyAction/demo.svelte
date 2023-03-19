<script lang="ts">
  import { notifyAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
  import { PrimaryButtonClassName } from "$lib/shared/tailwind";
  import type { NotificationType } from "./Notification";

  let title = "Title";
  let description = "You can put your little description here.";
  let type: NotificationType | undefined;
  let duration = 5000;
</script>

<DemoContainer>
  <div class="mb-4">
    <input
      class="px-3 py-2 border border-black rounded-md text-md"
      bind:value={title}
    />
  </div>
  <div class="mb-4">
    <textarea
      class="px-3 py-2 border border-black rounded-md text-md"
      bind:value={description}
    />
  </div>
  <div class="mb-4">
    <label class="mr-2">
      <input type="radio" name="type" value="success" bind:group={type} />
      Success
    </label>
    <label class="mr-2">
      <input type="radio" name="type" value="error" bind:group={type} />
      Error
    </label>
    <label class="mr-2">
      <input type="radio" name="type" value="warning" bind:group={type} />
      Warning
    </label>
    <label class="mr-2">
      <input type="radio" name="type" value="info" bind:group={type} />
      Info
    </label>
    <label class="mr-2">
      <input type="radio" name="type" value="" bind:group={type} />
      None
    </label>
  </div>
  <div class="mb-4">
    <label class="mr-2">
      Duration (in ms)
      <input
        class="px-3 py-2 border border-black rounded-md text-md"
        bind:value={duration}
      />
    </label>
  </div>
  <button
    class={PrimaryButtonClassName}
    use:notifyAction={{
      title,
      description,
      type,
      duration,
    }}
  >
    Notify
  </button>
</DemoContainer>
