/*Toolbar Class*/

var _toolbar = {

	id: "",
	timeToolbarDelay: 350,

    create: function(id) {
		if (_system.isNull(id)) id = "toolbar";
    	if (!_system.isNull(id)) this.id = "#"+id;
    	if (!_system.divExist(this.id)) {
	    	$('main').append('<toolbar id="'+id+'"><ul></ul></toolbar>');
	    }
    },

    setTopBottom: function(top,bottom) {
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
    },

    addHeaderCSS: function(css) {
    	if ($(this.id) && !_system.isNull(css)) {
    		var actualCSS = $(this.id).attr('style');
    		if (!_system.isNull(actualCSS)) actualCSS+=";";
    		actualCSS+=css;
    		$(this.id).attr('style',actualCSS);
	  	}
    },

    addButton: function(text,icon,action,viewId,type) {
    	if (_system.divExist(this.id)) {
    		if (_system.isNull(action)) action = "";
    		if (_system.isNull(viewId)) viewId = "";
			//if (_system.isNull(type)) 
			var type = "";
			//if (!_system.isWebkit() || _system.isWindows()) 
			//iconStyle = "background: transparent url('"+type+icon+"') no-repeat center center; background-size: 24px 24px;";
    		$(this.id+" ul").append('<li view="'+viewId+'" action="'+action+'" index="'+(this.totalButton())+'"><div class="icon"><span class="material-icons">' + icon + '</span></div><div class="text">'+text+'</div></li>');
    		this.buttonAssignWidth();
    	}
    },

    removeButton: function(index) {
    	if (_system.divExist(this.id)) {
    		$(this.id+" li:eq("+index+")").remove();
    		this.buttonAssignWidth();
    		var newIndexReassign = 0;
    		$(this.id+" li").each(function() {
    			$(this).attr('index',newIndexReassign);
	    		newIndexReassign++;
    		});
		}
    },

    removeFirstButton: function() {
	    this.removeButton(0);
    },

    removeLastButton: function() {
	    this.removeButton(this.totalButton()-1);
    },

    buttonAssignWidth: function() {
    	if (_system.divExist(this.id)) {
		    $("toolbar li").width((100/this.totalButton())+'%');
		}
    },

    selectButton: function(index) {
    	if (_system.divExist(this.id)) {
    		var button = $(this.id+" li:eq("+index+")");
    		$(this.id+" li").removeClass('selected');
    		button.addClass('selected');
    		//Eseguo un refresh dei contenuti dinamici della view
    		var idView = button.attr('view');
    		if (!_system.isNull(idView)) _views[idView].checkRefreshElements();
		}
    },

    selectButtonFromView: function(viewIdSearch) {
		var button = $(this.id+" li[view='"+viewIdSearch+"']");
		this.selectButton(button.attr('index'));
    },

    totalButton: function() {
	    return $(this.id+" li").length;
    },

    show: function () {
    	var toolbarId = this.id;
    	$(toolbarId).show();
    	setTimeout(function() {
	    	$(toolbarId).addClass('show');
    	},10);
    },

    hide: function () {
    	var toolbarId = this.id;
	   	$(toolbarId).removeClass('show');
    	setTimeout(function() {
	    	$(toolbarId).hide();
    	},this.timeToolbarDelay);
    }

}
