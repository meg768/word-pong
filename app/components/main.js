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
						<a href="#">Word Pong</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={45} href="#/test">Test</NavItem>
						<NavItem eventKey={1} href="#/home">Home</NavItem>
						<NavItem eventKey={2} href="#/about">Regler</NavItem>
						<NavItem eventKey={4} href="#/settings">Settings</NavItem>
						<NavDropdown eventKey={3} title="Specialare" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1} href='#/bp'>Betapet</MenuItem>
							<MenuItem eventKey={3.6} href='#/drag'>Drag/drop</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3} href='#/home'>Användare</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={2} href="#/home">Hem</NavItem>
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
