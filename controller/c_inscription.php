<?php
    //on vérifie les doublons dans la bdd en fonction du pseudo et de l'email
    function verificationDoublon($pdo, $pseudo, $email){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE pseudo_User = :pseudo_User OR email_User = :email_User");
        $stmt->execute(array('pseudo_User' => $pseudo));
        $stmt->execute(array('email_User' => $email));
        
        $result = $stmt->fetchAll();
        print_r($result);

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
            'pass_User'           => $mdp,
        ));
    }

    $verification = verificationDoublon($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']) );
    
    if($verification){
        $view = "";
    }else{
        inscription($pdo, htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['email']), htmlspecialchars(md5($_POST['mdp'])) );
        $view = "";
    }



?>