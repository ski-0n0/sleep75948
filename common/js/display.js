/**
 * ...
 * @author ski
 */

(function(w,d) {
	
	'use strict';
	
	// name space
	var
		ski = w.ski || (w.ski = {}),
		display = (ski.display = {});
	
	// import
	var
		lib = ski.lib || null;
	
	if(!lib){
		console.log('むむ');
		return;
	}
	
	// public
	display.width;
	display.height;
	display.getDocumentWidth;
	display.getDocumentHeight;
	display.addMaximize;
	
	// private
	var
		body = d.body,
		setWidth,
		setHeight,
		maximize = [],
		fixMaximize,
		watch;
	
	display.getDocumentWidth = function(){
		
		return Math.max.apply(null,[body.clientWidth , body.scrollWidth, d.documentElement.scrollWidth, d.documentElement.clientWidth]);
		
	};
	
	display.getDocumentHeight = function(){
		
		var h = Math.max.apply(null,[body.clientHeight , body.scrollHeight, d.documentElement.scrollHeight, d.documentElement.clientHeight]);
		if( display.height < h ) lib.addClassName(body,'extended');
		
		return h;
		
	};
	
	display.addMaximize = function(obj){
		
		maximize.push(obj);
		watch();
		
	};
	
	fixMaximize = function(){
		
		var temp;
		
		for(var i=0; i<maximize.length; i++){
			
			temp = maximize[i];
			if(temp.nodeName==='CANVAS') {
				temp.setAttribute('width',display.width);
				temp.setAttribute('height',display.height);
			}else{
				temp.style.width = display.width+'px';
				temp.style.height = display.height+'px';
			}
			
		}
	}
	
	setWidth = function(){
		
		display.width = w.innerWidth-0;
		//console.log('画面幅：'+display.width);
		
	};
	
	setHeight = function(){
		
		display.height = w.innerHeight-0;
		//console.log('画面高さ：'+display.height);
		
	};
	
	watch = function(){
		
		setWidth();
		setHeight();
		fixMaximize();
		
	};
	
	w.addEventListener('resize',watch);
	
	watch();
	
}(this,document));