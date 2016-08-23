import React from 'react';
import ReactDOM from 'react-dom';
import {ListView, ListViewItem} from '../../components/listview.js';
import {sprintf, extend} from '../../scripts/toolbox.js';
import Events from '../../../lib/scripts/events.js';
import {Radio, Button, Checkbox, Textbox, RadioGroup} from '../../components/ui.js';
import {Well, Panel, Grid, Row, Col} from '../../components/ui.js';
import {Glyphicon} from 'react-bootstrap';
import Align from './align.js';

import {Input} from 'react-bootstrap';

require('./test.less');

class Login extends React.Component {

	constructor(args) {
		super(args);

		this.state = {};
		this.state.email = 'foo@bar.se';
	}

	onEmailChanged(event) {
		this.setState({email:event.target.value});

	}

	render() {
		return (
			<Panel header='Login' >
				<Input type='text' ref='email' label='E-post' placeholder='E-mail' value={this.state.email} onChange={this.onEmailChanged.bind(this)}/>
				<Input ref='password' placeholder='Password' type='password'/>
			</Panel>

		);

	};
}

////////////////////////////////////////////////////////////////////////////////


class RadioButtons extends React.Component {

	constructor(args) {

		super(args);

		var self = this;

		self.state = {};
		self.state.value = this.props.value;
		self.glyphs = {};

		self.props.options.forEach(function(option, index) {
			self.glyphs[option.value] = option.glyph;
		});
	}

	onChange(value, event) {
		var args = [].splice.call(arguments,0);
		console.log(value);
		this.setState({value:value});

	}

	componentDidMount() {

	}

	renderOptions() {

		var self = this;
		var options = [];

		self.props.options.forEach(function(option, index) {
			options.push(
				<Input key={index} type='radio' label={option.name} checked={self.state.value == option.value} onChange={self.onChange.bind(self, option.value)}/>
			);
		});

		return (
			<div>
				{options}
			</div>
		);
	};


	render() {
		var _this = this;


		return (
			<Panel header={this.props.title}>
				<Col md={12} style={{position:'relative'}}>
					{this.renderOptions()}
					<div style={{position:'absolute', left:'auto',  top:'0', bottom:'0', right:'0'}}>
						<Align verticalAlign='middle'  style={{fontSize:'300%'}}>
							<Glyphicon glyph={this.glyphs[this.state.value]}/>
						</Align>
					</div>

				</Col>

			</Panel>

		);

	};
}


RadioButtons.defaultProps = {
	title: 'Options',
	value: 'JBN',
	options: [
		{name: 'Option 1', value: 'MEG', glyph: 'plus'},
		{name: 'Option 2', value: 'JBN', glyph: 'ok'},
		{name: 'Option 3', value: 'LSI', glyph: 'thumbs-up'}
	]
};

////////////////////////////////////////////////////////////////////////////////


//7e960c20-e9c5-11e5-8e78-bf75671fe8ef
module.exports = class Page extends React.Component {

	constructor(args) {
		super(args);

		this.state = {};
		this.state.email = 'foo@bar.se';
		this.state.optionType = 'JBN';
		this.events = new Events(this);
	}


	componentDidMount() {

		var self = this;

	};

	onMEG(event) {
		console.log('MEG clicked');
	};

	onEvent(name, event) {
		var args = [].splice.call(arguments,0);
		console.log('MEG clicked', this);

	};

	onCheckboxChanged() {
	};

	onOptionChanged(value, event) {
		var args = [].splice.call(arguments,0);
		console.log(value);
		this.setState({optionType:value});

	}


	renderRadioButtons(params) {

		return (
			<RadioButtons title={params.title} value={params.value} options={params.options}/>
		);
	};


	render() {

		var self = this;

		function renderRadioButtons() {

			var params = {
				title: 'Vem vill vinna',
				value: 'MEG',
				options: [
					{name: 'Magnus', value: 'MEG', glyph: 'plus'},
					{name: 'Joakim', value: 'JBN', glyph: 'ok'},
					{name: 'Lars', value: 'LSI', glyph: 'thumbs-up'}
				]

			};

			return self.renderRadioButtons(params);
		};

		return (


			<Grid>

				<Row>
					<Col md={6} >
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie turpis vitae fermentum aliquet. Nulla tincidunt eget enim mollis mollis. Aliquam vulputate est sit amet sem semper vehicula. Aenean tincidunt.</p>
					</Col>
				</Row>

				<Row>
					<Col md={6}>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie turpis vitae fermentum aliquet. Nulla tincidunt eget enim mollis mollis. Aliquam vulputate est sit amet sem semper vehicula. Aenean tincidunt.</p>
					</Col>
					<Col md={6}>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie turpis vitae fermentum aliquet. Nulla tincidunt eget enim mollis mollis. Aliquam vulputate est sit amet sem semper vehicula. Aenean tincidunt.</p>
					</Col>
				</Row>
				<Row>
					<Col md={6} >
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie turpis vitae fermentum aliquet. Nulla tincidunt eget enim mollis mollis. Aliquam vulputate est sit amet sem semper vehicula. Aenean tincidunt.</p>
					</Col>
					<Col md={6}>
					</Col>
				</Row>

			</Grid>



		);
	}

}

//module.exports = Page;
