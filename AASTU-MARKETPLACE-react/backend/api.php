<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($request === '/items' && $method === 'GET') {
    require 'items.php';
} elseif ($request === '/items' && $method === 'POST') {
    require 'upload.php';
} else {
    http_response_code(404);
    echo json_encode(["error" => "Endpoint not found"]);
}
?>
