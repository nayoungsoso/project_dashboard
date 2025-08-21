document.addEventListener("DOMContentLoaded", function () {
    // ---- [1] interest_rate_chart 데이터 받아오기 ----
    fetch('/api/interest_rate_data/')
      .then(response => response.json())
      .then(data => {
        console.log("Received Data:", data);
        if (!data || data.length === 0) {
          console.error("No data received from server.");
          return;
        }
        drawChart(data);
      })
      .catch(error => console.error("Error loading data:", error));
  
    // ---- [2] Accuracy 도넛 차트 + 숫자 애니메이션 ----
    const accCtx = document.getElementById('accuracyChart').getContext('2d');
    const accuracyLabel = document.getElementById("accuracyValue");
  
    const targetValue = 94;
    const duration = 2000; // ms
    const frameRate = 60;
    const intervalTime = 1000 / frameRate;
    const totalSteps = duration / intervalTime;
    const increment = targetValue / totalSteps;
  
    let current = 0;
  
    const accuracyChart = new Chart(accCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [0, 100], // 시작은 0%
          backgroundColor: ['#64b9b2', '#ffffff22'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        current = targetValue;
        clearInterval(interval);
      }
  
      // 숫자 애니메이션
      accuracyLabel.textContent = Math.floor(current) + "%";
  
      // 도넛 차트 업데이트
      accuracyChart.data.datasets[0].data = [current, 100 - current];
      accuracyChart.update();
    }, intervalTime);
  });
  


function drawChart(data) {
    const ctx = document.getElementById('interestRateChart').getContext('2d');

    const labels = data.map(item => item.datetime);
    const interestRates = data.map(item => item.interest_rate);
    const preds = data.map(item => item.pred);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'real data',
                    data: interestRates,
                    borderColor: 'rgba(253, 255, 147, 0.5)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'prediction',
                    data: preds,
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Interest Rates In Korea',
                    color: '#FFC000',
                    font: {
                        family: 'YUniverse-B',
                        size: 18
                    }
                },
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            family: 'YUniverse-L'
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'date',
                        color: 'white',
                        font: { family: 'YUniverse-L' }
                    },
                    ticks: {
                        color: 'white',
                        font: { family: 'YUniverse-L' }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'interest rate',
                        color: 'white',
                        font: { family: 'YUniverse-L' }
                    },
                    ticks: {
                        color: 'white',
                        font: { family: 'YUniverse-L' }
                    }
                }
            }
        }
    });
}
