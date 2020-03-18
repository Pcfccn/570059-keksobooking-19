'use strict';

(function () {
  var CONST = {
    TIMEOUT_MS: 5000,
    RESPONSE_TYPE: 'json',
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking',
    STATUS: {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500
    },
    REQUEST_METOD_GET: 'GET',
    REQUEST_METOD_POST: 'POST'
  };

  var getResponse = function (xhr, onSuccessFunc, onErrorFunc) {
    var error;
    switch (xhr.status) {
      case CONST.STATUS.OK: onSuccessFunc(xhr.response); break;
      case CONST.STATUS.BAD_REQUEST: error = 'Неверный запрос'; break;
      case CONST.STATUS.UNAUTHORIZED: error = 'Пользователь не авторизован'; break;
      case CONST.STATUS.NOT_FOUND: error = 'При запросе на сервер не найдено объявлений'; break;
      case CONST.STATUS.INTERNAL_SERVER_ERROR:
        error = '"Внутренняя ошибка сервера". Сервер столкнулся с ситуацией, которую он не знает как обработать. '; break;
      default: error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onErrorFunc(error);
    }
  };

  var getRequest = function (metod, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = CONST.TIMEOUT_MS;
    xhr.responseType = CONST.RESPONSE_TYPE;
    xhr.addEventListener('load', function () {
      getResponse(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(metod, url);
    xhr.send(data);
  };


  window.backend = {
    load: function (onLoad, onError) {
      getRequest(CONST.REQUEST_METOD_GET, CONST.URL_GET, onLoad, onError);
    },
    upload: function (data, onLoad, onError) {
      getRequest(CONST.REQUEST_METOD_POST, CONST.URL_POST, onLoad, onError, data);
    }

  };
}
)();
