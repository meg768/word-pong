import React from 'react';
import {sprintf, extend, isString, isObject, isArray} from 'yow';

require('./letter.less');

export class Letter extends React.Component {

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.state = {};
		this.state.seleced = props.selected ? true : false;
	};

	onClick(event) {

		if (this.props.onClick)
			this.props.onClick(this.props.letter);

		event.preventDefault();
		event.stopPropagation();
	}

	render() {
		var classNames = ['letter'];

		var outerStyle = {};
		var innerStyle = {};

		outerStyle.border = '2px solid hsl(212, 50% , 75%)';
		outerStyle.display = 'inline-table';

		outerStyle.borderRadius = '4px';
		outerStyle.width = '2em';
		outerStyle.height = '2em';
		outerStyle.fontSize = '150%';
		outerStyle.textAlign = 'center';
		//style.background = 'hsl(212,50%,90%)';
		outerStyle.margin = '0.1em 0.1em 0.1em 0.1em';

		extend(outerStyle, this.props.style);

		innerStyle.display = 'table-cell';
		innerStyle.verticalAlign = 'middle';

		if (this.state.selected)
			classNames.push('selected');

		if (this.props.onClick != undefined) {
			return(
				<div className={classNames.join(' ')} style={outerStyle}  onTouchStart={this.onClick} onClick={this.onClick}>
					<div style={innerStyle}>
						{this.props.letter}
					</div>
				</div>
			);

		}

		return(
			<div className={classNames.join(' ')} style={outerStyle}>
				<div style={innerStyle}>
					{this.props.letter}
				</div>
			</div>
		);

	};
};
