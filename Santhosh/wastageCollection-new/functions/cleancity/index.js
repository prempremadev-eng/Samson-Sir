'use strict';

const { IncomingMessage, ServerResponse } = require("http");
const catalyst = require('zcatalyst-sdk-node');

// Generation formula — maathanum-na inga mattum maathina podhum
const KG_PER_HOUSEHOLD = 4;   // 1 veedu = 4 kg waste
const WET_SHARE = 0.5;        // 50% wet, meedhi 50% dry

// Roles: owner (app creator) > admin > supervisor
const ROLES = ['owner', 'admin', 'supervisor'];

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
module.exports = async (req, res) => {
	// "/collection?date=2026-10-12" → path = "/collection", date = "2026-10-12"
	const url = new URL(req.url, 'http://localhost');
	const path = url.pathname;

	try {
		// Lock 1: login pannirukkaangalaa? (Catalyst)
		const loginUser = await getLoggedInUser(req);
		if (!loginUser) {
			sendJson(res, 401, { error: 'Login pannunga' });
			res.end();
			return;
		}
		// User check aanadhum, store room velai admin key-la (App User-ku default read mattum dhaan)
		const app = catalyst.initialize(req, { scope: 'admin' });

		// Lock 2: namma guest list (AppUser table)-la irukkaangalaa?
		const me = await findAppUser(app, loginUser.email_id);
		if (!me) {
			// Admin-ku "yaar try pannaanga" list-la kaata
			await recordAccessRequest(app, loginUser);
			sendJson(res, 403, { error: `${loginUser.email_id} — indha app-ku permission illa. Admin approve pannanum.` });
			res.end();
			return;
		}

		switch (path) {
			// Naan yaaru? (page open aagumbodhu ore thadava varum → last login update)
			case '/me':
				await app.datastore().table('AppUser').updateRow({ ROWID: me.ROWID, last_login: nowIST().datetime });
				sendJson(res, 200, { ...me, today: nowIST().date });
				break;

			case '/locations':
				sendJson(res, 200, await getLocations(app));
				break;

			case '/vehicles': {
				if (req.method === 'GET') {
					sendJson(res, 200, await getVehicles(app));
					break;
				}
				// Vandi add / edit — admin, owner mattum
				if (req.method === 'POST') {
					requireRole(me, ['owner', 'admin']);
					sendJson(res, 200, await saveVehicle(app, await readBody(req)));
					break;
				}
				sendJson(res, 405, { error: 'GET or POST mattum dhaan' });
				break;
			}

			case '/collection': {
				// GET → andha date-oda table (generation calculate + collection)
				if (req.method === 'GET') {
					const date = url.searchParams.get('date');
					if (!isDate(date)) {
						sendJson(res, 400, { error: 'date=YYYY-MM-DD venum' });
						break;
					}
					let report = await getDayReport(app, date);
					// Supervisor-ku thannoda location mattum
					if (me.role === 'supervisor') report = report.filter(r => r.location_id === me.location_id);
					sendJson(res, 200, report);
					break;
				}

				// POST → entry save (insert or update)
				if (req.method === 'POST') {
					const body = await readBody(req);
					const error = validate(body);
					if (error) {
						sendJson(res, 400, { error });
						break;
					}
					sendJson(res, 200, await saveEntries(app, body, me));
					break;
				}

				sendJson(res, 405, { error: 'GET or POST mattum dhaan' });
				break;
			}

			// Users list / add / edit / remove — admin, owner mattum
			case '/users': {
				requireRole(me, ['owner', 'admin']);
				if (req.method === 'GET') {
					sendJson(res, 200, await getAppUsers(app));
					break;
				}
				if (req.method === 'POST') {
					sendJson(res, 200, await saveAppUser(app, await readBody(req), me));
					break;
				}
				if (req.method === 'DELETE') {
					sendJson(res, 200, await removeAppUser(app, url.searchParams.get('id'), me));
					break;
				}
				sendJson(res, 405, { error: 'GET, POST, DELETE mattum dhaan' });
				break;
			}

			// Permission illaama login try pannavanga — admin, owner mattum paakkalaam / dismiss
			case '/requests': {
				requireRole(me, ['owner', 'admin']);
				if (req.method === 'GET') {
					sendJson(res, 200, await getAccessRequests(app));
					break;
				}
				if (req.method === 'DELETE') {
					const id = url.searchParams.get('id');
					if (!isId(id)) throw httpError(400, 'id venum');
					await app.datastore().table('AccessRequest').deleteRow(id);
					sendJson(res, 200, { dismissed: true });
					break;
				}
				sendJson(res, 405, { error: 'GET or DELETE mattum dhaan' });
				break;
			}

			// Week / Month report
			case '/report': {
				const period = url.searchParams.get('period');
				const date = url.searchParams.get('date');
				if (!['week', 'month'].includes(period) || !isDate(date)) {
					throw httpError(400, 'period=week|month, date=YYYY-MM-DD venum');
				}
				const report = await getPeriodReport(app, period, date);
				if (me.role === 'supervisor') report.rows = report.rows.filter(r => r.location_id === me.location_id);
				sendJson(res, 200, report);
				break;
			}

			default:
				res.writeHead(404);
				res.write('You might find the page you are looking for at "/" path');
				break;
		}
	} catch (err) {
		console.error(err);
		const status = err.status || 500;
		sendJson(res, status, { error: err.message });
	}
	// await mudinja apram dhaan inga varum
	res.end();
};

