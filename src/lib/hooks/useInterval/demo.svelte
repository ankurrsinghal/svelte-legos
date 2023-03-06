<script lang="ts">
import { useInterval } from "$lib";
import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
import Text from "$lib/shared/components/Text.svelte";

const counter = useInterval(200);
</script>

<DemoContainer>
  <Text>
    {$counter}
  </Text>
</DemoContainer>
