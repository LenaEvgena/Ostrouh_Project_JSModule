'use strict';

import { MemoryGame } from './logic.js';
import { showPreloader } from './preloader.js';

export function logicEasyGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 6);

  const memoryGame = new MemoryGame(cards);
  memoryGame.startGame();
}
