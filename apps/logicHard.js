'use strict';

import { MemoryGame } from './MemoryGame.js';
import { showPreloader } from './preloader.js';

export function logicHardGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];

  const memoryGame = new MemoryGame(images);
  memoryGame.startGame();
}
