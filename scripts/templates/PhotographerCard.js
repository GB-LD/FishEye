export class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer

        this.$cardWrapper = document.createElement('li');
        this.$cardWrapper.classList.add('photographer_card'); 
    }

    get photographer() {
        return this._photographer;
    }

    creatPhotographerCard() {
        const card = `
        <a href="../../html/photographer.html?photographe=${this._photographer.id}" class="flex flex-col items-center focus:outline outline-offset-2 outline-4 outline-blue-700" aria-label="plus d'information sur ${this._photographer.name}">
            <img src="${this._photographer.portrait}" alt="photo de profil de ${this._photographer.name}" class="object-cover h-52 w-52 rounded-full">
            <h2 class="text-4xl text-flame-pea">${this._photographer.name}</h2>
            <p class="text-center text-xl text-old-brick mb-1 leading-none">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="text-center text-base text-stone-950 mb-1">${this._photographer.tagline}</p>
            <p class="text-center text-base text-gray-700">${this._photographer.price}€/jour</p>
        </a>
        `;

        this.$cardWrapper.innerHTML = card;
        return this.$cardWrapper;
    }
}