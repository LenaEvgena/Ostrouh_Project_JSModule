'use strict';

import { initStartPage } from './script.js';

//SPA
window.onhashchange = renderNewState;
let levelID = '';

function renderNewState() {
  const wrapper = document.querySelector('.wrapper');
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  (state === '') ? state = { page: 'Start' } : state = JSON.parse(state);

  if (state.page.includes('level')) {
    levelID = state.page;
  }

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
    case 'MenuEasy':
      wrapper.innerHTML = '';
      import('./menuEasy.js').then(module => {
        module.logicMenuEasy();
      });
      // logicEasyGame();
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
    case `${levelID}`:
      wrapper.innerHTML = '';

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

export function switchToMenuEasy(state) {
  switchToState({ page: 'MenuEasy' });
}

export function switchToLogicEasy(state) {
  switchToState({ page: 'LogicEasy' });
}

export function switchToMenuMedium(state) {
  switchToState({ page: 'MenuMedium' });
}

export function switchToLogicMedium(state) {
  switchToState({ page: 'LogicMedium' });
}

export function switchToMenuHard(state) {
  switchToState({ page: 'MenuHard' });
}

export function switchToLogicHard(state) {
  switchToState({ page: 'LogicHard' });
}

export function switchToArticle(state) {
  levelID = event.target.id;
  switchToState({ page: `${levelID}` });
}

renderNewState();
