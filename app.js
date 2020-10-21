const express = require('express');
const resum = require('./resume');
const app = express();
const checkSkillUnicity = (sk, skills) => {
	for(let i = 0; i < skills.length; i++) {
		if(skills[i].label === sk.label) {
			return false;
		}
	}

	return true;
};

const combineSkills = (resum) => {
	let skcmb = [];
	let now = Date.now();
	let effend;
	let ybase = 1000*60*60*24*365.15;

	resum.experiences.forEach((ex)=> {
		ex.skills.forEach((sk) => {
			let duration = 0;
			
			if(ex.pending) {
				effend = now;
			} else {
				effend = ex.end;
			}


			if(checkSkillUnicity(sk, skcmb)) {
				let initDuration = effend - ex.start;
				initDuration = Math.floor(initDuration/ybase);
				skcmb.push({ label: sk.label, start: ex.start, end: effend, duration: initDuration});
			} else {
				skcmb.forEach((item, index) => {
					if(item.label === sk.label) {
						if(skcmb[index].start > ex.start) {
							skcmb[index].start = ex.start;
						}
						if(skcmb[index].end < effend) {
							skcmb[index].end = effend;
						}
						
						let curDuration = skcmb[index].end - skcmb[index].start;
						skcmb[index].duration = Math.floor(curDuration/ybase);
					}
				});
			}
		});		
	});

	return skcmb;
};

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Contol-Allow-Methods', 'GET,POST');
	next();
});

app.get('/', (req, res, next) => {
	res.status(200).json(resum.identity);
});

app.get('/short', (req, res, next) => {
	let sh = [];
	resum.experiences.forEach((val, id) => {
		sh.push({ pending: val.pending, company: val.company, start: val.start, end: val.end, index: id });
	});
	res.status(200).json(sh);
});

app.get('/exp/:id', (req, res, next) => {
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

app.get('/stud', (req, res, next) => {
	res.status(200).json(resum.studies);
});

app.get('/lang', (req, res, next) => {
	res.status(200).json(resum.langs);
});

app.get('/skills', (req, res, next) => {
	let skcomb = combineSkills(resum);
	let ret = [];
	skcomb.forEach((item) => {
		if(item.duration > 0) {
			ret.push(item);
		}
	});
	res.status(200).json(ret);
});

module.exports = app;
