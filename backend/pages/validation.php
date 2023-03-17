
<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';
require_once '../functions-bdd.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    if ($validToken) {
        if ($payload["roles"] === "consultants") {
            $usersUnvalidate = fetchUserUnValidate($db, $fetchBdd, "candidats");

            $response = array(
                'candidats' => array(),
            );

            foreach ($usersUnvalidate as $user) {
                $response['candidats'][] = $user;
            }

            echo json_encode($response);
        }


        if ($payload["roles"] === "administrateurs") {
            $recruteursUnvalidate = fetchUserUnValidate($db, $fetchBdd, "recruteurs");
            $consultantsUnvalidate = fetchUserUnValidate($db, $fetchBdd, "consultants");

            $response = array(
                'consultants' => array(),
                'recruteurs' => array()
            );

            foreach ($consultantsUnvalidate as $consultant) {
                $response['consultants'][] = $consultant;
            }

            foreach ($recruteursUnvalidate as $recruteur) {
                $response['recruteurs'][] = $recruteur;
            }

            echo json_encode($response);
        }
    }
};

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = getRequestDataBody();
    $token = $data["payload"];

    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);

    $user = $data["user"];
    $role = $data["role"];
    $validToken = $decodedToken[2];


    if ($validToken) {
        if ($payload["roles"] === "administrateurs") {
            var_dump($role);
            updateTableByRoleAndUser($db, $role, 'created_by', $user["id"], $payload);
        }
        if ($payload["roles"] === "consultants") {
            updateTableByRoleAndUser($db, $role, 'created_by', $user["id"], $payload);
        }
    }
};
