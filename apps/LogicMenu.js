'use strict';

import { Controlls } from './Controlls.js';

export class LogicMenu {
  constructor(level, callback) {
    this.controlls = new Controlls();
    this.callback = callback;
    this.wrapper = document.querySelector('.wrapper');
    this.renderLogicMenuPage(this.wrapper, level, this.callback);
    this.init();
  }

  init() {
    if (!globalThis.isPaused) {
      globalThis.audioController.startMusic();
    }
    this.controlls.updateMusicButton(globalThis.audioController);
    //что-то со счетом...
  }

  renderLogicMenuPage(parent, level, callback) {
    const logic_menu_wrapper = document.createElement('div');
    logic_menu_wrapper.className = 'logic_menu_wrapper';

    const logic_menu_container = document.createElement('div');
    logic_menu_container.className = 'logic_menu_container';

    for (let i = 0; i < 6; i++) {
      const div = document.createElement('div');
      div.className = 'menu_item';
      div.id = `${level}-${i}`;
      div.style.width = '20vw';
      div.style.height = '30vh';
      div.style.backgroundSize = 'cover';
      const img = document.createElement('img');
      img.src = `../assets/img/logicmenu/bg${i}.jpg`;
      img.id = `${level}-${i}-image`;
      div.appendChild(img);
      logic_menu_container.appendChild(div);
    }

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';
    this.controlls.createBackArrow(buttons_container,  callback);
    logic_menu_wrapper.appendChild(buttons_container);

    this.controlls.createMusicButton(logic_menu_wrapper, globalThis.audioController);

    logic_menu_wrapper.appendChild(logic_menu_container);
    parent.appendChild(logic_menu_wrapper)
  }
}
//слушатели на каждуюю картинку
