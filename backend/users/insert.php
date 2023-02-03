<?php
require_once '../config.php';
require_once 'functions.php';
require_once 'data.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emailExist = false;

    $all_users = fetchEmails($fetchBdd, $db);
    $emailExist = checkEmail($email, $all_users);


    if ($emailExist === true) {
        echo ("emailExist");

        echo "Cette adresse mail est déjà enregistrée.";
    } else {
        $passwordHashed =   password_hash($password, PASSWORD_BCRYPT);
        if (checkSpy($email)) {
            switch ($role) {
                case "candidats":
                    insertData($db, "candidats", $nom, $prenom, $email, $passwordHashed, $entreprise, $role);
                    break;
                case "recruteurs":
                    $result = insertData($db, "recuteurs", $nom, $prenom, $email, $passwordHashed, $entreprise, $role);
                    break;
                case "consultants":
                    insertData($db, "consultants", $nom, $prenom, $email, $passwordHashed, $entreprise, $role);
                    break;
                case "administrateurs":
                    if (isAdmin($email)) {
                        insertData($db, "administrateurs", $nom, $prenom, $email, $passwordHashed, $entreprise, $role);
                    }
                    break;
            }
        }
    }
};
