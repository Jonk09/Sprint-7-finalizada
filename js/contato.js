const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');

function addMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', className);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
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
    'que tipo de dado a supply ai usa?': 'Usa dados como: consumo passado, estoque, entregas dos fornecedores e sensores da fábrica. Esses dados ajudam a prever o que você vai precisar no futuro.',
    'o que é simulação de cenários?': 'É uma ferramenta que mostra o que pode acontecer se algo mudar, como atraso de fornecedor ou aumento na demanda. Assim, você se prepara antes do problema acontecer.',
    'como sei qual é o nível mínimo ideal de cada matéria-prima antes de gerar um alerta?': 'A própria plataforma permite configurar os níveis mínimos para cada item. Quando chega nesse limite, ela dispara alertas automáticos para você agir a tempo.',
    'esses sensores iot funcionam em qualquer tipo de ambiente (fábricas, depósitos externos, etc.)?': 'Sim! Os sensores são resistentes e adaptáveis, podendo ser instalados em ambientes internos, externos, depósitos e linhas de produção.',
    'a plataforma faz pedidos automáticos aos fornecedores quando detecta baixo estoque ou só gera alertas?': 'Você escolhe! Ela pode tanto gerar alertas para aprovação manual quanto fazer pedidos automáticos aos fornecedores cadastrados, evitando atrasos.',
    'o supply ai funciona bem mesmo quando a empresa cresce e aumenta sua produção?': 'Sim! O SUPPLY AI é escalável e foi projetado para acompanhar o crescimento da empresa, mantendo a eficiência na gestão de suprimentos.',
    'quais são alguns dos recursos que o supply ai oferece conforme a empresa evolui?': 'Ele oferece funcionalidades como previsão adaptativa, integração com IoT, controle de múltiplas unidades e fornecedores, e alertas automáticos para evitar falta de matéria-prima.',
    'o supply ai é hospedado localmente ou na nuvem?': 'Ele é hospedado na nuvem, garantindo estabilidade e acesso remoto em tempo real.',
    'a integração com meu erp ou crm é difícil de fazer?': 'Não! A SUPPLY AI oferece uma API REST simples, segura e bem documentada, que permite integração rápida com ERPs como SAP, TOTVS, Bling e qualquer outro sistema que sua empresa utilize.',
    'e se meus sensores iot apresentarem falhas? a integração continua funcionando?': 'Sim! Mesmo que haja falhas nos sensores, o SUPPLY AI continua operando com os dados dos ERPs e CRMs. Além disso, o sistema envia alertas sobre qualquer problema nos sensores para que você corrija rapidamente.',
    'as previsões feitas com dados dos crms são realmente confiáveis?': 'Sim! As previsões combinam o histórico de vendas, o funil de vendas e o comportamento dos clientes. Isso gera análises precisas, ajudando a planejar compras e evitar tanto falta quanto excesso de estoque.',
    'o que melhora com a conexão?': 'O planejamento.',
    'o que as empresas trocam?': 'Informações',
    'o que é reduzido?': 'A falta de matéria-prima.'
  };

  return responses[input] || 'Desculpe, ainda estou aprendendo. Pode tentar outra pergunta?';
}

sendBtn.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage(userText, 'user-message');
  userInput.value = '';

  setTimeout(() => {
    const botText = botResponse(userText);
    addMessage(botText, 'bot-message');
  }, 600);
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

whatsappBtn.addEventListener('click', () => {
  const phone = '5581985067954';
  const message = encodeURIComponent('Olá, gostaria de saber mais sobre os produtos da SUPPLY AI.');
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
});
