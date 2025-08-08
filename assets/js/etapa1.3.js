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

  // Verifica se o usuário já respondeu
  if (quizData[userLogado.user]) {
    form.style.display = "none";
    resultado.innerHTML = `Você já respondeu o quiz. Acertos: ${quizData[userLogado.user]} / 6`;
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const respostasCorretas = {
      q1: "c", // Filé Mignon
      q2: "b", // Picanha
      q3: "b", // Patinho
      q4: "a", // Cupim
      q5: "a", // Coxão duro
      q6: "b", // Acém
    };

    let pontos = 0;

    Object.keys(respostasCorretas).forEach((questao) => {
      const selecionada = form.querySelector(`input[name="${questao}"]:checked`);
      if (selecionada && selecionada.value === respostasCorretas[questao]) {
        pontos++;
      }
    });

    // Armazena pontuação por usuário
    quizData[userLogado.user] = pontos;
    localStorage.setItem("quizData", JSON.stringify(quizData));

    form.style.display = "none";
    resultado.innerHTML = `Você acertou ${pontos} de 6 perguntas!`;
  });
});
