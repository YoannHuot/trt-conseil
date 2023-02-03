<?php

/*
* Récupération de toutes les adresses emails de tous les utilisateurs pour checker les validités.
*/
function fetchEmails($fetchBdd, $db)
{
    $all_users = array();
    foreach ($fetchBdd as $role => $query) {
        $all_users[$role] = array();
        $requete = $db->query($query);
        $result = $requete->fetchAll();
        foreach ($result as $user) {
            array_push($all_users[$role], $user["email"]);
        }
    }
    return $all_users;
}

/*
* Récupération du user en cours en fonction de son rôle et de son adresse email. 
*/
function fetchCurrentUser($fetchBdd, $db, $role, $email, $password)
{
    if (array_key_exists($role, $fetchBdd)) {
        $request = $db->prepare($fetchBdd[$role]);
        $request->execute();
        $usersRole = $request->fetchAll();

        foreach ($usersRole as $index => $users) {

            if ($users["email"] === $email && $users["password"] === $password) {
                return $users;
            } else echo ("cet utilisateur n'existe pas");
        }

        // var_dump($usersRole);
    } else {
        echo "role non valide";
    }
}

/*
* Vérification de la validité de l'email envoyé
*/
function checkEmail($email, $all_users)
{
    if ($email) {
        foreach ($all_users as $role => $emails) {
            foreach ($emails as $emailUser) {
                if (strcasecmp($emailUser, $email) === 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

/*
* Vérification des contournement emails "admin" pour les autres rôles
*/
function checkSpy($email)
{

    if (strpos($email, '@admin-trt') !== false) {
        echo  "Adresse mail interdite, veuillez nous contacter";
        return false;
    } else {
        return true;
    }
}

/*
* Vérification de l'email administrateur
*/
function isAdmin($email)
{
    $separator = "@";
    $separatorAt = explode($separator, $email);
    if (strcasecmp($separatorAt[1], "admin-trt.fr") === 0 || strcasecmp($separatorAt[1], "admin-trt.com") === 0) {
        return true;
    } else {
        echo "L'email administrateur est invalide, veuillez contacter trt-conseil";
        return false;
    }
}

/*
* Requête d'insertion dans la base de données selon le rôle
*/
function insertData($db, $table, $nom, $prenom, $email, $password, $entreprise, $role)
{
    try {
        $db->beginTransaction();
        if ($role === "candidat") {
            $db->exec("insert into $table (nom, prenom, email, password) values ( '$nom', '$prenom', '$email', '$password')");
        } else {
            $db->exec("insert into $table (nom, prenom, email, password, entreprise) values ( '$nom', '$prenom', '$email', '$password', '$entreprise')");
        }
        $db->commit();
        echo "Success";
    } catch (Exception $e) {
        $db->rollBack();
        echo "Failed: " . $e->getMessage();
    }
}
