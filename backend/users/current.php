<?php
require_once '../config.php';
require_once 'functions.php';
require_once 'data.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $mail = $_GET['mail'];
    $password = $_GET['password'];
    $role = trim(strtolower($_GET['role']));


    $current_user = fetchCurrentUser($fetchBdd, $db, $role, $mail, $password);
    $user_mail = $current_user["email"];
    $user_password = $current_user["password"];
    $user_id = $current_user["id"];

    var_dump($user_id);

    // Si l'utilisateur existe => Je lui crée un token de connexion et je passe le state logged à true
    // Une fois sur la homepage je check si le "created_by" est null :
    // null je lui affiche un message "en attente de validation de vorte compte par un consultant"
    // non null je lui donne accès à l'app 

    // Côté administrateur, je crée une page avec tous les consultants à valider"
    // Si il coche valider, je change le "created_by" par l'Id de l'administrateur dans la BDD

    // Côté consultant idem que administrateur mais avec les candidats et les recruteurs. 

    $header = [
        'typ' => 'HS256',
        'alg' => 'JWT'
    ];

    $payload = [
        'role' => $role,
        'id' => $id,
    ];

    // $base64Header = base64_encode(json_encode(($header)));
};
