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
