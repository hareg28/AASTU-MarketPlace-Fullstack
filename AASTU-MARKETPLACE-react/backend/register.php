<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$dbHost = "aws-0-us-east-2.pooler.supabase.com";
$dbPort = "6543";
$dbName = "postgres";
$username = "postgres.znwwxleyxvhljyhzvtsg";
$password = "2P5llhiFbxV5E8rr";
$tableName = 'RegistrationData';

function dd($value)
{
    echo '<pre>';
    echo var_dump($value);
    echo '</pre>';
    die;
}

$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method';
    echo json_encode($response);
    exit;
}

try {



    // Get raw JSON data if Content-Type is application/json
    $input = file_get_contents('php://input');
    if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        $_POST = json_decode($input, true);
    }

    // Validate required fields
    $requiredFields = ['Id', 'Email', 'Name', 'Phone', 'Password', 'Role'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field] ?? null)) {
            $response['errors'][$field] = "This field is required";
        }
    }

    // Validate email format
    if (!empty($_POST['Email']) && (!filter_var($_POST['Email'], FILTER_VALIDATE_EMAIL) || !str_ends_with($_POST['Email'], '@aastustudent.edu.et'))) {
        $response['errors']['Email'] = "Please use a valid AASTU institutional email";
    }

    // Validate phone number
    if (!empty($_POST['Phone']) && !preg_match('/^[0-9]{10}$/', $_POST['Phone'])) {
        $response['errors']['Phone'] = "Please enter a valid 10-digit phone number";
    }

    // Validate password strength
    if (!empty($_POST['Password'])) {
        if (strlen($_POST['Password']) < 8) {
            $response['errors']['Password'] = "Password must be at least 8 characters";
        } elseif (
            !preg_match('/[A-Z]/', $_POST['Password']) ||
            !preg_match('/[a-z]/', $_POST['Password']) ||
            !preg_match('/[0-9]/', $_POST['Password'])
        ) {
            $response['errors']['Password'] = "Password must contain uppercase, lowercase, and numbers";
        }
    }

    // Check if terms were accepted
    if (empty($_POST['terms'] ?? null)) {
        $response['errors']['terms'] = "You must accept the terms and conditions";
    }

    // Handle file upload
    $profilePicturePath = null;
    if (!empty($_FILES['PPpath']['name'])) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedType = finfo_file($fileInfo, $_FILES['PPpath']['tmp_name']);

        if (!in_array($detectedType, $allowedTypes)) {
            $response['errors']['PPpath'] = "Only JPG, PNG, and GIF files are allowed (max 2MB)";
        } elseif ($_FILES['PPpath']['size'] > 2097152) {
            $response['errors']['PPpath'] = "File size must be less than 2MB";
        } else {
            $uploadDir = __DIR__ . '/uploads/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $extension = pathinfo($_FILES['PPpath']['name'], PATHINFO_EXTENSION);
            $filename = 'profile_' . uniqid() . '.' . $extension;
            $uploadPath = $uploadDir . $filename;

            if (move_uploaded_file($_FILES['PPpath']['tmp_name'], $uploadPath)) {
                $profilePicturePath = 'uploads/' . $filename;
            } else {
                $response['errors']['PPpath'] = "Failed to upload profile picture";
            }
        }
    } else {
        $response['errors']['PPpath'] = "Profile picture is required";
    }

    // Return errors if any
    if (!empty($response['errors'])) {
        $response['message'] = "Please fix the errors below";
        echo json_encode($response);
        exit;
    }

    // Connect to Supabase PostgreSQL with SSL
    $dsn = "pgsql:host={$dbHost};port={$dbPort};dbname={$dbName};options='--client_encoding=UTF8'";
    $conn = null;

    try {
        $conn = new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage() . ". Please verify the hostname and network connectivity.");
    }

    // Check if user already exists
    $checkStmt = $conn->prepare("SELECT * FROM RegistrationData WHERE Email = :email OR Id = :id");
    $checkStmt->bindParam(":id", $_POST['Id'], PDO::PARAM_STR);
    $checkStmt->bindParam(":email", $_POST['Email'], PDO::PARAM_STR);
    $checkStmt->execute();
    $checkResult = $checkStmt->fetch();
    
    if ($checkResult) {
        throw new Exception("User with this ID or Email already exists");
    }

    // Hash passwor d
    $hashedPassword = password_hash($_POST['Password'], PASSWORD_DEFAULT);

    // Insert new user with prepared statement
    $insertQuery = $conn->prepare("INSERT INTO $tableName (Id, Email, Name, Phone, Password, PPpath, Role) VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING Id");

    $insertQuery->execute([
        $_POST['Id'],
        $_POST['Email'],
        $_POST['Name'],
        $_POST['Phone'],
        $hashedPassword,
        $profilePicturePath,
        $_POST['Role']
    ]);

    $insertResult = $insertQuery->fetchAll();

    if (!$insertResult) {
        throw new Exception("Failed to create user: " . pg_last_error($dbconn));
    }

    $response['success'] = true;
    $response['message'] = "Registration successful!";
    $response['data'] = $insertResult;


} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    error_log("Registration Error: " . $e->getMessage());
} finally {
    if (isset($dbconn)) {
        pg_close($dbconn);
    }
}

echo json_encode($response);
?>