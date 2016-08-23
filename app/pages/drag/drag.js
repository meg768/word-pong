import React from 'react';
import ReactDOM from 'react-dom';
import EventsMixin from './eventsmixin.js';

import {Grid, Row, Col, Button, Input} from 'react-bootstrap';
import {ListView, ListViewItem} from '../../components/listview.js';
import {Events, isFunction, sprintf, extend} from '../../scripts/toolbox.js';
import Draggable from './draggable.js';
import {CalendarRow, CalendarCell} from './timeline.js';
import Slider from './slider.js';

var bookioBlue = '#87ace7';

require('./drag.less');


var ImagePart = React.createClass({

	getInitialState(){
		return {
		};
	},
	
	getDefaultProps() {

		return {
			image:'0000'
		};
	},	
	

	render() {
		
		var style = {};
		style.width       = '5em';
		style.height      = '5em';
		style.left        = 0;
		style.right       = 0;
		style.marginRight = 'auto';
		style.marginLeft  = 'auto';

		var image = sprintf('./assets/images/symbols/%s.svg', this.props.image);

		return (
			<img className='image' draggable='false' src={image} style={style}/>
		);

	}

});


var TextPart = React.createClass({

	getInitialState(){
		return {
		};
	},
	
	getDefaultProps() {

		return {
			text: 'undefined'
		};
	},	
	
	render() {
		var style = {};
		style.display = 'block';
		style.marginTop = '0.3em';
		style.padding = '0.3em';
		return (
			<div style={style} className='text'>
				<div style={{paddingLeft:'0.5em', paddingRight:'0.5em', display:'inline-block'}}>{this.props.text}</div>
			</div>
		);

	}

});


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

			console.log('event handler', this.props.events.name);
			console.log('drag start', self.props.item.id)
			self.emit('select', self);
			
		});


	},



	render() {
		var classes = ['icon'];
		
		var style = {};
		style.width      = '6em';
		style.textAlign  = 'center';
		style.padding = '0.3em';
		style.zIndex     = this.state.selected ? 100 : 0; 
		
		if (this.state.selected)
			classes.push('selected');

		return (
			<Draggable.Item ref='draggable' className={classes.join(' ')} events={new Events()} style={style} >
				<ImagePart ref='image' events={this.props.events} image={this.props.item.image}/>
				<TextPart ref='text' events={this.props.events} text={this.props.item.text}/>
			</Draggable.Item>
		);

	}

});


 
var Desktop = React.createClass({


	mixins: [EventsMixin],
	
	vars: {
		zIndex: 0
	},

	getInitialState() {

		return {
			items: [{id:'A', text:'Magnus', image:'0000'}]
		};
	},
	
	getDefaultProps() {
	
		var props = {};
		
		props.items = [];

		return props;
	},	

	componentDidMount() {
		
		
	},
	
	componentWillUnmount() {
	},

	addItem(item) {

		var items = this.state.items;
		items.push(item);
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
				items.push(
					<DesktopIcon events={_this.props.events} key={index} item={item}/>
				);	
			});	
			
			return items;
			
		}

		style.width   = '75%';
		style.display = 'inline-block';
		style.height  = '300px';

		return (
			<Draggable.Container className='DesktopComponent' onMouseDown={this.onMouseDown} style={style}>
				{renderItems()}
			</Draggable.Container>
			
		);
	}

});


			



module.exports = React.createClass({

	
	vars: {
		counter:0	
	},
	
	getInitialState(){
		return {
			counter: 0
		};
	},
	
	getDefaultProps() {


		return {
		};
	},	

	componentDidMount() {
		
		
		this.refs.slider.on('change', function(args) {
			console.log('Slider changed', args);
		});
		
		this.refs.desktop.on('select', function(component) {
			if (component == null)
				console.log('Nothing selected');
			else
				console.log('Icon selected', component.props.item.id);
		});
	},
	
	onClick() {

		var item = {};
		item.id    = sprintf('%04d', this.vars.counter++);
		item.text  = sprintf('Murbruk #%d', this.state.counter++);
		item.image = '0000';
		this.refs.desktop.addItem(item);
	},
	
	render() {


		return (


			<Grid>

				<Row>
					<Col>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie turpis vitae fermentum aliquet. Nulla tincidunt eget enim mollis mollis. Aliquam vulputate est sit amet sem semper vehicula. Aenean tincidunt.</p>
					</Col>
				</Row>
				<Row  style={{textAlign:'center', lineHeight:'15px'}}>
					<Col>
						<Desktop ref='desktop' events={new Events()}/>
						<CalendarRow style={{fontSize:'100%', display:'inline-block', width:'75%', textAlign:'center'}}/>
						<Slider ref='slider' events={new Events()}style={{display:'inline-block',width:'75%'}}/>
					</Col>
				</Row>
				<Row>
					<div style={{'textAlign':'center'}}>
						<Button style={{}} bsStyle="primary" onClick={this.onClick}>Lägg till</Button>
					</div>
				</Row>

				<Row>
				</Row>

			</Grid>
			
			

		);
	}

});

