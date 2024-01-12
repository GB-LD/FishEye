export class API {
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('an error ocurs', error));
    }
}

export class PhotographersApi extends API {
    constructor(url) {
        super(url)
    }
    
    async getPhotographers() {
        return await this.get();
    }
}