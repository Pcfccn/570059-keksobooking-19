'use strict';

var NUMBER_OF_OFFERS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var offers = [];
var offersLocation = [];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRundomOptions = function (arrayOptions) {
  var rundomOptions = [];
  var counter = arrayOptions.length; var temp; var index;
  while (counter--) {
    index = (Math.random() * counter) | 0;
    temp = arrayOptions[counter];
    arrayOptions[counter] = arrayOptions[index];
    arrayOptions[index] = temp;
  }
  for (var j = 0; j < getRandomValue(0, arrayOptions.length); j++) {
    rundomOptions.push(arrayOptions[j]);
  }
  return rundomOptions;
};


var getOfferLocation = function (numberOfOffersLoacation) {
  for (var k = 0; k < numberOfOffersLoacation; k++) {
    var x = getRandomValue(130, 1070);
    var y = getRandomValue(130, 630);
    offersLocation.push({x: x,
      y: y});
  }
  return offersLocation;
};

var getNewOffers = function (numberOfOffers) {
  for (var l = 0; l < numberOfOffers; l++) {
    var offerPrice = getRandomValue(5000, 100000);
    var offerType = TYPES[getRandomValue(0, 3)];
    var offerFeatures = getRundomOptions(OFFERS_FEATURES);
    var offerPhotos = getRundomOptions(PHOTOS);
    var numberOfRooms = getRandomValue(1, 10);
    var numerOfGuest = numberOfRooms * 2;
    var checkinTime = CHECKIN_TIMES[getRandomValue(0, 2)];
    var checkOutTime = CHECKOUT_TIMES[getRandomValue(0, 2)];
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (l + 1) + '.png',
      },
      offer: {
        title: 'заголовок предложения 0' + (l + 1),
        address: offersLocation[l].x + ', ' + offersLocation[l].y,
        price: offerPrice,
        type: offerType,
        rooms: numberOfRooms,
        guests: numerOfGuest,
        checkin: checkinTime,
        checkout: checkOutTime,
        features: offerFeatures,
        description: 'описание предложения 0' + (l + 1),
        photos: offerPhotos
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
    pinElement.querySelector('.map__pin').style.left = (offersLocation[m].x + MAP_PIN_WIDTH / 2) + 'px';
    pinElement.querySelector('.map__pin').style.top = (offersLocation[m].y + MAP_PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = offers[m].author.avatar;
    pinElement.querySelector('img').alt = offers[m].offer.title;
    fragment.appendChild(pinElement);
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

var mapWithOffers = document.querySelector('.map');
mapWithOffers.classList.remove('map--faded');
getOfferLocation(NUMBER_OF_OFFERS);
getNewOffers(NUMBER_OF_OFFERS);
addPinsToPage(NUMBER_OF_OFFERS);
