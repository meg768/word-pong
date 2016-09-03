import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {sprintf, random, extend, isString, isObject, isArray} from 'yow';

import {Word} from '../../components/word.js';
import {Letter} from '../../components/letter.js';

require('./build-word.less');

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);

		this.state = {};
		this.state.word = '';
		this.state.mixedWord = '';
		this.onChange = this.onChange.bind(this);
		this.onLetterClick = this.onLetterClick.bind(this);
		this.onMix = this.onMix.bind(this);
		this.key = 0;
	};


	componentDidMount() {
		var word = '';

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

	onLetterClick(letter) {

		var word = this.state.word;

		if (letter.match('^[A-ZÅÄÖ]*$')) {
			word += letter;

			this.setState({
				word: word,
				mixedWord: this.mixWord(word)
			});

		}
		else if (letter == '↻') {
			word = this.mixWord(word);
		}
		else if (letter == '←' && word.length > 0) {
			var letters = word.split('');
			letters.pop();
			word = letters.join('');
		}

		this.setState({word:word});
	}

	mailURL() {

		var mailto = '';

		if (this.state.word.length > 0) {
			var url     = sprintf('https://dl.dropboxusercontent.com/u/10627173/word-pong/index.html#new-game?word=%s', encodeURI(this.state.word));
			var body    = sprintf('Du har fått en utmaning i WordPong. Klicka på länken %s för att spela!', url);
			var subject = 'WordPong';
			mailto  = sprintf('mailto:ange@adress.se?subject=%s&body=%s', subject, body);

		}
		return mailto;
	}

	onMix() {
		var word = this.mixWord(this.state.word);
		this.setState({word:word, mixedWord: word});
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

	renderColumns(letters) {

		if (isString(letters))
			letters = letters.split('');

		return letters.map(function(letter, index) {
			return (
				<th key={index}>
					<Letter letter={letter} onClick={this.onLetterClick}/>
				</th>
			);
		}, this);
	}
	renderRow(letters) {
		return (
			<tr>
				{this.renderColumns(letters)}
			</tr>
		);


	}



	renderTable(rows) {

		var tableStyle = {};
		tableStyle.display = 'inline-table';

		return (
			<table style={tableStyle}>
				<tbody>
					{this.renderRow('ABCDEF')}
					{this.renderRow('GHIJKL')}
					{this.renderRow('MNOPRS')}
					{this.renderRow('TUVXYZ')}
					{this.renderRow(['Å', 'Ä', 'Ö', '\u00A0', '\u00A0', '←'])}
				</tbody>
			</table>
		);
	}

	render() {

		var buttonStyle = {};
		buttonStyle.minWidth = '12em';
		buttonStyle.marginLeft = '0.5em';
		buttonStyle.marginRight = '0.5em';
		buttonStyle.marginTop = '0.2em';
		buttonStyle.marginBottom = '0.2em';

		var rowStyle = {};
		rowStyle.textAlign = 'center'
		rowStyle.padding = '1em';

		var tableStyle = {};
		tableStyle.display = 'inline-block';
		tableStyle.textAlign = 'center';
		tableStyle.width = '100%';

		return (
			<div className='build-word'>
				<Grid >
					<Row style={rowStyle}>
						<Col style={{width:'100%', display:'inline-block', fontSize:'125%'}}>
							Skriv in ett ord och skicka en inbjudan till en vän! Glöm inte att blanda bokstäverna! 😉
						</Col>
					</Row>
					<Row style={rowStyle}>
						<div style={tableStyle}>
							{this.renderTable()}
						</div>
					</Row>
					<Row style={rowStyle}>
						<Word style={{fontSize:'75%'}} word={this.state.word == '' ? 'ANGE\u00A0ORD' : this.state.word}/>
					</Row>
					<Row style={rowStyle}>
						<Col style={{textAlign:'center'}}>
							<Button style={buttonStyle} bsStyle="primary" onClick={this.onMix}>Blanda</Button>
							<br/>
							<Button style={buttonStyle} bsStyle="primary" href={this.mailURL()}>Skicka inbjudan</Button>
							<br/>
							<Button style={buttonStyle} bsStyle="primary" href='#/home'>Klar</Button>
						</Col>
					</Row>



				</Grid>
			</div>

		);
	}

};
