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

function allowLocalhost(req,res)
{
	const origin = req.headers.origin || '';
	if(origin.startsWith('http://localhost:')) {
		res.setHeader('Access-Control-Allow-Origin', origin)
		res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
		res.setHeader('Access-Control-Allow-Headers','Content-Type')
	}
 }


module.exports = async(req,res)=>{
	allowLocalhost(req,res);

	if(req.method==='OPTIONS'){
		res.writeHead(204);
		res.end();
		return;
	}
	
	console.log('1. Order vanthuchu:', req.method,req.url);
	try{
		const app = catalyst.initialize(req,{scope: 'admin'});
		console.log('2.Saavi bunch is ready ');

		const table = app.datastore().table('ParkingEntries');
		console.log('3- self target: parking entries ')

		if(req.method === 'POST')
		{
			const body = await getBody(req);
			console.log('p1. body vandhuchu :',body);

			if(body.rowId) {
				const row = await table.updateRow({
					ROWID: body.rowId,
					Status:'OUT'
				})
				res.writeHead(200,{'Content-Type': 'application/json'})
				res.end(JSON.stringify({entry: row}))
				return 

			}

			const row = await table.insertRow	({
				VehicleNumber: body.vehicleNumber,
				Name: body.name,
				PhoneNumber:body.phoneNumber,
				InTime:body.inTime,
				EntryType:body.entryType

			})
			console.log('p2.self la vechitten ROWID:', row.ROWID)

			res.writeHead(201, {'Content-Type':  'application/json'});
			res.end(JSON.stringify({entry: row}))
			return;

		}

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

