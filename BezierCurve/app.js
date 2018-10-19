var canvas;
var ctx;
var curves = [];

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
function drowCircle(p,r,c) {	
	ctx.fillStyle = c;
	ctx.beginPath();
	// arc(x, y, radius, startAngle, endAngle, направление)
    ctx.arc(p.x,p.y,r,0,Math.PI*2,true); // Outer circle
    ctx.fill();
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
function createCurve(x,y,r,c) {
	r = r == undefined ? Randf(cmin,cmax) : r;
	x = x == undefined ? Randf(0 + r,window.innerWidth - r) : x;
	y = y == undefined ? Randf(0 + r,window.innerHeight - r) : y;
	c = c == undefined ? colorGen() : c;
	vx = Randf(-ms/2,ms/2);
	vy = Randf(-ms/2,ms/2);
	curves.push({x: x, y: y, r: r, c: c, vx: vx, vy: vy});
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
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//curves.forEach(function(item, i, arr) {		
		var color = "#fff";
		var rad = 5;
		var step = Rand(1, 5);
		
		ctx.strokeStyle = color;
		ctx.lineWidth = 3;
		ctx.shadowColor = "#fff";
		ctx.shadowBlur = 10;
	
		var point_start = {x: canvas.width / 2, y: 0};
		var point_end = {x: canvas.width / 2, y: canvas.height};	

		if(points_control.st) {
			if(points_control.p1.x < points_control.max) {
				points_control.p1.x += step;
				points_control.p2.x -= step;
			} else
				points_control.st = false;
		} else {
			if(points_control.p1.x > points_control.min) {
				points_control.p1.x -= step;
				points_control.p2.x += step;
			} else
				points_control.st = true;
		}
		
		/*drowCircle(point_start,rad,color)
		drowCircle(point_end,rad,color)
		drowCircle(points_control.p1,rad,color)
		drowCircle(points_control.p2,rad,color)*/
		
		drowBezier(point_start,points_control.p1,points_control.p2,point_end);
	//});
}

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
	points_control = 	{	
							p1: {x: canvas.width / 2 * 2/3, y: canvas.height/4}, 
							p2: {x: canvas.width / 2 * 4/3, y: canvas.height * 3/4},
							min: canvas.width / 2 * 2/3,
							max: canvas.width / 2 * 4/3,
							st: true
						};
	document.body.insertBefore(canvas, document.body.firstChild);
	canvas.onmousemove = cursor;
	ctx = canvas.getContext('2d');	
	// Отрисовка изображения каждые 25 мс
	setInterval(nextRound, 25);
	//nextRound();
}

window.onload = main;