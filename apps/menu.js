'use strict';

import { AudioController } from './AudioController.js';
import * as SPA from './SPA.js';

export function initMenuPage() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMenuPage() );

  const colorsGame = document.getElementById('Icolors');
  const shapesGame = document.getElementById('Ishapes');
  const logicGame = document.getElementById('Ilogic');

  shapesGame.addEventListener('click', SPA.switchToShapes);
  colorsGame.addEventListener('click', SPA.switchToColors);
  logicGame.addEventListener('click', SPA.switchToLogic);

  function createMenuPage() {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    const menu_images = document.createElement('div');
    menu_images.className = 'menu_images';

    menu_wrapper.appendChild(menu_images);
    menu_images.appendChild( createMenuImage('wilddomestic_menu', 'Ilogic', 'logic') );
    menu_images.appendChild( createMenuImage('colors_menu', 'Icolors', 'colors') );
    menu_images.appendChild( createMenuImage('shapes_menu', 'Ishapes', 'shapes') );

    return menu_wrapper;
  }

  function createMenuImage(image, id, alt) {
    const audio = new AudioController();

    const img = document.createElement('img');
    img.src = `../assets/img/menu/${image}.png`;
    img.id = id;
    img.alt = alt;
    img.className = 'menu_image';
    img.onclick = () => {
      audio.clickSound();
    };
    img.onmouseover = () => {
      audio.slideSound();
    };

    return img;
  }
}

