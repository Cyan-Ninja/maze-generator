var puzzleWidth = 20;
var puzzleHeight = 20;
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
		var direction = directions[Math.floor(Math.random() * directions.length)];
		console.log("Dir: " + direction + "  Dirs: " + directions);
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

		canvasDisplay(puzzleMatrix);

		//atBottom = true; // TEMP: Just For Development
	}
}

function canvasDisplay(puzzleMatrix) {
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			// CODE HERE
		}
	}
}

generatePuzzle(); // TEMP: Just For Development
