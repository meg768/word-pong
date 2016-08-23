import React from 'react';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';


function clientRequest(options) {

	function clientRequestDone(data) {
	}	
	
	function clientRequestFailed(error, response, body) {
		console.log('Request failed', response, body.toString());
	};
	

	var clientRequest = require('client-request');
	var request = $.Deferred();

	clientRequest(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			
			var json = {};
			
			try {
				json = JSON.parse(body);
			}
			catch (error) {
			}

			request.resolve(json);
		}
		else {
			request.reject(error, response, body);
			
		}
	});
	
	request.done(clientRequestDone);
	request.fail(clientRequestFailed);
	
	return request;
}

//curl -H "Authorization: Bearer 5wsYM3BuEBAKgw5wLbosV5oHr8Q4" https://sandbox.tradier.com/v1/markets/search?q=google

module.exports = class Stocks extends React.Component {


	constructor(...args) {
		super(...args);
	};

	onFetch2() {
		var YQL = require('yql');
		var query = new YQL('select * from yahoo.finance.quotes where symbol = "PHI.ST"');
		query.exec(function (error, response) {
			console.log(response.query.results);
		});		
	}
	
	onFetch() {
		
		var clientRequest = require('client-request');
		var options = {};
		options.uri = 'http://www.google.com/finance/getprices?i=60&p=10d&f=d,o,h,l,c,v&df=cpct&q=IBM';
		options.uri = 'http://www.google.com/finance/info?q=STO:NIBE-B,IBM';
		options.uri = 'https://sandbox.tradier.com/v1/markets/quotes?symbols=STO:HM-B';
		options.uri = 'https://sandbox.tradier.com/v1/markets/search?q=google';
		options.uri = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20"HM-B.ST"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=cb';
		options.headers = {};
		//options.headers['Accept'] = 'application/json';
		//options.headers['Authorization'] = 'Bearer 5wsYM3BuEBAKgw5wLbosV5oHr8Q4';
		options.method = 'GET';

		clientRequest(options, function(error, response, body) {

			var text = body.toString();
			console.log(text);
			var json = JSON.parse(text);
			console.log(json);
		});	
		
	};
	
	
	render() {
		return (
				<Grid>
					<Row>
						<Col md={4} sm={12}>
								<Button>
									HEJ LSI!
								</Button>
						</Col>
						<Col md={4} sm={12}>
								<Button>
									HEJ LSI!
								</Button>
						</Col>
					</Row>
					<Row>
						<Button onClick={this.onFetch.bind(this)}>Fetch</Button>
					</Row>
				</Grid>
		
		);
	}

}

