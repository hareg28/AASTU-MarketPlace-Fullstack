<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require "db_connection.php";
if (!isset($conn) || $conn === null) {
    throw new Exception("Database connection not established");
}

$response = [
    'success' => false,
    'message' => '',
    'role' => ''
];

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
    exit;
}

try {
    // Validate input
    if (empty($data['email'])) {
        throw new Exception("Email is required");
    }
    
    if (empty($data['password'])) {
        throw new Exception("Password is required");
    }

    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM registrationdata WHERE Email = :email");
    $stmt->bindParam(":email", $data['email']);
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {
        throw new Exception("User not found");
    }

    // Verify password
    if (!password_verify($data['password'], $user['Password'])) {
        throw new Exception("Invalid password");
    }

    // Check if email is verified
    if (!$user['verified']) {
        throw new Exception("Please verify your email first");
    }

    $response['success'] = true;
    $response['message'] = "Login successful";
    $response['role'] = $user['Role'];

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
} finally {
    if (isset($dbconn)) {
        pg_close($dbconn);
    }
}

echo json_encode($response);
?>