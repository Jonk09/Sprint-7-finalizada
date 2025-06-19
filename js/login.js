document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.toLowerCase();
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('mensagem-erro');
  const sucesso = document.getElementById('mensagem-sucesso');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (usuarios[email] && usuarios[email].senha === senha) {
    localStorage.setItem('usuarioLogado', email);
    erro.style.display = 'none';
    sucesso.style.display = 'block';

    setTimeout(() => {
      window.location.href = 'bemvindo.html';
    }, 2000);
  } else {
    sucesso.style.display = 'none';
    erro.style.display = 'block';
  }
});
