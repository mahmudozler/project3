<?php

$username = 'root';
$password = 'root';

try {
    $conn = new PDO('mysql:host=localhost;dbname=project3', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}
