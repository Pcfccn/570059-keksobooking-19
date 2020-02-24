'use strict';
(function () {
  var CONST = window.data.CONST;
  var addressInput = document.querySelector('#address');
  var inputs = document.querySelectorAll('fieldSet');

  addressInput.value = window.pin.mainStartLocation.x + ', ' + (window.pin.mainStartLocation.y - CONST.MAP_MAIN_PIN_HEIGHT);

  inputs = document.querySelectorAll('fieldSet');
  for (var inputNumber = 0; inputNumber < inputs.length; inputNumber++) {
    inputs[inputNumber].disabled = true;
  }

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var inputTimein = document.querySelector('#timein');
  var inputTimeout = document.querySelector('#timeout');

  typeInput.addEventListener('change', function (evt) {
    for (var caseNum = 0; caseNum < CONST.OFFER_OPTIONS.types.length; caseNum++) {
      if (evt.target.value === CONST.OFFER_OPTIONS.types[caseNum]) {
        priceInput.placeholder = CONST.OFFER_OPTIONS.minPrice[caseNum];
        priceInput.min = CONST.OFFER_OPTIONS.minPrice[caseNum];
      }
    }
  });

  inputTimein.addEventListener('change', function (evt) {
    inputTimeout.value = evt.target.value;
  });
  inputTimeout.addEventListener('change', function (evt) {
    inputTimein.value = evt.target.value;
  });

  var removeOptions = function () {
    for (var numOpt = capacityInput.length - 1; numOpt >= 0; numOpt--) {
      capacityInput.options[numOpt].remove();
    }
  };

  var getRoomInfo = function (roomNum) {
    var roomOption = document.createElement('option');
    roomOption.value = CONST.ROOM_OPTIONS[roomNum].rooms;
    roomOption.text = CONST.ROOM_OPTIONS[roomNum].label;
    roomOption.label = CONST.ROOM_OPTIONS[roomNum].label;
    capacityInput.appendChild(roomOption);
  };

  roomNumberInput.addEventListener('change', function (evt) {
    removeOptions();
    var rooms = CONST.ROOMS_AMOUNT_VALUES[evt.target.value];
    for (var room = 0; room < rooms.length; room++) {
      getRoomInfo(rooms[room]);
    }
  });

  var form = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    form.reset();
    removeOptions();
    getRoomInfo(CONST.ROOMS_AMOUNT_VALUES['1']);
    priceInput.placeholder = CONST.OFFER_OPTIONS.minPrice[0];
    priceInput.min = CONST.OFFER_OPTIONS.minPrice[0];
    addressInput.value = window.pin.mainActiveLocation().x + ', ' + (window.pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
  });
  window.form = {
    addressInput: addressInput,
    inputs: inputs
  };
})();
