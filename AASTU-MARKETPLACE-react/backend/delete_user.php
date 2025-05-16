<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require "db_connection.php";
if (!isset($conn) || $conn === null) {
    throw new Exception("Database connection not established");
}

$response = ['success' => false, 'message' => ''];
$input = json_decode(file_get_contents('php://input'), true);

try {
    if (empty($input['id'])) {
        throw new Exception("User ID is required");
    }

    $stmt = $conn->prepare("DELETE FROM registrationdata WHERE Id = :id");
    $stmt->bindParam(":id", $input['id']);
    $stmt->execute();
    
    $response['success'] = true;
    $response['message'] = "User deleted successfully";
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>