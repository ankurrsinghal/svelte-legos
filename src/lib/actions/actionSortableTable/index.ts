export function actionSortableTable(
  node: HTMLElement,
  { headerSelector: headerSelector = `thead th` } = {}
) {
  // this action can be applied to bob-standard HTML tables to make them sortable by
  // clicking on column headers (and clicking again to toggle sorting direction)
  const headers = node.querySelectorAll<HTMLTableCellElement>(headerSelector);
  let sortColIdx: number;
  let sortDir = 1; // 1 = asc, -1 = desc

  for (const [idx, header] of headers.entries()) {
    // add cursor pointer to headers
    header.style.cursor = `pointer`;
    const init_bg = header.style.backgroundColor;
    header.addEventListener(`click`, () => {
      for (const header of headers) {
        // removing any existing arrows
        header.textContent = header.textContent?.replace(/ ↑| ↓/, ``);
        header.classList.remove(`asc`, `desc`);
        header.style.backgroundColor = init_bg;
      }
      header.classList.toggle(sortDir > 0 ? `asc` : `desc`);
      header.style.backgroundColor = `rgba(255, 255, 255, 0.1)`;
      // append arrow to header text
      if (idx === sortColIdx) {
        sortDir *= -1; // reverse sort direction
      } else {
        sortColIdx = idx; // set new sort column index
        sortDir = 1; // reset sort direction
      }
      header.innerHTML = `${header.textContent} ${sortDir > 0 ? `↑` : `↓`}`;
      const tableBody = node.querySelector(`tbody`);
      if (!tableBody) return;

      // re-sort table
      const rows = Array.from(tableBody.querySelectorAll(`tr`));
      rows.sort((row1, row2) => {
        const val_1 = row1.cells[sortColIdx].textContent ?? ``;
        const val_2 = row2.cells[sortColIdx].textContent ?? ``;
        return (
          sortDir * val_1.localeCompare(val_2, undefined, { numeric: true })
        );
      });

      for (const row of rows) tableBody.appendChild(row);
    });
  }
}
