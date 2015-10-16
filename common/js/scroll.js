/**
 * ...
 * @author ski
 */

(function(w,d) {
	
	'use strict';
	
	// name space
	var
		ski = w.ski || (w.ski = {}),
		scroll = (ski.scroll = {});
	
	// public
	scroll.scrollTop;
	
	// private
	var
		body = d.body,
		scrollTopTimeout,
		setScrollTop,
		watch;
	
	setScrollTop = function(){
		
		clearTimeout(scrollTopTimeout);
		
		scrollTopTimeout = setTimeout(
			function(){
				scroll.scrollTop = Math.max.apply(null, [d.documentElement.scrollTop || body.scrollTop]);
				//console.log('スクロールトップ：'+scroll.scrollTop);
				},100
		);
		
	};
	
	watch = function(){
		
		setScrollTop();
		
	};
	
	w.addEventListener('scroll',watch);
	
	watch();
	
}(this,document));