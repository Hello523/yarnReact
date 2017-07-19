import React from 'react';
import TabTitle from './TabTitle'
export default class Tab extends React.Component {
    constructor(props,context){
		super(props, context);
        this.state = {
            labels : [],
            showIndex:0,
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
       this.setState({
           showIndex:index,
       })
    }
    tabRender = () =>{
        const {children} = this.props;
        const {showIndex} = this.state;
        let tab = children.map((item,index)=>{
            if(index == showIndex){
                return item;
            }
        })
        return tab;
    }

	render() {
        const {children,initStyle,activeStyle} = this.props;
        const {labels} = this.state;

		return (
            <div>
                <TabTitle
                    initStyle = {initStyle}
                    activeStyle = {activeStyle}
                    labels = {this.getLabels()}
                    onSubmit = {this.titleClick}
                />

                {this.tabRender()}
            </div>
		);

	}

}
