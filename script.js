var puzzleWidth = 20;
var puzzleHeight = 20;
function generatePuzzle() {
	let puzzleWidthValue = document.getElementById("puzzleWidth").value, puzzleHeightValue = document.getElementById("puzzleHeight").value;
	if (puzzleWidthValue != "") {
		puzzleWidth = parseInt(puzzleWidthValue);
	} else {
		puzzleWidth = 20;
	}
	if (puzzleHeightValue != "") {
		puzzleHeight = parseInt(puzzleHeightValue);
	} else {
		puzzleHeight = 20;
	}
	var puzzleMatrix = new Array(puzzleWidth);
	for (var i = 0; i < puzzleMatrix.length; i++) {
		puzzleMatrix[i] = new Array(puzzleHeight);
	}
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			puzzleMatrix[x][y] = {x: true, y: true, f: false, m: false};
		}
	}
	console.log(puzzleMatrix);
	var startingX = Math.floor(Math.random() * puzzleWidth), endingX;
	console.log("StartingX: " + startingX);
	var currentX = startingX, currentY = 0;
	puzzleMatrix[currentX][currentY].f = true;
	//puzzleMatrix[currentX][currentY].m = true;
	var filledAll = false;
	while (!filledAll) {
		// Get All Unfilled Tiles
		var unfilledItemsPuzzleMatrix = [];
		for (var x = 0; x < puzzleWidth; x++) {
			for (var y = 0; y < puzzleHeight; y++) {
				if (puzzleMatrix[x][y].f == false) {
					unfilledItemsPuzzleMatrix.push({x: x, y: y});
				}
			}
		}
		if (unfilledItemsPuzzleMatrix.length == 1) {
			filledAll = true;
		}
		console.log(unfilledItemsPuzzleMatrix);
		function shuffle(a) {
			var j, x, i;
			for (i = a.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = a[i];
				a[i] = a[j];
				a[j] = x;
			}
			return a;
		}
		// Find A Suitable Tile & Possible Stems For It
		unfilledItemsPuzzleMatrix = shuffle(unfilledItemsPuzzleMatrix);
		var unfilledItem;
		var directions = [];
		for (var i = 0; i < unfilledItemsPuzzleMatrix.length; i++) {
			var unfilledItemTemp = unfilledItemsPuzzleMatrix[i];
			if (unfilledItemTemp.y - 1 >= 0) { // North
				if (puzzleMatrix[unfilledItemTemp.x][unfilledItemTemp.y - 1].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("N");
				}
			}
			if (unfilledItemTemp.y + 1 < puzzleHeight) { // South
				if (puzzleMatrix[unfilledItemTemp.x][unfilledItemTemp.y + 1].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("S");
				}
			}
			if (unfilledItemTemp.x - 1 >= 0) { // East
				if (puzzleMatrix[unfilledItemTemp.x - 1][unfilledItemTemp.y].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("E");
				}
			}
			if (unfilledItemTemp.x + 1 < puzzleWidth) { // West
				if (puzzleMatrix[unfilledItemTemp.x + 1][unfilledItemTemp.y].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("W");
				}
			}
			if (unfilledItem != null) {
				break;
			}
		}
		console.log(unfilledItem);
		// Choose Direction
		var direction = directions[Math.floor(Math.random() * directions.length)];
		console.log("Dir: " + direction + "  Dirs: " + directions);
		switch (direction) {
			case "N":
				puzzleMatrix[unfilledItem.x][unfilledItem.y].f = true;
				puzzleMatrix[unfilledItem.x][unfilledItem.y].x = false;
				break;
			case "S":
				puzzleMatrix[unfilledItem.x][unfilledItem.y].f = true;
				puzzleMatrix[unfilledItem.x][unfilledItem.y + 1].x = false;
				break;
			case "E":
				puzzleMatrix[unfilledItem.x][unfilledItem.y].f = true;
				puzzleMatrix[unfilledItem.x][unfilledItem.y].y = false;
				break;
			case "W":
				puzzleMatrix[unfilledItem.x][unfilledItem.y].f = true;
				puzzleMatrix[unfilledItem.x + 1][unfilledItem.y].y = false;
				break;
		}
	}
	endingX = Math.floor(Math.random() * puzzleWidth);

	canvasDisplay(puzzleMatrix, startingX, endingX);
}

function canvasDisplay(puzzleMatrix, startingX, endingX) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	c.width = puzzleWidth * 50;
	c.height = puzzleHeight * 50;
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = "#000"; // Black Stroke Colour
	//ctx.fillStyle = "#000"; // Black Fill Colour
	ctx.fillStyle = "#044"; // My-Cyan Fill Colour
	//ctx.fillStyle = "blue"; // Blue Fill Colour
	//ctx.fillStyle = "rgb(255, 127, 126)"; // Pink Fill Colour
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
	ctx.rect(1.25, 1.25, c.width - 2.5, c.height - 2.5);
	ctx.stroke();
	ctx.clearRect(startingX * 50 + 1.25, 0, 50 - 2.5, 3.75);
	ctx.clearRect(endingX * 50 + 1.25, c.height - 3.75, 50 - 2.5, 3.75);
	// Option To Save As Unanswered Image
	var imagePng = c.toDataURL('image/png');
	document.getElementById("imageDownload").href = imagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	// Individual-Box Marking System
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].m == true) {
				ctx.beginPath();
				ctx.fillRect(x * 50 + 12.5, y * 50 + 12.5, 25, 25);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
	// Option To Save As Answered Image
	var answeredImagePng = c.toDataURL('image/png');
	document.getElementById("answeredImageDownload").href = answeredImagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

generatePuzzle(); // TEMP: Just For Development Ease
