

class Robot {
	constructor(x, y, orientation) {
		this.x = x;
		this.y = y;
		this.orientation = orientation;
		this.state = 1;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

}








module.exports = Robot;
