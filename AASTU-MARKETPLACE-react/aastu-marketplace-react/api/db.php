<?php 
$dbHost = "aws-0-us-east-2.pooler.supabase.com";
$dbPort = "6543";
$dbName = "postgres";
$username = "postgres.znwwxleyxvhljyhzvtsg";
$password = "mhAsdMzjtm2E3esZ";
$tableName = 'registrationdata';

// Connect to Supabase PostgreSQL with SSL
    $dsn = "pgsql:host={$dbHost};port={$dbPort};dbname={$dbName};options='--client_encoding=UTF8'";
    $conn = null;

    try {
        $conn = new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage() . ". Please verify the hostname and network connectivity.");
    }
?>