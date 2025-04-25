<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Load environment variables (create a .env file in your project root)
// require_once __DIR__ . '/vendor/autoload.php';
// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();

// Database configuration using Supabase connection string
$dbUrl = parse_url(getenv('DATABASE_URL') ?: parse_url('postgresql://postgres:2025group1#@db.znwwxleyxvhljyhzvtsg.supabase.co:5432/postgres'));

$dbHost = $dbUrl['host'];
$dbPort = $dbUrl['port'];
$dbName = ltrim($dbUrl['path'], '/');
$dbUser = $dbUrl['user'];
$dbPassword = $dbUrl['pass'];
$tableName = 'RegistrationData';

// Supabase API configuration
$supabaseUrl = 'https://znwwxleyxvhljyhzvtsg.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpud3d4bGV5eHZobGp5aHp2dHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDA3NzMsImV4cCI6MjA2MTA3Njc3M30.g8ntG90KXqg77upfxJNI826egU5TeVp5CtPXt1xoxA0';

$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Only process POST requests
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
        } elseif (!preg_match('/[A-Z]/', $_POST['Password']) || 
                 !preg_match('/[a-z]/', $_POST['Password']) || 
                 !preg_match('/[0-9]/', $_POST['Password'])) {
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
    $connectionString = "host=$dbHost port=$dbPort dbname=$dbName user=$dbUser password=$dbPassword sslmode=require";
    $dbconn = pg_connect($connectionString);

    if (!$dbconn) {
        throw new Exception("Failed to connect to database: " . pg_last_error());
    }

    // Check if user already exists
    $checkQuery = "SELECT 1 FROM $tableName WHERE Id = $1 OR Email = $2 LIMIT 1";
    $checkResult = pg_query_params($dbconn, $checkQuery, [$_POST['Id'], $_POST['Email']]);

    if (pg_num_rows($checkResult) > 0) {
        throw new Exception("User with this ID or Email already exists");
    }

    // Hash password
    $hashedPassword = password_hash($_POST['Password'], PASSWORD_BCRYPT, ['cost' => 12]);

    // Insert new user with prepared statement
    $insertQuery = "INSERT INTO $tableName 
                    (Id, Email, Name, Phone, Password, PPpath, Role) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING Id";
    
    $insertResult = pg_query_params($dbconn, $insertQuery, [
        htmlspecialchars($_POST['Id'], ENT_QUOTES),
        htmlspecialchars($_POST['Email'], ENT_QUOTES),
        htmlspecialchars($_POST['Name'], ENT_QUOTES),
        htmlspecialchars($_POST['Phone'], ENT_QUOTES),
        $hashedPassword,
        $profilePicturePath,
        htmlspecialchars($_POST['Role'], ENT_QUOTES)
    ]);

    if (!$insertResult) {
        throw new Exception("Failed to create user: " . pg_last_error($dbconn));
    }

    // Optionally store in Supabase Storage if needed
    // $storagePath = 'profile-pictures/' . basename($profilePicturePath);
    // You would need to use Supabase Storage API here

    $response['success'] = true;
    $response['message'] = "Registration successful!";
    $response['data'] = pg_fetch_assoc($insertResult);

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