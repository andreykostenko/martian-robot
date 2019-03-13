const lineReader = require('line-reader');
// const fs = require('fs');

const Surface = require('./surface.js');

let i = 0, currentRobot = null, surface = null;
lineReader.eachLine('instructions.txt', function (line, last) {
	if (i === 0) {
		surface = new Surface(line);
		console.log("Init surface")

	} else if (i % 2 !== 0) {
		currentRobot = surface.landRobot(line);
	} else {
		surface.runRobot(currentRobot, line, function (state) {
			console.log(state);
		});
	}

	if (last) {
		console.log('END');
	}

	i++;
});

