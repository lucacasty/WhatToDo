/*Headerbar Class*/

function FM_Headerbar() {

	this.id = null;
	this.timeHeaderbarDelay = 0;
	this.titleLevels = new Array();
	this.colorLevels = new Array();

    this.create = function (idView,title,color) {
    	if (!_system.isNull(idView)) this.id = "#header-"+idView;
    	if (!_system.divExist("#header-"+idView)) {
	    	$("#"+idView).prepend('<headerbar id="header-'+idView+'"><div class="container"><div class="top"></div><div class="button-toolbar-open"></div><div class="left"><ul></ul></div><div class="right"><ul></ul></div><div class="title" level="0"></div></div></headerbar>');
    	}
    	if (!_system.isNull(title)) {
	    	this.setTitle(title);
    	}
    	if (!_system.isNull(color)) {
	    	this.setColor(color,0);
	    }
    }

    this.setTitleImage = function(imageUrl) {
	 	$(this.id).find('.title').css('background-image','url('+imageUrl+')').addClass('with-logo');
    }

    this.setColorLevel = function(level) {
	    if (!_system.isNull(this.colorLevels[level])) {
			this.setColor(this.colorLevels[level],level);
	    }
    }

    this.setColor = function(color,level) {
	    if (!_system.isNull(level) || level==0) {
		    this.colorLevels[level] = color;
		}
	 	$(this.id).css("background-color", color);
    }

    this.setTopBottom = function(top,bottom) {
    	if (_system.divExist(this.id)) {
	    	if (!_system.isNull(top)) {
	    		$(this.id).css('top',top);
	    	} else {
	    		$(this.id).css('top','auto');
	    	}
	    	if (!_system.isNull(bottom)) {
	    		$(this.id).css('bottom',bottom);
	    	} else {
	    		$(this.id).css('bottom','auto');
	    	}
		}
    }

    this.addHeaderCSS = function(css) {
    	if (_system.divExist(this.id) && !_system.isNull(css)) {
    		var actualCSS = $(this.id).attr('style');
    		if (!_system.isNull(actualCSS)) actualCSS+=";";
    		actualCSS+=css;
    		$(this.id).attr('style',actualCSS);
	  	}
    }

    this.setTitleLevel = function(level) {
	    //if (!_system.isNull(this.titleLevels[level])) {
    		var divTitle = $(this.id).find('.title');
			this.setTitle(this.titleLevels[level],level);
			divTitle.attr("level", level);
	    //}
    }

    this.setTitle = function(title,level) {
		if (title === undefined) title = "";
	    this.titleLevels[level] = title;
    	if (_system.divExist(this.id)) {
    		var divTitle = $(this.id).find('.title');
    		if (divTitle.hasClass('show')) {
	    		divTitle.removeClass('show');
	    		setTimeout(function() {
		    		divTitle.html(title).addClass('show');
	    		},this.timeHeaderbarDelay);
    		} else {
	    		divTitle.html(title).addClass('show');
    		}
	    }
    }

    this.removeTitle = function() {
    	if (_system.divExist(this.id)) {
    		$(this.id).find('.title').text('');
	    }
    }

    this.addButtonDeprecated = function(id,text,icon,action,position,type) {
    	if (_system.divExist(this.id) && !_system.divExist(id)) {
    		if (_system.isNull(action)) action = "";
    		if (_system.isNull(position)) position = "right";
    		if (_system.isNull(type)) type = "vendors/tildeapp/img/icon/";
    		var iconDiv = (_system.isNull(icon) ?  '' : '<div class="material-icons">' + icon + '</div>');
    		$(this.id+" ."+position+" ul").append('<li id="'+id+'" action="'+action+'" index="'+(this.totalButton())+'" class="'+(_system.isNull(icon) ?  '' : "with-icon")+' '+(_system.isNull(text) ?  '' : "with-text")+'">'+iconDiv+'<div class="text">'+text+'</div></li>');
    	}
    }

    this.addButton = function(id,text,icon,action,position,type,level,cssClass) {
    	if (_system.divExist(this.id) && !_system.divExist(id)) {
			var type = "";
    		if (_system.isNull(action)) action = "";
			if (_system.isNull(position)) position = "right";
    		var iconDiv = (_system.isNull(icon) ?  '' : '<div class="material-icons">' + icon + '</div>');
    		if (position=="right") {
	    		$(this.id+" ."+position+" ul").append('<li id="'+id+'" '+(level !== undefined && level !== null ? "level='"+level+"'" : "")+' action="'+action+'" index="'+(this.totalButton())+'" class="'+(cssClass !== undefined ? cssClass : "")+' '+(_system.isNull(icon) ?  '' : "with-icon")+' '+(_system.isNull(text) ?  '' : "with-text")+'">'+iconDiv+(text != "" ? '<div class="text">'+text+'</div>' : "")+'</li>');
    		} else {
	    		$(this.id+" ."+position+" ul").prepend('<li id="'+id+'" '+(level !== undefined && level !== null ? "level='"+level+"'" : "")+' action="'+action+'" index="'+(this.totalButton())+'" class="'+(cssClass !== undefined ? cssClass : "")+' '+(_system.isNull(icon) ?  '' : "with-icon")+' '+(_system.isNull(text) ?  '' : "with-text")+'">'+iconDiv+(text != "" ? '<div class="text">'+text+'</div>' : "")+'</li>');
    		}
    	}
    }

    this.addButtonBack = function() {
    	if (_system.divExist(this.id)) {
	    	this.addButton(this.id.replace("#","")+"-header-button-back","","arrow_back_ios","_system.back()","left");
		}
    }

    this.removeButton = function(index,position) {
    	if (_system.divExist(this.id)) {
    		if (_system.isNull(position)) position = "right";
    		$(this.id+" ."+position+" li:eq("+index+")").remove();
    		var newIndexReassign = 0;
    		$(this.id+" ."+position+" li").each(function() {
    			$(this).attr('index',newIndexReassign);
	    		newIndexReassign++;
    		});
		}
    }

    this.removeButtonBack = function() {
	    this.removeButton(0,'left');
    }

    this.removeFirstButton = function(position) {
	    this.removeButton(0,position);
    }

    this.removeLastButton = function(position) {
	    this.removeButton(this.totalButton()-1,position);
    }

    this.removeAllButton = function(position) {
    	if (_system.divExist(this.id)) {
    		if (_system.isNull(position)) {
	    		$(this.id+" li").remove();
    		} else {
	    		$(this.id+" ."+position+" li").remove();
    		}
		}
	}

    this.selectButton = function(index) {
    	if (_system.divExist(this.id)) {
    		$(this.id+" li").removeClass('selected');
    		$(this.id+" li:eq("+index+")").addClass('selected');
		}
    }

    this.totalButton = function() {
	    return $(this.id+" li").length;
    }

    this.show = function () {
    	var headerbarId = this.id;
    	$(headerbarId).show();
    	setTimeout(function() {
	    	$(headerbarId).addClass('show');
    	},10);
    }

    this.hide = function () {
    	var headerbarId = this.id;
	   	$(headerbarId).removeClass('show');
    	setTimeout(function() {
	    	$(headerbarId).hide();
    	},this.timeHeaderbarDelay);
    }

}
