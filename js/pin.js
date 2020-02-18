'use strict';
(function () {
  var data = window.data;
  var mapPinMain = document.querySelector('.map__pin--main');
  var getPinLocation = function () {
    var location = {
      x: parseInt(mapPinMain.style.left, 10),
      y: parseInt(mapPinMain.style.top, 10)
    };
    return location;
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

  window.pin = {
    main: mapPinMain,
    getLocation: getPinLocation,
    mainStartLocation: {
      x: getPinLocation().x + Math.round(data.INITIAL.MAP_MAIN_PIN_WIDTH / 2),
      y: getPinLocation().y + Math.round(data.INITIAL.MAP_MAIN_PIN_WIDTH / 2)
    },
    mainActiveLocation: {
      x: getPinLocation().x + Math.round(data.INITIAL.MAP_MAIN_PIN_WIDTH / 2),
      y: getPinLocation().y + data.INITIAL.MAP_MAIN_PIN_HEIGHT
    },

    addFragmentWithPinsToPage: function (bookingOffers) {
      var Fragment = document.createDocumentFragment();
      for (var m = 0; m < bookingOffers.length; m++) {
        Fragment.appendChild(getFragmentWithPin(data.offers[m]));
      }
      document.querySelector('.map__pins').appendChild(Fragment);
    },

    onEnterKeyMain: function (evt) {
      if (evt.key === data.ENTER_KEY) {
        window.activateMap();
      }
    },
    onLeftMouseButtonMain: function (evt) {
      if (evt.button === data.LEFT_CLICK_CODE) {
        window.map.activate();
      }
    },
  };

  mapPinMain.addEventListener('mousedown', window.pin.onLeftMouseButtonMain);
  mapPinMain.addEventListener('keydown', window.pin.onEnterKeyMain);

})();
