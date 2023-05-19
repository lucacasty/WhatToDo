/*Toast Message Class*/

var _modal = {

	id: "",
	tagElement: "modal",

    create: function(id) {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			if (id !== undefined) {
				_this.id = "#"+id;
			} else {
				_this.id = _this.tagElement;
			}
			if (!_system.divExist(_this.id)) {
				$('body').append('<'+_this.tagElement+' id="'+_this.id+'"><div class="body"></div></'+_this.tagElement+'>');
				setTimeout(function() {
					resolve();
				}, 10)
			} else {
				resolve();
			}
		});
		return promise;
	},

    show: function(id) {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			_this.create().then(function() {
				_this.hide().then(function() {
					var page = $('<div>');
					page.load("models/modals/"+id+".html",function() {
						var htmlPage = page[0].outerHTML;
						htmlPage = _this.replaceLangLabel(htmlPage);
						$(_this.id+" .body").html(htmlPage);
						$('body').addClass("show-modal");
						setTimeout(function() {
							$(_this.id+" .body").addClass("open");
							resolve();
						}, 10);
					});	
				});
			});
		});
		return promise;
	},

	hide: function() {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			if ($('body').hasClass("show-modal")) {
				$(_this.id+" .body").removeClass("open");
				setTimeout(function() {
					$('body').removeClass("show-modal");
					resolve();
				}, 400);	
			} else {
				resolve();
			}
		});
		return promise;
	},

	replaceLangLabel: function(stringHTML) {
		if (!_system.isNull(stringHTML)) {
			var elements = stringHTML.split("<lang:");
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i].split(">");
				element = element[0];
				var label = _system.language(element);
				stringHTML = stringHTML.replaceAll("<lang:"+element+">",label);
			}
			var elements = stringHTML.split("{{");
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i].split("}}");
				element = element[0];
				var label = _system.language(element);
				stringHTML = stringHTML.replaceAll("{{"+element+"}}",label);
			}
		}
		return stringHTML;
	}

 }
