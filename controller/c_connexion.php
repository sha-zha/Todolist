<?php
    //on vérifie les logins dans la bdd
    function verificationLogin($pdo, $email, $mdp){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email_User = :email_User AND pass_User = :pass_User");
        $stmt->execute(array('email_User' => $email));
        $stmt->execute(array('pass_User' => $mdp));
        $result = $stmt->fetchAll();

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }

        return $result;
    }
    //on attribue un token a l'utilisateur connecté
    function attributionToken($pdo, $email, $token){
        $stmt = $pdo->prepare("UPDATE users SET token_User = :token_User WHERE email_User = :email_User");
        $result = $stmt->execute(array(
            'email_User'         => $email,
            'token_User'          => $token
        ));

    }
    //on récupère l'id de l'utilisateur qui se connecte
    function recupererID($pdo, $email){
        $stmt = $pdo->prepare("SELECT id_User FROM users WHERE email_User = :email_User");
        $stmt->execute(array('email_User' => $email));
        $result = $stmt->fetchAll();

        return $result;
    }

    $test = verificationLogin($pdo, htmlspecialchars($_POST['email']), htmlspecialchars(md5($_POST['mdp'])) );
    //si les logins sont bon, on initialise la variable session et on lui attribue un token, sinon KO
    if($test){
        $token = @crypt(htmlspecialchars($_POST['email']), "");
        attributionToken($pdo, htmlspecialchars($_POST['email']), $token);
        $id = recupererID($pdo, htmlspecialchars($_POST['email']));
        $_SESSION["id"] = $id[0]["id_User"];
        $_SESSION["connecté"] = 'connecté';
        header('Location: index.php');
        exit();
    }else{
        header('Location: index.php?retour=KO');
        exit();
    }


?>