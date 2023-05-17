/*App Main Element Class*/

var _app = {
	toolbar: null,
	viewHome: null,
	totalViewCreated: 0,
	latestViewShowed: null,
	prevViewShowed: null,
	userLastLat: null,
	userLastLon: null,
	userLastAccuracy: 1,
	userGeoError: false,
	language: "it",
	serviceUrl: "",
	serviceUser: "",
	servicePass: "",
	serviceUserDefault: this.serviceUser,
	servicePassDefault: this.servicePass,
	serviceToken: null,
	debugMode: false
}

var app = {
    // Application Constructor
    initialize: function() {
		if (window.cordova === undefined) {
			_init.app();
		} else {
			this.bindEvents();
		}
    },
	
	bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		document.addEventListener("backbutton", this.onBack.bind(this), false);
		document.addEventListener("resume", this.onResume.bind(this), false);
	},
	
    onDeviceReady: function() {
		_init.app();
    },
    
    onBack: function() {
        _system.back();
    },
    
    onResume: function() {
        //_objects.init();
    }
};
