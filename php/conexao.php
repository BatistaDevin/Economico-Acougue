<?php
$host = "localhost";
$dbname = "sistema_login";
$username = "root"; // ou o usuário que você usa no Workbench
$password = ""; // a senha que você usa para conectar no Workbench

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([
        "status" => "erro",
        "mensagem" => "Erro na conexão com o banco: " . $conn->connect_error
    ]));
}
?>
