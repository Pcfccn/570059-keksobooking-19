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

  var mainStartLocation = {
    x: getPinLocation().x + Math.round(data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2),
    y: getPinLocation().y + Math.round(data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2)
  };

  var mainActiveLocation = function () {
    var loc = {
      x: getPinLocation().x + Math.round(data.const.INITIAL.MAP_MAIN_PIN_WIDTH / 2),
      y: getPinLocation().y + data.const.INITIAL.MAP_MAIN_PIN_HEIGHT}
    return loc;
  };

  var addFragmentWithPinsToPage = function (bookingOffers) {
    var Fragment = document.createDocumentFragment();
    for (var m = 0; m < bookingOffers.length; m++) {
      Fragment.appendChild(getFragmentWithPin(data.offers[m]));
    }
    document.querySelector('.map__pins').appendChild(Fragment);
  };

  var onEnterKeyMain = function (evt) {
    if (evt.key === data.const.ENTER_KEY) {
      window.activateMap();
    }
  };
  var onLeftMouseButtonMain = function (evt) {
    if (evt.button === data.const.LEFT_CLICK_CODE) {
      window.map.activate();
    }
  };

  mapPinMain.addEventListener('mousedown', onLeftMouseButtonMain);
  mapPinMain.addEventListener('keydown', onEnterKeyMain);

  window.pin = {
    main: mapPinMain,
    getLocation: getPinLocation,
    mainStartLocation: mainStartLocation,
    mainActiveLocation: mainActiveLocation,
    addFragmentWithPinsToPage: addFragmentWithPinsToPage,
    onEnterKeyMain: onEnterKeyMain,
    onLeftMouseButtonMain: onLeftMouseButtonMain
  };
})();
