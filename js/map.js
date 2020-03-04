'use strict';
(function () {
  var CONST = window.data.CONST;
  var mapWithOffers = document.querySelector('.map');
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelectorAll('.map__filter');
  var data = window.data;
  var pin = window.pin;
  var form = window.form;
  var card = window.card;
  var load = window.backend.load;

  var delPin = function () {
    var offerPin = document.querySelectorAll('.map__pin');
    for (var pn = offerPin.length; pn > 1; pn--) {
      offerPin[pn - 1].remove();
    }
  };

  var delCard = function () {
    var mapCard = document.querySelectorAll('.map__card');
    for (var cn = mapCard.length; cn > 0; cn--) {
      mapCard[cn - 1].remove();
    }
  };

  var filterOut = function (offrs) {
    var filteredOffers = offrs.slice();
    var filterData = function () {
      if (housingType.value === 'any') {
        filteredOffers = offrs.slice();
      } else {
        filteredOffers = offrs.filter(function (offr) {
          return offr.offer.type === housingType.value;
        });
      }
      delPin();
      delCard();
      var cardsFragment = card.getFragmentWithCards(filteredOffers);
      var mapFiltersContainer = document.querySelector('.map .map__filters-container');
      document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
      pin.addFragmentWithPinsToPage(filteredOffers);
      card.getPinsListener(filteredOffers);
    };
    mapFilters.forEach(function () {
      addEventListener('change', filterData);
    });

  };

  var disactivate = function () {
    delPin();
    delCard();
    for (var inputNumb = 0; inputNumb < form.inputs.length; inputNumb++) {
      form.inputs[inputNumb].disabled = true;
    }
    mapWithOffers.classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    pin.main.style.left = (pin.mainStartLocation.x - Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2)) + 'px';
    pin.main.style.top = (pin.mainStartLocation.y - Math.round(CONST.MAP_MAIN_PIN_WIDTH / 2)) + 'px';
    form.addressInput.value = pin.mainStartLocation.x + ', ' + pin.mainStartLocation.y;
    pin.main.addEventListener('mousedown', pin.onLeftMouseButtonMain);
    pin.main.addEventListener('keydown', pin.onEnterKeyMain);
  };


  var activate = function () {
    load(
        function (offrs) {
          var cardsFragment = card.getFragmentWithCards(offrs);
          var mapFiltersContainer = document.querySelector('.map .map__filters-container');
          document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);
          for (var inputNumb = 0; inputNumb < form.inputs.length; inputNumb++) {
            form.inputs[inputNumb].disabled = false;
          }
          mapWithOffers.classList.remove('map--faded');
          document.querySelector('.ad-form').classList.remove('ad-form--disabled');
          form.addressInput.value = pin.mainActiveLocation().x + ', ' + (pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
          pin.addFragmentWithPinsToPage(offrs);
          card.getPinsListener(offrs);
          window.pin.dragPin();
          pin.main.removeEventListener('mousedown', pin.onLeftMouseButtonMain);
          pin.main.removeEventListener('keydown', pin.onEnterKeyMain);

          filterOut(offrs);
        },

        function (err) {
          var errorPopupTemplate = document.querySelector('#error').content;
          var errorPopup = errorPopupTemplate.cloneNode(true);
          errorPopup.querySelector('.error__message').textContent = err;
          errorPopup.querySelector('.error__button').addEventListener('mousedown', data.errorButtonHandler);
          errorPopup.querySelector('.error__button').addEventListener('keydown', data.errorButtonHandler);
          document.addEventListener('keydown', data.onEscrKeyPopupButton);
          var fragment = document.createDocumentFragment();
          fragment.appendChild(errorPopup);
          document.body.prepend(fragment);
        }
    );
  };
  window.map = {
    activate: activate,
    disactivate: disactivate
  };
})();
