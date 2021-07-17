'use strict';

function initShapesGame() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createShapesPage() );

  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());

  let dragImages = Array.from(document.querySelectorAll('.shape_image'));
  let container = document.querySelector('.shapes_drop_images');

  let DraggedImage = null;
  let shiftX;
  let shiftY;
  let isDragging = false;
  // let tasksCount = 7;
  let tasksCount = dragImages.length;


  dragImages.forEach((image) => {
    image.addEventListener('mousedown', Drag_Start);
  });

    // let dropImages = {
  //   cat: {
  //     x: 40,
  //     y: 0
  //   },
  //   cow: {
  //     x: 600,
  //     y: 0
  //   },
  //   dog: {
  //     x: 300,
  //     y: 50
  //   },
  //   horse: {
  //     x: 450,
  //     y: 150
  //   },
  //   lamb: {
  //     x: 200,
  //     y: 250
  //   },
  //   pig: {
  //     x: 800,
  //     y: 0
  //   },
  //   turkey: {
  //     x: 700,
  //     y: 150
  //   },
  //   update() {
  //     for(let key in this) {
  //       document.getElementById(key + '-shadow').style.position = 'absolute';
  //       document.getElementById(key + '-shadow').style.left = this[key].x + 'px';
  //       document.getElementById(key + '-shadow').style.top = this[key].y + 'px';
  //     }
  //   },
  // }
  // dropImages.update();
  // setTimeout(() => {
  //   getElementPos(dragImages);
  // }, 500);

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
    if ((DraggedImage.id + '-shadow') === elemBelow.id) {
      DivDrop(EO, elemBelow, container);
    }
  }
  function DivDrop(EO, elemBelow, container) {
      // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage) {
      wrapper.removeChild(DraggedImage);
      // container.replaceChild(DraggedImage, elemBelow);//////
      elemBelow.src = DraggedImage.src;
      finishDrag();
      taskIsDone();
    }
  }
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;
    DraggedImage.style.top = parseInt(DraggedImage.style.top) + pageYOffset + 'px';
    DraggedImage.style.position = 'absolute';
    DraggedImage = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  // function Drag_Move(EO) {
  //   EO = EO || window.event;
  //   EO.preventDefault();
  //   DraggedImage.style.left = (EO.pageX - DragShiftX) + "px";
  //   DraggedImage.style.top = (EO.pageY - DragShiftY) + "px";

  //   DraggedImage.hidden = true;
  //   let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
  //   DraggedImage.hidden = false;

  //   if(!elemBelow) return;
  //   if (DraggedImage.id === elemBelow.id) {
  //     DivDrop();
  //   }
  // }

  // function Drag_Stop(EO) {
  //   // закончилось перетаскивание мячика (неважно куда он уронен)
  //   EO = EO || window.event;
  //   EO.preventDefault();
  //   DraggedImage.style.cursor = 'auto';
  //   DraggedImage.style.zIndex = '1';
  //   document.removeEventListener('mousemove', Drag_Move);
  //   dragImages.forEach((image) => {
  //     image.removeEventListener('mouseup', Drag_Stop);
  //   });
  //   DraggedImage = null;
  // }

  // function DivDrop(EO) {
  //   // мячик уронен
  //   EO = EO || window.event;
  //   EO.preventDefault();
  //   if (DraggedImage){
  //     shapes_drag_images.removeChild(DraggedImage);
  //     DraggedImage.style.opacity = 0;
  //     Drag_Stop();
  //     taskIsDone();
  //   }
  // }

  // function DivDragEnter(EO) {
  //   EO = EO || window.event;
  //   EO.preventDefault();
  //   // EO.currentTarget.style.transform = 'scale(1.1)';
  // }
  // function DivDragOver(EO) {
  //   EO = EO || window.event;
  //   EO.preventDefault();
  // }
  // function DivDragLeave(EO) {
  //   EO = EO || window.event;
  //   EO.preventDefault();
  //   // EO.currentTarget.style.transform = 'scale(1.0)';
  // }

  function turnBack() {
    document.querySelector('.shapes_game_wrapper').style.display = 'none';
    back_arrow.style.transform = 'scale(0.9)';
    back_arrow.style.cursor = 'pointer';

    document.querySelector('.menu_wrapper').style.display = 'flex';
  }

  function createShapesPage() {
    const imagesBase = `../assets/img/shapes/images/`;
    const shadowsBase = `../assets/img/shapes/shadows/`;
    const images = ['cat', 'cow', 'dog', 'horse', 'lamb', 'pig', 'turkey'];
    const shadows = ['cat-shadow', 'cow-shadow', 'dog-shadow', 'horse-shadow', 'lamb-shadow', 'pig-shadow', 'turkey-shadow'];;

    const shapes_game_wrapper = document.createElement('div');
    shapes_game_wrapper.className = 'shapes_game_wrapper';

    const buttons_container = document.createElement('div');
    buttons_container.className = 'buttons_container';

    const drop_container = document.createElement('div');
    drop_container.className = 'drop_container';

    const drag_container = document.createElement('div');
    drag_container.className = 'drag_container';


    buttons_container.appendChild( createBackArrow() );
    buttons_container.appendChild( createTaskCheckPoint(7) );
    shapes_game_wrapper.appendChild( buttons_container );

    drop_container.appendChild( createImage(shadowsBase, shadows, 'shadow_image', 'shapes_drop_images') );
    drag_container.appendChild( createImage(imagesBase, images, 'shape_image', 'shapes_drag_images') );
    // drop_container.appendChild( createImage(shadowsBase, shadows, 'shadow_image', 'shapes_shadow_container', 'shapes_drop_images') );
    // drag_container.appendChild( createImage(imagesBase, images, 'shape_image', 'shapes_image_container', 'shapes_drag_images') );

    shapes_game_wrapper.appendChild( createOverlay() );

    shapes_game_wrapper.appendChild(drag_container);
    shapes_game_wrapper.appendChild(drop_container);

    return shapes_game_wrapper;
  }

  function createImage(base, arr, className, parentClassName) {//boxClassName,
    const parent = document.createElement('div');
    parent.className = parentClassName;
    for (var i = 0; i < arr.length; i++) {
      const img = document.createElement('img');
      img.id = arr[i];
      img.src = base + arr[i] + '.png';
      img.className = className;
      // box.appendChild(img);
      parent.appendChild(img);
    }
    return parent;
  }

  function createBackArrow() {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.setAttribute('onclick',"new Audio('../assets/sounds/click2.mp3').play()");

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
    overlay.style.display = 'none';
    let span = document.createElement('span');
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

  function taskIsDone() {
    tasksCount--;
    const tasksPointsDiv = document.querySelector('#tasksPoints');
    let points = tasksPointsDiv.children;
    let n = tasksCount;
    let point = points[n];
    const drop = new Audio('../assets/sounds/drop1.mp3');
    const hooray = new Audio('../assets/sounds/hooray.mp3');

    if (tasksCount != 0) {
      drop.play();
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
      drop.play();

      setTimeout(() => {
        document.querySelector('.overlay').style.display = 'flex';
        hooray.play();
        // animateBalloons();

        setTimeout(() => {
          turnBack();
        }, 7000)

      }, 100);
    }
  }


}
