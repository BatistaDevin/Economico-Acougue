document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const resultado = document.getElementById("resultado");

  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  const quizData = JSON.parse(localStorage.getItem("quizData")) || {};

  if (!userLogado || !userLogado.user) {
    resultado.innerHTML = "Usuário não autenticado.";
    form.style.display = "none";
    return;
  }

  // Bloqueia se já respondeu
  if (quizData[userLogado.user]) {
    form.style.display = "none";
    resultado.innerHTML = `Você já respondeu o quiz. Acertos: ${quizData[userLogado.user]} / 6`;
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const respostasCorretas = {
      q1: "c",
      q2: "b",
      q3: "b",
      q4: "a",
      q5: "a",
      q6: "b",
    };

    let pontos = 0;
    Object.keys(respostasCorretas).forEach((questao) => {
      const selecionada = form.querySelector(`input[name="${questao}"]:checked`);
      if (selecionada && selecionada.value === respostasCorretas[questao]) {
        pontos++;
      }
    });

    const erros = 6 - pontos;

    // Salva no localStorage pra bloquear nova resposta
    quizData[userLogado.user] = pontos;
    localStorage.setItem("quizData", JSON.stringify(quizData));

    form.style.display = "none";
    resultado.innerHTML = `Você acertou ${pontos} de 6 perguntas!`;

    // Envia resultado para o banco
    fetch("http://localhost/Economico-Acougue/php/salvar_resultado.php", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usuario_nome: userLogado.nome || userLogado.user,
        quiz_nome: "quiz1",
        acertos: pontos,
        erros: erros,
        total_perguntas: 6
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
