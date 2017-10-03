function init() {
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.backgroundColor = "#333";
	document.body.insertBefore(canvas, document.body.firstChild);
	
	//window.setInterval(update, 1000 / 60);
	
	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function Randf(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	// Start paint
	
	
	
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