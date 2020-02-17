'use strict';
(function () {
  window.addressInput = document.querySelector('#address');
  window.addressInput.value = window.mapPinMainLocation.x + ', ' + window.mapPinMainLocation.y;

  window.inputs = document.querySelectorAll('fieldSet');
  for (var inputNumber = 0; inputNumber < window.inputs.length; inputNumber++) {
    window.inputs[inputNumber].disabled = true;
  }

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var typeInput = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var inputTimein = document.querySelector('#timein');
  var inputTimeout = document.querySelector('#timeout');

  typeInput.addEventListener('change', function (evt) {
    for (var caseNum = 0; caseNum < window.data.OFFER_OPTIONS.types.length; caseNum++) {
      if (evt.target.value === window.data.OFFER_OPTIONS.types[caseNum]) {
        priceInput.placeholder = window.data.OFFER_OPTIONS.minPrice[caseNum];
        priceInput.min = window.data.OFFER_OPTIONS.minPrice[caseNum];
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
    roomOption.value = window.data.ROOM_OPTIONS[roomNum].rooms;
    roomOption.text = window.data.ROOM_OPTIONS[roomNum].label;
    roomOption.label = window.data.ROOM_OPTIONS[roomNum].label;
    capacityInput.appendChild(roomOption);
  };

  roomNumberInput.addEventListener('change', function (evt) {
    removeOptions();
    var rooms = window.data.ROOMS_AMOUNT_VALUES[evt.target.value];
    for (var room = 0; room < rooms.length; room++) {
      getRoomInfo(rooms[room]);
    }
  });

  var form = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    form.reset();
    window.addressInput.value = window.mapPinMainLocation.x + ', ' + window.mapPinMainLocation.y;
  });
})();
