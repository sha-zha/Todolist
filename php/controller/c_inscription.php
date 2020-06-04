<?php
    require_once $dossier_model . 'm_users.php';
    if(isset($_POST['pseudo'],$_POST['email'],$_POST['mdp'])){
        $verificationMdp = mdpIdentique(htmlspecialchars(md5($_POST['mdp'])), htmlspecialchars(md5($_POST['mdp2'])));
        $verificationEmail = verificationEmail(htmlspecialchars($_POST['email']));
        $verificationDoublon = verificationDoublon($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']) );
        
        if($verificationDoublon || !$verificationEmail || !$verificationMdp){
            $view = "v_inscription.php";
            $erreur = "KO";
        }else{
            inscription($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']), htmlspecialchars(md5($_POST['mdp'])) );
            $view = "v_connexion.php";
        }
    }else{
        $view =  "v_inscription.php";
    }

    //on vérifie les doublons dans la bdd en fonction du pseudo et de l'email
    function verificationDoublon($pdo, $pseudo, $email){
        $result = count_user_by_pseudo_email($pdo, $pseudo, $email);

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }

    }
    //on entre les info dans la bdd pour l'inscription
    function inscription($pdo, $pseudo, $mail, $mdp){
        add_user($pdo, $pseudo, $mail, $mdp);
    }

    //on vérifie que les deux mdp sont identiques
    function mdpIdentique($mdp1, $mdp2){
        if($mdp1 == $mdp2){
            return true;
        }else{
            return false;
        }
    }
    //on vérifie que l'email est un email
    function verificationEmail($email){
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    

    



?>