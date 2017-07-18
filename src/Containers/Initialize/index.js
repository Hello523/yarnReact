import React from 'react';

import {
	Clamp,
    Tabs
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
                   <div>TAbs</div>
		   		</Tabs>
		   </div>
        );
    }
}
