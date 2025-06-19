document.getElementById('cadastro-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.querySelector('input[placeholder="Nome Completo"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value.toLowerCase();
  const senha = document.querySelector('input[placeholder="Criar Senha"]').value;
  const msgSucesso = document.getElementById('mensagem-sucesso');

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (usuarios[email]) {
    alert("Este e-mail já está cadastrado.");
    return;
  }

  usuarios[email] = {
    nome: nome,
    senha: senha
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  msgSucesso.style.display = 'block';

  // Redireciona após 2 segundos
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
