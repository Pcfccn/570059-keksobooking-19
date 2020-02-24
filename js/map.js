'use strict';
(function () {
  var CONST = window.data.CONST;
  var mapWithOffers = document.querySelector('.map');
  var data = window.data;
  var pin = window.pin;
  var form = window.form;
  var activate = function () {
    for (var inputNumb = 0; inputNumb < form.inputs.length; inputNumb++) {
      form.inputs[inputNumb].disabled = false;
    }
    mapWithOffers.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    form.addressInput.value = pin.mainActiveLocation().x + ', ' + (pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
    pin.addFragmentWithPinsToPage(window.data.offers);
    data.offerCard = document.querySelectorAll('.map__card.popup');
    data.offerPin = document.querySelectorAll('.map__pin');
    window.card.getPinsListener();
    pin.main.removeEventListener('mousedown', pin.onLeftMouseButtonMain);
    pin.main.removeEventListener('keydown', pin.onEnterKeyMain);
  };
  window.map = {
    activate: activate
  };
})();
