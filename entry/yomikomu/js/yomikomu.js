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
		scroll = ski.scroll || null,
		display = ski.display || null;
	
	if(!scroll || !display){
		console.log('むむ');
		return;
	}
	
	// private
	var
		browsing;
	
	browsing = function(arg){
		
		var
			src = arg.src.toString(),
			max = arg.max-1,
			paging = arg.paging-1,
			point = 0,
			target = d.querySelector('#browsing'),
			frame = d.createElement('div'),
			loader,
			loaderImg,
			trigger;
		
		loader = (function(){
			
			var
				i = 0,
				request,
				watch,
				page;
			
			watch = function(){
				
				if(display.getDocumentHeight()-100 < scroll.scrollTop+display.height){
					//console.log('fire');
					//cancelRequestAnimationFrame(request);
					loader();
				}else{
					//console.log('getDocumentHeight:'+display.getDocumentHeight()+' scroll.scrollTop+display.height:'+(scroll.scrollTop+display.height))
					request = requestAnimationFrame(watch);
				}
				
			};
			
			page = function(){
				
				if(max<point){
					//console.log('iは'+i+'だよ。ここでおわり');
					loaderImg.hide();
					return;
				}
				
				var
					img = new Image(),
					add;
				
				add = function(){
					
					frame.appendChild(img);
					img.setAttribute('class','pages animated fadeIn');
					
				};
				
				point++;
				
				img.setAttribute('src',src+'browsing_'+ ( (point<10) ? '0'+point : point ) +'.png');
				img.setAttribute('class','pages');
				
				if(i<paging){
					
					i++;
					img.addEventListener('load',function(){
						add();
						page();
						});
					
				}else{
					
					i = 0;
					img.addEventListener('load',function(){
						add();
						request = requestAnimationFrame(watch);
						});
					
				}
				
			};
			
			target.appendChild(frame);
			
			return function(){
				
				page();
				
			}
			
		}());
		
		loaderImg = (function(){
			
			var
				obj = {},
				wrap = d.createElement('div'),
				img = new Image();
			
			obj.show = function(){
				
				wrap.style.display = 'block';
				
			};
			
			obj.hide = function(){
				
				wrap.style.display = 'none';
				
			};
			
			img.setAttribute('src','/common/img/loader.gif');
			wrap.setAttribute('id','loading');
			wrap.appendChild(img);
			target.appendChild(wrap);
			
			return obj;
			
		}());
		
		trigger = (function(){
			
			var
				btn = d.createElement('button'),
				init;
			
			init = function(){
				
				btn.style.display = 'none';
				loaderImg.show();
				loader();
				
				btn = null;
				
			};
			
			btn.textContent = 'よみこむ？';
			btn.addEventListener('click',init);
			target.appendChild(btn);
			
		}());
		
	};
	
	browsing({
		'src':'./img/',
		'max':30,
		'paging':4
	});
	
}(this,document));