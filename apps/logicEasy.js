'use strict';

import { MemoryGame } from './MemoryGame.js';
import { showPreloader } from './preloader.js';
import * as SPA from './SPA.js';


export function logicEasyGame() {
  showPreloader();

  const images = ['cat', 'cow', 'croco', 'dog', 'elef', 'girrafe', 'horse', 'lamb', 'lion', 'monkey', 'panda', 'pig', 'squirrel', 'turkey', 'zebra'];
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 6);

  const memoryGame = new MemoryGame(cards, SPA.switchToMenuEasy);
  memoryGame.startGame();
}
