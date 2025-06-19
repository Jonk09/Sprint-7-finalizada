<template>
  <div class="auth-page" data-testid="auth-page">
    <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
    <div class="auth-container" data-testid="auth-container">
      <h1 data-testid="auth-title">SUPPLY AI</h1>
      <form @submit.prevent="handleLogin" data-testid="login-form">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          required 
          data-testid="email-input"
        />
        <input 
          v-model="senha" 
          type="password" 
          placeholder="Senha" 
          required 
          data-testid="password-input"
        />
        
        <RouterLink 
          class="auth-link" 
          to="/cadastro" 
          data-testid="register-link"
        >
          Não tem uma conta? Cadastre-se
        </RouterLink>
        
        <button 
          class="auth-btn" 
          type="submit" 
          :disabled="loading"
          data-testid="login-button"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
        
        <div 
          v-if="mensagem.texto" 
          class="mensagem" 
          :class="{ 'erro': mensagem.erro }"
          data-testid="message-alert"
        >
          {{ mensagem.texto }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')
const loading = ref(false)
const mensagem = ref({ texto: '', erro: false })

const handleLogin = () => {
  loading.value = true
  mensagem.value = { texto: '', erro: false }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {}
  const emailNormalizado = email.value.toLowerCase().trim()

  if (usuarios[emailNormalizado] && usuarios[emailNormalizado].senha === senha.value) {
    localStorage.setItem('usuarioLogado', emailNormalizado)
    mensagem.value = { texto: 'Login bem-sucedido! Redirecionando...', erro: false }
    
    setTimeout(() => {
      router.push('/home')
    }, 1500)
  } else {
    mensagem.value = { texto: 'Email ou senha incorretos', erro: true }
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #000000, #1c1c1c);
}

.auth-container {
  background-color: #121212;
  padding: 3rem 2.5rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 111, 0, 0.4);
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
}

.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 93px;
  height: auto;
}

h1 {
  color: #ff6f00;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

input {
  width: 100%;
  padding: 0.9rem;
  margin: 0.6rem 0;
  border: none;
  border-radius: 8px;
  background-color: #2b2b2b;
  color: white;
  font-size: 1rem;
}

input::placeholder {
  color: #aaa;
}

.auth-btn {
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

.auth-btn:hover:not(:disabled) {
  background-color: #ffa040;
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-link {
  margin-top: 1rem;
  display: block;
  color: #ff6f00;
  text-decoration: none;
  font-size: 0.95rem;
}

.auth-link:hover {
  text-decoration: underline;
}

.mensagem {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  color: green;
}

.mensagem.erro {
  color: #ff4444;
}
</style>