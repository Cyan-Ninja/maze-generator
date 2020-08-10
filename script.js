var puzzleWidth = 10;
var puzzleHeight = 10;
var puzzleFont = "Arial";
function generatePuzzle() {
	var puzzleMatrix = new Array(puzzleWidth);
	for (var i = 0; i < puzzleMatrix.length; i++) {
		puzzleMatrix[i] = new Array(puzzleHeight);
	}
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			puzzleMatrix[x][y] = {x: Math.random() < 0.5, y: Math.random() < 0.5};
		}
	}
	console.log(puzzleMatrix);
	var startingX = Math.floor(Math.random() * puzzleWidth);
	console.log("StartingX: " + startingX);
	var currentX = startingX, currentY = 0;
	var atBottom = false;
	while (!atBottom) {
		// Get Directions
		var directions = [];
		if (currentY != 0) {
			directions.push("N");
		}
		if (currentX != 0) {
			directions.push("E");
		}
		if (currentX != puzzleWidth - 1) {
			directions.push("W");
		}
		directions.push("S");
		// Get Direction
		var direction = directions[Math.floor(Math.random() * directions.length)];
		console.log("Dir: " + direction + "  Dirs: " + directions);
		// Actually Do In That Direction
		switch (direction) {
			case "N":
				puzzleMatrix[currentX][currentY].x = false;
				currentY -= 1;
				break;
			case "E":
				puzzleMatrix[currentX][currentY].y = false;
				currentX -= 1;
				break;
			case "W":
				puzzleMatrix[currentX + 1][currentY].y = false;
				currentX += 1;
				break;
			case "S":
				if (currentY == puzzleHeight - 1) {
					atBottom = true;
					break;
				} else {
					puzzleMatrix[currentX][currentY + 1].x = false;
					currentY += 1;
					break;
				}
			default:
				direction = "S";
				if (currentY == puzzleHeight - 1) {
					atBottom = true;
					break;
				} else {
					puzzleMatrix[currentX][currentY + 1].x = false;
					currentY += 1;
					break;
				}
		}
		//

		canvasDisplay(puzzleMatrix);

		//atBottom = true; // TEMP: Just For Development
	}
}

function canvasDisplay(puzzleMatrix) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	c.width = puzzleWidth * 50;
	c.height = puzzleHeight * 50;
	ctx.clearRect(0, 0, c.width, c.height);
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].x == true) {
				ctx.beginPath();
				ctx.moveTo(x * 50, y * 50);
				ctx.lineTo(x * 50 + 50, y * 50);
				ctx.stroke();
				ctx.closePath();
			}
			if (puzzleMatrix[x][y].y == true) {
				ctx.beginPath();
				ctx.moveTo(x * 50, y * 50);
				ctx.lineTo(x * 50, y * 50 + 50);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
}

generatePuzzle(); // TEMP: Just For Development
