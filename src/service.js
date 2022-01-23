const url = 'http://pissykaka.oxore.net';

const request = function (method, uri, data = {}) {
    return new Promise((resolve, reject) => {
        var ajax = new XMLHttpRequest();

        ajax.open(method, `${url}${uri}`);

        ajax.onload = function () {
            var json = JSON.parse(this.response);

            if (json.error !== null) {
                reject(json.error.message);
            }

            resolve(json.payload);
        }

        ajax.onerror = function () {
            reject(new Error('Network error'));
        }

        if (method == 'POST') {
            ajax.setRequestHeader('Content-type', 'application/json');
            ajax.send(JSON.stringify(data));
        } else {
            ajax.send();
        }
    });
}

const createPost = function (data) {
    return request('POST', '/post', data);
}

const getAllBoards = function () {
    return request('GET', '/board/all');
}

const getBoard = function (tag, offset = 0, limit = 20) {
    return request('GET', '/board/' + tag + '?limit=' + limit + '&offset=' + offset);
}

const getThread = function (id) {
    return request('GET', '/post/' + id);
}

export default { createPost, getAllBoards, getBoard, getThread }