// Login cookie irundha Catalyst user object, illa-na null
async function getLoggedInUser(req) {
	try {
		const userApp = catalyst.initialize(req);
		const user = await userApp.userManagement().getCurrentUser();
		return user && user.email_id ? user : null;
	} catch (err) {
		return null;
	}
}

function requireRole(me, allowed) {
	if (!allowed.includes(me.role)) throw httpError(403, 'Indha velai-ku unga role-ku permission illa');
}

function sendJson(res, status, data) {
	res.writeHead(status, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(data));
}

function httpError(status, message) {
	const err = new Error(message);
	err.status = status;
	return err;
}

// ZCQL-la string podumbodhu ' irundha query udaiyum → '' aakkurom
function sqlText(value) {
	return String(value).replace(/'/g, "''");
}

function isId(value) {
	return /^\d+$/.test(String(value || ''));
}

// Server UTC-la odum → India time (+5:30) kanakku
function nowIST() {
	const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString();
	return { date: ist.slice(0, 10), datetime: `${ist.slice(0, 10)} ${ist.slice(11, 19)}` };
}

// ---------- AccessRequest (permission illaama try pannavanga) ----------

async function recordAccessRequest(app, loginUser) {
	const email = loginUser.email_id.toLowerCase();
	const name = [loginUser.first_name, loginUser.last_name].filter(Boolean).join(' ');
	const rows = await app.zcql().executeZCQLQuery(
		`SELECT ROWID, tries FROM AccessRequest WHERE email = '${sqlText(email)}'`
	);
	const table = app.datastore().table('AccessRequest');
	if (rows.length) {
		const r = rows[0].AccessRequest;
		await table.updateRow({ ROWID: r.ROWID, last_try: nowIST().datetime, tries: (Number(r.tries) || 0) + 1 });
	} else {
		await table.insertRow({ email, name, last_try: nowIST().datetime, tries: 1 });
	}
}

async function getAccessRequests(app) {
	const rows = await app.zcql().executeZCQLQuery(
		'SELECT ROWID, email, name, last_try, tries FROM AccessRequest ORDER BY last_try DESC'
	);
	return rows.map(row => ({
		ROWID: row.AccessRequest.ROWID,
		email: row.AccessRequest.email,
		name: row.AccessRequest.name,
		last_try: row.AccessRequest.last_try,
		tries: Number(row.AccessRequest.tries) || 1
	}));
}

// ---------- AppUser (guest list) ----------

async function findAppUser(app, email) {
	const rows = await app.zcql().executeZCQLQuery(
		`SELECT ROWID, email, name, role, location_id, last_login FROM AppUser WHERE email = '${sqlText(email.toLowerCase())}'`
	);
	if (rows.length === 0) return null;
	const u = rows[0].AppUser;
	const locations = await getLocations(app);
	const location = locations.find(l => l.ROWID === u.location_id);
	return {
		ROWID: u.ROWID,
		email: u.email,
		name: u.name,
		role: u.role,
		location_id: u.location_id || null,
		location_name: location ? location.location_name : null,
		last_login: u.last_login || null
	};
}

async function getAppUsers(app) {
	const rows = await app.zcql().executeZCQLQuery('SELECT ROWID, email, name, role, location_id, last_login FROM AppUser');
	const locations = await getLocations(app);
	return rows.map(row => {
		const u = row.AppUser;
		const location = locations.find(l => l.ROWID === u.location_id);
		return {
			ROWID: u.ROWID,
			email: u.email,
			name: u.name,
			role: u.role,
			location_id: u.location_id || null,
			location_name: location ? location.location_name : null,
			last_login: u.last_login || null
		};
	}).sort((a, b) => ROLES.indexOf(a.role) - ROLES.indexOf(b.role) || a.name.localeCompare(b.name));
}

// Pudhu user add (ROWID illa) or edit (ROWID irukku)
async function saveAppUser(app, body, me) {
	const email = String(body.email || '').trim().toLowerCase();
	const name = String(body.name || '').trim();
	const role = body.role;
	const locationId = body.location_id || null;

	if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw httpError(400, 'Email sariyaa illa');
	if (!name) throw httpError(400, 'Name venum');
	if (!['admin', 'supervisor'].includes(role)) throw httpError(400, 'Role admin or supervisor-ah irukkanum');
	// Admin, supervisor-ah mattum add/edit pannalaam. Admin-ah add panna owner venum.
	if (role === 'admin' && me.role !== 'owner') throw httpError(403, 'Admin-ah owner mattum dhaan add panna mudiyum');
	if (role === 'supervisor' && !isId(locationId)) throw httpError(400, 'Supervisor-ku location venum');

	const table = app.datastore().table('AppUser');
	const row = { email, name, role, location_id: role === 'supervisor' ? locationId : null };

	if (body.ROWID) {
		const existing = (await getAppUsers(app)).find(u => u.ROWID === String(body.ROWID));
		if (!existing) throw httpError(404, 'User illa');
		if (existing.role === 'owner') throw httpError(403, 'Owner-ah edit panna mudiyaadhu');
		if (existing.role === 'admin' && me.role !== 'owner') throw httpError(403, 'Admin-ah owner mattum dhaan edit panna mudiyum');
		await table.updateRow({ ROWID: body.ROWID, ...row });
		return { updated: true };
	}

	if (await findAppUser(app, email)) throw httpError(400, 'Indha email already list-la irukku');
	await table.insertRow(row);
	// Access request-la irundha (approve), adhai list-la irundhu edukkurom
	const requests = await app.zcql().executeZCQLQuery(`SELECT ROWID FROM AccessRequest WHERE email = '${sqlText(email)}'`);
	for (const r of requests) await app.datastore().table('AccessRequest').deleteRow(r.AccessRequest.ROWID);
	// Catalyst-la login account create + invite email
	const invited = await inviteToCatalyst(app, email, name);
	return { added: true, invited };
}

async function inviteToCatalyst(app, email, name) {
	try {
		await app.userManagement().registerUser(
			{ platform_type: 'web', redirect_url: '/app/index.html' },
			{ first_name: name, last_name: '-', email_id: email }
		);
		return 'invite email anuppiyaachu';
	} catch (err) {
		// Already Catalyst user-na problem illa
		console.error('invite', err.message);
		return 'invite aagala: ' + err.message;
	}
}

async function removeAppUser(app, id, me) {
	if (!isId(id)) throw httpError(400, 'id venum');
	const existing = (await getAppUsers(app)).find(u => u.ROWID === String(id));
	if (!existing) throw httpError(404, 'User illa');
	if (existing.role === 'owner') throw httpError(403, 'Owner-ah remove panna mudiyaadhu');
	if (existing.role === 'admin' && me.role !== 'owner') throw httpError(403, 'Admin-ah owner mattum dhaan remove panna mudiyum');
	await app.datastore().table('AppUser').deleteRow(id);
	return { removed: true };
}

// ---------- Location / Vehicle ----------

async function getLocations(app) {
	const rows = await app.zcql().executeZCQLQuery(
		'SELECT ROWID, location_name, incharge_name, has_dry_plant FROM Location ORDER BY location_name'
	);
	return rows.map(row => ({
		ROWID: row.Location.ROWID,
		location_name: row.Location.location_name,
		incharge_name: row.Location.incharge_name,
		// Boolean sila neram true, sila neram "true" (string) varum → String() panni compare
		has_dry_plant: String(row.Location.has_dry_plant) === 'true'
	}));
}

// 50 vandi + location + households
async function getVehicles(app) {
	const rows = await app.zcql().executeZCQLQuery(
		'SELECT Vehicle.ROWID, Vehicle.vehicle_no, Vehicle.households, Vehicle.location_id, Location.location_name, Location.has_dry_plant FROM Vehicle INNER JOIN Location ON Vehicle.location_id = Location.ROWID ORDER BY Vehicle.vehicle_no'
	);
	// ZCQL result: [{ Vehicle: {...}, Location: {...} }] → oru plain object
	return rows.map(row => ({
		ROWID: row.Vehicle.ROWID,
		vehicle_no: row.Vehicle.vehicle_no,
		households: Number(row.Vehicle.households) || 0,
		location_id: row.Vehicle.location_id,
		location_name: row.Location.location_name,
		has_dry_plant: String(row.Location.has_dry_plant) === 'true'
	}));
}

// Vandi add (ROWID illa) or edit (ROWID irukku)
async function saveVehicle(app, body) {
	const vehicleNo = String(body.vehicle_no || '').trim().toUpperCase();
	const households = Number(body.households);
	if (!vehicleNo) throw httpError(400, 'Vehicle No venum');
	if (!Number.isInteger(households) || households <= 0) throw httpError(400, 'Households 1 or adhukku mela venum');
	if (!isId(body.location_id)) throw httpError(400, 'Location venum');

	const duplicate = (await getVehicles(app)).find(v => v.vehicle_no === vehicleNo && v.ROWID !== String(body.ROWID || ''));
	if (duplicate) throw httpError(400, `${vehicleNo} already irukku`);

	const table = app.datastore().table('Vehicle');
	const row = { vehicle_no: vehicleNo, households, location_id: body.location_id };
	if (body.ROWID) {
		await table.updateRow({ ROWID: body.ROWID, ...row });
		return { updated: true };
	}
	await table.insertRow(row);
	return { added: true };
}

// ---------- Collection ----------

// Andha date-la ellaa vandi-kkum: households, generation (calculate), collection (DB)
async function getDayReport(app, date) {
	const vehicles = await getVehicles(app);
	const rows = await app.zcql().executeZCQLQuery(
		`SELECT ROWID, vehicle_id, wet_collection_kg, dry_collection_kg, entered_by, MODIFIEDTIME FROM Collection WHERE collection_date = '${date}'`
	);
	// vehicle_id → collection row (lookup easy-ah)
	const collected = {};
	rows.forEach(row => { collected[row.Collection.vehicle_id] = row.Collection; });

	return vehicles.map((v, index) => {
		const wasteGeneration = v.households * KG_PER_HOUSEHOLD;
		const entry = collected[v.ROWID];
		return {
			s_no: index + 1,
			vehicle_id: v.ROWID,
			vehicle_no: v.vehicle_no,
			location_id: v.location_id,
			location_name: v.location_name,
			has_dry_plant: v.has_dry_plant,
			households: v.households,
			waste_generation: wasteGeneration,
			wet_generation: wasteGeneration * WET_SHARE,
			wet_collection: entry ? Number(entry.wet_collection_kg) : null,
			dry_generation: wasteGeneration * (1 - WET_SHARE),
			dry_collection: entry ? Number(entry.dry_collection_kg) : null,
			entered_by: entry ? entry.entered_by : null,
			entered_time: entry ? entry.MODIFIEDTIME : null
		};
	});
}

// Week (Mon–Sun) / Month report: andha period-la ovvoru vandi-kkum total
async function getPeriodReport(app, period, date) {
	const d = new Date(`${date}T00:00:00Z`);
	let start;
	let end;
	if (period === 'week') {
		const fromMonday = (d.getUTCDay() + 6) % 7;   // Sunday = 0 → 6
		start = new Date(d.getTime() - fromMonday * 86400000);
		end = new Date(start.getTime() + 6 * 86400000);
	} else {
		start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
		end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0));
	}
	const ymd = x => x.toISOString().slice(0, 10);
	const from = ymd(start);
	const to = ymd(end);

	// Generation: inniku varaikkum ulla naal mattum kanakku (naalai innum varala)
	const today = nowIST().date;
	const lastCounted = to < today ? to : today;
	const days = from > today ? 0 : Math.round((new Date(`${lastCounted}T00:00:00Z`) - start) / 86400000) + 1;

	const vehicles = await getVehicles(app);
	const rows = await app.zcql().executeZCQLQuery(
		`SELECT vehicle_id, SUM(wet_collection_kg), SUM(dry_collection_kg), COUNT(ROWID) FROM Collection WHERE collection_date >= '${from}' AND collection_date <= '${to}' GROUP BY vehicle_id`
	);
	const totals = {};
	rows.forEach(row => {
		const c = row.Collection;
		totals[c.vehicle_id] = {
			wet: Number(c['SUM(wet_collection_kg)']) || 0,
			dry: Number(c['SUM(dry_collection_kg)']) || 0,
			entries: Number(c['COUNT(ROWID)']) || 0
		};
	});

	return {
		period,
		from,
		to,
		days,
		rows: vehicles.map(v => {
			const wasteGeneration = v.households * KG_PER_HOUSEHOLD * days;
			const t = totals[v.ROWID] || { wet: 0, dry: 0, entries: 0 };
			return {
				vehicle_id: v.ROWID,
				vehicle_no: v.vehicle_no,
				location_id: v.location_id,
				location_name: v.location_name,
				households: v.households,
				entry_days: t.entries,
				waste_generation: wasteGeneration,
				wet_generation: wasteGeneration * WET_SHARE,
				wet_collection: t.wet,
				dry_generation: wasteGeneration * (1 - WET_SHARE),
				dry_collection: t.dry
			};
		})
	};
}

