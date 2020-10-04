function createChart() {


	var chartCanva = document.getElementById('mychart')
	var ctx = chartCanva.getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: Array.from(Array(255).keys()),
			datasets: [{
				label: 'Histogramme',
				data: hist,
				backgroundColor: 'rgba(0, 0, 140, 0.8)',
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

