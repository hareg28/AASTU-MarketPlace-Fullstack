<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if ($data && isset($data['username'])) {
        $username = htmlspecialchars($data['username']);
        echo "Username received: $username";
    } else {
        echo "Username not provided or invalid JSON.";
    }
} else {
    echo "Invalid request method.";
}
