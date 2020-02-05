'use strict';

var INITIAL_DATA = {
  NUMBER_OF_OFFERS: 8,
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
  CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
  OFFERS_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  MAP_PIN_WIDTH: 50,
  MAP_PIN_UPPER_Y: 130,
  MAP_PIN_LOWER_Y: 630,
  MAP_PIN_LEFTMOST_X: 1
};

var offers = [];
var mapWithOffers = document.querySelector('.map');
var mapPinRightmostX = mapWithOffers.offsetWidth - INITIAL_DATA.MAP_PIN_WIDTH - 1;

var getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arrayShuffle = function (array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
};

var getRandomOptions = function (arrayOptions) {
  var randomOptions = [];
  arrayShuffle(arrayOptions);
  for (var j = 0; j < getRandomValue(1, arrayOptions.length); j++) {
    randomOptions.push(arrayOptions[j]);
  }
  return randomOptions;
};

var getNewOffers = function () {
  for (var l = 0; l < INITIAL_DATA.NUMBER_OF_OFFERS; l++) {
    var numberOfRooms = getRandomValue(1, 10);
    var x = getRandomValue(INITIAL_DATA.MAP_PIN_LEFTMOST_X, mapPinRightmostX);
    var y = getRandomValue(INITIAL_DATA.MAP_PIN_UPPER_Y, INITIAL_DATA.MAP_PIN_LOWER_Y);
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (l + 1) + '.png',
      },
      offer: {
        title: 'заголовок предложения 0' + (l + 1),
        address: x + ', ' + y,
        price: getRandomValue(5000, 100000),
        type: INITIAL_DATA.TYPES[getRandomValue(0, INITIAL_DATA.TYPES.length - 1)],
        rooms: numberOfRooms,
        guests: getRandomValue(numberOfRooms, numberOfRooms * 3),
        checkin: INITIAL_DATA.CHECKIN_TIMES[getRandomValue(0, INITIAL_DATA.CHECKIN_TIMES.length - 1)],
        checkout: INITIAL_DATA.CHECKOUT_TIMES[getRandomValue(0, INITIAL_DATA.CHECKOUT_TIMES.length - 1)],
        features: getRandomOptions(INITIAL_DATA.OFFERS_FEATURES),
        description: 'описание предложения 0' + (l + 1),
        photos: getRandomOptions(INITIAL_DATA.PHOTOS),
        location: {x: x, y: y}
      }
    });
  }
  return [offers];
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

var addFragmentWithPinsToPage = function (bookingOffers) {
  var Fragment = document.createDocumentFragment();
  for (var m = 0; m < bookingOffers.length; m++) {
    Fragment.appendChild(getFragmentWithPin(offers[m]));
  }
  document.querySelector('.map__pins').appendChild(Fragment);
};

mapWithOffers.classList.remove('map--faded');
getNewOffers();
addFragmentWithPinsToPage(offers);
