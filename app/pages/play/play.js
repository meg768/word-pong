import React from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

import EventsMixin from './eventsmixin.js';

import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {isFunction, sprintf, extend, random} from 'yow';
import Draggable from './draggable.js';

import {Letter} from '../../components/letter.js';
import $ from "jquery";


require('./play.less');

class DesktopIcon extends React.Component {


	constructor(props) {
		super(props);
console.log('creating icon');
		this.state = {};
	}

	componentDidMount() {

		var self = this;



		this.refs.draggable.on('dragStart', function(event) {

			if (self.props.events)
				self.props.events.emit('dragStart', self);

		});

		this.refs.draggable.on('dragEnd', function(event) {

			if (self.props.events)
				self.props.events.emit('dragEnd', self);

		});


	}

	componentWillUnmount() {
	}


	renderLock() {

		if (!this.props.locked)
			return;

		var lockStyle = {};
		lockStyle.position = 'absolute';
		lockStyle.right = 0;
		lockStyle.top = 0;
		lockStyle.fontSize = '50%';
		lockStyle.zIndex = 0;
		lockStyle.opacity = '0.75';

		return (
			<div style={lockStyle}>
				<img style={lockStyle} src={require('./images/lock.svg')}/>
			</div>

		);
	};

	renderLetter() {
		var style = {};
		//letterStyle.opacity = 0.75;

		return (
			<Letter ref='letter' style={style} letter={this.props.letter} selected={this.props.selected}/>

		);
	};

	render() {

		var style = {};
//		style.width      = '6em';
		style.textAlign  = 'center';
		style.padding = '0.3em';
		style.zIndex     = this.props.selected ? 100 : 0;

		var letterStyle = {};
		//letterStyle.opacity = 0.75;



		return (
			<Draggable.Item ref='draggable' draggable={!this.props.locked} initialX={this.props.initialX} initialY={this.props.initialY} style={style} >
				{this.renderLock()}
				{this.renderLetter()}
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

	select(id) {
		var items = this.state.items;

		items.forEach(function(item) {
			item.selected = id == item.id;
		});

		this.setState({items:items});

	}

	listen() {
		var self = this;

		this.events.on('dragStart', function(item) {

			self.select(item.props.id);
		});

		this.events.on('dragEnd', function(item) {
/*
			var items = self.state.items;

			items.forEach(function(item) {
				item.selected = false;
			});

			self.setState({items:items});
			*/
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
			items.push({locked:false, letter:letter, id:index, selected:false, initialX:range(10, 90, 5) + '%', initialY:range(10, 90, 5) + '%'});
		});

		this.listen();
		this.setState({items:items});

	};

	componentWillUnmount() {
		this.events.removeAllListeners();
	};

	lock() {
		var items = this.state.items;

		items.forEach(function(item) {
			if (item.selected)
				item.locked = !item.locked;
		});

		this.setState({items:items});
	};

	mix() {
	//	var children = React.Children.toArray(this.refs.draggable.props.children);
		var items = this.state.items;
		var self = this;

		items.forEach(function(item) {
			var child = self.refs[item.id];
			var element = $(ReactDOM.findDOMNode(child));
			//console.log(item.letter, element.offset());

			//console.log(item);
			item.initialX = '50%';
			item.initialY = '50%';
			item.locked = true;
//			console.log(item);

		});
//		items.pop();
		this.setState({items:items});
/*
		for (var index = 0; index < 100; index++) {
			var child = this.refs[sprintf('item-%02d', index)];

			if (!child)
				break;

//debugger;
			var element = $(ReactDOM.findDOMNode(child));
			console.log(element.offset(), element.innerHeight());
		}
		*/

/*
		React.Children.map(this.refs.draggable.props.children, function(child) {
			if (child.type == DesktopIcon) {
				var xx =  $(ReactDOM.findDOMNode(child));
				var clone = React.cloneElement(child, child.props);
				debugger;

			}

		});
*/

	};
	mixx() {
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
		this.select(null);

		event.stopPropagation();
		event.preventDefault();
	};


	render() {

		var _this = this;
		var style = {};

		function renderItems() {
			var items = [];
console.log('rendering items');
			_this.state.items.forEach(function(item, index) {
				items.push(
					<DesktopIcon ref={item.id} locked={item.locked} events={_this.events} key={index} id={item.id} selected={item.selected} letter={item.letter} initialX={item.initialX} initialY={item.initialY}/>
				);

			});

			return items;

		}

		style.width   = '100%';
		style.display = 'inline-block';
		style.height  = '100%';

		return (
			<Draggable.Container ref='container' className='DesktopComponent' onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} style={style}>
				{renderItems()}
			</Draggable.Container>

		);
	}

};


module.exports =  class Page extends React.Component {

	constructor(params) {
		super(params);

		this.state  = {};
		this.onMix  = this.onMix.bind(this);
		this.onLock = this.onLock.bind(this);
		this.state.word = 'WORDPONG';

		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');

		if (wordpong && wordpong.word)
			this.state.word = wordpong.word;

	};

	onLock() {
		this.refs.desktop.lock();
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
						<Button style={buttonStyle} bsStyle="primary" onClick={this.onMix} >Blanda</Button>
						<Button style={buttonStyle} bsStyle="primary" onClick={this.onLock} >
							Lås
						</Button>
						<Button style={buttonStyle} bsStyle="primary" href='#/home'>Klar</Button>
				</div>
			</div>



		);



	}

};
