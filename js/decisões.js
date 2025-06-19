var ctx = document.getElementById('consumoChart').getContext('2d');
var consumoChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
      label: 'Consumo Real (kg)',
      data: [500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200],
      backgroundColor: '#ff6f00',
      borderColor: '#ff3d00',
      borderWidth: 1
    },
    {
      label: 'Previsão de Consumo (kg)',
      data: [480, 590, 640, 690, 730, 780, 830, 880, 930, 980, 1050, 1150],
      backgroundColor: '#ffa040',
      borderColor: '#ff6f00',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' kg';
          }
        }
      }
    }
  }
});
