class PlayMenuView {
  _parentElement = document.querySelector('.navigation-menu');
  buttonType;
  isEnabled = true;

  addHandlerPlay(handler) {
    this._parentElement.addEventListener('click', e => {
      const playBtn = e.target.closest('.play-btn');

      if (!playBtn) return;

      if (this.isEnabled === false) return;

      this._setButtonType(playBtn);
      handler(this.buttonType);
    });
  }

  disablePlayButton() {
    const playBtnEl = this._parentElement.querySelector('.play-btn');

    playBtnEl.classList.add('disable-btn');
    this.setIsEnabled();
    playBtnEl.textContent = 'Rendering';
  }

  enablePlayButton() {
    const playBtnEl = this._parentElement.querySelector('.play-btn');

    playBtnEl.classList.remove('disable-btn');
    this.setIsEnabled();
    playBtnEl.textContent = 'Play';
  }

  setIsEnabled() {
    this.isEnabled = !this.isEnabled;
  }

  _setButtonType(btnEl) {
    this.buttonType = btnEl.classList[1];
  }
}

export default new PlayMenuView();
