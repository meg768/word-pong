import React from 'react';
import {sprintf, extend} from '../../scripts/toolbox.js';


require('../../../lib/scripts/date.js');
require('./timeline.less');



var Cells = module.exports.CalendarRow = React.createClass({

	
	getInitialState() {
		return {};
	},
	
	getDefaultProps() {
	
		var dates = [];
		
		var date = new Date();
		
		for (var i = 0; i < 10; i++) {
			dates.push(date);
			date = date.addDays(1);
		}

		
		return {
			dates:dates,
			style:{}
		};
	},	
	
		
	render() {

		var _this = this;
		
		var style = {};
		
		style.display     = 'inline-block';
		style.position    = 'relative';	
		style.height      = '3.0em';
	    
	    extend(style, style, this.props.style);

		var nodes = this.props.dates.map(function(item, index) {
			
            var style = {};

            style.left     = sprintf('%f%%', index * 100 / _this.props.dates.length),
            style.width    = sprintf('%f%%', 100 / _this.props.dates.length)
			style.position = 'absolute';
			style.height   = '100%';			
			
			if (index > 0)
				style.borderLeft = '1px solid rgb(192,192,192)';
				
			return (
		        <Cell style={style} date={item} key={index}/>
		    );
		});
		
		return (
			<div className='TimeLineComponent' style={style}>
				{nodes}
			</div>
		);
		
	}
	
});


var Cell =  module.exports.CalendarCell = React.createClass({
	
	
	getInitialState() {
		return {};
	},
	
	getDefaultProps() {
	
		return {
			style: {},
			date: new Date()
		};
	},	
	
	render() {

		var style = {};

		style.display = 'inline-block';
		
		extend(style, style, this.props.style);
		
		var innerStyle = {};
		innerStyle.display    = 'table';
		innerStyle.width      = '100%';
		innerStyle.height     = '100%';
		innerStyle.lineHeight = '0';

		return (
			<div style={style}>
				<div style={innerStyle}>
					<LeftPart date={this.props.date}/>
					<RightPart date={this.props.date}/>
				</div>
			</div>
		);
		
	}	
});

var LowerPart = React.createClass({

	getDefaultProps() {
	
		return {
			date: new Date()
		};
	},	

	render() {
		var style = {};
		
		style.textAlign = 'left';
		
		return (
			<div style={style}>
				{this.props.date.getShortMonthName()}
			</div>
			
		);
	}
	
	
});



class UpperPart extends React.Component {

	
	constructor(props) {
		super(props);		
	}

	render() {
		
		var style = {};

		style.textAlign = 'left';
		
		if (!this.props.date.isWeekday()) 
			style.color = 'red';

		return (
			<div style={style}>
				{this.props.date.getShortDayName()}
			</div>
			
		);
	};
	
	
};

UpperPart.defaultProps = {
	date: new Date()
};


var LeftPart = React.createClass({

	getDefaultProps() {
	
		return {
			date: new Date()
		};
	},	

	render() {
		var style = {};
		
		style.display        = 'table-cell';
		style.width          = '50%';
		style.height         = '100%';
		style.textAlign      = 'right';
		style.fontSize       = '200%';
		style.verticalAlign  = 'middle';
		style.padding        = '0.1em';

		if (!this.props.date.isWeekday()) 
			style.color = 'red';

		return (
			<div style={style}>
				{this.props.date.getDate()}
			</div>
			
		);
	}
	
	
});


var RightPart = React.createClass({

	render() {
		var style = {};
		
		style.display       = 'table-cell';
		style.width         = '50%';
		style.height        = '100%';
		style.textAlign     = 'left';
		style.fontSize      = '85%';
		style.verticalAlign = 'middle';
		style.lineHeight    = '1em';
		style.padding       = '0.1em';
				
		return (
			<div style={style}>
				<UpperPart date={this.props.date}/>
				<LowerPart date={this.props.date}/>
			</div>
			
		);
		
	}
});



