/*
* Author @ Rocco Musolino - Hackerstribe.com
*/

var Gpio = require('onoff').Gpio;
var exec = require('child_process').exec;
var config = require('./config.json'); // Configuration file

function execute(command, callback){ // Execute CLI cmds
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function parse_temp(data){
	return data.substr(data.indexOf('=')+1, 4);
}



var pin = new Gpio(config.PIN_NUMBER, 'out'); // Check out RPi2 Pinout map


// Start Loop
(
function loop(){
	var iter = setInterval(function(){
		execute('/opt/vc/bin/vcgencmd measure_temp', function(data){
			if (parse_temp(data) >= config.TEMPERATURE_THRESHOLD){
				pin.read(function(err, value){
					if (value == 0){ 
						pin.writeSync(1); // ON
						console.log(new Date().toString(), ' - Fan ON!');
					}
				});		
				clearInterval(iter);
				setTimeout(loop, 300 * 1000); // Fan on at least for 5 minutes 
			}else{
				pin.read(function(err, value){
					if (value == 1){
						pin.writeSync(0); // OFF
						console.log(new Date().toString(), ' - Fan OFF!');
					}
				});
			}
		});
	}, config.REFRESH_TIME * 1000);
}()
);

// Web Server

if (config.WEB_SERVER){
	var http = require('http');

	var server = http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  
	  execute('/opt/vc/bin/vcgencmd measure_temp', function(data){
	  	 pin.read(function(err, val){
	  	 	if (err) console.log('Error: '+ err);
		  	res.end('Current temperature: <b>'+parse_temp(data)+'</b> - Fan status: <b>'+((val == 1) ? 'on' : 'off')+'</b>');
		  });
	  });
	  
	})

	server.listen(config.SERVER_PORT, '0.0.0.0');

	console.log('Fan server running at http://0.0.0.0:'+config.SERVER_PORT+'/');
}


function exit() {
  pin.unexport(); // OFF and release the GPIO
  process.exit();
}

process.on('SIGINT', exit);