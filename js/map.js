'use strict';
(function () {
  var mapWithOffers = document.querySelector('.map');
  var data = window.data;
  window.map = {
    activate: function () {
      for (var inputNumb = 0; inputNumb < window.form.inputs.length; inputNumb++) {
        window.form.inputs[inputNumb].disabled = false;
      }
      // var mapPinMainLocation = {
      //   x: window.pin.getLocation().x + Math.round(data.INITIAL.MAP_MAIN_PIN_WIDTH / 2),
      //   y: window.pin.getLocation().y + data.INITIAL.MAP_MAIN_PIN_HEIGHT
      // };
      mapWithOffers.classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.form.addressInput.value = window.pin.mainActiveLocation.x + ', ' + window.pin.mainActiveLocation.y;
      window.pin.addFragmentWithPinsToPage(window.data.offers);
      data.offerCard = document.querySelectorAll('.map__card.popup');
      data.offerPin = document.querySelectorAll('.map__pin');
      window.card.getPinsListener();
      window.pin.main.removeEventListener('mousedown', window.pin.onLeftMouseButtonMain);
      window.pin.main.removeEventListener('keydown', window.pin.onEnterKeyMain);
    }
  };
})();
