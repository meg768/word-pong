import React from 'react';
import ReactDOM from 'react-dom';
import EventsMixin from './eventsmixin.js';

import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {isFunction, sprintf, extend, random} from 'yow';
import Draggable from './draggable.js';

import {Letter} from '../../components/letter.js';

var EventEmitter = require('events').EventEmitter;

var bookioBlue = '#87ace7';

require('./play.less');

class DesktopIcon extends React.Component {


	constructor(props) {
		super(props);

		this.state = {};
		this.state.selected = false;
	}

	componentDidMount() {

		var self = this;

		/*
		this.on('select', function(component) {
			self.setState({selected:component && component.props.item.id == self.props.item.id});

		});
		*/

		this.refs.draggable.on('dragStart', function(event) {

			if (self.props.events)
				self.props.events.emit('dragStart', self);

		});


	}

	componentWillUnmount() {
	}



	render() {
		var classes = ['icon'];

		var style = {};
//		style.width      = '6em';
		style.textAlign  = 'center';
		style.padding = '0.3em';
		style.zIndex     = this.state.selected ? 100 : 0;

		var letterStyle = {};
		letterStyle.opacity = 0.75;

		if (this.state.selected)
			classes.push('selected');

		if (this.props.initialX && this.props.initialY) {


			return (
				<Draggable.Item ref='draggable' initialX={this.props.initialX} initialY={this.props.initialY} style={style} >
					<Letter ref='letter' style={letterStyle} letter={this.props.item.letter}/>
				</Draggable.Item>
			);

		}
		return (
			<Draggable.Item ref='draggable' style={style} >
				<Letter ref='letter' style={letterStyle} letter={this.props.item.letter}/>
			</Draggable.Item>
		);

	}

};


class Desktop extends React.Component {


	constructor(props) {

		super(props);
		this.state = {};
		this.state.items = [];

		this.events = new EventEmitter();

		this.onMouseDown = this.onMouseDown.bind(this);
	};


	mixWord(word) {
		var input = word.toUpperCase().split('');
		var output = [];

		while (input.length > 0) {
			output.push(input.splice(random(input.length), 1)[0]);
		}

		return output.join('');
	};

	listen() {
		this.events.on('dragStart', function(item) {
			console.log('dragStart', item.props.item.letter);

			item.refs.letter.setState({selected:true});
		});
	}

	componentDidMount() {

		function range(min, max, step) {
			var items = [];
			for (var i = min; i < max; i+= step) {
				items.push(i);
			}
			//return items[Math.floor((Math.random() * items.length))];
			return random(items);
		}

		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');
		var word = 'WORDPONG';

		if (wordpong && wordpong.word) {
			word = wordpong.word;
		}

		var letters = this.mixWord(word).split('');
		var items = [];

		letters.forEach(function(letter, index) {
			items.push({letter:letter, id:index, initialX:range(10, 90, 5) + '%', initialY:range(10, 90, 5) + '%'});
		});

		this.listen();
		this.setState({items:items});

	};

	componentWillUnmount() {
		this.events.removeAllListeners();
	};

	mix() {
		var items = [];
		var word = '';

		this.state.items.forEach(function(item, index) {
			word += item.letter;
		});

		var letters = this.mixWord(word).split('');

		letters.forEach(function(letter, index) {
			items.push({letter:letter, id:index});
		});

		this.setState({items:items});

	};

	onMouseDown(event) {
		this.events.emit('select', null);

		event.stopPropagation();
		event.preventDefault();
	};


	render() {

		var _this = this;
		var style = {};

		function renderItems() {
			var items = [];

			_this.state.items.forEach(function(item, index) {
				if (item.initialX && item.initialY) {
					items.push(
						<DesktopIcon events={_this.events} key={index} item={item} initialX={item.initialX} initialY={item.initialY}/>
					);

				}
				else {
					items.push(
						<DesktopIcon events={this.events} key={index} item={item}/>
					);

				}
			});

			return items;

		}

		style.width   = '100%';
		style.display = 'inline-block';
		style.height  = '100%';

		return (
			<Draggable.Container className='DesktopComponent' onMouseDown={this.onMouseDown} style={style}>
				{renderItems()}
			</Draggable.Container>

		);
	}

};


