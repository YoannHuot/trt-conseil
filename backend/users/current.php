<?php
require_once '../config.php';
require_once 'functions.php';
require_once 'data.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Data from app 
    $mail = $_GET['mail'];
    $password = $_GET['password'];
    $role = trim(strtolower($_GET['role']));

    $current_user = fetchCurrentUser($fetchBdd, $db, $role, $mail, $password);

    // Data fetched bdd 
    $user_mail = $current_user["email"];
    $user_id = $current_user["id"];
    $user_name = $current_user["nom"];
    $user_firstname = $current_user["prenom"];


    $payload = [
        'roles' => $role,
        'name' => $user_name,
        'firstname' => $user_firstname,
        'mail' => $user_mail
    ];

    if ($user_id) {
        $jwt = getJwtToken($payload, $secret);
        echo $jwt;
    }
};
