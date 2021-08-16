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
        n: 'OSTROUH_PROJ_RECORDS'},
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
        n: 'OSTROUH_PROJ_RECORDS',
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
        n: 'OSTROUH_PROJ_RECORDS',
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
        n: 'OSTROUH_PROJ_RECORDS',
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

export function addPlayer(userID, time = 0, flip = 0) {
  let playerName = document.getElementById('check_name').value.trim() || '';
  //if(!playerName)...
  globalThis.userName = playerName;
  let usedID = gameStorage.getKeys();
  userID = usedID.length + 1;
  globalThis.userID = userID;
  let totalTime = time;
  let flips = flip;
  let Hash = {};
  Hash.userName = playerName;

  if (playerName) {
    Hash.totalTime = totalTime;
    Hash.flips = flips;
    return gameStorage.addValue(userID, Hash);
  }
}

export function addPlayerData(userID, time, flip) {
  userID = globalThis.userID;
  let Hash = gameStorage.getValue(userID);
  let totalTime = time + Hash.totalTime;
  let flips = flip + Hash.flips;

  Hash.totalTime = totalTime;
  Hash.flips = flips;
  return gameStorage.addValue(userID, Hash);
}

export function showPlayersList() {
  let showInfo = gameStorage.getKeys();
  let entries = Object.entries(gameStorage.hash);
  let resultHTML = `
    <table>
      <tr>
        <th></th>
        <th>Player</th>
        <th>Total time</th>
        <th>Flips</th>
      </tr>`;

  if (showInfo) {
    let k = 0;
    for (let i = entries.length - 1; i > entries.length - 21; i--) {
      let hash = entries[i];
      resultHTML += `
        <tr>
          <td>${(k + 1)}.</td>
          <td>${EscapeHTML(hash[1].userName)}</td>
          <td>${hash[1].totalTime}</td>
          <td>${hash[1].flips}</td>
        </tr>`;
        k += 1;
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
