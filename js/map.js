'use strict';
(function () {
  window.activateMap = function () {
    for (var inputNumb = 0; inputNumb < window.inputs.length; inputNumb++) {
      window.inputs[inputNumb].disabled = false;
    }
    window.mapPinMainLocation = {
      x: window.getPinLocation().x + Math.round(window.data.INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2),
      y: window.getPinLocation().y + window.data.INITIAL_DATA.MAP_MAIN_PIN_HEIGHT
    };
    window.mapWithOffers.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.addressInput.value = window.mapPinMainLocation.x + ', ' + window.mapPinMainLocation.y;
    window.addFragmentWithPinsToPage(window.data.offers);
    window.data.offerCard = document.querySelectorAll('.map__card.popup');
    window.data.offerPin = document.querySelectorAll('.map__pin');
    window.getPinsListener();
    window.mapPinMain.removeEventListener('mousedown', window.onLeftMouseButtonPinMain);
    window. mapPinMain.removeEventListener('keydown', window.onEnterKeyPinMain);
  };
})();
