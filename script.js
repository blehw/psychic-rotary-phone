//Set up the canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var requestID;

//Outlines the canvas
ctx.strokeRect(0,0,600,600);

var makeBall = function(xcor, ycor){
    var r = 10*Math.random()+10;
    var x = xcor;
    var y = ycor;
    var dx = 6*Math.random()-3;
    var dy = 6*Math.random()-3;
    var color = '#'+Math.random().toString(16).substr(-6);

    var animate = function animate(){
	this.changeX(dx);
	this.changeY(dy);

	//If our logo reaches the x border, make it move in the other x direction.
	if (x >= 600-r || x <= r) {
	    dx *= -1;
	}
	
	//If our logo reaches the y border, make it move in the other y direction.
	if (y >= 600-r || y <= r) {
	    dy *= -1;
	}
    }

    var draw = function() {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
    }
    
    return {
	animate: animate,
	changeX: function(dx){ x += dx; },
	changeY: function(dy){ y += dy; },
	draw: draw,
	getR: function(){ return r},
	getX: function(){ return x},
	getY: function(){ return y}
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
	    balls[i].draw();
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

//Buttons to start and stop animations
document.getElementById("canvas").addEventListener("click", addBall);
document.getElementById("start").addEventListener("click", animation);
document.getElementById("stop").addEventListener("click", stop);
