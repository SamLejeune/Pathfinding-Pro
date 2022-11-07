import grid from '../model/grid.js';
import game from '../model/game.js';
import Heap from '../model/heap.js';
import * as algHelper from './helperAlgorithms.js';

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////// Pathfinding Algorithms //////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////// A* Algorithm //////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const aStarAlgorithm = async function () {
  let openList = new Heap();

  let start = algHelper.controlSetStart();
  game.setStart(start);
  openList.insert(start, 'f', 'g');

  let end = algHelper.controlSetEnd();
  game.setEnd(end);

  algHelper.controlCalcFGHZ(start);
  algHelper.controlBlockedArr(start, end);

  let currentCell;

  while (openList.getHeapLength() > 0) {
    if (game.speed > 0) await algHelper.promisifyTimeout(game.speed);

    currentCell = openList.shift('f', 'g');
    currentCell.setIsExplored();
    algHelper.controlColorClosedCell(currentCell);

    if (currentCell.x === end.x && currentCell.y === end.y) break;

    for (let i = 0; i < currentCell.neighbours.length; i++) {
      let neighbour = currentCell.neighbours[i];

      let openNeighbIndex = openList.getNodeIndex(neighbour.x, neighbour.y);
      let openNeighbour =
        openNeighbIndex === -1
          ? undefined
          : openList.getHeap()[openNeighbIndex];

      if (neighbour.isBlocked === true) continue;

      let tempG = currentCell.g + 1;

      if (tempG < neighbour?.g) {
        neighbour.setG(tempG);
        neighbour.calcF();
        neighbour.setPrevious(currentCell);
      }

      if (neighbour.isExplored === true) continue;

      if (!openNeighbour) {
        neighbour.setPrevious(currentCell);
        algHelper.controlCalcFGHZ(neighbour);
        openList.insert(neighbour, 'f', 'g');
      }
    }
  }
  console.log(openList.getHeap());
  algHelper.controlTracePath();
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////// Breath First Search Algorithm /////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const breadthFristSearchAlgorithm = async function () {
  // algHelper.controlResetCells();

  console.log(game.speed);

  let openList = new Heap();

  let start = algHelper.controlSetStart();
  game.setStart(start);
  openList.insert(start, 'g');

  let end = algHelper.controlSetEnd();
  game.addCellToClosed(end);
  game.setEnd(end);

  algHelper.controlBlockedArr(start, end);

  let currentCell;

  while (openList.getHeapLength() > 0) {
    if (game.speed > 0) await algHelper.promisifyTimeout(game.speed);

    currentCell = openList.shift('g');
    currentCell.setIsExplored();
    algHelper.controlColorClosedCell(currentCell);

    if (currentCell.x === end.x && currentCell.y === end.y) break;

    for (let i = 0; i < currentCell.neighbours.length; i++) {
      let neighbour = currentCell.neighbours[i];

      let openNeighbIndex = openList.getNodeIndex(neighbour.x, neighbour.y);
      let openNeighbour =
        openNeighbIndex === -1
          ? undefined
          : openList.getHeap()[openNeighbIndex];

      if (neighbour.isBlocked === true) continue;

      if (neighbour.isExplored === true) continue;

      neighbour.setPrevious(currentCell);
      neighbour.calcG(currentCell);

      if (!openNeighbour) openList.insert(neighbour, 'g');
    }
  }
  algHelper.controlTracePath();
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////// Greedy Algorithm //////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const greedyAlgorithm = async function () {
  // algHelper.controlResetCells();

  let openList = new Heap();

  let start = algHelper.controlSetStart();
  game.setStart(start);
  openList.insert(start, 'h');

  let end = algHelper.controlSetEnd();
  game.setEnd(end);

  start.calcH(start, end);
  algHelper.controlBlockedArr(start, end);

  let currentCell;

  while (openList.getHeapLength() > 0) {
    if (game.speed > 0) await algHelper.promisifyTimeout(game.speed);

    currentCell = openList.shift('h');
    currentCell.setIsExplored();
    algHelper.controlColorClosedCell(currentCell);

    if (currentCell.x === end.x && currentCell.y === end.y) break;

    for (let i = 0; i < currentCell.neighbours.length; i++) {
      let neighbour = currentCell.neighbours[i];

      let openNeighbIndex = openList.getNodeIndex(neighbour.x, neighbour.y);
      let openNeighbour =
        openNeighbIndex === -1
          ? undefined
          : openList.getHeap()[openNeighbIndex];

      if (neighbour.isBlocked === true) continue;

      if (neighbour.isExplored === true) continue;

      if (!openNeighbour) {
        neighbour.setPrevious(currentCell);
        neighbour.calcH(neighbour, end);
        openList.insert(neighbour, 'h');
      }
    }
  }
  algHelper.controlTracePath();
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////// Trace Algorithm ///////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const traceAlgorithm = async function () {
  // algHelper.controlResetCells();

  let openList = new Heap();

  let start = algHelper.controlSetStart();
  game.setStart(start);
  openList.insert(start, 'f', 'h');

  let end = algHelper.controlSetEnd();
  game.setEnd(end);

  start.calcG(undefined);
  start.traceCalcH(start, end);
  start.calcF(game.tableType);
  algHelper.controlBlockedArr(start, end);

  let currentCell;

  while (openList.getHeapLength() > 0) {
    if (game.speed > 0) await algHelper.promisifyTimeout(game.speed);

    currentCell = openList.shift('f', 'g');
    currentCell.setIsExplored();
    algHelper.controlColorClosedCell(currentCell);

    if (currentCell.x === end.x && currentCell.y === end.y) break;

    for (let i = 0; i < currentCell.neighbours.length; i++) {
      let neighbour = currentCell.neighbours[i];

      let openNeighbIndex = openList.getNodeIndex(neighbour.x, neighbour.y);
      let openNeighbour =
        openNeighbIndex === -1
          ? undefined
          : openList.getHeap()[openNeighbIndex];

      if (neighbour.isBlocked === true) continue;

      let tempG = currentCell.g + 1;

      if (tempG < neighbour.g) {
        neighbour.setG(tempG);
        neighbour.calcF();
        neighbour.setPrevious(currentCell);
      }

      if (neighbour.isExplored === true) continue;

      if (!openNeighbour) {
        neighbour.setPrevious(currentCell);
        neighbour.calcG(currentCell);
        neighbour.traceCalcH(neighbour, end);
        neighbour.calcF(game.tableType);
        openList.insert(neighbour, 'f', 'h');
      }
    }
  }
  algHelper.controlTracePath();
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////// JPS Algorithm /////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const orthJPSSetPrevious = function (currCell, cellBehind) {
  currCell.setPrevious(cellBehind);
  currCell.calcG(currCell.previous);
};

