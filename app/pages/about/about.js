import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {extend, isString, isObject, isArray} from '../../scripts/toolbox.js';

import {sprintf} from 'yow';

require('./about.less');

class Letter extends React.Component {

	constructor(...args) {
		super(...args);
	};

	render() {
		var style = {};
		var innerStyle = {};

		style.border = '0.12em solid hsl(212, 50% , 75%)';
		style.display = 'inline-block';
		style.borderRadius = '0.3em';
		style.width = '1.5em';
		style.height = '1.5em';
		style.fontSize = '150%';
		style.textAlign = 'center';
		//style.background = 'hsl(212,50%,90%)';
		style.margin = '0.1em 0.1em 0.1em 0.1em';

		innerStyle.position = 'relative';
		innerStyle.top = '50%';
		innerStyle.transform = 'translateY(-50%)';
		//innerStyle.color = 'hsl(212,50%,0%)';

		return(
			<div className='letter' style={style}>
				<div style={innerStyle}>
					{this.props.letter}
				</div>
			</div>
		);

	};
};


class Word extends React.Component {

	constructor(...args) {
		super(...args);
	};

	render() {
		var style = {};

		var letters = this.props.word.split('');
		var nodes = [];

		letters.forEach(function(letter, index) {
			nodes.push(
				<Letter letter={letter} key={index}/>
			);
		});
		return(
			<div style={style}>
				{nodes}
			</div>
		);

	};
};

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);
	};




	render() {

		return (
			<Grid className='about' style={{fontSize:'125%'}}>
				<h3>
					Spelregler
				</h3>
				<p>
					WordPong är ett spel som kan liknas vid bordtennins. Fast istället för en boll som spelas fram och tillbaka
					över nätet, är det ett ord.
					Spelreglerna är enkla. Skapa ett <strong>så långt ord som möjligt</strong> och retunera detta till motståndaren.
				</p>

				<h4>
					Exempel
				</h4>
				<p>
					Låt oss ta ett exempel. Spelare A och spelare B, Anna och Benjamin, spelar mot varandra. Anna börjar
					med att <em>serva</em>. Detta gör hon genom att hon får en uppsättning bokstäver att skapa ett ord utav.
					Ordet ska vara så långt som möjligt och måste finnas i Svenska Akademiens Ordlista för att vara giltigt.
				</p>
				<p>
					Anna hittar bokstäver till ordet <strong>FÖRETAGSKULTUR</strong>.
				</p>
				<p style={{textAlign:'center'}}>
					<Word word='FÖRETAGSKULTUR'/>
				</p>
				<p>
					Hon ska nu serva detta ord till Benjamin. Eftersom Benjamins uppgift är
					att lista ut vilket ord hon servat passar det ju bra att skruva serven, dvs blanda bokstäverna.
					Anna väljer att skicka bokstäverna i denna ordning.
				</p>

				<p style={{textAlign:'center'}}>
					<Word word='EAUUÖKRTTGSLRF'/>
				</p>

				<p>
					I WordPong är varje bokstav värt ett visst antal poäng. Summerar man bokstävernas värde
					blir det 30 poäng i detta fall, men mer om bokstävernas värde senare. Anna får nu
					30 poäng för det ord hon servat. Ställningen är nu <strong>30-0</strong> till Anna och bollen är igång!
				</p>
				<p>
					Benjamin får Annas serve och ska nu bilda ett så långt ord som möjligt av dessa bokstäver.
					Men det är ett långt ord och Benjamin kan inte se att bokstäverna bildar
					ordet <strong>FÖRETAGSKULTUR</strong>.

					Istället hittar Benjamin ordet <strong>STRUKTUR</strong>.
				</p>

				<p style={{textAlign:'center'}}>
					<Word word='STRUKTUR'/>
				</p>

				<p>
					För detta får Benjamin 16 poäng eftersom summan av bokstävernas värde är just 16.
					Dessa poäng tar han från Anna eftersom han listat ut en del av hennes ord.
					Ställningen är nu <strong>14-16</strong>.

					Nu är det Benjamins tur att returnera Annas serve och väljer då att skicka bokstäverna
					i denna ordning.
				</p>

				<p style={{textAlign:'center'}}>
					<Word word='UUSTTRRK'/>
				</p>

				<p>
					Anna får alltså bokstäverna <strong>UUSTTRRK</strong>. Hon kan inte se
					hela det tänkta ordet <strong>STRUKTUR</strong> utan bara ordet <strong>KUST</strong> som bildar 9 poäng. Anna
					får dessa och ställningen
					är nu <strong>23-17</strong>.
				</p>

				<p style={{textAlign:'center'}}>
					<Word word='KUST'/>
				</p>

				<p>
					Hon väljer att skicka bokstäverna i denna ordning till Benjamin.
				</p>

				<p style={{textAlign:'center'}}>
					<Word word='UTSK'/>
				</p>

				<p>
					Nu är det så få bokstäver kvar så Benjamin ser direkt att bokstäverna bildar
					ordet <strong>KUST</strong>. Dessa bokstäver var ju värda 9 poäng så dessa
					tar han tillbaka från Anna.

					Eftersom Benjamin hittade hela ordet finns ju inga bokstäver
					kvar och bollen är därför slutspelad. Ställningen är nu <strong>14-16</strong>.
				</p>

				<p>
					Nu är det Benjamins tur att serva eftersom Anna servade förra bollen.
					Då får han, precis som Anna, en helt ny uppsättning bokstäver att skapa ett nytt ord av
					som han skickar till Anna. En ny boll kan nu påbörjas!
				</p>



			</Grid>
		);
	}

};
