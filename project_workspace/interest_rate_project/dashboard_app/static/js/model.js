// 공통 옵션
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        labels: {
            font: {
                family: 'YUniverse-L',
                size: 12
            }
        }
      }
    },
    scales: {
      x: {
        ticks: {
            font: {
                family: 'YUniverse-L',
                size: 12
            }
        }
      },
      y: {
        ticks: {
            font: {
                family: 'YUniverse-L',
                size: 12
            }
        }
      }
    }
  };
  
  // (1,1) 왼쪽 세로 바차트
  new Chart(document.getElementById('verticalChart1'), {
    type: 'bar',
    data: {
      labels: ['LSTM+GRU', 'LGBM(HP)', 'XGB(HP)', 'RF(HP)'],
      datasets: [{
        label: '세로 바 1',
        data: [0.6403, 0.0805, 0.0655, 0.0796],
        backgroundColor: '#4e79a7'
      }]
    },
    options: {
      ...commonOptions,
      y: {
        ...commonOptions.scales?.y,
        max: 1.5
      },
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false },
        title: {
            display: true,
            text: 'RMSE',
            font: {
                family: 'YUniverse-B',
                size: 16
            }
        }
      }
    }
  });
  
  // (1,1) 오른쪽 가로 바차트
  new Chart(document.getElementById('horizontalChart1'), {
    type: 'bar',
    data: {
      labels: ['LSTM+GRU', 'LGBM(HP)', 'XGB(HP)', 'RF(HP)'],
      datasets: [{
        label: '가로 바 1',
        data: [0.5335, 0.0563, 0.0406, 0.0557],
        backgroundColor: '#f28e2b'
      }]
    },
    options: {
      ...commonOptions,
      x: {
        ...commonOptions.scales?.x,
        max: 1.5
      },
      indexAxis: 'y',
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false },
        title: {
            display: true,
            text: 'MAE',
            font: {
                family: 'YUniverse-B',
                size: 16
            }
        }
      }
    }
  });
  
  // (1,2) 왼쪽 세로 바차트
  new Chart(document.getElementById('verticalChart2'), {
    type: 'bar',
    data: {
      labels: ['TF+LSTM+GRU', 'LBGM(HP)', 'XGB(HP)', 'RF(HP)'],
      datasets: [{
        label: '세로 바 2',
        data: [1.1698, 0.0831, 0.0918, 0.1787],
        backgroundColor: '#76b7b2'
      }]
    },
    options: {
      ...commonOptions,
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false },
        title: {
          display: true,
          text: 'RMSE',
          font: {
            family: 'YUniverse-B',
            size: 16
          }
        }
      },
      scales: {
        ...commonOptions.scales,
        y: {
          ...commonOptions.scales?.y,
          max: 1.5
        }
      }
    }
  });
  
  
  // (1,2) 오른쪽 가로 바차트
  new Chart(document.getElementById('horizontalChart2'), {
    type: 'bar',
    data: {
      labels: ['TF+LSTM+GRU', 'LBGM(HP)', 'XGB(HP)', 'RF(HP)'],
      datasets: [{
        label: '가로 바 2',
        data: [1.0854, 0.0634, 0.0534, 0.1319],
        backgroundColor: '#e15759'
      }]
    },
    options: {
      ...commonOptions,
      indexAxis: 'y',
      x: {
        ...commonOptions.scales?.x,
        max: 1.5
      },
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false },
        title: {
            display: true,
            text: 'MAE',
            font: {
                family: 'YUniverse-B',
                size: 16
            }
        }
      }
    }
  });
  