const JPSCalcNeighbCell = function (currentCell, neighbourType, direction) {
  console.log(currentCell);

  if (neighbourType === 'up') {
    return grid.gridArr[currentCell.x + 1][currentCell.y];
  }

  if (neighbourType === 'down') {
    return grid.gridArr[currentCell.x - 1][currentCell.y];
  }

  if (direction === 'for') {
    if (neighbourType === 'behind') {
      return grid.gridArr[currentCell.x][currentCell.y - 1];
    }

    if (neighbourType === 'diagUp') {
      return grid.gridArr[currentCell.x + 1][currentCell.y - 1];
    }

    if (neighbourType === 'diagDown') {
      return grid.gridArr[currentCell.x - 1][currentCell.y - 1];
    }
  }

  if (direction === 'back') {
    if (neighbourType === 'behind') {
      return grid.gridArr[currentCell.x][currentCell.y + 1];
    }

    if (neighbourType === 'diagUp') {
      return grid.gridArr[currentCell.x + 1][currentCell.y + 1];
    }

    if (neighbourType === 'diagDown') {
      return grid.gridArr[currentCell.x - 1][currentCell.y + 1];
    }
  }
};

const JPSExpandHorizontally = function (originCell, dir) {
  let currentCell = originCell;
  let forcedNeighboursArr = [];
  let min = 0;
  let max = grid.columns; // rows

  for (let j = currentCell.y; j < max && j >= min; dir === 'for' ? j++ : j--) {
    let cellBehind = JPSCalcNeighbCell(currentCell, 'behind', dir);
    let cellUp = undefined;
    let cellDown = undefined;
    let cellDiagUp = undefined;
    let cellDiagDown = undefined;

    if (currentCell.isBlocked === true) break;

    if (!currentCell.previous)
      if (currentCell !== originCell)
        orthJPSSetPrevious(currentCell, cellBehind);

    if (currentCell.x === game.end.x && currentCell.y === game.end.y) {
      forcedNeighboursArr.push(currentCell);
      break;
    }

    if (currentCell.x < grid.rows - 1) {
      cellUp = JPSCalcNeighbCell(currentCell, 'up', dir);
      cellDiagUp = JPSCalcNeighbCell(currentCell, 'diagUp', dir);
    }

    if (currentCell.x > 0) {
      cellDown = JPSCalcNeighbCell(currentCell, 'down', dir);
      cellDiagDown = JPSCalcNeighbCell(currentCell, 'diagDown', dir);
    }

    if (currentCell.isExplored === true)
      if (currentCell !== originCell)
        if (cellBehind.g < currentCell.previous.g) {
          currentCell.setPrevious(cellBehind);
          algHelper.controlCalcFGHZ(currentCell);
        } else continue;
    currentCell.setIsExplored();

    if (currentCell !== originCell) {
      if (cellDiagUp && cellDiagUp.isBlocked === true)
        if (cellUp && cellUp.isBlocked === false) {
          forcedNeighboursArr.push(currentCell);
        }

      if (cellDiagDown && cellDiagDown.isBlocked === true)
        if (cellDown && cellDown.isBlocked === false) {
          forcedNeighboursArr.push(currentCell);
        }

      if (cellBehind && cellBehind.isBlocked === true) {
        forcedNeighboursArr.push(currentCell);
        currentCell = grid.gridArr[currentCell.x][currentCell.y + 1];
        continue;
      }
    }

    if (currentCell.y > max || currentCell.y < 0) break;

    currentCell =
      dir === 'for'
        ? grid.gridArr[currentCell.x][currentCell.y + 1]
        : grid.gridArr[currentCell.x][currentCell.y - 1];
  }
  return forcedNeighboursArr;
};

