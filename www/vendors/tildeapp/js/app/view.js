/*View Class*/

function FM_View() {

	this.id = null;
	this.headerbar = null;
	this.floatingactions = null;
	this.totalViewCreated = 0;
	this.timeViewDelay = 500;
	this.history = [0];
	this.sectionShowed = 0;
	this.sectionMapList = new Array();
	this.sectionCallback = new Array();
	this.models = new Array();

    this.create = function(id,content,callback) {
    	if (!_system.isNull(id)) {
    		this.id = "#"+id;
	    	if (!_system.divExist(id)) {
				if ($('content').length == 0) $('body').append("<main><content></content><notouchzone></notouchzone><backzone></backzone></main>");
		    	$('content').append('<view level="0" id="'+id+'" index="'+_app.totalViewCreated+'"></view>');
		    	if (_app.totalViewCreated==0) this.historyPush(0);
		    	this.addSection(content,null,null,callback);
		    	this.showSection();
		    	this.checkIfToolbarExists();
		    }
    		_app.totalViewCreated++;
		    return true;
    	} else {
	    	return false;
    	}
    }

    this.addSection = function(content,title,level,callback) {
	    if (_system.isNull(content)) content = "standard";
		if (_system.isNull(level)) level = this.totalSection();
	    if (!_system.isNull(callback)) this.sectionCallback[level] = callback;
		if (!_system.isNull(title)) {
			if (!_system.isNull(this.headerbar)) {
				this.headerbar.setTitle(title, level);
			}
		}
	    if (!$(this.id+" .level-"+level).length>0) {
		    //$(this.id).append("<section id='"+this.id.replace('#','')+"-level-"+level+"' class='level-"+level+" "+((_system.isAndroid() || _system.isWinPhone()) && level>0 ? "hide" : "")+"'></section>");
		    $(this.id).append("<section id='"+this.id.replace('#','')+"-level-"+level+"' level='"+level+"' content='"+content+"' class='level-"+level+" "+((_system.isOS() || _system.isAndroid()) && level>0 ? "hide" : "")+"'></section>");
	    }
    	if (!_system.isNull(content)) {
    		//Se presente un contenuto in init carico immediatamente
	    	this.html(content,level);
    	}
	}
	
	this.section = function(level) {
		this.showSection(level);
	},

    this.showSectionDeprecated = function(level) {
		$('*').blur();
    	var _this = this;
	    var idView = this.id;
	    var prefixAnimation = "next";
		if (_system.isNull(level)) level = 0;
		if (typeof level === 'string' || level instanceof String) {
			location.hash = level;
			level = $(this.id).find('section[content="'+level+'"]').attr('level') * 1;
		}
	    if (level<_this.sectionShowed) prefixAnimation = "back";
	    if (!_system.isNull(this.headerbar)) {
			this.headerbar.setTitleLevel(level);
			this.headerbar.setColorLevel(level);
		}
		this.showSectionCallback();
		setTimeout(function() {
			if ($(idView+" section.level-"+level).scrollTop() > 0) {
				$(idView+" headerbar").addClass("section-scrolled");
			} else {
				$(idView+" headerbar").removeClass("section-scrolled");
			}
			if ($(idView+" section.level-"+level).scrollTop() > 40) {
				$(idView+" headerbar").addClass("section-scrolled-title");
			} else {
				$(idView+" headerbar").removeClass("section-scrolled-title");
			}	
		}, 100);
		$('body').attr("level", level);
		if (level!=_this.sectionShowed) {
			_this.historyPush(level);
			if (_system.isAndroid() || _system.isOS()) {
				$("view"+idView).attr("level",level);
				var oldSection = $(idView+" section.level-"+_this.sectionShowed)
				oldSection.addClass(prefixAnimation+'-slout');
				console.log(idView+" section.level-"+_this.sectionShowed + ": addClass " + prefixAnimation+'-slout');
				setTimeout(function() {
					oldSection.hide();
					setTimeout(function() {
						console.log(idView+" section.level-"+_this.sectionShowed + ": removeClass " + 'next-slout');
						console.log(idView+" section.level-"+_this.sectionShowed + ": removeClass " + 'back-slout');
						oldSection.removeClass('next-slout');
						oldSection.removeClass('back-slout');
					},10);
				},250);
				_this.sectionShowed = level;
				if (_system.divExist(idView)) {
					//if (_system.isAndroid()) myScroll = new IScroll(idView+"-level-"+level);
					var newSection = $(idView+" section.level-"+level);
					setTimeout(function() {
						console.log(idView+" section.level-"+level + ": addClass " + prefixAnimation+'-slin');
						newSection.addClass(prefixAnimation+'-slin');
						setTimeout(function() {
							newSection.show();
							setTimeout(function() {
								console.log(idView+" section.level-"+level + ": removeClass " + prefixAnimation+'-slin');
								newSection.removeClass(prefixAnimation+'-slin');
								if (prefixAnimation!="back") _this.checkRefreshElements();
							},250);
							if (!_system.isNull(_this.sectionCallback[level])) {
								eval(_this.sectionCallback[level]);
							}
							_this.checkHeaderBackButton();
						},5);
					},5);
					//O_Main_FloatingActions.rendering();
					return true;
				} else {
					return false;
				}
			} else {
				$("view"+idView).attr("level",level);
		   		_this.sectionShowed = level;
				_this.checkRefreshElements();
				_this.checkHeaderBackButton();
				if (!_system.isNull(_this.sectionCallback[level])) {
					eval(_this.sectionCallback[level]);
				}
				return true;
			}
	    }
	}
	
	this.showSection = function(newLevel) {
		//$('*').blur();
    	var _this = this;
		var idView = this.id;
		if (_system.isNull(newLevel)) newLevel = 0;
		if (typeof newLevel === 'string' || newLevel instanceof String) {
			location.hash = newLevel;
			newLevel = $(this.id).find('section[content="'+newLevel+'"]').attr('level') * 1;
		}

		//Move new level
		$(idView+" section.level-"+newLevel).addClass('in-left');
		this.setHeaderStyle(idView, newLevel);
		this.updateLevel(newLevel);
		//if (newLevel == this.sectionShowed) return;
		if (!_system.isNull(this.headerbar)) {
			this.headerbar.setTitleLevel(newLevel);
			this.headerbar.setColorLevel(newLevel);
		}
		
		//Check if section is in history
		if (this.historyCheck(newLevel) >= 0) {
			while (this.historyCheck(newLevel) >= 0 && this.historyLatest() != newLevel) {
				this.backSection();
			}
			return;
		}

		//Move old level
		oldLevel = this.historyLatest();
		$(idView+" section.level-"+oldLevel).addClass('out-left');
		this.historyPush(newLevel);
		this.checkHeaderBackButton();

		return true;
    }

    this.showSectionCallback = function() {
	    //Lista funzioni callback navigazione view
	    //contentSubmenuHide();
	    _menu.hide();
	}
	
	this.setHeaderStyle = function(idView, newLevel) {
		setTimeout(function() {
			if ($(idView+" section.level-"+newLevel).scrollTop() > 0) {
				$(idView+" headerbar").addClass("section-scrolled");
			} else {
				$(idView+" headerbar").removeClass("section-scrolled");
			}
			if ($(idView+" section.level-"+newLevel).scrollTop() > 40) {
				$(idView+" headerbar").addClass("section-scrolled-title");
			} else {
				$(idView+" headerbar").removeClass("section-scrolled-title");
			}	
		}, 100);
	}

    this.checkRefreshElements = function() {
    	//Verifico la presenza di mappe da refresshare
    	var _parent = this;
    	if (_app.latestViewShowed==this.id) {
	    	$(this.id+" section.level-"+this.sectionShowed+" map").each(function() {
	    		var mapId = $(this).attr('id');
	    		$(this).html('');
		    	if (!_system.isNull(mapId)) {
		    		var apiCall = $(this).attr('apiCall');
		    		var map = $(this);
					setTimeout(function() {
						//Sulla generazione della map � indispensabile ricreare la mappa dopo almeno 50ms per non generare errori grafici di rendering
					    _parent.sectionMapList[mapId] = new FM_Map(mapId,apiCall,map.attr('mapCenterLat'),map.attr('mapCenterLon'),map.attr('mapType'),map.attr('mapZoom'));
					},50);
	    		}
	    	});
    	}
    }

    this.showNextSection = function() {
    	var level = this.sectionShowed+1;
    	if ($(this.id+" section.level-"+level).length>0) {
    		this.showSection(level);
    	}
    }

    this.nextSection = function() {
	    this.showNextSection();
	}
	
	this.updateLevel = function(level) {
		this.sectionShowed = level;
		$('body').attr("level", level);
		$("view"+this.id).attr("level", level);

	}

    this.backSection = function() {
    	var level = this.historyLatest();
    	$(this.id+" section.level-"+level).removeClass("in-left");
		this.historyPop();
    	var level = this.historyLatest();
		$(this.id+" section.level-"+level).removeClass("out-left");
		this.updateLevel(level);
		this.checkHeaderBackButton();
		this.setHeaderStyle(this.id, level);
		this.headerbar.setTitleLevel(level);
    }

    this.prevSection = function() {
	    this.backSection();
    }

    this.checkHeaderBackButton = function() {
    	if (!_system.isNull(this.headerbar)) {
		    if (this.sectionShowed==0) {
			    this.headerbar.removeButtonBack();
		    } else {
			    this.headerbar.addButtonBack();
		    }
    	}
    }

    this.totalSection = function() {
	    return $(this.id+" section").length;
    }

    this.append = function(content,level) {
	    if (_system.isNull(level)) level = 0;
    	if (_system.divExist(this.id)) {
    		$(this.id+" section.level-"+level).append(content);
    		return true;
		} else {
			return false;
		}
    }

    this.html = function(content,level) {
	    if (_system.isNull(level)) level = 0;
    	if (_system.divExist(this.id)) {
			var page = $('<div>');
			var _this = this;
			page.load("models/views/"+content+".html",function() {
				var htmlPage = page[0].outerHTML;
				htmlPage = _this.replaceLangLabel(htmlPage);
	    		$(_this.id+" section.level-"+level).html(htmlPage);
			});
    		return true;
		} else {
			return false;
		}
    }

	this.replaceLangLabel = function(stringHTML) {
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

	this.replaceItems = function(stringHTML, items) {
		if (!_system.isNull(stringHTML)) {
			var elements = stringHTML.split("{");
			for (var i = 0; i < elements.length; i++) {
				var element = elements[i].split("}");
				element = element[0];
				var label = items[element];
				label += "";
				if (label !== undefined && label !== null && label.indexOf("url(") == -1) {
					//label = label.replaceAll("'","&#39;");
					//label = label.replaceAll("\"","&#34;");	
				}
				//console.log(label);
				stringHTML = stringHTML.replaceAll("{"+element+"}",label);
			}
		}
		return stringHTML;
	}

    this.cancel = function() {
    	if (_system.divExist(this.id)) {
    		$(this.id).html('');
    		return true;
		} else {
			return false;
		}
    }

    this.viewCheckHeaderButtonBack = function() {
    	if (this.history.length>1) {
    		_app.headerbar.addButtonBack();
    	} else {
    		_app.headerbar.removeButtonBack();
    	}
    }

    this.viewCheckToolbarButtonSelect = function() {
		if (!_system.isNull(this.id)) {
    		O_Main_Toolbar.selectButtonFromView(this.id.replace("#",""));
		}
    }

    this.headerCreate = function(title,color) {
	    //Genero nuova headerbar in questa view

	    this.headerbar = new FM_Headerbar();
	    this.headerbar.create(this.id.replace('#',''),title,color);
	    this.headerbar.setTitle(title,0);
	    this.headerbar.setColor(color,0);
	    this.headerbar.show();

		$(this.id).addClass('with-header');
    }

    this.checkIfToolbarExists = function() {
	    if (!_system.isNull(_app.toolbar)) {
			$(this.id).addClass('with-toolbar');
	    }
    }

    this.historyPush = function(level) {
		this.history.push(level);
    }

    this.historyPop = function() {
		this.history.pop();
    }

    this.historyLatest = function() {
	  	return this.history[this.history.length-1];
    }

    this.historyReset = function() {
	    this.history = new Array();
    }

    this.historyCheck = function(index) {
	    return this.history.indexOf(index)
    }

    this.show = function () {
		//$('input, select, textarea').blur();
    	if (_app.latestViewShowed!=this.id) {
			var viewId = this.id;
			$('body').attr("view", viewId.replace("#",""));
	    	this.hideLatestView();
	    	_app.prevViewShowed = _app.latestViewShowed;
	    	_app.latestViewShowed = this.id;
	    	this.viewCheckToolbarButtonSelect();
		    $(viewId).addClass('show');
    	}
    }

    this.hide = function () {
    	var viewId = this.id;
	   	$(viewId).removeClass('show');
    }

    this.hideLatestView = function() {
	    if (!_system.isNull(_app.latestViewShowed)) {
		    var viewId = _app.latestViewShowed
			$(viewId).removeClass('show');
	    }
	}
	
	this.article = function(model, items) {
		var _this = this;
		return new Promise(function(resolve, reject) {
			var page = $('<div>');
			if (_this.models[model] !== undefined) {
				//console.log("Load article from cache!");
				var htmlPage = _this.models[model];
				htmlPage = _this.replaceLangLabel(htmlPage);
				htmlPage = _this.replaceItems(htmlPage, items);
				resolve(htmlPage)
			} else {
				//console.log("Load article from source!");
				page.load("models/articles/"+model+".html",function() {
					var htmlPage = page[0].outerHTML;
					_this.models[model] = htmlPage;
					htmlPage = _this.replaceLangLabel(htmlPage);
					htmlPage = _this.replaceItems(htmlPage, items);
					resolve(htmlPage)
				});	
			}
		});
	}

	this.loadModelsArticle = function(models) {
		for (var i = 0; i < models.length; i++) {
			var model = models[i];
			this._loadModelsArticleCallback(model);
		}
	}

	this._loadModelsArticleCallback = function(model) {
		var _this = this;
		var page = $('<div>');
		page.load("models/articles/"+model+".html",function() {
			var htmlPage = page[0].outerHTML;
			_this.models[model] = htmlPage;
		});
	}

}
