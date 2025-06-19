<template>
  <div class="body" data-testid="main-container">
    <div>
      <header data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Monitoramento de Estoque em Tempo Real</p>
      </header>

      <nav data-testid="main-navigation">
        <RouterLink to="/home" data-testid="nav-home">Início</RouterLink>
        <RouterLink to="/sobre" data-testid="nav-about">Sobre</RouterLink>
        <RouterLink to="/contato" data-testid="nav-contact">Contato</RouterLink>
        <RouterLink to="/suaconta" data-testid="nav-account">Sua conta</RouterLink>
      </nav>

      <div class="container" data-testid="content-container">
        <section class="section" data-testid="stock-section">
          <h2 data-testid="section-title">📦 Níveis de Estoque</h2>
          <p data-testid="section-description">Visualize rapidamente os níveis atuais de insumos e evite que a produção pare por falta de matéria-prima.</p>

          <table data-testid="stock-table">
            <thead>
              <tr>
                <th data-testid="table-header-material">Matéria-prima</th>
                <th data-testid="table-header-quantity">Quantidade Atual (kg)</th>
                <th data-testid="table-header-level">Nível</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in stockItems" :key="item.name" data-testid="stock-row">
                <td data-testid="material-name">{{ item.name }}</td>
                <td data-testid="material-quantity">{{ item.quantity }}</td>
                <td data-testid="material-level">
                  <div class="progress-bar" data-testid="progress-container">
                    <div
                      class="progress"
                      :class="getLevelClass(item)"
                      :style="{ width: getPercentage(item) + '%' }"
                      data-testid="progress-bar"
                    >
                      {{ getPercentage(item) }}%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="section" data-testid="iot-section">
          <h2 data-testid="section-title">📡 Atualização Inteligente</h2>
          <p data-testid="section-description">
            Os dados são coletados em tempo real via sensores IoT conectados à nossa plataforma,
            garantindo precisão nas decisões de reabastecimento.
          </p>
        </section>
      </div>

      <footer data-testid="page-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const stockItems = ref([
  { name: 'Aço Inox', quantity: 120, maxQuantity: 600 },
  { name: 'Plástico ABS', quantity: 450, maxQuantity: 1000 },
  { name: 'Cobre', quantity: 800, maxQuantity: 1000 },
  { name: 'Alumínio', quantity: 300, maxQuantity: 1000 },
  { name: 'Resina Epóxi', quantity: 50, maxQuantity: 500 }
])

function getPercentage(item) {
  return Math.round((item.quantity / item.maxQuantity) * 100)
}

function getLevelClass(item) {
  const percentage = getPercentage(item)
  if (percentage <= 30) return 'low'
  if (percentage <= 60) return 'medium'
  return 'high'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.body {
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
  box-shadow: 0 2px 5px rgba(255, 111, 0, 0.2);
}

h2 {
  color: #ff6f00;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #2c2c2c;
  color: #ffa040;
}

.progress-bar {
  height: 20px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  text-align: center;
  color: #000;
  font-weight: bold;
}

.low {
  background-color: #ff3d00;
}

.medium {
  background-color: #ff6f00;
}

.high {
  background-color: #00c853;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #ff6f00;
  color: #000;
  margin-top: 2rem;
}
</style>