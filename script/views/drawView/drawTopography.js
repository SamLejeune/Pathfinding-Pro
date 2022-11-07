import Draw from './draw.js';

class DrawTopography extends Draw {
  _btn = document.querySelector('.topography-cell-btn');
  _timer = undefined;
  _elevation = 1;
  _neighboursCoordsArr = [];
  _distantNeighbourCoordsArr = [];
  drawArr = [];
  drawType = 'topography';

  render() {
    this._resetTableCells(this.drawType);
    this._setTableType(this.drawType);
    this._setIsDrawBtnActive(true);

    this._setBaseElevation();
    this._addHandlerMouseDownElevation();
    this._addHandlerMouseMoveElevation();
    this._addHandlerMouseUpElevation();
    this._addHandlerClickOut(this.drawType);
  }

  _addHandlerMouseDownElevation() {
    this._parentElement.addEventListener('mousedown', e => {
      if (this._isDrawBtnActive === false) return;
      this._isDrawing = true;

      this._resetElevation();
      this._clearTimer();
      this._setTimer(e);
    });
  }

  _addHandlerMouseMoveElevation() {
    this._parentElement.addEventListener('mousemove', e => {
      if (this._isDrawBtnActive === false) return;

      if (this._isDrawing === false) return;

      if (this._elevation < 2) return;

      this._clearTimer();
      this._drawCellElevation(e);
    });
  }

  _addHandlerMouseUpElevation() {
    this._parentElement.addEventListener('mouseup', e => {
      if (this._isDrawBtnActive === false) return;

      this._clearTimer();
      this._isDrawing = false;
    });
  }

  _setTimer(e) {
    this._timer = setInterval(() => {
      this._elevation += 1;
      this._drawCellElevation(e);
    }, 300);
  }

  _clearTimer() {
    clearInterval(this._timer);
  }

  _resetElevation() {
    this._elevation = 1;
  }

  _setBaseElevation() {
    const [...cellElArr] = document.querySelectorAll('.cell');

    cellElArr.forEach(cell => {
      cell.classList.add('elevation--1');
    });
  }

  _drawCellElevation(e) {
    const cellEl = e.target.closest('.cell');

    if (this._elevation > 4) return;

    // cellEl.className = `cell elevation--${this._elevation}`;
    const cellElClassList = cellEl.classList;
    cellElClassList.replace(
      `elevation--${this._elevation - 1}`,
      `elevation--${this._elevation}`
    );
    this._addToDrawArr(cellEl, this._elevation);

    this._setNeighboursCoordsArr(cellEl);
    this._drawNeighbourElevation(this._neighboursCoordsArr, 1);

    if (this._elevation < 4) return;

    this._setDistantNeighbourCoordsArr(cellEl);
    this._drawNeighbourElevation(this._distantNeighbourCoordsArr, 2);
  }

  _drawNeighbourElevation(neighboursArr, distFromPeak) {
    if (this._elevation < 2) return;

    neighboursArr.forEach(coord => {
      const cellEl = document.querySelector(
        `[data-x="${coord.x}"][data-y="${coord.y}"]`
      );

      if (!cellEl) return;

      const cellElClassList = cellEl.classList;
      const neighbourCurrentElevation = +[...cellElClassList].pop().slice(-1);
      const neighbourPotentialElevation = this._elevation - distFromPeak;

      if (neighbourCurrentElevation > neighbourPotentialElevation) return;

      if (neighbourCurrentElevation < neighbourPotentialElevation) {
        cellElClassList.replace(
          `elevation--${neighbourCurrentElevation}`,
          `elevation--${neighbourPotentialElevation}`
        );
        this._addToDrawArr(cellEl, neighbourPotentialElevation);
      }
    });
  }

  _addToDrawArr(cell, elevation) {
    const cellX = +cell.dataset.x;
    const cellY = +cell.dataset.y;

    const checkCellIndex = this.drawArr.findIndex(
      coord => coord.x === cellX && coord.y === cellY
    );

    if (checkCellIndex >= 0) this.drawArr.splice(checkCellIndex, 1);

    this.drawArr.push({ x: cellX, y: cellY, elevation: elevation });
  }

  _setNeighboursCoordsArr(cellEl) {
    const cellX = +cellEl.dataset.x;
    const cellY = +cellEl.dataset.y;

    this._neighboursCoordsArr = [
      { x: cellX - 1, y: cellY - 1 },
      { x: cellX - 1, y: cellY + 1 },
      { x: cellX + 1, y: cellY - 1 },
      { x: cellX, y: cellY - 1 },
      { x: cellX, y: cellY + 1 },
      { x: cellX - 1, y: cellY },
      { x: cellX + 1, y: cellY },
      { x: cellX + 1, y: cellY + 1 },
    ];
  }

  _setDistantNeighbourCoordsArr(cellEl) {
    const cellX = +cellEl.dataset.x;
    const cellY = +cellEl.dataset.y;

    this._distantNeighbourCoordsArr = [
      { x: cellX - 2, y: cellY - 2 },
      { x: cellX - 2, y: cellY - 1 },
      { x: cellX - 1, y: cellY - 1 },
      { x: cellX - 2, y: cellY + 2 },
      { x: cellX - 2, y: cellY + 1 },
      { x: cellX - 1, y: cellY + 2 },
      { x: cellX - 2, y: cellY + 2 },
      { x: cellX + 2, y: cellY - 2 },
      { x: cellX, y: cellY - 2 },
      { x: cellX + 1, y: cellY - 2 },
      { x: cellX - 1, y: cellY - 2 },
      { x: cellX + 1, y: cellY + 2 },
      { x: cellX, y: cellY + 2 },
      { x: cellX - 2, y: cellY },
      { x: cellX - 2, y: cellY + 1 },
      { x: cellX - 2, y: cellY - 1 },
      { x: cellX + 2, y: cellY },
      { x: cellX + 2, y: cellY + 1 },
      { x: cellX + 2, y: cellY - 1 },
      { x: cellX + 2, y: cellY + 2 },
    ];
  }
}

export default new DrawTopography();
