'use strict';
(function () {
  var CONS = window.data.CONS;
  var mapWithOffers = document.querySelector('.map');
  var data = window.data;
  var activate = function () {
    for (var inputNumb = 0; inputNumb < window.form.inputs.length; inputNumb++) {
      window.form.inputs[inputNumb].disabled = false;
    }
    mapWithOffers.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.form.addressInput.value = window.pin.mainActiveLocation().x + ', ' + (window.pin.mainActiveLocation().y - CONS.MAP_MAIN_PIN_HEIGHT);
    window.pin.addFragmentWithPinsToPage(window.data.offers);
    data.offerCard = document.querySelectorAll('.map__card.popup');
    data.offerPin = document.querySelectorAll('.map__pin');
    window.card.getPinsListener();
    window.pin.main.removeEventListener('mousedown', window.pin.onLeftMouseButtonMain);
    window.pin.main.removeEventListener('keydown', window.pin.onEnterKeyMain);
  };
  window.map = {
    activate: activate
  };
})();
