<template>
  <div class="container" data-testid="welcome-container">
    <h1 data-testid="welcome-title">Bem-vindo(a), <span data-testid="user-name">{{ nomeUsuario }}</span>!</h1>
    <p data-testid="welcome-message">Você está logado no SUPPLY AI.</p>
    <button 
      data-testid="logout-button" 
      class="btn-logout" 
      @click="sair"
    >
      Sair
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nomeUsuario = ref('')

function sair() {
  localStorage.removeItem('usuarioLogado')
  router.push('/home')
}

onMounted(() => {
  // Adiciona fundo ao body
  document.body.classList.add('fundo-bemvindo')

  const email = localStorage.getItem('usuarioLogado')
  const usuarios = JSON.parse(localStorage.getItem('usuarios'))

  if (!email || !usuarios?.[email]) {
    router.push('/')  // Redireciona pra tela de login ou home se não estiver logado
  } else {
    nomeUsuario.value = usuarios[email].nome
  }
})

onUnmounted(() => {
  document.body.classList.remove('fundo-bemvindo')
})
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #f65b08;
}

.btn-logout {
  margin-top: 2rem;
  background-color: #f65b08;
  color: #000;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #d14f05;
  color: #fff;
}
</style>

<style>
.fundo-bemvindo {
  margin: 0;
  padding: 0;
  background-color: #000000;
  height: 100%;
}
</style>