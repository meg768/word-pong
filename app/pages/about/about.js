








import React from 'react';
import ReactDOM from 'react-dom';

import {Jumbotron, Button} from 'react-bootstrap';
import {Overlay, Clearfix, Row, Col, Grid, Tab, Tabs, Glyphicon, Tooltip, ButtonToolbar, DropdownButton, MenuItem, Popover, Modal, OverlayTrigger} from 'react-bootstrap';
import {sprintf} from '../../scripts/toolbox.js';

function onSelectAlert(eventKey, href) {
  alert('Alert from menu item.\neventKey: "' + eventKey + '"\nhref: "' + href + '"');
}


var Popup = React.createClass({

	
	getInitialState() {
		return {visible:false};	
	},

	onShow() {
		this.setState({visible:true});
		
	},
	
	findTarget() {
		return ReactDOM.findDOMNode(this.props.target);		
	},

	
	onHide() {
		this.setState({visible:false});
		
	},


	render() {
		var style = {};
		style.position = 'absolute';
		style.border   = '1px solid black';
		style.padding  = 10;
		
		<Overlay rootClose={true} show={this.state.visible} onHide={this.onHide} placement="bottom" container={this} target={this.findTarget()}>
			<div style={style}>
				{this.props.children}
			</div>
		</Overlay>
		
	}

});

const Example = React.createClass({
  getInitialState() {
    return { show: false };
  },

  toggle() {
    this.setState({ show: !this.state.show });
  },
  

  onShow() {
	  this.setState({show:true});
  },
  onHide() {
	  this.setState({show:!this.state.show});
  },

  render() {
    const style = {
      position: 'absolute',
      //backgroundColor: '#EEE',
      boxShadow: '0 3px 3px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -5,
      marginTop: 5,
      padding: 10
    };

    var popupStyle = {};
    popupStyle.display = this.state.show ? 'block' : 'none';

	return (
		<div style={{position:'relative'}}>
	        <Button ref="target" onClick={this.toggle}>
	          I am an Overlay target
	        </Button>
					<ul className="dropdown-menu" role="menu" style={popupStyle}>
					      <MenuItem href="#books">Books</MenuItem>
					      <MenuItem href="#podcasts">Podcasts</MenuItem>
					      <MenuItem href="#">Tech I Like</MenuItem>
					      <MenuItem href="#">About me</MenuItem>
					      <MenuItem href="#" devider/>
					      <MenuItem href="#addBlog">Add a Blog</MenuItem>
					</ul>
		</div>
	);

  }
});

function MenuItems() {
	
	return (
    <DropdownButton title="Dropdown">
      <MenuItem href="#books">Books</MenuItem>
      <MenuItem href="#podcasts">Podcasts</MenuItem>
      <MenuItem href="#">Tech I Like</MenuItem>
      <MenuItem href="#">About me</MenuItem>
      <MenuItem href="#addBlog">Add a Blog</MenuItem>
    </DropdownButton>

	);
	
/*
return(
	
	
<div className="dropdown">
  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span className="caret"></span>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" role="menu">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li role="separator" className="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>	
	
	
);
*/
	return (
    <ul className="dropdown-menu ">
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem divider/>
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title.">
        link with title
      </MenuItem>
      <MenuItem eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </MenuItem>
    </ul>
	);
	
	return (
  <Clearfix>
    <ul className="dropdown-menu open">
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem divider/>
      <MenuItem header>Header</MenuItem>
      <MenuItem>link</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem title="See? I have a title.">
        link with title
      </MenuItem>
      <MenuItem eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </MenuItem>
    </ul>
  </Clearfix>);


	
};



module.exports = React.createClass({

	getInitialState(){

		return {}
	},
	

	render() {
		return (
			<Grid>
				<Row>
					<Col md={3}>
						HEJ
					</Col>
					<Col md={3}>
						HEJ
					</Col>
					<Col md={3}>
						HEJ
					</Col>
					<Col md={3}>
						HEJ
					</Col>
				</Row>
				<Row>
					
					<Example>
						XXX
					</Example>
					<br/>
					gfsdkgjhdfg
					

				</Row>
				<Row>
				</Row>
			</Grid>
		);

	}

});

