
//CHECK BROWSER TYPE ============
var mie = (navigator.appName == "Microsoft Internet Explorer")?true:false;
//END CHECK BROWSER TYPE ========

var str = "";
var keyButton = "";
var FRAME_OF_REFERENCE = [0, 0];

//Keyboard keys used in game
var keys = {

    //Alphabet
    A: false, B: false,
    C: false, D: false,
    E: false, F: false,
    G: false, H: false,
    I: false, J: false,
    K: false, L: false,
    M: false, N: false,
    O: false, P: false,
    Q: false, R: false,
    S: false, T: false,
    U: false, V: false,
    W: false, X: false,
    Y: false, Z: false,

    //Special Keys
    ENTER: false,
    SHIFT: false
};

//MOUSE AND KEYBOARD =============
var mouse = {

  //Location
  X: 0,
  Y: 0,

  clicked: false,
  clickPos: [0, 0],
}

document.onmousemove = mousePos;
document.onmousedown = mouseClick;
document.onmouseup = mouseUnClick;
document.onkeypress = keyClick;
document.onkeydown = getKeyDown;

function mouseClick(e) {

  mouse.clicked = true;
  mouse.clickPos = [mouse.X, mouse.Y];
}
function mouseUnClick(e) {

  mouse.clicked = false;
}
function mousePos (e) {

  if (!mie) {

    mouse.X = e.pageX + FRAME_OF_REFERENCE[0];
    mouse.Y = e.pageY + FRAME_OF_REFERENCE[1];
  } else {

    e = event || window.event;

    mouse.X = e.clientX + document.body.scrollLeft + FRAME_OF_REFERENCE[0];
    mouse.Y = e.clientY + document.body.scrollTop + FRAME_OF_REFERENCE[1];
  };

  if (e.shiftKey) { keys.SHIFT = true; } else { keys.SHIFT = false; };
}
function getKeyPressed (e) {

  return String.fromCharCode(e.which || e.keyCode).toUpperCase();
}
function getKeyDown (e) {
  if (e) {
    if (e.keyCode == 8 || e.keyCode == 38 || e.keyCode == 40) { keyClick(e); }
  };
}
function keyClick (e) {

  keyButton = getKeyPressed(e);

  if (keyButton == "X") { clearScreen(); }
  if (keyButton == "Z") { undo(); }
  if (keyButton == "D") { keys.D = !keys.D; }
  if (keyButton == "D" && keys.D) { mouse.clickPos = [mouse.X, mouse.Y]; }

  if (e.shiftKey) { keys.SHIFT = true; } else { keys.SHIFT = false; }

  //Chat bar
  if ((e.which == 13 || e.keyCode == 13) && !keys.ENTER) { keys.ENTER = true; }
    else if ((e.which == 13 || e.keyCode == 13) && keys.ENTER) { keys.ENTER = false; }

  if (!(e.which == 13 || e.keyCode == 13) && keys.ENTER) {

    //Capitalize letters if needed
    if (!keys.SHIFT) { str += keyButton.toLowerCase(); }
    else if (keys.SHIFT) { str += keyButton.toUpperCase(); }

  };
  //Delete key
  if ((e.which == 8 || e.keyCode == 8) && str.length > 0) {

    keyButton = "DELETE";
    str = str.slice(0, str.length - 2);
  }

  e.preventDefault();
}
//END MOUSE AND KEYBOARD =========
