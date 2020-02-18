'use strict';
(function () {
  window.data = {
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
    },

    offers: [],

    getRandomValue: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    arrayShuffle: function (array) {
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
    },

    getRandomOptions: function (arrayOptions) {
      var randomOptions = [];
      this.arrayShuffle(arrayOptions);
      for (var j = 0; j < this.getRandomValue(1, arrayOptions.length); j++) {
        randomOptions.push(arrayOptions[j]);
      }
      return randomOptions;
    },

    getNewOffers: function () {
      var mapWithOffers = document.querySelector('.map');
      var mapPinRightmostX = mapWithOffers.offsetWidth - this.INITIAL.MAP_PIN_WIDTH - 1;
      for (var l = 0; l < this.INITIAL.NUMBER_OF_OFFERS; l++) {
        var numberOfRooms = this.getRandomValue(1, 10);
        var x = this.getRandomValue(this.INITIAL.MAP_PIN_LEFTMOST_X, mapPinRightmostX);
        var y = this.getRandomValue(this.INITIAL.MAP_PIN_UPPER_Y, this.INITIAL.MAP_PIN_LOWER_Y);
        this.offers.push({
          author: {
            avatar: 'img/avatars/user0' + (l + 1) + '.png',
          },
          offer: {
            title: 'заголовок предложения 0' + (l + 1),
            address: x + ', ' + y,
            price: this.getRandomValue(5000, 100000),
            type: this.INITIAL.TYPES[this.getRandomValue(0, this.INITIAL.TYPES.length - 1)],
            rooms: numberOfRooms,
            guests: this.getRandomValue(numberOfRooms, numberOfRooms * 3),
            checkin: this.INITIAL.CHECKIN_TIMES[this.getRandomValue(0, this.INITIAL.CHECKIN_TIMES.length - 1)],
            checkout: this.INITIAL.CHECKOUT_TIMES[this.getRandomValue(0, this.INITIAL.CHECKOUT_TIMES.length - 1)],
            features: this.getRandomOptions(this.INITIAL.OFFERS_FEATURES),
            description: 'описание предложения 0' + (l + 1),
            photos: this.getRandomOptions(this.INITIAL.PHOTOS),
            location: {x: x, y: y}
          }
        });
      }
    }
  };
})();

