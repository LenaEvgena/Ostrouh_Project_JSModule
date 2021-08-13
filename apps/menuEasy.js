'use strict';

import { showPreloader } from './preloader.js';
import { LogicMenu } from './LogicMenu.js';

export function logicMenuEasy() {
  showPreloader();
  const menuEasy = new LogicMenu();
}

