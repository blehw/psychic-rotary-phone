//Set up the canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Set initial radius size
//var radius = 100;1

 //Set it so that our circle grows when the button is first presssed 
 var growing = true;

 //Outlines the canvas
 ctx.rect(0,0,600,600);
 ctx.stroke();

 //Clears the canvas
 var clear = function clear() {
     ctx.fillStyle = "#ffffff";
     ctx.clearRect(0,0,600,600);
 }

 var makeBall = function() {
     var radius = 10;
     var x = 300;
     var y = 300;
     var growing = true;
     var draw = function() {
	 ctx.beginPath();
	 ctx.arc(x,y,radius,0,2*Math.PI);
	 ctx.fill();
     }
     var animate = function() {
	 if (radius >= 300) {
	     growing = false;
	 }
	 if (radius <= 0) {
	     growing = true;
	 }
	 if (growing) {
	     this.inc();
	 } else {
	     this.dec();
	 }
     }
     return {
	 get: function() {console.log(radius);},
	 inc: function() {radius++;},
	 dec: function() {radius--;},
	 draw: draw,
	 animate: animate
     }
}

a = makeBall();

var animation = function() {
    clear();
    //Draws our border
    ctx.rect(0,0,600,600);
    ctx.stroke();
    //Sets fill color to black (after clear set it to white)
    ctx.fillStyle = "#000000";
    //Draws and fills our circle
    a.animate();
    a.draw();
    requestID = window.requestAnimationFrame(animation);
}

var stop = function stop() {
    //Draws our canvas border
    ctx.rect(0,0,600,600);
    ctx.stroke();
    //Cancels the animation
    window.cancelAnimationFrame(requestID);
};

/*
//Creates our DVD logo
var logo = new Image();
logo.src = "logo_dvd.jpg";

//Initial coords of the logo
var x = 300;
var y = 300;

//Initial direction the logo moves in
var deltax = true;
var deltay = true;

var screensaver = function screensaver() {
    //Clears screen, draws border
    clear();
    ctx.rect(0,0,600,600);
    ctx.stroke();

    //Draws image
    ctx.drawImage(logo,x,y,100,70);

    //If deltax is true, increase x coord by 1. Else, decrease it by 1.
    if (deltax) {
	x = x + 1;
    } else {
	x = x - 1;
    }
    //If deltay is true, increase y coord by 1. Else, decrease it by 1.
    if (deltay) {
	y = y + 1;
    } else {
	y = y - 1;
    }
    //If our logo reaches the x border, make it move in the other x direction.
    if (x >= 500) {
	deltax = false;
    }
    if (x <= 0) {
	deltax = true;
    }
    //If our logo reaches the y border, make it move in the other y direction.
    if (y >= 530) {
	deltay = false;
    }
    if (y <= 0) {
	deltay = true;
    }
    //Animate
    window.requestAnimationFrame(screensaver);
};
*/

//Buttons to start and stop animations
document.getElementById("start").addEventListener("click", animation);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("DVD").addEventListener("click", screensaver);
