import React from 'react';
import './index.less';

export default class Title extends React.Component{
		handleClick = () =>{
	    // 使用原生的 DOM API 获取焦点
	    this.refs.myInput.focus();
	  }
	  render() {
	    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
	    return (
	      <div className = 'all-title'>
           <span className="back"></span>
  	      
	      </div>
	    );
	  }
}