/*

var DesktopIcon = React.createClass({

	mixins: [EventsMixin],

	getDefaultProps() {

		return {
			item: null
		};
	},

	getInitialState(){
		return {
			selected: false
		};
	},


	componentDidMount() {

		var self = this;

		this.on('select', function(component) {
			self.setState({selected:component && component.props.item.id == self.props.item.id});

		});

		this.refs.draggable.on('dragStart', function(event) {

			console.log('drag start', self.props.item.id)
			self.emit('select', self);

		});


	},



	render() {
		var classes = ['icon'];

		var style = {};
//		style.width      = '6em';
		style.textAlign  = 'center';
		style.padding = '0.3em';
		style.zIndex     = this.state.selected ? 100 : 0;

		var letterStyle = {};
		letterStyle.opacity = 0.75;

		if (this.state.selected)
			classes.push('selected');

		if (this.props.initialX && this.props.initialY) {


			return (
				<Draggable.Item ref='draggable' initialX={this.props.initialX} initialY={this.props.initialY} style={style} >
					<Letter style={letterStyle} letter={this.props.item.letter}/>
				</Draggable.Item>
			);

		}
		return (
			<Draggable.Item ref='draggable' style={style} >
				<Letter style={letterStyle} letter={this.props.item.letter}/>
			</Draggable.Item>
		);

	}

});

*/

/*

var Desktop = React.createClass({


	mixins: [EventsMixin],

	vars: {
		zIndex: 0
	},

	getInitialState() {

		return {
			items: []
		};
	},

	getDefaultProps() {

		var props = {};

		props.items = [];

		return props;
	},

	mixWord(word) {
		var input = word.toUpperCase().split('');
		var output = [];

		while (input.length > 0) {
			output.push(input.splice(random(input.length), 1)[0]);
		}

		return output.join('');
	},

	componentDidMount() {

		function range(min, max, step) {
			var items = [];
			for (var i = min; i < max; i+= step) {
				items.push(i);
			}
			//return items[Math.floor((Math.random() * items.length))];
			return random(items);
		}

		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');
		var word = 'WORDPONG';

		if (wordpong && wordpong.word) {
			word = wordpong.word;
		}

		var letters = this.mixWord(word).split('');
		var items = [];

		letters.forEach(function(letter, index) {
			items.push({letter:letter, id:index, initialX:range(10, 90, 5) + '%', initialY:range(10, 90, 5) + '%'});
		});

		this.setState({items:items});

	},

	mix() {
		var items = [];
		var word = '';

		this.state.items.forEach(function(item, index) {
			word += item.letter;
		});

		var letters = this.mixWord(word).split('');

		letters.forEach(function(letter, index) {
			items.push({letter:letter, id:index});
		});

		this.setState({items:items});

	},

	onMouseDown(event) {
		this.emit('select', null);

		event.stopPropagation();
		event.preventDefault();
	},


	render() {

		var _this = this;
		var style = {};

		function renderItems() {
			var items = [];

			_this.state.items.forEach(function(item, index) {
				if (item.initialX && item.initialY) {
					items.push(
						<DesktopIcon key={index} item={item} initialX={item.initialX} initialY={item.initialY}/>
					);

				}
				else {
					items.push(
						<DesktopIcon key={index} item={item}/>
					);

				}
			});

			return items;

		}

		style.width   = '100%';
		style.display = 'inline-block';
		style.height  = '100%';

		return (
			<Draggable.Container className='DesktopComponent' onMouseDown={this.onMouseDown} style={style}>
				{renderItems()}
			</Draggable.Container>

		);
	}

});

*/




module.exports =  class Page extends React.Component {

	constructor(params) {
		super(params);

		this.state = {};
		this.onMix = this.onMix.bind(this);
		this.state.word = 'WORDPONG';

		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');

		if (wordpong && wordpong.word)
			this.state.word = wordpong.word;

	};

	onMix(event) {
		this.refs.desktop.mix();
		event.preventDefault();
		event.stopPropagation();
	}
	componentDidMount() {


	};


	render() {

		var buttonStyle = {};
		buttonStyle.borderRadius = '10em';
//		buttonStyle.minWidth = '10em';
		buttonStyle.marginLeft = '0.5em';
		buttonStyle.marginRight = '0.5em';

		return (


			<div className='play'>
				<Desktop ref='desktop' className='playground'>
				</Desktop>

				<div className='footer'>
						<Button style={buttonStyle} bsStyle="primary" onClick={this.onMix} onTouchStart={this.onMix}>Blanda</Button>
						<Button style={buttonStyle} bsStyle="primary" href='#/home'>Klar</Button>
				</div>
			</div>



		);



	}

};
