import React from 'react';
import Spinner from 'react-spinkit';

import {sprintf} from '../../scripts/toolbox.js';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {Panel, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';




module.exports = React.createClass({


	getInitialState() {

		var state = {};

		state.users = null;

		return state;
	},


	componentDidMount() {

		var _this = this;


	},



	render() {
		return (
			<Grid style={{}}>
				HEJ
			</Grid>

		);
	}

});
