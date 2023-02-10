
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

    if ($validToken && $payload["roles"] === "administrateurs") {
        $usersUnvalidate = fetchUserUnValidate($db, $fetchBdd);
        echo json_encode($usersUnvalidate);
    }
};
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $decodedToken = decodeJwt($token, SECRET);

    $header = $decodedToken[0];
    $payload = json_decode($decodedToken[1], true);
    $validToken = $decodedToken[2];

    var_dump($data);
    // if ($validToken && $payload["roles"] === "administrateurs") {
    // }
};
