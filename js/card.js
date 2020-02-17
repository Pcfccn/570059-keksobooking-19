'use strict';
(function () {
  var addPhotos = function (elementCard, offerCard) {
    for (var n = 1; n < offerCard.offer.photos.length; n++) {
      var newElement = document.createElement('img');
      newElement.src = offerCard.offer.photos[n];
      newElement.classList.add('popup__photo');
      newElement.width = window.data.INITIAL_DATA.offerPhotosWidth;
      newElement.height = window.data.INITIAL_DATA.offerPhotosHeight;
      newElement.alt = 'Фотография жилья ' + (n + 1);
      elementCard.querySelector('.popup__photos').appendChild(newElement);
    }
  };

  var getCardElement = function (offerCard) {
    var cardTemplate = document.querySelector('#card').content;
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offerCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offerCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.INITIAL_DATA.TEXT_OFFERS_TYPE[offerCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + ' комнаты для ' + offerCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = offerCard.offer.features;
    cardElement.querySelector('.popup__description').textContent = offerCard.offer.description;
    cardElement.querySelector('.popup__photos img').src = offerCard.offer.photos[0];
    if (offerCard.offer.photos.length > 1) {
      addPhotos(cardElement, offerCard);
    }
    cardElement.querySelector('.popup__avatar').src = offerCard.author.avatar;
    return cardElement;
  };

  var getFragmentWithCards = function (offerCards) {
    var cardsFragments = document.createDocumentFragment();
    for (var num = 0; num < offerCards.length; num++) {
      cardsFragments.appendChild(getCardElement(window.data.offers[num]));
    }
    return cardsFragments;
  };

  window.getNewOffers();
  var cardsFragment = getFragmentWithCards(window.data.offers);
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');
  document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);

  var onCardEscPress = function (evt) {
    if (evt.key === window.data.ESC_KEY) {
      hideAllCards();
    }
  };

  var hideAllCards = function () {
    for (var offerCardNum = 0; offerCardNum < window.data.offerCard.length; offerCardNum++) {
      if (!window.data.offerCard[offerCardNum].classList.contains('hidden')) {
        window.data.offerCard[offerCardNum].classList.add('hidden');
      }
      document.removeEventListener('keydown', onCardEscPress);
      window.data.offerCard[offerCardNum].querySelector('.popup__close').removeEventListener('click', hideAllCards);
    }
  };

  var showOffercard = function (num) {
    window.data.offerPin[num].addEventListener('click', function (evt) {
      if (evt.button === window.data.LEFT_CLICK_CODE || evt.key === window.data.ENTER_KEY) {
        hideAllCards();
        window.data.offerCard[num - 1].classList.remove('hidden');
        document.addEventListener('keydown', onCardEscPress);
        window.data.offerCard[num - 1].querySelector('.popup__close').addEventListener('click', hideAllCards);
      }
    }
    );
  };

  window.getPinsListener = function () {
    for (var shNum = 1; shNum <= window.data.offers.length; shNum++) {
      showOffercard(shNum);
    }
  };

})();
