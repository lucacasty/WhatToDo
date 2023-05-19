/*
(function(doc) {
        var viewport = document.getElementById('viewport');
        if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            viewport.setAttribute("content", "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        } else if ( navigator.userAgent.match(/iPad/i) ) {
            viewport.setAttribute("content", "initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        }
}(document));
*/

/*Init App*/

$(document).ready(function() {
    app.initialize();
});

/*Headerbar Events*/

$(document).on('click',"a",function() {
	var href = $(this).attr('href');
    if ($(this).attr('target') == "_blank") {
        if ((href.indexOf('tel:')>=0) || (href.indexOf('mailto:')>=0)) {
    		return true;
    	} else {
    		_system.openBrowser(href);
    		return false;
    	}
    }
});

$(document).on('swiperight',"backzone",function() {
	if (!_system.isPWA()) {
		_system.back();
	}
});

/*Floating Action Events*/

$(document).on('tap',"floatingactions li",function() {
	//_app.toolbar.selectButton($(this).attr('index'));
	var action = $(this).attr('action');
	if (!_system.isNull(action)) eval(action);
	//O_Main_Menu.hide();
	return false;
});

$(document).on('tap',"toolbar #button-toolbar-close",function() {
	if (_system.isAndroid()) return;
	$('toolbar').removeClass('open');
	return false;
});

$(document).on('tap',".button-toolbar-open",function() {
	if (_system.isAndroid()) return;
	$('toolbar').addClass('open');
	return false;
});

$(document).on('tap',"button[action], div[action], h3[action], p[action], span[action], li[action], article[action], tag[action], description[action], label[action], img[action]",function() {
	//_system.log(_system.dateInMs() + " --> Tap action!");
	var action = $(this).attr('action');
	if ($(this).parents('view').hasClass("edit-list-mode") && $(this)[0].nodeName == "ARTICLE") {
		$(this).find('input[type="checkbox"]').trigger('click');
		return;
	}
	if ($(this).parents('articles').hasClass("edit-list-mode") && $(this)[0].nodeName == "ARTICLE") {
		$(this).find('input[type="checkbox"]').trigger('click');
		return;
	}
	if (!_system.isNull(action)) {
		$('input, select, textarea').blur();
		eval(action);
	}
	return false;
});

/*Toastmessage Events*/

$(document).on('tap',"toastmessage",function() {
    _toastmessage.hideMessage();
});

/*List Events*/

$(document).on('swipeleft',"article",function() {
	if ($(this).find('.slide-actions').length > 0) {
		$(this).parents("articles").find('article').removeClass("show-actions");
		$(this).addClass("show-actions");
	}
});

$(document).on('tap swiperight',"article",function() {
	if (!$(this).hasClass("blocked")) {
		$(this).removeClass("show-actions");
	}
});

$(document).on('tap',"article .slide-actions li",function() {
	if ($(this).parents("article").length > 0) {
		if (!$(this).parents("article").hasClass("blocked")) {
			$(this).parents("articles").find('article').removeClass("show-actions");
		}	
	} else {
		$(this).parents("articles").find('article').removeClass("show-actions");
	}
});

/*Menu Events*/

$(document).on('tap',"menu li",function() {
	if ($(this).hasClass('sticky')) {
		var myId = $(this).attr('id');
		if (!$(this).hasClass('closed')) {
			$(this).addClass('closed');
			var foundNode = false;
			$('menu ul li').each(function() {
				if (foundNode) {
					if ($(this).hasClass('sticky')) {
						foundNode = false;
					} else {
						$(this).hide();
					}
				}
				if ($(this).attr('id')==myId) foundNode = true;
			});
		} else {
			$(this).removeClass('closed');
			var foundNode = false;
			$('menu ul li').each(function() {
				if (foundNode) {
					if ($(this).hasClass('sticky')) {
						foundNode = false;
					} else {
						$(this).show();
					}
				}
				if ($(this).attr('id')==myId) foundNode = true;
			});

		}
	} else {
		var action = $(this).attr('action');
		if (!_system.isNull(action)) eval(action);
		_menu.hide();
	}
	return false;
});

$(document).on('swiperight',"menu, main.translate .notouchzone",function() {
	//O_Main_Menu.hide();
	return false;
});

$(document).on('tap',"main.translate .notouchzone",function() {
	//O_Main_Menu.hide();
	return false;
});

/*Map Events*/

$(document).on('tap',".map-popup-element",function() {
	var action = $(this).attr('action');
	if (!_system.isNull(action)) eval(action);
	return false;
});

/*Section Events*/
/*
$(document).on('swiperight',"section",function() {
	if (_system.isOS()) {
		if (!$(this).hasClass('level-0')) {
			var view = $(this).parents('view').attr('id');
			_system.log(view);
			_views[view].backSection();
		}
	}
	return false;
});
*/

/*Button over effects*/
var _buttonIdOver = null;
$(document).on('tap', 'button, .list-item', function(e) {
	if (_system.isAndroid()) {
		var posX = $(this).offset().left,
            posY = $(this).offset().top;
		var relX = e.pageX - posX,
			relY = e.pageY - posY;
        var bPress = $(this);
		bPress.find('.clicked').remove();
		bPress.append("<div class='clicked-effect'></div>");
		bPress.find('.clicked-effect').css({ left: relX-50+"px", top: relY-50+"px"});
        clearTimeout(_buttonIdOver);
        _buttonIdOver = setTimeout(function() {
            $('.clicked-effect').remove();
        },1000);
	}
});

/*Form events*/
$(document).on("focus", "input", function() {
	if ($(this).attr("type") !== "checkbox" && $(this).attr("type") !== "radio" ) {
		$('body').addClass("input-focus");
	}
});

$(document).on("blur", "input", function() {
	$('body').removeClass("input-focus");
});