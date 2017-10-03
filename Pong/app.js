function Сircle() {
	var circle = {
		x: window.innerWidth/2, 
		y: window.innerHeight/2, 
		r: 20, 
		c: colorGen(), 
		vx: 5, 
		vy: 0
	};
	
	var cd = {x0: 0, y0: 0, x1: 0, y1: 0, dx: 0, dy: 0};
	var ms = 500; // максимальная скорость
	var timer = 0;
	var zInd = 0;
	var click = false; 
	var gs = 2; // ускорение свободного падения
	var fsiz = 18; // размер шрифта
	var fps = 30;
	
	var audio = new Audio();
	audio.preload = 'auto';
	//audio.src = 'tik.wav';
	audio.src = 'data:audio/wav;base64,' +
	'UklGRmACAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YTwCAACAgIB+fn6Afn6AgH6Afn6BfXuBgXp+' +
	'goR9foGJc3qFfnh2iIt7hI52foXmSdHmsRfmvReieoIXfkjm5lVCbuYXF0mBF8q+WuaRSGKdfiRqgIJi1rNqlmp3' +
	'SHZ9ZmqsrGd3kn5Ve5J7epl9dGpsY1WMcYmHfoiAdGBmdlh7mIiHkX59enZccJiRcICIem1xfXt7k4iLlZFzfYFx' +
	'doGIi6KOhXpzd2l+d4CPj4iFdnZud3h3gYmBgoVwhYVugISChIiBgnuCeH2HfoGJiYCBfYB3fYR7iImCi4GHfYCB' +
	'gIiEgX14d4F6gISHhIWIfXt6d3d6goCFiYF+e3Z0eHh+gIGChH56e359goh+goKEe3uAe32BhYSFgYGIfYCAhYB9' +
	'gn5+fYJ6gHqAfX17fn19gIKCfYKCgHp+enh7fX2AgYCBe317e357foCEgoeAfnt+e3uAgYGBhICAe32AfYCEgoCB' +
	'gIB7e3t7fn6BgIF+fn14fn19gIGAgIF+fn5+foCCfoCCgH2AgH1+gIB+fX5+gH2BgIJ+gIB+fX57e359gIGBgIB9' +
	'fn19fYCBgX6AgXt9foB+gISBgYGAfoCBfn6BgYGBgH6Afn5+gIB+foGAfn6Afn1+gH6AgICAfn5+fYB+fX5+fX2A' +
	'fn5+fn59gIB+fn5+foCAfoCAfn5+fn5+gIF+foB+fn1+foCAgICAgH2AfoB+gICAfn6Afn59fn59fn5+fn5+gH5+' +
	'gICAgICAfn5+gH6AgICAgIB+gICBgA==';
	
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');
	// Управление
	document.onkeydown = function(e){
		switch (e.keyCode){
			case 88: zInd = zInd ? 0 : 9999; canvas.style.zIndex = zInd; break;
			case 87: circle.vy-=3; break;
			case 83: circle.vy+=3; break;
			case 65: circle.vx-=3; break;
			case 68: circle.vx+=3; break;
			case 32: circle.vy = -10; break;
		}
	};	
	document.onmousedown = function(e) { 			
			var d = Math.pow(circle.x - e.clientX,2) + Math.pow(circle.y - e.clientY,2);
			if(d <= Math.pow(circle.r,2)) {	
				click = true;
				circle.vy = 0;
				circle.vx = 0;
				for(var i in cd)
					cd[i] = 0;
			}				
	}
	document.onmouseup = function(e) { 
		click = false;
		var d = Math.pow(circle.x - e.clientX,2) + Math.pow(circle.y - e.clientY,2);
		if(d <= Math.pow(circle.r,2)) {	
			circle.vx = cd.dx;
			circle.vy = cd.dy;
		}
	}
	document.onmousemove = function(e) { 
		if(click) {
			cd.x0 = cd.x1;
			cd.y0 = cd.y1;
			cd.x1 = circle.x = e.clientX; 
			cd.y1 = circle.y = e.clientY;
			cd.dx = cd.x1 - cd.x0;
			cd.dy = cd.y1 - cd.y0;
		}
	}
	
	this.info = function() {
		console.log("x: "+circle.x+" y: "+circle.y+" vx:"+circle.vx+" vy:"+circle.vy);
	}
	
	this.Stop = function() {
		clearInterval(timer);
		timer = 0;
	}
	
	this.Start = function() {
		if(!timer)
			timer = setInterval(nextRound, 1000/fps);
	}
	
	function colors(r,g,b) {
		var max = 200, min = 50;
		if(r == max)
			if(b == max)r--;
			else if(g==min&&b>=min) b++;
			else if (b==min&&g>min)	g--;
		else if(g == max) 
			if(r == max) g--;
			else if(b==min&&r>=min) r++;
			else if (r==min&&b>min)	b--;
		else if(b == max) 
			if(g == max) b--;
			else if(r==min&&g>=min) g++;
			else if (g==min&&r>min)	r--;
		return [r,g,b];
	}
	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
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
	function clamp(p, min, max) {
		return p >= max ? max : p < min ? min : p;
	}
	// Рисование круга координаты центра, радиус и цвет
	function drowCircle(x,y,r,c) {	
		ctx.fillStyle = c;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true); // Outer circle
		ctx.fill();
	}
	// Перерисовка
	function nextRound() {
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		// Притяжение
		if(!click)
			circle.vy += gs;
		// Ограничение скорости	
		circle.vx = clamp(circle.vx, -ms, ms);
		circle.vy = clamp(circle.vy, -ms, ms);
		// Смещение по вектору
		circle.x += circle.vx;
		circle.y += circle.vy;	
		// Отталкивание от стен
		if(circle.x - circle.r < 0 || circle.x + circle.r > window.innerWidth) {
			circle.vx = -circle.vx*0.90;
			audio.volume = clamp(Math.abs(circle.vx) * 0.05, 0, 1);
			audio.play();
		}
		if(circle.y - circle.r < 0 || circle.y + circle.r > window.innerHeight) {
			circle.vy = -circle.vy*0.90;
			if(Math.abs(circle.vy) < gs)
				circle.vy = 0;
			circle.vx = circle.vx*0.99;
			if(Math.abs(circle.vx) < 0.5)
				circle.vx = 0;
			if(Math.abs(circle.vy)>gs) {			
				audio.volume = clamp(Math.abs(circle.vy) * 0.05, 0, 1);
				audio.play();
			}
				
		}
		// Чтоб не улетали за пределы экрана
		circle.x = clamp(circle.x, circle.r, window.innerWidth - circle.r);
		circle.y = clamp(circle.y, circle.r, window.innerHeight - circle.r);
		// Замкнутое полотно
		/*circle.x = clampM(circle.x, 0, window.innerWidth);
		circle.y = clampM(circle.y, 0, window.innerHeight);*/
		// Отривока
		drowCircle(circle.x, circle.y, circle.r, circle.c);
		ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		ctx.fillStyle = circle.c;
		ctx.shadowColor = circle.c;
		ctx.shadowBlur = 5;
		ctx.fillText("x: "+circle.x.toFixed(3), 5, fsiz);
		ctx.fillText("y: "+circle.y.toFixed(3), 5, fsiz*2);
		ctx.fillText("vx: "+circle.vx.toFixed(3), 5, fsiz*3);
		ctx.fillText("vy: "+circle.vy.toFixed(3), 5, fsiz*4);
	}
	this.Start();
}
var circle;
window.onload = function(){circle = new Сircle;};