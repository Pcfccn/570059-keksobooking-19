'use strict';

var INITIAL_DATA = {
  NUMBER_OF_OFFERS: 8,
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
  CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
  OFFERS_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  MAP_PIN_WIDTH: 50,
  MAP_PIN_UPPER_Y: 130,
  MAP_PIN_LOWER_Y: 630,
  MAP_PIN_LEFTMOST_X: 1
};
var offers = [];
var offersLocation = [];
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
var getRundomOptions = function (arrayOptions) {
  var rundomOptions = [];
  arrayShuffle(arrayOptions);
  for (var j = 0; j <= getRandomValue(0, arrayOptions.length); j++) {
    rundomOptions.push(arrayOptions[j]);
  }
  return rundomOptions;
};

var getOfferLocation = function (numberOfOffersLoacation) {
  for (var k = 0; k < numberOfOffersLoacation; k++) {
    var x = getRandomValue(INITIAL_DATA.MAP_PIN_LEFTMOST_X, mapPinRightmostX);
    var y = getRandomValue(INITIAL_DATA.MAP_PIN_UPPER_Y, INITIAL_DATA.MAP_PIN_LOWER_Y);
    offersLocation.push({x: x,
      y: y});
  }
  return offersLocation;
};

var getNewOffers = function (numberOfOffers) {
  for (var l = 0; l < numberOfOffers; l++) {
    var numberOfRooms = getRandomValue(1, 10);
    var numerOfGuest = numberOfRooms * 2;
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (l + 1) + '.png',
      },
      offer: {
        title: 'заголовок предложения 0' + (l + 1),
        address: offersLocation[l].x + ', ' + offersLocation[l].y,
        price: getRandomValue(5000, 100000),
        type: INITIAL_DATA.TYPES[getRandomValue(0, 3)],
        rooms: numberOfRooms,
        guests: numerOfGuest,
        checkin: INITIAL_DATA.CHECKIN_TIMES[getRandomValue(0, 2)],
        checkout: INITIAL_DATA.CHECKOUT_TIMES[getRandomValue(0, 2)],
        features: getRundomOptions(INITIAL_DATA.OFFERS_FEATURES),
        description: 'описание предложения 0' + (l + 1),
        photos: getRundomOptions(INITIAL_DATA.PHOTOS)
      }
    });
  }
  return offers;
};


var addPinsToPage = function (offersQuantity) {
  var pinTemplate = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();
  for (var m = 0; m < offersQuantity; m++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = (offersLocation[m].x) + 'px';
    pinElement.querySelector('.map__pin').style.top = (offersLocation[m].y) + 'px';
    pinElement.querySelector('img').src = offers[m].author.avatar;
    pinElement.querySelector('img').alt = offers[m].offer.title;
    fragment.appendChild(pinElement);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};


mapWithOffers.classList.remove('map--faded');
getOfferLocation(INITIAL_DATA.NUMBER_OF_OFFERS);
getNewOffers(INITIAL_DATA.NUMBER_OF_OFFERS);
addPinsToPage(INITIAL_DATA.NUMBER_OF_OFFERS);
