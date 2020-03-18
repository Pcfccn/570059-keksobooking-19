'use strict';

(function () {
  var CONST = window.data.CONST;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var setPreviewProperty = function (previewForm, previewElement, reader) {
    previewElement.src = reader.result;
    previewElement.width = previewForm.offsetWidth;
    previewElement.height = previewForm.offsetHeight;
    previewElement.style.borderRadius = CONST.FORM_PICTURE_RADIUS;
    if (!previewElement.alt) {
      previewElement.alt = CONST.FORM_PHOTO_ALT;
    }
  };

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
            setPreviewProperty(preview, preview.querySelector('img'), reader);
          } else {
            var newElement = document.createElement('img');
            setPreviewProperty(preview, newElement, reader);
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
