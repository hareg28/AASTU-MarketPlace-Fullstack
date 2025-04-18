<?php
require "connection.php";

$itemName = $_POST['itemName'];
$itemPrice = $_POST['itemPrice'];
$itemRate = $_POST['itemRate'];
$image = $_FILES['image'];

$imageName = time() . "_" . basename($image['name']);
$targetDir = "uploads/";
$targetFile = $targetDir . $imageName;

if (move_uploaded_file($image["tmp_name"], $targetFile)) {
    $sql = "INSERT INTO itemdetail (itemName, itemPrice, itemRate, itemProfile) 
            VALUES ('$itemName', '$itemPrice', '$itemRate', '$targetFile')";
    if ($conn->query($sql) === TRUE) {
        echo "Item uploaded successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "Failed to upload image.";
}

$conn->close();
?>
