<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create JWT 

    // Data from app 
    $mail = $_GET['mail'];
    $password = $_GET['password'];
    $role = trim(strtolower($_GET['role']));

    $current_user = checkUserLogin($fetchBdd, $db, $role, $mail, $password);

    // Data fetched bdd 
    $user_mail = $current_user["email"];
    $user_id = $current_user["id"];
    $user_name = $current_user["nom"];
    $user_firstname = $current_user["prenom"];
    $user_validation = $current_user["created_by"];

    $payload = [
        'id' => $user_id,
        'roles' => $role,
        'name' => $user_name,
        'firstname' => $user_firstname,
        'mail' => $user_mail,
        'validation' => $user_validation
    ];

    if($role === "recruteurs") {
        $payload = [
            'id' => $user_id,
            'roles' => $role,
            'name' => $user_name,
            'firstname' => $user_firstname,
            'mail' => $user_mail,
            'validation' => $user_validation,
            'entreprise' => $current_user["entreprise"]
        ];
    }

    if ($user_id) {
        $jwt = getJwtToken($payload, SECRET);
        echo $jwt;
    }
};
