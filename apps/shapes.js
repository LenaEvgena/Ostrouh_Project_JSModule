'use strict';

function initShapesGame() {
  const wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createShapesPage() );

  const back_arrow = document.querySelector('.back_arrow');
  back_arrow.addEventListener('click', () => turnBack());


  let DraggedImage = null;
  let DragShiftX;
  let DragShiftY;


  function Drag_Start(EO) {
    // началось перетаскивание мячика
    EO = EO || window.event;
    if (EO.which != 1) return;
    DraggedImage = EO.target;

    DragShiftX = EO.pageX - DraggedImage.x;
    DragShiftY = EO.pageY - DraggedImage.y;

    DraggedImage.style.cursor = 'grabbing';
    DraggedImage.style.zIndex = '1000';
    document.addEventListener('mousemove', Drag_Move);
    drag_container.addEventListener('mouseup', Drag_Stop);
  }

  function Drag_Move(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    DraggedImage.style.left = (EO.pageX - DragShiftX) + "px";
    DraggedImage.style.top = (EO.pageY - DragShiftY) + "px";

    DraggedImage.hidden = true;
    let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
    DraggedImage.hidden = false;

    if(!elemBelow) return;
    if (DraggedImage.id === elemBelow.id) {
      DivDrop();
    }
  }

  function Drag_Stop(EO) {
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO = EO || window.event;
    EO.preventDefault();
    DraggedImage.style.cursor = 'auto';
    DraggedImage.style.zIndex = '1';
    document.removeEventListener('mousemove', Drag_Move);
    drag_container.removeEventListener('mouseup', Drag_Stop);
    DraggedImage = null;
  }

  function DivDrop(EO) {
    // мячик уронен
    EO = EO || window.event;
    EO.preventDefault();
    if (DraggedImage){
      drag_container.removeChild(DraggedImage);
      DraggedImage.style.opacity = 0;
      Drag_Stop();
      taskIsDone();
    }
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

  function turnBack() {
    document.querySelector('.shapes_game_wrapper').style.display = 'none';
    back_arrow.style.transform = 'scale(0.9)';
    document.querySelector('.menu_wrapper').style.display = 'flex';
  }

  function createShapesPage() {
    const imagesBase = `../assets/img/shapes/images/`;
    const shadowsBase = `../assets/img/shapes/shadows/`;
    const images = ['cat.png', 'cow.png', 'dog.png', 'horse.png', 'lamb.png', 'pig.png', 'turkey.png'];
    const shadows = ['cat-shadow.png', 'cow-shadow.png', 'dog-shadow.png', 'horse-shadow.png', 'lamb-shadow.png', 'pig-shadow.png', 'turkey-shadow.png'];;

    const shapes_game_wrapper = document.createElement('div');
    shapes_game_wrapper.className = 'shapes_game_wrapper';

    const drop_container = document.createElement('div');
    drop_container.className = 'drop_container';

    const drag_container = document.createElement('div');
    drag_container.className = 'drag_container';

    shapes_game_wrapper.appendChild( createBackArrow() );
    shapes_game_wrapper.appendChild( createTaskCheckPoint(7) );

    drop_container.appendChild( createImage(shadowsBase, shadows, 'shadow_image', 'shapes_shadow_container', 'shapes_drop_images') );
    drag_container.appendChild( createImage(imagesBase, images, 'shape_image', 'shapes_image_container', 'shapes_drag_images') );

    shapes_game_wrapper.appendChild( createOverlay() );

    shapes_game_wrapper.appendChild(drop_container);
    shapes_game_wrapper.appendChild(drag_container);

    return shapes_game_wrapper;
  }

  function createImage(base, arr, className, boxClassName, parentClassName) {
    const parent = document.createElement('div');
    parent.className = parentClassName;
    for (var i = 0; i < arr.length; i++) {
      const box = document.createElement('div');
      box.className = boxClassName;
      const img = document.createElement('img');
      // img.id = id;
      img.src = base + arr[i];
      img.className = className;
      box.appendChild(img);
      parent.appendChild(box);
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

  let tasksCount = 4;
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

      if (point.id != 'done') {
        point.style.background = 'url(../assets/img/icons/redcircle.png)';
        point.style.backgroundSize = 'cover';
        point.id = 'done';
        point = points[n--];
      } else {
        point = point.nextSibling;
        point.style.background = 'url(../assets/img/icons/redcircle.png)';
        point.style.backgroundSize = 'cover';
        point.id = 'done';
      }

    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
      point.id = 'done';
      drop.play();

      setTimeout(() => {
        document.querySelector('.overlay').style.display = 'flex';
        hooray.play();
        // animateBalloons();

        setTimeout(() => {
          turnBack();
          // document.querySelector('.colors_game_wrapper').style.display = 'none';
          // document.querySelector('.menu_wrapper').style.display = 'flex';
        }, 7000)


      }, 100);
    }
  }
































}
