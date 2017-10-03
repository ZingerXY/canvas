var canvas;
var ctx;
var circle = [];

var cmin = 10; // минимальный радиус
var cmax = 25; // максимальный радиус
var maxcolor = 225; // яркость кружков
var ms = 4; // максимальная скорость
var radc = 200; // радиус отталкивания от мыши

var coordx = 0;
var coordy = 0;

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
		createCirele(e.clientX, e.clientY);
	else
	circle.forEach(function(item, i, arr) {
			var d = Math.pow(arr[i].x - coordx,2) + Math.pow(arr[i].y - coordy,2);
			if(d <= Math.pow(arr[i].r,2))
				arr.splice(i, 1);			
		});
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
function createCirele(x,y,r,c) {
	r = r == undefined ? Randf(cmin,cmax) : r;
	x = x == undefined ? Randf(0 + r,window.innerWidth - r) : x;
	y = y == undefined ? Randf(0 + r,window.innerHeight - r) : y;
	c = c == undefined ? colorGen() : c;
	vx = Randf(-ms/2,ms/2);
	vy = Randf(-ms/2,ms/2);
	circle.push({x: x, y: y, r: r, c: c, vx: vx, vy: vy});
}

function drowflower(x,y,r,c){
	var s = 7;
	drowCircle(x,y,r,c);
	var rad = 0;
	for(var i = 0; i<s; i++) {
		rad += 2*Math.PI/s;
		c = colorGen();
		var dx = x + Math.cos(rad)*r;
		var dy = y + Math.sin(rad)*r;
		drowCircle(dx,dy,r/2,c);
	}
}

function drowflock(x,y,r,c){
	var s = 7;
	drowCircle(x,y,r,c);
	var rad = 0;
	var co = 3;
	do {
		for(var i = 0; i<s*co; i++) {
			rad += 2*Math.PI/(s*co);
			var dx = x + Math.cos(rad)*r*(0.6+co);
			var dy = y + Math.sin(rad)*r*(0.6+co);
			drowCircle(dx,dy,r/(1+co),c);
		}
		co--;
	} while (co > 0)
}

function drowfigure(e){
	var s = 7;
	var x = e.clientX;
	var y = e.clientY;
	var r = 100;
	var c = colorGen();
	drowCircle(x,y,r,c);
	var rad = 0;
	var co = 3;
	do {
		for(var i = 0; i<s*co; i++) {
			rad += 2*Math.PI/(s*co);
			c = colorGen();
			var dx = x + Math.cos(rad)*r*(0.6+co);
			var dy = y + Math.sin(rad)*r*(0.6+co);
			drowCircle(dx,dy,r/(1+co),c);
		}
		co--;
	} while (co > 0)
}

function deleteCirele(){
	if(circle.length > 10){
		var r = Rand(circle.length,50);
		if(r>25) 
			circle.splice(Rand(0,circle.length-1), 1);
	}
}


// Перерисовка положения кружочков
function nextRound() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	circle.forEach(function(item, i, arr) {
		arr[i].x += arr[i].vx;
		arr[i].y += arr[i].vy;	
		// Рандомное изменение направления
		/*arr[i].vx += Rand(-1,1);
		arr[i].vy += Rand(-1,1);*/
		// Кружочки убегают от мышки		
			
		if(to == 1) {
			arr[i].vx += arr[i].x > coordx ? Math.random() : -Math.random();
			arr[i].vy += arr[i].y > coordy ? Math.random() : -Math.random();
		}
		else if(to == 2){
			arr[i].vx += arr[i].x > coordx ? -Math.random() : Math.random();
			arr[i].vy += arr[i].y > coordy ? -Math.random() : Math.random();
		} else {
			var d = Math.pow(arr[i].x - coordx,2) + Math.pow(arr[i].y - coordy,2);
			if(d <= Math.pow(radc,2)) {
				var xx = (Math.abs(coordx - arr[i].x)-radc)/radc;
				var yy = (Math.abs(coordy - arr[i].y)-radc)/radc;
				arr[i].vx += arr[i].x > coordx ? -xx : xx;
				arr[i].vy += arr[i].y > coordy ? -yy : yy;
			}	
		}
		// Ограничение скорости	
		arr[i].vx = clamp(arr[i].vx, -ms, ms);
		arr[i].vy = clamp(arr[i].vy, -ms, ms);		
		// Попыта сделать отталкивание друг от друга не удалась...
		/*for(var j in circle){
			if(j!=i) {
				var dd = Math.pow(arr[i].x - circle[j].x,2) + Math.pow(arr[i].y - circle[j].y,2);
				if(dd == Math.pow(arr[i].r + circle[j].r,2)){
					arr[i].vx = -arr[i].vx;
					arr[i].vy = -arr[i].vy;
				}		
			}
		}*/
		// Отталкивание от стен
		if(arr[i].x - arr[i].r < 0 || arr[i].x + arr[i].r > window.innerWidth)
			arr[i].vx = -arr[i].vx;
		if(arr[i].y - arr[i].r < 0 || arr[i].y + arr[i].r > window.innerHeight)
			arr[i].vy = -arr[i].vy;
		// Чтоб не улетали за пределы экрана
		arr[i].x = clamp(arr[i].x, arr[i].r, window.innerWidth - arr[i].r);
		arr[i].y = clamp(arr[i].y, arr[i].r, window.innerHeight - arr[i].r);
		// Замкнутое полотно
		/*arr[i].x = clampM(arr[i].x, 0, window.innerWidth);
		arr[i].y = clampM(arr[i].y, 0, window.innerHeight);*/
		// Отривока
		//drowCircle(arr[i].x, arr[i].y, arr[i].r, arr[i].c);
		drowflock(arr[i].x, arr[i].y, arr[i].r, arr[i].c);
	});
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
	canvas.ondblclick = function(){to++; if(to>2) to =0;};
	//canvas.click(drowfigure);
	ctx = canvas.getContext('2d');
	// Создание новых кружков каждую секунду
	setInterval(createCirele, 1000);
	setInterval(deleteCirele, 500);
	// Отрисовка изображения каждые 25 мс
	setInterval(nextRound, 25);	
	//drowfigure();
}

window.onload = main;