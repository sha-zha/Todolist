//  !!!!!!!!!!!! CODE A REFACTORISE POUR DIMINUER LE NOMBRE DE LIGNE ET SIMPLIFIER LA LECTURE !!!!!!!

// Fonctionnalités pour augmenter la rigueur du code
"use strict";

// Nécessaire à l'implémentation
let tacheDescription = document.querySelector("#tacheDescription");
let tacheFormAjout = document.querySelector("#tacheFormAjout");
let tacheListe = document.querySelector("#tacheListe");
let tacheModifier = document.querySelector('#tacheModifier');
var messageModalAdd = document.querySelector('#warningModal');
var messageModalMod = document.querySelector('#warningModalMod');
var messageInterface = document.querySelector('#warning');

// Requete ajax
let method;
let url = "php/tache.php";
let req = new XMLHttpRequest();
let data;

// Notre utilisateur
let utilisateur = document.querySelector("#utilisateur").value;

// Fonction pour le rendu de notre JSON
function renduJSON(json) {

    // On regarde si le json contient des données
    if (json != null) {
        tacheListe.innerHTML = "";

        for (let i = 0; i < json.length; i++) {

            // Pour la création node de manière dynamique si on est celui qui a créer
            if (json[i].maitre == utilisateur) {
                if (json[i].statut == 0 ) {
                    let tacheDiv = document.createElement("div");
                    tacheDiv.className = `list-group-item  my-2 flex-column align-items-start rounded tache`;
                    tacheDiv.innerHTML = ` 
                    <div class="row pr-3">
                        <div class="col">
                            <p class="mb-1">${json[i].tache}</p>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                        <button id="modifier${i}" class="btn btn-outline-info" data-toggle="tooltip" data-placement="top" title="Modifier">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                            
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <button id="validation${i}" class="btn btn-outline-success" data-toggle="tooltip" data-placement="top" title="Valider">
                                <i class="fa fa-calendar-check-o"></i>
                            </button>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <button id="supprimer${i}" class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Supprimer">
                                 <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>`;
                    tacheListe.appendChild(tacheDiv);
                } 
                
                if (json[i].statut == 1) {
                    let tacheDiv = document.createElement("div");
                    tacheDiv.className = `list-group-item  my-2 flex-column align-items-start rounded fini`;
                    tacheDiv.innerHTML = ` 
                    <div class="row pr-3">
                        <div class="col">
                            <p class="mb-1">${json[i].tache}</p>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <i class="fa fa-check-circle trash-color"></i>
                        </div>
                    </div>`;
                    tacheListe.appendChild(tacheDiv);
                }

                // Mettre à jour une tâche
                let btnModifier = document.querySelector(`#modifier${i}`);
                if(btnModifier != null){
                    btnModifier.addEventListener('click', (event) => {
                        listeUtilisateur.innerHTML = "";
                        recupDataModal(json[i].id);
                        $('#modalMod').modal('toggle');

                    });
                }
            
                // Supprimer une tâche
                let btnSupprimer = document.querySelector(`#supprimer${i}`);
                if(btnSupprimer != null){
                    btnSupprimer.addEventListener("click", (event) => {
                        if (confirm(`Voulez-vous vraiment supprimer la tache : ${json[i].tache}`)) {
                            supprimeTache(json[i].id);
                        }
                    });
                }
            } 
            
            if (json[i].attribuer == utilisateur) {

                // Pour la création node de manière dynamique si on a des tâches attribuer
                if (json[i].statut == 0) {
                    let tacheDiv = document.createElement("div");
                    tacheDiv.className = `list-group-item  my-2 flex-column align-items-start rounded tache`;
                    tacheDiv.innerHTML = ` 
                    <div class="row pr-3">
                        <div class="col">
                            <p class="mb-1">${json[i].tache}</p>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <button id="validation${i}" class="btn btn-outline-success" data-toggle="tooltip" data-placement="top" title="Valider">
                                <i class="fa fa-calendar-check-o" id="validation${i}"></i>
                            </button>
                        </div>
                    </div>`;
                    tacheListe.appendChild(tacheDiv);

                } 
                
                if (json[i].statut == 1) {
                    let tacheDiv = document.createElement("div");
                    tacheDiv.className = `list-group-item  my-2 flex-column align-items-start rounded fini`;
                    tacheDiv.innerHTML = ` 
                    <div class="row pr-3">
                        <div class="col">
                            <p class="mb-1">${json[i].tache}</p>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <i class="fa fa-check-circle trash-color"></i>
                        </div>
                    </div>`;
                    tacheListe.appendChild(tacheDiv);
                }
            }

            // Pour la validation que la tâche est terminé :
            let btnValidation = document.querySelector(`#validation${i}`);
            if (btnValidation != null){
                btnValidation.addEventListener('click', (event) => {

                    console.log("click");
                    if (confirm("Avez-vous terminer votre tache ?")) {
                        validationTache(json[i].id);
                    }
                });
            }
        }
    }else{

        // Message pour indiquer qu'il ny a pas de données
        tacheListe.innerHTML = "";
        let pasDonnee = document.createElement('div');
        pasDonnee.innerHTML = "Aucune tâche pour le moment";
        tacheListe.appendChild(pasDonnee);
    }
}

