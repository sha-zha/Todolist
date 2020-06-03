<?php
try{
    $pdo = new PDO('sqlite:'.dirname(__FILE__).'/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // ERRMODE_WARNING | ERRMODE_EXCEPTION | ERRMODE_SILENT
} catch(Exception $e) {
    echo "Impossible d'accéder à la base de données SQLite : ".$e->getMessage();
    die();
}

$pdo->query(
    "CREATE TABLE IF NOT EXISTS Users (
    id_User INTEGER AUTO_INCREMENT NOT NULL, 
    pseudo_User VARCHAR(100), 
    email_User VARCHAR(255), 
    pass_User VARCHAR(100), 
    token_User VARCHAR(100), 
    PRIMARY KEY (id_User)
    );"
);

$pdo->query(
    "CREATE TABLE IF NOT EXISTS Tasks (
    id_Task INTEGER AUTO_INCREMENT NOT NULL, 
    task_Task VARCHAR(120), 
    status_Task BOOLEAN, 
    id_User_attibuer INT(3), 
    id_User_Creer INT(3) NOT NULL, 
    FOREIGN KEY (id_User_attibuer) REFERENCES User (id_User),
    FOREIGN KEY (id_User_Creer) REFERENCES User (id_User),
    PRIMARY KEY (id_Task)
    );"
);


?>