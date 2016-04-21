//Set up the canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

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

var makeLogo = function(){
    var x = 300;
    var y = 300;
    var logo = new Image();
    logo.src = "logo_dvd.jpg";
    var deltax, deltay = true;

    var animate = function animate(){
	//If deltax is true, increase x coord by 1. Else, decrease it by 1.
	if (deltax) {
	    this.changeX(1);
	} else {
	    this.changeX(-1);
	}
	//If deltay is true, increase y coord by 1. Else, decrease it by 1.
	if (deltay) {
	    this.changeY(1);
	} else {
	    this.changeY(-1);
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
    }

    return {
	changeX: function(dx){ x += dx; },
	changeY: function(dy){ y += dy; },
	animate: animate,
	draw: function(){ ctx.drawImage(logo,x,y,100,70); }
    }
}

var b = makeLogo();

var screensaver = function screensaver() {
    //Clears screen, draws border
    clear();
    ctx.rect(0,0,600,600);
    ctx.stroke();

    //Draws image
    b.animate();
    b.draw();

    requestID = window.requestAnimationFrame(screensaver);
};

//Buttons to start and stop animations
document.getElementById("start").addEventListener("click", animation);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("DVD").addEventListener("click", screensaver);
