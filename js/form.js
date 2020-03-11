'use strict';
(function () {
  var CONST = window.data.CONST;
  var data = window.data;
  var addressInput = document.querySelector('#address');
  var inputs = document.querySelectorAll('fieldSet');
  var pin = window.pin;

  addressInput.value = pin.mainStartLocation.x + ', ' + (pin.mainStartLocation.y - CONST.MAP_MAIN_PIN_HEIGHT);

  inputs = document.querySelectorAll('fieldSet');
  inputs.forEach(function (input) {
    input.disabled = true;
  });

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
    rooms.forEach(function (room) {
      getRoomInfo(room);
    });
  });

  var form = document.querySelector('.ad-form');
  var resetForm = function () {
    form.reset();
    removeOptions();
    getRoomInfo(CONST.ROOMS_AMOUNT_VALUES['1']);
    priceInput.placeholder = CONST.OFFER_OPTIONS.minPrice[0];
    priceInput.min = CONST.OFFER_OPTIONS.minPrice[0];
    addressInput.value = pin.mainActiveLocation().x + ', ' + (pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
  };
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });


  var closeSuccessPopup = function () {
    document.removeEventListener('click', onClickSuccessPopup);
    document.removeEventListener('keydown', onEscKeyPopupButton);
    document.querySelector('.success').remove();
  };
  var onClickSuccessPopup = function (evt) {
    if (evt.button === CONST.LEFT_CLICK_CODE) {
      closeSuccessPopup();
    }
  };
  var onEscKeyPopupButton = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closeSuccessPopup();
    }
  };


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(
        new FormData(form),
        function () {
          resetForm();
          window.map.disactivate();
          var successPopupTemplate = document.querySelector('#success').content;
          var successPopup = successPopupTemplate.cloneNode(true);
          var fragment = document.createDocumentFragment();
          fragment.appendChild(successPopup);
          document.body.prepend(fragment);
          document.addEventListener('click', onClickSuccessPopup);
          document.addEventListener('keydown', onEscKeyPopupButton);
        },
        function (err) {
          var errorPopupTemplate = document.querySelector('#error').content;
          var errorPopup = errorPopupTemplate.cloneNode(true);
          errorPopup.querySelector('.error__message').textContent = err;
          errorPopup.querySelector('.error__button').addEventListener('mousedown', data.onClickErrorButton);
          errorPopup.querySelector('.error__button').addEventListener('keydown', data.onEnterKeyErrorButton);
          document.addEventListener('keydown', data.onEscKeyPopupButton);
          var fragment = document.createDocumentFragment();
          fragment.appendChild(errorPopup);
          document.body.prepend(fragment);
        }
    );
  });


  window.form = {
    addressInput: addressInput,
    inputs: inputs
  };
})();
