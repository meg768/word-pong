import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {extend, isString, isObject, isArray} from '../../scripts/toolbox.js';

import {sprintf} from 'yow';

import {Letter} from '../../components/letter.js';
import {Word} from '../../components/word.js';

require('./about.less');


module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);

		this.onClick = this.onClick.bind(this);
	};

	onClick() {
		window.history.back();
	}




	render() {

		return (
			<Grid className='about' style={{fontSize:'14px'}}>

				<h3>
					Spelregler (version 2)
				</h3>
				<h4>
					Exempel
				</h4>
				<p>
					Låt oss ta ett exempel. Spelare A och spelare B, Anna och Benjamin, spelar mot varandra. Anna börjar
					genom att hon får en uppsättning bokstäver att skapa ett ord utav.
					Ordet ska vara så långt som möjligt och måste finnas i Svenska Akademiens Ordlista för att vara giltigt.
				</p>
				<p>
					Anna hittar bokstäver till ordet <strong>FÖRETAGSKULTUR</strong>.
				</p>
				<p style={{textAlign:'center'}}>
					<Word word='FÖRETAGSKULTUR'/>
				</p>

				<p>
					Hon ska nu presentera detta ord till Benjamin. Eftersom Benjamins uppgift är
					att lista ut vilket ord hon kommit på passar det ju bra att blanda bokstäverna.
					Anna väljer att skicka bokstäverna i denna ordning.
				</p>


				<p style={{textAlign:'center'}}>
					<Word word='EAUUÖKRTTGSLRF'/>
				</p>


				<p>

					Skulle Benjamin hitta ordet, sorterar han bokstäverna så att ordet bildar
					<strong>FÖRETAGSKULTUR</strong>
					och trycker på knappen <strong>SKICKA</strong>. Då har han gissat ordet i sin helhet
					och får därför ordets 30 poäng
					(i WordPong är varje bokstav värt ett visst antal poäng. Summerar man bokstävernas värde
					blir det 30 poäng i detta fall, men mer om bokstävernas värde senare).
				</p>
				<p>
					Nu gör han inte det. Detta var för svårt.
					Därför använder han en livlina och frågar Anna var bokstaven <strong>Ö</strong> ska
					vara placerad (detta kostar poäng, lika många poäng som bokstaven <strong>Ö</strong> är värd).

				</p>

				<p style={{textAlign:'center'}}>
					<Word word='-Ö------------'/>
				</p>

				<p>
					Detta var ledtråden Benjamin behövde för att kunna gissa ordet.
					Han sorterar bokstäverna så ordet bildas och trycker på knappen <strong>SKICKA</strong>.

					Eftersom han behövde en ledtråd för att kunna lista ut ordet får han
					inte hela ordets poängvärde utan bara 26 poäng eftersom bokstaven Ö är värd 4 poäng.
				</p>







				<h3>
					Spelregler (verion 1)
				</h3>
				<p>
					WordPong är ett spel som kan liknas vid bordtennins. Fast istället för en boll som spelas fram och tillbaka
					över nätet, är det ett ord.
					Spelreglerna är mycket enkla. Skapa ett <strong>så långt ord som möjligt</strong> och retunera detta till motståndaren.
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

				<div style={{textAlign:'center', padding:'0.5em'}}>
					<Button bsStyle='primary' onClick={this.onClick}>OK, jag fattar</Button>
				</div>


			</Grid>
		);
	}

};
