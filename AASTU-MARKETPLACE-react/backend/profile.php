<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

$dbHost = "aws-0-us-east-2.pooler.supabase.com";
$dbPort = "6543";
$dbName = "postgres";
$username = "postgres.znwwxleyxvhljyhzvtsg";
$password = "mhAsdMzjtm2E3esZ";
$tableName = 'registrationdata';

$dsn = "pgsql:host={$dbHost};port={$dbPort};dbname={$dbName};sslmode=require;options='--client_encoding=UTF8'";

try {
    $conn = new PDO(
        $dsn,
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

$userId = isset($_GET['userid']) ? $_GET['userid'] : null;

try {
    if ($userId) {
        $stmt = $conn->prepare("SELECT * FROM registrationdata WHERE userid = :userid");
        $stmt->execute([':userid' => $userId]);
    } else {
        $stmt = $conn->query("SELECT * FROM registrationdata");
    }

    $profiles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($profiles);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
?>
