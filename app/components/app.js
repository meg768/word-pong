import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, hashHistory, Router, Route} from 'react-router';

import {Navbar,  CollapsibleNav, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';


require('../less/styles.less');
require('../../lib/scripts/date.js');

require('./app.less');

/*

<Navbar inverse>
	<Navbar.Header>
		<Navbar.Brand>
			<a href="#">Word Pong</a>
		</Navbar.Brand>
		<Navbar.Toggle />
	</Navbar.Header>
	<Navbar.Collapse>
		<Nav>
			<NavItem eventKey={2} href="#/about">Spelregler</NavItem>
			<NavItem eventKey={3} href="#/drag">Bokstäver</NavItem>
			<NavItem eventKey={4} href="#/make-word">Skapa ord</NavItem>
		</Nav>
	</Navbar.Collapse>
</Navbar>

*/
var App = React.createClass({
  render: function() {


    return (
		<div className='app'>
				{this.props.children}
    	</div>
    );
  }
})


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={require('../pages/home/home.js')} />
			<Route path="home"       component={require('../pages/home/home.js')} />
			<Route path="about"      component={require('../pages/about/about.js')} />
			<Route path="build-word" component={require('../pages/build-word/build-word.js')} />
			<Route path="play"       component={require('../pages/play/play.js')} />
			<Route path="new-game"   component={require('../pages/new-game/new-game.js')} />
		</Route>
	</Router>
), document.getElementById('app'))
