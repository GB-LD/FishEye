import { PhotographersApi } from "../api/Api";
import { PhotographersFactory } from "../factories/PhotographersFactory";

export class PhotographerPage {
    constructor(id) {
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
        this._photographerId = id;
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

        console.log(photographFilter)
        console.log(mediasFilter);
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
