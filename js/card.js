'use strict';
(function () {
  var data = window.data;
  var CONST = window.data.CONST;

  var addMorePhotos = function (offerCard, elementCard) {
    for (var n = 1; n < offerCard.offer.photos.length; n++) {
      var newElement = document.createElement('img');
      newElement.src = offerCard.offer.photos[n];
      newElement.classList.add('popup__photo');
      newElement.width = CONST.OFFER_PHOTO_WIDTH;
      newElement.height = CONST.OFFER_PHOTO_HEIGHT;
      newElement.alt = 'Фотография жилья ' + (n + 1);
      elementCard.querySelector('.popup__photos').appendChild(newElement);
    }
  };

  var cleanFeatures = function (ofrCard, cardEl) {
    var offerFeatures = {
      'wifi': cardEl.querySelector('.popup__feature.popup__feature--wifi'),
      'dishwasher': cardEl.querySelector('.popup__feature.popup__feature--dishwasher'),
      'parking': cardEl.querySelector('.popup__feature.popup__feature--parking'),
      'washer': cardEl.querySelector('.popup__feature.popup__feature--washer'),
      'elevator': cardEl.querySelector('.popup__feature.popup__feature--elevator'),
      'conditioner': cardEl.querySelector('.popup__feature.popup__feature--conditioner'),
    };
    if (ofrCard.offer.features.length) {
      for (var frnum = 0; frnum < ofrCard.offer.features.length; frnum++) {
        offerFeatures[ofrCard.offer.features[frnum]] = null;
      }
      for (var i = 0; i < CONST.OFFERS_FEATURES.length; i++) {
        if (offerFeatures[CONST.OFFERS_FEATURES[i]]) {
          offerFeatures[CONST.OFFERS_FEATURES[i]].remove();
        }
      }
    } else {
      cardEl.querySelector('.popup__features').remove();
    }
  };

  var getCardElement = function (offerCard) {
    var cardTemplate = document.querySelector('#card').content;
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = CONST.TEXT_OFFERS_TYPE[offerCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;

    cleanFeatures(offerCard, cardElement);

    cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;

    if (offerCard.offer.photos.length) {
      cardElement.querySelector('.popup__photos img').src = offerCard.offer.photos[0];
      if (offerCard.offer.photos.length > 1) {
        addMorePhotos(offerCard, cardElement);
      }
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }

    cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;
    return cardElement;
  };

  var getFragmentWithCards = function (offerCards) {
    var cardsFragments = document.createDocumentFragment();
    for (var num = 0; num < offerCards.length; num++) {
      if (data.offers[num].offer) {
        cardsFragments.appendChild(getCardElement(data.offers[num]));
      }
    }
    return cardsFragments;
  };

  var onCardEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      hideAllCards();
    }
  };

  var hideAllCards = function () {
    for (var offerCardNum = 0; offerCardNum < data.offerCard.length; offerCardNum++) {
      if (!data.offerCard[offerCardNum].classList.contains('hidden')) {
        data.offerCard[offerCardNum].classList.add('hidden');
      }
      document.removeEventListener('keydown', onCardEscPress);
      data.offerCard[offerCardNum].querySelector('.popup__close').removeEventListener('click', hideAllCards);
    }
  };

  var showOffercard = function (num) {
    data.offerPin[num].addEventListener('click', function (evt) {
      if (evt.button === CONST.LEFT_CLICK_CODE || evt.key === CONST.ENTER_KEY) {
        hideAllCards();
        data.offerCard[num - 1].classList.remove('hidden');
        document.addEventListener('keydown', onCardEscPress);
        data.offerCard[num - 1].querySelector('.popup__close').addEventListener('click', hideAllCards);
      }
    }
    );
  };

  window.card = {
    getPinsListener: function () {
      for (var shNum = 1; shNum <= data.offers.length; shNum++) {
        showOffercard(shNum);
      }
    },
    getFragmentWithCards: getFragmentWithCards
  };

})();
