import React from 'react';
import ReactDOM from 'react-dom';
import EventsMixin from './eventsmixin.js';

import {isFunction, sprintf, extend} from '../../scripts/toolbox.js';

var Draggable = module.exports = {};



Draggable.Container = React.createClass({

	getInitialState(){
		return {
		};
	},
	
	getDefaultProps() {

		return {
			style: {
			}
		};
	},	
	

	render() {
		
		var {style, ...other} = this.props;


		// Make sure this div is relative		
		style.position = 'relative';
		
		return (
			<div style={style} {...other} >
				{this.props.children}
			</div>
		);

	}

});



Draggable.Item = React.createClass({
	
	mixins: [EventsMixin],
	
	
	getDefaultProps() {
		return {
			gridSize: 50,
			onDragStart: null,
			onDragEnd: null,
			initialX: 0,
			initialY: 0,
			style: {
			}
		}
	},
	
	getInitialState() {

		var state = {};
		
		state.x         = this.props.initialX;
		state.y         = this.props.initialY;
		state.animate   = false;
		state.selected  = true;
		state.dragging  = false;
		state.draggable = true;
		
		return state;
		
	},

	componentWillUnmount() {
	},


	componentDidMount() {
		console.log('draggable', this.props);

	},


	onMouseDown(event) {

		var _this = this;

		if (isFunction(_this.props.onDragStart)) {
			
			_this.props.onDragStart(event);

			if (event.defaultPrevented)
				return;
		}
		
		_this.emit('dragStart', event);
		
			
		// Only left mouse button
		if (event.button !== 0)
			return;
			
		if (!_this.state.draggable)
			return;

		var pageX     = event.pageX;
		var pageY     = event.pageY;

		var element   = $(ReactDOM.findDOMNode(_this.refs.root));
		var parent    = element.parent();

		var position  = element.position();
		var size      = element[0].getBoundingClientRect();

		var bounds = {};
		bounds.width  = parent.innerWidth();
		bounds.height = parent.innerHeight();
		
		addListeners();
		
		event.stopPropagation();
		event.preventDefault();
		
		function addListeners() {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		}

		function removeListeners() {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);			
		}
		
		function onMouseMove(event) {
		
			var offsetX = event.pageX - pageX;
			var offsetY = event.pageY - pageY;
	
			var state = {};
			
			state.animate  = false;
			state.dragging = true;
			state.x        = position.left + offsetX;
			state.y        = position.top + offsetY;
	
			if (state.x < 0)
				state.x = 0;
						
			if (state.y < 0)
				state.y = 0;
		
			if (state.x + size.width > bounds.width)
				state.x = bounds.width - size.width;
	
			if (state.y + size.height > bounds.height)
				state.y = bounds.height - size.height;
				
			_this.setState(state);
			
			event.stopPropagation()
			event.preventDefault()
			
		}
		
		function onMouseUp(event) {
			removeListeners();

			var gridSizeX = size.width;
			var gridSizeY = size.height;

			var x = Math.floor(((_this.state.x + (gridSizeX / 2)) / gridSizeX)) * gridSizeX;
			var y  = Math.floor(((_this.state.y + (gridSizeY / 2))/ gridSizeY)) * gridSizeY;
			
			var state = {};
			state.animate  = true;
			state.dragging = false;
			state.x        = x;
			state.y        = y;

	
			if (isFunction(_this.props.onDragEnd)) {
				
				_this.props.onDragEnd(event);
	
				if (event.defaultPrevented)
					return;
			}			
			
			_this.emit('dragEnd', event);

			if (event.defaultPrevented)
				return;
			
			_this.setState(state);
	
			event.stopPropagation()
			event.preventDefault()
			
		}
	},

	render() {
		var {style, ...other} = this.props;
		
		var style = {};
		extend(style, this.props.style);
				
		style.left     = this.state.x;
		style.top      = this.state.y;
		style.position = 'absolute';
		//style.opacity  = this.state.dragging ? '0.5' : '1';
		
		if (this.state.animate) {
			style.transition = 'left 0.5s ease, top 0.3s ease';
		}

		return (
			<div ref='root' onMouseDown={this.onMouseDown}  style={style} {...other}>
				{this.props.children}
			</div>
		);
	
	}
})

