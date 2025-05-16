<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require "db_connection.php";
if (!isset($conn) || $conn === null) {
    throw new Exception("Database connection not established");
}

$response = ['success' => false, 'users' => []];

try {
    $stmt = $conn->prepare("SELECT Id, Name, Email, Role FROM registrationdata");
    $stmt->execute();
    $users = $stmt->fetchAll();
    
    $response['success'] = true;
    $response['users'] = $users;
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>