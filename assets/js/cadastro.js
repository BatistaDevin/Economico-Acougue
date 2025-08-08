let nome = document.querySelector('#nome');
let usuario = document.querySelector('#usuario');
let senha = document.querySelector('#senha');
let confirmSenha = document.querySelector('#confirmSenha');

let labelNome = document.querySelector('#labelNome');
let labelUsuario = document.querySelector('#labelUsuario');
let labelSenha = document.querySelector('#labelSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

let validNome = false;
let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;

nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.style.color = 'red';
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.style.borderColor = 'red';
    validNome = false;
  } else {
    labelNome.style.color = 'green';
    labelNome.innerHTML = 'Nome';
    nome.style.borderColor = 'green';
    validNome = true;
  }
});

usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 4) {
    labelUsuario.style.color = 'red';
    labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
    usuario.style.borderColor = 'red';
    validUsuario = false;
  } else {
    labelUsuario.style.color = 'green';
    labelUsuario.innerHTML = 'Usuário';
    usuario.style.borderColor = 'green';
    validUsuario = true;
  }
});

senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.style.color = 'red';
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
    senha.style.borderColor = 'red';
    validSenha = false;
  } else {
    labelSenha.style.color = 'green';
    labelSenha.innerHTML = 'Senha';
    senha.style.borderColor = 'green';
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if (senha.value !== confirmSenha.value) {
    labelConfirmSenha.style.color = 'red';
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.style.borderColor = 'red';
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.style.color = 'green';
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.style.borderColor = 'green';
    validConfirmSenha = true;
  }
});

document.querySelector('#verSenha').addEventListener('click', () => {
  senha.type = senha.type === 'password' ? 'text' : 'password';
});

document.querySelector('#verConfirmSenha').addEventListener('click', () => {
  confirmSenha.type = confirmSenha.type === 'password' ? 'text' : 'password';
});

function cadastrar() {
  if (validNome && validUsuario && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.style.display = 'none';

    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 2000);
  } else {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.style.display = 'none';
  }
}
