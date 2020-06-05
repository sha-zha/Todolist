import { messageModalAdd, messageModalMod, messageInterface } from "./taches.js";

/* --------------------------------------------------------------- */
// Pour le modal ajouter
/* --------------------------------------------------------------- */

// Pour afficher un message de success sur le modal d'ajout
export function messageModalAjoutSuccess(message){
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.remove("invisible");
    messageModalAdd.classList.remove('alert-danger');
    messageModalAdd.classList.add("mb-3");
    messageModalAdd.classList.add('alert-success');
    messageModalAdd.textContent = message;
} 

// Pour afficher un message d'échec sur le modal d'ajout
export function messageModalAjoutErreur(message) {
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.remove("invisible");
    messageModalAdd.classList.add("mb-3");
    messageModalAdd.classList.add('alert-danger');
    messageModalAdd.textContent = message;
}

export function supprimerModalAjoutMessage(){
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.add("invisible");
    messageModalAdd.classList.remove("mb-3");
    messageModalAdd.classList.remove('alert-danger');
    messageModalAdd.classList.remove('alert-success');
}

/* --------------------------------------------------------------- */
// Pour le modal modifier
/* --------------------------------------------------------------- */

// Pour afficher un message de success sur le modal modifier
export function messageModalModSuccess(message) {
    messageModalMod.innerHTML = "";
    messageModalMod.classList.remove("invisible");
    messageModalMod.classList.remove('alert-danger');
    messageModalMod.classList.add("mb-3");
    messageModalMod.classList.add('alert-success');
    messageModalMod.textContent = message;
}

// Pour afficher un message d'erreur sur le modal modifier
export function messageModalModErreur(message) {
    messageModalMod.innerHTML = "";
    messageModalMod.classList.remove("invisible");
    messageModalMod.classList.remove('alert-sucess');
    messageModalMod.classList.add("mb-3");
    messageModalMod.classList.add('alert-danger');
    messageModalMod.textContent = message;
}

// Pour la création des options du modal modifier
export function creerOptionPreSelect(valeur, text) {
    let utilisateurs = document.createElement('option');
    utilisateurs.setAttribute('selected', true);
    utilisateurs.value = valeur;
    utilisateurs.textContent = text;
    listeUtilisateur.appendChild(utilisateurs);
}

export function creerOption(valeur, text) {
    let utilisateurs = document.createElement('option');
    utilisateurs.value = valeur;
    utilisateurs.textContent = text;
    listeUtilisateur.appendChild(utilisateurs);
}

export function supprimerModalModMessage(){
    messageModalMod.innerHTML = "";
    messageModalMod.classList.add("invisible");
    messageModalMod.classList.remove("mb-3");
    messageModalMod.classList.remove('alert-danger');
    messageModalMod.classList.remove('alert-success');
}

/* --------------------------------------------------------------- */
// Pour les messages sur l'interface 
/* --------------------------------------------------------------- */

// Pour afficher un message de success sur l'interface
export function messageInterfaceErreurSuccess(message) {
    messageInterface.innerHTML = "";
    messageInterface.classList.remove("invisible");
    messageInterface.classList.remove("alert-danger");
    messageInterface.classList.add("mt-3");
    messageInterface.classList.add('alert-success');
    messageInterface.textContent = message
}

// Pour afficher un message d'erreur sur l'interface
export function messageInterfaceErreur(message){
    messageInterface.innerHTML = "";
    messageInterface.classList.remove("invisible");
    messageInterface.classList.remove('alert-success');
    messageInterface.classList.add("mt-3");
    messageInterface.classList.add('alert-danger');
    messageInterface.textContent = message;
}

// Pour avoir un délai d'affichage du message success / erreur
export function delaiMessageInterface() {
    let timer = setTimeout(() => {
        messageInterface.innerHTML = "";
        messageInterface.classList.add("invisible");
        messageInterface.classList.remove("mt-3");
        messageInterface.classList.remove('alert-success');
        messageInterface.classList.remove('alert-danger');
    }, 5000);
}