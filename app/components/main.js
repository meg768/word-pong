import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, hashHistory, browserHistory, Router, Route, Link } from 'react-router';
import {Navbar,  CollapsibleNav, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';

require('../../lib/scripts/date.js');
require('../less/styles.less');


module.exports = React.createClass({
  render: function() {


    return (
		<div className='app'>

			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
					<a href="#">Word Pong
					</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={2} href="#/about">Spelregler</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<div>
				{this.props.children}
			</div>


    	</div>
    );
  }
})
