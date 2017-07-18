import React from 'react';

import {
	Clamp,
    Tabs,
    Tab
} from "react-ui"
export default class Initialize  extends React.Component{
	  constructor(props,context){
		super(props, context);
      
	}

    componentDidMount(){

    }

    componentWillUnmount () {
        
    }


    render() {
        return (
           <div>
		   		<Tabs>
                   <tab label = "nihao">
                        <div>你好页面</div>
                   </tab>
                   <tab label = "world">
                        <div>world页面</div>
                   </tab>
		   		</Tabs>
		   </div>
        );
    }
}
