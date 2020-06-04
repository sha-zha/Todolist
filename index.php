<?php
session_start();




// Base de donnée
require_once 'db/db.php';
// dossier model, view, controller
$dossier_controller = 'php/controller/';
$dossier_model = 'php/model/';
$dossier_view = 'php/view/';

// si deconnexion efface variable session
if (isset($_GET['deconnexion'])) {
    $_SESSION = array();
}
// si utilisateur connecter : page d'accueil tache, si non page de connexion
if (isset($_SESSION['connecté'])) {
    $controller =  'c_tache.php';
} else {
    // si parametre page = insciption, affiche page inscription
    if (isset($_GET['page'])) {
        switch ($_GET['page']) {
            case 'inscription':
                $controller =  'c_inscription.php';
                break;

            default:
                $controller =  'c_connexion.php';
                break;
        }
    } else {
        $controller =  'c_connexion.php';
    }
}


require_once $dossier_controller . $controller;

require_once $dossier_view . $view;
