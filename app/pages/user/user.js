import React from 'react';
import Model from '../../scripts/model.js';
import Spinner from 'react-spinkit';

import {Input, ButtonGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

import {sprintf} from '../../scripts/toolbox.js';



module.exports = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	
	getInitialState() {
		return {
			id:undefined,
			name:'',
			username:'',
			oldPassword: undefined,
			changePassword: false,
			password:undefined,
			retypedPassword:undefined,
			ready:false
		};
	},
	
	componentWillMount() {
	
		var _this = this;
		
		if (_this.props.params.id != undefined) {
			var request = Model.Users.fetch(parseInt(_this.props.params.id));
			
			request.done(function(user) {
				console.log('Got user', user);
				_this.setState({ready:true, id:user.id, username:user.username, name:user.name});				
			});	
		}
		else {
			_this.setState({ready:true, id:undefined, name:'Ny användare'});				
			
		}
	},
		

	onDelete(event) {
		var _this = this;
		var user = {};
		
		user.id = this.state.id;

		var request = Model.Users.remove(user);
		
		request.done(function(user) {
			window.history.back();
		});	
		
	},
	
	onChange(event) {
		var _this = this;
		
		console.log(event.target.name);
		switch (event.target.name) {
			case 'name': {
				this.setState({name:event.target.value});
				break;
			}
			case 'username': {
				this.setState({username:event.target.value});
				break;
			}
			
		}
	},
	
	
	onSave(event) {

		var _this = this;
		var user = {};
		var options = {};
		
		user.id       = this.state.id;
		user.username = this.state.username;
		user.name     = this.state.name;
		
		
		if (this.state.changePassword) {
			user.password    = this.state.password;
			options.password = this.state.oldPassword;
		}
		
		console.log(user);

		var request = Model.Users.save(user, options);
		
		request.done(function(user) {
			window.history.back();
			//_this.context.router.push("users");		
		});	
		
	},

	renderPassword() {

/*
			retur
		if (this.state.id != undefined) {
			return (
				<Row>
					<Col xs={12} sm={12} md={12}>
						<CheckBox name='changePassword' value={this.state.changePassword} label='Ändra lösenord' onChange={this.onChange}/>
						<Panel >
							<Input type='text'  name='password' value={this.state.password} disabled={this.state.changePassword == 0} label='Nytt lösenord' onChange={this.onChange}/>
							<Input type='text'  name='oldPassword' value={this.state.oldPassword} disabled={this.state.changePassword == 0} label='Ditt gamla lösenord' onChange={this.onChange}/>
						</Panel>
					</Col>
				</Row>
				
			);
			
			
		}
		else {
			return (
				<Row>
					<Col xs={12} sm={12} md={12}>
						<Input type='text' name='password' value={this.state.password} label='Lösenord' onChange={this.onChange}/>
						<Input type='text' name='retypedPassword' value={this.state.retypedPassword} label='Repetera lösenord' onChange={this.onChange}/>
					</Col>
				</Row>
			);
			
		}
*/
	},

	renderSaveButton() {
		return (
			<Button onClick={this.onSave} bsStyle='primary'>
				<Glyphicon glyph="ok" />
			</Button>
		);
		
	},

	renderDeleteButton() {
		if (this.state.id != undefined) {
			return (
				<Button onClick={this.onDelete} bsStyle='warning'>
					<Glyphicon glyph="remove" />
				</Button>
			);
			
		}
		
	},


	renderContent() {
		if (!this.state.ready) {
			return (
				<Row style={{textAlign:'center'}}>
					<Col md={12}>
						<Spinner spinnerName='three-bounce' noFade/>
					</Col>
				</Row>
			);
		}
		else {
			return (
				<div>
					<Row>
						<Col xs={12} sm={12} md={12}>
							<Input type='text' name='name' value={this.state.name} label='Namn' onChange={this.onChange}/>
							<Input type='text' name='username' value={this.state.username} label='Användarnamn' onChange={this.onChange}/>
						</Col>
					</Row>
	
					{this.renderPassword()}
	
					<Row style={{textAlign:'center'}}>
						<Col xs={12} sm={12} md={12}>
							<ButtonGroup>
								{this.renderSaveButton()}
								{this.renderDeleteButton()}
							</ButtonGroup>
						</Col>
					</Row>
				</div>
			);
			
		}
	},
	
	render() {
		return (
			<Grid style={{maxWidth:'60em'}}>	
				{this.renderContent()}
			</Grid>
		);
	}

});


