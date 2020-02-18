'use strict';
(function () {
  var data = window.data;
  var addPhotos = function (elementCard, offerCard) {
    for (var n = 1; n < offerCard.offer.photos.length; n++) {
      var newElement = document.createElement('img');
      newElement.src = offerCard.offer.photos[n];
      newElement.classList.add('popup__photo');
      newElement.width = data.offerPhotosWidth;
      newElement.height = data.offerPhotosHeight;
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
    cardElement.querySelector('.popup__type').textContent = data.const.INITIAL.TEXT_OFFERS_TYPE[offerCard.offer.type];
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
      cardsFragments.appendChild(getCardElement(data.offers[num]));
    }
    return cardsFragments;
  };

  data.getNewOffers();
  var cardsFragment = getFragmentWithCards(data.offers);
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');
  document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);

  var onCardEscPress = function (evt) {
    if (evt.key === data.ESC_KEY) {
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
      if (evt.button === data.LEFT_CLICK_CODE || evt.key === data.ENTER_KEY) {
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
    }
  };

})();
