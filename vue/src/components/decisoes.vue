<template>
  <div class="body min-vh-100 d-flex flex-column" data-testid="main-container">
    <header class="bg-black text-center py-4 position-relative" data-testid="page-header">
      <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo position-absolute top-0 start-0 m-3" data-testid="logo" />
      <h1 data-testid="main-title">SUPPLY AI</h1>
      <p data-testid="subtitle">Decisões Inteligentes Baseadas em Dados</p>
    </header>

    <nav class="nav justify-content-center navbar-supply py-2 fw-bold" data-testid="main-navigation">
      <a class="nav-link text-white" href="/home" data-testid="nav-home">Início</a>
      <a class="nav-link text-white" href="/sobre" data-testid="nav-about">Sobre</a>
      <a class="nav-link text-white" href="/contato" data-testid="nav-contact">Contato</a>
      <a class="nav-link text-white" href="/suaconta" data-testid="nav-account">Sua conta</a>
    </nav>

    <div class="container my-4 flex-grow-1" data-testid="content-container">
      <section class="section mb-4 shadow" data-testid="data-importance-section">
        <h2 data-testid="section-title">📊 A Importância dos Dados</h2>
        <div class="highlight" data-testid="highlight-box">
          Tomar decisões com base em dados evita erros de previsão, reduz desperdícios e garante que sua produção não pare por falta de insumos.
        </div>
      </section>

      <section class="section mb-4 shadow" data-testid="tools-section">
        <h2 data-testid="section-title">📈 Ferramentas de Apoio à Decisão</h2>
        <ul class="list-group list-group-flush" data-testid="tools-list">
          <li v-for="(ferramenta, index) in ferramentas" :key="'ferramenta-' + index" class="list-group-item bg-transparent text-light border-0" :data-testid="'tool-item-' + index">
            <span v-html="ferramenta"></span>
          </li>
        </ul>
      </section>

      <section class="section mb-4 shadow" data-testid="advantages-section">
        <h2 data-testid="section-title">🎯 Vantagens das Decisões com Dados</h2>
        <ul class="list-group list-group-flush" data-testid="advantages-list">
          <li v-for="(vantagem, index) in vantagens" :key="'vantagem-' + index" class="list-group-item bg-transparent text-light border-0" :data-testid="'advantage-item-' + index">
            {{ vantagem }}
          </li>
        </ul>
      </section>

      <section class="section mb-4 shadow" data-testid="chart-section">
        <h2 data-testid="section-title">📊 Gráfico de Consumo e Previsão de Matéria-prima</h2>
        <div class="chart-container bg-dark rounded p-3" data-testid="chart-container">
          <canvas id="consumoChart" data-testid="consumption-chart"></canvas>
        </div>
      </section>

      <section class="section mb-4 shadow" data-testid="partner-section">
        <h2 data-testid="section-title">🔍 SUPPLY AI como Parceiro de Decisão</h2>
        <div class="highlight" data-testid="highlight-box">
          A plataforma SUPPLY AI oferece dashboards interativos, análise preditiva e integração com sistemas já existentes (ERP, CRM, IoT), ajudando você a transformar dados em decisões práticas e eficazes.
        </div>
      </section>
    </div>

    <footer class="text-center py-3 navbar-supply text-dark mt-auto" data-testid="page-footer">
      <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const ferramentas = ref([
  '📅 <strong>Histórico de Consumo:</strong> Analise padrões para prever quando e quanto comprar.',
  '📍 <strong>Mapeamento de Fornecedores:</strong> Identifique pontos de risco e fornecedores alternativos com base em dados de performance.',
  '🔁 <strong>Dashboard em Tempo Real:</strong> Acompanhe estoque, demanda e previsão com gráficos atualizados.',
  '📉 <strong>Simulação de Cenários:</strong> Avalie o impacto de diferentes decisões e prepare-se para imprevistos.'
])

const vantagens = ref([
  '✔ Redução de erros operacionais e compras desnecessárias.',
  '✔ Maior controle sobre o fluxo de materiais e a produção.',
  '✔ Melhora no relacionamento com fornecedores com base em dados de entrega e qualidade.',
  '✔ Tomada de decisão mais rápida e segura, mesmo em cenários de crise.'
])

onMounted(() => {
  const ctx = document.getElementById('consumoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Consumo Real (kg)',
          data: [500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200],
          backgroundColor: '#ff6f00',
          borderColor: '#ff3d00',
          borderWidth: 1,
        },
        {
          label: 'Previsão de Consumo (kg)',
          data: [480, 590, 640, 690, 730, 780, 830, 880, 930, 980, 1050, 1150],
          backgroundColor: '#ffa040',
          borderColor: '#ff6f00',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 100,
          },
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' kg';
            },
          },
        },
      },
    },
  })
})
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

.navbar-supply {
  background-color: #f65b08;
}

.navbar-supply .nav-link {
  color: white !important;
}

.navbar-supply .nav-link:hover {
  text-decoration: underline;
}

.section {
  background: #1c1c1c;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 111, 0, 0.2);
}

h2 {
  color: #ff6f00;
  margin-bottom: 1rem;
}

.highlight {
  background-color: #262626;
  border-left: 5px solid #ffa040;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

ul {
  padding-left: 1.5rem;
  line-height: 1.8;
}

footer.navbar-supply {
  background-color: #ff6f00;
  color: #000;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>