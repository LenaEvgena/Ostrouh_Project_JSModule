'use strict';

import { LoadPageData } from './preloader.js';
import { LogicMenu } from './App/LogicMenu.js';
import * as SPA from './SPA.js';

let imagesArray = ['./assets/img/backgrounds/logicbg.png', './assets/img/logicmenu/bg0.png',
'./assets/img/logicmenu/bg1.png', './assets/img/logicmenu/bg2.png', './assets/img/logicmenu/bg3.png',
'./assets/img/logicmenu/bg4.png', './assets/img/logicmenu/bg5.png'];

export function logicMenuEasy() {
  LoadPageData(imagesArray, imagesArray.length);
  const easyMenu = new LogicMenu('easy', SPA.switchToMenu);
  addListeners();
}

export function logicMenuMedium() {
  LoadPageData(imagesArray, imagesArray.length);
  const mediumMenu = new LogicMenu('medium', SPA.switchToMenu);
  addListeners();
}

export function logicMenuHard() {
  LoadPageData(imagesArray, imagesArray.length);
  const hardMenu = new LogicMenu('hard', SPA.switchToMenu);
  addListeners();
}

function addListeners() {
  const items = Array.from(document.querySelectorAll('.level_image'));
  items.forEach(item => {
    item.addEventListener('click', () => {
      globalThis.audioController.clickSound();
      SPA.switchToLevel();
    });
    item.addEventListener('mouseover', () => {
      globalThis.audioController.slideSound();
    })
  })
}
