<?php
    //on vérifie les logins dans la bdd
    function verificationLogin($pdo, $email, $mdp){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email_User = :email_User AND pass_User = :pass_User");
        $stmt->execute(array('email_User' => $email));
        $stmt->execute(array('pass_User' => $mdp));
        $result = $stmt->fetchAll();
        print_r($result);

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }

        return $result;
    }

    $test = verificationLogin($pdo, htmlspecialchars (htmlspecialchars($_POST['email'])), htmlspecialchars(md5($_POST['mdp'])) );
    //si les logins sont bon, on initialise la variable session, sinon KO
    if($test){
        $_SESSION["connecté"] = 'connecté';
        header('Location: index.php');
        exit();
    }else{
        header('Location: index.php?retour=KO');
        exit();
    }


?>