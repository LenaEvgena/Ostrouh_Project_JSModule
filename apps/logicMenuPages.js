'use strict';

import { showPreloader } from './preloader.js';
import { LogicMenu } from './App/LogicMenu.js';
import * as SPA from './SPA.js';

export function logicMenuEasy() {
  showPreloader();
  const easyMenu = new LogicMenu('easy', SPA.switchToMenu);
  addListeners();
}

export function logicMenuMedium() {
  showPreloader();
  const mediumMenu = new LogicMenu('medium', SPA.switchToMenu);
  addListeners();
}

export function logicMenuHard() {
  showPreloader();
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
