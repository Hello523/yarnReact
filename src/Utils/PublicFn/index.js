var arr1 = ['1', '2', '3', '4', '5', '6', '6', '7', '8', '1', '1', '1'];
console.log(allRepeat(arr1))
/**
 * allRepeat 循环数组并返回所有重复值的下标
 * @arr  {arr}  需要检测的数组
 * @return {arr} 所有重复下表的集合
 */
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





/**
 * computeStyle 获取节点的css属性值
 * @elem  {node}     html节点
 * @prop  {string}   css属性
 * @return {string}  css属性值
 */
function computeStyle(elem, prop) {

		 if (!window.getComputedStyle) {
				 window.getComputedStyle = function(el, pseudo) {
						 this.el = el;
						 this.getPropertyValue = function(prop) {
								 var re = /(\-([a-z]){1})/g;
								 if (prop == 'float') prop = 'styleFloat';
								 if (re.test(prop)) {
										 prop = prop.replace(re, function () {
												 return arguments[2].toUpperCase();
										 });
								 }
								 return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
						 }
						 return this;
				 }
		 }

		 return window.getComputedStyle(elem, null).getPropertyValue(prop);
 }
