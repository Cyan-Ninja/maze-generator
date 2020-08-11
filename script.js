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
			puzzleMatrix[x][y] = {x: true, y: true, m: false};
		}
	}
	console.log(puzzleMatrix);
	var startingX = Math.floor(Math.random() * puzzleWidth), endingX;
	console.log("StartingX: " + startingX);
	var currentX = startingX, currentY = 0;
	puzzleMatrix[currentX][currentY].m = true;
	var answerTiles = [{x: currentX, y: currentY}];
	var atBottom = false;
	while (!atBottom) {
		// Get Directions
		var directions = [];
		if (currentY != 0) {
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
		if (currentX != 0) {
			var partsNumValue = document.getElementById("eParts").value;
			var partsNum = 2;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("E");
			}
		}
		if (currentX != puzzleWidth - 1) {
			var partsNumValue = document.getElementById("wParts").value;
			var partsNum = 2;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("W");
			}
		}
		if (true) {
			var partsNumValue = document.getElementById("sParts").value;
			var partsNum = 3;
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
				var randomDistance = Math.floor(Math.random() * currentY / 4);
				for (var i = 0; i <= randomDistance; i++) {
					puzzleMatrix[currentX][currentY - i].x = false;
					puzzleMatrix[currentX][currentY - i].m = true;
					answerTiles.push({x: currentX, y: currentY - i});
				}
				currentY -= randomDistance;
				break;
			case "E":
				var randomDistance = Math.floor(Math.random() * currentX / 4 + 1);
				for (var i = 0; i <= randomDistance; i++) {
					puzzleMatrix[currentX - i][currentY].y = false;
					puzzleMatrix[currentX - i][currentY].m = true;
					answerTiles.push({x: currentX - 1, y: currentY});
				}
				currentX -= randomDistance;
				break;
			case "W":
				var randomDistance = Math.floor(Math.random() * (puzzleWidth - currentX) / 4 + 1);
				for (var i = 0; i <= randomDistance; i++) {
					puzzleMatrix[currentX + i][currentY].y = false;
					puzzleMatrix[currentX + i][currentY].m = true;
					answerTiles.push({x: currentX + 1, y: currentY});
				}
				currentX += randomDistance;
				break;
			case "S":
				if (currentY == puzzleHeight - 1) {
					atBottom = true;
					endingX = currentX;
					break;
				} else {
					var randomDistance = Math.floor(Math.random() * (puzzleHeight - currentY) / 4 + 1);
					for (var i = 0; i <= randomDistance; i++) {
						puzzleMatrix[currentX][currentY + i].x = false;
						puzzleMatrix[currentX][currentY + i].m = true;
						answerTiles.push({x: currentX, y: currentY + i});
					}
					currentY += randomDistance;
					break;
				}
		}
	}
	console.log(answerTiles);
	function addSecondaryPath(answerTile) {
		console.log(answerTile);
		// Get Directions
		var currentX = answerTile.x, currentY = answerTile.y;
		var directions = [];
		if (currentY != 0) {
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
		if (currentX != 0) {
			var partsNumValue = document.getElementById("eParts").value;
			var partsNum = 2;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("E");
			}
		}
		if (currentX != puzzleWidth - 1) {
			var partsNumValue = document.getElementById("wParts").value;
			var partsNum = 2;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("W");
			}
		}
		if (currentY != puzzleWidth - 1) {
			var partsNumValue = document.getElementById("sParts").value;
			var partsNum = 3;
			if (partsNumValue != "") {
				partsNum = parseInt(partsNumValue);
			}
			for (var i = 0; i < partsNum; i++) {
				directions.push("S");
			}
		}
		// Get Direction
		var direction = directions[Math.floor(Math.random() * directions.length)];
	}
	for (var i = 0; i < answerTiles.length; i++) {
		addSecondaryPath(answerTiles[i]);
	}
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
	/*for (var x = 0; x < puzzleMatrix.length; x++) {
		for (var y = 0; y < puzzleMatrix[x].length; y++) {
			if (puzzleMatrix[x][y].m == true) {
				ctx.beginPath();
				ctx.fillRect(x * 50 + 12.5, y * 50 + 12.5, 25, 25);
				ctx.stroke();
				ctx.closePath();
			}
		}
	}*/
	// Option To Save As Answered Image
	var answeredImagePng = c.toDataURL('image/png');
	document.getElementById("answeredImageDownload").href = answeredImagePng.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}
generatePuzzle();
