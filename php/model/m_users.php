<?php
function count_user_by_pseudo_email($pdo, $pseudo, $email){
    $stmt = $pdo->prepare("SELECT * FROM users WHERE pseudo_User = :pseudo_User OR email_User = :email_User");
    $stmt->execute(array('pseudo_User' => $pseudo));
    $stmt->execute(array('email_User' => $email));    
    $result = $stmt->fetchAll();
    return $result;
}

function add_user($pdo, $pseudo, $mail, $mdp){
    $stmt = $pdo->prepare("INSERT INTO users (pseudo_User, email_User, pass_User) VALUES (:pseudo_User, :email_User, :pass_User)");
        $result = $stmt->execute(array(
            'pseudo_User'         => $pseudo,
            'email_User'          => $mail,
            'pass_User'           => $mdp,
        ));
}

function count_user_by_email_pass($pdo, $email, $mdp){
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email_User = :email_User AND pass_User = :pass_User");
    $stmt->execute(array('email_User' => $email));
    $stmt->execute(array('pass_User' => $mdp));
    $result = $stmt->fetchAll();
    return $result;
}

function update_token_user($pdo, $email, $token){
    $stmt = $pdo->prepare("UPDATE users SET token_User = :token_User WHERE email_User = :email_User");
        $result = $stmt->execute(array(
            'email_User'         => $email,
            'token_User'          => $token
        ));
    }