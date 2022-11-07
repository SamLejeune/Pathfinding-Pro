import MarkPositionView from './markPositionView.js';

class MarkPositionEnd extends MarkPositionView {
  _markup;
  _markerClass = 'cell--end';

  constructor() {
    super();
    this._setMarkup();
  }

  render() {
    this._addHandlerMouseDown(this._insertMarkup.bind(this));
    this._addHandlerMouseMove(this._insertMarkup.bind(this));

    this._addHandlerMouseUp();
  }

  _insertMarkup(e) {
    const cellEl = e.target.closest('.cell');
    const [...cellElClassArr] = cellEl.classList;
    const currEndMarker = document.querySelector(`.${this._markerClass}`);

    if (!cellEl) return;

    if (cellElClassArr.includes('cell--start')) return;

    currEndMarker.innerHTML = '';
    currEndMarker.classList.remove('cell--end');

    cellEl.innerHTML = this._markup;
    cellEl.classList.add('cell--end');
  }

  initEndMarker(rows, cols) {
    const x = Math.floor(rows / 2);
    const y = cols - Math.floor(cols / 6);

    const initCellEl = this._parentElement.querySelector(
      `[data-x="${x}"][data-y="${y}"]`
    );

    initCellEl.innerHTML = this._markup;
    initCellEl.classList.add('cell--end');
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
    <line
      x1="40"
      y1="216.00452"
      x2="40"
      y2="48.00452"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></line>
    <path
      d="M39.99951,168.00452c64-48,112,48,176,0v-120c-64,48-112-48-176,0"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
  </svg>`;
  }
}

export default new MarkPositionEnd();

// Create a new render function that you call in the controller once the render is complete. This will call everytime you move the end flag
