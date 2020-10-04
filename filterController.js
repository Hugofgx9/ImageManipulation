var canvas = document.getElementById('mycanvas');
var hist; 

//init variables store the value when the photo is shot, please do not change there values
var pix2dInit;
var imgdInit;

//This array is passing thrue different filters
var pix2dFilter;

//This array is link to imageData, changing it will change the image
var pix2d;
var imgd;

//Pixel constructor
function Pixel (r,g,b,a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

// create a new pix2d not link to imgData
function CloneImageDataToPix2D(source) {
	var newimgData = new ImageData(
	  new Uint8ClampedArray(source.data),
	  source.width,
	  source.height
	);

	var newPix = newimgData.data;
	var newPix2d = [];

	for (var x1 = 0; x1 < source.width; x1++) {
		newPix2d[x1] = [];
		for (var y1 = 0; y1 < source.height; y1++) {
			newPix2d[x1][y1] = new Pixel (
				newPix[x1*4+y1*(width*4)+0],
				newPix[x1*4+y1*(width*4)+1],
				newPix[x1*4+y1*(width*4)+2],
				newPix[x1*4+y1*(width*4)+3]
			);
		}
	}
	return newPix2d;
}


// call when the pic is shot, store in pix2dInit;
function initFilter() {

	function createpix2DNotLinked () {
		var photo = document.getElementById('photo');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;

		imgdInit = context.getImageData(x, y, width, height);
		pix2dInit = CloneImageDataToPix2D(imgdInit);
	}
	function createpix2DLinked () {
		var photo = document.getElementById('photo');
		var context = canvas.getContext('2d');

		// Get the CanvasPixelArray from the given coordinates and dimensions.
		x = 0;
		y = 0;
		width = canvas.width;
		height = canvas.height;

		imgd = context.getImageData(x, y, width, height);
		pix = imgd.data;
		pix2d =[];

		for (var x1 = 0; x1 < width; x1++) {
			pix2d[x1] = [];
			for (var y1 = 0; y1 < height; y1++) {
				pix2d[x1][y1] = new Pixel (
					pix[x1*4+y1*(width*4)+0],
					pix[x1*4+y1*(width*4)+1],
					pix[x1*4+y1*(width*4)+2],
					pix[x1*4+y1*(width*4)+3]
				);
			}
		}
	}
	createpix2DLinked();
	createpix2DNotLinked();
}

//first function call when filter input
function startFilter() {
	pix2dFilter = CloneImageDataToPix2D (imgdInit);
}

function ApplyChangesOnCanvas() {

	//pix2dFilter -> pix;
	for (var x1 = 0; x1 < width; x1++) {
		for (var y1 = 0; y1 < height; y1++) {
			pix[x1*4+y1*(width*4)+0] = pix2dFilter[x1][y1].r;
			pix[x1*4+y1*(width*4)+1] = pix2dFilter[x1][y1].g;
			pix[x1*4+y1*(width*4)+2] = pix2dFilter[x1][y1].b;
			pix[x1*4+y1*(width*4)+3] = pix2dFilter[x1][y1].a;
		}
	}

	var context = canvas.getContext('2d');
	context.putImageData(imgd, x, y);
}

function calcuHisto () {
	hist = new Array(255);
	var greyLevel, minRank, maxRank;
	hist.fill(0);
	for (var x1 = 0; x1 < width; x1++) {
		for (var y1 = 0; y1 < height; y1++) {
			greyLevel = ( pix2dFilter[x1][y1].r + pix2dFilter[x1][y1].g + pix2dFilter[x1][y1].b ) / 3;
			greyLevel = Math.round(greyLevel);
			hist[greyLevel]++;
		}
	}
	createChart();
}