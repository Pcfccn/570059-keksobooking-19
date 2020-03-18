'use strict';
(function () {
  var DATA = {
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    LEFT_CLICK_CODE: 0,
    CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
    OFFERS_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
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
    LOW_PRICE_TEXT: 'low',
    HIGH_PRICE: 50000,
    HIGH_PRICE_TEXT: 'high',
    MIDDLE_PRICE_TEXT: 'middle',
    FILTER_DEFAULT_VALUE: 'any',
    DEBOUNCE_INTERVAL: 500,
    MAX_AMOUNT_OF_PINS: 5,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    FORM_PICTURE_RADIUS: '5px',
    FORM_PHOTO_ALT: 'Фотография жилья',
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
    document.querySelector('.error__button').removeEventListener('mousedown', onClickErrorButton);
    document.querySelector('.error__button').removeEventListener('keydown', onEnterKeyErrorButton);
    document.removeEventListener('keydown', onEscKeyPopupButton);
    document.querySelector('.error').remove();
  };

  var onClickErrorButton = function (evt) {
    if (evt.button === DATA.LEFT_CLICK_CODE) {
      closeErrorPopup();
    }
  };

  var onEnterKeyErrorButton = function (evt) {
    if (evt.key === DATA.ENTER_KEY) {
      closeErrorPopup();
    }
  };

  var onEscKeyPopupButton = function (evt) {
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
    onEnterKeyErrorButton: onEnterKeyErrorButton,
    onClickErrorButton: onClickErrorButton,
    onEscKeyPopupButton: onEscKeyPopupButton,
  };
})();
