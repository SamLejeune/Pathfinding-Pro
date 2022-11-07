export default class Cell {
  constructor(i, j) {
    this.x = i;
    this.y = j;
  }

  g = 0;
  h = 0;
  f = 0;
  z = 1;
  neighbours = [];
  previous;
  isBlocked = false;
  isExplored = false;
  maze = {
    isOrigin: false,
    direction: '',
  };

  calcF(tableType) {
    if (tableType === 'block' || !tableType) this.f = this.g + this.h;

    if (tableType === 'topography') this.f = this.g + this.h + this.z;
  }

  calcH(cell, end) {
    const a = +cell.x - +end.x;
    const b = +cell.y - +end.y;

    this.h = Math.abs(a) + Math.abs(b);
  }

  traceCalcH(cell, end) {
    console.log(cell.x);
    console.log(end);
    const a = +cell.x - +end.x;
    const b = +cell.y - +end.y;

    this.h = Math.abs(a) + Math.abs(b) * 1000000;
  }

  calcG(prevCell) {
    const prevCellG = prevCell === undefined ? 0 : +prevCell.g;

    this.g = prevCellG + 1;
  }

  setF(num) {
    this.f = num;
  }

  setH(num) {
    this.h = num;
  }

  setG(num) {
    this.g = num;
  }

  setPrevious(cell) {
    this.previous = cell;
  }

  resetPrevious() {
    this.previous = undefined;
  }

  setIsOrigin() {
    this.maze.isOrigin = true;
  }

  resetIsOrigin() {
    this.maze.isOrigin = false;
  }

  setDirection(direction) {
    this.maze.direction = direction;
  }

  resetDirection() {
    this.maze.direction = '';
  }

  calcZ(currCell, prevCell) {
    const currElevation = currCell ? currCell.elevation : 0;
    const prevElevation = prevCell ? prevCell.elevation : 0;

    if (currElevation > prevElevation) this.z = currElevation;

    if (currElevation < prevElevation) this.z = -currElevation;

    if (currElevation === prevElevation) this.z = 1;
  }

  findNeighbours(gridArr, xMax, yMax) {
    // Horizontal & vertical:
    if (this.x > 0) this.neighbours.push(gridArr[this.x - 1][this.y]);
    if (this.x < xMax - 1) this.neighbours.push(gridArr[this.x + 1][this.y]);
    if (this.y > 0) this.neighbours.push(gridArr[this.x][this.y - 1]);
    if (this.y < yMax - 1) this.neighbours.push(gridArr[this.x][this.y + 1]);
  }

  setIsBlocked() {
    this.isBlocked = true;
  }

  resetIsBlocked() {
    this.isBlocked = false;
  }

  setIsExplored() {
    this.isExplored = true;
  }

  resetIsExplored() {
    this.isExplored = false;
  }
}