const JPSExpandVertically = function (startCell, dir, horzDir) {
  let originCell = startCell;
  let forcedNeighboursArr = [];
  let min = 0;
  let max = grid.rows; //columns

  for (let i = originCell.x; i < max && i >= min; dir === 'up' ? i++ : i--) {
    if (!originCell.previous)
      if (originCell !== startCell) {
        if (dir === 'up')
          orthJPSSetPrevious(
            originCell,
            grid.gridArr[originCell.x - 1][startCell.y]
          );
        if (dir === 'down')
          orthJPSSetPrevious(
            originCell,
            grid.gridArr[originCell.x + 1][startCell.y]
          );
      }

    if (originCell.x === game.end.x && originCell.y === game.end.y) {
      forcedNeighboursArr.push(originCell);
      break;
    }

    let foundNeighbours = JPSExpandHorizontally(originCell, horzDir);

    if (foundNeighbours.length > 0) {
      foundNeighbours.forEach(cell => {
        algHelper.controlCalcFGHZ(cell);
        forcedNeighboursArr.push(cell);
      });
    }

    if (dir === 'up' && originCell.x + 1 === max) break;

    if (dir === 'down' && originCell.x === 0) break;

    let previousOriginCell = originCell;
    originCell =
      dir === 'up'
        ? grid.gridArr[originCell.x + 1][originCell.y]
        : grid.gridArr[originCell.x - 1][originCell.y];

    if (originCell.isBlocked === true) break;

    if (originCell.isExplored === true) {
      if (previousOriginCell.g < originCell.previous?.g) {
        originCell.setPrevious(previousOriginCell);
        algHelper.controlCalcFGHZ(originCell);
      }
    }
  }
  return forcedNeighboursArr;
};

