/*System Class*/

var _system = {

	newKey: function(asc) {
		if (asc) {
			return (parseInt((new Date().getTime()))) + "-" + Math.floor((Math.random() * 800 + 100));
		} else {
			return (parseInt(new Date("2100-01-01").getTime()) - parseInt((new Date().getTime()))) + "-" + Math.floor((Math.random() * 800 + 100));
		}
	},

	label: function (label) {
		return _labels[_app.language][label];
	},

	language: function (label) {
		return _labels[_app.language][label];
	},

	messageCode: function (code) {
		return _messages[_app.language][code];
	},

	message: function (message) {
		if (navigator.notification) {
			_system.log("Call message(): navigator.notification.alert() ");
			setTimeout(function () {
				navigator.notification.alert(message);
			}, 100);
		} else {
			_system.log("Call message(): alert()");
			setTimeout(function () {
				alert(message);
			}, 100);
		}
	},

	openBrowser: function (url) {
		if (_system.isCordova()) {
			SafariViewController.isAvailable(function (available) {
				if (available) {
					SafariViewController.show({
						url: url,
						animated: true,
					});
				} else {
					var sPayment = cordova.InAppBrowser.open(url, '_blank', 'location=no');
				}
			});
		} else {
			window.open(url);
		}
	},

	width: function () {
		return $(document).width();
	},

	height: function () {
		return $(document).height();
	},

	isNull: function (str) {
		if (str == "" || str === undefined || str == "undefined" || str == null || typeof (str) == "null" || str == "null") {
			return true;
		} else {
			return false;
		}
	},

	isWebkit: function () {
		if ((navigator.userAgent.indexOf("WebKit") > -1)) {
			return true;
		} else {
			return false;
		}
	},

	isWinPhone: function () {
		if ((navigator.userAgent.indexOf("IEMobile") > -1) || (navigator.userAgent.indexOf("Windows Phone") > -1)) {
			return true;
		} else {
			return false;
		}
	},

	isOS: function () {
		if ((navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1) || (navigator.userAgent.indexOf("iPod") > -1)) {
			return true;
		} else {
			return false;
		}
	},

	isWindows: function () {
		if (navigator.userAgent.indexOf("Windows") > -1) {
			return true;
		} else {
			return false;
		}
	},

	isAndroid: function () {
		if (navigator.userAgent.indexOf("Android") > -1) {
			return true;
		} else {
			return false;
		}
	},

	isMobile: function () {
		if (this.isAndroid() || this.isOS() || this.isWinPhone()) {
			//if ((navigator.userAgent.indexOf("Android")>-1)||(navigator.userAgent.indexOf("iPhone")>-1)||(navigator.userAgent.indexOf("iPad")>-1)||(navigator.userAgent.indexOf("iPod")>-1)||(navigator.userAgent.indexOf("Windows Phone")>-1)) {
			return true;
		} else {
			return false;
		}
	},

	isCordova: function () {
		if (window.cordova !== undefined) {
			return true;
		} else {
			return false;
		}
	},

	isPWA: function () {
		if (window.navigator.standalone !== undefined) {
			return true;
		} else {
			return false;
		}
	},

	clientWhoIam: function() {
		if (this.isCordova()) {
			if (this.isAndroid()) {
				return "Android";
			} else if (this.isOS()) {
				return "iOS";
			} else {
				return "Unknown";
			}
		} else {
			return "PWA";
		}
	},

	divExist: function (id) {
		if (id.indexOf("#") != 0) id = "#" + id;
		if ($(id).length > 0) {
			return true;
		} else {
			return false;
		}
	},

	backView: function () {
		_views[_app.prevViewShowed.replace("#", "")].show();
	},

	back: function (index) {
		if (index === undefined) index = 0;
		if ($('view.edit-list-mode').length > 0) return;
		var idView = _app.latestViewShowed.replace('#', '');
		_system.log(idView);
		if (!this.isNull(idView) && idView != "") {
			if (_views[idView].sectionShowed > 0) {
				_views[idView].backSection();
				if (index > 1) {
					this.back(index - 1);
				}
			} else {
				if (this.isCordova()) {
					//if (confirm("Vuoi uscire dall'App?")) {
					//navigator.app.exitApp();
					//}
					return false;
				}
			}
			/* else {
				if (_app.latestViewShowed!="#agenda" && _app.latestViewShowed!="#nologged") {
					if (_profile.account.logged()) {
						_views['agenda'].show();
					} else {
						_views['nologged'].show();
					}
				} else {
					if (this.isAndroid()) {
						//if (confirm("Vuoi uscire dall'App?")) {
							navigator.app.exitApp();
						//}
					}
				}
			}
			*/
			return false;
		}
		return false;
	},

	loader: function (message, addCSSClass) {
		if (this.isNull(message)) message = "Loading..."
		return "<div class='loader generic " + (!this.isNull(addCSSClass) ? addCSSClass : "") + "'>" + message + "</div>";
	},

	loaderList: function (elementId) {
		elementId = elementId.replace("#", "");
		$('#' + elementId).html("<div class='loader list'></div>");
	},

	loaderAdd: function (elementId, isNotId) {
		if (isNotId == true) {
			$(elementId).addClass("loader");
		} else {
			elementId = elementId.replace("#", "");
			$('#' + elementId).addClass("loader");
		}
	},

	loaderRemove: function (elementId, isNotId) {
		if (isNotId == true) {
			$(elementId).removeClass("loader");
		} else {
			elementId = elementId.replace("#", "");
			$('#' + elementId).removeClass("loader");
		}
	},

	checkConnection: function () {
		/*
		if ((navigator.userAgent.indexOf("iPod")>-1)||(navigator.userAgent.indexOf("iPhone")>-1)) {
		    var networkState = navigator.network.connection.type;
		    var states = {};
		    states[Connection.UNKNOWN]  = '';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.NONE]     = '';
		    return states[networkState];
		} else {
		    return "Connected";
		}
		*/
		if (navigator.onLine == true) {
			return true;
		} else {
			return false;
		}
	},

	currentPosition: function () {
		return new Promise(function (resolve, reject) {
			var options = {
				timeout: 5000
			};
			navigator.geolocation.getCurrentPosition(function (position) {
				_app.userLastLat = position.coords.latitude;
				_app.userLastLon = position.coords.longitude;
				_app.userLastAccuracy = position.coords.accuracy;
				_system.log("Call currentPosition()");
				_app.userGeoError = false;
				resolve({
					lat: _app.userLastLat,
					lon: _app.userLastLon
				});
			}, function () {
				//_app.userLastLat = null;
				//_app.userLastLon = null;
				//_app.userLastAccuracy = null;
				_app.userGeoError = true;
				reject();
			}, options);
		});
	},

	getDistanceFromLatLng: function (lat1, lng1, lat2, lng2, miles) { // miles optional
		if (typeof miles === "undefined") {
			miles = false;
		}

		function deg2rad(deg) {
			return deg * (Math.PI / 180);
		}

		function square(x) {
			return Math.pow(x, 2);
		}
		var r = 6371; // radius of the earth in km
		lat1 = deg2rad(lat1);
		lat2 = deg2rad(lat2);
		var lat_dif = lat2 - lat1;
		var lng_dif = deg2rad(lng2 - lng1);
		var a = square(Math.sin(lat_dif / 2)) + Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
		var d = 2 * r * Math.asin(Math.sqrt(a));
		if (miles) {
			return d * 0.621371;
		} //return miles
		else {
			return d;
		} //return km
	},

	log: function (message) {
		if (_app.debugMode) {
			console.log(message);
		}
	},

	showError: function (id, title, message, type) {
		$(id).html("<div class='content-message " + type + "'><h1>" + title + "</h1><div>" + message + "</div></div>");
	},

	getDateTimeFromFormat: function (string_date){

		//clear date
		string_date = string_date.replace("T", " ");
		//divide datetime parts
		var datetimeParts = string_date.split(" ");
		var dateParts = datetimeParts[0].split("-");
		var timeParts = datetimeParts[1].split(":");

		return  new Date(dateParts[0], dateParts[1] -1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]);

	},

	dateDayOfMonth: function (date) {
		//date = date.replace(" ", "T") + ".000Z";
		return _system.getDateTimeFromFormat(date).getDate();
	},

	dateDayOfWeek: function (date) {
		//date = date.replace(" ", "T") + ".000Z";
		return _system.label("day-" + _system.getDateTimeFromFormat(date).getDay());
	},

	dateDay: function (dateToConvert) {
		//dateToConvert = dateToConvert.replace(" ", "T") + ".000Z";
		var date = _system.getDateTimeFromFormat(dateToConvert);
		var year = date.getFullYear();
		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : '0' + month;
		var day = date.getDate().toString();
		day = day.length > 1 ? day : '0' + day;
		return day + '/' + month + '/' + year;
	},

	dateToShow: function (date) {
		var localDate = new Date(date*1);
		var year = localDate.getFullYear();
		var month = localDate.getMonth() + 1;
		var day = localDate.getDate();
		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;
		date = year + "-" + month + "-" + day;
		if (date.substr(0, 10) == _system.dateNow()) {
			var newDate = _system.label('today');
		} else {
			var newDate = date[8] + date[9] + "/" + date[5] + date[6] + "/" + date[0] + date[1] + date[2] + date[3];
		}
		return newDate;
	},

	dateToInput: function (date) {
		var localDate = new Date(date);
		var year = localDate.getFullYear();
		var month = localDate.getMonth() + 1;
		var day = localDate.getDate();
		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;
		date = year + "-" + month + "-" + day;
		return date;
	},

	dateToShowExtended: function (date, completed) {
		//date = date.replace(" ", "T") + ".000Z";
		var localDate = _system.getDateTimeFromFormat(date);
		var year = localDate.getFullYear();
		var month = localDate.getMonth() + 1;
		var day = localDate.getDate();
		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;
		date = year + "-" + month + "-" + day;
		if (completed == true) {
			var newDate = _system.label("day-ext-" + localDate.getDay()) + " " + ((date[8] + date[9]) * 1) + " " + _system.label("month-" + ((date[5] + date[6]) * 1)) + " " + date[0] + date[1] + date[2] + date[3];
		} else {
			var newDate = ((date[8] + date[9]) * 1) + " " + _system.label("month-" + ((date[5] + date[6]) * 1));
		}
		return newDate;
	},

	dateToShowExtendedMonth: function (date, completed) {
		//date = date.replace(" ", "T") + ".000Z";
		var localDate = _system.getDateTimeFromFormat(date);
		var year = localDate.getFullYear();
		var month = localDate.getMonth() + 1;
		var day = localDate.getDate();
		if (day < 10) day = "0" + day;
		if (month < 10) month = "0" + month;
		date = year + "-" + month + "-" + day;
		var newDate = _system.label("month-" + ((date[5] + date[6]) * 1)) + " " + year;
		return newDate;
	},

	dateInMs: function () {
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		var ms = d.getMilliseconds();
		if (d < 10) d = "0" + d;
		if (h < 10) h = "0" + h;
		if (m < 10) m = "0" + m;
		if (s < 10) s = "0" + s;
		if (ms < 100) ms = "00" + ms;
		if (ms < 10) ms = "0" + ms;
		return h + ":" + m + ":" + s + ":" + ms;
	},

	dateNow: function () {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		var today = yyyy + '-' + mm + '-' + dd;
		return today;
	},

	dateNext: function (days, modal) {
		var date = new Date();
		date.setDate(date.getDate() + days);
		if (modal == "epoch") {
			return date.getTime();
		} else {
			return _system.dateToInput(date.getTime());
		}
	},

	dateFirstMonth: function () {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		var today = yyyy + '-' + mm + '-01';
		return today;
	},

	dateEndNextMonth: function () {
		return _system.dateNext(30).substr(0, 7) + "-31";
	},

	dateNowYear: function () {
		var today = new Date();
		return today.getFullYear();
	},

	timeNow: function () {
		var d = new Date();
		var curr_hour = d.getHours();
		var curr_minutes = d.getMinutes();
		var curr_seconds = d.getSeconds();
		if (curr_hour < 10) curr_hour = "0" + curr_hour;
		if (curr_minutes < 10) curr_minutes = "0" + curr_minutes;
		if (curr_seconds < 10) curr_seconds = "0" + curr_seconds;
		return (curr_hour + ":" + curr_minutes + ":" + curr_seconds);
	},

	dateToEpoch: function (datestring) {
		var parts = datestring.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
		//return (Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]));
		//return Date(Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]));
		return "/Date(" + Date.UTC(+parts[1], parts[2] - 1, +parts[3], +parts[4], +parts[5]) + ")/";
	},

	dateDiff: function (date1, date2, interval) {
		var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
		date1 = new Date(date1);
		date2 = new Date(date2);
		var timediff = date2 - date1;
		if (isNaN(timediff)) return NaN;
		switch (interval) {
			case "years":
				return date2.getFullYear() - date1.getFullYear();
			case "months":
				return (
					(date2.getFullYear() * 12 + date2.getMonth()) -
					(date1.getFullYear() * 12 + date1.getMonth())
				);
			case "weeks":
				return Math.floor(timediff / week);
			case "days":
				return Math.floor(timediff / day);
			case "hours":
				return Math.floor(timediff / hour);
			case "minutes":
				return Math.floor(timediff / minute);
			case "seconds":
				return Math.floor(timediff / second);
			default:
				return undefined;
		}
	},

	htmlEncode: function (s) {
		var el = document.createElement("div");
		el.innerText = el.textContent = s;
		s = el.innerHTML;
		return s;
	},

	confirm: function (title, message) {
		var promise = new Promise(function (resolve, reject) {
			if (confirm(title)) {
				resolve();
			} else {
				reject();
			}
		});
		return promise;

	},

	base64toBlob: function (base64Data, contentType) {
		contentType = contentType || '';
		var sliceSize = 1024;
		var byteCharacters = atob(base64Data);
		var bytesLength = byteCharacters.length;
		var slicesCount = Math.ceil(bytesLength / sliceSize);
		var byteArrays = new Array(slicesCount);

		for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
			var begin = sliceIndex * sliceSize;
			var end = Math.min(begin + sliceSize, bytesLength);

			var bytes = new Array(end - begin);
			for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
				bytes[i] = byteCharacters[offset].charCodeAt(0);
			}
			byteArrays[sliceIndex] = new Uint8Array(bytes);
		}
		return new Blob(byteArrays, {
			type: contentType
		});
	},

	numberFormat: function (number, decimals, dec_point, thousands_sep) {
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function (n, prec) {
				var k = Math.pow(10, prec);
				return '' + Math.round(n * k) / k;
			};
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}
		return s.join(dec);
	},

	deviceType: function () {
		var deviceType = 3; //Browser
		if (_system.isOS()) deviceType = 1; //iOS
		if (_system.isAndroid()) deviceType = 2; //Android
		if (_system.isPWA()) deviceType = 4; //PWA
		return deviceType;
	},

	uuid: function () {
		if (window.device !== undefined) {
			return device.uuid;
		} else {
			if (localStorage.getItem('__device_uuid') !== null) {
				return localStorage.getItem('__device_uuid');
			} else {
				var uuid = "BW" + new Date().getTime() + "" + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
				localStorage.setItem('__device_uuid', uuid)
				return uuid;
			}
		}
	},

	decodePolyline: function(encoded) {

		// array that holds the points

		var points = []
		var index = 0,
			len = encoded.length;
		var lat = 0,
			lng = 0;
		while (index < len) {
			var b, shift = 0,
				result = 0;
			do {

				b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);


			var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lat += dlat;
			shift = 0;
			result = 0;
			do {
				b = encoded.charAt(index++).charCodeAt(0) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
			lng += dlng;

			points.push({
				latitude: (lat / 1E5),
				longitude: (lng / 1E5)
			})

		}
		return points
	},

	getVar: function(parameter, defaultvalue, source) {
		if (source === undefined) source = window.location.href;
		var urlparameter = defaultvalue;
		if (source.indexOf(parameter) > -1){
			urlparameter = this.getUrlVars(source)[parameter];
		}
		if (urlparameter !== undefined && urlparameter !== null) {
			urlparameter = urlparameter.split("#")[0];
		}
		return urlparameter;
	},

	getUrlVars: function(source) {
		if (source === undefined) source = window.location.href;
		var vars = {};
		var parts = source.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},

}