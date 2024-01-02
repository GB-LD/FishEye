// Fonction contenant les fonctionnalités de la modal de contact
export function contactModalFunctions() {

    // Récupération des éléments HTML nécessaires
    const contactModal = document.querySelector('#contactModal'); 
    const contactModalContent = document.querySelector('#contactModalContent');  
    const openModalBtn = document.querySelector("#openModalBtn");
    const closeModalBtn = document.querySelector('#closeModalBtn');

    // Récupération des éléments du formulaire
    const form = document.querySelector('#contactForm');
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const alertMessageFormElement = document.querySelector('#error-message');

    // Événement pour ouvrir la modal
    openModalBtn.addEventListener('click', () => {
        contactModal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        firstNameInput.focus();
    });

    // Événement pour fermer la modal
    closeModalBtn.addEventListener('click', () => contactModal.classList.add('opacity-0', 'pointer-events-none'));

    // Événement pour fermer la modal lors du clic en dehors du contenu
    contactModal.addEventListener('click', (e) => {
        const closestContent = e.target.closest('#contactModalContent');
        
        if (closestContent !== contactModalContent) {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    contactModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
            openModalBtn.focus();
        }
    })

    // Fonction appelée lorsque le formulaire est valide
    function formisValid() {
        alertMessageFormElement.innerHTML = 'Votre message a bien été envoyé 😃';
        setTimeout(() => {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
        }, 1500);
    }

    // Fonction pour définir un message d'erreur dans le formulaire
    function setErrorFor(message) {
        alertMessageFormElement.innerHTML = message;
    }

    // Fonction pour supprimer les messages d'erreur dans le formulaire
    function removeErrorMessage() {
        alertMessageFormElement.innerHTML = '';
    }

    // Fonction pour vérifier la validité du prénom ou du nom
    function checkName(name, type){
        const nameRegEx = new RegExp("[a-zA-Z]{2,}");
        if (!nameRegEx.test(name.value)) {
          setErrorFor(`Veuillez entrer 2 caractères ou plus dans le champ ${type}`);
            throw new Error()
        } else {
            removeErrorMessage()
        }
    }

    // Fonction pour vérifier la validité de l'email
    function mailIsValid(email, type) {
        const mailRegEx = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
        if (!mailRegEx.test(email.value)) {
          setErrorFor(`Veuillez entrer un email valide ${type}`);
          throw new Error();
        } else {
            removeErrorMessage()
        } 
      }

    // Fonction pour vérifier la validité du message
    function messageIsValid(message, type) {
        const messsageRegex = new RegExp ('^.{40,}$');
        console.log(message.value);
        if (!messsageRegex.test(message.value)) {
            setErrorFor(`Veuillez entrer un message avec 40 caractères minimum dans le ${type}`);
            throw new Error();
          } else {
              removeErrorMessage()
        };
    }
      
    // Événement lors de la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validation des champs du formulaire
        try {
            checkName(firstNameInput, 'Prénom');
            checkName(lastNameInput, 'Nom');
            mailIsValid(emailInput, 'Email');
            
            // Si le formulaire est valide, exécute la fonction correspondante
            formisValid()
        } catch (error) {
            console.error(error)
        }
    })
}
