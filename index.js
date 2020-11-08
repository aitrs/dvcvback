const http = require('http');
const app = require('./app');
const nport = (val) => {
	const p = parseInt(val, 10);

	if(isNaN(p)) {
		return val;
	}

	if(p > 0) {
		return p;
	}

	return false;
}

const port = nport(process.env.PORT || 8080);
app.set('port', port);

const server = http.createServer(app);

const errHandler = (err) => {
        if (err.syscall !== 'listen') {
                throw err;
        }

        const addr = server.address();
        const bind = typeof address === 'string' ? 'pipe '+addr : 'port: '+port;

        switch(err.code) {
                case 'EACCESS':
                        console.error(bind+' operation not allowed');
                        process.exit(1);
                        break;
                case 'EADDRINUSE':
                        console.error(port+' already in use');
                        process.exit(1);
                        break;
                default:
                        throw err;
        }
};

server.on('error', errHandler);
server.on('listening', () => {
	const addr = server.address();
	const bind = typeof address === 'string' ? 'pipe '+addr : 'port: '+port;
	console.log('Listening on '+bind);
});
server.on('close', () => {
	console.log('Stopping');
});
process.on('SIGINT', () => {
	server.close(() => { process.exit(0); });
});

server.listen(port);


