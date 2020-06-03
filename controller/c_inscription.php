<?php
    //on vérifie les doublons dans la bdd en fonction du pseudo et de l'email
    function verificationDoublon($pdo, $pseudo, $email){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE pseudo_User = :pseudo_User OR email_User = :email_User");
        $stmt->execute(array('pseudo_User' => $pseudo));
        $stmt->execute(array('email_User' => $email));
        
        $result = $stmt->fetchAll();

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }

    }
    //on entre les info dans la bdd pour l'inscription
    function inscription($pdo, $pseudo, $mail, $mdp){
        $stmt = $pdo->prepare("INSERT INTO users (pseudo_User, email_User, pass_User) VALUES (:pseudo_User, :email_User, :pass_User)");
        $result = $stmt->execute(array(
            'pseudo_User'         => $pseudo,
            'email_User'          => $mail,
            'pass_User'           => $mdp
        ));
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

    $verificationMdp = mdpIdentique(htmlspecialchars(md5($_POST['mdp'])), htmlspecialchars(md5($_POST['mdp2'])));
    $verificationEmail = verificationEmail(htmlspecialchars($_POST['email']));
    $verificationDoublon = verificationDoublon($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']) );
    
    if($verificationDoublon || !$verificationEmail || !$verificationMdp){
        $view = "";
    }else{        
        inscription($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']), htmlspecialchars(md5($_POST['mdp'])));
        $view = "";
    }


?>