'use strict';
var ENTER_KEY = 'Enter';

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
  MAP_MAIN_PIN_WIDTH: 62,
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
};

var ROOM_OPTIONS = [
  {rooms: '1', label: 'для 1 гостя'},
  {rooms: '2', label: 'для 2 гостей'},
  {rooms: '3', label: 'для 3 гостей'},
  {rooms: '0', label: 'не для гостей'}
];

var offers = [];
var mapWithOffers = document.querySelector('.map');
var mapPinRightmostX = mapWithOffers.offsetWidth - INITIAL_DATA.MAP_PIN_WIDTH - 1;

var mapPinMain = document.querySelector('.map__pin--main');
var mapPinMainLocation = {
  x: Number(mapPinMain.style.left.substr(0, mapPinMain.style.left.length - 2)) + INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2,
  y: Number(mapPinMain.style.top.substr(0, mapPinMain.style.top.length - 2)) + INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2
};
var addressInput = document.querySelector('#address');
addressInput.value = mapPinMainLocation.x + ', ' + mapPinMainLocation.y;

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

// var getCardElement = function (offerCard) {
//   var cardTemplate = document.querySelector('#card').content;
//   var cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = INITIAL_DATA.TEXT_OFFERS_TYPE[offerCard.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
//   cardElement.querySelector('.popup__features').textContent = offerCard.offer.features;
//   cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;
//   cardElement.querySelector('.popup__photos img').src = offerCard.offer.photos[0];
//   if (offerCard.offer.photos.length > 1) {
//     for (var n = 1; n < offerCard.offer.photos.length; n++) {
//       var newElement = document.createElement('img');
//       newElement.src = offerCard.offer.photos[n];
//       newElement.classList.add('popup__photo');
//       newElement.width = INITIAL_DATA.offerPhotosWidth;
//       newElement.height = INITIAL_DATA.offerPhotosHeight;
//       newElement.alt = 'Фотография жилья ' + (n + 1);
//       cardElement.querySelector('.popup__photos').appendChild(newElement);
//     }
//   }
//   cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;
//   return cardElement;
// };

// var getFragmentWithCards = function (offerCards) {
//   var cardsFragment = document.createDocumentFragment();
//   for (var num = 0; num < offerCards.length; num++) {
//     cardsFragment.appendChild(getCardElement(offers[num]));
//   }
//   return cardsFragment;
// };

// var cardsFragment = getFragmentWithCards(offers);
// var mapFiltersContainer = document.querySelector('.map .map__filters-container');
// document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
var inputs = document.querySelectorAll('fieldSet');
for (var inputNumber = 0; inputNumber < inputs.length; inputNumber++) {
  inputs[inputNumber].disabled = true;
}

var onLeftButtonMouseOrEnterKeyMapPinMain = function (evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    for (var inputNumb = 0; inputNumb < inputs.length; inputNumb++) {
      inputs[inputNumb].disabled = false;
    }
    mapPinMainLocation = {
      x: Number(mapPinMain.style.left.substr(0, mapPinMain.style.left.length - 2)) + INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2,
      y: Number(mapPinMain.style.top.substr(0, mapPinMain.style.top.length - 2)) + INITIAL_DATA.MAP_MAIN_PIN_HEIGHT
    };
    mapWithOffers.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled')
    addressInput.value = mapPinMainLocation.x + ', ' + mapPinMainLocation.y;
    getNewOffers();
    addFragmentWithPinsToPage(offers);
  }
};

mapPinMain.addEventListener('mousedown', onLeftButtonMouseOrEnterKeyMapPinMain);
mapPinMain.addEventListener('keydown', onLeftButtonMouseOrEnterKeyMapPinMain);


var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var inputTimein = document.querySelector('#timein');
var inputTimeout = document.querySelector('#timeout');

typeInput.addEventListener('change', function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'bungalo':
      priceInput.placeholder = 0;
      priceInput.min = 0;
      break;
    case 'flat':
      priceInput.placeholder = 1000;
      priceInput.min = 1000;
      break;
    case 'house':
      priceInput.placeholder = 5000;
      priceInput.min = 5000;
      break;
    case 'palace':
      priceInput.placeholder = 10000;
      priceInput.min = 10000;
      break;
  }
});

inputTimein.addEventListener('change', function (evt) {
  var targetInput = evt.target;
  switch (targetInput.value) {
    case '12:00':
      inputTimeout.value = '12:00';
      break;
    case '13:00':
      inputTimeout.value = '13:00';
      break;
    case '14:00':
      inputTimeout.value = '14:00';
      break;
  }
});

inputTimeout.addEventListener('change', function (evt) {
  var targetInput = evt.target;
  switch (targetInput.value) {
    case '12:00':
      inputTimein.value = '12:00';
      break;
    case '13:00':
      inputTimein.value = '13:00';
      break;
    case '14:00':
      inputTimein.value = '14:00';
      break;
  }
});

var removeOptions = function () {
  for (var numOpt = capacityInput.length - 1; numOpt >= 0; numOpt--) {
    capacityInput.options[numOpt].remove();
  }
};

var getRoomInfo = function (roomNum) {
  var roomOption = document.createElement('option');
  roomOption.value = ROOM_OPTIONS[roomNum].rooms;
  roomOption.text = ROOM_OPTIONS[roomNum].label;
  roomOption.label = ROOM_OPTIONS[roomNum].label;
  capacityInput.appendChild(roomOption);
};

roomNumberInput.addEventListener('change', function (evt) {
  var targetInput = evt.target;
  removeOptions();
  switch (targetInput.value) {
    case '1':
      getRoomInfo(0);
      break;
    case '2':
      getRoomInfo(0);
      getRoomInfo(1);
      break;
    case '3':
      getRoomInfo(0);
      getRoomInfo(1);
      getRoomInfo(2);
      break;
    case '100': getRoomInfo(3);
      break;
  }
});
