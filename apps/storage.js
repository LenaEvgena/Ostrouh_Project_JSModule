'use strict';

const AjaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

function AJAXStorage() {
  let UpdatePassword = Math.random();

  const self = this;
  self.hash = {};

  self.addValue = function(userID, Hash) {
    self.hash[userID] = Hash;
    lockStorage();
  };

  self.getValue = function(key) {
    return self.hash[key];
  };

  self.getKeys = function() {
    return Object.keys(self.hash);
  };

  update();

  function update() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'READ',
        n: 'OSTROUH_RECORDS'},
      cache: false,
      success: readReady,
      error: errorHandler
    })
  };

  function readReady(data) {
    if (data) {
      self.hash = JSON.parse(data.result);
      console.log(data.result);
    } else {
      initStorage();
    }
  };

  function initStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'INSERT',
        n: 'OSTROUH_RECORDS',
        v: JSON.stringify(self.hash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function lockStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'LOCKGET',
        n: 'OSTROUH_RECORDS',
        p: UpdatePassword},
        cache: false,
        success: updateStorage,
        error: errorHandler
    })
  };

  function updateStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'UPDATE',
        n: 'OSTROUH_RECORDS',
        p: UpdatePassword,
        v: JSON.stringify(self.hash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function dataLoaded(data) {
    console.log("Данные загружены:" + data.result);
  }

  function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  };
}

const gameStorage = new AJAXStorage();

export function addPlayer(userID, totalTime = 0, totalFlips = 0, totalScore = 0) {
  let playerName = document.getElementById('check_name').value.trim();
  //if(!playerName)...
  globalThis.userName = playerName;
  let usedID = gameStorage.getKeys();
  userID = usedID.length + 1;
  globalThis.userID = userID;

  let Hash = {};
  Hash.userName = playerName;

  // let level = levelID.split('_')[2] || '';
  if (playerName) {
    Hash.totalScore = totalScore;
    Hash.totalTime = totalTime;
    Hash.totalFlips = totalFlips;

    Hash.easy = {};
    Hash.easy.score = 0;
    Hash.easy.time = 0;
    Hash.easy.flips = 0;

    Hash.medium = {};
    Hash.medium.score = 0;
    Hash.medium.time = 0;
    Hash.medium.flips = 0;

    Hash.hard = {};
    Hash.hard.score = 0;
    Hash.hard.time = 0;
    Hash.hard.flips = 0;

    return gameStorage.addValue(userID, Hash);
  }
}

export function addPlayerData(userID, levelID, _time, _flips) {
  userID = globalThis.userID;
  let Hash = gameStorage.getValue(userID);

  let _score;
  let time = _time;

  let level = levelID.split('_')[2];
  switch (level) {
    case 'easy':
      if (time <= 15) _score = 30;
      if (time > 15 && time <= 25) _score = 20;
      if (time > 25) _score = 5;

      Hash.easy.score += _score;
      Hash.easy.time += _time;
      Hash.easy.flips += _flips;
      break;
    case 'medium':
      if (time <= 20) _score = 30;
      if (time > 20 && time <= 30) _score = 20;
      if (time > 30) _score = 5;

      Hash.medium.score += _score;
      Hash.medium.time += _time;
      Hash.medium.flips += _flips;
      break;
    case 'hard':
      if (time <= 40) _score = 30;
      if (time > 40 && time <= 50) _score = 20;
      if (time > 50) _score = 5;

      Hash.hard.score += _score;
      Hash.hard.time += _time;
      Hash.hard.flips += _flips;
      break;
  }

  Hash.totalScore += _score;
  Hash.totalTime += _time;
  Hash.totalFlips += _flips;

  return gameStorage.addValue(userID, Hash);
}

export function showPlayersList() {
  let showInfo = gameStorage.getKeys();
  let entries = Object.entries(gameStorage.hash).reverse();

  if (entries.length > 10) {
    entries = entries.slice(0, 10);
  }
  let resultHTML = `
    <table>
      <tr>
        <th></th>
        <th>Player</th>
        <th></th>
        <th>Score</th>
        <th>Time</th>
        <th>Flips</th>
      </tr>`;

  if (showInfo) {
    for (let i = 0; i < entries.length; i++) {
      let player = entries[i][1];

      resultHTML += `
        <tr>
          <td>${(i + 1)}.</td>
          <td>${EscapeHTML(player.userName)}</td>
          <td>Total</td>
          <td>${player.totalScore}</td>
          <td>${player.totalTime}</td>
          <td>${player.totalFlips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Easy</td>
          <td>${player.easy.score}</td>
          <td>${player.easy.time}</td>
          <td>${player.easy.flips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Medium</td>
          <td>${player.medium.score}</td>
          <td>${player.medium.time}</td>
          <td>${player.medium.flips}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Hard</td>
          <td>${player.hard.score}</td>
          <td>${player.hard.time}</td>
          <td>${player.hard.flips}</td>
        </tr>`;
    }
    resultHTML += `</table>`;
  } else {
    resultHTML = 'The list is empty';
  }

  showScoreTable(resultHTML);
}

function showScoreTable(result) {
  const list = document.querySelector('.list');
  list.classList.toggle('visible');
  document.querySelector('.list_table').innerHTML = result;

  list.addEventListener('click', (e) => {
    const isClickInside = document.querySelector('.list_modal').contains(e.target);
    if (isClickInside) {
      return;
    } else {
      list.classList.remove('visible');
    }
  });
}

function EscapeHTML(text) {
  if (!text)
    return text;
  text = text.toString()
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#039;");
  return text;
}



