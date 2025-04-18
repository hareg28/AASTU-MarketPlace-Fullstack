<?php

//http://localhost/AASTU-MarketPlace-Fullstack/AASTU-MARKETPLACE-react/aastu-marketplace-react/php/connection.php - to run

    $database = "aastumarketplace";
    $server = "localhost";
    $username = "root";
    $password = ""; 

    // Create connection
    $conn = new mysqli($server, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

?>
