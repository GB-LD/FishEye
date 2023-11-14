import { PhotographersApi } from "../api/Api";
import { PhotographerCard } from "../templates/PhotographerCard";
import { PhotographersFactory } from "../factories/PhotographersFactory";

export class Index {
    constructor() {
        this.$photographersSection = document.querySelector("#photographers_section");
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
    }

    async main() {
        const data = await this.photographersApi.get();
        const photographersData = data.photographers;
        const photographers = photographersData.map(photographer => PhotographersFactory.create(photographer, 'photographer'));

        photographers.forEach(photographer => {
            const photographerCard = new PhotographerCard(photographer);
            this.$photographersSection.appendChild(photographerCard.creatPhotographerCard());
        });
    }
}

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const index = new Index();
    index.main();
}