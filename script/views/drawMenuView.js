class DrawMenuView {
  _parentElement = document.querySelector('.navigation-menu');
  _currBtn;

  addHandlerBlockedCell(handler) {
    this._parentElement.addEventListener('click', e => {
      const blockedCellBtn = e.target.closest('.block-cell-btn');

      if (!blockedCellBtn) {
        this._toggleNavBtnActive();
        return;
      }

      this._currBtn = 'block';
      this._toggleNavBtnActive();
      blockedCellBtn.classList.add('nav-btn-active');
      handler();
    });
  }

  addHandlerTopographyCell(handler) {
    this._parentElement.addEventListener('click', e => {
      const topographyCellBtn = e.target.closest('.topography-cell-btn');

      if (!topographyCellBtn) return;

      this._currBtn = topographyCellBtn;
      handler();
    });
  }

  addHanlderEraseCell(handler) {
    this._parentElement.addEventListener('click', e => {
      const eraseCellBtn = e.target.closest('.erase-cell-btn');

      if (!eraseCellBtn && this._currBtn !== 'block') {
        this._toggleNavBtnActive();
        return;
      }

      eraseCellBtn?.classList.add('nav-btn-active');
      handler();
    });
  }

  addHandlerEraseAll(handler) {
    this._parentElement.addEventListener('click', e => {
      const eraseAllBtn = e.target.closest('.erase-all-cell-btn');

      if (!eraseAllBtn) return;

      handler();
    });
  }

  _toggleNavBtnActive() {
    const navBtns = this._parentElement.querySelectorAll(
      '.custom-select--label'
    );

    navBtns.forEach(btn => {
      btn.classList.remove('nav-btn-active');
    });
  }

  _styleClickedBtn(btnEl) {
    btnEl.classList.add('menu-input-container--btn--visited');
  }
}

export default new DrawMenuView();
