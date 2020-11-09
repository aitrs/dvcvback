const resume = {
	identity: {
		name: "VUOLO",
		firstname: "Dorian",
		avatar: "static/imgs/avatar.jpg",
		birthdate: Date.parse("1988-04-13"),
		drivelicences: ["B"],
		address: "12 Bd Etienne Boyer",
		zip: "13530",
		town: "Trets",
		country: "France",
		email: "dorian.vuolo@gmail.com",
		phone: "...only via email :)",
		nationality: "French",
		website: "Look at your URL bar !!!",
		presentationLines: [
			"Fullstack Dev & Musician/Composer",
			"Worked mostly on Enterprise Softwares (but gets quite tired of it !)",
			"Quite good at back-end development, but also likes front (as you can see on this page)",
			"I like to be concise when I introduce myself so I won't write lots of lines here."
		]
	},
	experiences: [
		{
			pending: true,
			company: "SELECT Informatique",
			start: Date.parse("2019-04-01"),
			end: null,
			descriptionLines: [
				"Mostly back-end and system development revolving around a Laboratory Information System (LIS).",
				"Managing evolutions and client requests",
				"Some sysadmin",
				"In-site deployment",
				"Virtualization"
			],
			skills: [
				{ label: "C/C++", main: true },
				{ label: "PL/SQL", main: true },
				{ label: "Postgres", main: true },
				{ label: "Node.js", main: true },
				{ label: "Linux", main: true },
				{ label: "Red Hat", main: false },
				{ label: "Qt", main: false },
				{ label: "KVM", main: true },
				{ label: "Oracle", main: false },
				{ label: "Perl", main: true },
				{ label: "Bison/Flex", main: true },
				{ label: "Bash", main: false },
				{ label: "Angular", main: true}
			]
		}, 
		{
			pending: true,
			company: "Musician/Audiovisual Creator",
			start: Date.parse("2010-01-01"),
			end: null,
			descriptionLines: [
				"As a musician/composer/creator I wrote a lot of code to create my own composing tools.",
				"Wrote software synthesizers in C++ using Steinberg's VSTSDK",
				"Audio generation and audio convolution scripts using Python3",
				"Multimedia dataflow programming in C/Pure Data",
				"Embedded synthesizers on Axoloti DSP boards in C",
				"MIDI and OSC controlling devices using an Arduino board (C)",
				"Node.js/Angular tools to have graphical control over this ecosystem of softwares and devices"
			],
			skills: [
				{ label: "C/C++", main: true },
				{ label: "Python", main: true },
				{ label: "Javascript", main: false },
				{ label: "Linux", main: true },
				{ label: "Pure Data", main: true },
				{ label: "Bash", main: false }
			]
		},
		{
			pending: false,
			company: "Small freelance works",
			start: Date.parse("2019-02-01"),
			end: Date.parse("2019-04-01"),
			descriptionLines: [
				"Small works for small modules or evolutions on several client's websites"
			],
			skills: [
				{ label: "MySQL", main: true },
				{ label: "PHP", main: true },
				{ label: "Javascript", main: true },
				{ label: "JQuery", main: true },
				{ label: "Wordpress", main: false },
				{ label: "Prestashop", main: false },
				{ label: "SEO", main: false }
			]
		},
		{
			pending: false,
			company: "SUDERIANE",
			start: Date.parse("2016-11-01"),
			end: Date.parse("2018-02-01"),
			descriptionLines: [
				"New functionalities on a big Warehouse Management System"
			],
			skills: [
				{ label: "C#", main: true },
				{ label: ".NET", main: true },
				{ label: "Javascript", main: true },
				{ label: "JQuery", main: true },
				{ label: "Transact-SQL", main: true },
				{ label: "Node.js", main: false },
				{ label: "Angular", main: false }
			]
		},
		{
			pending: false,
			company: "SYNTHES'3D",
			start: Date.parse("2011-02-01"),
			end: Date.parse("2013-08-01"),
			descriptionLines: [
				"R+D around 3D on the web.",
				"iPad app development of b2b 3D viewers"
			],
			skills: [
				{ label: "Javascript", main: true },
				{ label: "JQuery", main: true },
				{ label: "WebGL", main: true },
				{ label: "PHP", main: false },
				{ label: "Unity3D", main: true },
				{ label: "C/C++", main: false },
				{ label: "C#", main: true },
				{ label: "SQL", main: false }
			]
		},
	],
	studies: [
		{
			diploma: "Excellence (Music/Arts)",
			univ: "NGT Drum School, Aix-En-Provence, France",
			year: "2015"
		},
		{
			diploma: "DUT GEII",
			univ: "IUT Saint-Jérôme, Marseille, France",
			year: "2009"
		},
	],
	langs: [
		{ label: "French", level: "Native" },
		{ label: "English", level: "Technical, good" },
		{ label: "Spanish", level: "Basic" }
	]
}

module.exports = resume;
