
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

	ctx.fillStyle = "#FFF";
	ctx.fillRect(canvas.width - 200, 0, 3, canvas.height);

	sizeSlider.draw();
	redSlider.draw();
	blueSlider.draw();
	greenSlider.draw();

}