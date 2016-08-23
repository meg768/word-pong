import React from 'react';
import ReactDOM from 'react-dom';
import {sprintf, extend} from '../../scripts/toolbox.js';
import Events from '../../../lib/scripts/events.js';



export class Button extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {};
		this.events = props.events == undefined ? new Events(this) : props.events;
		this.onClick = this.onClick.bind(this);
	}

	componentWillUnmount() {
		this.events.removeAllListeners();
	}
	
	on() {
		this.events.on.apply(this, arguments);
	};

	emit() {
		this.events.emit.apply(this, arguments);
	};

	
	onClick() {
		this.emit('click', this);
	}
	
	render() {
		return  (
			<button onClick={this.onClick} className="btn btn-primary" {...this.props}>
				{this.props.children}
			</button>			
		);
	};
};



export class List extends React.Component {
	
	render() {
		return (
			<ul className='mdl-list' {...this.props}>
				{this.props.children}
			</ul>			
		);

	};
};

export class ListItem extends React.Component {
	
	render() {
		return (
			<li className='mdl-list__item' {...this.props}>
   <span className="mdl-list__item-primary-content">
				{this.props.children}
   </span>
			</li>			
		);

	};
};


