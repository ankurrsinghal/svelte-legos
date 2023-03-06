<script lang="ts">
import { useDocumentVisibility } from '$lib';
import { useTimeoutFn } from '$lib/hooks/useTimeoutFn';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import Text from '$lib/shared/components/Text.svelte';

const visibility = useDocumentVisibility();
const startMessage = '💡 Minimize the page or switch tab then return';
const welcomeMessage = '🎉 Welcome back!';

const { start } = useTimeoutFn(() => {
  message = startMessage;
}, 3000);

let message = startMessage;

$: {
  if ($visibility === 'visible') {
    start();
  } else {
    message = welcomeMessage;
  }
}

</script>

<DemoContainer>
  <Text>
    {message}
  </Text>
</DemoContainer>
