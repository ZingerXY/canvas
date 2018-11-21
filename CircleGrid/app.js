var canvas;
var ctx;
var arc = [];

var maxcolor = 225; // яркость кружков

var coordx = 0;
var coordy = 0;

var c = colorGen();

var maxr = 12;
var minr = 3;
var maxd = 200;
var mind = 1;

var arrtest = [];
var speedtest = false;
var average = 0;

var colorarr = [];
for(var n = 0; n < 901; n++)
	colorarr.push(col(n));

//var point = {x: 10, y: 10, r: 2, vx: 3, vy: 3}
var point = {x: 10, y: 10, r: 2, vx: 10, vy: 0}

function colors(r,g,b){
	var d=200,e=50;
	r==d?b==d?r--:g==e&&b>=e?b++:b==e&&g>e&&g--:g==d?r==d?g--:b==e&&r>=e?r++:r==e&&b>e&&b--:b==d&&(g==d?b--:r==e&&g>=e?g++:g==e&&r>e&&r--);
	return [r,g,b];
}

function col(n) { // 1 - 900
	var a = [200,50,50];
	for(var i = 0; i < n; i++) 
		a = colors(a[0],a[1],a[2]);
	return "rgb("+a[0]+","+a[1]+","+a[2]+")";
}

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
function drowCircle(x,y,r,c) {	
	ctx.fillStyle = c;
	ctx.beginPath();
	// arc(x, y, radius, startAngle, endAngle, направление)
    ctx.arc(x,y,r,0,Math.PI*2,true); // Outer circle
    ctx.fill();
}
// События мыши и прикосновений
var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
var canvasPosition = {x: 0, y: 0};

function handleMouseDown(e) {
	isMouseDown = true;
	handleMouseMove(e);
	document.addEventListener("mousemove", handleMouseMove, true);
	document.addEventListener("touchmove", handleMouseMove, true);
}

function handleMouseUp() {
	document.removeEventListener("mousemove", handleMouseMove, true);
	document.removeEventListener("touchmove", handleMouseMove, true);
	isMouseDown = false;
	coordx = undefined;
	coordx = undefined;
}
// Действия мыши
function handleMouseMove(e) {
	var clientX, clientY;
	if(e.clientX) {
		clientX = e.clientX;
		clientY = e.clientY;
	}
	else if(e.changedTouches && e.changedTouches.length > 0) {
		var touch = e.changedTouches[e.changedTouches.length - 1];
		clientX = touch.clientX;
		clientY = touch.clientY;
	}
	else {
		return;
	}
	point.x = clientX;
	point.y = clientY;
	e.preventDefault();
};
// КЛАМП!! КЛАМП!!
function clamp(p, min, max) {
	return p >= max ? max : p < min ? min : p;
}
// Обратный КЛАМП!! КЛАМП!!
function clampM(p, min, max) {
	return p >= max ? min : p < min ? max : p;
}

function MathCircle(e, i, arr) {
	//d = Math.sqrt(Math.pow(point.x-e.x, 2) + Math.pow(point.y-e.y,2)); // точка
	d = Math.sqrt(Math.pow(point.x-e.x, 2)); // волна
	var r = e.r;
	if(d < maxd)
		r =  Math.abs(maxr + (minr - maxr)*(d - mind)/(maxd - mind));
	ctx.shadowColor = e.c;
	ctx.shadowBlur = r;
	drowCircle(e.x,e.y,r,e.c);
}

function MathColors(x,y,maxdc) {
	
	var dc = Math.sqrt(Math.pow(x, 2) + Math.pow(y,2));  // градиент с угла в угол	
	//var dc = Math.sqrt(Math.pow(x, 2)); // градиент с лева на право
	var clr = Math.abs(900 + (1 - 900)*(dc - mind)/(maxdс - mind));
	var c = colorarr[Math.round(clr)];
	/*var clr = Math.abs(4095 + (1 - 4095)*(d - mind)/(maxdс - mind));
	var c = "#"+Math.round(clr).toString(16);*/
	return colorarr[Math.round(clr)];
}

function createCircle() {
	arc = [];
	maxdс = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height,2));
	//maxdс = canvas.width;
	for(var y = 15; y < canvas.height; y += 40)
		for(var x = 15; x < canvas.width; x += 40)
			arc.push({x: x, y: y, c: MathColors(x,y), r: 3});
	for(var y = 35; y < canvas.height; y += 40)
		for(var x = 35; x < canvas.width; x += 40)
			arc.push({x: x, y: y, c: MathColors(x,y), r: 3});
}

// Перерисовка положения кружочков
function nextRound() {
	var time = 0;
	if (speedtest)
		time = performance.now();
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
	/*c = "#fff";
	ctx.shadowColor = "#f00";
	ctx.shadowBlur = 5;*/
	point.x += point.vx;
	point.y += point.vy;
	// Отталкивание от стен
	if(point.x - point.r < 0 || point.x + point.r > canvas.width)
		point.vx = -point.vx;
	if(point.y - point.r < 0 || point.y + point.r > canvas.height)
		point.vy = -point.vy;
	//drowCircle(point.x,point.y,point.r,"#fff");
	arc.forEach(MathCircle);
	if (speedtest) {
		arrtest.push(performance.now() - time);
		var fsiz = 18;
		ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		ctx.fillStyle = "#fff";
		ctx.shadowColor = "#fff";
		ctx.shadowBlur = 5;
		ctx.fillText("speed: "+Math.round(average*100)/100, 5, fsiz);
	}
}

function showTest() {	
	var sum = 0;
	for(var i = 0; i < arrtest.length; i++)
		sum += arrtest[i];
	average = sum/arrtest.length;
	console.log(average);
}

function main() //главная функция
{	
	zInd = 0;
	canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.style.cursor = "none";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;	
	createCircle();
	document.body.insertBefore(canvas, document.body.firstChild);
	canvas.addEventListener("mousedown", handleMouseDown, true);
	canvas.addEventListener("touchstart", handleMouseDown, true);
	canvas.addEventListener("mouseup", handleMouseUp, true);
	canvas.addEventListener("touchend", handleMouseUp, true);
	//canvas.click(drowfigure);
	ctx = canvas.getContext('2d');
	// Отрисовка изображения каждые 15 мс
	setInterval(nextRound, 25);
	if(speedtest)
		setInterval(showTest, 1000);
	//drowfigure();
}

window.onload = main;