// Entries → pudhusu-na insert, already irundha update
async function saveEntries(app, body, me) {
	const date = body.collection_date;
	// Nethu / naalai entry koodaadhu — inniku (India time) mattum
	if (date !== nowIST().date) throw httpError(400, `Inniku (${nowIST().date}) date-ku mattum dhaan entry podalaam`);
	const vehicles = await getVehicles(app);
	const vehicleById = {};
	vehicles.forEach(v => { vehicleById[v.ROWID] = v; });

	for (const e of body.entries) {
		const v = vehicleById[e.vehicle_id];
		if (!v) throw httpError(400, `Vehicle illa: ${e.vehicle_id}`);
		// Supervisor thannoda location vandi-ku mattum
		if (me.role === 'supervisor' && v.location_id !== me.location_id) {
			throw httpError(403, `${v.vehicle_no} unga location (${me.location_name}) vandi illa`);
		}
		// Dry plant illaadha location-ku dry > 0 kudukka koodaadhu
		if (!v.has_dry_plant && Number(e.dry_collection_kg) > 0) {
			throw httpError(400, `${v.vehicle_no}: ${v.location_name}-la dry plant illa, dry = 0 podunga`);
		}
	}

	// Inniku already save pannadhu irukkaa?
	const existing = await app.zcql().executeZCQLQuery(
		`SELECT ROWID, vehicle_id FROM Collection WHERE collection_date = '${date}'`
	);
	const rowIdByVehicle = {};
	existing.forEach(row => { rowIdByVehicle[row.Collection.vehicle_id] = row.Collection.ROWID; });

	const toInsert = [];
	const toUpdate = [];
	body.entries.forEach(e => {
		const row = {
			collection_date: date,
			vehicle_id: e.vehicle_id,
			wet_collection_kg: Number(e.wet_collection_kg),
			dry_collection_kg: Number(e.dry_collection_kg),
			entered_by: me.name
		};
		const rowId = rowIdByVehicle[e.vehicle_id];
		if (rowId) toUpdate.push({ ROWID: rowId, ...row });
		else toInsert.push(row);
	});

	const table = app.datastore().table('Collection');
	if (toInsert.length) await table.insertRows(toInsert);
	if (toUpdate.length) await table.updateRows(toUpdate);
	return { inserted: toInsert.length, updated: toUpdate.length };
}

// Request body chunk chunk-ah varum → ellaam serthu JSON-ah maathurom
function readBody(req) {
	return new Promise((resolve, reject) => {
		let data = '';
		req.on('data', chunk => data += chunk);
		req.on('end', () => {
			try {
				resolve(JSON.parse(data || '{}'));
			} catch (e) {
				reject(httpError(400, 'JSON thappu'));
			}
		});
		req.on('error', reject);
	});
}

function isDate(value) {
	return /^\d{4}-\d{2}-\d{2}$/.test(value || '');
}

// Store room-ku pogura munnaadi waiter check pannuradhu
function validate(body) {
	if (!isDate(body.collection_date)) return 'collection_date YYYY-MM-DD format-la venum';
	if (!Array.isArray(body.entries) || body.entries.length === 0) return 'entries list venum';
	for (const e of body.entries) {
		if (!isId(e.vehicle_id)) return 'vehicle_id venum';
		for (const key of ['wet_collection_kg', 'dry_collection_kg']) {
			const kg = Number(e[key]);
			if (e[key] === undefined || e[key] === '' || e[key] === null || isNaN(kg) || kg < 0) {
				return `${key} 0 or adhukku mela number-ah irukkanum`;
			}
		}
	}
	return null;
}
