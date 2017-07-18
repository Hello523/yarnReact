import React from 'react';

export default class Tabs extends React.Component {

    componentDidMount(){
       
    }


	render() {
        const {children} = this.props;

		return (
            <div>
                {children}
            </div>
		);

	}

}
