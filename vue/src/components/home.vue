<template>
  <div class="bg-home" data-testid="home-container">
    <div>
      <header data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Inovação que mantém sua produção em movimento</p>
      </header>

      <nav data-testid="main-navigation">
        <RouterLink to="/sobre" data-testid="nav-about">Sobre</RouterLink>
        <RouterLink to="/contato" data-testid="nav-contact">Contato</RouterLink>
        <RouterLink to="/suaconta" data-testid="nav-account">Sua conta</RouterLink>
      </nav>

      <div class="container" data-testid="content-container">
        <section id="beneficios" class="section" data-testid="benefits-section">
          <div class="btn-group d-grid gap-3" data-testid="button-group">
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('alertas')"
              data-testid="alert-button"
            >
              📢 Alertas e Previsões Inteligentes
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('reducao')"
              data-testid="cost-button"
            >
              💰 Redução de Custos
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('decisoes')"
              data-testid="data-button"
            >
              📊 Decisões com Dados
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('estoque')"
              data-testid="stock-button"
            >
              📦 Estoque em Tempo Real
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('escalabilidade')"
              data-testid="scale-button"
            >
              🚀 Escalabilidade
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('integracao')"
              data-testid="integration-button"
            >
              🔌 Integração com Sistemas
            </button>
            <button 
              class="btn custom-btn btn-lg fw-bold py-3 shadow rounded" 
              @click="goTo('conexao')"
              data-testid="connection-button"
            >
              🤝 Conexão entre Empresas
            </button>
          </div>
        </section>
      </div>

      <footer data-testid="page-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(page) {
  router.push(`/${page}`)
}

function logout() {
  localStorage.removeItem('usuarioLogado')
  router.push('/suaconta')
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.bg-home {
  background: linear-gradient(to right, #000000, #000000);
  color: #f5f5f5;
}

header {
  background-color: #000000;
  color: #ffffff;
  padding: 1.5rem;
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

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  background-color: #f65b08;
  padding: 0.75rem;
  align-items: center;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

.container {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

.section {
  margin-bottom: 2rem;
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(58, 25, 9, 0.2);
}

.btn-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.custom-btn {
  background-color: #f65b08;
  color: #ffffff;
  border: none;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #ffa040;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #ff6f00;
  color: #000;
  margin-top: 2rem;
}
</style>