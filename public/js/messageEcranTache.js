import { messageModalAdd, messageModalMod, messageInterface } from "./taches.js";

/**
 * Fonction pour l'affichage d'un message de succès
 * 
 * On permet ici d'avoir un message sur le modal ajout de manière asynchrone.
 * @param {string} message 
 */
export function messageModalAjoutSuccess(message){
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.remove("invisible");
    messageModalAdd.classList.remove('alert-danger');
    messageModalAdd.classList.add("mb-3");
    messageModalAdd.classList.add('alert-success');
    messageModalAdd.textContent = message;
} 

/**
 * Fonction pour l'affichage d'un message d'erreur
 * 
 * On permet ici d'avoir une message d'erreur sur le modal d'ajout
 * @param {string} message 
 */
export function messageModalAjoutErreur(message) {
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.remove("invisible");
    messageModalAdd.classList.add("mb-3");
    messageModalAdd.classList.add('alert-danger');
    messageModalAdd.textContent = message;
}

/**
 * Fonction pour supprimer les messages afficher sur le modal d'ajout
 */
export function supprimerModalAjoutMessage(){
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.add("invisible");
    messageModalAdd.classList.remove("mb-3");
    messageModalAdd.classList.remove('alert-danger');
    messageModalAdd.classList.remove('alert-success');
}

/**
 * Fonction pour l'affichage d'un message de succès
 *
 * On permet ici d'avoir un message sur le modal de modification de manière asynchrone.
 * @param {string} message
 */
export function messageModalModSuccess(message) {
    messageModalMod.innerHTML = "";
    messageModalMod.classList.remove("invisible");
    messageModalMod.classList.remove('alert-danger');
    messageModalMod.classList.add("mb-3");
    messageModalMod.classList.add('alert-success');
    messageModalMod.textContent = message;
}

// Pour afficher un message d'erreur sur le modal modifier
/**
 * Fonction pour l'affichage d'un message d'erreur
 *
 * On permet ici d'avoir une message d'erreur sur le modal de modification
 * @param {string} message
 */
export function messageModalModErreur(message) {
    messageModalMod.innerHTML = "";
    messageModalMod.classList.remove("invisible");
    messageModalMod.classList.remove('alert-sucess');
    messageModalMod.classList.add("mb-3");
    messageModalMod.classList.add('alert-danger');
    messageModalMod.textContent = message;
}

/**
 * Pour la création des options du modal de modification qui sont pré-sélectionnées
 * @param {string} valeur 
 * @param {string} text 
 */
export function creerOptionPreSelect(valeur, text) {
    let utilisateurs = document.createElement('option');
    utilisateurs.setAttribute('selected', true);
    utilisateurs.value = valeur;
    utilisateurs.textContent = text;
    listeUtilisateur.appendChild(utilisateurs);
}

/**
 * Pour la création des options du modal de modification
 * @param {string} valeur 
 * @param {string} text 
 */
export function creerOption(valeur, text) {
    let utilisateurs = document.createElement('option');
    utilisateurs.value = valeur;
    utilisateurs.textContent = text;
    listeUtilisateur.appendChild(utilisateurs);
}

/**
 * Pour supprimer les messages du modal de modification
 */
export function supprimerModalModMessage(){
    messageModalMod.innerHTML = "";
    messageModalMod.classList.add("invisible");
    messageModalMod.classList.remove("mb-3");
    messageModalMod.classList.remove('alert-danger');
    messageModalMod.classList.remove('alert-success');
}

/**
 * Pour afficher un message de success sur l'interface front où sont listées les tâches
 * @param {string} message 
 */
export function messageInterfaceErreurSuccess(message) {
    messageInterface.innerHTML = "";
    messageInterface.classList.remove("invisible");
    messageInterface.classList.remove("alert-danger");
    messageInterface.classList.add("mt-3");
    messageInterface.classList.add('alert-success');
    messageInterface.textContent = message
}

/**
 * Pour afficher un message de erreur sur l'interface front où sont listées les tâches
 * @param {string} message 
 */
export function messageInterfaceErreur(message){
    messageInterface.innerHTML = "";
    messageInterface.classList.remove("invisible");
    messageInterface.classList.remove('alert-success');
    messageInterface.classList.add("mt-3");
    messageInterface.classList.add('alert-danger');
    messageInterface.textContent = message;
}

/**
 * Pour supprimer le message afficher sur l'interface front après 5s
 */
export function delaiMessageInterface() {
    let timer = setTimeout(() => {
        messageInterface.innerHTML = "";
        messageInterface.classList.add("invisible");
        messageInterface.classList.remove("mt-3");
        messageInterface.classList.remove('alert-success');
        messageInterface.classList.remove('alert-danger');
    }, 5000);
}