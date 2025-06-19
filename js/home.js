// Função de logout (exemplo para uso futuro)
function logout() {
  // Remove apenas os dados da sessão, mantendo email/senha salvos (se o usuário marcou lembrar)
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}
