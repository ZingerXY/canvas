//function Matrix(){var t=29,n=35,e=[],o=[],i=[],r=!1,d=!0,l=!0,a=0,h=0,f="0123456789ƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɯɰɱɲɳɴɵɶʙʚʛʜʞαβγδεζηθικλμνξοπρςστυφχψωϧϨϩϪϫϬϭϮϯϰϱϲ",s=[50,200,50],u=[55,55,55],w=document.createElement("canvas");w.style.position="fixed",w.style.top="0px",w.style.left="0px",w.style.zIndex=h,w.width=window.innerWidth,w.height=window.innerHeight,document.body.insertBefore(w,document.body.firstChild);var c=w.getContext("2d");function g(t,n){return Math.floor(Math.random()*(n-t+1))+t}function y(t,n,e){return t>=e?e:t<n?n:t}function v(t,n){var e=g(t,n);return e<20?f[g(0,f.length-1)]:e>=20&&e<=30?f[g(0,f.length-1)]:e>30?" ":void 0}function x(){if(l){w.width=window.innerWidth,w.height=window.innerHeight,w.style.zIndex=h,c.clearRect(0,0,window.innerWidth,window.innerHeight),c.font="18px Consolas, Lucida Console, monospace";var a=Math.floor(window.innerWidth/c.measureText(f[0]).width);e=[];for(var x=[],C=0;C<a;C++)" "!=o[C]?e[C]=v(0,n):e[C]=v(t,100),o[C]=e[C],x[C]=0;i[0]=e;var m,p,k,b,H,I=Math.floor(window.innerHeight/18);for(C=I+12;0!=C;C--)i[C]=i[C-1]?i[C-1]:[];d&&(m=s[0],p=s[1],k=s[2],H=50,m==(b=200)?k==b?m--:p==H&&k>=H?k++:k==H&&p>H&&p--:p==b?m==b?p--:k==H&&m>=H?m++:m==H&&k>H&&k--:k==b&&(p==b?k--:m==H&&p>=H?p++:p==H&&m>H&&m--),s=[m,p,k]);for(C=I+12;0!=C;C--)for(var M in i[C]){var S;" "!=i[C][M]?(i[C][M]=f[g(0,f.length-1)],x[M]++):x[M]=0,S=r?"rgba("+y(s[0]-10*x[M],7,255)+", "+y(s[1]-10*x[M],7,255)+", "+y(s[2]-10*x[M],7,255)+", 1)":"rgba("+s[0]+", "+s[1]+", "+s[2]+", "+y(1-.05*x[M],0,1)+")",1==x[M]&&(S="rgba("+y(s[0]+u[0],0,255)+", "+y(s[1]+u[1],0,255)+", "+y(s[2]+u[2],0,255)+", 1)"),c.fillStyle=S,c.shadowColor=S,c.shadowBlur=5,C<=I&&c.fillText(i[C][M],M*c.measureText(f[0]).width,18*C)}}}document.onkeydown=function(t){console.log(t.keyCode),90===t.keyCode&&(r=!r),88===t.keyCode&&(h=h?0:9999,w.style.zIndex=h),67===t.keyCode&&(d=!d),86===t.keyCode&&(l=!l)},this.Stop=function(){clearInterval(a),a=0},this.Start=function(){a||(a=setInterval(x,100))},this.ColorH=function(t,n,e){if(!arguments.length)return s;s=[t,n,e]},this.ColorP=function(t){if(!arguments.length)return u[0];u=[t,t,t]},this.Start()}var matrix = new Matrix;
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
	
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');
	document.onkeydown = function(e){ 
		console.log(e.keyCode);
		if(e.keyCode === 90) {test = !test;} // z немного меняет отображение хвостов
		if(e.keyCode === 88) {zInd = zInd ? 0 : 9999; canvas.style.zIndex = zInd;} // x меняет положение матрицы передний/задний план
		if(e.keyCode === 67) {cp = !cp;} // с вкл/выкл изменение цвета
		if(e.keyCode === 86) {on = !on;} // v вкл/выкл анимацию
	};
	
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
				if(i <= start)
					ctx.fillText(obj[i][j], j*ctx.measureText(arrChar[0]).width, 18*i);
			}
	}
	this.Start();
}
var matrix;
window.onload = function(){matrix = new Matrix;};