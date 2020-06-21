<?php

/**
 * On sécurise les données de l'utilisateur
 *
 * @param  string $data
 * @return $data
 */
function dataPurgatory($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>