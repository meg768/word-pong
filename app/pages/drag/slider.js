import React from 'react';
import ReactDOM from 'react-dom';
import Events from 'events';
import EventsMixin from './eventsmixin.js';

import {isObject, isFunction, sprintf, extend} from '../../scripts/toolbox.js';


require('./slider.less');


var Slider = module.exports = React.createClass({

	mixins: [EventsMixin],
	 
	getInitialState(){
		return {
			
		};
	},
	
	getDefaultProps() {

		var props = {};
		
		props.name = '';
		props.style = {};
		
		return props;
	},	
	
	foo() {
		console.log('HEJ');
	},

	render() {
		
		var {style, events, ...other} = this.props;

		var style = {};

		style.display   = 'inline-block';
		style.width     = '100%';

		extend(style, this.props.style);

		// Make sure this div is relative		
		style.position  = 'relative';
		style.height    = '2em';
		style.textAlign = 'center';
		
		return (
			<div className='SliderComponent' style={style} {...other} >
				<SliderBar slider={this} events={events} name={this.props.name}>
					<SliderGripper/>
				</SliderBar>
			</div>
		);

	}

});


var SliderBar = React.createClass({
	
	mixins: [EventsMixin],

	getDefaultProps() {
		return {
			name: '',
			snap: 10,
			style: {
			}
		}
	},
	
	getInitialState() {

		var state = {};
		
		state.position   = 0;
		state.length     = this.props.snap;
		state.left       = 0;
		state.width      = sprintf('%d%%', this.props.snap);
		state.dragging   = false;
		state.transition = false;
		
		return state;
		
	},

	componentWillUnmount(props, state) {
	},


	componentDidMount(props, state) {
	},


	onMouseDown(event) {

		var _this = this;

			
		// Only left mouse button
		if (event.button !== 0)
			return;
			
		var pageX     = event.pageX;
		var pageY     = event.pageY;

		var elementAtPoint = $(document.elementFromPoint(event.clientX, event.clientY));

		var element   = $(ReactDOM.findDOMNode(_this.refs.element));
		var parent    = element.parent();
		var bounds    = {width:parent.innerWidth(), height:parent.innerHeight()};
		var resizing  = elementAtPoint.attr('class') == 'Gripper';
		 
		var originalPosition  = element.position();
		var originalSize      = element[0].getBoundingClientRect();
	
		_this.setState({transition:false, dragging:true});

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
			
			if (resizing) {
				var position  = element.position();
				var minWidth  = bounds.width * (_this.props.snap / 100) / 2;
				var maxWidth  = bounds.width - position.left;

				state.width = originalSize.width + offsetX;
				
				if (state.width < minWidth)
					state.width = minWidth;

				if (state.width > maxWidth)
					state.width = maxWidth;
				
			}
			else {
	
				state.left = originalPosition.left + offsetX;

				if (state.left < 0)
					state.left = 0;
							
				if (state.left + originalSize.width > bounds.width)
					state.left = bounds.width - originalSize.width;
		
			}	
			
			_this.setState(state);
			
			event.stopPropagation()
			event.preventDefault()
		}
		
		function onMouseUp(event) {

			var snap    = _this.props.snap;
			var offsetX = event.pageX - pageX;
			var offsetY = event.pageY - pageY;

			var size     = element[0].getBoundingClientRect();
			var position = element.position();

			removeListeners();
			
			var state = {};
			
			state.transition = true;
			state.dragging   = false;
			
			if (resizing) {
				var width    = size.width;
				var minWidth = bounds.width * (snap / 100);
				
				if (width < minWidth)
					width = minWidth;

				state.length = 100 * width / bounds.width;
				state.length = Math.floor(((state.length + (snap / 2)) / snap)) * snap;
				state.width  = sprintf('%.4f%%', state.length);
				
				
			}
			else {
				var left = position.left;

				state.position = 100 * left / bounds.width;
				state.position = Math.floor(((state.position + (snap / 2)) / snap)) * snap;
				state.left     = sprintf('%.4f%%', state.position);
				
				
			}
			
			

			_this.setState(state);
	
			var args = {};
			args.position = _this.state.position;
			args.length = _this.state.length;

			_this.emit('change', args);

			event.stopPropagation()
			event.preventDefault()
			
		}
	},

	render() {
		var {style, ...other} = this.props;
		
		var style = {};
		extend(style, this.props.style);
				
		style.left     = this.state.left;
		style.width    = this.state.width;
		style.top      = 0;
		style.bottom   = 0;
		style.position = 'absolute';
		style.overflow = 'hidden';	

		if (this.state.transition) {
			style.transition = 'left 0.3s ease, width 0.3s ease';
		}

		return (
			<div ref='element' className='Bar' onMouseDown={this.onMouseDown}  style={style} {...other}>
				{this.props.children}
			</div>
		);
	
	}
});


var SliderGripper = React.createClass({

	mixins: [EventsMixin],

	getInitialState(){
		return {
		};
	},
	
	getDefaultProps() {

		return {
		};
	},	
	

	render() {
		
		var style = {};
		style.width    = '1.0em';
		style.height   = '1.0em';
		style.top      = 0;
		style.bottom   = 0;
		style.left     = 'auto';
		style.right    = '0.5em';
		style.margin   = 'auto';
		style.position = 'absolute';
		
		return (
			<div className='Gripper' style={style}>
			</div>
		);

	}

});

