'use strict';

import { LoadPageData } from './preloader.js';
import { LogicMenu } from './App/LogicMenu.js';
import * as SPA from './SPA.js';

export function logicMenuEasy() {
  LoadPageData('json/menu.json', 6);

  const easyMenu = new LogicMenu('easy', SPA.switchToMenu);
  addListeners();
}

export function logicMenuMedium() {
  LoadPageData('json/menu.json', 6);

  const mediumMenu = new LogicMenu('medium', SPA.switchToMenu);
  addListeners();
}

export function logicMenuHard() {
  LoadPageData('json/menu.json', 6);

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
