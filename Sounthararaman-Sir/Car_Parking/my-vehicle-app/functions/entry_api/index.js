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
// module.exports = (req, res) => {
// 	var url = req.url;

// 	switch (url) {
// 		case '/':
// 			res.writeHead(200, { 'Content-Type': 'text/html' });
// 			res.write('<h1>Hello from index.js<h1>');
// 			break;
// 		default:
// 			res.writeHead(404);
// 			res.write('You might find the page you are looking for at "/" path');
// 			break;
// 	}
// 	res.end();
// };

module.exports = async(req,res)=>{
	console.log('1. Order vanthuchu:', req.method,req.url);
	try{
		const app = catalyst.initialize(req,{scope: 'admin'});
		console.log('2.Saavi bunch is ready ');

		const table = app.datastore().table('ParkingEntries');
		console.log('3- self target: parking entries ')

	    console.log('4-store kku poitt return vantuvitten  ')
		const result = await table.getPagedRows({maxRows:10});
		console.log('5- thirumbi vanthutte   ')

		res.writeHead(200,{'Content-Type': 'application/json'});
		res.end(JSON.stringify({rows: result.data}))
		console.log('6-plate kuduthathu')

	}catch(err){
		console.log('problem : ', err.message)
		res.writeHead(500,{'Content-Type': 'application/json'});
		res.end(JSON.stringify({error:err.message}))

	}
}

