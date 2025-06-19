<template>
  <div class="body">
    <div>
      <header>
        <img src="@/assets/log.png" alt="Logo SUPPLY AI" class="logo" data-testid="logo" />
        <h1 data-testid="main-title">SUPPLY AI</h1>
        <p data-testid="subtitle">Inovação que mantém sua produção em movimento</p>
      </header>

      <nav data-testid="navigation">
        <RouterLink to="/home" data-testid="nav-home">Início</RouterLink>
        <RouterLink to="/sobre" data-testid="nav-about">Sobre</RouterLink>
        <RouterLink to="/suaconta" data-testid="nav-account">Sua conta</RouterLink>
      </nav>

      <div class="container" data-testid="contact-container">
        <h2 data-testid="contact-title">Entre em Contato</h2>
        <div class="info-contato" data-testid="contact-info">
          <p data-testid="contact-email"><strong>Email:</strong> contato@supplyai.com</p>
          <p data-testid="contact-phone"><strong>Telefone:</strong> (81) 98586-9074</p>
        </div>

        <div id="chat-container" data-testid="chat-container">
          <div id="chat-messages" ref="chatMessages" data-testid="chat-messages">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="['message', msg.type === 'user' ? 'user-message' : 'bot-message']"
              :data-testid="`message-${msg.type}-${index}`"
            >
              {{ msg.text }}
            </div>
          </div>

          <div id="input-container" data-testid="input-container">
            <input
              v-model="userInput"
              @keypress.enter="sendMessage"
              id="user-input"
              type="text"
              placeholder="Digite sua mensagem..."
              data-testid="message-input"
            />
            <button id="send-btn" @click="sendMessage" data-testid="send-button">Enviar</button>
          </div>
        </div>
      </div>

      <button id="whatsapp-btn" @click="openWhatsApp" data-testid="whatsapp-button">💬</button>

      <footer data-testid="footer">
        <p data-testid="footer-text">&copy; 2025 supplyai. Todos os direitos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { RouterLink } from 'vue-router';

const userInput = ref('');
const messages = ref([]);
const chatMessages = ref(null);

function addMessage(text, type) {
  messages.value.push({ text, type });
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
}

