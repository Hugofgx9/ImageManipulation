const sliderContrast = document.getElementById('slider-contrast');
const sliderBlur = document.getElementById('slider-blur');
const sliderNoise = document.getElementById('slider-noise');
const sliderRed = document.getElementById('slider-red');
const sliderGreen = document.getElementById('slider-green');
const sliderBlue = document.getElementById('slider-blue');
const buttonBorder = document.getElementById('detect-border-button');
const buttonBW = document.getElementById('bw-button');
const buttonInvert = document.getElementById('invert-button');
const buttonReset = document.getElementById('reset-button');
let contrastValue = sliderContrast.value * 0.01;
let blurValue = sliderBlur.value * 0.01;
let noiseValue = sliderNoise.value;
let redValue = sliderRed.value * 0.01;
let greenValue = sliderGreen.value * 0.01;
let blueValue = sliderBlue.value * 0.01;
let bwTrigger = false;
let borderTrigger = false;
let invertTrigger = false;

sliderContrast.oninput = function() {
	contrastValue = this.value * 0.01;
	CallAllFilter();
}

sliderBlur.oninput = function() {
	blurValue = this.value * 0.01;
	CallAllFilter();
}

sliderNoise.oninput = function() {
	noiseValue = this.value;
	CallAllFilter();
}

sliderRed.oninput = function() {
	redValue = this.value * 0.01;
	CallAllFilter();
}

sliderGreen.oninput = function() {
	greenValue = this.value * 0.01;
	CallAllFilter();
}

sliderBlue.oninput = function() {
	blueValue = this.value * 0.01;
	CallAllFilter();
}

buttonBorder.addEventListener('click', function(ev){
  borderTrigger = !borderTrigger;
  CallAllFilter();
  ev.preventDefault();
}, false);

buttonBW.addEventListener('click', function(ev){
  bwTrigger = !bwTrigger;
  CallAllFilter();
  ev.preventDefault();
}, false);

buttonInvert.addEventListener('click', function(ev){
  invertTrigger = !invertTrigger;
  CallAllFilter();
  ev.preventDefault();
}, false);

buttonReset.addEventListener('click', function(ev){
	ResetAll();
  CallAllFilter();
  ev.preventDefault();
}, false);


function CallAllFilter () {
	startFilter();

	if (redValue !== 1) {
		myFilter('red');
	}
	if (greenValue !== 1) {
		myFilter('green');
	}
	if (blueValue !== 1) {
		myFilter('blue');
	}
	if (invertTrigger == true) {
		myFilter('invert');
	}
	if (bwTrigger == true) {
		myFilter('BW');
	}
	if (contrastValue !== 0.5) {
		myFilter('contrast');
	}
	if (blurValue !== 0) {
		myFilter('blur');
	}
	if (borderTrigger == true) {
		myFilter('border detect');
	}
	if (noiseValue !== 0) {
		myFilter('noise');
	}

	//call end filter;
	ApplyChangesOnCanvas(canvas, imgd);

	calcuHisto();
}

function ResetAll () {
	contrastValue = 0.5;
	blurValue = 0;
	noiseValue = 0;
	redValue = 1;
	greenValue = 1;
	blueValue = 1;

	bwTrigger = false;
	borderTrigger = false;
	invertTrigger = false;

	sliderContrast.value  = 50 ;
	sliderBlur.value = 0;
	sliderNoise.value = 0;
	sliderRed.value = 100;
	sliderGreen.value = 100;
	sliderBlue.value = 100;
}


