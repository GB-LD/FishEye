// Classe LightBox pour afficher des images ou des vidéos dans une lightbox
export class LightBox {

  // Constructeur pour initialiser la LightBox avec une URL et une galerie d'images
  constructor(url, gallery) {
    this.imagesGallery = gallery;
    this.galleryLastElement = this.imagesGallery.at(-1);
    this.galleryFirstElement = this.imagesGallery.at(0);

    // Construit la structure DOM et l'ajoute au corps du document
    this.element = this.buildDom(url);
    document.body.appendChild(this.element);

    // Gestionnaires d'événements pour les actions de fermeture, précédente et suivante
    this.onCloseBtnHandler = (e) => this.closeModal(e);
    this.onPreviousBtnHandler = (e) => this.lightBoxPrev(e);
    this.onNextBtnHandler = (e) => this.lightBoxNext(e);

    // Configure les écouteurs d'événements pour répondre aux actions de l'utilisateur
    this.displayEventListeners();
  }

  // Méthode statique pour initialiser LightBox pour toutes les images dans une galerie
  static init() {
    const photographMedias = document.querySelector('#photograph-medias');
    const medias = Array.from(photographMedias.querySelectorAll('img[src$=".jpg"], video[src$=".mp4"]'));
    const gallery = medias.map(media => media.getAttribute('src'));

    // Attache un écouteur d'événements de clic à chaque élément multimédia
    medias.forEach(media => media.addEventListener('click', (e) => {
        e.preventDefault();
        new LightBox(e.currentTarget.getAttribute('src'), gallery);
    }));
  }

  // Configure les écouteurs d'événements pour les actions du clavier et des boutons
  displayEventListeners(){
    document.addEventListener('keyup', (e) => {if (e.key === 'Escape') {this.onCloseBtnHandler(e)}} );
    document.addEventListener('keydown', (e) => {if (e.keyCode === 37) {this.onPreviousBtnHandler(e)}});
    document.addEventListener('keydown', (e) => {if (e.keyCode === 39) {this.onNextBtnHandler(e)}});
    document.querySelector('#lightboxCloseBtn').addEventListener('click', (e) => this.onCloseBtnHandler(e));
    document.querySelector('#lightboxPreviousBtn').addEventListener('click', (e) => this.onPreviousBtnHandler(e));
    document.querySelector('#lightboxNextBtn').addEventListener('click', (e) => this.onNextBtnHandler(e));
  };

  // Supprime les écouteurs d'événements
  removeEventListeners() {
    document.removeEventListener('keyup', this.onCloseBtnHandler);
    document.removeEventListener('keydown', this.onPreviousBtnHandler);
    document.removeEventListener('keydown', this.onNextBtnHandler);
    document.querySelector('#lightboxCloseBtn').removeEventListener('click', this.onCloseBtnHandler);
    document.querySelector('#lightboxPreviousBtn').removeEventListener('click', this.onPreviousBtnHandler);
    document.querySelector('#lightboxNextBtn').removeEventListener('click', this.onNextBtnHandler);
    console.log('écouteurs supprimés');
}


  // Ferme la lightbox
  closeModal(e) {
    this.element.classList.add('opacity-0', 'pointer-events-none');
    this.removeEventListeners();
    
    if(this.element.classList.contains('opacity-0')) {
      setTimeout(() => {
        this.element.remove();
      }, 200)
    }
  }

  // Génère la balise de média en fonction du type (image ou vidéo) et de l'URL
  generateMediaTag(type, url) {
    const mediaAttributes = {
        image: 'class="w-[1050px] h-[750px] object-contain"',
        video: 'class="w-[1050px] h-[750px] object-cover aspect-square" controls autoplay muted'
    };

    return (type === 'image')
    ? `<img id="lightboxImage" ${mediaAttributes.image} src="${url}" alt="test">`
    : `<video id="lightboxVideo" ${mediaAttributes.video} src="${url}" alt="Description de la photo 1">
       Votre navigateur ne prend pas en charge les vidéos
       </video>`;
  }

  // Obtient l'index du média actuel dans la galerie
  getCurrentMediaIndex() {
    const currentMediaSrc = document.querySelector('#lightBoxMedia').firstElementChild.getAttribute('src');
    return this.imagesGallery.indexOf(currentMediaSrc);
  }

  // Affiche le média précédent dans la lightbox
  lightBoxPrev(e){
    e.preventDefault();
    const lightboxMedia = document.querySelector('#lightBoxMedia');
    const currentMediaIndex = this.getCurrentMediaIndex();
    const prevMedia = this.imagesGallery[currentMediaIndex -1];
  
    if (prevMedia) {
      let prevMediaType = prevMedia.endsWith('.jpg') ? 'image' : 'video';
      lightboxMedia.innerHTML = this.generateMediaTag(prevMediaType, this.imagesGallery[currentMediaIndex -1]);
      this.displayNavBtn(prevMedia)
    }
    
  }

  // Affiche le média suivant dans la lightbox
  lightBoxNext(e) {
    e.preventDefault();
    const lightboxMedia = document.querySelector('#lightBoxMedia');
    const currentMediaIndex = this.getCurrentMediaIndex();
    const nextMedia = this.imagesGallery[currentMediaIndex +1]; 

    if (nextMedia) {
      let nextMediaType = nextMedia.endsWith('.jpg') ? 'image' : 'video';
      lightboxMedia.innerHTML = this.generateMediaTag(nextMediaType, nextMedia);
      this.displayNavBtn(nextMedia)
    }
  }

  // Affiche ou masque les boutons de navigation en fonction du média actuel
  displayNavBtn(media) {
    if (media === this.galleryLastElement) {
      document.querySelector('#lightboxNextBtn').innerHTML = '';
    } else {
      document.querySelector('#lightboxNextBtn').innerHTML = '<i class="fa-solid fa-chevron-right hover:text-old-brick-200"></i>';
    }

    if (media === this.galleryFirstElement) {
      document.querySelector('#lightboxPreviousBtn').innerHTML = '';
    } else {
      document.querySelector('#lightboxPreviousBtn').innerHTML = '<i class="fa-solid fa-chevron-left hover:text-old-brick-200"></i>';
    }
  }

  // Construit la structure DOM de la lightbox en fonction de l'URL
  buildDom(url) {
    this.url = url;
    let mediaType = this.url.endsWith('.jpg') ? 'image' : 'video';
    let isLastMedia = this.galleryLastElement === this.url;
    let isFirstMedia = this.galleryFirstElement === this.url;

    const dom = document.createElement('div');
    dom.setAttribute('id', 'lightbox');
    dom.classList.add('lightbox');

    dom.innerHTML = `
    <div id="lightboxContent" class="px-24 py-16 fixed top-0 left-0 w-full min-w-fit right-0 flex justify-center">
      <button id="lightboxPreviousBtn" class="mx-8 text-6xl text-old-brick ">
      ${!isFirstMedia ? `<i class="fa-solid fa-chevron-left hover:text-old-brick-200"></i>` : ''}
      </button>
      <div id="lightboxContainer" class="relative">
        <button id="lightboxCloseBtn" class="absolute left-full text-6xl pl-8 text-old-brick">
          <i class="fa-solid fa-xmark hover:text-old-brick-200"></i>
        </button>
        <div id="lightBoxMedia">
          ${this.generateMediaTag(mediaType, this.url)}
        </div> 
      </div>
      <button id="lightboxNextBtn" class="mx-8 text-6xl text-old-brick ">
        ${!isLastMedia ? `<i class="fa-solid fa-chevron-right hover:text-old-brick-200"></i>` : ''}
      </button>
    </div>
    `;
    return dom;
  }
}
