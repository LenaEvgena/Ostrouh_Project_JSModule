'use strict';

import { initStartPage } from './script.js';
import { initMenuPage } from './menu.js';
import { initColorsGame } from './colors.js';
import { initShapesGame } from './shapes.js';
import { initLogicGame } from './logic.js';

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
      initMenuPage();
      break;
    case 'Colors':
      wrapper.innerHTML = '';
      initColorsGame();
      break;
    case 'Shapes':
      wrapper.innerHTML = '';
      initShapesGame();
      break;
    case 'Logic':
      wrapper.innerHTML = '';
      initLogicGame();
      break;
    // case 'LogicEasy':

    //   break;
    // case 'LogicMedium':

    //   break;
    // case 'LogicHard':

    //   break;
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

export function switchToColors(state) {
  switchToState({ page: 'Colors' });
}

export function switchToShapes(state) {
  switchToState({ page: "Shapes" });
}

export function switchToLogic(state) {
  switchToState({ page: "Logic" });
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
