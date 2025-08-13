<?php
session_start();
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

// Verifica se o usuário está logado
if (!isset($_SESSION['nome_usuario'])) {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não está logado"]);
    exit;
}

// Pega dados da sessão
$usuario_nome = $_SESSION['nome_usuario'];

// Pega dados enviados pelo fetch (JSON)
$data = json_decode(file_get_contents("php://input"), true);

$quiz_nome = $data['quiz_nome'] ?? '';
$acertos = intval($data['acertos'] ?? 0);
$erros = intval($data['erros'] ?? 0);
$total_perguntas = intval($data['total_perguntas'] ?? 0);

// Insere no banco salvando o NOME do usuário
$stmt = $conn->prepare("INSERT INTO resultados_quiz (usuario_nome, quiz_nome, acertos, erros, total_perguntas) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiii", $usuario_nome, $quiz_nome, $acertos, $erros, $total_perguntas);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Resultado salvo com sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar resultado"]);
}

$stmt->close();
$conn->close();
