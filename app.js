
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//For image sharpness
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false; /// future

var GAME_FPS = 60;

var shapeList = [];

var brush = {

	size: function() { return sizeSlider.value; },
	color: function() { return 'rgb(' + redSlider.value + ',' + blueSlider.value + ',' + greenSlider.value + ')'; },

	shape: "box",

	paint: false,
	drag: [false, 0],
	crop: false,
	delete: false,
}

//Tool
function mouseIsTouching (item) {

  //If error, ensure items have this.height / this.width.
  try {
    if (mouse.Y < item.bottom() && mouse.Y > item.top() && mouse.X > item.left() && mouse.X < item.right()) {

      return true;
    }
  }
  catch (err) { throw "mouseIsTouching() can't evaluate: " + item; }

  return false;
}

//Objects
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
function ball(data) {

	this.X = data.X;
	this.Y = data.Y;

	this.radius = data.radius;

	this.color = data.color || "#FFF";

	this.absoluteVal = function() {

		if (this.radius < 0) { this.radius *= -1; }
	}
	this.draw = function() {

		//Fix negative values.
		this.absoluteVal();

    	ctx.fillStyle = this.color;
    	ctx.beginPath();
    	ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI);
    	ctx.fill();
	}
}

function paint() {

	if (brush.paint && brush.shape == "box") {

		var data = { 
				
			X: mouse.X - (brush.size() / 2),
			Y: mouse.Y - (brush.size() / 2),

			width: brush.size(),
			height: brush.size(),

			color: brush.color(),
		}

		//Add new box
		shapeList.push(new box(data));
	}
	else if (brush.paint && brush.shape == "ball") {

		var data = { 
				
			X: mouse.X - (brush.size() / 2),
			Y: mouse.Y - (brush.size() / 2),

			radius: brush.size(),

			color: brush.color(),
		}

		//Add new box
		shapeList.push(new ball(data));
	}
	else if (brush.drag[0] && brush.shape == "box") {

		var data = { 
				
			X: mouse.clickPos[0],
			Y: mouse.clickPos[1],

			width: mouse.X - mouse.clickPos[0],
			height: mouse.Y - mouse.clickPos[1],

			color: brush.color(),
		}

		//Remove last box
		if (brush.drag[1] == 1) { shapeList.pop(); }

		//Replace old box with current one
		shapeList.push(new box(data));

		//Prevent removal of boxes prior to dragged box
		brush.drag[1] = 1;
	}
	else if (brush.drag[0] && brush.shape == "ball") {

		var data = { 
				
			X: mouse.clickPos[0],
			Y: mouse.clickPos[1],

			radius: mouse.X - mouse.clickPos[0],

			color: brush.color(),
		}

		//Remove last ball
		if (brush.drag[1] == 1) { shapeList.pop(); }

		//Replace old ball with current one
		shapeList.push(new ball(data));

		//Prevent removal of boxes prior to dragged ball
		brush.drag[1] = 1;
	}
}
function drawDebug() {

	ctx.fillStyle = "#F00";
	ctx.font = "26px Arial";
	ctx.fillText("Polygons: " + shapeList.length, 30, 50);
}
function draw() {

	for (var i = 0; i < shapeList.length; i++) {
		
		shapeList[i].draw();	
	}
}
function undo() {

	shapeList.pop();
}
function clearScreen() {

	shapeList = [];
}
function drawScreen() {

	ctx.clearRect(FRAME_OF_REFERENCE[0], FRAME_OF_REFERENCE[1], canvas.width, canvas.height);

	//Draw Ball
	if (keys.B && brush.shape == "box") { 
		brush.shape = "ball"; 
		keys.B = false; 
	}
	//Draw Box
	else if (keys.B && brush.shape == "ball") { 
		brush.shape = "box";
		keys.B = false; 
	}

	if (mouse.clicked && !keys.D) { brush.paint = true; } 
		else { brush.paint = false; }
	if (keys.D) { brush.drag[0] = true; } 
		else { brush.drag = [false, 0]; }

	//Only paint if not in brush modification area.
	if (mouse.X < canvas.width - 200) {
		paint();
	}
	
	draw();
	drawDebug();
	drawSidebar();
}

var updateScreen = setInterval(drawScreen, (1000 / GAME_FPS));