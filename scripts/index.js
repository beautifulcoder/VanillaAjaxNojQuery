(function () {
    var retrieve = document.getElementById('retrieve'),
        results = document.getElementById('results'),
        toReadyStateDescription = function (state) {
            switch (state) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
            default:
                return '';
            }
        };
    retrieve.addEventListener('click', function (e) {
        var bustCache = '?' + new Date().getTime(),
            oReq = new XMLHttpRequest();
        oReq.onload = function (e) {
            var xhr = e.target;
            console.log('Inside the onload event');
            if (xhr.responseType === 'json') {
                results.innerHTML = xhr.response.message;
            } else {
                results.innerHTML = JSON.parse(xhr.responseText).message;
            }
        };
        oReq.onreadystatechange = function () {
            console.log('Inside the onreadystatechange event with readyState: ' + toReadyStateDescription(oReq.readyState));
        };
        oReq.open('GET', e.target.dataset.url + bustCache, true);
        oReq.responseType = 'json';
        oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        oReq.setRequestHeader('x-vanillaAjaxWithoutjQuery-version', '1.0');
        oReq.send();
    });
}());
