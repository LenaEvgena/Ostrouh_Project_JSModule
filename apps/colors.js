'use strict';

import { AudioController } from './AudioController.js';
import * as SPA from './SPA.js';

export function initColorsGame() {
  const audio = new AudioController();

  const base = '../assets/img/colors/';
  const toysImages = ['bluecar', 'blueduck', 'blueplane', 'greencar', 'greenduck', 'greenplane',
    'redcar', 'redduck', 'redplane', 'yellowcar', 'yellowduck', 'yellowplane'];
  const boxesImages = ['bluebox', 'greenbox', 'redbox', "yellowbox"];
  const toys = shuffleImages(toysImages);
  const boxes = shuffleImages(boxesImages);
  let colorTasksCount = toysImages.length;
  let DraggedImage = null;
  let isDragging = false;
  let shiftX;
  let shiftY;

  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createColorsPage() );

  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());

  let dragImages = Array.from(document.querySelectorAll('.drag_image'));
  let dropContainers = Array.from(document.querySelectorAll('.drop_image'));

  dragImages.forEach((image) => {
    image.addEventListener('mousedown', Drag_Start);
  });

  dropContainers.forEach((container) => {
    container.addEventListener('mouseenter', DivDragEnter);
    container.addEventListener('mouseup', DivDrop);
    container.addEventListener('mouseleave', DivDragLeave);
    container.addEventListener('mouseover', DivDragOver);
  });

  function Drag_Start(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    DraggedImage = EO.target;

    if (EO.which != 1) return;
    if (!DraggedImage) return;

    EO.preventDefault();

    DraggedImage.ondragstart = function() {
      return false;
    }

    startDrag(DraggedImage, EO.clientX, EO.clientY);

  }

  function startDrag(element, clientX, clientY) {
    if (isDragging) {
      return;
    }

    isDragging = true;
    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.cursor = 'pointer';
    element.style.zIndex = '100';

    wrapper.appendChild(element);

    moveAt(clientX, clientY);
  }

  function moveAt(clientX, clientY) {
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;
    // if (Math.abs(newX) < 100 || Math.abs(newY) < 100) return;
    DraggedImage.style.left = newX + 'px';
    DraggedImage.style.top = newY + 'px';
  }

  function onMouseUp(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    finishDrag();
  }

  function onMouseMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    moveAt(EO.clientX, EO.clientY);

    DraggedImage.hidden = true;
    let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
    DraggedImage.hidden = false;

    if(!elemBelow) return;
    if ((DraggedImage.id + 'box') === elemBelow.id) {
      DivDrop();
    }
  }

  function DivDrop(EO) {
    // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage) {
      wrapper.removeChild(DraggedImage);
      DraggedImage.style.opacity = 0;
      audio.dropSound();
      finishDrag();
      taskIsDone();
    }
  }

  function finishDrag() {
    if(!isDragging) {
      return;
    }

    DraggedImage.style.cursor = 'auto';
    isDragging = false;
    DraggedImage.style.top = parseInt(DraggedImage.style.top) + pageYOffset + 'px';
    DraggedImage.style.position = 'absolute';

    DraggedImage = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function DivDragEnter(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.1)';
  }

  function DivDragOver(EO) {
    EO = EO || window.event;
    EO.preventDefault();
  }

  function DivDragLeave(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    EO.currentTarget.style.transform = 'scale(1.0)';
  }

  function createColorsPage() {
    const colors_game_wrapper = document.createElement('div');
    colors_game_wrapper.className = 'colors_game_wrapper';
    const colors_drag_images = document.createElement('div');
    colors_drag_images.className = 'colors_drag_images';
    const colors_drop_images = document.createElement('div');
    colors_drop_images.className = 'colors_drop_images';

    colors_game_wrapper.appendChild( createBackArrow() );
    colors_game_wrapper.appendChild( createTaskCheckPoint(colorTasksCount) );
    colors_game_wrapper.appendChild( createToysImage(base, toys, 'drag_image', 'colors_drag_images') );
    colors_game_wrapper.appendChild( createBoxImage(base, boxes, 'drop_image', 'colors_drop_images') );
    colors_game_wrapper.appendChild( createOverlay() );

    return colors_game_wrapper;
  }

  function createToysImage(base, arr, className, parentClassName) {
    const parent = document.createElement('div');
    parent.className = parentClassName;
    for (var i = 0; i < arr.length; i++) {
      const img = document.createElement('img');
      let str = arr[i];
      if (str.includes('red')) {
        img.id = 'red';
      } else if (str.includes('blue')) {
        img.id = 'blue';
      } else if (str.includes('yellow')) {
        img.id = 'yellow';
      } else if (str.includes('green')) {
        img.id = 'green';
      }
      img.src = base + arr[i] + '.png';
      img.className = className;
      parent.appendChild(img);
    }
    return parent;
  }

  function createBoxImage(base, arr, className, parentClassName) {
    const parent = document.createElement('div');
    parent.className = parentClassName;
    for (var i = 0; i < arr.length; i++) {
      const img = document.createElement('img');
      img.id = arr[i];
      img.src = base + arr[i] + '.png';
      img.className = className;
      parent.appendChild(img);
    }
    return parent;
  }

  function shuffleImages(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }



  function turnBack() {
    back_arrow.style.transform = 'scale(0.9)';
    back_arrow.style.cursor = 'pointer';
    SPA.switchToMenu();
  }

  function createBackArrow() {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.onclick = () => {
      audio.clickSound();
    }

    return back_arrow;
  }

  function createTaskCheckPoint(count) {
    const tasksPointsDiv = document.createElement('div');
    tasksPointsDiv.id = 'tasksPoints';
    for (let i = 0; i < count; i++) {
      const taskPoint = document.createElement('span');
      taskPoint.style.background = 'url(../assets/img/icons/emptycircle.png)';
      taskPoint.style.backgroundSize = 'cover';
      tasksPointsDiv.appendChild(taskPoint);
    }
    return tasksPointsDiv;
  }

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    let span = document.createElement('span');
    span.className = 'overlay_text';
    span.textContent = 'excellent!!!';

    overlay.appendChild(span);
    overlay.appendChild( createBalloons() );
    return overlay;
  }

  function createBalloons() {
    const balloonsContainer = document.createElement('div');
    balloonsContainer.className = 'balloonsContainer';
    const balloons = document.createElement('div');
    balloons.id = 'balloons';
    for (let i = 1; i <= 10; i++) {
      let ballon = document.createElement('span');
      ballon.style.background = 'url(../assets/img/other/ballon' + i + '.png)';
      ballon.style.backgroundSize = 'cover';
      ballon.style.position = 'absolute';
      let leftPosition = Math.floor(Math.random() * (1050 - 0 + 1) + 50) ;
      let topPosition = Math.floor(Math.random() * (1000 - 0 + 1));
      // let leftPosition = Math.floor(Math.random() * window.innerWidth / 2.5) - 600 ;
      // let topPosition = Math.floor(Math.random() * window.innerHeight / 2.5) - 300;
      ballon.style.left = leftPosition + 'px';
      ballon.style.top = topPosition + 'px';
      balloons.appendChild(ballon);
    }
    balloonsContainer.appendChild(balloons);
    return balloonsContainer;
  }

  function tapBalloons() {
    const audio1 = new AudioController();

    let balloons = document.querySelector('#balloons');
    balloons.addEventListener('click', (e) => {
      e.preventDefault();

      e.target.style.background = 'url(../assets/img/other/confetti.png)';
      e.target.style.backgroundSize = 'cover';
      e.target.style.width = '150px';
      audio1.balloonPopSound();

      setTimeout(() => {e.target.style.display = 'none'}, 300);
    });
  }

  function endGame() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('visible');
    tapBalloons();
    //sound
    audio.hooraySound();

    setTimeout(() => {
      turnBack();
    }, 8000)
  }

  function taskIsDone() {
    colorTasksCount--;
    const tasksPointsDiv = document.querySelector('#tasksPoints');
    let points = tasksPointsDiv.children;
    let n = colorTasksCount;
    let point = points[n];

    if (colorTasksCount != 0) {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';

      setTimeout(() => {
        endGame();
      }, 100);
    }
  }
}
