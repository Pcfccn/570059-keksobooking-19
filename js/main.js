'use strict';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_CLICK_CODE = 0;
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
};

var ROOM_OPTIONS = [
  {rooms: '0', label: 'не для гостей'},
  {rooms: '1', label: 'для 1 гостя'},
  {rooms: '2', label: 'для 2 гостей'},
  {rooms: '3', label: 'для 3 гостей'}
];

var ROOMS_AMOUNT_VALUES = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var OFFER_OPTIONS = {
  types: ['bungalo', 'flat', 'house', 'palace'],
  minPrice: [0, 1000, 5000, 10000],
};

var offers = [];
var mapWithOffers = document.querySelector('.map');
var mapPinRightmostX = mapWithOffers.offsetWidth - INITIAL_DATA.MAP_PIN_WIDTH - 1;

var mapPinMain = document.querySelector('.map__pin--main');
var getPinLocation = function () {
  var location = {
    x: parseInt(mapPinMain.style.left, 10),
    y: parseInt(mapPinMain.style.top, 10)
  };
  return location;
};

var mapPinMainLocation = {
  x: getPinLocation().x + Math.round(INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2),
  y: getPinLocation().y + Math.round(INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2)
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
  var cardsFragments = document.createDocumentFragment();
  for (var num = 0; num < offerCards.length; num++) {
    cardsFragments.appendChild(getCardElement(offers[num]));
  }
  return cardsFragments;
};

getNewOffers();
var cardsFragment = getFragmentWithCards(offers);
var mapFiltersContainer = document.querySelector('.map .map__filters-container');
document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);

var inputs = document.querySelectorAll('fieldSet');
for (var inputNumber = 0; inputNumber < inputs.length; inputNumber++) {
  inputs[inputNumber].disabled = true;
}

var activateMap = function () {
  for (var inputNumb = 0; inputNumb < inputs.length; inputNumb++) {
    inputs[inputNumb].disabled = false;
  }
  mapPinMainLocation = {
    x: getPinLocation().x + Math.round(INITIAL_DATA.MAP_MAIN_PIN_WIDTH / 2),
    y: getPinLocation().y + INITIAL_DATA.MAP_MAIN_PIN_HEIGHT
  };
  mapWithOffers.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  addressInput.value = mapPinMainLocation.x + ', ' + mapPinMainLocation.y;
  addFragmentWithPinsToPage(offers);
  getPinsListener();
  mapPinMain.removeEventListener('mousedown', onLeftMouseButtonPinMain);
  mapPinMain.removeEventListener('keydown', onEnterKeyPinMain);
};

var onEnterKeyPinMain = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
};
var onLeftMouseButtonPinMain = function (evt) {
  if (evt.button === LEFT_CLICK_CODE) {
    activateMap();
  }
};

mapPinMain.addEventListener('mousedown', onLeftMouseButtonPinMain);
mapPinMain.addEventListener('keydown', onEnterKeyPinMain);


var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var typeInput = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var inputTimein = document.querySelector('#timein');
var inputTimeout = document.querySelector('#timeout');

typeInput.addEventListener('change', function (evt) {
  for (var caseNum = 0; caseNum < OFFER_OPTIONS.types.length; caseNum++) {
    if (evt.target.value === OFFER_OPTIONS.types[caseNum]) {
      priceInput.placeholder = OFFER_OPTIONS.minPrice[caseNum];
      priceInput.min = OFFER_OPTIONS.minPrice[caseNum];
    }
  }
});

inputTimein.addEventListener('change', function (evt) {
  inputTimeout.value = evt.target.value;
});
inputTimeout.addEventListener('change', function (evt) {
  inputTimein.value = evt.target.value;
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
  removeOptions();
  var rooms = ROOMS_AMOUNT_VALUES[evt.target.value];
  for (var room = 0; room < rooms.length; room++) {
    getRoomInfo(rooms[room]);
  }
});

var form = document.querySelector('.ad-form');
var resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  form.reset();
  addressInput.value = mapPinMainLocation.x + ', ' + mapPinMainLocation.y;
});

var getPinsListener = function () {
  var offerCard = document.querySelectorAll('.map__card.popup');
  var offerPin = document.querySelectorAll('.map__pin');

  var hideAllCards = function () {
    for (var offerCardNum = 0; offerCardNum < offerCard.length; offerCardNum++) {
      offerCard[offerCardNum].classList.add('hidden');
      document.removeEventListener('keydown', onCardEscPress);
      offerCard[offerCardNum].querySelector('.popup__close').removeEventListener('click', hideAllCards);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      hideAllCards();
    }
  };

  var showOffercard = function (num) {
    offerPin[num].addEventListener('click', function (evt) {
      if (evt.button === 0 || evt.key === ENTER_KEY) {
        hideAllCards();
        offerCard[num - 1].classList.remove('hidden');
        document.addEventListener('keydown', onCardEscPress);
        offerCard[num - 1].querySelector('.popup__close').addEventListener('click', hideAllCards);
      }
    }
    );
  };
  for (var shNum = 1; shNum <= offers.length; shNum++) {
    showOffercard(shNum);
  }
};
