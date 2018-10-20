var canvas;
var ctx;
var curves = [];
var curvesCircle = [];
var center = {};

var maxcolor = 225; // макс яркость при генерации цвета

var coordx = 0;
var coordy = 0;

var to = 0;
var points_control = {};

function Rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Randf(min, max) {
	return Math.random() * (max - min + 1) + min;
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
// Рисование круга координаты центра, радиус и цвет
function drowCircle(p,r,c,type) {	
	type = type || "fill";
	
	ctx.beginPath();
	// arc(x, y, radius, startAngle, endAngle, направление)
    ctx.arc(p.x,p.y,r,0,Math.PI*2,true); // Outer circle
	if(type == "stroke") {
		ctx.strokeStyle = c;
		ctx.stroke();
	}
	else {
		ctx.fillStyle = c;
		ctx.fill();
	}
}
// Действия при движении мыши
function cursor(e) {
	coordx = e.clientX;
	coordy = e.clientY;
	if(e.which) // когда зажата ЛКМ
		return;
	else
		return;
}
// КЛАМП!! КЛАМП!!
function clamp(p, min, max) {
	return p >= max ? max : p < min ? min : p;
}
// Обратный КЛАМП!! КЛАМП!!
function clampM(p, min, max) {
	return p >= max ? min : p < min ? max : p;
}
// Создание кружочка с параметрами: коориныты центра, радиус, цвет
function createCurve(curves, p1, p2, min, max, pS, pE, rad) {
	xS = pS ? pS.x : canvas.width / 2 ;
	yS = pS ? pS.y : 0;
	rS = pS ? pS.r : 0;
	xE = pE ? pE.x : canvas.width / 2;
	yE = pE ? pE.y : canvas.height;
	rE = pE ? pE.r : 0;
	x1 = p1 ? p1.x : Randf(0,canvas.width);
	y1 = p1 ? p1.y : Randf(0,canvas.height);
	rad1 = p1 ? p1.rad : 0;
	r1 = p1 ? p1.r : 0;
	x2 = p2 ? p2.x : Randf(0,canvas.width);
	y2 = p2 ? p2.y : Randf(0,canvas.height);
	rad2 = p2 ? p2.rad : 0;
	r2 = p1 ? p2.r : 0;
	min = min || Math.min(x1,x2) / 2 * 1/4;
	max = max || Math.max(x1,x2) / 2 * 7/4;
	rad = rad || 0;
	curves.push({	
					p1: {x: x1, y: y1, rad: rad1, r: r1, st: true, sr: true}, 
					p2: {x: x2, y: y2, rad: rad2, r: r2, st: true, sr: true},
					pS: {x: xS, y: yS, r: rS},
					pE: {x: xE, y: yE, r: rE},
					min: min,
					max: max,
					color: colorGen(),
					line: 2,
					rad: rad
				});
}

function drowBezier(ps,pc1,pc2,pe) {
	ctx.beginPath();
	ctx.moveTo(ps.x,ps.y);
	ctx.bezierCurveTo(pc1.x,pc1.y,pc2.x,pc2.y,pe.x,pe.y);
	ctx.stroke();
}

// Перерисовка положения кружочков
function nextRound() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	var remove = false;
	if(canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
		remove = true;
		center = {x: canvas.width / 2,y: canvas.height / 2};
	}
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var color = "rgba(255, 255, 255, 0.75)";
	
	/*curves.forEach(function(item, i, arr) {		
		
		var rad = 5;
		var step = Randf(2, 4);
		
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.shadowColor = "rgb(0, 120, 255);";
		ctx.shadowBlur = 5;
	
		var point_start = {x: canvas.width / 2, y: 0};
		var point_end = {x: canvas.width / 2, y: canvas.height};	
		
		if(item.p1.st) {
			if(item.p1.x < item.max) {
				item.p1.x += step;
			} else
				item.p1.st = false;
		} else {
			if(item.p1.x > item.min) {
				item.p1.x -= step;
			} else
				item.p1.st = true;
		}
		
		if(item.p2.st) {
			if(item.p2.x < item.max) {
				item.p2.x += step;
			} else
				item.p2.st = false;
		} else {
			if(item.p2.x > item.min) {
				item.p2.x -= step;
			} else
				item.p2.st = true;
		}
		
		// drowCircle(item.pS,rad,color);
		// drowCircle(item.pE,rad,color);
		// drowCircle(item.p1,rad,color);
		// drowCircle(item.p2,rad,color);	
		
		drowBezier(item.pS,item.p1,item.p2,item.pE);
	});*/
	
	curvesCircle.forEach(function(item, i, arr) {		
		
		var rad = 5;
		var step = Math.PI/360;
		
		ctx.strokeStyle = item.color//"rgba(255, 255, 255, 0.75)";//;
		ctx.lineWidth = item.line;
		/*ctx.shadowColor = "rgb(0, 120, 255)";
		ctx.shadowBlur = 5;*/
		c = center;
		
		if(remove) {
			item.pS.x = c.x + Math.cos(item.rad)*item.pS.r;
			item.pS.y = c.y + Math.sin(item.rad)*item.pS.r;
			item.pE.x = c.x + Math.cos(item.rad)*item.pE.r;
			item.pE.y = c.y + Math.sin(item.rad)*item.pE.r;
		}
		
		if(item.p1.st) {
			if(item.p1.rad <= item.max) {
				item.p1.rad += step;
			} else
				item.p1.st = false;
		} else {
			if(item.p1.rad >= item.min) {
				item.p1.rad -= step;
			} else
				item.p1.st = true;
		}
		
		if(item.p2.st) {
			if(item.p2.rad <= item.max) {
				item.p2.rad += step;
			} else
				item.p2.st = false;
		} else {
			if(item.p2.rad >= item.min) {
				item.p2.rad -= step;
			} else
				item.p2.st = true;
		}
		
		if(item.p2.sr) {
			if(item.p2.r <= item.pE.r) {
				item.p2.r += Rand(0, 4);
			} else
				item.p2.sr = false;
		} else {
			if(item.p2.r >= item.pS.r) {
				item.p2.r -= Rand(0, 3);
			} else
				item.p2.sr = true;
		}
		
		if(item.p2.sr) {
			if(item.p2.r <= item.pE.r) {
				item.p2.r += Rand(0, 3);
			} else
				item.p2.sr = false;
		} else {
			if(item.p2.r >= item.pS.r) {
				item.p2.r -= Rand(0, 3);
			} else
				item.p2.sr = true;
		}
		
		item.p1.x = c.x + Math.cos(item.p1.rad)*item.p1.r;
		item.p1.y = c.y + Math.sin(item.p1.rad)*item.p1.r;
		item.p2.x = c.x + Math.cos(item.p2.rad)*item.p2.r;
		item.p2.y = c.y + Math.sin(item.p2.rad)*item.p2.r;
		
		/*drowCircle(item.pS,rad,color,null);
		drowCircle(item.pE,rad,color,null);
		drowCircle(item.p1,rad,"rgb(255, 120, 0)",null);
		drowCircle(item.p2,rad,"rgb(0, 120, 255)",null);*/
		
		drowBezier(item.pS,item.p1,item.p2,item.pE);
	});
	
	//drowCircle({x: canvas.width / 2,y: canvas.height / 2},10,"#000");
	
	/*drowCircle({x: canvas.width / 2,y: canvas.height / 2},50,color,"stroke");
	drowCircle({x: canvas.width / 2,y: canvas.height / 2},350,color,"stroke");*/
}

