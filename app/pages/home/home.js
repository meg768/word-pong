import React from 'react';
import {Jumbotron, Button, Grid, Row, Col, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {sprintf, extend, isString, isObject, isArray} from 'yow';

require('./home.less');



module.exports = class Page extends React.Component {


	constructor(props) {

		super(props);
	};


	render() {

		var rowStyle = {};
		rowStyle.paddingTop = '0.5em';
		rowStyle.paddingBottom = '0.5em';

		var buttonStyle = {};
		buttonStyle.minWidth = '20em';

		return (
			<Grid style={{textAlign:'center'}}>
				<Row style={rowStyle}>
					<Col>
						<img width='100px' height='100px' src={require('./images/ping-pong.png')}/>
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<Button style={buttonStyle} bsStyle="primary" href='#/about'>Spelregler</Button>
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<Button style={buttonStyle} bsStyle="primary" href='#/build-word'>Nytt spel</Button>
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<Button style={buttonStyle} bsStyle="primary" href='#/play'>Spela</Button>
					</Col>
				</Row>
			</Grid>
		);
	}

};
