import { all,put,take,fork} from 'redux-saga/effects';

function* demo_list(){

    while (true) {

        yield take('get/demo/list');

        console.log('bababa')

        yield put({
            type:'set/demo/list',
            payload:[
                {name:'dfdfds'},
            ]
        });

    }

}


export  default function* root() {
	yield all([
		fork(demo_list)
	]);
}








