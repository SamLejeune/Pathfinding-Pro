class TableView {
  parentElement = document.querySelector('.table');
  rows;
  columns;

  constructor() {
    this._setTableRows();
    this._setTableColumns();

    this._openMarkup = this._setOpenMarkup();
    this._closedMarkup = this._setClosedMarkup();
  }

  generateTable() {
    this.generateRows();
    this.generateCells();
  }

  generateRows() {
    this._clearInnerHTML();

    for (let i = 0; i < this.rows; i++) {
      const rowEl = document.createElement('tr');
      this.parentElement.insertAdjacentElement('beforeend', rowEl);
      rowEl.classList.add(`row--${i}`);
    }
  }

  generateCells() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
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

  getTableRows() {
    return this.rows;
  }

  getTableColumns() {
    return this.columns;
  }

  _setTableRows() {
    this.rows = Math.floor(window.innerHeight / 27) - 3;
  }

  _setTableColumns() {
    this.columns = Math.floor(window.innerWidth / 27) - 1;
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