export const JPSAlgorithm = async function () {
  // algHelper.controlResetCells();

  let openList = new Heap();

  let start = algHelper.controlSetStart();
  game.setStart(start);
  openList.insert(start, 'f', 'g');

  let end = algHelper.controlSetEnd();
  game.addCellToClosed(end);
  game.setEnd(end);

  algHelper.controlCalcFGHZ(start);

  algHelper.controlBlockedArr(start, end);

  let currentCell;
  let expandUpBack = [];
  let expandUpForward = [];
  let expandDownBack = [];
  let expandDownForward = [];

  while (openList.getHeapLength() > 0) {
    if (game.speed > 0) await algHelper.promisifyTimeout(game.speed);

    currentCell = openList.shift('f', 'g');
    currentCell.setIsExplored();
    algHelper.controlColorClosedCell(currentCell);

    if (currentCell.x === game.end.x && currentCell.y === game.end.y) {
      game.start.setPrevious(undefined);
      algHelper.controlTracePath();
      return;
    }

    expandUpBack = JPSExpandVertically(currentCell, 'up', 'back');
    expandUpForward = JPSExpandVertically(currentCell, 'up', 'for');
    expandDownBack = JPSExpandVertically(currentCell, 'down', 'back');
    expandDownForward = JPSExpandVertically(currentCell, 'down', 'for');

    [
      ...expandUpBack,
      ...expandUpForward,
      ...expandDownBack,
      ...expandDownForward,
    ].forEach(cell => {
      const duplicateCell = openList.getNodeIndex(cell.x, cell.y);
      if (duplicateCell >= 0) return;
      openList.insert(cell, 'f', 'g');
    });
  }
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////// Mazes /////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////// DFS Maze //////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const calcRandomDirection = function (cell, direction) {
  if (direction === 0) {
    return [
      grid?.gridArr?.[cell.x]?.[cell.y - 1],
      grid?.gridArr?.[cell.x]?.[cell.y - 2],
    ];
  } else if (direction === 1) {
    return [
      grid?.gridArr?.[cell.x]?.[cell.y + 1],
      grid?.gridArr?.[cell.x]?.[cell.y + 2],
    ];
  } else if (direction === 2) {
    return [
      grid?.gridArr?.[cell.x + 1]?.[cell.y],
      grid?.gridArr?.[cell.x + 2]?.[cell.y],
    ];
  } else if (direction === 3) {
    return [
      grid.gridArr?.[cell.x - 1]?.[cell.y],
      grid.gridArr?.[cell.x - 2]?.[cell.y],
    ];
  }
};

const generateRandomDirection = function () {
  let directionArr = [0, 1, 2, 3];
  for (let i = directionArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [directionArr[i], directionArr[j]] = [directionArr[j], directionArr[i]];
  }
  return directionArr;
};

const DFSMazeRecursion = async function (x, y) {
  let currentCell = grid.gridArr[x][y];
  let directionArr = generateRandomDirection();
  let midCell, finCell;

  for (let i = 0; i < directionArr.length; i++) {
    await algHelper.promisifyTimeout(30);

    [midCell, finCell] = calcRandomDirection(currentCell, directionArr[i]);

    if (!finCell) continue;

    if (finCell.isBlocked === false) {
      algHelper.controlColorBlockedCellAlgorithmically(midCell.x, midCell.y);
      algHelper.controlColorBlockedCellAlgorithmically(finCell.x, finCell.y);
      midCell.setIsBlocked();
      finCell.setIsBlocked();

      DFSMazeRecursion(finCell.x, finCell.y);
    }
  }
};

export const DFSMaze = function () {
  game.setTableType('block');

  let randomX, randomY;

  while (true) {
    let calcX = Math.floor(Math.random() * grid.rows);
    let calcY = Math.floor(Math.random() * grid.columns);
    if (calcX % 2 !== 0 && calcY % 2 !== 0) {
      randomX = calcX;
      randomY = calcY;
      break;
    }
  }

  let startCell = grid.gridArr[randomX][randomY];

  algHelper.controlColorBlockedCellAlgorithmically(startCell.x, startCell.y);

  DFSMazeRecursion(startCell.x, startCell.y);
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////// Hunt and Kill Maze ///////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const huntPhase = function () {
  let currentCell;
  let left, right, up, down;

  for (let i = 1; i <= grid.rows - 1; i += 2) {
    for (let j = 1; j <= grid.columns - 1; j += 2) {
      currentCell = grid.gridArr[i][j];

      if (currentCell.isBlocked === false) continue;

      left = grid.gridArr?.[i]?.[j - 2];
      right = grid.gridArr?.[i]?.[j + 2];
      up = grid.gridArr?.[i + 2]?.[j];
      down = grid.gridArr?.[i - 2]?.[j];

      if (
        (!left || left.isBlocked === true) &&
        (!right || right.isBlocked === true) &&
        (!up || up.isBlocked === true) &&
        (!down || down.isBlocked === true)
      ) {
        if (i === grid.rows - 1 && j === grid.columns - 1) {
          currentCell = undefined;
        } else continue;
      }

      return currentCell;
    }
  }
};

