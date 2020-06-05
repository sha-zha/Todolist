<?php

// On supprime les anti-slash / Convertit les caractères spéciaux en entités HTML
function dataPurgatory($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>