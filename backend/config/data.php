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
$jwt = $data->payload->token;



$fetchBdd = array(
    "administrateurs" => "SELECT * FROM administrateurs",
    "recruteurs" => "SELECT * FROM recruteurs",
    "consultants" => "SELECT * FROM consultants",
    "candidats" => "SELECT * FROM candidats",
);

const SECRET = '0hLa83lleBroue11e';
