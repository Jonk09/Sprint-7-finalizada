<template>
  <div class="account-page" data-testid="account-page">
    <button class="voltar-btn" @click="voltarInicio" data-testid="back-button">← Início</button>

    <div class="account-container" data-testid="account-container">
      <h1 data-testid="account-title">Minha Conta</h1>
      <div class="account-info" data-testid="account-info">
        <p data-testid="user-name"><strong>Nome:</strong> {{ usuario.nome }}</p>
        <p data-testid="user-email"><strong>Email:</strong> {{ usuario.email }}</p>
      </div>

      <button class="account-action" @click="abrirModalSenha" data-testid="change-password-button">Redefinir Senha</button>
      <button class="account-action logout" @click="abrirModalSair" data-testid="logout-button">Sair da Conta</button>
    </div>

    <!-- Modal Redefinir Senha -->
    <div v-if="modalSenha" class="modal-overlay" @click.self="fecharModalSenha" data-testid="password-modal">
      <div class="modal-content">
        <h2 data-testid="modal-title">Redefinir Senha</h2>
        <input 
          v-model="novaSenha" 
          type="password" 
          placeholder="Nova senha (mínimo 6 caracteres)"
          @keyup.enter="confirmarSenha"
          data-testid="password-input"
        />
        <div class="modal-actions">
          <button class="modal-btn confirm" @click="confirmarSenha" data-testid="confirm-password-button">Confirmar</button>
          <button class="modal-btn cancel" @click="fecharModalSenha" data-testid="cancel-password-button">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal Sair -->
    <div v-if="modalSair" class="modal-overlay" @click.self="fecharModalSair" data-testid="logout-modal">
      <div class="modal-content">
        <h2 data-testid="modal-title">Tem certeza que deseja sair?</h2>
        <div class="modal-actions">
          <button class="modal-btn confirm" @click="confirmarSair" data-testid="confirm-logout-button">Sim, sair</button>
          <button class="modal-btn cancel" @click="fecharModalSair" data-testid="cancel-logout-button">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Notificação -->
    <div v-if="notificacao.visible" class="notification" :class="notificacao.type" data-testid="notification">
      {{ notificacao.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref({ nome: '', email: '' })
const novaSenha = ref('')
const modalSenha = ref(false)
const modalSair = ref(false)
const notificacao = ref({ visible: false, message: '', type: '' })

onMounted(() => {
  carregarUsuario()
})

const carregarUsuario = () => {
  const emailLogado = localStorage.getItem('usuarioLogado')
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}

  if (!emailLogado || !usuarios[emailLogado]) {
    router.push('/')
    return
  }

  usuario.value = {
    nome: usuarios[emailLogado].nome,
    email: emailLogado
  }
}

const abrirModalSenha = () => {
  modalSenha.value = true
  novaSenha.value = ''
}

const fecharModalSenha = () => {
  modalSenha.value = false
}

const confirmarSenha = () => {
  if (novaSenha.value.length < 6) {
    mostrarNotificacao('A senha deve ter no mínimo 6 caracteres', 'error')
    return
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}
  usuarios[usuario.value.email].senha = novaSenha.value
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  
  fecharModalSenha()
  mostrarNotificacao('Senha atualizada com sucesso!', 'success')
}

const abrirModalSair = () => {
  modalSair.value = true
}

const fecharModalSair = () => {
  modalSair.value = false
}

const confirmarSair = () => {
  localStorage.removeItem('usuarioLogado')
  router.push('/')
}

const voltarInicio = () => {
  router.push('/home')
}

const mostrarNotificacao = (message, type) => {
  notificacao.value = { visible: true, message, type }
  setTimeout(() => {
    notificacao.value.visible = false
  }, 3000)
}
</script>

<style scoped>
.account-page {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #000000, #1c1c1c);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.voltar-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #ff6f00;
  color: #000;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.voltar-btn:hover {
  background-color: #ffa040;
}

.account-container {
  background-color: #121212;
  padding: 2rem 2.5rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 111, 0, 0.4);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.account-container h1 {
  color: #ff6f00;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.account-info p {
  font-size: 1.1rem;
  margin: 0.8rem 0;
  text-align: left;
}

.account-action {
  width: 100%;
  background-color: #ff6f00;
  color: #000;
  border: none;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.account-action:hover {
  background-color: #ffa040;
}

.account-action.logout {
  background-color: #555;
  color: white;
}

.account-action.logout:hover {
  background-color: #777;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 111, 0, 0.4);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-content h2 {
  color: #ff6f00;
  margin-bottom: 1.5rem;
}

.modal-content input {
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #2b2b2b;
  color: white;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.modal-btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.confirm {
  background-color: #ff6f00;
  color: #000;
}

.modal-btn.confirm:hover {
  background-color: #ffa040;
}

.modal-btn.cancel {
  background-color: #555;
  color: white;
}

.modal-btn.cancel:hover {
  background-color: #777;
}

/* Notification */
.notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 1001;
}

.notification.success {
  background-color: #4caf50;
  color: white;
}

.notification.error {
  background-color: #f44336;
  color: white;
}
</style>