<?php
session_start();

// required to manipulate data
include './function.php';

// required to use json / to use a minimal security
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

$testSession = (int) dataPurgatory($_SESSION['id']);

if($testSession != 0){
    /** @var string $utilisateurID variable de session */
    $utilisateurID = (int) dataPurgatory($_SESSION['id']);
}

/**
 * Pattern de regex afin d'éviter l'envoi d'un espace en tant que 1ere chaine de caractère.
 * Ici il faut au moins avoir des chiffres et des lettres
 * 
 * @var string $pattern Regex
 */
$pattern = "/^[\s]*(?=.*[a-zA-Z0-9])/";

if(isset($_SESSION['connecté'])){

    /**
     * Pour récupérer les taches attribuées et créer par notre utilisateur
     * 
     * Nécessite d'avoir l'id de l'utilisateur en session. Ensuite, on récupère
     * les tâches attribuées ou créées qui sont envoyer au format JSON au front-end
     * @return array JSON 
     */
    function lireDonnee(){
        require "../db/db.php";
        global $utilisateurID;

        $reqLireDonnees = "SELECT * FROM Tasks WHERE id_User_attribuer = ? OR id_User_Creer = ?";
        $lireDonnee     = $pdo->prepare($reqLireDonnees);
        $lireDonnee->execute(array($utilisateurID, $utilisateurID));

        while ($donnees = $lireDonnee->fetch()) {
            $donneesTache[] = [
                "id"     => $donnees['id_Task'],
                "tache"  => $donnees['task_Task'],
                "statut" => $donnees['status_Task'],
                "maitre" => $donnees['id_User_Creer'],
                "attribuer" => $donnees['id_User_attribuer']
            ];
        }

        echo json_encode($donneesTache);
        $pdo = null;
    };

    /**
     * Ajouter une tache à l'interface de notre utilisateur
     * 
     * @return array JSON ( contenant le message de succès ou d'erreur )
     */
    function ajouter(){
        global $pattern;
        $tache          = dataPurgatory($_POST['tache']);
        $idUtilisateur  = (int) dataPurgatory($_POST['utilisateur']);

        if (!empty($tache) && preg_match($pattern, $tache)) {

            // On vérifie que l'id de l'utilisateur est bien un int
            if ($idUtilisateur != 0) {
                $limiteCaractere = 120;
                $nbCaractere = strlen($tache);

                // On vérifie le nombre de caractère de la tache
                if ($nbCaractere <= $limiteCaractere) {
                    require "../db/db.php";
                    $reqAjout = "INSERT INTO Tasks (task_Task, id_User_Creer) values (?,?)";
                    $ajout    = $pdo->prepare($reqAjout);
                    $ajout->execute(array($tache, $idUtilisateur));

                    $message = [
                        'error' => false,
                        'message' => 'La tâche a bien été ajoutée !'
                    ];
                } else {
                    $message = [
                        'error' => true,
                        'message' => 'Vous êtes limité à 120 caractères !'
                    ];
                }
            }
        } else {
            $message = [
                'error' => true,
                'message' => 'Votre tâche doit contenir au minimum un chiffre ou une lettre !'
            ];
        }
        echo json_encode($message);
        $pdo = null;
    };

    /**
     * Générer dynamiquement le contenu du modal
     * 
     * Cette fonction a pour but de nous donner les informations du modal :
     * 
     * - Les informations de la tâche
     * - La liste des utilisateurs pour une futur attribution 
     *
     * Ces informations sont ensuite envoyées à notre front end
     * 
     * @return array JSON
     */
    function modalData(){
        require "../db/db.php";
        global $utilisateurID;
        $idTache = (int) dataPurgatory($_POST['tache']);

        // On vérifie que l'id est bien un int
        if ($idTache != 0) {
            $reqTache = $pdo->prepare("SELECT * FROM Tasks WHERE id_Task = ?");
            $reqTache->execute(array($idTache));

            $reqUser = $pdo->prepare("SELECT * FROM Users WHERE NOT id_User = ?");
            $reqUser->execute(array($utilisateurID));
            $tabUtilisateur = [];

            while ($user = $reqUser->fetch()) {
                $tabUtilisateur[] = [
                    "idUser" => $user['id_User'],
                    "pseudo" => $user['pseudo_User']
                ];
            }

            while ($tache = $reqTache->fetch()) {
                $donneesTache[] = [
                    "id"     => $tache['id_Task'],
                    "tache"  => $tache['task_Task'],
                    "statut" => $tache['status_Task'],
                    "attribuer" => $tache['id_User_attribuer'],
                    "maitre" => $tache['id_User_Creer']
                ];
            }

            $data = [
                "tache" => $donneesTache,
                "users" => $tabUtilisateur
            ];

            echo json_encode($data);
            $pdo = null;
        }
    }

    /**
     * Mettre à jour les informations concernant une tâche
     * 
     * On peut ici influencer sur les éléménts suivants :
     * 
     * - Modifier la description de la tâche
     * - Attribuer la tâche à un utilisateur
     * - Réinitialiser l'attribution de la tâche
     *
     * @return array JSON ( contenant le message de succès ou d'erreur )
     */
    function mettreAJour(){
        require "../db/db.php";
        global $pattern;

        $idUtilisateur  = dataPurgatory($_POST['utilisateur']);
        $idTache        = (int) dataPurgatory($_POST['tache']);
        $description    = dataPurgatory($_POST['description']);

        if (!empty($description) && preg_match($pattern, $description)) {
            $idUtilisateur = (int) $idUtilisateur;

            // Dans le cas où nous avons un id utilisateur / tache -> donc une attribution
            if (!empty($description) && !empty($idUtilisateur) && $idUtilisateur != 0) {
                $reqMettreAJour = "UPDATE Tasks SET task_Task = ? , id_User_attribuer = ? WHERE id_Task = ?";
                $mettreAJour = $pdo->prepare($reqMettreAJour);
                $mettreAJour->execute(array($description, $idUtilisateur, $idTache));

                $message = [
                    'success' => true,
                    'message' => 'La tâche a bien été attribuée !'
                ];
            } else {
                $message = [
                    'success' => false,
                    'message' => 'La description de la tâche ne peut pas être vide !'
                ];
            }
        
            // On met uniquement à jour la tache sans attribuer à un utilisateur
            if ($idUtilisateur == 0) {
                $reqMettreAJour = "UPDATE Tasks SET task_Task = ? WHERE id_Task = ?";
                $mettreAJour = $pdo->prepare($reqMettreAJour);
                $mettreAJour->execute(array($description, $idTache));

                $message = [
                    'success' => true,
                    'message' => 'La tâche a bien été modifiée !'
                ];
            }

        } else {
            $message = [
                'success' => false,
                'message' => 'Votre tâche doit contenir au minimum un chiffre ou une lettre !'
            ];
        }

        // Réinitialiser l'attribution 
        if ($idUtilisateur ==  "reinit" && !empty($description)) {
            $reqMettreAJour = "UPDATE Tasks SET id_User_attribuer = ? WHERE id_Task = ?";
            $mettreAJour = $pdo->prepare($reqMettreAJour);
            $mettreAJour->execute(array(null, $idTache));

            $message = [
                'success' => true,
                'message' => 'La tâche a bien été modifiée !'
            ];
        }

        echo json_encode($message);
        $pdo = null;
    }
   
    /**
     * Supprime la tache
     * 
     * On supprime une tâche après avoir reçu l'id de celui-ci dans notre requête
     *
     * @return array JSON ( contenant le message de succès ou d'erreur )
     */
    function supprimer(){
        require "../db/db.php";
        global $utilisateurID;
        $idTache = (int) dataPurgatory($_POST['tache']);

        if ($idTache != 0) {

            // On récupère l'id de l'utilisateur qui a créer la tâche
            $verificationMaitre = "SELECT id_User_Creer FROM Tasks WHERE id_Task = ?";
            $reqConfirmationSupp = $pdo->prepare($verificationMaitre);
            $reqConfirmationSupp->execute(array($idTache));
            $idMaitreTask = $reqConfirmationSupp->fetch();

            // On vérifie que notre utilisateur possède les droits de supprimer la tâche
            if ($idMaitreTask['id_User_Creer'] == $utilisateurID) {
                $reqSuppression = "DELETE FROM Tasks WHERE id_Task = ?";
                $supp = $pdo->prepare($reqSuppression);
                $supp->execute(array($idTache));

                $message = [
                    'success' => true,
                    'message' => 'La tâche a bien été supprimée !'
                ];
            } else {
                $message = [
                    'success' => false,
                    'message' => 'Vous ne pouvez pas faire cette action'
                ];
            }
            echo json_encode($message);
        }
        $pdo = null;
    };

    /**
     * Fonction permettant de valider une tâche
     * 
     * Suivant l'id de la tâche, on va mettre à jour le statut est à true (1). Par défaut le statut est à false (0).
     *
     *  @return array JSON ( contenant le message de succès ou d'erreur )
     */
    function validationTache(){
        require "../db/db.php";
        $idTache = (int) dataPurgatory($_POST['tache']);

        if ($idTache != 0) {

            // On vérifie met a jour le statut de notre tache
            $reqValidation = "UPDATE Tasks SET status_Task = ? WHERE id_Task = ?";
            $validation = $pdo->prepare($reqValidation);
            $validation->execute(array(1, $idTache));

            $message = [
                'success' => true,
                'message' => 'La tâche a bien été validée !'
            ];
        } else {
            $message = [
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de la validation !'
            ];
        }
        echo json_encode($message);
        $pdo = null;
    }

    // swicth pour facilité le traitement des différentes requêtes
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $act = dataPurgatory($_POST['act']);

        switch ($act) {
            case 'add':
                ajouter();
                break;
            case 'update':
                mettreAJour();
                break;
            case 'delete':
                supprimer();
                break;
            case 'modal':
                modalData();
                break;
            case 'validation':
                validationTache();
                break;
            default:
                lireDonnee();
                break;
        }
    } else {
        lireDonnee();
    }

} else {
    header("HTTP/1.0 404 Not Found");
    header('location: /');
}