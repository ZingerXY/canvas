var canvas;
var ctx;
var points = [];
var txt;
var ainput;
var binput

var maxcolor = 225; // яркость

var coordx = 0;
var coordy = 0;
var white = false;
var posTop = 50;
var step = 1/10;
var widthRange = 300;
var maxRange = 100;

var ab = {a: 1, ax: 0.001, cha: false, b: 1, bx: 0.001, chb: false};

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
// Точка
function Point(x,y,c) {
	this.x = x == undefined ? Randf(0,window.innerWidth) : x;
	this.y = y == undefined ? Randf(0,window.innerHeight) : y;
	this.c = c == undefined ? colorGen() : c;
}
// Добавление точки
function AddPoint() {
	points.push(new Point());
}
// Отрисовка
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
			ctx.lineTo(points[i].x,points[i].y);
			// ctx.bezierCurveTo(center.x,center.y,center.x,center.y,points[i].x,points[i].y);
			p = points[i];
		}
		else {
			ctx.moveTo(point.x,point.y);
			ctx.lineTo(points[i].x,points[i].y);
			// ctx.bezierCurveTo(center.x,center.y,center.x,center.y,points[i].x,points[i].y);
		}
		n++;
		ctx.stroke();
		point = points[i];
	}
	if(p) {
		ctx.moveTo(point.x,point.y);
		ctx.lineTo(p.x,p.y);
		// ctx.bezierCurveTo(center.x,center.y,center.x,center.y,p.x,p.y);
		ctx.stroke();
	}	
}
// Обновление состояния холста
function nextRound() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	//ctx.beginPath();
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	points = [];
	var center = {x: canvas.width/2, y: canvas.height/2};
	var c = "rgb(50,200,50)";
	if (ab.cha)  {
		ab.a += 0.001;
		ainput.value = ab.a * step;
	}
	if (ab.chb) {
		ab.b += 0.001;
		binput.value = ab.b * step;
	}
	ab.a = ab.a > maxRange ? 0 : ab.a;
	ab.b = ab.b > maxRange ? 0 : ab.b;
	var a = ab.a, b = ab.b;	
	for(var i = 0; i < 2580; i++) {
		var r = Math.sin(a * i * Math.PI / 180);
		var x = Math.sin(r * i * Math.PI / 180) / (Math.cos(a * r)) * 200;
		var y = Math.cos(r * i * Math.PI / 180) / (Math.cos(b * r)) * 200;
		points.push(new Point(x + center.x,y + center.y,c));
	}
	// Отрисовка
	drowPoints();
	// info
	txt.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	txt.canvas.width = window.innerWidth;
	txt.canvas.height = window.innerHeight;
	var fsiz = 18;
	txt.ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
	txt.ctx.fillStyle = "#fff";
	txt.ctx.fillText("a: " + ab.a.toFixed(3), 11 + widthRange, fsiz + posTop);
	txt.ctx.fillText("b: " + ab.b.toFixed(3), 11 + widthRange, fsiz * 2 + 42 + posTop);
}

function createCanvas(zInd) {
	zInd = zInd || 0;
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.insertBefore(canvas, document.body.firstChild);
	return {canvas: canvas, ctx:canvas.getContext('2d')};
}

function createInput(top) {
	top = top || 0;
	var input = document.createElement('input');
	input.type = "range";
	input.min = "0";
	input.max = maxRange * step;
	input.step = "1";
	input.value = 1 * step;
	input.style.position = "fixed";
	input.style.top = top+"px";
	input.style.left = "0px";
	input.style.margin = "3px";
	input.style.width = 1*widthRange+"px";
	input.style.zIndex = 150;
	document.body.appendChild(input, document.body.firstChild);
	return input;
}

function createStart(top) {
	top = top || 0;
	var input = document.createElement('input');
	input.type="button";
	input.value="Start / Stop";
	input.style.position = "fixed";
	input.style.top = top+"px";
	input.style.left = "20px";
	input.style.margin = "3px";
	input.style.zIndex = 150;
	document.body.appendChild(input, document.body.firstChild);
	return input;
}
//главная функция
function main() {
	var canv = createCanvas(100);
	canvas = canv.canvas;
	ctx = canv.ctx;
	txt = createCanvas(50);
	ainput = createInput(0 + posTop);
	ab.a = +ainput.value/step;
	ainput.onchange = function() {
		ab.a = +this.value/step;
	}
	var startA = createStart(30 + posTop);
	startA.onclick = function() {
		ab.cha = !ab.cha;
	}
	binput = createInput(60 + posTop);
	ab.b = +binput.value/step;
	binput.onchange = function() {
		ab.b = +this.value/step;
	}
	startB = createStart(90 + posTop);
	startB.onclick = function() {
		ab.chb = !ab.chb;
	}
	// Отрисовка изображения каждые 25 мс
	setInterval(nextRound, 30);	
	nextRound();
	document.onkeydown = keyevent;
}

window.onload = main;