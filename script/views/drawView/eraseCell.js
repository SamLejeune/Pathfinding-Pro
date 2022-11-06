import Draw from './draw.js';

class EraseCell extends Draw {
  _btn = document.querySelector('.erase-cell-btn');
  _isDrawing = false;
  _drawType = 'erase';

  render() {
    this._setIsDrawBtnActive(true);

    this._addHandlerMouseDown(this._eraseCell);
    this._addHandlerMouseMove(this._eraseCell);
    this._addHandlerMouseUp();
    this._addHandlerClickOut(this._drawType);
  }

  _eraseCell(e) {
    const cellEl = e.target.closest('.cell');

    const tableEl = document.querySelector('.table');
    const [...tableClassArr] = tableEl.classList;

    if (tableClassArr.includes('table-block')) cellEl.className = 'cell';

    if (tableClassArr.includes('table-topography'))
      cellEl.className = 'cell elevation--1';
  }

  eraseCellAlgorithmically(x, y) {
    const [...cellElArr] = document.querySelectorAll('.cell');

    const tableEl = document.querySelector('.table');
    const [...tableClassArr] = tableEl.classList;

    const cellEl = cellElArr.find(cell => {
      return +cell.dataset.x === x && +cell.dataset.y === y;
    });
    const [...cellElClassArr] = cellEl.classList;

    if (tableClassArr.includes('table-block')) {
      if (cellElClassArr.includes('cell--start')) {
        cellEl.className = 'cell cell--start';
      } else if (cellElClassArr.includes('cell--end')) {
        cellEl.className = 'cell cell--end';
      } else {
        cellEl.className = 'cell';
      }
    }
  }
}

export default new EraseCell();
