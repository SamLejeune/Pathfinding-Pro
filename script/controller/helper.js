// import game from './model/game.js';

export const promisifyFunction = function (callback) {
  return new Promise(resolve => callback(resolve));
};

export const findMaxCell = function (array, param) {
  return array.reduce((acc, cell) => (acc[param] > cell[param] ? acc : cell));
};

export const findMinCell = function (array, param) {
  return array.reduce((acc, cell) => (acc[param] < cell[param] ? acc : cell));
};

export const sortList = function (array, param) {
  const sortedList = array.sort((a, b) => a[param] - b[param]);

  return sortedList;
};

export const recalcList = function (array, currEnd) {
  let newList = [];

  array.forEach(cell => {
    cell.calcH(cell, currEnd);
    cell.calcF();

    newList.push(cell);
  });

  return newList;
};
