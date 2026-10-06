'use strict';

const { IncomingMessage, ServerResponse } = require("http");
const catalyst = require('zcatalyst-sdk-node');

function getBody(req){
	return new Promise((resolve)=>{
		let data ='';

		req.on('data',(chunk)=>{
			data +=chunk;
		})
		req.on('end',(chunk)=>{
			try{
				resolve(data?JSON.parse(data):{})
			}
			catch{
				resolve({})
			}
		})
	})
}

/**
 * 
 * @param {IncomingMessage} req 
 * @param {ServerResponse} res 
 */
module.exports = (req, res) => {
	var url = req.url;

	switch (url) {
		case '/':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write('<h1>Hello from index.js<h1>');
			break;
		default:
			res.writeHead(404);
			res.write('You might find the page you are looking for at "/" path');
			break;
	}
	res.end();
};
