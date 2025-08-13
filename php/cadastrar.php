<?php
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "sistema_login";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão com o banco"]);
    exit;
}

$nome = $_POST['nome'] ?? '';
$usuario = $_POST['usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

if(empty($nome) || empty($usuario) || empty($senha)){
    echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos"]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (nome, usuario, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $usuario, $senhaHash);

if($stmt->execute()){
    echo json_encode(["status" => "ok", "mensagem" => "Usuário cadastrado com sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário já existe"]);
}

$stmt->close();
$conn->close();
?>
