import React from 'react';
import ReactDOM from 'react-dom';
import Events from 'events';
import {Grid, Row, Col, Button, Badge} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {sprintf} from '../../scripts/toolbox.js';

require('./bp.less');

// just extend this object to have access to this.subscribe and this.dispatch



var Cell = React.createClass({
	

	getInitialState(){
		return {
			letter: '',
			selected: false
		};
	},

	componentDidMount() {
		var _this = this;

		_this.props.events.on('keypress', function(letter){ 
			if (_this.state.selected) {
				_this.setState({letter:letter});
				_this.props.events.emit('cellContentChanged', _this);
			}
		});

		_this.props.events.on('select', function(name) { 
			if (_this.props.name == name) {
				if (_this.state.selected)
					return;
					
				_this.setState({selected:true});
				_this.props.events.emit('activeCellChanged', _this);
					
				
			}
			else {
				_this.setState({selected:false});
				
			}
		});
		
	},
	
	getDefaultProps() {
		return {
			type: '',
			name: ''
		};
	},	
	
	onClick() {
		var _this = this;
		
		_this.props.events.emit('cellClicked', _this);

	},

	render() {
		var classes = '';
		
		classes += 'cell ';
		classes += this.props.type + ' ';
		classes += this.state.selected ? 'selected ' : '';
		classes += this.state.letter.length > 0 ? 'has-content ' : '';
		
		return (
			<div ref='element' className={classes} onClick={this.onClick}>
				{this.state.letter}
			</div>
			
		);
	}
	
});

var Letters = React.createClass({
	getInitialState(){
		return {
		};
	},
	
	getDefaultProps() {
		return {
		};
	},	

	render() {
		return (
                <div className="letters">
                    <div className="row">
                        <Cell events={this.props.events} name='letters.0'/>
                        <Cell events={this.props.events} name='letters.1'/>
                        <Cell events={this.props.events} name='letters.2'/>
                        <Cell events={this.props.events} name='letters.3'/>
                        <Cell events={this.props.events} name='letters.4'/>
                        <Cell events={this.props.events} name='letters.5'/>
                        <Cell events={this.props.events} name='letters.6'/>
                    </div>
                </div>			
		);
	}
	
});





var Board = React.createClass({

	vars: {
		activeCell: ''
	},

	getInitialState() {
		return {
		};
	},
	
	getDefaultProps() {
		return {
			activeCell:''
		};
	},	

	componentDidMount() {

	},
	

	render() {
		var component = this;
		
		console.log('rendering board');
		
		var layout = [
			['TL','NN','NN','TW','NN','NN','NN','NN','NN','NN','NN','TW','NN','NN','TL'],
			['NN','DW','NN','NN','NN','NN','NN','DW','NN','NN','NN','NN','NN','DW','NN'],
			['NN','NN','TL','NN','NN','DL','NN','NN','NN','DL','NN','NN','TL','NN','NN'],
			['TW','NN','NN','DL','NN','NN','DL','NN','DL','NN','NN','DL','NN','NN','TW'],
			['NN','NN','NN','NN','DW','NN','NN','DL','NN','NN','DW','NN','NN','NN','NN'],
			['NN','NN','DL','NN','NN','DL','NN','NN','NN','DL','NN','NN','DL','NN','NN'],
			['NN','NN','NN','DL','NN','NN','TL','NN','TL','NN','NN','DL','NN','NN','NN'],
			
			['NN','DW','NN','NN','DL','NN','NN','XX','NN','NN','DL','NN','NN','DW','NN'],
			
			['NN','NN','NN','DL','NN','NN','TL','NN','TL','NN','NN','DL','NN','NN','NN'],
			['NN','NN','DL','NN','NN','DL','NN','NN','NN','DL','NN','NN','DL','NN','NN'],
			['NN','NN','NN','NN','DW','NN','NN','DL','NN','NN','DW','NN','NN','NN','NN'],
			['TW','NN','NN','DL','NN','NN','DL','NN','DL','NN','NN','DL','NN','NN','TW'],
			['NN','NN','TL','NN','NN','DL','NN','NN','NN','DL','NN','NN','TL','NN','NN'],
			['NN','DW','NN','NN','NN','NN','NN','DW','NN','NN','NN','NN','NN','DW','NN'],
			['TL','NN','NN','TW','NN','NN','NN','NN','NN','NN','NN','TW','NN','NN','TL']
			
		];
		
		var rows = [];
		
		layout.forEach(function(item, rowIndex) {
			
			var cells = [];
			
			item.forEach(function(item, columnIndex) {
				cells.push(
					<Cell events={component.props.events} type={item} key={columnIndex} name={sprintf('board.%d', rowIndex * 15 + columnIndex)}/>
				);
			});

			rows.push(
				<div className="row" key={rowIndex}>	
					{cells}
				</div>				
			);
			
			
		});


		return (
			<div className="board" style={{display:'inline-block'}}>
				{rows}
			</div>
			
		);
	}
	
});

