class Game {
  start;
  end;
  openList = [];
  closedList = [];
  path = [];
  drawList = [];
  currentCell;
  tableType = '';
  speed;

  setStart(cell) {
    this.start = cell;
  }

  setEnd(cell) {
    this.end = cell;
  }

  setCurrentCell(cell) {
    this.currentCell = cell;
  }

  setOpenList(list) {
    this.openList = list;
  }

  setClosedList(list) {
    this.closedList = list;
  }

  setPath(list) {
    this.path = list;
  }

  setDrawlist(drawArr) {
    this.drawList = drawArr;
  }

  setTableType(type) {
    this.tableType = type;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  addCellToClosed(cell) {
    this.closedList.push(cell);
  }

  removeCellFromClosed(index) {
    this.closedList.splice(index, 1);
  }

  addCellToOpen(cell) {
    this.openList.push(cell);
  }

  removeCellFromOpen(index) {
    if (index === -1) return;

    this.openList.splice(index, 1);
  }

  addCellToPath(cell) {
    this.path.push(cell);
  }

  findCurrentCell() {
    const curr = this.openList.reduce((acc, cell) => {
      return acc.f < cell.f ? acc : cell;
    });

    return curr;
  }

  checkOpenListForCell(neighbourCell) {
    const [neighbourInOpenList] = this.openList.filter(cell => {
      return cell.x === neighbourCell.x && cell.y === neighbourCell.y;
    });

    return neighbourInOpenList;
  }

  checkClosedListForCell(neighbourCell) {
    const isInClosed = this.closedList.some(cell => {
      return cell.x === neighbourCell.x && cell.y === neighbourCell.y;
    });
    return isInClosed;
  }

  removeEraseFromBlockedArr(erasedArr) {
    if (erasedArr.length === 0) return;

    erasedArr.forEach(coord => {
      const erasedCoordIndex = this.findErasedCellIndex(coord);

      if (erasedCoordIndex < 0) return;

      this.drawList.splice(erasedCoordIndex, 1);
    });
  }

  findErasedCellIndex(eraseCoord) {
    const coordIndex = this.drawList.findIndex(
      coord => coord.x === eraseCoord.x && coord.y === eraseCoord.y
    );

    return coordIndex;
  }

  findOpenCellIndex(cell) {
    const openCellIndex = this.openList.findIndex(
      openCell => +openCell.x === cell.x && +openCell.y === cell.y
    );

    return openCellIndex;
  }

  findClosedCellIndex(cell) {
    const closedCellIndex = this.closedList.findIndex(
      closedCell => closedCell.x === cell.x && closedCell.y === cell.y
    );

    return closedCellIndex;
  }

  findCellInDrawList(cell) {
    if (!cell) return;

    const drawListCell = this.drawList.filter(
      el => el.x === cell.x && el.y === cell.y
    );

    return drawListCell;
  }

  findMinimumYDrawListCell() {
    const minBlockedCell = this.drawList.reduce((acc, cell) =>
      acc.y < cell.y ? acc : cell
    );
    return minBlockedCell;
  }

  resetGame() {
    this.drawList = [];
    this.currentCell = undefined;
    this.currentCellIndex = undefined;
  }
}

export default new Game();
