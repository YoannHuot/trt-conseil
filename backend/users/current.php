<?php
require_once '../config.php';
require_once 'functions.php';
require_once 'data.php';
require_once 'private-key.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mail = $_GET['mail'];
    $password = $_GET['password'];
    $role = trim(strtolower($_GET['role']));


    $current_user = fetchCurrentUser($fetchBdd, $db, $role, $mail, $password);

    $user_mail = $current_user["email"];
    $user_password = $current_user["password"];
    $user_id = $current_user["id"];
    $user_name = $current_user["nom"];
    $user_firstname = $current_user["prenom"];



    // Si l'utilisateur existe => Je lui crée un token de connexion et je passe le state logged à true
    // Une fois sur la homepage je check si le "created_by" est null :
    // null je lui affiche un message "en attente de validation de vorte compte par un consultant"
    // non null je lui donne accès à l'app 

    // Côté administrateur, je crée une page avec tous les consultants à valider"
    // Si il coche valider, je change le "created_by" par l'Id de l'administrateur dans la BDD

    // Côté consultant idem que administrateur mais avec les candidats et les recruteurs. 

    $header = [
        'typ' => 'JWT',
        'alg' => 'HS256'
    ];

    $payload = [
        'user_id' => $user_id,
        'roles' => $role,
        'name' => $user_name,
        'firstname' => $user_firstname
    ];


    if ($user_id) {
        $header = base64UrlEncode($header);
        $payload = base64UrlEncode($payload);

        // on génère la signature
        $secret = base64_encode(SECRET);
        var_dump($secret);

        $signature = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
        $signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        var_dump($signature);
        $jwt = "$header.$payload.$signature";
        echo $jwt;
    }
};
