<script>
  import { sortableTableAction } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
  <p class="p-2 mb-4">
    Try clicking on the columns to sort the rows
  </p>
  <table use:sortableTableAction class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-left p-2">Column 1</th>
        <th class="text-left p-2">Column 2</th>
        <th class="text-left p-2">Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="p-2">Row 1</td>
        <td class="p-2">Row 1</td>
        <td class="p-2">Row 1</td>
      </tr>
      <tr>
        <td class="p-2">Row 2</td>
        <td class="p-2">Row 2</td>
        <td class="p-2">Row 2</td>
      </tr>
      <tr>
        <td class="p-2">Row 3</td>
        <td class="p-2">Row 3</td>
        <td class="p-2">Row 3</td>
      </tr>
    </tbody>
  </table>
</DemoContainer>
