/**
 * ...
 * @author ski
 */

(function(w,d) {
	
	'use strict';
	
	// name space
	var
		ski = w.ski || (w.ski = {}),
		event = (ski.event = {});
	
	// public
	event.addEvent;
	event.hasTapEvent = ('ontouchstart' in window);
	event.hasClickEvent = ('onclick' in window);
	
	// private
	var
		hasTapEvent = event.hasTapEvent,
		hasClickEvent = event.hasClickEvent,
		addClick,
		addDrag;
	
	event.addEvent = function(target,event,func,once){
		
		switch (event) {
			
			case 'click':
				addClick(target,func,once);
				break;
			case 'drag':
				addDrag(target,func,once);
				break;
			
		}
		
	};
	
	addClick = function(target,func,once){
		
		var
			_e,
			touched = false,
			moved = false,
			touchstart,
			touchmove,
			touchend,
			click,
			remove;
		
		touchstart = function(e){
			
			touched = true;
			_e = e;
			
		};
		
		touchmove = function(e){
			
			moved = true;
			
		};
		
		touchend = function(e){
			
			if( !moved ){
				
				func(_e);
				
				if(once) {
					
					remove();
					
				}
				
			}
			
			_e = null;
			moved = false;
			
		};
		
		click = function(e){
			
			if( !touched ){
				
				func(e);
				
				if(once) {
					
					remove();
					
				}
				
			}
			
			touched = false;
			
			//e.preventDefault();
			
		};
		
		remove = function(){
			
			target.removeEventListener('touchstart',touchstart,false);
			target.removeEventListener('touchmove',touchmove,false);
			target.removeEventListener('touchend',touchend,false);
			target.removeEventListener('click',click,false);
			
		};
		
		target.addEventListener('touchstart',touchstart,false);
		target.addEventListener('touchmove',touchmove,false);
		target.addEventListener('touchend',touchend,false);
		target.addEventListener('click',click,false);
		
		if(!once) {
			return {}.remove;
		}
		
	};
	
	addDrag = function(target,func,once){
		
		var
			press = false,
			touchmove,
			mousedown,
			mouseup,
			mousemove,
			remove;
		
		touchmove = function(e){
			
			func(e);
			
		};
		
		mousedown = function(e){
			
			press = true;
			
		};
		
		mouseup = function(e){
			
			press = false;
			
		};
		
		mousemove = function(e){
			
			if ( press ) {
				func(e);
			}
			
		};
		
		remove = function(){
			
			target.removeEventListener('touchmove',touchmove,false);
			target.removeEventListener('mousedown',mousedown,false);
			target.removeEventListener('mouseup',mouseup,false);
			target.removeEventListener('mousemove',mousemove,false);
			
		};
		
		target.addEventListener('touchmove',touchmove,false);
		target.addEventListener('mousedown',mousedown,false);
		target.addEventListener('mouseup',mouseup,false);
		target.addEventListener('mousemove',mousemove,false);
		
		if(!once) {
			return {}.remove;
		}
		
	}
	
	w.requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(f) { return window.setTimeout(f, 1000 / 60); };
	}());
	
	w.cancelRequestAnimationFrame = (function() {
		return window.cancelRequestAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			function(id) { window.clearTimeout(id); };
	}());
	
}(this,document));