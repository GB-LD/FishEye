import { PhotographersApi } from "../api/Api";
import { PhotographersFactory } from "../factories/PhotographersFactory";
import { PhotographHeader } from "../templates/PhotographHeader";
import { MediaCard } from "../templates/MediaCard";
import { PhotographerAside } from "../templates/PhotographerAside";
import { HelperFunctions } from "../utils/helperFunctions";


export class PhotographerPage {
    constructor(id) {
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
        this._photographerId = id;

        this.$PhotographeHeader = document.querySelector('#photograph-section');
        this.$MediaSection = document.querySelector('#photograph-medias');
        this.$PhotographeAside = document.querySelector('#photograph-aside');
    }

    async main() {
        // Fetch des données
        let data;
        try {
            data = await this.photographersApi.get();
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
        }
        
        const photographersData = data.photographers;
        const mediasData = data.media;
        
        // Création des tableaux d'objets photographers et medias via un factory pattern
        const photographers = photographersData.map(photographer => PhotographersFactory.create(photographer, 'photographer'));
        const medias = mediasData.map(media => PhotographersFactory.create(media, 'media'));

        // Filtre des tableaux d'objets photographers et medias avec l'id du photographe provenant de l'url
        const photographFilter = photographers.filter(photographer => photographer.id === Number.parseInt(this._photographerId));
        const mediasFilter = medias.filter(media => media.photographerId === Number.parseInt(this._photographerId));
        // nombre de likes des médias
        const sumOfLikes = HelperFunctions.sumOfLikes(mediasFilter);
        


        photographFilter.forEach(photograph => {
            const photographHeader = new PhotographHeader(photograph);
            this.$PhotographeHeader.appendChild(photographHeader.createPhotographHeader());
            const photographAside = new PhotographerAside(photograph, sumOfLikes);
            this.$PhotographeAside.appendChild(photographAside.createPhotographAside())
        });

        mediasFilter.forEach(media => {
            const mediaCard = new MediaCard(media);
            this.$MediaSection.appendChild(mediaCard.createMediaCard());
        });
    }
}

// Récupération de l'attribut data-page
const currentPage = document.querySelector('body').getAttribute('data-page');

// Conditionnement de l'instanciation de l'objet PhotographerPage si l'on est bien sur une page photographe
if (currentPage === 'photographer') {

    // récupération de l'id du photographe passer en paramètre dans l'url avec l'objet URLSearchParams 
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('photographe');

    // Instanciation de la classe PhotographerPage avec l'id du photographe 
    if (photographerId) {
        const photographerPage = new PhotographerPage(photographerId);
        photographerPage.main();
    } else {
        console.error("ID du photographe non trouvé dans l'URL.");
    }
}
