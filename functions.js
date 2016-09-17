var fs = require('fs');
var exec = require('child_process').exec;
var moment = require('moment');
var config = require('./config.json');

// Execute CLI cmds
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

// Parse Temperature
function parse_temp(data){
	return data.substr(data.indexOf('=')+1, 4);
}

// Check if a file exists
function _fileExists(filePath){
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

// Get Logs
function getLogs(){
	var filePath = '/tmp/fan_output';
	if (_fileExists(filePath))
		return fs.readFileSync(filePath, "utf8");
	else
		return "No Logs in "+filePath;
}

// Function to replace all occurrencies in a given string
function replaceAll(str, find, replace) {
  	return str.replace(new RegExp(find, 'g'), replace);
}

// Check if the fans can spin in the current timestamp
function allowedInterval(now){
	if (!moment(now).isValid()) return false;
	var start_at = moment(config.FORBIDDEN_INTERVAL.hour, 'h:mm');
	var until = moment(start_at).add(config.FORBIDDEN_INTERVAL.interval, 'hours');
	if (moment(now).isBetween(start_at, until))
		return false;
	else
		return true;
}

// Exporting the functions
exports.execute = execute;
exports.parse_temp = parse_temp;
exports.getLogs = getLogs;
exports.replaceAll = replaceAll;
exports.allowedInterval = allowedInterval;
