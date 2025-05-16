<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemName = $_POST['itemName'] ?? '';
    $itemDescription = $_POST['itemDescription'] ?? '';
    $itemPrice = floatval($_POST['itemPrice'] ?? 0);
    $itemRate = 0;

    if (isset($_FILES['image'])) {
        $imageName = time() . '_' . basename($_FILES['image']['name']);
        $uploadDir = __DIR__ . "/uploads/";
        $targetPath = $uploadDir . $imageName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            try {
                $stmt = $conn->prepare("INSERT INTO itemdetail (itemName, itemPrice, itemRate, itemDescription, itemProfile) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$itemName, $itemPrice, $itemRate, $itemDescription, $imageName]);

                echo json_encode(["message" => "Item uploaded successfully."]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "DB insert failed: " . $e->getMessage()]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to move uploaded image."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Image is required."]);
    }
}
?>
