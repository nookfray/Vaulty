// Google Maps API Lazy Load AFTERSCRIPTS
(function( w ){
	var loadJS = function( src, cb ){
		"use strict";
		var ref = w.document.getElementsByTagName("script")[ 0 ];
		var script = w.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore( script, ref );
		if (cb && typeof(cb) === "function") {
			script.onload = cb;
		}
		return script;
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = loadJS;
	}
	else {
		w.loadJS = loadJS;
	}
}( typeof global !== "undefined" ? global : this ));


// Google Maps API Lazy Load SDStudio ;)
function google_maps_init() {
	'use strict'
	
	var markerElement = document.getElementById('marker')
	var mapElement = document.getElementById('map')
	var addressName = mapElement.getAttribute('data-name')
	var roemerberg = {lat: + mapElement.getAttribute("data-lat"), lng: + mapElement.getAttribute("data-lng")}
	var map = new google.maps.Map(mapElement, {
		zoom: 12,
		center: roemerberg,
		markers: [],
	})

	 var contentString = '<div class="balon_content">'+
      '<div>'+
      '</div>'+
      '<p id="firstHeading" class="firstHeading">Shipping address</p>'+
      '<div id="bodyContent">'+
      '<p><b>' + addressName + '</b></p>'+
      '</div>'+
      '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
		position: roemerberg,
		map: map,
		title: "Shipping address",
	})

	infowindow.open(map, marker);
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
  
	map.markers.push(marker);
}

function google_maps_lazyload(api_key) {
	'use strict'

	if (api_key) {
		var options = {
			rootMargin: '100px',
			threshold: 0
		}

		var observer = new IntersectionObserver(function(entries, self) {
			var isIntersecting = typeof entries[0].isIntersecting === 'boolean' ? entries[0].isIntersecting : entries[0].intersectionRatio > 0
			if (isIntersecting) {
				var mapsJS = document.createElement('script')
				mapsJS.src = 'https://maps.googleapis.com/maps/api/js?callback=google_maps_init&key=' + api_key
				document.getElementsByTagName('head')[0].appendChild(mapsJS)
				self.unobserve(map)
			}
		},
		options
	)
	observer.observe(map)
	}
}

google_maps_lazyload("AIzaSyBNI6A4m6S10Scqe7OLstcaVYuLR6xQ_7M") 

// END
// Google Maps API Lazy Load SDStudio ;)
// ================================================