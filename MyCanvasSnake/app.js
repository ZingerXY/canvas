// Размер поля
var S = 20;
var W = 6;
var H = 3;
// Цена еды
var PRICE = 2
var canvas;
var pole, sn;

var maxcolor = 180; // яркость

var coordx = 0;
var coordy = 0;

var c = colorGen();
var cw = 0.5;

var point = {x: 10, y: 10}

// Работа с localStorage >>
function lsSet(key,data) {
	if(typeof data == "string")
		localStorage.setItem(key,data);
	else {
		textdata = JSON.stringify(data);
		localStorage.setItem(key,textdata);
	}
}

function lsGet(key) {
	var data = localStorage.getItem(key);
	try {
		return JSON.parse(data);
	} catch (e) {
		return data;
	}		
}

function lsDel(key) {
	localStorage.removeItem(key)
}

function lsClear() {
	localStorage.clear();
}

if(!lsGet("OTRS_mod")) {
	lsSet("OTRS_mod",{newmsg:{}})
}

if(lsGet("snake") === null) {
	lsSet("snake",{
		size: 2,
		vx: 1,
		vy: 0,
		body: [{x: 2, y: 1, с: colorGen()},{x: 1, y: 1, с: colorGen()}]
	})
}

if(lsGet("food") === null) {
	lsSet("food",{
		ch: false,
		price: 2,
		x: -1,
		y: -1
	})
}

if(lsGet("info") === null)	lsSet("info",false);
if(lsGet("info_path") === null)	lsSet("info_path",false);
if(lsGet("show_grid") === null)	lsSet("show_grid",false);
if(lsGet("auto_bot") === null)	lsSet("auto_bot",true);
// << Работа с localStorage
var snake = lsGet("snake");
var food = lsGet("food");
// Опции
var info = lsGet("info");
var info_path = lsGet("info_path");
var show_grid = lsGet("show_grid");
var auto_bot = lsGet("auto_bot");

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
	sn.ctx.fillStyle = c;
	sn.ctx.beginPath();
	// arc(x, y, radius, startAngle, endAngle, направление)
    sn.ctx.arc(x,y,r,0,Math.PI*2,true); // Outer circle
    sn.ctx.fill();
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

function createGrid(pole) {
	pole.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	pole.canvas.width = window.innerWidth;
	pole.canvas.height = window.innerHeight;

	H = Math.floor(pole.canvas.height / S);
	W = Math.floor(pole.canvas.width / S);

	pole.ctx.strokeStyle = c;
	pole.ctx.lineWidth = cw;

	if(show_grid)
		for(var y = 0; y < pole.canvas.height; y += S)
			for(var x = 0; x < pole.canvas.width; x += S)
				pole.ctx.strokeRect(x, y, S, S);
}

function ABC(x, y) {
	for(var i = 0; i < snake.size; i++) {
		if(snake.body[i].x == x && snake.body[i].y == y)
			return false;
	}
	return true;
}

/// BOT
var WALL = -1;         // непроходимая ячейка
var BLANK = -2;       // свободная непомеченная ячейка

var px = [];
var py = [];      // координаты ячеек, входящих в путь
var len;                       // длина пути
var grid = [];                // рабочее поле
var direct;
var a = [];


// Перед вызовом lee() массив grid заполнен значениями WALL и BLANK
function lee(ax, ay, bx, by)   // поиск пути из ячейки (ax, ay) в ячейку (bx, by)
{
  var dx = [1, 0, -1, 0];   // смещения, соответствующие соседям ячейки
  var dy = [0, 1, 0, -1];   // справа, снизу, слева и сверху
  var d, x, y, k;
  var stop;

  if (grid[ay][ax] == WALL || grid[by][bx] == WALL) return false;  // ячейка (ax, ay) или (bx, by) - стена

  // распространение волны
  d = 0;
  grid[ay][ax] = 0;            // стартовая ячейка помечена 0
  do {
    stop = true;               // предполагаем, что все свободные клетки уже помечены
    for ( y = 0; y <= H; ++y )
      for ( x = 0; x <= W; ++x )
        if ( grid[y][x] == d )                         // ячейка (x, y) помечена числом d
        {
          for ( k = 0; k < 4; ++k )                    // проходим по всем непомеченным соседям
          {
             var iy = y + dy[k];
			 var ix = x + dx[k];
			 // круговой поиск
			 if(iy < 0) iy = H - 1;
			 if(iy > H - 1) iy = 0;
			 if(ix < 0) ix = W - 1;
			 if(ix > W - 1) ix = 0;

             if ( iy >= 0 && iy <= H && ix >= 0 && ix <= W && grid[iy][ix] == BLANK )
             {
                stop = false;              // найдены непомеченные клетки
                grid[iy][ix] = d + 1;      // распространяем волну
             }
          }
        }
    d++;
  } while ( !stop && grid[by][bx] == BLANK );

  if (grid[by][bx] == BLANK) return false;  // путь не найден

  // восстановление пути
  len = grid[by][bx];            // длина кратчайшего пути из (ax, ay) в (bx, by)
  if(len == 0) return false;
  x = bx;
  y = by;
  d = len;
  while ( d > 0 )
  {
    px[d] = x;
    py[d] = y;                   // записываем ячейку (x, y) в путь
    d--;
    for (k = 0; k < 4; ++k)
    {
		var iy = y + dy[k], ix = x + dx[k];
	    // круговой поиск
		if(iy < 0) iy = H - 1;
		if(iy > H - 1) iy = 0;
		if(ix < 0) ix = W - 1;
		if(ix > W - 1) ix = 0;
		//sprintf(test4[k],"iy = %d, ix = %d, grid[iy][ix] = %d, d = %d \n", iy, ix, grid[iy][ix], d);
       if ( iy >= 0 && iy <= H && ix >= 0 && ix <= W && grid[iy][ix] == d)
      {
        x = x + dx[k];
        y = y + dy[k];           // переходим в ячейку, которая на 1 ближе к старту
		if(y < 0) y = H - 1;
		if(y > H - 1) y = 0;
		if(x < 0) x = W - 1;
		if(x > W - 1) x = 0;
        break;
      }
    }
  }
  px[0] = ax;
  py[0] = ay;                    // теперь px[0..len] и py[0..len] - координаты ячеек пути
  return true;
}

