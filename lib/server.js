var connection = new (require('./connection'));
var command = new (require('./commands'))(connection);
var express = require("express");
var app = express();

process.stdin.resume();
process.stdin.setEncoding('utf8');

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

app.get('/api', function (req, res) {
  res.send('Denon API is running');
});

app.get('/api/:command', function (req, res) {
	  
	connection.connect(process.argv[2] || "192.168.2.180", 23, function() {
		//console.log("DEBUG "+ process.argv[2]  + " connected");
	  return process.stdout.write("connected to the receiver\r");
	});
	var param;
	//davidcreager changed Nov 2021   Couldn't see how to pass the / for sat/cbl 
	var command = req.params.command.toUpperCase();
	if (command=="SISAT") command = "SISAT/CBL";
	try{
		const retVal = connection.send(command, param);
		//davidcreager changed Nov 2021   this should be returing an http status   Needs to handle true errors!
		//return res.sendStatus(connection.send(req.params.command.toUpperCase(), param)); 
		return res.status(200).send("Retval = " + retVal);
	}
	catch (ex) {
		return res.send('Unable to process command: ' + ex);
	}
	
  //res.send('Denon API is running');
});

app.listen(process.argv[3] || 8000);

process.stdin.on('data', function(chunk) {
  var cmd, param, ref;
  ref = chunk.split(" ").map(function(val) {
    return val.trim();
  }), cmd = ref[0], param = ref[1];
  if (command[cmd]) {
    return command[cmd](param);
  } else {
	try{
		return connection.send(cmd.toUpperCase(), param);		
	}
    catch (ex){
		connection.connect(process.argv[2] || "192.168.2.180", 23, function() {
		  return process.stdout.write("connected to the receiver\r");
		});
		return connection.send(cmd.toUpperCase(), param);
	}
  }
});

connection.response(function(cmd, value) {
  var index, line, results;
  if (cmd === 'info') {
    results = [];
    for (index in value) {
      line = value[index];
      results.push(process.stdout.write("- " + (line.trim()) + "\n"));
    }
    return results;
  } else {
    return process.stdout.write("- " + cmd + ": " + value + "\r");
  }
});