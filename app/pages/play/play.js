import React from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

import EventsMixin from './eventsmixin.js';

import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {isFunction, sprintf, extend, random} from 'yow';
import {DraggableItem, DraggableContainer} from './draggable.js';

import {Letter} from '../../components/letter.js';
import $ from "jquery";


require('./play.less');

class DesktopIcon extends React.Component {


	constructor(props) {
		super(props);

		this.state = {};

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragStart(event) {
		this.props.onDragStart(event, this);
	}

	onDragEnd(event) {

		this.props.onDragEnd(event, this);

	}

	componentDidMount() {



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
			<DraggableItem ref='draggable' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}  position={this.props.position} style={style} >
				{this.renderLock()}
				{this.renderLetter()}
			</DraggableItem>
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
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	};


	scramble(input) {
		var output = [];

		while (input.length > 0) {
			output.push(input.splice(random(input.length), 1)[0]);
		}

		return output;
	};

	select(id) {
		var items = this.state.items;

		items.forEach(function(item) {
			item.selected = id == item.id;
		});

		this.setState({items:items});

	}


	onDragStart(event, item) {
		this.select(item.props.id);

		if (item.props.locked) {
			event.preventDefault();
		}

	}

	onDragEnd(event, item) {


	}


	scramble(input) {
		var output = [];

		while (input.length > 0) {
			output.push(input.splice(random(input.length), 1)[0]);
		}

		return output;
	}

	range(min, max, step) {
		var items = [];
		for (var i = min; i < max; i+= step) {
			items.push(i);
		}
		//return items[Math.floor((Math.random() * items.length))];
		return random(items);
	};

	componentDidMount() {


		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');
		var word = 'WORDPONG';
		var self = this;

		if (wordpong && wordpong.word) {
			word = wordpong.word;
		}

		var letters = word.split('');
		var items = [];

		letters.forEach(function(letter, index) {
			var item = {};
			item.locked   = false;
			item.selected = false;
			item.id       = index;
			item.letter   = letter;
			item.position = {x:self.range(10, 90, 5), y:self.range(10, 90, 5)};

			items.push(item);
		});

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
		var items = [];
		var self = this;

		var container = $(ReactDOM.findDOMNode(this.refs.container));

		var containerWidth = container.innerWidth();
		var containerHeight = container.innerHeight();

		console.log(width, height);

		this.state.items.forEach(function(item) {
			var child = self.refs[item.id];
			var element = $(ReactDOM.findDOMNode(child));

			var state = {};
			state.x = 50;
			state.y = 50;
			state.animate = true;

			if (child.refs.draggable.props.draggable)
				child.refs.draggable.setState(state);
			//console.log(item);
			//item.position = {x:'50%', y:'50%'};
			//item.locked = !item.locked;
			//item.selected = !item.selected;
			//item.position = {x:self.range(10, 90, 5) + '%', y:self.range(10, 90, 5) + '%'};

			//items.push(extend({}, item));
			console.log(item);

		});
	};



	onMouseDown(event) {
		this.select(null);

		event.stopPropagation();
		event.preventDefault();
	};


	render() {

		var self = this;
		var style = {};

		function renderItems() {
			var items = [];

			self.state.items.forEach(function(item, index) {
				items.push(
					<DesktopIcon
						ref={item.id}
						locked={item.locked}
						events={self.events}
						key={index}
						id={item.id}
						selected={item.selected}
						letter={item.letter}
						onDragStart={self.onDragStart}
						onDragEnd={self.onDragEnd}
						position={item.position}/>
				);

			});

			return items;

		}

		style.width   = '100%';
		style.display = 'inline-block';
		style.height  = '100%';

		return (
			<DraggableContainer ref='container' className='DesktopComponent' onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} style={style}>
				{renderItems()}
			</DraggableContainer>

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
