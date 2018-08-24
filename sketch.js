const len = 784; // 28*28
let total = 1000;

const CAT = 0;
const BANANA = 1;
const LION = 2;
const APPLE = 3;

let cats = {};
let bananas = {};
let lions = {};
let apples = {};



let nn_data;
let cats_data;
let bananas_data;
let lions_data;
let apples_data;

let nn;


function preload(){
	cats_data = loadBytes('data/cat1000.bin');
	bananas_data = loadBytes('data/banana1000.bin');
	lions_data = loadBytes('data/lion1000.bin');
	apples_data = loadBytes('data/apple1000.bin');
	// nn_data = loadJSON('data/data_nn.json');
}

function setup() {
	createCanvas(800, 800);
	background(255);
	preparedata(cats, cats_data, CAT);
	preparedata(bananas, bananas_data, BANANA);
	preparedata(lions, lions_data, LION);
	preparedata(apples, apples_data, APPLE);

	// console.log(nn.serialize());
	if(nn_data === undefined){
		nn = new NeuralNetwork(784,64,4);
	}else {
		nn = NeuralNetwork.deserialize(JSON.stringify(nn_data));
	}
	//
	let training = [];
	training = training.concat(cats.training);
	training = training.concat(bananas.training);
	training = training.concat(lions.training);
	training = training.concat(apples.training);

	let testing = [];
	testing = testing.concat(cats.testing);
	testing = testing.concat(bananas.testing);
	testing = testing.concat(lions.testing);
	testing = testing.concat(apples.testing);

	show(testing[6]);
	$("#train").click(function(){
		trainEpoch(training);
	});
	$("#test").click(function(){
		testAll(testing);
	});
	$("#guess").click(function(){
		let inputs = [];
		let img = get();
		img.resize(28,28);
		// console.log(img);
		img.loadPixels();
		for(let i = 0 ; i < len; i++){
			let bright = img.pixels[i * 4];
			inputs[i] = (255 - bright) / 255;
		}

		let guess = nn.predict(inputs);
		let _max = max(guess);
		let classification = guess.indexOf(_max);

		if(classification === CAT){
			console.log('This is Cat');
		}

		if(classification === BANANA){
			console.log('This is Banana');
		}

		if(classification === LION){
			console.log('This is Lion');
		}

		if(classification === APPLE){
			console.log('This is Apple');
		}
	});
	$("#save_data").click(function(){
		saveJSON(nn,'data_nn.json');
	});
	$("#_clear").click(function(){
		background(255);
	});
	$("#next").click(function(){
		let r = floor(random(0,testing.length));
		let data = testing[r];
		show(data);
		let guess = nn.predict(data);
		let _max = max(guess);
		let classification = guess.indexOf(_max);

		if(classification === CAT){
			console.log('This is Cat');
		}

		if(classification === BANANA){
			console.log('This is Banana');
		}

		if(classification === LION){
			console.log('This is Lion');
		}

		if(classification === APPLE){
			console.log('This is Apple');
		}
	});
}

function draw() {
	strokeWeight(29);
	stroke(0);
	if(mouseIsPressed){
		line(pmouseX, pmouseY, mouseX, mouseY);
	}

}
