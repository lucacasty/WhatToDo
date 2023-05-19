/*List Class*/

function FM_List(idToView,data,apiUrl,arrowColor) {

	this.idView = null;
	this.listCreated = null;
	this.arrowColor = null;
	this.totalColumnForiPad = 3;
	this.totalColumn = 1;

	this.apiCallUrl = "";

	///Init
   	if (!_system.isNull(idToView)) this.idView = idToView;
   	if (!_system.isNull(arrowColor)) this.arrowColor = arrowColor;
   	if (!_system.isNull(apiUrl)) this.apiCallUrl = apiUrl;

	this.call = function(url) {
		if (_system.isNull(url) && !_system.isNull(this.apiCallUrl)) {
			url = this.apiCallUrl;
		}
		//var url = _serviceUrl+"list.news.php?page=0"+filterCall;
		_this = this;
		if (!_system.isNull(url)) {
			$(this.idView).html(this.loader());

			$.ajax({
			  dataType: "json",
			  url: url,
			  data: data,
			  context: this,
			  success: function(data) {
				  this.create(data);
			  }
			});
		}
	}

    this.create = function(data) {
    	var listResult = "<div class='list-element'>";
    	var column = new Array("","","","","","","","","");
		var htmlColumn = "";
    	if (!_system.isNull(data)) {
    		c = 1;
	    	for (var i=0; i<data.length; i++) {
		    	column[c] += this.composeLine(data[i]);
		    	c++;
		    	if (c>this.totalColumn) c = 1;
	    	}
	    	if (this.totalColumn>1) {
		    	for (i=1;i<=this.totalColumn;i++) {
			    	htmlColumn += "<div class='list-column column-"+i+"'>"+column[i]+"</div>";
		    	}
	    	}  else {
		    	htmlColumn = column[1];
	    	}
    	}
    	listResult += htmlColumn;
    	listResult += "</div>";
		var elementId = this.idView;
		if (!_system.isNull(this.idView)) {
			$(elementId).html(listResult);
		}
    	this.listCreated = listResult;

		return listResult;
    }

    this.refresh = function() {
		if (!_system.isNull(this.apiCallUrl)) {
			this.call();
		}
    }

    this.loader = function() {
	    return "<div class='loader'>Loading...</div>";
    }

    this.composeLine = function(item) {
	    var id = null;
	    var title = null;
	    var type = null;
	    var description = null;
		var counter = null;
	    var date = null;
	    var image = null;
	    var apiArticleCallUrl = null;
	    var trend = null;
	    var rank = null;
	    var distance = true;
	    var action = null;
	    var active = true;

	    if (!_system.isNull('id')) id = item.id;
	    if (!_system.isNull('title')) title = item.title;
	    if (!_system.isNull('type')) type = item.type;
	    if (!_system.isNull('description')) description = item.description;
	    if (!_system.isNull('date')) date = item.date;
	    if (!_system.isNull('image')) image = item.image;
	    if (!_system.isNull('counter')) counter = item.counter;
	    if (!_system.isNull('apiArticleCallUrl')) apiArticleCallUrl = item.apiArticleCallUrl;
	    if (!_system.isNull('action')) action = item.action;
	    if (!_system.isNull('active')) active = item.active;
	    if (!_system.isNull('trend')) trend = item.trend;
	    if (!_system.isNull('rank')) rank = item.rank;
	    if (!_system.isNull('distance')) distance = item.distance;

		var showArrow = false;
		if (!_system.isNull(this.arrowColor) && (!_system.isNull(action) || !_system.isNull(apiArticleCallUrl))) showArrow = true;

		var htmlReturn = "<div class='list-item "+(active==false ? "disabled" : "")+" "+(!_system.isNull(type) ? "type-"+type : "")+" "+(showArrow ? "arrow-"+this.arrowColor : "")+" "+(!_system.isNull(image) ? "with-image" : "")+"' index='"+id+"' view='"+this.idView+"' action='"+(!_system.isNull(action) ? action : "")+"' apiArticleCallUrl='"+(!_system.isNull(apiArticleCallUrl) ? apiArticleCallUrl : "")+"'>";
		if (!_system.isNull(image)) htmlReturn += "<div class='image' style=\"background-image:url('"+image+"')\"></div>";
		htmlReturn += "<div class='container'>";
		if (!_system.isNull(date)) htmlReturn += "<div class='date'>"+date+"</div>";
		if (!_system.isNull(title)) htmlReturn += "<div class='title'>"+title+"</div>";
		if (!_system.isNull(description)) htmlReturn += "<div class='description'>"+description+"</div>";
		htmlReturn += "<div class='icon-area'><div class='icon'></div></div>";
		htmlReturn += "<div class='arrow'></div>";
		htmlReturn += "<div class='action-edit'></div>";
		htmlReturn += "<div class='action-delete'></div>";
		if (!_system.isNull(counter)) htmlReturn += "<div class='counter-area'><div class='counter'>"+counter+"</div></div>";
		if (!_system.isNull(distance)) htmlReturn += "<div class='distance'>"+distance+"</div>";
		if (!_system.isNull(rank)) htmlReturn += "<div class='rank' value='"+rank+"'></div>";
		htmlReturn += "</div>";
		if (!_system.isNull(trend)) htmlReturn += "<div class='trend' value='"+trend+"'></div>";
		htmlReturn += "</div>";
		return htmlReturn;
    }

    //Init function call
    if (!_system.isNull(apiUrl)) this.call(apiUrl);
   	if (!_system.isNull(data)) this.create(data);

	_class = this;

}
