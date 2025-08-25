document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const resultado = document.getElementById("resultado");

  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  const quizGancheira = JSON.parse(localStorage.getItem("quizGancheira")) || {};

  if (!userLogado || !userLogado.user) {
    resultado.innerHTML = "Usuário não autenticado.";
    form.style.display = "none";
    return;
  }

  // Bloqueia se já respondeu
  if (quizGancheira[userLogado.user]) {
    form.style.display = "none";
    resultado.innerHTML = `Você já respondeu o quiz. Acertos: ${quizGancheira[userLogado.user]} / 3`;
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const respostasCorretas = {
      q1: "a",
      q2: "a",
      q3: "b",
      
    };

    let pontos = 0;
    Object.keys(respostasCorretas).forEach((questao) => {
      const selecionada = form.querySelector(`input[name="${questao}"]:checked`);
      if (selecionada && selecionada.value === respostasCorretas[questao]) {
        pontos++;
      }
    });

    const erros = 3 - pontos;

    // Salva no localStorage pra bloquear nova resposta
    quizGancheira[userLogado.user] = pontos;
    localStorage.setItem("quizGancheira", JSON.stringify(quizGancheira));

    form.style.display = "none";
    resultado.innerHTML = `Você acertou ${pontos} de 3 perguntas!`;

    // Envia resultado para o banco
    fetch("http://localhost/Economico-Acougue/php/salvar_resultado.php", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usuario_nome: userLogado.nome || userLogado.user,
        quiz_nome: "quiz3",
        acertos: pontos,
        erros: erros,
        total_perguntas: 3
      }),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status !== "ok") {
        alert("Erro ao salvar resultado: " + data.mensagem);
      }
    })
    .catch(err => {
      alert("Erro na requisição: " + err.message);
    });
  });
});
