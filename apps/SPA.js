'use strict';

import { initStartPage } from './script.js';
// import { initMenuPage } from './menu.js';
// import { logicEasyGame } from './logicEasy.js';
// import { logicMediumGame } from './logicMedium.js';
// import { logicHardGame } from './logicHard.js';
// import * as AJAX from './preloader.js';


//SPA
window.onhashchange = renderNewState;

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  (state === '') ? state = { page: 'Start' } : state = JSON.parse(state);
  const wrapper = document.querySelector('.wrapper');

  switch (state.page) {
    case 'Start':
      wrapper.innerHTML = '';
      initStartPage();
      break;
    case 'Menu':
      wrapper.innerHTML = '';
      import('./menu.js').then(module => {
        module.initMenuPage();
      });
      break;
    case 'LogicEasy':
      wrapper.innerHTML = '';
      import('./logicEasy.js').then(module => {
        module.logicEasyGame();
      });
      // logicEasyGame();
      break;
    case 'LogicMedium':
      wrapper.innerHTML = '';
      import('./logicMedium.js').then(module => {
        module.logicMediumGame();
      });
      // logicMediumGame();
      break;
    case 'LogicHard':
      wrapper.innerHTML = '';
      import('./logicHard.js').then(module => {
        module.logicHardGame();
      });
      // logicHardGame();
      break;
  }
}

function switchToState(state) {
  window.location.hash = encodeURIComponent(JSON.stringify(state));
}

export function switchToStart(state) {
  switchToState({ page: "Start" });
}

export function switchToMenu(state) {
  switchToState({ page: "Menu" });
}

export function switchToLogicEasy(state) {
  switchToState({ page: 'LogicEasy' });
}

export function switchToLogicMedium(state) {
  switchToState({ page: 'LogicMedium' });
}

export function switchToLogicHard(state) {
  switchToState({ page: 'LogicHard' });
}

renderNewState();
