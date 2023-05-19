/*Menu Main Class*/

var _menu = {

	id: "",
	timeMenuDelay: 410,
	description: "",

    create: function(id,api) {
    	if (!_system.isNull(id)) this.id = "#"+id;
    	if (!_system.divExist(this.id)) {
			if ($('menu').length == 0) $('body').append("<menu></menu>");
	    	$('menu').html('<div id="menu-description"></div><ul></ul>');
	    }
	    if (!_system.isNull(api)) {
			this.callApi(api);
	    }

    },

    callApi: function(url) {
    	_parent = this;
    	_system.log(url);
		$.getJSON(url, function(data) {
			if (!_system.isNull(data)) {
		    	$('menu').html('<div id="menu-description"></div><ul></ul>');
		    	//setTimeout(function() {
				for (i=0;i<data.length;i++) {
					var item = data[i];
					_parent.addButton(item.id,item.text,item.action,item.type,item.isSticky);
				}
				if (_parent.description!="") {
					$('#menu-description').html(_parent.description);
				}
				//},2000);
			}
		}).fail(function() {

		});
    },

    addDescription: function(description) {
	    this.description = description;
		$('#menu-description').html(description);
    },

    addButton: function(id,text,icon,action,type,isSticky) {
	    $('menu ul').append('<li action="'+(!_system.isNull(action) ? action : "")+'" class="'+(!_system.isNull(type) ? type : "")+' '+(isSticky==true ? "sticky" : "")+'" id="menu-element-'+id+'"><div class="material-icons icon">'+icon+'</div><div class="text">'+text+'</div></li>');
    },

    resetButtons: function() {
    	$('menu ul').html('');
    },

    showHide: function () {
    	if ($('main').hasClass('translate')) {
	    	this.hide();
    	} else {
	    	this.show();
    	}
    },

    show: function () {
    	$('main').addClass('translate');
		$('notification').hide();
		$('menu').show();
    	setTimeout(function() {
	    	//$('menu').css('z-index',100);
    	},this.timeMenuDelay);
    },

    hide: function () {
    	$('main').removeClass('translate').addClass('return');

    	setTimeout(function() {
	    	$('main').removeClass('return');
	    	//$('menu').css('z-index',0);
    	},this.timeMenuDelay);

    }

}
