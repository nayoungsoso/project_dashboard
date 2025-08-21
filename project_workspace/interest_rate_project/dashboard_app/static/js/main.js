document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.getElementById("selectedVar");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const chartCanvas = document.getElementById("compareChart");

    let chartInstance = null;
    let correlationChartInstance = null;
    let shiftedChartInstance = null;
    let doughnutChartInstance = null;
    let barChartInstance = null;

    const fieldMap = {
        unemployment: 'unemployment',
        coincident: 'coincident',
        leading_price: 'leading_price',
        esi: 'esi',
        export_price: 'export_price',
        current_account: 'current_account',
        gdp: 'gdp',
        land_price_change: 'land_price_change',
        ccsi: 'ccsi',
        manufacturing_capacity_utilization: 'manufacturing_capacity_utilization',
        us_policy_rate: 'us_policy_rate',
        kosdaq_index: 'kosdaq_index',
        capital_account: 'capital_account',
        us_industrial_production: 'us_industrial_production',
        us_consumer_sentiment: 'us_consumer_sentiment',
        us_cpi: 'us_cpi',
        economic_growth_rate: 'economic_growth_rate'
    };

    function standardScale(data) {
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        const std = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length);
        return data.map(val => (val - mean) / std);
    }

    function updateChart(selectedVar, label) {
        const actualField = fieldMap[selectedVar];

        fetch(`/api/compare_data/?target=${selectedVar}`)
            .then(res => res.json())
            .then(data => {
                const labels = data.map(d => d.datetime);
                const interest = standardScale(data.map(d => d.interest_rate));
                const compare = standardScale(data.map(d => d[actualField]));

                if (chartInstance) chartInstance.destroy();

                chartInstance = new Chart(chartCanvas.getContext("2d"), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: '금리',
                                data: interest,
                                borderColor: '#FFDE00',
                                borderWidth: 1.5,
                                pointRadius: 0
                            },
                            {
                                label: label,
                                data: compare,
                                borderColor: '#748963',
                                borderWidth: 1.5,
                                pointRadius: 0
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#A1753B',
                                    font: {
                                        family: 'YUniverse-L',
                                        size: 13
                                    }
                                }
                            },
                            tooltip: {
                                bodyFont: { family: 'YUniverse-L' },
                                titleFont: { family: 'YUniverse-L' }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#A1753B',
                                    font: {
                                        family: 'YUniverse-L',
                                        size: 12
                                    }
                                },
                                grid: {
                                    color: 'rgba(3, 5, 102, 0.1)'
                                }
                            },
                            y: {
                                ticks: {
                                    color: '#A1753B',
                                    font: {
                                        family: 'YUniverse-L',
                                        size: 12
                                    }
                                },
                                grid: {
                                    color: 'rgba(3, 5, 102, 0.1)'
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error("차트 데이터 로드 실패:", error);
            });
    }

    function drawCorrelationCharts() {
        fetch('/api/correlation_data/')
            .then(res => res.json())
            .then(data => {
                const labels = data.variables;
                const originalCorr = data.original;
                const shiftedCorr = data.shifted;
                const barColors = labels.map(() => getRandomColor());

                if (correlationChartInstance) correlationChartInstance.destroy();
                if (shiftedChartInstance) shiftedChartInstance.destroy();

                correlationChartInstance = new Chart(document.getElementById('correlationChart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: originalCorr,
                            backgroundColor: barColors
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: '상관관계',
                                font: {
                                    family: 'YUniverse-B',
                                    size: 18
                                },
                                color: '#A1753B',
                                padding: { top: 10, bottom: 20 }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { display: false },
                                grid: { display: false }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#A1753B',
                                    font: { family: 'YUniverse-L', size: 12 }
                                },
                                grid: { color: 'rgba(3, 5, 102, 0.1)' }
                            }
                        }
                    }
                });

                shiftedChartInstance = new Chart(document.getElementById('shiftedCorrelationChart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: shiftedCorr,
                            backgroundColor: barColors
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: {
                                display: true,
                                text: 'shift 상관관계',
                                font: {
                                    family: 'YUniverse-B',
                                    size: 18
                                },
                                color: '#A1753B',
                                padding: { top: 10, bottom: 20 }
                            }
                        },
                        scales: {
                            x: {
                                ticks: { display: false },
                                grid: { display: false }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#A1753B',
                                    font: { family: 'YUniverse-L', size: 12 }
                                },
                                grid: { color: 'rgba(3, 5, 102, 0.1)' }
                            }
                        }
                    }
                });
            });
    }

    function chart_data() {
        fetch('/api/chart_data/')
            .then(response => response.json())
            .then(data => {
                const labels = Object.keys(data);
                const counts = Object.values(data);

                const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

                const chartData = {
                    labels: labels,
                    datasets: [{
                        data: counts,
                        backgroundColor: chartColors,
                        borderWidth: 1
                    }]
                };

                if (doughnutChartInstance) doughnutChartInstance.destroy();
                if (barChartInstance) barChartInstance.destroy();

                doughnutChartInstance = new Chart(document.getElementById('doughnutChart'), {
                    type: 'doughnut',
                    data: chartData,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'bottom' }
                        }
                    }
                });

                barChartInstance = new Chart(document.getElementById('barChart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Label Count',
                            data: counts,
                            backgroundColor: chartColors[1]
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 }
                            }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('차트 데이터를 불러오는 중 오류 발생:', error);
            });
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
            const selectedVar = item.getAttribute("data-var");
            const label = item.textContent;
            dropdownBtn.textContent = label + " ▼";
            dropdownMenu.classList.remove("show");
            updateChart(selectedVar, label);
        });
    });

    updateChart("unemployment", "실업률");
    drawCorrelationCharts();
    chart_data();
});
