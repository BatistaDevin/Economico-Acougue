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

  if (quizVisualData[userLogado.user]) {
    form.style.display = "none";
    resultado.innerHTML = `Você já respondeu esse quiz visual. Acertos: ${quizVisualData[userLogado.user]} / 6`;
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

    quizVisualData[userLogado.user] = pontos;
    localStorage.setItem("quizVisualData", JSON.stringify(quizVisualData));

    form.style.display = "none";
    resultado.innerHTML = `Você acertou ${pontos} de 6 perguntas!`;
  });
});
