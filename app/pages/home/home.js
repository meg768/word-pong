import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {extend, sprintf, isString, isObject, isArray} from '../../scripts/toolbox.js';


module.exports = class Page extends React.Component {


	constructor(...args) {

		super(...args);
	};




	render() {
/*
		return (
			<Grid>
				<Row>
					<Col md={8} mdPush={2}>
						<Blaffa label='HEJ' text='MEG'/>
					</Col>
				</Row>
			</Grid>

		);
*/
		return (
			<Grid>
				<Row>
					<Col md={8} mdPush={2}>
						HEJ
					</Col>
				</Row>
				<Row>
					<Col md={8} mdPush={2}>
						MEG
					</Col>
				</Row>
				<Row>
					<Col md={8} mdPush={2}>
						PELLE
					</Col>
				</Row>
			</Grid>

		);
	}

};
