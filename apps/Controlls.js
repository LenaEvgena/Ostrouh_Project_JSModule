'use strict';

import { AudioController } from './AudioController.js';
import * as SPA from './SPA.js';

export class Controlls {
  constructor(count) {
    this.audioController = new AudioController();
    this.count = count;
  }

  turnBack() {
    SPA.switchToMenu();
  }

  createBackArrow(parent) {
    const back_arrow = document.createElement('img');
    back_arrow.src = '../assets/img/other/arrow_back.png'
    back_arrow.className = 'back_arrow';
    back_arrow.addEventListener('click', () => {
      back_arrow.style.transform = 'scale(0.9)';
      back_arrow.style.cursor = 'pointer';
      this.audioController.clickSound();
      this.turnBack();
    });
    parent.appendChild(back_arrow);
  }

  createTaskCheckPoint(count, parent) {
    const tasksPointsDiv = document.createElement('div');
    tasksPointsDiv.id = 'tasksPoints';
    for (let i = 0; i < count; i++) {
      const taskPoint = document.createElement('span');
      taskPoint.id = 'point';
      taskPoint.style.background = 'url(../assets/img/icons/emptycircle.png)';
      taskPoint.style.backgroundSize = 'cover';
      tasksPointsDiv.appendChild(taskPoint);
    }
    parent.appendChild(tasksPointsDiv);
  }

  taskIsDone(count) {
    const points = Array.from(document.querySelectorAll('#point'));
    let point = points[count];

    if (count != 0) {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    } else {
      point.style.background = 'url(../assets/img/icons/redcircle.png)';
      point.style.backgroundSize = 'cover';
    }
  }
}
