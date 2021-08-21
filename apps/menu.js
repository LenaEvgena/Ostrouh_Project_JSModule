'use strict';

import { Controlls } from './App/Controlls.js';
import * as SPA from './SPA.js';
import { LoadPageData } from './preloader.js';
import * as storage from './storage.js';

export function initMenuPage() {
  LoadPageData('json/mainMenu.json', 10);

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
  const greeting = document.querySelector('.greeting');
  greeting.textContent = `Hello, ${localStorage.getItem('userName')}! :)`;

  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      globalThis.audioController.slideSound();
    })
  });
  easyGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToMenuEasy();
  });
  mediumGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToMenuMedium();
  });
  hardGame.addEventListener('click', () => {
    globalThis.audioController.clickSound();
    SPA.switchToMenuHard();
  });

  controlls.updateMusicButton(globalThis.audioController);
}

  function createMenuPage(controlls, audio) {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    menu_wrapper.style.background = 'url(./assets/img/backgrounds/menubg.png)';
    const menu_elements = document.createElement('div');
    menu_elements.className = 'menu_elements';
    const greeting = document.createElement('div');
    greeting.className = 'greeting';

    menu_wrapper.appendChild(greeting);
    menu_wrapper.appendChild(menu_elements);
    menu_elements.appendChild( createMenuElement('greenbutton', 'easy') );
    menu_elements.appendChild( createMenuElement('orangebutton', 'medium') );
    menu_elements.appendChild( createMenuElement('redbutton', 'hard') );

    controlls.createMusicButton(menu_wrapper, audio);
    controlls.createScoreButton(menu_wrapper, storage.showPlayersList);
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


