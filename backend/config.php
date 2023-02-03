<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");


// constantes d'environnement 
define("DBHOST", "localhost");
define("DBUSER", "yoann");
define("DBPASS", "yoshi90120");
define("DBNAME", "TRT");

// DSN de connexion 
$dsn = "mysql:dbname=" . DBNAME . ";host=" . DBHOST;

try {
    // instancier PDO : Créer une instance de PDO et connexion à la base
    $db = new PDO($dsn, DBUSER, DBPASS);

    // On s'assure d'envoyer les données en UTF-8 
    $db->exec("SET NAMES utf8");

    // définir le mode de rendu des FETCH
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // On est maintenant connecté
} catch (PDOException $e) {
    echo " Not Connected";
    die($e->getMessage());
}
