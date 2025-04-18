<?php 
require "connection.php";

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allow requests from React

$sql = "SELECT * FROM `itemdetail`";
$result = $conn->query($sql);

$items = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
}

echo json_encode($items);
$conn->close();
?>
