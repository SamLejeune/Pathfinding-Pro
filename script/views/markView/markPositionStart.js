import MarkPositionView from './markPositionView.js';

class MarkPositionStart extends MarkPositionView {
  _markup;
  _markerClass = 'cell--start';

  constructor() {
    super();
    this._setMarkup();
    this.render();
  }

  render() {
    this._addHandlerMouseDown(this._insertMarkup.bind(this));
    this._addHandlerMouseMove(this._insertMarkup.bind(this));

    this._addHandlerMouseUp();
  }

  _insertMarkup(e) {
    const cellEl = e.target.closest('.cell');

    if (!cellEl) return;

    const [...cellElClassArr] = cellEl.classList;
    const currStartMarker = document.querySelector(`.${this._markerClass}`);

    if (cellElClassArr.includes('cell--end')) return;

    currStartMarker.innerHTML = '';
    currStartMarker.classList.remove('cell--start');

    cellEl.innerHTML = this._markup;
    cellEl.classList.add('cell--start');
  }

  initStartMarker(rows, cols) {
    const x = Math.floor(rows / 2);
    const y = Math.floor(cols / 6) - 1;

    const initCellEl = this._parentElement.querySelector(
      `[data-x="${x}"][data-y="${y}"]`
    );

    initCellEl.innerHTML = this._markup;
    initCellEl.classList.add('cell--start');
  }

  _setMarkup() {
    this._markup = `<svg
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

export default new MarkPositionStart();
