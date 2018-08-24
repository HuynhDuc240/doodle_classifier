
function preparedata(category, data, label){
	category.training = [];
	category.testing = [];
	for(let n = 0 ; n < total; n++){
		let offset = n * len;
		let threshold = 0.8 * total;
		if(n < threshold){
			category.training.push(data.bytes.subarray(offset,offset + len));
			category.training[n].label = label;
		}
		else{
			category.testing.push(data.bytes.subarray(offset,offset + len));
			category.testing[n - threshold].label  = label;
		}
	}
}
