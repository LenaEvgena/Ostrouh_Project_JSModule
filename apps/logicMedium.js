'use strict';

import { MemoryGame } from './logic.js';

export function logicMediumGame() {
  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 8);

  const memoryGame = new MemoryGame(cards);
  memoryGame.startGame();
}
