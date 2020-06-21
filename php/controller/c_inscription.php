<?php

    /**
     * Gestion de l'inscription / de la redirection vers la connexion
     *  
     * On fait une comparaison des valeurs boolean des fonctions de vérification suivantes :
     * * Fonction vérification du mot de passe    : mdpIdentique($mdp1, $mdp2);
     * * Fonction vérification de l'adresse email : verificationEmail($email);
     * * Fonction vérification des doublons       : verificationDoublon($pdo, $pseudo, $email));
     * 
     * @param string $_POST['pseudo']
     * @param string $_POST['email']
     * @param string $_POST['mdp']
     */

    require_once $dossier_model . 'm_users.php';
    $msg = "";


    if(isset($_POST['pseudo'], $_POST['email'],$_POST['mdp'])){
        $verificationMdp     = mdpIdentique(htmlspecialchars(md5($_POST['mdp'])), htmlspecialchars(md5($_POST['mdp2'])));
        $verificationEmail   = verificationEmail(htmlspecialchars($_POST['email']));
        $verificationDoublon = verificationDoublon($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']) );
        
        if($verificationDoublon || !$verificationEmail || !$verificationMdp){
            $msg = "KO-insc";
            $view = "v_inscription.php";
        }else{
            inscription($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']), htmlspecialchars(md5($_POST['mdp'])) );
            $msg = "OK-insc";
            $view = "v_connexion.php";
        }
    }else{
        $view =  "v_inscription.php";
    }

    /**
     * on vérifie les doublons dans la bdd en fonction du pseudo et de l'email 
     *
     * @param  object $pdo Connexion à la BDD
     * @param  string $pseudo
     * @param  string $email
     * @return bool
     */
    function verificationDoublon($pdo, $pseudo, $email){
        $result = count_user_by_pseudo_email($pdo, $pseudo, $email);

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }
    }

    /**
     * on entre les info dans la bdd pour l'inscription   
     *
     * @param  object $pdo Connexion à la BDD
     * @param  string $pseudo
     * @param  string $mail
     * @param  string $mdp
     * @return void
     */
    function inscription($pdo, $pseudo, $mail, $mdp){
        add_user($pdo, $pseudo, $mail, $mdp);
    }

    /**
     * on vérifie que les deux mdp sont identiques  
     *
     * @param  string $mdp1
     * @param  string $mdp2
     * @return bool
     */
    function mdpIdentique($mdp1, $mdp2){
        if($mdp1 == $mdp2){
            return true;
        }else{
            return false;
        }
    }

    /**
     * on vérifie que l'email est un email   
     *
     * @param  string $email
     * @return bool
     */
    function verificationEmail($email){
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }
?>