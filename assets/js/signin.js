function entrar(){
  let usuario = document.querySelector('#usuario');
  let senha = document.querySelector('#senha');
  let userLabel = document.querySelector('label[for="usuario"]');
  let senhaLabel = document.querySelector('label[for="senha"]');
  let msgError = document.querySelector('#msgError');

  const formData = new FormData();
  formData.append("usuario", usuario.value);
  formData.append("senha", senha.value);

  fetch("http://localhost/Economico-Acougue/assets/php/login.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "ok"){
      localStorage.setItem("userLogado", JSON.stringify({nome: data.nome, user: usuario.value}));
      window.location.href = "../html/index.html";
    } else {
      userLabel.style.color = 'red';
      usuario.style.borderColor = 'red';
      senhaLabel.style.color = 'red';
      senha.style.borderColor = 'red';
      msgError.style.display = 'block';
      msgError.innerHTML = `<strong>${data.mensagem}</strong>`;
    }
  })
  .catch(() => {
    msgError.style.display = 'block';
    msgError.innerHTML = "<strong>Erro de conexão com o servidor</strong>";
  });
}

function mostrarSenha(){
  let inputSenha = document.querySelector('#senha');
  inputSenha.type = inputSenha.type === 'password' ? 'text' : 'password';
}
