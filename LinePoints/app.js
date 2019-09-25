var canvas;
var ctx;
var points = [];

var maxcolor = 225; // яркость кружков
var ms = 4; // максимальная скорость
var radc = 200; // радиус отталкивания от мыши

var coordx = 0;
var coordy = 0;
var white = false;

var to = 0;

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
// Действия при движении мыши
function cursor(e) {
	coordx = e.clientX;
	coordy = e.clientY;
	if(e.which) // когда зажата ЛКМ
		points.push(new Point(coordx,coordy));
}
function keyevent(e){
		console.log(e.keyCode);
		switch (e.keyCode){
			/*case 88: zInd = zInd ? 0 : 9999; canvas.style.zIndex = zInd; break;
			case 87: circle.vy-=3; break;
			case 83: circle.vy+=3; break;
			case 65: circle.vx-=3; break;
			case 68: circle.vx+=3; break;*/
			case 32: white = !white; break;
		}
}
// КЛАМП!! КЛАМП!!
function clamp(p, min, max) {
	return p >= max ? max : p < min ? min : p;
}
// Обратный КЛАМП!! КЛАМП!!
function clampM(p, min, max) {
	return p >= max ? min : p < min ? max : p;
}

function Point(x,y,c) {
	this.x = x == undefined ? Randf(0,window.innerWidth) : x;
	this.y = y == undefined ? Randf(0,window.innerHeight) : y;
	this.vx = Randf(-ms/2,ms/2);
	this.vy = Randf(-ms/2,ms/2);
	this.c = c == undefined ? colorGen() : c;
}

function AddPoint() {
	points.push(new Point());
}

function drowPoints(){
	var p;
	var point;
	var n = 0;
	var center = {x: canvas.width/2, y: canvas.height/2};
	ctx.strokeStyle= "rgb(50,200,50)";	
	for(var i in points) {
		ctx.beginPath()
		if(white)
			ctx.strokeStyle = "white";
		else
			ctx.strokeStyle = points[i].c;
		if(n == 0) {
			ctx.moveTo(points[i].x,points[i].y);
			// ctx.lineTo(points[i].x,points[i].y);
			ctx.bezierCurveTo(center.x,center.y,center.x,center.y,points[i].x,points[i].y);
			p = points[i];
		}
		else {
			ctx.moveTo(point.x,point.y);
			// ctx.lineTo(points[i].x,points[i].y);
			ctx.bezierCurveTo(center.x,center.y,center.x,center.y,points[i].x,points[i].y);
		}
		n++;
		ctx.stroke();
		point = points[i];
	}
	if(p) {
		ctx.moveTo(point.x,point.y);
		// ctx.lineTo(p.x,p.y);
		ctx.bezierCurveTo(center.x,center.y,center.x,center.y,p.x,p.y);
		ctx.stroke();
	}	
}
// Обновление состояния холста
function nextRound() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	//ctx.beginPath();
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	points.forEach(function(item) {
		item.x += item.vx;
		item.y += item.vy;	
		// Рандомное изменение направления
		/*item.vx += Rand(-1,1);
		item.vy += Rand(-1,1);*/
		// Кружочки убегают от мышки					
		if(to == 1) {
			item.vx += item.x > coordx ? Math.random() : -Math.random();
			item.vy += item.y > coordy ? Math.random() : -Math.random();
		}
		else if(to == 2){
			item.vx += item.x > coordx ? -Math.random() : Math.random();
			item.vy += item.y > coordy ? -Math.random() : Math.random();
		}
		else if(to == 3){
			var d = Math.pow(item.x - coordx,2) + Math.pow(item.y - coordy,2);
			if(d <= Math.pow(radc,2)) {
				var xx = (Math.abs(coordx - item.x)-radc)/radc;
				var yy = (Math.abs(coordy - item.y)-radc)/radc;
				item.vx += item.x > coordx ? -xx : xx;
				item.vy += item.y > coordy ? -yy : yy;
			}	
		}
		// Ограничение скорости	
		item.vx = clamp(item.vx, -ms, ms);
		item.vy = clamp(item.vy, -ms, ms);		
		// Отталкивание от стен
		if(item.x < 0 || item.x > window.innerWidth)
			item.vx = -item.vx;
		if(item.y < 0 || item.y > window.innerHeight)
			item.vy = -item.vy;
		// Чтоб не улетали за пределы экрана
		item.x = clamp(item.x, 0, window.innerWidth);
		item.y = clamp(item.y, 0, window.innerHeight);
		// Замкнутое полотно
		/*item.x = clampM(item.x, 0, window.innerWidth);
		item.y = clampM(item.y, 0, window.innerHeight);*/
	});
	// Отривока
	drowPoints();
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
	document.body.insertBefore(canvas, document.body.firstChild);
	canvas.onmousemove = cursor;
	canvas.ondblclick = function(){to++; if(to>3) to =0;};
	//canvas.click(drowfigure);
	ctx = canvas.getContext('2d');
	// Отрисовка изображения каждые 25 мс
	setInterval(nextRound, 25);	
	// Добавляем точку каждые 2 сек
	//setInterval(AddPoint, 2000);
	//drowfigure();
	document.onkeydown = keyevent;
}

window.onload = main;