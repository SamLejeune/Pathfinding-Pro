import Draw from './draw.js';

class DrawBlocked extends Draw {
  _btn = document.querySelector('.block-cell-btn');
  drawType = 'block';
  blockedArr = [];

  render() {
    this._resetTableCells(this.drawType);
    this.setTableType(this.drawType);
    this._setIsDrawBtnActive(true);

    this._addHandlerMouseDown(this._colorCell);
    this._addHandlerMouseMove(this._colorCell);

    this._addHandlerMouseUp();
    this._addHandlerClickOut(this.drawType);
  }

  _colorCell(e) {
    const cellEl = e.target.closest('td');

    if (!cellEl) return;

    cellEl.classList.add('block');
  }

  colorCellAlgorithmically(x, y) {
    const [...cellElArr] = document.querySelectorAll('.cell');

    const cellEl = cellElArr.find(cell => {
      return +cell.dataset.x === x && +cell.dataset.y === y;
    });

    const [...cellElClassArr] = cellEl.classList;
    if (
      cellElClassArr.includes('cell--start') ||
      cellElClassArr.includes('cell--end')
    )
      return;

    cellEl.classList.add('block');
    this.setTableType(this.drawType);
  }

  getBlockedCells() {
    const [...cellElArr] = document.querySelectorAll('.cell');

    cellElArr.forEach(cell => {
      const [...cellElClassArr] = cell.classList;

      if (cellElClassArr.includes('block')) {
        const cellX = +cell.dataset.x;
        const cellY = +cell.dataset.y;
        this.blockedArr.push({ x: cellX, y: cellY });
      }
    });

    return this.blockedArr;
  }

  setBlockedArr(list) {
    this.blockedArr = list;
  }
}

export default new DrawBlocked();
