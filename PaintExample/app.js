function init() {
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.backgroundColor = "#000";
	document.body.insertBefore(canvas, document.body.firstChild);
	
	var ctx = canvas.getContext('2d');
	var maxcolor = 225; // яркость кружков
	
	//window.setInterval(update, 1000 / 60);
	
	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function Randf(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	function drowCircle(x,y,r,c,a,b) {	
		//ctx.fillStyle = c;
		ctx.strokeStyle = c;
		ctx.beginPath();
		// arc(x, y, radius, startAngle, endAngle, направление)
		ctx.arc(x,y,r,0,a*Math.PI/180,b); // Outer circle
		ctx.stroke();
		//ctx.fill();
	}
	
	// Генерация цвета
	function colorGen() {
		var c = [0,0,0]
		n = Rand(0,2);
		c[n] = maxcolor;
		do {
			m = Rand(0,2);
		} while (m == n)
		c[m] = Rand(0,maxcolor);
		var str = "rgb("+c[0]+","+c[1]+","+c[2]+")";
		//console.log(str);
		return str;
	}
	
	// Start paint
	
	var x = Rand(0,canvas.width);
	var y = Rand(0,canvas.height);
	var x0,y0;
	for(var i = 0; i < 25; i++)
	{		
		drowCircle(x,y,Rand(10, 50), colorGen(), Rand(20, 270),Math.random()>0.5);
		
		x0 = Rand(0,canvas.width);
		y0 = Rand(0,canvas.height);
		ctx.beginPath();
		ctx.moveTo(x,y);		
		ctx.strokeStyle = "#fff";
		ctx.lineTo(x0,y0);
		ctx.stroke();
		x = x0;
		y = y0;
		
	}
	
	//mouse	
	var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	var canvasPosition = {x: 0, y: 0};
	
	function handleMouseDown(e) {
		isMouseDown = true;
		handleMouseMove(e);
		document.addEventListener("mousemove", handleMouseMove, true);
		document.addEventListener("touchmove", handleMouseMove, true);
	}
	
	document.addEventListener("mousedown", handleMouseDown, true);
	document.addEventListener("touchstart", handleMouseDown, true);
	
	function handleMouseUp() {
		document.removeEventListener("mousemove", handleMouseMove, true);
		document.removeEventListener("touchmove", handleMouseMove, true);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
	}
	
	document.addEventListener("mouseup", handleMouseUp, true);
	document.addEventListener("touchend", handleMouseUp, true);
	
	function handleMouseMove(e) {
		var clientX, clientY;
		if(e.clientX)
		{
		clientX = e.clientX;
		clientY = e.clientY;
		}
		else if(e.changedTouches && e.changedTouches.length > 0)
		{
		var touch = e.changedTouches[e.changedTouches.length - 1];
		clientX = touch.clientX;
		clientY = touch.clientY;
		}
		else
		{
		return;
		}
		mouseX = (clientX - canvasPosition.x);
		mouseY = (clientY - canvasPosition.y);
		e.preventDefault();
	};	
	
	//update	
	function update() {
	
		
	};

};