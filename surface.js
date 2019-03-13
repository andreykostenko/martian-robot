const Robot = require('./robot.js');

class Surface {

	constructor(upperRightCoordinates) {
		let [x, y] = upperRightCoordinates.split(' ');

		this.x0 = 0;
		this.y0 = 0;

		this.x = Number(x);
		this.y = Number(y);

		this.fatalMoves = [];

		this.possibleMoves = {
			L: this.turn.bind(this, 'L'),
			R: this.turn.bind(this, 'R'),
			F: this.stepForward.bind(this)
		};

		this.orientations = [
			'N',
			'E',
			'S',
			'W'
		];
	}

	landRobot(initialPosition) {
		// get x y dir from initialPosition

		let [x, y, dir] = initialPosition.split(' ');

		x = Number(x);
		y = Number(y);

		if (this.robotIsLost(x, y)) {
			throw new Error("Landing out of surface boundaries");
		}

		let orientation = this.orientations.indexOf(dir);

		if (orientation < 0 || orientation > 3) {
			orientation = 0;
		}

		return new Robot(x, y, orientation);
	}

	runRobot(robot, movesString, done) {

		for (let i = 0; i < movesString.length; i++) {
			let currentMove = this.possibleMoves[movesString[i]];

			if (currentMove) {
				if (!currentMove(robot)) {
					break;
				}
			}

		}

		done(`${robot.x} ${robot.y} ${this.orientations[robot.orientation]}${robot.state === 2 ? ' LOST' : ''}`);
	}

	turn(direction, robot) {

		let {orientation} = robot;

		if (direction === 'L') {
			orientation--;
		} else if (direction === 'R') {
			orientation++;
		}
		if (orientation < 0) {
			orientation = 3;
		} else if (orientation > 3) {
			orientation = 0;
		}
		robot.orientation = orientation;

		return true;
	}

	stepForward(robot) {
		let {x, y} = robot;

		switch (robot.orientation) {
			case 0:
				y++;
				break;
			case 1:
				x++;
				break;
			case 2:
				y--;
				break;
			case 3:
				x--;
				break;
		}

		if (!this.robotToBeLost(x, y)) {
			robot.set(x, y);

			if (this.robotIsLost(x, y)) {
				this.fatalMoves.push(`${x} ${y}`);
				robot.state = 2;
				return false;
			}
		}

		//console.log(`F: ${robot.x} ${robot.y} ${this.orientations[robot.orientation]}${robot.state === 2 ? ' LOST' : ''}`); // For debug

		return true;
	}

	robotIsLost(x, y) {
		return x < this.x0 || x > this.x || y < this.y0 || y > this.y
	}

	robotToBeLost(x, y) {
		return this.fatalMoves.indexOf(`${x} ${y}`) >= 0;
	}

}

module.exports = Surface;