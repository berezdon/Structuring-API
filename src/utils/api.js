class Api {
  constructor(options) {
    this.options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getPages(){
    return fetch(`${this.options.baseUrl}`, {
      headers: this.options.headers
    })
      .then(this._checkResponse);
  }

  getPage(page){
    return fetch(`https://api.github.com/search/code?q=addClass+user:mozilla&per_page=50&page=${page}`, {
      headers: this.options.headers
    })
        .then(this._checkResponse);
  }

}

const api = new Api({
  baseUrl: 'https://api.github.com/search/code?q=addClass+user:mozilla&per_page=50&page=1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api
