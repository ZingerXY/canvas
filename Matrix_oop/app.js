//function Matrix(){function n(n,t){return Math.floor(Math.random()*(t-n+1))+n}function t(n,t,e){return n>=e?e:t>n?t:n}function e(t,e){var o=n(t,e);return 20>o?n(l[f].mn,l[f].mx):o>=20&&30>=o?n(l[f].mnn,l[f].mxx):o>30?32:void 0}function o(){x.clearRect(0,0,window.innerWidth,window.innerHeight),s.width=window.innerWidth,s.height=window.innerHeight,x.font="18px Consolas, Lucida Console, monospace";var n=Math.floor(window.innerWidth/x.measureText(l[f].ch).width);d=[];for(var o=[],c=0;n>c;c++)" "!=a[c]?d[c]=String.fromCharCode(e(0,i)):d[c]=String.fromCharCode(e(r,100)),a[c]=d[c],o[c]=0;h[0]=d;for(var w=Math.floor(window.innerHeight/18),c=w+12;0!=c;c--)h[c]=h[c-1]?h[c-1]:[];for(var c=w+12;0!=c;c--)for(var u in h[c]){" "!=h[c][u]?o[u]++:o[u]=0;var g,v=[50,200,50];g=m?"rgba("+t(v[0]-10*o[u],7,255)+", "+t(v[1]-10*o[u],7,255)+", "+t(v[2]-10*o[u],7,255)+", 1)":"rgba(50, 200, 50, "+t(1-.05*o[u],0,1)+")",1==o[u]&&(g="rgba(85, 255, 85, 1)"),x.fillStyle=g,x.shadowColor=g,x.shadowBlur=5,w>=c&&x.fillText(h[c][u],u*x.measureText(l[f].ch).width,18*c)}}var r=29,i=35,d=[],a=[],h=[],f=0,l=[{ch:"0",mn:48,mx:57,mnn:59,mxx:126},{ch:String.fromCharCode(12448),mn:12448,mx:12543,mnn:12448,mxx:12543}],m=!1,c=0,w=0,s=document.createElement("canvas");s.style.position="fixed",s.style.top="0px",s.style.left="0px",s.style.zIndex=w,s.width=window.innerWidth,s.height=window.innerHeight,document.body.insertBefore(s,document.body.firstChild);var x=s.getContext("2d");document.onkeydown=function(n){90===n.keyCode&&(m=m?!1:!0),88===n.keyCode&&(w=w?0:9999),s.style.zIndex=w},this.Stop=function(){clearInterval(c),c=0},this.Start=function(){c||setInterval(o,100)},this.Start()}var matrix=new Matrix;
function Matrix() {
	var minn = 29, maxx = 35;
	var a = [];
	var b = [];
	var obj = [];
	var num = 0;
	var set = [	{ch:'0',mn:48,mx:57,mnn:59,mxx:126},
				{ch:String.fromCharCode(0x30A0),mn:0x30A0,mx:0x30FF,mnn:0x30A0,mxx:0x30FF}];
	var test = false;
	var timer = 0;
	var zInd = 0;
	
	var canvas = document.createElement('canvas');
	canvas.style.position = "fixed";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = zInd;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.insertBefore(canvas, document.body.firstChild);
	var ctx = canvas.getContext('2d');
	document.onkeydown = function(e){ if(e.keyCode === 90) test = test ? false : true;if(e.keyCode === 88) zInd = zInd ? 0 : 9999; canvas.style.zIndex = zInd;};
	
	this.Stop = function() {
		clearInterval(timer);
		timer = 0;
	}
	
	this.Start = function() {
		if(!timer)
			setInterval(nextRound, 100);
	}

	function Rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function clamp(p, min, max) {
		return p >= max ? max : p < min ? min : p;
	}
	function randi(n, m) {
		var p = Rand(n, m);
		if(p < 20) return Rand(set[num].mn, set[num].mx);
		if(p >= 20 && p <= 30) return Rand(set[num].mnn, set[num].mxx);
		if(p > 30) return 32;
	}
	// Перерисовка
	function nextRound() {
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.font = "18px Consolas, Lucida Console, monospace";
		var l = Math.floor(window.innerWidth/ctx.measureText(set[num].ch).width);
		a = [];
		var lan = [];
		for(var i = 0; i < l; i++) {
			if(b[i] != ' ') a[i] = String.fromCharCode(randi(0, maxx));		
			else a[i] = String.fromCharCode(randi(minn, 100));
			b[i] = a[i];
			lan[i] = 0;
		}
		obj[0] = a;
		var start = Math.floor(window.innerHeight/18);	
		for(var i = start+12; i != 0; i--)
			obj[i] = obj[i-1] ? obj[i-1] : []; 
		for(var i = start+12; i != 0; i--)
			for(var j in obj[i]) {
				if(obj[i][j] != ' ') 
					lan[j]++;
				else 
					lan[j] = 0;
				var c = [50,200,50];
				var color;
				if(test)
					color = "rgba("+clamp(c[0]-10*lan[j],7,255)+", "+clamp(c[1]-10*lan[j],7,255)+", "+clamp(c[2]-10*lan[j],7,255)+", 1)";
				else
					color = "rgba(50, 200, 50, "+clamp(1-0.05*lan[j],0,1)+")";
				if(lan[j] == 1)
					color = "rgba(85, 255, 85, 1)"
				ctx.fillStyle = color;
				ctx.shadowColor = color;
				ctx.shadowBlur = 5;
				if(i <= start)
					ctx.fillText(obj[i][j], j*ctx.measureText(set[num].ch).width, 18*i);
			}
	}
	this.Start();
}
var matrix;
window.onload = function(){matrix = new Matrix;};