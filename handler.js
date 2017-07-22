// jshint node: true, esversion: 6

'use strict';

const child_process = require('child_process');

module.exports.handle = (event, context, callback) => {

  let response = '';

  // When using 'serverless invoke local' use the system PHP binary instead
  const php = typeof process.env.PWD !== "undefined" ? 'php' : './php';

  // Build the context object data
  const contextData = {};
  Object.keys(context).forEach(function(key) {
    if (typeof context[key] !== 'function') {
      contextData[key] = context[key];
    }
  });

  // Launch PHP
  const args = ['handler.php', JSON.stringify(event), JSON.stringify(contextData)];
  const options = {'stdio': ['pipe', 'pipe', 'pipe', 'pipe']};
  const proc = child_process.spawn(php, args, options);

  // Request for remaining time from context
  proc.stdio[3].on('data', function (data) {
    const remaining = context.getRemainingTimeInMillis();
    proc.stdio[3].write(`${remaining}\n`);
  });

  // Output
  proc.stdout.on('data', function (data) {
    response += data.toString();
  });

  // Logging
  proc.stderr.on('data', function (data) {
    console.log(`${data}`);
  });

  // PHP script execution end
  proc.on('close', function(code) {
    if (code !== 0) {
      return callback(new Error(`Process error code ${code}: ${response}`));
    }

    callback(null, JSON.parse(response));
  });
};
