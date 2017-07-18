import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
	name: 'dd',
});

//action
State.submitVisit = action(function(params,callback) {
	
	this.name = "ppp";
});

module.exports = State;
