import { PhotographersApi } from "../api/Api";
import { PhotographersFactory } from "../factories/PhotographersFactory";
import { PhotographHeader } from "../templates/PhotographHeader";
import { MediaCard } from "../templates/MediaCard";
import { PhotographerAside } from "../templates/PhotographerAside";
import { contactModalFunctions } from "../utils/contactForm";
import { LightBox } from "../utils/Lightbox";
import { LikesObserver } from "../utils/LikesObserver";
import { SortingObserver } from "../utils/SortingObserver";
import { MediaLikesCounter } from "../utils/MediaLikesCounter";
import { FiltersMedia } from "../templates/FiltersMedia";

export class PhotographerPage {
    constructor(id) {
        this.photographersApi = new PhotographersApi ('/data/photographers.json');
        this._photographerId = id;

        this.likesObserver = new LikesObserver();
        this.mediaLikesCounter = new MediaLikesCounter();
        this.likesObserver.subscribe(this.mediaLikesCounter);
        this.sortingObserver = new SortingObserver();
        this.sortingObserver.subscribe(this);

        this.$PhotographeHeader = document.querySelector('#photograph-section');
        this.$MediaSection = document.querySelector('#photograph-medias');
        this.$PhotographeAside = document.querySelector('#photograph-aside');
        this.$ModalHeaderTitle = document.querySelector('#modalHeaderTitle');
    }

    displayMediaBySorting(medias, sortBy = "Popularité") {
        this.$MediaSection.innerHTML = "";
        const that = this;

        // Media Sorting
        const mediaSortByPopularity = [...medias].sort(function(a, b){return b.likes - a.likes});
        const mediaSortByDate = [...medias].sort(function(a, b) {return new Date(b.date) - new Date(a.date)});
        const mediaSortByTitle = [...medias].sort(function(a, b) {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1
            } else if (titleA > titleB) {
                return 1
            } else {
                return 0
            }
        });

        function displayMediasAfterSorting (mediaSort) {
            mediaSort.forEach(media => {
                const mediaCard = new MediaCard(media, that.likesObserver);
                that.$MediaSection.appendChild(mediaCard.createMediaCard());
            });
            LightBox.init();
        }

        switch (sortBy) {
            case 'Popularité':
                displayMediasAfterSorting(mediaSortByPopularity);
                break;
            case 'Date':
                displayMediasAfterSorting(mediaSortByDate);
                break;
            case 'Titre':
                displayMediasAfterSorting(mediaSortByTitle);
            break
            default:
                console.error("le type de tri n'est pas bon");
        }
    }

    async getData() {
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

        const dataObject = {
            'photographData' : photographFilter,
            'mediaData': mediasFilter
        }

        return dataObject;
    }

    async testOberver(sortby) {
        const data = await this.getData();
        this.displayMediaBySorting(data.mediaData, sortby);
    }

    async main() {
        const data = await this.getData();
        this.displayMediaBySorting(data.mediaData);

        data.photographData.forEach(photograph => {
            const photographHeader = new PhotographHeader(photograph);
            this.$PhotographeHeader.appendChild(photographHeader.createPhotographHeader());
            const photographAside = new PhotographerAside(photograph, this.likesObserver);
            this.$PhotographeAside.appendChild(photographAside.createPhotographAside());
            this.$ModalHeaderTitle.innerHTML = 'Contactez-moi <br>' + photograph.name;
            const filterMedia = new FiltersMedia(this.sortingObserver);
            filterMedia.createFiltersMedia();
        });

        contactModalFunctions();
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