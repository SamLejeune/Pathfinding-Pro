import Cell from './cell.js';

class Grid extends Cell {
  columns;
  rows;
  gridArr = [];
  blockedArr;
  erasedArr;

  setColumns(cols) {
    this.columns = cols;
  }

  setRows(rows) {
    this.rows = rows;
  }

  setBlockedArr(arr) {
    this.blockedArr = arr;
    console.log(this.blockedArr);
  }

  setErasedArr(arr) {
    this.erasedArr = arr;
  }

  setGridColumns() {
    this.gridArr = new Array(this.columns);
    console.log(this.columns);
  }

  setGridRows() {
    for (let i = 0; i < this.columns; i++) {
      this.gridArr[i] = new Array(this.columns);
    }
  }

  calcCells() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.gridArr[i][j] = new Cell(i, j);
      }
    }
  }

  callFindNeighbours() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const cell = this.gridArr[i][j];

        cell.findNeighbours(this.gridArr, this.columns, this.rows);
      }
    }
  }

  markBlockedCells(start, end) {
    if (this.blockedArr.length === 0) return;

    this.blockedArr.forEach(cell => {
      if (
        (cell.x === start.x && cell.y === start.y) ||
        (cell.x === end.x && cell.y === end.y)
      ) {
        console.log('hello');
        return;
      }

      this.gridArr[cell.x][cell.y].setIsBlocked();
    });

    if (start.isBlocked === true) start.resetIsBlocked();

    if (end.isBlocked === true) end.resetIsBlocked();
  }

  checkIfSellExists(checkCell) {
    return this.gridArr
      .flatMap(cell => cell)
      .some(cell => cell.x === checkCell.x && cell.y === checkCell.y);
  }

  resetIsExpored() {
    this.gridArr.flatMap(cell => cell).forEach(cell => cell.resetIsExpored());
  }
}

export default new Grid();
