import { MediaLikesCounter } from "../utils/MediaLikesCounter";

export class PhotographerAside {
    constructor(photograph, likesObserver) {
        this._photograph = photograph;
        this.likesObserver = likesObserver;
        this.sumPageLike = MediaLikesCounter.getPageSumLike();

        this.$photograpAside = document.createElement('div');
        this.$photograpAside.classList.add('bg-flame-pea-300', 'flex', 'rounded-tl', 'rounded-tr', 'text-2xl', 'font-medium'); 
    }

    get photograph() {
        return this._photograph;
    }

    updateNumberOfLikes() {
        setTimeout(() => {
            this.$photograpAside.querySelector('#asideSumOfLikes').innerHTML = MediaLikesCounter.getPageSumLike();
        }, 50)
    }

    createPhotographAside() {
        const asideContent = `
        <div id="likesContent" class="mx-8 my-5">
            <i class="fa-solid fa-heart"></i>
            <div class="inline" id="asideSumOfLikes">${this.sumPageLike}</div>
        </div>
        <div class="mx-8 my-5">${this._photograph.price}€ / jour</div>
     `

        this.$photograpAside.innerHTML = asideContent;
        this.likesObserver.subscribe(this);
        return this.$photograpAside;
    }
}