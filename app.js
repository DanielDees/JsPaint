
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//For image sharpness
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false; /// future

var GAME_FPS = 60;

var boxList = [];

var brush = {

	size: 20,
	color: "#CCC",

	paint: false,
	drag: [false, 0],
	crop: false,
	delete: false,
}

function box(data) {

	this.X = data.X || 0;
	this.Y = data.Y || 0;

	this.width = data.width || 0;
	this.height = data.height || 0;

	this.color = data.color || "#FFF";

	this.draw = function() {

		ctx.fillStyle = this.color;
		ctx.fillRect(this.X, this.Y, this.width, this.height);
	}
}

var boxTemplate = {

	X: [0, 0],
	Y: [0, 0],
}

function paint() {

	if (brush.paint) {

		var data = { 
				
			X: mouse.X - (brush.size / 2),
			Y: mouse.Y - (brush.size / 2),

			width: brush.size,
			height: brush.size,

			color: brush.color,
		}

		//Add new box
		boxList.push(new box(data));
	}
	else if (brush.drag[0]) {

		var data = { 
				
			X: mouse.clickPos[0],
			Y: mouse.clickPos[1],

			width: mouse.X - mouse.clickPos[0],
			height: mouse.Y - mouse.clickPos[1],

			color: brush.color,
		}

		//Remove last box
		if (brush.drag[1] == 1) { boxList.pop(); }

		//Replace old box with current one
		boxList.push(new box(data));

		//Prevent removal of boxes prior to dragged box
		brush.drag[1] = 1;
	}
}
function drawDebug() {

	ctx.fillStyle = "#F00";
	ctx.font = "16px Arial";
	ctx.fillText("Polygons: " + boxList.length, 20, 30);
}
function draw() {

	for (var i = 0; i < boxList.length; i++) {
		
		boxList[i].draw();	
	}
}
function undo() {

	boxList.pop();
}
function clearScreen() {

	boxList = [];
}
function drawScreen() {

	ctx.clearRect(FRAME_OF_REFERENCE[0], FRAME_OF_REFERENCE[1], 1400, 800);

	if (mouse.clicked && !keys.D) { brush.paint = true; } 
		else { brush.paint = false; }
	if (keys.D) { brush.drag[0] = true; } 
		else { brush.drag = [false, 0]; }


	paint();
	draw();
	drawDebug();
}

var updateScreen = setInterval(drawScreen, (1000 / GAME_FPS));