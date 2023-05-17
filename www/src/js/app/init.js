var _views = new Array();
_app['language'] = "it";

var _init = {

	/*Init App Main Method*/
	app: function() {

		//Check language
		this.language();

		viewLabel = "home";
		_views[viewLabel] = new FM_View();
		_views[viewLabel].create(viewLabel, viewLabel);
		_views[viewLabel].loadModelsArticle(["list"]);
		_views[viewLabel].headerCreate();
		_views[viewLabel].addSection("home-page2");	//Subsection 2
		_views[viewLabel].addSection("home-page3");	//Subsection 3
		_views[viewLabel].headerbar.addButton("button-home-left", "", "logout", "_navigator.home.page2()", "left", null, 0);
		_views[viewLabel].headerbar.addButton("button-home-right", "", "warning", "_navigator.home.page3()", "right", null, 0);
		_views[viewLabel].headerbar.setTitleImage("assets/img/logo.png", 0);
		_views[viewLabel].headerbar.setTitle("Section Section 1", 1);
		_views[viewLabel].headerbar.setTitle("Section Section 2", 2);

		viewLabel = "page2";
		_views[viewLabel] = new FM_View();
		_views[viewLabel].create(viewLabel, viewLabel);
		_views[viewLabel].headerCreate();
		_views[viewLabel].headerbar.setTitle(_system.label("page2"), 0);

		viewLabel = "page3";
		_views[viewLabel] = new FM_View();
		_views[viewLabel].create(viewLabel, viewLabel);
		_views[viewLabel].headerCreate();
		_views[viewLabel].headerbar.setTitle(_system.label("page3"), 0);

		_toolbar.create("toolbar-home");
		_toolbar.addButton(_system.label("page1"), "filter_1", "_navigator.home.main()", "home");
		_toolbar.addButton(_system.label("page2"), "filter_2", "_navigator.page2()", "search");
		_toolbar.addButton(_system.label("page3"), "filter_3", "_navigator.page3()", "orders");

		//Init Floating Menu
		_floatingmenu = new FM_FloatingMenu();

		//Check specific elements for PWA
		this.standalone();

		//Check Main View (logged/not logged)
		this.main();

		//Render elements post view-render
		this.elements();

	},

	/*Init Main View*/
	main: function() {
		var _this = this;
		setTimeout(function() {
			_navigator.home.main();	
		}, 500);
	},

	/*Init Language*/
	language: function() {
		var lang = window.navigator.language.substr(0,2);
		if (lang != "it" && lang != "en") {
			lang = en;
		}
 		_app.language = lang;
		localStorage.setItem('__app_language_default', _app.language);
	},

	/*Init Elements post view creation*/
	elements: function() {

		if (_system.isOS()) {
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'vendors/tildeapp/css/ios.css'));
		}
		if (_system.isAndroid()) {
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'vendors/tildeapp/css/android.css'));
		}
		if (_system.isCordova()) {
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'vendors/tildeapp/css/cordova.css'));
		}
		//screen.lockOrientation('portrait');
		setTimeout(function() {

			//Init show/hide password fields
			$('#login-password, #reg-password, #edit-profile-old-password, #edit-profile-new-password, #edit-profile-new-password-confirm').after("<div class='icon show-password'></div>");
			
		}, 1000);
	},

	/*Init Events post view creation*/
	events: function() {
		$('view section').on("scroll", function() {
			if ($(this).scrollTop() > 0) {
				$('headerbar').addClass("section-scrolled");
			} else {
				$('headerbar').removeClass("section-scrolled");
			}
			if ($(this).scrollTop() > 40) {
				$('headerbar').addClass("section-scrolled-title");
			} else {
				$('headerbar').removeClass("section-scrolled-title");
			}
			//console.log($(this).scrollTop());
		});
	},

	/*Init structure for PWA*/
	standalone: function() {
		/*
		if (window.navigator.standalone) {
			if (_system.isOS()) {
				$('toolbar').css({
					"bottom": "auto",
					"top": $(document).height() - 50 + "px"
				});	
			}
			//document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
		}
		*/
	},

	/*Init url routing*/
	routing: function() {
		_app.routing = true;
		return _navigator.routing();
	},

}