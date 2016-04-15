var argv = require('yargs')
  .usage('Usage: node index.js -t [temperature] -p [serverPort] -n [gpioPin]')
  .help('help')
  .alias('help', 'h')
  .option('pin', {
        alias: 'n',
        demand: false,
        describe: 'GPIO pin number',
        type: 'number'
    })
  .option('temperature', {
        alias: 't',
        demand: false,
        describe: 'Temperature threshold to activate the fan',
        type: 'number'
    })
  .option('port', {
        alias: 'p',
        demand: false,
        describe: 'HTTP Server Port.',
        type: 'number'
    })
  .option('refreshtime', {
        alias: 'r',
        demand: false,
        describe: 'Refresh time in seconds',
        type: 'number'
    })
  .example('node index.js -n 18', 'Choose the GPIO number')
  .example('node index.js -p 4949', 'Start the server on port 4949')
  .example('node index.js -t 45', 'Set a temperature threshold of 45 degrees')
  .example('node index.js -r 60', 'Check the temperature every 60 seconds')
  .epilogue('@Author: Rocco Musolino - github.com/roccomuso/rpi-fan - @Copyright 2016')
  .argv;

//console.log(argv);

module.exports = argv;