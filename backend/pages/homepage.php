
<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
$attente = "Un administrateur se charge de valider votre profil. Vous serez notifié une fois cette étape validée";
$success = "Bienvenue sur la plateforme TRT-Conseil";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    // checker dans la BDD si l'utilisateur exite + si son validated by est true ou pas. 

    if ($validToken) {
        if ($payload["roles"] === "administrateurs") {
            echo json_encode([
                'validation' => true,
                'response' => $success,
                'role' => $payload["roles"],
                'name' => $payload["name"],
                'firstname' => $payload["firstname"]
            ]);
        } else if ($payload["validation"] === NULL) {
            echo json_encode([
                'validation' => false,
                'response' => $attente,
                'role' => $payload["roles"],
                'name' => $payload["name"],
                'firstname' => $payload["firstname"]
            ]);
        } else {
            echo json_encode([
                'validation' => true,
                'response' => $success,
                'role' => $payload["roles"],
                'name' => $payload["name"],
                'firstname' => $payload["firstname"]
            ]);
        }
    }
};
