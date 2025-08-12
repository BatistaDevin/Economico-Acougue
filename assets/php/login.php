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

$usuario = $_POST['usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

$stmt = $conn->prepare("SELECT nome, senha FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()){
    if(password_verify($senha, $row['senha'])){
        echo json_encode(["status" => "ok", "mensagem" => "Login realizado", "nome" => $row['nome']]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado"]);
}

$stmt->close();
$conn->close();
?>
