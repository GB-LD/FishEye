export class Media {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image || null;
        this._video = data.video || null;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get image() {
        return `../assets/medias/${this._photographerId}/${this._image}`;
    }

    get mediaPath() {
        if (this._image !== null) {
            return `../assets/medias/${this._photographerId}/${this._image}`;
        } else if (this._video !== null) {
            return `../assets/medias/${this._photographerId}/${this._video}`;
        }
    }

    get video() {
        return `assets/medias/${this._video}`;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }
}