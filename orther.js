
function show(data) {
	// for(let n = 0; n < total; n++){
		let img = createImage(28,28);
		img.loadPixels();
		for(let i = 0 ;i < 784; i++){
			let val  = 255 - data[i];
			img.pixels[i * 4 + 0] = val;// red

			img.pixels[i * 4 + 1] = val;// green

			img.pixels[i * 4 + 2] = val;// blue

			img.pixels[i * 4 + 3] = 255;//

		}
		img.updatePixels();
    img.resize(100,100);
		image(img,0,0);
	// }
}
