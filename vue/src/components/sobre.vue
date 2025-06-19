<template>
  <div class="body" data-testid="main-container">
    <div>
      <header class="bg-black text-white py-4 position-relative text-center" data-testid="page-header">
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo position-absolute" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Inovação que mantém sua produção em movimento</p>
      </header>

      <nav class="d-flex justify-content-center gap-4 bg-orange p-3" data-testid="main-navigation">
        <a href="/home" class="text-white fw-bold text-decoration-none nav-link" data-testid="nav-home">Início</a>
        <a href="/contato" class="text-white fw-bold text-decoration-none nav-link" data-testid="nav-contact">Contato</a>
        <a href="suaconta" class="text-white fw-bold text-decoration-none nav-link" data-testid="nav-account">Sua conta</a>
      </nav>

      <div class="container py-4" data-testid="content-container">
        <section id="sobre" class="section bg-dark rounded shadow-sm p-4 mb-5" data-testid="about-section">
          <h2 class="text-orange mb-4" data-testid="section-title">O que é o SUPPLY AI?</h2>
          <p data-testid="section-text">
            O SUPPLY AI é uma solução inteligente e acessível de gestão de insumos e fornecedores, desenvolvida especialmente para pequenas e médias indústrias.
            Nosso sistema automatiza o controle de estoque, prevê demandas futuras e ajuda sua empresa a evitar atrasos, reduzir custos e se tornar mais resiliente a imprevistos.
          </p>

          <h2 class="text-orange mt-5 mb-4" data-testid="section-title">Por que criamos o SUPPLY AI?</h2>
          <p data-testid="section-text">
            Muitas PMEs enfrentam problemas sérios por falta de matéria-prima na hora certa.
            As ferramentas disponíveis hoje são caras, complexas e feitas para grandes empresas.
            O SUPPLY AI surge como uma alternativa simples, eficaz e sob medida para empresas que precisam de eficiência sem complicação.
          </p>

          <h2 class="text-orange mt-5 mb-4" data-testid="section-title">Como o SUPPLY AI ajuda sua empresa?</h2>
          <ul class="mb-4 ps-4" data-testid="benefits-list">
            <li data-testid="benefit-item">Evita atrasos na produção com alertas automáticos e previsões inteligentes.</li>
            <li data-testid="benefit-item">Reduz custos ao minimizar compras emergenciais.</li>
            <li data-testid="benefit-item">Facilita decisões com dashboards simples e relatórios personalizados.</li>
            <li data-testid="benefit-item">Monitora estoques em tempo real com sensores IoT.</li>
            <li data-testid="benefit-item">Se adapta ao seu ritmo, com módulos que crescem junto com sua operação.</li>
            <li data-testid="benefit-item">Integra com os sistemas que você já usa (ERP, CRM etc.).</li>
            <li data-testid="benefit-item">Conecta empresas para troca de dados e boas práticas na cadeia de suprimentos.</li>
          </ul>

          <h2 class="text-orange mt-5 mb-4" data-testid="section-title">É pra minha empresa?</h2>
          <p data-testid="section-text">
            Se você é gestor de uma pequena ou média indústria e busca uma forma prática, moderna e acessível de controlar insumos e fornecedores,
            o SUPPLY AI é pra você. Menos burocracia, mais controle, e resultados reais.
          </p>

          <h2 class="text-orange mt-5 mb-4" data-testid="section-title">Quer saber mais?</h2>
          <p data-testid="section-text">
            Fale com a gente e descubra como o SUPPLY AI pode transformar a gestão da sua produção!
          </p>
        </section>
      </div>

      <footer class="bg-orange text-black text-center py-3 mt-5" data-testid="page-footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
// Você não estava usando o script, pode manter vazio ou remover se quiser
</script>

<style scoped>
/* Cores customizadas para combinar com sua identidade */

.body {
  background: linear-gradient(to right, #000000, #000000);
  color: #f5f5f5;
}

.logo {
  top: 10px;
  left: 10px;
  width: 93px;
  height: auto;
}

/* Classe para laranja que não existe no Bootstrap, vou criar */
.bg-orange {
  background-color: #f65b08 !important;
}

.text-orange {
  color: #f65b08 !important;
}

/* Removendo o sublinhado padrão do link do Bootstrap nav-link */
.nav-link:hover {
  text-decoration: underline !important;
}

/* Aumentar o padding do container para mais conforto */
.container {
  max-width: 1140px;
}

/* Ajustes finos no ul para manter a indentação esperada */
ul {
  padding-left: 1.5rem;
}

/* Mantém o box-shadow suave da seção */
.section {
  box-shadow: 0 2px 5px rgba(255, 111, 0, 0.2);
}
</style>