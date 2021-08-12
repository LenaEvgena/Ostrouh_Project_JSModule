'use strict';

import { Controlls } from './Controlls.js';
import * as SPA from './SPA.js';
import { showPreloader } from './preloader.js';

export function initMenuPage() {
  showPreloader();

  if (!globalThis.isPaused) {
    globalThis.audioController.startMusic();
  }
  const controlls = new Controlls();

  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMenuPage(controlls, globalThis.audioController) );

  const buttons = Array.from(document.querySelectorAll('.menu_element'));
  const easyGame = document.getElementById('easy');
  const mediumGame = document.getElementById('medium');
  const hardGame = document.getElementById('hard');

  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      globalThis.audioController.slideSound();
    })
  });
  easyGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicEasy();
  });
  mediumGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicMedium();
  });
  hardGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToLogicHard();
  });

  controlls.updateMusicButton(globalThis.audioController);
}

  function createMenuPage(controlls, audio) {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    const menu_elements = document.createElement('div');
    menu_elements.className = 'menu_elements';
    menu_wrapper.appendChild(menu_elements);
    menu_elements.appendChild( createMenuElement('greenbutton', 'easy') );
    menu_elements.appendChild( createMenuElement('orangebutton', 'medium') );
    menu_elements.appendChild( createMenuElement('redbutton', 'hard') );

    controlls.createMusicButton(menu_wrapper, audio);
    return menu_wrapper;
  }

  function createMenuElement(image, id) {
    const div = document.createElement('div');
    div.className = 'menu_element';
    div.id = id;
    div.style.backgroundImage = `url(./assets/img/menu/${image}.png)`;

    const span = document.createElement('span');
    span.textContent = id;
    div.appendChild(span);
    return div;
  }


