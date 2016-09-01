import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {sprintf, random, extend, isString, isObject, isArray} from 'yow';

import {Word} from '../../components/word.js';
import {Letter} from '../../components/letter.js';

require('./new-game.less');

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);

		this.state = {};
		this.state.word = 'WORDPONG';



	};


	componentDidMount() {
		var params = this.props.location.query;
		var wordpong = JSON.parse(localStorage.getItem('wordpong') || '{}');

		if (isString(params.word)) {
			wordpong.word = params.word;
			localStorage.setItem('wordpong', JSON.stringify(wordpong));

			this.setState({word:wordpong.word});
		}
	}

	render() {

		var rowStyle = {};
		rowStyle.paddingTop = '0.5em';
		rowStyle.paddingBottom = '0.5em';

		var buttonStyle = {};
		buttonStyle.minWidth = '10em';

		return (
			<Grid style={{textAlign:'center'}}>
				<Row style={rowStyle}>
					<Col>
						<img width='100px' height='100px' src={require('./images/ping-pong.png')}/>
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<h3>Välkommen!</h3>
						<p>Du har blivit utmanad i ett WordPong spel!</p>
						<p><Button style={buttonStyle} bsStyle="primary" href='#/play'>Spela</Button></p>
						<p><Button style={buttonStyle} bsStyle="primary" href='#/about'>Spelregler</Button></p>
					</Col>
				</Row>
			</Grid>
		);
	}



};
