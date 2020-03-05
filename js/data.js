'use strict';
(function () {
  var DATA = {
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    LEFT_CLICK_CODE: 0,
    NUMBER_OF_OFFERS: 8,
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
    OFFERS_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    MAP_PIN_WIDTH: 50,
    MAP_MAIN_PIN_WIDTH: 65,
    MAP_MAIN_PIN_HEIGHT: 77,
    MAP_PIN_UPPER_Y: 130,
    MAP_PIN_LOWER_Y: 630,
    MAP_PIN_LEFTMOST_X: 1,
    TEXT_OFFERS_TYPE: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    },
    OFFER_PHOTO_WIDTH: 45,
    OFFER_PHOTO_HEIGHT: 40,
    ROOM_OPTIONS: [
      {rooms: '0', label: 'не для гостей'},
      {rooms: '1', label: 'для 1 гостя'},
      {rooms: '2', label: 'для 2 гостей'},
      {rooms: '3', label: 'для 3 гостей'}
    ],

    ROOMS_AMOUNT_VALUES: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    },

    OFFER_OPTIONS: {
      types: ['bungalo', 'flat', 'house', 'palace'],
      minPrice: [0, 1000, 5000, 10000],
    },
    LOW_PRICE: 10000,
    HIGH_PRICE: 50000
  };

  var offers = [];


  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var numDecline = function (num, nominative, genetiveSingular, genetivePlural) {
    if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
      return genetivePlural;
    } else {
      switch (num % 10) {
        case 1: return nominative;
        case 2:
        case 3:
        case 4: return genetiveSingular;
      }
    }
    return genetivePlural;
  };


  var closeErrorPopup = function () {
    document.querySelector('.error__button').removeEventListener('mousedown', errorButtonHandler);
    document.querySelector('.error__button').removeEventListener('keydown', errorButtonHandler);
    document.removeEventListener('keydown', onEscrKeyPopupButton);
    document.querySelector('.error').remove();
  };

  var errorButtonHandler = function (evt) {
    if (evt.button === DATA.LEFT_CLICK_CODE || evt.key === DATA.ENTER_KEY) {
      closeErrorPopup();
    }
  };

  var onEscrKeyPopupButton = function (evt) {
    if (evt.key === DATA.ESC_KEY) {
      closeErrorPopup();
    }
  };

  var mapWithOffers = document.querySelector('.map');
  var mapMainPinRightmostX = mapWithOffers.offsetWidth - DATA.MAP_MAIN_PIN_WIDTH;

  window.data = {
    CONST: DATA,
    offers: offers,
    getRandomValue: getRandomValue,
    mapMainPinRightmostX: mapMainPinRightmostX,
    numDecline: numDecline,
    errorButtonHandler: errorButtonHandler,
    onEscrKeyPopupButton: onEscrKeyPopupButton,
  };
})();
