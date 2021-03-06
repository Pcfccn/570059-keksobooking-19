'use strict';
(function () {
  var CONST = window.data.CONST;
  var mapWithOffers = document.querySelector('.map');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFiltersSelects = document.querySelectorAll('.map__filter');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');
  var housingFeatures = document.querySelectorAll('#housing-features input');
  var data = window.data;
  var pin = window.pin;
  var form = window.form;
  var card = window.card;
  var load = window.backend.load;
  var dragPin = window.pinDrag.dragPin;

  var disableElements = function (elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  };
  var enableElements = function (elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  };

  var setFiltersDefaultValues = function () {
    mapFiltersSelects.forEach(function (filter) {
      if (filter.value !== CONST.FILTER_DEFAULT_VALUE) {
        filter.value = CONST.FILTER_DEFAULT_VALUE;
      }
    });
  };


  disableElements(mapFiltersSelects);

  var deletePin = function () {
    var offerPin = document.querySelectorAll('.map__pin');
    for (var pn = offerPin.length; pn > 1; pn--) {
      offerPin[pn - 1].remove();
    }
  };

  var deleteCard = function () {
    var mapCard = document.querySelectorAll('.map__card');
    for (var cn = mapCard.length; cn > 0; cn--) {
      mapCard[cn - 1].remove();
    }
  };


  var getPriceRange = function (price) {
    switch (true) {
      case (price < CONST.LOW_PRICE): return CONST.LOW_PRICE_TEXT;
      case (price > CONST.HIGH_PRICE): return CONST.HIGH_PRICE_TEXT;
      default: return CONST.MIDDLE_PRICE_TEXT;
    }
  };

  var filterOut = function (offers) {
    var filteredOffers = [];
    var filterData = function () {
      filteredOffers = offers.slice();

      if (housingType.value !== CONST.FILTER_DEFAULT_VALUE) {
        filteredOffers = filteredOffers.filter(function (offerCard) {
          return offerCard.offer.type === housingType.value;
        });
      }

      if (housingPrice.value !== CONST.FILTER_DEFAULT_VALUE) {
        filteredOffers = filteredOffers.filter(function (offerCard) {
          return getPriceRange(offerCard.offer.price) === housingPrice.value;
        });
      }
      if (housingRooms.value !== CONST.FILTER_DEFAULT_VALUE) {
        filteredOffers = filteredOffers.filter(function (offerCard) {
          return offerCard.offer.rooms + '' === housingRooms.value;
        });
      }

      if (housingGuests.value !== CONST.FILTER_DEFAULT_VALUE) {
        filteredOffers = filteredOffers.filter(function (offerCard) {
          return offerCard.offer.guests + '' === housingGuests.value;
        });
      }


      housingFeatures.forEach(function (feature) {
        if (feature.checked) {
          filteredOffers = filteredOffers.filter(function (offerCard) {
            return offerCard.offer.features.includes(feature.value);
          });
        }
      }
      );


      deletePin();
      deleteCard();
      var cardsFragment = card.getFragmentWithCards(filteredOffers);

      document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
      pin.addFragmentWithPinsToPage(filteredOffers);
      card.getPinsListener(filteredOffers);
    };

    var lastTimeout;
    mapFiltersContainer.addEventListener('change', function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        filterData();
      }, CONST.DEBOUNCE_INTERVAL);
    });

  };

  var disactivate = function () {
    deletePin();
    deleteCard();
    setFiltersDefaultValues();
    disableElements(form.inputs);
    disableElements(mapFiltersSelects);
    mapWithOffers.classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    pin.main.style.left = (pin.mainStartLocation.x - Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2)) + 'px';
    pin.main.style.top = (pin.mainStartLocation.y - Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2)) + 'px';
    form.addressInput.value = pin.mainStartLocation.x + ', ' + pin.mainStartLocation.y;
    pin.main.addEventListener('mousedown', pin.onLeftMouseButtonMain);
    pin.main.addEventListener('keydown', pin.onEnterKeyMain);
  };


  var onLoadFunction = function (offers) {
    var cardsFragment = card.getFragmentWithCards(offers);
    document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
    enableElements(form.inputs);
    enableElements(mapFiltersSelects);

    mapWithOffers.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    form.addressInput.value = pin.getMainActiveLocation().x + ', ' + (pin.getMainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);

    pin.addFragmentWithPinsToPage(offers);
    card.getPinsListener(offers);
    dragPin();
    pin.main.removeEventListener('mousedown', pin.onLeftMouseButtonMain);
    pin.main.removeEventListener('keydown', pin.onEnterKeyMain);

    filterOut(offers);
  };

  var onErrrorFunction = function (errorText) {
    var errorPopupTemplate = document.querySelector('#error').content;
    var errorPopup = errorPopupTemplate.cloneNode(true);
    errorPopup.querySelector('.error__message').textContent = errorText;
    errorPopup.querySelector('.error__button').addEventListener('mousedown', data.onClickErrorButton);
    errorPopup.querySelector('.error__button').addEventListener('keydown', data.onEnterKeyErrorButton);
    document.addEventListener('keydown', data.onEscKeyPopupButton);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorPopup);
    document.body.prepend(fragment);
  };


  var activate = function () {
    load(
        function (offers) {
          onLoadFunction(offers);
        },
        function (err) {
          onErrrorFunction(err);
        }
    );
  };
  window.map = {
    activate: activate,
    disactivate: disactivate
  };
})();