function change_coord(coord)
{
	switch(coord)
	{
		case 3:
			if (snake.vy != 1) { // UP
				snake.vx = 0;
				snake.vy = -1;
				direct = 3;
			}
			break;
		case 1:
			if (snake.vy != -1) { // DOWN
				snake.vx = 0;
				snake.vy = 1;
				direct = 1;
			}
			break;
		case 2:
			if (snake.vx != 1) { // LEFT
				snake.vx = -1;
				snake.vy = 0;
				direct = 2;
			}
			break;
		case 0:
			if (snake.vx != -1) { // RIGHT
				snake.vx = 1;
				snake.vy = 0;
				direct = 0;
			}
		default : break;
	}
}

function autobot()
{
	var dx = [1, 0, -1, 0];   // смещения, соответствующие соседям ячейки
	var dy = [0, 1, 0, -1];   // справа, снизу, слева и сверху
	var b = [];


	for (var y = 0; y <= H; y++) {
		if(!(y in grid)) grid[y] = [];
		if(!(y in b)) b[y] = [];
		for (var x = 0; x <= W; x++ ) {
			grid[y][x] = BLANK;
			b[y][x] = 0;
		}
	}

	for(var n = 1; n < snake.body.length; n++) {

		if(	snake.body[n].y === undefined || 
			snake.body[n].x === undefined || 
			grid[snake.body[n].y] === undefined || 
			grid[snake.body[n].y][snake.body[n].x] === undefined) 
				debugger;
		grid[snake.body[n].y][snake.body[n].x] = WALL;
	}

	if(lee(snake.body[0].x,snake.body[0].y,food.x,food.y))
	{
		// Запись найденого пути в масив сетку поля b
		for (var i = 0; i <= len; ++i)
			b[py[i]][px[i]] = 1;

		for (var k = 0; k < 4; ++k )
		{
			var iy = snake.body[0].y+dy[k], ix = snake.body[0].x+dx[k];
			// круговой поиск
			if(iy < 0) iy = H - 1;
			if(iy > H - 1) iy = 0;
			if(ix < 0) ix = W - 1;
			if(ix > W - 1) ix = 1;

			if(b[iy][ix])
			{
				test = k;
				change_coord(k);
				break;
			}
		}
	}
	else
	{
		nx = snake.body[0].x + snake.vx;
		ny = snake.body[0].y + snake.vy;
		if (nx < 0) nx = W - 1;
		if (nx > W - 1) nx = 0;
		if (ny < 0) ny = H - 1;
		if (ny > H - 1) ny = 0;	
		if(!ABC(nx,ny))	
			for (var k = 0;k < 4; ++k )
			{
				var x = snake.body[0].x+dx[k];
				var y = snake.body[0].y+dy[k];

				if (x < 0) x = W - 1;
				if (x > W - 1) x = 0;
				if (y < 0) y = H - 1;
				if (y > H - 1) y = 0;
				//sprintf(test4[k],"a[y][x] = [%d], x = %d, y = %d", a[y][x], x, y);
				if(ABC(x,y))
				{
					test = k;
					change_coord(k);
				}
			}
	}

	bot.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	bot.canvas.width = window.innerWidth;
	bot.canvas.height = window.innerHeight;

	if(info_path) {
		var fsiz = 10;
		bot.ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		bot.ctx.fillStyle = "#fff";
		for (var y = 0; y <= H; y++)
			for (var x = 0; x <= W; x++ )
				if(b[y][x])
					bot.ctx.fillText(grid[y][x], x * S + 7, y * S + 12);
	}
}
/// BOT

