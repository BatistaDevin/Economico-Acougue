const texto = `Olá! Me chamo <strong>Lucas Batista</strong>, sou o desenvolvedor deste sistema e também monitor no setor de açougue, como muitos de vocês já sabem.<br><br>
Desenvolvi esta ideia com o objetivo de compartilhar o máximo de conhecimento possível com todos.<br><br>
Este é um <strong>treinamento rápido</strong>, mas cuidadosamente pensado para trazer aprendizado de forma prática e eficiente.<br><br>
Espero que esse conteúdo contribua para o seu <strong>crescimento profissional</strong>, agregando valor à sua rotina e ampliando sua visão dentro do setor.`;

const container = document.getElementById("mensagem");
let index = 0;
let atual = "";

function digitar() {
  if (index < texto.length) {
    const char = texto.charAt(index);
    atual += char;
    container.innerHTML = atual;
    index++;
    setTimeout(digitar, 30); // velocidade da digitação
  } else {
    // Exibe os botões após terminar de digitar
    const botoes = document.getElementById("botoes");
    if (botoes) {
      botoes.style.display = "flex";
    }
  }
}

digitar();

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "./signin.html";
}
