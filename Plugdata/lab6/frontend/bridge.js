var osc = require('node-osc');
var io = require('socket.io')(8081);
const http = require('http');
const fs = require('fs');
const path = require('path');
var oscServer, oscClient;

// Create a server object
const server = http.createServer((req, res) => {
	let filePath = req.url;
	if (filePath == '/') {
		filePath = 'index.html';
	}

	// Make sure filePath is relative and doesn't go up directories
	filePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
	filePath = path.join(__dirname, 'src', filePath);

	const extname = String(path.extname(filePath)).toLowerCase();
	const mimeTypes = {
		'.html': 'text/html',
		'.js': 'application/javascript',
		'.css': 'text/css',
	};

	const contentType = mimeTypes[extname] || 'application/octet-stream';

	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code == 'ENOENT') {
				res.writeHead(404);
				res.end(`File not found: ${req.url}`);
			} else {
				res.writeHead(500);
				res.end(`Server error: ${err.code}`);
			}
			return;
		}
		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	});
});

// Specify the port on which the server will listen
const port = 8080;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Sever running on http://localhost:${port}/`);
});

var isConnected = false;
console.log(`OSC bridge running on http://localhost:8081`);
io.sockets.on('connection', function (socket) {
	console.log('connection');
	socket.on("config", function (obj) {
		isConnected = true;
    	oscServer = new osc.Server(obj.server.port, obj.server.host);
	    oscClient = new osc.Client(obj.client.host, obj.client.port);
	    oscClient.send('/status', socket.sessionId + ' connected');
		oscServer.on('message', function(msg, rinfo) {
			socket.emit("message", msg);
		});
		socket.emit("connected", 1);
	});
 	socket.on("message", function (obj) {
		oscClient.send.apply(oscClient, obj);
  	});
	socket.on('disconnect', function(){
		if (isConnected) {
			oscServer.kill();
			oscClient.kill();
		}
  	});
});