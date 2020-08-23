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
			puzzleMatrix[x][y] = {x: true, y: true, f: false, m: false, d: ""};
		}
	}
	console.log(puzzleMatrix);
	var startingX = Math.floor(Math.random() * puzzleWidth), endingX;
	console.log("StartingX: " + startingX);
	var currentX = startingX, currentY = 0;
	puzzleMatrix[currentX][currentY].f = true;
	puzzleMatrix[currentX][currentY].m = true;
	var atBottom = false;
	while (!atBottom) {
		// Get Directions
		var directions = [];
		if (currentY != 0 && puzzleMatrix[currentX][currentY - 1].f == false) { // North
			if (puzzleMatrix[currentX][currentY - 1].m == false) {
				var partsNumValue = document.getElementById("nParts").value;
				var partsNum = 1;
				if (partsNumValue != "") {
					partsNum = parseInt(partsNumValue);
					console.log(partsNumValue);
				}
				for (var i = 0; i < partsNum; i++) {
					directions.push("N");
				}
			}
		}
		if (currentX != 0 && puzzleMatrix[currentX - 1][currentY].f == false) { // West
			if (puzzleMatrix[currentX - 1][currentY].m == false) {
				var partsNumValue = document.getElementById("eParts").value;
				var partsNum = 2;
				if (partsNumValue != "") {
					partsNum = parseInt(partsNumValue);
				}
				for (var i = 0; i < partsNum; i++) {
					directions.push("W");
				}
			}
		}
		if (currentX != puzzleWidth - 1 && puzzleMatrix[currentX + 1][currentY].f == false) { // East
			if (puzzleMatrix[currentX + 1][currentY].m == false) {
				var partsNumValue = document.getElementById("wParts").value;
				var partsNum = 2;
				if (partsNumValue != "") {
					partsNum = parseInt(partsNumValue);
				}
				for (var i = 0; i < partsNum; i++) {
					directions.push("E");
				}
			}
		}
		if (true) { // South
			var partsNumValue = document.getElementById("sParts").value;
			var partsNum = 1;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("S");
			}
		}
		// Get Direction
		var direction = directions[Math.floor(Math.random() * directions.length)];
		console.log("Dir: " + direction + "  Dirs: " + directions);
		// Actually Do In That Direction
		switch (direction) {
			case "N":
				puzzleMatrix[currentX][currentY].f = true;
				puzzleMatrix[currentX][currentY - 1].m = true;
				puzzleMatrix[currentX][currentY].x = false;
				currentY -= 1;
				break;
			case "W":
				puzzleMatrix[currentX][currentY].f = true;
				puzzleMatrix[currentX - 1][currentY].m = true;
				puzzleMatrix[currentX][currentY].y = false;
				currentX -= 1;
				break;
			case "E":
				puzzleMatrix[currentX][currentY].f = true;
				puzzleMatrix[currentX + 1][currentY].m = true;
				puzzleMatrix[currentX + 1][currentY].y = false;
				currentX += 1;
				break;
			case "S":
				if (currentY == puzzleHeight - 1) {
					atBottom = true;
					endingX = currentX;
					break;
				} else {
					puzzleMatrix[currentX][currentY].f = true;
					puzzleMatrix[currentX][currentY + 1].m = true;
					puzzleMatrix[currentX][currentY + 1].x = false;
					currentY += 1;
					break;
				}
		}
		puzzleMatrix[currentX][currentY].d = direction;
	}
	// Fill In With Random Paths
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
			if (unfilledItemTemp.x - 1 >= 0) { // West
				if (puzzleMatrix[unfilledItemTemp.x - 1][unfilledItemTemp.y].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("W");
				}
			}
			if (unfilledItemTemp.x + 1 < puzzleWidth) { // East
				if (puzzleMatrix[unfilledItemTemp.x + 1][unfilledItemTemp.y].f == true) {
					unfilledItem = unfilledItemTemp;
					directions.push("E");
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
				puzzleMatrix[unfilledItem.x + 1][unfilledItem.y].y = false;
				break;
			case "W":
				puzzleMatrix[unfilledItem.x][unfilledItem.y].f = true;
				puzzleMatrix[unfilledItem.x][unfilledItem.y].y = false;
				break;
		}
	}

	canvasDisplay(puzzleMatrix, startingX, endingX);

	// Recurse If All Marks Are Accidentally Destroyed
	var hasMarks = false;
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].m == true) {
				hasMarks = true;
			}
		}
	}
	if (!hasMarks) {
		console.error("No Marks Found! Recursing.");
		generatePuzzle();
	}
}

