const PDFDocument = require('pdfkit');
const getStream = require('get-stream');
const resum = require('./resume');
const combineSkills = require('./combineskills');
let curY = 0;
const ybase = 1000*60*60*24*365.25;
const formatMonth = (m) => {
	let ret = '';
	m < 10 ? ret += '0' + m : ret += m;
	return ret;
}

const style = {
	limits: {
		minX: 60,
		maxX: 550,
		minY: 60,
	},
	text: {
		defaultColor: 'black',
		bubbleColor: '#1f6594',
	},
	graphics: {
		defaultColor: '#a3bccf'
	},
	circles: {
		x1: 100,
		x2: 200,
		y: 100,
		radius: 40
	},
	headSeparator: {
		y: 150
	},
	info: {
		width: 120,
		height: 100,
		align: 'right',
		color: '#a3bccf',
		fontSize: 10,
		marginTop: 20
	},
	skills: {
		width: 400,
		height: 100
	},
	we: {
		titleBackgroundColor: '#c7dded',
		titleWidth: 200,
		titleHeight: 15,
		datesColor: '#798994',
		marginLeft: 100,
		datesIndent: 10,
		skillsColor: '#1f6594',
		skillsWidth: 400,
		skillHeight: 40
	}
}

const printHead = (doc) => {
	doc.save();
	doc.circle(
		style.circles.x1, 
		style.circles.y, 
		style.circles.radius
	).clip();
	doc.image(
		'public/imgs/avatar.jpg', 
		style.circles.x1 - style.circles.radius,
		style.circles.y - style.circles.radius, 
		{ 
			width: style.circles.radius*2, 
			height: style.circles.radius*2
		}
	);
	doc.restore();
	doc.save();
	doc.circle(
		style.circles.x2, 
		style.circles.y, 
		style.circles.radius
	).fill(style.graphics.defaultColor);
	doc.restore();
	doc.save();
	doc.text(resum.identity.firstname+'\n'+resum.identity.name, style.circles.x2 - style.circles.radius, style.circles.radius*2 + 7, {
		width: style.circles.radius*2,
		height: style.circles.radius*2,
		align: 'center'
	});
	doc.restore();
	doc.save();
	doc.moveTo(style.limits.minX, style.headSeparator.y);
	doc.lineTo(style.limits.maxX, style.headSeparator.y).stroke(style.graphics.defaultColor);
	curY = style.headSeparator.y + 1;
	doc.restore();
}

const printSection = (doc, title, cb) => {
	doc.save();
	curY += 5;
	curY += style.circles.radius;
	doc.circle(
		style.circles.x1, 
		curY, 
		style.circles.radius
	).fill(style.graphics.defaultColor);
	doc.restore();
	doc.save();
	curY -= 6;
	doc.fontSize(12);
	doc.fillColor(style.text.bubbleColor).text(title, style.circles.x1 - style.circles.radius, curY, {
		width: style.circles.radius*2,
		height: style.circles.radius*2,
		align: 'center'
	});	
	doc.restore();
	doc.save();
	doc.fontSize(10);
	cb();
	doc.restore();
	doc.save();
	doc.moveTo(style.limits.minX, curY + 2);
	doc.lineTo(style.limits.maxX, curY + 2).stroke(style.graphics.defaultColor);
	curY += 3;
	doc.restore();
}

const printSkills = (doc) => {
	printSection(doc, 'Skills', () => {
		let text = '';
		let skcomb = combineSkills(resum);
		skcomb.forEach((sk) => {
			if(sk !== undefined) {
				if(sk.duration > 0) {
					sk.duration === 1 ? text += sk.label + '  (' + sk.duration + ' year)\n' : text += sk.label + '  (' + sk.duration + ' years)\n';
				}
			}
		});
		doc.text(
			text, 
			((style.limits.maxX - style.limits.minX)/2) - style.skills.width/4, 
			curY, 
			{
				columns: 3,
				columnGap: 15,
				height: style.skills.height,
				width: style.skills.width,
				align: 'justify'
			}
		);
		curY += style.skills.height + 1;
	});
}

const printStudies = (doc) => {
	printSection(doc, 'Studies', () => {
		resum.studies.forEach((s) => {
			if (curY >= doc.page.height - 100) {
				doc.addPage();
				curY = style.limits.minY;
			}
			doc.rect(
				style.limits.minX + style.we.marginLeft,
				curY,
				style.we.titleWidth,
				style.we.titleHeight
			).fill(style.we.titleBackgroundColor);
			doc.save();
			doc.restore();
			doc.fontSize(12);
			doc.fillColor(style.text.defaultColor).text(s.diploma, style.limits.minX + style.we.marginLeft + 10, curY+3, {
				width: style.we.titleWidth,
				height: style.we.titleHeight,
				align: 'center'
			});
			curY += style.we.titleHeight + 3;
			doc.save();
			doc.restore();
			let subText = s.univ+' '+s.year;
			doc.fontSize(10);
			doc.fillColor(style.we.datesColor).text(
				subText,
				style.limits.minX + style.we.marginLeft + style.we.datesIndent,
				curY 
			);
			curY += doc.heightOfString(subText) + 10;
		});
	});
}

