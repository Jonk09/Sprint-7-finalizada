<template>
  <div class="body" data-testid="main-container">
    <div>
      <header data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Integração de Sistemas para um Suprimento Inteligente</p>
      </header>

      <nav data-testid="main-navigation">
        <RouterLink to="/home" data-testid="nav-home">Início</RouterLink>
        <RouterLink to="/sobre" data-testid="nav-about">Sobre</RouterLink>
        <RouterLink to="/contato" data-testid="nav-contact">Contato</RouterLink>
        <RouterLink to="/suaconta" data-testid="nav-account">Sua conta</RouterLink>
      </nav>

      <div class="container py-4" data-testid="content-container">
        <!-- Integração com Sistemas -->
        <section class="section mb-4 p-3 rounded shadow-sm bg-dark text-light" data-testid="integration-section">
          <h2 class="text-orange mb-3" data-testid="section-title">🔌 Integração com Sistemas</h2>
          <p data-testid="section-description">
            A integração com ERPs, CRMs e sensores IoT permite uma visão centralizada do estoque, consumo e demandas futuras, evitando a escassez de matéria-prima e otimizando decisões de compra.
          </p>
          <ul class="ps-4" data-testid="integration-list">
            <li v-for="(item, index) in integracoes" :key="index" class="mb-2" :data-testid="`integration-item-${index}`">
              <strong data-testid="integration-title">{{ item.titulo }}</strong> 
              <span data-testid="integration-text">{{ item.texto }}</span>
            </li>
          </ul>
        </section>

        <!-- Fluxo de Integração -->
        <section class="section flowchart text-center mb-4 p-3 rounded shadow-sm bg-dark text-orange" data-testid="flow-section">
          <h2 class="mb-4" data-testid="section-title">🔁 Fluxo de Integração SUPPLY AI</h2>
          <div class="d-flex justify-content-center align-items-center flex-wrap gap-3" data-testid="flow-diagram">
            <div class="box px-3 py-2 rounded bg-secondary text-orange fw-bold shadow" data-testid="flow-box-sensor">
              Sensor IoT
            </div>
            <span class="arrow fs-4" data-testid="flow-arrow-1">➡</span>
            <div class="box px-3 py-2 rounded bg-secondary text-orange fw-bold shadow" data-testid="flow-box-supply">
              SUPPLY AI
            </div>
            <span class="arrow fs-4" data-testid="flow-arrow-2">➡</span>
            <div class="box px-3 py-2 rounded bg-secondary text-orange fw-bold shadow" data-testid="flow-box-erp">
              ERP / CRM
            </div>
            <span class="arrow fs-4" data-testid="flow-arrow-3">➡</span>
            <div class="box px-3 py-2 rounded bg-secondary text-orange fw-bold shadow" data-testid="flow-box-order">
              Pedido Otimizado
            </div>
          </div>
        </section>

        <!-- Resultado -->
        <section class="section mb-4 p-3 rounded shadow-sm bg-dark text-light" data-testid="results-section">
          <h2 class="text-orange mb-3" data-testid="section-title">🎯 Resultado</h2>
          <p data-testid="section-description">Com a integração de sistemas, o SUPPLY AI garante que a sua empresa:</p>
          <ul class="ps-4" data-testid="results-list">
            <li v-for="(resultado, index) in resultados" :key="index" class="mb-2" :data-testid="`result-item-${index}`">
              {{ resultado }}
            </li>
          </ul>
        </section>
      </div>

      <footer data-testid="page-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const integracoes = [
  { titulo: 'ERPs:', texto: ' Integração com sistemas como SAP, TOTVS e Bling para sincronizar pedidos, estoque e faturamento.' },
  { titulo: 'CRMs:', texto: ' Previsão de demanda baseada em histórico de clientes e funil de vendas.' },
  { titulo: 'IoT:', texto: ' Sensores monitoram em tempo real o nível de matéria-prima nos depósitos e nas linhas de produção.' },
  { titulo: 'API REST:', texto: ' SUPPLY AI oferece integração simples e segura com qualquer sistema que sua empresa já utilize.' },
]

const resultados = [
  'Evite compras emergenciais e custos extras.',
  'Tenha previsões precisas com base em dados reais.',
  'Automatize a reposição de estoque com inteligência.',
  'Mantenha a produção ativa mesmo diante de variações no mercado.',
]
</script>

<style scoped>
/* Mantive seus estilos originais para header, footer e body */
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

/* Nova classe para texto laranja */
.text-orange {
  color: #ff6f00 !important;
}

.arrow {
  vertical-align: middle;
  color: #ff6f00;
}

/* Footer mantém estilo laranja forte */
footer {
  text-align: center;
  padding: 1rem;
  background-color: #ff6f00;
  color: #000;
  margin-top: 2rem;
}
</style>