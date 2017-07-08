var arr1 = ['1', '2', '3', '4', '5', '6', '6', '7', '8', '1', '1', '1'];
console.log(allRepeat(arr1))
function allRepeat(arr) {
	var yesList = [];

	for(var i = 0; i < arr.length; i++) {
		var hasRead = false;
		for(var k = 0; k < yesList.length; k++) {
			if(i == yesList[k]) {
				hasRead = true;
			}
		}
		if(hasRead) { break; }
		var _index = i,
			haveSame = false;
		for(var j = i + 1; j < arr.length; j++) {
			if(arr[i] == arr[j]) {
				yesList.push(j);
			}
		}
	}
	return yesList;
}