function canvasDisplay(puzzleMatrix, startingX, endingX) {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	c.width = puzzleWidth * 50;
	c.height = puzzleHeight * 50;
	ctx.lineWidth = 5; // Wall Line Width
	ctx.strokeStyle = "#000"; // Black Wall Stroke Colour
	ctx.clearRect(0, 0, c.width, c.height);
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].x == true) {
				ctx.beginPath();
				ctx.moveTo(x * 50 - 1.5, y * 50);
				ctx.lineTo(x * 50 + 51.5, y * 50);
				ctx.stroke();
				ctx.closePath();
			}
			if (puzzleMatrix[x][y].y == true) {
				ctx.beginPath();
				ctx.moveTo(x * 50, y * 50 - 1.5);
				ctx.lineTo(x * 50, y * 50 + 51.5);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
	ctx.rect(2.5, 2.5, c.width - 5, c.height - 5);
	ctx.stroke();
	ctx.clearRect(startingX * 50 + 2.5, 0, 45, 5);
	ctx.clearRect(endingX * 50 + 2.5, c.height - 5, 45, 5);
	// Option To Save As Unanswered Image
	var imagePng = c.toDataURL('image/png');
	document.getElementById("imageDownload").href = imagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	// Remove Bad Boxes
	do {
		var goAgain = false;
		for (var x = 0; x < puzzleMatrix.length; x++) {
			for (var y = 0; y < puzzleMatrix[x].length; y++) {
				if (puzzleMatrix[x][y].m == true) {
					var touches = 0;
					if (y - 1 >= 0) { // North Connection
						if (puzzleMatrix[x][y - 1].m == true && puzzleMatrix[x][y].x == false) {
							touches++;
						}
					} else if (y == 0 && x == startingX) { // Starting North Connection
						touches++;
					}
					if (y + 1 < puzzleHeight) { // South Connection
						if (puzzleMatrix[x][y + 1].m == true && puzzleMatrix[x][y + 1].x == false) {
							touches++;
						}
					} else if (y + 1 == puzzleHeight && x == endingX) { // Ending South Connection
						touches++;
					}
					if (x - 1 >= 0) { // West Connection
						if (puzzleMatrix[x - 1][y].m == true && puzzleMatrix[x][y].y == false) {
							touches++;
						}
					}
					if (x + 1 < puzzleWidth) { // East Connection
						if (puzzleMatrix[x + 1][y].m == true && puzzleMatrix[x + 1][y].y == false) {
							touches++;
						}
					}
					if (touches < 2) {
						console.warn("Touches: " + touches);
						puzzleMatrix[x][y].m = false;
						goAgain = true;
					} else if (touches > 2) {
						console.warn("Touches: " + touches);
						switch (puzzleMatrix[x][y].d) {
							case "S":
								if (y - 1 >= 0) {
									puzzleMatrix[x][y - 1].m = false;
								}
								break;
							case "N":
								if (y + 1 < puzzleHeight) {
									puzzleMatrix[x][y + 1].m = false;
								}
								break;
							case "W":
								if (x + 1 < puzzleWidth) {
									puzzleMatrix[x + 1][y].m = false;
								}
								break;
							case "E":
								if (x - 1 >= 0) {
									puzzleMatrix[x - 1][y].m = false;
								}
								break;
						}
						goAgain = true;
					}
				}
			}
		}
	} while (goAgain);
	// Line Marking System
	//ctx.lineWidth = 5; // Solution Line Width
	ctx.strokeStyle = "#F00"; // Red Solution Stroke Colour
	for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].m == true) {
				if (y - 1 >= 0) { // North Connection
					if (puzzleMatrix[x][y - 1].m == true && puzzleMatrix[x][y].x == false) {
						ctx.beginPath();
						ctx.moveTo(x * 50 + 25, y * 50 + 27.5);
						ctx.lineTo(x * 50 + 25, (y - 1) * 50 + 22.5);
						ctx.stroke();
						ctx.closePath();
					}
				} else if (y == 0 && x == startingX) { // Starting North Connection
					ctx.beginPath();
					ctx.moveTo(x * 50 + 25, y * 50 + 27.5);
					ctx.lineTo(x * 50 + 25, (y - 1) * 50 + 22.5);
					ctx.stroke();
					ctx.closePath();
				}
				if (y + 1 < puzzleHeight) { // South Connection
					if (puzzleMatrix[x][y + 1].m == true && puzzleMatrix[x][y + 1].x == false) {
						ctx.beginPath();
						ctx.moveTo(x * 50 + 25, y * 50 + 22.5);
						ctx.lineTo(x * 50 + 25, (y + 1) * 50 + 27.5);
						ctx.stroke();
						ctx.closePath();
					}
				} else if (y + 1 == puzzleHeight && x == endingX) { // Ending South Connection
					ctx.beginPath();
					ctx.moveTo(x * 50 + 25, y * 50 + 22.5);
					ctx.lineTo(x * 50 + 25, (y + 1) * 50 + 27.5);
					ctx.stroke();
					ctx.closePath();
				}
				if (x - 1 >= 0) { // West Connection
					if (puzzleMatrix[x - 1][y].m == true && puzzleMatrix[x][y].y == false) {
						ctx.beginPath();
						ctx.moveTo(x * 50 + 27.5, y * 50 + 25);
						ctx.lineTo((x - 1) * 50 + 22.5, y * 50 + 25);
						ctx.stroke();
						ctx.closePath();
					}
				}
				if (x + 1 < puzzleWidth) { // East Connection
					if (puzzleMatrix[x + 1][y].m == true && puzzleMatrix[x + 1][y].y == false) {
						ctx.beginPath();
						ctx.moveTo(x * 50 + 22.5, y * 50 + 25);
						ctx.lineTo((x + 1) * 50 + 27.5, y * 50 + 25);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
		}
	}
	// Option To Save As Answered Image
	var answeredImagePng = c.toDataURL('image/png');
	document.getElementById("answeredImageDownload").href = answeredImagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
