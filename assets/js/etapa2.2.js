document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const resultado = document.getElementById("resultado");

  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  const quizVisualData = JSON.parse(localStorage.getItem("quizVisualData")) || {};

  if (!userLogado || !userLogado.user) {
    resultado.innerHTML = "Usuário não autenticado.";
    form.style.display = "none";
    return;
  }

  // Bloqueia se já respondeu
  if (quizVisualData[userLogado.user]) {
    form.style.display = "none";
    resultado.innerHTML = `Você já respondeu o quiz visual. Acertos: ${quizVisualData[userLogado.user]} / 6`;
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const respostasCorretas = {
      q1: "c", // Picanha
      q2: "b", // Filé Mignon
      q3: "c", // Contra Filé
      q4: "a", // Fraldinha
      q5: "a", // Patinho
      q6: "c", // Cupim
    };

    let pontos = 0;

    Object.keys(respostasCorretas).forEach((questao) => {
      const selecionada = form.querySelector(`input[name="${questao}"]:checked`);
      if (selecionada && selecionada.value === respostasCorretas[questao]) {
        pontos++;
      }
    });

    const erros = 6 - pontos;

    // Salva no localStorage para bloquear nova resposta
    quizVisualData[userLogado.user] = pontos;
    localStorage.setItem("quizVisualData", JSON.stringify(quizVisualData));

    form.style.display = "none";
    resultado.innerHTML = `Você acertou ${pontos} de 6 perguntas!`;

    // Envia resultado para o banco
    fetch("http://localhost/Economico-Acougue/php/salvar_resultado.php", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        usuario_nome: userLogado.nome || userLogado.user,
        quiz_nome: "quiz2",
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
