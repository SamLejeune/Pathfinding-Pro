export default class Draw {
  _parentElement = document.querySelector('.table');
  _isDrawing = false;
  _isDrawBtnActive = false;
  _isRendering = false;

  _addHandlerMouseDown(handler) {
    this._parentElement.addEventListener('mousedown', e => {
      if (this._isDrawBtnActive === false) return;

      if (this._isRendering === true) return;

      this._isDrawing = true;

      handler(e);
    });
  }

  _addHandlerMouseMove(handler) {
    this._parentElement.addEventListener('mousemove', e => {
      if (this._isDrawBtnActive === false) return;

      if (this._isDrawing === false) return;

      handler(e);
    });
  }

  _addHandlerMouseUp(handler) {
    this._parentElement.addEventListener('mouseup', e => {
      if (this._isDrawBtnActive === false) return;

      this._isDrawing = false;

      if (!handler) return;

      handler(e);
    });
  }

  _addHandlerClickOut(drawType) {
    document.addEventListener('click', e => {
      if (this._isDrawBtnActive === false) return;

      const tableClick = e.target.closest('.table');
      const blockedBtnClick = e.target.closest(`.${drawType}-cell-btn`);

      if (tableClick || blockedBtnClick) return;

      this._btn.classList.remove('menu-input-container--btn--visited');
      this._isDrawing = false;
      this._setIsDrawBtnActive(false);
    });
  }

  _setIsDrawBtnActive(bool) {
    this._isDrawBtnActive = bool;
  }

  setTableType(drawType) {
    this._parentElement.className = `table table-${drawType}`;
  }

  _getTableType() {
    const tableName = this._parentElement.classList[1];

    return tableName;
  }

  _resetTableCells(drawType) {
    const [...tableClassArr] = this._parentElement.classList;

    if (tableClassArr.includes(`table-${drawType}`)) return;

    const [...cellElArr] = document.querySelectorAll('.cell');

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
  }

  resetDrawArr() {
    this.drawArr = [];
  }

  setIsRendering(bool) {
    this._isRendering = bool;
  }

  getIsRendering() {
    return this._isRendering;
  }
}
