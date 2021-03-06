import React from 'react';
import ReactDOM from 'react-dom';
import {isFunction, sprintf, extend} from 'yow';
import $ from "jquery";



export class DraggableContainer extends React.Component {


	static defaultProps = {
		style: {}
	};

	constructor(props) {
		super(props);

		this.state = {};
	}


	render() {

		var {style, ...other} = this.props;

		// Make sure this div is relative
		style.position = 'relative';

		return (
			<div style={style} {...other} >
				{this.props.children}
			</div>
		);

	};

};



var zIndex = 0;

export class DraggableItem extends React.Component {

	static defaultProps = {
		onDragStart: function() {},
		onDragEnd: function() {},
		className: 'draggable',
		position: {x:0, y:0},
		style: {}
	};

	constructor(props) {
		super(props);
		var state = {};

		state.x         = this.props.position.x;
		state.y         = this.props.position.y;
		state.animate   = false;
		state.dragged   = false;
		state.dragging  = false;
		state.zIndex    = -1;

		this.state = state;
		this.onMouseDown = this.onMouseDown.bind(this);
	};

	componentDidMount() {
		//this.setState({x:this.props.position.x, y:this.props.position.y});
	};


	onMouseDown(event) {

		function getLocation(event) {
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

			return {pageX:pageX, pageY:pageY};

		}
		var _this = this;

		_this.props.onDragStart(event);

		if (event.defaultPrevented)
			return;

		// Only left mouse button
		if (event.button != undefined && event.button !== 0)
			return;

		var location = getLocation(event);

		var pageX = location.pageX;
		var pageY = location.pageY;

		var element   = $(ReactDOM.findDOMNode(_this.refs.container));
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

			var point = getLocation(event);

			var offsetX = point.pageX - pageX;
			var offsetY = point.pageY - pageY;

			var state = {};

			state.animate  = false;
			state.dragging = true;
			state.dragged  = true;
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

			state.x = 100 * (state.x / parent.innerWidth());
			state.y = 100 * (state.y / parent.innerHeight());

			_this.setState(state);

			event.stopPropagation()
			event.preventDefault()

		}

		function onMouseUp(event) {
			removeListeners();

			var state = {};
			state.animate  = true;
			state.dragging = false;

			_this.props.onDragEnd(event);

			if (event.defaultPrevented)
				return;

			_this.setState(state);

			event.stopPropagation()
			event.preventDefault()

		}
	};

	render() {
		var {style, ...other} = this.props;
		var classes = [this.props.className];

		var style = {};
		extend(style, this.props.style);

		if (this.state.zIndex != undefined) {
			style.zIndex = ++zIndex;
		}

		style.left     = this.state.x + '%';
		style.top      = this.state.y + '%';
		style.position = 'absolute';

		if (this.state.dragging)
			classes.push('dragging');

		if (this.state.animate) {
			style.transition = 'left 0.3s ease, top 0.3s ease';
		}

		return (
			<div ref='container' className={classes.join(' ')} onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} style={style}>
				{this.props.children}
			</div>
		);

	}
};
