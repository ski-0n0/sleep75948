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
		world = d.querySelector('#world'),
		balloon = d.querySelector('#balloon'),
		men = d.getElementsByClassName('man'),
		shadow = d.querySelector('#shadow'),
		baloonOnMap,
		arrivalCoordinates = { 'lat' : 35.65858, 'lng' : 139.745433 },
		prevCoordinates = { 'lat' : 35.65858, 'lng' : 139.745433 },
		baloonCoordinates = { 'lat' : 35.65858, 'lng' : 139.745433 },
		walkSteps = [],
		mensLimitOnWork = [ {'x':0, 'y':0}, {'x':25, 'y':25}, {'x':50, 'y':50}, {'x':75, 'y':75} ],
		map,
		press = {},
		isAnimate = false,
		runUpToGetDown = false,
		isStay = false,
		currentMode = '',
		calculateAngle,
		createMap,
		floating,
		ground,
		runUpToGetDown,
		runUpToGetOn,
		getDown,
		getOn,
		keydown,
		keyup,
		touchstart,
		touchmove,
		touchend,
		watchPress,
		watchFollow,
		watch,
		request;
		
	calculateAngle = function(x,y){
		
		x = x - display.width/2;
		y = y - display.height/2;
		
		if( 0 < y  ){
			press[38] = true;
			
			
		}
		
		console.log(Math.atan(y/x)*(180/Math.PI));
		/*
		
		console.log(Math.atan(y/x));
		*/
		
	};
	
	createMap = function(){
		
		var mapStyle = [
		
			{
				'featureType' : 'all',
				'elementType' : 'labels.icon',
				'stylers' : [
					{ 'visibility' : 'off' }
				]
			},
			{
				'featureType' : 'road.local',
				'elementType' : 'all',
				'stylers' : [
					{ 'visibility' : 'off' }
				]
			}
			
		];
		
		map = new google.maps.Map(
			world,
			{
				center : new google.maps.LatLng(arrivalCoordinates.lat,arrivalCoordinates.lng),
				disableDefaultUI : true,
				disableDoubleClickZoom : true,
				draggable : false,
				scrollwheel : false,
				streetViewControl : false,
				zoom : 16,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				styles : mapStyle
			}
		);
		
		baloonOnMap = new google.maps.Marker({
			'clickable' : true,
			'flat' : true,
			'icon' : './img/balloon.png',
			'map' : map,
			'visible' : false
			});
		
		balloon.setAttribute('class','balloon block animated bounceInUp');
		
		lib.delay(600,function(){
			
			shadow.setAttribute('class','shadow block animated fadeIn');
			
		});
		
		lib.delay(1200,function(){
			
			floating();
			
		});
		
	};
	
	floating = function(){
		
		currentMode = 'floating';
		
		balloon.setAttribute('class','balloon block animated infinite float');
		google.maps.event.addDomListenerOnce(map, 'click', runUpToGetDown, false);
		
	};
	
	ground = function(){
		
		currentMode = 'ground';
		
		baloonOnMap.setOptions({ 'visible' : true });
		
		balloon.setAttribute('class','balloon none');
		shadow.setAttribute('class','shadow none');
		
		for(var i=0; i<men.length; i++){
			
			men[i].setAttribute('class','man block');
			
		}
		
		google.maps.event.addDomListenerOnce(baloonOnMap, 'click', runUpToGetOn, false);
		
		//従者の追従
		
	};
	
	runUpToGetDown = function(e){
		
		currentMode = 'runUpToGetDown';
		
		arrivalCoordinates.lat = e.latLng.lat();
		arrivalCoordinates.lng = e.latLng.lng();
		
	};
	
	runUpToGetOn = function(){
		
		currentMode = 'runUpToGetOn';
		
		arrivalCoordinates.lat = baloonCoordinates.lat;
		arrivalCoordinates.lng = baloonCoordinates.lng;
		
	};
	
	getOn = function(e){
		
		currentMode = 'getOn';
		
		for(var i=0; i<men.length; i++){
			
			(function(i){
				
				lib.delay((200+(100*(i+1))),function(){
					
					men[i].setAttribute('class','man block animated getOn');
					
				});
				
			}(i));
			
		}
		
		lib.delay(800,function(){
			
			for(var i=0; i<men.length; i++){
				
				men[i].setAttribute('class','man none');
				
			}
			
			balloon.setAttribute('class','balloon block animated getOn');
			shadow.setAttribute('class','shadow block');
			
			baloonOnMap.setOptions({ 'visible' : false });
			
			lib.delay(900,function(){
				
				floating();
				
			});
			
		});
		
	};
	
	getDown = function(){
		
		currentMode = 'getDown';
		
		balloon.setAttribute('class','balloon block animated getDown');
		
		lib.delay(1200,function(){
			
			for(var i=0; i<men.length; i++){
				
				(function(i){
					men[i].setAttribute('class','man block');
					
					lib.delay((200+(100*(i+1))),function(){
						men[i].setAttribute('class','man block animated getDown');
					});
				}(i));
				
			}
			
			lib.delay(900,function(){
				
				baloonOnMap.setOptions({ 'position' : new google.maps.LatLng( arrivalCoordinates.lat, arrivalCoordinates.lng ) });
				baloonCoordinates.lat = arrivalCoordinates.lat;
				baloonCoordinates.lng = arrivalCoordinates.lng;
				
				walkSteps = [];
				
				ground();
				
			});
			
		});
		
	};
	
	keydown = function(e){
		
		switch(e.keyCode){
			
			case 38 :
				press[38] = true;
				break;
				
			case 40 :
				press[40] = true;
				break;
				
			case 37 :
				press[37] = true;
				break;
				
			case 39 :
				press[39] = true;
				break;
				
		}
		
	};
	
	keyup = function(e){
		
		switch(e.keyCode){
			
			case 38 :
				press[38] = null;
				break;
				
			case 40 :
				press[40] = null;
				break;
				
			case 37 :
				press[37] = null;
				break;
				
			case 39 :
				press[39] = null;
				break;
				
		}
		
	};
	
	touchmove = function(e){
		
		var
			e = e.touches[0],
			x = e.clientX - display.width/2,
			y = e.clientY - display.height/2,
			atan = Math.abs( Math.atan(y/x) );
		
		press[38] = press[40] = press[37] = press[39] = null;
		
		if( 0 < x ){
			
			if( atan < Math.PI/2-Math.PI/2/2/2 ){
				
				press[39] = true;
				
			}
			
		}else{
			
			if( atan < Math.PI/2-Math.PI/2/2/2 ){
				
				press[37] = true;
				
			}
			
		}
		
		if( 0 < y ){
			
			if( Math.PI/2/2/2 < atan ){
				
				press[40] = true;
				
			}
			
		}else{
			
			if( Math.PI/2/2/2 < atan ){
				
				press[38] = true;
				
			}
			
		}
		
	};
	
	touchend = function(e){
		
		press[38] = press[40] = press[37] = press[39] = null;
		
	};
	
	watchPress = function(speed){
		
		var
			pan = false
			;
			
			for( var v in press ){
				
				if(press[v]) {
					
					switch(v-0){
						
						case 38 :
							arrivalCoordinates.lat = arrivalCoordinates.lat + speed;
							break;
							
						case 40 :
							arrivalCoordinates.lat = arrivalCoordinates.lat - speed;
							break;
							
						case 37 :
							arrivalCoordinates.lng = arrivalCoordinates.lng - speed;
							break;
							
						case 39 :
							arrivalCoordinates.lng = arrivalCoordinates.lng + speed;
							break;
							
					}
					
					pan = true;
					
				}
				
			}
			return pan;
	};
	
	watchFollow = function(migration, travelling){
		
		var
			walkSteps_ = [],
			x = 0,
			y = 0
			;
		
		if(walkSteps.length===0){
			
			walkSteps[0] = {
				'lat' : migration.lat*100000,
				'lng' : migration.lng*100000
			};
			
		}else{
			
			walkSteps.unshift({
				'lat' : walkSteps[0].lat + (migration.lat*100000),
				'lng' : walkSteps[0].lng + (migration.lng*100000)
				});
			
				//降りたあとにクラス名はずさないとボトムが効かない
		}
		/*
		for(var i=0; i<walkSteps.length; i++){
			
			if(0<i){
				
				walkSteps_[i] = {};
				walkSteps_[i].lat = walkSteps[i-1].lat + migration.lat;
				walkSteps_[i].lng = walkSteps[i-1].lng + migration.lng;
				
			}else{
				
				walkSteps_[i] = walkSteps[i];
				
			}
			
		}
		
		walkSteps = walkSteps_;
		*/
		if( men.length < walkSteps.length ){
			
			walkSteps.pop();
			
		}
		
		for(var i=1; i<walkSteps.length; i++){
			
			x = -walkSteps[i].lat;
			y = -walkSteps[i].lng;
			if(mensLimitOnWork[i].x < Math.abs(x)) {
				x = mensLimitOnWork[i].x * ((0<x) ? 1 : -1);
			}
			if(mensLimitOnWork[i].y < Math.abs(y)) {
				y = mensLimitOnWork[i].y * ((0<y) ? 1 : -1);
			}
			x = x - 130;
			y = y + 15;
			
			men[i].setAttribute('style','bottom:' + x + 'px;left:' + y + 'px;');
			
		}
//		console.log(walkSteps);
		
	};
	
	watch = function(){
		
		var
			nextCoordinates = {},
			gap = {},
			speed = 0.0001,
			migration = { 'lat':0, 'lng':0 },
			travelling = 0,
			pan = false
			;
		
		if(map) {
			
			switch(currentMode){
				
				case 'floating':
					pan = watchPress(speed);
					break;
				
				case 'ground':
					speed = 0.00003;
					pan = watchPress(speed);
					break;
				
				case 'getOn':
					break;
				
				case 'runUpToGetDown':
					
					if(
						prevCoordinates.lat!==arrivalCoordinates.lat
						|| prevCoordinates.lng!==arrivalCoordinates.lng
						) {
						
						pan = true;
						
					}else{
						
						getDown();
						
					}
					break;
				
				case 'runUpToGetOn':
					
					if(
						prevCoordinates.lat!==arrivalCoordinates.lat
						|| prevCoordinates.lng!==arrivalCoordinates.lng
						) {
						
						speed = 0.00003;
						pan = true;
						
					}else{
						
						getOn();
						
					}
					break;
					
				case 'getDown':
					break;
				
				default:
					break;
				
			}
			
			if(pan){
				
				gap.lat = arrivalCoordinates.lat - prevCoordinates.lat;
				gap.lng = arrivalCoordinates.lng - prevCoordinates.lng;
				
				if(gap.lat < 0){
					
					if(gap.lng < 0){
						
						travelling = 225;
						
					}else{
						
						travelling = 315;
						
					}
					
				}else{
					
					if(gap.lng < 0){
						
						travelling = 135;
						
					}else{
						
						travelling = 45;
						
					}
					
				}
				
				if(gap.lat===0){
					
					nextCoordinates.lat = arrivalCoordinates.lat;
					
				}else if(Math.abs(gap.lat) <= speed){
					
					nextCoordinates.lat = arrivalCoordinates.lat;
					
				}else if(gap.lat < 0){
					
					nextCoordinates.lat = prevCoordinates.lat + ( migration.lat = (-speed) );
					
				}else{
					
					nextCoordinates.lat = prevCoordinates.lat + ( migration.lat = speed );
					
				}
				
				if(gap.lng===0){
					
					nextCoordinates.lng = arrivalCoordinates.lng;
					
				}else if(Math.abs(gap.lng) < speed){
					
					nextCoordinates.lng = arrivalCoordinates.lng;
					
				}else if(gap.lng < 0){
					
					nextCoordinates.lng = prevCoordinates.lng + ( migration.lng = (-speed) );
					
				}else{
					
					nextCoordinates.lng = prevCoordinates.lng + ( migration.lng = speed );
					
				}
				
				switch(currentMode){
					
					case 'ground':
						watchFollow( migration, travelling );
						break;
					
				}
				
				map.panTo(new google.maps.LatLng(nextCoordinates.lat,nextCoordinates.lng));
				
				prevCoordinates = nextCoordinates;
				
			}
			
		}
		
		request = requestAnimationFrame(watch);
		
	};
	
	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(
			
			function(pos){
				
				arrivalCoordinates.lat = prevCoordinates.lat = pos.coords.latitude-0;
				arrivalCoordinates.lng = prevCoordinates.lng = pos.coords.longitude-0;
				
				createMap();
				
			},
			function(){
				
				createMap();
				
			}
			
		);
		
	} else {
		
		createMap();
		
	}
	
	if(event.hasTapEvent){
		
		world.addEventListener('touchstart', touchmove);
		world.addEventListener('touchmove', touchmove);
		world.addEventListener('touchend', touchend);
		
	}
	
	w.addEventListener('keydown', keydown);
	w.addEventListener('keyup', keyup);
	
	watch();
	
}(this,document));