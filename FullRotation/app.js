function init() {
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.backgroundColor = "#070707";
	document.body.insertBefore(canvas, document.body.firstChild);
	
	var timer = window.setInterval(update, 1000 / 60);
	
	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function Randf(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	// Генерация цвета
	function colorGen() {
		var c = [0,0,0]
		var m = 0, n = Rand(0,2);
		c[n] = 255;
		do {
			m = Rand(0,2);
		} while (m == n)
		c[m] = Rand(0,255);
		var str = "rgb("+c[0]+","+c[1]+","+c[2]+")";
		return str;
	}
	
	function drowCircle(x,y,r,c) {	
		ctx.fillStyle = c;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true); // Outer circle
		ctx.fill();
	}
	
	// Start paint
	
	var ctx = canvas.getContext('2d');
	// Stroked triangle
	var x0 = canvas.width/2;
	var y0 = canvas.height/2;
	var mas = 2;
	var dx = 0, dy = 0;
	var traje = false;
	
	// Радиус вращения, радиус тела, скорость вращения, спутник, цвет
	function body(r,s,sp,sat,c) {
		this.n = Rand(0,360); // текущий угол вращения
		this.r = r; // радиус вращения
		this.s = s; // радиус тела
		this.sp = sp; // скорость вращения
		this.sat = sat; // спутник
		this.c = c || colorGen(); // цвет
		this.x = 0;
		this.y = 0;
	}
	
	var bodyr = [];
	
	function generate(arr, lvl) {
		if(lvl > 6) return null;
		var arrey = arr || [];
		var lv = lvl || 1;
		var count = Rand(4, 8) + 1 - lvl;
		lvl++;
		for(var n = 1; n < count; n++)
		{
			arrey[n] = new body(Randf(100*n/lv,150*n/lv),Randf(15/lv+3,25/lv+3),Randf(-1.8/lv/n,1.8/lv/n),generate(null, lvl));
		}
		return arrey;
	}
	
	bodyr = generate(bodyr, 1);
	
	
	/*bodyr.push(new body(0,0,0,
								[new body(Randf(100,200),Randf(20,30),Randf(-2.5,2.5),
									new body(Randf(50,100),Randf(10,19),Randf(-3,3),
										new body(Randf(20,50),Randf(5,9),Randf(-3.5,3.5),null)
									)
								),new body(Randf(400,500),Randf(20,30),Randf(-2,2),
									new body(Randf(50,100),Randf(10,19),Randf(-2.5,2.5),
										new body(Randf(20,50),Randf(5,9),Randf(-3,3),null)
									)
								),new body(Randf(600,700),Randf(20,30),Randf(-1.5,1.5),
									new body(Randf(50,100),Randf(10,19),Randf(-2,2),
										new body(Randf(20,50),Randf(5,9),Randf(-2.5,2.5),null)
									)
								),new body(Randf(800,900),Randf(20,30),Randf(-1,1),
									new body(Randf(50,100),Randf(10,19),Randf(-1.5,1.5),
										new body(Randf(20,50),Randf(5,9),Randf(-2,2),null)
									)
								)]
							));*/ // 

	var fsiz = 18; // размер шрифта
	
	//mouse	
	var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	var mouseXD, mouseYD;
	var mX,mY;
	
	function handleMouseMove(e) {
		var clientX, clientY;
		if(e.clientX)
		{
		mouseX = e.clientX;
		mouseY = e.clientY;
		}
		else if(e.changedTouches && e.changedTouches.length > 0)
		{
		var touch = e.changedTouches[e.changedTouches.length - 1];
		mouseX = touch.clientX;
		mouseY = touch.clientY;
		}
		else
		{
		return;
		}
		e.preventDefault();
	};
	
	function handleMouseDown(e) {
		isMouseDown = true;
		mouseXD = e.clientX;
		mouseYD = e.clientY;
		x0 += dx;
		y0 += dy;
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
		mouseXD = undefined;
		mouseYD = undefined;
	}
	
	document.addEventListener("mouseup", handleMouseUp, true);
	document.addEventListener("touchend", handleMouseUp, true);
	
	function scrolls(e) {
		var delta = e.deltaY || e.detail || e.wheelDelta;
		if(delta > 0) {
			mas -= mas * 0.1;
		}
		else {
			mas += mas * 0.1;
		}
		e.preventDefault();
	}
	
	document.addEventListener("wheel", scrolls);
	
	function MouseMove(e) {
		var clientX, clientY;
		if(e.clientX)
		{
		mX = e.clientX;
		mY = e.clientY;
		}
		else if(e.changedTouches && e.changedTouches.length > 0)
		{
		var touch = e.changedTouches[e.changedTouches.length - 1];
		mX = touch.clientX;
		mY = touch.clientY;
		}
		else
		{
		return;
		}
		e.preventDefault();
	};
	
	document.addEventListener("mousemove", MouseMove, true);
	document.addEventListener("touchmove", MouseMove, true);
	
	function sTraje() {
		traje = !traje;
	}
	
	document.addEventListener("dblclick", sTraje, true);
	
	
	function drowBody(body,x0,y0) {
		// Расчет координат
		t = 2*Math.PI/360 * body.n;
		var x = body.r * Math.cos(t);
		var y = body.r * Math.sin(t) ;
		tg = (t*180/Math.PI);
		// Обновление угла
		
		//body.sp += Randf(-0.2,0.2)
		body.n += body.sp;
		if (body.n > 360) body.n = 0;
		
		// Отрисовка траектории
		ctx.strokeStyle = "#aaa";
		ctx.beginPath();
		ctx.shadowColor = "#aaa";
		ctx.shadowBlur = 2;
		if(traje)
			for(var i = 0; i <= 180; i++)
			{
				var tt = 2*Math.PI/180 * i;
				var xx = body.r * Math.cos(tt) / mas + x0 + dx;
				var yy = body.r * Math.sin(tt) / mas + y0 + dy;
				if(i == 0) ctx.moveTo(xx,yy	);
				ctx.lineTo(xx,yy);
			}
		ctx.closePath();
		ctx.stroke();
		
		ctx.shadowBlur = 5;
		ctx.shadowColor = body.c;
		
		body.x = x / mas + x0 + dx;
		body.y = y / mas + y0 + dy;
		//Отрисовка тела
		drowCircle(body.x,body.y,body.s / mas,body.c);
		if(body.sat != null)
			if(body.sat.length > 0)
				for(var j in body.sat)
					drowBody(body.sat[j],body.x,body.y);				
			else 
				drowBody(body.sat,body.x,body.y);
	}
	
	//update	
	function update() {
		
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		
					
		// Центр вращения
		/*ctx.shadowColor = "#fd0";
		ctx.shadowBlur = 15;
		drowCircle(x0,y0,10/mas,"#fd0");*/
		
		/*
			n - текущий угол
			a - радиус элипса по горизонтали
			b - радиус элипса по вертикали
			s - размер тела
			с - цвет тела
		*/
		if(isMouseDown) {
			dx =  mouseX - mouseXD;
			dy =  mouseY - mouseYD;			
		}
		
		for(var j in bodyr)
		{
			drowBody(bodyr[j],x0,y0);
			//drowBody(bodyr[j],mX,mY);
		}
		
	
		// Вывод данных
		ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		ctx.fillStyle = "#aaa";
		ctx.shadowColor = "#aaa";
		ctx.shadowBlur = 4;
		if(isMouseDown) {
			ctx.fillText("mx: "+mouseX.toFixed(3), 5, fsiz);
			ctx.fillText("my: "+mouseY.toFixed(3), 5, fsiz*2);
		}
		ctx.fillText("mas: "+mas.toFixed(10), 5, fsiz*3);

		
		
	};

};