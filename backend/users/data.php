<?php

$data = json_decode(file_get_contents("php://input"));

// Data payload from client
$nom = $data->payload->nom;
$prenom = $data->payload->prenom;
$email = $data->payload->email;
$password = $data->payload->password;
$password2 = $data->payload->password2;
$entreprise = $data->payload->compagny;
$role = $data->payload->role;


$fetchBdd = array(
    "administrateurs" => "SELECT * FROM administrateurs",
    "recruteurs" => "SELECT * FROM recuteurs",
    "consultants" => "SELECT * FROM consultants",
    "candidats" => "SELECT * FROM candidats",
);

const SECRET = '0hLa83lleBroue11e';

    // Si l'utilisateur existe => Je lui crée un token de connexion et je passe le state logged à true
    // Une fois sur la homepage je check si le "created_by" est null :
    // null je lui affiche un message "en attente de validation de vorte compte par un consultant"
    // non null je lui donne accès à l'app 

    // Côté administrateur, je crée une page avec tous les consultants à valider"
    // Si il coche valider, je change le "created_by" par l'Id de l'administrateur dans la BDD

    // Côté consultant idem que administrateur mais avec les candidats et les recruteurs. 
