//Set up the canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var requestID;
var s = false;

//Outlines the canvas
ctx.strokeRect(0,0,600,600);

var makeBall = function(xcor, ycor){
    var r = 10*Math.random()+10;
    var x = xcor;
    var y = ycor;
    var dx = 6*Math.random()-3;
    var dy = 6*Math.random()-3;
    var velocity = Math.sqrt(dx * dx + dy * dy);
    var color = '#'+Math.random().toString(16).substr(-6);

    var animate = function animate(){
	x += dx;
	y += dy;

	//If our logo reaches the x border, make it move in the other x direction.
	if (x >= 600-r) {
	    dx = -1*Math.abs(dx);
	}else if(x <= r){
	    dx = Math.abs(dx);
	}
	
	//If our logo reaches the y border, make it move in the other y direction.
	if (y >= 600-r) {
	    dy = -1*Math.abs(dy);
	}else if(y <= r){
	    dy = Math.abs(dy);
	}
    }

    var draw = function() {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
    }

    var speedcoloring = function() {
	velocity = Math.sqrt(dx * dx + dy * dy);
	if (velocity < 0.4) {
	    color = "#A20110";
	} else if (velocity < 0.8) {
	    color = "#1533BC";
	} else if (velocity < 1.2) {
	    color = "#252DA9";
	} else if (velocity < 1.6) {
	    color = "#342896";
	} else if (velocity < 2.0) {
	    color = "#442283";
	} else if (velocity < 2.4) {
	    color = "#541D70";
	} else if (velocity < 2.8) {
	    color = "#63175C";
	} else if (velocity < 3.2) {
	    color = "#731149";
	} else if (velocity < 3.6) {
	    color = "#820C36";
	} else if (velocity < 4.0) {
	    color = "#920623";
	} else {
	    color = "#0639D0";
	}
    }
    
    return {
	animate: animate,
	changeDX: function(newDX){ dx = newDX; },
	changeDY: function(newDY){ dy = newDY; },
	draw: draw,
	speedcoloring: speedcoloring,
	getDX: function(){ return dx; },
	getDY: function(){ return dy; },
	getR: function(){ return r; },
	getX: function(){ return x; },
	getY: function(){ return y; }
    }
}

balls = []

var distance = function(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1 - y2, 2));
}

var addBall = function(e) {
    e.preventDefault();

    var removed = false;
    
    for(var i = 0; i < balls.length; i++){
	if(distance(e.offsetX, e.offsetY, balls[i].getX(), balls[i].getY()) < balls[i].getR()){
	    balls.splice(i, 1);
	    removed = true;
	}
    }

    if(!removed){
	balls.push(makeBall(e.offsetX, e.offsetY));
	balls[balls.length-1].draw();
    }
}

var animation = function(e) {
    e.preventDefault();

    window.cancelAnimationFrame(requestID);

    var drawAll = function(){
	ctx.clearRect(0, 0, 600, 600);
	
	//Draws our border
	ctx.strokeRect(0,0,600,600);

	//Draws and animates each circle
	for(var i = 0; i < balls.length; i++){
	    balls[i].animate();
	    if (s) {
		balls[i].speedcoloring();
	    }
	    balls[i].draw();
	    for(var j = i+1; j < balls.length; j++){
		if(distance(balls[i].getX(), balls[i].getY(), balls[j].getX(), balls[j].getY()) <= balls[i].getR() + balls[j].getR()){
		    m1 = Math.pow(balls[i].getR(), 2);
		    m2 = Math.pow(balls[j].getR(), 2);
		    var dx1 = (balls[i].getDX()*(m1-m2) + 2*balls[j].getDX()*m2) / (m1+m2);
		    var dy1 = (balls[i].getDY()*(m1-m2) + 2*balls[j].getDY()*m2) / (m1+m2);
		    var dx2 = (balls[j].getDX()*(m2-m1) + 2*balls[i].getDX()*m1) / (m1+m2);
		    var dy2 = (balls[j].getDY()*(m2-m1) + 2*balls[i].getDY()*m1) / (m1+m2);
		    balls[i].changeDX(dx1);
		    balls[i].changeDY(dy1);
		    balls[j].changeDX(dx2);
		    balls[j].changeDY(dy2);
		}
	    }
	}
    
	requestID = window.requestAnimationFrame(drawAll);
    }

    drawAll();
}

var stop = function stop(e) {
    e.preventDefault();
    
    //Cancels the animation
    window.cancelAnimationFrame(requestID);
};

var sc = function sc() {
    s = !s
};

//Buttons to start and stop animations
document.getElementById("canvas").addEventListener("click", addBall);
document.getElementById("start").addEventListener("click", animation);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("speedcoloring").addEventListener("click", sc);
