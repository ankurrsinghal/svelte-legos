<script lang="ts">
import { useWindowFocus } from '$lib/hooks/useWindowFocus';
import DemoContainer from '$lib/shared/components/DemoContainer.svelte';

const isFocused = useWindowFocus();
const onFocusMessage = '💡 Click somewhere outside of the document to unfocus.';
const onBlurMessage = 'ℹ Tab is unfocused';

$: message = $isFocused ? onFocusMessage : onBlurMessage;
  
</script>
  
<DemoContainer>
  {message}
</DemoContainer>
  