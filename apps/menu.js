'use strict';

function initMenuPage() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMenuPage() );

  const colorsGame = document.getElementById('Icolors');
  const shapesGame = document.getElementById('Ishapes');
  const logicGame = document.getElementById('Ilogic');
  const puzzleGame = document.getElementById('Ipuzzle');
  const menu_wrapper = document.querySelector('.menu_wrapper');
  const main_wrapper = document.querySelector('.main_wrapper');



  puzzleGame.addEventListener('click', () => {console.log('Start Puzzle Game')});
  shapesGame.addEventListener('click', startShapesGame);
  colorsGame.addEventListener('click', startColorsGame);
  logicGame.addEventListener('click', startLogicGame);

  puzzleGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  // shapesGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  // colorsGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  // logicGame.addEventListener('click', () => menu_wrapper.style.display = 'none');

  function startColorsGame() {
    main_wrapper.style.display = 'none';
    menu_wrapper.style.display = 'none';

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initColorsGame());
    } else {
      initColorsGame();
    }
  }
  function startShapesGame() {
    main_wrapper.style.display = 'none';
    menu_wrapper.style.display = 'none';

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initShapesGame());
    } else {
      initShapesGame();
    }
  }
  function startLogicGame() {
    main_wrapper.style.display = 'none';
    menu_wrapper.style.display = 'none';

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLogicGame());
    } else {
      initLogicGame();
    }
  }

  function createMenuPage() {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    const menu_images = document.createElement('div');
    menu_images.className = 'menu_images';

    menu_wrapper.appendChild(menu_images);
    menu_images.appendChild( createMenuImage('colors_menu', 'Icolors', 'colors') );
    menu_images.appendChild( createMenuImage('shapes_menu', 'Ishapes', 'shapes') );
    menu_images.appendChild( createMenuImage('wilddomestic_menu', 'Ilogic', 'logic') );
    menu_images.appendChild( createMenuImage('puzzle_menu', 'Ipuzzle', 'puzzle') );

    return menu_wrapper;
  }

  function createMenuImage(image, id, alt) {
    const img = document.createElement('img');
    img.src = `../assets/img/menu/${image}.png`;
    img.id = id;
    img.alt = alt;
    img.className = 'menu_image';
    img.setAttribute('onclick', "new Audio('../assets/sounds/click2.mp3').play()");
    img.onmouseover = () => {
      new Audio('../assets/sounds/slide.mp3').play()
    };

    return img;
  }

}