// Fonction pour gérer le contenu du modal de manière dynamique
function recupDataModal(tache){
    method = "POST";
    data = `tache=${tache}&act=modal`;
    req.open(method, url, true);
    req.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    req.responseType = "json";
    req.send(data);

    req.onload = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            // Contenu du modal dynamique
            let reponse = req.response;
            var titreModal = document.querySelector("#ModalLabel");
            tache2.value = reponse.tache[0].tache;

            // la gestion des titres
            if (reponse.tache[0].tache.length > 20){
                let titre = reponse.tache[0].tache.slice(0, 20);
                titreModal.textContent = `Tâche: ${titre} ...`;
            }else{
                let titre = reponse.tache[0].tache;
                titreModal.textContent = `Tâche: ${titre}`;
            }
            
            // Cacher ou afficher la possibilité d'attribuer des tâches
            let labelModif  = document.querySelector('#labelModif');

            // Fonctionnalités présent si on est le créateur de la tâche
            if(utilisateur == reponse.tache[0].maitre){
                for (let j = 0; j < reponse.users.length; j++) {

                    // On crée les options du sélect
                    let utilisateurs = document.createElement('option');
                    utilisateurs.setAttribute('selected', true);
                    utilisateurs.value = "";
                    utilisateurs.textContent = "Choisir un utilisateur";
                    listeUtilisateur.appendChild(utilisateurs);

                    if (reponse.tache[0].attribuer == reponse.users[j].idUser) {
                        let utilisateurs = document.createElement('option');
                        utilisateurs.setAttribute('selected', true);
                        utilisateurs.value = reponse.users[j].idUser;
                        utilisateurs.textContent = reponse.users[j].pseudo;
                        listeUtilisateur.appendChild(utilisateurs);

                    } else {
                        let utilisateurs = document.createElement('option');
                        utilisateurs.value = reponse.users[j].idUser;
                        utilisateurs.textContent = reponse.users[j].pseudo;
                        listeUtilisateur.appendChild(utilisateurs);
                    }
                }
            }else{
                labelModif.remove();
                listeUtilisateur.remove();
            }
         
            // Si on clique sur modifier à l'intérieur du modal
            let tacheModifier = document.querySelector('#tacheModifier');
            tacheModifier.addEventListener('submit', event =>{
                event.preventDefault();
                method = "POST";
                data = `utilisateur=${listeUtilisateur.value}&tache=${reponse.tache[0].id}&description=${tache2.value}&act=update`;
                
                req.open(method, url, true);
                req.responseType = "json";
                req.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
                req.send(data);

                req.onload = () => {
                    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                        let reponse = req.response;
                        
                        if (reponse.success) {
                            // Si on a une erreur
                            messageModalMod.innerHTML = "";
                            messageModalMod.classList.remove("invisible");
                            messageModalMod.classList.remove('alert-danger');
                            messageModalMod.classList.add("mb-3");
                            messageModalMod.classList.add('alert-success');
                            messageModalMod.textContent = reponse.message;
                            recupDonnees();

                        } else {

                            // Si on a pas d'erreur
                            messageModalMod.innerHTML = "";
                            messageModalMod.classList.remove("invisible");
                            messageModalMod.classList.remove('alert-sucess');
                            messageModalMod.classList.add("mb-3");
                            messageModalMod.classList.add('alert-danger');
                            messageModalMod.textContent = reponse.message;
                            
                        }
                    }
                }
            })

        }
    }
}

// Fonction pour récupérer les données
function recupDonnees(){
    method = "GET";
    req.open(method, url, true);
    req.responseType = "json";
    req.send();

    req.onload = () =>{
        if(req.readyState === XMLHttpRequest.DONE && req.status === 200){
            let reponse = req.response;
            renduJSON(reponse);
        }
    }
}

