var canvas;
var ctx;

var maxcolor = 225; // яркость кружков

var coordx = 0;
var coordy = 0;

var c = colorGen();

var maxr = 12;
var minr = 3;
var maxd = 200;
var mind = 1;

var arrtest = [];

var colorarr = [];
for(var n = 0; n < 901; n++)
	colorarr.push(col(n));

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
// Действия при движении мыши
function cursor(e) {
	coordx = e.clientX;
	coordy = e.clientY;
	if(e.which) // когда зажата ЛКМ
		c = colorGen();
}
// КЛАМП!! КЛАМП!!
function clamp(p, min, max) {
	return p >= max ? max : p < min ? min : p;
}
// Обратный КЛАМП!! КЛАМП!!
function clampM(p, min, max) {
	return p >= max ? min : p < min ? max : p;
}

function MathCircle(x,y) {
	var d = Math.sqrt(Math.pow(coordx-x, 2) + Math.pow(coordy-y,2));
	var dc = Math.sqrt(Math.pow(x, 2) + Math.pow(y,2));
	var r = 3;
	if(d < maxd)
		r =  Math.abs(maxr + (minr - maxr)*(d - mind)/(maxd - mind));
	var clr = Math.abs(900 + (1 - 900)*(dc - mind)/(maxdс - mind));
	c = colorarr[Math.round(clr)];
	/*var clr = Math.abs(4095 + (1 - 4095)*(d - mind)/(maxdс - mind));
	c = "#"+Math.round(clr).toString(16);*/
	//console.log(clr);
	r = clamp(r, minr, maxr);
	ctx.shadowColor = c;
	ctx.shadowBlur = r;
	drowCircle(x,y,r,c);
}

// Перерисовка положения кружочков
function nextRound() {
	var time = performance.now();
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	maxdс = canvas.width;
	/*c = "#fff";
	ctx.shadowColor = "#f00";
	ctx.shadowBlur = 5;*/	
	for(var y = 15; y < canvas.height; y += 40)
		for(var x = 15; x < canvas.width; x += 40)
			MathCircle(x,y);
	for(var y = 35; y < canvas.height; y += 40)
		for(var x = 35; x < canvas.width; x += 40)
			MathCircle(x,y);
	time = performance.now() - time;
	arrtest.push(time);
}

function showTest() {	
	var sum = 0;
	for(var i = 0; i < arrtest.length; i++)
		sum += arrtest[i];
	var average = sum/arrtest.length;
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
	document.body.insertBefore(canvas, document.body.firstChild);
	canvas.onmousemove = cursor;
	//canvas.click(drowfigure);
	ctx = canvas.getContext('2d');
	// Отрисовка изображения каждые 15 мс
	setInterval(nextRound, 15);
	//setInterval(showTest, 2500);
	//drowfigure();
}

window.onload = main;