export const killPhase = async function (x, y) {
  let currentCell = grid.gridArr[x][y];

  let directionArr;
  let midCell, finCell;

  while (currentCell) {
    await algHelper.promisifyTimeout(10);

    directionArr = generateRandomDirection();

    for (let i = 0; i < directionArr.length; i++) {
      [midCell, finCell] = calcRandomDirection(currentCell, directionArr[i]);

      if (!finCell || finCell.isBlocked === true)
        if (i === directionArr.length - 1) {
          currentCell = undefined;
          break;
        } else continue;

      algHelper.controlColorBlockedCellAlgorithmically(midCell.x, midCell.y);
      algHelper.controlColorBlockedCellAlgorithmically(finCell.x, finCell.y);
      midCell.setIsBlocked();
      finCell.setIsBlocked();

      currentCell = grid.gridArr[finCell.x][finCell.y];
      break;
    }
    if (currentCell === undefined) currentCell = huntPhase();
  }

  algHelper.enablePlayButton();
};

export const huntAndKillMaze = function () {
  game.setTableType('block');

  algHelper.disablePlayButton();

  let randomX, randomY;

  while (true) {
    let calcX = Math.floor(Math.random() * grid.rows);
    let calcY = Math.floor(Math.random() * grid.columns);
    if (calcX % 2 !== 0 && calcY % 2 !== 0) {
      randomX = calcX;
      randomY = calcY;
      break;
    }
  }

  let startCell = grid.gridArr[randomX][randomY];

  algHelper.controlColorBlockedCellAlgorithmically(startCell.x, startCell.y);
  killPhase(startCell.x, startCell.y);
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////// Prim Maze ////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const primMazeRecursion = async function (x, y) {
  let stack = [];
  let currCell = grid.gridArr[x][y];
  let neighbourArr;
  let midCell, finCell;
  let finCellIndex;

  stack.push(currCell);

  while (stack.length > 0) {
    await algHelper.promisifyTimeout(5);

    currCell = stack.pop();

    neighbourArr = generateRandomDirection();

    for (let i = 0; i < neighbourArr.length; i++) {
      finCellIndex = i;

      [midCell, finCell] = calcRandomDirection(currCell, neighbourArr[i]);

      if (!finCell || finCell.isBlocked === true) continue;

      break;
    }

    if (finCell === undefined) continue;

    algHelper.controlColorBlockedCellAlgorithmically(midCell.x, midCell.y);
    algHelper.controlColorBlockedCellAlgorithmically(finCell.x, finCell.y);
    algHelper.controlColorBlockedCellAlgorithmically(currCell.x, currCell.y);
    currCell.setIsBlocked();

    const currentCellFrontier = neighbourArr.slice(finCellIndex + 1);

    currentCellFrontier.forEach(i => {
      const [_, neighbour] = calcRandomDirection(currCell, i);

      if (neighbour && neighbour.isBlocked === false) stack.push(neighbour);
    });
  }

  algHelper.enablePlayButton();
};

export const primMaze = function () {
  game.setTableType('block');

  algHelper.disablePlayButton();

  let randomX, randomY;

  while (true) {
    let calcX = Math.floor(Math.random() * grid.rows);
    let calcY = Math.floor(Math.random() * grid.columns);
    if (calcX % 2 !== 0 && calcY % 2 !== 0) {
      randomX = calcX;
      randomY = calcY;
      break;
    }
  }

  let startCell = grid.gridArr[randomX][randomY];
  primMazeRecursion(startCell.x, startCell.y);
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////// Recursive Division Maze //////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const recursiveDivisCalcOrigin = function (lastWallArr, direction) {
  let potentialOriginCells = lastWallArr.filter(cell => {
    let cellCriteria =
      direction === 'up' || direction === 'down' ? cell.y : cell.x;

    if (
      cellCriteria % 2 === 0 &&
      cell.maze.isOrigin === false &&
      cell.maze.direction !== direction
      // &&(cell !== cell[0] || cell[lastWallArr.length - 1])
    )
      return cell;
  });

  if (potentialOriginCells.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * potentialOriginCells.length);

  return potentialOriginCells[randomIndex];
};

