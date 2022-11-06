import Draw from './draw.js';

class DrawStart extends Draw {
  _markup;
  _startCellActive = false;
  _currentStartCell;
  _previousStartCell;

  constructor() {
    super();
    this.addHandlerStartBtnActive();
  }

  addHandlerStartBtnActive(handler) {
    this._parentElement.addEventListener('mousedown', e => {
      const startCell = e.target.closest('.cell--start');

      if (!startCell) return;

      this._setIsDrawBtnActive === true;

      this.render();
    });
  }

  render() {
    this._markup = this._setMarkup();

    this._setIsDrawBtnActive(true);

    this._addHandlerMouseDown(this._insertMarkup.bind(this));
    this._addHandlerMouseMove(this._insertMarkup.bind(this));

    this._addHandlerMouseUp();
    this._addHandlerClickOut(this.drawType);
  }

  _insertMarkup(e) {
    // if (this._isDrawing === false || this._startCellActive === false) return;

    const cellEl = e.target.closest('.cell');

    if (!cellEl) return;

    this._removeStartCell();

    cellEl.innerHTML = this._markup;
  }

  _removeStartCell() {
    const [...cellElArr] = document.querySelectorAll('.cell');

    cellElArr.forEach(cellEl => {
      cellEl.classList.remove('cell--start');
      cellEl.innerHTML = '';
    });
  }

  _setMarkup() {
    return `<svg
    class="marked-cell"
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <circle
      cx="128"
      cy="104"
      r="32"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></circle>
    <path
      d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
  </svg>`;
  }
}

export default new DrawStart();
