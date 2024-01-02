export class MediaCard {
    constructor(media, likesObserver) {
        this._media = media;
        this.likesObserver = likesObserver;

        this.$MediaCard = document.createElement('li');
        this.$MediaCard.classList.add('w-full');
    }

    get media() {
        return this._media;
    }

    defineMediaHTMLElement = () => {
        if (this._media.mediaPath.endsWith('.jpg')) {
            return `<img src="${this._media.mediaPath}" alt="photographie ayant pour titre ${this._media.title}" class="rounded w-full object-cover aspect-square" tabindex="0"/>`;
        } else if (this._media.mediaPath.endsWith('.mp4')) {
            return `<video src="${this._media.mediaPath}" alt="video ayant pour titre ${this._media.title}" class="rounded w-full object-cover aspect-square" controls autoplay muted tabindex="0">
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
            <h2 class="text-2xl text-old-brick" aria-label="titre du media">${this._media.title}</h2>
            <div>
                <p class="inline text-2xl text-old-brick font-medium" aria-live="polite" aria-atomic="true" id="likesCount" aria-label="nombre de like du média">${this._media.likes}</p>
                <button class="text-old-brick text-2xl likeBtn" aria-label="Ajouter aux favoris">
                    <i class="fa-solid fa-heart"></i>
                </button>
            <div>
        <div>
        `;

        this.$MediaCard.innerHTML = contentCard;
        const likeBtn = this.$MediaCard.querySelector('.likeBtn');

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