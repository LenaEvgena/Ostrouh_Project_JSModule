'use strict';

import { showPreloader } from './preloader.js';
import { LogicMenu } from './LogicMenu.js';
import * as SPA from './SPA.js';

export function logicMenuEasy() {
  showPreloader();
  const easyMenu = new LogicMenu('easy', SPA.switchToMenu);

  document.querySelector('#level_easy_0').addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicEasy();
  });
}

export function logicMenuMedium() {
  showPreloader();
  const mediumMenu = new LogicMenu('medium', SPA.switchToMenu);

  document.querySelector('#level_medium_0').addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicMedium();
  });
}

export function logicMenuHard() {
  showPreloader();
  const hardMenu = new LogicMenu('hard', SPA.switchToMenu);

  document.getElementById('level_hard_0').addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicHard();
  });
}

