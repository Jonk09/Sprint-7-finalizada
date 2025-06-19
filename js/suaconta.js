const emailLogado = localStorage.getItem('usuarioLogado');
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

if (!emailLogado || !usuarios[emailLogado]) {
  window.location.href = 'login.html';
} else {
  const usuario = usuarios[emailLogado];
  document.getElementById('nome').textContent = usuario.nome;
  document.getElementById('email').textContent = emailLogado;
}

// Modal redefinir senha
document.getElementById('redefinir-senha').addEventListener('click', () => {
  document.getElementById('modal-senha').style.display = 'flex';
  document.getElementById('nova-senha').focus();
});

document.getElementById('confirmar-senha').addEventListener('click', () => {
  const novaSenha = document.getElementById('nova-senha').value.trim();

  const notif = document.getElementById('notificacao');

  if (novaSenha.length >= 6) {
    usuarios[emailLogado].senha = novaSenha;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('modal-senha').style.display = 'none';
    document.getElementById('nova-senha').value = '';

    notif.textContent = 'Senha atualizada com sucesso!';
    notif.style.backgroundColor = '#4caf50'; // verde
    notif.style.display = 'block';

    setTimeout(() => {
      notif.style.display = 'none';
    }, 3000);
  } else {
    notif.textContent = 'Senha deve ter ao menos 6 caracteres.';
    notif.style.backgroundColor = '#f44336'; // vermelho
    notif.style.display = 'block';

    setTimeout(() => {
      notif.style.display = 'none';
    }, 3000);
  }
});

document.getElementById('cancelar-senha').addEventListener('click', () => {
  document.getElementById('modal-senha').style.display = 'none';
  document.getElementById('nova-senha').value = '';
});

// Modal sair da conta
document.getElementById('btn-sair').addEventListener('click', () => {
  document.getElementById('modal-sair').style.display = 'flex';
});

document.getElementById('confirmar-sair').addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
});

document.getElementById('cancelar-sair').addEventListener('click', () => {
  document.getElementById('modal-sair').style.display = 'none';
});
