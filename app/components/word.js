import React from 'react';
import {sprintf, extend, isString, isObject, isArray} from 'yow';

import {Letter} from './letter.js';

export class Word extends React.Component {

	constructor(props) {
		super(props);
	};

	render() {
		var style = this.props.style || {};

		var letters = this.props.word.split('');
		var nodes = [];

		letters.forEach(function(letter, index) {
			nodes.push(
				<Letter letter={letter} key={index}/>
			);
		});
		return(
			<div style={style}>
				{nodes}
			</div>
		);

	};
};
