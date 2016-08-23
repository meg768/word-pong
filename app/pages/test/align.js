import React from 'react';
import {extend} from '../../scripts/toolbox.js';


export default class Align extends React.Component {

	constructor(...args) {
		super(...args);
	};

	render() {
		var _this = this;
		
		var style = {};
		extend(style, this.props.style, {display:'table', width:'100%', height:'100%'});

		return (
			<div style={style}>
				<div style={{display:'table-cell', verticalAlign:this.props.verticalAlign, textAlign:this.props.textAlign}}>
					{_this.props.children}
				</div>
			</div>
			

		);
	}

};


Align.defaultProps =  {
	textAlign: 'center',
	verticalAlign: 'middle'
};

