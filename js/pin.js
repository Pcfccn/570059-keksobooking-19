'use strict';
(function () {
  var CONST = window.data.CONST;
  var offers = window.data.offers;
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
    console.log(window.data.offers);
    console.log(offerElement);
    pinElement.querySelector('.map__pin').style.left = (offerElement.location.x) + 'px';
    pinElement.querySelector('.map__pin').style.top = (offerElement.location.y) + 'px';
    pinElement.querySelector('img').src = offerElement.author.avatar;
    pinElement.querySelector('img').alt = offerElement.offer.title;
    return pinElement;
  };

  var mainStartLocation = {
    x: getPinLocation().x + Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2),
    y: getPinLocation().y + Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2)
  };

  var mainActiveLocation = function () {
    var loc = {
      x: getPinLocation().x + Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2),
      y: getPinLocation().y + CONST.MAP_MAIN_PIN_HEIGHT};
    return loc;
  };

  var addFragmentWithPinsToPage = function (offersList) {
    var Fragment = document.createDocumentFragment();
    for (var m = 0; m < offersList.length; m++) {
      Fragment.appendChild(getFragmentWithPin(offersList[m]));
    }
    document.querySelector('.map__pins').appendChild(Fragment);
  };

  var onEnterKeyMain = function (evt) {
    if (evt.key === CONST.ENTER_KEY) {
      window.map.activate();
    }
  };
  var onLeftMouseButtonMain = function (evt) {
    if (evt.button === CONST.LEFT_CLICK_CODE) {
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
