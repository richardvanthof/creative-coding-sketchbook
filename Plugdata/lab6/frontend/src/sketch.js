let rows = 25;
let angle = 0;
let angleSpeed = 0;
function setup() {
  createCanvas(800, 800);
  colorMode(HSL);
  angleMode(DEGREES)
  setupOsc(4000, 5000);
}

function draw() {
  let c1 = color(10, 82, 54);
  let c2 = color(335, 67, 77);

  // Gradient drawer for a rectangle area
  const createGradient = (x, y, w, h, c1, c2) => {
    for (let i = 0; i < w; i++) {
      const progress = i / w;
      const c = lerpColor(c1, c2, progress);
      //push()
      rotate(angle)
      noStroke();
      fill(c);
      rect(x + i, y, x+1, h);
      //pop()
    }
  }

  const rowHeight = height / rows;

  for (let row = 0; row < rows; row++) {
    const colAmount = row * 2 || 1; // avoid 0 cols on first row
    const colWidth = width / colAmount;

    for (let col = 0; col < colAmount; col++) {
      createGradient(
        col * colWidth,           // x
        row * rowHeight,          // y
        colWidth,                 // width
        rowHeight,                // height
        col % 2 === 0 ? c1 : c2,
        col % 2 === 0 ? c2 : c1,
      );
    }
  }

  angle = (angle + angleSpeed) % 360;
}

// OSC functions
function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

	if (address == '/1/speed') {
		angleSpeed = value[0];
	}

  if (address == '/1/scale') {
    rows = Math.floor(value[0] * 20) + 1; 
    console.log(rows);
  }
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
    console.log(socket, {oscPortIn, oscPortOut});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}
