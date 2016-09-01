import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {extend, isString, isObject, isArray} from '../../scripts/toolbox.js';

import {sprintf, random} from 'yow';

import {Word} from '../../components/word.js';
import {Letter} from '../../components/letter.js';

require('./make-word.less');

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);

		this.state = {};
		this.state.word = '';
		this.state.mixedWord = '';
		this.onChange = this.onChange.bind(this);
		this.onMix = this.onMix.bind(this);
	};


	componentDidMount() {
		var word = 'WORDPONG';

		this.setState({
			word: word,
			mixedWord: this.mixWord(word)
		});
	}

	mixWord(word) {
		var input = word.toUpperCase().split('');
		var output = [];

		while (input.length > 0) {
			output.push(input.splice(random(input.length), 1)[0]);
		}

		return output.join('');
	}

	onMix() {
		var word = this.mixWord(this.state.word);
		this.setState({mixedWord: word, word:word});
	}

	onChange(event) {
		var word = event.target.value;

		if (word.match('^[A-ZÅÄÖa-zåäö]*$')) {
			this.setState({
				word: word,
				mixedWord: this.mixWord(word)
			});

		}
	}

	render() {

		var buttonStyle = {};
		buttonStyle.minWidth = '10em';

		return (
			<Grid style={{}}>
				<Row style={{}}>
					<Col sm={10} smOffset={1} md={10} mdOffset={1} lg={6} lgOffset={3}>
						<form>
							<FormGroup>
								<ControlLabel>
									Ange ord
								</ControlLabel>
								<FormControl type='text' value={this.state.word} onChange={this.onChange}>
								</FormControl>
							</FormGroup>
						</form>
					</Col>
				</Row>
				<Row style={{paddingTop:'1em'}}>
					<Col sm={10} smOffset={1} md={10} mdOffset={1} lg={6} lgOffset={3} style={{textAlign:'center', fontSize:'70%'}}>
						<Word word={this.state.mixedWord == '' ? '------' : this.state.mixedWord} size='1em'/>
					</Col>
				</Row>
				<Row style={{paddingTop:'1em', textAlign:'center'}}>
					<Col sm={10} smOffset={1} md={10} mdOffset={1} lg={6} lgOffset={3} style={{textAlign:'center'}}>
						<Button style={buttonStyle} bsStyle='primary' onClick={this.onMix}>Blanda</Button>
					</Col>
				</Row>
				<Row style={{paddingTop:'1em', textAlign:'center'}}>
					<Col sm={10} smOffset={1} md={10} mdOffset={1} lg={6} lgOffset={3} style={{textAlign:'center'}}>
						<Button style={buttonStyle} bsStyle='primary' href='#/home'>Klar</Button>
					</Col>
				</Row>
			</Grid>
		);
	}

};
