'use strict';
import * as SPA from './SPA.js';
import { AudioController } from './App/AudioController.js';
import { LoadPageData } from './preloader.js';
import * as storage from './storage.js';

globalThis.audioController = new AudioController();
globalThis.isPaused = false;

export function initStartPage() {
  // let imagesArray = ['./assets/img/backgrounds/startbg.png', './assets/img/main/play_btn400.png'];

  LoadPageData('json/start.json', 3);

  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMainPage() );

  const playButton = document.querySelector('.btn_img');

  playButton.addEventListener('mousedown', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('mouseup', () => playButton.style.transform = 'scale(1.0)');
  playButton.addEventListener('touchstart', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('touchend', () => playButton.style.transform = 'scale(1.0)');

  playButton.addEventListener('click', () => {
    storage.setUser(SPA.switchToMenu);
  });
}

function createMainPage() {
  const main_wrapper = document.createElement('div');
  main_wrapper.className = 'main_wrapper';
  main_wrapper.style.background = 'url(./assets/img/backgrounds/startbg.png)';

  const main_button = document.createElement('div');
  main_button.className = 'main_button';
  main_wrapper.appendChild(main_button);

  const img = document.createElement('img');
  img.src = './assets/img/main/play_btn400.png';
  img.className = 'btn_img';
  img.alt = 'play_icon';
  img.onclick = () => {
    globalThis.audioController.clickSound();
  };
  main_button.appendChild(img);
  main_wrapper.appendChild( createInput() );

  return main_wrapper;
}

function createInput() {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'fieldset';
  const p = document.createElement('p');
  p.className = 'form_info';
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.id = 'check_name';
  input.setAttribute('placeholder', 'Enter your name');

  p.appendChild(input);
  fieldset.appendChild(p);
  return fieldset;
}
