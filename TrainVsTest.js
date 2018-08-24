function testAll(testing){
	let correct = 0;
	for(let  i = 0; i < testing.length;i++){
		let data = testing[i];
		let inputs = Array.from(data).map(x => x / 255);
		// console.log(inputs);
		let label = testing[i].label;
		let perdict = nn.predict(inputs);
		let _max = max(perdict);
		let guess = perdict.indexOf(_max);
		if(guess === label){
			correct++;
		}
	}
	let percent = correct / testing.length;
	console.log("Percent success: " +percent);
}

function trainEpoch(training){
	shuffle(training,true);
	for(let  i = 0; i < training.length;i++){
		let data = training[i];
		let inputs = Array.from(data).map(x => x / 255);

		let label = training[i].label;
		// console.log(label);
		let targets = [0,0,0,0];
		targets[label] = 1;
		nn.train(inputs,targets);
	}
	console.log("Training is DONE!");
}
