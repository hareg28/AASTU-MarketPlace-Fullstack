<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require "db_connection.php";

$response = ['success' => false, 'users' => [], 'message' => ''];

try {
    if (!isset($conn) || $conn === null) {
        throw new Exception("Database connection not established");
    }

    $stmt = $conn->prepare("SELECT user_id, Name as name, Email as email, Role as role FROM registrationdata");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Ensure all fields have values
    $users = array_map(function($user) {
        return [
            'user_id' => $user['user_id'] ?? '',
            'name' => $user['name'] ?? '',
            'email' => $user['email'] ?? '',
            'role' => $user['role'] ?? ''
        ];
    }, $users);
    
    $response['success'] = true;
    $response['users'] = $users;
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    error_log("Get Users Error: " . $e->getMessage());
}

echo json_encode($response);
?>