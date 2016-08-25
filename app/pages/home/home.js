import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {extend, isString, isObject, isArray} from '../../scripts/toolbox.js';

import {sprintf} from 'yow';

require('./home.less');

module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);
	};




	render() {

		return (
			<Grid>
				<Jumbotron style={{borderRadius:'1em'}}>
					<h1>Word Pong
					<img style={{width:'3em', height:'3em', float:'right'}} src="./assets/images/ping-pong.png"/>
					</h1>


					<p>
					Fusce at massa sed diam iaculis dignissim vitae vel purus. Quisque sed metus lectus. Sed ut tempor ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut elementum egestas turpis elementum blandit. Nulla tincidunt arcu facilisis tristique ultricies. Vivamus id ex tellus.
					</p>
					<p><Button bsStyle="primary" href='#/about'>Jag vill veta mer</Button></p>
				</Jumbotron>
			</Grid>
		);
	}

};
