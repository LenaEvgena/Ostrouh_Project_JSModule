'use strict';

import { MemoryGame } from './MemoryGame.js';
import { showPreloader } from './preloader.js';
import * as SPA from './SPA.js';


export function logicEasyGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 6);

  const easyGame = new MemoryGame(cards, SPA.switchToMenuEasy);
  easyGame.startGame();
}


export function logicMediumGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 8);

  const mediumGame = new MemoryGame(cards, SPA.switchToMenuMedium);
  mediumGame.startGame();
}


export function logicHardGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];

  const hardGame = new MemoryGame(images, SPA.switchToMenuHard);
  hardGame.startGame();
}
