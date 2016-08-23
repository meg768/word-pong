import React from 'react';
import ReactDOM from 'react-dom';
import {sprintf, Events} from '../../scripts/toolbox.js';

var instanceCounter = 99;



var EventsMixin = module.exports = {


	events: undefined, 
	

	getInitialState() {
		
		var state = {};
		
		if (this.props.events != undefined) {
			// If events specified by props, use it
			this.events = this.props.events;
			
		}
		else {
			// Otherwise create new events
			this.events = new Events(this, sprintf('events-%d', instanceCounter++));
		}

		return {};
	},
	
	componentDidMount() {
		
	},

	componentWillUnmount() {
		if (this.events)
			this.events.removeAllListeners();
	},
	
	emit() {
		if (this.events != undefined) {
			this.events.setContext(this);
			return this.events.emit.apply(this, arguments);
			
		}
		else {
			console.log('Whoops');
			
		}
	},
	
	on() {
		if (this.events != undefined) {
			this.events.setContext(this);
			this.events.on.apply(this, arguments);
			
		}
		else {
			console.log('Whoops');
		}
	},
	
};


/*
	

var EventsMixin = module.exports = {


	events: new Events(this),

	componentDidMount(props, state) {
		
		if (this.props.events != undefined)
			this.events = this.props.events;
	},

	componentWillUnmount() {
		if (this.events)
			this.events.removeAllListeners();
	},
	
	emit() {
		this.events.setContext(this);
		return this.events.emit.apply(this, arguments);
	},
	
	on() {
		this.events.setContext(this);
		this.events.on.apply(this, arguments);
	},
	
};
*/