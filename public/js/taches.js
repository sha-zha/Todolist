import * as affichage from "./messageEcranTache.js";
export { messageModalAdd, messageModalMod, messageInterface };

// Fonctionnalités pour augmenter la rigueur du code
"use strict";

// Nécessaire à l'implémentation
let tacheDescription    = document.querySelector("#tacheDescription");
let tacheFormAjout      = document.querySelector("#tacheFormAjout");
let tacheListe          = document.querySelector("#tacheListe");
let tacheModifier       = document.querySelector('#tacheModifier');
var messageModalAdd     = document.querySelector('#warningModal');
var messageModalMod     = document.querySelector('#warningModalMod');
var messageInterface    = document.querySelector('#warning');
var listeUtilisateur    = document.querySelector('#listeUtilisateur');

// Requete ajax
let method;
let url = "php/tache.php";
let req = new XMLHttpRequest();
let data;

// Notre utilisateur
let utilisateur = document.querySelector("#utilisateur").value;

window.onload = () =>{
    // Fonction pour récupérer les données
    function recupDonnees() {
        method = "GET";
        req.open(method, url, true);
        req.responseType = "json";
        req.send();

        req.onload = () => {
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                let reponse = req.response;
                renduJSON(reponse);
            }
        }
    }

    // Récupérer les données présent en base de données
    recupDonnees();

    // Fonction pour le rendu de notre JSON
    function renduJSON(json) {
        // On regarde si le json contient des données
        if (json != null) {
            tacheListe.innerHTML = "";

            for (let i = 0; i < json.length; i++) {

                // Pour la création node de manière dynamique si on est celui qui a créer
                if (json[i].maitre == utilisateur) {
                    if (json[i].statut == 0) {
                        let tacheDiv = document.createElement("div");
                        tacheDiv.className = `list-group-item  my-2 flex-column align-items-start rounded tache`;
                        tacheDiv.innerHTML = ` 
                    <div class="row pr-3">
                        <div class="col">
                            <p class="mb-1">${json[i].tache}</p>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                        <button id="modifier${i}" class="btn btn-outline-info btnAction" data-toggle="tooltip" data-placement="top" title="Modifier">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                            
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <button id="validation${i}" class="btn btn-outline-success btnAction" data-toggle="tooltip" data-placement="top" title="Valider">
                                <i class="fa fa-calendar-check-o"></i>
                            </button>
                        </div>
                        <div class="col-1 d-flex align-items-center">
                            <button id="supprimer${i}" class="btn btn-outline-danger btnAction" data-toggle="tooltip" data-placement="top" title="Supprimer">
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
                    if (btnModifier != null) {
                        btnModifier.addEventListener('click', (event) => {
                            listeUtilisateur.innerHTML = "";
                            recupDataModal(json[i].id);
                            $('#modalMod').modal('toggle');
                        });
                    }

                    // Supprimer une tâche
                    let btnSupprimer = document.querySelector(`#supprimer${i}`);
                    if (btnSupprimer != null) {
                        btnSupprimer.addEventListener("click", (event) => {
                            if (confirm(`Voulez-vous vraiment supprimer la tâche : ${json[i].tache}`)) {
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
                            <button id="validation${i}" class="btn btn-outline-success btnAction" data-toggle="tooltip" data-placement="top" title="Valider">
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
                if (btnValidation != null) {
                    btnValidation.addEventListener('click', (event) => {
                        if (confirm("Avez-vous terminé votre tache ?")) {
                            validationTache(json[i].id);
                        }
                    });
                }
            }
        } else {
            // Message pour indiquer qu'il ny a pas de données
            tacheListe.innerHTML = "";
            let pasDonnee = document.createElement('div');
            pasDonnee.innerHTML = "Aucune tâche pour le moment";
            tacheListe.appendChild(pasDonnee);
        }
    }

    // Fonction pour gérer le contenu du modal de manière dynamique
    function recupDataModal(tache) {

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
                if (reponse.tache[0].tache.length > 20) {
                    let titre = reponse.tache[0].tache.slice(0, 20);
                    titreModal.textContent = `Tâche: ${titre} ...`;
                } else {
                    let titre = reponse.tache[0].tache;
                    titreModal.textContent = `Tâche: ${titre}`;
                }

                // Cacher ou afficher la possibilité d'attribuer des tâches
                let labelModif = document.querySelector('#labelModif');

                // Fonctionnalités présent si on est le créateur de la tâche
                if (utilisateur == reponse.tache[0].maitre) {

                    if (reponse.users.length != 0){
                        for (let j = 0; j < reponse.users.length; j++) {

                            // On réinitialise à chaque fois
                            listeUtilisateur.innerHTML = "";

                            // On crée les options du sélect
                            affichage.creerOptionPreSelect("", "Choisir un utilisateur");

                            // Pour enlever une attribution
                            affichage.creerOption("reinit", "Remettre à zéro");

                            if (reponse.tache[0].attribuer == reponse.users[j].idUser) {
                                // Si notre utilisateur a déjà attribuer la tâche à quelqu'un
                                affichage.creerOptionPreSelect(reponse.users[j].idUser, reponse.users[j].pseudo);

                            } else if (reponse.tache[0].maitre != reponse.users[j].idUser) {
                                // Avoir les options des utilisateurs en enlevant dans la liste le créateur de la tache
                                affichage.creerOption(reponse.users[j].idUser, reponse.users[j].pseudo);
                            }
                        }
                    }else{
                        // On réinitialise à chaque fois
                        listeUtilisateur.innerHTML = "";

                        // On crée les options du sélect
                        affichage.creerOptionPreSelect("", "Choisir un utilisateur");
                    }

                } else {
                    labelModif.remove();
                    listeUtilisateur.remove();
                }

                // Si on clique sur modifier à l'intérieur du modal
                tacheModifier.addEventListener('submit', event => {
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
                                // Si on a pas d'erreur
                                affichage.messageModalModSuccess(reponse.message);
                                recupDonnees();

                            } else {
                                // Si on a une erreur
                                affichage.messageModalModErreur(reponse.message);
                            }
                        }
                    }
                })
            }
        }
    }

    // Fonction pour supprimer une tâche
    function supprimeTache(tache) {
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
                    affichage.messageInterfaceErreurSuccess(reponse.message);
                    recupDonnees();

                } else {
                    // Si on a une d'erreur
                    affichage.messageInterfaceErreur(reponse.message);
                }

                // Supprimer le message inscrit sur l'interface après 5s
                affichage.delaiMessageInterface();
            }
        }
    }

    //Fonction pour valider la tache
    function validationTache(tache) {
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
                    affichage.messageInterfaceErreurSuccess(reponse.message);
                    recupDonnees();

                } else {
                    // Si on a une d'erreur
                    affichage.messageInterfaceErreur();
                }

                affichage.delaiMessageInterface();
            }
        }
    }

    // Pour créer une tâche
    tacheFormAjout.addEventListener("submit", evnt => {
        evnt.preventDefault();
        method = "POST";

        // Les données de la tâche
        let tache = tacheDescription.value;

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
                    affichage.messageModalAjoutErreur(reponse.message);
                } else {
                    // Si on a pas d'erreur
                    affichage.messageModalAjoutSuccess(reponse.message);
                    recupDonnees();
                    tacheFormAjout.reset();
                }
            } else {
                alert("Une erreur est survenue ! Veuillez reessayer plus tard !");
            }
        }
    });
}