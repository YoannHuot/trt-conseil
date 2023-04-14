
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

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = getRequestDataBody();
    $token = $data["payload"];

    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);

    $userId = $payload["id"];

    $formData = $data["data"];
    $validToken = $decodedToken[2];


    
    if ($validToken && $payload["roles"] === "recruteurs") {

        $poste = $data["data"]["poste"];
        $lieu = $data["data"]["lieu"];
        $description =$data["data"]["description"];
        $horaires = $data["data"]["horaires"];
        $salaires = $data["data"]["salaire"];
        $competences = $data["data"]["competences"];

        $created_by = $payload["id"];
        $entreprise = $payload["entreprise"];
        $role= $payload["roles"];
        
        $recordId = $data["data"]["id"];

        updateAnnonce($db, "annonces", $recordId, $poste, $lieu, $description, $horaires, $salaires, $competences, $entreprise);

    } else {
        echo("Vous n'êtes pas un recruteur");
    }
    
};

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $token = $_DELETE['payload'];
    // $decodedToken = decodeJwt($token, SECRET);


    
        // $decodedToken = decodeJwt($token, SECRET);
    
        // $header = $decodedToken[0];
        // $payload = json_decode($decodedToken[1], true);
    
        // $userId = $payload["id"];
    
        // $annonceId = $data["annonceId"];
    
        // $validToken = $decodedToken[2];
    
        // echo(json_encode($token));
        echo($token);
        // Vérifiez que le token est valide et que l'utilisateur est autorisé à supprimer cette annonce
    
        // Supprimez l'annonce de la base de données en utilisant son ID
        // $query = "DELETE FROM annonces WHERE id = ?";
        // $stmt = $conn->prepare($query);
        // $stmt->bind_param("i", $annonceId);
        // $stmt->execute();
    
        // // Retournez une réponse appropriée
        // header('Content-Type: application/json');
        // echo json_encode(array('success' => true, 'message' => 'Annonce supprimée avec succès'));
    
};