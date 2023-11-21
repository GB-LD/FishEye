export class PhotographerAside {
    constructor(photograph, sumOfLikes) {
        this._photograph = photograph;
        this._sumOfLikes = sumOfLikes;

        this.$photograpAside = document.createElement('div');
        this.$photograpAside.classList.add('bg-flame-pea-300', 'flex', 'rounded-tl', 'rounded-tr', 'text-2xl', 'font-medium');
    }

    get photograph() {
        return this._photograph;
    }

    createPhotographAside() {
        const asideContent = `
        <div class="mx-8 my-5">
            <i class="fa-solid fa-heart"></i>
            <div class="inline">${this._sumOfLikes}</div>
        </div>
        <div class="mx-8 my-5">${this._photograph.price}€ / jour</div>
     `

        this.$photograpAside.innerHTML = asideContent;
        return this.$photograpAside;
    }
}