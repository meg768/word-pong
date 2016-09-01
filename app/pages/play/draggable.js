import React from 'react';
import ReactDOM from 'react-dom';
import EventsMixin from './eventsmixin.js';

import {isFunction, sprintf, extend} from '../../scripts/toolbox.js';
import $ from "jquery";

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


var zIndex = 0;

Draggable.Item = React.createClass({

	mixins: [EventsMixin],


	getDefaultProps() {
		return {
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
		state.zIndex    = -1;

		return state;

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
		if (event.button != undefined && event.button !== 0)
			return;

		if (!_this.state.draggable)
			return;

		var pageX = undefined;
		var pageY = undefined;

		if (pageX == undefined && pageY == undefined) {
			if (event.touches && event.touches.length == 1) {
				pageX = event.touches[0].pageX;
				pageY = event.touches[0].pageY;
			}
		}

		if (pageX == undefined && pageY == undefined) {
			if (event.pageX != undefined && event.pageX != undefined) {
				pageX = event.pageX;
				pageY = event.pageY;
			}

		}

//		_this.setState({zIndex:100});


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
			document.addEventListener('touchmove', onMouseMove);
			document.addEventListener('touchend', onMouseUp);
		}

		function removeListeners() {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('touchmove', onMouseMove);
			document.removeEventListener('touchend', onMouseUp);
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

			state.x = 100 * (state.x / parent.innerWidth()) + '%';
			state.y = 100 * (state.y / parent.innerHeight()) + '%';
//				console.log(state.x / event.view.innerWidth, state.x / event.view.innerHeight);

			_this.setState(state);

			event.stopPropagation()
			event.preventDefault()

		}

		function onMouseUp(event) {
			removeListeners();

/*
			var gridSizeX = size.width / 3;
			var gridSizeY = size.height / 3;

			var x = Math.floor(((_this.state.x + (gridSizeX / 2)) / gridSizeX)) * gridSizeX;
			var y  = Math.floor(((_this.state.y + (gridSizeY / 2))/ gridSizeY)) * gridSizeY;

			var state = {};
			state.animate  = true;
			state.dragging = false;
			state.x        = x;
			state.y        = y;
*/

			var state = {};
			state.animate  = true;
			state.dragging = false;

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

		if (this.state.zIndex != undefined) {
			style.zIndex = ++zIndex;

		}

		style.left     = this.state.x;
		style.top      = this.state.y;
		style.position = 'absolute';
		//style.opacity  = this.state.dragging ? '0.5' : '1';

		if (this.state.animate) {
			style.transition = 'left 0.5s ease, top 0.3s ease';
		}

		return (
			<div ref='root' onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown}   style={style} {...other}>
				{this.props.children}
			</div>
		);

	}
})
