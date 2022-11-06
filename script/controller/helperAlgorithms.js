import grid from '../model/grid.js';
import game from '../model/game.js';
import tableView from '../views/tableView.js';
import markPositionStart from '../views/markView/markPositionStart.js';
import markPositionEnd from '../views/markView/markPositionEnd.js';
import drawBlcoked from '../views/drawView/drawBlcoked.js';
import drawTopography from '../views/drawView/drawTopography.js';
import eraseCell from '../views/drawView/eraseCell.js';
import eraseAll from '../views/drawView/eraseAll.js';
import reRenderView from '../views/markView/ReRenderView.js';
import playMenuView from '../views/playMenuView.js';

const promisifyFunction = function (callback) {
  return new Promise(resolve => callback(resolve));
};

export const promisifyTimeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const controlGridArray = function (nCols, nRows) {
  // Grid columns = table view columns
  grid.setColumns(nCols);
  tableView.generateRows(nCols);

  // Grid cells = table view cells
  grid.setRows(nRows);
  tableView.generateCells(nCols, nRows);

  // Calc grid array:
  grid.setGridColumns();
  grid.setGridRows();
  grid.calcCells();
  grid.callFindNeighbours();

  //Mark start and end points:
  markPositionStart.initStartMarker();
  markPositionEnd.initEndMarker();
};
// Call on page load:
controlGridArray(29, 55);

export const controlSetStart = function () {
  const startCoords = markPositionStart.getMarkerCoords();

  const [startCell] = grid.gridArr
    .flatMap(cell => cell)
    .filter(cell => {
      return cell.x === startCoords.x && cell.y === startCoords.y;
    });

  return startCell;
};

export const controlSetEnd = function () {
  const endCoords = markPositionEnd.getMarkerCoords();

  const [endCell] = grid.gridArr
    .flatMap(cell => cell)
    .filter(cell => cell.x === endCoords.x && cell.y === endCoords.y);

  return endCell;
};

export const controlCurrentCell = function () {
  const currCell = game.findCurrentCell();
  const currCellIndex = game.findOpenCellIndex(currCell);

  game.removeCellFromOpen(currCellIndex);
  game.addCellToClosed(currCell);

  game.setCurrentCell(currCell);
};

export const controlCalcFGHZ = function (currCell) {
  currCell.calcH(currCell, game.end);
  currCell.calcG(currCell.previous);

  if (game.tableType === 'topography') {
    if (!prevCell) return;
    const [currElevation] = game.findCellInDrawList(currCell);
    const [prevElevation] = game.findCellInDrawList(currCell.previous);

    currCell.calcZ(currElevation, prevElevation);
  }

  currCell.calcF(game.tableType);
};

// Topography Code:
// export const controlDrawList = function () {
//   if (game.tableType === 'block') {
//     game.setDrawlist(drawBlcoked.drawArr);
//     game.removeEraseFromDrawList(eraseCell.drawArr);
//   }

//   if (game.tableType === 'topography') {
//     game.setDrawlist(drawTopography.drawArr);
//     game.removeEraseFromDrawList(eraseCell.drawArr);
//   }
// };

export const controlBlockedArr = function (start, end) {
  const blockedCellArr = drawBlcoked.getBlockedCells();

  grid.setBlockedArr(blockedCellArr);
  grid.markBlockedCells(start, end);
};

export const controlColorOpenList = function () {
  game.openList.forEach(cell => {
    const x = `${cell.x}`;
    const y = `${cell.y}`;

    tableView.addOpenCell(x, y);
  });
};

export const controlColorClosedCell = function (cell) {
  tableView.addClosedCell(cell.x, cell.y);
};

const controlFindPath = async function (resolve) {
  let pathCell = game.end;
  game.addCellToPath(pathCell.previous);

  while (pathCell.previous) {
    game.addCellToPath(pathCell.previous);

    if (pathCell.x === game.start.x && pathCell.y === game.start.y) break;

    pathCell = pathCell.previous;
  }

  resolve(game.path);
};

const controlColorPathList = async function (pathArr, i = 0) {
  if (pathArr[0] === undefined) {
    enablePlayButton();
    return;
  }

  while (i < pathArr.length) {
    const x = `${pathArr[i].x}`;
    const y = `${pathArr[i].y}`;

    tableView.addPathCell(x, y);

    await promisifyTimeout(20);

    i++;
  }

  enablePlayButton();
};

export const controlTracePath = async function () {
  const pathArr = await promisifyFunction(controlFindPath);
  controlColorPathList(pathArr);
};

export const controlColorBlockedCellAlgorithmically = function (x, y) {
  drawBlcoked.colorCellAlgorithmically(x, y);
};

export const controlResetCells = function () {
  grid.gridArr
    .flatMap(cell => cell)
    .forEach(cell => {
      cell.resetIsBlocked();
      cell.resetIsExplored();
      cell.resetPrevious();
      cell.resetIsOrigin();
      cell.resetDirection();
      cell.setG(0);
      cell.setH(0);
      cell.setF(0);
    });
  game.setStart([]);
  game.setEnd([]);
  game.setPath([]);
  grid.setBlockedArr([]);
  drawBlcoked.setBlockedArr([]);
  eraseAll.eraseAllClosedAndPath();
};

export const controlResetGrid = function () {
  eraseAll.render();
};

export const eraseBlockedCellAlgorithmically = function (x, y) {
  eraseCell.eraseCellAlgorithmically(x, y);
};

export const disablePlayButton = function () {
  drawBlcoked.setIsRendering(true);
  eraseCell.setIsRendering(true);
  eraseAll.setIsRendering(true);
  markPositionStart.setIsRendering(true);
  markPositionEnd.setIsRendering(true);
  playMenuView.disablePlayButton();
};

export const enablePlayButton = function () {
  drawBlcoked.setIsRendering(false);
  eraseCell.setIsRendering(false);
  eraseAll.setIsRendering(false);
  markPositionStart.setIsRendering(false);
  markPositionEnd.setIsRendering(false);
  playMenuView.enablePlayButton();
};
