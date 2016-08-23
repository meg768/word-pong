import React from 'react';
import {Input, ListGroup, ListGroupItem, Grid, Row, Col, Button} from 'react-bootstrap';
import {sprintf} from '../../scripts/toolbox.js';
import {ListView, ListViewItem} from '../../components/listview.js';
import {CheckBox} from '../../components/ui.js';

module.exports = React.createClass({

	getInitialState(){

		return {}
	},
	
	alertClicked() {
		
	},

	render() {
		return (
			<Grid style={{maxWidth:'60em'}}>
				<Row>
					<Col>
						<ListGroup style={{fontSize:'1.5em'}}>
							<ListGroupItem disabled>Inställningar</ListGroupItem>
							<ListGroupItem href="#/home">Uppgifter om din verksamhet</ListGroupItem>
							<ListGroupItem href="#/home">Användare</ListGroupItem>
							<ListGroupItem href="#/home">Bokningsgrupper</ListGroupItem>
							<ListGroupItem href="#/home">Bokningsalternativ</ListGroupItem>
							<ListGroupItem href="#/home">Regler för bokning</ListGroupItem>
						</ListGroup>

					</Col>
				</Row>
				<Row>
					<Col>
						<ListView style={{fontSize:'1.1em'}}>
							<ListViewItem href='#/home' glyphRight='chevron-right' title='Title'>
							</ListViewItem>
						</ListView>

					</Col>
				</Row>
			</Grid>
			

		);
	}

});

