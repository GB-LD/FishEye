export class PhotographHeader {
    constructor(photograph) {
        this._photograph = photograph;

        this.$photographHeader = document.createElement('header');
        this.$photographHeader.classList.add('grid', 'grid-cols-3', 'justify-items-center', 'items-center', 'py-14', 'px-12');
        this.$photographHeader.setAttribute('aria-label', `${this._photograph.name}`);
    }

    get photograph() {
        return this._photograph;
    }

    createPhotographHeader() {
        const header = `
        <div>
            <h1 class="text-6xl text-flame-pea mb-5 block">${this._photograph.name}</h1>
            <p class="text-2xl text-old-brick mb-5 block">${this._photograph.city}, ${this._photograph.country}</p>
            <p class="text-lg neutral-600 block">${this._photograph.tagline}</p>  
        </div>
        <button id="openModalBtn" class="text-lg font-bold text-white px-4 py-6 bg-old-brick rounded" aria-label="contacter ${this._photograph.name }">Contactez-moi</button>
        <img src="../${this._photograph.portrait}" alt="photo de profil de ${this._photograph.name}"
        class="object-cover h-48 w-48 rounded-full justify-self-end">
     `

        this.$photographHeader.innerHTML = header;
        return this.$photographHeader;
    }
}