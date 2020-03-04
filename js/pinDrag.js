'use strict';
(function () {
  var pin = window.pin;
  var CONST = window.data.CONST;
  var mapMainPinRightmostX = window.data.mapMainPinRightmostX;
  var form = window.form;
  var dragged = false;
  var startCoords = {x: '', y: ''};

  var checkPinPosition = function () {
    if (pin.main.offsetLeft > (mapMainPinRightmostX + CONST.MAP_MAIN_PIN_WIDTH / 2)) {
      pin.main.style.left = (mapMainPinRightmostX + CONST.MAP_MAIN_PIN_WIDTH / 2) + 'px';
    } else if (pin.main.offsetLeft < (-CONST.MAP_MAIN_PIN_WIDTH / 2)) {
      pin.main.style.left = (-CONST.MAP_MAIN_PIN_WIDTH / 2) + 'px';
    }
    if (pin.main.offsetTop < CONST.MAP_PIN_UPPER_Y) {
      pin.main.style.top = CONST.MAP_PIN_UPPER_Y + 'px';
    } else if (pin.main.offsetTop > CONST.MAP_PIN_LOWER_Y) {
      pin.main.style.top = CONST.MAP_PIN_LOWER_Y + 'px';
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
    pin.main.style.top = (pin.main.offsetTop - shift.y) + 'px';
    pin.main.style.left = (pin.main.offsetLeft - shift.x) + 'px';
    checkPinPosition();
  };
  window.pin.dragPin = function () {
    pin.main.addEventListener('mousedown', function (evt) {
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
        form.addressInput.value = pin.mainActiveLocation().x + ', ' + (pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            pin.main.removeEventListener('click', onClickPreventDefault);
          };
          pin.main.addEventListener('click', onClickPreventDefault);
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
