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
	let ybase = 1000*60*60*24*365.25;

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
	skcmb.sort((a,b) => {
		return b.duration - a.duration;
	});
	return skcmb;
};

module.exports = combineSkills;
