/*Floating Actions Class*/

function FM_FloatingActions() {

	this.id = null;
	this.buttons = new Array();
	this.timeRendering = 300;
	this.idContainer = "#floatingactions";
	
    this.create = function () {
    	if (!_system.divExist(this.idContainer)) {
	    	$("content").append('<floatingactions id="floatingactions"><ul></ul></floatingactions>');
    	}
    }
    
    this.addButton = function(idView,level,id,icon,color,action,type) {
    	if (_system.isNull(type)) type = "framework";
	    if (_system.isNull(this.buttons[idView])) this.buttons[idView] = new Array();	
	    if (_system.isNull(this.buttons[idView][level])) this.buttons[idView][level] = new Array();	
	    this.buttons[idView][level].push('<li action="'+(!_system.isNull(action) ? action : "")+'" style="background-color: '+color+'; background-image: url('+type+'/img/icon/'+icon+')" id="'+id+'"></li>');
    }
            
    this.showHide = function (level) {
    	if (this.idContainer.hasClass('translate')) {
	    	this.idContainer.hide();
    	} else {
	    	this.idContainer.show();
    	}
    }
    
    this.show = function (level) {
    	$(this.idContainer).addClass('translate');
    }
    
    this.hide = function (level) {
    	$('floatingactions').removeClass('translate');    	
    }
    
    this.reset = function(view,level) {
	    if (!_system.isNull(level)) {	    
		    _this.buttons[view][level] = new Array;
	    } else if (!_system.isNull(view)) {
		    _this.buttons[view] = new Array;
	    } else {
		    _this.buttons = new Array;		    
	    }
	    this.rendering();
    }
    
    this.rendering = function() {
	    this.hide();
	    _this = this;
	    setTimeout(function() {
		    $(_this.idContainer).find('ul').html('');
		    //if (!_system.isNull(_this.buttons)) {
			    var currentView = _app.latestViewShowed.replace("#","");
			    var currentLevel = _views[currentView].sectionShowed;
			    if (!_system.isNull(_this.buttons[currentView])) {
				    if (!_system.isNull(_this.buttons[currentView][currentLevel])) {
					    for (i=0; i<_this.buttons[currentView][currentLevel].length; i++) {
						    $(_this.idContainer).find('ul').append(_this.buttons[currentView][currentLevel][i]);
					    }				    
				    }
			    }
		    //}
		    _this.show();
	    },this.timeRendering);
    }
    
    this.create();
   
}