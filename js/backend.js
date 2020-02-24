'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      onError = function (message) {
        console.error(message);
      };
      var url = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.timeout = 5000;
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ничего не найдено';
            break;
          case 500:
            error = '"Внутренняя ошибка сервера". Сервер столкнулся с ситуацией, которую он не знает как обработать. ';
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', url);
      xhr.send();
    }
  };
}
)();

