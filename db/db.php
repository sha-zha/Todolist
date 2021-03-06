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
    id_User INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo_User VARCHAR(100) NOT NULL, 
    email_User VARCHAR(255) NOT NULL, 
    pass_User VARCHAR(100) NOT NULL, 
    token_User VARCHAR(100)
    );"
);

$pdo->query(
    "CREATE TABLE IF NOT EXISTS Tasks (
    id_Task INTEGER PRIMARY KEY AUTOINCREMENT,
    task_Task VARCHAR(120) NOT NULL, 
    status_Task BOOLEAN DEFAULT 0, 
    id_User_attribuer INT(3), 
    id_User_Creer INT(3) NOT NULL, 
    FOREIGN KEY (id_User_attribuer) REFERENCES User (id_User),
    FOREIGN KEY (id_User_Creer) REFERENCES User (id_User)
    );"
);

?>