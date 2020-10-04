function myFilter(filterType) {

	if (filterType == 'BW') {
		console.log('BW');
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {

				greyLevel = Math.round((pix2dFilter[i][j].r + pix2dFilter[i][j].g + pix2dFilter[i][j].b ) / 3);

				pix2dFilter[i][j].r = greyLevel;
				pix2dFilter[i][j].g = greyLevel;
				pix2dFilter[i][j].b = greyLevel;
			}
		}
	} else if (filterType == 'invert') {
		console.log('invert');
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				pix2dFilter[i][j].r = 255 - pix2dFilter[i][j].r ;
				pix2dFilter[i][j].g = 255 - pix2dFilter[i][j].g ;
				pix2dFilter[i][j].b = 255 - pix2dFilter[i][j].b ;
			}
		}
	}

	 else if (filterType == 'contrast') {
		console.log('contrast');

		//Loop over each pixel add contrast to each color channel
		var easing = just.curves.cubicBezier(
			contrastValue, 
			1 - contrastValue, 
			1 - contrastValue, 
			contrastValue);

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				greyLevel = (pix2dFilter[i][j].r + pix2dFilter[i][j].g + pix2dFilter[i][j].b ) / 3;
				greyLevel = Math.round(greyLevel);
				var newGreyLevel = Math.round(easing(greyLevel / 255) * 255);

				pix2dFilter[i][j].r = Math.min(255, (pix2dFilter[i][j].r + newGreyLevel - greyLevel));
				pix2dFilter[i][j].g = Math.min(255, (pix2dFilter[i][j].g + newGreyLevel - greyLevel));
				pix2dFilter[i][j].b = Math.min(255, (pix2dFilter[i][j].b + newGreyLevel - greyLevel));
			}
		}
	} else if (filterType == 'blur') {
		console.log('blur');

		setConvolutionValue();

		var n;

		function setConvolutionValue () {
			console.log(blurValue);

			if (blurValue < 0.2) {
				n = 3;
			} else if (blurValue < 0.4) {
				n = 5;
			} else if (blurValue < 0.6) {
				n = 7;
			} else if (blurValue < 0.8) {
				n = 9;
			} else {
				n = 11;
			}

			convolutionMat = [];
			for (var i = 0; i < n; i++) {
				convolutionMat[i] = [];
				for (var j = 0; j < n; j++) {
					convolutionMat[i][j] = 1;
				}
			}

			convolutionCoef = 0;
			convolutionMat.forEach(function( value ) {
				value.forEach(function( value2 ) {
					convolutionCoef += value2;
				})
			})
		}

		var clonepix2dFilter = JSON.parse(JSON.stringify(pix2dFilter));
		var delta = Math.trunc(n/2);

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var newpix2dFilter = new Pixel(0,0,0,0);
				for (var i2 = 0; i2 < n; i2++) {
					for (var j2 = 0; j2 < n; j2++) {
						if (i+i2-delta >= 0 && i+i2-delta < pix2dInit.length && j+j2-delta >= 0 && j+j2-delta < pix2dInit[i+i2-delta].length) {
							newpix2dFilter.r += clonepix2dFilter[i+i2-delta][j+j2-delta].r * convolutionMat[i2][j2];
							newpix2dFilter.g += clonepix2dFilter[i+i2-delta][j+j2-delta].g * convolutionMat[i2][j2];
							newpix2dFilter.b += clonepix2dFilter[i+i2-delta][j+j2-delta].b * convolutionMat[i2][j2];
						}
						else {
							newpix2dFilter.r += clonepix2dFilter[i][j].r * convolutionMat[i2][j2];
							newpix2dFilter.g += clonepix2dFilter[i][j].g * convolutionMat[i2][j2];
							newpix2dFilter.b += clonepix2dFilter[i][j].b * convolutionMat[i2][j2];
						}
					}
				}
				pix2dFilter[i][j].r = Math.round( newpix2dFilter.r / convolutionCoef );
				pix2dFilter[i][j].g = Math.round( newpix2dFilter.g / convolutionCoef );
				pix2dFilter[i][j].b = Math.round( newpix2dFilter.b / convolutionCoef );
			}
		}
	} else if (filterType == 'border detect') {
		console.log('border detect');

		setConvolutionValue();

		function setConvolutionValue () {
			convolutionMat = [
				[ 0, 1, 0],
				[ 1, -4, 1],
				[ 0, 1, 0]];
		}

		var clonepix2dFilter = JSON.parse(JSON.stringify(pix2dFilter));

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var pixelValue = 0;
				for (var i2 = 0; i2 < 3; i2++) {
					for (var j2 = 0; j2 < 3; j2++) {
						if (i+i2-1 >= 0 && i+i2-1 < pix2dInit.length && j+j2-1 >= 0 && j+j2-1 < pix2dInit[i+i2-1].length) {
							greyLevel = Math.round((clonepix2dFilter[i+i2-1][j+j2-1].r + clonepix2dFilter[i+i2-1][j+j2-1].g + clonepix2dFilter[i+i2-1][j+j2-1].b ) / 3);
							pixelValue += ( greyLevel * convolutionMat[i2][j2] ) ;
						}
						else {
							pixelValue += 0;
						}
					}
				}
				pix2dFilter[i][j].r = Math.min( Math.max( Math.round( pixelValue ), 0), 255);
				pix2dFilter[i][j].g = Math.min( Math.max( Math.round( pixelValue ), 0), 255);
				pix2dFilter[i][j].b = Math.min( Math.max( Math.round( pixelValue ), 0), 255);
			}
		}
	} else if (filterType == 'noise') {
		console.log('noise');

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var noise = (Math.random()-0.5) * noiseValue;
				pix2dFilter[i][j].r += noise;
				pix2dFilter[i][j].g += noise;
				pix2dFilter[i][j].b += noise;
			}
		}
	} else if (filterType == 'red') {
		console.log('red');

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				pix2dFilter[i][j].r = pix2dFilter[i][j].r * redValue;
			}
		}
	} else if (filterType == 'green') {
		console.log('green');

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				pix2dFilter[i][j].g = pix2dFilter[i][j].g * greenValue;
			}
		}
	} else if (filterType == 'blue') {
		console.log('blue');

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				pix2dFilter[i][j].b = pix2dFilter[i][j].b * blueValue;
			}
		}
	}
}