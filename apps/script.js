'use strict';

function iniStartPage() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMainPage() );

  const playButton = document.querySelector('.btn_img');

  playButton.addEventListener('mousedown', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('mouseup', () => playButton.style.transform = 'scale(1.0)');
  playButton.addEventListener('touchstart', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('touchend', () => playButton.style.transform = 'scale(1.0)');

  playButton.addEventListener('click', startMenuPage);


  function startMenuPage() {
    const main_wrapper = document.querySelector('.main_wrapper');
    main_wrapper.style.display = 'none';

    initMenuPage();
  }

  function createMainPage() {
    const main_wrapper = document.createElement('div');
    main_wrapper.className = 'main_wrapper';

    const main_button = document.createElement('div');
    main_button.className = 'main_button';
    main_wrapper.appendChild(main_button);

    const img = document.createElement('img');
    img.src = 'assets/img/main/play_btn400.png';
    img.className = 'btn_img';
    img.alt = 'play_icon';
    img.onclick = () => {
      new Audio('../assets/sounds/click2.mp3').play();
      // audio.clickSound();
    };
    // img.setAttribute("onclick","new Audio('../assets/sounds/click1.mp3').play()");
    main_button.appendChild(img);

    return main_wrapper;
  }
}

window.onload = () => iniStartPage();
window.addEventListener('load', () => {
  // const bgMusic = new AudioController;
  // bgMusic.startMusic();
})



//SPA

window.onhashchange = renderNewState;

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  (state.page === '') ? state = { page: 'Menu' } : state = JSON.parse(state);
  let page = '';

  switch (state.page) {
    case 'Start':
      iniStartPage();
      break;
    case 'Menu':

      break;
    case 'Colors':

      break;
    case 'Shapes':

      break;
    case 'Logic':

      break;
    case 'LogicEasy':

      break;
    case 'LogicMedium':

      break;
    case 'LogicHard':

      break;
  }
  document.querySelector('.wrapper').innerHTML = page;
}

function switchToState(state) {
  window.location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToStart(state) {
  switchToState({ page: "Start" });
}

function switchToMenu(state) {
  switchToState({ page: "Menu" });
}

function switchToColors(state) {
  switchToState({ page: 'Colors' });
}

function switchToShapes(state) {
  switchToState({ page: "Shapes" });
}

function switchToLogic(state) {
  switchToState({ page: "Logic" });
}

function switchToLogicEasy(state) {
  switchToState({ page: 'LogicEasy' });
}
function switchToLogicMedium(state) {
  switchToState({ page: 'LogicMedium' });
}
function switchToLogicHard(state) {
  switchToState({ page: 'LogicHard' });
}

renderNewState();
