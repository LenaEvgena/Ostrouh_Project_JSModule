'use strict';
// initMenuPage();

function initMenuPage() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createMenuPage() );

  const puzzleGame = document.getElementById('Ipuzzle');
  const shapesGame = document.getElementById('Ishapes');
  const colorsGame = document.getElementById('Icolors');
  const logicGame = document.getElementById('Ilogic');
  const menu_wrapper = document.querySelector('.menu_wrapper');


  puzzleGame.addEventListener('click', () => {console.log('Start Puzzle Game')});
  shapesGame.addEventListener('click', () => {console.log('Start Shapes Game')});
  colorsGame.addEventListener('click', () => {console.log('Start Colors Game')});
  logicGame.addEventListener('click', () => {console.log('Start Logic Game')});

  puzzleGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  shapesGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  colorsGame.addEventListener('click', () => menu_wrapper.style.display = 'none');
  logicGame.addEventListener('click', () => menu_wrapper.style.display = 'none');


  function createMenuPage() {
    const menu_wrapper = document.createElement('div');
    menu_wrapper.className = 'menu_wrapper';
    const menu_images = document.createElement('div');
    menu_images.className = 'menu_images';

    menu_wrapper.appendChild(menu_images);
    menu_images.appendChild( createMenuImage('puzzle_menu', 'Ipuzzle', 'puzzle') );
    menu_images.appendChild( createMenuImage('shapes_menu', 'Ishapes', 'shapes') );
    menu_images.appendChild( createMenuImage('colors_menu', 'Icolors', 'colors') );
    menu_images.appendChild( createMenuImage('wilddomestic_menu', 'Ilogic', 'logic') );

    return menu_wrapper;
  }

  function createMenuImage(image, id, alt) {
    const img = document.createElement('img');
    img.src = `../assets/img/menu/${image}.png`;
    img.id = id;
    img.alt = alt;
    img.className = 'menu_image';
    img.setAttribute("onclick","new Audio('../assets/sounds/click2.mp3').play()");
    img.onmouseover = () => {
      new Audio('../assets/sounds/click1.mp3').play()
    };

    return img;
  }

}
