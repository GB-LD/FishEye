import { PhotographersApi } from "../api/Api";
import { Photographer } from "../models/Photographer";
import { PhotographerCard } from "../templates/PhotographerCard";


export class Index {
    constructor() {
        this.$photographersSection = document.querySelector("#photographers_section");
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
    }

    async main() {
        const data = await this.photographersApi.get();
        const photographersData = data.photographers;
        const photographers = photographersData.map(photographer => new Photographer(photographer));
        console.log(this.$photographersSection);

        photographers.forEach(photographer => {
            const photographerCard = new PhotographerCard(photographer);
            this.$photographersSection.appendChild(photographerCard.creatPhotographerCard());
        });
    }
}

const index = new Index();
index.main();