import React from 'react'; 
import ReactDOM from 'react-dom';
import {IndexRoute, hashHistory, Router, Route} from 'react-router';


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={require('./main.js')}>
			<IndexRoute component={require('../pages/home/home.js')} />
			<Route path="drag"      component={require('../pages/drag/drag.js')} />
			<Route path="home"      component={require('../pages/home/home.js')} />
			<Route path="test"      component={require('../pages/test/test.js')} />
			<Route path="settings"  component={require('../pages/settings/settings.js')} />
			<Route path="about"     component={require('../pages/about/about.js')} />
			<Route path="login"     component={require('../pages/login/login.js')} />
			<Route path="bp"        component={require('../pages/bp/bp.js')} />
			<Route path="users"     component={require('../pages/users/users.js')} />
			<Route path="user"      component={require('../pages/user/user.js')} />
			<Route path="user/:id"  component={require('../pages/user/user.js')} />
		</Route>
	</Router>
), document.getElementById('app'))
