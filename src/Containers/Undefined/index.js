import React from 'react';

import './index.less';

export default class Undefined extends React.Component {


	render() {

		return (
			<div className="ui-Undefined">
				<div className='ui-labelText'>
						<div className="Undefined">
							<div className="left-bg"></div>
							<div className="right-bg">
								<p className="tip">
									<span className="icon"></span>
								</p>
								<p className="btn">
									<a>转到主页</a>
									<a className="pr">联系我们</a>
								</p>
							</div>
						</div>
					</div>
			</div>
		);

	}

}
