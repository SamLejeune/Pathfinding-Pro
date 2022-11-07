import Draw from '../drawView/draw.js ';

class ReRenderView extends Draw {
  _parentElement = document.querySelector('.table');
  _currCoords;
  _isPlayComplete = false;
  isReRendering = false;

  render(handler) {
    this.addHandlerMouseDown();
    this.addHandlerMouseMove(handler);
    this.addHandlerMouseUp(handler);
  }

  addHandlerMouseDown(handler) {
    this._parentElement.addEventListener('mousedown', e => {
      const flagEl = e.target.closest('.marked-cell');

      if (!flagEl) return;

      if (this._isPlayComplete === false) return;

      this.isReRendering = true;
    });
  }

  addHandlerMouseMove(handler) {
    this._parentElement.addEventListener('mouseout', e => {
      const cellEl = e.target.closest('.cell');

      if (this.isReRendering === false) return;

      if (!cellEl) return;

      // handler();
    });
  }

  addHandlerMouseUp(handler) {
    this._parentElement.addEventListener('mouseup', e => {
      const endCellEl = e.target.closest('.marked-cell');

      if (!endCellEl) return;

      handler();

      this.isReRendering = false;
    });
  }

  clearCellStyle(cell) {
    const cellEl = document.querySelector(
      `[data-x="${cell.x}"][data-y="${cell.y}"]`
    );

    cellEl.className = 'cell';
  }

  setIsPlayComplete(bool) {
    this._isPlayComplete = bool;
  }

  getIsPlayComplete() {
    return this._isPlayComplete;
  }
}

export default new ReRenderView();
