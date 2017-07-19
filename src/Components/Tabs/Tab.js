import React from 'react';

export default class Tab extends React.Component {

    componentDidMount(){

    }


	render() {
        const {children} = this.props;

		return (
            <div style = {{background:"red",width:"100%"}}>
                {children}
            </div>
		);

	}

}
