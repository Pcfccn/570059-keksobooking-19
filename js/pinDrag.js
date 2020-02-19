'use strict';
(function () {
  var pin = window.pin.main;
  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var checkPinPosition = function () {
      if (pin.offsetLeft > (window.data.mapMainPinRightmostX + window.data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2)) {
        pin.style.left = (window.data.mapMainPinRightmostX + window.data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2) + 'px';
      } else if (pin.offsetLeft < (window.data.const.INITIAL.MAP_PIN_LEFTMOST_X - window.data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2)) {
        pin.style.left = (window.data.const.INITIAL.MAP_PIN_LEFTMOST_X - window.data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2) + 'px';
      }
      if (pin.offsetTop < window.data.const.INITIAL.MAP_PIN_UPPER_Y) {
        pin.style.top = window.data.const.INITIAL.MAP_PIN_UPPER_Y + 'px';
      } else if (pin.offsetTop > window.data.const.INITIAL.MAP_PIN_LOWER_Y) {
        pin.style.top = window.data.const.INITIAL.MAP_PIN_LOWER_Y + 'px';
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
      window.form.addressInput.value = window.pin.mainActiveLocation().x + ', ' + window.pin.mainActiveLocation().y;
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinPosition(moveEvt);
      checkPinPosition();

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPinPosition(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      checkPinPosition();
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
