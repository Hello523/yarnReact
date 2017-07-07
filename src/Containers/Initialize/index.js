import React from 'react';


export default class Initialize  extends React.Component{
	  constructor(props,context){
		super(props, context);
        this.state = {
            names : {} ,
			codes : {} ,
			orderNums :{},
			childs:[],
			values:[],

        }
	}

    componentDidMount(){
       
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

	inputRender = () =>{
		const {childs} = this.state;
		if(!childs.length){
			return ;
		}
		const self = this;
		var inputs = childs.map((item,index)=>{

			return (
			 <div key = {index}>
				   <span>name</span>
			  	   <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.nameChange(value,index);
			   		}}  
					   value = {item}
					/>
					 <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.codeChange(value,index);
			   		}}  
					   value = {item}
					   
					/>
					 <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.orderNumChange(value,index);
						
			   		}}  
					   value = {item}
					   
					/>
					<button onClick = {(event)=>{
						
						this.remove(index)
						}}>del</button>
			   </div>
			   )
		})
		return <div>{inputs}</div>
	}
	remove = (index) =>{
		var childs = [].concat(this.state.childs);
		var names = Object.assign({},this.state.names);
		delete names[index];
		childs.splice(index,1);
		
		var data = this.conversion(names);

		this.setState({
			childs:childs,
			names:data,
		})
	}
	conversion = (names) =>{
		var arr = [];
		var obj={};
		for(var key in names){
			arr.push(names[key])
		}
		
		arr.map((item,index)=>{
			obj[index] = item;
		})
		return obj;
	}
	add = () =>{
		var childs = [].concat(this.state.childs);
		var arr = ["q","w","e","r","t","g"];
		childs.push(arr[childs.length]);
		this.setState({
			childs
		})
	}
    nameChange = (value,index) =>{
		var names = Object.assign({},this.state.names);
		var judge = true;
		for(let i in names){
			if(i!=index && names[i]==value ){
				judge = false;
				alert("d")
				break;
			}
		}


		if(judge){
			names[index] = value;
			console.log(names);
			this.setState({
				names
			})

		}
		
	}

	codeChange = (value,index) =>{
		var codes = Object.assign({},this.codes);
		codes[index] = value;
		this.setState({
			codes
		})
	}

	orderNumChange = (value,index) =>{
		var orderNums = Object.assign({},this.orderNums);
		orderNums[index] = value;
		this.setState({
			orderNums
		})
	}

    render() {
       
        return (
           <div>
			   
			   <div>
				   <span>name</span>
			  	   <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.nameChange(value,"p");
			   		}}  
					/>
					 <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.codeChange(value,"p");
			   		}}  
					/>
					 <input type = 'text' onChange  = {(event) =>{
						let value = event.target.value;
						this.orderNumChange(value,"p");
			   		}}  
					/>
			   </div>
			   {this.inputRender()}
			   <botton onClick={this.add}>add</botton>
		   </div>
        );
    }
}
