import ursa from 'ursa-purejs';
import Gopher from './gopher.js';
import {extend, sprintf, isString, isObject, isArray} from './toolbox.js';

var NordnetAPI = function(baseURL) {
	
	var _session = {};
	var _this = this;
	var _gopher = new Gopher(baseURL);
	
	var _defaultHeaders = {
		'accept': 'application/json',
		'content-type': 'application/json'
	};

	this.isAlive = function() {
		return isString(_session.session_key);
	}	
	
	this.request = function(method, path, params) {
		var headers = {};
		extend(headers, _defaultHeaders);
		
		// Add authorization
		headers['Authorization'] = sprintf('Basic %s', new Buffer(sprintf('%s:%s', _session.session_key, _session.session_key)).toString('base64'));

		return _gopher.request(method, path, params, headers);
		
	};

	function loadSession() {

		try {
			var session = JSON.parse(localStorage.session);
			
			if (isString(session.session_key))
				_session = session;
		}
		catch(error) {
		}
	}

	function saveSession() {
		localStorage.session = JSON.stringify(_session);
	}

	this.login = function(user, password) {
			
	
		function getPublicKey() {
			
			var key = '';
			
			key += '-----BEGIN PUBLIC KEY-----' + '\n';
			key += 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5td/64fAicX2r8sN6RP3' + '\n';
			key += 'mfHf2bcwvTzmHrLcjJbU85gLROL+IXclrjWsluqyt5xtc/TCwMTfC/NcRVIAvfZd' + '\n';
			key += 't+OPdDoO0rJYIY3hOGBwLQJeLRfruM8dhVD+/Kpu8yKzKOcRdne2hBb/mpkVtIl5' + '\n';
			key += 'avJPFZ6AQbICpOC8kEfI1DHrfgT18fBswt85deILBTxVUIXsXdG1ljFAQ/lJd/62' + '\n';
			key += 'J74vayQJq6l2DT663QB8nLEILUKEt/hQAJGU3VT4APSfT+5bkClfRb9+kNT7RXT/' + '\n';
			key += 'pNCctbBTKujr3tmkrdUZiQiJZdl/O7LhI99nCe6uyJ+la9jNPOuK5z6v72cXenmK' + '\n';
			key += 'ZwIDAQAB' + '\n';
			key += '-----END PUBLIC KEY-----';

			return key;			
		};
		
		function encryptCredentials(user, password) {
			
			var key = ursa.createPublicKey(getPublicKey(), 'utf8');
			var authorization = sprintf('%s:%s:%s', new Buffer(user).toString('base64'), new Buffer(password).toString('base64'), new Buffer('' + new Date().getTime()).toString('base64'));

			return key.encrypt(authorization, 'utf8', 'base64', ursa.RSA_PKCS1_PADDING).toString('base64');
		}
			
		var params = {};
		params.service = 'NEXTAPI';
		params.auth    = encryptCredentials(user, password);
		
		var request = _gopher.request('post', 'login', params, _defaultHeaders);
		
		request.then(function(session) {
			_session = session;
			saveSession();
			console.log('Login succeeded.', session);
		});
		
		request.catch(function(){
			_session = {};
			console.log('Login failed.');
		});

		return request;
		
	};
	

	loadSession();

};

var api = module.exports = new NordnetAPI('https://api.test.nordnet.se/next/2');



