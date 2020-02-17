'use strict';
(function () {
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.getPinLocation = function () {
    var location = {
      x: parseInt(window.mapPinMain.style.left, 10),
      y: parseInt(window.mapPinMain.style.top, 10)
    };
    return location;
  };
  window.mapWithOffers = document.querySelector('.map');

  window.mapPinMainLocation = {
    x: window.getPinLocation().x + Math.round(window.data.INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2),
    y: window.getPinLocation().y + Math.round(window.data.INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2)
  };

  var getFragmentWithPin = function (offerElement) {
    var pinTemplate = document.querySelector('#pin').content;
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = (offerElement.offer.location.x) + 'px';
    pinElement.querySelector('.map__pin').style.top = (offerElement.offer.location.y) + 'px';
    pinElement.querySelector('img').src = offerElement.author.avatar;
    pinElement.querySelector('img').alt = offerElement.offer.title;
    return pinElement;
  };

  window.addFragmentWithPinsToPage = function (bookingOffers) {
    var Fragment = document.createDocumentFragment();
    for (var m = 0; m < bookingOffers.length; m++) {
      Fragment.appendChild(getFragmentWithPin(window.data.offers[m]));
    }
    document.querySelector('.map__pins').appendChild(Fragment);
  };

  window.onEnterKeyPinMain = function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      window.activateMap();
    }
  };
  window.onLeftMouseButtonPinMain = function (evt) {
    if (evt.button === window.data.LEFT_CLICK_CODE) {
      window.activateMap();
    }
  };

  window.mapPinMain.addEventListener('mousedown', window.onLeftMouseButtonPinMain);
  window.mapPinMain.addEventListener('keydown', window.onEnterKeyPinMain);

})();
