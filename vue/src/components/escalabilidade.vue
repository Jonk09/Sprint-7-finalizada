<template>
  <div class="body" data-testid="main-container">
    <div>
      <header data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo">
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Escalabilidade e Estabilidade para sua Produção</p>
      </header>

      <nav data-testid="main-navigation">
        <a href="/home" data-testid="nav-home">Início</a>
        <a href="/sobre" data-testid="nav-about">Sobre</a>
        <a href="/contato" data-testid="nav-contact">Contato</a>
        <a href="/suaconta" data-testid="nav-account">Sua conta</a>
      </nav>

      <div class="container" data-testid="content-container">
        <section class="section" data-testid="scalability-section">
          <h2 data-testid="section-title">🚀 Escalabilidade que acompanha seu crescimento</h2>
          <p data-testid="section-description">O SUPPLY AI é projetado para crescer junto com sua empresa...</p>
          <ul data-testid="scalability-list">
            <li v-for="(item, index) in escalabilidade" :key="index" data-testid="scalability-item">
              <strong data-testid="item-title">{{ item.titulo }}</strong> 
              <span data-testid="item-text">{{ item.texto }}</span>
            </li>
          </ul>
        </section>

        <section class="section" data-testid="timeline-section">
          <h2 data-testid="section-title">💡 Linha do Tempo de Escalabilidade</h2>
          <ul class="timeline" data-testid="timeline-list">
            <li v-for="(fase, index) in timeline" :key="index" class="timeline-item" data-testid="timeline-item">
              <div class="timeline-item-content" data-testid="timeline-content">
                <h3 data-testid="timeline-title">{{ fase.titulo }}</h3>
                <p data-testid="timeline-text">{{ fase.texto }}</p>
              </div>
            </li>
          </ul>
        </section>

        <section class="section" data-testid="chart-section">
          <h2 data-testid="section-title">📊 Gráfico de Escalabilidade</h2>
          <canvas id="scalabilityChart" data-testid="scalability-chart"></canvas>
        </section>
      </div>

      <footer data-testid="page-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

const escalabilidade = [
  { titulo: 'Infraestrutura escalável:', texto: ' suporte a múltiplas unidades...' },
  { titulo: 'Modularidade:', texto: ' adicione funcionalidades conforme a necessidade...' },
  { titulo: 'Previsão adaptativa:', texto: ' algoritmos ajustam os pedidos...' },
  { titulo: 'Cloud Computing:', texto: ' hospedado na nuvem...' },
  { titulo: 'Evita gargalos:', texto: ' alertas automáticos evitam falta...' },
];

const timeline = [
  { titulo: 'Fase 1: Pequenas Produções', texto: 'Controle básico de estoque e previsão de demanda simples...' },
  { titulo: 'Fase 2: Expansão Inicial', texto: 'Comece a integrar fornecedores...' },
  { titulo: 'Fase 3: Grande Escala', texto: 'Integração com IoT, sensores para monitoramento...' },
  { titulo: 'Fase 4: Estabilidade e Eficiência', texto: 'Operação completamente integrada...' },
];

onMounted(() => {
  const ctx = document.getElementById('scalabilityChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
      datasets: [
        {
          label: 'Capacidade de Gestão de Estoque',
          data: [100, 300, 500, 700, 1000],
          borderColor: '#ff6f00',
          backgroundColor: 'rgba(255, 111, 0, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
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

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.75rem;
}

.timeline {
  position: relative;
  margin: 2rem 0;
  padding: 0;
  list-style: none;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ff6f00;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background-color: #ff6f00;
}

.timeline-item-content {
  background-color: #2c2c2c;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 111, 0, 0.2);
  position: relative;
  margin-left: 40px;
  max-width: 75%;
}

.timeline-item-content h3 {
  color: #ff6f00;
  margin-bottom: 0.5rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #ff6f00;
  color: #000;
  margin-top: 2rem;
}

canvas {
  max-width: 100%;
  height: 400px;
  margin-top: 2rem;
}
</style>