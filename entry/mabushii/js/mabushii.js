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
		flashLights = [],
		flashLights = space.querySelectorAll('.flashLight'),
		oX = 50,
		oY = 70,
		prevPoint = 0,
		moveLight,
		mousemove;
		
	moveLight = function(obj,width,radius,degreeDistance,degreeDefault){
		
		return function(nowX){
			
			var radian = (lib.easing.easeInOutSine(null, nowX, 0, degreeDistance, 100)+degreeDefault) * (Math.PI / 180);
			
			obj.style.left = ( radius * Math.cos(radian) ) + oX - ( (width/2) / (display.width*0.01) ) + '%';
			obj.style.top = ( radius * Math.sin(radian) ) + oX - ( (width/2) / (display.width*0.01) ) + '%';
			
		};
		
	};
	
	mousemove = function(e){
		
		var nowX = Math.floor( e.pageX / (display.width * 0.01) );
		
		for(var i=0;i<moveLights.length;i++) moveLights[i](nowX);
		
		if( (80<prevPoint && nowX<90) || (80<nowX && prevPoint<90) )flashLights[0].style.display = 'block';
		else if( (45<prevPoint && nowX<55) || (45<nowX && prevPoint<55) )flashLights[1].style.display = 'block';
		else for(var i=0;i<flashLights.length;i++) flashLights[i].style.display = 'none';
		
		prevPoint = nowX;
		
	};
	
	moveLights[0] = moveLight(_moveLights[0],363,10,30,290);
	moveLights[1] = moveLight(_moveLights[1],518,30,40,100);
	
	display.addMaximize(space);
	
	d.addEventListener('mousemove',mousemove);
	
}(this,document));