var OutputLetter = React.createClass({
	

	getInitialState(){
		return {
			letter: '',
			count: 3,
		};
	},

	componentDidMount() {
		var _this = this;

	},
	
	getDefaultProps() {
	},	
	

	render() {
		var _this = this;
		
		var style = {
			display:'inline-block',
			paddingLeft: '0.3em',
			paddingRight: '0.3em'
		};
		
		
		function letter() {
			return (
				<strong>
					{_this.props.letter}
				</strong>
				
			);			
		};
		
		function count() {
			if (_this.props.count > 1) {
				return (
					<sup style={{}}>
						{_this.props.count}
					</sup>
					
				);
				
			}
				
		};

		function content() {
			if (_this.props.count > 0) {

				var style = {
					display:'inline-block',
					paddingLeft:'0.5em',
					paddingRight:'0.5em'
				};
				return (
					<div style={style}>
					
						<div style={{fontSize:'150%'}}>
							{letter()}
							{count()}
						</div>
					</div>
					
				);
			}
		}

		return content();
	}
	
});


var Output = React.createClass({
	

	getInitialState(){
		return {
			text: ''
		};
	},

	componentDidMount() {
		var _this = this;

		_this.props.events.on('cellContentChanged', function(cell) {
			_this.update();
		});

	},
	
	getDefaultProps() {
		return {
			text: ''						
		};
	},	
	
	update() {
		var _this = this;

		var element = $(ReactDOM.findDOMNode(this.refs.element));
		var text = '';
						
		$('#Betapet').find('.cell').each(function(index) {
			text += $(this).text().toUpperCase();
		});

		console.log(text);

		_this.setState({text:text});

		
	},

	render() {
		var _this = this;
		
		var children = [];		 
		var occurances = {};
		var template = '*:2 A:9 B:2 C:1 D:5 E:8 F:2 G:3 H:2 I:5 J:1 K:3 L:5 M:3 N:5 O:5 P:2 R:7 S:8 T:8 U:3 V:2 X:1 Y:1 Z:1 Å:1 Ä:1 Ö:1';

		template.split(' ').forEach(function(item) {
			item = item.split(':');
			occurances[item[0]] = parseInt(item[1]);
		});
		
		console.log(_this.props.text);
		
		_this.state.text.split('').forEach(function(letter) {
			occurances[letter]--;
		});
		
		'*ABCDEFGHIJKLMNOPRSTUVXYZÅÄÖ'.split('').forEach(function(letter, index) {
			var count = occurances[letter];
			
			if (count > 0) {
				children.push(
					<OutputLetter key={index} letter={letter} count={occurances[letter]}/>
				);	
				
			}
		});
		
		return (
		
			<div style={{display:'inline-block'}}>
				{children}
			</div>
			
		);
	}
	
});



