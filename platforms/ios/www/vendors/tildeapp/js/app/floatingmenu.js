/*Floating Actions Class*/

function FM_FloatingMenu() {

	_this = this;
	this.id = null;
	this.buttons = {};
	this.timeRendering = 300;
	this.idContainer = "#floatingmenu";
	
    this.create = function (buttons, description) {
		var _this = this;
    	if (!_system.divExist(this.idContainer)) {
	    	$("main").append('<floatingmenu id="floatingmenu"><ul><div class="description t-a-c p-t-20 m-b-20">' + (description !== undefined && description !== "" ? description : "") + '</div></ul></floatingmenu>');
		}
		if (buttons !== undefined) {
			this.reset(description);
			for (var key in buttons) {
				var button = buttons[key];
				this.addButton(button['label'], button['action'], button['color'])
			}
			setTimeout(function() {
				_this.show();
			}, 50);
		}
    }
    
    this.addButton = function(label,action,color) {
		var style = "";
		if (color !== undefined) {
			style = "color:"+color;
		}
		$("#floatingmenu ul").append('<li style="'+style+'" action="'+(!_system.isNull(action) ? action : "")+'">'+label+'</li>');
    }
            
    this.showHide = function (level) {
    	if (this.idContainer.hasClass('show')) {
	    	this.idContainer.hide();
    	} else {
	    	this.idContainer.show();
    	}
    }
    
    this.show = function (level) {
    	$(this.idContainer).addClass('show');
    }
    
    this.hide = function (level) {
    	$(this.idContainer).removeClass('show');
    }
    
    this.reset = function(description) {
	    $('#floatingmenu .description').html(description);
	    $('#floatingmenu ul').html('<div class="description t-a-c p-t-20 m-b-20">' + (description !== undefined && description !== "" ? description : "") + '</div>');
	}
   
}