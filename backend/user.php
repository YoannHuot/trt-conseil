<?php
require_once 'config.php';

header('Content-Type: application/json');


$columnsAdminns = "SHOW COLUMNS FROM administrateurs";
$stmt = $db->query($columnsAdminns);
$cols = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($cols);
