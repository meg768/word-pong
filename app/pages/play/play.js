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
			<Letter ref='letter' className='letter' style={style} letter={this.props.letter} selected={this.props.selected}/>

		);
	};

	render() {

		var style = {};
//		style.width      = '6em';
		//style.textAlign  = 'center';
		//style.padding = '0.0em';
		style.zIndex     = this.props.selected ? 100 : 0;

		var letterStyle = {};
		//letterStyle.opacity = 0.75;



		return (
			<DraggableItem ref='draggable' className='draggable' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}  position={this.props.position} style={style} >
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

	select(id) {
		var items = this.state.items;

		items.forEach(function(item) {
			item.selected = id == item.id;

			if (id == item.id) {
				console.log('SELECTED');
			}
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
		var items = this.state.items;
		var self = this;
		var positions = [];

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
		var offsetY = (rows - (Math.floor(this.state.items.length / cols) + 1)) / 2;

		if (items.length < cols) {
			offsetX = (cols - this.state.items.length) / 2 + 0.0;
		}
		//debugger;
		items.forEach(function(item, index) {
			positions.push({x:index % cols , y:Math.floor(index / cols)});
		});

		positions = this.scramble(positions);

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
					<DraggableLetter
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
