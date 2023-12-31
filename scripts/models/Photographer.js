export class Photographer {
    constructor(data) {
        this._city = data.city;
        this._country = data.country;
        this._id = data.id;
        this._name = data.name;
        this._portrait = data.portrait;
        this._price = data.price;
        this._tagline = data.tagline;
    }

    get city() {
        return this._city;
    }

    get country() {
        return this._country;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get portrait() {
        return `assets/photographers/${this._name.split(' ').join('').replace("-", "")}.jpg`;
    }

    get price() {
        return this._price;
    }

    get tagline() {
        return this._tagline;
    }
}