const recursiveDivisDrawWall = function (originCell, direction) {
  let currCell;
  let wallArr = [];

  let i =
    direction === 'up' || direction === 'down' ? originCell.x : originCell.y;

  while (true) {
    if (direction === 'up' || direction === 'down')
      currCell = grid.gridArr?.[i]?.[originCell.y];

    if (direction === 'left' || direction === 'right')
      currCell = grid.gridArr?.[originCell.x]?.[i];

    if (direction === 'up' || direction === 'right') i++;

    if (direction === 'down' || direction === 'left') i--;

    if (currCell !== originCell)
      if (!currCell || currCell?.isBlocked === true) break;

    wallArr.push(currCell);
    currCell.setIsBlocked();
    algHelper.controlColorBlockedCellAlgorithmically(currCell.x, currCell.y);
  }
  return wallArr;
};

const recursiveDivisCalcGap = function (wallArr, direction) {
  let potentialGapCells = wallArr.filter(cell => {
    let cellCriteria =
      direction === 'up' || direction === 'down' ? cell.x : cell.y;

    if (
      cellCriteria % 2 !== 0 &&
      (cell !== cell[0] || cell[wallArr.length - 1])
    )
      return cell;
  });

  if (potentialGapCells.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * potentialGapCells.length);

  return potentialGapCells[randomIndex];
};

const stackDivisMaze = async function (lastWallArr, direction, link) {
  let stack = [];
  stack.push({ lastWall: lastWallArr, dir: direction, link: link });

  let currWall;
  let originCell;
  let wallArr;
  let gapCell;

  while (stack.length > 0) {
    await algHelper.promisifyTimeout(1);

    currWall = stack.pop();

    if (!currWall) {
      algHelper.enablePlayButton();
      return;
    }

    if (currWall.lastWall.length < 2) continue;

    originCell = recursiveDivisCalcOrigin(currWall.lastWall, currWall.dir);
    if (originCell === undefined) {
      stack.push(currWall?.link);
      continue;
    }

    originCell.setIsOrigin();
    originCell.setDirection(currWall.dir);

    wallArr = recursiveDivisDrawWall(originCell, currWall.dir);

    gapCell = recursiveDivisCalcGap(wallArr, currWall.dir);

    if (gapCell === undefined) continue;

    gapCell.isBlocked = false;
    algHelper.eraseBlockedCellAlgorithmically(gapCell.x, gapCell.y);

    if (currWall.dir === 'up' || currWall.dir === 'down') {
      stack.push({ lastWall: wallArr, dir: 'left', link: currWall });
      stack.push({ lastWall: wallArr, dir: 'right', link: currWall });
    } else {
      stack.push({ lastWall: wallArr, dir: 'down', link: currWall });
      stack.push({ lastWall: wallArr, dir: 'up', link: currWall });
    }
  }
};

export const initRecursiveDivisMaze = async function () {
  game.setTableType('block');

  algHelper.disablePlayButton();

  let startWallArr = [];
  for (let i = 0; i < grid.columns; i++) {
    startWallArr.push(grid.gridArr[0][i]);
  }

  stackDivisMaze(startWallArr, 'up', undefined);
};

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////// Recursive Division Maze //////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const simpleRandomMaze = async function () {
  game.setTableType('block');

  algHelper.disablePlayButton();

  let total = Math.floor((grid.rows * grid.columns) / 3);

  let i = 0;
  let cell;
  let randomX;
  let randomY;

  while (i < total) {
    await algHelper.promisifyTimeout(1);

    randomX = Math.floor(Math.random() * grid.rows);
    randomY = Math.floor(Math.random() * grid.columns);

    cell = grid.gridArr[randomX][randomY];

    if (cell.isBlocked === true) continue;

    algHelper.controlColorBlockedCellAlgorithmically(randomX, randomY);
    i++;
  }

  algHelper.enablePlayButton();
};
