const ctx = document.getElementById('scalabilityChart').getContext('2d');
const scalabilityChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
    datasets: [{
      label: 'Capacidade de Gestão de Estoque',
      data: [100, 300, 500, 700, 1000], // Valores de exemplo de crescimento
      borderColor: '#ff6f00',
      backgroundColor: 'rgba(255, 111, 0, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