function eat_shake() {
	for(var i = 1; i < snake.size - 1; i++) {
		if(snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
			snake.body.splice(i, snake.size - i);
			snake.size = snake.body.length;
			return false;
		}
	}
	return true;
}

// Следующий ход змейки
function nextRound() {
	// Чистим поле
	sn.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	sn.canvas.width = window.innerWidth;
	sn.canvas.height = window.innerHeight;
	/*c = "#fff";
	ctx.shadowColor = "#f00";
	ctx.shadowBlur = 5;*/


	for(var i = snake.size - 1; i > 0; --i) {
		snake.body[i].x = snake.body[i-1].x;
		snake.body[i].y = snake.body[i-1].y;
	}

	snake.body[0].x += snake.vx;
	snake.body[0].y += snake.vy;

	// Закругление поля
	if(snake.body[0].x < 0) snake.body[0].x = W - 1;
	if(snake.body[0].x > W - 1) snake.body[0].x = 0;
	if(snake.body[0].y > H - 1) snake.body[0].y = 0;
	if(snake.body[0].y < 0) snake.body[0].y = H - 1;

	if(!food.ch) {
		while(1)
		{
			x = Rand(0,W - 1);
			y = Rand(0,H - 1);
			if(ABC(x,y))
			{
				food.x = x;
				food.y = y;
				break;
			}
		}
		food.ch = true;
		lsSet("food", food);
	}

	drowCircle(food.x * S + S/2,food.y * S + S/2,food.price,'#d00');

	if(snake.body[0].x == food.x && snake.body[0].y == food.y) {
		food.price = Rand(2, S/2);
		var xEnd = snake.body[snake.size-1].x;
		var yEnd = snake.body[snake.size-1].y;
		for(var n = 0; n < food.price; n++)
			snake.body.push({x: xEnd,y: yEnd, с: colorGen()});
		snake.size = snake.body.length;
		food.ch = false;
		lsSet("food", food);
	}

	eat_shake();
	
	if (auto_bot)
		autobot();
	
	lsSet("snake", snake);

	
	for(var n in snake.body) {
		if(snake.body[n].c)
			sn.ctx.fillStyle = snake.body[n].c;
		else
			sn.ctx.fillStyle = snake.body[n].c = colorGen();
		sn.ctx.fillRect(snake.body[n].x*S, snake.body[n].y*S, S, S);
	}
	if(info) {
		var fsiz = 18;
		sn.ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		sn.ctx.fillStyle = "#fff";
		sn.ctx.shadowColor = "#fff";
		sn.ctx.shadowBlur = 5;
		sn.ctx.fillText("x: " + snake.body[0].x + " y: " + snake.body[0].y, 5, fsiz);
		sn.ctx.fillText("size: " + snake.size, 5, fsiz*2);
		sn.ctx.fillText("Grid(G): " + (show_grid ? 'on' : 'off') , 5, fsiz*3);
		sn.ctx.fillText("Pathfind(Q): " + (info_path ? 'on' : 'off') , 5, fsiz*4);
		sn.ctx.fillText("Bot(F): " + (auto_bot ? 'on' : 'off') , 5, fsiz*5);
	}
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

// Клавиши управления
function keydown(e) {
	switch (e.keyCode){
		case 87: // W|Ц
			if (snake.vy != 1) { // UP
				snake.vx = 0;
				snake.vy = -1;
			}
			break;
		case 83: // S|Ы
			if (snake.vy != -1) { // DOWN
				snake.vx = 0;
				snake.vy = 1;
			}
			break;
		case 65: // A|Ф
			if (snake.vx != 1) { // LEFT
				snake.vx = -1;
				snake.vy = 0;
			}
			break;
		case 68: // D|В
			if (snake.vx != -1) { // RIGHT
				snake.vx = 1;
				snake.vy = 0;
			}
			break;
		case 69: // E|У
			info = !info; // ON/OFF Отображение доп информации
			lsSet("info",info);
			break;
		case 81: // Q|Й
			info_path = !info_path; // ON/OFF Отображение поиска пути
			lsSet("info_path",info_path);
			break;
		case 71: // G|П
			show_grid = !show_grid; // ON/OFF Отображение сетки
			lsSet("show_grid",show_grid);
			createGrid(pole);
			break;
		case 70: // F|А
			auto_bot = !auto_bot; // ON/OFF Включение бота
			lsSet("auto_bot",auto_bot);
			break;
		default: console.log(e.keyCode); break;
	}
}

function main() //главная функция
{
	pole = createCanvas();
	sn = createCanvas(1);
	bot = createCanvas(2);
	/*ctx.canvas.addEventListener("mousedown", handleMouseDown, true);
	ctx.canvas.addEventListener("touchstart", handleMouseDown, true);
	ctx.canvas.addEventListener("mouseup", handleMouseUp, true);
	ctx.canvas.addEventListener("touchend", handleMouseUp, true);*/
	//canvas.click(drowfigure);
	document.addEventListener("keydown", keydown, true);
	createGrid(pole);
	// Обновление состояния
	setInterval(nextRound, 50);
}

window.onload = main;