const printLanguages = (doc) => {
	printSection(doc, 'Lang', () => {
		let txt = '';
		if (curY >= doc.page.height - 100) {
			doc.addPage();
			curY = style.limits.minY;
		}
		resum.langs.forEach((l) => {
			txt += l.label + ' (level : ' + l.level +')\n';
		});
		doc.fillColor(style.text.bubbleColor).text(
			txt,
			style.limits.minX + style.we.marginLeft,
			curY
		);
		curY += doc.heightOfString(txt)+15;
	});
}

const printWorkExperience = (doc) => {
	printSection(doc, 'Works', () => {
		resum.experiences.forEach((exp) => {
			if (curY >= doc.page.height - 100) {
				doc.addPage();
				curY = style.limits.minY;
			}
			doc.rect(
				style.limits.minX + style.we.marginLeft,
				curY,
				style.we.titleWidth,
				style.we.titleHeight
			).fill(style.we.titleBackgroundColor);
			doc.save();
			doc.restore();
			doc.fontSize(12);
			doc.fillColor(style.text.defaultColor).text(exp.company, style.limits.minX + style.we.marginLeft + 10, curY+3, {
				width: style.we.titleWidth,
				height: style.we.titleHeight,
				align: 'center'
			});
			curY += style.we.titleHeight + 3;
			doc.save();
			doc.restore();
			doc.fontSize(8);
			if(exp.pending) {
				let dtstart = new Date(exp.start);
				let dtstr = 'Since ';
				dtstr += (formatMonth(dtstart.getMonth()+1)) + '/' + dtstart.getFullYear();
				doc.fillColor(style.we.datesColor).text(
					dtstr,
					style.limits.minX + style.we.marginLeft + style.we.datesIndent,
					curY 
				);
			} else {
				let dtstart = new Date(exp.start);
				let dtend = new Date(exp.end);
				dtstr = 'From ';
				dtstr += formatMonth(dtstart.getMonth()+1) + '/' + dtstart.getFullYear() +' ';
				dtstr += 'to ';
				dtstr += formatMonth(dtend.getMonth()+1) + '/' + dtend.getFullYear();
				doc.fillColor(style.we.datesColor).text(
					dtstr,
					style.limits.minX + style.we.marginLeft + style.we.datesIndent,
					curY 
				);
			}
			curY += 10;
			doc.save();
			doc.restore();
			let desc = '';
			doc.fontSize(10);
			exp.descriptionLines.forEach((line) => {
				desc += line + '\n';
			});

			let skills = '\n\n';

			exp.skills.forEach((sk) => {
				skills += sk.label + '   ';
			});
			doc.fillColor(style.text.defaultColor).text(
				desc,
				style.limits.minX + style.we.marginLeft,
				curY,
				{
					continued: true
				}
			).fillColor(style.we.skillsColor).text(
				skills,
			);
			
			curY += doc.heightOfString(desc + skills);
		});
	});
}

const printContact = (doc) => {
	let text = resum.identity.address+'\n';
	let now = Date.now();
	let age = Math.floor((now - resum.identity.birthdate)/ybase);
	text += resum.identity.zip+' '+resum.identity.town+'\n';
	text += resum.identity.country+'\n';
	text += resum.identity.email+'\n';
	text += 'Age: '+age+'\n';
	text += 'Driving Licences : ';
	for(let i = 0; i < resum.identity.drivelicences.length; i++) {
		text += resum.identity.drivelicences[i];
		if(i+1 < resum.identity.drivelicences.length) {
			text += ', ';
		}
	}
	doc.save();
	doc.fontSize(style.info.fontSize);
	doc.fillColor(style.info.color).text(
		text, 
		style.limits.maxX - style.info.width,
		style.limits.minY + style.info.marginTop,
		{
			width: style.info.width,
			height: style.info.height,
			align: style.info.align
		}
	);
	doc.restore();
}


const pdf = async () => {
	let doc = new PDFDocument;
	curY = style.limits.minY;
	printHead(doc);
	printContact(doc);
	printSkills(doc);
	printWorkExperience(doc);
	printStudies(doc);
	printLanguages(doc);
	doc.end();
	return await getStream.buffer(doc);
};

module.exports = pdf;
