class configureMenuView {
  _parentElement = document.querySelector('.navigation-menu');
  _speedElement = document.querySelector('.custom-select--');
  maze = undefined;
  algorithm = undefined;
  speed = 'fast';
  isMazeRendering = false;

  constructor() {
    this._addHandlerDropdownMenu();
  }

  _addHandlerDropdownMenu() {
    document.addEventListener('click', e => {
      const dropdownEl = e.target.closest('.custom-select--label');

      if (dropdownEl) {
        const dropdownClasses = [...dropdownEl.classList];
        const dropdownType = dropdownClasses[1];
        const dropdownMenu = document.querySelector(
          `.${dropdownType}-dropdown`
        );

        if (!dropdownMenu) {
          this._hideDropdownMenu();
          this._toggleNavBtnActive();
          return;
        }

        if (dropdownClasses.includes('nav-active')) {
          dropdownMenu.classList.toggle('hidden');
          dropdownEl.classList.remove('nav-active');
          return;
        }

        this._hideDropdownMenu();
        this._toggleNavBtnActive();
        dropdownMenu.classList.toggle('hidden');
        dropdownEl.classList.add('nav-active');
      }

      if (!dropdownEl) {
        this._hideDropdownMenu();
        this._toggleNavBtnActive();
        return;
      }
    });
  }

  addHandlerClickOption(handlerMaze, handlerSpeed) {
    document.addEventListener('click', e => {
      const optionEl = e.target.closest('option');

      if (!optionEl) return;

      const dropdownMenuEl = optionEl.closest('.custom-select--options');
      const dropdownMenuType = [...dropdownMenuEl.classList][1].split('-')[0];
      this[`${dropdownMenuType}`] = optionEl.textContent.toLowerCase();
      this._toggleOptionActive(dropdownMenuEl);
      optionEl.classList.add('option-active');

      if (dropdownMenuType === 'maze') handlerMaze();

      if (dropdownMenuType === 'speed') handlerSpeed();
    });
  }

  _hideDropdownMenu() {
    const dropdownMenu = document.querySelectorAll('.custom-select--options');

    [...dropdownMenu].forEach(menu => menu.classList.add('hidden'));
  }

  _toggleNavBtnActive() {
    const navBtns = this._parentElement.querySelectorAll(
      '.custom-select--label'
    );

    navBtns.forEach(btn => btn.classList.remove('nav-active'));
  }

  _toggleOptionActive(menuEl) {
    const menuOptions = menuEl.querySelectorAll('option');

    menuOptions.forEach(option => option.classList.remove('option-active'));
  }

  _setAlgorithm(choice) {
    this.algorithm = choice;
  }

  setIsMazeRendering(bool) {
    this.isMazeRendering = bool;
  }

  getAlgorithm() {
    return this.algorithm;
  }

  getMaze() {
    return this.maze;
  }

  getSpeed() {
    return this.speed;
  }
}

export default new configureMenuView();
