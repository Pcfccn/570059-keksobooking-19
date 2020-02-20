'use strict';
(function () {
  var pin = window.pin.main;
  var CONS = window.data.CONS;
  var mapMainPinRightmostX = window.data.mapMainPinRightmostX;
  var dragged = false;
  var startCoords = {x: '', y: ''};

  var checkPinPosition = function () {
    if (pin.offsetLeft > (mapMainPinRightmostX + CONS.MAP_MAIN_PIN_WIDTH / 2)) {
      pin.style.left = (mapMainPinRightmostX + CONS.MAP_MAIN_PIN_WIDTH / 2) + 'px';
    } else if (pin.offsetLeft < (-CONS.MAP_MAIN_PIN_WIDTH / 2)) {
      pin.style.left = (-CONS.MAP_MAIN_PIN_WIDTH / 2) + 'px';
    }
    if (pin.offsetTop < CONS.MAP_PIN_UPPER_Y) {
      pin.style.top = CONS.MAP_PIN_UPPER_Y + 'px';
    } else if (pin.offsetTop > CONS.MAP_PIN_LOWER_Y) {
      pin.style.top = CONS.MAP_PIN_LOWER_Y + 'px';
    }
  };

  var getPinPosition = function (typeEnt) {
    var shift = {
      x: startCoords.x - typeEnt.clientX,
      y: startCoords.y - typeEnt.clientY
    };
    dragged = true;
    startCoords = {
      x: typeEnt.clientX,
      y: typeEnt.clientY
    };
    pin.style.top = (pin.offsetTop - shift.y) + 'px';
    pin.style.left = (pin.offsetLeft - shift.x) + 'px';
    checkPinPosition();
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinPosition(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPinPosition(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.addressInput.value = window.pin.mainActiveLocation().x + ', ' + (window.pin.mainActiveLocation().y - CONS.MAP_MAIN_PIN_HEIGHT);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
