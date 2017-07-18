import React from 'react';

export default class Tabs extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
           active:0
        }
        const {initStyle, activeStyle} = props;
        this.init = initStyle||{
            display:"inline-block",
            padding:"10px 20px",
            background:"#ccc",


        }
        this.active = activeStyle || {
            display:"inline-block",
            padding:"10px 20px",
            background:"#ccc",
            color:"red",
            
        }
	}
    componentDidMount(){
       
    }
    titleClick = (label,index) =>{
        this.setState({
            active:index
        })
        const {onSubmit} = this.props;
        onSubmit && onSubmit(label,index)
        
    }
    titleRender = () =>{
        const {labels} = this.props;
        const {active} = this.state;
        const _this=this;
        let titles = labels.map((item,index)=>{
            let defaultStyel = index == active ? _this.active : _this.init;
            return (<span key = {index} 
                    onClick = {()=>{
                        this.titleClick(item,index);
                    }}
                    style = {defaultStyel}
                    >
                        {item}
                    </span>)
        })
        return titles;
    }
	render() {
        const {children,justify} = this.props;
        
		return (
            <div>
                 {this.titleRender()}   
            </div>
		);

	}

}
