/*
* Author @ Rocco Musolino - Hackerstribe.com
*/

var Gpio = require('onoff').Gpio;
var exec = require('child_process').exec;
var config = require('./config.json'); // Configuration file

function execute(command, callback){ // Execute CLI cmds
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};





var pin = new Gpio(config.PIN_NUMBER, 'out'); // Check out RPi2 Pinout map

//pin.writeSync(1); // ON
//pin.writeSync(0); // OFF




function parse_temp(data){
	return data.substr(data.indexOf('=')+1, 4);
}

if (config.WEB_SERVER){
	var http = require('http');

	var server = http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  
	  execute('/opt/vc/bin/vcgencmd measure_temp', function(data){
	  	 pin.read(function(err, val){
	  	 	if (err) console.log('Error: '+ err);
		  	res.end('Current temperature: <b>'+parse_temp(data)+'</b> - Fan status: <b>'+((val == 1) ? 'on' : 'off')+'</b>');
		  });
	  });
	  
	})

	server.listen(4949, '127.0.0.1');

	console.log('Server running at http://127.0.0.1:4949/');
}


function exit() {
  pin.unexport(); // OFF and release the GPIO
  process.exit();
}

process.on('SIGINT', exit);
