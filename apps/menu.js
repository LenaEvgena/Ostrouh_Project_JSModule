'use strict';

import { AudioController } from './AudioController.js';
import { Controlls } from './Controlls.js';
import * as SPA from './SPA.js';

export function initMenuPage() {
  const audio = new AudioController();
  const controlls = new Controlls();

  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMenuPage() );

  const buttons = Array.from(document.querySelectorAll('.menu_element'));
  const easyGame = document.getElementById('easy');
  const mediumGame = document.getElementById('medium');
  const hardGame = document.getElementById('hard');

  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      audio.slideSound();
    })
  });
  easyGame.addEventListener('click', () => {
    audio.clickSound();
    SPA.switchToShapes();
  });
  mediumGame.addEventListener('click', () => {
    audio.clickSound();
    SPA.switchToColors();
  });
  hardGame.addEventListener('click', () => {
    audio.clickSound();
    SPA.switchToLogic();
  });
}

  function createMenuPage() {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    const menu_elements = document.createElement('div');
    menu_elements.className = 'menu_elements';

    menu_wrapper.appendChild(menu_elements);
    menu_elements.appendChild( createMenuElement('greenbutton', 'easy') );
    menu_elements.appendChild( createMenuElement('orangebutton', 'medium') );
    menu_elements.appendChild( createMenuElement('redbutton', 'hard') );

    return menu_wrapper;
  }

  function createMenuElement(image, id) {
    const div = document.createElement('div');
    div.className = 'menu_element';
    div.id = id;
    div.style.backgroundImage = `url(../assets/img/menu/${image}.png)`;
    // div.onmouseover = () => {
    //   audio.slideSound();
    // };

    const span = document.createElement('span');
    span.textContent = id;
    div.appendChild(span);
    return div;
  }


