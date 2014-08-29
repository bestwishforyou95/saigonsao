
function createMarker(map,point,root,the_link,the_title,color,callout) {

    /*
	var baseIcon = root + "img/icons/shadow.png";
	var blueIcon = root + "img/icons/blue-dot.png";
	var redIcon = root + "img/icons/red-dot.png"; 
	var greenIcon = root + "img/icons/green-dot.png";   
	var yellowIcon = root + "img/icons/yellow-dot.png";      		
	var tealIcon = root + "img/icons/teal-dot.png"; 
	var blackIcon = root + "img/icons/black-dot.png"; 
	var whiteIcon = root + "img/icons/white-dot.png"; 
	var purpleIcon = root + "img/icons/purple-dot.png"; 
	var pinkIcon = root + "img/icons/pink-dot.png"; 
	var customIcon = color;
	
	var image = root + "img/icons/red-dot.png";
	
	if(color == 'blue')			{ image = blueIcon } 
	else if(color == 'red')		{ image = redIcon } 
	else if(color == 'green')	{ image = greenIcon } 
	else if(color == 'yellow')	{ image = yellowIcon } 
	else if(color == 'teal')	{ image = tealIcon } 
	else if(color == 'black')	{ image = blackIcon }  
	else if(color == 'white')	{ image = whiteIcon } 
	else if(color == 'purple')	{ image = purpleIcon } 
	else if(color == 'pink')	{ image = pinkIcon } 
	else { image = customIcon }
    */
    var image = new google.maps.MarkerImage(
              root +'img/icons/red-dot.png',
              new google.maps.Size(19,32),
              new google.maps.Point(0,0),
              new google.maps.Point(10,32)
            );
            
            var shadow = new google.maps.MarkerImage(
              root +'img/icons/shadow.png',
              new google.maps.Size(39,32),
              new google.maps.Point(0,0),
              new google.maps.Point(10,32)
            );
            
            var shape = {
              coord: [13,0,14,1,15,2,16,3,17,4,18,5,18,6,18,7,18,8,18,9,18,10,18,11,18,12,17,13,17,14,16,15,15,16,14,17,14,18,13,19,13,20,12,21,12,22,11,23,11,24,11,25,11,26,10,27,10,28,10,29,10,30,10,31,8,31,8,30,8,29,8,28,8,27,8,26,7,25,7,24,7,23,6,22,6,21,6,20,5,19,4,18,4,17,3,16,2,15,1,14,1,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,1,5,1,4,2,3,3,2,4,1,5,0,13,0],
              type: 'poly'
            };
            
            var marker = new google.maps.Marker({
                  draggable: true,
                  raiseOnDrag: false,
                  icon: image,
                  shadow: shadow,
                  shape: shape,
                  map: map,
                  position: point,
        	      title: the_title,
                  animation: google.maps.Animation.DROP,
            }); 
  	
  	var infowindow = new google.maps.InfoWindow({
        content: callout
    });
    
  	google.maps.event.addListener(marker, 'click', function() {
  		if ( callout == '' ) {
  			window.location = the_link;
  		} else {
  			infowindow.open(map,marker);
  		} 
  	});
  	
  	return marker;
	
}

