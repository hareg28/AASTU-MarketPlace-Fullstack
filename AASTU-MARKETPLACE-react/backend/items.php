<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow CORS from your frontend origin (adjust if needed)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dbHost = "aws-0-us-east-2.pooler.supabase.com";
$dbPort = "6543";
$dbName = "postgres";
$username = "postgres.znwwxleyxvhljyhzvtsg";
$password = "mhAsdMzjtm2E3esZ";
$tableName = 'itemdetail';

// Add sslmode=require in the DSN connection string
$dsn = "pgsql:host={$dbHost};port={$dbPort};dbname={$dbName};sslmode=require;options='--client_encoding=UTF8'";

try {
    $conn = new PDO(
        $dsn,
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Throw exceptions on error
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

$uploadDir = "../uploads/";

function getInputData() {
    return json_decode(file_get_contents("php://input"), true);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $conn->query("SELECT * FROM itemdetail ORDER BY itemId DESC");
        $items = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Build full URL for image
            $row['itemprofile'] = "http://localhost/AASTU-MarketPlace-Fullstack/aastu-marketplace-react/api/uploads/" . $row['itemprofile'];
            $items[] = $row;
        }
        echo json_encode($items);
        break;

    case 'POST':
        // Check if image file is uploaded
        if (!isset($_FILES["image"]) || $_FILES["image"]["error"] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["error" => "Image file missing or upload error"]);
            exit();
        }

        // Sanitize filename and create unique name
        $originalName = basename($_FILES["image"]["name"]);
        $filename = time() . "_" . preg_replace("/[^A-Za-z0-9\.\-_]/", "", $originalName);
        $targetFile = $uploadDir . $filename;

        if (!is_dir($uploadDir)) {
            // Try to create uploads dir if not exists
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            $name = $_POST['itemName'] ?? '';
            $description = $_POST['itemDescription'] ?? '';
            $price = $_POST['itemPrice'] ?? 0;
            $rate = $_POST['itemRate'] ?? 0;

            // Basic validation
            if (empty($name) || empty($description) || empty($price)) {
                http_response_code(400);
                echo json_encode(["error" => "Please fill in all required fields"]);
                exit();
            }

            $stmt = $conn->prepare("INSERT INTO itemdetail (itemName, itemPrice, itemRate, itemDescription, itemProfile) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $price, $rate, $description, $filename]);

            echo json_encode(["message" => "Item uploaded successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to move uploaded file"]);
        }
        break;

    case 'PUT':
        $data = getInputData();
        if (!isset($data['itemId'])) {
            http_response_code(400);
            echo json_encode(["error" => "itemId is required"]);
            exit();
        }
        $id = $data['itemId'];
        $name = $data['itemName'] ?? '';
        $price = $data['itemPrice'] ?? 0;
        $rate = $data['itemRate'] ?? 0;
        $desc = $data['itemDescription'] ?? '';
        $profile = basename($data['itemProfile']) ?? '';

        $stmt = $conn->prepare("UPDATE itemdetail SET itemName = ?, itemPrice = ?, itemRate = ?, itemDescription = ?, itemProfile = ? WHERE itemId = ?");
        $stmt->execute([$name, $price, $rate, $desc, $profile, $id]);

        echo json_encode(["message" => "Item updated"]);
        break;

    case 'DELETE':
        $data = getInputData();
        if (!isset($data['itemId'])) {
            http_response_code(400);
            echo json_encode(["error" => "itemId is required"]);
            exit();
        }
        $id = $data['itemId'];

        $stmt = $conn->prepare("SELECT itemProfile FROM itemdetail WHERE itemId = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $imgPath = $uploadDir . basename($row['itemProfile']);
            if (file_exists($imgPath)) {
                unlink($imgPath);
            }

            $stmt = $conn->prepare("DELETE FROM itemdetail WHERE itemId = ?");
            $stmt->execute([$id]);

            echo json_encode(["message" => "Item deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Item not found"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}
?>
