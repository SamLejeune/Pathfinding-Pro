export default class MarkPositionView {
  _parentElement = document.querySelector('.table');
  _isDrawing = false;
  _isRendering = false;

  _addHandlerMouseDown(handler) {
    this._parentElement.addEventListener('mousedown', e => {
      const markEl = e.target.closest(`.${this._markerClass}`);

      if (!markEl) return;

      if (this._isRendering === true) return;

      this._isDrawing = true;

      handler(e);
    });
  }

  _addHandlerMouseMove(handler) {
    this._parentElement.addEventListener('mousemove', e => {
      const markEl = document.querySelector(`.${this._markerClass}`);

      if (!markEl) return;

      if (this._isDrawing === false) return;

      handler(e);
    });
  }

  _addHandlerMouseUp() {
    this._parentElement.addEventListener('mouseup', e => {
      this._isDrawing = false;

      const markEl = document.querySelector(`.${this._markerClass}`);

      markEl.classList.remove('block');
    });
  }

  getMarkerCoords() {
    const markerEl = document.querySelector(`.${this._markerClass}`);

    return { x: +markerEl.dataset.x, y: +markerEl.dataset.y };
  }

  setIsRendering(bool) {
    this._isRendering = bool;
  }
}
