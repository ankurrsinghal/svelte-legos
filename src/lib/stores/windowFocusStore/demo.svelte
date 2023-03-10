<script lang="ts">
import { windowFocusStore } from '$lib';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';
import Text from '$lib/shared/components/Text.svelte';

const isFocused = windowFocusStore();
const onFocusMessage = '💡 Click somewhere outside of the document to unfocus.';
const onBlurMessage = 'ℹ Tab is unfocused';

$: message = $isFocused ? onFocusMessage : onBlurMessage;
</script>
  
<DemoContainer>
  <Text>
    {message}
  </Text>
</DemoContainer>
  