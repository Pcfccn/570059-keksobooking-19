'use strict';

(function () {
  var TIMEOUT_MS = 5000;
  var RESPONSE_TYPE = 'json';
  var URL = 'https://js.dump.academy/keksobooking/data';
  var STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var getResponse = function (xhr, onSuccessFunc, onErrorFunc) {
    var error;
    switch (xhr.status) {
      case STATUS.OK: onSuccessFunc(xhr.response); break;
      case STATUS.BAD_REQUEST: error = 'Неверный запрос'; break;
      case STATUS.UNAUTHORIZED: error = 'Пользователь не авторизован'; break;
      case STATUS.NOT_FOUND: error = 'При запросе на сервер не найдено объявлений'; break;
      case STATUS.INTERNAL_SERVER_ERROR:
        error = '"Внутренняя ошибка сервера". Сервер столкнулся с ситуацией, которую он не знает как обработать. '; break;
      default: error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onErrorFunc(error);
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.timeout = TIMEOUT_MS;
      xhr.responseType = RESPONSE_TYPE;
      xhr.addEventListener('load', function () {
        getResponse(xhr, onLoad, onError);
      });

      xhr.addEventListener('error', function () {
        getResponse(xhr, onLoad, onError);
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
}
)();
