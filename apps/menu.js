'use strict';
const wrapper = document.querySelector('.wrapper');
window.onload = () => initStart();

function initStart() {
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
    main_button.appendChild(img);

    return main_wrapper;
  }
  wrapper.appendChild( createMainPage() );

  const playButton = document.querySelector('.btn_img');
  playButton.addEventListener('mousedown', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('mouseup', () => playButton.style.transform = 'scale(1.0)');
  playButton.addEventListener('touchstart', () => playButton.style.transform = 'scale(0.9)');
  playButton.addEventListener('touchend', () => playButton.style.transform = 'scale(1.0)');
  playButton.addEventListener('click', () => console.log('Play the game!'));
}
