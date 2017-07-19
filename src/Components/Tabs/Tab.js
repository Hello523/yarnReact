import React from 'react';

export default class TabC extends React.Component {

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
