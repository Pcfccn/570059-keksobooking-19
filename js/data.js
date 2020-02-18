'use strict';
(function () {
  var data = {
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape',
    LEFT_CLICK_CODE: 0,
    INITIAL: {
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
      MAP_MAIN_PIN_HEIGHT: 87,
      MAP_PIN_UPPER_Y: 130,
      MAP_PIN_LOWER_Y: 630,
      MAP_PIN_LEFTMOST_X: 1,
      TEXT_OFFERS_TYPE: {
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом',
        palace: 'Дворец'
      },
      offerPhotosWidth: 45,
      offerPhotosHeight: 40
    },

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
    }
  };

  var offers = [];

  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var arrayShuffle = function (array) {
    var copiedArray = array.slice();
    var counter = array.length;
    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);
      counter--;
      var temp = copiedArray[counter];
      copiedArray[counter] = copiedArray[index];
      copiedArray[index] = temp;
    }
    return copiedArray;
  };

  var getRandomOptions = function (arrayOptions) {
    var randomOptions = [];
    arrayShuffle(arrayOptions);
    for (var j = 0; j < getRandomValue(1, arrayOptions.length); j++) {
      randomOptions.push(arrayOptions[j]);
    }
    return randomOptions;
  };

  var mapWithOffers = document.querySelector('.map');
  var mapPinRightmostX = mapWithOffers.offsetWidth - data.INITIAL.MAP_PIN_WIDTH - 1;
  var mapMainPinRightmostX = mapWithOffers.offsetWidth - data.INITIAL.MAP_MAIN_PIN_WIDTH - 1;
  var getNewOffers = function () {
    for (var l = 0; l < data.INITIAL.NUMBER_OF_OFFERS; l++) {
      var numberOfRooms = getRandomValue(1, 10);
      var x = getRandomValue(data.INITIAL.MAP_PIN_LEFTMOST_X, mapPinRightmostX);
      var y = getRandomValue(data.INITIAL.MAP_PIN_UPPER_Y, data.INITIAL.MAP_PIN_LOWER_Y);
      offers.push({
        author: {
          avatar: 'img/avatars/user0' + (l + 1) + '.png',
        },
        offer: {
          title: 'заголовок предложения 0' + (l + 1),
          address: x + ', ' + y,
          price: getRandomValue(5000, 100000),
          type: data.INITIAL.TYPES[getRandomValue(0, data.INITIAL.TYPES.length - 1)],
          rooms: numberOfRooms,
          guests: getRandomValue(numberOfRooms, numberOfRooms * 3),
          checkin: data.INITIAL.CHECKIN_TIMES[getRandomValue(0, data.INITIAL.CHECKIN_TIMES.length - 1)],
          checkout: data.INITIAL.CHECKOUT_TIMES[getRandomValue(0, data.INITIAL.CHECKOUT_TIMES.length - 1)],
          features: getRandomOptions(data.INITIAL.OFFERS_FEATURES),
          description: 'описание предложения 0' + (l + 1),
          photos: getRandomOptions(data.INITIAL.PHOTOS),
          location: {x: x, y: y}
        }
      });
    }
  };
  window.data = {
    const: data,
    offers: offers,
    getRandomValue: getRandomValue,
    getNewOffers: getNewOffers,
    mapMainPinRightmostX: mapMainPinRightmostX
  };
})();

