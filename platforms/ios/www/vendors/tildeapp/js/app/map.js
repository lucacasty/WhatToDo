/*GMap Class*/

function FM_Map(id,apiCall,mapCenterLat,mapCenterLon,mapType,mapZoom,mapCenterInAddress,mapIconDefault,mapNoInitIcon) {

	this.id = null;
	this.apiCall = null;
	
	this.mapCenterLat = 0;
	this.mapCenterLon = 0;
	this.mapZoom = 16;
	this.mapType = "G_DEFAULT_MAP_TYPES";
	this.mapIconDefault = "framework/img/icon/icon-map-default.png";
	this.mapNoInitIcon = false;
	this.mapCenterInAddress = null;
	
	this.map = null;
	this.geocoder = null;
	this.markersContent = new Array();
	this.infoWindows = new Array();
	this.infoWindowsOpened = null;

    this.create = function (id,apiCall,mapCenterLat,mapCenterLon,mapType,mapZoom,mapCenterInAddress) {
    	if (!_system.isNull(id)) {
    		//_system.log("Create map for "+id);
    		//Init class variables
		    if (!_system.isNull(id)) this.id = id;
		    if (!_system.isNull(apiCall)) this.apiCall = apiCall;
		    if (!_system.isNull(mapCenterLat)) this.mapCenterLat = mapCenterLat;
		    if (!_system.isNull(mapCenterLon)) this.mapCenterLon = mapCenterLon;
		    if (!_system.isNull(mapType)) this.mapType = mapType;
		    if (!_system.isNull(mapZoom)) this.mapZoom = mapZoom;
		    if (!_system.isNull(mapCenterInAddress)) this.mapCenterInAddress = mapCenterInAddress;
		    //Create map instance 
		    if (_app.userGeoError == true) {
	    		_system.currentPosition();
				//_system.message("Localizzazione non riuscita. Verifica che il GPS su tuo device, sia attivo.");	
				O_Main_Message.show("errorGPS","alert");
		    
		    }
	    	if (_system.isNull(this.mapCenterLat)) this.mapCenterLat = _app.userLastLat;
	    	if (_system.isNull(this.mapCenterLon)) this.mapCenterLon = _app.userLastLon;
	    	
			var latlng = new google.maps.LatLng(this.mapCenterLat,this.mapCenterLon );	
	    	var options = { zoom: parseInt(this.mapZoom), center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP, streetViewControl: false, disableDefaultUI: false };
	    	_system.log(this.id);
	    	this.map = new google.maps.Map(document.getElementById(this.id), options);
			this.geocoder = new google.maps.Geocoder();
			//Set icon center position
			var myIcon = new google.maps.MarkerImage(this.mapIconDefault, null, null, null, new google.maps.Size(32,32));
			if (!this.mapNoInitIcon) {
				var marker = new google.maps.Marker({ position: latlng, map: this.map, icon: myIcon, animation: google.maps.Animation.DROP});
			}
			//Check API
			if (!_system.isNull(apiCall)) {
				this.callApiMap(apiCall);
			}
    	}
    }
    
    this.callApiMap = function(url) {
    	var _parent = this;
		var filterLocation = localStorage.getItem('filterHomeNews');
		var filterCall = "";
		if (!_system.isNull(filterLocation)) {
			if (url.indexOf("?")>0) {
				url += "&idA="+filterLocation;				
			} else {
				url += "?idA="+filterLocation;
			}
    	}
   		$.getJSON(url, function(data) {
			if (!_system.isNull(data)) {
				for (var i=0; i<data.length; i++) {
					var item = data[i];
					_parent.setMarker(item.lat,item.lon,item.title,item.description,item.icon,item.action);
				}
			}
		}).fail(function() {
		
		});
    }
    
    this.setMarker = function(lat,lon,title,description,icon,action) {

		var i = 0;
		var _parent = this;
		if (_system.isNull(icon)) this.mapIconDefault;
		var content = title;
		//if (!isNull(tblDetail) && !isNull(tblId)) content = "<div class='gmap-icon-detail' onclick=\"parent.gmapOpenPreview('"+tblDetail+"','"+tblId+"')\"><strong>"+title+"</strong></div>";
		var myIcon = new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(32,32));
  	
	    if (!_system.isNull(lat) && !_system.isNull(lon)) {
	    	var latlng = new google.maps.LatLng(lat,lon);	            
	        var marker = new google.maps.Marker({ map: this.map, icon: myIcon, clickable: true, position: latlng });
	        this.markersContent.push(marker);
	        if (!_system.isNull(title)) {
		        var infoWindow = new google.maps.InfoWindow({ content: "<div class='map-popup-element "+(_system.isNull(action) ? "" : "with-action")+"' action='"+action+"'><div class='map-popup-title'>"+title+"</div><div>"+description+"</div></div>" });
		        this.infoWindows.push(infoWindow);
		        google.maps.event.addListener(marker, 'click', function() {
		        	for (i=0;i<_parent.infoWindows.length;i++) _parent.infoWindows[i].close(); 
		        	if (_parent.infoWindowsOpened!=infoWindow) {		        	
			        	infoWindow.open(this.map,marker); 
						_parent.infoWindowsOpened = infoWindow;
		        	} else {
			        	_parent.infoWindowsOpened = null;
		        	}
		        	//Hide X button
		        	$(".gm-style-iw").next("div").hide();
		        });
		    }
	    }
	}
	    
    if (!_system.isNull(id)) this.id = id;
    if (!_system.isNull(apiCall)) this.apiCall = apiCall;
    if (!_system.isNull(mapCenterLat)) this.mapCenterLat = mapCenterLat;
    if (!_system.isNull(mapCenterLon)) this.mapCenterLon = mapCenterLon;
    if (!_system.isNull(mapIconDefault)) this.mapIconDefault = mapIconDefault;
    if (!_system.isNull(mapType)) this.mapType = mapType;
    if (!_system.isNull(mapNoInitIcon)) this.mapNoInitIcon = mapNoInitIcon;
    if (!_system.isNull(mapZoom)) this.mapZoom = mapZoom;
    if (!_system.isNull(mapCenterInAddress)) this.mapCenterInAddress = mapCenterInAddress;
    if (!_system.isNull(id)) this.create(id,this.apiCall,this.mapCenterLat,this.mapCenterLon,this.mapType,this.mapZoom,this.mapCenterInAddress);
   
}