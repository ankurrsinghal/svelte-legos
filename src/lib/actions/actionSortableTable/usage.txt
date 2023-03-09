<script>
  import { actionSortableTable } from "$lib";
  import DemoContainer from "$lib/shared/components/DemoContainer.svelte";
</script>

<DemoContainer>
  <table use:actionSortableTable>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1</td>
        <td>Row 1</td>
        <td>Row 1</td>
      </tr>
      <tr>
        <td>Row 2</td>
        <td>Row 2</td>
        <td>Row 2</td>
      </tr>
      <tr>
        <td>Row 3</td>
        <td>Row 3</td>
        <td>Row 3</td>
      </tr>
    </tbody>
  </table>
</DemoContainer>
