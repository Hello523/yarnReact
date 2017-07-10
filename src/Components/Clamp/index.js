import React from 'react';
import {
    clamp
} from 'Utils'

export default class Clamp extends React.Component {

    componentDidMount(){
        const {parameter,children} = this.props;
        console.log(children)
        let param = Object.assign(parameter||{});
         /**
         * [opt参数]
         * @clamp 			{num}     	行数
         * @useNativeClamp  {blone}    是否使用-webkit-line-clamp属性
         * @splitOnChars    {string}	省略的符号（不限于省略号）的样式
         * @animate 		{blone}	    是否实现动画折叠。
         * @truncationChar  {string}    省略显示字符 默认 "..."
         * @truncationHTML  {node}	省略的内容（不限于符号）
         */
        clamp(
            this.clamp,
            {
                clamp : param.lineNum||2,
                useNativeClamp : param.useNativeClamp||false,
                truncationChar : param.useNativeClamp|| "...",
                animate : param.animate || false,
                truncationHTML : "<span> pp</span>"|| "",
                
            })
    }


	render() {
        const {style,label,children} = this.props;

		return (
            <div>
                {children}
			<div style = {style} ref = {(ref) =>{
                    this.clamp = ref;
                }}>
				{label}
			</div>
            </div>
		);

	}

}
