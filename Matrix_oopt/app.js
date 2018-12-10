//function Matrix(){var e=29,t=35,n=[],o=[],i=[],r=!1,h=!0,a=!0,l=0,d=0,c="0123456789ƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɯɰɱɲɳɴɵɶʙʚʛʜʞαβγδεζηθικλμνξοπρςστυφχψωϧϨϩϪϫϬϭϮϯϰϱϲ",f=[50,200,50],s=[55,55,55],w="rgb(255,255,255)",u={x:0,y:0},x=document.createElement("canvas");x.style.position="fixed",x.style.top="0px",x.style.left="0px",x.style.zIndex=d,x.width=window.innerWidth,x.height=window.innerHeight,x.onmousemove=function(e){u.x=e.clientX,u.y=e.clientY},document.body.insertBefore(x,document.body.firstChild);var y=x.getContext("2d");function g(e,t){return Math.floor(Math.random()*(t-e+1))+e}function C(e,t,n){return e>=n?n:e<t?t:e}function v(e,t){var n=g(e,t);return n<20?c[g(0,c.length-1)]:n>=20&&n<=30?c[g(0,c.length-1)]:n>30?" ":void 0}function m(){if(a){x.width=window.innerWidth,x.height=window.innerHeight,x.style.zIndex=d,y.clearRect(0,0,window.innerWidth,window.innerHeight),y.font="18px Consolas, Lucida Console, monospace";var l=Math.floor(window.innerWidth/y.measureText(c[0]).width);n=[];for(var m=[],p=0;p<l;p++)" "!=o[p]?n[p]=v(0,t):n[p]=v(e,100),o[p]=n[p],m[p]=0;i[0]=n;var z,b,k,H,I,M=Math.floor(window.innerHeight/18);for(p=M+12;0!=p;p--)i[p]=i[p-1]?i[p-1]:[];h&&(z=f[0],b=f[1],k=f[2],I=50,z==(H=200)?k==H?z--:b==I&&k>=I?k++:k==I&&b>I&&b--:b==H?z==H?b--:k==I&&z>=I?z++:z==I&&k>I&&k--:k==H&&(b==H?k--:z==I&&b>=I?b++:b==I&&z>I&&z--),f=[z,b,k]);for(p=M+12;0!=p;p--)for(var S in i[p]){var T;" "!=i[p][S]?(i[p][S]=c[g(0,c.length-1)],m[S]++):m[S]=0,T=r?"rgba("+C(f[0]-10*m[S],7,255)+", "+C(f[1]-10*m[S],7,255)+", "+C(f[2]-10*m[S],7,255)+", 1)":"rgba("+f[0]+", "+f[1]+", "+f[2]+", "+C(1-.05*m[S],0,1)+")",1==m[S]&&(T="rgba("+C(f[0]+s[0],0,255)+", "+C(f[1]+s[1],0,255)+", "+C(f[2]+s[2],0,255)+", 1)"),y.fillStyle=T,y.shadowColor=T,y.shadowBlur=5,charh=18,charw=y.measureText(c[0]).width,charx=S*charw,chary=p*charh,u.x>charx&&u.x<charx+charw&&u.y<chary&&u.y>chary-charh&&(i[p][S]=c[g(0,c.length-1)]),p<=M&&y.fillText(i[p][S],charx,chary)}fsiz=18,y.font=fsiz+"px Consolas, Lucida Console, monospace",y.fillStyle=w,y.shadowColor=w,y.shadowBlur=5,y.fillText("x: "+u.x.toFixed(3),5,fsiz),y.fillText("y: "+u.y.toFixed(3),5,2*fsiz)}}document.onkeydown=function(e){console.log(e.keyCode),90===e.keyCode&&(r=!r),88===e.keyCode&&(d=d?0:9999,x.style.zIndex=d),67===e.keyCode&&(h=!h),86===e.keyCode&&(a=!a)},this.Stop=function(){clearInterval(l),l=0},this.Start=function(){l||(l=setInterval(m,100))},this.ColorH=function(e,t,n){if(!arguments.length)return f;f=[e,t,n]},this.ColorP=function(e){if(!arguments.length)return s[0];s=[e,e,e]},this.Start()}var matrix = new Matrix;
function Matrix() {	
	var CHARH = 18;
	var tears = [];
	var minn = 29, maxx = 35;
	var a = [];
	var b = [];
	var obj = [];
	var test = false;
	var cp = true;
	var on = true;
	var timer = 0;
	var zInd = 0;
	var arrChar = "0123456789ƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɯɰɱɲɳɴɵɶʙʚʛʜʞαβγδεζηθικλμνξοπρςστυφχψωϧϨϩϪϫϬϭϮϯϰϱϲ";
	var H = [50,200,50];
	var p = [55,55,55];	
	var col = "rgb(255,255,255)";
	var cord = {x:0,y:0};
	var mouseTear = RandTear();
	mouseTear.mouse = true;
	
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.addEventListener("mousemove", cursor, true);
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');
	ctx.font = "18px Consolas, Lucida Console, monospace";
	var charWidth = ctx.measureText(arrChar[0]).width;
	document.onkeydown = function(e){ 
		console.log(e.keyCode);
		if(e.keyCode === 90) {test = !test;} // z немного меняет отображение хвостов
		if(e.keyCode === 88) {zInd = zInd ? 0 : 9999; canvas.style.zIndex = zInd;} // x меняет положение матрицы передний/задний план
		if(e.keyCode === 67) {cp = !cp;} // с вкл/выкл изменение цвета
		if(e.keyCode === 86) {on = !on;} // v вкл/выкл анимацию
	};
	
	// Действия при движении мыши
	function cursor(e) {
		cord.x = e.clientX;
		cord.y = e.clientY;
		if(e.which) { // когда зажата ЛКМ
			CreateTear(RandTear(e.clientX, e.clientY, mouseTear.color));
		}
	}
	
	// Генерация цвета
	function colorGen(arr) {
		var c = [50,50,50]
		n = Rand(0,2);
		c[n] = 200;
		do {
			m = Rand(0,2);
		} while (m == n)
		c[m] = Rand(50,200);
		if (arr)
			return c;
		else
			return "rgb("+c[0]+","+c[1]+","+c[2]+")";
	}
	
	this.Stop = function() {
		clearInterval(timer);
		timer = 0;
	}
	
	this.Start = function() {
		if(!timer) {
			timer = setInterval(nextRound, 25);
			setInterval(AddTear, 100)
		}
	}
	
	this.ColorH = function(r,g,b) {
		if (!arguments.length) return H;
		H = [r,g,b];
	}
	this.ColorP = function(l) {
		if (!arguments.length) return p[0];
		p = [l,l,l];
	}
	
	function AddTear() {
		if(tears.length < 100)
			CreateTear();
	}
	
	function RandTear(x, y, c) {
		c = c || H; //colorGen(true);
		s = Rand(2, 4);
		var obj = {drops: [], color: c, rh: 0, speed: s, sin: 0};
		size = Rand(10, 25);
		xS = x || Rand(0, window.innerWidth - CHARH);
		yS = y || 0;	
		obj.drops.push({	x: xS,
							y: yS,
							ch: arrChar[Rand(0, arrChar.length-1)]
						});
		for(var i = 1; i < size; i++) {
			obj.drops.push({	x: xS,
								y: yS - i * charWidth,
								ch: arrChar[Rand(0, arrChar.length-1)]
							});
		}
		return obj;
	}
	
	function CreateTear(obj) {
		obj = obj || RandTear();
		tears.push(obj);
	}

	// Магическая функция перебирающая цвета
	function colors(r,g,b) {
		var max = 200, min = 50;
		if(r == max) {
			if(b == max)r--;
			else if(g==min&&b>=min) b++;
			else if (b==min&&g>min)	g--;
		} else if(g == max) {
			if(r == max) g--;
			else if(b==min&&r>=min) r++;
			else if (r==min&&b>min)	b--;
		} else if(b == max) {
			if(g == max) b--;
			else if(r==min&&g>=min) g++;
			else if (g==min&&r>min)	r--;
		}
		return [r,g,b];
	} 

	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function clamp(p, min, max) {
		return p >= max ? max : p < min ? min : p;
	}
	function randi(n, m) {
		var p = Rand(n, m);
		if(p < 20) return arrChar[Rand(0, arrChar.length-1)];
		if(p >= 20 && p <= 30) return arrChar[Rand(0, arrChar.length-1)];
		if(p > 30) return ' ';
	}
	
	function TearsRound(item, i, arr) {
		
		item.rh += 1;
		item.rh = item.rh > (CHARH / item.speed) ? 0 : item.rh;
		if(item.mouse) {
			item.drops[0].y = cord.y;
			item.drops[0].x = cord.x;
		}
		else
			item.drops[0].y += item.speed;
		/*item.sin += 0.1;
		item.drops[0].x += 5 * Math.sin(item.sin);*/
		for(var n = item.drops.length - 1; n > 0; n--) {
			item.drops[n].x = item.drops[n-1].x;
			item.drops[n].y = item.drops[n-1].y - CHARH;
			if(!item.rh)
				item.drops[n].ch = item.drops[n-1].ch;
		}
		if(!item.rh)
			item.drops[0].ch = arrChar[Rand(0, arrChar.length-1)];
		
		h = item.color = colors(item.color[0],item.color[1],item.color[2]);
				
		item.drops.forEach(function(item, i, arr) {
			if (!i)
				color = "rgba("+clamp(h[0]+p[0],0,255)+", "+clamp(h[1]+p[1],0,255)+", "+clamp(h[2]+p[2],0,255)+", 1)";
			else
				color = "rgba("+h[0]+", "+h[1]+", "+h[2]+", "+clamp(1-0.05*i,0,1)+")";
			ctx.fillStyle = color;
			ctx.shadowColor = color;
			
			ctx.fillText(item.ch, item.x, item.y);
		});
	}
	
	function DelTears(item, i, arr) {
		if(item.drops[item.drops.length - 1].y > (window.innerHeight + CHARH)) {
			arr.splice(i, 1);
			return;
		}
	}	
	// Перерисовка
	function nextRound() {
		if(!on) return;
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;	
		
		
		ctx.font = CHARH + "px Consolas, Lucida Console, monospace";
		ctx.shadowBlur = 5;
		
		tears.forEach(DelTears);
		tears.forEach(TearsRound);
		
		TearsRound(mouseTear);
		
		/*fsiz = 18;
		ctx.font = fsiz+"px Consolas, Lucida Console, monospace";
		ctx.fillStyle = col;
		ctx.shadowColor = col;
		ctx.shadowBlur = 5;*/
		//ctx.fillText("x: "+cord.x.toFixed(3), 5, fsiz);
		//ctx.fillText("y: "+cord.y.toFixed(3), 5, fsiz*2);
	}
	this.Start();
}
var matrix;
window.onload = function(){matrix = new Matrix;};