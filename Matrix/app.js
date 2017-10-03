var canvas;
var ctx;
var minn = 29, maxx = 35;
var a = [];
var b = [];
var obj = {};

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
// КЛАМП!! КЛАМП!!
function clamp(p, min, max) {
	return p >= max ? max : p < min ? min : p;
}
// Обратный КЛАМП!! КЛАМП!!
function clampM(p, min, max) {
	return p >= max ? min : p < min ? max : p;
}

function drowstr(str, h) {
	ctx.fillStyle = "#0F0";
    ctx.font = "18px Consolas, Lucida Console, monospace";
	ctx.shadowColor = "#0F0";
    ctx.shadowBlur = 3;
	/*ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;*/
    ctx.fillText(str, 2, h);
}

function wrapText(text)
{
	var maxWidth = document.getElementById("canvas").width;
	var marginTop = 18;
	var lineHeight = 18;
	var words = text.split("");
	var countWords = words.length;
	var line = "";
	ctx.fillStyle = "#0F0";
	ctx.font = "18px Consolas, Lucida Console, monospace";
	ctx.shadowColor = "#0F0";
	ctx.shadowBlur = 3;
	for (var n = 0; n < countWords; n++) {
		var testLine = line + words[n] + "";
		var testWidth = ctx.measureText(testLine).width;
		if (testWidth > maxWidth) {
			ctx.fillText(line, 2, marginTop);
			line = words[n] + "";
			marginTop += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	ctx.fillText(line, 2, marginTop);
}
// Катакана
//var str = "";for(var n = 0x30A0; n<0x30FF; n++) str+=String.fromCharCode(n);wrapText(str);

function randi(n, m) {
	var p = Rand(n, m);
	if(p < 20) return Rand(48, 57);
	if(p >= 20 && p <= 30) return Rand(59, 126);
	if(p > 30) return 32;
}
// Перерисовка положения кружочков
function nextRound() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.font = "18px Consolas, Lucida Console, monospace";
	var l = Math.floor(window.innerWidth/ctx.measureText('0').width);
	a = [];
	for(var i = 0; i < l; i++) {
		if(a[i] != ' ' && b[i] != ' ') a[i] = String.fromCharCode(randi(0, maxx));		
		else a[i] = String.fromCharCode(randi(minn, 100));
		b[i] = a[i];
	}
	var start = Math.floor(window.innerHeight/18);	
	for(var i = 1; i < start; i++) {
		obj[i] = obj[i+1] ? obj[i+1] : []; 
	}
	obj[start] = a;
	for(var i in obj) {
		drowstr(obj[i].join(""), 18*i);
	}
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
	ctx = canvas.getContext('2d');
	setInterval(nextRound, 100);		
}

window.onload = main;