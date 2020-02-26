'use strict';
(function () {
  var CONST = window.data.CONST;
  var mapWithOffers = document.querySelector('.map');
  var data = window.data;
  var pin = window.pin;
  var form = window.form;

  var closePopup = function () {
    document.querySelector('.error__button').removeEventListener('mousedown', errorButtonHandler);
    document.querySelector('.error__button').removeEventListener('keydown', errorButtonHandler);
    document.removeEventListener('keydown', onEscrKeyPopupButton);
    document.querySelector('.error').remove();
  };

  var errorButtonHandler = function (evt) {
    if (evt.button === CONST.LEFT_CLICK_CODE || evt.key === CONST.ENTER_KEY) {
      closePopup();
    }
  };

  var onEscrKeyPopupButton = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closePopup();
    }
  };

  var activate = function () {
    window.backend.load(
        function (offrs) {
          data.offers = offrs;
          var cardsFragment = window.card.getFragmentWithCards(data.offers);
          var mapFiltersContainer = document.querySelector('.map .map__filters-container');
          document.querySelector('.map').insertBefore(cardsFragment, mapFiltersContainer);

          for (var inputNumb = 0; inputNumb < form.inputs.length; inputNumb++) {
            form.inputs[inputNumb].disabled = false;
          }
          mapWithOffers.classList.remove('map--faded');
          document.querySelector('.ad-form').classList.remove('ad-form--disabled');
          form.addressInput.value = pin.mainActiveLocation().x + ', ' + (pin.mainActiveLocation().y - CONST.MAP_MAIN_PIN_HEIGHT);
          pin.addFragmentWithPinsToPage(window.data.offers);
          data.offerCard = document.querySelectorAll('.map__card.popup');
          data.offerPin = document.querySelectorAll('.map__pin');
          window.card.getPinsListener();
          pin.main.removeEventListener('mousedown', pin.onLeftMouseButtonMain);
          pin.main.removeEventListener('keydown', pin.onEnterKeyMain);
        },

        function (err) {
          var errorPopupTemplate = document.querySelector('#error').content;
          var errorPopup = errorPopupTemplate.cloneNode(true);
          errorPopup.querySelector('.error__message').textContent = err;
          errorPopup.querySelector('.error__button').addEventListener('mousedown', errorButtonHandler);
          errorPopup.querySelector('.error__button').addEventListener('keydown', errorButtonHandler);
          document.addEventListener('keydown', onEscrKeyPopupButton);
          var fragment = document.createDocumentFragment();
          fragment.appendChild(errorPopup);
          document.body.prepend(fragment);
        }
    );
  };
  window.map = {
    activate: activate
  };
})();