// Fonction pour supprimer une tâche
function supprimeTache(tache){
    method = "POST";
    data = `tache=${tache}&act=delete`;
    req.open(method, url, true);
    req.responseType = "json";
    req.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    req.send(data);

    req.onload = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            let reponse = req.response;

            if (reponse.success) {
                // Si on n'a pas une erreur
                messageInterface.innerHTML = "";
                messageInterface.classList.remove("invisible");
                messageInterface.classList.remove("alert-danger");
                messageInterface.classList.add("mt-3");
                messageInterface.classList.add('alert-success');
                messageInterface.textContent = reponse.message;
                recupDonnees();

            } else {

                // Si on a une d'erreur
                messageInterface.innerHTML = "";
                messageInterface.classList.remove("invisible");
                messageInterface.classList.remove('alert-success');
                messageInterface.classList.add("mt-3");
                messageInterface.classList.add('alert-danger');
                messageInterface.textContent = reponse.message;
                
            }
            
            setTimeout(() => {
                messageInterface.innerHTML = "";
                messageInterface.classList.add("invisible");
                messageInterface.classList.remove("mt-3");
                messageInterface.classList.remove('alert-success');
                messageInterface.classList.remove('alert-danger');
            }, 5000);
        }
    }
}

//Fonction pour valider la tache
function validationTache(tache){
    method = "POST";
    data = `tache=${tache}&act=validation`;
    req.open(method, url, true);
    req.responseType = "json";
    req.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    req.send(data);

    req.onload = () => {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            let reponse = req.response;

            if (reponse.success) {
                // Si on n'a pas une erreur
                messageInterface.innerHTML = "";
                messageInterface.classList.remove("invisible");
                messageInterface.classList.remove("alert-danger");
                messageInterface.classList.add("mt-3");
                messageInterface.classList.add('alert-success');
                messageInterface.textContent = reponse.message;
                recupDonnees();

            } else {

                // Si on a une d'erreur
                messageInterface.innerHTML = "";
                messageInterface.classList.remove("invisible");
                messageInterface.classList.remove('alert-success');
                messageInterface.classList.add("mt-3");
                messageInterface.classList.add('alert-danger');
                messageInterface.textContent = reponse.message;

            }

            setTimeout(() => {
                messageInterface.innerHTML = "";
                messageInterface.classList.add("invisible");
                messageInterface.classList.remove("mt-3");
                messageInterface.classList.remove('alert-success');
                messageInterface.classList.remove('alert-danger');
            }, 5000);
        }
    }
}

// get data
recupDonnees();

// Pour créer une tâche
tacheFormAjout.addEventListener("submit", evnt =>{
    evnt.preventDefault();
    method = "POST";

    // Les données de la tâche
    let tache = tacheDescription.value;

    // On vérifie qu'on a bien une description de la tâche
    if(tache.length == 0){

        // Si on a une erreur
        messageModalAdd.innerHTML = "";
        messageModalAdd.classList.remove("invisible");
        messageModalAdd.classList.add("mb-3");
        messageModalAdd.classList.add('alert-danger');
        messageModalAdd.textContent = "La description ne peut pas être vide";

    }else{

        // cacher le message d'erreur
        messageModalAdd.innerHTML = "";
        messageModalAdd.classList.add("invisible");
        messageModalAdd.classList.remove("mb-3");
        messageModalAdd.classList.remove('alert-danger');

        // On envoie les données 
        data = `tache=${tache}&utilisateur=${utilisateur}&act=add`;

        req.open(method, url, true);
        req.responseType = "json";
        req.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
        req.send(data);

        req.onload = () => {
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                let reponse = req.response;

                if (reponse.error) {
                    // Si on a une erreur
                    messageModalAdd.innerHTML = "";
                    messageModalAdd.classList.remove("invisible");
                    messageModalAdd.classList.add("mb-3");
                    messageModalAdd.classList.add('alert-danger');
                    messageModalAdd.textContent = reponse.message;
            
                } else {

                    // Si on a pas d'erreur
                    messageModalAdd.innerHTML = "";
                    messageModalAdd.classList.remove("invisible");
                    messageModalAdd.classList.remove('alert-danger');
                    messageModalAdd.classList.add("mb-3");
                    messageModalAdd.classList.add('alert-success');
                    messageModalAdd.textContent = reponse.message;
                    recupDonnees();
                    tacheFormAjout.reset();
                }

            } else {
                alert("Une erreur est survenue ! Veuillez reessayer plus tard !");
            }
        }
    }
});

// Supprimer les message erreur / success à la fermeture du modal
let fermetureModalAjout = document.querySelector("#closeAdd");
fermetureModalAjout.addEventListener("click", ()=>{
    messageModalAdd.innerHTML = "";
    messageModalAdd.classList.add("invisible");
    messageModalAdd.classList.remove("mb-3");
    messageModalAdd.classList.remove('alert-danger');
    messageModalAdd.classList.remove('alert-success');
});

let fermetureModalMod = document.querySelector("#closeMod");
fermetureModalMod.addEventListener("click", () => {
    messageModalMod.innerHTML = "";
    messageModalMod.classList.add("invisible");
    messageModalMod.classList.remove("mb-3");
    messageModalMod.classList.remove('alert-danger');
    messageModalMod.classList.remove('alert-success');
});