/**
 * ...
 * @author ski
 */

(function(w,d) {
	
	'use strict';
	
	// name space
	var
		ski = w.ski || (w.ski = {});
	
	// import
	var
		display = ski.display || null,
		lib = ski.lib || null;
	
	if(!display || !lib){
		console.log('むむ');
		return;
	}
	
	// private
	var
		space = d.querySelector('#space'),
		moveLights = [],
		_moveLights = space.querySelectorAll('.moveLight'),
		oX = 63,
		oY = 28,
		prevPoint = 0,
		moveLight,
		mousemove;
		
	moveLight = function(obj,width,radius,degreeDistance,degreeDefault){
		
		return function(nowX){
			
			var radian = (lib.easing.easeInOutSine(null, nowX, 0, degreeDistance, 100)+degreeDefault) * (Math.PI / 180);
			
			obj.style.left = ( radius * Math.cos(radian) ) + oX - ( (width/2) / (display.width*0.01) ) + '%';
			obj.style.top = ( radius * Math.sin(radian) * 0.7 ) + oY - ( (width/2) / (display.width*0.01) ) + '%';
			
		};
		
	};
	
	mousemove = function(e){
		
		var nowX = Math.floor( e.pageX / (display.width * 0.01) );
		
		for(var i=0;i<moveLights.length;i++) moveLights[i](nowX);
		
		if( (80<prevPoint && nowX<90) || (80<nowX && prevPoint<90) ) space.className = 'mode01';
		else if( (45<prevPoint && nowX<55) || (45<nowX && prevPoint<55) ) space.className = 'mode02';
		else if( (70<prevPoint && nowX<73) || (70<nowX && prevPoint<73) ) space.className = 'mode03';
		else if( (90<prevPoint && nowX<93) || (90<nowX && prevPoint<93) ) space.className = 'mode04';
		else space.className = '';
		
		prevPoint = nowX;
		
	};
	
	moveLights[0] = moveLight(_moveLights[0],10,3,10,320);
	moveLights[1] = moveLight(_moveLights[1],30,10,20,100);
	moveLights[2] = moveLight(_moveLights[2],40,16,26,100);
	moveLights[3] = moveLight(_moveLights[3],80,50,40,100);
	
	display.addMaximize(space);
	
	d.addEventListener('mousemove',mousemove);
	mousemove({pageX:0});
	
	for(var i=0;i<_moveLights.length;i++) _moveLights[i].style.display = 'block';
	
	
}(this,document));