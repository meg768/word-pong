import React from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

import {Grid, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {isFunction, sprintf, extend, random} from 'yow';
import {DraggableItem, DraggableContainer} from './draggable.js';

import {Letter} from '../../components/letter.js';
import $ from "jquery";


require('./play.less');

class DraggableLetter extends React.Component {


	static defaultProps = {
		stytle: {},
		selected: false
	};

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
		lockStyle.right = '-0.2em';
		lockStyle.top = '-0.2em';
		lockStyle.zIndex = 0;
		lockStyle.opacity = '0.75';
		lockStyle.transform = 'scale(0.9,0.9)';

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
			<Letter ref='letter' className='letter' style={style} letter={this.props.letter} selected={this.props.selected}/>

		);
	};

	render() {

		var style = extend({}, this.props.style);

		style.zIndex = this.props.selected ? 100 : 0;


		return (
			<DraggableItem ref='draggable'  onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}  position={this.props.position} style={style} >
				{this.renderLock()}
				{this.renderLetter()}
			</DraggableItem>
		);


	}

};


class Playground extends React.Component {


	constructor(props) {

		super(props);
		this.state = {};
		this.state.items = [];

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

	select(id, type) {
		var items = this.state.items;

		items.forEach(function(item) {
			if (type == 'add') {
				(id == item.id)
					item.selected = true;
			}
			if (type == 'set') {
				item.selected = id == item.id;
			}
			if (type == 'invert') {
				item.selected = !item.selected;
			}
		});

		this.setState({items:items});

	}

	onDragStart(event, item) {
		var items = this.state.items;
		var id = item.props.id;

		items.forEach(function(item) {

			if (item.id == id) {
				item.transform = '';
				item.selected = !item.selected;
			}
		});

		this.setState({items:items});

		if (item.props.locked) {
			event.preventDefault();
			event.stopPropagation();
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
			item.transform = sprintf('rotate(%ddeg)', random(-10, 10));
			item.position = {x:self.range(40, 60, 2), y:self.range(40, 60, 2)};

			items.push(item);
		});

		this.setState({items:items});


	};

	componentWillUnmount() {
	};

	lock() {
		var items = this.state.items;

		items.forEach(function(item) {
			if (item.selected)
				item.locked = !item.locked;
			item.selected = false
		});

		this.setState({items:items});
	};

	mix() {
		var self = this;
		var positions = [];

		var items = this.state.items.filter(function(item) {
			return !item.locked;
		});

		var container = $(ReactDOM.findDOMNode(this.refs.container));

		var containerWidth = container.innerWidth();
		var containerHeight = container.innerHeight();

		var firstChild = $(ReactDOM.findDOMNode(this.refs[0]));
		var itemWidth  = firstChild.outerWidth();
		var itemHeight = firstChild.outerHeight();

		var unitX = 100 * itemWidth / containerWidth;
		var unitY = 100 * itemHeight / containerHeight;

		var cols = Math.floor(containerWidth / itemWidth);
		var rows = Math.floor(containerHeight / itemHeight);

		var offsetX = 0;
		var offsetY = (rows - (Math.floor(items.length / cols) + 1)) / 2;

		if (items.length < cols) {
			offsetX = (cols - items.length) / 2 + 0.0;
		}
		//debugger;
		items.forEach(function(item, index) {
			positions.push({x:index % cols , y:Math.floor(index / cols)});
		});

		positions = this.scramble(positions);

		this.state.items.forEach(function(item, index) {
			item.selected = false;

			if (item.transform)
				item.transform = sprintf('rotate(%ddeg)', random(-5, 5));

		});

		this.setState({items:this.state.items});
		items.forEach(function(item, index) {
			var child = self.refs[item.id];
			var element = $(ReactDOM.findDOMNode(child));

			var state = {};
			state.x = unitX * (positions[index].x + offsetX);
			state.y = unitY * (positions[index].y + offsetY);
			state.animate = true;

			child.refs.draggable.setState(state);
		});
	};



	onMouseDown(event) {

		var items = this.state.items;

		items.forEach(function(item) {
			item.selected = false;
		});

		this.setState({items:items});

		event.stopPropagation();
		event.preventDefault();
	};


	render() {

		var self = this;
		var style = {};



		function renderItems() {
			var items = [];


			self.state.items.forEach(function(item, index) {
				var style = {};

				if (item.transform)
					style.transform = item.transform;

				items.push(
					<DraggableLetter
						style = {style}
						ref={item.id}
						locked={item.locked}
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
			<DraggableContainer ref='container' className={this.props.className} onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} style={style}>
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
		this.refs.playground.lock();
	};

	onMix(event) {
		this.refs.playground.mix();
		event.preventDefault();
		event.stopPropagation();
	}
	componentDidMount() {


	};


	render() {

		var buttonStyle = {};
		//buttonStyle.borderRadius = '10em';
//		buttonStyle.minWidth = '10em';
		buttonStyle.marginLeft = '0.5em';
		buttonStyle.marginRight = '0.5em';

		return (


			<div className='play'>
				<Playground ref='playground' className='playground'>
				</Playground>

				<div className='footer'>

							<Button style={buttonStyle}  onClick={this.onMix} >
								<img src={require('./images/mix.svg')}/>
							</Button>
							<Button style={buttonStyle}  onClick={this.onLock} >
								<img src={require('./images/lock.svg')}/>
							</Button>
							<Button style={buttonStyle}  href='#/home'>
								<img src={require('./images/close.svg')}/>
							</Button>

				</div>
			</div>



		);



	}

};
