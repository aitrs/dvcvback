const express = require('express');
const resum = require('./resume');
const pdf = require('./pdfize');
const combineSkills = require('./combineskills');
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Contol-Allow-Methods', 'GET,POST');
	next();
});

app.use('/api/static', express.static('public'));

app.get('/api', (req, res, next) => {
	res.status(200).json(resum.identity);
});

app.get('/api/short', (req, res, next) => {
	let sh = [];
	resum.experiences.forEach((val, id) => {
		sh.push({ pending: val.pending, company: val.company, start: val.start, end: val.end, index: id });
	});
	res.status(200).json(sh);
});

app.get('/api/exp/:id', (req, res, next) => {
	let index = parseInt(req.params.id, 10);
	
	if(isNaN(index)) {
		res.status(404).json({error: 404, message: "Malformed Index (NaN)"});
	} else {

		let ret = resum.experiences[index];

		if(ret) {
			res.status(200).json(ret);
		} else {
			res.status(404).json({error: 404, message: "Experience not found"});
		}
	}
});

app.get('/api/stud', (req, res, next) => {
	res.status(200).json(resum.studies);
});

app.get('/api/lang', (req, res, next) => {
	res.status(200).json(resum.langs);
});

app.get('/api/skills', (req, res, next) => {
	let skcomb = combineSkills(resum);
	let ret = [];
	skcomb.forEach((item) => {
		if(item.duration > 0) {
			ret.push(item);
		}
	});
	res.status(200).json(ret);
});

app.get('/api/pdfrender', async (req, res, next) => {
	const blob = await pdf();
	res.set('Content-Type', 'application/pdf');
	res.status(200).send(blob);
});

module.exports = app;
