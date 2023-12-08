export class MediaCard {
    constructor(media, likesObserver) {
        this._media = media;
        this.likesObserver = likesObserver;

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
                <p class="inline text-2xl text-old-brick font-medium" aria-live="polite" aria-atomic="true" id="likesCount">${this._media.likes}</p>
                <button class="text-old-brick text-2xl" aria-label="Ajouter aux favoris" id="likeBtn">
                    <i class="fa-solid fa-heart"></i>
                </button>
            <div>
        <div>
        `;

        this.$MediaCard.innerHTML = contentCard;
        const likeBtn = this.$MediaCard.querySelector('#likeBtn');

        likeBtn.addEventListener('click', () => {
            if (!likeBtn.classList.contains('favorite')) {
                likeBtn.classList.add('favorite', 'text-red-500', 'favorite-heartbeat');
                this.likesObserver.fire(this._media, 'INC');
            } else {
                likeBtn.classList.remove('favorite', 'text-red-500', 'favorite-heartbeat');
                this.likesObserver.fire(this._media, 'DEC');
            }
            this.$MediaCard.querySelector('#likesCount').innerHTML = this._media.likes;
        });

        return this.$MediaCard;
    }

}