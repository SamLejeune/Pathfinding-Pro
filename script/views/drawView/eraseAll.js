import Draw from './draw.js';

class EraseAll extends Draw {
  render() {
    if (this._isRendering === true) return;

    this._eraseAllCells();
  }

  _eraseAllCells() {
    const tableEl = document.querySelector('.table');
    const [...tableClassArr] = tableEl.classList;
    const [...cellElArr] = document.querySelectorAll('.cell');

    if (tableClassArr.includes('table-block'))
      cellElArr.forEach(cell => {
        const [...cellClass] = cell.classList;

        if (cellClass.includes('cell--start')) {
          cell.className = 'cell cell--start';
          return;
        }

        if (cellClass.includes('cell--end')) {
          cell.className = 'cell cell--end';
          return;
        }

        cell.className = 'cell';
      });

    if (tableClassArr.includes('table-topography'))
      cellElArr.forEach(cell => {
        const [...cellClass] = cell.classList;

        if (cellClass.includes('cell--start')) {
          cell.className = 'cell cell--start';
          return;
        }

        if (cellClass.includes('cell--end')) {
          cell.className = 'cell cell--end';
          return;
        }

        cell.className = 'cell elevation--1';
      });
  }

  eraseAllClosedAndPath() {
    if (this._isRendering === true) return;

    const [...cellPathArr] = this._parentElement.querySelectorAll('.path');
    const [...cellClosedArr] = this._parentElement.querySelectorAll('.closed');

    cellPathArr.forEach(cell => cell.classList.remove('path'));

    cellClosedArr.forEach(cell => cell.classList.remove('closed'));
  }
}

export default new EraseAll();
