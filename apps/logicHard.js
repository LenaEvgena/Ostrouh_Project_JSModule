'use strict';
import { MemoryGame } from './logic.js';

export function logicHardGame() {
  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];

  const memoryGame = new MemoryGame(images);
  memoryGame.startGame();
}
