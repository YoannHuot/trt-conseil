<?php


/*
* Permet de formater les données d'une requête Poste
*/
function updateTableByRoleAndUser($db, $table, $columnName, $userId, $adminId)
{
    try {
        $sql = "UPDATE $table SET $columnName = :payload_id WHERE id = :id";
        $stmt = $db->prepare($sql);

        $values = array(':payload_id' => $adminId["id"], ':id' => $userId);

        $stmt->execute($values);
        echo ("New $ id : "  . json_encode($userId));
    } catch (PDOException $e) {
        echo "Erreur : " . $e->getMessage();
    }
}

/*
* Permet de formater les données d'une requête Poste
*/
function getRequestDataBody()
{
    $body = file_get_contents('php://input');

    if (empty($body)) {
        return [];
    }

    // Parse json body and notify when error occurs
    $data = json_decode($body, true);
    if (json_last_error()) {
        trigger_error(json_last_error_msg());
        return [];
    }

    return $data;
}

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
function checkUserLogin($fetchBdd, $db, $role, $email, $password)
{
    if (array_key_exists($role, $fetchBdd)) {
        $request = $db->prepare($fetchBdd[$role]);
        $request->execute();
        $usersRole = $request->fetchAll();


        foreach ($usersRole as $index => $users) {
            if ($users["email"] === $email && password_verify($password, $users["password"])) {
                return $users;
            }
        }
        echo ("Informations invalides");
    } else {
        var_dump($role);
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
* Fetch current user
*/
function FetchCurrentUser($db, $fetchBdd, $role, $mail)
{
    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $user) {
        var_dump($user);
    }
}

/*
* Récupération des consultants non validés par les adminsitrateurs
*/
function fetchUserUnValidate($db, $fetchBdd, $role)
{
    $usersUnvalidate = array();

    $request = $db->prepare($fetchBdd[$role]);
    $request->execute();
    $users = $request->fetchAll();

    foreach ($users as $index => $users) {
        if ($users["created_by"] === NULL) {
            array_push($usersUnvalidate, $users);
        }
    }
    return $usersUnvalidate;
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

/*
* Encodage des données du token JWT
*/
function base64UrlEncode($data)
{
    $result = base64_encode(json_encode(($data)));
    return str_replace(['+', '/', '='], ['-', '_', ''], $result);
}

function getJwtToken($payload, $secret)
{
    $header = [
        'typ' => 'JWT',
        'alg' => 'HS256'
    ];

    $header = base64UrlEncode($header);
    $payload = base64UrlEncode($payload);
    $secret = base64_encode($secret);
    // var_dump($secret);

    $signature = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
    $signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    // var_dump($signature);
    $jwt = "$header.$payload.$signature";

    return json_encode(array("jwt" => $jwt));;
}

function decodeJwt($jwt, $secret)
{

    $parts = explode('.', $jwt);
    if (count($parts) != 3) {
        throw new Exception('Invalid JWT format');
    }

    list($header, $payload, $signatureProvided) = $parts;

    $secret = base64_encode($secret);
    $signatureExpected = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
    $signatureExpected = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signatureExpected));

    $checkValidity = $signatureExpected === $signatureProvided;
    $headerDecoded = base64_decode($header);
    $payloadDecoded = base64_decode($payload);

    return [
        $headerDecoded,
        $payloadDecoded,
        $checkValidity
    ];
}
