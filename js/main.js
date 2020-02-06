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
  MAP_PIN_LEFTMOST_X: 1,
  TEXT_OFFERS_TYPE: {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  },
  offerPhotosWidth: 45,
  offerPhotosHeight: 40
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

var getCardElement = function (offerCard) {
  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = INITIAL_DATA.TEXT_OFFERS_TYPE[offerCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = offerCard.offer.features;
  cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;
  cardElement.querySelector('.popup__photos img').src = offerCard.offer.photos[0];
  if (offerCard.offer.photos.length > 1) {
    for (var n = 1; n < offerCard.offer.photos.length; n++) {
      var newElement = document.createElement('img');
      newElement.src = offerCard.offer.photos[n];
      newElement.classList.add('popup__photo');
      newElement.width = INITIAL_DATA.offerPhotosWidth;
      newElement.height = INITIAL_DATA.offerPhotosHeight;
      newElement.alt = 'Фотография жилья ' + (n + 1);
      cardElement.querySelector('.popup__photos').appendChild(newElement);
    }
  }
  cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;
  return cardElement;
};

var getFragmentWithCards = function (offerCards) {
  var cardsFragment = document.createDocumentFragment();
  for (var num = 0; num < offerCards.length; num++) {
    cardsFragment.appendChild(getCardElement(offers[num]));
  }
  return cardsFragment;
};

mapWithOffers.classList.remove('map--faded');
getNewOffers();
addFragmentWithPinsToPage(offers);

var cardsFragment = getFragmentWithCards(offers);
var mapFiltersContainer = document.querySelector('.map .map__filters-container');
document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
