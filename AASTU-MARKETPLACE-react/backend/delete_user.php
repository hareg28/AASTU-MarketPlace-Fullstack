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
    if (empty($input['user_id'])) {
        throw new Exception("User ID is required");
    }

    $stmt = $conn->prepare("DELETE FROM registrationdata WHERE user_id = :id");
    $stmt->bindParam(":id", $input['user_id']);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $response['success'] = true;
        $response['message'] = "User deleted successfully";
    } else {
        $response['message'] = "No user found with that ID";
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    error_log("Delete User Error: " . $e->getMessage());
} finally {
    if (isset($conn)) {
        $conn = null;
    }
}

echo json_encode($response);
?>