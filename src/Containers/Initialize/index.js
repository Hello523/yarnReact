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
                   <Tab label = "nihao">
                        <div>你好页面</div>
                   </Tab>
                   <Tab label = "world">
                        <div>world页面</div>
                   </Tab>
		   		</Tabs>
		   </div>
        );
    }
}
