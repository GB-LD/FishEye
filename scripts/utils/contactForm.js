export function contactModalFunctions() {

    // Gestion de l'ouverture et fermture de la modale
    const contactModal = document.querySelector('#contactModal'); 
    const contactModalContent = document.querySelector('#contactModalContent');  
    const openModalBtn = document.querySelector("#openModalBtn");
    const closeModalBtn = document.querySelector('#closeModalBtn');

    openModalBtn.addEventListener('click', () => contactModal.classList.remove('hidden', 'opacity-0', 'pointer-events-none'));

    closeModalBtn.addEventListener('click', () => contactModal.classList.add('opacity-0', 'pointer-events-none'));

    contactModal.addEventListener('click', (e) => {
        const closestContent = e.target.closest('#contactModalContent');
        
        if (closestContent !== contactModalContent) {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    //Gestion du formulaire
    const form = document.querySelector('#contactForm');
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const alertMessageFormElement = document.querySelector('#error-message');

    function formisValid() {
        alertMessageFormElement.innerHTML = 'Votre message à bien été envoyé 😃';
        setTimeout(() => {
            contactModal.classList.add('opacity-0', 'pointer-events-none');
        }, 1500);
    }

    function setErrorFor(message) {
        alertMessageFormElement.innerHTML = message;
    }

    function removeErrorMessage() {
        alertMessageFormElement.innerHTML = '';
    }

    function checkName(name, type){
        const nameRegEx = new RegExp("[a-zA-Z]{2,}");
        if (!nameRegEx.test(name.value)) {
          setErrorFor(`Veuillez entrer 2 caractères ou plus dans le champ ${type}`);
            throw new Error()
        } else {
            removeErrorMessage()
        }
    }

    function mailIsValid(email, type) {
        const mailRegEx = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
        if (!mailRegEx.test(email.value)) {
          setErrorFor(`Veuillez entrer un email valide ${type}`);
          throw new Error();
        } else {
            removeErrorMessage()
        } 
      }

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
      

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
            checkName(firstNameInput, 'Prénom');
            checkName(lastNameInput, 'Nom');
            mailIsValid(emailInput, 'Email');
            
            formisValid()
        } catch (error) {
            console.error(error)
        }
    })
}