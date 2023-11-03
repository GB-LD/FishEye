export class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer

        this.$cardWrapper = document.createElement('article');
        this.$cardWrapper.classList.add('photographer_card'); 
    }

    get photographer() {
        return this._photographer;
    }

    creatPhotographerCard() {
        const card = `
        <a href="#" class="flex flex-col items-center">
            <img src="${this._photographer.portrait}" alt="profil picture of ${this._photographer.name}" class="object-cover h-48 w-48 rounded-full">
            <h2 class="text-3xl text-flame-pea">${this._photographer.name}</h2>
        </a>
        <p class="text-center text-sm text-old-brick mb-1 leading-none">${this._photographer.city}, ${this._photographer.country}</p>
        <p class="text-center text-xs text-stone-950 mb-1">${this._photographer.tagline}</p>
        <p class="text-center text-xs text-gray-400">${this._photographer.price}€/jour</p>
        `;

        this.$cardWrapper.innerHTML = card;
        return this.$cardWrapper;
    }
}