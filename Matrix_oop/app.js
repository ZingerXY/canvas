//function Matrix(){var e=29,t=35,n=[],o=[],i=[],r=!1,h=!0,a=!0,l=0,d=0,c="0123456789ƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɯɰɱɲɳɴɵɶʙʚʛʜʞαβγδεζηθικλμνξοπρςστυφχψωϧϨϩϪϫϬϭϮϯϰϱϲ",f=[50,200,50],s=[55,55,55],w="rgb(255,255,255)",u={x:0,y:0},x=document.createElement("canvas");x.style.position="fixed",x.style.top="0px",x.style.left="0px",x.style.zIndex=d,x.width=window.innerWidth,x.height=window.innerHeight,x.onmousemove=function(e){u.x=e.clientX,u.y=e.clientY},document.body.insertBefore(x,document.body.firstChild);var y=x.getContext("2d");function g(e,t){return Math.floor(Math.random()*(t-e+1))+e}function C(e,t,n){return e>=n?n:e<t?t:e}function v(e,t){var n=g(e,t);return n<20?c[g(0,c.length-1)]:n>=20&&n<=30?c[g(0,c.length-1)]:n>30?" ":void 0}function m(){if(a){x.width=window.innerWidth,x.height=window.innerHeight,x.style.zIndex=d,y.clearRect(0,0,window.innerWidth,window.innerHeight),y.font="18px Consolas, Lucida Console, monospace";var l=Math.floor(window.innerWidth/y.measureText(c[0]).width);n=[];for(var m=[],p=0;p<l;p++)" "!=o[p]?n[p]=v(0,t):n[p]=v(e,100),o[p]=n[p],m[p]=0;i[0]=n;var z,b,k,H,I,M=Math.floor(window.innerHeight/18);for(p=M+12;0!=p;p--)i[p]=i[p-1]?i[p-1]:[];h&&(z=f[0],b=f[1],k=f[2],I=50,z==(H=200)?k==H?z--:b==I&&k>=I?k++:k==I&&b>I&&b--:b==H?z==H?b--:k==I&&z>=I?z++:z==I&&k>I&&k--:k==H&&(b==H?k--:z==I&&b>=I?b++:b==I&&z>I&&z--),f=[z,b,k]);for(p=M+12;0!=p;p--)for(var S in i[p]){var T;" "!=i[p][S]?(i[p][S]=c[g(0,c.length-1)],m[S]++):m[S]=0,T=r?"rgba("+C(f[0]-10*m[S],7,255)+", "+C(f[1]-10*m[S],7,255)+", "+C(f[2]-10*m[S],7,255)+", 1)":"rgba("+f[0]+", "+f[1]+", "+f[2]+", "+C(1-.05*m[S],0,1)+")",1==m[S]&&(T="rgba("+C(f[0]+s[0],0,255)+", "+C(f[1]+s[1],0,255)+", "+C(f[2]+s[2],0,255)+", 1)"),y.fillStyle=T,y.shadowColor=T,y.shadowBlur=5,charh=18,charw=y.measureText(c[0]).width,charx=S*charw,chary=p*charh,u.x>charx&&u.x<charx+charw&&u.y<chary&&u.y>chary-charh&&(i[p][S]=c[g(0,c.length-1)]),p<=M&&y.fillText(i[p][S],charx,chary)}fsiz=18,y.font=fsiz+"px Consolas, Lucida Console, monospace",y.fillStyle=w,y.shadowColor=w,y.shadowBlur=5,y.fillText("x: "+u.x.toFixed(3),5,fsiz),y.fillText("y: "+u.y.toFixed(3),5,2*fsiz)}}document.onkeydown=function(e){console.log(e.keyCode),90===e.keyCode&&(r=!r),88===e.keyCode&&(d=d?0:9999,x.style.zIndex=d),67===e.keyCode&&(h=!h),86===e.keyCode&&(a=!a)},this.Stop=function(){clearInterval(l),l=0},this.Start=function(){l||(l=setInterval(m,100))},this.ColorH=function(e,t,n){if(!arguments.length)return f;f=[e,t,n]},this.ColorP=function(e){if(!arguments.length)return s[0];s=[e,e,e]},this.Start()}var matrix = new Matrix;
function Matrix() {
	var minn = 29, maxx = 35;
	var a = [];
	var b = [];
	var obj = [];
	var test = false;
	var cp = true;
	var on = true;
	var timer = 0;
	var zInd = 0;
	var arrChar = "0123456789ƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɯɰɱɲɳɴɵɶʙʚʛʜʞαβγδεζηθικλμνξοπρςστυφχψωϧϨϩϪϫϬϭϮϯϰϱϲ"	
	var h = [50,200,50];
	var p = [55,55,55];
	var col = "rgb(255,255,255)";
	var cord = {x:0,y:0};
	
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.onmousemove = cursor;
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');
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
	}
	
	this.Stop = function() {
		clearInterval(timer);
		timer = 0;
	}
	
	this.Start = function() {
		if(!timer)
			timer = setInterval(nextRound, 100);
	}
	
	this.ColorH = function(r,g,b) {
		if (!arguments.length) return h;
		h = [r,g,b];
	}
	this.ColorP = function(l) {
		if (!arguments.length) return p[0];
		p = [l,l,l];
	}
	
	/*function colors(r,g,b) {
		var max = 200, min = 50;
		if(r == max)
			if(b == max)r--;
			else if(g==min&&b>=min) b++;
			else if (b==min&&g>min)	g--;
		else if(g == max) 
			if(r == max) g--;
			else if(b==min&&r>=min) r++;
			else if (r==min&&b>min)	b--;
		else if(b == max) 
			if(g == max) b--;
			else if(r==min&&g>=min) g++;
			else if (g==min&&r>min)	r--;
		return [r,g,b];
	} -->	*/
	function colors(r,g,b){
		var d=200,e=50;
		r==d?b==d?r--:g==e&&b>=e?b++:b==e&&g>e&&g--:g==d?r==d?g--:b==e&&r>=e?r++:r==e&&b>e&&b--:b==d&&(g==d?b--:r==e&&g>=e?g++:g==e&&r>e&&r--);
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
	// Перерисовка
	function nextRound() {
		if(!on) return;		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.zIndex = zInd;		
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.font = "18px Consolas, Lucida Console, monospace";
		var l = Math.floor(window.innerWidth/ctx.measureText(arrChar[0]).width);
		a = [];
		var lan = [];
		for(var i = 0; i < l; i++) {
			if(b[i] != ' ') a[i] = randi(0, maxx);		
			else a[i] = randi(minn, 100);
			b[i] = a[i];
			lan[i] = 0;
		}
		obj[0] = a;
		var start = Math.floor(window.innerHeight/18);	
		for(var i = start+12; i != 0; i--)
			obj[i] = obj[i-1] ? obj[i-1] : [];
		if(cp)
			h = colors(h[0],h[1],h[2]);
		for(var i = start+12; i != 0; i--)
			for(var j in obj[i]) {
				if(obj[i][j] != ' '){
					obj[i][j] = arrChar[Rand(0, arrChar.length-1)];
					lan[j]++;
				}
				else 
					lan[j] = 0;
				var color;
				if(test)
					color = "rgba("+clamp(h[0]-10*lan[j],7,255)+", "+clamp(h[1]-10*lan[j],7,255)+", "+clamp(h[2]-10*lan[j],7,255)+", 1)";
				else
					color = "rgba("+h[0]+", "+h[1]+", "+h[2]+", "+clamp(1-0.05*lan[j],0,1)+")";
				if(lan[j] == 1)
					color = "rgba("+clamp(h[0]+p[0],0,255)+", "+clamp(h[1]+p[1],0,255)+", "+clamp(h[2]+p[2],0,255)+", 1)"
				ctx.fillStyle = color;
				ctx.shadowColor = color;
				ctx.shadowBlur = 5;
				charh = 18;
				charw = ctx.measureText(arrChar[0]).width
				charx = j*charw + i * Math.sin(j);
				chary = i*charh;
				//if(cord.x > charx && cord.x < (charx+charw) && cord.y < chary && cord.y > (chary-charh)) {
				if(cord.x > (charx - charw) && cord.x < (charx+charw*2) && cord.y < (chary + charh) && cord.y > (chary-charh*2)) {
					color = "rgba("+clamp(h[0]+p[0],0,255)+", "+clamp(h[1]+p[1],0,255)+", "+clamp(h[2]+p[2],0,255)+", 1)";
					ctx.shadowColor = color;
					ctx.fillStyle = color;
					obj[i][j] = arrChar[Rand(0, arrChar.length-1)];
				}
				if(i <= start)
					ctx.fillText(obj[i][j], charx, chary);
			}
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