var Betapet = React.createClass({

	getInitialState(){
		return {
			output: ''
		};
	},

	vars: {
		activeCell: ''
	},
	
	getDefaultProps() {
		
		var events = new Events.EventEmitter();
		events.setMaxListeners(300);

		return {
			events: events
		};
	},	
	
			
	componentWillUnmount() {
		var _this = this;

		_this.props.events.removeAllListeners();
		$(document).off('.betapet');
	},
	
	componentDidMount() {
		var _this = this;

		_this.props.events.on('activeCellChanged', function(cell) {
			console.log('Active cell changed to ', cell.props.name);
			_this.vars.activeCell = cell.props.name;
		});


		_this.props.events.on('cellClicked', function(cell) {
			_this.props.events.emit('select', cell.props.name);
			_this.vars.activeCell = cell.props.name;
			console.log('active cell', _this.vars.activeCell);
		});
		
		$(document).on('keypress.betapet', function(event) {
			var letter = '';
			
			if (event.charCode > 32)
				letter = String.fromCharCode(event.charCode).toUpperCase();
				
			_this.props.events.emit('keypress', letter);
		});		
		
		$(document).on('keydown.betapet', function(event) {

			console.log('keycode', event.keyCode);

			var KEY_UP    = 38;
			var KEY_LEFT  = 37;
			var KEY_RIGHT = 39;
			var KEY_DOWN  = 40;
			
			var activeCell = _this.vars.activeCell.split('.');
			
			if (activeCell.length != 2)
				return;
				
			var section = activeCell[0];
			var index   = parseInt(activeCell[1]);
				
			if (section == 'board') {
				var row = Math.floor(index / 15);
				var col = index % 15;
				
				switch (event.keyCode) {
					case KEY_RIGHT: {
						col = (15 + col + 1) % 15;
						index = row * 15 + col;
						break;
					}
					case KEY_LEFT: {
						col = (15 + col - 1) % 15;
						index = row * 15 + col;
						break;
					}
					case KEY_UP: {
						row = (15 + row - 1) % 15;
						index = row * 15 + col;
						break;
					}
					case KEY_DOWN: {
						if (row == 14) {
							section = 'letters';
							index   = 3;
						}
						else {
							row = (15 + row + 1) % 15;
							index = row * 15 + col;
						}
						break;
					}
					default:
						return;
				}
				
			}
			else if (section == 'letters') {
				var row = Math.floor(index / 7);
				var col = index % 7;
				
				switch (event.keyCode) {
					case KEY_RIGHT: {
						col   = (7 + col + 1) % 7;
						index = row * 7 + col;
						break;
					}
					case KEY_LEFT: {
						col   = (7 + col - 1) % 7;
						index = row * 7 + col;
						break;
					}
					case KEY_UP: {
						section = 'board';
						index   = 14 * 15 + 7;
						break;
					}
					case KEY_DOWN: {
						section = 'board';
						index   = 7;
						break;
					}
					default:
						return;
				}
				
			}
			else	
				return;

			var newActiveCell = sprintf('%s.%d', section, index);
				
			console.log('Moving from %s to %s', _this.vars.activeCell, newActiveCell);

			_this.props.events.emit('select', sprintf('%s.%d', section, index));
		});

		
		
	},
	


	render() {
		var component = this;

		return (
			<div id='Betapet' ref="element" style={{fontSize:'120%', textAlign:'center'}}>
				<div style={{display:'inline-block'}}>
					<Board events={this.props.events} ref='board'/>
				</div>
				<br/>
				<div style={{display:'inline-block'}}>
					<Letters events={this.props.events}/>
				</div>
				<br/>
				<Output ref='output' events={this.props.events}>
				</Output>
			</div>

		);
	}


	
});


module.exports = React.createClass({

	getInitialState(){
		return {
		};
	},
	
	componentWillUnmount() {
	},
	
	componentDidMount() {
	},
	
	getDefaultProps() {
		return {
		};
	},	
	

	render() {
		

		return (
				<Grid>
					<Row>
						<Col>
							<Betapet/>
						</Col>
					</Row>
				</Grid>
			

		);
	}

});

