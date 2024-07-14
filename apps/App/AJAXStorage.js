'use strict';
const AjaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
const storageName = 'OSTROUH_TABLE_SCORE';

export function AJAXStorage() {
  let UpdatePassword = Math.random();

  const self = this;
  self.userHash = {};

  self.addValue = function(userID, userHash) {
    self.userHash[userID] = userHash;
    lockStorage();
  };

  self.getValue = function(key) {
    return self.userHash[key];
  };

  self.getKeys = function() {
    return Object.keys(self.userHash);
  };

  update();

  function update() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'READ',
        n: storageName},
      cache: false,
      success: readReady,
      error: errorHandler
    })
  };

  function readReady(data) {
    if (data) {
      self.userHash = JSON.parse(data.result);
      // console.log(data.result);
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
        n: storageName,
        v: JSON.stringify(self.userHash)},
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
        n: storageName,
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
        n: storageName,
        p: UpdatePassword,
        v: JSON.stringify(self.userHash)},
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
