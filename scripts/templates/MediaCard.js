export class MediaCard {
    constructor(media) {
        this._media = media;

        this.$MediaCard = document.createElement('article');
        this.$MediaCard.classList.add('w-full');
    }

    get media() {
        return this._media;
    }

    defineMediaHTMLElement = () => {
        if (this._media.mediaPath.endsWith('.jpg')) {
            return `<img src="${this._media.mediaPath}" alt="Description de la photo 1" class="rounded w-full object-cover aspect-square" />`;
        } else if (this._media.mediaPath.endsWith('.mp4')) {
            return `<video src="${this._media.mediaPath}" alt="Description de la photo 1" class="rounded w-full object-cover aspect-square" controls autoplay muted >
                        Votre navigateur ne prends pas en charge les vidéo
                    </video>
            `;
        } else {
            return `<p>Erreur : Nous ne parvenons pas à afficher la photo ou la video</p>`;
        }
    }

    createMediaCard() {
        const contentCard =`
        ${this.defineMediaHTMLElement()}
        <div class="flex justify-between mt-2.5" >
            <h2 class="text-2xl text-old-brick">${this._media.title}</h2>
            <div>
                <p class="inline text-2xl text-old-brick font-medium" aria-live="polite" aria-atomic="true" id="nombre-likes-1">${this._media.likes}</p>
                <button class="inline" aria-label="Ajouter aux favoris" onclick="ajouterAuxFavoris(1)">
                    ❤️
                </button>
            <div>
        <div>
        `;

        this.$MediaCard.innerHTML = contentCard;
        return this.$MediaCard;
    }
}