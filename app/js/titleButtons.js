"use strict";

var remote = require('electron').remote;

(function handleWindowControls() {
  // When document has loaded, initialise
  remote.getCurrentWindow().removeAllListeners();

  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      init();
    }
  };

  function init() {
    var window = remote.getCurrentWindow();
    var minButton = document.getElementById('min-button'),
        maxButton = document.getElementById('max-button'),
        restoreButton = document.getElementById('restore-button'),
        closeButton = document.getElementById('close-button');
    minButton.addEventListener("click", function (event) {
      window = remote.getCurrentWindow();
      window.minimize();
    });
    maxButton.addEventListener("click", function (event) {
      window = remote.getCurrentWindow();
      window.maximize();
      toggleMaxRestoreButtons();
    });
    restoreButton.addEventListener("click", function (event) {
      window = remote.getCurrentWindow();
      window.unmaximize();
      toggleMaxRestoreButtons();
    }); // Toggle maximise/restore buttons when maximisation/unmaximisation
    // occurs by means other than button clicks e.g. double-clicking
    // the title bar:

    toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);
    closeButton.addEventListener("click", function (event) {
      window = remote.getCurrentWindow();
      window.close();
    });

    function toggleMaxRestoreButtons() {
      window = remote.getCurrentWindow();

      if (window.isMaximized()) {
        maxButton.style.display = "none";
        restoreButton.style.display = "flex";
      } else {
        restoreButton.style.display = "none";
        maxButton.style.display = "flex";
      }
    }
  }
})();