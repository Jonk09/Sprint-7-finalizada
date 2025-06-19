const ctx = document.getElementById('graficoConexao').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Empresas Conectadas',
        data: [70, 78, 85, 90, 94, 97],
        borderColor: '#ff6f00',
        backgroundColor: 'rgba(255, 111, 0, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Empresas Isoladas',
        data: [70, 71, 68, 65, 66, 68],
        borderColor: 'gray',
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Disponibilidade de Insumos (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#f5f5f5'
        }
      }
    }
  }
});
