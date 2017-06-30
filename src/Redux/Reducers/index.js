
function demo(state={},action){

    switch(action.type){

        case 'set/demo/list':{
               return {...state,list:action.payload};
        }
        default:{
            return state;
        }

    }

}


module.exports = {
    demo
}
