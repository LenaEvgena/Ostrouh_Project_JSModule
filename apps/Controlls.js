'use strict';

import * as SPA from './SPA.js';

export class Controlls {
  constructor(count) {
    this.count = count;
  }

  turnBack() {
    SPA.switchToMenu();
  }

  createBackArrow(parent) {
    const back_arrow = document.createElement('img');
    back_arrow.src = './assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.addEventListener('click', () => {
      back_arrow.style.transform = 'scale(0.9)';
      back_arrow.style.cursor = 'pointer';
      globalThis.audioController.clickSound();
      this.turnBack();
    });
    parent.appendChild(back_arrow);
  }

  createHintButton(parent) {
    const hint_button = document.createElement('img');
    hint_button.src = './assets/img/other/hint3.png'
    hint_button.className = 'hint_button';

    parent.appendChild(hint_button);
  }

  createMusicButton(parent, controller) {
    const music_button = document.createElement('img');
    music_button.src = './assets/img/other/musicbutton.png'
    music_button.className = 'music_button';

    music_button.addEventListener('click', () => {
      music_button.classList.toggle('clicked');
      controller.toggleBgMusic();
      this.updateMusicButton();
    });
    parent.appendChild(music_button);
  }

  updateMusicButton() {
    const music_button = document.querySelector('.music_button');
    if(globalThis.isPaused) {
      music_button.classList.add('clicked');
    } else {
      music_button.classList.remove('clicked');
    }
  }

  createTaskCheckPoint(count, parent) {
    const tasksPointsDiv = document.createElement('div');
    tasksPointsDiv.id = 'tasksPoints';
    for (let i = 0; i < count; i++) {
      const taskPoint = document.createElement('span');
      taskPoint.style.animationDelay = `${i / 10}s`;
      taskPoint.id = 'point';
      taskPoint.style.background = 'url(./assets/img/icons/emptycircle.png)';
      taskPoint.style.backgroundSize = 'cover';
      tasksPointsDiv.appendChild(taskPoint);
    }
    parent.appendChild(tasksPointsDiv);
  }

  taskIsDone(count) {
    const points = Array.from(document.querySelectorAll('#point'));
    let point = points[count];

    if (count != 0) {
      point.style.background = 'url(./assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(./assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    }
  }
}
