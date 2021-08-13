'use strict';

import { Controlls } from './Controlls.js';
import * as SPA from './SPA.js';

export class LogicMenu {
  constructor(level) {
    this.controlls = new Controlls();
    this.wrapper = document.querySelector('.wrapper');
    this.renderLogicMenuPage(this.wrapper, level);
    this.init();
  }

  init() {
    if (!globalThis.isPaused) {
      globalThis.audioController.startMusic();
    }
    this.controlls.updateMusicButton(globalThis.audioController);
    //что-то со счетом...
  }

  renderLogicMenuPage(parent, level) {
    const logic_menu_wrapper = document.createElement('div');
    logic_menu_wrapper.className = 'logic_menu_wrapper';

    const logic_menu_container = document.createElement('div');
    logic_menu_container.className = 'logic_menu_container';

    for (let i = 0; i < 6; i++) {
      const div = document.createElement('div');
      div.className = 'menu_item';
      div.id = `${level}-${i}`;
      div.style.width = '300px';
      div.style.height = '200px';
      div.style.backgroundSize = 'cover';
      const img = document.createElement('img');
      img.src = `../assets/img/logicmenu/bg${i}.jpg`;
      img.id = `${level}-${i}-image`;
      div.appendChild(img);
      logic_menu_container.appendChild(div);
    }

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';
    this.controlls.createBackArrow(buttons_container,  SPA.switchToMenu );
    logic_menu_wrapper.appendChild(buttons_container);

    this.controlls.createMusicButton(logic_menu_wrapper, globalThis.audioController);

    logic_menu_wrapper.appendChild(logic_menu_container);
    parent.appendChild(logic_menu_wrapper)
  }
}
//слушатели на каждуюю картинку
