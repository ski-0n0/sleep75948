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
		lib = ski.lib || null,
		event = ski.event || null,
		display = ski.display || null;
	
	if(!lib || !event || !display){
		console.log('むむ');
		return;
	}
	
	// private
	var
		canvas = d.querySelector('canvas'),
		c2d = canvas.getContext('2d'),
		bubbles = [],
		prevCoord = {},
		createBubble,
		updateBubble,
		clearBubble,
		click,
		drag,
		watch,
		request;
	
	createBubble = function(opt){
		
		var
			opt = opt || 0,
			obj = {},
			x = opt.x || Math.floor(Math.random()*display.width),
			y = opt.y || display.height,
			radius = Math.floor(Math.random()*5),
			progress = ( (progress = Math.random() ) < 0.3) ? 0.3 : progress,
			span = Math.random() * 360,
			angle = (Math.random() < 0.5) ? 1 : -1,
			quiver = Math.random();
			
		obj.update = function(){
			
			if( 0 < y ) {
				
				if (quiver < 0.5){
					quiver = quiver + 2 * quiver * quiver;
				}else{
					quiver = quiver - 2 * (1 - quiver) * (1 - quiver);
				}
				
				progress = progress + quiver / 20;
				y = y - progress;
				span = span + Math.random() * 0.06;
				x = x + Math.sin( span + ((Math.random()<0.5) ? quiver : -quiver) ) * angle ;
				
				return true;
				
			}else{
				
				return false;
				
			}
			
		};
		
		obj.stroke = function(){
			
			c2d.beginPath();
			c2d.lineWidth = 1;
			c2d.strokeStyle = 'rgba(0,0,0,0.3)';
			c2d.arc(Math.ceil(x), Math.ceil(y), radius, 0, Math.PI*2, false);
			c2d.stroke();
			
		};
		
		obj.clear = function(){
			
			c2d.clearRect(x-10, y-10, 20, 20);
			
		};
		
		return obj;
		
	};
	
	updateBubble = function(){
		
		var temp = [];
		
		if ( Math.random() < 0.01 ){
			bubbles.push( createBubble() );
		}
		
		for(var i=0; i<bubbles.length; i++) {
			
			if( bubbles[i].update() ){
				
				bubbles[i].stroke();
				temp.push( bubbles[i] );
				
			}
			
		}
		bubbles = temp;
		
	};
	
	clearBubble = function(){
		
		for(var i=0; i<bubbles.length; i++) {
			
			bubbles[i].clear();
			
		}
		
	};
	
	click = function(e){
		
		var
			e = (e.touches) ? e.touches[0] : e,
			n = Math.floor( Math.random() * ( ( 300 < bubbles.length ) ? 2 : 10) + 5 ),
			later;
		
		later = function(){
			
			bubbles.push(
				createBubble({
					'x' : e.pageX + ( Math.random()*40 ) - 20,
					'y' : e.pageY + ( Math.random()*100 ) - 40
				})
			);
			
		};
		
		for(var i=0; i<n; i++) {
			lib.delay(
				Math.random()*300,
				later
			);
		}
		
	};
	
	drag = function(e){
		
		var
			e = (e.touches) ? e.touches[0] : e,
			n = Math.floor( Math.random() * ( ( 300 < bubbles.length ) ? 1 : 2) ),
			touchCoord = { 'x' : e.pageX-0, 'y' : e.pageY-0 };
		
		
			
		if( prevCoord.x !== touchCoord.x || prevCoord.y !== touchCoord.y ) {
		
			if( Math.random() < 1.0 ) {
				
				for(var i=0; i<n; i++) {
					
					bubbles.push(
						createBubble({
							'x' : touchCoord.x + ( Math.random()*40 ) - 20,
							'y' : touchCoord.y + ( Math.random()*40 ) - 20
						})
					);
					
				}
				
			}
			
			prevCoord = touchCoord;
			
		}
		
		
	};
	
	watch = function(){
		
		//c2d.clearRect(0, 0, display.width, display.height);
		clearBubble();
		updateBubble();
		request = requestAnimationFrame(watch);
		
	};
	
	display.addMaximize(canvas);
	
	event.addEvent(canvas,'click',click);
	event.addEvent(canvas,'drag',drag,false);
	
	watch();
	
}(this,document));