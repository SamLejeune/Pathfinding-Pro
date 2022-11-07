import * as algorithms from './Algorithms.js';
import * as algHelper from '../controller/helperAlgorithms.js';

import game from '../model/game.js';
import grid from '../model/grid.js';

import drawMenuView from '../views/drawMenuView.js';
import playMenuView from '../views/playMenuView.js';
import markPositionStart from '../views/markView/markPositionStart.js';
import markPositionEnd from '../views/markView/markPositionEnd.js';
import reRenderView from '../views/markView/ReRenderView.js';

import drawBlcoked from '../views/drawView/drawBlcoked.js';
import drawTopography from '../views/drawView/drawTopography.js';
import eraseAll from '../views/drawView/eraseAll.js';
import eraseCell from '../views/drawView/eraseCell.js';
import configureMenuView from '../views/configureMenuView.js';

const controlDrawBlockedCell = function () {
  drawBlcoked.render();
  game.setTableType(drawBlcoked.drawType);
};

// const controlDrawTopography = function () {
//   drawTopography.render();
//   game.setTableType(drawTopography.drawType);
// };

const controlEraseCell = function () {
  eraseCell.render();
};

const controlEraseAll = function () {
  if (eraseAll.getIsRendering() === true) return;

  algHelper.controlResetCells();
  algHelper.controlResetGrid();
};

const controlReRenderHandler = function () {
  reRenderView.render();
};

const controlSpeed = function () {
  const speed = configureMenuView.getSpeed();

  if (speed === 'slow') game.setSpeed(500);

  if (speed === 'intermediate') game.setSpeed(50);

  if (speed === 'fast') game.setSpeed(5);

  if (speed === 'instant') game.setSpeed(0);
};

const controlRenderAlgorithm = function () {
  const algorithm = configureMenuView.getAlgorithm();
  controlSpeed();

  algHelper.controlResetCells();
  algHelper.disablePlayButton();

  if (algorithm === 'breadth first search')
    algorithms.breadthFristSearchAlgorithm();

  if (algorithm === 'greedy best first search') algorithms.greedyAlgorithm();

  if (algorithm === 'trace search') algorithms.traceAlgorithm();

  if (algorithm === 'a star') algorithms.aStarAlgorithm();

  if (algorithm === 'jump point search') algorithms.JPSAlgorithm();

  if (algorithm === undefined) {
    algHelper.enablePlayButton();
    return;
  }
};

const controlRenderMaze = function () {
  const maze = configureMenuView.getMaze();

  controlEraseAll();

  if (maze === 'simple random maze') algorithms.simpleRandomMaze();

  if (maze === 'depth first search') algorithms.DFSMaze();

  if (maze === 'hunt and kill') algorithms.huntAndKillMaze();

  if (maze === 'prim') algorithms.primMaze();

  if (maze === 'recursive division') algorithms.initRecursiveDivisMaze();
};

/*
/////////////////////////////////////
///////// Helper Functions://///////
///////////////////////////////////
*/

(function () {
  configureMenuView.addHandlerClickOption(controlRenderMaze, controlSpeed);
  drawMenuView.addHandlerBlockedCell(controlDrawBlockedCell);
  drawMenuView.addHanlderEraseCell(controlEraseCell);
  drawMenuView.addHandlerEraseAll(controlEraseAll);
  playMenuView.addHandlerPlay(controlRenderAlgorithm);
  markPositionStart.render();
  markPositionEnd.render();
})();
