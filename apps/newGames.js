'use strict';

import { MemoryGame } from './App/MemoryGame.js';
import { showPreloader } from './preloader.js';
import * as SPA from './SPA.js';

export function openNewGame(id) {
  let level = id.substr(8);
  switch (level) {
    case 'easy':
      logicEasyGame(id);
      break;
    case 'medium':
      logicMediumGame(id);
      break;
    case 'hard':
      logicHardGame(id);
      break;
  }
}

const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];

function logicEasyGame(id) {
  showPreloader();
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 6);
  const easyGame = new MemoryGame(cards, id, SPA.switchToMenuEasy);
  easyGame.startGame();
}

function logicMediumGame(id) {
  showPreloader();
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 8);
  const mediumGame = new MemoryGame(cards, id, SPA.switchToMenuMedium);
  mediumGame.startGame();
}

function logicHardGame(id) {
  showPreloader();
  const hardGame = new MemoryGame(images, id, SPA.switchToMenuHard);
  hardGame.startGame();
}

