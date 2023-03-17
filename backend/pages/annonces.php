
<?php
require_once '../config/config.php';
require_once '../config/data.php';
require_once '../functions.php';
require_once '../functions-bdd.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestDataBody();
    $token = $data["payload"];

    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);

    $formData = $data["data"];
    $validToken = $decodedToken[2];

    $role= $payload["roles"];
    $poste = $data["data"]["poste"];
    $lieu = $data["data"]["lieu"];
    $description =$data["data"]["description"];
    $horaires = $data["data"]["horaires"];
    $salaires = $data["data"]["salaire"];
    $created_by = $payload["id"];
    $competences = $data["data"]["competences"];
    $entreprise = $payload["entreprise"];
    
    

    if($validToken && $payload["roles"] === "recruteurs") { 
  
        if (annonceExists($db, $poste, $horaires, $salaires, $entreprise)) {
            echo "Cette annonce existe déjà";
        } else {
            insertAnnonce($db, "annonces", $role, $poste, $lieu, $description, $horaires, $salaires, $created_by, $competences, $entreprise);
        }
    } else { 
        echo("Vous n'êtes pas un recruteur");
    }
    
};


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];
    
    $userId = $payload["id"];

    if($validToken && $payload["roles"] === "recruteurs") { 
        $annonces = getUserAnnonces($db, $userId);
        echo(json_encode($annonces));
    } else { 
        echo("Vous n'êtes pas un recruteur");
    }
    
};