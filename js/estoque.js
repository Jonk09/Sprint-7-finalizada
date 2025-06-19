const stockItems = [
  { name: 'Aço Inox', quantity: 120, maxQuantity: 600 },
  { name: 'Plástico ABS', quantity: 450, maxQuantity: 1000 },
  { name: 'Cobre', quantity: 800, maxQuantity: 1000 },
  { name: 'Alumínio', quantity: 300, maxQuantity: 1000 },
  { name: 'Resina Epóxi', quantity: 50, maxQuantity: 500 },
];

function getLevelClass(percentage) {
  if (percentage <= 30) return 'low';
  if (percentage <= 60) return 'medium';
  return 'high';
}

function renderStockTable() {
  const tbody = document.getElementById('stock-table-body');
  tbody.innerHTML = ''; // limpa

  stockItems.forEach(item => {
    const percentage = Math.round((item.quantity / item.maxQuantity) * 100);
    const levelClass = getLevelClass(percentage);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>
        <div class="progress-bar">
          <div class="progress ${levelClass}" style="width: ${percentage}%;">
            ${percentage}%
          </div>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Inicializa a tabela
renderStockTable();
