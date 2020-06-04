<?php
    //on vérifie les logins dans la bdd
    require_once $dossier_model . 'm_users.php';
    $msg = '';

    if(isset($_POST['email'],$_POST['mdp'])){
        $test = verificationLogin($pdo, htmlspecialchars (htmlspecialchars($_POST['email'])), htmlspecialchars(md5($_POST['mdp'])) );
        //si les logins sont bon, on initialise la variable session, sinon KO
        if($test){
            $token = @crypt(htmlspecialchars($_POST['email']), "");
            attributionToken($pdo, htmlspecialchars($_POST['email']), $token);
            $_SESSION["connecté"] = true;
            $id = id_user_by_mail($pdo, htmlspecialchars($_POST['email']));
            $_SESSION["id"] = $id[0]["id_User"];
            $view = 'v_tache.php';
        }else{
            $view = 'v_connexion.php';
            $msg = 'KO-conect';
        }
    }else{
        $view = 'v_connexion.php';
    }

    function verificationLogin($pdo, $email, $mdp){
        $result = count_user_by_email_pass($pdo, $email, $mdp);

        if(count($result) == 1){
            return true;
        }else{
            return false;
        }

        return $result;
    }

    //on attribue un token a l'utilisateur connecté
    function attributionToken($pdo, $email, $token){
        update_token_user($pdo, $email, $token);

    }

    

    


?>