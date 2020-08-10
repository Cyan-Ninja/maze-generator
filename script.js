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
	console.log(startingX);
	var currentX = startingX, currentY = 0;
	var atBottom = false;
	while (!atBottom) {
		var directions = [];

		atBottom = true; // TEMP: Just For Development
	}
}

generatePuzzle(); // TEMP: Just For Development
