<template>
  <div class="body">
    <div>
      <header>
        <img :src="logo" alt="Logo SUPPLY AI" class="logo" data-testid="header-logo" />
        <h1 data-testid="header-title">SUPPLY AI</h1>
        <p data-testid="header-subtitle">Alertas e Previsões Inteligentes</p>
      </header>

      <nav data-testid="main-nav">
        <a href="/home" data-testid="nav-inicio">Início</a>
        <a href="/sobre" data-testid="nav-sobre">Sobre</a>
        <a href="/contato" data-testid="nav-contato">Contato</a>
        <a href="/suaconta" data-testid="nav-conta">Sua conta</a>
      </nav>

      <div class="container">
        <section class="section mb-4 shadow rounded p-4" data-testid="alertas-section">
          <h2 data-testid="alertas-title">⚠️ Alertas de Insumos Críticos</h2>
          <div
            v-for="(alerta, index) in alertas"
            :key="'alerta-' + index"
            class="alert custom-alert fw-bold py-3 px-4 shadow-sm rounded"
            :data-testid="`alerta-item-${index}`"
          >
            {{ alerta }}
          </div>
        </section>

        <section class="section mb-4 shadow rounded p-4" data-testid="previsoes-section">
          <h2 data-testid="previsoes-title">📈 Previsões Baseadas em Consumo</h2>
          <div
            v-for="(previsao, index) in previsoes"
            :key="'previsao-' + index"
            class="forecast py-3 px-4 shadow-sm rounded"
            :data-testid="`previsao-item-${index}`"
          >
            {{ previsao }}
          </div>
        </section>

        <section class="section mb-4 shadow rounded p-4" data-testid="recomendacoes-section">
          <h2 data-testid="recomendacoes-title">💡 Recomendações Inteligentes</h2>
          <ul class="list-group">
            <li
              v-for="(recomendacao, index) in recommendations"
              :key="'recomendacao-' + index"
              class="list-group-item bg-dark text-light border-0"
              :data-testid="`recomendacao-item-${index}`"
            >
              {{ recomendacao }}
            </li>
          </ul>
        </section>
      </div>

      <footer data-testid="main-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/log.png'

export default {
  name: 'Alertas',
  props: {
    logo: {
      type: String,
      default: logo
    }
  },
  data() {
    return {
      alertas: [
        '🔴 Atenção: O estoque de "Polímero XZ-100" está abaixo do nível mínimo! Restam apenas 12 unidades.',
        '🟠 Aviso: "Liga Metálica 303" será insuficiente para a produção da próxima semana.',
        '🟡 Monitoramento: "Resina PL-20" em consumo acelerado — 40% acima da média do mês passado.'
      ],
      previsoes: [
        '🔮 Estimativa: "Polímero XZ-100" se esgotará em 3 dias. Recomenda-se reposição imediata.',
        '🔮 Projeção: Demanda por "Liga Metálica 303" aumentará 25% no próximo mês devido a novos pedidos.',
        '🔮 Tendência: Consumo de "Resina PL-20" manterá crescimento acelerado com base nos últimos 45 dias.'
      ],
      recommendations: [
        'Automatize pedidos com base em alertas de estoque crítico.',
        'Mapeie fornecedores alternativos para insumos prioritários.',
        'Integre sensores IoT para monitorar níveis de estoque em tempo real.',
        'Use IA para prever picos de demanda e ajustar compras.',
        'Configure alertas personalizados para cada tipo de insumo.'
      ]
    }
  }
}
</script>

<style scoped>
/* Seus estilos permanecem exatamente os mesmos */
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
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  box-sizing: border-box;
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
  box-shadow: 0 2px 5px rgba(255, 111, 0, 0.4);
}

h2 {
  color: #ff6f00;
  margin-bottom: 1rem;
}

.custom-alert {
  background-color: #f65b08;
  color: #000;
}

.forecast {
  background-color: #262626;
  border-left: 5px solid #ffa040;
  color: #f5f5f5;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #ff6f00;
  color: #000;
  margin-top: 2rem;
}

.list-group-item {
  background-color: #1c1c1c;
}
</style>