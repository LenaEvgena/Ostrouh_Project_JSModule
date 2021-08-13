'use strict';

import { showPreloader } from './preloader.js';
import { LogicMenu } from './LogicMenu.js';
import * as SPA from './SPA.js';

export function logicMenuEasy() {
  showPreloader();
  const menuEasy = new LogicMenu('easy', SPA.switchToMenu);

  document.querySelector('#easy-0').addEventListener('click', SPA.switchToLogicEasy);
}

