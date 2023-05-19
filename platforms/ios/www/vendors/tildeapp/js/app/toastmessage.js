/*Toast Message Class*/

var _toastmessage = {

	id: "",
	tagElement: "toastmessage",
	timeToShow: 7000,
	timerShow: null,

    create: function(id) {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			if (id !== undefined) {
				_this.id = "#"+id;
			} else {
				_this.id = _this.tagElement;
			}
			if (!_system.divExist(_this.id)) {
				$('body').append('<'+_this.tagElement+' id="'+_this.id+'"></'+_this.tagElement+'>');
				setTimeout(function() {
					resolve();
				}, 10)
			} else {
				resolve();
			}
		});
		return promise;
	},
	

	message: function(idMessage) {
		var _this = this;
		this.create().then(function() {
			_this.show(idMessage);
		});
	},

	warning: function(idMessage) {
		var _this = this;
		this.create().then(function() {
			_this.show(idMessage, "warning");
		});
	},

	error: function(idMessage) {
		var _this = this;
		this.create().then(function() {
			_this.show(idMessage, "error");
		});
	},

	message: function(idMessage) {
		var _this = this;
		this.create().then(function() {
			_this.show(idMessage);
		});
	},

    show: function(idMessage,type) {
		var _this = this;
		this.create().then(function() {
			_this.hideMessage();
			_this.removeClassType();
			$(_this.tagElement).html(_system.messageCode(idMessage));
			$(_this.tagElement).addClass(type);
			$(_this.tagElement).addClass('show');
			_this.timerShow = setTimeout(function() {
				_this.hideMessage();
			}, _this.timeToShow);
		});
	},

    showMessage: function(message,type) {
		var _this = this;
		this.create().then(function() {
			_this.hideMessage();
			_this.removeClassType();
			$(_this.tagElement).html(message);
			$(_this.tagElement).addClass(type);
			$(_this.tagElement).addClass('show');
			_this.timerShow = setTimeout(function() {
				_this.hideMessage();
			}, _this.timeToShow);
		});
    },

    hideMessage: function() {
	    clearTimeout(this.timerShow);
	    $(this.tagElement).removeClass('show');
    },

    removeClassType: function() {
	    $(this.tagElement).removeClass("error");
	    $(this.tagElement).removeClass("warning");
    }

 }
