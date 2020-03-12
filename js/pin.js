'use strict';
(function () {
  var CONST = window.data.CONST;
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

  var getMainActiveLocation = function () {
    var location = {
      x: getPinLocation().x + Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2),
      y: getPinLocation().y + CONST.MAP_MAIN_PIN_HEIGHT};
    return location;
  };

  var addFragmentWithPinsToPage = function (offersList) {
    var fragment = document.createDocumentFragment();
    var offersNumber = offersList.length > CONST.MAX_AMOUNT_OF_PINS ? CONST.MAX_AMOUNT_OF_PINS : offersList.length;

    for (var m = 0; m < offersNumber; m++) {
      fragment.appendChild(getFragmentWithPin(offersList[m]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
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
    getMainActiveLocation: getMainActiveLocation,
    addFragmentWithPinsToPage: addFragmentWithPinsToPage,
    onEnterKeyMain: onEnterKeyMain,
    onLeftMouseButtonMain: onLeftMouseButtonMain
  };
})();
