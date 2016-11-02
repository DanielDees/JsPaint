
function slider(data) {

	this.X = data.X;
	this.Y = data.Y;

	this.width = data.width;
	this.height = data.height;

	this.color = data.color;

	this.value = 100;

	//Hitbox
  	this.top = function() { return this.Y; }
  	this.bottom = function() { return this.Y + this.height; }
  	this.left = function() { return this.X - 5; }
  	this.right = function() { return this.X + this.width + 5; }

  	this.updateValue = function() {

  		if (mouseIsTouching(this) && mouse.clicked) {

  			this.value = this.Y - mouse.Y + this.height;

  			if (this.value > 255) { this.value = 255; }
  		}

  		//Eraser
  		if (keys.E && this.color != "#FFF") { this.value = 0; };

  	}
	this.draw = function() {

		this.updateValue();

		//Main bar
		ctx.fillStyle = this.color;
		ctx.fillRect(this.X, this.Y, this.width, this.height);

		//Slider indicator
		ctx.fillRect(this.X - 5, this.Y + this.height - this.value - 5, this.width + 10, 10);

		//Text above slider
		ctx.font = "22px Palatino";
		ctx.fillText(this.value, this.X - 10, this.Y - 20);
	}
}

var sizeSliderData = {

	X: 1070,
	Y: 50,

	width: 5,
	height: 100,

	color: "#FFF",
}
var redSliderData = {

	X: 1050,
	Y: 250,

	width: 5,
	height: 255,

	color: "#F00",
}
var blueSliderData = {

	X: 1100,
	Y: 250,

	width: 5,
	height: 255,

	color: "#0F0",
}
var greenSliderData = {

	X: 1150,
	Y: 250,

	width: 5,
	height: 255,

	color: "#00F",
}

var sizeSlider = new slider(sizeSliderData);
var redSlider = new slider(redSliderData);
var blueSlider = new slider(blueSliderData);
var greenSlider = new slider(greenSliderData);

function drawSidebar() {

	ctx.clearRect(canvas.width - 200, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#FFF";
	ctx.fillRect(canvas.width - 200, 0, 3, canvas.height);

	sizeSlider.draw();
	redSlider.draw();
	blueSlider.draw();
	greenSlider.draw();

	if (keys.E) { 

		ctx.fillStyle = "#FFF";
		ctx.fillText("Erase Mode ON", canvas.width - 180, canvas.height - 100); 
	}
	if (!keys.E) { 

		ctx.fillStyle = "#FFF";
		ctx.fillText("Erase Mode OFF", canvas.width - 180, canvas.height - 100); 
	}
	if (brush.drag[0]) { 

		ctx.fillStyle = "#FFF";
		ctx.fillText("Drag Mode ON", canvas.width - 180, canvas.height - 130); 
	}
	if (!brush.drag[0]) { 

		ctx.fillStyle = "#FFF";
		ctx.fillText("Drag Mode OFF", canvas.width - 180, canvas.height - 130); 
	}
	if (brush.shape == "ball") {

		ctx.fillStyle = "#FFF";
		ctx.fillText("Shape: Circle", canvas.width - 180, canvas.height - 70); 
	}
	if (brush.shape == "box") {

		ctx.fillStyle = "#FFF";
		ctx.fillText("Shape: Square", canvas.width - 180, canvas.height - 70); 
	}


	ctx.fillStyle = "#FFF";
	ctx.fillText("Layer: " + layer, canvas.width - 180, canvas.height - 160); 
}