
<?php
require_once '../config/config.php';
require_once '../functions.php';
require_once '../config/data.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = $_GET['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    if ($validToken) {
        if ($payload["roles"] === "administrateurs") {
            $usersUnvalidate = fetchUserUnValidate($db, $fetchBdd, "consultants");
            echo json_encode($usersUnvalidate);
        }
        if ($payload["roles"] === "consultants") {

            $recruteursUnvalidate = fetchUserUnValidate($db, $fetchBdd, "recruteurs");
            $candidatsUnvalidate = fetchUserUnValidate($db, $fetchBdd, "candidats");

            $response = array(
                'candidats' => array(),
                'recruteurs' => array()
            );

            foreach ($candidatsUnvalidate as $candidat) {

                $response['candidats'][] = $candidat;
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
            updateTableByRoleAndUser($db, 'consultants', 'created_by', $user["id"], $payload);
        }
        if ($payload["roles"] === "consultants") {
            updateTableByRoleAndUser($db, $role, 'created_by', $user["id"], $payload);
        }
    }
};
