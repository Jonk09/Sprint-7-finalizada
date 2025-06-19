const email = localStorage.getItem('usuarioLogado');
const usuarios = JSON.parse(localStorage.getItem('usuarios'));

if (!email || !usuarios[email]) {
  // Redireciona se não estiver logado
  window.location.href = 'login.html';
} else {
  document.getElementById('nomeUsuario').textContent = usuarios[email].nome;
}
