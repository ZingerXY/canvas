function init() {
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.backgroundColor = "#333";
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
	var mas = 5000;
	var dx = 0, dy = 0;
	
	/*
			n - текущий угол
			a - радиус элипса по горизонтали
			b - радиус элипса по вертикали
			s - размер тела
			с - цвет тела
			sp - скорость вращения
		*/
	function body(a,s,c,sp,name) {
		this.n = 0;
		this.a = a;
		this.b = a/2;
		this.s = a > 0 ? s/**100*/ : s;
		this.c = c || colorGen();
		this.sp = sp;
		this.name = name;
	}
	
	var bodyr = [];

	// радиус орбиты, диаметр, цвет, скорость
	/*bodyr.push(new body(0,0.25,"#fd0",0)); // Солнце
	bodyr.push(new body(0.38,0.382,"#CA892B",1.6074)); // Меркурий
	bodyr.push(new body(0.72,0.949,"#79431D",1.1752)); // Венера
	bodyr.push(new body(1,1,"#A9B8E3",1)); // Земля
	bodyr.push(new body(1.52,0.53	,"#C86649",0.8102)); // Марс
	bodyr.push(new body(5.20,11.2,"#874B2F",0.4365)); // Юпитер
	bodyr.push(new body(9.54,9.41,"#D9A349",0.3253)); // Сатурн
	bodyr.push(new body(19.22,3.98,"#42B9E3",0.2286)); // Уран 
	bodyr.push(new body(30.06,3.81,"#0B4BA5",0.1823)); // Нептун*/
	
	bodyr.push(new body(0,1391.4,"#fd0",0,"Солнце"));
	bodyr.push(new body(57900,4.88,"#CA892B",0.04787,"Меркурий"));
	bodyr.push(new body(108200,12.14,"#79431D",0.03502,"Венера"));
	bodyr.push(new body(149600,12.756,"#A9B8E3",0.02976,"Земля"));
	bodyr.push(new body(227900,6.787,"#C86649",0.02413,"Марс"));
	bodyr.push(new body(778600,142.8,"#874B2F",0.01307,"Юпитер"));
	bodyr.push(new body(1433700,120.66,"#D9A349",0.00967,"Сатурн"));
	bodyr.push(new body(2870400,51.118,"#42B9E3",0.00684,"Уран"));
	bodyr.push(new body(4491100,49.528,"#0B4BA5",0.00548,"Нептун"));
	
	var fsiz = 18; // размер шрифта
	
	//mouse	
	var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	var mouseXD, mouseYD;
	
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
	
	document.addEventListener("wheel", scrolls);
	
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
			// Расчет координат
			t = 2*Math.PI/360 * bodyr[j].n;
			var x = bodyr[j].a * Math.cos(t);
			var y = bodyr[j].b * Math.sin(t) ;
			tg = (t*180/Math.PI);
			// Обновление угла
			bodyr[j].n += bodyr[j].sp;
			if (bodyr[j].n > 360) bodyr[j].n = 0;
			// Расчет размеров
			var s = bodyr[j].s;
			if(tg < 90)
				s += tg / 90 * s/2;
			else if(tg < 180)
				s += s/2 - (tg % 90) / 90 * s/2;
			else if(tg < 270)
				s -= (tg % 90) / 90 * s/2;
			else if(tg < 360)
				s -= s/2 - (tg % 90) / 90 * s/2;
			
			// Отрисовка траектории
			ctx.strokeStyle = "#444";
			ctx.beginPath();
			ctx.shadowColor = "#444";
			ctx.shadowBlur = 0;
			for(var i = 0; i <= 180; i++)
			{
				var tt = 2*Math.PI/180 * i;
				var xx = bodyr[j].a * Math.cos(tt) / mas + x0 + dx;
				var yy = bodyr[j].b * Math.sin(tt) / mas + y0 + dy;
				if(i == 0) ctx.moveTo(xx,yy	);
				ctx.lineTo(xx,yy);
			}
			ctx.closePath();
			ctx.stroke();
			
			ctx.shadowBlur = 5;
			ctx.shadowColor = bodyr[j].c;
			
			var sss = s / mas;
			sss = sss < 1 ? 1 : sss;
			
			
			var fx = x / mas + x0 + dx;
			var fy = y / mas + y0 + dy;
			
			ctx.font = 12+"px Consolas, Lucida Console, monospace";
			ctx.fillStyle = "#aaa";
			ctx.shadowBlur = 0;
			ctx.fillText(bodyr[j].name, fx+10 , fy-10);
			//Отрисовка тела
			ctx.shadowBlur = 5;
			drowCircle(fx,fy,sss,bodyr[j].c);
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