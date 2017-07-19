import React from 'react';
import TabTitle from './TabTitle';
import './index.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var interval="";
export default class Tab extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
            labels : [],
            showIndex:0,
            tabsWidth:0
        }
	}
    componentDidMount(){

    }
    getLabels = () =>{
        const {children} = this.props;
        let labels = children.map((item,index)=>{
            return item.props.label;
        })
        return labels;
    }
    titleClick = (label,index) =>{
       const {tabsWidth} = this.state;

       clearInterval(interval);
       let startLocation =Number(this.box.style.marginLeft.split("p")[0]) ;
       let endLocation = -index*tabsWidth;
       this.animation(index,endLocation-startLocation);
    }
    animation = (index,type) =>{
        const {tabsWidth} = this.state;
        var v = tabsWidth/5;
        var a=15;
        var x=Number(this.box.style.marginLeft.split("p")[0]);
        if(type<0){
            v=-v;
            a = -a
        }
        
        if(type!=0){
            interval=setInterval(()=>{
                // console.log(x,"LLLLL")
                
                x+=v;
                this.box.style.marginLeft = x+"px";
                let nowLocation = Number(this.box.style.marginLeft.split("p")[0]);
                let endLocation = -index*tabsWidth;
                v=v-a;
                if(index==0){
                    endLocation = index*tabsWidth;
                }
                if(type>0 && nowLocation>=endLocation){
                    this.box.style.marginLeft = endLocation+"px"
                    clearInterval(interval);
                }
                
                if(type<0 && nowLocation<=endLocation){
                    this.box.style.marginLeft = endLocation+"px"
                    clearInterval(interval);
                }
            },50)
        }
    }
    tabRender = () =>{
        const {children} = this.props;
        const {showIndex,tabsWidth} = this.state;
        let tab = children.map((item,index)=>{
            
            return <div key = {index} style={{display:"inline-block",width:tabsWidth}}>{item}</div>;
            
        })
        return tab;
    }
    componentDidMount(){
        let boxWidth = this.tabs.clientWidth;
        this.setState({
            tabsWidth:boxWidth
        })
    }
	render() {
        const {children,initStyle,activeStyle} = this.props;
        const {labels,tabsWidth} = this.state;

		return (
            <div ref = {(ref)=>{
                this.tabs = ref;
            }} style = {{overflow:"hidden"}}>
                <TabTitle
                    initStyle = {initStyle}
                    activeStyle = {activeStyle}
                    labels = {this.getLabels()}
                    onSubmit = {this.titleClick}
                />
                <div  ref = {(ref)=>{
                            this.box = ref;
                        }} style={{width:tabsWidth*children.length}}>
                    {this.tabRender()}
                </div>
               
            </div>
		);

	}

}
