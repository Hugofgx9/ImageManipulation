function animate () {
	let videoHidden = document.getElementsByClassName('video-hidden');
	let startbutton = document.getElementById('startbutton');
	let video = document.getElementById('video');
	let chartContainer = document.getElementsByClassName('chart-container');
	let chartCanvas = document.getElementById('mychart');

	init();
	update();

	function init() {
		Array.from(videoHidden).forEach((element) => {
			element.style.display = 'none';
		})
		chartContainer[0].style.display= 'none';
		chartCanvas.style.height = '100%';
		chartCanvas.style.width = '100%';
	}

	function update() {
		startbutton.addEventListener('click', () =>{
			Array.from(videoHidden).forEach((element) => {
				element.style.display = 'block';
			}) 
			video.style.display = 'none';
			chartContainer[0].style.display= 'block';
		})
	}


}

animate();