function botResponse(input) {
  input = input.toLowerCase().trim();

  if (input === '') {
    return 'Por favor, digite algo para que eu possa ajudar.';
  }

  if (input.includes('oi') || input.includes('olá')) {
    return 'Olá! Como posso ajudar você hoje?';
  }

  const responses = {
    'quantas unidades de polímero xz-100 ainda restam?': 'Restam 12 unidades.',
    'qual insumo está com consumo 40% acima da média?': 'A Resina PL-20.',
    'o que pode ser feito quando o estoque está muito baixo?': 'Automatizar os pedidos e repor o estoque.',
    'por que a falta de insumos gera custos mais altos?': 'Porque obriga a empresa a fazer compras emergenciais, pagando mais caro e aumentando o custo da produção.',
    'como a inteligência artificial ajuda a reduzir esses custos?': 'A IA faz previsões de consumo, evitando a falta ou excesso de estoque e ajudando no planejamento.',
    'quais são os principais benefícios da supply ai?': 'Reduz custos, melhora o controle de estoque e ajuda a cumprir prazos com mais segurança.',
    'que tipo de dado a supply ai usa?': 'Usa dados como: consumo passado, estoque, entregas dos fornecedores e sensores da fábrica.',
    'o que é simulação de cenários?': 'É uma ferramenta que mostra o que pode acontecer se algo mudar, como atraso de fornecedor ou aumento na demanda.',
    'como sei qual é o nível mínimo ideal de cada matéria-prima antes de gerar um alerta?': 'A própria plataforma permite configurar os níveis mínimos para cada item. Quando chega nesse limite, ela dispara alertas automáticos para você agir a tempo.',
    'esses sensores iot funcionam em qualquer tipo de ambiente (fábricas, depósitos externos, etc.)?': 'Sim! Os sensores são resistentes e adaptáveis, podendo ser instalados em ambientes internos, externos, depósitos e linhas de produção.',
    'a plataforma faz pedidos automáticos aos fornecedores quando detecta baixo estoque ou só gera alertas?': 'Você escolhe! Ela pode tanto gerar alertas para aprovação manual quanto fazer pedidos automáticos aos fornecedores cadastrados.',
    'o supply ai funciona bem mesmo quando a empresa cresce e aumenta sua produção?': 'Sim! O SUPPLY AI é escalável e foi projetado para acompanhar o crescimento da empresa.',
    'quais são alguns dos recursos que o supply ai oferece conforme a empresa evolui?': 'Ele oferece previsão adaptativa, integração com IoT, controle de múltiplas unidades e fornecedores, e alertas automáticos.',
    'o supply ai é hospedado localmente ou na nuvem?': 'Ele é hospedado na nuvem, garantindo estabilidade e acesso remoto em tempo real.',
    'a integração com meu erp ou crm é difícil de fazer?': 'Não! A SUPPLY AI oferece uma API REST simples e bem documentada.',
    'e se meus sensores iot apresentarem falhas? a integração continua funcionando?': 'Sim! O sistema continua operando com os dados dos ERPs e CRMs, e avisa sobre problemas nos sensores.',
    'as previsões feitas com dados dos crms são realmente confiáveis?': 'Sim! As previsões usam histórico de vendas, funil de vendas e comportamento de clientes.',
    'o que melhora com a conexão?': 'O planejamento.',
    'o que as empresas trocam?': 'Informações.',
    'o que é reduzido?': 'A falta de matéria-prima.'
  };

  return responses[input] || 'Desculpe, ainda estou aprendendo. Pode tentar outra pergunta?';
}

function sendMessage() {
  if (userInput.value.trim() === '') return;

  addMessage(userInput.value, 'user');
  const response = botResponse(userInput.value);
  setTimeout(() => {
    addMessage(response, 'bot');
  }, 600);
  userInput.value = '';
}

function openWhatsApp() {
  const phone = '5581998607735';
  const message = encodeURIComponent('Olá, gostaria de saber mais sobre os produtos da SUPPLY AI.');
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
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
  background-color: #000;
  color: #f5f5f5;
}

header {
  background-color: #000;
  color: #fff;
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
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #1c1c1c;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 85, 0, 0.4);
}

h2 {
  color: #f65b08;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0 1.5rem;
}

.info-contato {
  margin-bottom: 2rem;
}

#chat-container {
  background-color: #2a2a2a;
  border-radius: 8px;
  height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 10px rgba(255, 85, 0, 0.7);
}

#chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  color: #f5f5f5;
  font-size: 1rem;
}

.message {
  margin-bottom: 12px;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  clear: both;
  word-wrap: break-word;
}

.bot-message {
  background-color: #f65b08;
  color: #000;
  float: left;
  border-bottom-left-radius: 0;
}

.user-message {
  background-color: #444;
  color: #fff;
  float: right;
  text-align: right;
  border-bottom-right-radius: 0;
}

#input-container {
  display: flex;
  border-top: 1px solid #f65b08;
  padding: 10px;
  background-color: #222;
  border-radius: 0 0 8px 8px;
}

#user-input {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1c1c1c;
  color: #fff;
}

#user-input:focus {
  outline: 2px solid #f65b08;
}

#send-btn {
  margin-left: 10px;
  background-color: #f65b08;
  border: none;
  color: #000;
  padding: 0 20px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#send-btn:hover {
  background-color: #d14f05;
  color: #fff;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #f65b08;
  color: #000;
  margin-top: 2rem;
}

#whatsapp-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: #25d366;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

#whatsapp-btn:hover {
  background-color: #1ebe57;
}
</style>