import React from 'react';

module.exports.ListView = React.createClass({

	render() {

		return (
	    	<div className='list-group' {...this.props}>
	    		{this.props.children}
	    	</div>
		);
	}
	
});


module.exports.ListViewItem = React.createClass({


	getDefaultProps() {
	
		return {
			href: '',
			glyphLeft: '',
			glyphRight: '',
			glyphSize: '1.6em',
			title: '',
			subtitle: ''
			
		}
	},
	
	render() {
	
		self = this;
		

		var leftPart = function() {

			if (self.props.glyphLeft != '') {
				return (
						<div className={"glyphicon glyphicon-"+self.props.glyphLeft} style={{paddingRight:'1em', fontSize:self.props.glyphSize, display:'table-cell', verticalAlign:'middle'}}>
						</div>
				);
				
			}
		}    
		
		var rightPart = function() {
			if (self.props.glyphRight != '') {
				return (
						<div className={"glyphicon glyphicon-"+self.props.glyphRight} style={{paddingLeft:'1em', fontSize:self.props.glyphSize, display:'table-cell', verticalAlign:'middle'}}>
						</div>
				);
					
			}
		}
		
		var middlePart = function() {

			var titlePart = function() {
				if (self.props.title != '') {
					return (
						<h5>
							<strong>
								{self.props.title}
							</strong>
						</h5>
					);				
				}
			}		
			
			var subtitlePart = function() {
				if (self.props.subtitle != '') {
					return (
						<p>{self.props.subtitle}</p>
					);				
				}
			}
	
			return (
		    		<div style={{width:'100%', display:'table-cell', verticalAlign:'middle'}}>
						{titlePart()}
						{subtitlePart()}
						{self.props.children}
		    		</div>
			);
		}
		
		var content = function() {

			return (
		    	<div style={{display:'table'}}>
		    		{leftPart()}
		    		{middlePart()}
		    		{rightPart()}
		    	</div>
			);

		}

		if (this.props.href != '') {
			return (
			    <a className='list-group-item' href={this.props.href} style={{}}>
			    	{content()}
			    </a>
			);
			
		}

		return (
		    <span className='list-group-item'>
		    	{content()}
		    </span>
		);
	}
	
});


