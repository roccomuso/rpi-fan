var fs = require('fs');
var exec = require('child_process').exec;

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

// Exporting the functions
exports.execute = execute;
exports.parse_temp = parse_temp;
exports.getLogs = getLogs;
exports.replaceAll = replaceAll;
