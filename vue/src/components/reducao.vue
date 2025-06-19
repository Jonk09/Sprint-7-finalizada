<template>
  <div class="body" data-testid="main-container">
    <div>
      <header data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Redução de Custos na Gestão de Suprimentos</p>
      </header>

      <nav data-testid="main-navigation">
        <a href="/home" data-testid="nav-home">Início</a>
        <a href="/sobre" data-testid="nav-about">Sobre</a>
        <a href="/contato" data-testid="nav-contact">Contato</a>
        <a href="/suaconta" data-testid="nav-account">Sua conta</a>
      </nav>

      <div class="container" data-testid="content-container">
        <section class="section mb-4 shadow rounded p-4" data-testid="challenge-section">
          <h2 data-testid="section-title">📉 Desafio: Custos Altos com Falta de Insumos</h2>
          <div class="highlight py-3 px-4 shadow-sm rounded" data-testid="highlight-box">
            Quando insumos acabam de forma inesperada, empresas recorrem a compras emergenciais,
            aumentando o custo final da produção e comprometendo os prazos.
          </div>
        </section>

        <section class="section mb-4 shadow rounded p-4" data-testid="strategies-section">
          <h2 data-testid="section-title">💡 Estratégias de Redução de Custos</h2>
          <ul class="list-group" data-testid="strategies-list">
            <li
              v-for="(estrategia, index) in estrategias"
              :key="'estrategia-' + index"
              class="list-group-item bg-dark text-light border-0"
              :data-testid="`strategy-item-${index}`"
            >
              <span v-html="estrategia" data-testid="strategy-text"></span>
            </li>
          </ul>
        </section>

        <section class="section mb-4 shadow rounded p-4" data-testid="results-section">
          <h2 data-testid="section-title">🎯 Resultados Esperados</h2>
          <ul class="list-group" data-testid="results-list">
            <li
              v-for="(resultado, index) in resultados"
              :key="'resultado-' + index"
              class="list-group-item bg-dark text-light border-0"
              :data-testid="`result-item-${index}`"
            >
              {{ resultado }}
            </li>
          </ul>
        </section>

        <section class="section mb-4 shadow rounded p-4" data-testid="practice-section">
          <h2 data-testid="section-title">🚀 SUPPLY AI na Prática</h2>
          <div class="highlight py-3 px-4 shadow-sm rounded" data-testid="highlight-box">
            A solução SUPPLY AI é pensada para PMEs que precisam de um sistema acessível, inteligente e fácil de implementar. Com dashboards interativos, alertas automáticos e módulos escaláveis, sua empresa economiza tempo e dinheiro desde o primeiro dia.
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
import { ref } from 'vue'

const estrategias = ref([
  '🔍 <strong>Monitoramento de Consumo:</strong> Identifique padrões e evite desperdícios com alertas de uso fora do normal.',
  '📅 <strong>Compras Planejadas:</strong> Negocie com antecedência com fornecedores e reduza custos com frete urgente.',
  '🧠 <strong>IA para Previsões:</strong> Use algoritmos para prever necessidades e evitar estoques desnecessários.',
  '⚙ <strong>Integração com Sistemas:</strong> Elimine retrabalho, sincronize dados de compras e estoques em tempo real.',
  '🛠 <strong>Manutenção Preventiva:</strong> Reduza paradas e perdas por falhas nos insumos ou materiais.'
])

const resultados = ref([
  '✅ Redução de até 30% com compras emergenciais.',
  '✅ Mais segurança no abastecimento e no planejamento de produção.',
  '✅ Melhora significativa no cumprimento de prazos com clientes.',
  '✅ Menor dependência de poucos fornecedores.'
])
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';

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
  color: #f65b08;
  margin-bottom: 1rem;
}

.highlight {
  background-color: #262626;
  border-left: 5px solid #f65b08;
  color: #f5f5f5;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #f65b08;
  color: #000;
  margin-top: 2rem;
}

.list-group-item {
  background-color: #1c1c1c;
}
</style>