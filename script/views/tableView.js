class TableView {
  parentElement = document.querySelector('.table');

  constructor() {
    this._openMarkup = this._setOpenMarkup();
    this._closedMarkup = this._setClosedMarkup();
  }

  generateTable(n) {
    this.generateRows(n);
    this.generateCells(n, n);
  }

  generateRows(rows) {
    this._clearInnerHTML();

    for (let i = 0; i < rows; i++) {
      const rowEl = document.createElement('tr');
      this.parentElement.insertAdjacentElement('beforeend', rowEl);
      rowEl.classList.add(`row--${i}`);
    }
  }

  generateCells(rows, columns) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellEl = document.createElement('td');
        const rowEl = document.querySelector(`.row--${i}`);

        rowEl.insertAdjacentElement('beforeend', cellEl);
        cellEl.classList.add('cell');
        cellEl.dataset.x = `${i}`;
        cellEl.dataset.y = `${j}`;
      }
    }
  }

  addOpenCell(x, y) {
    const [...cellArr] = document.querySelectorAll('td');

    const [openCellEl] = cellArr.filter(cell => {
      return cell.dataset.x === x && cell.dataset.y === y;
    });

    const tableType = this._getTableType();

    if (tableType === 'table-block' || !tableType)
      openCellEl.classList.add('open');

    if (tableType === 'table-topography') {
      openCellEl.style.opacity = 0.65;
    }
  }

  addClosedCell(x, y) {
    const [...cellArr] = document.querySelectorAll('td');

    const [closedCellEl] = cellArr.filter(cell => {
      return +cell.dataset.x === +x && +cell.dataset.y === +y;
    });

    const tableType = this._getTableType();

    if (tableType === 'table-block' || !tableType)
      closedCellEl.classList.add('closed');

    if (tableType === 'table-topography') {
      const [...cellClass] = closedCellEl.classList;

      if (cellClass.includes('cell--start')) return;

      closedCellEl.innerHTML = '';
      closedCellEl.innerHTML = this._closedMarkup;
    }
  }

  addPathCell(x, y) {
    const [...cellArr] = document.querySelectorAll('td');

    const [pathCellEl] = cellArr.filter(cell => {
      return cell.dataset.x === x && cell.dataset.y === y;
    });

    pathCellEl.classList.add('path');
  }

  _getTableType() {
    const tableName = this.parentElement.classList[1];

    return tableName;
  }

  _clearInnerHTML() {
    this.parentElement.innerHTML = '';
  }

  _setOpenMarkup() {
    return `
    <svg
    class="open-topography"
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#000000"
    viewBox="0 0 256 256"
    >
    <circle
    cx="128"
    cy="128"
    r="96"
    fill="none"
    stroke-miterlimit="10"
    stroke-width="24"
    ></circle>
    </svg> 
    `;
  }

  _setClosedMarkup() {
    return `
    <svg
      class="closed-topography"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <line
        x1="200"
        y1="56"
        x2="56"
        y2="200"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <line
        x1="200"
        y1="200"
        x2="56"
        y2="56"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
    </svg>
    `;
  }
}

export default new TableView();