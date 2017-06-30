import React from 'react';

export default class Basic extends React.Component {
	render() {

		return (
				<div style={{marginBottom:"50px"}}>
					{this.props.children}
				</div>
	   );
	}
}
