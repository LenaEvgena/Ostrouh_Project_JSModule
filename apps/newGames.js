'use strict';

import { MemoryGame } from './App/MemoryGame.js';
import { LoadPageData } from './preloader.js';
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

let imagesArray = ['./assets/img/logicmenu/bg0.png', './assets/img/logicmenu/bg1.png',
'./assets/img/logicmenu/bg2.png', './assets/img/logicmenu/bg3.png',
'./assets/img/logicmenu/bg4.png', './assets/img/logicmenu/bg5.png',
'./assets/img/bubbles/coloredbig.png', './assets/img/bubbles/pink.png'];

function getArrayToLoad(array) {
  let cardsImages = array.map(card => {
    card = `./assets/img/logic/${card}.png`;
    return card;
  });
  LoadPageData([...imagesArray, ...cardsImages], [...imagesArray, ...cardsImages].length);
}


function logicEasyGame(id) {
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 6);
  getArrayToLoad(cards);
  const easyGame = new MemoryGame(cards, id, SPA.switchToMenuEasy);
  easyGame.startGame();
}

function logicMediumGame(id) {
  const cards = images.sort(() => Math.random() - 0.5).slice(0, 8);
  getArrayToLoad(cards);
  const mediumGame = new MemoryGame(cards, id, SPA.switchToMenuMedium);
  mediumGame.startGame();
}

function logicHardGame(id) {
  getArrayToLoad(images);
  const hardGame = new MemoryGame(images, id, SPA.switchToMenuHard);
  hardGame.startGame();
}

