'use strict';

(function () {
  var CONST = window.data.CONST;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var choosePicture = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = CONST.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (preview.querySelector('img')) {
            var previewImg = preview.querySelector('img');
            previewImg.src = reader.result;

          } else {
            var newElement = document.createElement('img');
            newElement.src = reader.result;
            newElement.width = preview.offsetWidth;
            newElement.height = preview.offsetHeight;
            newElement.style.borderRadius = '5px';
            newElement.alt = 'Фотография жилья';
            preview.appendChild(newElement);
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  choosePicture(avatarChooser, avatarPreview);
  choosePicture(photoChooser, photoPreview);
})();