/*

rad = 2*Math.PI/(количество долей круга) * (нужная долька)
dx = x + Math.cos(rad)*r;
dy = y + Math.sin(rad)*r;

*/

function main() //главная функция
{
	zInd = 0;
	canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	/*points_control = 	{	
							p1: {x: canvas.width / 2 * 2/3, y: canvas.height/4, st: true}, 
							p2: {x: canvas.width / 2 * 4/3, y: canvas.height * 3/4, st: true},
							min: canvas.width / 2 * 1/3,
							max: canvas.width / 2 * 5/3
						};*/
	
	for(var i = 0; i < 10; i++) {
		createCurve(curves, {x: canvas.width / 2 * 2/3, y: canvas.height/4}, {x: canvas.width / 2 * 4/3, y: canvas.height * 3/4}, canvas.width / 2 * 1/3, canvas.width / 2 * 5/3, null, null);
	}
	
	center = {x: canvas.width / 2,y: canvas.height / 2};
	c = center;
	var gip = Math.sqrt(Math.pow(c.x,2) + Math.pow(c.y,2));
	
	for(var i = 1; i <= 500; i++) {
		rad = Randf(0, 2*Math.PI);//2*Math.PI/10 * i;
		rS = Rand(2, 50);
		xS = c.x + Math.cos(rad)*rS;
		yS = c.y + Math.sin(rad)*rS;
		rE = Rand(350, gip);
		xE = c.x + Math.cos(rad)*rE;
		yE = c.y + Math.sin(rad)*rE;
		r1 = 150//Rand(rS, rE);
		x1 = c.x + Math.cos(rad + Math.PI/10)*r1;
		y1 = c.y + Math.sin(rad + Math.PI/10)*r1;
		r2 = 300//Rand(rS, rE);
		x2 = c.x + Math.cos(rad - Math.PI/10)*r2;
		y2 = c.y + Math.sin(rad - Math.PI/10)*r2;
		createCurve(curvesCircle, {x:x1, y:y1, rad: rad + Math.PI/10, r: r1}, {x:x2, y:y2, rad: rad - Math.PI/10, r: r2}, rad - Math.PI/10, rad + Math.PI/10, {x:xS, y:yS, r:rS}, {x:xE, y:yE, r:rE}, rad);
	}
	
	document.body.insertBefore(canvas, document.body.firstChild); 
	canvas.onmousemove = cursor;
	ctx = canvas.getContext('2d');	
	// Отрисовка изображения каждые 25 мс
	setInterval(nextRound, 30);
	//nextRound();
}

window.onload = main;
